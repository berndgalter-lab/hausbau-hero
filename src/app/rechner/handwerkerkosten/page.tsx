"use client";

import { useState } from "react";
import FAQSection from "@/components/FAQSection";
import RechnerHinweis from "@/components/RechnerHinweis";
import { getFaqBySlug } from "@/lib/faq-data";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface MinMax { min: number; max: number; }
interface Zusatz { name: string; min: number; max: number; beschreibung: string; }

interface Preisdaten {
  name: string;
  einheit: string;
  material: MinMax & { beschreibung: string };
  arbeit: MinMax & { beschreibung: string };
  zusatz: Zusatz[];
  dauer_pro_einheit: string;
  hinweis: string;
}

const GEWERKE = [
  { value: "fliesen-boden", label: "Bodenfliesen verlegen" },
  { value: "fliesen-wand", label: "Wandfliesen verlegen" },
  { value: "fliesen-bad-komplett", label: "Bad komplett fliesen (Boden + Wand)" },
  { value: "streichen-innen", label: "Wände streichen (innen)" },
  { value: "streichen-fassade", label: "Fassade streichen (außen)" },
  { value: "tapezieren", label: "Tapezieren (Raufaser + streichen)" },
  { value: "laminat", label: "Laminat / Vinyl verlegen" },
  { value: "parkett", label: "Parkett verlegen und versiegeln" },
  { value: "trockenbau-wand", label: "Trockenbau-Wand einziehen" },
  { value: "trockenbau-decke", label: "Decke abhängen (Trockenbau)" },
  { value: "putz-innen", label: "Innenwand verputzen" },
  { value: "estrich", label: "Estrich einbringen" },
  { value: "daemmung-dach", label: "Dachdämmung (Zwischensparren)" },
  { value: "daemmung-fassade", label: "Fassadendämmung (WDVS)" },
  { value: "daemmung-kellerdecke", label: "Kellerdecke dämmen" },
  { value: "elektro-komplett", label: "Elektroinstallation (pro Raum)" },
  { value: "sanitaer-bad", label: "Sanitärinstallation Bad komplett" },
  { value: "heizung-waermepumpe", label: "Wärmepumpe einbauen (komplett)" },
  { value: "terrasse-wpc", label: "WPC-Terrasse bauen" },
  { value: "terrasse-stein", label: "Terrassenplatten verlegen" },
];

const REGIONEN = [
  { value: "sued", label: "Süddeutschland (BY, BW)", faktor: 1.15 },
  { value: "west", label: "Westdeutschland (NRW, HE, RP, SL)", faktor: 1.0 },
  { value: "nord", label: "Norddeutschland (NI, SH, HH, HB)", faktor: 0.92 },
  { value: "ost", label: "Ostdeutschland (SN, TH, ST, BB, MV)", faktor: 0.82 },
  { value: "berlin", label: "Berlin", faktor: 1.05 },
];

const PREISDATEN: Record<string, Preisdaten> = {
  "fliesen-boden": {
    name: "Bodenfliesen verlegen",
    einheit: "m²",
    material: { min: 15, max: 60, beschreibung: "Fliesen + Kleber + Fugenmasse + Grundierung" },
    arbeit: { min: 40, max: 70, beschreibung: "Reine Verlegearbeit inkl. Verfugen" },
    zusatz: [
      { name: "Untergrundvorbereitung", min: 8, max: 20, beschreibung: "Ausgleichsmasse, Grundierung, ggf. alte Fliesen entfernen" },
      { name: "Sockelleisten/Abschlussprofile", min: 5, max: 12, beschreibung: "Pro laufender Meter Rand" },
    ],
    dauer_pro_einheit: "0,5–1h pro m²",
    hinweis: "Großformatige Fliesen (>60×60 cm) kosten 10–20 % Aufpreis wegen höherem Aufwand. Diagonalverlegung ca. 15 % teurer.",
  },
  "fliesen-wand": {
    name: "Wandfliesen verlegen",
    einheit: "m²",
    material: { min: 15, max: 60, beschreibung: "Fliesen + Flexkleber + Fugenmasse" },
    arbeit: { min: 45, max: 80, beschreibung: "Wandverlegung ist aufwändiger als Boden (Schwerkraft!)" },
    zusatz: [
      { name: "Abdichtung (Dusche/Wanne)", min: 15, max: 30, beschreibung: "Flüssigfolie + Dichtband (Pflicht nach DIN 18534)" },
    ],
    dauer_pro_einheit: "0,6–1,2h pro m²",
    hinweis: "Im Spritzwasserbereich (Dusche, Wanne) muss vorher abgedichtet werden — ca. 15–30 €/m² extra.",
  },
  "fliesen-bad-komplett": {
    name: "Bad komplett fliesen (Boden + Wand)",
    einheit: "m²",
    material: { min: 20, max: 60, beschreibung: "Fliesen, Kleber, Fugenmasse, Silikon" },
    arbeit: { min: 50, max: 80, beschreibung: "Verlegen, Verfugen, Abdichtung, Silikon" },
    zusatz: [
      { name: "Abdichtung komplett", min: 15, max: 30, beschreibung: "Gesamter Nassbereich" },
      { name: "Alte Fliesen entfernen", min: 15, max: 30, beschreibung: "Demontage + Entsorgung" },
    ],
    dauer_pro_einheit: "0,7–1,5h pro m²",
    hinweis: "Bei einem 6 m² Bad mit ca. 25 m² Wand- und Bodenfläche: Gesamtkosten typisch 2.500–5.500 € inkl. Material.",
  },
  "streichen-innen": {
    name: "Wände streichen (innen)",
    einheit: "m²",
    material: { min: 2, max: 5, beschreibung: "Farbe (2 Anstriche), Abklebeband, Folie" },
    arbeit: { min: 8, max: 15, beschreibung: "Abkleben, Grundieren, 2x Streichen" },
    zusatz: [
      { name: "Spachteln/Risse ausbessern", min: 3, max: 10, beschreibung: "Bei unebenen Wänden" },
    ],
    dauer_pro_einheit: "0,15–0,3h pro m²",
    hinweis: "Preis pro m² Wandfläche (nicht Grundfläche!). Ein 20 m² Raum hat ca. 50–65 m² Wand- und Deckenfläche.",
  },
  "streichen-fassade": {
    name: "Fassade streichen (außen)",
    einheit: "m²",
    material: { min: 5, max: 12, beschreibung: "Fassadenfarbe (2 Anstriche), Grundierung" },
    arbeit: { min: 18, max: 30, beschreibung: "Reinigung, Grundierung, 2x Anstrich" },
    zusatz: [
      { name: "Gerüst", min: 8, max: 15, beschreibung: "Gerüststellung (Auf-/Abbau + Miete)" },
      { name: "Putzausbesserung", min: 5, max: 20, beschreibung: "Risse und Fehlstellen reparieren" },
    ],
    dauer_pro_einheit: "0,2–0,4h pro m²",
    hinweis: "Gerüstkosten sind oft der größte Einzelposten. Bei 150 m² Fassade: ca. 1.200–2.250 € nur fürs Gerüst.",
  },
  tapezieren: {
    name: "Tapezieren (Raufaser + überstreichen)",
    einheit: "m²",
    material: { min: 3, max: 8, beschreibung: "Tapete + Kleister + Farbe (2x)" },
    arbeit: { min: 12, max: 22, beschreibung: "Alte Tapete entfernen, neu tapezieren, 2x streichen" },
    zusatz: [],
    dauer_pro_einheit: "0,3–0,5h pro m²",
    hinweis: "Vliestapeten oder Designtapeten sind beim Material deutlich teurer (10–50 €/Rolle vs. 3–8 € für Raufaser).",
  },
  laminat: {
    name: "Laminat / Vinyl verlegen (Klick)",
    einheit: "m²",
    material: { min: 15, max: 40, beschreibung: "Laminat/Vinyl + Trittschalldämmung + Sockelleisten" },
    arbeit: { min: 20, max: 35, beschreibung: "Verlegen inkl. Sockelleisten und Übergangsprofile" },
    zusatz: [
      { name: "Alten Boden entfernen", min: 5, max: 15, beschreibung: "Teppich, altes Laminat etc." },
      { name: "Untergrund ausgleichen", min: 8, max: 20, beschreibung: "Ausgleichsmasse bei unebener Fläche" },
    ],
    dauer_pro_einheit: "0,3–0,6h pro m²",
    hinweis: "Klick-Vinyl ist wasserbeständig und daher auch für Küche und Flur geeignet.",
  },
  parkett: {
    name: "Parkett verlegen und versiegeln",
    einheit: "m²",
    material: { min: 35, max: 90, beschreibung: "Massivparkett oder Mehrschichtparkett + Kleber + Versiegelung" },
    arbeit: { min: 35, max: 60, beschreibung: "Verkleben, Schleifen, 3x Versiegeln" },
    zusatz: [],
    dauer_pro_einheit: "0,8–1,5h pro m²",
    hinweis: "Mehrschichtparkett (Klick) ist günstiger als Massivparkett. Massiv muss verklebt und geschliffen werden.",
  },
  "trockenbau-wand": {
    name: "Trockenbau-Trennwand einziehen",
    einheit: "m²",
    material: { min: 15, max: 30, beschreibung: "CW/UW-Profile, Gipskartonplatten, Dämmung, Spachtel" },
    arbeit: { min: 40, max: 75, beschreibung: "Ständerwerk, Beplankung, Spachteln (Q2–Q3)" },
    zusatz: [],
    dauer_pro_einheit: "0,8–1,5h pro m²",
    hinweis: "Doppelbeplankung (fuer Schallschutz oder Fliesen) ca. 20–30 % teurer. Brandschutzplatten ca. 30 % mehr Material.",
  },
  "trockenbau-decke": {
    name: "Decke abhängen (Trockenbau)",
    einheit: "m²",
    material: { min: 15, max: 25, beschreibung: "CD/UD-Profile, Direktabhänger, Gipskartonplatten" },
    arbeit: { min: 45, max: 80, beschreibung: "Unterkonstruktion, Beplankung, Spachteln" },
    zusatz: [
      { name: "Spotlights einbauen", min: 20, max: 40, beschreibung: "Pro Spot (Bohren + Anschluss)" },
    ],
    dauer_pro_einheit: "1,0–1,8h pro m²",
    hinweis: "Deckenarbeit ist aufwändiger als Wandarbeit (Überkopf). Spots vorher planen — nachträglich teuer.",
  },
  "putz-innen": {
    name: "Innenwand verputzen (Gipsputz)",
    einheit: "m²",
    material: { min: 5, max: 12, beschreibung: "Gipsputz, Putzschienen, Grundierung" },
    arbeit: { min: 20, max: 40, beschreibung: "Maschinenputz auftragen, abziehen, glätten" },
    zusatz: [],
    dauer_pro_einheit: "0,3–0,6h pro m²",
    hinweis: "Maschinenputz ist günstiger als Handputz. Ab 50 m² lohnt sich eine Putzmaschine.",
  },
  estrich: {
    name: "Estrich einbringen (Zement-Fließestrich)",
    einheit: "m²",
    material: { min: 10, max: 20, beschreibung: "Estrich, PE-Folie, Randdämmstreifen" },
    arbeit: { min: 15, max: 30, beschreibung: "Vorbereitung, Einbringung, Abziehen" },
    zusatz: [],
    dauer_pro_einheit: "0,2–0,4h pro m²",
    hinweis: "Trocknungszeit beachten: ca. 1 Tag pro mm Estrichdicke. 50 mm Estrich = ca. 7 Wochen bis belegreif!",
  },
  "daemmung-dach": {
    name: "Dachdämmung (Zwischensparren)",
    einheit: "m²",
    material: { min: 25, max: 50, beschreibung: "Mineralwolle/Holzfaser + Dampfbremse + Klebeband" },
    arbeit: { min: 30, max: 50, beschreibung: "Zuschneiden, Einpassen, Dampfbremse verkleben" },
    zusatz: [],
    dauer_pro_einheit: "0,5–1,0h pro m²",
    hinweis: "Förderbar über BAFA BEG EM (15–20 % Zuschuss). iSFP verdoppelt die förderfähigen Kosten!",
  },
  "daemmung-fassade": {
    name: "Fassadendämmung (WDVS)",
    einheit: "m²",
    material: { min: 40, max: 80, beschreibung: "Dämmplatten + Kleber + Armierung + Putz" },
    arbeit: { min: 50, max: 90, beschreibung: "Kleben, Dübeln, Armieren, Verputzen" },
    zusatz: [
      { name: "Gerüst", min: 8, max: 15, beschreibung: "Gerüststellung (Auf-/Abbau + Miete)" },
    ],
    dauer_pro_einheit: "1,0–2,0h pro m²",
    hinweis: "Gesamtkosten typisch 120–200 €/m² inkl. Gerüst. Förderbar über BAFA BEG EM (15–20 %).",
  },
  "daemmung-kellerdecke": {
    name: "Kellerdecke dämmen",
    einheit: "m²",
    material: { min: 20, max: 40, beschreibung: "Dämmplatten (EPS/Mineralwolle) + Kleber/Dübel" },
    arbeit: { min: 15, max: 30, beschreibung: "Platten ankleben oder dübeln" },
    zusatz: [],
    dauer_pro_einheit: "0,3–0,5h pro m²",
    hinweis: "Eine der effektivsten und günstigsten Dämmmaßnahmen. Förderbar über BAFA.",
  },
  "elektro-komplett": {
    name: "Elektroinstallation (pro Raum, Neubau-Niveau)",
    einheit: "Raum",
    material: { min: 300, max: 600, beschreibung: "Leitungen, Dosen, Schalter, Steckdosen" },
    arbeit: { min: 500, max: 1200, beschreibung: "Schlitze stemmen, Leitungen verlegen, Anschließen" },
    zusatz: [],
    dauer_pro_einheit: "6–12h pro Raum",
    hinweis: "Stark abhängig von Ausstattungsgrad. Küche mit vielen Geräten: oberes Ende. Abstellraum: unteres Ende.",
  },
  "sanitaer-bad": {
    name: "Sanitärinstallation Bad komplett",
    einheit: "Bad",
    material: { min: 1500, max: 4000, beschreibung: "Rohre, Armaturen, WC, Waschtisch, Dusche/Wanne" },
    arbeit: { min: 2000, max: 5000, beschreibung: "Roh- und Feininstallation, Anschlüsse, Dichtheitsprüfung" },
    zusatz: [],
    dauer_pro_einheit: "3–5 Tage",
    hinweis: "Ohne Fliesen und Trockenbau. Sanitärobjekte (WC, Waschbecken) variieren extrem: 500–5.000 € je nach Hersteller.",
  },
  "heizung-waermepumpe": {
    name: "Wärmepumpe einbauen (Luft-Wasser, komplett)",
    einheit: "Stück",
    material: { min: 12000, max: 22000, beschreibung: "Wärmepumpe + Pufferspeicher + Regelung + Zubehör" },
    arbeit: { min: 5000, max: 10000, beschreibung: "Aufstellung, Anschluss, Inbetriebnahme, Hydraulischer Abgleich" },
    zusatz: [],
    dauer_pro_einheit: "3–5 Tage",
    hinweis: "Gesamtkosten typisch 20.000–35.000 €. BAFA-Förderung bis zu 70 %! Unbedingt Fördermittel-Finder nutzen.",
  },
  "terrasse-wpc": {
    name: "WPC-Terrasse bauen",
    einheit: "m²",
    material: { min: 45, max: 90, beschreibung: "WPC-Dielen + Unterkonstruktion + Schrauben + Stelzlager" },
    arbeit: { min: 40, max: 70, beschreibung: "Unterbau vorbereiten, UK montieren, Dielen verlegen" },
    zusatz: [],
    dauer_pro_einheit: "0,8–1,5h pro m²",
    hinweis: "WPC ist pflegeleichter als Holz (kein Ölen nötig). Farbauswahl ist eingeschränkter.",
  },
  "terrasse-stein": {
    name: "Terrassenplatten verlegen",
    einheit: "m²",
    material: { min: 20, max: 60, beschreibung: "Betonplatten/Naturstein + Splitt/Mörtel + Fugenmaterial" },
    arbeit: { min: 35, max: 60, beschreibung: "Unterbau verdichten, Platten verlegen, Verfugen" },
    zusatz: [
      { name: "Unterbau (Kies/Schotter)", min: 10, max: 25, beschreibung: "Frostschutzschicht + Tragschicht" },
    ],
    dauer_pro_einheit: "0,5–1,0h pro m²",
    hinweis: "Naturstein (Granit, Basalt) ist deutlich teurer als Betonplatten, aber langlebiger.",
  },
};

/* ------------------------------------------------------------------ */
/*  Cross-links                                                        */
/* ------------------------------------------------------------------ */

const RECHNER_LINKS: Record<string, { label: string; href: string }[]> = {
  "fliesen-boden": [{ label: "Material berechnen", href: "/rechner/fliesen" }],
  "fliesen-wand": [{ label: "Material berechnen", href: "/rechner/fliesen" }],
  "fliesen-bad-komplett": [{ label: "Material berechnen", href: "/rechner/fliesen" }],
  "streichen-innen": [{ label: "Material berechnen", href: "/rechner/wandfarbe" }],
  "streichen-fassade": [{ label: "Material berechnen", href: "/rechner/wandfarbe" }],
  "trockenbau-wand": [{ label: "Material berechnen", href: "/rechner/trockenbau" }],
  "trockenbau-decke": [{ label: "Material berechnen", href: "/rechner/trockenbau" }],
  "daemmung-dach": [{ label: "Förderung checken", href: "/rechner/foerdermittel" }],
  "daemmung-fassade": [{ label: "Förderung checken", href: "/rechner/foerdermittel" }],
  "daemmung-kellerdecke": [{ label: "Förderung checken", href: "/rechner/foerdermittel" }],
  "heizung-waermepumpe": [{ label: "Förderung checken", href: "/rechner/foerdermittel" }],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function range(a: number, b: number) {
  return `${fmt(a)} – ${fmt(b)}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function HandwerkerkostenRechner() {
  const [gewerkKey, setGewerkKey] = useState(GEWERKE[0].value);
  const [menge, setMenge] = useState(25);
  const [regionKey, setRegionKey] = useState("west");

  const g = PREISDATEN[gewerkKey];
  const region = REGIONEN.find((r) => r.value === regionKey)!;
  const rf = region.faktor;

  const matMin = menge * g.material.min;
  const matMax = menge * g.material.max;
  const arbMin = menge * g.arbeit.min * rf;
  const arbMax = menge * g.arbeit.max * rf;
  let zusMin = 0, zusMax = 0;
  g.zusatz.forEach((z) => { zusMin += menge * z.min; zusMax += menge * z.max; });
  const gesMin = matMin + arbMin + zusMin;
  const gesMax = matMax + arbMax + zusMax;
  const proMin = g.material.min + g.arbeit.min * rf + g.zusatz.reduce((s, z) => s + z.min, 0);
  const proMax = g.material.max + g.arbeit.max * rf + g.zusatz.reduce((s, z) => s + z.max, 0);

  const gesMid = (gesMin + gesMax) / 2;
  const matPct = gesMid > 0 ? ((matMin + matMax) / 2 / gesMid) * 100 : 0;
  const arbPct = gesMid > 0 ? ((arbMin + arbMax) / 2 / gesMid) * 100 : 0;
  const zusPct = gesMid > 0 ? ((zusMin + zusMax) / 2 / gesMid) * 100 : 0;

  const links = RECHNER_LINKS[gewerkKey] || [];

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
              { "@type": "ListItem", position: 2, name: "Rechner", item: "https://hausbau-hero.de/rechner" },
              { "@type": "ListItem", position: 3, name: "Handwerkerkosten", item: "https://hausbau-hero.de/rechner/handwerkerkosten" },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href="/rechner" className="hover:text-stone-700">Rechner</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">Handwerkerkosten</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">Handwerkerkosten-Rechner</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Was kostet dein Projekt beim Handwerker? Wähle Gewerk, Menge und Region für eine realistische Kostenspanne.
      </p>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-stone-700 mb-1">Gewerk</label>
          <select
            value={gewerkKey}
            onChange={(e) => setGewerkKey(e.target.value)}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            {GEWERKE.map((gw) => (
              <option key={gw.value} value={gw.value}>{gw.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Menge ({g.einheit})
          </label>
          <input
            type="number"
            min={1}
            max={9999}
            value={menge}
            onChange={(e) => setMenge(Math.max(1, Number(e.target.value) || 1))}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Region</label>
          <select
            value={regionKey}
            onChange={(e) => setRegionKey(e.target.value)}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            {REGIONEN.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result summary */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-5 text-center mb-6">
        <div className="text-sm font-medium text-amber-700 mb-1">Geschätzte Gesamtkosten</div>
        <div className="text-3xl font-bold text-stone-900">{range(gesMin, gesMax)} €</div>
        <div className="text-sm text-stone-600 mt-1">
          {range(proMin, proMax)} € pro {g.einheit}
        </div>
      </div>

      {/* Cost breakdown table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden mb-6">
        <div className="px-5 py-3 bg-stone-50 border-b border-stone-200">
          <h2 className="font-bold text-stone-900">
            {g.name} — {fmt(menge)} {g.einheit} — {region.label}
          </h2>
        </div>
        <div className="divide-y divide-stone-100">
          <div className="px-5 py-3 flex justify-between items-start">
            <div>
              <div className="font-medium text-stone-800">Material</div>
              <div className="text-xs text-stone-500">{g.material.beschreibung}</div>
            </div>
            <div className="text-right font-semibold text-stone-900 shrink-0 ml-4">
              {range(matMin, matMax)} €
            </div>
          </div>
          <div className="px-5 py-3 flex justify-between items-start">
            <div>
              <div className="font-medium text-stone-800">Handwerker-Arbeit</div>
              <div className="text-xs text-stone-500">{g.arbeit.beschreibung}</div>
            </div>
            <div className="text-right font-semibold text-stone-900 shrink-0 ml-4">
              {range(arbMin, arbMax)} €
            </div>
          </div>
          {g.zusatz.map((z, i) => (
            <div key={i} className="px-5 py-3 flex justify-between items-start">
              <div>
                <div className="font-medium text-stone-800">{z.name}</div>
                <div className="text-xs text-stone-500">{z.beschreibung}</div>
              </div>
              <div className="text-right font-semibold text-stone-900 shrink-0 ml-4">
                {range(menge * z.min, menge * z.max)} €
              </div>
            </div>
          ))}
          <div className="px-5 py-4 flex justify-between items-center bg-stone-50">
            <div className="font-bold text-stone-900">Gesamtkosten</div>
            <div className="text-right font-bold text-lg text-stone-900">
              {range(gesMin, gesMax)} €
            </div>
          </div>
        </div>
      </div>

      {/* Visual breakdown bar */}
      <div className="mb-6">
        <div className="text-sm font-medium text-stone-700 mb-2">Kostenverteilung (Mittelwert)</div>
        <div className="flex rounded-lg overflow-hidden h-8">
          {matPct > 0 && (
            <div className="bg-blue-400 flex items-center justify-center text-xs font-bold text-white" style={{ width: `${matPct}%` }}>
              {matPct >= 10 && `${Math.round(matPct)} %`}
            </div>
          )}
          {arbPct > 0 && (
            <div className="bg-amber-500 flex items-center justify-center text-xs font-bold text-white" style={{ width: `${arbPct}%` }}>
              {arbPct >= 10 && `${Math.round(arbPct)} %`}
            </div>
          )}
          {zusPct > 0 && (
            <div className="bg-stone-400 flex items-center justify-center text-xs font-bold text-white" style={{ width: `${zusPct}%` }}>
              {zusPct >= 10 && `${Math.round(zusPct)} %`}
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-2 text-xs text-stone-600">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-400 inline-block" /> Material</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Arbeit</span>
          {zusPct > 0 && <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-stone-400 inline-block" /> Zusatz</span>}
        </div>
      </div>

      {/* Duration */}
      <div className="bg-white border border-stone-200 rounded-lg p-4 mb-6 flex items-center gap-3">
        <span className="text-2xl">⏱</span>
        <div>
          <div className="text-sm font-medium text-stone-800">Geschätzte Dauer</div>
          <div className="text-sm text-stone-600">{g.dauer_pro_einheit}</div>
        </div>
      </div>

      {/* Hinweis */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <div className="font-bold text-stone-800 mb-1">💡 Gut zu wissen</div>
        <p className="text-stone-700 text-sm">{g.hinweis}</p>
      </div>

      {/* Cross-links */}
      {links.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-6">
          {links.map((l, i) => (
            <a
              key={i}
              href={l.href}
              className="inline-flex items-center gap-2 bg-amber-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-700 transition-colors text-sm"
            >
              {l.label} →
            </a>
          ))}
          <a
            href="/rechner/eigenleistung"
            className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors text-sm"
          >
            Eigenleistung prüfen →
          </a>
        </div>
      )}

      <RechnerHinweis text="Die angezeigten Preise sind Richtwerte auf Basis aktueller Marktdaten (2026). Handwerkerpreise variieren je nach Region, Betrieb und Auftragslage. Hole für dein Projekt immer mindestens 3 konkrete Angebote ein." />

      <FAQSection faqs={getFaqBySlug("handwerkerkosten")} rechnerName="Handwerkerkosten-Rechner" />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="text-sm font-medium text-stone-800 mb-1">📖 Ratgeber zum Thema</p>
        <a href="/finanzen/handwerkerkosten-guide" className="text-amber-600 hover:text-amber-700 font-medium text-sm">
          Was kostet ein Handwerker pro Stunde? Alle Gewerke 2026 →
        </a>
      </div>

      {/* More calculators */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Weitere Rechner</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/rechner/eigenleistung" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Eigenleistungs-Rechner</a>
          <a href="/rechner/foerdermittel" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Fördermittel-Finder</a>
          <a href="/rechner/gewerk-reihenfolge" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Gewerk-Reihenfolge</a>
          <a href="/rechner/nebenkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Nebenkosten-Rechner</a>
        </div>
      </div>

      <p className="text-xs text-stone-400 mt-8">
        Preisdaten basieren auf Durchschnittspreisen deutscher Handwerksbetriebe (Quellen: Trustlocal, Daibau, Baupreislexikon, Stand 2026).
      </p>
    </div>
  );
}

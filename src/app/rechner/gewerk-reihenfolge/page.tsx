"use client";

import { useState } from "react";
import FAQSection from "@/components/FAQSection";
import RechnerHinweis from "@/components/RechnerHinweis";
import { getFaqBySlug } from "@/lib/faq-data";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

interface Gewerk {
  nr: number;
  name: string;
  dauer: string;
  beschreibung: string;
  tipp: string | null;
  selbst_machbar: boolean;
}

interface Projekt {
  name: string;
  dauer_wochen: string;
  gewerke: Gewerk[];
}

const PROJEKTE: Record<string, Projekt> = {
  "bad-sanierung": {
    name: "Bad komplett sanieren",
    dauer_wochen: "4–8",
    gewerke: [
      { nr: 1, name: "Planung & Aufmaß", dauer: "1–2 Tage", beschreibung: "Grundriss zeichnen, Materialien auswählen, Angebote einholen. Förderantrag stellen (falls energetische Sanierung).", tipp: "Mindestens 3 Angebote einholen. Fliesen im Laden anschauen, nicht nur online.", selbst_machbar: true },
      { nr: 2, name: "Demontage & Abbruch", dauer: "1–3 Tage", beschreibung: "Alte Fliesen, Sanitärobjekte, ggf. Trockenbau entfernen. Bauschutt entsorgen.", tipp: "Container vorher bestellen (~200 €). Strom- und Wasserleitungen vorher abklemmen lassen!", selbst_machbar: true },
      { nr: 3, name: "Rohinstallation Sanitär", dauer: "1–2 Tage", beschreibung: "Wasser- und Abwasserleitungen verlegen/anpassen. Neue Anschlusspunkte für WC, Dusche, Waschbecken setzen.", tipp: "IMMER vom Fachmann machen lassen. Wasserschäden sind die teuersten Bauschäden.", selbst_machbar: false },
      { nr: 4, name: "Rohinstallation Elektro", dauer: "1 Tag", beschreibung: "Leitungen für Licht, Steckdosen, Spiegelschrank, ggf. Fußbodenheizung verlegen.", tipp: "Steckdosen-Positionen vorher genau planen (Föhn, Rasierapparat, elektrische Zahnbürste).", selbst_machbar: false },
      { nr: 5, name: "Vorwandinstallation / Trockenbau", dauer: "1–2 Tage", beschreibung: "Vorwandelemente für WC und Waschtisch montieren. Ggf. Trockenbauwände für Nischen, Ablagen.", tipp: "Vorwandelemente unbedingt auf Doppel-Gipskarton montieren wenn Fliesen draufkommen.", selbst_machbar: true },
      { nr: 6, name: "Estrich / Bodenausgleich", dauer: "1 Tag + 3–4 Wochen Trocknungszeit", beschreibung: "Falls Boden uneben oder Fußbodenheizung eingebaut wird. Fließestrich oder Ausgleichsmasse.", tipp: "Estrich muss KOMPLETT trocken sein vor dem Fliesen. CM-Messung machen lassen (< 0,5 %).", selbst_machbar: false },
      { nr: 7, name: "Abdichtung", dauer: "1 Tag", beschreibung: "Flüssigfolie oder Dichtbänder im Spritzwasserbereich (Dusche, Badewanne). Pflicht nach DIN 18534!", tipp: "Die Abdichtung ist die wichtigste Schicht im Bad. Hier NIE sparen oder pfuschen.", selbst_machbar: false },
      { nr: 8, name: "Fliesen verlegen", dauer: "3–5 Tage", beschreibung: "Boden und Wände fliesen. Erst Wände, dann Boden. Fugen nach 24h.", tipp: "Fliesen erst alle trocken auslegen zum Testen des Musters. Nivelliersystem verwenden!", selbst_machbar: true },
      { nr: 9, name: "Sanitär-Feininstallation", dauer: "1–2 Tage", beschreibung: "WC, Waschbecken, Dusche/Badewanne, Armaturen montieren und anschließen.", tipp: "Silikon an Anschlüssen großzügig aber sauber auftragen. Abdrücken lassen!", selbst_machbar: false },
      { nr: 10, name: "Elektro-Feininstallation", dauer: "0,5 Tage", beschreibung: "Steckdosen, Schalter, Spiegelschrank anschließen.", tipp: "Elektro-Abnahme vom Elektriker dokumentieren lassen.", selbst_machbar: false },
      { nr: 11, name: "Decke & Restarbeiten", dauer: "1 Tag", beschreibung: "Decke streichen oder Paneele montieren. Silikon-Fugen, Abschlussprofile, Accessoires (Handtuchhalter, Seifenspender etc.).", tipp: "Silikonfugen erst nach 48h Trocknung der Fliesenfugen machen.", selbst_machbar: true },
    ],
  },
  "kueche-einbau": {
    name: "Küche einbauen (Neubau/Rohbau)",
    dauer_wochen: "1–2",
    gewerke: [
      { nr: 1, name: "Planung & Aufmaß", dauer: "1 Tag", beschreibung: "Küche planen (IKEA, Küchenstudio), exakte Maße nehmen, Anschlüsse prüfen.", tipp: "Steckdosen-Höhen und Wasseranschluss-Position VOR der Bestellung prüfen!", selbst_machbar: true },
      { nr: 2, name: "Elektro-Vorbereitung", dauer: "0,5 Tage", beschreibung: "Herdanschluss (400V Drehstrom), ausreichend Steckdosen, Beleuchtung.", tipp: "Herdanschluss MUSS vom Elektriker gemacht werden. Mindestens 6 Steckdosen in der Küche.", selbst_machbar: false },
      { nr: 3, name: "Wasser-/Abwasseranschlüsse", dauer: "0,5 Tage", beschreibung: "Warm- und Kaltwasser, Abwasser für Spüle und ggf. Geschirrspüler prüfen/anpassen.", tipp: "Eckventile vorher prüfen — alte Ventile gehen beim Drehen gern kaputt.", selbst_machbar: false },
      { nr: 4, name: "Wand vorbereiten", dauer: "0,5 Tage", beschreibung: "Wände spachteln, streichen oder Fliesenspiegel anbringen.", tipp: "Fliesenspiegel VOR der Küchenmontage machen, wenn die Fliesen hinter den Schränken sichtbar sind.", selbst_machbar: true },
      { nr: 5, name: "Küchenmontage", dauer: "1–2 Tage", beschreibung: "Unterschränke aufstellen, Oberschränke montieren, Arbeitsplatte zuschneiden und montieren.", tipp: "Oberschränke mit langen Schrauben und Dübeln in der Wand verankern — nicht nur in Rigips!", selbst_machbar: true },
      { nr: 6, name: "Geräte einbauen & anschließen", dauer: "0,5 Tage", beschreibung: "Herd, Ofen, Geschirrspüler, Kühlschrank einbauen. Spüle und Armatur montieren.", tipp: "Geschirrspüler-Anschluss: Zulaufschlauch mit Aquastop verwenden.", selbst_machbar: true },
      { nr: 7, name: "Abnahme & Silikon", dauer: "0,5 Tage", beschreibung: "Alle Anschlüsse prüfen, Wandanschlussleisten und Silikonfugen anbringen.", tipp: "Wasser aufdrehen und 30 Min laufen lassen, auf Undichtigkeiten prüfen.", selbst_machbar: true },
    ],
  },
  dachausbau: {
    name: "Dachboden ausbauen (zum Wohnraum)",
    dauer_wochen: "6–12",
    gewerke: [
      { nr: 1, name: "Statik prüfen & Genehmigung", dauer: "2–4 Wochen", beschreibung: "Statiker beauftragen: Trägt der Dachstuhl einen Wohnraum? Baugenehmigung einholen (in den meisten Bundesländern nötig bei Nutzungsänderung).", tipp: "Ohne Statik-Gutachten NICHT anfangen. Kosten: ca. 500–1.500 €.", selbst_machbar: false },
      { nr: 2, name: "Dachfenster einbauen", dauer: "1–2 Tage pro Fenster", beschreibung: "Sparren auswechseln, Fensteröffnung herstellen, Dachfenster einbauen und abdichten.", tipp: "Vom Dachdecker machen lassen — falsch eingebaute Dachfenster sind undicht.", selbst_machbar: false },
      { nr: 3, name: "Elektro-Rohinstallation", dauer: "1–2 Tage", beschreibung: "Leitungen für Licht, Steckdosen, ggf. Netzwerk verlegen.", tipp: "Leerrohre für Netzwerk/TV mit einziehen — kostet jetzt fast nichts extra.", selbst_machbar: false },
      { nr: 4, name: "Dämmung Dachschräge", dauer: "2–4 Tage", beschreibung: "Zwischensparrendämmung + ggf. Untersparrendämmung. Dampfbremse/-sperre anbringen.", tipp: "Dampfbremse lückenlos verkleben! Jede Lücke = Tauwasser = Schimmel. Lieber einmal mehr Klebeband.", selbst_machbar: true },
      { nr: 5, name: "Trockenbau (Wände & Decke)", dauer: "3–5 Tage", beschreibung: "Dachschrägen mit Gipskarton beplanken, Drempelwände und ggf. Trennwände einziehen.", tipp: "An Dachschrägen Direktbefestiger verwenden — spart Platz gegenüber Lattenunterkonstruktion.", selbst_machbar: true },
      { nr: 6, name: "Estrich / Bodenaufbau", dauer: "1–2 Tage + Trocknung", beschreibung: "Trittschalldämmung + Trockenestrich oder Fließestrich.", tipp: "Trockenestrich-Platten sind leichter (weniger Last auf der Decke) und sofort begehbar.", selbst_machbar: true },
      { nr: 7, name: "Spachteln & Streichen", dauer: "2–3 Tage", beschreibung: "Trockenbau verspachteln (Q2-Q3), grundieren, 2x streichen.", tipp: "Dachschrägen in hellem Weiß streichen — macht den Raum optisch größer.", selbst_machbar: true },
      { nr: 8, name: "Bodenbelag verlegen", dauer: "1–2 Tage", beschreibung: "Laminat, Vinyl oder Parkett verlegen inkl. Sockelleisten.", tipp: "Unter Dachschrägen extra Verschnitt einplanen wegen der Winkel.", selbst_machbar: true },
      { nr: 9, name: "Elektro-Feininstallation", dauer: "0,5 Tage", beschreibung: "Steckdosen, Schalter, Lampen montieren und anschließen.", tipp: null, selbst_machbar: false },
      { nr: 10, name: "Einrichtung & Abnahme", dauer: "1 Tag", beschreibung: "Möbel einräumen, Endkontrolle aller Gewerke.", tipp: "Fensterfunktion prüfen, alle Steckdosen testen, auf Zugluft achten.", selbst_machbar: true },
    ],
  },
  fassadensanierung: {
    name: "Fassade dämmen und streichen",
    dauer_wochen: "3–6",
    gewerke: [
      { nr: 1, name: "Gerüst aufstellen", dauer: "1 Tag", beschreibung: "Fassadengerüst aufstellen lassen (Gerüstbauer). Mindestens umlaufend, mit Fangnetz.", tipp: "Gerüst mieten statt nur für den Anstrich: ca. 8–15 €/m² Fassadenfläche pro Monat.", selbst_machbar: false },
      { nr: 2, name: "Fassade reinigen & prüfen", dauer: "1 Tag", beschreibung: "Hochdruckreiniger, Moos/Algen entfernen, Putzschäden prüfen und ausbessern.", tipp: "Klopfprobe machen: Hohler Klang = Putz ist lose → muss runter.", selbst_machbar: true },
      { nr: 3, name: "Dämmplatten kleben & dübeln", dauer: "5–10 Tage", beschreibung: "WDVS (Wärmedämmverbundsystem): EPS- oder Mineralwolle-Platten aufkleben und verdübeln.", tipp: "Ab 2. OG ist Mineralwolle Pflicht (Brandschutz). EPS nur bis 1. OG zulässig bei WDVS.", selbst_machbar: false },
      { nr: 4, name: "Armierung & Grundputz", dauer: "3–5 Tage", beschreibung: "Armierungsgewebe in Klebemörtel einbetten. Ecken und Fensterlaibungen mit Profilen sichern.", tipp: "Fensterlaibungen werden oft vergessen — hier entstehen die meisten Wärmebrücken.", selbst_machbar: false },
      { nr: 5, name: "Oberputz / Fassadenfarbe", dauer: "2–3 Tage", beschreibung: "Oberputz (Silikonharzputz, Silikatputz) oder Fassadenfarbe in 2 Anstrichen.", tipp: "Silikonharzputz ist selbstreinigend (Lotuseffekt) — lohnt sich auf Nordseiten.", selbst_machbar: true },
      { nr: 6, name: "Gerüst abbauen & Aufräumen", dauer: "1 Tag", beschreibung: "Gerüst abbauen, Fassade final kontrollieren, Außenanlagen wiederherstellen.", tipp: "Vorher Fotos der fertigen Fassade machen — für Förderantrag-Nachweis und Gewährleistung.", selbst_machbar: false },
    ],
  },
  "keller-abdichten": {
    name: "Keller abdichten / Drainage erneuern",
    dauer_wochen: "3–6",
    gewerke: [
      { nr: 1, name: "Bestandsaufnahme & Schadensanalyse", dauer: "1–2 Tage", beschreibung: "Ursache der Feuchtigkeit klären: Drückendes Grundwasser, aufsteigende Feuchte, oder defekte Drainage?", tipp: "Sachverständigen beauftragen (ca. 500–1.000 €). Falsche Diagnose = falsche Maßnahme = Geld verbrannt.", selbst_machbar: false },
      { nr: 2, name: "Erdarbeiten / Freilegung", dauer: "3–5 Tage", beschreibung: "Erdreich um den Keller ausheben bis Fundamentunterkante. Abschnittsweise arbeiten!", tipp: "Minibagger mieten (~150 €/Tag) statt per Hand schaufeln. Aushub zwischenlagern für Wiederverfüllung.", selbst_machbar: true },
      { nr: 3, name: "Alte Abdichtung entfernen & Wand reinigen", dauer: "1–2 Tage", beschreibung: "Alte Bitumenbahnen oder Anstriche entfernen. Wand trocknen lassen.", tipp: "Hochdruckreiniger verwenden und mindestens 2 Tage trocknen lassen.", selbst_machbar: true },
      { nr: 4, name: "Neue Abdichtung aufbringen", dauer: "2–3 Tage", beschreibung: "Bitumen-Dickbeschichtung (2-lagig), Schweißbahnen oder KMB-Beschichtung. Perimeterdämmung aufkleben.", tipp: "KMB (Kunststoff-modifizierte Bitumen-Dickbeschichtung) ist Standard. Mindestens 2 Lagen, nahtfrei.", selbst_machbar: false },
      { nr: 5, name: "Drainage verlegen", dauer: "1–2 Tage", beschreibung: "Drainagerohr mit Gefälle (mind. 0,5 %) verlegen, Filtervlies, Kiespackung. Kontrollschächte setzen.", tipp: "Kontrollschächte an jeder Ecke — sonst kann die Drainage nie gespült werden.", selbst_machbar: true },
      { nr: 6, name: "Wiederverfüllung", dauer: "1–2 Tage", beschreibung: "Erdreich lagenweise verdichten und wieder anfüllen.", tipp: "Nicht den alten lehmigen Boden direkt an die Wand — erst Kies/Schotter als Filterpackung.", selbst_machbar: true },
    ],
  },
};

const PROJEKT_KEYS = Object.keys(PROJEKTE);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function GewerkReihenfolgePage() {
  const [projektKey, setProjektKey] = useState(PROJEKT_KEYS[0]);
  const projekt = PROJEKTE[projektKey];

  const eigenleistungCount = projekt.gewerke.filter((g) => g.selbst_machbar).length;
  const fachmannCount = projekt.gewerke.length - eigenleistungCount;

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: `${projekt.name} — Gewerk-Reihenfolge`,
            description: `Die richtige Reihenfolge der Gewerke für: ${projekt.name}`,
            totalTime: `P${projekt.dauer_wochen.replace("–", "/")}W`,
            step: projekt.gewerke.map((g) => ({
              "@type": "HowToStep",
              position: g.nr,
              name: g.name,
              text: g.beschreibung,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
              { "@type": "ListItem", position: 2, name: "Rechner", item: "https://hausbau-hero.de/rechner" },
              { "@type": "ListItem", position: 3, name: "Gewerk-Reihenfolge", item: "https://hausbau-hero.de/rechner/gewerk-reihenfolge" },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href="/rechner" className="hover:text-stone-700">Rechner</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">Gewerk-Reihenfolge</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">Gewerk-Reihenfolge</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        In welcher Reihenfolge musst du die Handwerker beauftragen? Wähle dein Projekt und erhalte den kompletten Ablaufplan.
      </p>

      {/* Project selector */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-stone-700 mb-1">Projekt-Typ</label>
        <select
          value={projektKey}
          onChange={(e) => setProjektKey(e.target.value)}
          className="w-full sm:w-96 px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 text-lg"
        >
          {PROJEKT_KEYS.map((k) => (
            <option key={k} value={k}>{PROJEKTE[k].name}</option>
          ))}
        </select>
      </div>

      {/* Project summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">Gesamtdauer</div>
          <div className="text-lg font-bold text-stone-900">{projekt.dauer_wochen} Wochen</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">Gewerke / Schritte</div>
          <div className="text-lg font-bold text-stone-900">{projekt.gewerke.length}</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">Eigenleistung möglich</div>
          <div className="text-lg font-bold text-stone-900">
            <span className="text-green-700">{eigenleistungCount}</span>
            <span className="text-stone-400 mx-1">/</span>
            <span className="text-amber-700">{fachmannCount}</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {projekt.gewerke.map((g, i) => {
          const isLast = i === projekt.gewerke.length - 1;
          return (
            <div key={`${projektKey}-${g.nr}`} className="relative flex gap-4 sm:gap-6 pb-8">
              {/* Timeline line + badge */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 z-10 ${
                    g.selbst_machbar
                      ? "bg-green-50 border-green-400 text-green-700"
                      : "bg-amber-50 border-amber-400 text-amber-700"
                  }`}
                >
                  {g.nr}
                </div>
                {!isLast && (
                  <div className="w-0.5 flex-1 bg-stone-200 mt-1" />
                )}
              </div>

              {/* Card */}
              <div className="flex-1 bg-white border border-stone-200 rounded-xl p-5 shadow-sm min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-stone-900">{g.name}</h3>
                  <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-full shrink-0">
                    {g.dauer}
                  </span>
                </div>

                <p className="text-sm text-stone-600 mb-3">{g.beschreibung}</p>

                {g.tipp && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                    <span className="text-sm text-stone-700">
                      <strong className="text-amber-800">💡 Tipp:</strong> {g.tipp}
                    </span>
                  </div>
                )}

                <span
                  className={`inline-block text-xs font-bold px-3 py-1 rounded-full ${
                    g.selbst_machbar
                      ? "bg-green-100 text-green-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {g.selbst_machbar ? "✅ Eigenleistung möglich" : "👷 Fachmann empfohlen"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <RechnerHinweis text="Die dargestellte Reihenfolge ist ein typischer Ablaufplan. Je nach Bauweise, Witterung und Verfügbarkeit der Handwerker kann die tatsächliche Reihenfolge abweichen. Stimme den Ablauf immer mit deinem Bauleiter oder Architekten ab." />

      <FAQSection faqs={getFaqBySlug("gewerk-reihenfolge")} rechnerName="Gewerk-Reihenfolge" />

      {/* More calculators */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Weitere Rechner</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/rechner/eigenleistung" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Eigenleistungs-Rechner</a>
          <a href="/rechner/foerdermittel" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Fördermittel-Finder</a>
          <a href="/rechner/nebenkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Nebenkosten-Rechner</a>
          <a href="/rechner/fliesen" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Fliesen-Rechner</a>
        </div>
      </div>
    </div>
  );
}

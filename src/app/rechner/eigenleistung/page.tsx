"use client";

import { useState } from "react";
import FAQSection from "@/components/FAQSection";
import RechnerHinweis from "@/components/RechnerHinweis";
import { getFaqBySlug } from "@/lib/faq-data";

type Region = "nord" | "sued" | "ost" | "west";
type Schwierigkeit = "einfach" | "mittel" | "schwer";
interface MinMax { min: number; max: number; }

interface Gewerk {
  name: string;
  material_pro_m2: MinMax;
  arbeit_pro_m2: MinMax;
  region_faktor: Record<Region, number>;
  zeitaufwand_h_pro_m2: MinMax;
  schwierigkeit: Schwierigkeit;
  tipp: string;
  rechner_link: string | null;
  hinweis: string;
}

const GEWERKE: Record<string, Gewerk> = {
  "bad-fliesen": {
    name: "Bad fliesen (Boden + Wände)",
    material_pro_m2: { min: 25, max: 60 },
    arbeit_pro_m2: { min: 50, max: 80 },
    region_faktor: { nord: 0.9, sued: 1.15, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 2, max: 3.5 },
    schwierigkeit: "mittel",
    tipp: "Fliesen verlegen ist machbar, aber Fehler sind teuer. Investiere in ein gutes Nivelliersystem. Großformatige Fliesen (60×60 und größer) sind schwieriger zu verlegen und kosten beim Handwerker 10–20 % Aufpreis.",
    rechner_link: "/rechner/fliesen",
    hinweis: "Preise für Standardfliesen (30×60 cm). Naturstein, Mosaik oder Großformat können deutlich teurer sein.",
  },
  "waende-streichen": {
    name: "Wände streichen",
    material_pro_m2: { min: 2, max: 5 },
    arbeit_pro_m2: { min: 8, max: 15 },
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 0.2, max: 0.4 },
    schwierigkeit: "einfach",
    tipp: "Streichen ist das einfachste Gewerk für Eigenleistung. Investiere in gute Farbe (Alpina, Caparol) und ein ordentliches Roller-Set. 2 Anstriche einplanen.",
    rechner_link: "/rechner/wandfarbe",
    hinweis: "Preis für normales Streichen mit Dispersionsfarbe, inkl. Abkleben. Spachteln/Grundieren extra.",
  },
  "laminat-verlegen": {
    name: "Laminat/Parkett verlegen",
    material_pro_m2: { min: 15, max: 45 },
    arbeit_pro_m2: { min: 20, max: 35 },
    region_faktor: { nord: 0.9, sued: 1.15, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 0.5, max: 1.0 },
    schwierigkeit: "einfach",
    tipp: "Klick-Laminat ist auch für Anfänger gut machbar. Trittschalldämmung nicht vergessen. Randabstand 8–10 mm einhalten.",
    rechner_link: null,
    hinweis: "Preise für Klick-Laminat/Vinyl. Massivparkett mit Verkleben ist deutlich teurer (80–120 €/m² inkl. Arbeit).",
  },
  tapezieren: {
    name: "Tapezieren",
    material_pro_m2: { min: 3, max: 8 },
    arbeit_pro_m2: { min: 10, max: 20 },
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 0.3, max: 0.6 },
    schwierigkeit: "einfach",
    tipp: "Rauhfaser ist einfach, Mustertapeten brauchen Übung wegen Rapport. Immer von der Lichtquelle (Fenster) weg arbeiten.",
    rechner_link: null,
    hinweis: "Preis für Rauhfaser. Vliestapeten oder Designtapeten kosten beim Material 10–30 €/Rolle mehr.",
  },
  trockenbau: {
    name: "Trockenbau/Rigips-Wand einziehen",
    material_pro_m2: { min: 15, max: 30 },
    arbeit_pro_m2: { min: 40, max: 75 },
    region_faktor: { nord: 0.9, sued: 1.15, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 1.0, max: 2.0 },
    schwierigkeit: "mittel",
    tipp: "Profile exakt ausrichten ist der Schlüssel. Ein Kreuzlinienlaser spart enorm Zeit. Spachtelqualität Q2 reicht unter Tapete, Q3 für Anstrich.",
    rechner_link: "/rechner/trockenbau",
    hinweis: "Einfache Trennwand mit Einfachständerwerk und einseitig beplankt. Doppelbeplankung, Schallschutz oder Brandschutz teurer.",
  },
  "bad-komplett": {
    name: "Badezimmer komplett sanieren",
    material_pro_m2: { min: 150, max: 300 },
    arbeit_pro_m2: { min: 250, max: 500 },
    region_faktor: { nord: 0.9, sued: 1.2, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 6, max: 12 },
    schwierigkeit: "schwer",
    tipp: "Sanitärinstallation und Abdichtung (Flüssigfolie) MÜSSEN vom Fachmann gemacht werden — sonst drohen Wasserschäden. Fliesen und Trockenbau kannst du selbst machen.",
    rechner_link: "/rechner/fliesen",
    hinweis: "Komplettsanierung inkl. Demontage, Sanitär, Fliesen, Trockenbau. Ohne neue Sanitärobjekte (WC, Waschbecken, Dusche).",
  },
  "kueche-montieren": {
    name: "Küche montieren (ohne Elektro/Wasser)",
    material_pro_m2: { min: 0, max: 0 },
    arbeit_pro_m2: { min: 60, max: 100 },
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.85, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 2, max: 4 },
    schwierigkeit: "mittel",
    tipp: "Oberschränke exakt ausrichten und mit ausreichend langen Schrauben befestigen. Wasser- und Elektroanschlüsse sind Profi-Sache.",
    rechner_link: null,
    hinweis: "Reine Möbelmontage. Elektro- und Wasseranschlüsse separat vom Fachmann.",
  },
  terrasse: {
    name: "Terrasse bauen (Holz/WPC)",
    material_pro_m2: { min: 45, max: 90 },
    arbeit_pro_m2: { min: 40, max: 70 },
    region_faktor: { nord: 0.9, sued: 1.15, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 1.5, max: 2.5 },
    schwierigkeit: "mittel",
    tipp: "Unterkonstruktion ist der wichtigste Teil — hier nicht sparen. Stelzlager erleichtern die Ausrichtung enorm. WPC ist pflegeleichter als Holz.",
    rechner_link: null,
    hinweis: "WPC-Dielen auf Stelzlagern. Holzterrasse auf Beton-Fundament ist teurer.",
  },
  "fassade-streichen": {
    name: "Fassade streichen",
    material_pro_m2: { min: 5, max: 12 },
    arbeit_pro_m2: { min: 18, max: 30 },
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 0.3, max: 0.6 },
    schwierigkeit: "mittel",
    tipp: "Gerüst mieten (~150–250 €/Woche) statt Leiter — viel sicherer und schneller. Fassade vorher mit Hochdruckreiniger säubern.",
    rechner_link: "/rechner/wandfarbe",
    hinweis: "Ohne Gerüstkosten. Gerüst separat einrechnen (~8–12 €/m² Fassadenfläche).",
  },
  "dachboden-daemmen": {
    name: "Oberste Geschossdecke dämmen",
    material_pro_m2: { min: 25, max: 50 },
    arbeit_pro_m2: { min: 30, max: 50 },
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: { min: 0.5, max: 1.0 },
    schwierigkeit: "einfach",
    tipp: "Oberste Geschossdecke dämmen hat den besten ROI im ganzen Haus — einfach und riesen Effekt auf die Heizkosten. Dampfsperre nicht vergessen!",
    rechner_link: null,
    hinweis: "Begehbare Dämmung mit Mineralwolle und OSB-Platten. Dachschrägen-Dämmung ist aufwändiger.",
  },
};

const GEWERK_KEYS = Object.keys(GEWERKE);

const REGIONEN: { key: Region; label: string }[] = [
  { key: "west", label: "West" },
  { key: "sued", label: "Süd" },
  { key: "nord", label: "Nord" },
  { key: "ost", label: "Ost" },
];

const SCHWIERIGKEIT_META: Record<Schwierigkeit, { label: string; sub: string; bg: string; text: string }> = {
  einfach: { label: "Einfach", sub: "Auch für Anfänger geeignet", bg: "bg-green-100", text: "text-green-800" },
  mittel: { label: "Mittel", sub: "Handwerkliche Grundkenntnisse empfohlen", bg: "bg-amber-100", text: "text-amber-800" },
  schwer: { label: "Schwer", sub: "Nur mit Erfahrung — Teilgewerke an Fachmann vergeben", bg: "bg-red-100", text: "text-red-800" },
};

function fmt(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function range(a: number, b: number) {
  if (a === b) return fmt(a);
  return `${fmt(a)} – ${fmt(b)}`;
}

export default function EigenleistungRechner() {
  const [gewerkKey, setGewerkKey] = useState(GEWERK_KEYS[0]);
  const [flaeche, setFlaeche] = useState(15);
  const [region, setRegion] = useState<Region>("west");

  const g = GEWERKE[gewerkKey];
  const rf = g.region_faktor[region];
  const s = SCHWIERIGKEIT_META[g.schwierigkeit];

  const matMin = flaeche * g.material_pro_m2.min;
  const matMax = flaeche * g.material_pro_m2.max;
  const hwMin = flaeche * (g.material_pro_m2.min + g.arbeit_pro_m2.min) * rf;
  const hwMax = flaeche * (g.material_pro_m2.max + g.arbeit_pro_m2.max) * rf;
  const sparMin = Math.max(0, hwMin - matMax);
  const sparMax = hwMax - matMin;
  const sparProzMin = hwMax > 0 ? (sparMin / hwMax) * 100 : 0;
  const sparProzMax = hwMin > 0 ? (sparMax / hwMin) * 100 : 0;

  const zeitMin = flaeche * g.zeitaufwand_h_pro_m2.min;
  const zeitMax = flaeche * g.zeitaufwand_h_pro_m2.max;
  const zeitMittel = (zeitMin + zeitMax) / 2;
  const sparMittel = (sparMin + sparMax) / 2;
  const stundenlohn = zeitMittel > 0 ? sparMittel / zeitMittel : 0;

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Eigenleistungs-Rechner",
            description: "Berechne wie viel du sparst wenn du Renovierungsarbeiten selbst machst statt einen Handwerker zu beauftragen.",
            url: "https://hausbau-hero.de/rechner/eigenleistung",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
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
              { "@type": "ListItem", position: 3, name: "Eigenleistung", item: "https://hausbau-hero.de/rechner/eigenleistung" },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href="/rechner" className="hover:text-stone-700">Rechner</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">Eigenleistung</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">Eigenleistungs-Rechner</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Selbst machen oder Handwerker beauftragen? Finde heraus wie viel du sparst — und ob es sich lohnt.
      </p>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Gewerk</label>
          <select
            value={gewerkKey}
            onChange={(e) => setGewerkKey(e.target.value)}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            {GEWERK_KEYS.map((k) => (
              <option key={k} value={k}>{GEWERKE[k].name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Fläche (m²)</label>
          <input
            type="number"
            min={1}
            max={999}
            value={flaeche}
            onChange={(e) => setFlaeche(Math.max(1, Number(e.target.value) || 1))}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as Region)}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            {REGIONEN.map((r) => (
              <option key={r.key} value={r.key}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Three result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-stone-200 rounded-xl p-5 text-center">
          <div className="text-sm font-medium text-stone-500 mb-2">🔧 Selbst machen</div>
          <div className="text-2xl font-bold text-stone-900">{range(matMin, matMax)} €</div>
          <div className="text-xs text-stone-400 mt-1">nur Material</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5 text-center">
          <div className="text-sm font-medium text-stone-500 mb-2">👷 Handwerker</div>
          <div className="text-2xl font-bold text-stone-900">{range(hwMin, hwMax)} €</div>
          <div className="text-xs text-stone-400 mt-1">Material + Arbeit</div>
        </div>
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5 text-center">
          <div className="text-sm font-medium text-green-700 mb-2">💰 Du sparst</div>
          <div className="text-2xl font-bold text-green-700">{range(sparMin, sparMax)} €</div>
          <div className="text-xs text-green-600 mt-1">ca. {fmt(sparProzMin)} – {fmt(sparProzMax)} %</div>
        </div>
      </div>

      {/* Details row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-stone-200 rounded-lg p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">⏱ Zeitaufwand</div>
          <div className="text-lg font-bold text-stone-900">{range(zeitMin, zeitMax)} Std.</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">💰 Dein Stundenlohn</div>
          <div className="text-lg font-bold text-amber-700">ca. {fmt(stundenlohn)} €/h</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">Schwierigkeit</div>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${s.bg} ${s.text}`}>{s.label}</span>
          <div className="text-xs text-stone-500 mt-1.5">{s.sub}</div>
        </div>
      </div>

      {/* Tipp */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <div className="font-bold text-stone-800 mb-1">💡 Tipp</div>
        <p className="text-stone-700 text-sm">{g.tipp}</p>
        {g.rechner_link && (
          <a
            href={g.rechner_link}
            className="inline-flex items-center gap-2 mt-4 bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors text-sm"
          >
            Material im Detail berechnen →
          </a>
        )}
      </div>

      {/* Gewerk-spezifischer Hinweis */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-6 text-sm text-stone-600">
        <strong className="text-stone-700">Zu diesem Gewerk:</strong>{" "}
        {g.hinweis}
      </div>

      <RechnerHinweis text="Die Einsparungen sind Schätzungen auf Basis typischer Handwerkerpreise. Dein tatsächliches Sparpotenzial hängt von deinen handwerklichen Fähigkeiten und dem Zeitaufwand ab. Banken erkennen Eigenleistung nur im Rahmen einer individuellen Prüfung an." />

      <FAQSection faqs={getFaqBySlug("eigenleistung")} rechnerName="Eigenleistungs-Rechner" />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="text-sm font-medium text-stone-800 mb-1">📖 Ratgeber zum Thema</p>
        <a href="/finanzen/eigenleistung-hausbau" className="text-amber-600 hover:text-amber-700 font-medium text-sm">
          Eigenleistung beim Hausbau — was lohnt sich wirklich? →
        </a>
      </div>

      {/* More calculators */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Weitere Rechner</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/rechner/handwerkerkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Handwerkerkosten-Rechner</a>
          <a href="/rechner/nebenkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Nebenkosten-Rechner</a>
          <a href="/rechner/foerdermittel" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Fördermittel-Finder</a>
          <a href="/rechner/trockenbau" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Trockenbau-Rechner</a>
        </div>
      </div>

      <p className="text-xs text-stone-400 mt-8">
        Preisdaten basieren auf Durchschnittspreisen deutscher Handwerksbetriebe (Quellen: Trustlocal, Daibau, Baupreislexikon, Stand 2026).
        Die tatsächlichen Kosten können je nach Projektumfang, Untergrund, Material und regionaler Marktlage abweichen.
      </p>
    </div>
  );
}

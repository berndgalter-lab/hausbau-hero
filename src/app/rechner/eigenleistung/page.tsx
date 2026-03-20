"use client";

import { useState } from "react";

type Region = "nord" | "sued" | "ost" | "west";
type Schwierigkeit = "einfach" | "mittel" | "schwer";

interface Gewerk {
  name: string;
  material_pro_m2: number;
  arbeit_pro_m2: number;
  region_faktor: Record<Region, number>;
  zeitaufwand_h_pro_m2: number;
  schwierigkeit: Schwierigkeit;
  tipp: string;
  rechner_link: string | null;
}

const GEWERKE: Record<string, Gewerk> = {
  "bad-fliesen": {
    name: "Bad fliesen (Boden + Wände)",
    material_pro_m2: 45,
    arbeit_pro_m2: 65,
    region_faktor: { nord: 0.9, sued: 1.15, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 2.5,
    schwierigkeit: "mittel",
    tipp: "Fliesen verlegen ist machbar, aber Fehler sind teuer. Investiere in ein gutes Nivelliersystem.",
    rechner_link: "/rechner/fliesen",
  },
  "waende-streichen": {
    name: "Wände streichen",
    material_pro_m2: 3.5,
    arbeit_pro_m2: 12,
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 0.3,
    schwierigkeit: "einfach",
    tipp: "Streichen ist das einfachste Gewerk für Eigenleistung. Investiere in gute Farbe und Werkzeug.",
    rechner_link: "/rechner/wandfarbe",
  },
  "laminat-verlegen": {
    name: "Laminat/Parkett verlegen",
    material_pro_m2: 28,
    arbeit_pro_m2: 25,
    region_faktor: { nord: 0.9, sued: 1.15, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 0.8,
    schwierigkeit: "einfach",
    tipp: "Klick-Laminat ist auch für Anfänger gut machbar. Die Trittschalldämmung nicht vergessen!",
    rechner_link: null,
  },
  tapezieren: {
    name: "Tapezieren",
    material_pro_m2: 5,
    arbeit_pro_m2: 15,
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 0.5,
    schwierigkeit: "einfach",
    tipp: "Rauhfaser ist einfach, Mustertapeten brauchen Übung. Immer von der Lichtquelle weg arbeiten.",
    rechner_link: null,
  },
  trockenbau: {
    name: "Trockenbau/Rigips-Wand",
    material_pro_m2: 22,
    arbeit_pro_m2: 45,
    region_faktor: { nord: 0.9, sued: 1.15, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 1.5,
    schwierigkeit: "mittel",
    tipp: "Profile exakt ausrichten ist der Schlüssel. Investiere in einen guten Laser.",
    rechner_link: "/rechner/trockenbau",
  },
  "bad-komplett": {
    name: "Badezimmer komplett sanieren",
    material_pro_m2: 180,
    arbeit_pro_m2: 350,
    region_faktor: { nord: 0.9, sued: 1.2, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 8,
    schwierigkeit: "schwer",
    tipp: "Sanitärinstallation und Abdichtung sollte ein Fachmann machen. Fliesen und Trockenbau kannst du selbst.",
    rechner_link: "/rechner/fliesen",
  },
  "kueche-montieren": {
    name: "Küche montieren",
    material_pro_m2: 0,
    arbeit_pro_m2: 80,
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.85, west: 1.0 },
    zeitaufwand_h_pro_m2: 3,
    schwierigkeit: "mittel",
    tipp: "Schränke aufhängen ist machbar, aber Wasser- und Elektroanschlüsse sind Profi-Sache.",
    rechner_link: null,
  },
  terrasse: {
    name: "Terrasse bauen (Holz/WPC)",
    material_pro_m2: 65,
    arbeit_pro_m2: 55,
    region_faktor: { nord: 0.9, sued: 1.15, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 2,
    schwierigkeit: "mittel",
    tipp: "Unterkonstruktion ist der wichtigste Teil. Hier nicht sparen, sonst sackt alles ab.",
    rechner_link: null,
  },
  "fassade-streichen": {
    name: "Fassade streichen",
    material_pro_m2: 8,
    arbeit_pro_m2: 22,
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 0.5,
    schwierigkeit: "mittel",
    tipp: "Gerüst mieten (~150 €/Woche) statt Leiter. Viel sicherer und schneller.",
    rechner_link: "/rechner/wandfarbe",
  },
  "dachboden-daemmen": {
    name: "Dachboden dämmen",
    material_pro_m2: 35,
    arbeit_pro_m2: 40,
    region_faktor: { nord: 0.9, sued: 1.1, ost: 0.8, west: 1.0 },
    zeitaufwand_h_pro_m2: 1,
    schwierigkeit: "einfach",
    tipp: "Oberste Geschossdecke dämmen ist der beste ROI im ganzen Haus. Einfach und riesen Effekt.",
    rechner_link: null,
  },
};

const GEWERK_KEYS = Object.keys(GEWERKE);

const REGIONEN: { key: Region; label: string }[] = [
  { key: "west", label: "West" },
  { key: "sued", label: "Süd" },
  { key: "nord", label: "Nord" },
  { key: "ost", label: "Ost" },
];

const SCHWIERIGKEIT_STYLE: Record<Schwierigkeit, { label: string; bg: string; text: string }> = {
  einfach: { label: "Einfach", bg: "bg-green-100", text: "text-green-800" },
  mittel: { label: "Mittel", bg: "bg-amber-100", text: "text-amber-800" },
  schwer: { label: "Schwer", bg: "bg-red-100", text: "text-red-800" },
};

function fmt(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtDec(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function EigenleistungRechner() {
  const [gewerkKey, setGewerkKey] = useState(GEWERK_KEYS[0]);
  const [flaeche, setFlaeche] = useState(15);
  const [region, setRegion] = useState<Region>("west");

  const g = GEWERKE[gewerkKey];
  const faktor = g.region_faktor[region];
  const s = SCHWIERIGKEIT_STYLE[g.schwierigkeit];

  const kostenMaterial = flaeche * g.material_pro_m2;
  const kostenHandwerker = flaeche * (g.material_pro_m2 + g.arbeit_pro_m2) * faktor;
  const ersparnis = kostenHandwerker - kostenMaterial;
  const ersparnisProz = kostenHandwerker > 0 ? (ersparnis / kostenHandwerker) * 100 : 0;
  const zeitaufwand = flaeche * g.zeitaufwand_h_pro_m2;
  const stundenlohn = zeitaufwand > 0 ? ersparnis / zeitaufwand : 0;

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-stone-200 rounded-xl p-5 text-center">
          <div className="text-sm font-medium text-stone-500 mb-1">Selbst machen</div>
          <div className="text-2xl font-bold text-stone-900">{fmt(kostenMaterial)} €</div>
          <div className="text-xs text-stone-400 mt-1">nur Material</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-xl p-5 text-center">
          <div className="text-sm font-medium text-stone-500 mb-1">Handwerker</div>
          <div className="text-2xl font-bold text-stone-900">{fmt(kostenHandwerker)} €</div>
          <div className="text-xs text-stone-400 mt-1">Material + Arbeit</div>
        </div>
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5 text-center">
          <div className="text-sm font-medium text-green-700 mb-1">Du sparst</div>
          <div className="text-2xl font-bold text-green-700">{fmt(ersparnis)} €</div>
          <div className="text-xs text-green-600 mt-1">{fmt(ersparnisProz)} % der Handwerkerkosten</div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white border border-stone-200 rounded-lg p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">Zeitaufwand</div>
          <div className="text-lg font-bold text-stone-900">ca. {fmt(zeitaufwand)} Std.</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">Dein Stundenlohn</div>
          <div className="text-lg font-bold text-amber-700">{fmtDec(stundenlohn)} €/h</div>
        </div>
        <div className="bg-white border border-stone-200 rounded-lg p-4 text-center">
          <div className="text-xs text-stone-500 mb-1">Schwierigkeit</div>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-bold ${s.bg} ${s.text}`}>
            {s.label}
          </span>
        </div>
      </div>

      {/* Tipp */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-8">
        <div className="font-bold text-stone-800 mb-1">💡 Tipp</div>
        <p className="text-stone-700 text-sm">{g.tipp}</p>
        {g.rechner_link && (
          <a
            href={g.rechner_link}
            className="inline-block mt-3 text-sm font-medium text-amber-700 hover:text-amber-800 hover:underline"
          >
            Material im Detail berechnen →
          </a>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-8 text-sm text-stone-600">
        <strong className="text-stone-800">Hinweis:</strong>{" "}
        Die Handwerkerkosten sind Durchschnittswerte für Deutschland (Stand 2026) und variieren je nach Region, Saison und Auftragslage. Für verbindliche Angebote empfehlen wir, mindestens 3 Handwerker-Angebote einzuholen.
      </div>

      {/* More calculators */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Weitere Rechner</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/rechner/nebenkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Nebenkosten-Rechner</a>
          <a href="/rechner/wandfarbe" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Wandfarbe-Rechner</a>
          <a href="/rechner/fliesen" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Fliesen-Rechner</a>
          <a href="/rechner/trockenbau" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Trockenbau-Rechner</a>
        </div>
      </div>
    </div>
  );
}

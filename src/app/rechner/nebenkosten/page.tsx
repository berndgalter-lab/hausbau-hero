"use client";

import { useState } from "react";
import FAQSection from "@/components/FAQSection";
import { getFaqBySlug } from "@/lib/faq-data";

const BUNDESLAENDER = [
  { name: "Baden-Württemberg", satz: 5.0 },
  { name: "Bayern", satz: 3.5 },
  { name: "Berlin", satz: 6.0 },
  { name: "Brandenburg", satz: 6.5 },
  { name: "Bremen", satz: 5.5 },
  { name: "Hamburg", satz: 5.5 },
  { name: "Hessen", satz: 6.0 },
  { name: "Mecklenburg-Vorpommern", satz: 6.0 },
  { name: "Niedersachsen", satz: 5.0 },
  { name: "Nordrhein-Westfalen", satz: 6.5 },
  { name: "Rheinland-Pfalz", satz: 5.0 },
  { name: "Saarland", satz: 6.5 },
  { name: "Sachsen", satz: 5.5 },
  { name: "Sachsen-Anhalt", satz: 5.0 },
  { name: "Schleswig-Holstein", satz: 6.5 },
  { name: "Thüringen", satz: 5.0 },
];

const MAKLER_OPTIONS = [
  { label: "3,57 % (Standard)", satz: 3.57 },
  { label: "2,38 %", satz: 2.38 },
  { label: "Kein Makler (0 %)", satz: 0 },
];

const NOTAR_SATZ = 1.5;
const GRUNDBUCH_SATZ = 0.5;

function fmt(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtPercent(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 2 });
}

export default function NebenkostenRechner() {
  const [kaufpreis, setKaufpreis] = useState(350000);
  const [kaufpreisText, setKaufpreisText] = useState("350.000");
  const [blIdx, setBlIdx] = useState(0);
  const [mitMakler, setMitMakler] = useState(true);
  const [maklerIdx, setMaklerIdx] = useState(0);

  const bl = BUNDESLAENDER[blIdx];
  const maklerSatz = mitMakler ? MAKLER_OPTIONS[maklerIdx].satz : 0;

  const grunderwerbsteuer = kaufpreis * (bl.satz / 100);
  const notar = kaufpreis * (NOTAR_SATZ / 100);
  const grundbuch = kaufpreis * (GRUNDBUCH_SATZ / 100);
  const makler = kaufpreis * (maklerSatz / 100);
  const nebenkostenGesamt = grunderwerbsteuer + notar + grundbuch + makler;
  const gesamtkosten = kaufpreis + nebenkostenGesamt;

  const posten = [
    { label: `Grunderwerbsteuer (${fmtPercent(bl.satz)} %)`, betrag: grunderwerbsteuer, color: "#d97706" },
    { label: `Notar (${fmtPercent(NOTAR_SATZ)} %)`, betrag: notar, color: "#78716c" },
    { label: `Grundbuch (${fmtPercent(GRUNDBUCH_SATZ)} %)`, betrag: grundbuch, color: "#a8a29e" },
  ];
  if (maklerSatz > 0) {
    posten.push({ label: `Makler (${fmtPercent(maklerSatz)} %)`, betrag: makler, color: "#0ea5e9" });
  }

  function handleKaufpreisChange(raw: string) {
    const cleaned = raw.replace(/\D/g, "");
    const num = parseInt(cleaned, 10) || 0;
    setKaufpreis(num);
    setKaufpreisText(num > 0 ? fmt(num) : "");
  }

  // Donut chart
  const radius = 60;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * radius;
  let cumulativeOffset = 0;
  const segments = posten.map((p) => {
    const fraction = nebenkostenGesamt > 0 ? p.betrag / nebenkostenGesamt : 0;
    const dashArray = fraction * circumference;
    const dashOffset = -cumulativeOffset;
    cumulativeOffset += dashArray;
    return { ...p, dashArray, dashOffset, fraction };
  });

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Nebenkosten-Rechner",
            description: "Berechne die Kaufnebenkosten für deine Immobilie — Grunderwerbsteuer, Notar, Grundbuch, Makler.",
            url: "https://hausbau-hero.de/rechner/nebenkosten",
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
              { "@type": "ListItem", position: 3, name: "Nebenkosten", item: "https://hausbau-hero.de/rechner/nebenkosten" },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href="/rechner" className="hover:text-stone-700">Rechner</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">Nebenkosten</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">Nebenkosten-Rechner</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Berechne die Kaufnebenkosten für deine Immobilie — Grunderwerbsteuer nach Bundesland, Notar, Grundbuch und Makler.
      </p>

      {/* Input section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Kaufpreis (€)</label>
            <input
              type="text"
              inputMode="numeric"
              value={kaufpreisText}
              onChange={(e) => handleKaufpreisChange(e.target.value)}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              placeholder="350.000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Bundesland</label>
            <select
              value={blIdx}
              onChange={(e) => setBlIdx(Number(e.target.value))}
              className="w-full px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
            >
              {BUNDESLAENDER.map((b, i) => (
                <option key={b.name} value={i}>
                  {b.name} ({fmtPercent(b.satz)} %)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <span className="text-sm font-medium text-stone-700">Makler einrechnen?</span>
              <button
                type="button"
                role="switch"
                aria-checked={mitMakler}
                onClick={() => setMitMakler(!mitMakler)}
                className={`relative w-11 h-6 rounded-full transition-colors ${mitMakler ? "bg-amber-500" : "bg-stone-300"}`}
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${mitMakler ? "translate-x-5" : ""}`} />
              </button>
            </label>
            {mitMakler && (
              <select
                value={maklerIdx}
                onChange={(e) => setMaklerIdx(Number(e.target.value))}
                className="w-full mt-2 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              >
                {MAKLER_OPTIONS.filter(m => m.satz > 0).map((m, i) => (
                  <option key={m.label} value={i}>{m.label}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Donut chart */}
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 160 160" className="w-48 h-48">
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth="24"
                strokeDasharray={`${seg.dashArray} ${circumference - seg.dashArray}`}
                strokeDashoffset={seg.dashOffset}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            ))}
            <text x={cx} y={cy - 6} textAnchor="middle" className="text-xs fill-stone-500">Nebenkosten</text>
            <text x={cx} y={cy + 12} textAnchor="middle" className="text-sm font-bold fill-stone-900">{fmt(nebenkostenGesamt)} €</text>
          </svg>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 justify-center">
            {segments.map((seg, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-stone-600">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                {seg.label.split(" (")[0]}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result table */}
      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden mb-8">
        <div className="flex justify-between items-center px-5 py-3 bg-stone-50 border-b border-stone-200">
          <span className="font-medium text-stone-700">Kaufpreis</span>
          <span className="font-semibold text-stone-900">{fmt(kaufpreis)} €</span>
        </div>

        {posten.map((p, i) => (
          <div key={i} className="flex justify-between items-center px-5 py-3 border-b border-stone-100">
            <span className="text-stone-600 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
              {p.label}
            </span>
            <span className="font-medium text-stone-800">{fmt(p.betrag)} €</span>
          </div>
        ))}

        <div className="flex justify-between items-center px-5 py-3 bg-stone-50 border-t border-stone-200">
          <span className="font-medium text-stone-700">Nebenkosten gesamt</span>
          <span className="font-bold text-amber-700">{fmt(nebenkostenGesamt)} €</span>
        </div>

        <div className="flex justify-between items-center px-5 py-4 bg-amber-50 border-t-2 border-amber-300">
          <span className="text-lg font-bold text-stone-900">Gesamtkosten</span>
          <span className="text-lg font-bold text-amber-700">{fmt(gesamtkosten)} €</span>
        </div>
      </div>

      {/* Anteil-Balken */}
      <div className="mb-8">
        <p className="text-sm text-stone-500 mb-2">Nebenkosten-Anteil: <strong className="text-stone-700">{kaufpreis > 0 ? fmtPercent((nebenkostenGesamt / kaufpreis) * 100) : "0"} %</strong> des Kaufpreises</p>
        <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden flex">
          {segments.map((seg, i) => (
            <div
              key={i}
              style={{ width: `${kaufpreis > 0 ? (seg.betrag / gesamtkosten) * 100 : 0}%`, backgroundColor: seg.color }}
              className="h-full transition-all duration-300"
            />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-4 mb-8 text-sm text-stone-600">
        <strong className="text-stone-800">Hinweis:</strong>{" "}
        Diese Berechnung ist eine Schätzung. Die tatsächlichen Notar- und Grundbuchkosten richten sich nach dem Gerichtskostengesetz (GNotKG) und können je nach Komplexität abweichen. Für eine verbindliche Auskunft wende dich an einen Notar.
      </div>

      <FAQSection faqs={getFaqBySlug("nebenkosten")} rechnerName="Nebenkosten-Rechner" />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="text-sm font-medium text-stone-800 mb-1">📖 Ratgeber zum Thema</p>
        <a href="/finanzen/kaufnebenkosten-guide" className="text-amber-600 hover:text-amber-700 font-medium text-sm">
          Kaufnebenkosten berechnen — der komplette Guide (2026) →
        </a>
      </div>

      {/* Rechner-Links */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Weitere Rechner</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/rechner/handwerkerkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Handwerkerkosten-Rechner</a>
          <a href="/rechner/eigenleistung" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Eigenleistungs-Rechner</a>
          <a href="/rechner/foerdermittel" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Fördermittel-Finder</a>
          <a href="/rechner/baugenehmigung" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Baugenehmigung-Check</a>
        </div>
      </div>
    </div>
  );
}

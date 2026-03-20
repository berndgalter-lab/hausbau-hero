import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Alle Rechner — Kostenlose Tools für dein Bauprojekt",
  description:
    "19 kostenlose Rechner: Kaufnebenkosten, Handwerkerkosten, Fördermittel, Wandfarbe, Fliesen, Trockenbau und mehr. Sofort berechnen — ohne Anmeldung.",
  alternates: { canonical: "https://hausbau-hero.de/rechner" },
  openGraph: {
    title: "Alle Rechner — Hausbau Hero",
    description: "19 kostenlose Baurechner: Material, Handwerkerkosten, Förderungen. Sofort Ergebnis.",
    url: "https://hausbau-hero.de/rechner",
  },
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
    { "@type": "ListItem", position: 2, name: "Rechner", item: "https://hausbau-hero.de/rechner" },
  ],
};

const FINANZ_RECHNER = [
  {
    slug: "nebenkosten",
    name: "Kaufnebenkosten-Rechner",
    beschreibung: "Grunderwerbsteuer, Notar, Grundbuch, Makler.",
    icon: "🏠",
    badge: "Beliebt",
    accent: "amber",
  },
  {
    slug: "handwerkerkosten",
    name: "Handwerkerkosten-Rechner",
    beschreibung: "Was kostet ein Handwerker pro Stunde? 21 Gewerke.",
    icon: "💶",
    badge: null,
    accent: "amber",
  },
  {
    slug: "eigenleistung",
    name: "Eigenleistungs-Rechner",
    beschreibung: "Selbst machen oder Handwerker? Finde heraus wie viel du sparst.",
    icon: "🔨",
    badge: null,
    accent: "green",
  },
  {
    slug: "foerdermittel",
    name: "Fördermittel-Finder",
    beschreibung: "KfW, BAFA, Steuerbonus — alle Förderungen.",
    icon: "🏦",
    badge: null,
    accent: "blue",
  },
];

const MATERIAL_SLUGS = [
  { slug: "wandfarbe", icon: "🎨" },
  { slug: "fliesen", icon: "🔲" },
  { slug: "trockenbau", icon: "🧱" },
  { slug: "laminat", icon: "🪵" },
  { slug: "estrich", icon: "🏗️" },
  { slug: "daemmung", icon: "🧤" },
  { slug: "tapeten", icon: "🖼️" },
  { slug: "beton", icon: "🪨" },
  { slug: "putz", icon: "🧹" },
  { slug: "terrasse", icon: "🌳" },
  { slug: "elektro", icon: "🔌" },
  { slug: "sanitaer", icon: "🚰" },
  { slug: "stromverbrauch", icon: "⚡" },
];

const PLANUNG_RECHNER = [
  {
    slug: "gewerk-reihenfolge",
    name: "Gewerk-Reihenfolge",
    beschreibung: "Welche Handwerker zuerst? Ablaufplan.",
    icon: "📋",
  },
  {
    slug: "baugenehmigung",
    name: "Baugenehmigung-Check",
    beschreibung: "Brauche ich eine Genehmigung? Check nach Bundesland.",
    icon: "📑",
  },
];

const ACCENT: Record<string, { border: string; hoverBorder: string; bg: string; text: string; hoverText: string }> = {
  amber:  { border: "border-amber-200", hoverBorder: "hover:border-amber-400", bg: "bg-amber-50",  text: "text-amber-600",  hoverText: "group-hover:text-amber-700" },
  green:  { border: "border-green-200", hoverBorder: "hover:border-green-400", bg: "bg-green-50",  text: "text-green-600",  hoverText: "group-hover:text-green-700" },
  blue:   { border: "border-blue-200",  hoverBorder: "hover:border-blue-400",  bg: "bg-blue-50",   text: "text-blue-600",   hoverText: "group-hover:text-blue-700" },
};

export default async function RechnerUebersicht() {
  let dbRechner: Record<string, { name: string; beschreibung: string }> = {};

  try {
    const { data } = await supabase.from("rechner").select("name, slug, beschreibung");
    if (data) {
      for (const r of data) {
        dbRechner[r.slug] = { name: r.name, beschreibung: r.beschreibung };
      }
    }
  } catch (e) {
    console.error("[RechnerUebersicht] Fetch failed:", e);
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">Rechner</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">
        Alle Rechner
      </h1>
      <p className="text-stone-600 mb-10 max-w-2xl">
        Wähle einen Rechner, gib deine Daten ein und erhalte sofort ein Ergebnis — kostenlos und ohne Anmeldung.
      </p>

      {/* ── Kosten & Finanzen ──────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>💰</span> Kosten & Finanzen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FINANZ_RECHNER.map((r) => {
            const a = ACCENT[r.accent];
            return (
              <a
                key={r.slug}
                href={`/rechner/${r.slug}`}
                className={`group flex gap-4 p-5 ${a.bg} border-2 ${a.border} ${a.hoverBorder} rounded-xl hover:shadow-md transition-all`}
              >
                <span className="text-3xl shrink-0">{r.icon}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-semibold ${a.hoverText} transition-colors`}>
                      {r.name}
                    </span>
                    {r.badge && (
                      <span className="text-xs font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full">
                        {r.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-stone-600 mt-1">{r.beschreibung}</p>
                  <span className={`inline-block mt-2 text-sm font-medium ${a.text}`}>
                    Jetzt berechnen →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Material berechnen ─────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>📐</span> Material berechnen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MATERIAL_SLUGS.map((m) => {
            const info = dbRechner[m.slug];
            const name = info?.name || m.slug;
            const beschreibung = info?.beschreibung || "";
            return (
              <a
                key={m.slug}
                href={`/rechner/${m.slug}`}
                className="group flex gap-3 p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-sm transition-all"
              >
                <span className="text-2xl shrink-0">{m.icon}</span>
                <div className="min-w-0">
                  <span className="font-medium text-sm group-hover:text-amber-700 transition-colors">
                    {name}
                  </span>
                  {beschreibung && (
                    <p className="text-xs text-stone-500 mt-0.5 line-clamp-2">
                      {beschreibung}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ── Planung & Recht ────────────────────────────────────── */}
      <section className="mb-12">
        <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <span>📋</span> Planung & Recht
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PLANUNG_RECHNER.map((r) => (
            <a
              key={r.slug}
              href={`/rechner/${r.slug}`}
              className="group flex gap-4 p-5 bg-white border-2 border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
            >
              <span className="text-3xl shrink-0">{r.icon}</span>
              <div className="min-w-0">
                <span className="font-semibold group-hover:text-amber-700 transition-colors">
                  {r.name}
                </span>
                <p className="text-sm text-stone-600 mt-1">{r.beschreibung}</p>
                <span className="inline-block mt-2 text-amber-600 text-sm font-medium">
                  Jetzt ansehen →
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

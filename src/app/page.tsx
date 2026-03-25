import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Was kostet dein Bauprojekt? — Hausbau Hero",
  description:
    "Berechne in 30 Sekunden Material, Handwerkerkosten und Förderungen — kostenlos und ohne Anmeldung. 19 Rechner für Bauherren & Handwerker.",
  alternates: { canonical: "https://hausbau-hero.de" },
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Kostenlose Baurechner",
  description: "19 kostenlose Rechner für Bauprojekte — Material, Handwerkerkosten, Förderungen.",
  numberOfItems: 19,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Kaufnebenkosten-Rechner", url: "https://hausbau-hero.de/rechner/nebenkosten" },
    { "@type": "ListItem", position: 2, name: "Handwerkerkosten-Rechner", url: "https://hausbau-hero.de/rechner/handwerkerkosten" },
    { "@type": "ListItem", position: 3, name: "Fördermittel-Finder", url: "https://hausbau-hero.de/rechner/foerdermittel" },
    { "@type": "ListItem", position: 4, name: "Eigenleistungs-Rechner", url: "https://hausbau-hero.de/rechner/eigenleistung" },
    { "@type": "ListItem", position: 5, name: "Wandfarbe-Rechner", url: "https://hausbau-hero.de/rechner/wandfarbe" },
    { "@type": "ListItem", position: 6, name: "Fliesen-Rechner", url: "https://hausbau-hero.de/rechner/fliesen" },
    { "@type": "ListItem", position: 7, name: "Trockenbau-Rechner", url: "https://hausbau-hero.de/rechner/trockenbau" },
  ],
};

const TOP_RECHNER = [
  {
    slug: "nebenkosten",
    name: "Kaufnebenkosten-Rechner",
    text: "Kaufst du eine Immobilie? Berechne alle Nebenkosten nach Bundesland.",
    badge: "⭐ Beliebtester Rechner",
    icon: "🏠",
    accent: "amber",
  },
  {
    slug: "handwerkerkosten",
    name: "Handwerkerkosten-Rechner",
    text: "Was kostet ein Handwerker pro Stunde? 21 Gewerke mit regionalen Preisen.",
    badge: null,
    icon: "💶",
    accent: "amber",
  },
  {
    slug: "foerdermittel",
    name: "Fördermittel-Finder",
    text: "KfW, BAFA, Steuerbonus — finde alle Förderungen für dein Vorhaben.",
    badge: null,
    icon: "🏦",
    accent: "blue",
  },
];

const RECHNER_GRUPPEN = [
  {
    titel: "Kosten & Finanzen",
    icon: "💰",
    rechner: [
      { slug: "nebenkosten", name: "Kaufnebenkosten", icon: "🏠" },
      { slug: "handwerkerkosten", name: "Handwerkerkosten", icon: "💶" },
      { slug: "eigenleistung", name: "Eigenleistung", icon: "🔨" },
      { slug: "foerdermittel", name: "Fördermittel", icon: "🏦" },
    ],
  },
  {
    titel: "Material berechnen",
    icon: "📐",
    rechner: [
      { slug: "wandfarbe", name: "Wandfarbe", icon: "🎨" },
      { slug: "fliesen", name: "Fliesen", icon: "🔲" },
      { slug: "trockenbau", name: "Trockenbau", icon: "🧱" },
      { slug: "laminat", name: "Laminat", icon: "🪵" },
      { slug: "estrich", name: "Estrich", icon: "🏗️" },
      { slug: "daemmung", name: "Dämmung", icon: "🧤" },
      { slug: "tapeten", name: "Tapeten", icon: "🖼️" },
      { slug: "beton", name: "Beton", icon: "🪨" },
      { slug: "putz", name: "Putz", icon: "🧹" },
      { slug: "terrasse", name: "Terrasse", icon: "🌳" },
      { slug: "elektro", name: "Elektro", icon: "🔌" },
      { slug: "sanitaer", name: "Sanitär", icon: "🚰" },
      { slug: "stromverbrauch", name: "Stromerzeuger", icon: "⚡" },
    ],
  },
  {
    titel: "Planung & Recht",
    icon: "📋",
    rechner: [
      { slug: "gewerk-reihenfolge", name: "Gewerk-Reihenfolge", icon: "📋" },
      { slug: "baugenehmigung", name: "Baugenehmigung-Check", icon: "📑" },
    ],
  },
];

export default async function Home() {
  let artikel: any[] = [];
  try {
    const { data } = await supabase
      .from("seiten")
      .select("slug, titel, seo_description, created_at, silos(slug, name, icon)")
      .eq("status", "aktiv")
      .order("created_at", { ascending: false })
      .limit(4);
    if (data) artikel = data;
  } catch (e) {
    console.error("[Home] Artikel fetch failed:", e);
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      {/* ── 1. HERO ────────────────────────────────────────────── */}
      <section className="-mx-4 -mt-8 px-4 pt-12 pb-14 md:pt-16 md:pb-20 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Was kostet dein{" "}
          <span className="text-amber-400">Bauprojekt?</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-stone-300 max-w-2xl mx-auto">
          Berechne in 30 Sekunden Material, Handwerkerkosten und Förderungen
          — kostenlos und ohne Anmeldung.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center max-w-2xl mx-auto">
          <a
            href="/rechner/nebenkosten"
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-6 py-3.5 rounded-lg transition-colors text-center"
          >
            Kaufnebenkosten berechnen
          </a>
          <a
            href="/rechner/handwerkerkosten"
            className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold px-6 py-3.5 rounded-lg border border-white/20 transition-colors text-center"
          >
            Handwerkerkosten berechnen
          </a>
          <a
            href="/rechner/eigenleistung"
            className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-bold px-6 py-3.5 rounded-lg border border-white/20 transition-colors text-center"
          >
            Eigenleistung berechnen
          </a>
        </div>

        <p className="mt-6 text-sm text-stone-400">
          19 kostenlose Rechner · Über 10.000 Berechnungen
        </p>
      </section>

      {/* ── 2. TOP-RECHNER ─────────────────────────────────────── */}
      <section className="mt-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TOP_RECHNER.map((r) => (
            <a
              key={r.slug}
              href={`/rechner/${r.slug}`}
              className={`group relative flex flex-col p-6 bg-white border-2 rounded-xl hover:shadow-lg transition-all ${
                r.accent === "blue"
                  ? "border-blue-200 hover:border-blue-400"
                  : "border-amber-200 hover:border-amber-400"
              }`}
            >
              {r.badge && (
                <span className="absolute -top-3 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {r.badge}
                </span>
              )}
              <span className="text-3xl mb-3">{r.icon}</span>
              <h2 className={`text-lg font-bold mb-2 transition-colors ${
                r.accent === "blue"
                  ? "group-hover:text-blue-700"
                  : "group-hover:text-amber-700"
              }`}>
                {r.name}
              </h2>
              <p className="text-sm text-stone-600 flex-1">{r.text}</p>
              <span className={`mt-4 text-sm font-semibold ${
                r.accent === "blue" ? "text-blue-600" : "text-amber-600"
              }`}>
                Jetzt berechnen →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ── 3. ALLE RECHNER ────────────────────────────────────── */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Alle Rechner</h2>

        {RECHNER_GRUPPEN.map((gruppe) => (
          <div key={gruppe.titel} className="mb-8">
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span>{gruppe.icon}</span> {gruppe.titel}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {gruppe.rechner.map((r) => (
                <a
                  key={r.slug}
                  href={`/rechner/${r.slug}`}
                  className="group flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-lg hover:border-amber-400 hover:shadow-sm transition-all"
                >
                  <span className="text-xl shrink-0">{r.icon}</span>
                  <span className="text-sm font-medium group-hover:text-amber-700 transition-colors">
                    {r.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center mt-4">
          <a
            href="/rechner"
            className="text-amber-600 hover:text-amber-700 font-medium text-sm"
          >
            Alle Rechner im Detail →
          </a>
        </div>
      </section>

      {/* ── 4. NEUESTE RATGEBER ────────────────────────────────── */}
      {artikel.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Ratgeber & Anleitungen</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {artikel.map((a: any) => {
              const silo = a.silos;
              return (
                <a
                  key={a.slug}
                  href={`/${silo?.slug || "werkzeuge"}/${a.slug}`}
                  className="group flex flex-col p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
                >
                  {silo && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full w-fit mb-3">
                      {silo.icon} {silo.name}
                    </span>
                  )}
                  <h3 className="text-sm font-semibold leading-snug group-hover:text-amber-700 transition-colors line-clamp-2">
                    {a.titel}
                  </h3>
                  {a.seo_description && (
                    <p className="text-xs text-stone-500 mt-2 line-clamp-2">
                      {a.seo_description}
                    </p>
                  )}
                </a>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <a
              href="/werkzeuge"
              className="text-amber-600 hover:text-amber-700 font-medium text-sm"
            >
              Alle Ratgeber →
            </a>
          </div>
        </section>
      )}

      {/* ── 5. TRUST ──────────────────────────── */}
      <section className="mb-16">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-600 mb-8">
          <span>✓ 19 kostenlose Rechner</span>
          <span>✓ Keine Anmeldung</span>
          <span>✓ Daten aus 2026</span>
        </div>
      </section>
    </div>
  );
}

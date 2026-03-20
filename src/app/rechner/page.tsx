import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Alle Materialrechner",
  description:
    "Kostenlose Materialrechner für dein Bauprojekt. Fliesen, Wandfarbe, Trockenbau, Stromerzeuger — mit Materialliste, Preisen und Werkzeug-Empfehlung.",
  alternates: { canonical: "https://hausbau-hero.de/rechner" },
  openGraph: {
    title: "Alle Materialrechner — Hausbau Hero",
    description: "Kostenlose Materialrechner mit Einkaufsliste und Werkzeug-Empfehlung.",
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

const FALLBACK_RECHNER = [
  { name: "Wandfarbe-Rechner", slug: "wandfarbe", beschreibung: "Berechne wie viel Wandfarbe du für deinen Raum brauchst — inkl. Materialliste und Werkzeug." },
  { name: "Fliesen-Rechner", slug: "fliesen", beschreibung: "Berechne wie viele Fliesen du brauchst — inkl. Kleber, Fugenmörtel und Werkzeug." },
  { name: "Trockenbau-Rechner", slug: "trockenbau", beschreibung: "Berechne Material für Rigips-Ständerwände — Profile, Platten, Schrauben und Werkzeug." },
  { name: "Stromerzeuger-Rechner", slug: "stromverbrauch", beschreibung: "Finde den passenden Stromerzeuger für deine Baustelle — wähle deine Geräte und erhalte eine Empfehlung." },
];

const RECHNER_ICONS: Record<string, string> = {
  wandfarbe: "🎨",
  fliesen: "🔲",
  trockenbau: "🧱",
  stromverbrauch: "⚡",
};

export default async function RechnerUebersicht() {
  let rechnerList = FALLBACK_RECHNER;

  try {
    const { data, error } = await supabase
      .from("rechner")
      .select("name, slug, beschreibung");

    if (error) {
      console.error("[RechnerUebersicht] Query error:", error.message);
    } else if (data && data.length > 0) {
      rechnerList = data;
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

      <h1 className="text-3xl font-bold mb-2">Alle Rechner</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Kostenlose Materialrechner für dein Bauprojekt. Wähle einen Rechner,
        gib deine Maße ein und erhalte sofort eine Materialliste mit
        ungefähren Kosten.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <a
          href="/rechner/nebenkosten"
          className="group flex gap-4 p-5 bg-amber-50 border-2 border-amber-300 rounded-xl hover:border-amber-500 hover:shadow-md transition-all"
        >
          <div className="text-3xl shrink-0">🏠</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold group-hover:text-amber-700 transition-colors">Nebenkosten-Rechner</span>
              <span className="text-xs font-bold bg-amber-600 text-white px-2 py-0.5 rounded-full">Beliebt</span>
            </div>
            <div className="text-sm text-stone-600 mt-1">Grunderwerbsteuer, Notar, Grundbuch, Makler.</div>
            <div className="mt-2 text-amber-600 text-sm font-medium">Jetzt berechnen →</div>
          </div>
        </a>
        <a
          href="/rechner/eigenleistung"
          className="group flex gap-4 p-5 bg-green-50 border-2 border-green-300 rounded-xl hover:border-green-500 hover:shadow-md transition-all"
        >
          <div className="text-3xl shrink-0">🛠️</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold group-hover:text-green-700 transition-colors">Eigenleistungs-Rechner</span>
              <span className="text-xs font-bold bg-green-600 text-white px-2 py-0.5 rounded-full">Beliebt</span>
            </div>
            <div className="text-sm text-stone-600 mt-1">Selbst machen oder Handwerker? Finde heraus wie viel du sparst.</div>
            <div className="mt-2 text-green-600 text-sm font-medium">Jetzt berechnen →</div>
          </div>
        </a>
        <a
          href="/rechner/foerdermittel"
          className="group flex gap-4 p-5 bg-blue-50 border-2 border-blue-300 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
        >
          <div className="text-3xl shrink-0">🏦</div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold group-hover:text-blue-700 transition-colors">Fördermittel-Finder</span>
              <span className="text-xs font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">Neu</span>
            </div>
            <div className="text-sm text-stone-600 mt-1">KfW, BAFA, Steuerbonus — alle Förderungen auf einen Blick.</div>
            <div className="mt-2 text-blue-600 text-sm font-medium">Förderung finden →</div>
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {rechnerList.map((r) => (
          <a
            key={r.slug}
            href={`/rechner/${r.slug}`}
            className="group flex gap-4 p-6 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
          >
            <div className="text-3xl shrink-0">{RECHNER_ICONS[r.slug] || "🔢"}</div>
            <div>
              <div className="text-lg font-semibold group-hover:text-amber-700 transition-colors">
                {r.name}
              </div>
              <div className="text-sm text-stone-500 mt-1">{r.beschreibung}</div>
              <div className="mt-3 text-amber-600 text-sm font-medium">
                Jetzt berechnen →
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

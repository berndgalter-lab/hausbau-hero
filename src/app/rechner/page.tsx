import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Alle Rechner",
  description:
    "Kostenlose Materialrechner für Bauherren und Handwerker — Wandfarbe, Fliesen, Trockenbau, Stromerzeuger und mehr.",
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

import { supabase } from "@/lib/supabase";

export const revalidate = 60;

const FALLBACK_RECHNER = [
  { name: "Wandfarbe-Rechner", slug: "wandfarbe", beschreibung: "Berechne wie viel Wandfarbe du für deinen Raum brauchst — inkl. Materialliste und Werkzeug." },
  { name: "Fliesen-Rechner", slug: "fliesen", beschreibung: "Berechne wie viele Fliesen du brauchst — inkl. Kleber, Fugenmörtel und Werkzeug." },
  { name: "Trockenbau-Rechner", slug: "trockenbau", beschreibung: "Berechne Material für Rigips-Ständerwände — Profile, Platten, Schrauben und Werkzeug." },
  { name: "Stromerzeuger-Rechner", slug: "stromverbrauch", beschreibung: "Finde den passenden Stromerzeuger für deine Baustelle — wähle deine Geräte und erhalte eine Empfehlung." },
];

const FALLBACK_SILOS = [
  { name: "Farben", slug: "farben", beschreibung: "Wandfarben, Lacke und alles rund ums Streichen.", icon: "🎨" },
  { name: "Bad", slug: "bad", beschreibung: "Fliesen, Armaturen und Badezimmer-Ausstattung.", icon: "🚿" },
  { name: "Werkzeuge", slug: "werkzeuge", beschreibung: "Handwerkzeuge und Elektrowerkzeuge für jede Baustelle.", icon: "🔧" },
  { name: "Stromerzeuger", slug: "stromerzeuger", beschreibung: "Generatoren und Stromversorgung für die Baustelle.", icon: "⚡" },
  { name: "Küche", slug: "kueche", beschreibung: "Küchenausstattung und Ersatzteile.", icon: "🍳" },
  { name: "Baumaschinen", slug: "maschinen", beschreibung: "Abbruchhämmer, Dumper und schweres Gerät.", icon: "🏗️" },
];

const RECHNER_ICONS: Record<string, string> = {
  wandfarbe: "🎨",
  fliesen: "🔲",
  trockenbau: "🧱",
  stromverbrauch: "⚡",
};

export default async function Home() {
  let rechnerList = FALLBACK_RECHNER;
  let silos = FALLBACK_SILOS;

  try {
    const { data: rechnerData, error: rechnerError } = await supabase
      .from("rechner")
      .select("name, slug, beschreibung")
      .limit(8);

    if (rechnerError) {
      console.error("[Home] Rechner query error:", rechnerError.message);
    } else if (rechnerData && rechnerData.length > 0) {
      rechnerList = rechnerData;
    } else {
      console.warn("[Home] Rechner query returned empty, using fallback");
    }
  } catch (e) {
    console.error("[Home] Rechner fetch failed:", e);
  }

  try {
    const { data: siloData, error: siloError } = await supabase
      .from("silos")
      .select("*")
      .order("sortierung");

    if (siloError) {
      console.error("[Home] Silos query error:", siloError.message);
    } else if (siloData && siloData.length > 0) {
      silos = siloData;
    } else {
      console.warn("[Home] Silos query returned empty, using fallback");
    }
  } catch (e) {
    console.error("[Home] Silos fetch failed:", e);
  }

  return (
    <div>
      <section className="text-center py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Materialrechner & Werkzeuge für{" "}
          <span className="text-amber-600">Bauherren & Handwerker</span>
        </h1>
        <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
          Berechne Material, finde das richtige Werkzeug, spare Geld.
          Alle Rechner kostenlos — keine Anmeldung nötig.
        </p>
        <a
          href="/rechner"
          className="inline-block mt-6 bg-amber-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Alle Rechner ansehen →
        </a>
      </section>

      <section className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Rechner</h2>
          <a href="/rechner" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
            Alle Rechner →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rechnerList.map((r) => (
            <a
              key={r.slug}
              href={`/rechner/${r.slug}`}
              className="group block p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className="text-2xl mb-2">{RECHNER_ICONS[r.slug] || "🔢"}</div>
              <div className="text-lg font-semibold group-hover:text-amber-700 transition-colors">
                {r.name}
              </div>
              <div className="text-sm text-stone-500 mt-1 line-clamp-2">{r.beschreibung}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Alle Bereiche</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {silos.map((silo: any) => (
            <a
              key={silo.slug}
              href={`/${silo.slug}`}
              className="group block p-6 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-2">{silo.icon || "🔧"}</div>
              <div className="text-lg font-semibold group-hover:text-amber-700 transition-colors">
                {silo.name}
              </div>
              <div className="text-sm text-stone-500 mt-1">{silo.beschreibung}</div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

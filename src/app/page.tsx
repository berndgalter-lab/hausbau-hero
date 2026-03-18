import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: silos } = await supabase.from("silos").select("*").order("sortierung");
  const { data: rechnerList } = await supabase.from("rechner").select("name, slug, beschreibung").limit(8);

  return (
    <div>
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Materialrechner & Werkzeuge für <span className="text-amber-600">Bauherren & Handwerker</span>
        </h1>
        <p className="mt-4 text-lg text-stone-600 max-w-2xl mx-auto">
          Berechne Material, finde das richtige Werkzeug, spare Geld.
          Alle Rechner kostenlos — keine Anmeldung nötig.
        </p>
      </section>

      {rechnerList && rechnerList.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Rechner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rechnerList.map((r) => (
              <a
                key={r.slug}
                href={`/rechner/${r.slug}`}
                className="block p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
              >
                <div className="text-lg font-semibold">{r.name}</div>
                <div className="text-sm text-stone-500 mt-1">{r.beschreibung}</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {silos && silos.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Alle Bereiche</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {silos.map((silo: any) => (
              <a
                key={silo.slug}
                href={`/${silo.slug}`}
                className="block p-6 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-2">{silo.icon || "🔧"}</div>
                <div className="text-lg font-semibold">{silo.name}</div>
                <div className="text-sm text-stone-500 mt-1">{silo.beschreibung}</div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

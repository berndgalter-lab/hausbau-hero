import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const VALID_SILOS = ["farben", "bad", "werkzeuge", "stromerzeuger", "kueche", "maschinen"];

export async function generateMetadata({ params }: { params: { silo: string } }): Promise<Metadata> {
  const { data: silo } = await supabase
    .from("silos")
    .select("name, beschreibung")
    .eq("slug", params.silo)
    .single();

  if (!silo) return {};
  return { title: silo.name, description: silo.beschreibung };
}

export default async function SiloPage({ params }: { params: { silo: string } }) {
  if (!VALID_SILOS.includes(params.silo)) {
    notFound();
  }

  const { data: silo, error: siloError } = await supabase
    .from("silos")
    .select("*")
    .eq("slug", params.silo)
    .single();

  if (siloError) {
    console.error("[SiloPage] Silo query error:", siloError.message);
  }

  if (!silo) notFound();

  let rechnerList: any[] = [];
  let seiten: any[] = [];

  try {
    const { data: rechnerData } = await supabase
      .from("rechner")
      .select("name, slug, beschreibung")
      .eq("silo_id", silo.id);
    if (rechnerData) rechnerList = rechnerData;
  } catch (e) {
    console.error("[SiloPage] Rechner query error:", e);
  }

  try {
    const { data: seitenData } = await supabase
      .from("seiten")
      .select("slug, titel, seo_description")
      .eq("silo_id", silo.id)
      .eq("status", "aktiv")
      .order("klicks", { ascending: false });
    if (seitenData) seiten = seitenData;
  } catch (e) {
    console.error("[SiloPage] Seiten query error:", e);
  }

  return (
    <div>
      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">{silo.name}</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        {silo.icon && <span className="text-4xl">{silo.icon}</span>}
        <h1 className="text-3xl font-bold">{silo.name}</h1>
      </div>
      {silo.beschreibung && (
        <p className="text-stone-600 mb-8 max-w-2xl">{silo.beschreibung}</p>
      )}

      {rechnerList.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Rechner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rechnerList.map((r: any) => (
              <a
                key={r.slug}
                href={`/rechner/${r.slug}`}
                className="group flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl hover:border-amber-400 transition-all"
              >
                <span className="text-2xl">🔢</span>
                <div>
                  <div className="font-semibold group-hover:text-amber-700 transition-colors">
                    {r.name}
                  </div>
                  <div className="text-sm text-stone-600">{r.beschreibung}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {seiten.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Alle Artikel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {seiten.map((s: any) => (
              <a
                key={s.slug}
                href={`/${params.silo}/${s.slug}`}
                className="block p-4 bg-white border border-stone-200 rounded-lg hover:border-stone-400 transition-all"
              >
                <div className="font-medium">{s.titel}</div>
                {s.seo_description && (
                  <div className="text-sm text-stone-500 mt-1 line-clamp-2">
                    {s.seo_description}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {rechnerList.length === 0 && seiten.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          <p className="text-lg mb-2">Hier gibt es bald mehr Inhalte!</p>
          <a href="/" className="text-amber-600 hover:text-amber-700 font-medium">
            ← Zurück zur Startseite
          </a>
        </div>
      )}
    </div>
  );
}

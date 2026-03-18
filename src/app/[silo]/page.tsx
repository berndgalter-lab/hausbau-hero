import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { silo: string } }): Promise<Metadata> {
  const { data: silo } = await supabase.from("silos").select("*").eq("slug", params.silo).single();
  if (!silo) return {};
  return { title: silo.name, description: silo.beschreibung };
}

export default async function SiloPage({ params }: { params: { silo: string } }) {
  const { data: silo } = await supabase.from("silos").select("*").eq("slug", params.silo).single();
  if (!silo) notFound();

  const { data: seiten } = await supabase
    .from("seiten")
    .select("*")
    .eq("silo_id", silo.id)
    .eq("status", "aktiv")
    .order("klicks", { ascending: false });

  const { data: rechnerList } = await supabase
    .from("rechner")
    .select("name, slug, beschreibung")
    .eq("silo_id", silo.id);

  return (
    <div>
      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">{silo.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{silo.name}</h1>
      {silo.intro_text && <p className="text-stone-600 mb-8 max-w-2xl">{silo.intro_text}</p>}

      {rechnerList && rechnerList.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Rechner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rechnerList.map((r: any) => (
              <a
                key={r.slug}
                href={`/rechner/${r.slug}`}
                className="flex items-center gap-4 p-4 bg-amber-50 border border-amber-200 rounded-xl hover:border-amber-400 transition-all"
              >
                <span className="text-2xl">🔢</span>
                <div>
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-sm text-stone-600">{r.beschreibung}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {seiten && seiten.length > 0 && (
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
                  <div className="text-sm text-stone-500 mt-1 line-clamp-2">{s.seo_description}</div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

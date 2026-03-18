import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProduktKarte from "@/components/ProduktKarte";
import CommunityKosten from "@/components/CommunityKosten";

export async function generateMetadata({ params }: { params: { silo: string; slug: string } }): Promise<Metadata> {
  const { data: seite } = await supabase.from("seiten").select("*").eq("slug", params.slug).single();
  if (!seite) return {};
  return { title: seite.seo_title || seite.titel, description: seite.seo_description };
}

export default async function ArtikelPage({ params }: { params: { silo: string; slug: string } }) {
  const { data: seite } = await supabase.from("seiten").select("*, silos(name, slug)").eq("slug", params.slug).single();
  if (!seite || seite.status !== "aktiv") notFound();

  const { data: produkte } = await supabase
    .from("produkte")
    .select("*")
    .eq("seite_id", seite.id)
    .order("sortierung");

  return (
    <div>
      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href={`/${params.silo}`} className="hover:text-stone-700">{(seite as any).silos?.name}</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">{seite.titel}</span>
      </nav>

      <article className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">{seite.titel}</h1>

        {produkte && produkte.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">Unsere Empfehlungen</h2>
            <div className="grid gap-4">
              {produkte
                .filter((p: any) => !p.ist_werkzeug)
                .map((p: any) => (
                  <ProduktKarte key={p.id} produkt={p} />
                ))}
            </div>
          </section>
        )}

        {seite.content_md && (
          <div
            className="prose prose-stone max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: seite.content_md }}
          />
        )}

        {produkte && produkte.filter((p: any) => p.ist_werkzeug).length > 0 && (
          <section className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
            <h2 className="text-lg font-bold mb-3">🔧 Werkzeug-Checkliste</h2>
            <p className="text-sm text-stone-600 mb-4">Das brauchst du für dieses Projekt:</p>
            <div className="grid gap-3">
              {produkte
                .filter((p: any) => p.ist_werkzeug)
                .map((p: any) => (
                  <ProduktKarte key={p.id} produkt={p} compact />
                ))}
            </div>
          </section>
        )}

        <CommunityKosten seitenSlug={seite.slug} />
      </article>
    </div>
  );
}

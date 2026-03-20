import { supabase } from "@/lib/supabase";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import ProduktKarte from "@/components/ProduktKarte";
import CommunityKosten from "@/components/CommunityKosten";
import ArticleContent from "@/components/ArticleContent";

export async function generateMetadata({ params }: { params: { silo: string; slug: string } }): Promise<Metadata> {
  const { data: seite } = await supabase
    .from("seiten")
    .select("titel, seo_title, seo_description")
    .eq("slug", params.slug)
    .single();

  if (!seite) return {};

  const title = seite.seo_title || seite.titel;
  const description = seite.seo_description || "";

  return {
    title,
    description,
    alternates: { canonical: `https://hausbau-hero.de/${params.silo}/${params.slug}` },
    openGraph: {
      title: `${title} — Hausbau Hero`,
      description,
      url: `https://hausbau-hero.de/${params.silo}/${params.slug}`,
    },
  };
}

export default async function ArtikelPage({ params }: { params: { silo: string; slug: string } }) {
  const { data: seite, error: seiteError } = await supabase
    .from("seiten")
    .select("*, silos(name, slug)")
    .eq("slug", params.slug)
    .single();

  if (seiteError) {
    console.error("[ArtikelPage] Query error:", seiteError.message);
  }

  if (!seite) notFound();

  if (seite.status === "redirect" && seite.redirect_to) {
    permanentRedirect(seite.redirect_to);
  }

  if (seite.status !== "aktiv") notFound();

  const siloName = (seite as any).silos?.name || params.silo;

  let produkte: any[] = [];
  try {
    const { data } = await supabase
      .from("produkte")
      .select("*")
      .eq("seite_id", seite.id)
      .order("sortierung");
    if (data) produkte = data;
  } catch (e) {
    console.error("[ArtikelPage] Produkte query error:", e);
  }

  const werkzeuge = produkte.filter((p: any) => p.ist_werkzeug);
  const hauptProdukte = produkte.filter((p: any) => !p.ist_werkzeug);
  const hasContent = seite.content_md && seite.content_md.trim().length > 50;

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
              { "@type": "ListItem", position: 2, name: siloName, item: `https://hausbau-hero.de/${params.silo}` },
              { "@type": "ListItem", position: 3, name: seite.titel, item: `https://hausbau-hero.de/${params.silo}/${params.slug}` },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href={`/${params.silo}`} className="hover:text-stone-700">{siloName}</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">{seite.titel}</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">{seite.titel}</h1>

      <p className="text-stone-500 text-sm mb-8">
        Kategorie: <a href={`/${params.silo}`} className="text-amber-600 hover:underline">{siloName}</a>
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-stone-600">
        <strong className="text-stone-800">Hinweis:</strong>{" "}
        Dieser Artikel enthält Affiliate-Links. Wenn du über diese Links einkaufst, erhalten wir eine kleine Provision — für dich ändert sich der Preis nicht.
      </div>

      {hauptProdukte.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Unsere Empfehlungen</h2>
          <div className="grid gap-4">
            {hauptProdukte.map((p: any) => (
              <ProduktKarte key={p.id} produkt={p} />
            ))}
          </div>
        </section>
      )}

      {hasContent ? (
        <ArticleContent html={seite.content_md} />
      ) : (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-8 text-center">
          <p className="text-stone-600 mb-4">Dieser Artikel wird gerade überarbeitet.</p>
          <a href={`/${params.silo}`} className="text-amber-600 font-medium hover:underline">
            Zurück zu {siloName} →
          </a>
        </div>
      )}

      {werkzeuge.length > 0 && (
        <section className="mt-8 mb-8 p-6 bg-amber-50 border border-amber-200 rounded-xl">
          <h2 className="text-lg font-bold mb-3">🔧 Werkzeug-Checkliste</h2>
          <p className="text-sm text-stone-600 mb-4">Das brauchst du für dieses Projekt:</p>
          <div className="grid gap-3">
            {werkzeuge.map((p: any) => (
              <ProduktKarte key={p.id} produkt={p} compact />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Passende Rechner</h2>
        <p className="text-sm text-stone-600 mb-4">Berechne Material und Kosten für dein Projekt:</p>
        <div className="flex flex-wrap gap-3">
          <a href="/rechner/wandfarbe" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Wandfarbe-Rechner</a>
          <a href="/rechner/fliesen" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Fliesen-Rechner</a>
          <a href="/rechner/trockenbau" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Trockenbau-Rechner</a>
          <a href="/rechner/stromverbrauch" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Stromerzeuger-Rechner</a>
        </div>
      </div>

      <CommunityKosten seitenSlug={seite.slug} />
    </div>
  );
}

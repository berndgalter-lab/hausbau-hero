import { notFound } from "next/navigation";
import { supabase, REVALIDATE } from "@/lib/supabase";
import FAQSection from "@/components/FAQSection";
import RechnerHinweis from "@/components/RechnerHinweis";
import AngebotsBox from "@/components/AngebotsBox";
import RechnerClient from "./RechnerClient";
import { getFaqBySlug } from "@/lib/faq-data";
import { getRatgeberSlug } from "@/lib/ratgeber-zuordnung";
import type { RechnerMaterial } from "@/lib/rechner-logic";

export const revalidate = REVALIDATE;

/** Alle Rechner zur Build-Zeit vorrendern; neue kommen über die Revalidierung dazu. */
export async function generateStaticParams() {
  const { data } = await supabase.from("rechner").select("slug");
  return (data ?? []).map((r: { slug: string }) => ({ slug: r.slug }));
}

async function ladeRechner(slug: string) {
  const { data: rechner } = await supabase
    .from("rechner")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!rechner) return null;

  const { data: materialien } = await supabase
    .from("rechner_materialien")
    .select("*")
    .eq("rechner_id", rechner.id)
    .order("sortierung");

  const ratgeberSlug = getRatgeberSlug(rechner.slug, rechner.ratgeber_slug);
  let ratgeber: { slug: string; titel: string; seo_description?: string; silos?: { slug: string } } | null = null;
  if (ratgeberSlug) {
    const { data } = await supabase
      .from("seiten")
      .select("slug, titel, seo_description, silos(slug)")
      .eq("slug", ratgeberSlug)
      .eq("status", "aktiv")
      .single();
    if (data) ratgeber = data as any;
  }

  return {
    rechner,
    materialien: (materialien ?? []) as RechnerMaterial[],
    ratgeber,
  };
}

export default async function RechnerPage({ params }: { params: { slug: string } }) {
  const daten = await ladeRechner(params.slug);
  if (!daten) notFound();

  const { rechner, materialien, ratgeber } = daten;
  const faqs = getFaqBySlug(rechner.slug);
  const url = `https://hausbau-hero.de/rechner/${rechner.slug}`;

  return (
    <div className="max-w-3xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: rechner.name,
            description: rechner.beschreibung,
            url,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            author: { "@type": "Organization", name: "Hausbau Hero" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
              { "@type": "ListItem", position: 2, name: "Rechner", item: "https://hausbau-hero.de/rechner" },
              { "@type": "ListItem", position: 3, name: rechner.name, item: url },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href="/rechner" className="hover:text-stone-700">Rechner</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">{rechner.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{rechner.name}</h1>
      <p className="text-stone-600 mb-8">{rechner.beschreibung}</p>

      <RechnerClient
        slug={rechner.slug}
        name={rechner.name}
        eingabefelder={rechner.eingabefelder}
        berechnungslogik={rechner.berechnungslogik}
        materialien={materialien}
      />

      <AngebotsBox slug={rechner.slug} />

      {ratgeber && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-bold mb-2">📖 Ratgeber zum Thema</h2>
          <a href={`/${ratgeber.silos?.slug || "rohbau"}/${ratgeber.slug}`} className="group block">
            <div className="font-medium group-hover:text-amber-700 transition-colors">
              {ratgeber.titel}
            </div>
            {ratgeber.seo_description && (
              <p className="text-sm text-stone-600 mt-1">{ratgeber.seo_description}</p>
            )}
            <span className="inline-block mt-2 text-amber-600 text-sm font-medium">Weiterlesen →</span>
          </a>
        </div>
      )}

      <RechnerHinweis />

      <FAQSection faqs={faqs} rechnerName={rechner.name} />
    </div>
  );
}

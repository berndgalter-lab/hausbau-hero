import { supabase } from "@/lib/supabase";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import ProduktKarte from "@/components/ProduktKarte";
import AngebotsBox from "@/components/AngebotsBox";
import { getPassendeRechner } from "@/lib/rechner-zuordnung";
import { bereiteArtikelAuf, textLaenge, MIN_TEXT_LAENGE } from "@/lib/artikel-html";
import Link from "next/link";

// 1 h. Muss ein Literal sein — Next analysiert Segment-Configs statisch (siehe REVALIDATE in lib/supabase.ts).
export const revalidate = 3600;

export async function generateStaticParams() {
  const { data } = await supabase
    .from("seiten")
    .select("slug, silos(slug)")
    .eq("status", "aktiv");
  return (data ?? [])
    .map((s: any) => ({ silo: s.silos?.slug, slug: s.slug }))
    .filter((p: any) => p.silo);
}

async function ladeSeite(slug: string) {
  const { data, error } = await supabase
    .from("seiten")
    .select("*, silos(name, slug)")
    .eq("slug", slug)
    .single();
  if (error) console.error("[ArtikelPage] Query error:", error.message);
  return data;
}

export async function generateMetadata(
  props: {
    params: Promise<{ silo: string; slug: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const seite = await ladeSeite(params.slug);
  if (!seite) return {};

  const echtesSilo = (seite as any).silos?.slug ?? params.silo;
  const duennerInhalt = textLaenge(seite.content_md) < MIN_TEXT_LAENGE;

  return {
    title: seite.seo_title || seite.titel,
    description: seite.seo_description || "",
    // Canonical zeigt immer auf das echte Silo, nie auf das aus der aufgerufenen URL.
    alternates: { canonical: `https://hausbau-hero.de/${echtesSilo}/${seite.slug}` },
    // Zu dünne Altartikel bleiben erreichbar, gehören aber nicht in den Index.
    robots: duennerInhalt ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${seite.seo_title || seite.titel} — Hausbau Hero`,
      description: seite.seo_description || "",
      url: `https://hausbau-hero.de/${echtesSilo}/${seite.slug}`,
    },
  };
}

export default async function ArtikelPage(
  props: {
    params: Promise<{ silo: string; slug: string }>;
  }
) {
  const params = await props.params;
  const seite = await ladeSeite(params.slug);
  if (!seite) notFound();

  if (seite.status === "redirect" && seite.redirect_to) {
    permanentRedirect(seite.redirect_to);
  }
  if (seite.status !== "aktiv") notFound();

  // Ohne diese Prüfung liefert jedes beliebige Silo-Präfix denselben Artikel mit
  // Status 200 aus — beliebig vervielfältigter Duplicate Content.
  const echtesSilo = (seite as any).silos?.slug;
  if (echtesSilo && echtesSilo !== params.silo) {
    permanentRedirect(`/${echtesSilo}/${seite.slug}`);
  }

  const siloName = (seite as any).silos?.name || params.silo;

  const { data: produktDaten } = await supabase
    .from("produkte")
    .select("*")
    .eq("seite_id", seite.id)
    .order("sortierung");
  const produkte = produktDaten ?? [];

  const werkzeuge = produkte.filter((p: any) => p.ist_werkzeug);
  const hauptProdukte = produkte.filter((p: any) => !p.ist_werkzeug);

  const html = bereiteArtikelAuf(seite.content_md);
  const hasContent = textLaenge(html) > 50;
  const hatAffiliateLinks =
    produkte.length > 0 || /amazon\.[a-z.]+|amzn\.to/i.test(html);

  const rechnerSlugs = getPassendeRechner(seite.slug, seite.passende_rechner);
  const { data: rechnerDaten } = await supabase
    .from("rechner")
    .select("name, slug")
    .in("slug", rechnerSlugs);
  const passendeRechner = rechnerDaten ?? [];

  const url = `https://hausbau-hero.de/${echtesSilo || params.silo}/${seite.slug}`;

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
              {
                "@type": "ListItem",
                position: 2,
                name: siloName,
                item: `https://hausbau-hero.de/${echtesSilo || params.silo}`,
              },
              { "@type": "ListItem", position: 3, name: seite.titel, item: url },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <Link href="/" className="hover:text-stone-700">Start</Link>
        <span className="mx-2">›</span>
        <Link href={`/${echtesSilo || params.silo}`} className="hover:text-stone-700">{siloName}</Link>
        <span className="mx-2">›</span>
        <span className="text-stone-900">{seite.titel}</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-3">{seite.titel}</h1>

      {/* Direkt unter der Überschrift, weil die Rechner die eigentlichen Zielseiten sind. */}
      {passendeRechner.length > 0 && (
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
          <p className="mb-2 text-sm font-semibold text-stone-800">
            🧮 Direkt ausrechnen statt schätzen:
          </p>
          <div className="flex flex-wrap gap-2">
            {passendeRechner.map((r: any) => (
              <Link
                key={r.slug}
                href={`/rechner/${r.slug}`}
                className="rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-stone-700 ring-1 ring-amber-200 transition-colors hover:text-amber-700 hover:ring-amber-400"
              >
                {r.name} →
              </Link>
            ))}
          </div>
        </div>
      )}

      {hatAffiliateLinks && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 text-sm text-stone-600">
          <strong className="text-stone-800">Hinweis:</strong> Dieser Artikel enthält
          Affiliate-Links. Wenn du über diese Links einkaufst, erhalten wir eine kleine
          Provision — für dich ändert sich der Preis nicht.
        </div>
      )}

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
        <article
          className="prose prose-stone prose-lg max-w-none
            prose-headings:text-stone-900 prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
            prose-p:text-stone-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-stone-900
            prose-ul:my-4 prose-li:text-stone-700
            prose-table:border-collapse prose-th:bg-stone-100 prose-th:p-3 prose-td:p-3 prose-td:border prose-td:border-stone-200
            prose-img:rounded-lg prose-img:max-w-full"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-8 text-center">
          <p className="text-stone-600 mb-4">Dieser Artikel wird gerade überarbeitet.</p>
          <Link href={`/${echtesSilo || params.silo}`} className="text-amber-600 font-medium hover:underline">
            Zurück zu {siloName} →
          </Link>
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

      <AngebotsBox slug={seite.slug} />

      {passendeRechner.length > 0 && (
        <div className="mt-12 bg-stone-50 border border-stone-200 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-3">Passende Rechner</h2>
          <p className="text-sm text-stone-600 mb-4">
            Berechne Material und Kosten für dein Projekt:
          </p>
          <div className="flex flex-wrap gap-3">
            {passendeRechner.map((r: any) => (
              <Link
                key={r.slug}
                href={`/rechner/${r.slug}`}
                className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

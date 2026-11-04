import { supabase } from "@/lib/supabase";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import ProduktKarte from "@/components/ProduktKarte";
import VergleichsTabelle from "@/components/VergleichsTabelle";
import { angeboteFuerEans, normEan, type EanAngebot } from "@/lib/kaufberatung";
import ArticleContent from "@/components/ArticleContent";
import { getPassendeRechner } from "@/lib/rechner-zuordnung";
import { ersatzteilVerweise } from "@/lib/ersatzteil-verweise";
import { zerlegeArtikel } from "@/lib/artikel-aufbau";
import { armaturDaten } from "@/lib/armatur-daten";
import ModellFinder from "@/components/ModellFinder";
import {
  AffiliateHinweis,
  KurzeAntwort,
  MethodenKasten,
  ModellAbschnitt,
  PreisStand,
  Pruefvermerk,
  Quellen,
  modellAnker,
} from "@/components/Ratgeber";

export const revalidate = 0;

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

// Aufbau nach docs/SEITENAUFBAU.md, Abschnitt 3: Frage, Stand und Quellen, das Wichtigste,
// Finder, Wissen, die Modelle, Datentabelle, Ersatzteile, Quellen, Affiliate-Hinweis.
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

  // Shop-Angebote und Bilder der Partnershops, über die EAN der Produkte
  const nachEan = await angeboteFuerEans(hauptProdukte.map((p: any) => p.ean));
  const angebote: Record<string, EanAngebot[]> = {};
  for (const p of hauptProdukte) {
    const e = normEan(p.ean);
    if (e && nachEan.has(e)) angebote[p.id] = nachEan.get(e)!;
  }
  const hasContent = seite.content_md && seite.content_md.trim().length > 50;
  const aufbau = hasContent ? zerlegeArtikel(seite.content_md) : null;

  const finderModelle = hauptProdukte
    .map((p: any) => ({ p, daten: armaturDaten(p.technische_daten) }))
    .filter((x) => x.daten)
    .map(({ p, daten }) => ({
      id: p.id,
      anker: modellAnker(p),
      name: p.name,
      einsatzbereich: p.einsatzbereich ?? null,
      daten: daten!,
    }));

  const verweise = ersatzteilVerweise(seite.slug);
  const hatPartnerlinks = hauptProdukte.length > 0 || werkzeuge.length > 0;

  const rechnerSlugs = getPassendeRechner(seite.slug, seite.passende_rechner);
  let passendeRechner: { name: string; slug: string }[] = [];
  if (rechnerSlugs.length > 0) {
    try {
      const { data } = await supabase
        .from("rechner")
        .select("name, slug")
        .in("slug", rechnerSlugs);
      if (data) passendeRechner = data;
    } catch (e) {
      console.error("[ArtikelPage] Rechner query error:", e);
    }
  }

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

      <h1 className="text-3xl font-bold text-stone-900 mb-3">{seite.titel}</h1>

      {aufbau ? (
        <>
          <Pruefvermerk stand={aufbau.stand} quellenAnzahl={aufbau.quellenAnzahl} />
          {aufbau.einstieg && <ArticleContent html={aufbau.einstieg} />}
          {aufbau.methode && <MethodenKasten html={aufbau.methode} />}
          {aufbau.wichtigstes && <KurzeAntwort html={aufbau.wichtigstes} />}
          {finderModelle.length >= 3 && <ModellFinder modelle={finderModelle} />}
          {aufbau.rumpf && <ArticleContent html={aufbau.rumpf} />}
        </>
      ) : (
        <div className="bg-stone-50 border border-stone-200 rounded-xl p-8 text-center">
          <p className="text-stone-600 mb-4">Dieser Artikel wird gerade überarbeitet.</p>
          <a href={`/${params.silo}`} className="text-amber-600 font-medium hover:underline">
            Zurück zu {siloName} →
          </a>
        </div>
      )}

      {hauptProdukte.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Die Modelle im Einzelnen</h2>
          <div>
            {hauptProdukte.map((p: any) => (
              <ModellAbschnitt key={p.id} produkt={p} angebote={angebote[p.id]} />
            ))}
          </div>
          <PreisStand angebote={angebote} />
        </section>
      )}

      <VergleichsTabelle produkte={hauptProdukte} angebote={angebote} />

      {werkzeuge.length > 0 && (
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-3">Werkzeug für dieses Projekt</h2>
          <div className="grid gap-3">
            {werkzeuge.map((p: any) => (
              <ProduktKarte key={p.id} produkt={p} />
            ))}
          </div>
        </section>
      )}

      {verweise.length > 0 && (
        <section className="mt-12 p-6 bg-white border border-stone-200 rounded-xl">
          <h2 className="text-lg font-bold mb-1">Wenn etwas kaputt geht</h2>
          <p className="text-sm text-stone-600 mb-4">Passende Ersatzteile und Hilfe bei typischen Problemen:</p>
          <ul className="space-y-2">
            {verweise.map((v) => (
              <li key={v.href}>
                <a href={v.href} className="text-amber-700 font-medium hover:underline">
                  {v.titel} →
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {passendeRechner.length > 0 && (
        <div className="mt-8 text-sm text-stone-600">
          Passender Rechner:{" "}
          {passendeRechner.map((r, i) => (
            <span key={r.slug}>
              {i > 0 && ", "}
              <a href={`/rechner/${r.slug}`} className="text-amber-700 hover:underline">{r.name}</a>
            </span>
          ))}
        </div>
      )}

      {aufbau?.quellen && <Quellen html={aufbau.quellen} />}
      {hatPartnerlinks && <AffiliateHinweis />}
    </div>
  );
}

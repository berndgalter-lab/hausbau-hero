import { supabase } from "@/lib/supabase";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import ProduktKarte, { produktLink } from "@/components/ProduktKarte";
import VergleichsTabelle from "@/components/VergleichsTabelle";
import { angeboteFuerEans, normEan, type EanAngebot } from "@/lib/kaufberatung";
import ArticleContent from "@/components/ArticleContent";
import { getPassendeRechner } from "@/lib/rechner-zuordnung";
import { ersatzteilVerweise } from "@/lib/ersatzteil-verweise";
import { mitAnkern, zerlegeArtikel, type Gliederungspunkt } from "@/lib/artikel-aufbau";
import { armaturDaten } from "@/lib/armatur-daten";
import ModellFinder from "@/components/ModellFinder";
import { ratgeberNachSlug, weiterleitungsZiel } from "@/lib/produkt-ratgeber";
import {
  AffiliateHinweis,
  ArtikelPfad,
  ArtikelRahmen,
  KaputtVerweise,
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
    .select("titel, seo_title, seo_description, silos(slug)")
    .eq("slug", params.slug)
    .single();

  if (!seite) return {};
  // Canonical immer mit der echten Kategorie, auch wenn die Seite unter einer falschen aufgerufen wird
  const silo = (seite as any).silos?.slug || params.silo;

  const title = seite.seo_title || seite.titel;
  const description = seite.seo_description || "";

  return {
    title,
    description,
    alternates: { canonical: `https://hausbau-hero.de/${silo}/${params.slug}` },
    openGraph: {
      title: `${title} — Hausbau Hero`,
      description,
      url: `https://hausbau-hero.de/${silo}/${params.slug}`,
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
    permanentRedirect(weiterleitungsZiel(seite.redirect_to));
  }

  if (seite.status !== "aktiv") notFound();

  // Produkt-Ratgeber stehen unter /ratgeber/<produkt> (src/lib/produkt-ratgeber.ts)
  const produktRatgeber = ratgeberNachSlug(seite.slug);
  if (produktRatgeber) permanentRedirect(`/ratgeber/${produktRatgeber.pfad}`);

  // Dieselbe Seite unter einer anderen Kategorie (/bad/silikatfarbe) wäre eine Dublette: auf die echte leiten
  const echteKategorie = (seite as any).silos?.slug;
  if (echteKategorie && echteKategorie !== params.silo) permanentRedirect(`/${echteKategorie}/${params.slug}`);

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
  // Nur nachprüfbare Modelle (ASIN oder EAN). Gattungsbegriffe mit Amazon-Suchlink („Kondensatpumpe“)
  // aus alten Beiträgen bekommen keinen eigenen Abschnitt.
  const hauptProdukte = produkte.filter((p: any) => !p.ist_werkzeug && (p.amazon_asin || normEan(p.ean)));

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
  const rumpf = mitAnkern(aufbau?.rumpf ?? "");
  const gliederung: Gliederungspunkt[] = [
    ...(aufbau?.wichtigstes ? [{ id: "kurz", titel: aufbau.wichtigstesTitel ?? "Das Wichtigste vorab" }] : []),
    ...rumpf.gliederung,
    ...(hauptProdukte.length > 0 ? [{ id: "modelle", titel: "Die Modelle im Einzelnen" }] : []),
    ...(hauptProdukte.filter((p: any) => p.technische_daten).length >= 2 ? [{ id: "daten", titel: "Technische Daten" }] : []),
    ...(verweise.length > 0 ? [{ id: "ersatzteile", titel: "Wenn etwas kaputt geht" }] : []),
    ...(aufbau?.quellen ? [{ id: "quellen", titel: "Quellen" }] : []),
  ];
  // Reine Ratgeber ohne Produkte und ohne Partnerlinks im Text brauchen keinen Affiliate-Hinweis.
  const hatPartnerlinks =
    hauptProdukte.length > 0 ||
    werkzeuge.some((p: any) => produktLink(p)) ||
    /amazon\.de\/(dp|gp)\/|awin1\.com/i.test(seite.content_md ?? "");

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
    <>
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

      <ArtikelRahmen
        gliederung={gliederung}
        kopf={
          <header>
            <ArtikelPfad teile={[{ name: "Start", href: "/" }, { name: siloName, href: `/${params.silo}` }, { name: seite.titel }]} />
            <h1 className="text-[2.25rem] leading-[1.1] text-stone-900 sm:text-5xl">{seite.titel}</h1>
            {aufbau?.einstieg && (
              <div className="mt-6">
                <ArticleContent html={aufbau.einstieg} gross />
              </div>
            )}
            {aufbau && (
              <div className="mt-6">
                <Pruefvermerk stand={aufbau.stand} quellenAnzahl={aufbau.quellenAnzahl} />
              </div>
            )}
          </header>
        }
      >
      {aufbau ? (
        <>
          {aufbau.methode && <MethodenKasten html={aufbau.methode} ohneTest={aufbau.ohneTest} />}
          {aufbau.wichtigstes && <KurzeAntwort html={aufbau.wichtigstes} titel={aufbau.wichtigstesTitel ?? "Das Wichtigste vorab"} />}
          {finderModelle.length >= 3 && <ModellFinder modelle={finderModelle} />}
          {rumpf.html && <ArticleContent html={rumpf.html} />}
        </>
      ) : (
        <div className="border-y border-stone-200 py-10 text-center">
          <p className="text-stone-600 mb-4">Dieser Artikel wird gerade überarbeitet.</p>
          <a href={`/${params.silo}`} className="weiterlink">
            Zurück zu {siloName}
          </a>
        </div>
      )}

      {hauptProdukte.length > 0 && (
        <section id="modelle" className="mt-16 scroll-mt-24">
          <h2 className="text-[1.75rem] font-semibold leading-tight text-stone-900 mb-2">Die Modelle im Einzelnen</h2>
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
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-3">Werkzeug für dieses Projekt</h2>
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {werkzeuge.map((p: any) => (
              <ProduktKarte key={p.id} produkt={p} />
            ))}
          </div>
        </section>
      )}

      <KaputtVerweise verweise={verweise} />

      {passendeRechner.length > 0 && (
        <div className="mt-8 text-sm text-stone-600">
          Passender Rechner:{" "}
          {passendeRechner.map((r, i) => (
            <span key={r.slug}>
              {i > 0 && ", "}
              <a href={`/rechner/${r.slug}`} className="text-accent-700 underline decoration-accent-300 underline-offset-2">{r.name}</a>
            </span>
          ))}
        </div>
      )}

      {aufbau?.quellen && <Quellen html={aufbau.quellen} />}
      {hatPartnerlinks && <AffiliateHinweis />}
      </ArtikelRahmen>
    </>
  );
}

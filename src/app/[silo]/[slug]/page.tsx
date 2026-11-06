import { supabase } from "@/lib/supabase";
import { notFound, permanentRedirect } from "next/navigation";
import type { Metadata } from "next";
import ArticleContent from "@/components/ArticleContent";
import { getPassendeRechner } from "@/lib/rechner-zuordnung";
import { ersatzteilVerweise } from "@/lib/ersatzteil-verweise";
import { mitAnkern, zerlegeArtikel, type Gliederungspunkt } from "@/lib/artikel-aufbau";
import { enthaeltPartnerlinks } from "@/lib/affiliate";
import { ratgeberNachSlug, weiterleitungsZiel } from "@/lib/produkt-ratgeber";
import { AffiliateHinweis, ArtikelPfad, ArtikelRahmen, HaeufigeFragen, KaputtVerweise, KurzeAntwort, Pruefvermerk, Quellen } from "@/components/Ratgeber";

export const revalidate = 3600;

// Leere Liste: Pfade werden nicht beim Build erzeugt, sondern beim ersten Aufruf gerendert und dann gecacht (ISR).
export function generateStaticParams() {
  return [];
}

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

// Wissensbeiträge ohne Produktauswahl (docs/SEITENAUFBAU.md, Abschnitt 3): Frage, Einstieg, Stand,
// kurze Antwort, Erklärteil, Ersatzteile, häufige Fragen, Quellen. Beiträge mit Modellen stehen als
// Produkt-Ratgeber unter /ratgeber/<produkt> und werden dorthin geleitet.
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

  const hasContent = seite.content_md && seite.content_md.trim().length > 50;
  const aufbau = hasContent ? zerlegeArtikel(seite.content_md, { fragen: true }) : null;

  const verweise = ersatzteilVerweise(seite.slug);
  // Affiliate-Hinweis nur bei Partnerlinks im Text
  const rumpf = mitAnkern(aufbau?.rumpf ?? "");
  const gliederung: Gliederungspunkt[] = [
    ...(aufbau?.wichtigstes ? [{ id: "kurz", titel: aufbau.wichtigstesTitel ?? "Kurz gesagt" }] : []),
    ...rumpf.gliederung,
    ...(verweise.length > 0 ? [{ id: "ersatzteile", titel: "Wenn etwas kaputt geht" }] : []),
    ...(aufbau && aufbau.fragen.length > 0 ? [{ id: "fragen", titel: "Häufige Fragen" }] : []),
    ...(aufbau?.quellen ? [{ id: "quellen", titel: "Quellen" }] : []),
  ];
  const hatPartnerlinks = enthaeltPartnerlinks(`${aufbau?.einstieg ?? ""}${rumpf.html}`);

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
                <Pruefvermerk stand={aufbau.stand} quellenAnzahl={aufbau.quellenAnzahl} methode={aufbau.ohneTest ? "Herstellerangaben, kein Test" : null} partnerlinks={hatPartnerlinks} />
              </div>
            )}
          </header>
        }
      >
      {aufbau ? (
        <>
          {aufbau.wichtigstes && <KurzeAntwort html={aufbau.wichtigstes} titel={aufbau.wichtigstesTitel ?? "Kurz gesagt"} />}
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

      {aufbau && <HaeufigeFragen fragen={aufbau.fragen} />}
      {aufbau?.quellen && <Quellen html={aufbau.quellen} />}
      {hatPartnerlinks && <AffiliateHinweis />}
      </ArtikelRahmen>
    </>
  );
}

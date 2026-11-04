import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { produktLink } from "@/components/ProduktKarte";
import VergleichsTabelle from "@/components/VergleichsTabelle";
import ArticleContent from "@/components/ArticleContent";
import Auswahlhilfe, { type AuswahlModell, type KaufLink } from "@/components/Auswahlhilfe";
import { AffiliateHinweis, HaeufigeFragen, KurzeAntwort, ProduktKacheln, Pruefvermerk, Quellen } from "@/components/Ratgeber";
import { angeboteFuerEans, bildAusAngeboten, normEan, type EanAngebot } from "@/lib/kaufberatung";
import { mitTrackingId } from "@/lib/affiliate";
import { produktDaten as datenAus, type RatgeberDaten } from "@/lib/armatur-daten";
import { zerlegeArtikel } from "@/lib/artikel-aufbau";
import { ersatzteilVerweise } from "@/lib/ersatzteil-verweise";
import { formatEuro, formatStand, zeigePreis } from "@/lib/ersatzteile";
import { PRODUKT_RATGEBER, ratgeberNachPfad } from "@/lib/produkt-ratgeber";

// Produkt-Ratgeber, Aufbau nach docs/SEITENAUFBAU.md, Abschnitt 3: Frage, Einstieg, Stand,
// kurze Antwort, Auswahlhilfe mit Bild und Kaufzeile je Modell, kurzer Erklärteil, Datenblätter,
// Ersatzteile, häufige Fragen, Quellen. Keine Einzelabschnitte je Modell, keine Abzeichen.

export const revalidate = 0;

const BASIS = "https://hausbau-hero.de";

export function generateStaticParams() {
  return PRODUKT_RATGEBER.map((r) => ({ produkt: r.pfad }));
}

async function ladeSeite(slug: string) {
  const { data, error } = await supabase
    .from("seiten")
    .select("*, silos(name, slug)")
    .eq("slug", slug)
    .eq("status", "aktiv")
    .single();
  if (error) console.error("[Ratgeber] Seite:", error.message);
  return data;
}

export async function generateMetadata({ params }: { params: { produkt: string } }): Promise<Metadata> {
  const ratgeber = ratgeberNachPfad(params.produkt);
  if (!ratgeber) return {};
  const seite = await ladeSeite(ratgeber.slug);
  if (!seite) return {};
  const title = seite.seo_title || seite.titel;
  const description = seite.seo_description || "";
  const url = `${BASIS}/ratgeber/${ratgeber.pfad}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} — Hausbau Hero`, description, url },
  };
}

/** Kaufzeile: bis zu drei Partnershops mit Preis, dann Amazon (nur mit ASIN). */
function kaufLinks(p: any, angebote: EanAngebot[]): KaufLink[] {
  const kennung = (p.hersteller_nr || p.name).slice(0, 80);
  const links: KaufLink[] = angebote.slice(0, 3).map((a) => ({
    url: mitTrackingId(a.url, "angebot"),
    text: zeigePreis(a) ? `${formatEuro(a.preis!)} bei ${a.shop_name}` : a.shop_name,
    shop: a.shop,
    platzierung: "angebot",
    kennung,
  }));
  const amazon = produktLink(p);
  if (amazon) links.push({ url: amazon, text: "Amazon", platzierung: "box", kennung });
  return links;
}

export default async function ProduktRatgeberSeite({ params }: { params: { produkt: string } }) {
  const ratgeber = ratgeberNachPfad(params.produkt);
  if (!ratgeber) notFound();
  const seite = await ladeSeite(ratgeber.slug);
  if (!seite || !seite.content_md) notFound();

  const bereich = (seite as any).silos as { name: string; slug: string } | null;
  const url = `${BASIS}/ratgeber/${ratgeber.pfad}`;

  const { data: produktDaten, error } = await supabase
    .from("produkte")
    .select("*")
    .eq("seite_id", seite.id)
    .order("sortierung");
  if (error) console.error("[Ratgeber] Produkte:", error.message);
  // Nur nachprüfbare Modelle (ASIN oder EAN)
  const produkte = ((produktDaten as any[]) ?? []).filter((p) => !p.ist_werkzeug && (p.amazon_asin || normEan(p.ean)));

  const nachEan = await angeboteFuerEans(produkte.map((p) => p.ean));
  const angebote: Record<string, EanAngebot[]> = {};
  for (const p of produkte) {
    const e = normEan(p.ean);
    if (e && nachEan.has(e)) angebote[p.id] = nachEan.get(e)!;
  }
  const preisStand = Object.values(angebote)
    .flat()
    .reduce<string | null>((m, a) => (!m || a.stand < m ? a.stand : m), null);

  const modelle: AuswahlModell[] = produkte
    .map((p) => ({ p, daten: datenAus(p.technische_daten) as RatgeberDaten | null }))
    .filter((x) => x.daten)
    .map(({ p, daten }) => ({
      id: p.id,
      name: p.name,
      einsatzbereich: p.einsatzbereich ?? null,
      kurzbeschreibung: p.kurzbeschreibung ?? null,
      vorteile: p.vorteile ?? [],
      nachteile: p.nachteile ?? [],
      daten: daten!,
      bild: bildAusAngeboten(angebote[p.id] ?? []),
      kauf: kaufLinks(p, angebote[p.id] ?? []),
    }));

  const kacheln = modelle.map((m) => {
    const p = produkte.find((x) => x.id === m.id);
    const preise = (angebote[m.id] ?? []).filter(zeigePreis).map((a) => a.preis!);
    return {
      id: m.id,
      name: m.name,
      hersteller: p?.hersteller ?? null,
      einsatzbereich: m.einsatzbereich,
      bild: m.bild,
      preisAb: preise.length > 0 ? Math.min(...preise) : null,
    };
  });

  const aufbau = zerlegeArtikel(seite.content_md, { fragen: true });
  const verweise = ersatzteilVerweise(seite.slug);
  const fussnote = [
    "Maße und Ausstattung laut Hersteller.",
    preisStand ? `Bilder und Preise von den Partnershops, inkl. MwSt., zzgl. Versand, Stand ${formatStand(preisStand)} Uhr.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: BASIS },
              ...(bereich ? [{ "@type": "ListItem", position: 2, name: bereich.name, item: `${BASIS}/${bereich.slug}` }] : []),
              { "@type": "ListItem", position: bereich ? 3 : 2, name: ratgeber.name, item: url },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        {bereich && (
          <>
            <span className="mx-2">›</span>
            <a href={`/${bereich.slug}`} className="hover:text-stone-700">{bereich.name}</a>
          </>
        )}
        <span className="mx-2">›</span>
        <span className="text-stone-900">{ratgeber.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-3">{seite.titel}</h1>
      {aufbau.einstieg && <ArticleContent html={aufbau.einstieg} />}
      <Pruefvermerk stand={aufbau.stand} quellenAnzahl={aufbau.quellenAnzahl} methode={aufbau.ohneTest ? "Datenblattvergleich, kein Test" : null} />

      {aufbau.wichtigstes && <KurzeAntwort html={aufbau.wichtigstes} titel={aufbau.wichtigstesTitel ?? "Kurz gesagt"} />}

      <ProduktKacheln kacheln={kacheln} />

      <Auswahlhilfe pfad={ratgeber.pfad} modelle={modelle} fussnote={fussnote} />

      {aufbau.rumpf && <ArticleContent html={aufbau.rumpf} />}

      <VergleichsTabelle produkte={produkte} angebote={angebote} eingeklappt />

      {verweise.length > 0 && (
        <section className="mt-12 p-6 bg-white border border-stone-200 rounded-xl">
          <h2 className="text-lg font-bold mb-1">Wenn etwas kaputt geht</h2>
          <p className="text-sm text-stone-600 mb-4">Ersatzteile und Hilfe bei typischen Problemen:</p>
          <ul className="space-y-2">
            {verweise.map((v) => (
              <li key={v.href}>
                <a href={v.href} className="text-amber-700 font-medium hover:underline">{v.titel} →</a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <HaeufigeFragen fragen={aufbau.fragen} />
      {aufbau.quellen && <Quellen html={aufbau.quellen} />}
      {modelle.some((m) => m.kauf.length > 0) && <AffiliateHinweis />}
    </div>
  );
}

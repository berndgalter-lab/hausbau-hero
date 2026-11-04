import { supabase } from "@/lib/supabase";
import { angeboteFuerEans, bildAusAngeboten, normEan } from "@/lib/kaufberatung";
import { alleMarken, alleProbleme, type Marke, type Problem, type Serie } from "@/lib/ersatzteile";
import { artikelUrl } from "@/lib/produkt-ratgeber";
import { BEREICHE, bereichHatInhalt, type Bereich } from "@/lib/bereiche";
import { problemeAllgemeinImBereich, type ProblemAllgemein } from "@/lib/probleme-allgemein";
import { teilartenImBereich, type Teilart } from "@/lib/teilarten";

export interface RatgeberKarte {
  slug: string;
  href: string;
  titel: string;
  text: string | null;
  /** Produktbild aus den Partner-Feeds: das erste Modell des Ratgebers, das eines hat. */
  bild: { url: string; shop: string } | null;
}

/** Ratgeber-Karten mit Bild, in der Reihenfolge der Slugs. Fehlt eine Seite oder ist sie nicht aktiv, fällt sie weg. */
export async function ratgeberKarten(slugs: string[]): Promise<RatgeberKarte[]> {
  if (slugs.length === 0) return [];
  const { data: seiten } = await supabase
    .from("seiten")
    .select("id, slug, titel, seo_description, silos(slug)")
    .in("slug", slugs)
    .eq("status", "aktiv");
  const liste = (seiten ?? []) as unknown as {
    id: string;
    slug: string;
    titel: string;
    seo_description: string | null;
    silos: { slug: string } | null;
  }[];
  if (liste.length === 0) return [];

  const { data: produkte } = await supabase
    .from("produkte")
    .select("seite_id, ean, sortierung")
    .in("seite_id", liste.map((s) => s.id))
    .order("sortierung");
  const eansJeSeite = new Map<string, string[]>();
  for (const p of (produkte ?? []) as { seite_id: string; ean: string | null }[]) {
    if (p.ean) eansJeSeite.set(p.seite_id, [...(eansJeSeite.get(p.seite_id) ?? []), p.ean]);
  }
  const angebote = await angeboteFuerEans(Array.from(eansJeSeite.values()).flat());

  const karten = liste.map((s) => {
    let bild: RatgeberKarte["bild"] = null;
    for (const ean of eansJeSeite.get(s.id) ?? []) {
      const n = normEan(ean);
      bild = n ? bildAusAngeboten(angebote.get(n) ?? []) : null;
      if (bild) break;
    }
    return {
      slug: s.slug,
      href: artikelUrl(s.silos?.slug ?? "bad", s.slug),
      titel: s.titel,
      text: s.seo_description,
      bild,
    };
  });
  return slugs.map((slug) => karten.find((k) => k.slug === slug)).filter((k): k is RatgeberKarte => !!k);
}

export interface BereichDaten {
  serien: (Pick<Serie, "id" | "slug" | "name" | "produkttyp" | "marke_id">)[];
  marken: Marke[];
  probleme: Problem[];
  teile: { teiltyp: string; anzahl: number }[];
  ratgeber: RatgeberKarte[];
  teilarten: Teilart[];
  allgemeineProbleme: ProblemAllgemein[];
}

/** Ohne Modelle und ohne Probleme ist eine Bereichsseite nur eine Linkliste: noindex, nicht in der Sitemap. */
export function bereichIstDuenn(b: Bereich, d: Pick<BereichDaten, "probleme" | "teilarten" | "allgemeineProbleme">): boolean {
  return b.produkttypen.length === 0 && d.probleme.length === 0 && d.allgemeineProbleme.length === 0 && d.teilarten.length === 0;
}

/** Bereiche, die etwas zu zeigen haben, in der Reihenfolge von BEREICHE. */
export async function sichtbareBereiche(): Promise<Bereich[]> {
  const probleme = await alleProbleme().catch(() => []);
  return BEREICHE.filter((b) =>
    bereichHatInhalt(b, {
      teilarten: teilartenImBereich(b.slug).length,
      probleme: problemeAllgemeinImBereich(b.slug).length + probleme.filter((p) => b.probleme.test(p.slug)).length,
    }),
  );
}

export async function bereichDaten(b: Bereich): Promise<BereichDaten> {
  const [serien, alle, probleme, teile, ratgeber] = await Promise.all([
    b.produkttypen.length
      ? supabase.from("serien").select("id, slug, name, produkttyp, marke_id").in("produkttyp", b.produkttypen).order("name")
          .then((r) => (r.data ?? []) as BereichDaten["serien"])
      : Promise.resolve([] as BereichDaten["serien"]),
    alleMarken(),
    alleProbleme(),
    b.teiltypen.length
      ? supabase.from("teile").select("teiltyp, marke_id").in("teiltyp", b.teiltypen)
          .then((r) => (r.data ?? []) as { teiltyp: string; marke_id: string }[])
      : Promise.resolve([] as { teiltyp: string; marke_id: string }[]),
    ratgeberKarten(b.ratgeber),
  ]);
  const markenIds = new Set(serien.map((s) => s.marke_id));
  const anzahl = new Map<string, number>();
  for (const t of teile) {
    if (markenIds.size === 0 || markenIds.has(t.marke_id)) anzahl.set(t.teiltyp, (anzahl.get(t.teiltyp) ?? 0) + 1);
  }
  return {
    serien,
    marken: alle.filter((m) => markenIds.has(m.id)),
    probleme: probleme.filter((p) => b.probleme.test(p.slug)),
    teile: b.teiltypen.filter((t) => anzahl.get(t)).map((t) => ({ teiltyp: t, anzahl: anzahl.get(t)! })),
    ratgeber,
    teilarten: teilartenImBereich(b.slug),
    allgemeineProbleme: problemeAllgemeinImBereich(b.slug),
  };
}

import { supabase } from "@/lib/supabase";
import { alleMarken, alleProbleme, type Marke, type Problem, type Serie } from "@/lib/ersatzteile";
import { artikelUrl } from "@/lib/produkt-ratgeber";
import { BEREICHE, HAUPTBEREICHE, bereichFuerProdukttyp, bereichHatInhalt, hauptbereichVon, type Bereich } from "@/lib/bereiche";
import { problemeAllgemeinImBereich, type ProblemAllgemein } from "@/lib/probleme-allgemein";
import { teilartenImBereich, type Teilart } from "@/lib/teilarten";

export interface RatgeberKarte {
  slug: string;
  href: string;
  titel: string;
  text: string | null;
}

/** Ratgeber-Karten, in der Reihenfolge der Slugs. Fehlt eine Seite oder ist sie nicht aktiv, fällt sie weg. */
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

  const karten = liste.map((s) => ({
    slug: s.slug,
    href: artikelUrl(s.silos?.slug ?? "bad", s.slug),
    titel: s.titel,
    text: s.seo_description,
  }));
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

/** Hauptbereiche mit ihren sichtbaren Bereichen, leere fallen weg. */
export async function sichtbareHauptbereiche(): Promise<{ slug: string; name: string; bereiche: Bereich[] }[]> {
  const sichtbar = await sichtbareBereiche();
  return HAUPTBEREICHE.map((h) => ({ slug: h.slug, name: h.name, bereiche: sichtbar.filter((b) => h.bereiche.includes(b.slug)) })).filter(
    (h) => h.bereiche.length > 0,
  );
}

/**
 * Marken nach Hauptbereich, über die Produkttypen ihrer Serien (Grohe → Bad & Küche, VELUX → Fenster & Türen).
 * Eine Marke kann in mehreren stehen; ohne passende Serie landet sie unter „Weitere“.
 */
export async function markenNachHauptbereich(marken: Marke[]): Promise<{ name: string; marken: Marke[] }[]> {
  const { data } = await supabase.from("serien").select("marke_id, produkttyp");
  const zuordnung = new Map<string, Set<string>>();
  for (const s of (data ?? []) as { marke_id: string; produkttyp: string }[]) {
    const b = bereichFuerProdukttyp(s.produkttyp);
    const h = b ? hauptbereichVon(b.slug) : null;
    if (!h) continue;
    if (!zuordnung.has(s.marke_id)) zuordnung.set(s.marke_id, new Set());
    zuordnung.get(s.marke_id)!.add(h.slug);
  }
  // Marken ohne Serien (z. B. Roto): nach den Teilearten ihrer Teile, der Hauptbereich mit den meisten Treffern
  const ohneSerien = marken.filter((m) => !zuordnung.has(m.id));
  if (ohneSerien.length > 0) {
    const { data: teile } = await supabase.from("teile").select("marke_id, teiltyp").in("marke_id", ohneSerien.map((m) => m.id));
    const treffer = new Map<string, Map<string, number>>();
    for (const t of (teile ?? []) as { marke_id: string; teiltyp: string }[]) {
      for (const b of BEREICHE.filter((x) => x.teiltypen.includes(t.teiltyp))) {
        const h = hauptbereichVon(b.slug);
        if (!h) continue;
        const z = treffer.get(t.marke_id) ?? new Map<string, number>();
        z.set(h.slug, (z.get(h.slug) ?? 0) + 1);
        treffer.set(t.marke_id, z);
      }
    }
    treffer.forEach((z, markeId) => {
      const bester = Array.from(z.entries()).sort((x, y) => y[1] - x[1])[0];
      if (bester) zuordnung.set(markeId, new Set([bester[0]]));
    });
  }
  const gruppen = HAUPTBEREICHE.map((h) => ({ name: h.name, marken: marken.filter((m) => zuordnung.get(m.id)?.has(h.slug)) }));
  const weitere = marken.filter((m) => !zuordnung.has(m.id));
  return [...gruppen, { name: "Weitere", marken: weitere }].filter((g) => g.marken.length > 0);
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

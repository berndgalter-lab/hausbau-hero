import { supabase } from "@/lib/supabase";
import { angeboteFuerEans, bildAusAngeboten, normEan, type EanAngebot } from "@/lib/kaufberatung";
import { zeigePreis } from "@/lib/ersatzteile";
import { artikelUrl } from "@/lib/produkt-ratgeber";
import type { Bereich } from "@/lib/bereiche";

export interface NeukaufModell {
  name: string;
  hersteller: string | null;
  bild: { url: string; shop: string } | null;
  /** Günstigstes vorrätiges Angebot mit Preis. Modelle ohne ein solches zeigt der Kasten nicht. */
  angebot: EanAngebot;
}

export interface Neukauf {
  titel: string;
  text: string;
  ratgeberHref: string;
  modelle: NeukaufModell[];
}

/**
 * Neukauf-Hinweis für einen Bereich: bis zu drei Modelle aus dem Ratgeber, je mit Bild und dem
 * günstigsten Partnershop-Angebot. Ohne Modell mit Angebot gibt es keinen Hinweis.
 */
export async function neukaufFuerBereich(b: Bereich | null, anzahl = 3): Promise<Neukauf | null> {
  if (!b?.neukauf) return null;
  const { data: seite } = await supabase
    .from("seiten")
    .select("id, slug, titel, silos(slug)")
    .eq("slug", b.neukauf.ratgeber)
    .eq("status", "aktiv")
    .maybeSingle();
  if (!seite) return null;
  const s = seite as unknown as { id: string; slug: string; titel: string; silos: { slug: string } | null };
  const { data: produkte } = await supabase
    .from("produkte")
    .select("name, hersteller, ean, sortierung")
    .eq("seite_id", s.id)
    .order("sortierung");
  const liste = (produkte ?? []) as { name: string; hersteller: string | null; ean: string | null }[];
  const angebote = await angeboteFuerEans(liste.map((p) => p.ean));

  const modelle: NeukaufModell[] = [];
  for (const p of liste) {
    const n = normEan(p.ean);
    const alle = n ? angebote.get(n) ?? [] : [];
    const angebot = alle.find(zeigePreis);
    if (!angebot) continue;
    modelle.push({ name: p.name, hersteller: p.hersteller, bild: bildAusAngeboten([angebot]), angebot });
    if (modelle.length >= anzahl) break;
  }
  if (modelle.length === 0) return null;
  return { titel: b.neukauf.titel, text: b.neukauf.text, ratgeberHref: artikelUrl(s.silos?.slug ?? "bad", s.slug), modelle };
}

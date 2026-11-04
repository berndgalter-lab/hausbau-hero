import { supabase } from "@/lib/supabase";
import { ANGEBOT_MAX_ALTER_TAGE, sortiereAngebote, type ShopAngebot } from "@/lib/ersatzteile";

// Kaufberatungen: Shop-Angebote und Bilder je EAN (Tabelle ean_angebote, täglich aus den
// Awin-Feeds von scripts/import/awin_feed.py). Technische Daten: src/lib/armatur-daten.ts.

/** Angebot zu einem Kaufberatungs-Produkt, zugeordnet über die EAN. */
export interface EanAngebot extends ShopAngebot {
  ean: string;
}

/** Wie norm_ean im Feed-Skript: nur Ziffern, ohne führende Nullen. */
export function normEan(ean: string | null | undefined): string | null {
  const d = (ean ?? "").replace(/\D/g, "").replace(/^0+/, "");
  return d.length >= 7 && d.length <= 14 ? d : null;
}

/** Angebote je normalisierter EAN, günstigste zuerst. */
export async function angeboteFuerEans(eans: (string | null | undefined)[]): Promise<Map<string, EanAngebot[]>> {
  const liste = Array.from(new Set(eans.map(normEan).filter((e): e is string => !!e)));
  const nachEan = new Map<string, EanAngebot[]>();
  if (liste.length === 0) return nachEan;
  const ab = new Date(Date.now() - ANGEBOT_MAX_ALTER_TAGE * 86400_000).toISOString();
  const { data, error } = await supabase
    .from("ean_angebote")
    .select("id, ean, shop, shop_name, produkt_name, url, preis, versand, vorraetig, lieferzeit, bild_url, stand")
    .in("ean", liste)
    .gte("stand", ab);
  if (error) console.error("[kaufberatung] Angebote:", error.message);
  for (const a of sortiereAngebote((data as EanAngebot[]) ?? [])) {
    nachEan.set(a.ean, [...(nachEan.get(a.ean) ?? []), a]);
  }
  return nachEan;
}

/** So viele Shops verlinken Kaufzeilen und Vergleich je Modell, günstigste zuerst. */
export const VERLINKTE_ANGEBOTE = 3;

/**
 * Bild für die Produktkarte, nur aus den verlinkten Angeboten: Das Foto eines Shops wirbt nie für den Link
 * eines anderen (Werbemittel-Regeln der Advertiser bei Awin). Wer nur ein Angebot verlinkt, gibt nur das mit.
 * Unter den verlinkten vorrätige zuerst, dann das günstigste.
 */
export function bildAusAngeboten(angebote: EanAngebot[]): { url: string; shop: string } | null {
  const mitBild = angebote.slice(0, VERLINKTE_ANGEBOTE).filter((a) => a.bild_url);
  const a = mitBild.find((x) => x.vorraetig !== false) ?? mitBild[0];
  return a ? { url: a.bild_url!, shop: a.shop_name } : null;
}

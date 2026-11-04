import { supabase } from "@/lib/supabase";
import { angeboteFuerEans, bildAusAngeboten, normEan, type EanAngebot } from "@/lib/kaufberatung";
import { STANDARD_TAG, zeigePreis } from "@/lib/ersatzteile";
import { artikelUrl } from "@/lib/produkt-ratgeber";
import { bereichFuerProdukttyp, type Bereich } from "@/lib/bereiche";
import blanco from "../../data/neukauf/blanco.json";
import franke from "../../data/neukauf/franke.json";
import grohe from "../../data/neukauf/grohe.json";
import hansa from "../../data/neukauf/hansa.json";
import hansgrohe from "../../data/neukauf/hansgrohe.json";
import idealStandard from "../../data/neukauf/ideal-standard.json";
import kludi from "../../data/neukauf/kludi.json";
import schell from "../../data/neukauf/schell.json";
import tece from "../../data/neukauf/tece.json";
import velux from "../../data/neukauf/velux.json";
import viega from "../../data/neukauf/viega.json";
import villeroyBoch from "../../data/neukauf/villeroy-boch.json";

export interface NeukaufModell {
  name: string;
  hersteller: string | null;
  /** Nur aus dem Angebot des verlinkten Shops (Awin-Werbemittelregeln), bei Amazon keins. */
  bild: { url: string; shop: string } | null;
  /** Günstigstes vorrätiges Partnershop-Angebot mit Preis. */
  angebot: EanAngebot | null;
  /** Amazon-Produktseite, wenn kein Partnershop das Modell vorrätig hat. */
  amazonUrl: string | null;
  /** Awin-Deeplink auf eine Shopseite ohne Feed-Eintrag (z. B. VELUX-Fenster mit Größenauswahl bei hagebau), ohne Preis und Bild. */
  shopLink?: ShopLink | null;
  hinweis?: string;
}

export interface Neukauf {
  titel: string;
  text: string;
  ratgeberHref: string | null;
  modelle: NeukaufModell[];
}

interface ShopLink {
  url: string;
  shop: string;
  shop_name: string;
}

/** Ein Neugerät zu einer Serie (data/neukauf/<marke>.json). EAN für die Feeds, ASIN für Amazon. */
interface NeukaufEintrag {
  name: string;
  hersteller: string;
  ean: string | null;
  amazon_asin?: string | null;
  shop_link?: ShopLink;
  hinweis?: string;
}

// Je Marke: Serien-Slug → Neugeräte derselben Serie bzw. ihr Nachfolger. Gefüllt aus den Awin-Feeds (EAN)
// und geprüften Amazon-ASINs. Der Feed-Abgleich (scripts/import/awin_feed.py) liest dieselben Dateien.
const DATEN: Record<string, Record<string, NeukaufEintrag[]>> = {
  blanco,
  franke,
  grohe,
  hansa,
  hansgrohe,
  "ideal-standard": idealStandard,
  kludi,
  schell,
  tece,
  velux,
  viega,
  "villeroy-boch": villeroyBoch,
};

// Titel und Text je Gerätetyp; ohne Eintrag gilt der Text des Bereichs.
const HINWEIS: Record<string, { titel: string; text: string }> = {
  dachfenster: {
    titel: "Lieber ein neues Dachfenster?",
    text: "Ist der Rahmen morsch, beschlägt die Scheibe zwischen den Gläsern oder schließt das Fenster trotz neuer Teile nicht mehr dicht, lohnt ein neues Fenster. In derselben Größe passt es in die vorhandene Öffnung, Rollo und Markise kannst du weiter nutzen.",
  },
  waschtischarmatur: {
    titel: "Lieber eine neue Armatur?",
    text: "Gibt es die Kartusche nicht mehr, tropft die Armatur an mehreren Stellen oder kostet das Ersatzteil fast so viel wie neu, ist eine neue Armatur oft die bessere Wahl. Das sind die aktuellen Modelle derselben Serie.",
  },
  kuechenarmatur: {
    titel: "Lieber eine neue Armatur?",
    text: "Gibt es die Kartusche oder den Brauseschlauch nicht mehr oder tropft die Armatur am Gehäuse, ist eine neue Küchenarmatur oft die bessere Wahl. Achte auf Hoch- oder Niederdruck. Das sind die aktuellen Modelle derselben Serie.",
  },
  thermostat: {
    titel: "Lieber ein neuer Thermostat?",
    text: "Ist der Körper undicht oder kostet die Thermostatkartusche fast so viel wie ein neues Gerät, lohnt der Tausch. Aufputz-Thermostate haben fast immer 150 mm Anschlussabstand, Unterputz-Fertigsets passen nur auf den passenden Grundkörper.",
  },
  duscharmatur: {
    titel: "Lieber eine neue Brausearmatur?",
    text: "Ist die Armatur selbst undicht oder gibt es das Ersatzteil nicht mehr, ist eine neue oft die bessere Wahl. Bei Unterputz-Armaturen passt das Fertigset nur auf den vorhandenen Grundkörper derselben Serie.",
  },
  wannenarmatur: {
    titel: "Lieber eine neue Wannenarmatur?",
    text: "Gibt es das Ersatzteil nicht mehr oder ist der Armaturenkörper selbst undicht, ist eine neue Armatur oft die bessere Wahl. Bei Aufputz-Armaturen achte auf das Anschlussmaß.",
  },
  spuele: {
    titel: "Lieber eine neue Spüle?",
    text: "Ist das Becken gerissen, die Oberfläche stumpf oder passt kein Ablauf mehr, ist eine neue Spüle derselben Serie die einfachste Lösung: gleiches Ausschnittmaß, gleicher Unterschrank.",
  },
  wc_sitz: {
    titel: "Neuer WC-Sitz?",
    text: "Ist der Deckel gebrochen, die Absenkautomatik kaputt oder die Befestigung ausgeschlagen, tauschst du den Sitz als Ganzes. Der Sitz derselben Serie passt auf die vorhandene Keramik.",
  },
  betaetigungsplatte: {
    titel: "Neue Betätigungsplatte?",
    text: "Ist die Platte gebrochen, vergilbt oder klemmt die Taste, tauschst du sie als Ganzes. Diese Platten passen auf denselben Spülkasten.",
  },
  aussenventil: {
    titel: "Lieber ein neues Außenventil?",
    text: "Ist das Ventil nach einem Frost undicht oder gibt es das Oberteil nicht mehr, ist ein neues frostsicheres Ventil derselben Serie oft die bessere Wahl.",
  },
  eckventil: {
    titel: "Lieber ein neues Eckventil?",
    text: "Ein Eckventil kostet neu nur wenige Euro. Ist es verkalkt oder tropft an der Spindel, lohnt die Reparatur selten.",
  },
  geraeteventil: {
    titel: "Lieber ein neues Geräteventil?",
    text: "Ein neues Geräteventil kostet wenig. Tropft es oder lässt es sich nicht mehr schließen, ist der Tausch meist schneller als die Reparatur.",
  },
  druckspueler: {
    titel: "Lieber ein neuer Druckspüler?",
    text: "Läuft der Spüler nach oder ist das Gehäuse undicht, ist ein neues Gerät derselben Serie oft die bessere Wahl. Es passt auf denselben Anschluss.",
  },
};

function amazonUrl(asin: string): string {
  return `https://www.amazon.de/dp/${asin}?tag=${STANDARD_TAG}`;
}

async function ratgeberHref(b: Bereich | null): Promise<string | null> {
  if (!b?.neukauf) return null;
  const { data } = await supabase
    .from("seiten")
    .select("slug, silos(slug)")
    .eq("slug", b.neukauf.ratgeber)
    .eq("status", "aktiv")
    .maybeSingle();
  const s = data as unknown as { slug: string; silos: { slug: string } | null } | null;
  return s ? artikelUrl(s.silos?.slug ?? "bad", s.slug) : null;
}

/** Aus Einträgen die Modelle mit Kaufmöglichkeit: Partnershop vorrätig mit Preis vor Amazon, je höchstens `anzahl`. */
async function modelleAus(eintraege: NeukaufEintrag[], anzahl: number): Promise<NeukaufModell[]> {
  const angebote = await angeboteFuerEans(eintraege.map((e) => e.ean));
  const modelle: NeukaufModell[] = [];
  for (const e of eintraege) {
    const n = normEan(e.ean);
    const angebot = (n ? angebote.get(n) ?? [] : []).find(zeigePreis) ?? null;
    if (angebot) {
      modelle.push({ name: e.name, hersteller: e.hersteller, bild: bildAusAngeboten([angebot]), angebot, amazonUrl: null, hinweis: e.hinweis });
    } else if (e.amazon_asin) {
      modelle.push({ name: e.name, hersteller: e.hersteller, bild: null, angebot: null, amazonUrl: amazonUrl(e.amazon_asin), hinweis: e.hinweis });
    } else if (e.shop_link) {
      modelle.push({ name: e.name, hersteller: e.hersteller, bild: null, angebot: null, amazonUrl: null, shopLink: e.shop_link, hinweis: e.hinweis });
    }
  }
  // Mit Foto und Preis zuerst, Reihenfolge der Datei bleibt sonst erhalten
  return modelle.sort((a, b) => Number(!a.angebot) - Number(!b.angebot)).slice(0, anzahl);
}

/**
 * Neukauf-Hinweis für Serien-, Größen- und Teileseiten: nur Neugeräte, die zur Serie passen (dasselbe Modell
 * bzw. sein Nachfolger, beim Dachfenster dieselbe Größe). Gibt es dafür nichts zu kaufen, gibt es keinen Hinweis,
 * auch keinen allgemeinen aus dem Ratgeber.
 */
export async function neukaufFuerSerien(
  serien: { marke: string; slug: string; produkttyp: string }[],
  anzahl = 3,
): Promise<Neukauf | null> {
  const mitDaten = serien.filter((s) => DATEN[s.marke]?.[s.slug]?.length);
  // Teil in mehreren Serien (eine Kartusche für zehn Armaturen): Welches Gerät der Leser hat, wissen wir nicht.
  // Dann kein Kasten, die Serien-Links der Teileseite führen zum passenden.
  if (mitDaten.length !== 1) return null;
  const s = mitDaten[0];
  const typ = s.produkttyp;
  const b = bereichFuerProdukttyp(typ);
  const [modelle, href] = await Promise.all([modelleAus(DATEN[s.marke][s.slug], anzahl), ratgeberHref(b)]);
  if (modelle.length === 0) return null;
  const h = HINWEIS[typ] ?? (b?.neukauf ? { titel: b.neukauf.titel, text: b.neukauf.text } : null);
  if (!h) return null;
  return { ...h, ratgeberHref: href, modelle };
}

/**
 * Neukauf-Hinweis für einen Bereich (Problemseiten ohne bestimmtes Gerät): bis zu drei Modelle aus dem Ratgeber,
 * je mit Bild und dem günstigsten Partnershop-Angebot. Ohne Modell mit Angebot gibt es keinen Hinweis.
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
    modelle.push({ name: p.name, hersteller: p.hersteller, bild: bildAusAngeboten([angebot]), angebot, amazonUrl: null });
    if (modelle.length >= anzahl) break;
  }
  if (modelle.length === 0) return null;
  return { titel: b.neukauf.titel, text: b.neukauf.text, ratgeberHref: artikelUrl(s.silos?.slug ?? "bad", s.slug), modelle };
}

import { supabase } from "@/lib/supabase";
import { mitTrackingId } from "@/lib/affiliate";

export const SITE_URL = "https://hausbau-hero.de";
const STANDARD_TAG = "hausbauhero-21";

export type Sicherheit = "hersteller" | "zwei_quellen" | "eine_quelle";

export interface Marke {
  id: string;
  slug: string;
  name: string;
  beschreibung: string | null;
  nummer_hinweis: string | null;
  ersatzteil_garantie: string | null;
  hersteller_ersatzteil_url: string | null;
  quellen: string[];
}

export interface Serie {
  id: string;
  marke_id: string;
  slug: string;
  name: string;
  produkttyp: string;
  baujahr_von: number | null;
  baujahr_bis: number | null;
  kennnummern: string[];
  erkennungsmerkmale: string | null;
  beschreibung: string | null;
  quellen: string[];
}

export interface Teil {
  id: string;
  marke_id: string;
  slug: string;
  name: string;
  teiltyp: string;
  oem_nummer: string | null;
  ean: string | null;
  masse: Record<string, string | number>;
  beschreibung: string | null;
  preis_spanne: string | null;
  verschleissteil: boolean | null;
  selbst_tauschbar: boolean | null;
  schwierigkeit: number | null;
  dauer_min: number | null;
  werkzeug: string | null;
  amazon_asin: string | null;
  affiliate_url: string | null;
  bild_url: string | null;
  bild_quelle: "awin" | "amazon" | "eigen" | null;
  bild_shop: string | null;
  quellen: string[];
}

/** Angebot eines Partnershops (Awin-Feed, täglich abgeglichen von scripts/import/awin_feed.py). */
export interface ShopAngebot {
  id: string;
  shop: string;
  shop_name: string;
  produkt_name: string;
  url: string;
  preis: number | null;
  versand: number | null;
  vorraetig: boolean | null;
  lieferzeit: string | null;
  bild_url: string | null;
  stand: string;
}

/** Angebot zu einem Ersatzteil (Tabelle angebote). */
export interface Angebot extends ShopAngebot {
  teil_id: string;
  treffer: "ean" | "nummer";
}

export interface Zuordnung {
  serie_id: string;
  teil_id: string;
  hinweis: string | null;
  quelle_url: string | null;
  sicherheit: Sicherheit;
}

export interface Ursache {
  ursache: string;
  haeufigkeit?: string;
  teil_slugs?: string[];
}

export interface Problem {
  id: string;
  slug: string;
  marke_id: string | null;
  titel: string;
  symptom: string | null;
  ursachen: Ursache[];
  schritte: string[];
  fachbetrieb_ab: string | null;
  quellen: string[];
}

export interface Widerspruch {
  id: string;
  marke_id: string | null;
  thema: string;
  aussage_a: string;
  quelle_a: string | null;
  aussage_b: string;
  quelle_b: string | null;
}

export const PRODUKTTYP_LABEL: Record<string, string> = {
  spuelkasten: "Spülkästen",
  betaetigungsplatte: "Betätigungsplatten",
  waschtischarmatur: "Waschtischarmaturen",
  kuechenarmatur: "Küchenarmaturen",
  duscharmatur: "Duscharmaturen",
  wannenarmatur: "Wannenarmaturen",
  thermostat: "Thermostate",
  spuele: "Spülen",
};

export const TEILTYP_LABEL: Record<string, string> = {
  fuellventil: "Füllventile",
  spuelventil: "Spülventile & Heberglocken",
  kartusche: "Kartuschen",
  thermostatkartusche: "Thermostatkartuschen",
  strahlregler: "Strahlregler",
  schlauch: "Schläuche",
  dichtung: "Dichtungen",
  betaetigung: "Betätigung & Hebel",
  betaetigungsplatte: "Betätigungsplatten",
  umbauset: "Umbausets",
  ablaufgarnitur: "Ablaufgarnituren",
  werkzeug: "Werkzeug",
  sonstiges: "Weitere Teile",
};

export const SICHERHEIT_LABEL: Record<Sicherheit, { text: string; klasse: string; erklaerung: string }> = {
  hersteller: {
    text: "Herstellerangabe",
    klasse: "bg-green-100 text-green-800",
    erklaerung: "Zuordnung aus einem Dokument des Herstellers.",
  },
  zwei_quellen: {
    text: "2 Quellen",
    klasse: "bg-amber-100 text-amber-800",
    erklaerung: "Zwei unabhängige Händler oder Datenblätter nennen dieselbe Zuordnung.",
  },
  eine_quelle: {
    text: "1 Quelle – prüfen",
    klasse: "bg-stone-200 text-stone-700",
    erklaerung: "Nur eine Quelle gefunden. Vergleiche die Nummer am alten Teil, bevor du bestellst.",
  },
};

export function baujahre(s: Pick<Serie, "baujahr_von" | "baujahr_bis">): string | null {
  if (s.baujahr_von && s.baujahr_bis) return `${s.baujahr_von}–${s.baujahr_bis}`;
  if (s.baujahr_von) return `ab ${s.baujahr_von}`;
  if (s.baujahr_bis) return `bis ${s.baujahr_bis}`;
  return null;
}

export function gruppiere<T>(liste: T[], schluessel: (x: T) => string): [string, T[]][] {
  const m = new Map<string, T[]>();
  for (const x of liste) {
    const k = schluessel(x);
    m.set(k, [...(m.get(k) ?? []), x]);
  }
  return Array.from(m.entries());
}

/** Kauflink: Produktlink über die ASIN, sonst Amazon-Suche nach Marke + Originalnummer. */
export function teilKauflink(teil: Teil, markeName: string): string | null {
  if (teil.affiliate_url) return mitTrackingId(teil.affiliate_url, "teil");
  if (teil.amazon_asin) return mitTrackingId(`https://www.amazon.de/dp/${teil.amazon_asin}?tag=${STANDARD_TAG}`, "teil");
  const suche = [markeName, teil.oem_nummer || teil.name].join(" ");
  return mitTrackingId(`https://www.amazon.de/s?k=${encodeURIComponent(suche).replace(/%20/g, "+")}&tag=${STANDARD_TAG}`, "teil");
}

/** Angebote älter als das zeigen wir nicht: Dann ist der Feed-Lauf ausgefallen und der Preis womöglich falsch. */
export const ANGEBOT_MAX_ALTER_TAGE = 3;

/** Preis nur bei vorrätiger (oder unbekannter) Ware. Nicht vorrätig mit Preis wäre ein Lockangebot (UWG). */
export function zeigePreis(a: ShopAngebot): boolean {
  return a.preis !== null && a.vorraetig !== false;
}

/** Günstigste zuerst, nicht vorrätige ans Ende. */
export function sortiereAngebote<T extends ShopAngebot>(liste: T[]): T[] {
  return [...liste].sort((a, b) => {
    const pa = zeigePreis(a) ? a.preis! : Infinity;
    const pb = zeigePreis(b) ? b.preis! : Infinity;
    return pa - pb || a.shop_name.localeCompare(b.shop_name);
  });
}

export function formatEuro(betrag: number): string {
  return betrag.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}

export function formatStand(iso: string): string {
  return new Date(iso).toLocaleString("de-DE", {
    timeZone: "Europe/Berlin",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function hostVon(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Lesbarer Name einer Quelle aus der URL: Domain plus letzter sprechender Pfadteil,
 * z. B. „grohe.com: ersatzteilsuche leitfaden“ statt nur „grohe.com“.
 */
export function quelleLabel(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const teil = u.pathname
      .split("/")
      .filter(Boolean)
      .map((x) => decodeURIComponent(x).replace(/\.(html?|php|aspx?|pdf)$/i, ""))
      .reverse()
      .find((x) => /[a-zäöü]{3}/i.test(x) && !/^(de|de-de|at|ch|en|produkte?|p|s)$/i.test(x));
    const pdf = /\.pdf$/i.test(u.pathname) ? " (PDF)" : "";
    return teil ? `${host}: ${teil.replace(/[-_+]+/g, " ").slice(0, 70)}${pdf}` : host + pdf;
  } catch {
    return url;
  }
}

/**
 * Rechercheprotokoll statt Lesertext („Keine belastbaren Merkmale recherchiert“). Solche Felder
 * blendet die Vorlage aus; sie gehören in nicht_geprueft (docs/SEITENAUFBAU.md, Abschnitt 6).
 */
export const NOTIZ_SPRACHE = /recherchiert|nicht gefunden|haben wir nicht gefunden|belegt keine|keine .{0,30}quelle|Suchauszug|Marketingaussage/i;

/** Mindestens so viele belegte Teile braucht eine Serie, um indexiert zu werden. */
export const SERIE_MIN_TEILE = 2;

/** Serie ohne genug Substanz für eine eigene Seite: noindex, bleibt als Karte auf der Marken-Seite. */
export function serieIstDuenn(serie: Pick<Serie, "erkennungsmerkmale">, anzahlTeile: number): boolean {
  const merkmale = serie.erkennungsmerkmale && !NOTIZ_SPRACHE.test(serie.erkennungsmerkmale);
  return anzahlTeile < SERIE_MIN_TEILE && !merkmale;
}

// ---------- Abfragen ----------

export async function alleMarken(): Promise<Marke[]> {
  const { data } = await supabase.from("marken").select("*").order("sortierung").order("name");
  return (data as Marke[]) ?? [];
}

export async function markeNachSlug(slug: string): Promise<Marke | null> {
  const { data } = await supabase.from("marken").select("*").eq("slug", slug).maybeSingle();
  return (data as Marke) ?? null;
}

export async function serienDerMarke(markeId: string): Promise<Serie[]> {
  const { data } = await supabase.from("serien").select("*").eq("marke_id", markeId).order("name");
  return (data as Serie[]) ?? [];
}

export async function teileDerMarke(markeId: string): Promise<Teil[]> {
  const { data } = await supabase.from("teile").select("*").eq("marke_id", markeId).order("teiltyp").order("name");
  return (data as Teil[]) ?? [];
}

export async function problemeDerMarke(markeId: string): Promise<Problem[]> {
  const { data } = await supabase.from("probleme").select("*").eq("marke_id", markeId).order("titel");
  return (data as Problem[]) ?? [];
}

export async function widerspruecheDerMarke(markeId: string): Promise<Widerspruch[]> {
  const { data } = await supabase.from("widersprueche").select("*").eq("marke_id", markeId);
  return (data as Widerspruch[]) ?? [];
}

export async function zuordnungenFuerSerien(serienIds: string[]): Promise<Zuordnung[]> {
  if (serienIds.length === 0) return [];
  const { data } = await supabase.from("serie_teile").select("*").in("serie_id", serienIds);
  return (data as Zuordnung[]) ?? [];
}

export async function zuordnungenFuerTeil(teilId: string): Promise<Zuordnung[]> {
  const { data } = await supabase.from("serie_teile").select("*").eq("teil_id", teilId);
  return (data as Zuordnung[]) ?? [];
}

export async function teileNachIds(ids: string[]): Promise<Teil[]> {
  if (ids.length === 0) return [];
  const { data } = await supabase.from("teile").select("*").in("id", ids);
  return (data as Teil[]) ?? [];
}

export async function teileNachSlugs(slugs: string[]): Promise<Teil[]> {
  if (slugs.length === 0) return [];
  const { data } = await supabase.from("teile").select("*").in("slug", slugs);
  return (data as Teil[]) ?? [];
}

export async function serienNachIds(ids: string[]): Promise<Serie[]> {
  if (ids.length === 0) return [];
  const { data } = await supabase.from("serien").select("*").in("id", ids);
  return (data as Serie[]) ?? [];
}

export async function angeboteFuerTeile(teilIds: string[]): Promise<Angebot[]> {
  if (teilIds.length === 0) return [];
  const ab = new Date(Date.now() - ANGEBOT_MAX_ALTER_TAGE * 86400_000).toISOString();
  const { data } = await supabase
    .from("angebote")
    .select("id, teil_id, shop, shop_name, produkt_name, url, preis, versand, vorraetig, lieferzeit, bild_url, treffer, stand")
    .in("teil_id", teilIds)
    .gte("stand", ab);
  return sortiereAngebote((data as Angebot[]) ?? []);
}

export async function teilNachSlug(slug: string): Promise<Teil | null> {
  const { data } = await supabase.from("teile").select("*").eq("slug", slug).maybeSingle();
  return (data as Teil) ?? null;
}

export async function markeNachId(id: string): Promise<Marke | null> {
  const { data } = await supabase.from("marken").select("*").eq("id", id).maybeSingle();
  return (data as Marke) ?? null;
}

export async function alleProbleme(): Promise<Problem[]> {
  const { data } = await supabase.from("probleme").select("*").order("titel");
  return (data as Problem[]) ?? [];
}

export async function problemNachSlug(slug: string): Promise<Problem | null> {
  const { data } = await supabase.from("probleme").select("*").eq("slug", slug).maybeSingle();
  return (data as Problem) ?? null;
}

/** Suche nach Artikelnummer, EAN oder Name. Punkte, Leerzeichen und Bindestriche in Nummern zählen nicht. */
export async function sucheTeile(q: string): Promise<Teil[]> {
  const roh = q.trim().slice(0, 60);
  if (roh.length < 2) return [];
  const sauber = roh.replace(/[%_,()]/g, " ").trim();
  const nurZiffern = sauber.replace(/[\s.\-/]/g, "");
  const filter = [`name.ilike.%${sauber}%`, `oem_nummer.ilike.%${sauber}%`, `ean.ilike.%${sauber}%`];
  if (/^\d{4,}$/.test(nurZiffern)) {
    // "240705001" findet auch "240.705.00.1"
    const muster = nurZiffern.split("").join("%");
    filter.push(`oem_nummer.ilike.%${muster}%`);
  }
  const { data } = await supabase.from("teile").select("*").or(filter.join(",")).limit(30);
  return (data as Teil[]) ?? [];
}

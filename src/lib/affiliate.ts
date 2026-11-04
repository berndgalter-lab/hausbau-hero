// Zentrale Behandlung von Affiliate-Links: Amazon und Awin-Partnershops (hagebau.de, Contorion).
//
// Platzierungen: Produktboxen, Textlinks im Artikel, Rechner-Materiallisten, Ersatzteil-Seiten,
// Shop-Angebote auf den Teile-Seiten und in Kaufberatungen, Armaturen-Vergleich, Neukauf-Hinweis.
// Für jede Platzierung kann in PartnerNet eine eigene Tracking-ID angelegt und
// per Env-Variable gesetzt werden. Dann zeigt der Amazon-Bericht, welche
// Platzierung verkauft. Ohne Env-Variable bleibt der Tag aus der Datenbank.
// Nur Tracking-IDs setzen, die in PartnerNet wirklich existieren.

export type Platzierung = "box" | "text" | "rechner" | "teil" | "angebot" | "vergleich" | "neukauf" | "quelle";

/** Amazon-Tag für alle Links, für die keine eigene Tracking-ID gesetzt ist. */
export const AMAZON_STANDARD_TAG = "hausbauhero-21";

// Awin: Publisher-ID und Programm-IDs der Partnershops. Direkte Links auf diese Shops (etwa in Quellen)
// laufen als Awin-Deeplink, sonst wird der Kauf nicht zugeordnet.
const AWIN_PUBLISHER = "930939";
const AWIN_SHOPS: Record<string, string> = {
  "contorion.de": "14578",
  "otto.de": "14336",
  "hagebau.de": "11513",
};

// Direkter Zugriff, damit Next.js die Werte beim Build einsetzt.
const TAGS: Partial<Record<Platzierung, string | undefined>> = {
  box: process.env.NEXT_PUBLIC_AMAZON_TAG_BOX,
  text: process.env.NEXT_PUBLIC_AMAZON_TAG_TEXT,
  rechner: process.env.NEXT_PUBLIC_AMAZON_TAG_RECHNER,
  teil: process.env.NEXT_PUBLIC_AMAZON_TAG_TEIL,
  vergleich: process.env.NEXT_PUBLIC_AMAZON_TAG_VERGLEICH,
};

export const AFFILIATE_REL = "sponsored nofollow noopener noreferrer";

function isAmazonUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?amazon\.de\//i.test(url);
}

export function istAwinUrl(url: string): boolean {
  return /^https:\/\/(www\.)?awin1\.com\//i.test(url);
}

/**
 * Amazon-Suche statt Produktseite (amazon.de/s?k=…). Solche Links zeigen wir nirgends als Kauflink:
 * Sie führen zu einer beliebigen Trefferliste, nicht zu dem Produkt, über das der Text spricht.
 */
export function istAmazonSuche(url: string | null | undefined): boolean {
  return !!url && /^https?:\/\/(www\.)?amazon\.de\/s[?/]/i.test(url);
}

/**
 * Ersatzteil-Shop oder Ersatzteilsuche eines Herstellers (spares.hansgrohe.com, blanco.de/ersatzteile, webshop.franke.com …).
 * Solche Seiten sind oft die eigentliche Quelle einer Zuordnung, wir verlinken sie aber nicht: Wer dort landet, kauft beim
 * Hersteller. Sie erscheinen nur als Text (docs/SEITENAUFBAU.md, Grundsätze).
 */
export function istHerstellerShop(url: string): boolean {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (/\.pdf$/i.test(u.pathname)) return false;
    const hersteller = /(^|\.)(hansgrohe|grohe|geberit|blanco|franke|idealstandard|ideal-standard|hansa|schell|tece|villeroy-boch|villeroyboch|kludi|viega)\./i;
    if (!hersteller.test(host + ".")) return false;
    // grohe.de/de_de/<name>-<Artikelnummer>.html ist der Grohe-Onlineshop (Produktseiten auf grohe.com bleiben verlinkt)
    if (host === "grohe.de" && /^\/de_de\/[^/]*\d{5}[0-9A-Z]{3,4}\.html$/i.test(u.pathname)) return true;
    return /^(spares|webshop|shop)\./i.test(host) || /ersatzteilsuche|\/shop(\/|$)|\/ersatzteile(\/|$)|spare-?parts/i.test(u.pathname);
  } catch {
    return false;
  }
}

export function istPartnerUrl(url: string): boolean {
  return isAmazonUrl(url) || istAwinUrl(url);
}

// Awin: "clickref" erscheint im Awin-Bericht, so ist dort sichtbar, welche Platzierung verkauft.
export function mitClickref(url: string, platzierung: Platzierung): string {
  if (!istAwinUrl(url)) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("clickref", `hh-${platzierung}`);
    return u.toString();
  } catch {
    return url;
  }
}

export function mitTrackingId(url: string, platzierung: Platzierung): string {
  if (istAwinUrl(url)) return mitClickref(url, platzierung);
  if (!isAmazonUrl(url)) return url;
  try {
    const u = new URL(url);
    // Eigene Tracking-ID der Platzierung, sonst der vorhandene Tag, sonst der Standard-Tag
    const tag = TAGS[platzierung] || u.searchParams.get("tag") || AMAZON_STANDARD_TAG;
    u.searchParams.set("tag", tag);
    return u.toString();
  } catch {
    return url;
  }
}

/** Awin-Programm-ID, wenn die URL eine Produkt- oder Kategorieseite eines Partnershops ist (nicht media.…-PDFs). */
function awinShop(url: string): string | null {
  try {
    const u = new URL(url);
    if (!/^(www\.)?[^.]+\.de$/i.test(u.hostname)) return null;
    return AWIN_SHOPS[u.hostname.replace(/^www\./, "").toLowerCase()] ?? null;
  } catch {
    return null;
  }
}

/**
 * Macht aus einem beliebigen externen Link einen Partnerlink, wenn das geht: Amazon-Produktseite mit Tag,
 * Partnershop als Awin-Deeplink, Awin-Link mit clickref. Gibt null zurück, wenn kein Partner dahintersteht.
 */
export function alsPartnerlink(url: string, platzierung: Platzierung): string | null {
  if (istAmazonSuche(url)) return null;
  if (isAmazonUrl(url) || istAwinUrl(url)) return mitTrackingId(url, platzierung);
  const shop = awinShop(url);
  if (!shop) return null;
  const u = new URL("https://www.awin1.com/cread.php");
  u.searchParams.set("awinmid", shop);
  u.searchParams.set("awinaffid", AWIN_PUBLISHER);
  u.searchParams.set("ued", url);
  u.searchParams.set("clickref", `hh-${platzierung}`);
  return u.toString();
}

// Externe Links im Artikel-HTML: Amazon-Suchlinks werden zu Text, sonst neuer Tab, rel="sponsored" für Partnerlinks
// (Amazon und Awin), Tracking-ID für Textlinks. Läuft serverseitig, damit Google die Attribute
// ohne JavaScript sieht.
export function bereiteArtikelHtmlVor(html: string): string {
  // Amazon-Suchlinks aus alten Beiträgen: Link weg, Text bleibt
  const ohneSuche = html.replace(
    /<a\s[^>]*href="https?:\/\/(?:www\.)?amazon\.de\/s[?/][^"]*"[^>]*>([\s\S]*?)<\/a>/gi,
    "$1",
  );
  // Ersatzteil-Shops der Hersteller: Link weg, Text bleibt (siehe istHerstellerShop)
  const ohneShop = ohneSuche.replace(/<a\s[^>]*href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (m: string, href: string, text: string) =>
    istHerstellerShop(href) ? text : m,
  );
  return ohneShop.replace(/<a\s([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (_m, vor: string, href: string, nach: string) => {
    const rest = ` ${vor} ${nach}`
      .replace(/\s(rel|target)="[^"]*"/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    const partnerlink = alsPartnerlink(href.replace(/&amp;/g, "&"), "text");
    const partner = !!partnerlink;
    const ziel = partnerlink ? partnerlink.replace(/&/g, "&amp;") : href;
    const rel = partner ? AFFILIATE_REL : "nofollow noopener noreferrer";
    const daten = partner ? ' data-platzierung="text"' : "";
    return `<a ${rest ? rest + " " : ""}href="${ziel}" target="_blank" rel="${rel}"${daten}>`;
  });
}

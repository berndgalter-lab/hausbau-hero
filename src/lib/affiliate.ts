// Zentrale Behandlung von Affiliate-Links: Amazon und Awin-Partnershops (hagebau.de, Contorion).
//
// Platzierungen: Produktboxen, Textlinks im Artikel, Rechner-Materiallisten, Ersatzteil-Seiten,
// Shop-Angebote auf den Teile-Seiten und in Kaufberatungen, Armaturen-Vergleich.
// Für jede Platzierung kann in PartnerNet eine eigene Tracking-ID angelegt und
// per Env-Variable gesetzt werden. Dann zeigt der Amazon-Bericht, welche
// Platzierung verkauft. Ohne Env-Variable bleibt der Tag aus der Datenbank.
// Nur Tracking-IDs setzen, die in PartnerNet wirklich existieren.

export type Platzierung = "box" | "text" | "rechner" | "teil" | "angebot" | "vergleich";

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
  const tag = TAGS[platzierung];
  if (!tag || !isAmazonUrl(url)) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("tag", tag);
    return u.toString();
  } catch {
    return url;
  }
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
  return ohneSuche.replace(/<a\s([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (_m, vor: string, href: string, nach: string) => {
    const rest = ` ${vor} ${nach}`
      .replace(/\s(rel|target)="[^"]*"/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    const partner = istPartnerUrl(href);
    const ziel = partner ? mitTrackingId(href, "text") : href;
    const rel = partner ? AFFILIATE_REL : "nofollow noopener noreferrer";
    const daten = partner ? ' data-platzierung="text"' : "";
    return `<a ${rest ? rest + " " : ""}href="${ziel}" target="_blank" rel="${rel}"${daten}>`;
  });
}

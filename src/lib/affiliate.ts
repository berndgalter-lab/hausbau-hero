// Zentrale Behandlung von Amazon-Affiliate-Links.
//
// Platzierungen: Produktboxen, Textlinks im Artikel, Rechner-Materiallisten.
// Für jede Platzierung kann in PartnerNet eine eigene Tracking-ID angelegt und
// per Env-Variable gesetzt werden. Dann zeigt der Amazon-Bericht, welche
// Platzierung verkauft. Ohne Env-Variable bleibt der Tag aus der Datenbank.
// Nur Tracking-IDs setzen, die in PartnerNet wirklich existieren.

export type Platzierung = "box" | "text" | "rechner";

// Direkter Zugriff, damit Next.js die Werte beim Build einsetzt.
const TAGS: Record<Platzierung, string | undefined> = {
  box: process.env.NEXT_PUBLIC_AMAZON_TAG_BOX,
  text: process.env.NEXT_PUBLIC_AMAZON_TAG_TEXT,
  rechner: process.env.NEXT_PUBLIC_AMAZON_TAG_RECHNER,
};

export const AFFILIATE_REL = "sponsored nofollow noopener noreferrer";

function isAmazonUrl(url: string): boolean {
  return /^https?:\/\/(www\.)?amazon\.de\//i.test(url);
}

export function mitTrackingId(url: string, platzierung: Platzierung): string {
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

// Externe Links im Artikel-HTML: neuer Tab, rel="sponsored" für Amazon,
// Tracking-ID für Textlinks. Läuft serverseitig, damit Google die Attribute
// ohne JavaScript sieht.
export function bereiteArtikelHtmlVor(html: string): string {
  return html.replace(/<a\s([^>]*?)href="(https?:\/\/[^"]+)"([^>]*)>/gi, (_m, vor: string, href: string, nach: string) => {
    const rest = ` ${vor} ${nach}`
      .replace(/\s(rel|target)="[^"]*"/gi, "")
      .replace(/\s+/g, " ")
      .trim();
    const amazon = isAmazonUrl(href);
    const ziel = amazon ? mitTrackingId(href, "text") : href;
    const rel = amazon ? AFFILIATE_REL : "nofollow noopener noreferrer";
    return `<a ${rest ? rest + " " : ""}href="${ziel}" target="_blank" rel="${rel}">`;
  });
}

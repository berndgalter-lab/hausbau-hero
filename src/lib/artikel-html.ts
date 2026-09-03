import { AMAZON_TAG } from "./monetarisierung";

const EIGENE_HOSTS = ["hausbau-hero.de", "www.hausbau-hero.de"];

/**
 * Bereitet den aus WordPress migrierten Artikel-HTML-Code auf — serverseitig, damit
 * dafür kein JavaScript im Browser nötig ist.
 *
 * 1. Entfernt Bilder, die auf die gelöschten WordPress-Uploads zeigen. Ein 404-Bild
 *    ist für Besucher wie für Google schlechter als gar kein Bild.
 * 2. Interne Links werden relativ, ohne `www` und ohne `nofollow`/`target` — sie sollen
 *    Linkkraft weitergeben und im selben Tab öffnen.
 * 3. Externe Links bekommen `nofollow noopener noreferrer` und öffnen in neuem Tab.
 * 4. Amazon-Links ohne Partner-Tag bekommen es ergänzt.
 */
export function bereiteArtikelAuf(html: string): string {
  if (!html) return "";

  let out = html;

  // 1. Kaputte WordPress-Bilder entfernen (auch wenn sie in <figure> stehen).
  out = out.replace(
    /<figure[^>]*>\s*(?:<a[^>]*>\s*)?<img[^>]*\/wp-content\/uploads\/[^>]*>[\s\S]*?<\/figure>/gi,
    ""
  );
  out = out.replace(/<img[^>]*\/wp-content\/uploads\/[^>]*>/gi, "");
  // Der WordPress-Emoji-Sprite von s.w.org existiert ebenfalls nicht mehr.
  out = out.replace(/<img[^>]*s\.w\.org[^>]*>/gi, "");

  // 2.–4. Links normalisieren.
  out = out.replace(/<a\s+([^>]*?)>/gi, (tag, attrs: string) => {
    const href = /href\s*=\s*["']([^"']*)["']/i.exec(attrs)?.[1];
    if (!href) return tag;

    if (/^(#|mailto:|tel:|\/)/i.test(href)) return `<a href="${href}">`;

    let url: URL;
    try {
      url = new URL(href);
    } catch {
      return tag;
    }

    if (EIGENE_HOSTS.includes(url.hostname)) {
      // Absolut → relativ, damit kein Redirect-Hop über www entsteht.
      return `<a href="${url.pathname}${url.search}${url.hash}">`;
    }

    if (/(^|\.)amazon\.[a-z.]+$/i.test(url.hostname) && !url.searchParams.get("tag")) {
      url.searchParams.set("tag", AMAZON_TAG);
    }

    const istPartner = /(^|\.)(amazon\.[a-z.]+|amzn\.to)$/i.test(url.hostname);
    const rel = istPartner
      ? "nofollow noopener noreferrer sponsored"
      : "nofollow noopener noreferrer";
    return `<a href="${url.toString()}" target="_blank" rel="${rel}">`;
  });

  return out;
}

/**
 * Grobes Maß für die inhaltliche Substanz einer Seite: sichtbarer Text ohne Markup.
 * Wird genutzt, um dünne Altartikel aus Index und Sitemap zu halten.
 */
export function textLaenge(html: string | null | undefined): number {
  if (!html) return 0;
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim().length;
}

/**
 * Untergrenze für „indexierwürdig". Unterhalb davon liefert die Seite Google keinen
 * eigenständigen Mehrwert; sie bleibt erreichbar, wird aber auf `noindex` gesetzt und
 * aus der Sitemap genommen.
 */
export const MIN_TEXT_LAENGE = 1200;

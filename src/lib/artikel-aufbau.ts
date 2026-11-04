// Zerlegt das Artikel-HTML (data/artikel/<slug>.html) in die Bausteine der Ratgeber-Vorlage,
// siehe docs/SEITENAUFBAU.md. Die neuen Beiträge folgen alle demselben Muster:
//   Einstieg · <p><em>Hinweis: … (Stand: …)</em></p> · <h2>Das Wichtigste vorab</h2> · … · <h2>Quellen</h2>
// Fehlt ein Teil (alte Beiträge), bleibt er leer und alles Übrige steht im Rumpf.

export interface ArtikelAufbau {
  /** Absätze vor der ersten Zwischenüberschrift, ohne den Methoden-Hinweis */
  einstieg: string;
  /** Innerer Text des Hinweises „Wir haben … nicht selbst getestet“, ohne „Hinweis:“ */
  methode: string | null;
  /** z. B. „November 2026“ aus „(Stand: November 2026)“ */
  stand: string | null;
  /** Inhalt unter „Das Wichtigste vorab“, ohne Überschrift */
  wichtigstes: string | null;
  rumpf: string;
  /** Inhalt unter „Quellen“, ohne Überschrift */
  quellen: string | null;
  quellenAnzahl: number;
}

/** Schneidet den Abschnitt unter einer h2 mit diesem Titel heraus (bis zur nächsten h2). */
function abschnitt(html: string, titel: RegExp): { inhalt: string | null; rest: string } {
  const re = new RegExp(`<h2[^>]*>\\s*${titel.source}\\s*</h2>`, "i");
  const m = re.exec(html);
  if (!m) return { inhalt: null, rest: html };
  const start = m.index;
  const nach = start + m[0].length;
  const naechste = html.slice(nach).search(/<h2[\s>]/i);
  const ende = naechste === -1 ? html.length : nach + naechste;
  return { inhalt: html.slice(nach, ende).trim(), rest: html.slice(0, start) + html.slice(ende) };
}

export function zerlegeArtikel(html: string): ArtikelAufbau {
  let rest = html;

  let methode: string | null = null;
  let stand: string | null = null;
  const hinweis = /<p>\s*<em>\s*Hinweis:\s*([\s\S]*?)<\/em>\s*<\/p>/i.exec(rest);
  if (hinweis && /nicht selbst getestet/i.test(hinweis[1])) {
    methode = hinweis[1].trim();
    stand = /Stand:\s*([^)]+)\)/i.exec(methode)?.[1].trim() ?? null;
    rest = rest.replace(hinweis[0], "");
  }

  const wichtig = abschnitt(rest, /Das Wichtigste vorab/);
  rest = wichtig.rest;
  const quellen = abschnitt(rest, /Quellen/);
  rest = quellen.rest;

  const ersteH2 = rest.search(/<h2[\s>]/i);
  const einstieg = ersteH2 === -1 ? rest : rest.slice(0, ersteH2);
  const rumpf = ersteH2 === -1 ? "" : rest.slice(ersteH2);

  return {
    einstieg: einstieg.trim(),
    methode,
    stand,
    wichtigstes: wichtig.inhalt,
    rumpf: rumpf.trim(),
    quellen: quellen.inhalt,
    quellenAnzahl: quellen.inhalt ? (quellen.inhalt.match(/<li[\s>]/gi) ?? []).length : 0,
  };
}

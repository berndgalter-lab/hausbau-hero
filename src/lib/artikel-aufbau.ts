// Zerlegt das Artikel-HTML (data/artikel/<slug>.html) in die Bausteine der Ratgeber-Vorlage,
// siehe docs/SEITENAUFBAU.md. Die neuen Beiträge folgen alle demselben Muster:
//   Einstieg · <p><em>Hinweis: … (Stand: …)</em></p> · <h2>Das Wichtigste vorab</h2> · … · <h2>Quellen</h2>
// Statt „Das Wichtigste vorab“ gehen auch „Kurz gesagt“ und „Die wichtigsten … auf einen Blick“.
// Fehlt ein Teil (alte Beiträge), bleibt er leer und alles Übrige steht im Rumpf.
// Abschnitte „Unsere Empfehlungen“ alter Beiträge (Budget-Tipp, Amazon-Suchlinks) entfallen ganz.
// Nur Produkt-Ratgeber (Option fragen): „Häufige Fragen“, je Frage eine <h3> mit Fragezeichen, darunter die Antwort bis zur nächsten <h3>.

export interface ArtikelAufbau {
  /** Absätze vor der ersten Zwischenüberschrift, ohne den Methoden-Hinweis */
  einstieg: string;
  /** Innerer Text des Hinweises „Hinweis: … (Stand: …)“, ohne „Hinweis:“ */
  methode: string | null;
  /** Sagt der Hinweis, dass nicht selbst getestet oder eingebaut wurde? */
  ohneTest: boolean;
  /** z. B. „November 2026“ aus „(Stand: November 2026)“ */
  stand: string | null;
  /** Inhalt unter „Das Wichtigste vorab“ (oder gleichwertiger Überschrift), ohne Überschrift */
  wichtigstes: string | null;
  wichtigstesTitel: string | null;
  rumpf: string;
  /** Inhalt unter „Quellen“, ohne Überschrift */
  quellen: string | null;
  quellenAnzahl: number;
  /** Fragen und Antworten aus „Häufige Fragen“, leer wenn der Abschnitt fehlt */
  fragen: { frage: string; antwort: string }[];
}

function fragenAus(html: string | null): { frage: string; antwort: string }[] {
  if (!html) return [];
  return html
    .split(/(?=<h3[\s>])/i)
    .map((teil) => /^<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*)$/i.exec(teil.trim()))
    .filter((m): m is RegExpExecArray => !!m)
    .map((m) => ({ frage: m[1].replace(/<[^>]+>/g, "").trim(), antwort: m[2].trim() }))
    .filter((f) => f.frage && f.antwort);
}

/** Schneidet den Abschnitt unter einer h2 mit diesem Titel heraus (bis zur nächsten h2). */
function abschnitt(html: string, titel: RegExp): { inhalt: string | null; titel: string | null; rest: string } {
  const re = new RegExp(`<h2[^>]*>\\s*(${titel.source})\\s*</h2>`, "i");
  const m = re.exec(html);
  if (!m) return { inhalt: null, titel: null, rest: html };
  const start = m.index;
  const nach = start + m[0].length;
  const naechste = html.slice(nach).search(/<h2[\s>]/i);
  const ende = naechste === -1 ? html.length : nach + naechste;
  return { inhalt: html.slice(nach, ende).trim(), titel: m[1].trim(), rest: html.slice(0, start) + html.slice(ende) };
}

export function zerlegeArtikel(html: string, { fragen: mitFragen = false } = {}): ArtikelAufbau {
  let rest = html;

  let methode: string | null = null;
  let stand: string | null = null;
  const hinweis = /<p>\s*<em>\s*Hinweis:\s*([\s\S]*?)<\/em>\s*<\/p>/i.exec(rest);
  const hinweisStand = hinweis && /Stand:\s*([^)]+)\)/i.exec(hinweis[1]);
  if (hinweis && hinweisStand) {
    methode = hinweis[1].trim();
    stand = hinweisStand[1].trim();
    rest = rest.replace(hinweis[0], "");
  }

  const wichtig = abschnitt(rest, /Das Wichtigste vorab|Kurz gesagt|Die wichtigsten [^<]{0,40} auf einen Blick/);
  rest = wichtig.rest;
  const quellen = abschnitt(rest, /Quellen/);
  rest = quellen.rest;
  const fragen = mitFragen ? abschnitt(rest, /Häufige Fragen/) : { inhalt: null, rest };
  rest = fragen.rest;
  for (let i = 0; i < 3; i++) {
    const kauf = abschnitt(rest, /Unsere (?:Material-)?Empfehlungen?/);
    if (kauf.titel === null) break;
    rest = kauf.rest;
  }

  const ersteH2 = rest.search(/<h2[\s>]/i);
  const einstieg = ersteH2 === -1 ? rest : rest.slice(0, ersteH2);
  const rumpf = ersteH2 === -1 ? "" : rest.slice(ersteH2);

  return {
    einstieg: einstieg.trim(),
    methode,
    ohneTest: !!methode && /nicht selbst[^.]{0,40}(getestet|eingebaut)/i.test(methode),
    stand,
    wichtigstes: wichtig.inhalt,
    wichtigstesTitel: wichtig.titel,
    rumpf: rumpf.trim(),
    quellen: quellen.inhalt,
    quellenAnzahl: quellen.inhalt ? (quellen.inhalt.match(/<li[\s>]/gi) ?? []).length : 0,
    fragen: fragenAus(fragen.inhalt),
  };
}

export interface Gliederungspunkt {
  id: string;
  titel: string;
}

function ankerAus(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Gibt jeder h2 ohne id einen Anker und liefert die Gliederung für das Inhaltsverzeichnis. */
export function mitAnkern(html: string): { html: string; gliederung: Gliederungspunkt[] } {
  const gliederung: Gliederungspunkt[] = [];
  const vergeben = new Set<string>();
  const neu = html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (m, attr: string, inhalt: string) => {
    const titel = inhalt.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    if (!titel) return m;
    const vorhanden = /\sid="([^"]+)"/i.exec(attr)?.[1];
    let id = vorhanden ?? (ankerAus(titel) || "abschnitt");
    if (!vorhanden) {
      const basis = id;
      for (let i = 2; vergeben.has(id); i++) id = `${basis}-${i}`;
    }
    vergeben.add(id);
    gliederung.push({ id, titel });
    return vorhanden ? m : `<h2${attr} id="${id}">${inhalt}</h2>`;
  });
  return { html: neu, gliederung };
}

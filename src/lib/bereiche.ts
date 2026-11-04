// Bereiche im Haus: der Einstieg „Wo ist das Problem?“ auf der Startseite und unter /bereich/<slug>
// (docs/SEITENAUFBAU.md, Abschnitt 2a). Ein Bereich bündelt, was zu einer Stelle im Haus gehört:
// Serien nach Produkttyp, Probleme, Teilearten und Ratgeber. Neue Bereiche (Heizung, Fenster …)
// kommen erst dazu, wenn es Daten dafür gibt; leere Bereiche zeigt die Seite nicht.

export interface Bereich {
  slug: string;
  name: string;
  /** Ein Satz auf der Kachel: was typischerweise kaputtgeht. */
  kurz: string;
  /** Zwei, drei Sätze oben auf der Bereichsseite. */
  einleitung: string;
  /** Serien dieser Produkttypen gehören hierher (serien.produkttyp). */
  produkttypen: string[];
  /** Teilearten, die hier am häufigsten gesucht werden, in dieser Reihenfolge (teile.teiltyp). */
  teiltypen: string[];
  /** Problem-Slugs, die zu diesem Bereich gehören. */
  probleme: RegExp;
  /** Ratgeber als Slug in der Tabelle seiten (Silo bad). */
  ratgeber: string[];
  /**
   * Neukauf-Hinweis auf Teil-, Modell- und Problemseiten: Ratgeber, aus dem die Modelle kommen,
   * und ein Satz, wann sich der Neukauf mehr lohnt als die Reparatur. Fehlt er, zeigt die Seite keinen Hinweis.
   */
  neukauf?: {
    ratgeber: string;
    titel: string;
    text: string;
    /** Nur auf diesen Seiten statt überall im Bereich, z. B. die Drückerplatte nicht bei „Spülkasten läuft nach“. */
    nurBei?: { teiltypen?: string[]; produkttypen?: string[]; probleme?: RegExp };
  };
}

export const BEREICHE: Bereich[] = [
  {
    slug: "waschtisch",
    name: "Waschtisch & Armatur",
    kurz: "Armatur tropft, Hebel geht schwer, Strahl spritzt.",
    einleitung:
      "Am Waschtisch geht fast immer dasselbe kaputt: die Kartusche, wenn die Armatur tropft oder der Hebel schwer geht, und der Strahlregler, wenn der Strahl spritzt. Die passende Kartusche hängt am Modell der Armatur, nicht am Durchmesser allein.",
    produkttypen: ["waschtischarmatur"],
    teiltypen: ["kartusche", "strahlregler", "dichtung", "betaetigung"],
    // Küchenmarken gehören zur Küche, auch wenn dort eine Armatur tropft.
    probleme: /^(?!blanco|franke).*(armatur-tropft|hebel|strahlregler|ceramix)/,
    ratgeber: ["waschtischarmatur-ratgeber", "waschtischarmatur-mit-brause", "niederdruckarmatur-untertischspeicher"],
    neukauf: {
      ratgeber: "waschtischarmatur-ratgeber",
      titel: "Lieber eine neue Armatur?",
      text: "Gibt es die Kartusche nicht mehr, tropft die Armatur an mehreren Stellen oder kostet das Ersatzteil fast so viel wie neu, ist eine neue Armatur oft die bessere Wahl.",
    },
  },
  {
    slug: "dusche-badewanne",
    name: "Dusche & Badewanne",
    kurz: "Thermostat wird nicht warm, Brause tropft.",
    einleitung:
      "Bei Dusche und Wanne ist meist der Thermostat schuld: Er wird nur lauwarm, regelt nicht mehr oder verstellt sich. Oft reicht eine neue Thermostatkartusche, die Armatur selbst bleibt an der Wand.",
    produkttypen: ["thermostat", "duscharmatur", "wannenarmatur"],
    teiltypen: ["thermostatkartusche", "kartusche", "schlauch", "dichtung"],
    probleme: /thermostat/,
    ratgeber: ["badewannenarmatur-ratgeber", "badewannenarmatur-unterputz", "duschthermostat", "duschsystem", "komplettdusche-ratgeber"],
    neukauf: {
      ratgeber: "badewannenarmatur-ratgeber",
      titel: "Lieber eine neue Armatur?",
      text: "Gibt es das Ersatzteil nicht mehr oder ist der Armaturenkörper selbst undicht, ist eine neue Armatur oft die bessere Wahl. Bei Aufputz-Armaturen achte auf das Anschlussmaß.",
    },
  },
  {
    slug: "wc-spuelkasten",
    name: "WC & Spülkasten",
    kurz: "Spülkasten läuft nach, füllt nicht, Taste hängt.",
    einleitung:
      "Am Spülkasten sind es zwei Teile: das Füllventil, wenn er nicht oder nur langsam füllt, und das Spülventil mit Dichtung, wenn Wasser nachläuft. Welche passen, hängt an Hersteller und Baujahr des Spülkastens.",
    produkttypen: ["spuelkasten", "betaetigungsplatte", "druckspueler"],
    teiltypen: ["fuellventil", "spuelventil", "betaetigungsplatte", "umbauset", "dichtung"],
    probleme: /spuelkasten|spuelung/,
    ratgeber: ["geberit-sigma-drueckerplatte", "vorwandelement-wc", "vorwandelement-wc-hoehe", "tece-vs-geberit"],
    neukauf: {
      ratgeber: "geberit-sigma-drueckerplatte",
      titel: "Neue Drückerplatte?",
      text: "Ist die Betätigungsplatte gebrochen, vergilbt oder klemmt die Taste, tauschst du sie als Ganzes. Welche passt, hängt am Spülkasten.",
      nurBei: { teiltypen: ["betaetigungsplatte"], produkttypen: ["betaetigungsplatte"], probleme: /loest-nicht-aus|drueckerplatte/ },
    },
  },
  {
    slug: "kueche",
    name: "Küchenspüle & Armatur",
    kurz: "Ablauf dicht nicht, Drehknopf hebt nicht, Brause hakt.",
    einleitung:
      "In der Küche betrifft es meist den Ablauf der Spüle, also Siebkörbchen, Drehknopf und Bowdenzug, oder an der Armatur Kartusche und Brauseschlauch. Welche Ablaufgarnitur passt, entscheidet die genaue Artikelnummer der Spüle.",
    produkttypen: ["spuele", "kuechenarmatur"],
    teiltypen: ["ablaufgarnitur", "siebkoerbchen", "betaetigung", "kartusche", "schlauch"],
    probleme: /blanco|franke/,
    ratgeber: ["kuechenarmatur"],
    neukauf: {
      ratgeber: "kuechenarmatur",
      titel: "Lieber eine neue Armatur?",
      text: "Gibt es die Kartusche oder den Brauseschlauch nicht mehr, tropft die Armatur am Gehäuse oder kostet das Ersatzteil fast so viel wie neu, ist eine neue Küchenarmatur oft die bessere Wahl. Achte auf Hoch- oder Niederdruck.",
      // Nur an der Armatur, nicht bei Siebkorb und Ablauf der Spüle
      nurBei: { produkttypen: ["kuechenarmatur"], teiltypen: ["kartusche", "schlauch"], probleme: /armatur|brause/ },
    },
  },
  {
    slug: "wasseranschluss",
    name: "Wasseranschluss & Leitung",
    kurz: "Eckventil undicht, Wasserdruck zu hoch, Ventil klemmt.",
    einleitung:
      "Zwischen Wasserleitung und Armatur sitzen Teile, an die man selten denkt: das Eckventil unter dem Waschbecken, das Geräteventil für die Waschmaschine und der Druckminderer am Hausanschluss. Geht eines davon kaputt, ist meist die Größe des Anschlusses die wichtigste Frage.",
    produkttypen: ["eckventil", "geraeteventil", "aussenventil"],
    teiltypen: ["eckventil", "geraeteventil", "oberteil", "filter"],
    probleme: /eckventil|geraeteventil|aussenventil|druckminderer|wasserdruck/,
    ratgeber: ["druckminderer"],
  },
  {
    slug: "hebeanlage",
    name: "Hebeanlage & Abwasser",
    kurz: "Keller-WC, Dusche im Souterrain, Kondensat.",
    einleitung:
      "Liegt ein WC oder eine Dusche unter der Rückstauebene, muss das Abwasser nach oben gepumpt werden. Welche Hebeanlage erlaubt ist, regelt die DIN EN 12050, und das hängt daran, was angeschlossen wird.",
    produkttypen: [],
    teiltypen: [],
    probleme: /hebeanlage/,
    ratgeber: ["kleinhebeanlage", "hebeanlage-kosten"],
  },
];

/** Suchwort je Teileart für die Teilesuche (/ersatzteile?q=…), die im Namen sucht. */
export const TEILTYP_SUCHWORT: Record<string, string> = {
  kartusche: "Kartusche",
  thermostatkartusche: "Thermostatkartusche",
  strahlregler: "Strahlregler",
  dichtung: "Dichtung",
  betaetigung: "Bowdenzug",
  schlauch: "Schlauch",
  fuellventil: "Füllventil",
  spuelventil: "Spülventil",
  betaetigungsplatte: "Betätigungsplatte",
  umbauset: "Umbau",
  ablaufgarnitur: "Ablaufgarnitur",
  siebkoerbchen: "Siebkörbchen",
  eckventil: "Eckventil",
  geraeteventil: "Geräteventil",
  oberteil: "Oberteil",
  filter: "Filter",
};

/** Passt ein Teil in Serien mehrerer Bereiche, zählt der Bereich mit den meisten Serien. */
function haeufigsterBereich(produkttypen: string[]): Bereich | null {
  const zahl = new Map<Bereich, number>();
  for (const t of produkttypen) {
    const b = bereichFuerProdukttyp(t);
    if (b) zahl.set(b, (zahl.get(b) ?? 0) + 1);
  }
  return Array.from(zahl.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
}

/**
 * Bereich, dessen Neukauf-Hinweis auf dieser Seite gezeigt wird, oder null. Der Bereich ergibt sich aus
 * Problem-Slug oder Produkttyp; „nurBei“ schränkt ihn weiter ein.
 */
export function neukaufBereich(k: { problem?: string; bereich?: string; produkttypen?: string[]; teiltyp?: string }): Bereich | null {
  const b = k.bereich
    ? bereichNachSlug(k.bereich)
    : k.problem
      ? bereichFuerProblem(k.problem)
      : haeufigsterBereich(k.produkttypen ?? []);
  const nur = b?.neukauf?.nurBei;
  if (!b?.neukauf || !nur) return b?.neukauf ? b : null;
  const passt =
    (k.problem !== undefined && !!nur.probleme?.test(k.problem)) ||
    (k.teiltyp !== undefined && !!nur.teiltypen?.includes(k.teiltyp)) ||
    (k.produkttypen ?? []).some((t) => nur.produkttypen?.includes(t));
  return passt ? b : null;
}

export function bereichFuerProdukttyp(typ: string): Bereich | null {
  return BEREICHE.find((b) => b.produkttypen.includes(typ)) ?? null;
}

export function bereichFuerProblem(slug: string): Bereich | null {
  return BEREICHE.find((b) => b.probleme.test(slug)) ?? null;
}

export function bereichFuerRatgeber(slug: string): Bereich | null {
  return BEREICHE.find((b) => b.ratgeber.includes(slug)) ?? null;
}

/**
 * Hat der Bereich etwas zu zeigen? Ohne Modelle, Ratgeber, Teilearten und Probleme erscheint er weder auf
 * der Startseite noch in der Sitemap, und /bereich/<slug> liefert 404.
 */
export function bereichHatInhalt(b: Bereich, k: { teilarten: number; probleme: number }): boolean {
  return b.produkttypen.length > 0 || b.ratgeber.length > 0 || k.teilarten > 0 || k.probleme > 0;
}

export function bereichNachSlug(slug: string): Bereich | null {
  return BEREICHE.find((b) => b.slug === slug) ?? null;
}

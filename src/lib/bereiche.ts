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
    probleme: /armatur-tropft|hebel|strahlregler|ceramix/,
    ratgeber: ["waschtischarmatur-ratgeber", "waschtischarmatur-mit-brause", "niederdruckarmatur-untertischspeicher"],
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
    ratgeber: ["badewannenarmatur-ratgeber", "komplettdusche-ratgeber"],
  },
  {
    slug: "wc-spuelkasten",
    name: "WC & Spülkasten",
    kurz: "Spülkasten läuft nach, füllt nicht, Taste hängt.",
    einleitung:
      "Am Spülkasten sind es zwei Teile: das Füllventil, wenn er nicht oder nur langsam füllt, und das Spülventil mit Dichtung, wenn Wasser nachläuft. Welche passen, hängt an Hersteller und Baujahr des Spülkastens.",
    produkttypen: ["spuelkasten", "betaetigungsplatte"],
    teiltypen: ["fuellventil", "spuelventil", "betaetigungsplatte", "umbauset", "dichtung"],
    probleme: /spuelkasten|spuelung/,
    ratgeber: ["geberit-sigma-drueckerplatte", "vorwandelement-wc", "vorwandelement-wc-hoehe", "tece-vs-geberit"],
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
    ratgeber: [],
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
};

export function bereichNachSlug(slug: string): Bereich | null {
  return BEREICHE.find((b) => b.slug === slug) ?? null;
}

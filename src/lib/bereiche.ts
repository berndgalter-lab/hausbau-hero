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
    produkttypen: ["waschtischarmatur", "waschtisch"],
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
    kurz: "Thermostat wird nicht warm, Ablauf läuft schlecht ab.",
    einleitung:
      "Bei Dusche und Wanne ist meist der Thermostat schuld: Er wird nur lauwarm, regelt nicht mehr oder verstellt sich. Oft reicht eine neue Thermostatkartusche, die Armatur selbst bleibt an der Wand. Läuft das Wasser schlecht ab oder schließt der Wannenstopfen nicht, helfen meist Tauchrohr, Sieb oder Ventilkegel des Ablaufs.",
    produkttypen: ["thermostat", "duscharmatur", "wannenarmatur", "duschablauf", "wannenablauf"],
    teiltypen: ["thermostatkartusche", "kartusche", "duschablauf", "wannenablauf", "schlauch", "dichtung"],
    probleme: /thermostat|duschablauf|badewanne-ablauf/,
    ratgeber: ["badewannenarmatur-ratgeber", "badewannenarmatur-unterputz", "duschthermostat", "unterputz-duscharmatur", "duschsystem", "komplettdusche-ratgeber"],
    neukauf: {
      ratgeber: "badewannenarmatur-ratgeber",
      titel: "Lieber eine neue Armatur?",
      text: "Gibt es das Ersatzteil nicht mehr oder ist der Armaturenkörper selbst undicht, ist eine neue Armatur oft die bessere Wahl. Bei Aufputz-Armaturen achte auf das Anschlussmaß.",
      // Nicht bei Dusch- und Wannenabläufen: Dort steckt der Ablauf im Boden oder hinter der Wannenschürze.
      nurBei: {
        produkttypen: ["thermostat", "duscharmatur", "wannenarmatur"],
        teiltypen: ["thermostatkartusche", "kartusche", "schlauch"],
        probleme: /thermostat/,
      },
    },
  },
  {
    slug: "wc-spuelkasten",
    name: "WC & Spülkasten",
    kurz: "Spülkasten läuft nach, füllt nicht, Taste hängt.",
    einleitung:
      "Am Spülkasten sind es zwei Teile: das Füllventil, wenn er nicht oder nur langsam füllt, und das Spülventil mit Dichtung, wenn Wasser nachläuft. Welche passen, hängt an Hersteller und Baujahr des Spülkastens.",
    produkttypen: ["spuelkasten", "betaetigungsplatte", "druckspueler", "wc_sitz"],
    teiltypen: ["fuellventil", "spuelventil", "betaetigungsplatte", "umbauset", "dichtung", "scharnier", "absenkautomatik"],
    probleme: /spuelkasten|spuelung|wc-sitz|absenkautomatik/,
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
    kurz: "Eckventil undicht, Geräteventil tropft, Ventil klemmt.",
    einleitung:
      "Zwischen Wasserleitung und Armatur sitzen Teile, an die man selten denkt: das Eckventil unter dem Waschbecken, das Geräteventil für die Waschmaschine und das Außenventil. Geht eines davon kaputt, ist meist die Größe des Anschlusses die wichtigste Frage.",
    produkttypen: ["eckventil", "geraeteventil", "aussenventil"],
    teiltypen: ["eckventil", "geraeteventil", "oberteil", "filter"],
    probleme: /eckventil|geraeteventil|aussenventil/,
    ratgeber: [],
  },
  {
    // Hauptbereich „Wasser & Wärme“, Plan in docs/KEYWORDS-WASSERFILTER.md. Nimmt den Druckminderer aus
    // „Wasseranschluss & Leitung“ auf: Er sitzt mit dem Filter in derselben Hauswasserstation.
    slug: "wasserfilter",
    name: "Wasserfilter & Enthärtung",
    kurz: "Rückspülfilter tropft, Filtereinsatz gesucht, Anlage zieht kein Salz.",
    einleitung:
      "Direkt hinter dem Wasserzähler sitzen Hauswasserfilter, Druckminderer und, wo vorhanden, die Enthärtungsanlage. Rückspülen und Salz nachfüllen ist Sache des Betreibers, ob du Filtereinsatz und Dichtungen selbst tauschst, regelt die Anleitung des Herstellers. Welcher Einsatz passt, hängt an Gerät, Nennweite und Baujahr. Einbau und Arbeiten am Anschluss macht ein eingetragener Installateur, am Steuerventil der Enthärtungsanlage der Kundendienst.",
    produkttypen: ["rueckspuelfilter", "hauswasserstation", "druckminderer", "enthaertungsanlage"],
    teiltypen: ["filtereinsatz", "filtertasse", "druckminderer-einsatz", "salz"],
    probleme: /rueckspuelfilter|hauswasserfilter|enthaertung|druckminderer|wasserdruck/,
    ratgeber: ["rueckspuelfilter", "druckminderer"],
    neukauf: {
      ratgeber: "rueckspuelfilter",
      titel: "Lieber einen neuen Filter?",
      text: "Gibt es für den Filter keinen Einsatz mehr, ist die Tasse versprödet oder tropft das Gehäuse selbst, ist ein neuer Rückspülfilter oft die bessere Wahl. Der Tausch am Anschluss ist Arbeit für den Installateur.",
      nurBei: { teiltypen: ["filtereinsatz", "filtertasse"], produkttypen: ["rueckspuelfilter", "hauswasserstation"], probleme: /rueckspuelfilter|hauswasserfilter/ },
    },
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
  {
    // Hauptbereich „Fenster & Türen“ (docs/BEREICHE-REIHENFOLGE.md), Plan in docs/KEYWORDS-DACHFENSTER.md.
    // Sichtbar erst mit Inhalt: produkttypen und ratgeber tragen die Bau-Sessions ein, sobald es die Seiten gibt.
    slug: "dachfenster",
    name: "Dachfenster",
    kurz: "Rollo passt nicht, Fenster klemmt, Solar-Rollladen reagiert nicht.",
    einleitung:
      "Am Dachfenster hängt fast alles am Größencode auf dem Typenschild, bei VELUX etwa MK04. Er entscheidet, welches Rollo, welche Markise und welche Dichtung passt. Sonnenschutz, Dichtungen und Akkus tauschst du selbst, Fenstertausch und Eindeckrahmen sind Sache des Dachdeckers.",
    produkttypen: ["dachfenster"],
    teiltypen: ["rollo", "plissee", "hitzeschutz", "insektenschutz", "dichtung", "pflege", "akku", "fernbedienung", "griff", "rollladen"],
    probleme: /dachfenster/,
    ratgeber: ["dachfenster-sonnenschutz"],
  },
  {
    // Hauptbereich „Fenster & Türen“, Plan in docs/KEYWORDS-ROLLLADEN.md. Rollläden am Dachfenster (VELUX, Roto)
    // bleiben beim Dachfenster, deshalb schließt das Problem-Muster „dachfenster-…“ aus.
    slug: "rollladen",
    name: "Rollladen",
    kurz: "Gurt gerissen, Rollladen klemmt, Motor reagiert nicht.",
    einleitung:
      "Am Rollladen entscheidet zuerst Mini oder Maxi: Ein 14 mm breiter Gurt und eine SW40-Welle gehören zum Mini-System, ein 23 mm breiter Gurt und eine SW60-Welle zum Maxi-System. Danach richten sich Gurtwickler, Walzenkapsel, Lager und Motor. Gurt, Wickler, Lager, Aufhängung und Handsender tauschst du selbst. Einen Rohrmotor mit 230 V schließt eine Elektrofachkraft an.",
    produkttypen: ["rollladen", "gurtwickler", "rollladenmotor"],
    teiltypen: ["rollladengurt", "gurtwickler", "rollladen-welle", "rollladen-aufhaengung", "rollladen-handsender", "rollladenmotor", "rollladen-lamellen"],
    probleme: /^(?!dachfenster).*(rollladen|rolladen|gurtwickler)/,
    ratgeber: ["rollladen-elektrisch-nachruesten"],
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
  scharnier: "Scharnier",
  absenkautomatik: "Soft-Clos",
  rollo: "Rollo",
  plissee: "Plissee",
  hitzeschutz: "Markise",
  insektenschutz: "Insektenschutz",
  pflege: "Pflege-Set",
  akku: "Akku",
  fernbedienung: "Wandschalter",
  griff: "Bedienstange",
  rollladen: "Rollladen",
  filtereinsatz: "Filtereinsatz",
  filtertasse: "Filtertasse",
  "druckminderer-einsatz": "Druckminderer",
  salz: "Salz",
  rollladengurt: "Gurt",
  gurtwickler: "Gurtwickler",
  "rollladen-welle": "Welle",
  "rollladen-aufhaengung": "Aufhängung",
  "rollladen-handsender": "Handsender",
  rollladenmotor: "Rohrmotor",
  "rollladen-lamellen": "Lamelle",
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

/**
 * Hauptbereiche der Hauskarte (docs/BEREICHE-REIHENFOLGE.md, Abschnitt 1): gruppieren Bereiche auf Startseite
 * und Übersichten. Eigene Liste statt Feld je Bereich, damit neue Bereiche nur hier eine Zeile brauchen.
 * Ein Hauptbereich ohne sichtbaren Bereich erscheint nirgends.
 */
export const HAUPTBEREICHE: { slug: string; name: string; bereiche: string[] }[] = [
  { slug: "bad-kueche", name: "Bad & Küche", bereiche: ["waschtisch", "dusche-badewanne", "wc-spuelkasten", "kueche"] },
  { slug: "wasser-waerme", name: "Wasser & Wärme", bereiche: ["wasseranschluss", "wasserfilter", "hebeanlage"] },
  { slug: "fenster-tueren", name: "Fenster & Türen", bereiche: ["dachfenster", "rollladen"] },
];

export function hauptbereichVon(bereich: string): (typeof HAUPTBEREICHE)[number] | null {
  return HAUPTBEREICHE.find((h) => h.bereiche.includes(bereich)) ?? null;
}

export function bereichNachSlug(slug: string): Bereich | null {
  return BEREICHE.find((b) => b.slug === slug) ?? null;
}

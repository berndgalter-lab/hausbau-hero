import { KATEGORIE_NAME, type ArmaturDaten } from "@/lib/armatur-daten";

// Produkt-Ratgeber unter /ratgeber/<pfad>: eine Auswahlhilfe pro Produktart (docs/SEITENAUFBAU.md, Abschnitt 3).
// Inhalt und Produkte kommen wie bisher aus data/artikel/<slug>.* (Datenbank-Tabellen seiten und produkte).
// Hier steht nur, unter welcher URL ein Beitrag erscheint und welche Fragen die Auswahlhilfe stellt.
// Ohne Server-Abhängigkeiten, weil die Auswahlhilfe im Browser dieselben Fragen braucht.

/** Antwort eines Produkts auf eine Option: passt, passt nicht, oder der Hersteller sagt nichts dazu. */
type Passt = (d: ArmaturDaten) => boolean | null;

export interface AuswahlOption {
  label: string;
  passt: Passt;
  /** Steht da, wenn zu dieser Wahl kein Modell passt, z. B. Verweis auf einen anderen Ratgeber. */
  sonst?: { text: string; href?: string; linktext?: string };
}

export interface AuswahlFrage {
  key: string;
  label: string;
  /** Ein Satz unter den Optionen: was die Frage meint oder wie man es herausfindet. */
  hinweis?: string;
  optionen: AuswahlOption[];
}

export interface ProduktRatgeber {
  /** URL-Teil: /ratgeber/<pfad>. Einzahl, ohne Kategorie, ohne „-ratgeber“. */
  pfad: string;
  /** Slug in data/artikel und in der Tabelle seiten. Bleibt, damit der Import dieselbe Zeile trifft. */
  slug: string;
  /** Alte URL für die Weiterleitung und den Brotkrumen. */
  silo: string;
  /** Kurzer Name für Brotkrumen und Listen, z. B. „Waschtischarmatur“. */
  name: string;
  /** Mehrzahl für die Ergebnisliste: „3 von 6 Armaturen passen“. */
  mehrzahl: string;
  fragen: AuswahlFrage[];
  /** Eckdaten in der Ergebniszeile, kurz und in dieser Reihenfolge. */
  eckdaten: (d: ArmaturDaten) => (string | null)[];
}

const mm = (v: number | undefined, was: string) => (typeof v === "number" ? `${v} mm ${was}` : null);

/** Ab dieser Auslaufhöhe zählt eine Waschtischarmatur als hoch genug für Aufsatzbecken. */
const AUFSATZ_AB_MM = 180;

const hatOberflaeche = (d: ArmaturDaten, muster: RegExp): boolean | null =>
  Array.isArray(d.oberflaechen) && d.oberflaechen.length > 0 ? d.oberflaechen.some((o) => muster.test(o)) : null;

const enthaelt = (wert: string | undefined, muster: RegExp): boolean | null =>
  wert ? muster.test(wert) : null;

const WASCHTISCHARMATUR: ProduktRatgeber = {
  pfad: "waschtischarmatur",
  slug: "waschtischarmatur-ratgeber",
  silo: "bad",
  name: "Waschtischarmatur",
  mehrzahl: "Armaturen",
  fragen: [
    {
      key: "warmwasser",
      label: "Warmwasser",
      hinweis: "Hängt unter dem Becken ein kleiner offener Boiler mit drei Anschlüssen, ist es ein Untertischspeicher.",
      optionen: [
        { label: "zentral oder Durchlauferhitzer", passt: (d) => (d.druck ? d.druck === "Hochdruck" : null) },
        {
          label: "Untertischspeicher",
          passt: (d) => (d.druck ? d.druck === "Niederdruck" : null),
          sonst: {
            text: "Am offenen Untertischspeicher darf nur eine Niederdruckarmatur hängen, sonst kann der Speicher unter Druck geraten.",
            href: "/ratgeber/niederdruckarmatur",
            linktext: "Niederdruckarmaturen ansehen",
          },
        },
      ],
    },
    {
      key: "becken",
      label: "Becken",
      hinweis: "Beim Aufsatzbecken bleibt als Freiraum die Auslaufhöhe minus die Höhe des Beckenrands über der Platte.",
      optionen: [
        {
          label: "Einbau- oder Wandbecken",
          passt: (d) => (typeof d.auslaufhoehe_mm === "number" ? d.auslaufhoehe_mm < AUFSATZ_AB_MM : null),
        },
        {
          label: "Aufsatzbecken",
          passt: (d) => (typeof d.auslaufhoehe_mm === "number" ? d.auslaufhoehe_mm >= AUFSATZ_AB_MM : null),
        },
      ],
    },
    {
      key: "ablauf",
      label: "Ablauf",
      hinweis: "Zugstange: Stab hinter der Armatur. Push-Open: Druck auf den Stopfen im Becken.",
      optionen: [
        { label: "Zugstange", passt: (d) => enthaelt(d.ablauf, /zug/i) },
        { label: "Push-Open", passt: (d) => enthaelt(d.ablauf, /push|pop/i) },
        { label: "kaufe ich separat", passt: (d) => enthaelt(d.ablauf, /ohne/i) },
      ],
    },
    {
      key: "brause",
      label: "Brause",
      optionen: [
        { label: "ohne", passt: (d) => (d.brause ? d.brause.toLowerCase() === "nein" : null) },
        {
          label: "zum Herausziehen",
          passt: (d) => (d.brause ? d.brause.toLowerCase() !== "nein" : null),
          sonst: {
            text: "Mit herausziehbarer Brause gibt es einen eigenen Ratgeber.",
            href: "/ratgeber/waschtischarmatur-mit-brause",
            linktext: "Waschtischarmatur mit Brause",
          },
        },
      ],
    },
    {
      key: "farbe",
      label: "Farbe",
      hinweis: "Schwarz ist bei GROHE und hansgrohe lackiert oder pulverbeschichtet und laut GROHE weniger strapazierfähig als Chrom.",
      optionen: [
        { label: "Chrom", passt: (d) => hatOberflaeche(d, /chrom/i) },
        { label: "Schwarz", passt: (d) => hatOberflaeche(d, /schwarz|black/i) },
      ],
    },
  ],
  eckdaten: (d) => [
    mm(d.auslaufhoehe_mm, "Auslaufhöhe"),
    mm(d.ausladung_mm, "Ausladung"),
    d.ablauf ? (/ohne/i.test(d.ablauf) ? "ohne Ablaufgarnitur" : d.ablauf) : null,
    typeof d.durchfluss_l_min === "number" ? `${d.durchfluss_l_min.toLocaleString("de-DE")} l/min` : null,
    d.druck ?? null,
  ],
};

const NIEDERDRUCKARMATUR: ProduktRatgeber = {
  pfad: "niederdruckarmatur",
  slug: "niederdruckarmatur-untertischspeicher",
  silo: "bad",
  name: "Niederdruckarmatur",
  mehrzahl: "Armaturen",
  fragen: [
    {
      key: "speicher",
      label: "Untertischspeicher",
      hinweis: "Drei Schläuche an der alten Armatur heißen offener Speicher. Auf dem Typenschild steht „offen“ oder „drucklos“.",
      optionen: [
        { label: "offen", passt: (d) => (d.druck ? d.druck === "Niederdruck" : null) },
        {
          label: "druckfest oder keiner",
          passt: (d) => (d.druck ? d.druck === "Hochdruck" : null),
          sonst: {
            text: "Am druckfesten Speicher, am Durchlauferhitzer und an zentralem Warmwasser brauchst du eine normale Hochdruckarmatur.",
            href: "/ratgeber/waschtischarmatur",
            linktext: "Waschtischarmaturen ansehen",
          },
        },
      ],
    },
    {
      key: "einsatz",
      label: "Wofür",
      optionen: [
        { label: "Waschtisch", passt: (d) => (d.kategorie ? d.kategorie === "waschtisch" : null) },
        { label: "Küche", passt: (d) => (d.kategorie ? d.kategorie === "kueche" : null) },
      ],
    },
    {
      key: "ablauf",
      label: "Ablauf am Waschtisch",
      hinweis: "Zugstange: Stab hinter der Armatur. Push-Open: Druck auf den Stopfen im Becken.",
      optionen: [
        // Küchenarmaturen haben keine Ablaufgarnitur, sie passen hier also nicht
        { label: "Zugstange", passt: (d) => (d.kategorie === "waschtisch" ? enthaelt(d.ablauf, /zug/i) : false) },
        {
          label: "Push-Open",
          passt: (d) => (d.kategorie === "waschtisch" ? enthaelt(d.ablauf, /push|pop/i) : false),
          sonst: {
            text: "In Niederdruck mit Push-Open gibt es zum Beispiel die hansgrohe Logis 70 (71074000). Achte auf die Nummer, die Hochdruckversion heißt fast gleich.",
            href: "#fragen",
            linktext: "Mehr dazu",
          },
        },
      ],
    },
  ],
  eckdaten: (d) => [
    d.kategorie ? KATEGORIE_NAME[d.kategorie] : null,
    d.ablauf ? (/zug/i.test(d.ablauf) ? "Zugstangen-Ablauf" : `${d.ablauf}-Ablauf`) : null,
    mm(d.ausladung_mm, "Ausladung"),
    typeof d.kartusche_mm === "number" ? `Kartusche ${d.kartusche_mm} mm` : null,
    typeof d.durchfluss_l_min === "number" ? `${d.durchfluss_l_min.toLocaleString("de-DE")} l/min` : null,
  ],
};

const echteBrause = (d: ArmaturDaten): boolean | null => (d.brause ? !/auslauf/i.test(d.brause) && d.brause.toLowerCase() !== "nein" : null);

const WASCHTISCHARMATUR_MIT_BRAUSE: ProduktRatgeber = {
  pfad: "waschtischarmatur-mit-brause",
  slug: "waschtischarmatur-mit-brause",
  silo: "bad",
  name: "Waschtischarmatur mit Brause",
  mehrzahl: "Armaturen",
  fragen: [
    {
      key: "warmwasser",
      label: "Warmwasser",
      hinweis: "Hängt unter dem Becken ein kleiner offener Boiler mit drei Anschlüssen, ist es ein Untertischspeicher.",
      optionen: [
        { label: "zentral oder Durchlauferhitzer", passt: (d) => (d.druck ? d.druck === "Hochdruck" : null) },
        {
          label: "Untertischspeicher",
          passt: (d) => (d.druck ? d.druck === "Niederdruck" : null),
          sonst: {
            text: "Alle Brause-Armaturen hier sind Hochdruckarmaturen. Am offenen Untertischspeicher brauchst du eine Niederdruckarmatur, die gibt es bei den Marken hier nur ohne Brause.",
            href: "/ratgeber/niederdruckarmatur",
            linktext: "Niederdruckarmaturen ansehen",
          },
        },
      ],
    },
    {
      key: "brause",
      label: "Brause",
      hinweis: "Zum Haarewaschen ist ein Brausekopf am Schlauch besser, zum Ausspülen des Beckens reicht ein ausziehbarer Auslauf.",
      optionen: [
        { label: "Brausekopf am Schlauch", passt: echteBrause },
        { label: "ausziehbarer Auslauf reicht", passt: (d) => (d.brause ? /auslauf/i.test(d.brause) : null) },
      ],
    },
    {
      key: "becken",
      label: "Becken",
      hinweis: "Beim Aufsatzbecken bleibt als Freiraum die Auslaufhöhe minus die Höhe des Beckenrands über der Platte.",
      optionen: [
        {
          label: "Einbau- oder Wandbecken",
          passt: (d) => (typeof d.auslaufhoehe_mm === "number" ? d.auslaufhoehe_mm < AUFSATZ_AB_MM : null),
        },
        {
          label: "Aufsatzbecken",
          passt: (d) => (typeof d.auslaufhoehe_mm === "number" ? d.auslaufhoehe_mm >= AUFSATZ_AB_MM : null),
        },
      ],
    },
    {
      key: "ablauf",
      label: "Ablauf",
      hinweis: "Zugstange: Stab hinter der Armatur. Push-Open oder Pop-Up: Druck auf den Stopfen im Becken.",
      optionen: [
        { label: "Zugstange", passt: (d) => enthaelt(d.ablauf, /zug/i) },
        { label: "Push-Open", passt: (d) => enthaelt(d.ablauf, /push|pop/i) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.brause ?? null,
    mm(d.auslaufhoehe_mm, "Auslaufhöhe"),
    mm(d.ausladung_mm, "Ausladung"),
    d.ablauf ?? null,
    typeof d.durchfluss_l_min === "number" ? `${d.durchfluss_l_min.toLocaleString("de-DE")} l/min` : null,
  ],
};

/** Ab dieser Ausladung reicht der Wannenauslauf weit über den Rand. */
const LANGE_AUSLADUNG_AB_MM = 170;

const BADEWANNENARMATUR: ProduktRatgeber = {
  pfad: "badewannenarmatur",
  slug: "badewannenarmatur-ratgeber",
  silo: "bad",
  name: "Badewannenarmatur",
  mehrzahl: "Armaturen",
  fragen: [
    {
      key: "regelung",
      label: "Regelung",
      hinweis: "Ein Thermostat hält die Temperatur und sperrt bei 38 oder 40 °C. Mit Kindern im Haus ist das die sicherere Wahl.",
      optionen: [
        { label: "Thermostat", passt: (d) => (d.bauart ? d.bauart === "Thermostat" : null) },
        { label: "Einhebel", passt: (d) => (d.bauart ? d.bauart === "Einhebel" : null) },
      ],
    },
    {
      key: "montage",
      label: "Alte Armatur",
      hinweis: "Aufputz: Die Armatur sitzt auf zwei Wandanschlüssen. Unterputz: Nur Griffe und Rosette schauen aus der Wand.",
      optionen: [
        { label: "Aufputz", passt: (d) => (d.montage ? d.montage === "Aufputz" : null) },
        {
          label: "Unterputz",
          passt: (d) => (d.montage ? d.montage === "Unterputz" : null),
          sonst: {
            text: "Bei Unterputz tauschst du nur das Fertigset, und das muss zum Grundkörper in der Wand passen. Wie du ihn erkennst, steht unten bei den Fragen.",
            href: "#fragen",
            linktext: "Zu den Fragen",
          },
        },
      ],
    },
    {
      key: "warmwasser",
      label: "Warmwasser",
      optionen: [
        { label: "zentral oder Durchlauferhitzer", passt: (d) => (d.druck ? d.druck === "Hochdruck" : null) },
        {
          label: "offener Speicher",
          passt: (d) => (d.druck ? d.druck === "Niederdruck" : null),
          sonst: { text: "Alle Wannenarmaturen hier sind Hochdruckarmaturen und nicht für offene (drucklose) Speicher geeignet." },
        },
      ],
    },
    {
      key: "ausladung",
      label: "Auslauf",
      hinweis: "Die Ausladung reicht von der Wand bis zur Auslaufspitze. Hier liegt sie zwischen 161 und 194 mm.",
      optionen: [
        { label: "kurz reicht (unter 170 mm)", passt: (d) => (typeof d.ausladung_mm === "number" ? d.ausladung_mm < LANGE_AUSLADUNG_AB_MM : null) },
        { label: "lang (ab 170 mm)", passt: (d) => (typeof d.ausladung_mm === "number" ? d.ausladung_mm >= LANGE_AUSLADUNG_AB_MM : null) },
      ],
    },
    {
      key: "farbe",
      label: "Farbe",
      hinweis: "Schwarz und Weiß haben meist eine eigene Artikelnummer. Prüf im Shop, dass Farbe und Nummer zusammenpassen.",
      optionen: [
        { label: "Chrom", passt: (d) => hatOberflaeche(d, /chrom/i) },
        { label: "Schwarz", passt: (d) => hatOberflaeche(d, /schwarz|black/i) },
        { label: "Weiß", passt: (d) => hatOberflaeche(d, /weiß|white/i) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.bauart ?? null,
    mm(d.ausladung_mm, "Ausladung"),
    typeof d.sicherheitssperre_c === "number" ? `Sperre bei ${d.sicherheitssperre_c} °C` : null,
    typeof d.durchfluss_l_min === "number" ? `${d.durchfluss_l_min.toLocaleString("de-DE")} l/min` : null,
    d.umsteller ? `Umsteller: ${d.umsteller}` : null,
  ],
};

export const PRODUKT_RATGEBER: ProduktRatgeber[] = [WASCHTISCHARMATUR, NIEDERDRUCKARMATUR, WASCHTISCHARMATUR_MIT_BRAUSE, BADEWANNENARMATUR];

export function ratgeberNachPfad(pfad: string): ProduktRatgeber | null {
  return PRODUKT_RATGEBER.find((r) => r.pfad === pfad) ?? null;
}

export function ratgeberNachSlug(slug: string): ProduktRatgeber | null {
  return PRODUKT_RATGEBER.find((r) => r.slug === slug) ?? null;
}

/** URL eines Beitrags: /ratgeber/<pfad> für Produkt-Ratgeber, sonst wie bisher /<silo>/<slug>. */
export function artikelUrl(silo: string, slug: string): string {
  const r = ratgeberNachSlug(slug);
  return r ? `/ratgeber/${r.pfad}` : `/${silo}/${slug}`;
}

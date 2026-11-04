import type { ArmaturDaten } from "@/lib/armatur-daten";

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
            href: "/bad/niederdruckarmatur-untertischspeicher",
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
            href: "/bad/waschtischarmatur-mit-brause",
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

export const PRODUKT_RATGEBER: ProduktRatgeber[] = [WASCHTISCHARMATUR];

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

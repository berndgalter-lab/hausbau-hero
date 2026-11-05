import type { MarkenFrage } from "@/lib/ersatzteile";
import eckventil from "../../data/teilarten/eckventil.json";
import fuellventil from "../../data/teilarten/fuellventil.json";
import spuelkasten from "../../data/teilarten/spuelkasten.json";
import wcSitzBefestigung from "../../data/teilarten/wc-sitz-befestigung.json";
import perlator from "../../data/teilarten/perlator.json";
import kartusche from "../../data/teilarten/kartusche.json";
import siphon from "../../data/teilarten/siphon.json";
import ablaufgarnitur from "../../data/teilarten/ablaufgarnitur.json";
import thermostatkartusche from "../../data/teilarten/thermostatkartusche.json";
import brauseschlauch from "../../data/teilarten/brauseschlauch.json";
import duschablauf from "../../data/teilarten/duschablauf.json";
import abUndUeberlaufgarnitur from "../../data/teilarten/ab-und-ueberlaufgarnitur.json";
import dachfensterRollo from "../../data/teilarten/dachfenster-rollo.json";
import dachfensterHitzeschutz from "../../data/teilarten/dachfenster-hitzeschutz.json";
import dachfensterDichtung from "../../data/teilarten/dachfenster-dichtung.json";
import dachfensterAkku from "../../data/teilarten/dachfenster-akku.json";
import filtereinsatz from "../../data/teilarten/filtereinsatz.json";
import regeneriersalz from "../../data/teilarten/regeneriersalz.json";
import gurtwickler from "../../data/teilarten/gurtwickler.json";
import rollladengurt from "../../data/teilarten/rollladengurt.json";
import rollladenmotor from "../../data/teilarten/rollladenmotor.json";
import rollladenHandsender from "../../data/teilarten/rollladen-handsender.json";
import rollladenWelle from "../../data/teilarten/rollladen-welle.json";

// Teileart-Seiten unter /ersatzteile/<teilart> (docs/SEITENAUFBAU.md, Abschnitt 4b): ein Teil, das in vielen
// Marken steckt (Eckventil, Perlator, Siphon …), markenübergreifend erklärt. Inhalt aus data/teilarten/<slug>.json,
// fest im Code eingebunden (TEILARTEN unten), damit die Seite ohne Import in die Datenbank auskommt.
// Live-Daten (unsere Teile, Shop-Preise) kommen weiter aus der Datenbank.

export interface TeilartProdukt {
  name: string;
  hersteller?: string;
  /** Für Bild und Preis aus den Partner-Feeds (Tabelle ean_angebote). */
  ean?: string;
  /** Nur geprüfte ASINs der Produktseite, keine Suche. */
  amazon_asin?: string;
  /** Ein kurzer Satz, wofür das Produkt passt („3/8" auf 3/8", mit Filter“). */
  hinweis?: string;
}

export interface Teilart {
  slug: string;
  /** Einzahl, wie in Überschriften: „Eckventil“. */
  name: string;
  /** Mehrzahl für Listen: „Eckventile“. */
  mehrzahl: string;
  /** Grammatisches Geschlecht für „den passenden Perlator“, „die passende Kartusche“, „das passende Eckventil“. */
  genus: "m" | "f" | "n";
  /** H1, als Frage oder mit dem, was die Seite beantwortet. Keine Jahreszahl, keine Anzahl. */
  titel: string;
  seo_title: string;
  seo_description: string;
  /** Zwei bis drei Sätze oben: was das Teil ist und worauf es ankommt. Leerzeile trennt Absätze. */
  kurz: string;
  /** Slugs aus src/lib/bereiche.ts. */
  bereiche: string[];
  /** teile.teiltyp: Diese Teile aus den Marken-Dateien erscheinen unter „nach Marke“. */
  teiltypen: string[];
  /** Nur Teile dieser Marken (Slugs) unter „nach Marke“, wenn der Teiltyp auch in anderen Bereichen vorkommt (dichtung). */
  marken?: string[];
  /** So bestimmst du Typ und Größe, in Schritten. */
  erkennen: { titel: string; text: string }[];
  groessen?: { titel: string; spalten: string[]; zeilen: string[][]; hinweis?: string };
  produkte?: TeilartProdukt[];
  /** Slugs von Problemseiten (markenübergreifend oder je Marke). */
  probleme?: string[];
  fragen: MarkenFrage[];
  quellen: string[];
}

// Neue Teileart: JSON-Datei in data/teilarten anlegen und hier eintragen.
const TEILARTEN: Teilart[] = [
  eckventil as Teilart,
  fuellventil as Teilart,
  spuelkasten as Teilart,
  wcSitzBefestigung as Teilart,
  perlator as Teilart,
  kartusche as Teilart,
  siphon as Teilart,
  ablaufgarnitur as Teilart,
  thermostatkartusche as Teilart,
  brauseschlauch as Teilart,
  duschablauf as Teilart,
  abUndUeberlaufgarnitur as Teilart,
  dachfensterRollo as Teilart,
  dachfensterHitzeschutz as Teilart,
  dachfensterDichtung as Teilart,
  dachfensterAkku as Teilart,
  filtereinsatz as Teilart,
  regeneriersalz as Teilart,
  gurtwickler as Teilart,
  rollladengurt as Teilart,
  rollladenmotor as Teilart,
  rollladenHandsender as Teilart,
  rollladenWelle as Teilart,
];

/** „den passenden Perlator“ / „die passende Kartusche“ / „das passende Eckventil“ (Akkusativ). */
export function denPassenden(t: Pick<Teilart, "name" | "genus">): string {
  return { m: "den passenden", f: "die passende", n: "das passende" }[t.genus] + " " + t.name;
}

/** „zum Perlator“ / „zur Kartusche“ / „zum Eckventil“ (Dativ). */
export function zumZur(t: Pick<Teilart, "name" | "genus">): string {
  return (t.genus === "f" ? "zur " : "zum ") + t.name;
}

export function alleTeilarten(): Teilart[] {
  return TEILARTEN;
}

export function teilartNachSlug(slug: string): Teilart | null {
  return TEILARTEN.find((t) => t.slug === slug) ?? null;
}

export function teilartenImBereich(bereich: string): Teilart[] {
  return TEILARTEN.filter((t) => t.bereiche.includes(bereich));
}

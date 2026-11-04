import type { MarkenFrage } from "@/lib/ersatzteile";
import spuelkastenLaeuftNach from "../../data/probleme/spuelkasten-laeuft-nach.json";
import spuelungLoestNichtAus from "../../data/probleme/spuelung-loest-nicht-aus.json";
import spuelkastenFuelltNicht from "../../data/probleme/spuelkasten-fuellt-nicht.json";
import wasserhahnTropft from "../../data/probleme/wasserhahn-tropft.json";
import spueleDichtetNicht from "../../data/probleme/spuele-dichtet-nicht.json";
import thermostatWirdNichtWarm from "../../data/probleme/thermostat-wird-nicht-warm.json";
import popUpVentilKlemmt from "../../data/probleme/pop-up-ventil-klemmt.json";

// Markenübergreifende Problemseiten unter /problem/<slug> (docs/SEITENAUFBAU.md, Abschnitt 4c), z. B.
// „Spülkasten läuft nach“. Inhalt aus data/probleme/<slug>.json, fest eingebunden (PROBLEME unten).
// Die Problemseiten je Marke kommen weiter aus der Datenbank und werden von hier verlinkt.

export interface UrsacheAllgemein {
  ursache: string;
  /** Wie man es erkennt und was hilft, zwei bis vier Sätze. */
  erklaerung: string;
  haeufigkeit?: "häufig" | "gelegentlich" | "selten";
  /** Teileart-Seite, die das Teil erklärt (src/lib/teilarten.ts). */
  teilart?: string;
}

export interface ProblemAllgemein {
  slug: string;
  /** H1 und Titel der Karte, so wie Leute es sagen: „Spülkasten läuft nach“. */
  titel: string;
  seo_title: string;
  seo_description: string;
  /** Ein, zwei Sätze: woran man das Problem erkennt. */
  symptom: string;
  /** Slug aus src/lib/bereiche.ts. */
  bereich: string;
  ursachen: UrsacheAllgemein[];
  /** Prüfschritte in der Reihenfolge, in der man sie macht. */
  pruefen: string[];
  fachbetrieb_ab?: string;
  /** Problemseiten je Marke (Tabelle probleme), z. B. geberit-spuelkasten-laeuft-nach. */
  marken_probleme: string[];
  fragen: MarkenFrage[];
  quellen: string[];
}

// Neues Problem: JSON-Datei in data/probleme anlegen und hier eintragen.
const PROBLEME: ProblemAllgemein[] = [
  spuelkastenLaeuftNach as ProblemAllgemein,
  spuelungLoestNichtAus as ProblemAllgemein,
  spuelkastenFuelltNicht as ProblemAllgemein,
  wasserhahnTropft as ProblemAllgemein,
  spueleDichtetNicht as ProblemAllgemein,
  thermostatWirdNichtWarm as ProblemAllgemein,
  popUpVentilKlemmt as ProblemAllgemein,
];

export function alleProblemeAllgemein(): ProblemAllgemein[] {
  return PROBLEME;
}

export function problemAllgemeinNachSlug(slug: string): ProblemAllgemein | null {
  return PROBLEME.find((p) => p.slug === slug) ?? null;
}

export function problemeAllgemeinImBereich(bereich: string): ProblemAllgemein[] {
  return PROBLEME.filter((p) => p.bereich === bereich);
}

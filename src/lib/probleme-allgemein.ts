import type { MarkenFrage } from "@/lib/ersatzteile";

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
const PROBLEME: ProblemAllgemein[] = [];

export function alleProblemeAllgemein(): ProblemAllgemein[] {
  return PROBLEME;
}

export function problemAllgemeinNachSlug(slug: string): ProblemAllgemein | null {
  return PROBLEME.find((p) => p.slug === slug) ?? null;
}

export function problemeAllgemeinImBereich(bereich: string): ProblemAllgemein[] {
  return PROBLEME.filter((p) => p.bereich === bereich);
}

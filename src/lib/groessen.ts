import type { Angebot, MarkenFrage, Teil } from "@/lib/ersatzteile";
import { teilKauflink, zeigePreis } from "@/lib/ersatzteile";
import type { TeilartProdukt } from "@/lib/teilarten";
import velux from "../../data/ersatzteile/velux.json";
import roto from "../../data/ersatzteile/roto.json";

// Größenseiten für Dachfenster (docs/SEITENAUFBAU.md, Abschnitt 5a): Bei VELUX ist jede Fenstergröße eine Serie
// mit produkttyp "dachfenster" (/ersatzteile/velux/mk04). Die Felder unter serie.groesse und marke.tabellen
// kennt der Datenbank-Import nicht; die Seiten lesen sie beim Bauen aus den Marken-Dateien. Teile, Zuordnungen
// und Shop-Preise kommen wie bei allen Serien aus der Datenbank.

export const GROESSEN_PRODUKTTYP = "dachfenster";

/** Tabelle auf der Marken-Seite unter „So findest du die richtige Nummer“ (Größencodes, Fenstertypen, Baureihen). */
export interface MarkenTabelle {
  id: string;
  titel: string;
  spalten: string[];
  zeilen: string[][];
  hinweis?: string;
}

/** Eine Zubehörart auf der Größenseite: Typenbezeichnungen des Herstellers und ein Satz, worauf es ankommt. */
export interface GroessenZubehoer {
  /** teile.teiltyp, eine der GROESSEN_ARTEN. */
  art: string;
  /** Typenbezeichnung mit Größe, wie sie auf dem Typenschild des Zubehörs steht: „DKL MK04“, „MHL MK00“. */
  typen: string[];
  hinweis?: string;
}

export interface Groesse {
  /** Code der aktuellen Generation, wie auf dem Typenschild: „MK04“. */
  code: string;
  breite_cm: number;
  hoehe_cm: number;
  /** Fenstertypen, die es in dieser Größe gibt („GGL“, „GPU“ …), laut Größenraster des Herstellers. */
  fenstertypen: string[];
  /** Frühere Namen derselben Größe. Abschnitte und Suchbegriffe auf dieser Seite, keine eigenen URLs. */
  alte_codes: { code: string; zeitraum: string; hinweis: string }[];
  /** Ein, zwei Sätze zu Fenstern mit eigenen, abweichenden Größen (bei VELUX vor 1991). */
  vor_1991?: string;
  zubehoer: GroessenZubehoer[];
  /** Nachbauten anderer Marken, nur mit geprüfter ASIN oder EAN und dem Hinweis „Nachbau“. */
  nachbauten: TeilartProdukt[];
  /** Fragen nur zu dieser Größe; die allgemeinen stehen auf der Marken-Seite. */
  fragen: MarkenFrage[];
  hinweis?: string;
}

/** Zubehörarten, die an der Größe hängen, in der Reihenfolge auf der Seite. Pflege-Sets und Schalter passen überall. */
export const GROESSEN_ARTEN = ["rollo", "plissee", "hitzeschutz", "insektenschutz", "rollladen"];

/** Eine Größenseite wird erst indexiert, wenn so viele Zubehörarten eine Kaufmöglichkeit haben (KEYWORDS-DACHFENSTER.md, Abschnitt 6). */
export const GROESSE_MIN_ARTEN = 3;

type MarkenDatei = {
  marke: { slug: string; tabellen?: MarkenTabelle[] };
  serien: { slug: string; groesse?: Groesse }[];
};
// Neue Marke mit Tabellen oder Größenseiten: Datei oben importieren und hier eintragen.
const DATEIEN = [velux, roto] as unknown as MarkenDatei[];

export function markenTabellen(markeSlug: string): MarkenTabelle[] {
  return DATEIEN.find((d) => d.marke.slug === markeSlug)?.marke.tabellen ?? [];
}

export function groesseVon(markeSlug: string, serieSlug: string): Groesse | null {
  return DATEIEN.find((d) => d.marke.slug === markeSlug)?.serien.find((s) => s.slug === serieSlug)?.groesse ?? null;
}

/** Zubehörarten mit mindestens einem Teil, das ein Partnershop mit Preis führt oder das eine geprüfte ASIN hat. */
export function kaufbareArten(
  teile: Pick<Teil, "id" | "teiltyp" | "amazon_asin" | "affiliate_url">[],
  angebote: Pick<Angebot, "teil_id" | "preis" | "vorraetig">[],
): Set<string> {
  const mitAngebot = new Set(angebote.filter((a) => zeigePreis(a as Angebot)).map((a) => a.teil_id));
  return new Set(
    teile
      .filter((t) => GROESSEN_ARTEN.includes(t.teiltyp))
      .filter((t) => mitAngebot.has(t.id) || teilKauflink(t as Teil) !== null)
      .map((t) => t.teiltyp),
  );
}

/** Größenseite ohne genug kaufbares Zubehör: noindex und nicht in der Sitemap. */
export function groesseIstDuenn(
  teile: Pick<Teil, "id" | "teiltyp" | "amazon_asin" | "affiliate_url">[],
  angebote: Pick<Angebot, "teil_id" | "preis" | "vorraetig">[],
): boolean {
  return kaufbareArten(teile, angebote).size < GROESSE_MIN_ARTEN;
}

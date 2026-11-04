// Technische Daten in produkte.technische_daten und ihre Anzeige in der Vergleichstabelle:
// Armaturen (auch im Armaturen-Vergleich) sowie Drückerplatten und Vorwandelemente.
// Ohne Datenbank-Import, damit auch der Vergleich im Browser (Client-Komponente) es nutzen kann.

export type ArmaturKategorie = "waschtisch" | "kueche" | "wanne" | "dusche";

/** Schlüssel in produkte.technische_daten (alle optional; was fehlt, zeigt die Tabelle als „k. A.“). */
export interface ArmaturDaten {
  kategorie?: ArmaturKategorie;
  bauart?: string;
  montage?: string;
  druck?: "Hochdruck" | "Niederdruck";
  auslaufhoehe_mm?: number;
  ausladung_mm?: number;
  gesamthoehe_mm?: number;
  brause?: string;
  ablauf?: string;
  kartusche_mm?: number;
  kartusche?: string;
  durchfluss_l_min?: number;
  anschluss?: string;
  sicherheitssperre_c?: number;
  umsteller?: string;
  temperaturbegrenzer?: string;
  oberflaechen?: string[];
}

export const KATEGORIE_NAME: Record<ArmaturKategorie, string> = {
  waschtisch: "Waschtisch",
  kueche: "Küche",
  wanne: "Badewanne",
  dusche: "Dusche",
};

const mm = (v: unknown) => (typeof v === "number" ? `${v.toLocaleString("de-DE")} mm` : null);
const text = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : null);

/** Zeilen der Vergleichstabelle, in dieser Reihenfolge. */
export const MERKMALE: { key: keyof ArmaturDaten; label: string; wert: (d: ArmaturDaten) => string | null }[] = [
  { key: "kategorie", label: "Einsatz", wert: (d) => (d.kategorie ? KATEGORIE_NAME[d.kategorie] ?? null : null) },
  { key: "bauart", label: "Bauart", wert: (d) => text(d.bauart) },
  { key: "montage", label: "Montage", wert: (d) => text(d.montage) },
  { key: "druck", label: "Druck", wert: (d) => text(d.druck) },
  { key: "auslaufhoehe_mm", label: "Auslaufhöhe", wert: (d) => mm(d.auslaufhoehe_mm) },
  { key: "ausladung_mm", label: "Ausladung", wert: (d) => mm(d.ausladung_mm) },
  { key: "gesamthoehe_mm", label: "Gesamthöhe", wert: (d) => mm(d.gesamthoehe_mm) },
  { key: "brause", label: "Brause", wert: (d) => text(d.brause) },
  { key: "ablauf", label: "Ablaufgarnitur", wert: (d) => text(d.ablauf) },
  {
    // Durchmesser und Typ in einer Zeile, z. B. „35 mm, SilkMove“
    key: "kartusche_mm",
    label: "Kartusche",
    wert: (d) =>
      [typeof d.kartusche_mm === "number" ? `${d.kartusche_mm} mm` : null, text(d.kartusche)].filter(Boolean).join(", ") || null,
  },
  {
    key: "durchfluss_l_min",
    label: "Durchfluss",
    wert: (d) => (typeof d.durchfluss_l_min === "number" ? `${d.durchfluss_l_min.toLocaleString("de-DE")} l/min` : null),
  },
  {
    key: "sicherheitssperre_c",
    label: "Sicherheitssperre",
    wert: (d) => (typeof d.sicherheitssperre_c === "number" ? `${d.sicherheitssperre_c} °C` : null),
  },
  { key: "temperaturbegrenzer", label: "Temperaturbegrenzer", wert: (d) => text(d.temperaturbegrenzer) },
  { key: "umsteller", label: "Umsteller Wanne/Brause", wert: (d) => text(d.umsteller) },
  { key: "anschluss", label: "Anschluss", wert: (d) => text(d.anschluss) },
  {
    key: "oberflaechen",
    label: "Oberflächen",
    wert: (d) => (Array.isArray(d.oberflaechen) && d.oberflaechen.length > 0 ? d.oberflaechen.join(", ") : null),
  },
];

export function armaturDaten(td: unknown): ArmaturDaten | null {
  if (!td || typeof td !== "object" || Array.isArray(td)) return null;
  const d = td as ArmaturDaten;
  return d.kategorie && d.kategorie in KATEGORIE_NAME ? d : null;
}

// ---------- WC und Haustechnik: Drückerplatten, Vorwandelemente, Hebeanlagen ----------

export type WcKategorie = "drueckerplatte" | "vorwandelement" | "hebeanlage";

export interface WcDaten {
  kategorie?: WcKategorie;
  // Drückerplatte
  passend_fuer?: string;
  betaetigung?: string;
  material?: string;
  masse_mm?: string;
  einbau?: string;
  farben?: string[];
  // Vorwandelement
  bauhoehe_mm?: number;
  breite_mm?: number;
  einbautiefe_mm?: number;
  spuelkasten?: string;
  drueckerplatten?: string;
  wc_hoehe_verstellbar?: string;
  befestigung?: string;
  ablauf?: string;
  schallschutz?: string;
  lieferumfang?: string;
  // Hebeanlage
  einsatz?: string;
  norm?: string;
  foerderhoehe_max_m?: number;
  foerdermenge?: string;
  zulaeufe?: string;
  druckleitung?: string;
  leistung_w?: number;
  behaelter_l?: number;
  geraeusch_db?: number;
  schneidwerk?: string;
}

export const WC_KATEGORIE_NAME: Record<WcKategorie, string> = {
  drueckerplatte: "Drückerplatte",
  vorwandelement: "Vorwandelement",
  hebeanlage: "Hebeanlage",
};

export const WC_MERKMALE: { key: keyof WcDaten; label: string; wert: (d: WcDaten) => string | null }[] = [
  { key: "einsatz", label: "Einsatz", wert: (d) => text(d.einsatz) },
  { key: "norm", label: "Norm", wert: (d) => text(d.norm) },
  { key: "passend_fuer", label: "Passt auf", wert: (d) => text(d.passend_fuer) },
  { key: "spuelkasten", label: "Spülkasten", wert: (d) => text(d.spuelkasten) },
  { key: "betaetigung", label: "Betätigung", wert: (d) => text(d.betaetigung) },
  { key: "drueckerplatten", label: "Drückerplatten", wert: (d) => text(d.drueckerplatten) },
  { key: "material", label: "Material", wert: (d) => text(d.material) },
  { key: "masse_mm", label: "Maße (B × H × T)", wert: (d) => (text(d.masse_mm) ? `${text(d.masse_mm)} mm` : null) },
  { key: "einbau", label: "Einbau", wert: (d) => text(d.einbau) },
  { key: "bauhoehe_mm", label: "Bauhöhe", wert: (d) => mm(d.bauhoehe_mm) },
  { key: "breite_mm", label: "Breite", wert: (d) => mm(d.breite_mm) },
  { key: "einbautiefe_mm", label: "Einbautiefe", wert: (d) => mm(d.einbautiefe_mm) },
  { key: "wc_hoehe_verstellbar", label: "WC-Höhe verstellbar", wert: (d) => text(d.wc_hoehe_verstellbar) },
  { key: "befestigung", label: "WC-Befestigung", wert: (d) => text(d.befestigung) },
  { key: "ablauf", label: "Ablauf", wert: (d) => text(d.ablauf) },
  { key: "schallschutz", label: "Schallschutz", wert: (d) => text(d.schallschutz) },
  {
    key: "foerderhoehe_max_m",
    label: "Förderhöhe max.",
    wert: (d) => (typeof d.foerderhoehe_max_m === "number" ? `${d.foerderhoehe_max_m.toLocaleString("de-DE")} m` : null),
  },
  { key: "foerdermenge", label: "Fördermenge max.", wert: (d) => text(d.foerdermenge) },
  { key: "zulaeufe", label: "Zuläufe", wert: (d) => text(d.zulaeufe) },
  { key: "druckleitung", label: "Druckleitung", wert: (d) => text(d.druckleitung) },
  { key: "schneidwerk", label: "Schneidwerk", wert: (d) => text(d.schneidwerk) },
  { key: "leistung_w", label: "Leistung", wert: (d) => (typeof d.leistung_w === "number" ? `${d.leistung_w.toLocaleString("de-DE")} W` : null) },
  { key: "behaelter_l", label: "Behälter", wert: (d) => (typeof d.behaelter_l === "number" ? `${d.behaelter_l.toLocaleString("de-DE")} l` : null) },
  { key: "geraeusch_db", label: "Geräusch", wert: (d) => (typeof d.geraeusch_db === "number" ? `${d.geraeusch_db} dB(A)` : null) },
  { key: "lieferumfang", label: "Lieferumfang", wert: (d) => text(d.lieferumfang) },
  { key: "farben", label: "Farben", wert: (d) => (Array.isArray(d.farben) && d.farben.length > 0 ? d.farben.join(", ") : null) },
];

export type ProduktDaten = ArmaturDaten | WcDaten;

function istWc(d: ProduktDaten): d is WcDaten {
  return !!d.kategorie && d.kategorie in WC_KATEGORIE_NAME;
}

/** Technische Daten jeder bekannten Kategorie (Armatur, Drückerplatte, Vorwandelement, Hebeanlage). */
export function produktDaten(td: unknown): ProduktDaten | null {
  if (!td || typeof td !== "object" || Array.isArray(td)) return null;
  const d = td as ProduktDaten;
  return armaturDaten(d) ?? (istWc(d) ? d : null);
}

/**
 * Nur Merkmale, die mindestens ein Produkt der Liste hat. Die Zeilen richten sich nach der
 * Kategorie des ersten Produkts; eine Kaufberatung mischt Armaturen und WC-Produkte nicht.
 */
export function merkmaleFuer(daten: (ProduktDaten | null)[]): { key: string; label: string; wert: (d: ProduktDaten) => string | null }[] {
  const erstes = daten.find((d): d is ProduktDaten => !!d);
  const liste =
    erstes && istWc(erstes)
      ? WC_MERKMALE.map((m) => ({ ...m, wert: (d: ProduktDaten) => (istWc(d) ? m.wert(d) : null) }))
      : MERKMALE.map((m) => ({ ...m, wert: (d: ProduktDaten) => (istWc(d) ? null : m.wert(d)) }));
  return liste.filter((m) => daten.some((d) => d && m.wert(d) !== null));
}

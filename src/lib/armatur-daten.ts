// Technische Daten der Armaturen in produkte.technische_daten und ihre Anzeige im Vergleich.
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

/** Nur Merkmale, die mindestens ein Produkt der Liste hat. */
export function merkmaleFuer(daten: (ArmaturDaten | null)[]) {
  return MERKMALE.filter((m) => daten.some((d) => d && m.wert(d) !== null));
}

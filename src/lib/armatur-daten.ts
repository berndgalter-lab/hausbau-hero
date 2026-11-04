// Technische Daten in produkte.technische_daten und ihre Anzeige in der Vergleichstabelle:
// Armaturen (auch im Armaturen-Vergleich) sowie Drückerplatten und Vorwandelemente.
// Ohne Datenbank-Import, damit auch der Vergleich im Browser (Client-Komponente) es nutzen kann.

// Druckminderer laufen mit, weil der Ratgeber dieselbe Auswahlhilfe nutzt; im Armaturen-Vergleich fehlen sie.
export type ArmaturKategorie = "waschtisch" | "kueche" | "wanne" | "dusche" | "druckminderer";

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
  /** Unterputz: Grundkörper, auf den das Fertigset passt, z. B. „GROHE Rapido SmartBox“ */
  grundkoerper?: string;
  /** Unterputz: Zahl der Abgänge (Wanne und Brause = 2) */
  abgaenge?: number;
  /** Unterputz: Form und Maß der Wandrosette, z. B. „rund, Ø 158 mm“ */
  rosette?: string;
  /** Unterputz-Wanne: Sicherung gegen Rückfließen nach EN 1717, „eingebaut“ oder z. B. „nachrüstbar (GROHE 14055)“ */
  rueckflusssicherung?: string;
  /** Duschthermostat: wo die Brause angeschlossen wird, „unten“, „oben“ oder „oben oder unten (wahlweise)“ */
  abgang?: string;
  /** Eignung für Durchlauferhitzer laut Hersteller, z. B. „geeignet“ oder „ab 18 kW“ */
  durchlauferhitzer?: string;
  /** Küche: wie weit sich der Auslauf drehen lässt, z. B. „360°“ */
  schwenkbereich?: string;
  /** Küche: Vorfenstermontage, z. B. „umlegbar“ oder „nein“ */
  vorfenster?: string;
  /** Duschsystem: Kopfbrause, Kantenlänge oder Durchmesser */
  kopfbrause_mm?: number;
  /** Duschsystem: Kopfbrause als Text, z. B. „rund, Ø 250 mm, 1 Strahlart“ */
  kopfbrause?: string;
  handbrause?: string;
  /** Duschsystem: Gesamthöhe bzw. Höhe der Brausestange */
  hoehe_mm?: number;
  hoehe?: string;
  /** Duschsystem: wie es an die vorhandene Installation anschließt, z. B. „an Abgang der vorhandenen Armatur“ */
  nachruesten?: string;
  /** Druckminderer: Anschlussgröße für die Auswahlhilfe, genau „3/4"“, „1"“ oder „1 1/4"“ */
  anschluss_zoll?: string;
  /** Druckminderer: „nein“ oder Feinheit, z. B. „Feinfilter 100 µm“ */
  filter?: string;
  /** Druckminderer: „nein“, „manuell“ oder „automatisch“ */
  rueckspuelung?: string;
  /** Druckminderer: „ja“, „nein“ oder „nachrüstbar“ */
  rueckflussverhinderer?: string;
  eingangsdruck_max_bar?: number;
  /** Druckminderer: Einstellbereich, z. B. „1,5–6 bar, ab Werk 4 bar“ */
  ausgangsdruck?: string;
  manometer?: string;
  einbaulage?: string;
  temperatur_max_c?: number;
  /** Druckminderer: Durchfluss als Text, z. B. kvs-Wert */
  durchfluss?: string;
  norm?: string;
  material?: string;
}

export const KATEGORIE_NAME: Record<ArmaturKategorie, string> = {
  waschtisch: "Waschtisch",
  kueche: "Küche",
  wanne: "Badewanne",
  dusche: "Dusche",
  druckminderer: "Druckminderer",
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
  { key: "grundkoerper", label: "Grundkörper", wert: (d) => text(d.grundkoerper) },
  { key: "abgaenge", label: "Abgänge", wert: (d) => (typeof d.abgaenge === "number" ? String(d.abgaenge) : null) },
  { key: "rosette", label: "Rosette", wert: (d) => text(d.rosette) },
  { key: "rueckflusssicherung", label: "Sicherung EN 1717", wert: (d) => text(d.rueckflusssicherung) },
  { key: "abgang", label: "Brauseabgang", wert: (d) => text(d.abgang) },
  { key: "durchlauferhitzer", label: "Durchlauferhitzer", wert: (d) => text(d.durchlauferhitzer) },
  { key: "schwenkbereich", label: "Schwenkbereich", wert: (d) => text(d.schwenkbereich) },
  { key: "vorfenster", label: "Vorfenstermontage", wert: (d) => text(d.vorfenster) },
  { key: "kopfbrause", label: "Kopfbrause", wert: (d) => text(d.kopfbrause) },
  { key: "handbrause", label: "Handbrause", wert: (d) => text(d.handbrause) },
  { key: "hoehe", label: "Höhe", wert: (d) => text(d.hoehe) ?? mm(d.hoehe_mm) },
  { key: "nachruesten", label: "Anschluss an", wert: (d) => text(d.nachruesten) },
  { key: "anschluss", label: "Anschluss", wert: (d) => text(d.anschluss) },
  { key: "filter", label: "Filter", wert: (d) => text(d.filter) },
  { key: "rueckspuelung", label: "Rückspülung", wert: (d) => text(d.rueckspuelung) },
  { key: "rueckflussverhinderer", label: "Rückflussverhinderer", wert: (d) => text(d.rueckflussverhinderer) },
  {
    key: "eingangsdruck_max_bar",
    label: "Eingangsdruck max.",
    wert: (d) => (typeof d.eingangsdruck_max_bar === "number" ? `${d.eingangsdruck_max_bar.toLocaleString("de-DE")} bar` : null),
  },
  { key: "ausgangsdruck", label: "Ausgangsdruck", wert: (d) => text(d.ausgangsdruck) },
  { key: "manometer", label: "Manometer", wert: (d) => text(d.manometer) },
  { key: "einbaulage", label: "Einbaulage", wert: (d) => text(d.einbaulage) },
  {
    key: "temperatur_max_c",
    label: "Wassertemperatur max.",
    wert: (d) => (typeof d.temperatur_max_c === "number" ? `${d.temperatur_max_c} °C` : null),
  },
  { key: "durchfluss", label: "Durchfluss", wert: (d) => text(d.durchfluss) },
  { key: "norm", label: "Norm", wert: (d) => text(d.norm) },
  { key: "material", label: "Material", wert: (d) => text(d.material) },
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

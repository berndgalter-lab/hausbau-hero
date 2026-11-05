import { KATEGORIE_NAME, type ArmaturKategorie, type FensterGeneration, type RatgeberDaten, type SonnenschutzZweck } from "@/lib/armatur-daten";

// Produkt-Ratgeber unter /ratgeber/<pfad>: eine Auswahlhilfe pro Produktart (docs/SEITENAUFBAU.md, Abschnitt 3).
// Inhalt und Produkte kommen wie bisher aus data/artikel/<slug>.* (Datenbank-Tabellen seiten und produkte).
// Hier steht nur, unter welcher URL ein Beitrag erscheint und welche Fragen die Auswahlhilfe stellt.
// Ohne Server-Abhängigkeiten, weil die Auswahlhilfe im Browser dieselben Fragen braucht.

/** Antwort eines Produkts auf eine Option: passt, passt nicht, oder der Hersteller sagt nichts dazu. */
type Passt = (d: RatgeberDaten) => boolean | null;

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
  /** Überschrift der Auswahlhilfe, wenn „Welche <name> passt?“ nicht stimmt (Duschthermostat, Vorwandelement). */
  frage?: string;
  /** Mehrzahl nach „3 von 6 …“, wenn sie anders lautet: „Elementen“. */
  mehrzahlDativ?: string;
  /** Anfang von „Keine der 6 Armaturen …“, für sächliche Wörter „Keines“. */
  keine?: string;
  fragen: AuswahlFrage[];
  /** Eckdaten in der Ergebniszeile, kurz und in dieser Reihenfolge. */
  eckdaten: (d: RatgeberDaten) => (string | null)[];
}

const mm = (v: number | undefined, was: string) => (typeof v === "number" ? `${v} mm ${was}` : null);

/** Ab dieser Auslaufhöhe zählt eine Waschtischarmatur als hoch genug für Aufsatzbecken. */
const AUFSATZ_AB_MM = 180;

const hatOberflaeche = (d: RatgeberDaten, muster: RegExp): boolean | null =>
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
    d.kategorie && d.kategorie in KATEGORIE_NAME ? KATEGORIE_NAME[d.kategorie as ArmaturKategorie] : null,
    d.ablauf ? (/zug/i.test(d.ablauf) ? "Zugstangen-Ablauf" : `${d.ablauf}-Ablauf`) : null,
    mm(d.ausladung_mm, "Ausladung"),
    typeof d.kartusche_mm === "number" ? `Kartusche ${d.kartusche_mm} mm` : null,
    typeof d.durchfluss_l_min === "number" ? `${d.durchfluss_l_min.toLocaleString("de-DE")} l/min` : null,
  ],
};

const echteBrause = (d: RatgeberDaten): boolean | null => (d.brause ? !/auslauf/i.test(d.brause) && d.brause.toLowerCase() !== "nein" : null);

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

const istSmartBox = (d: RatgeberDaten) => enthaelt(d.grundkoerper, /smartbox/i);

const BADEWANNENARMATUR_UNTERPUTZ: ProduktRatgeber = {
  pfad: "badewannenarmatur-unterputz",
  slug: "badewannenarmatur-unterputz",
  silo: "bad",
  name: "Unterputz-Wannenarmatur",
  mehrzahl: "Armaturen",
  fragen: [
    {
      key: "grundkoerper",
      label: "Grundkörper in der Wand",
      hinweis: "Griff und Rosette abnehmen: Die GROHE SmartBox ist rund mit GROHE-Logo, die erste hansgrohe iBox hat einen achteckigen Rahmen, die iBox 2 einen quadratischen Körper.",
      optionen: [
        { label: "GROHE Rapido SmartBox", passt: istSmartBox },
        // „iBox universal“ ohne folgende 2: die erste iBox (seit 2001)
        { label: "hansgrohe iBox universal (achteckig)", passt: (d) => enthaelt(d.grundkoerper, /iBox universal(?! 2)/i) },
        { label: "hansgrohe iBox universal 2 (quadratisch)", passt: (d) => enthaelt(d.grundkoerper, /iBox universal 2/i) },
        {
          label: "GROHE Rapido E oder Rapido T",
          passt: (d) => enthaelt(d.grundkoerper, /Rapido [ET]\b/),
          sonst: {
            text: "Auf die älteren Körper Rapido E und Rapido T passen die Sets für die SmartBox nicht. Du brauchst ein Fertigset mit dem Vermerk „für 35 501 000“ oder „für Rapido T 35 500“.",
            href: "#fragen",
            linktext: "Mehr dazu bei den Fragen",
          },
        },
      ],
    },
    {
      key: "regelung",
      label: "Regelung",
      hinweis: "Ein Thermostat hält die Temperatur und sperrt bei 38 oder 40 °C, braucht aber mehr Wasserdruck.",
      optionen: [
        { label: "Thermostat", passt: (d) => (d.bauart ? d.bauart === "Thermostat" : null) },
        { label: "Einhebel", passt: (d) => (d.bauart ? d.bauart === "Einhebel" : null) },
      ],
    },
    {
      key: "farbe",
      label: "Farbe",
      hinweis: "Schwarz hat eine eigene Artikelnummer, sie steht beim Modell. Prüf im Shop, dass Farbe und Nummer zusammenpassen.",
      optionen: [
        { label: "Chrom", passt: (d) => hatOberflaeche(d, /chrom/i) },
        { label: "Schwarz", passt: (d) => hatOberflaeche(d, /schwarz|black/i) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.grundkoerper ? (istSmartBox(d) ? "GROHE Rapido SmartBox" : d.grundkoerper) : null,
    d.bauart ?? null,
    typeof d.sicherheitssperre_c === "number" ? `Sperre bei ${d.sicherheitssperre_c} °C` : null,
    d.rosette ? `Rosette ${d.rosette}` : null,
    d.rueckflusssicherung ? `EN 1717: ${d.rueckflusssicherung}` : null,
  ],
};

const istUnterputz = (d: RatgeberDaten) => d.montage === "Unterputz";

const DUSCHTHERMOSTAT: ProduktRatgeber = {
  pfad: "duschthermostat",
  slug: "duschthermostat",
  silo: "bad",
  name: "Duschthermostat",
  mehrzahl: "Thermostate",
  mehrzahlDativ: "Thermostaten",
  keine: "Keiner",
  frage: "Welcher Duschthermostat passt?",
  fragen: [
    {
      key: "montage",
      label: "Montage",
      hinweis: "Aufputz: Der Thermostat sitzt vor der Wand auf zwei Anschlüssen. Unterputz: Nur Rosette und Griffe schauen aus der Wand.",
      optionen: [
        { label: "Aufputz", passt: (d) => (d.montage ? d.montage === "Aufputz" : null) },
        { label: "Unterputz", passt: (d) => (d.montage ? istUnterputz(d) : null) },
      ],
    },
    {
      key: "warmwasser",
      label: "Warmwasser",
      hinweis: "Hängt unter dem Becken oder in der Küche ein kleiner offener Boiler, ist es ein Untertischspeicher. Daran funktioniert kein Thermostat.",
      optionen: [
        { label: "zentral (Heizung oder Speicher)", passt: (d) => (d.druck ? d.druck === "Hochdruck" : null) },
        {
          label: "Durchlauferhitzer",
          passt: (d) => (d.durchlauferhitzer ? true : null),
        },
        {
          label: "offener Untertischspeicher",
          passt: (d) => (d.druck ? d.druck === "Niederdruck" : null),
          sonst: {
            text: "Thermostate laufen laut GROHE nicht an drucklosen (offenen) Speichern. Dort brauchst du eine Niederdruckarmatur.",
          },
        },
      ],
    },
    {
      key: "brause",
      label: "Brause",
      hinweis: "Aufputz-Thermostate haben einen Abgang, meist unten für den Schlauch. Unterputz-Sets gibt es für eine Brause oder mit Umstellung für zwei.",
      optionen: [
        { label: "Handbrause am Schlauch", passt: (d) => (istUnterputz(d) ? true : enthaelt(d.abgang, /unten/i)) },
        { label: "Kopfbrause, fest an der Wand", passt: (d) => (istUnterputz(d) ? true : enthaelt(d.abgang, /oben/i)) },
        {
          label: "Kopf- und Handbrause",
          passt: (d) => (typeof d.abgaenge === "number" ? d.abgaenge >= 2 : d.montage === "Aufputz" ? false : null),
          sonst: {
            text: "Für Kopf- und Handbrause an Aufputz-Anschlüssen gibt es Duschsysteme mit eigenem Thermostat.",
            href: "/ratgeber/duschsystem",
            linktext: "Duschsysteme ansehen",
          },
        },
      ],
    },
    {
      key: "farbe",
      label: "Farbe",
      hinweis: "Farben haben eine eigene Artikelnummer, sie steht beim Modell. Prüf im Shop, dass Farbe und Nummer zusammenpassen.",
      optionen: [
        { label: "Chrom", passt: (d) => hatOberflaeche(d, /chrom/i) },
        { label: "Schwarz", passt: (d) => hatOberflaeche(d, /schwarz|black/i) },
        { label: "Weiß", passt: (d) => hatOberflaeche(d, /weiß|white/i) },
        { label: "Gold oder Bronze", passt: (d) => hatOberflaeche(d, /gold|bronze/i) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.montage ?? null,
    typeof d.sicherheitssperre_c === "number" ? `Sperre bei ${d.sicherheitssperre_c} °C` : null,
    istUnterputz(d) ? (d.grundkoerper ?? null) : d.abgang ? `Abgang ${d.abgang}` : null,
    istUnterputz(d) ? (d.abgang ?? null) : (d.anschluss ?? null),
    d.durchlauferhitzer ? `Durchlauferhitzer: ${d.durchlauferhitzer}` : null,
  ],
};

const UNTERPUTZ_DUSCHARMATUR: ProduktRatgeber = {
  pfad: "unterputz-duscharmatur",
  slug: "unterputz-duscharmatur",
  silo: "bad",
  name: "Unterputz-Duscharmatur",
  mehrzahl: "Fertigsets",
  keine: "Keines",
  frage: "Welches Fertigset passt auf deinen Grundkörper?",
  fragen: [
    {
      key: "grundkoerper",
      label: "Grundkörper in der Wand",
      hinweis: "Griff und Rosette abnehmen: Die GROHE SmartBox ist rund mit GROHE-Logo, die erste hansgrohe iBox hat einen achteckigen Rahmen, die iBox 2 einen quadratischen Körper. Bei HANSA steht BLUEBOX auf dem Körper.",
      optionen: [
        { label: "GROHE Rapido SmartBox", passt: istSmartBox },
        { label: "hansgrohe iBox universal (achteckig)", passt: (d) => enthaelt(d.grundkoerper, /iBox universal(?! 2)/i) },
        { label: "hansgrohe iBox universal 2 (quadratisch)", passt: (d) => enthaelt(d.grundkoerper, /iBox universal 2/i) },
        { label: "HANSA BLUEBOX", passt: (d) => enthaelt(d.grundkoerper, /BLUEBOX/i) },
        {
          label: "GROHE Rapido E oder Rapido T",
          passt: (d) => enthaelt(d.grundkoerper, /Rapido [ET]\b/),
          sonst: {
            text: "Auf die älteren Körper Rapido E und Rapido T passen die Sets für die SmartBox nicht. Du brauchst ein Fertigset mit dem Vermerk „für 35 501 000“ oder „für Rapido T 35 500“.",
            href: "#fragen",
            linktext: "Mehr dazu bei den Fragen",
          },
        },
      ],
    },
    {
      key: "brausen",
      label: "Brausen",
      hinweis: "Für Kopf- und Handbrause muss der Grundkörper schon zwei Abgänge haben, die zu beiden Brausen verrohrt sind. Das Fertigset allein schafft keinen zweiten Abgang.",
      optionen: [
        { label: "Eine Brause", passt: (d) => (typeof d.abgaenge === "number" ? d.abgaenge === 1 : null) },
        { label: "Kopf- und Handbrause", passt: (d) => (typeof d.abgaenge === "number" ? d.abgaenge >= 2 : null) },
      ],
    },
    {
      key: "regelung",
      label: "Regelung",
      hinweis: "Ein Thermostat hält die Temperatur und sperrt bei 38 oder 40 °C, kostet aber deutlich mehr.",
      optionen: [
        { label: "Thermostat", passt: (d) => (d.bauart ? d.bauart === "Thermostat" : null) },
        { label: "Einhebel", passt: (d) => (d.bauart ? d.bauart === "Einhebel" : null) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.grundkoerper ? (istSmartBox(d) ? "GROHE Rapido SmartBox" : d.grundkoerper.replace(/ \(.*\)$/, "")) : null,
    d.bauart ?? null,
    typeof d.abgaenge === "number" ? (d.abgaenge >= 2 ? "Kopf- und Handbrause" : "eine Brause") : null,
    typeof d.sicherheitssperre_c === "number" ? `Sperre bei ${d.sicherheitssperre_c} °C` : null,
    d.rosette ? `Rosette ${d.rosette}` : null,
  ],
};

const cm = (v: number | undefined) => (typeof v === "number" ? (v / 10).toLocaleString("de-DE") : null);

/** Im Lieferumfang, nicht nur als Zubehör: „mit Wandankern“, nicht „ohne Wandanker“. */
const imPaket = (d: RatgeberDaten, muster: RegExp): boolean | null =>
  d.lieferumfang ? new RegExp(`mit [^,]*(${muster.source})`, "i").test(d.lieferumfang) : null;

const VORWANDELEMENT: ProduktRatgeber = {
  pfad: "vorwandelement",
  slug: "vorwandelement-wc",
  silo: "bad",
  name: "Vorwandelement",
  mehrzahl: "Elemente",
  mehrzahlDativ: "Elementen",
  frage: "Welches Vorwandelement passt?",
  keine: "Keines",
  fragen: [
    {
      key: "hoehe",
      label: "Einbauort",
      optionen: [
        { label: "normale Wand", passt: (d) => (typeof d.bauhoehe_mm === "number" ? d.bauhoehe_mm >= 1000 : null) },
        {
          label: "unter Fenster oder Dachschräge",
          passt: (d) => (typeof d.bauhoehe_mm === "number" ? d.bauhoehe_mm < 1000 : null),
          sonst: {
            text: "Alle Elemente hier sind 112 bis 113 cm hoch. Für niedrige Einbauorte gibt es eigene Elemente, etwa Geberit Duofix mit Omega-Spülkasten in 98 oder 82 cm.",
            href: "/bad/vorwandelement-wc-hoehe",
            linktext: "Höhen und Maße",
          },
        },
      ],
    },
    {
      key: "platte",
      label: "Drückerplatte",
      hinweis: "Die Platte muss zum Spülkasten passen. Auf einen Geberit-Sigma-Spülkasten passen nur Sigma-Platten, auf Delta nur Delta-Platten.",
      optionen: [
        { label: "Geberit Sigma", passt: (d) => enthaelt(d.drueckerplatten, /sigma/i) },
        { label: "Geberit Delta", passt: (d) => enthaelt(d.drueckerplatten, /delta/i) },
        { label: "TECE", passt: (d) => enthaelt(d.drueckerplatten, /tece/i) },
        { label: "GROHE", passt: (d) => enthaelt(d.drueckerplatten, /grohe/i) },
        { label: "Viega", passt: (d) => enthaelt(d.drueckerplatten, /viega/i) },
      ],
    },
    {
      key: "ausladung",
      label: "Länge des WCs",
      hinweis: "Die Ausladung steht im Datenblatt der Keramik: von der Wand bis zur Vorderkante.",
      optionen: [
        { label: "bis 62 cm", passt: (d) => (typeof d.wc_ausladung_max_mm === "number" ? d.wc_ausladung_max_mm >= 620 : null) },
        { label: "62 bis 70 cm", passt: (d) => (typeof d.wc_ausladung_max_mm === "number" ? d.wc_ausladung_max_mm >= 700 : null) },
      ],
    },
    {
      key: "paket",
      label: "Soll dabei sein",
      hinweis: "Vor einer gemauerten Wand hält das Element mit Wandankern oder Wandwinkeln. Fehlen sie, kaufst du sie als Zubehör.",
      optionen: [
        { label: "Befestigung für gemauerte Wand", passt: (d) => imPaket(d, /wandanker|wandwinkel|vorwand/) },
        { label: "Drückerplatte", passt: (d) => imPaket(d, /platte/) },
      ],
    },
    {
      key: "duschwc",
      label: "Dusch-WC",
      hinweis: "Ein Dusch-WC braucht am Element einen Wasser- und einen Stromanschluss.",
      optionen: [{ label: "später möglich", passt: (d) => (d.dusch_wc ? !/nein/i.test(d.dusch_wc) : null) }],
    },
  ],
  eckdaten: (d) => [
    d.drueckerplatten ? `Platten: ${d.drueckerplatten}` : null,
    typeof d.wc_ausladung_max_mm === "number" ? `WC bis ${cm(d.wc_ausladung_max_mm)} cm` : null,
    typeof d.bauhoehe_mm === "number" ? `${cm(d.bauhoehe_mm)} cm hoch` : null,
    d.lieferumfang ?? null,
  ],
};

const DRUECKERPLATTE: ProduktRatgeber = {
  pfad: "drueckerplatte",
  slug: "geberit-sigma-drueckerplatte",
  silo: "bad",
  name: "Drückerplatte",
  mehrzahl: "Platten",
  fragen: [
    {
      key: "spuelkasten",
      label: "Spülkasten",
      hinweis: "Der Typ steht hinter der alten Platte auf der Schutzplatte. Am Maß erkennst du ihn nicht sicher, Sigma- und Delta-Platten sind gleich groß.",
      optionen: [
        { label: "Sigma 12 cm", passt: (d) => enthaelt(d.passend_fuer, /sigma 12/i) },
        { label: "Sigma 8 cm", passt: (d) => enthaelt(d.passend_fuer, /sigma[^,]*8 cm|UP720/i) },
        { label: "Omega", passt: (d) => enthaelt(d.passend_fuer, /omega/i) },
        { label: "Delta", passt: (d) => enthaelt(d.passend_fuer, /delta/i) },
        {
          label: "Kappa, Twinline oder Friatec",
          passt: (d) => enthaelt(d.passend_fuer, /kappa|twinline|friatec/i),
          sonst: {
            text: "Für Kappa und Twinline brauchst du Platten derselben Familie. Platten für Friatec-Spülkästen bekommst du heute bei Sanit.",
            href: "#fragen",
            linktext: "Mehr dazu bei den Fragen",
          },
        },
      ],
    },
    {
      key: "tasten",
      label: "Tasten",
      optionen: [
        { label: "rund", passt: (d) => enthaelt(d.tasten, /rund/i) },
        { label: "eckig", passt: (d) => enthaelt(d.tasten, /eckig/i) },
      ],
    },
    {
      key: "material",
      label: "Material",
      optionen: [
        { label: "Kunststoff", passt: (d) => (d.material ? /^kunststoff/i.test(d.material) : null) },
        { label: "Metall", passt: (d) => enthaelt(d.material, /zink|edelstahl|metall/i) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.passend_fuer ? `für ${d.passend_fuer}` : null,
    d.tasten ? `Tasten ${d.tasten}` : null,
    d.material ?? null,
    d.masse_mm ? `${d.masse_mm} mm` : null,
  ],
};

const KLEINHEBEANLAGE: ProduktRatgeber = {
  pfad: "kleinhebeanlage",
  slug: "kleinhebeanlage",
  silo: "bad",
  name: "Kleinhebeanlage",
  mehrzahl: "Geräte",
  mehrzahlDativ: "Geräten",
  keine: "Keines",
  fragen: [
    {
      key: "anschluss",
      label: "Was kommt dran?",
      hinweis: "Mit WC brauchst du eine Anlage nach DIN EN 12050-3, ohne WC reicht eine nach 12050-2.",
      optionen: [
        { label: "WC und Waschbecken", passt: (d) => enthaelt(d.einsatz, /^WC/i) },
        { label: "WC und Dusche", passt: (d) => enthaelt(d.einsatz, /^WC.*Dusche/i) },
        { label: "Dusche oder Waschbecken", passt: (d) => enthaelt(d.norm, /12050-2/) },
        { label: "Waschmaschine", passt: (d) => enthaelt(d.einsatz, /waschmaschine/i) },
        { label: "Kondenswasser der Heizung", passt: (d) => enthaelt(d.einsatz, /kondensat/i) },
        {
          label: "mehrere WCs oder ganzer Keller",
          passt: () => false,
          sonst: {
            text: "Dafür brauchst du eine Fäkalienhebeanlage nach DIN EN 12050-1 mit eigener Lüftung über Dach.",
            href: "/bad/hebeanlage-kosten",
            linktext: "Hebeanlage: Kosten und Pflicht",
          },
        },
      ],
    },
    {
      key: "neutralisation",
      label: "Kondensat neutralisieren",
      hinweis: "Nötig unter pH 2,5 oder wenn die Kommune es verlangt.",
      optionen: [{ label: "ja, im Gerät", passt: (d) => (d.einsatz ? /neutralisiert/i.test(d.einsatz) : null) }],
    },
  ],
  eckdaten: (d) => [
    d.einsatz ?? null,
    d.norm ?? null,
    typeof d.foerderhoehe_max_m === "number" ? `bis ${d.foerderhoehe_max_m.toLocaleString("de-DE")} m Förderhöhe` : null,
    typeof d.geraeusch_db === "number" ? `${d.geraeusch_db} dB(A) laut Hersteller` : null,
  ],
};

const KUECHENARMATUR: ProduktRatgeber = {
  pfad: "kuechenarmatur",
  slug: "kuechenarmatur",
  silo: "kueche",
  name: "Küchenarmatur",
  mehrzahl: "Armaturen",
  fragen: [
    {
      key: "druck",
      label: "Warmwasser",
      hinweis: "Hängt unter der Spüle ein kleiner Boiler und hat die alte Armatur drei Anschlüsse, ist es ein offener Speicher.",
      optionen: [
        { label: "zentral oder Durchlauferhitzer", passt: (d) => (d.druck ? d.druck === "Hochdruck" : null) },
        { label: "offener Untertischspeicher", passt: (d) => (d.druck ? d.druck === "Niederdruck" : null) },
      ],
    },
    {
      key: "brause",
      label: "Herausziehen",
      hinweis: "Eine Brause schaltet zwischen normalem Strahl und Brausestrahl um, ein ausziehbarer Auslauf reicht nur weiter.",
      optionen: [
        { label: "Brause mit zwei Strahlarten", passt: (d) => enthaelt(d.brause, /herausziehbare Brause/i) },
        { label: "ausziehbar, ein Strahl reicht", passt: (d) => (d.brause ? d.brause.toLowerCase() !== "nein" : null) },
        { label: "nicht ausziehbar", passt: (d) => (d.brause ? d.brause.toLowerCase() === "nein" : null) },
      ],
    },
    {
      key: "vorfenster",
      label: "Spüle vor dem Fenster",
      hinweis: "Geht der Fensterflügel über der Spüle nach innen auf, muss sich die Armatur umlegen lassen.",
      optionen: [
        { label: "nein", passt: (d) => (d.vorfenster ? !/umlegbar/i.test(d.vorfenster) : null) },
        {
          label: "ja, umlegbar",
          passt: (d) => enthaelt(d.vorfenster, /umlegbar/i),
          sonst: {
            text: "Vorfensterarmaturen mit Brause oder für Niederdruck sind hier nicht dabei. Weitere Vorfenster-Modelle: GROHE Eurosmart 30617000 und hansgrohe Zesis M33 160 Vorfenster 74805000, beide ohne Auszug.",
          },
        },
      ],
    },
    {
      key: "farbe",
      label: "Farbe",
      hinweis: "Farben haben eine eigene Artikelnummer, sie steht beim Modell. Prüf im Shop, dass Farbe und Nummer zusammenpassen.",
      optionen: [
        { label: "Chrom", passt: (d) => hatOberflaeche(d, /chrom/i) },
        { label: "Schwarz", passt: (d) => hatOberflaeche(d, /schwarz|black/i) },
        { label: "Edelstahl-Optik", passt: (d) => hatOberflaeche(d, /edelstahl|steel/i) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.druck ?? null,
    d.brause ? (d.brause.toLowerCase() === "nein" ? "nicht ausziehbar" : d.brause.split(",").slice(0, 2).join(",")) : null,
    mm(d.auslaufhoehe_mm, "Auslaufhöhe"),
    d.schwenkbereich ? `schwenkt ${d.schwenkbereich}` : null,
    d.vorfenster && /umlegbar/i.test(d.vorfenster) ? "Vorfenster, umlegbar" : null,
  ],
};

const ohneArmatur = (d: RatgeberDaten) => d.bauart === "ohne Armatur";
const NUR_VORHANDENE_ARMATUR = {
  text: "Ohne eigene Armatur regelt die vorhandene Armatur die Temperatur. Einen neuen Thermostat für die Wandanschlüsse findest du im Ratgeber Duschthermostat.",
  href: "/ratgeber/duschthermostat",
  linktext: "Duschthermostate ansehen",
};

const DUSCHSYSTEM: ProduktRatgeber = {
  pfad: "duschsystem",
  slug: "duschsystem",
  silo: "bad",
  name: "Duschsystem",
  mehrzahl: "Duschsysteme",
  mehrzahlDativ: "Duschsystemen",
  keine: "Keines",
  frage: "Welches Duschsystem passt?",
  fragen: [
    {
      key: "armatur",
      label: "Armatur",
      hinweis: "Mit Armatur ersetzt das System die alte Aufputz-Armatur an den Wandanschlüssen. Ohne Armatur hängt es am Brauseabgang der vorhandenen Armatur.",
      optionen: [
        { label: "neue Armatur mit dabei", passt: (d) => (d.bauart ? !ohneArmatur(d) : null) },
        { label: "vorhandene Armatur behalten", passt: (d) => (d.bauart ? ohneArmatur(d) : null) },
      ],
    },
    {
      key: "regelung",
      label: "Regelung",
      hinweis: "Ein Thermostat hält die Temperatur und sperrt bei 38 oder 40 °C.",
      optionen: [
        { label: "Thermostat", passt: (d) => (d.bauart ? d.bauart === "Thermostat" : null), sonst: NUR_VORHANDENE_ARMATUR },
        { label: "Einhebel", passt: (d) => (d.bauart ? d.bauart === "Einhebel" : null), sonst: NUR_VORHANDENE_ARMATUR },
      ],
    },
    {
      key: "warmwasser",
      label: "Warmwasser",
      hinweis: "Ein Durchlauferhitzer mit 18 kW schafft bei 38 °C etwa 9 l/min. Der Durchfluss der Kopfbrause steht beim Modell.",
      optionen: [
        { label: "zentral oder Speicher", passt: (d) => (d.druck ? d.druck === "Hochdruck" : null) },
        { label: "Durchlauferhitzer", passt: (d) => (d.durchlauferhitzer ? true : null) },
      ],
    },
    {
      key: "farbe",
      label: "Farbe",
      hinweis: "Farben haben eine eigene Artikelnummer, sie steht beim Modell. Prüf im Shop, dass Farbe und Nummer zusammenpassen.",
      optionen: [
        { label: "Chrom", passt: (d) => hatOberflaeche(d, /chrom/i) },
        { label: "Schwarz", passt: (d) => hatOberflaeche(d, /schwarz|black/i) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.bauart ? (ohneArmatur(d) ? "ohne eigene Armatur" : d.bauart) : null,
    d.kopfbrause ? `Kopfbrause ${d.kopfbrause.split(",")[1]?.trim() ?? d.kopfbrause}` : null,
    typeof d.durchfluss_l_min === "number" ? `${d.durchfluss_l_min.toLocaleString("de-DE")} l/min` : null,
    typeof d.sicherheitssperre_c === "number" ? `Sperre bei ${d.sicherheitssperre_c} °C` : null,
    d.durchlauferhitzer ? `Durchlauferhitzer: ${d.durchlauferhitzer}` : null,
  ],
};

const DRUCKMINDERER: ProduktRatgeber = {
  pfad: "druckminderer",
  slug: "druckminderer",
  silo: "bad",
  name: "Druckminderer",
  mehrzahl: "Druckminderer",
  mehrzahlDativ: "Druckminderern",
  keine: "Keiner",
  frage: "Welcher Druckminderer passt?",
  fragen: [
    {
      key: "filter",
      label: "Filter",
      hinweis: "Hinter den Wasserzähler gehört ein Filter. Sitzt dort schon einer, reicht der Druckminderer allein.",
      optionen: [
        { label: "Filter ist schon da", passt: (d) => (d.bauart ? d.bauart === "Druckminderer" : null) },
        { label: "mit Filter", passt: (d) => (d.bauart ? d.bauart !== "Druckminderer" : null) },
      ],
    },
    {
      key: "anschluss",
      label: "Anschluss",
      hinweis: "Nach der vorhandenen Leitung wählen, nicht größer. 3/4 Zoll ist DN 20, 1 Zoll ist DN 25.",
      optionen: [
        {
          label: "3/4 Zoll",
          passt: (d) => (d.anschluss_zoll ? d.anschluss_zoll === '3/4"' : null),
          sonst: { text: "Fast alle Geräte gibt es in mehreren Größen. Die Nummern für 3/4 und 1 Zoll stehen beim Modell." },
        },
        {
          label: "1 Zoll",
          passt: (d) => (d.anschluss_zoll ? d.anschluss_zoll === '1"' : null),
          sonst: { text: "Fast alle Geräte gibt es in mehreren Größen. Die Nummern für 3/4 und 1 Zoll stehen beim Modell." },
        },
      ],
    },
    {
      key: "rueckspuelung",
      label: "Rückspülung",
      hinweis: "Von Hand heißt: alle zwei bis sechs Monate einen Griff drehen. Automatisch braucht Strom und einen Abwasseranschluss.",
      optionen: [
        { label: "von Hand", passt: (d) => (d.rueckspuelung ? d.rueckspuelung === "manuell" : null) },
        {
          label: "automatisch",
          passt: (d) => (d.rueckspuelung ? d.rueckspuelung === "automatisch" : null),
          sonst: {
            text: "Den Grünbeck pureliQ:AD gibt es auch in 3/4 Zoll (101470). An die SYR Hauswasserstation lässt sich eine Rückspülautomatik nachrüsten.",
          },
        },
        { label: "keine, Sieb tauschen reicht", passt: (d) => (d.rueckspuelung ? d.rueckspuelung === "nein" : null) },
      ],
    },
  ],
  eckdaten: (d) => [
    d.bauart ?? null,
    d.anschluss_zoll ? `Anschluss ${d.anschluss_zoll}` : null,
    d.bauart && d.bauart !== "Druckminderer" && d.rueckspuelung
      ? d.rueckspuelung === "nein"
        ? "ohne Rückspülung"
        : `Rückspülung ${d.rueckspuelung === "manuell" ? "von Hand" : d.rueckspuelung}`
      : null,
    // „1,5–6 bar, ab Werk 4 bar“ → „1,5–6 bar einstellbar“
    d.ausgangsdruck ? `${d.ausgangsdruck.split(", ab")[0].replace(/\s*\(.*\)/, "")} einstellbar` : null,
    d.rueckflussverhinderer === "ja" ? "mit Rückflussverhinderer" : null,
  ],
};

/** Gibt es das Gerät in dieser Größe? Fehlt die Liste, zählt die Größe des gezeigten Artikels. */
const gibtEsIn = (d: RatgeberDaten, zoll: string): boolean | null =>
  Array.isArray(d.groessen_zoll) && d.groessen_zoll.length > 0
    ? d.groessen_zoll.includes(zoll)
    : d.anschluss_zoll
      ? d.anschluss_zoll === zoll
      : null;

// Einstieg für den Hauswasserfilter. Kombigeräte mit Druckminderer stehen auch hier; Druckminderer ohne Filter
// nur in /ratgeber/druckminderer.
const RUECKSPUELFILTER: ProduktRatgeber = {
  pfad: "rueckspuelfilter",
  slug: "rueckspuelfilter",
  silo: "bad",
  name: "Rückspülfilter",
  mehrzahl: "Filter",
  mehrzahlDativ: "Filtern",
  keine: "Keiner",
  frage: "Welcher Rückspülfilter passt?",
  fragen: [
    {
      key: "druckminderer",
      label: "Druckminderer",
      hinweis: "Kann der Ruhedruck über 5 bar steigen oder sitzt hinter dem Zähler noch kein Druckminderer, nimm ein Gerät mit eingebautem.",
      optionen: [
        {
          label: "mit Druckminderer",
          passt: (d) => (d.druckminderer ? d.druckminderer === "ja" : null),
        },
        {
          label: "ohne",
          passt: (d) => (d.druckminderer ? d.druckminderer !== "ja" : null),
          sonst: {
            text: "Brauchst du nur einen Druckminderer hinter einem vorhandenen Filter, steht das im Druckminderer-Ratgeber.",
            href: "/ratgeber/druckminderer",
            linktext: "Druckminderer ansehen",
          },
        },
      ],
    },
    {
      key: "anschluss",
      label: "Anschluss",
      hinweis: "3/4 Zoll ist DN 20, 1 Zoll DN 25, 1 1/4 Zoll DN 32; gezeigt ist meist die 1-Zoll-Ausführung, die Nummern der anderen Größen stehen beim Modell.",
      optionen: [
        { label: "3/4 Zoll", passt: (d) => gibtEsIn(d, '3/4"') },
        { label: "1 Zoll", passt: (d) => gibtEsIn(d, '1"') },
        { label: "1 1/4 Zoll", passt: (d) => gibtEsIn(d, '1 1/4"') },
      ],
    },
    {
      key: "rueckspuelung",
      label: "Rückspülung",
      hinweis: "Von Hand heißt: alle zwei Monate ein Handrad oder einen Kugelhahn drehen. Die Automatik braucht Steckdose und Abwasseranschluss.",
      optionen: [
        { label: "von Hand", passt: (d) => (d.rueckspuelung ? d.rueckspuelung === "manuell" : null) },
        {
          label: "automatisch ab Werk",
          passt: (d) => (d.rueckspuelung ? d.rueckspuelung === "automatisch" : null),
        },
        {
          label: "von Hand, Automatik später nachrüsten",
          passt: (d) =>
            d.rueckspuelung === "automatisch" ? false : d.rueckspuelautomatik ? /nachrüstbar/i.test(d.rueckspuelautomatik) : null,
        },
      ],
    },
    {
      key: "flansch",
      label: "Was sitzt schon in der Leitung?",
      hinweis: "Bleibt ein vorhandener Anschlussflansch drin, setzt der Installateur nur das neue Gerät derselben Marke darauf.",
      optionen: [
        {
          label: "JUDO-Drehflansch mit Bajonett",
          passt: (d) => enthaelt(d.anschlusssystem, /judo/i),
        },
        {
          label: "SYR-Flansch (Drufi, Hauswasserstation 2000)",
          passt: (d) => enthaelt(d.anschlusssystem, /syr/i),
        },
        {
          label: "BWT-Anschlussmodul (Infinity)",
          passt: (d) => enthaelt(d.anschlusssystem, /bwt/i),
        },
      ],
    },
  ],
  eckdaten: (d) => [
    d.bauart ?? null,
    d.anschluss_zoll ? `Anschluss ${d.anschluss_zoll}` : d.groessen_zoll ? `${d.groessen_zoll.join(", ")} je nach Flansch` : null,
    d.rueckspuelung ? (d.rueckspuelung === "manuell" ? "Rückspülung von Hand" : "Rückspülung automatisch") : null,
    d.druckminderer === "nachrüstbar" ? "Druckminderer nachrüstbar" : null,
    d.filter ?? null,
  ],
};

const hatZweck = (d: RatgeberDaten, z: SonnenschutzZweck): boolean | null =>
  Array.isArray(d.zweck) && d.zweck.length > 0 ? d.zweck.includes(z) : null;
const passtAn = (d: RatgeberDaten, g: FensterGeneration): boolean | null =>
  Array.isArray(d.generationen) && d.generationen.length > 0 ? d.generationen.includes(g) || d.generationen.includes("glasmass") : null;

const DACHFENSTER_SONNENSCHUTZ: ProduktRatgeber = {
  pfad: "dachfenster-sonnenschutz",
  slug: "dachfenster-sonnenschutz",
  silo: "fenster",
  name: "Dachfenster-Sonnenschutz",
  mehrzahl: "Produkte",
  mehrzahlDativ: "Produkten",
  keine: "Keines",
  frage: "Welcher Sonnenschutz passt?",
  fragen: [
    {
      key: "zweck",
      label: "Wofür?",
      hinweis: "Gegen Hitze hilft am meisten, was die Sonne schon außen vor der Scheibe abfängt.",
      optionen: [
        { label: "Raum verdunkeln", passt: (d) => hatZweck(d, "verdunkeln") },
        { label: "Hitze abhalten", passt: (d) => hatZweck(d, "hitze") },
        { label: "Sichtschutz, Licht soll rein", passt: (d) => hatZweck(d, "sicht") },
        { label: "Insekten draußen halten", passt: (d) => hatZweck(d, "insekten") },
      ],
    },
    {
      key: "montage",
      label: "Innen oder außen",
      hinweis: "Die VELUX-Markise wird von innen bei offenem Fenster eingehängt, aufs Dach musst du dafür nicht.",
      optionen: [
        { label: "innen", passt: (d) => (d.montage ? d.montage === "innen" : null) },
        { label: "außen", passt: (d) => (d.montage ? d.montage === "außen" : null) },
      ],
    },
    {
      key: "bedienung",
      label: "Bedienung",
      hinweis: "Für Fenster, die du gut erreichst, empfiehlt VELUX die Bedienung von Hand. Solar braucht kein Kabel.",
      optionen: [
        { label: "von Hand", passt: (d) => (d.bedienung ? d.bedienung === "von Hand" : null) },
        {
          label: "Solar oder Motor",
          passt: (d) => (d.bedienung ? d.bedienung !== "von Hand" : null),
          sonst: {
            text: "Solar-Rollos und Solar-Rollläden von VELUX führt derzeit keiner unserer Partnershops. Hast du schon einen und er reagiert nicht, liegt es oft am Akku.",
            href: "/ersatzteile/dachfenster-akku",
            linktext: "Akku für Solar-Rollladen",
          },
        },
      ],
    },
    {
      key: "herkunft",
      label: "Original oder Nachbau",
      hinweis: "Nachbauten kosten oft weniger als die Hälfte, sitzen aber auf eigenen Schienen, Saugnäpfen oder Klebeleisten statt im Zubehörträger.",
      optionen: [
        { label: "Original vom Fensterhersteller", passt: (d) => (d.herkunft ? d.herkunft === "Original" : null) },
        { label: "Nachbau ist in Ordnung", passt: (d) => (d.herkunft ? d.herkunft === "Nachbau" : null) },
      ],
    },
    {
      key: "fenster",
      label: "Dein Fenster",
      hinweis: "Der Code steht auf dem Typenschild, bei VELUX im geöffneten Fenster rechts oder links hinter der Griffleiste.",
      optionen: [
        { label: "VELUX, Code wie MK04 (ab 2013)", passt: (d) => passtAn(d, "velux-ab-2013") },
        { label: "VELUX, Code wie M04 (2000 bis 2013)", passt: (d) => passtAn(d, "velux-2000-2013") },
        {
          label: "VELUX, Code wie 304 (1991 bis 2000)",
          passt: (d) => passtAn(d, "velux-1991-2000"),
          sonst: {
            text: "Innenrollos für Fenster, die vor 2002 gekauft wurden, bestellst du laut VELUX über den Kundendienst. Die Hitzeschutz-Markise passt dagegen auch hier: Für 304 bis 310 nimmst du MK00.",
          },
        },
        { label: "Roto", passt: (d) => passtAn(d, "roto") },
      ],
    },
  ],
  eckdaten: (d) => [
    d.art ?? null,
    d.typ ?? null,
    d.montage ? `${d.montage} montiert` : null,
    d.herkunft === "Nachbau" ? "Nachbau" : null,
    d.passend_fuer ?? null,
  ],
};

const hatStrom = (d: RatgeberDaten, ...quellen: string[]): boolean | null =>
  Array.isArray(d.stromquellen) && d.stromquellen.length > 0 ? d.stromquellen.some((s) => quellen.includes(s)) : null;
const istSystem = (d: RatgeberDaten, s: "mini" | "maxi"): boolean | null =>
  Array.isArray(d.systeme) && d.systeme.length > 0 ? d.systeme.includes(s) : null;

// Gurtwickler, Akku-Wickler, Solar- und 230-V-Rohrmotoren zum Nachrüsten (Bereich Rollladen).
const ROLLLADEN_ELEKTRISCH_NACHRUESTEN: ProduktRatgeber = {
  pfad: "rollladen-elektrisch-nachruesten",
  slug: "rollladen-elektrisch-nachruesten",
  silo: "fenster",
  name: "Rollladenantrieb",
  mehrzahl: "Antriebe",
  mehrzahlDativ: "Antrieben",
  keine: "Keiner",
  frage: "Welcher Antrieb passt zu deinem Rollladen?",
  fragen: [
    {
      key: "heute",
      label: "Was ist heute dran?",
      hinweis: "Kommt ein Gurtband aus der Wand, kann ein elektrischer Gurtwickler den alten ersetzen. Eine Kurbel lässt sich nur durch einen Motor in der Welle ersetzen.",
      optionen: [
        { label: "Gurtband", passt: (d) => (d.bauform ? true : null) },
        {
          label: "Kurbel",
          passt: (d) => (d.bauform ? d.bauform === "rohrmotor" : null),
          sonst: {
            text: "Bei einer Kurbel kommen Kurbelgetriebe und Stange heraus, der Motor sitzt dann in der Welle.",
            href: "/ersatzteile/rollladenmotor",
            linktext: "Rollladenmotor nach Welle und Drehmoment",
          },
        },
      ],
    },
    {
      key: "strom",
      label: "Strom am Fenster",
      hinweis: "Schellenberg und Rademacher verlangen für Gurtwickler mit Stecker eine frei zugängliche Steckdose am Einbauort.",
      optionen: [
        { label: "Steckdose in der Nähe", passt: (d) => hatStrom(d, "steckdose") },
        { label: "kein Strom, kein Kabel", passt: (d) => hatStrom(d, "akku", "solar") },
        { label: "Elektriker legt eine Leitung", passt: (d) => hatStrom(d, "festanschluss") },
      ],
    },
    {
      key: "system",
      label: "Mini oder Maxi",
      hinweis: "Miss den Gurt: 14 bis 15 mm breit ist Mini (Welle SW 40), 23 mm ist Maxi (Welle SW 60).",
      optionen: [
        {
          label: "Mini, Gurt 14 oder 15 mm",
          passt: (d) => istSystem(d, "mini"),
          sonst: {
            text: "Den WIR eWickler eW420 gibt es als eW420-M auch für Minigurt, den Rademacher RolloTron Standard als 1340 für 15-mm-Gurt.",
          },
        },
        { label: "Maxi, Gurt 23 mm", passt: (d) => istSystem(d, "maxi") },
      ],
    },
    {
      key: "funk",
      label: "Funk",
      hinweis: "Funksysteme verschiedener Hersteller verstehen sich nicht. Auch Somfy io und Somfy RTS sind getrennte Systeme.",
      optionen: [
        { label: "brauche ich nicht", passt: (d) => (d.funksystem ? true : null) },
        { label: "Somfy io", passt: (d) => enthaelt(d.funksystem, /\bio\b/i) },
        { label: "Rademacher DuoFern", passt: (d) => enthaelt(d.funksystem, /duofern/i) },
        {
          label: "Somfy RTS",
          passt: (d) => enthaelt(d.funksystem, /\bRTS\b/),
          sonst: {
            text: "RTS-Sender steuern keine io-Motoren. Welcher Sender zu welchem Motor passt, steht bei den Handsendern.",
            href: "/ersatzteile/rollladen-handsender",
            linktext: "Rollladen-Handsender nach Funksystem",
          },
        },
      ],
    },
  ],
  eckdaten: (d) => [
    d.antriebsart ?? null,
    d.stromversorgung ?? null,
    d.gurtbreite ? `Gurt ${d.gurtbreite}` : d.welle ?? null,
    d.lochabstand ? `Lochabstand ${d.lochabstand}` : null,
    d.zugkraft ?? (typeof d.drehmoment_nm === "number" ? `${d.drehmoment_nm} Nm` : null),
    d.funksystem && d.funksystem !== "ohne" ? `Funk: ${d.funksystem}` : null,
  ],
};

export const PRODUKT_RATGEBER: ProduktRatgeber[] = [
  WASCHTISCHARMATUR,
  NIEDERDRUCKARMATUR,
  WASCHTISCHARMATUR_MIT_BRAUSE,
  BADEWANNENARMATUR,
  BADEWANNENARMATUR_UNTERPUTZ,
  DUSCHTHERMOSTAT,
  UNTERPUTZ_DUSCHARMATUR,
  VORWANDELEMENT,
  DRUECKERPLATTE,
  KLEINHEBEANLAGE,
  KUECHENARMATUR,
  DUSCHSYSTEM,
  DRUCKMINDERER,
  RUECKSPUELFILTER,
  DACHFENSTER_SONNENSCHUTZ,
  ROLLLADEN_ELEKTRISCH_NACHRUESTEN,
];

/** Sprungmarke eines Modells in der Auswahlhilfe, Ziel der Produktkacheln. */
export function modellAnker(id: string): string {
  return `modell-${id}`;
}

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

/** Ziel einer Weiterleitung aus der Datenbank: zeigt es auf /<silo>/<slug> eines Produkt-Ratgebers, gleich auf /ratgeber/<pfad>, ohne zweite Weiterleitung. */
export function weiterleitungsZiel(url: string): string {
  const teile = url.match(/^\/([^/?#]+)\/([^/?#]+)\/?$/);
  return teile ? artikelUrl(teile[1], teile[2]) : url;
}

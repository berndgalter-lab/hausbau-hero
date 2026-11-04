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
  /** Mehrzahl für die Ergebnisliste: „Alle 6 Armaturen:“. */
  mehrzahl: string;
  /** Überschrift der Auswahlhilfe, wenn „Welche <name> passt?“ nicht stimmt (der Duschthermostat). */
  frage?: string;
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
      hinweis: "Mattschwarz und Mattweiß sind bei GROHE und hansgrohe lackiert oder pulverbeschichtet und laut GROHE weniger strapazierfähig als Chrom, PVD-Töne wie Gold oder Bronze bewertet GROHE so gut wie Chrom.",
      optionen: [
        { label: "Chrom", passt: (d) => hatOberflaeche(d, /chrom/i) },
        { label: "Schwarz", passt: (d) => hatOberflaeche(d, /schwarz|black/i) },
        { label: "Weiß", passt: (d) => hatOberflaeche(d, /weiß|white/i) },
        { label: "Gold oder Bronze", passt: (d) => hatOberflaeche(d, /gold|bronze/i) },
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
            text: "Bei Unterputz tauschst du nur das Fertigset, und das muss zum Grundkörper in der Wand passen. Dafür gibt es einen eigenen Ratgeber.",
            href: "/ratgeber/badewannenarmatur-unterputz",
            linktext: "Unterputz-Wannenarmatur",
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

const istSmartBox = (d: ArmaturDaten) => enthaelt(d.grundkoerper, /smartbox/i);

const BADEWANNENARMATUR_UNTERPUTZ: ProduktRatgeber = {
  pfad: "badewannenarmatur-unterputz",
  slug: "badewannenarmatur-unterputz",
  silo: "bad",
  name: "Unterputz-Wannenarmatur",
  mehrzahl: "Fertigsets",
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

const istUnterputz = (d: ArmaturDaten) => d.montage === "Unterputz";

const DUSCHTHERMOSTAT: ProduktRatgeber = {
  pfad: "duschthermostat",
  slug: "duschthermostat",
  silo: "bad",
  name: "Duschthermostat",
  mehrzahl: "Thermostate",
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

const ohneArmatur = (d: ArmaturDaten) => d.bauart === "ohne Armatur";
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

export const PRODUKT_RATGEBER: ProduktRatgeber[] = [WASCHTISCHARMATUR, NIEDERDRUCKARMATUR, WASCHTISCHARMATUR_MIT_BRAUSE, BADEWANNENARMATUR, BADEWANNENARMATUR_UNTERPUTZ, DUSCHTHERMOSTAT, KUECHENARMATUR, DUSCHSYSTEM, DRUCKMINDERER];

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

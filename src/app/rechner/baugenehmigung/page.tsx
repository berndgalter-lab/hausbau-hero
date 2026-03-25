"use client";

import { useState } from "react";
import FAQSection from "@/components/FAQSection";
import { getFaqBySlug } from "@/lib/faq-data";

/* ------------------------------------------------------------------ */
/*  Types & Data                                                       */
/* ------------------------------------------------------------------ */

type Ergebnis = "genehmigungsfrei" | "genehmigungspflichtig" | "kommt_drauf_an";

interface BundeslandRegel {
  ergebnis: Ergebnis;
  bedingung: string;
}

interface Regel {
  default_ergebnis: Ergebnis;
  default_schwelle: string;
  bundesland: Record<string, BundeslandRegel>;
  allgemeine_hinweise: string[];
}

const VORHABEN = [
  { value: "gartenhaus", label: "Gartenhaus / Geräteschuppen" },
  { value: "carport", label: "Carport / Garage" },
  { value: "terrasse", label: "Terrasse / Terrassenüberdachung" },
  { value: "zaun", label: "Zaun / Einfriedung" },
  { value: "wintergarten", label: "Wintergarten" },
  { value: "dachausbau", label: "Dachgeschoss ausbauen (Nutzungsänderung)" },
  { value: "dachgaube", label: "Dachgaube einbauen" },
  { value: "anbau", label: "Anbau / Hauserweiterung" },
  { value: "pool", label: "Swimming-Pool / Schwimmteich" },
  { value: "solaranlage", label: "Solaranlage / Photovoltaik" },
  { value: "waermepumpe", label: "Wärmepumpe (Außengerät)" },
  { value: "schornstein", label: "Schornstein nachrüsten" },
  { value: "fassade", label: "Fassadenänderung / Fassadendämmung" },
  { value: "abriss", label: "Abriss / Abbruch eines Gebäudes" },
  { value: "stellplatz", label: "Stellplatz / Zufahrt pflastern" },
];

const BUNDESLAENDER = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
  "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
  "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
  "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];

const REGELN: Record<string, Regel> = {
  gartenhaus: {
    default_ergebnis: "kommt_drauf_an",
    default_schwelle: "In den meisten Bundesländern bis zu einer bestimmten Grundfläche genehmigungsfrei.",
    bundesland: {
      "Baden-Württemberg": { ergebnis: "genehmigungsfrei", bedingung: "Bis 40 m³ Brutto-Rauminhalt im Innenbereich genehmigungsfrei (§ 50 Abs. 1 LBO BW). Im Außenbereich immer genehmigungspflichtig." },
      "Bayern": { ergebnis: "genehmigungsfrei", bedingung: "Bis 75 m³ Brutto-Rauminhalt genehmigungsfrei (Art. 57 Abs. 1 Nr. 1a BayBO). Gilt nur im Innenbereich." },
      "Berlin": { ergebnis: "genehmigungsfrei", bedingung: "Bis 10 m² Grundfläche genehmigungsfrei (§ 62 BauO Bln)." },
      "Brandenburg": { ergebnis: "genehmigungsfrei", bedingung: "Bis 75 m³ Brutto-Rauminhalt genehmigungsfrei (§ 55 BbgBO)." },
      "Bremen": { ergebnis: "genehmigungsfrei", bedingung: "Bis 6 m Firsthöhe und 30 m² Grundfläche genehmigungsfrei (§ 61 BremLBO)." },
      "Hamburg": { ergebnis: "genehmigungsfrei", bedingung: "Bis 30 m² Grundfläche genehmigungsfrei (§ 60 HBauO)." },
      "Hessen": { ergebnis: "genehmigungsfrei", bedingung: "Bis 30 m² Grundfläche genehmigungsfrei (§ 63 HBO)." },
      "Mecklenburg-Vorpommern": { ergebnis: "genehmigungsfrei", bedingung: "Bis 10 m² Grundfläche genehmigungsfrei, darüber bis 30 m² vereinfachtes Verfahren." },
      "Niedersachsen": { ergebnis: "genehmigungsfrei", bedingung: "Bis 40 m³ Brutto-Rauminhalt genehmigungsfrei (§ 60 NBauO). Im Außenbereich bis 20 m³." },
      "Nordrhein-Westfalen": { ergebnis: "genehmigungsfrei", bedingung: "Bis 75 m³ Brutto-Rauminhalt und max. 30 m² Grundfläche genehmigungsfrei (§ 62 BauO NRW)." },
      "Rheinland-Pfalz": { ergebnis: "genehmigungsfrei", bedingung: "Bis 50 m³ Brutto-Rauminhalt genehmigungsfrei (§ 62 LBauO RP)." },
      "Saarland": { ergebnis: "genehmigungsfrei", bedingung: "Bis 10 m² Grundfläche genehmigungsfrei (§ 61 LBO SL)." },
      "Sachsen": { ergebnis: "genehmigungsfrei", bedingung: "Bis 10 m² Grundfläche genehmigungsfrei (§ 61 SächsBO)." },
      "Sachsen-Anhalt": { ergebnis: "genehmigungsfrei", bedingung: "Bis 10 m² Grundfläche genehmigungsfrei (§ 60 BauO LSA)." },
      "Schleswig-Holstein": { ergebnis: "genehmigungsfrei", bedingung: "Bis 30 m² Grundfläche und max. 3 m Höhe genehmigungsfrei (§ 63 LBO SH)." },
      "Thüringen": { ergebnis: "genehmigungsfrei", bedingung: "Bis 10 m² Grundfläche genehmigungsfrei (§ 60 ThürBO)." },
    },
    allgemeine_hinweise: [
      "Im Außenbereich (außerhalb geschlossener Ortschaft) gelten STRENGERE Regeln — dort ist fast immer eine Genehmigung nötig.",
      "Auch wenn genehmigungsfrei: Abstandsflächen zum Nachbarn (meist 3 m) und Bebauungsplan müssen trotzdem eingehalten werden.",
      "In Naturschutzgebieten, Überschwemmungsgebieten oder bei Denkmalschutz gelten Sonderregeln.",
    ],
  },
  carport: {
    default_ergebnis: "kommt_drauf_an",
    default_schwelle: "Kleine Carports sind in vielen Bundesländern genehmigungsfrei.",
    bundesland: {
      "Baden-Württemberg": { ergebnis: "genehmigungsfrei", bedingung: "Bis 40 m³ Brutto-Rauminhalt genehmigungsfrei. Übliche Carports (ca. 15 m²) fallen darunter." },
      "Bayern": { ergebnis: "genehmigungsfrei", bedingung: "Bis 75 m³ Brutto-Rauminhalt genehmigungsfrei. Auch Garagen bis zu dieser Größe." },
      "Nordrhein-Westfalen": { ergebnis: "genehmigungsfrei", bedingung: "Bis 30 m² Grundfläche und mittlere Wandhöhe bis 3 m genehmigungsfrei." },
      "Niedersachsen": { ergebnis: "genehmigungsfrei", bedingung: "Bis 30 m² Grundfläche genehmigungsfrei, Garagen bis 20 m²." },
      "Schleswig-Holstein": { ergebnis: "genehmigungsfrei", bedingung: "Bis 36 m² Grundfläche genehmigungsfrei." },
    },
    allgemeine_hinweise: [
      "Abstand zur Grundstücksgrenze prüfen — Carports in Grenznähe unterliegen besonderen Regeln.",
      "Bebauungsplan beachten: Manche Gemeinden schreiben Stellplätze vor oder verbieten Carports in bestimmten Bereichen.",
    ],
  },
  terrasse: {
    default_ergebnis: "kommt_drauf_an",
    default_schwelle: "Ebenerdige Terrassen sind meist genehmigungsfrei. Überdachungen und erhöhte Terrassen oft nicht.",
    bundesland: {},
    allgemeine_hinweise: [
      "Ebenerdige Terrassen ohne Überdachung sind in allen Bundesländern genehmigungsfrei.",
      "Terrassenüberdachungen bis ca. 30 m² sind in vielen Bundesländern genehmigungsfrei (ähnlich wie Carports).",
      "Erhöhte Terrassen (über 1 m über Gelände) können als bauliche Anlage genehmigungspflichtig sein.",
    ],
  },
  zaun: {
    default_ergebnis: "genehmigungsfrei",
    default_schwelle: "Normale Einfriedungen bis ca. 1,50–1,80 m sind in den meisten Bundesländern genehmigungsfrei.",
    bundesland: {},
    allgemeine_hinweise: [
      "Einfriedungen bis ca. 1,80 m Höhe sind in den meisten Bundesländern genehmigungsfrei.",
      "Örtliche Gestaltungssatzungen können Material, Farbe und Höhe vorschreiben.",
      "An Eckgrundstücken: Sichtdreieck für den Verkehr freihalten.",
      "Nachbarrechtliche Regelungen beachten — in vielen Bundesländern gibt es ein Nachbarrechtsgesetz das Einfriedungen regelt.",
    ],
  },
  wintergarten: {
    default_ergebnis: "genehmigungspflichtig",
    default_schwelle: "Wintergärten erweitern die Wohnfläche und sind in den meisten Bundesländern genehmigungspflichtig.",
    bundesland: {
      "Bayern": { ergebnis: "genehmigungsfrei", bedingung: "Unbeheizte Wintergärten bis 75 m³ können genehmigungsfrei sein. Beheizte Wintergärten sind genehmigungspflichtig." },
      "Nordrhein-Westfalen": { ergebnis: "genehmigungspflichtig", bedingung: "Wintergärten sind generell genehmigungspflichtig, da sie die Gebäudehülle verändern." },
    },
    allgemeine_hinweise: [
      "Beheizte Wintergärten sind fast überall genehmigungspflichtig (Wohnraumerweiterung).",
      "Unbeheizte (kalte) Wintergärten können in einigen Bundesländern genehmigungsfrei sein.",
      "GEG (Gebäudeenergiegesetz) beachten: Bei beheizten Wintergärten gelten energetische Anforderungen.",
      "Statiknachweis für die Verbindung zum bestehenden Gebäude erforderlich.",
    ],
  },
  dachausbau: {
    default_ergebnis: "genehmigungspflichtig",
    default_schwelle: "Nutzungsänderung von Speicher zu Wohnraum ist in fast allen Bundesländern genehmigungspflichtig.",
    bundesland: {},
    allgemeine_hinweise: [
      "Die Umwandlung von ungenutztem Dachboden zu Wohnraum gilt als Nutzungsänderung und ist genehmigungspflichtig.",
      "Statik muss vom Ingenieur nachgewiesen werden.",
      "Rettungswege (Dachfenster als 2. Fluchtweg) müssen nachgewiesen werden.",
      "Wohnflächenberechnung beeinflusst ggf. die Grundsteuer.",
      "Energetische Anforderungen (GEG) müssen bei Nutzungsänderung erfüllt werden.",
    ],
  },
  dachgaube: {
    default_ergebnis: "genehmigungspflichtig",
    default_schwelle: "Dachgauben verändern die Gebäudesilhouette und sind fast überall genehmigungspflichtig.",
    bundesland: {},
    allgemeine_hinweise: [
      "Dachgauben verändern die Kubatur des Gebäudes und sind in den meisten Bundesländern genehmigungspflichtig.",
      "Statiknachweis erforderlich.",
      "Bebauungsplan prüfen: Manche B-Pläne verbieten Gauben oder schreiben Form und Größe vor.",
      "Bei Denkmalschutz: Immer Genehmigung der Denkmalschutzbehörde erforderlich.",
    ],
  },
  anbau: {
    default_ergebnis: "genehmigungspflichtig",
    default_schwelle: "Anbauten und Hauserweiterungen sind fast immer genehmigungspflichtig.",
    bundesland: {},
    allgemeine_hinweise: [
      "Hauserweiterungen verändern die bebaubare Fläche und erfordern fast immer eine Baugenehmigung.",
      "GFZ (Geschossflächenzahl) und GRZ (Grundflächenzahl) aus dem Bebauungsplan prüfen.",
      "Abstandsflächen zum Nachbarn einhalten.",
      "Statik- und Energienachweis erforderlich.",
    ],
  },
  pool: {
    default_ergebnis: "kommt_drauf_an",
    default_schwelle: "Kleine Pools sind in vielen Bundesländern genehmigungsfrei. Große Pools oder solche mit Technikgebäude können genehmigungspflichtig sein.",
    bundesland: {
      "Bayern": { ergebnis: "genehmigungsfrei", bedingung: "Becken bis 100 m³ Fassungsvermögen genehmigungsfrei (Art. 57 BayBO)." },
      "Nordrhein-Westfalen": { ergebnis: "genehmigungsfrei", bedingung: "Becken bis 100 m³ Fassungsvermögen genehmigungsfrei (§ 62 BauO NRW)." },
      "Baden-Württemberg": { ergebnis: "genehmigungsfrei", bedingung: "Schwimmbecken bis 100 m³ im Innenbereich genehmigungsfrei (§ 50 LBO BW)." },
    },
    allgemeine_hinweise: [
      "Die meisten Bundesländer erlauben Pools bis 100 m³ genehmigungsfrei — das entspricht ca. 8 m × 4 m × 1,5 m.",
      "Im Außenbereich (außerhalb der Ortschaft) sind Pools fast immer genehmigungspflichtig.",
      "Technikgebäude daneben kann separat genehmigungspflichtig sein (siehe Gartenhaus-Regeln).",
    ],
  },
  solaranlage: {
    default_ergebnis: "genehmigungsfrei",
    default_schwelle: "Aufdach-Solaranlagen sind in allen Bundesländern genehmigungsfrei.",
    bundesland: {},
    allgemeine_hinweise: [
      "Aufdach-PV-Anlagen und Solarthermie auf bestehenden Gebäuden sind bundesweit genehmigungsfrei.",
      "Freiflächenanlagen (Solarpark auf dem Grundstück) sind genehmigungspflichtig.",
      "Bei Denkmalschutz: Genehmigung der Denkmalschutzbehörde kann erforderlich sein.",
      "Netzanschluss und Anmeldung beim Netzbetreiber sind separat nötig (keine Baugenehmigung, aber Pflicht).",
    ],
  },
  waermepumpe: {
    default_ergebnis: "genehmigungsfrei",
    default_schwelle: "Luft-Wärmepumpen (Außengerät) sind in den meisten Bundesländern genehmigungsfrei.",
    bundesland: {},
    allgemeine_hinweise: [
      "Luft-Wärmepumpen (Split-Außengeräte) sind in den meisten Bundesländern genehmigungsfrei.",
      "Erdwärmepumpen (Sonden/Kollektoren) benötigen eine wasserrechtliche Genehmigung (Untere Wasserbehörde).",
      "Abstandsregeln zum Nachbarn beachten — Außengeräte erzeugen Lärm (TA Lärm: 35 dB nachts an der Grundstücksgrenze).",
      "Bei Erdwärmesonden: Bohrtiefe und Grundwasser-Schutzzonen prüfen.",
    ],
  },
  fassade: {
    default_ergebnis: "kommt_drauf_an",
    default_schwelle: "Reine Farbänderung meist genehmigungsfrei. WDVS und Fassadenänderungen können genehmigungspflichtig sein.",
    bundesland: {},
    allgemeine_hinweise: [
      "Energetische Fassadendämmung (WDVS) ist in den meisten Bundesländern genehmigungsfrei, wenn sie die Gebäudehülle nicht wesentlich verändert.",
      "Bei Überschreitung der Baugrenzen durch dickere Dämmung: Befreiung beantragen.",
      "Farbänderungen können in Gebieten mit Gestaltungssatzung genehmigungspflichtig sein.",
      "Bei Denkmalschutz: Immer Genehmigung erforderlich.",
    ],
  },
  abriss: {
    default_ergebnis: "genehmigungspflichtig",
    default_schwelle: "Abriss von Gebäuden ist in den meisten Bundesländern anzeige- oder genehmigungspflichtig.",
    bundesland: {},
    allgemeine_hinweise: [
      "In vielen Bundesländern muss ein Abriss mindestens angezeigt werden (Abbruchanzeige).",
      "Bei Gebäuden unter Denkmalschutz ist ein Abriss nur mit Sondergenehmigung möglich.",
      "Asbestbelastung prüfen lassen (Pflicht bei Gebäuden vor 1993).",
      "Entsorgung von Bauschutt muss fachgerecht erfolgen.",
    ],
  },
  schornstein: {
    default_ergebnis: "kommt_drauf_an",
    default_schwelle: "Schornstein nachrüsten ist oft anzeigepflichtig und erfordert Abnahme durch den Bezirksschornsteinfeger.",
    bundesland: {},
    allgemeine_hinweise: [
      "Schornsteine, die über das Dach hinausragen, verändern die Gebäudesilhouette — in manchen Bundesländern genehmigungspflichtig.",
      "Edelstahlschornsteine (außen) sind häufig genehmigungsfrei, wenn Abstandsregeln eingehalten werden.",
      "Abnahme durch den zuständigen Bezirksschornsteinfeger ist IMMER Pflicht (§ 19 SchfHwG).",
      "1. BImSchV beachten: Emissionsgrenzwerte für Festbrennstoff-Feuerstätten.",
    ],
  },
  stellplatz: {
    default_ergebnis: "genehmigungsfrei",
    default_schwelle: "Das Pflastern einer Zufahrt oder eines Stellplatzes ist in den meisten Bundesländern genehmigungsfrei.",
    bundesland: {},
    allgemeine_hinweise: [
      "Einfache Stellplätze und Zufahrten sind in der Regel genehmigungsfrei.",
      "Bei Versiegelung großer Flächen: Örtliche Satzungen zur Versickerung beachten.",
      "Manche Gemeinden fordern versickerungsfähige Beläge (Rasengittersteine, Ökopflaster).",
      "Zufahrten über öffentliche Gehwege: Absenkung des Bordsteins bei der Gemeinde beantragen.",
    ],
  },
};

const AMPEL: Record<Ergebnis, { icon: string; color: string; bg: string; border: string; label: string }> = {
  genehmigungsfrei: {
    icon: "🟢",
    color: "text-green-800",
    bg: "bg-green-50",
    border: "border-green-300",
    label: "Voraussichtlich genehmigungsfrei",
  },
  kommt_drauf_an: {
    icon: "🟡",
    color: "text-amber-800",
    bg: "bg-amber-50",
    border: "border-amber-300",
    label: "Kommt auf die Details an",
  },
  genehmigungspflichtig: {
    icon: "🔴",
    color: "text-red-800",
    bg: "bg-red-50",
    border: "border-red-300",
    label: "Voraussichtlich genehmigungspflichtig",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BaugenehmigungCheck() {
  const [vorhabenKey, setVorhabenKey] = useState(VORHABEN[0].value);
  const [bundesland, setBundesland] = useState(BUNDESLAENDER[0]);

  const regel = REGELN[vorhabenKey];
  const blRegel = regel.bundesland[bundesland];
  const ergebnis = blRegel?.ergebnis ?? regel.default_ergebnis;
  const bedingung = blRegel?.bedingung ?? regel.default_schwelle;
  const ampel = AMPEL[ergebnis];

  const vorhabenLabel = VORHABEN.find((v) => v.value === vorhabenKey)?.label ?? "";

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
              { "@type": "ListItem", position: 2, name: "Rechner", item: "https://hausbau-hero.de/rechner" },
              { "@type": "ListItem", position: 3, name: "Baugenehmigung", item: "https://hausbau-hero.de/rechner/baugenehmigung" },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href="/rechner" className="hover:text-stone-700">Rechner</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">Baugenehmigung</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">Baugenehmigung-Check</h1>
      <p className="text-stone-600 mb-6 max-w-2xl">
        Brauche ich für mein Bauvorhaben eine Baugenehmigung? Wähle dein Vorhaben und Bundesland für eine erste Einschätzung.
      </p>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 mb-8">
        <p className="text-sm text-amber-900">
          <strong>⚠️ Hinweis:</strong> Dieses Tool gibt eine <strong>erste Orientierung</strong>, keine Rechtsberatung.
          Die Bauordnungen der Bundesländer sind komplex und ändern sich regelmäßig.
          Lokale Bebauungspläne, Gestaltungssatzungen und Denkmalschutz können abweichende Regeln enthalten.{" "}
          <strong>Frage im Zweifel immer bei deinem zuständigen Bauamt nach.</strong>
        </p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Was hast du vor?</label>
          <select
            value={vorhabenKey}
            onChange={(e) => setVorhabenKey(e.target.value)}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            {VORHABEN.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Bundesland</label>
          <select
            value={bundesland}
            onChange={(e) => setBundesland(e.target.value)}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            {BUNDESLAENDER.map((bl) => (
              <option key={bl} value={bl}>{bl}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ampel result */}
      <div className={`${ampel.bg} border-2 ${ampel.border} rounded-xl p-6 mb-6`}>
        <div className="flex items-start gap-4">
          <span className="text-4xl shrink-0">{ampel.icon}</span>
          <div>
            <div className={`text-xl font-bold ${ampel.color} mb-2`}>{ampel.label}</div>
            <p className="text-stone-700">
              <strong>{vorhabenLabel}</strong> in <strong>{bundesland}</strong>:
            </p>
            <p className="text-stone-700 mt-1">{bedingung}</p>
          </div>
        </div>
      </div>

      {/* Allgemeine Hinweise */}
      {regel.allgemeine_hinweise.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-xl p-6 mb-6">
          <h2 className="font-bold text-stone-900 mb-3">Wichtige Hinweise</h2>
          <ul className="space-y-2">
            {regel.allgemeine_hinweise.map((h, i) => (
              <li key={i} className="flex gap-2 text-sm text-stone-700">
                <span className="shrink-0 text-stone-400">•</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Nächste Schritte */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6 mb-8">
        <h2 className="font-bold text-stone-900 mb-3">Nächste Schritte</h2>
        {ergebnis === "genehmigungsfrei" && (
          <div className="space-y-2 text-sm text-stone-700">
            <p>Auch ohne Genehmigung musst du folgende Regeln einhalten:</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Abstandsflächen zum Nachbargrundstück einhalten (landesspezifisch, meist 3 m)</li>
              <li>Festsetzungen des Bebauungsplans beachten (z. B. GRZ, Baugrenzen)</li>
              <li>Örtliche Gestaltungssatzungen prüfen</li>
              <li>Im Zweifel: Kostenlose Bauvoranfrage beim Bauamt stellen</li>
            </ol>
          </div>
        )}
        {ergebnis === "genehmigungspflichtig" && (
          <ol className="list-decimal list-inside space-y-2 text-sm text-stone-700">
            <li>Bebauungsplan bei der Gemeinde einsehen (oft online verfügbar)</li>
            <li>Architekt oder Bauvorlageberechtigten beauftragen</li>
            <li>Bauantrag bei der unteren Bauaufsichtsbehörde stellen</li>
            <li>Bearbeitungsdauer: in der Regel 4–12 Wochen</li>
            <li>Kosten: abhängig von Bauvolumen, meist 0,5–1 % der Bausumme</li>
          </ol>
        )}
        {ergebnis === "kommt_drauf_an" && (
          <div className="space-y-2 text-sm text-stone-700">
            <p>Die Genehmigungspflicht hängt von konkreten Details ab (Größe, Lage, Bebauungsplan).</p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Kontaktiere dein Bauamt — die <strong>Bauvoranfrage</strong> ist in der Regel kostenlos</li>
              <li>Halte Maße, Grundstückslage und Bebauungsplan-Nummer bereit</li>
              <li>Frage explizit: „Ist mein Vorhaben verfahrensfrei nach der Landesbauordnung?"</li>
            </ol>
          </div>
        )}
      </div>

      <FAQSection faqs={getFaqBySlug("baugenehmigung")} rechnerName="Baugenehmigung-Check" />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="text-sm font-medium text-stone-800 mb-1">📖 Ratgeber zum Thema</p>
        <a href="/finanzen/baugenehmigung-ratgeber" className="text-amber-600 hover:text-amber-700 font-medium text-sm">
          Baugenehmigung — wann brauchst du eine? →
        </a>
      </div>

      {/* More calculators */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Weitere Rechner</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/rechner/foerdermittel" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Fördermittel-Finder</a>
          <a href="/rechner/eigenleistung" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Eigenleistungs-Rechner</a>
          <a href="/rechner/gewerk-reihenfolge" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Gewerk-Reihenfolge</a>
          <a href="/rechner/nebenkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Nebenkosten-Rechner</a>
        </div>
      </div>
    </div>
  );
}

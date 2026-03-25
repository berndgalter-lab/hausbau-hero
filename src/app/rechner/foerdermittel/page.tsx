"use client";

import { useState } from "react";
import FAQSection from "@/components/FAQSection";
import RechnerHinweis from "@/components/RechnerHinweis";
import { getFaqBySlug } from "@/lib/faq-data";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Programm {
  name: string;
  traeger: string;
  art: string;
  grundfoerderung?: number;
  einkommensbonus?: number;
  geschwindigkeitsbonus?: number;
  effizienzbonus?: number;
  isfp_bonus?: number;
  max_gesamt?: number;
  max_foerderfaehig?: number;
  max_foerderfaehig_isfp?: number;
  max_kredit?: number;
  max_kredit_standard?: number;
  max_kredit_ee_nh?: number;
  max_kredit_ohne_qs?: number;
  max_kredit_mit_qs?: number;
  max_tilgungszuschuss?: number;
  zins?: string;
  zins_eh55?: string;
  zins_eh40?: string;
  beschreibung?: string;
  hinweis: string;
  link: string | null;
  stufen?: { name: string; zuschuss: number }[];
  boni?: { name: string; bonus: number }[];
}

interface DetailLine {
  label: string;
  pct: number;
  amount: number;
}

interface Ergebnis extends Programm {
  details: DetailLine[];
  uncappedSatz: number;
  satz: number;
  foerderfaehig: number;
  betrag: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const VORHABEN = [
  { value: "heizung", label: "Heizung tauschen (Wärmepumpe, Pellets, Fernwärme)" },
  { value: "daemmung", label: "Dämmung (Fassade, Dach, Kellerdecke)" },
  { value: "fenster", label: "Fenster / Außentüren erneuern" },
  { value: "lueftung", label: "Lüftungsanlage einbauen" },
  { value: "solar", label: "Photovoltaik / Solarthermie" },
  { value: "komplett", label: "Komplettsanierung zum Effizienzhaus" },
  { value: "neubau", label: "Klimafreundlicher Neubau" },
  { value: "barrierefreiheit", label: "Barrierefreier Umbau" },
];

const SITUATIONEN = [
  { value: "eigentuemer", label: "Eigentümer (selbst bewohnt)" },
  { value: "vermieter", label: "Vermieter" },
  { value: "kaeufer", label: "Käufer (will kaufen und sanieren)" },
  { value: "weg", label: "Wohnungseigentümergemeinschaft (WEG)" },
];

const FOERDERUNGEN: Record<string, { titel: string; programme: Programm[] }> = {
  heizung: {
    titel: "Heizungstausch",
    programme: [
      {
        name: "BAFA BEG EM — Heizungsförderung",
        traeger: "BAFA / KfW",
        art: "Zuschuss",
        grundfoerderung: 30,
        einkommensbonus: 30,
        geschwindigkeitsbonus: 20,
        effizienzbonus: 5,
        max_gesamt: 70,
        max_foerderfaehig: 30000,
        hinweis:
          "Antrag VOR Auftragsvergabe über KfW-Portal stellen. Gilt für Wärmepumpe, Biomasse, Fernwärme, Solarthermie. Geschwindigkeitsbonus gilt bis 2028 bei Austausch einer funktionstüchtigen fossilen Heizung (Öl, Gas), die mind. 20 Jahre alt ist, oder einer Gasetagenheizung/Nachtspeicherheizung.",
        link: "https://www.kfw.de/inlandsfoerderung/Heizungsf%C3%B6rderung/",
      },
      {
        name: "KfW 358/359 — Ergänzungskredit",
        traeger: "KfW",
        art: "Kredit",
        beschreibung: "Zinsgünstiger Kredit für bereits bezuschusste Maßnahmen",
        max_kredit: 120000,
        zins: "ab 0,01 % eff. Jahreszins (einkommensabhängig)",
        hinweis:
          "Nur in Kombination mit BAFA-Zuschuss. Für Haushalte mit Einkommen unter 90.000 €/Jahr besonders günstige Konditionen.",
        link: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/",
      },
    ],
  },
  daemmung: {
    titel: "Dämmung (Fassade, Dach, Kellerdecke, oberste Geschossdecke)",
    programme: [
      {
        name: "BAFA BEG EM — Einzelmaßnahmen Gebäudehülle",
        traeger: "BAFA",
        art: "Zuschuss",
        grundfoerderung: 15,
        isfp_bonus: 5,
        max_gesamt: 20,
        max_foerderfaehig: 30000,
        max_foerderfaehig_isfp: 60000,
        hinweis:
          "Förderfähige Kosten verdoppeln sich mit iSFP von 30.000 € auf 60.000 € pro Wohneinheit. Antrag über BAFA-Portal VOR Auftragsvergabe. Technische Mindestanforderungen an U-Wert beachten.",
        link: "https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/BEG_EM/beg_em_node.html",
      },
      {
        name: "KfW 358/359 — Ergänzungskredit",
        traeger: "KfW",
        art: "Kredit",
        max_kredit: 120000,
        zins: "ab 0,01 % eff. Jahreszins",
        hinweis: "Nur in Kombination mit BAFA-Zuschuss.",
        link: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/",
      },
      {
        name: "Steuerbonus §35c EStG — Alternativ zum Zuschuss",
        traeger: "Finanzamt",
        art: "Steuerermäßigung",
        beschreibung: "20 % der Kosten über 3 Jahre steuerlich absetzbar (max. 40.000 €)",
        hinweis:
          "Entweder BAFA-Zuschuss ODER Steuerbonus — nicht beides. Steuerbonus lohnt sich bei hohem Steuersatz und wenn man keinen iSFP hat.",
        link: null,
      },
    ],
  },
  fenster: {
    titel: "Fenster / Außentüren erneuern",
    programme: [
      {
        name: "BAFA BEG EM — Einzelmaßnahmen Gebäudehülle",
        traeger: "BAFA",
        art: "Zuschuss",
        grundfoerderung: 15,
        isfp_bonus: 5,
        max_gesamt: 20,
        max_foerderfaehig: 30000,
        max_foerderfaehig_isfp: 60000,
        hinweis:
          "Mindestanforderung: U-Wert ≤ 0,95 W/(m²K) für Fenster. Einbau muss durch Fachunternehmen erfolgen.",
        link: "https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/BEG_EM/beg_em_node.html",
      },
      {
        name: "Steuerbonus §35c EStG",
        traeger: "Finanzamt",
        art: "Steuerermäßigung",
        beschreibung: "20 % der Kosten über 3 Jahre steuerlich absetzbar",
        hinweis: "Alternativ zum BAFA-Zuschuss.",
        link: null,
      },
    ],
  },
  lueftung: {
    titel: "Lüftungsanlage einbauen",
    programme: [
      {
        name: "BAFA BEG EM — Anlagentechnik (außer Heizung)",
        traeger: "BAFA",
        art: "Zuschuss",
        grundfoerderung: 15,
        isfp_bonus: 5,
        max_gesamt: 20,
        max_foerderfaehig: 30000,
        max_foerderfaehig_isfp: 60000,
        hinweis:
          "Gilt für Lüftungsanlagen mit Wärmerückgewinnung. Antrag VOR Auftragsvergabe.",
        link: "https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/BEG_EM/beg_em_node.html",
      },
    ],
  },
  solar: {
    titel: "Photovoltaik / Solarthermie",
    programme: [
      {
        name: "KfW 270 — Erneuerbare Energien Standard",
        traeger: "KfW",
        art: "Kredit",
        beschreibung:
          "Zinsgünstiger Kredit für PV-Anlagen, Batteriespeicher, Windkraft, Biogas",
        hinweis:
          "Kein Zuschuss, nur günstiger Kredit. Für Privatpersonen typisch 10.000–30.000 € für PV + Speicher. Einspeisevergütung nach EEG bleibt bestehen.",
        link: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Erneuerbare-Energien/",
      },
      {
        name: "Solarthermie: BAFA BEG EM — Heizungsförderung",
        traeger: "BAFA",
        art: "Zuschuss",
        grundfoerderung: 30,
        max_gesamt: 70,
        max_foerderfaehig: 30000,
        hinweis:
          "Solarthermie zur Heizungsunterstützung wird wie Heizungstausch gefördert (30 % Grundförderung + Boni).",
        link: "https://www.bafa.de/DE/Energie/Effiziente_Gebaeude/BEG_EM/beg_em_node.html",
      },
    ],
  },
  komplett: {
    titel: "Komplettsanierung zum Effizienzhaus",
    programme: [
      {
        name: "KfW 261 — Wohngebäude-Kredit",
        traeger: "KfW",
        art: "Kredit + Tilgungszuschuss",
        beschreibung:
          "Kredit bis 150.000 € mit Tilgungszuschuss je nach Effizienzhausstufe",
        stufen: [
          { name: "Effizienzhaus Denkmal", zuschuss: 5 },
          { name: "Effizienzhaus 85", zuschuss: 5 },
          { name: "Effizienzhaus 70", zuschuss: 10 },
          { name: "Effizienzhaus 55", zuschuss: 15 },
          { name: "Effizienzhaus 40", zuschuss: 20 },
          { name: "Effizienzhaus 40 (EE-Klasse)", zuschuss: 25 },
        ],
        boni: [
          { name: "EE-Klasse (65 % erneuerbare Wärme)", bonus: 5 },
          { name: "NH-Klasse (Nachhaltigkeitszertifikat)", bonus: 5 },
          { name: "WPB (Worst Performing Building)", bonus: 10 },
          { name: "Serielle Sanierung", bonus: 15 },
        ],
        max_kredit_standard: 120000,
        max_kredit_ee_nh: 150000,
        max_tilgungszuschuss: 45,
        hinweis:
          "Bauantrag muss mind. 5 Jahre zurückliegen. Energieberater (dena-Liste) ist Pflicht. Antrag VOR Baubeginn über Hausbank stellen.",
        link: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/F%C3%B6rderprodukte/Bundesf%C3%B6rderung-f%C3%BCr-effiziente-Geb%C3%A4ude-Wohngeb%C3%A4ude-Kredit-(261-262)/",
      },
    ],
  },
  neubau: {
    titel: "Klimafreundlicher Neubau",
    programme: [
      {
        name: "KfW 297/298 — Klimafreundlicher Neubau",
        traeger: "KfW",
        art: "Kredit",
        beschreibung: "Zinsgünstiger Kredit für Neubau (EH40 Standard)",
        max_kredit_ohne_qs: 100000,
        max_kredit_mit_qs: 150000,
        zins_eh55: "ab 1,00 % eff. Jahreszins",
        zins_eh40: "ab 0,60 % eff. Jahreszins",
        hinweis:
          "Kein Tilgungszuschuss — nur zinsgünstiger Kredit. Mit QNG-Nachhaltigkeitszertifikat steigt der Kreditrahmen auf 150.000 €. Gilt für Neubau EH40 und EH55. Seit März 2026 auch EH55 förderfähig.",
        link: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/",
      },
      {
        name: "KfW 300 — Wohneigentum für Familien",
        traeger: "KfW",
        art: "Kredit",
        beschreibung:
          "Zinsgünstiger Kredit für Familien mit Kindern (Haushaltseinkommen ≤ 90.000 €)",
        max_kredit: 270000,
        hinweis:
          "Nur für Familien mit mindestens einem Kind unter 18. Einkommensgrenze 90.000 € + 10.000 € pro weiteres Kind. Nur für Neubau oder Ersterwerb.",
        link: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Neubau/",
      },
    ],
  },
  barrierefreiheit: {
    titel: "Barrierefreier Umbau / Altersgerecht umbauen",
    programme: [
      {
        name: "KfW 455-B / 159 — Altersgerecht Umbauen",
        traeger: "KfW",
        art: "Kredit",
        beschreibung:
          "Zinsgünstiger Kredit bis 50.000 € für barrierereduzierende Maßnahmen",
        max_kredit: 50000,
        hinweis:
          "Zuschussvariante (455-B) ist seit 2025 NICHT mehr verfügbar. Nur noch Kreditvariante (159). Gilt für alle Altersgruppen, nicht nur Senioren.",
        link: "https://www.kfw.de/inlandsfoerderung/Privatpersonen/Bestehende-Immobilie/Barrierefreiheit/",
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number) {
  return n.toLocaleString("de-DE", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function artStyles(art: string) {
  switch (art) {
    case "Zuschuss":
      return { border: "border-l-green-500", badge: "bg-green-100 text-green-800" };
    case "Kredit":
    case "Kredit + Tilgungszuschuss":
      return { border: "border-l-blue-500", badge: "bg-blue-100 text-blue-800" };
    case "Steuerermäßigung":
      return { border: "border-l-amber-500", badge: "bg-amber-100 text-amber-800" };
    default:
      return { border: "border-l-stone-400", badge: "bg-stone-100 text-stone-800" };
  }
}

function berechne(
  programme: Programm[],
  investition: number,
  hatIsfp: boolean,
  einkommenUnter40k: boolean,
): Ergebnis[] {
  return programme.map((p) => {
    if (!p.grundfoerderung) {
      return { ...p, details: [], uncappedSatz: 0, satz: 0, foerderfaehig: 0, betrag: 0 };
    }

    const foerderfaehig =
      hatIsfp && p.max_foerderfaehig_isfp
        ? Math.min(investition, p.max_foerderfaehig_isfp)
        : p.max_foerderfaehig
          ? Math.min(investition, p.max_foerderfaehig)
          : investition;

    const details: DetailLine[] = [];
    let uncappedSatz = 0;

    uncappedSatz += p.grundfoerderung;
    details.push({
      label: "Grundförderung",
      pct: p.grundfoerderung,
      amount: (foerderfaehig * p.grundfoerderung) / 100,
    });

    if (hatIsfp && p.isfp_bonus) {
      uncappedSatz += p.isfp_bonus;
      details.push({
        label: "iSFP-Bonus",
        pct: p.isfp_bonus,
        amount: (foerderfaehig * p.isfp_bonus) / 100,
      });
    }

    if (einkommenUnter40k && p.einkommensbonus) {
      uncappedSatz += p.einkommensbonus;
      details.push({
        label: "Einkommensbonus",
        pct: p.einkommensbonus,
        amount: (foerderfaehig * p.einkommensbonus) / 100,
      });
    }

    if (p.geschwindigkeitsbonus) {
      uncappedSatz += p.geschwindigkeitsbonus;
      details.push({
        label: "Geschwindigkeitsbonus",
        pct: p.geschwindigkeitsbonus,
        amount: (foerderfaehig * p.geschwindigkeitsbonus) / 100,
      });
    }

    const satz = p.max_gesamt ? Math.min(uncappedSatz, p.max_gesamt) : uncappedSatz;
    const betrag = (foerderfaehig * satz) / 100;

    return { ...p, details, uncappedSatz, satz, foerderfaehig, betrag };
  });
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FoerdermittelFinder() {
  const [vorhaben, setVorhaben] = useState("heizung");
  const [, setSituation] = useState("eigentuemer");
  const [einkommenUnter40k, setEinkommenUnter40k] = useState(false);
  const [hatIsfp, setHatIsfp] = useState(false);
  const [investition, setInvestition] = useState(30000);

  const foerderung = FOERDERUNGEN[vorhaben];
  const ergebnisse = berechne(foerderung.programme, investition, hatIsfp, einkommenUnter40k);

  const gesamtZuschuss = ergebnisse.reduce(
    (sum, e) => (e.art === "Zuschuss" ? sum + e.betrag : sum),
    0,
  );

  return (
    <div className="max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Fördermittel-Finder",
            description:
              "Finde sofort alle KfW- und BAFA-Förderungen für dein Bauvorhaben.",
            url: "https://hausbau-hero.de/rechner/foerdermittel",
            applicationCategory: "FinanceApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
              { "@type": "ListItem", position: 2, name: "Rechner", item: "https://hausbau-hero.de/rechner" },
              { "@type": "ListItem", position: 3, name: "Fördermittel", item: "https://hausbau-hero.de/rechner/foerdermittel" },
            ],
          }),
        }}
      />

      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href="/rechner" className="hover:text-stone-700">Rechner</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">Fördermittel</span>
      </nav>

      <h1 className="text-3xl font-bold text-stone-900 mb-2">Fördermittel-Finder</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Finde sofort alle KfW- und BAFA-Förderungen für dein Vorhaben — kostenlos und ohne Anmeldung.
      </p>

      {/* ---- Inputs ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Was hast du vor?</label>
          <select
            value={vorhaben}
            onChange={(e) => setVorhaben(e.target.value)}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            {VORHABEN.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Deine Situation</label>
          <select
            defaultValue="eigentuemer"
            onChange={(e) => setSituation(e.target.value)}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          >
            {SITUATIONEN.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <button
          type="button"
          onClick={() => setEinkommenUnter40k(!einkommenUnter40k)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
            einkommenUnter40k
              ? "bg-amber-50 border-amber-400"
              : "bg-white border-stone-300"
          }`}
        >
          <span
            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
              einkommenUnter40k ? "bg-amber-500 border-amber-500" : "border-stone-400"
            }`}
          >
            {einkommenUnter40k && <span className="text-white text-xs font-bold">✓</span>}
          </span>
          <span className="text-sm font-medium text-stone-700">Einkommen &lt; 40.000 €/Jahr</span>
        </button>

        <button
          type="button"
          onClick={() => setHatIsfp(!hatIsfp)}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
            hatIsfp
              ? "bg-amber-50 border-amber-400"
              : "bg-white border-stone-300"
          }`}
        >
          <span
            className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
              hatIsfp ? "bg-amber-500 border-amber-500" : "border-stone-400"
            }`}
          >
            {hatIsfp && <span className="text-white text-xs font-bold">✓</span>}
          </span>
          <span className="text-sm font-medium text-stone-700">iSFP vorhanden</span>
        </button>

        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">Investition (€)</label>
          <input
            type="number"
            min={1000}
            step={1000}
            value={investition}
            onChange={(e) => setInvestition(Math.max(1000, Number(e.target.value) || 1000))}
            className="w-full px-3 py-3 border border-stone-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
          />
        </div>
      </div>

      {/* ---- Summary ---- */}
      {gesamtZuschuss > 0 && (
        <div className="bg-green-50 border-2 border-green-300 rounded-xl p-5 text-center mb-8">
          <div className="text-sm font-medium text-green-700 mb-1">Maximal möglicher Zuschuss</div>
          <div className="text-3xl font-bold text-green-700">bis zu {fmt(gesamtZuschuss)} €</div>
          <div className="text-sm text-green-600 mt-1">
            Dein Eigenanteil: ca. {fmt(investition - gesamtZuschuss)} €
          </div>
        </div>
      )}

      {/* ---- Results ---- */}
      <h2 className="text-xl font-bold text-stone-900 mb-1">
        Passende Förderungen für „{foerderung.titel}"
      </h2>
      <p className="text-sm text-stone-500 mb-6">
        {foerderung.programme.length} Förderprogramm{foerderung.programme.length !== 1 && "e"} gefunden
      </p>

      <div className="space-y-6 mb-10">
        {ergebnisse.map((e, i) => {
          const style = artStyles(e.art);
          return (
            <div
              key={i}
              className={`border-l-4 ${style.border} bg-white border border-stone-200 rounded-xl p-6 shadow-sm`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="font-bold text-lg text-stone-900">{e.name}</div>
                  <div className="text-sm text-stone-500">{e.traeger}</div>
                </div>
                <span className={`shrink-0 px-3 py-1 rounded-full text-xs font-bold ${style.badge}`}>
                  {e.art}
                </span>
              </div>

              {e.beschreibung && (
                <p className="text-stone-600 text-sm mb-4">{e.beschreibung}</p>
              )}

              {/* Zuschuss breakdown */}
              {e.satz > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-stone-500 mb-2">
                    {e.foerderfaehig < investition
                      ? `Von deiner Investition von ${fmt(investition)} € sind ${fmt(e.foerderfaehig)} € förderfähig:`
                      : `Bei deiner Investition von ${fmt(investition)} €:`}
                  </p>
                  {e.details.map((d, j) => (
                    <div key={j} className="flex justify-between text-sm py-1">
                      <span className="text-stone-700">✅ {d.label}: {d.pct} %</span>
                      <span className="font-medium text-stone-900">{fmt(d.amount)} €</span>
                    </div>
                  ))}
                  {e.uncappedSatz > e.satz && (
                    <div className="text-xs text-stone-400 mt-1">
                      Gedeckelt auf max. {e.satz} % (statt {e.uncappedSatz} %)
                    </div>
                  )}
                  <div className="border-t border-stone-200 mt-3 pt-3">
                    <div className="flex justify-between font-bold text-green-700">
                      <span>💰 Möglicher Zuschuss</span>
                      <span>bis zu {fmt(e.betrag)} €</span>
                    </div>
                    <div className="flex justify-between text-sm text-stone-600 mt-1">
                      <span>💰 Dein Eigenanteil</span>
                      <span>ca. {fmt(investition - e.betrag)} €</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Stufen table (KfW 261) */}
              {e.stufen && (
                <div className="mb-4 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-stone-500 border-b border-stone-200">
                        <th className="text-left py-2 font-medium">Effizienzhausstufe</th>
                        <th className="text-right py-2 font-medium">Tilgungszuschuss</th>
                      </tr>
                    </thead>
                    <tbody>
                      {e.stufen.map((s, j) => (
                        <tr key={j} className="border-b border-stone-100">
                          <td className="py-2 text-stone-700">{s.name}</td>
                          <td className="text-right font-semibold text-stone-900">{s.zuschuss} %</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Boni (KfW 261) */}
              {e.boni && (
                <div className="mb-4">
                  <div className="text-sm font-medium text-stone-700 mb-1">Mögliche Zusatzboni:</div>
                  {e.boni.map((b, j) => (
                    <div key={j} className="text-sm text-stone-600 py-0.5">
                      + {b.name}: <strong>+{b.bonus} %</strong>
                    </div>
                  ))}
                  {e.max_tilgungszuschuss && (
                    <div className="text-xs text-stone-400 mt-1">
                      Max. Tilgungszuschuss insgesamt: {e.max_tilgungszuschuss} %
                    </div>
                  )}
                </div>
              )}

              {/* Max Kredit */}
              {e.max_kredit_standard && (
                <div className="text-sm text-stone-700 mb-2">
                  <strong>Max. Kredit:</strong> {fmt(e.max_kredit_standard)} €
                  {e.max_kredit_ee_nh && ` (mit EE-/NH-Klasse: ${fmt(e.max_kredit_ee_nh)} €)`}
                </div>
              )}
              {e.max_kredit_ohne_qs && (
                <div className="text-sm text-stone-700 mb-2">
                  <strong>Max. Kredit:</strong> {fmt(e.max_kredit_ohne_qs)} €
                  {e.max_kredit_mit_qs && ` (mit QNG: ${fmt(e.max_kredit_mit_qs)} €)`}
                </div>
              )}
              {e.max_kredit && e.max_kredit < 500000 && !e.max_kredit_standard && !e.max_kredit_ohne_qs && (
                <div className="text-sm text-stone-700 mb-2">
                  <strong>Max. Kredit:</strong> {fmt(e.max_kredit)} €
                </div>
              )}

              {/* Zins */}
              {e.zins && (
                <div className="text-sm text-stone-700 mb-2">
                  <strong>Zinssatz:</strong> {e.zins}
                </div>
              )}
              {e.zins_eh40 && (
                <div className="text-sm text-stone-700 mb-2">
                  <strong>Zinssatz:</strong> EH40: {e.zins_eh40}
                  {e.zins_eh55 && ` · EH55: ${e.zins_eh55}`}
                </div>
              )}

              {/* Hinweis */}
              <div className="bg-stone-50 rounded-lg p-3 text-sm text-stone-600 mt-3">
                <span className="font-medium">⚠️ </span>
                {e.hinweis}
              </div>

              {/* Link */}
              {e.link && (
                <a
                  href={e.link}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-amber-700 hover:text-amber-800 hover:underline"
                >
                  → Zur offiziellen Seite
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* ---- Tips ---- */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-lg text-stone-900 mb-3">💡 So maximierst du deine Förderung</h2>
        <ol className="space-y-2 text-sm text-stone-700 list-decimal list-inside">
          <li>Immer <strong>ZUERST</strong> den Antrag stellen, <strong>DANN</strong> den Handwerkervertrag unterschreiben</li>
          <li>Einen individuellen Sanierungsfahrplan (iSFP) erstellen lassen — kostet ca. 300–500 € nach Förderung, verdoppelt aber die förderfähigen Kosten bei Einzelmaßnahmen</li>
          <li>Mindestens 3 Handwerkerangebote einholen</li>
          <li>Energieberater aus der <strong>dena-Expertenliste</strong> nutzen (Pflicht bei KfW, empfohlen bei BAFA)</li>
          <li>BAFA-Zuschuss und KfW-Kredit <strong>NICHT</strong> für dieselbe Maßnahme kombinieren — aber für verschiedene Maßnahmen am selben Gebäude schon</li>
        </ol>
      </div>

      <RechnerHinweis text="Die dargestellten Förderprogramme entsprechen dem Stand März 2026. Förderbedingungen und -höhen können sich jederzeit ändern. Prüfe die aktuellen Konditionen direkt bei KfW (kfw.de) oder BAFA (bafa.de) und stelle Anträge immer VOR Baubeginn." />

      <FAQSection faqs={getFaqBySlug("foerdermittel")} rechnerName="Fördermittel-Finder" />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
        <p className="text-sm font-medium text-stone-800 mb-1">📖 Ratgeber zum Thema</p>
        <a href="/finanzen/kfw-foerderung-2026" className="text-amber-600 hover:text-amber-700 font-medium text-sm">
          KfW Förderung 2026 — alle Programme →
        </a>
      </div>

      {/* ---- More calculators ---- */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-6">
        <h2 className="text-lg font-bold mb-3">Weitere Rechner</h2>
        <div className="flex flex-wrap gap-3">
          <a href="/rechner/nebenkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Nebenkosten-Rechner</a>
          <a href="/rechner/eigenleistung" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Eigenleistungs-Rechner</a>
          <a href="/rechner/handwerkerkosten" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Handwerkerkosten-Rechner</a>
          <a href="/rechner/daemmung" className="px-4 py-2 bg-white border border-stone-200 rounded-lg text-sm hover:border-amber-400 transition-colors">Dämmung-Rechner</a>
        </div>
      </div>

      <p className="text-xs text-stone-400 mt-8">
        Datenquellen: KfW-Förderprogramme, BAFA BEG-Richtlinien, §35c EStG (Stand März 2026).
        Förderprogramme und -konditionen können sich jederzeit ändern.
      </p>
    </div>
  );
}

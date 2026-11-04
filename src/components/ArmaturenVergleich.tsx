"use client";

import { useMemo, useState } from "react";
import { AFFILIATE_REL } from "@/lib/affiliate";
import { KATEGORIE_NAME, MERKMALE, merkmaleFuer, type ArmaturDaten, type ArmaturKategorie } from "@/lib/armatur-daten";
import TeilBild from "@/components/TeilBild";

// Filter und Nebeneinander-Vergleich für /vergleich/armaturen. Links und Preistexte kommen fertig
// vom Server (Tracking-ID, Preisregeln), hier wird nur gefiltert, sortiert und ausgewählt.

export interface VergleichsProdukt {
  id: string;
  name: string;
  hersteller: string | null;
  kennung: string;
  einsatzbereich: string | null;
  kurzbeschreibung: string | null;
  daten: ArmaturDaten;
  bild: { url: string; shop: string } | null;
  amazon: string | null;
  angebote: { id: string; shop: string; shopName: string; url: string; preis: number | null; preisText: string }[];
  artikel: { href: string; titel: string }[];
  sortierung: number;
}

const MAX_AUSWAHL = 4;
const KURZ: (keyof ArmaturDaten)[] = ["bauart", "druck", "auslaufhoehe_mm", "ausladung_mm", "brause", "ablauf"];

type Sortierung = "empfehlung" | "preis" | "auslauf";

function guenstigster(p: VergleichsProdukt): number | null {
  const preise = p.angebote.map((a) => a.preis).filter((x): x is number => x !== null);
  return preise.length ? Math.min(...preise) : null;
}

function Auswahl<T extends string>({ label, wert, optionen, setze }: {
  label: string;
  wert: T | "alle";
  optionen: { wert: T; label: string }[];
  setze: (w: T | "alle") => void;
}) {
  if (optionen.length < 2) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-stone-500 w-20">{label}</span>
      {[{ wert: "alle" as const, label: "Alle" }, ...optionen].map((o) => (
        <button key={o.wert} type="button" onClick={() => setze(o.wert)} aria-pressed={wert === o.wert}
          className={`text-sm px-3 py-1 rounded-full border transition-colors ${
            wert === o.wert ? "bg-accent-700 border-accent-700 text-white" : "bg-white border-stone-300 text-stone-700 hover:border-accent-500"
          }`}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Kaufen({ p, klein = false }: { p: VergleichsProdukt; klein?: boolean }) {
  return (
    <div className={klein ? "space-y-1" : "flex flex-wrap gap-x-3 gap-y-1"}>
      {p.amazon && (
        <a href={p.amazon} target="_blank" rel={AFFILIATE_REL} data-platzierung="vergleich" data-kennung={p.kennung}
          className={klein ? "block text-accent-700 font-semibold hover:underline" : "text-sm kauflink"}>
          Amazon*
        </a>
      )}
      {p.angebote.map((a) => (
        <a key={a.id} href={a.url} target="_blank" rel={AFFILIATE_REL} data-platzierung="vergleich" data-shop={a.shop}
          data-kennung={p.kennung}
          className={klein ? "block text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600 whitespace-nowrap" : "text-sm kauflink whitespace-nowrap"}>
          {a.shopName} {a.preisText}*
        </a>
      ))}
    </div>
  );
}

export default function ArmaturenVergleich({ produkte }: { produkte: VergleichsProdukt[] }) {
  const [kategorie, setKategorie] = useState<ArmaturKategorie | "alle">("alle");
  const [druck, setDruck] = useState<"Hochdruck" | "Niederdruck" | "alle">("alle");
  const [bauart, setBauart] = useState<string | "alle">("alle");
  const [sortierung, setSortierung] = useState<Sortierung>("empfehlung");
  const [auswahl, setAuswahl] = useState<string[]>([]);

  const optionen = useMemo(() => {
    const kat = Array.from(new Set(produkte.map((p) => p.daten.kategorie!)));
    const bau = Array.from(new Set(produkte.map((p) => p.daten.bauart).filter((x): x is string => !!x)));
    const dr = Array.from(new Set(produkte.map((p) => p.daten.druck).filter((x): x is "Hochdruck" | "Niederdruck" => !!x)));
    return {
      kategorie: kat.map((k) => ({ wert: k, label: KATEGORIE_NAME[k] })),
      bauart: bau.sort().map((b) => ({ wert: b, label: b })),
      druck: dr.sort().map((d) => ({ wert: d, label: d })),
    };
  }, [produkte]);

  const sichtbar = useMemo(() => {
    const liste = produkte.filter(
      (p) =>
        (kategorie === "alle" || p.daten.kategorie === kategorie) &&
        (druck === "alle" || p.daten.druck === druck) &&
        (bauart === "alle" || p.daten.bauart === bauart),
    );
    if (sortierung === "preis") {
      return [...liste].sort((a, b) => (guenstigster(a) ?? Infinity) - (guenstigster(b) ?? Infinity));
    }
    if (sortierung === "auslauf") {
      return [...liste].sort((a, b) => (b.daten.auslaufhoehe_mm ?? -1) - (a.daten.auslaufhoehe_mm ?? -1));
    }
    return liste;
  }, [produkte, kategorie, druck, bauart, sortierung]);

  const gewaehlt = auswahl.map((id) => produkte.find((p) => p.id === id)).filter((p): p is VergleichsProdukt => !!p);
  const merkmale = merkmaleFuer(gewaehlt.map((p) => p.daten));

  function umschalten(id: string) {
    setAuswahl((a) => (a.includes(id) ? a.filter((x) => x !== id) : a.length < MAX_AUSWAHL ? [...a, id] : a));
  }

  if (produkte.length === 0) {
    return <p className="text-stone-600">Der Vergleich wird gerade aufgebaut.</p>;
  }

  return (
    <div>
      <div className="bg-white rounded-2xl ring-1 ring-stone-900/[0.07] p-4 mb-6 space-y-3">
        <Auswahl label="Einsatz" wert={kategorie} optionen={optionen.kategorie} setze={setKategorie} />
        <Auswahl label="Druck" wert={druck} optionen={optionen.druck} setze={setDruck} />
        <Auswahl label="Bauart" wert={bauart} optionen={optionen.bauart} setze={setBauart} />
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="sortierung" className="text-xs font-semibold text-stone-500 w-20">Sortieren</label>
          <select id="sortierung" value={sortierung} onChange={(e) => setSortierung(e.target.value as Sortierung)}
            className="text-sm border border-stone-300 rounded-lg px-2 py-1 bg-white">
            <option value="empfehlung">nach Kaufberatung</option>
            <option value="preis">günstigster Shop-Preis zuerst</option>
            <option value="auslauf">höchster Auslauf zuerst</option>
          </select>
          <span className="text-sm text-stone-500 ml-auto">{sichtbar.length} Modelle</span>
        </div>
      </div>

      {gewaehlt.length >= 2 && (
        <section className="mb-8" aria-label="Ausgewählte Modelle nebeneinander">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-semibold leading-tight">{gewaehlt.length} Modelle nebeneinander</h2>
            <button type="button" onClick={() => setAuswahl([])} className="text-sm text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
              Auswahl leeren
            </button>
          </div>
          <div className="overflow-x-auto border-y border-stone-200">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="align-top">
                  <th className="sticky left-0 bg-white p-3 text-left text-stone-500 font-medium w-32">Modell</th>
                  {gewaehlt.map((p) => (
                    <th key={p.id} className="p-3 text-left font-semibold text-stone-900 min-w-[160px]">
                      {gewaehlt.some((x) => x.bild) && (
                        <div className="mb-2 h-[88px]">{p.bild && <TeilBild url={p.bild.url} alt={p.name} groesse={88} />}</div>
                      )}
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {merkmale.map((m) => (
                  <tr key={m.key}>
                    <th scope="row" className="sticky left-0 bg-white p-3 text-left text-stone-500 font-medium">{m.label}</th>
                    {gewaehlt.map((p) => (
                      <td key={p.id} className="p-3 text-stone-700">
                        {m.wert(p.daten) ?? <span className="text-stone-400">k. A.</span>}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row" className="sticky left-0 bg-white p-3 text-left text-stone-500 font-medium">Kaufen</th>
                  {gewaehlt.map((p) => (
                    <td key={p.id} className="p-3"><Kaufen p={p} klein /></td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}

      {gewaehlt.length < 2 && (
        <p className="text-sm text-stone-500 mb-4">
          Tipp: Hake bei zwei bis {MAX_AUSWAHL} Modellen „Vergleichen“ an, dann erscheinen sie nebeneinander.
        </p>
      )}

      <ul className="grid gap-4 md:grid-cols-2">
        {sichtbar.map((p) => {
          const aktiv = auswahl.includes(p.id);
          const voll = !aktiv && auswahl.length >= MAX_AUSWAHL;
          return (
            <li key={p.id} className={`bg-white border rounded-xl p-4 flex flex-col gap-3 ${aktiv ? "border-accent-500 ring-1 ring-accent-500" : "border-stone-200"}`}>
              <div className="flex gap-3">
                {p.bild && <TeilBild url={p.bild.url} alt={p.name} shop={p.bild.shop} groesse={96} />}
                <div className="min-w-0">
                  <div className="flex flex-wrap gap-1.5 mb-1">
                    <span className="bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded">{KATEGORIE_NAME[p.daten.kategorie!]}</span>
                    {p.einsatzbereich && <span className="bg-accent-50 text-accent-800 text-xs px-2 py-0.5 rounded">{p.einsatzbereich}</span>}
                  </div>
                  <h3 className="font-semibold text-stone-900 leading-snug">{p.name}</h3>
                  {p.kurzbeschreibung && <p className="text-sm text-stone-600 mt-1">{p.kurzbeschreibung}</p>}
                </div>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                {MERKMALE.filter((m) => KURZ.includes(m.key)).map((m) => {
                  const w = m.wert(p.daten);
                  return w ? (
                    <div key={m.key} className="flex justify-between gap-2 border-b border-stone-100 py-0.5">
                      <dt className="text-stone-500">{m.label}</dt>
                      <dd className="text-stone-800 text-right">{w}</dd>
                    </div>
                  ) : null;
                })}
              </dl>
              <Kaufen p={p} />
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm mt-auto pt-1">
                <label className={`inline-flex items-center gap-2 ${voll ? "text-stone-400" : "text-stone-700 cursor-pointer"}`}>
                  <input type="checkbox" checked={aktiv} disabled={voll} onChange={() => umschalten(p.id)}
                    className="accent-accent-600 w-4 h-4" />
                  Vergleichen
                </label>
                <span className="text-stone-500">
                  aus:{" "}
                  {p.artikel.map((a, i) => (
                    <span key={a.href}>
                      {i > 0 && ", "}
                      <a href={a.href} className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">{a.titel.split(":")[0]}</a>
                    </span>
                  ))}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

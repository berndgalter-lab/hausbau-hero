"use client";

import { useState } from "react";
import type { RatgeberDaten } from "@/lib/armatur-daten";
import { modellAnker, ratgeberNachPfad, type AuswahlOption } from "@/lib/produkt-ratgeber";
import { AFFILIATE_REL } from "@/lib/affiliate";
import TeilBild from "@/components/TeilBild";

// Hauptteil der Produkt-Ratgeber: Fragen mit „egal“, darunter die passenden Modelle mit Bild, Eckdaten
// und Kaufzeile. Fragen und Eckdaten stehen in src/lib/produkt-ratgeber.ts. Sagt der Hersteller zu einer
// gewählten Frage nichts, steht das Modell getrennt darunter, statt als passend zu gelten.

export interface KaufLink {
  url: string;
  text: string;
  shop?: string;
  platzierung: string;
  kennung: string;
}

export interface AuswahlModell {
  id: string;
  name: string;
  einsatzbereich: string | null;
  kurzbeschreibung: string | null;
  vorteile: string[];
  nachteile: string[];
  daten: RatgeberDaten;
  bild: { url: string; shop: string } | null;
  kauf: KaufLink[];
}

function Kaufzeile({ links }: { links: KaufLink[] }) {
  if (links.length === 0) return null;
  return (
    <p className="text-sm mt-2">
      {links.map((l, i) => (
        <span key={l.url}>
          {i > 0 && <span className="text-stone-400"> · </span>}
          <a href={l.url} target="_blank" rel={AFFILIATE_REL} data-platzierung={l.platzierung} data-shop={l.shop}
            data-kennung={l.kennung} className="kauflink">
            {l.text}
          </a>
          *
        </span>
      ))}
    </p>
  );
}

function Ergebnis({ m, eckdaten }: { m: AuswahlModell; eckdaten: string[] }) {
  const mehr = m.kurzbeschreibung || m.vorteile.length > 0 || m.nachteile.length > 0;
  return (
    <li id={modellAnker(m.id)} className="py-5 first:pt-1 last:pb-1 scroll-mt-24">
      <div className="flex gap-3 sm:gap-4">
        {m.bild ? (
          <TeilBild url={m.bild.url} alt={m.name} shop={m.bild.shop} groesse={88} />
        ) : (
          <div className="w-[88px] h-[88px] shrink-0 rounded-xl bg-stone-100 flex items-center justify-center text-[11px] text-stone-400 text-center px-2">
            kein Bild
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-stone-900 leading-snug">{m.name}</p>
          {eckdaten.length > 0 && <p className="text-sm text-stone-600 mt-0.5">{eckdaten.join(" · ")}</p>}
          {m.einsatzbereich && <p className="text-sm text-stone-500">Passt für: {m.einsatzbereich}</p>}
          <Kaufzeile links={m.kauf} />
        </div>
      </div>
      {mehr && (
        <details className="group mt-2 sm:ml-[104px]">
          <summary className="inline-block text-sm font-medium text-stone-500 cursor-pointer hover:text-stone-900 list-none">
            <span className="group-open:hidden">Mehr zu diesem Modell ▾</span>
            <span className="hidden group-open:inline">Weniger ▴</span>
          </summary>
          {m.kurzbeschreibung && <p className="text-sm text-stone-700 mt-2 leading-relaxed">{m.kurzbeschreibung}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-2 text-sm">
            {m.vorteile.length > 0 && (
              <div>
                <p className="font-semibold text-stone-800 mb-1">Spricht dafür</p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  {m.vorteile.map((v, i) => <li key={i}>{v}</li>)}
                </ul>
              </div>
            )}
            {m.nachteile.length > 0 && (
              <div>
                <p className="font-semibold text-stone-800 mb-1">Worauf achten</p>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  {m.nachteile.map((n, i) => <li key={i}>{n}</li>)}
                </ul>
              </div>
            )}
          </div>
        </details>
      )}
    </li>
  );
}

export default function Auswahlhilfe({ pfad, modelle, fussnote }: { pfad: string; modelle: AuswahlModell[]; fussnote?: string }) {
  const ratgeber = ratgeberNachPfad(pfad);
  // Gewählte Option je Frage (Index), fehlt der Schlüssel, ist „egal“ gewählt
  const [wahl, setWahl] = useState<Record<string, number>>({});
  if (!ratgeber || modelle.length === 0) return null;

  const gewaehlt: AuswahlOption[] = ratgeber.fragen
    .filter((f) => wahl[f.key] !== undefined)
    .map((f) => f.optionen[wahl[f.key]]);
  const antworten = (m: AuswahlModell) => gewaehlt.map((o) => o.passt(m.daten));
  const passend = modelle.filter((m) => antworten(m).every((a) => a === true));
  const unklar = modelle.filter((m) => {
    const a = antworten(m);
    return !a.includes(false) && a.includes(null);
  });
  // Optionen mit Verweis, zu denen kein Modell passt (z. B. Untertischspeicher → Niederdruck-Ratgeber),
  // oder deren Kombination mit den übrigen Antworten nichts übrig lässt (Vorfenster und Brause)
  const verweise = gewaehlt.filter(
    (o) => o.sonst && (passend.length === 0 || !modelle.some((m) => o.passt(m.daten) === true)),
  );
  const eckdaten = (m: AuswahlModell) => ratgeber.eckdaten(m.daten).filter((x): x is string => !!x);
  const zuruecksetzen = gewaehlt.length > 0 && (
    <button type="button" onClick={() => setWahl({})} className="font-normal text-accent-700 underline decoration-accent-300 underline-offset-2">
      Auswahl zurücksetzen
    </button>
  );

  return (
    <section id="auswahl" className="scroll-mt-24 mb-12 -mx-5 sm:mx-0 rounded-none sm:rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)] ring-1 ring-stone-900/[0.07]">
      <div className="p-5 sm:p-7">
        <p className="ueberzeile">Auswahlhilfe</p>
        <h2 className="mt-2 text-2xl font-semibold leading-tight text-stone-900">{ratgeber.frage ?? `Welche ${ratgeber.name} passt?`}</h2>
        <p className="text-sm text-stone-500 mt-1 mb-6">Wähle aus, was bei dir zutrifft. Die Liste darunter passt sich an.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {ratgeber.fragen.map((f) => (
            <fieldset key={f.key} className={f.optionen.length > 2 ? "md:col-span-2" : undefined}>
              <legend className="text-sm font-semibold text-stone-900 mb-2">{f.label}</legend>
              <div className="flex flex-wrap gap-2">
                {[-1, ...f.optionen.map((_, i) => i)].map((i) => {
                  const aktiv = (wahl[f.key] ?? -1) === i;
                  return (
                    <button key={i} type="button" aria-pressed={aktiv}
                      onClick={() =>
                        setWahl((w) => {
                          const neu = { ...w };
                          if (i === -1) delete neu[f.key];
                          else neu[f.key] = i;
                          return neu;
                        })
                      }
                      className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                        aktiv ? "bg-accent-700 border-accent-700 text-white" : "bg-white border-stone-300 text-stone-700 hover:border-stone-500"
                      }`}>
                      {i === -1 ? "egal" : f.optionen[i].label}
                    </button>
                  );
                })}
              </div>
              {f.hinweis && <p className="text-xs text-stone-500 mt-1.5">{f.hinweis}</p>}
            </fieldset>
          ))}
        </div>
      </div>

      <div className="border-t border-stone-200 p-5 sm:p-7">
        {verweise.map((o) => (
          <p key={o.label} className="text-sm text-stone-800 bg-accent-50 rounded-xl px-4 py-3 mb-5">
            {o.sonst!.text}
            {o.sonst!.href && (
              <>
                {" "}
                <a href={o.sonst!.href} className="kauflink">{o.sonst!.linktext ?? "Mehr dazu"} →</a>
              </>
            )}
          </p>
        ))}

        <p className="text-sm font-medium text-stone-900 mb-3" aria-live="polite">
          {passend.length === modelle.length
            ? `Alle ${modelle.length} ${ratgeber.mehrzahl}:`
            : passend.length === 0
              ? `${ratgeber.keine ?? "Keine"} der ${modelle.length} ${ratgeber.mehrzahl} hier passt${unklar.length > 0 ? " sicher" : ""}.`
              : `${passend.length} von ${modelle.length} ${ratgeber.mehrzahlDativ ?? ratgeber.mehrzahl} ${passend.length === 1 ? "passt" : "passen"}:`}{" "}
          {zuruecksetzen}
        </p>
        {passend.length > 0 && (
          <ul className="divide-y divide-stone-200">
            {passend.map((m) => <Ergebnis key={m.id} m={m} eckdaten={eckdaten(m)} />)}
          </ul>
        )}

        {unklar.length > 0 && (
          <>
            <p className="text-sm text-stone-500 mt-6 mb-3">Dazu nennt der Hersteller nichts, vor dem Kauf nachmessen oder nachfragen:</p>
            <ul className="divide-y divide-stone-200">
              {unklar.map((m) => <Ergebnis key={m.id} m={m} eckdaten={eckdaten(m)} />)}
            </ul>
          </>
        )}
        {fussnote && <p className="text-xs text-stone-500 mt-5">{fussnote}</p>}
      </div>
    </section>
  );
}

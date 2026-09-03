"use client";

import { useState } from "react";
import { berechne, werteAus, formatPreis } from "@/lib/rechner-logic";
import { getAffiliateLink } from "@/lib/monetarisierung";
import type { EingabeFeld, RechnerMaterial } from "@/lib/rechner-logic";

interface Props {
  slug: string;
  name: string;
  eingabefelder: EingabeFeld[];
  berechnungslogik: Record<string, string>;
  materialien: RechnerMaterial[];
}

type Zeile = RechnerMaterial & { menge: number; link: string | null };

export default function RechnerClient({
  slug,
  name,
  eingabefelder,
  berechnungslogik,
  materialien,
}: Props) {
  const [eingaben, setEingaben] = useState<Record<string, number>>(() => {
    const d: Record<string, number> = {};
    for (const feld of eingabefelder) d[feld.name] = feld.default ?? feld.min ?? 0;
    return d;
  });
  const [ergebnisse, setErgebnisse] = useState<Record<string, number>>({});
  const [berechnet, setBerechnet] = useState(false);
  const [pdfLaeuft, setPdfLaeuft] = useState(false);

  function handleBerechnen() {
    setErgebnisse(berechne(berechnungslogik, eingaben));
    setBerechnet(true);
  }

  const zeilen: Zeile[] = berechnet
    ? materialien
        .map((m) => ({
          ...m,
          menge: werteAus(m.formel, ergebnisse) ?? 0,
          link: getAffiliateLink(m.affiliate_url, m.amazon_asin, m.name),
        }))
        .filter((m) => m.menge > 0)
    : [];

  const material = zeilen.filter((m) => m.kategorie !== "Werkzeug");
  const werkzeuge = zeilen.filter((m) => m.kategorie === "Werkzeug");
  const gesamtpreis = material.reduce((s, m) => s + m.menge * m.preis_ca, 0);

  const fliesenkosten =
    slug === "fliesen" && ergebnisse.fliesenkosten_material > 0
      ? ergebnisse.fliesenkosten_material
      : 0;

  async function handlePdf() {
    setPdfLaeuft(true);
    try {
      const { erzeugeMateriallistePdf } = await import("@/lib/materialliste-pdf");
      await erzeugeMateriallistePdf({
        rechnerName: name,
        slug,
        angaben: eingabefelder.map((feld) => {
          const wert = eingaben[feld.name];
          const opt = feld.options?.find((o) => Number(o.value) === Number(wert));
          return {
            label: feld.label + (feld.einheit ? ` (${feld.einheit})` : ""),
            wert: opt ? opt.label : String(wert),
          };
        }),
        material,
        werkzeuge,
        zusatzposten: fliesenkosten
          ? [{ label: "Fliesenkosten (Material)", betrag: fliesenkosten }]
          : [],
      });
    } catch (e) {
      console.error("[Rechner] PDF fehlgeschlagen:", e);
    }
    setPdfLaeuft(false);
  }

  return (
    <>
      <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Deine Angaben</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eingabefelder.map((feld) => (
            <div key={feld.name}>
              <label htmlFor={`feld-${feld.name}`} className="block text-sm font-medium text-stone-700 mb-1">
                {feld.label} {feld.einheit && <span className="text-stone-400">({feld.einheit})</span>}
              </label>
              {feld.typ === "select" ? (
                <select
                  id={`feld-${feld.name}`}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
                  value={eingaben[feld.name] ?? ""}
                  onChange={(e) => setEingaben({ ...eingaben, [feld.name]: Number(e.target.value) })}
                >
                  {feld.options?.map((opt) => (
                    <option key={String(opt.value)} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  id={`feld-${feld.name}`}
                  type="number"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
                  value={eingaben[feld.name] ?? ""}
                  min={feld.min}
                  max={feld.max}
                  step={feld.step || 1}
                  onChange={(e) => setEingaben({ ...eingaben, [feld.name]: Number(e.target.value) })}
                />
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleBerechnen}
          className="mt-6 w-full bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors text-lg"
        >
          Berechnen
        </button>
      </div>

      {berechnet && (
        <>
          {fliesenkosten > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-stone-700">Fliesenkosten (Material)</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {Math.round(ergebnisse.flaeche * (1 + eingaben.verschnitt / 100) * 10) / 10} m² ×{" "}
                    {formatPreis(eingaben.fliesenpreis)}/m²
                  </p>
                </div>
                <p className="text-xl font-bold text-emerald-700">{formatPreis(fliesenkosten)}</p>
              </div>
            </div>
          )}

          {material.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-6 mb-6">
              <div className="flex items-baseline justify-between gap-4 flex-wrap mb-1">
                <h2 className="text-lg font-bold">📋 Deine Materialliste</h2>
                <p className="text-sm text-stone-500">
                  Material gesamt:{" "}
                  <strong className="text-stone-900 text-base">{formatPreis(gesamtpreis)}</strong>
                </p>
              </div>
              <p className="text-xs text-stone-500 mb-5">
                Die Links führen zu Amazon. Bei einem Kauf erhalten wir eine kleine Provision —
                für dich ändert sich der Preis nicht.
              </p>

              <ul className="grid gap-3">
                {material.map((m) => (
                  <li
                    key={m.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-stone-200 p-3"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-sm">{m.name}</div>
                      <div className="text-xs text-stone-500">
                        {Math.round(m.menge)} {m.einheit} · ca. {formatPreis(m.menge * m.preis_ca)}
                      </div>
                    </div>
                    {m.link && (
                      <a
                        href={m.link}
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                        className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-700"
                      >
                        Bei Amazon ansehen →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {werkzeuge.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold mb-1">🔧 Werkzeug-Checkliste</h2>
              <p className="text-sm text-stone-600 mb-4">Das brauchst du für dieses Projekt:</p>
              <ul className="grid gap-3">
                {werkzeuge.map((w) => (
                  <li
                    key={w.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-amber-100 bg-white p-3"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-sm">{w.name}</div>
                      <div className="text-xs text-stone-500">ab {formatPreis(w.preis_ca)}</div>
                    </div>
                    {w.link && (
                      <a
                        href={w.link}
                        target="_blank"
                        rel="nofollow noopener noreferrer sponsored"
                        className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-amber-700"
                      >
                        Bei Amazon ansehen →
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {material.length > 0 && (
            <button
              onClick={handlePdf}
              disabled={pdfLaeuft}
              className="w-full mb-6 bg-stone-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-stone-700 disabled:opacity-60 transition-colors text-sm"
            >
              {pdfLaeuft ? "PDF wird erstellt …" : "📄 Materialliste als PDF speichern"}
            </button>
          )}
        </>
      )}
    </>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { berechne, formatPreis, amazonLink } from "@/lib/rechner-logic";
import CommunityKosten from "@/components/CommunityKosten";
import EmailCapture from "@/components/EmailCapture";
import { useParams } from "next/navigation";

interface RechnerData {
  id: string;
  name: string;
  slug: string;
  beschreibung: string;
  eingabefelder: any[];
  berechnungslogik: Record<string, string>;
  silo_id: string;
}

interface MaterialData {
  id: string;
  name: string;
  kategorie: string;
  formel: string;
  einheit: string;
  amazon_asin?: string;
  affiliate_url?: string;
  preis_ca: number;
  ist_essential: boolean;
  sortierung: number;
}

export default function RechnerPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [rechner, setRechner] = useState<RechnerData | null>(null);
  const [materialien, setMaterialien] = useState<MaterialData[]>([]);
  const [eingaben, setEingaben] = useState<Record<string, number>>({});
  const [ergebnisse, setErgebnisse] = useState<Record<string, number>>({});
  const [berechnet, setBerechnet] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { data: r, error: qError } = await supabase
          .from("rechner")
          .select("*")
          .eq("slug", slug)
          .single();

        if (qError) {
          console.error("[Rechner] Query error:", qError.message);
          setError("Rechner konnte nicht geladen werden.");
          setLoading(false);
          return;
        }

        if (r) {
          setRechner(r);
          const defaults: Record<string, number> = {};
          for (const feld of r.eingabefelder) {
            defaults[feld.name] = feld.default ?? feld.min ?? 0;
          }
          setEingaben(defaults);

          const { data: mat } = await supabase
            .from("rechner_materialien")
            .select("*")
            .eq("rechner_id", r.id)
            .order("sortierung");

          if (mat) setMaterialien(mat);
        }
      } catch (e) {
        console.error("[Rechner] Fetch failed:", e);
        setError("Verbindungsfehler. Bitte lade die Seite neu.");
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  function handleBerechnen() {
    if (!rechner) return;
    const erg = berechne(rechner.berechnungslogik, eingaben);
    setErgebnisse(erg);
    setBerechnet(true);
  }

  function getMenge(formel: string): number {
    try {
      let ausdruck = formel;
      for (const [key, val] of Object.entries(ergebnisse)) {
        ausdruck = ausdruck.replace(new RegExp(`\\b${key}\\b`, "g"), String(val));
      }
      ausdruck = ausdruck.replace(/ceil/g, "Math.ceil");
      ausdruck = ausdruck.replace(/floor/g, "Math.floor");
      ausdruck = ausdruck.replace(/round/g, "Math.round");
      return new Function(`return ${ausdruck}`)();
    } catch {
      return 0;
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />
        <p className="mt-4 text-stone-400">Lade Rechner...</p>
      </div>
    );
  }

  if (error || !rechner) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-semibold text-stone-700">
          {error || "Rechner nicht gefunden."}
        </p>
        <a href="/rechner" className="mt-4 inline-block text-amber-600 hover:text-amber-700 font-medium">
          ← Zurück zur Übersicht
        </a>
      </div>
    );
  }

  const materialliste = berechnet
    ? materialien.map((m) => ({ ...m, menge: getMenge(m.formel) })).filter((m) => m.menge > 0)
    : [];

  const gesamtpreis = materialliste
    .filter((m) => m.kategorie !== "Werkzeug")
    .reduce((sum, m) => sum + m.menge * m.preis_ca, 0);
  const werkzeuge = materialliste.filter((m) => m.kategorie === "Werkzeug");
  const material = materialliste.filter((m) => m.kategorie !== "Werkzeug");

  return (
    <div className="max-w-3xl">
      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <a href="/rechner" className="hover:text-stone-700">Rechner</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">{rechner.name}</span>
      </nav>

      <h1 className="text-3xl font-bold mb-2">{rechner.name}</h1>
      <p className="text-stone-600 mb-8">{rechner.beschreibung}</p>

      <div className="bg-white border border-stone-200 rounded-xl p-6 mb-8">
        <h2 className="text-lg font-bold mb-4">Deine Angaben</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rechner.eingabefelder.map((feld: any) => (
            <div key={feld.name}>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                {feld.label}{" "}
                {feld.einheit && (
                  <span className="text-stone-400">({feld.einheit})</span>
                )}
              </label>
              {feld.typ === "select" ? (
                <select
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
                  value={eingaben[feld.name] ?? ""}
                  onChange={(e) =>
                    setEingaben({ ...eingaben, [feld.name]: Number(e.target.value) })
                  }
                >
                  {feld.options?.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm"
                  value={eingaben[feld.name] ?? ""}
                  min={feld.min}
                  max={feld.max}
                  step={feld.step || 1}
                  onChange={(e) =>
                    setEingaben({ ...eingaben, [feld.name]: Number(e.target.value) })
                  }
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
          {material.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold mb-4">📋 Materialliste</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-2 font-medium text-stone-500">Material</th>
                      <th className="text-right py-2 font-medium text-stone-500">Menge</th>
                      <th className="text-right py-2 font-medium text-stone-500">ca. Preis</th>
                      <th className="text-right py-2 font-medium text-stone-500"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {material.map((m) => (
                      <tr key={m.id} className="border-b border-stone-100">
                        <td className="py-3">{m.name}</td>
                        <td className="text-right py-3 whitespace-nowrap">
                          {Math.round(m.menge)} {m.einheit}
                        </td>
                        <td className="text-right py-3 text-stone-500 whitespace-nowrap">
                          {formatPreis(m.menge * m.preis_ca)}
                        </td>
                        <td className="text-right py-3">
                          {m.amazon_asin && (
                            <a
                              href={m.affiliate_url || amazonLink(m.amazon_asin)}
                              target="_blank"
                              rel="noopener noreferrer nofollow"
                              className="text-amber-600 hover:text-amber-700 font-medium text-xs whitespace-nowrap"
                            >
                              Auf Amazon →
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold">
                      <td className="py-3">Gesamt (Material)</td>
                      <td></td>
                      <td className="text-right py-3">{formatPreis(gesamtpreis)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}

          {werkzeuge.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold mb-1">🔧 Werkzeug-Checkliste</h2>
              <p className="text-sm text-stone-600 mb-4">
                Das brauchst du für dieses Projekt:
              </p>
              <div className="grid gap-3">
                {werkzeuge.map((w) => (
                  <div
                    key={w.id}
                    className="flex items-center justify-between bg-white rounded-lg p-3 border border-amber-100"
                  >
                    <div>
                      <div className="font-medium text-sm">{w.name}</div>
                      <div className="text-xs text-stone-500">
                        ab {formatPreis(w.preis_ca)}
                      </div>
                    </div>
                    {w.amazon_asin && (
                      <a
                        href={w.affiliate_url || amazonLink(w.amazon_asin)}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap"
                      >
                        Auf Amazon →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <EmailCapture rechnerSlug={rechner.slug} />
          <CommunityKosten rechnerId={rechner.id} seitenSlug={rechner.slug} />
        </>
      )}
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { berechne, formatPreis, getAffiliateLink } from "@/lib/rechner-logic";
import FAQSection from "@/components/FAQSection";
import RechnerHinweis from "@/components/RechnerHinweis";
import { getFaqBySlug } from "@/lib/faq-data";
import { getRatgeberSlug } from "@/lib/ratgeber-zuordnung";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";

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
  const [ratgeber, setRatgeber] = useState<{ slug: string; titel: string; seo_description?: string; silos?: { slug: string } } | null>(null);

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

          const rSlug = getRatgeberSlug(r.slug, r.ratgeber_slug);
          if (rSlug) {
            const { data: rg } = await supabase
              .from("seiten")
              .select("slug, titel, seo_description, silos(slug)")
              .eq("slug", rSlug)
              .eq("status", "aktiv")
              .single();
            if (rg) setRatgeber(rg as any);
          }
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

  function generatePDF() {
    if (!rechner || !berechnet) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(rechner.name, 14, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text("hausbau-hero.de — Kostenlose Materialrechner", 14, 28);
    doc.text(`Erstellt am ${new Date().toLocaleDateString("de-DE")}`, 14, 34);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Deine Angaben:", 14, 48);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    let y = 56;
    for (const feld of rechner.eingabefelder) {
      const wert = eingaben[feld.name];
      const label = feld.label + (feld.einheit ? ` (${feld.einheit})` : "");
      let displayWert = String(wert);
      if (feld.options) {
        const opt = feld.options.find((o: any) => Number(o.value) === Number(wert));
        if (opt) displayWert = opt.label;
      }
      doc.text(`${label}: ${displayWert}`, 14, y);
      y += 7;
    }

    y += 8;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Materialliste:", 14, y);
    y += 10;

    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Material", 14, y);
    doc.text("Menge", 120, y, { align: "right" });
    doc.text("ca. Preis", pageWidth - 14, y, { align: "right" });
    y += 2;
    doc.setDrawColor(200, 200, 200);
    doc.line(14, y, pageWidth - 14, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    let gesamt = 0;
    for (const m of material) {
      const menge = Math.round(m.menge);
      const preis = m.menge * m.preis_ca;
      gesamt += preis;

      doc.text(m.name, 14, y, { maxWidth: 100 });
      doc.text(`${menge} ${m.einheit}`, 120, y, { align: "right" });
      doc.text(formatPreis(preis), pageWidth - 14, y, { align: "right" });
      y += 7;

      if (y > 270) { doc.addPage(); y = 20; }
    }

    if (rechner.slug === "fliesen" && ergebnisse.fliesenkosten_material > 0) {
      doc.text("Fliesenkosten (Material)", 14, y);
      doc.text(formatPreis(ergebnisse.fliesenkosten_material), pageWidth - 14, y, { align: "right" });
      gesamt += ergebnisse.fliesenkosten_material;
      y += 7;
    }

    y += 2;
    doc.line(14, y, pageWidth - 14, y);
    y += 7;
    doc.setFont("helvetica", "bold");
    doc.text("Gesamt (Material)", 14, y);
    doc.text(formatPreis(gesamt), pageWidth - 14, y, { align: "right" });

    if (werkzeuge.length > 0) {
      y += 14;
      doc.setFontSize(12);
      doc.text("Werkzeug-Checkliste:", 14, y);
      y += 10;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      for (const w of werkzeuge) {
        doc.text(`☐  ${w.name} (ab ${formatPreis(w.preis_ca)})`, 14, y);
        y += 7;
        if (y > 270) { doc.addPage(); y = 20; }
      }
    }

    y += 14;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Alle Preise sind ca.-Angaben (Stand 2026). Tatsächliche Preise können abweichen.", 14, y);
    y += 5;
    doc.text("Erstellt mit hausbau-hero.de — Kostenlose Materialrechner für Bauherren", 14, y);

    doc.save(`${rechner.slug}-materialliste.pdf`);
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: rechner.name,
            description: rechner.beschreibung,
            url: `https://hausbau-hero.de/rechner/${rechner.slug}`,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            author: { "@type": "Organization", name: "Hausbau Hero" },
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
              { "@type": "ListItem", position: 3, name: rechner.name, item: `https://hausbau-hero.de/rechner/${rechner.slug}` },
            ],
          }),
        }}
      />
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
          {rechner.slug === "fliesen" && ergebnisse.fliesenkosten_material > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-700">Fliesenkosten (Material)</p>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {Math.round(ergebnisse.flaeche * (1 + eingaben.verschnitt / 100) * 10) / 10} m² × {formatPreis(eingaben.fliesenpreis)}/m²
                  </p>
                </div>
                <p className="text-xl font-bold text-emerald-700">{formatPreis(ergebnisse.fliesenkosten_material)}</p>
              </div>
            </div>
          )}

          {material.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold mb-2">📋 Materialliste</h2>
              <p className="text-xs text-stone-500 mb-4">
                Affiliate-Hinweis: Die Materialliste enthält Links zu Amazon.
                Bei Kauf erhalten wir eine kleine Provision — für dich ändert sich der Preis nicht.
              </p>
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
                          {getAffiliateLink(m.affiliate_url, m.amazon_asin) && (
                            <a
                              href={getAffiliateLink(m.affiliate_url, m.amazon_asin)!}
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
                    {getAffiliateLink(w.affiliate_url, w.amazon_asin) && (
                      <a
                        href={getAffiliateLink(w.affiliate_url, w.amazon_asin)!}
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

          {material.length > 0 && (
            <button
              onClick={generatePDF}
              className="w-full mb-6 bg-stone-800 text-white font-semibold py-3 px-6 rounded-lg hover:bg-stone-700 transition-colors text-sm flex items-center justify-center gap-2"
            >
              📄 Materialliste als PDF speichern
            </button>
          )}

          {ratgeber && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <h2 className="text-lg font-bold mb-2">📖 Ratgeber zum Thema</h2>
              <a
                href={`/${(ratgeber.silos as any)?.slug || "rohbau"}/${ratgeber.slug}`}
                className="group block"
              >
                <div className="font-medium group-hover:text-amber-700 transition-colors">
                  {ratgeber.titel}
                </div>
                {ratgeber.seo_description && (
                  <p className="text-sm text-stone-600 mt-1">{ratgeber.seo_description}</p>
                )}
                <span className="inline-block mt-2 text-amber-600 text-sm font-medium">
                  Weiterlesen →
                </span>
              </a>
            </div>
          )}

          <RechnerHinweis />
        </>
      )}

      <FAQSection faqs={getFaqBySlug(rechner.slug)} rechnerName={rechner.name} />
    </div>
  );
}

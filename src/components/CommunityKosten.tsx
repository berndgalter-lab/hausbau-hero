"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { formatPreis } from "@/lib/rechner-logic";

const BUNDESLAENDER = [
  "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
  "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
  "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
  "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen",
];

export default function CommunityKosten({ seitenSlug }: { seitenSlug: string }) {
  const [region, setRegion] = useState("");
  const [kosten, setKosten] = useState("");
  const [gesendet, setGesendet] = useState(false);
  const [stats, setStats] = useState<{ avg: number; count: number } | null>(null);

  useEffect(() => {
    async function loadStats() {
      const { data } = await supabase
        .from("community_kosten")
        .select("kosten_gesamt")
        .or(`rechner_id.is.null,silo_id.is.null`)
        .limit(500);

      // Simple: just load all for this slug via a view or filter
      // For now, show general stats
      if (data && data.length > 0) {
        const sum = data.reduce((s: number, r: any) => s + (r.kosten_gesamt || 0), 0);
        setStats({ avg: sum / data.length, count: data.length });
      }
    }
    loadStats();
  }, [seitenSlug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!region || !kosten) return;

    await supabase.from("community_kosten").insert({
      region,
      kosten_gesamt: Number(kosten),
      plz: "",
    });

    setGesendet(true);
  }

  return (
    <div className="mt-8 bg-stone-100 border border-stone-200 rounded-xl p-6">
      <h3 className="text-lg font-bold mb-1">💬 Was hat es bei dir gekostet?</h3>
      <p className="text-sm text-stone-600 mb-4">
        Hilf anderen Bauherren und Handwerkern mit deiner Erfahrung.
      </p>

      {stats && stats.count >= 3 && (
        <div className="bg-white rounded-lg p-3 mb-4 text-sm">
          <span className="font-semibold">{stats.count} Nutzer</span> haben einen Durchschnitt von{" "}
          <span className="font-semibold text-amber-700">{formatPreis(stats.avg)}</span> angegeben.
        </div>
      )}

      {gesendet ? (
        <div className="text-green-700 font-medium py-4">Danke für deine Angabe! 🎉</div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[180px]"
            required
          >
            <option value="">Bundesland wählen</option>
            {BUNDESLAENDER.map((bl) => (
              <option key={bl} value={bl}>{bl}</option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Gesamtkosten (€)"
            value={kosten}
            onChange={(e) => setKosten(e.target.value)}
            className="border border-stone-300 rounded-lg px-3 py-2 text-sm w-40"
            min={0}
            required
          />
          <button
            type="submit"
            className="bg-stone-800 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-stone-900 transition-colors"
          >
            Absenden
          </button>
        </form>
      )}
    </div>
  );
}

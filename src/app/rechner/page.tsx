import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Rechner für Bad & Sanitär",
  description:
    "Material für Sanitär-Installation, Fliesen und Estrich berechnen – mit Materialliste und Einkaufslinks.",
  alternates: { canonical: "https://hausbau-hero.de/rechner" },
};

const ICONS: Record<string, string> = { sanitaer: "🚰", fliesen: "🔲", estrich: "🏗️" };

export default async function RechnerUebersicht() {
  let rechner: { slug: string; name: string; beschreibung: string | null }[] = [];
  try {
    const { data } = await supabase.from("rechner").select("slug, name, beschreibung").order("name");
    if (data) rechner = data;
  } catch (e) {
    console.error("[Rechner] Laden fehlgeschlagen:", e);
  }

  return (
    <div>
      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span className="mx-2">›</span>
        <span className="text-stone-900">Rechner</span>
      </nav>
      <h1 className="text-3xl font-bold mb-2">Rechner</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Material berechnen, bevor du einkaufst: Jeder Rechner erstellt eine Materialliste mit Mengen und
        Richtpreisen.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rechner.map((r) => (
          <a
            key={r.slug}
            href={`/rechner/${r.slug}`}
            className="group flex flex-col p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
          >
            <span className="text-3xl mb-3">{ICONS[r.slug] ?? "🔢"}</span>
            <span className="font-semibold group-hover:text-amber-700">{r.name}</span>
            {r.beschreibung && <span className="text-sm text-stone-600 mt-1">{r.beschreibung}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

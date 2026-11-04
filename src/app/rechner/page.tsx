import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import { Brotkrumen } from "@/components/Ersatzteile";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Rechner für Bad & Sanitär",
  description:
    "Material für Sanitär-Installation, Fliesen und Estrich berechnen – mit Materialliste und Einkaufslinks.",
  alternates: { canonical: "https://hausbau-hero.de/rechner" },
};


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
      <Brotkrumen teile={[{ name: "Start", href: "/" }, { name: "Rechner" }]} />
      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold mb-2">Rechner</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Material berechnen, bevor du einkaufst: Jeder Rechner erstellt eine Materialliste mit Mengen und
        Richtpreisen.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rechner.map((r) => (
          <a
            key={r.slug}
            href={`/rechner/${r.slug}`}
            className="group flex flex-col p-5 bg-stone-100/80 rounded-2xl transition-colors hover:bg-accent-50"
          >
            <span className="font-semibold group-hover:text-accent-700">{r.name}</span>
            {r.beschreibung && <span className="text-sm text-stone-600 mt-1">{r.beschreibung}</span>}
          </a>
        ))}
      </div>
    </div>
  );
}

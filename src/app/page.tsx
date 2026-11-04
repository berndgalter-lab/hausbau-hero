import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import { alleMarken, alleProbleme } from "@/lib/ersatzteile";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Hausbau Hero — Sanitär-Ersatzteile finden & Bad-Ratgeber" },
  description:
    "Welches Ersatzteil passt zu deiner Armatur oder deinem Spülkasten? Teile nach Marke und Serie mit Originalnummer und Quelle – plus Ratgeber fürs Bad.",
  alternates: { canonical: "https://hausbau-hero.de" },
};

const EINSTIEGE = [
  {
    href: "/ersatzteile",
    titel: "Ersatzteil finden",
    text: "Kartusche, Füllventil, Strahlregler: nach Marke und Serie – mit Originalnummer.",
  },
  {
    href: "/bad",
    titel: "Produkt auswählen",
    text: "Vorwandelement, Drückerplatte, Armatur: Was passt zu deiner Situation?",
  },
  {
    href: "/problem",
    titel: "Problem lösen",
    text: "Spülkasten läuft nach, Armatur tropft: Ursachen und das passende Teil.",
  },
];

export default async function Home() {
  const [marken, probleme, badArtikel] = await Promise.all([
    alleMarken().catch(() => []),
    alleProbleme().catch(() => []),
    (async () => {
      try {
        const { data: silo } = await supabase.from("silos").select("id").eq("slug", "bad").maybeSingle();
        if (!silo) return [];
        const { data } = await supabase
          .from("seiten")
          .select("slug, titel, seo_description")
          .eq("silo_id", silo.id)
          .eq("status", "aktiv")
          .order("titel");
        return data ?? [];
      } catch {
        return [];
      }
    })(),
  ]);

  return (
    <div>
      <section className="-mx-4 -mt-8 px-4 pt-12 pb-14 md:pt-16 md:pb-16 bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-white text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          Das passende <span className="text-amber-400">Ersatzteil</span> für Armatur &amp; Spülkasten
        </h1>
        <p className="mt-4 text-lg text-stone-300 max-w-2xl mx-auto">
          Nach Marke und Serie, mit Originalnummer und Quelle – damit du beim ersten Mal das richtige Teil bestellst.
        </p>
        <form action="/ersatzteile" method="get" className="mt-8 flex gap-2 max-w-xl mx-auto" role="search">
          <label htmlFor="start-suche" className="sr-only">Artikelnummer oder Teil</label>
          <input
            id="start-suche"
            name="q"
            placeholder="Artikelnummer, z. B. 46048000"
            className="flex-1 rounded-lg px-4 py-3 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <button className="bg-amber-500 hover:bg-amber-400 text-stone-900 font-bold px-6 rounded-lg">Suchen</button>
        </form>
      </section>

      <section className="mt-10 mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {EINSTIEGE.map((e) => (
          <a
            key={e.href}
            href={e.href}
            className="group flex flex-col p-6 bg-white border-2 border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-lg transition-all"
          >
            <span className="text-lg font-bold group-hover:text-amber-700">{e.titel}</span>
            <span className="text-sm text-stone-600 mt-1">{e.text}</span>
          </a>
        ))}
      </section>

      {marken.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Ersatzteile nach Marke</h2>
          <div className="flex flex-wrap gap-3">
            {marken.map((m) => (
              <a key={m.id} href={`/ersatzteile/${m.slug}`} className="px-4 py-2 bg-white border border-stone-200 rounded-lg font-medium hover:border-amber-400">
                {m.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {probleme.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Häufige Probleme</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {probleme.slice(0, 6).map((p) => (
              <li key={p.id}>
                <a href={`/problem/${p.slug}`} className="block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400 font-medium">
                  {p.titel}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {badArtikel.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Bad-Ratgeber</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badArtikel.map((a: any) => (
              <a key={a.slug} href={`/bad/${a.slug}`} className="block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400">
                <div className="font-medium">{a.titel}</div>
                {a.seo_description && <div className="text-sm text-stone-600 mt-1 line-clamp-2">{a.seo_description}</div>}
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8 text-sm text-stone-600">
        Material berechnen: <a href="/rechner/sanitaer" className="text-amber-700 hover:underline">Sanitär</a> ·{" "}
        <a href="/rechner/fliesen" className="text-amber-700 hover:underline">Fliesen</a> ·{" "}
        <a href="/rechner/estrich" className="text-amber-700 hover:underline">Estrich</a>
      </section>
    </div>
  );
}

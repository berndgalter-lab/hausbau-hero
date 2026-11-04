import type { Metadata } from "next";
import { Brotkrumen, JsonLd, brotkrumenLd } from "@/components/Ersatzteile";
import { alleMarken, alleProbleme } from "@/lib/ersatzteile";
import { alleProblemeAllgemein } from "@/lib/probleme-allgemein";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Problemlöser: Spülkasten, Armatur & Co. selbst reparieren",
  description:
    "Spülkasten läuft nach, Armatur tropft, Thermostat wird nicht warm: Ursachen, betroffene Ersatzteile und wann der Installateur ran muss.",
  alternates: { canonical: "https://hausbau-hero.de/problem" },
};

export default async function ProblemUebersicht() {
  const [probleme, marken] = await Promise.all([alleProbleme(), alleMarken()]);
  const markeName = new Map(marken.map((m) => [m.id, m.name]));
  const allgemein = alleProblemeAllgemein();

  return (
    <div className="max-w-4xl">
      <JsonLd daten={brotkrumenLd([{ name: "Start", href: "/" }, { name: "Problemlöser", href: "/problem" }])} />
      <Brotkrumen teile={[{ name: "Start", href: "/" }, { name: "Problemlöser" }]} />
      <h1 className="text-3xl font-bold mb-2">Problemlöser</h1>
      <p className="text-stone-600 mb-8 max-w-2xl">
        Vom Symptom zum passenden Ersatzteil: Ursachen nach Häufigkeit, Prüfschritte und die Grenze, ab der ein
        Installateur sinnvoll ist.
      </p>
      {allgemein.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-3">Für alle Marken</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {allgemein.map((p) => (
              <li key={p.slug}>
                <a href={`/problem/${p.slug}`} className="block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400">
                  <div className="font-semibold">{p.titel}</div>
                  <div className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</div>
                </a>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-10 mb-3">Nach Marke</h2>
        </section>
      )}
      {probleme.length === 0 ? (
        <p className="text-sm text-stone-600">Die ersten Problemlöser werden gerade erfasst.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {probleme.map((p) => (
            <li key={p.id}>
              <a href={`/problem/${p.slug}`} className="block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400">
                {p.marke_id && <div className="text-xs text-stone-500">{markeName.get(p.marke_id)}</div>}
                <div className="font-semibold">{p.titel}</div>
                {p.symptom && <div className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</div>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

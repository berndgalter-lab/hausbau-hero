import type { Metadata } from "next";
import { Brotkrumen, JsonLd, brotkrumenLd } from "@/components/Ersatzteile";
import { alleMarken, alleProbleme } from "@/lib/ersatzteile";
import { alleProblemeAllgemein } from "@/lib/probleme-allgemein";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Problemlöser: Ursache finden und selbst reparieren",
  description:
    "Was funktioniert nicht? Ursachen nach Häufigkeit, Prüfschritte, das passende Ersatzteil und die Grenze, ab der ein Fachbetrieb ran muss.",
  alternates: { canonical: "https://hausbau-hero.de/problem" },
};

export default async function ProblemUebersicht() {
  const [probleme, marken] = await Promise.all([alleProbleme(), alleMarken()]);
  const markeName = new Map(marken.map((m) => [m.id, m.name]));
  const allgemein = alleProblemeAllgemein();

  return (
    <div>
      <JsonLd daten={brotkrumenLd([{ name: "Start", href: "/" }, { name: "Problemlöser", href: "/problem" }])} />
      <Brotkrumen teile={[{ name: "Start", href: "/" }, { name: "Problemlöser" }]} />
      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold">Problemlöser</h1>
      <p className="text-lg text-stone-600 mt-4 mb-12 max-w-2xl leading-relaxed">
        Vom Symptom zum passenden Ersatzteil: Ursachen nach Häufigkeit, Prüfschritte und die Grenze, ab der ein
        Fachbetrieb sinnvoll ist.
      </p>
      {allgemein.length > 0 && (
        <section className="mb-10">
          <h2 className="text-3xl font-semibold leading-tight mb-5">Für alle Marken</h2>
          <ul className="grid grid-cols-1 border-t border-stone-200 sm:grid-cols-2 sm:gap-x-10 [&>li]:border-b [&>li]:border-stone-200">
            {allgemein.map((p) => (
              <li key={p.slug}>
                <a href={`/problem/${p.slug}`} className="group block py-4">
                  <div className="font-semibold text-stone-900 group-hover:text-accent-700">{p.titel}</div>
                  <div className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</div>
                </a>
              </li>
            ))}
          </ul>
          <h2 className="text-3xl font-semibold leading-tight mt-14 mb-5">Nach Marke</h2>
        </section>
      )}
      {probleme.length === 0 ? (
        <p className="text-sm text-stone-600">Die ersten Problemlöser werden gerade erfasst.</p>
      ) : (
        <ul className="grid grid-cols-1 border-t border-stone-200 sm:grid-cols-2 sm:gap-x-10 [&>li]:border-b [&>li]:border-stone-200">
          {probleme.map((p) => (
            <li key={p.id}>
              <a href={`/problem/${p.slug}`} className="group block py-4">
                {p.marke_id && <div className="ueberzeile !text-[0.68rem] text-stone-500 mb-0.5">{markeName.get(p.marke_id)}</div>}
                <div className="font-semibold text-stone-900 group-hover:text-accent-700">{p.titel}</div>
                {p.symptom && <div className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</div>}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

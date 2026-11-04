import NeukaufKasten from "@/components/Neukauf";
import { Brotkrumen, JsonLd, MarkenFragen, Quellen, brotkrumenLd } from "@/components/Ersatzteile";
import { bereichNachSlug, neukaufBereich } from "@/lib/bereiche";
import { alleMarken, alleProbleme } from "@/lib/ersatzteile";
import { neukaufFuerBereich } from "@/lib/neukauf";
import type { ProblemAllgemein } from "@/lib/probleme-allgemein";
import { teilartNachSlug } from "@/lib/teilarten";

const HAEUFIGKEIT_KLASSE: Record<string, string> = {
  häufig: "bg-red-100 text-red-800",
  gelegentlich: "bg-amber-100 text-amber-800",
  selten: "bg-stone-200 text-stone-700",
};

// Markenübergreifende Problemseite (docs/SEITENAUFBAU.md, Abschnitt 4c): Ursachen nach Häufigkeit mit
// Link auf die Teileart, Prüfschritte, Grenze zum Installateur, die Varianten je Marke, Fragen, Neukauf.
export default async function ProblemAllgemeinSeite({ p }: { p: ProblemAllgemein }) {
  const [marken, dbProbleme, neukauf] = await Promise.all([
    alleMarken(),
    alleProbleme(),
    neukaufFuerBereich(neukaufBereich({ bereich: p.bereich, problem: p.slug })),
  ]);
  const markeName = new Map(marken.map((m) => [m.id, m.name]));
  const varianten = p.marken_probleme
    .map((slug) => dbProbleme.find((d) => d.slug === slug))
    .filter((d): d is NonNullable<typeof d> => !!d);
  const bereich = bereichNachSlug(p.bereich);
  const pfad = [
    { name: "Start", href: "/" },
    { name: "Problemlöser", href: "/problem" },
    { name: p.titel, href: `/problem/${p.slug}` },
  ];

  return (
    <div className="max-w-3xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], pfad[1], { name: p.titel }]} />
      <h1 className="text-3xl sm:text-4xl font-bold mb-3">{p.titel}</h1>
      <p className="text-lg text-stone-700 mb-10 leading-relaxed">{p.symptom}</p>

      {p.ursachen.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Die häufigsten Ursachen</h2>
          <ol className="space-y-3">
            {p.ursachen.map((u, i) => {
              const ta = u.teilart ? teilartNachSlug(u.teilart) : null;
              return (
                <li key={u.ursache} className="flex gap-4 p-4 bg-white border border-stone-200 rounded-xl">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-800 text-sm text-white">{i + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-stone-900">{u.ursache}</span>
                      {u.haeufigkeit && (
                        <span className={`text-xs px-2 py-0.5 rounded ${HAEUFIGKEIT_KLASSE[u.haeufigkeit]}`}>{u.haeufigkeit}</span>
                      )}
                    </div>
                    <p className="text-stone-700 leading-relaxed mt-1">{u.erklaerung}</p>
                    {ta && (
                      <a href={`/ersatzteile/${ta.slug}`} className="inline-block mt-2 text-sm font-medium text-amber-700 hover:underline">
                        {ta.name}: Typ und Größe bestimmen →
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {p.pruefen.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">So gehst du vor</h2>
          <ol className="list-decimal pl-5 space-y-2 text-stone-700 leading-relaxed">
            {p.pruefen.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>
      )}

      {p.fachbetrieb_ab && (
        <section className="mb-12 p-4 bg-stone-100 border border-stone-200 rounded-lg text-sm">
          <strong>Ab hier zum Installateur:</strong> {p.fachbetrieb_ab}
        </section>
      )}

      {varianten.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-1">Nach Marke</h2>
          <p className="text-stone-600 mb-4">Mit den passenden Originalteilen und Nummern.</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {varianten.map((v) => (
              <li key={v.slug}>
                <a href={`/problem/${v.slug}`} className="group flex h-full flex-col p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400">
                  {v.marke_id && <span className="text-xs text-stone-500">{markeName.get(v.marke_id)}</span>}
                  <span className="font-semibold text-stone-900 group-hover:text-amber-700">{v.titel}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <MarkenFragen markeName="" fragen={p.fragen} teile={[]} id="fragen" titel={`Häufige Fragen: ${p.titel}`} />

      <NeukaufKasten n={neukauf} />

      {bereich && (
        <p className="mb-8 text-sm">
          <a href={`/bereich/${bereich.slug}`} className="text-amber-700 hover:underline">
            Mehr zu {bereich.name} →
          </a>
        </p>
      )}
      <Quellen urls={p.quellen} zugeklappt />
    </div>
  );
}

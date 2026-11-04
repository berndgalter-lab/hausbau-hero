import NeukaufKasten from "@/components/Neukauf";
import { Brotkrumen, JsonLd, MarkenFragen, Quellen, brotkrumenLd } from "@/components/Ersatzteile";
import { bereichNachSlug, neukaufBereich } from "@/lib/bereiche";
import { alleMarken, alleProbleme } from "@/lib/ersatzteile";
import { neukaufFuerBereich } from "@/lib/neukauf";
import type { ProblemAllgemein } from "@/lib/probleme-allgemein";
import { teilartNachSlug } from "@/lib/teilarten";

const HAEUFIGKEIT_KLASSE: Record<string, string> = {
  häufig: "bg-accent-700 text-white",
  gelegentlich: "bg-accent-100 text-accent-800",
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
      <p className="ueberzeile mb-3">Problemlöser</p>
      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold mb-4">{p.titel}</h1>
      <p className="text-lg text-stone-700 mb-10 leading-relaxed">{p.symptom}</p>

      {p.ursachen.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[1.75rem] font-semibold leading-tight mb-4">Die häufigsten Ursachen</h2>
          <ol className="divide-y divide-stone-200 border-y border-stone-200">
            {p.ursachen.map((u, i) => {
              const ta = u.teilart ? teilartNachSlug(u.teilart) : null;
              return (
                <li key={u.ursache} className="flex gap-4 py-6">
                  <span className="w-7 shrink-0 font-serif text-3xl leading-none text-accent-700">{i + 1}</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-stone-900">{u.ursache}</span>
                      {u.haeufigkeit && (
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${HAEUFIGKEIT_KLASSE[u.haeufigkeit]}`}>{u.haeufigkeit}</span>
                      )}
                    </div>
                    <p className="text-stone-700 leading-relaxed mt-1">{u.erklaerung}</p>
                    {ta && (
                      <a href={`/ersatzteile/${ta.slug}`} className="weiterlink mt-2.5">
                        {ta.name}: Typ und Größe bestimmen
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
          <h2 className="text-[1.75rem] font-semibold leading-tight mb-4">So gehst du vor</h2>
          <ol className="list-decimal pl-6 space-y-3 text-stone-700 leading-relaxed marker:font-semibold marker:text-accent-700">
            {p.pruefen.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ol>
        </section>
      )}

      {p.fachbetrieb_ab && (
        <section className="mb-12 flex gap-3 rounded-xl bg-stone-100 px-5 py-4 text-[0.938rem] leading-relaxed text-stone-800">
          <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-stone-900 text-xs font-bold text-white">!</span>
          <span><strong>Ab hier zum Installateur:</strong> {p.fachbetrieb_ab}</span>
        </section>
      )}

      {varianten.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[1.75rem] font-semibold leading-tight mb-1">Nach Marke</h2>
          <p className="text-stone-600 mb-4">Mit den passenden Originalteilen und Nummern.</p>
          <ul className="grid grid-cols-1 border-t border-stone-200 sm:grid-cols-2 sm:gap-x-10 [&>li]:border-b [&>li]:border-stone-200">
            {varianten.map((v) => (
              <li key={v.slug}>
                <a href={`/problem/${v.slug}`} className="group flex h-full flex-col py-4">
                  {v.marke_id && <span className="text-xs text-stone-500">{markeName.get(v.marke_id)}</span>}
                  <span className="font-semibold text-stone-900 group-hover:text-accent-700">{v.titel}</span>
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
          <a href={`/bereich/${bereich.slug}`} className="weiterlink">
            Mehr zu {bereich.name}
          </a>
        </p>
      )}
      <Quellen urls={[...p.quellen, ...p.fragen.flatMap((f) => f.quellen)]} zugeklappt />
    </div>
  );
}

import type { Metadata } from "next";
import NeukaufKasten from "@/components/Neukauf";
import ProblemAllgemeinSeite from "@/components/ProblemAllgemeinSeite";
import { alleProblemeAllgemein, problemAllgemeinNachSlug } from "@/lib/probleme-allgemein";
import { neukaufFuerBereich } from "@/lib/neukauf";
import { neukaufBereich } from "@/lib/bereiche";
import { notFound } from "next/navigation";
import { Brotkrumen, JsonLd, KaufButton, Quellen, brotkrumenLd } from "@/components/Ersatzteile";
import { SITE_URL, angeboteFuerTeile, markeNachId, problemNachSlug, teileNachSlugs } from "@/lib/ersatzteile";
import { TeileKasten } from "@/components/ProblemTeile";

export const revalidate = 3600;

// Leere Liste: Pfade werden nicht beim Build erzeugt, sondern beim ersten Aufruf gerendert und dann gecacht (ISR).
export function generateStaticParams() {
  return [];
}

type Props = { params: { slug: string } };

const HAEUFIGKEIT_KLASSE: Record<string, string> = {
  häufig: "bg-accent-700 text-white",
  gelegentlich: "bg-accent-100 text-accent-800",
  selten: "bg-stone-200 text-stone-700",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Markenübergreifende Probleme stehen im Repo (data/probleme), die je Marke in der Datenbank.
  const a = problemAllgemeinNachSlug(params.slug);
  if (a) {
    const url = `${SITE_URL}/problem/${a.slug}`;
    return {
      title: a.seo_title,
      description: a.seo_description,
      alternates: { canonical: url },
      openGraph: { title: a.seo_title, description: a.seo_description, url },
    };
  }
  const p = await problemNachSlug(params.slug);
  if (!p) return {};
  const title = `${p.titel}: Ursachen & passende Ersatzteile`;
  const description = p.symptom ?? `${p.titel}: Ursachen, Prüfschritte und passende Ersatzteile.`;
  const url = `${SITE_URL}/problem/${p.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function ProblemSeite({ params }: Props) {
  const a = problemAllgemeinNachSlug(params.slug);
  if (a) return <ProblemAllgemeinSeite p={a} />;
  const p = await problemNachSlug(params.slug);
  if (!p) notFound();
  const marke = p.marke_id ? await markeNachId(p.marke_id) : null;
  const [teile, neukauf] = await Promise.all([
    teileNachSlugs(Array.from(new Set(p.ursachen.flatMap((u) => u.teil_slugs ?? [])))),
    neukaufFuerBereich(neukaufBereich({ problem: p.slug })),
  ]);
  const teilVon = new Map(teile.map((t) => [t.slug, t]));
  // Die Teile der Ursachen in deren Reihenfolge, für den Kasten oben (die häufigste Ursache steht zuerst).
  const wahrscheinlich = Array.from(new Set(p.ursachen.flatMap((u) => u.teil_slugs ?? [])))
    .map((slug) => teilVon.get(slug))
    .filter((t): t is NonNullable<typeof t> => !!t)
    .slice(0, 3);
  const angebote = await angeboteFuerTeile(wahrscheinlich.map((t) => t.id));
  // Die markenübergreifende Seite, die diese Markenvariante aufführt.
  const oben = alleProblemeAllgemein().find((x) => x.marken_probleme.includes(p.slug));

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
      {oben && (
        <p className="mb-4 text-sm">
          <a href={`/problem/${oben.slug}`} className="weiterlink">
            Für alle Marken: {oben.titel}
          </a>
        </p>
      )}
      {p.symptom && <p className="text-lg text-stone-700 mb-10 leading-relaxed">{p.symptom}</p>}

      {marke && <TeileKasten teile={wahrscheinlich} angebote={angebote} marke={marke.slug} />}

      {p.ursachen.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[1.75rem] font-semibold leading-tight mb-4">Mögliche Ursachen</h2>
          <ol className="divide-y divide-stone-200 border-y border-stone-200">
            {p.ursachen.map((u, i) => (
              <li key={i} className="flex gap-4 py-6">
                <span className="w-7 shrink-0 font-serif text-3xl leading-none text-accent-700">{i + 1}</span>
                <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-stone-900">{u.ursache}</span>
                  {u.haeufigkeit && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${HAEUFIGKEIT_KLASSE[u.haeufigkeit] ?? "bg-stone-100"}`}>{u.haeufigkeit}</span>
                  )}
                </div>
                {(u.teil_slugs ?? []).map((slug) => {
                  const t = teilVon.get(slug);
                  if (!t || !marke) return null;
                  return (
                    <div key={slug} className="mt-2.5 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm">
                      <a href={`/teil/${t.slug}`} className="flex-1 text-stone-800 underline decoration-stone-300 underline-offset-2 hover:text-accent-700 hover:decoration-accent-400">
                        {t.name}{t.oem_nummer && ` (${t.oem_nummer})`}
                      </a>
                      <KaufButton teil={t} />
                    </div>
                  );
                })}
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.schritte.length > 0 && (
        <section className="mb-12">
          <h2 className="text-[1.75rem] font-semibold leading-tight mb-4">So gehst du vor</h2>
          <ol className="list-decimal pl-6 space-y-3 text-stone-700 leading-relaxed marker:font-semibold marker:text-accent-700">
            {p.schritte.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </section>
      )}

      <NeukaufKasten n={neukauf} />

      {p.fachbetrieb_ab && (
        <section className="mb-12 flex gap-3 rounded-xl bg-stone-100 px-5 py-4 text-[0.938rem] leading-relaxed text-stone-800">
          <span aria-hidden className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-stone-900 text-xs font-bold text-white">!</span>
          <span><strong>Ab hier zum Installateur:</strong> {p.fachbetrieb_ab}</span>
        </section>
      )}

      {marke && (
        <p className="text-sm">
          <a href={`/ersatzteile/${marke.slug}`} className="weiterlink">Alle {marke.name}-Ersatzteile</a>
        </p>
      )}
      <Quellen urls={p.quellen} zugeklappt />
    </div>
  );
}

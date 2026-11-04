import type { Metadata } from "next";
import NeukaufKasten from "@/components/Neukauf";
import { neukaufFuerBereich } from "@/lib/neukauf";
import { neukaufBereich } from "@/lib/bereiche";
import { notFound } from "next/navigation";
import { Brotkrumen, JsonLd, KaufButton, Quellen, brotkrumenLd } from "@/components/Ersatzteile";
import { SITE_URL, markeNachId, problemNachSlug, teileNachSlugs } from "@/lib/ersatzteile";

export const revalidate = 3600;

type Props = { params: { slug: string } };

const HAEUFIGKEIT_KLASSE: Record<string, string> = {
  häufig: "bg-red-100 text-red-800",
  gelegentlich: "bg-amber-100 text-amber-800",
  selten: "bg-stone-200 text-stone-700",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await problemNachSlug(params.slug);
  if (!p) return {};
  const title = `${p.titel}: Ursachen & passende Ersatzteile`;
  const description = p.symptom ?? `${p.titel}: Ursachen, Prüfschritte und passende Ersatzteile.`;
  const url = `${SITE_URL}/problem/${p.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function ProblemSeite({ params }: Props) {
  const p = await problemNachSlug(params.slug);
  if (!p) notFound();
  const marke = p.marke_id ? await markeNachId(p.marke_id) : null;
  const [teile, neukauf] = await Promise.all([
    teileNachSlugs(Array.from(new Set(p.ursachen.flatMap((u) => u.teil_slugs ?? [])))),
    neukaufFuerBereich(neukaufBereich({ problem: p.slug })),
  ]);
  const teilVon = new Map(teile.map((t) => [t.slug, t]));

  const pfad = [
    { name: "Start", href: "/" },
    { name: "Problemlöser", href: "/problem" },
    { name: p.titel, href: `/problem/${p.slug}` },
  ];

  return (
    <div className="max-w-3xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], pfad[1], { name: p.titel }]} />
      <h1 className="text-3xl font-bold mb-3">{p.titel}</h1>
      {p.symptom && <p className="text-stone-700 mb-8 leading-relaxed">{p.symptom}</p>}

      {p.ursachen.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">Mögliche Ursachen</h2>
          <ol className="space-y-3">
            {p.ursachen.map((u, i) => (
              <li key={i} className="p-4 bg-white border border-stone-200 rounded-lg">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{u.ursache}</span>
                  {u.haeufigkeit && (
                    <span className={`text-xs px-2 py-0.5 rounded ${HAEUFIGKEIT_KLASSE[u.haeufigkeit] ?? "bg-stone-100"}`}>{u.haeufigkeit}</span>
                  )}
                </div>
                {(u.teil_slugs ?? []).map((slug) => {
                  const t = teilVon.get(slug);
                  if (!t || !marke) return null;
                  return (
                    <div key={slug} className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                      <a href={`/teil/${t.slug}`} className="flex-1 text-amber-700 hover:underline">
                        {t.name}{t.oem_nummer && ` (${t.oem_nummer})`}
                      </a>
                      <KaufButton teil={t} />
                    </div>
                  );
                })}
              </li>
            ))}
          </ol>
        </section>
      )}

      {p.schritte.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-3">So gehst du vor</h2>
          <ol className="list-decimal pl-5 space-y-2 text-stone-700">
            {p.schritte.map((s, i) => <li key={i}>{s}</li>)}
          </ol>
        </section>
      )}

      <NeukaufKasten n={neukauf} />

      {p.fachbetrieb_ab && (
        <section className="mb-8 p-4 bg-stone-100 border border-stone-200 rounded-lg text-sm">
          <strong>Ab hier zum Installateur:</strong> {p.fachbetrieb_ab}
        </section>
      )}

      {marke && (
        <p className="text-sm">
          <a href={`/ersatzteile/${marke.slug}`} className="text-amber-700 hover:underline">Alle {marke.name}-Ersatzteile →</a>
        </p>
      )}
      <Quellen urls={p.quellen} />
    </div>
  );
}

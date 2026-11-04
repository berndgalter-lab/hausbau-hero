import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BereichBild from "@/components/BereichBild";
import { BereichKachel, RatgeberKarten } from "@/components/Bereich";
import { Brotkrumen, JsonLd, brotkrumenLd } from "@/components/Ersatzteile";
import { BEREICHE, TEILTYP_SUCHWORT, bereichNachSlug } from "@/lib/bereiche";
import { bereichDaten, bereichIstDuenn, sichtbareBereiche } from "@/lib/bereiche-daten";
import { PRODUKTTYP_LABEL, SITE_URL, TEILTYP_LABEL } from "@/lib/ersatzteile";

export const revalidate = 3600;

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BEREICHE.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const b = bereichNachSlug(params.slug);
  if (!b) return {};
  const title = `${b.name}: Ersatzteile, Probleme und Ratgeber`;
  const description = `${b.kurz} Passende Ersatzteile nach Marke und Modell, Ursachen finden und das richtige Produkt wählen.`;
  const url = `${SITE_URL}/bereich/${b.slug}`;
  const duenn = bereichIstDuenn(b, await bereichDaten(b));
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    ...(duenn ? { robots: { index: false, follow: true } } : {}),
  };
}

function Abschnitt({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4">{titel}</h2>
      {children}
    </section>
  );
}

// Bereichsseite (docs/SEITENAUFBAU.md, Abschnitt 2a): was an dieser Stelle im Haus kaputtgeht,
// welche Marken und Modelle wir haben, welche Teile gesucht werden, und die Ratgeber zum Neukauf.
export default async function BereichSeite({ params }: Props) {
  const b = bereichNachSlug(params.slug);
  if (!b) notFound();
  const [d, sichtbar] = await Promise.all([bereichDaten(b), sichtbareBereiche()]);
  if (!sichtbar.some((x) => x.slug === b.slug)) notFound();

  const serienJeMarke = d.marken.map((m) => ({
    marke: m,
    serien: d.serien.filter((s) => s.marke_id === m.id),
  }));
  const pfad = [
    { name: "Start", href: "/" },
    { name: b.name, href: `/bereich/${b.slug}` },
  ];
  const andere = sichtbar.filter((x) => x.slug !== b.slug);

  return (
    <div className="max-w-4xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], { name: b.name }]} />

      <header className="mb-10 flex flex-col sm:flex-row gap-5 sm:items-center">
        <span className="text-stone-700 shrink-0">
          <BereichBild slug={b.slug} className="h-20 w-20" />
        </span>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{b.name}</h1>
          <p className="text-lg text-stone-700 leading-relaxed max-w-2xl">{b.einleitung}</p>
        </div>
      </header>

      {(d.probleme.length > 0 || d.allgemeineProbleme.length > 0) && (
        <Abschnitt titel="Was ist kaputt?">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {d.allgemeineProbleme.map((p) => (
              <li key={p.slug}>
                <a href={`/problem/${p.slug}`} className="group flex h-full flex-col p-4 bg-white border border-amber-200 rounded-xl hover:border-amber-400">
                  <span className="text-xs text-stone-500">Für alle Marken</span>
                  <span className="font-semibold text-stone-900 group-hover:text-amber-700">{p.titel}</span>
                  <span className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</span>
                </a>
              </li>
            ))}
            {d.probleme.map((p) => (
              <li key={p.id}>
                <a href={`/problem/${p.slug}`} className="group flex h-full flex-col p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400">
                  <span className="font-semibold text-stone-900 group-hover:text-amber-700">{p.titel}</span>
                  {p.symptom && <span className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</span>}
                </a>
              </li>
            ))}
          </ul>
        </Abschnitt>
      )}

      {d.teilarten.length > 0 && (
        <Abschnitt titel="Teile erklärt">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {d.teilarten.map((t) => (
              <li key={t.slug}>
                <a href={`/ersatzteile/${t.slug}`} className="group flex h-full flex-col p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400">
                  <span className="font-semibold text-stone-900 group-hover:text-amber-700">{t.titel}</span>
                  <span className="text-sm text-stone-600 mt-1 line-clamp-2">{t.seo_description}</span>
                </a>
              </li>
            ))}
          </ul>
        </Abschnitt>
      )}

      {d.teile.length > 0 && (
        <Abschnitt titel="Häufig gesuchte Teile">
          <ul className="flex flex-wrap gap-2">
            {d.teile.map((t) => (
              <li key={t.teiltyp}>
                <a
                  href={`/ersatzteile?q=${encodeURIComponent(TEILTYP_SUCHWORT[t.teiltyp] ?? TEILTYP_LABEL[t.teiltyp] ?? t.teiltyp)}`}
                  className="inline-block px-4 py-2 bg-white border border-stone-200 rounded-full text-stone-800 hover:border-amber-400 hover:text-amber-700"
                >
                  {TEILTYP_LABEL[t.teiltyp] ?? t.teiltyp} <span className="text-stone-400">{t.anzahl}</span>
                </a>
              </li>
            ))}
          </ul>
        </Abschnitt>
      )}

      {serienJeMarke.length > 0 && (
        <Abschnitt titel="Ersatzteile nach Marke und Modell">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {serienJeMarke.map(({ marke, serien }) => (
              <div key={marke.id} className="p-4 bg-white border border-stone-200 rounded-xl">
                <a href={`/ersatzteile/${marke.slug}`} className="font-semibold text-stone-900 hover:text-amber-700">
                  {marke.name} →
                </a>
                <p className="text-xs text-stone-500 mt-0.5">
                  {Array.from(new Set(serien.map((s) => PRODUKTTYP_LABEL[s.produkttyp] ?? s.produkttyp))).join(", ")}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {serien.slice(0, 8).map((s) => (
                    <li key={s.id}>
                      <a
                        href={`/ersatzteile/${marke.slug}/${s.slug}`}
                        className="inline-block px-2.5 py-1 text-sm bg-stone-100 rounded-full text-stone-700 hover:bg-amber-100 hover:text-amber-800"
                      >
                        {s.name.replace(new RegExp(`^${marke.name}\\s+`, "i"), "")}
                      </a>
                    </li>
                  ))}
                  {serien.length > 8 && (
                    <li>
                      <a href={`/ersatzteile/${marke.slug}#modelle`} className="inline-block px-2.5 py-1 text-sm text-amber-700 hover:underline">
                        alle {serien.length}
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </Abschnitt>
      )}

      {d.ratgeber.length > 0 && (
        <Abschnitt titel="Neu kaufen: welches Produkt passt?">
          <RatgeberKarten liste={d.ratgeber} />
        </Abschnitt>
      )}

      <Abschnitt titel="Andere Bereiche">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {andere.map((x) => (
            <BereichKachel key={x.slug} b={x} />
          ))}
        </div>
      </Abschnitt>
    </div>
  );
}

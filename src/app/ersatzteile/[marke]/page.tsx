import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeilBild from "@/components/TeilBild";
import {
  Brotkrumen,
  GuenstigstesAngebot,
  JsonLd,
  KaufButton,
  Quellen,
  Widersprueche,
  brotkrumenLd,
} from "@/components/Ersatzteile";
import {
  PRODUKTTYP_LABEL,
  SITE_URL,
  TEILTYP_LABEL,
  angeboteFuerTeile,
  baujahre,
  gruppiere,
  markeNachSlug,
  problemeDerMarke,
  serienDerMarke,
  teileDerMarke,
  widerspruecheDerMarke,
} from "@/lib/ersatzteile";

export const revalidate = 3600;

type Props = { params: { marke: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const marke = await markeNachSlug(params.marke);
  if (!marke) return {};
  // Womo-Teile-Erfahrung: "<Marke> Ersatzteile/Ersatzteilkatalog" ist der Suchbegriff, die Artikelnummer der Mehrwert.
  const title = `${marke.name} Ersatzteile: Teile mit Artikelnummer finden`;
  const description = `${marke.name} Ersatzteile nach Serie: welches Teil passt zu deinem Modell – mit Originalnummer, Quelle und Einbau-Hinweisen.`;
  const url = `${SITE_URL}/ersatzteile/${marke.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function MarkenHub({ params }: Props) {
  const marke = await markeNachSlug(params.marke);
  if (!marke) notFound();

  const [serien, teile, probleme, widersprueche] = await Promise.all([
    serienDerMarke(marke.id),
    teileDerMarke(marke.id),
    problemeDerMarke(marke.id),
    widerspruecheDerMarke(marke.id),
  ]);

  const serienGruppen = gruppiere(serien, (s) => s.produkttyp);
  const teileGruppen = gruppiere(teile, (t) => t.teiltyp);
  const angebote = await angeboteFuerTeile(teile.map((t) => t.id));
  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ersatzteile", href: "/ersatzteile" },
    { name: marke.name, href: `/ersatzteile/${marke.slug}` },
  ];

  return (
    <div className="max-w-4xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <JsonLd
        daten={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${marke.name} Ersatzteile`,
          url: `${SITE_URL}/ersatzteile/${marke.slug}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: serien.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.name,
              url: `${SITE_URL}/ersatzteile/${marke.slug}/${s.slug}`,
            })),
          },
        }}
      />
      <Brotkrumen teile={[pfad[0], pfad[1], { name: marke.name }]} />

      <h1 className="text-3xl font-bold mb-3">{marke.name} Ersatzteile</h1>
      {marke.beschreibung && <p className="text-stone-700 mb-6 leading-relaxed">{marke.beschreibung}</p>}

      {marke.nummer_hinweis && (
        <section className="mb-10 p-5 bg-white border border-stone-200 rounded-xl">
          <h2 className="text-lg font-bold mb-2">Wo steht die Artikelnummer?</h2>
          <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">{marke.nummer_hinweis}</p>
          {(marke.ersatzteil_garantie || marke.hersteller_ersatzteil_url) && (
            <p className="text-sm text-stone-600 mt-3">
              {marke.ersatzteil_garantie}
              {marke.hersteller_ersatzteil_url && (
                <>
                  {" "}
                  <a href={marke.hersteller_ersatzteil_url} target="_blank" rel="nofollow noopener noreferrer" className="text-amber-700 hover:underline">
                    Ersatzteilsuche von {marke.name}
                  </a>
                </>
              )}
            </p>
          )}
        </section>
      )}

      {serienGruppen.map(([typ, liste]) => (
        <section key={typ} className="mb-10">
          <h2 className="text-xl font-bold mb-4">{marke.name} {PRODUKTTYP_LABEL[typ] ?? typ}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {liste.map((s) => (
              <a
                key={s.id}
                href={`/ersatzteile/${marke.slug}/${s.slug}`}
                className="group block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400 transition-all"
              >
                <div className="font-semibold group-hover:text-amber-700">{s.name}</div>
                <div className="text-xs text-stone-500 mt-1">
                  {[baujahre(s), s.kennnummern.slice(0, 3).join(", ")].filter(Boolean).join(" · ")}
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}

      {teileGruppen.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Alle {marke.name}-Teile nach Art</h2>
          {teileGruppen.map(([typ, liste]) => (
            <div key={typ} className="mb-6">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">{TEILTYP_LABEL[typ] ?? typ}</h3>
              <ul className="divide-y divide-stone-100 bg-white border border-stone-200 rounded-lg">
                {liste.map((t) => (
                  <li key={t.id} className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3">
                    <div className="flex-1 flex items-center gap-3">
                      <TeilBild url={t.bild_url} alt={t.name} groesse={48} />
                      <div>
                        <a href={`/teil/${t.slug}`} className="font-medium hover:text-amber-700">{t.name}</a>
                        {t.oem_nummer && <span className="text-xs text-stone-500 ml-2">Nr. {t.oem_nummer}</span>}
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <KaufButton teil={t} markeName={marke.name} klein />
                      <GuenstigstesAngebot teil={t} angebote={angebote} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {probleme.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">Häufige Probleme</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {probleme.map((p) => (
              <li key={p.id}>
                <a href={`/problem/${p.slug}`} className="block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400">
                  <div className="font-semibold">{p.titel}</div>
                  {p.symptom && <div className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</div>}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <Widersprueche liste={widersprueche} />
      <Quellen urls={marke.quellen} />
    </div>
  );
}

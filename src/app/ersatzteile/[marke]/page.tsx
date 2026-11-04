import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeilBild from "@/components/TeilBild";
import { Brotkrumen, JsonLd, Quellen, Widersprueche, brotkrumenLd } from "@/components/Ersatzteile";
import {
  PRODUKTTYP_LABEL,
  SITE_URL,
  TEILTYP_LABEL,
  angeboteFuerTeile,
  baujahre,
  formatEuro,
  gruppiere,
  markeNachSlug,
  problemeDerMarke,
  serienDerMarke,
  teileDerMarke,
  widerspruecheDerMarke,
  zeigePreis,
  zuordnungenFuerSerien,
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

function Schritt({ nr, titel, id, children }: { nr: number; titel: string; id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="flex items-center gap-3 text-xl font-bold mb-4">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-800 text-sm text-white">{nr}</span>
        {titel}
      </h2>
      {children}
    </section>
  );
}

// Aufbau nach docs/SEITENAUFBAU.md, Abschnitt 4: ein Weg in drei Schritten (Nummer finden, Serie
// wählen, Teil bestellen), dazu Probleme und Verwechslungsgefahren. Gekauft wird auf der Teil-Seite.
export default async function MarkenHub({ params }: Props) {
  const marke = await markeNachSlug(params.marke);
  if (!marke) notFound();

  const [serien, teile, probleme, widersprueche] = await Promise.all([
    serienDerMarke(marke.id),
    teileDerMarke(marke.id),
    problemeDerMarke(marke.id),
    widerspruecheDerMarke(marke.id),
  ]);
  const [zuordnungen, angebote] = await Promise.all([
    zuordnungenFuerSerien(serien.map((s) => s.id)),
    angeboteFuerTeile(teile.map((t) => t.id)),
  ]);

  const teileJeSerie = new Map<string, number>();
  for (const z of zuordnungen) teileJeSerie.set(z.serie_id, (teileJeSerie.get(z.serie_id) ?? 0) + 1);
  const guenstigstes = new Map<string, number>();
  for (const a of angebote) {
    if (!zeigePreis(a)) continue;
    const bisher = guenstigstes.get(a.teil_id);
    if (bisher === undefined || a.preis! < bisher) guenstigstes.set(a.teil_id, a.preis!);
  }

  const serienGruppen = gruppiere(serien, (s) => s.produkttyp);
  const teileGruppen = gruppiere(teile, (t) => t.teiltyp);
  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ersatzteile", href: "/ersatzteile" },
    { name: marke.name, href: `/ersatzteile/${marke.slug}` },
  ];

  const wegweiser = [
    { href: "#nummer", titel: "Nummer finden", text: "Wo sie steht und wie sie aussieht" },
    { href: "#serien", titel: "Serie wählen", text: `${serien.length} Serien mit passenden Teilen` },
    { href: "#teile", titel: "Teil bestellen", text: `${teile.length} Teile mit Originalnummer` },
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

      <h1 className="text-3xl font-bold mb-3">{marke.name} Ersatzteile finden</h1>
      {marke.beschreibung && <p className="text-stone-700 mb-6 leading-relaxed max-w-3xl">{marke.beschreibung}</p>}

      <ol className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {wegweiser.map((w, i) => (
          <li key={w.href}>
            <a href={w.href} className="flex h-full gap-3 p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-800 text-xs text-white">{i + 1}</span>
              <span>
                <span className="block font-semibold text-stone-900">{w.titel}</span>
                <span className="block text-sm text-stone-500">{w.text}</span>
              </span>
            </a>
          </li>
        ))}
      </ol>

      <form action="/ersatzteile" method="get" role="search" className="flex gap-2 max-w-xl mb-12">
        <label htmlFor="q" className="sr-only">Artikelnummer oder Teil</label>
        <input id="q" name="q" type="search" placeholder={`${marke.name}-Nummer oder Teil, z. B. ${teile[0]?.oem_nummer ?? "Kartusche"}`}
          className="flex-1 px-4 py-2 border border-stone-300 rounded-lg text-sm focus:outline-none focus:border-amber-500" />
        <button type="submit" className="px-4 py-2 bg-stone-800 text-white text-sm font-semibold rounded-lg hover:bg-stone-900">
          Suchen
        </button>
      </form>

      {probleme.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-1">Etwas ist kaputt?</h2>
          <p className="text-sm text-stone-600 mb-4">Erst die Ursache finden, dann das Teil. Die häufigsten Fälle:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {probleme.map((p) => (
              <li key={p.id}>
                <a href={`/problem/${p.slug}`} className="block h-full p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400">
                  <div className="font-semibold">{p.titel}</div>
                  {p.symptom && <div className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</div>}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {marke.nummer_hinweis && (
        <Schritt nr={1} titel="Die Artikelnummer finden" id="nummer">
          <div className="p-5 bg-white border border-stone-200 rounded-xl">
            <p className="text-stone-700 leading-relaxed whitespace-pre-line">{marke.nummer_hinweis}</p>
            {marke.hersteller_ersatzteil_url && (
              <p className="text-sm mt-3">
                <a href={marke.hersteller_ersatzteil_url} target="_blank" rel="nofollow noopener noreferrer" className="text-amber-700 hover:underline">
                  Ersatzteilsuche von {marke.name} →
                </a>
              </p>
            )}
          </div>
        </Schritt>
      )}

      <Schritt nr={2} titel="Die Serie wählen" id="serien">
        {serienGruppen.map(([typ, liste]) => (
          <div key={typ} className="mb-6">
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">{PRODUKTTYP_LABEL[typ] ?? typ}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {liste.map((s) => {
                const anzahl = teileJeSerie.get(s.id) ?? 0;
                return (
                  <a key={s.id} href={`/ersatzteile/${marke.slug}/${s.slug}`}
                    className="group block p-4 bg-white border border-stone-200 rounded-lg hover:border-amber-400 transition-all">
                    <div className="font-semibold group-hover:text-amber-700">{s.name}</div>
                    <div className="text-xs text-stone-500 mt-1">
                      {[
                        anzahl > 0 ? `${anzahl} ${anzahl === 1 ? "Teil" : "Teile"}` : null,
                        baujahre(s),
                        s.kennnummern.length > 0 ? `Nr. ${s.kennnummern.slice(0, 3).join(", ")}` : null,
                      ].filter(Boolean).join(" · ")}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </Schritt>

      <Widersprueche liste={widersprueche} id="verwechslung" />

      {teileGruppen.length > 0 && (
        <Schritt nr={3} titel="Das Teil bestellen" id="teile">
          <p className="text-sm text-stone-600 mb-4">
            Auf der Seite jedes Teils stehen Maße, die Serien, in die es passt, und wo es erhältlich ist. Vergleiche vor
            dem Bestellen die Nummer auf dem alten Teil.
          </p>
          {teileGruppen.map(([typ, liste]) => (
            <div key={typ} className="mb-6">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-2">{TEILTYP_LABEL[typ] ?? typ}</h3>
              <ul className="divide-y divide-stone-100 bg-white border border-stone-200 rounded-lg">
                {liste.map((t) => {
                  const preis = guenstigstes.get(t.id);
                  return (
                    <li key={t.id}>
                      <a href={`/teil/${t.slug}`} className="flex items-center gap-3 px-4 py-2.5 hover:bg-stone-50">
                        <TeilBild url={t.bild_url} alt={t.name} groesse={40} />
                        <span className="w-20 shrink-0 font-mono text-xs text-stone-500">{t.oem_nummer ?? "–"}</span>
                        <span className="flex-1 text-sm font-medium text-stone-800">{t.name}</span>
                        {preis !== undefined && (
                          <span className="hidden sm:block text-xs text-stone-500 whitespace-nowrap">ab {formatEuro(preis)}</span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Schritt>
      )}

      {marke.ersatzteil_garantie && (
        <section className="mb-10 p-5 bg-stone-50 border border-stone-200 rounded-xl">
          <h2 className="text-lg font-bold mb-2">Garantie und Ersatzteil-Verfügbarkeit</h2>
          <p className="text-sm text-stone-700 leading-relaxed">{marke.ersatzteil_garantie}</p>
        </section>
      )}

      <Quellen urls={marke.quellen} />
    </div>
  );
}

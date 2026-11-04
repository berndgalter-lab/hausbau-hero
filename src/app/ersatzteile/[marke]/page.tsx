import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeilBild from "@/components/TeilBild";
import TeilartSeite from "@/components/TeilartSeite";
import { teilartNachSlug } from "@/lib/teilarten";
import { Absaetze, Brotkrumen, JsonLd, MarkenFragen, Quellen, Widersprueche, brotkrumenLd } from "@/components/Ersatzteile";
import {
  PRODUKTTYP_LABEL,
  SITE_URL,
  TEILTYP_LABEL,
  angeboteFuerTeile,
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
  // /ersatzteile/<teilart> (Eckventil, Perlator …) und /ersatzteile/<marke> teilen sich die Route.
  // Die Prüfregel stellt sicher, dass kein Marken-Slug wie eine Teileart heißt.
  const ta = teilartNachSlug(params.marke);
  if (ta) {
    const url = `${SITE_URL}/ersatzteile/${ta.slug}`;
    return {
      title: ta.seo_title,
      description: ta.seo_description,
      alternates: { canonical: url },
      openGraph: { title: ta.seo_title, description: ta.seo_description, url },
    };
  }
  const marke = await markeNachSlug(params.marke);
  if (!marke) return {};
  // Womo-Teile-Erfahrung: "<Marke> Ersatzteile/Ersatzteilkatalog" ist der Suchbegriff, die Artikelnummer der Mehrwert.
  const title = `${marke.name} Ersatzteile: Teile mit Artikelnummer finden`;
  const description = `${marke.name} Ersatzteile nach Modell und Art: welches Teil passt zu deinem Modell, mit Originalnummer und Einbau-Hinweisen.`;
  const url = `${SITE_URL}/ersatzteile/${marke.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

/** Auf der Marken-Seite ohne Markennamen vorne und ohne Nummer in Klammern hinten: Die Nummer steht darunter. */
function kurzname(name: string, marke: string, nummer?: string | null): string {
  let n = name.startsWith(`${marke} `) ? name.slice(marke.length + 1) : name;
  if (nummer) n = n.replace(` (${nummer})`, "");
  return n;
}

function Abschnitt({ id, titel, intro, children }: { id: string; titel: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-20">
      <h2 className="text-2xl font-bold mb-2">{titel}</h2>
      {intro && <p className="text-stone-600 max-w-2xl">{intro}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

// Aufbau nach docs/SEITENAUFBAU.md, Abschnitt 4: oben Suche und Sprungmarken zu den Einstiegen
// (Problem, Nummer, Modell, Teileart), darunter die Abschnitte in dieser Reihenfolge.
// Kein Link zum Hersteller-Shop; gekauft wird auf der Teil-Seite.
export default async function MarkenHub({ params }: Props) {
  const ta = teilartNachSlug(params.marke);
  if (ta) return <TeilartSeite ta={ta} />;
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

  const serienGruppen = gruppiere(serien, (s) => s.produkttyp).sort(([, la], [, lb]) => lb.length - la.length);
  // Große Gruppen zuerst, "Weitere Teile" und Werkzeug ans Ende.
  const rang = (typ: string) => (typ === "werkzeug" ? 2 : typ === "sonstiges" ? 1 : 0);
  const teileGruppen = gruppiere(teile, (t) => t.teiltyp).sort(
    ([a, la], [b, lb]) => rang(a) - rang(b) || lb.length - la.length,
  );
  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ersatzteile", href: "/ersatzteile" },
    { name: marke.name, href: `/ersatzteile/${marke.slug}` },
  ];
  const fragen = marke.fragen ?? [];
  const beispielNummer = teile.find((t) => t.oem_nummer)?.oem_nummer;
  const beispielArt = teileGruppen[0] && TEILTYP_LABEL[teileGruppen[0][0]];

  const sprungmarken = [
    probleme.length > 0 && { href: "#probleme", text: "Etwas ist kaputt" },
    marke.nummer_hinweis && { href: "#nummer", text: "Nummer finden" },
    serien.length > 0 && { href: "#modelle", text: `Nach Modell (${serien.length})` },
    teile.length > 0 && { href: "#teile", text: `Nach Art (${teile.length})` },
    fragen.length > 0 && { href: "#fragen", text: `Fragen (${fragen.length})` },
    widersprueche.length > 0 && { href: "#verwechslung", text: "Verwechslungsgefahr" },
  ].filter((x): x is { href: string; text: string } => !!x);

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

      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{marke.name} Ersatzteile</h1>
        {marke.beschreibung && (
          <Absaetze text={marke.beschreibung} className="text-lg text-stone-700 leading-relaxed max-w-2xl space-y-3" />
        )}

        <form action="/ersatzteile" method="get" role="search" className="mt-6 p-4 sm:p-5 bg-stone-100 rounded-xl">
          <label htmlFor="q" className="block font-semibold text-stone-900 mb-2">
            Du hast schon eine Nummer?
          </label>
          <div className="flex gap-2">
            <input
              id="q"
              name="q"
              type="search"
              placeholder={`z. B. ${beispielNummer ?? "Kartusche"}`}
              className="flex-1 min-w-0 px-4 py-3 bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500"
            />
            <button type="submit" className="px-5 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700">
              Suchen
            </button>
          </div>
          <p className="text-sm text-stone-500 mt-2">
            Nummer vom Teil oder einfach, was du suchst{beispielArt && `, etwa „${beispielArt}“`}.
          </p>
        </form>

        {sprungmarken.length > 1 && (
          <nav aria-label="Auf dieser Seite" className="mt-5 flex flex-wrap gap-2">
            {sprungmarken.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="px-3 py-1.5 text-sm bg-white border border-stone-200 rounded-full text-stone-700 hover:border-amber-400 hover:text-amber-700"
              >
                {s.text}
              </a>
            ))}
          </nav>
        )}
      </header>

      {probleme.length > 0 && (
        <Abschnitt id="probleme" titel="Etwas ist kaputt?" intro="Erst die Ursache finden, dann das passende Teil bestellen.">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {probleme.map((p) => (
              <li key={p.id}>
                <a
                  href={`/problem/${p.slug}`}
                  className="group flex h-full flex-col p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400"
                >
                  <span className="font-semibold text-stone-900 group-hover:text-amber-700">{kurzname(p.titel, marke.name)}</span>
                  {p.symptom && <span className="text-sm text-stone-600 mt-1 line-clamp-2">{p.symptom}</span>}
                  <span className="mt-auto pt-3 text-sm font-medium text-amber-700">Ursache finden →</span>
                </a>
              </li>
            ))}
          </ul>
        </Abschnitt>
      )}

      {marke.nummer_hinweis && (
        <Abschnitt id="nummer" titel="So findest du die richtige Nummer">
          <div className="p-5 sm:p-6 bg-white border border-stone-200 border-l-4 border-l-amber-500 rounded-xl">
            <Absaetze text={marke.nummer_hinweis} className="text-stone-700 leading-relaxed space-y-3 max-w-2xl" />
          </div>
        </Abschnitt>
      )}

      {serien.length > 0 && (
        <Abschnitt id="modelle" titel="Ersatzteile nach Modell" intro="Wähle dein Modell. Auf der Modellseite stehen alle Teile, die dazu passen.">
          {serienGruppen.map(([typ, liste]) => (
            <div key={typ} className="mb-8">
              <h3 className="font-semibold text-stone-900 mb-3">
                {PRODUKTTYP_LABEL[typ] ?? typ} <span className="font-normal text-stone-400">({liste.length})</span>
              </h3>
              <ul className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {liste.map((s) => {
                  const anzahl = teileJeSerie.get(s.id) ?? 0;
                  const nummern = s.kennnummern[0] ? s.kennnummern[0] + (s.kennnummern.length > 1 ? " …" : "") : "";
                  return (
                    <li key={s.id}>
                      <a
                        href={`/ersatzteile/${marke.slug}/${s.slug}`}
                        className="group block h-full px-3 py-2.5 sm:px-4 sm:py-3 bg-white border border-stone-200 rounded-lg hover:border-amber-400"
                      >
                        <span className="block text-sm sm:text-base font-medium text-stone-900 group-hover:text-amber-700">{kurzname(s.name, marke.name)}</span>
                        <span className="block text-xs text-stone-500 mt-0.5 truncate">
                          {anzahl > 0 && `${anzahl} ${anzahl === 1 ? "Teil" : "Teile"}`}
                          {anzahl > 0 && nummern && " · "}
                          {nummern && <span className="font-mono">{nummern}</span>}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Abschnitt>
      )}

      {teileGruppen.length > 0 && (
        <Abschnitt
          id="teile"
          titel="Ersatzteile nach Art"
          intro="Auf der Seite jedes Teils stehen Maße, passende Modelle und wo es das Teil gibt. Vergleiche vor dem Bestellen die Nummer auf dem alten Teil."
        >
          {teileGruppen.length > 2 && (
            <nav aria-label="Teilearten" className="flex flex-wrap gap-2 mb-6">
              {teileGruppen.map(([typ, liste]) => (
                <a
                  key={typ}
                  href={`#art-${typ}`}
                  className="px-3 py-1.5 text-sm bg-stone-100 rounded-full text-stone-700 hover:bg-amber-100 hover:text-amber-800"
                >
                  {TEILTYP_LABEL[typ] ?? typ} <span className="text-stone-400">{liste.length}</span>
                </a>
              ))}
            </nav>
          )}
          {teileGruppen.map(([typ, liste]) => (
            <div key={typ} id={`art-${typ}`} className="mb-8 scroll-mt-20">
              <h3 className="font-semibold text-stone-900 mb-3">
                {TEILTYP_LABEL[typ] ?? typ} <span className="font-normal text-stone-400">({liste.length})</span>
              </h3>
              <ul className="divide-y divide-stone-100 bg-white border border-stone-200 rounded-xl overflow-hidden">
                {liste.map((t) => {
                  const preis = guenstigstes.get(t.id);
                  return (
                    <li key={t.id}>
                      <a href={`/teil/${t.slug}`} className="group flex items-center gap-3 px-4 py-3 hover:bg-stone-50">
                        <TeilBild url={t.bild_url} alt={t.name} groesse={40} />
                        <span className="flex-1 min-w-0">
                          <span className="block text-stone-900 group-hover:text-amber-700">{kurzname(t.name, marke.name, t.oem_nummer)}</span>
                          <span className="block text-xs text-stone-500 mt-0.5">
                            {t.oem_nummer && <span className="font-mono">Nr. {t.oem_nummer}</span>}
                            {t.oem_nummer && preis !== undefined && " · "}
                            {preis !== undefined && <span>ab {formatEuro(preis)}</span>}
                          </span>
                        </span>
                        <span aria-hidden className="text-stone-300 group-hover:text-amber-600">›</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Abschnitt>
      )}

      <MarkenFragen markeName={marke.name} fragen={fragen} teile={teile} id="fragen" />

      <Widersprueche liste={widersprueche} id="verwechslung" />

      {marke.ersatzteil_garantie && (
        <section className="mb-10 p-5 bg-stone-50 border border-stone-200 rounded-xl">
          <h2 className="text-lg font-bold mb-2">Wie lange gibt es Ersatzteile?</h2>
          <Absaetze text={marke.ersatzteil_garantie} className="text-sm text-stone-700 leading-relaxed space-y-2" />
        </section>
      )}

      <Quellen urls={marke.quellen} zugeklappt />
    </div>
  );
}

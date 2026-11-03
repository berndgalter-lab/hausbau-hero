import type { Metadata } from "next";
import { Brotkrumen, JsonLd, KaufButton, brotkrumenLd } from "@/components/Ersatzteile";
import { TEILTYP_LABEL, alleMarken, sucheTeile, type Marke } from "@/lib/ersatzteile";

export const revalidate = 3600;

type Props = { searchParams: { q?: string } };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const basis: Metadata = {
    title: "Sanitär-Ersatzteile finden: Teile mit Artikelnummer",
    description:
      "Das passende Ersatzteil für Armatur, Spülkasten und Spüle finden – nach Marke und Serie, mit Originalnummer und Quelle.",
    alternates: { canonical: "https://hausbau-hero.de/ersatzteile" },
  };
  // Suchergebnisseiten nicht indexieren (sonst unendlich viele dünne URLs)
  if (searchParams.q) return { ...basis, robots: { index: false, follow: true } };
  return basis;
}

export default async function ErsatzteileUebersicht({ searchParams }: Props) {
  const q = (searchParams.q ?? "").slice(0, 60);
  const [marken, treffer] = await Promise.all([alleMarken(), q ? sucheTeile(q) : Promise.resolve([])]);
  const markeVon = new Map<string, Marke>(marken.map((m) => [m.id, m]));

  return (
    <div>
      <JsonLd daten={brotkrumenLd([{ name: "Start", href: "/" }, { name: "Ersatzteile", href: "/ersatzteile" }])} />
      <Brotkrumen teile={[{ name: "Start", href: "/" }, { name: "Ersatzteile" }]} />

      <h1 className="text-3xl font-bold mb-2">Sanitär-Ersatzteile finden</h1>
      <p className="text-stone-600 mb-6 max-w-2xl">
        Wähle die Marke deiner Armatur oder deines Spülkastens – oder suche direkt nach der Artikelnummer, die auf dem
        alten Teil steht.
      </p>

      <form action="/ersatzteile" method="get" className="flex gap-2 max-w-xl mb-10" role="search">
        <label htmlFor="q" className="sr-only">Artikelnummer oder Teil</label>
        <input
          id="q"
          name="q"
          defaultValue={q}
          placeholder="z. B. 46048000 oder Füllventil"
          className="flex-1 border border-stone-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-amber-500"
        />
        <button className="bg-stone-800 text-white font-semibold px-5 rounded-lg hover:bg-stone-700">Suchen</button>
      </form>

      {q && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-3">
            {treffer.length > 0 ? `${treffer.length} Treffer für „${q}“` : `Kein Treffer für „${q}“`}
          </h2>
          {treffer.length === 0 ? (
            <p className="text-sm text-stone-600">
              Wir haben das Teil noch nicht erfasst. Prüfe die Schreibweise der Nummer oder wähle unten die Marke.
            </p>
          ) : (
            <ul className="divide-y divide-stone-200 bg-white border border-stone-200 rounded-xl">
              {treffer.map((t) => {
                const marke = markeVon.get(t.marke_id);
                return (
                  <li key={t.id} className="flex flex-col sm:flex-row sm:items-center gap-2 px-4 py-3">
                    <div className="flex-1">
                      <a href={`/teil/${t.slug}`} className="font-semibold hover:text-amber-700">{t.name}</a>
                      <div className="text-xs text-stone-500">
                        {marke?.name} · {TEILTYP_LABEL[t.teiltyp] ?? t.teiltyp}
                        {t.oem_nummer && <> · Nr. {t.oem_nummer}</>}
                      </div>
                    </div>
                    {marke && <KaufButton teil={t} markeName={marke.name} klein />}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      <section>
        <h2 className="text-xl font-bold mb-4">Nach Marke</h2>
        {marken.length === 0 ? (
          <p className="text-sm text-stone-600">Die ersten Marken werden gerade erfasst.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {marken.map((m) => (
              <a
                key={m.id}
                href={`/ersatzteile/${m.slug}`}
                className="group block p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-400 hover:shadow-md transition-all"
              >
                <div className="text-lg font-semibold group-hover:text-amber-700">{m.name} Ersatzteile</div>
                {m.beschreibung && <p className="text-sm text-stone-600 mt-1 line-clamp-3">{m.beschreibung}</p>}
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

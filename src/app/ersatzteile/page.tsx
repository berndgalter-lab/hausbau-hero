import type { Metadata } from "next";
import { Brotkrumen, JsonLd, KaufButton, brotkrumenLd } from "@/components/Ersatzteile";
import SuchFeld from "@/components/SuchFeld";
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

      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold">Sanitär-Ersatzteile finden</h1>
      <p className="text-lg text-stone-600 mt-4 mb-8 max-w-2xl leading-relaxed">
        Wähle die Marke deiner Armatur oder deines Spülkastens – oder suche direkt nach der Artikelnummer, die auf dem
        alten Teil steht.
      </p>

      <div id="suche" className="mb-14 scroll-mt-24">
        <SuchFeld id="q" wert={q} platzhalter="z. B. 46048000 oder Füllventil" label="Artikelnummer oder Teil" />
      </div>

      {q && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold leading-tight mb-3">
            {treffer.length > 0 ? `${treffer.length} Treffer für „${q}“` : `Kein Treffer für „${q}“`}
          </h2>
          {treffer.length === 0 ? (
            <p className="text-sm text-stone-600">
              Wir haben das Teil noch nicht erfasst. Prüfe die Schreibweise der Nummer oder wähle unten die Marke.
            </p>
          ) : (
            <ul className="divide-y divide-stone-200 border-y border-stone-200">
              {treffer.map((t) => {
                const marke = markeVon.get(t.marke_id);
                return (
                  <li key={t.id} className="flex flex-col sm:flex-row sm:items-center gap-2 py-3.5">
                    <div className="flex-1">
                      <a href={`/teil/${t.slug}`} className="font-semibold hover:text-accent-700">{t.name}</a>
                      <div className="text-xs text-stone-500">
                        {marke?.name} · {TEILTYP_LABEL[t.teiltyp] ?? t.teiltyp}
                        {t.oem_nummer && <> · Nr. {t.oem_nummer}</>}
                      </div>
                    </div>
                    <KaufButton teil={t} />
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      <section id="marken" className="scroll-mt-24">
        <h2 className="text-3xl font-semibold leading-tight mb-6">Nach Marke</h2>
        {marken.length === 0 ? (
          <p className="text-sm text-stone-600">Die ersten Marken werden gerade erfasst.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {marken.map((m) => (
              <a
                key={m.id}
                href={`/ersatzteile/${m.slug}`}
                className="group block p-6 bg-stone-100/80 rounded-2xl transition-colors hover:bg-accent-50"
              >
                <div className="font-serif text-2xl font-semibold group-hover:text-accent-700">{m.name}</div>
                {m.beschreibung && <p className="text-sm text-stone-600 mt-1 line-clamp-3">{m.beschreibung}</p>}
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import { Brotkrumen, JsonLd, KaufButton, brotkrumenLd } from "@/components/Ersatzteile";
import SuchFeld from "@/components/SuchFeld";
import { HAUPTBEREICHE, hauptbereichVon } from "@/lib/bereiche";
import { markenNachHauptbereich } from "@/lib/bereiche-daten";
import { TEILTYP_LABEL, alleMarken, sucheTeile, type Marke } from "@/lib/ersatzteile";
import { alleTeilarten } from "@/lib/teilarten";

export const revalidate = 3600;

type Props = { searchParams: { q?: string } };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const basis: Metadata = {
    title: "Ersatzteile finden: Teile mit Artikelnummer",
    description:
      "Das passende Ersatzteil rund ums Haus finden: nach Marke, Modell oder Art des Teils, mit Originalnummer und Quelle.",
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
  const markenGruppen = await markenNachHauptbereich(marken).catch(() => [{ name: "", marken }]);
  // Teilearten nach dem Hauptbereich ihres ersten Bereichs
  const teilartGruppen = HAUPTBEREICHE.map((h) => ({
    name: h.name,
    liste: alleTeilarten().filter((t) => hauptbereichVon(t.bereiche[0] ?? "")?.slug === h.slug),
  })).filter((g) => g.liste.length > 0);

  return (
    <div>
      <JsonLd daten={brotkrumenLd([{ name: "Start", href: "/" }, { name: "Ersatzteile", href: "/ersatzteile" }])} />
      <Brotkrumen teile={[{ name: "Start", href: "/" }, { name: "Ersatzteile" }]} />

      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold">Ersatzteile finden</h1>
      <p className="text-lg text-stone-600 mt-4 mb-8 max-w-2xl leading-relaxed">
        Suche nach der Nummer, die auf dem alten Teil steht, oder wähle die Marke oder die Art des Teils.
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
          markenGruppen.map((g) => (
            <div key={g.name} className="mb-10">
              {markenGruppen.length > 1 && <h3 className="ueberzeile mb-4">{g.name}</h3>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {g.marken.map((m) => (
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
            </div>
          ))
        )}
      </section>

      {teilartGruppen.length > 0 && (
        <section id="arten" className="mt-6 scroll-mt-24">
          <h2 className="text-3xl font-semibold leading-tight mb-6">Nach Art des Teils</h2>
          {teilartGruppen.map((g) => (
            <div key={g.name} className="mb-10">
              {teilartGruppen.length > 1 && <h3 className="ueberzeile mb-4">{g.name}</h3>}
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 border-t border-stone-200">
                {g.liste.map((t) => (
                  <li key={t.slug} className="border-b border-stone-200">
                    <a href={`/ersatzteile/${t.slug}`} className="group flex items-center justify-between gap-3 py-3.5">
                      <span className="font-semibold text-stone-900 group-hover:text-accent-700">{t.name}</span>
                      <span aria-hidden className="text-stone-300 group-hover:text-accent-700">→</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

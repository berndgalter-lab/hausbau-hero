import type { Metadata } from "next";
import { Brotkrumen, JsonLd, KaufButton, brotkrumenLd } from "@/components/Ersatzteile";
import { DRUECKERPLATTE_KACHEL, MarkenKachel, TeilKachel } from "@/components/Kacheln";
import SuchFeld from "@/components/SuchFeld";
import { HAUPTBEREICHE, hauptbereichVon } from "@/lib/bereiche";
import { markenNachHauptbereich } from "@/lib/bereiche-daten";
import { TEILTYP_LABEL, alleMarken, sucheTeile, teileJeMarke, type Marke } from "@/lib/ersatzteile";
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
  const [marken, treffer, zahlen] = await Promise.all([
    alleMarken(),
    q ? sucheTeile(q) : Promise.resolve([]),
    teileJeMarke().catch(() => new Map<string, { anzahl: number; typen: string[] }>()),
  ]);
  const markeVon = new Map<string, Marke>(marken.map((m) => [m.id, m]));
  const markenGruppen = await markenNachHauptbereich(marken).catch(() => [{ name: "", marken }]);
  // Teilearten nach dem Hauptbereich ihres ersten Bereichs. Gesucht wird eher nach dem Teil als nach der Marke,
  // darum stehen sie vor den Marken.
  const teile = alleTeilarten().flatMap((t) => [
    { slug: t.slug, name: t.name, href: `/ersatzteile/${t.slug}`, bereich: t.bereiche[0] ?? "" },
    ...(t.slug === "spuelkasten" ? [DRUECKERPLATTE_KACHEL] : []),
  ]);
  const teilGruppen = HAUPTBEREICHE.map((h) => ({
    name: h.name,
    liste: teile.filter((t) => hauptbereichVon(t.bereich)?.slug === h.slug),
  })).filter((g) => g.liste.length > 0);

  return (
    <div>
      <JsonLd daten={brotkrumenLd([{ name: "Start", href: "/" }, { name: "Ersatzteile", href: "/ersatzteile" }])} />
      <Brotkrumen teile={[{ name: "Start", href: "/" }, { name: "Ersatzteile" }]} />

      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold">Ersatzteile finden</h1>
      <p className="text-lg text-stone-600 mt-4 mb-8 max-w-2xl leading-relaxed">
        Suche nach der Nummer, die auf dem alten Teil steht, oder wähle unten das Teil oder die Marke.
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

      {teilGruppen.length > 0 && (
        <section id="arten" className="mb-14 scroll-mt-24">
          <h2 className="text-3xl font-semibold leading-tight mb-6">Nach Teil</h2>
          {teilGruppen.map((g) => (
            <div key={g.name} className="mb-10">
              {teilGruppen.length > 1 && <h3 className="ueberzeile mb-4">{g.name}</h3>}
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {g.liste.map((t) => (
                  <li key={t.slug}>
                    <TeilKachel t={t} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {g.marken.map((m) => (
                  <MarkenKachel key={m.id} m={m} zahl={zahlen.get(m.id)} />
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

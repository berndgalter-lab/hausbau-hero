import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TeilBild from "@/components/TeilBild";
import {
  Brotkrumen,
  GuenstigstesAngebot,
  JsonLd,
  KaufButton,
  NummerPruefen,
  Quellen,
  SicherheitBadge,
  brotkrumenLd,
} from "@/components/Ersatzteile";
import {
  PRODUKTTYP_LABEL,
  SITE_URL,
  TEILTYP_LABEL,
  angeboteFuerTeile,
  baujahre,
  gruppiere,
  NOTIZ_SPRACHE,
  hostVon,
  markeNachSlug,
  serieIstDuenn,
  teileNachIds,
  zuordnungenFuerSerien,
  type Serie,
} from "@/lib/ersatzteile";

export const revalidate = 3600;

type Props = { params: { marke: string; serie: string } };

async function lade(params: Props["params"]) {
  const marke = await markeNachSlug(params.marke);
  if (!marke) return null;
  const { data } = await supabase.from("serien").select("*").eq("marke_id", marke.id).eq("slug", params.serie).maybeSingle();
  if (!data) return null;
  const serie = data as Serie;
  const zuordnungen = await zuordnungenFuerSerien([serie.id]);
  return { marke, serie, zuordnungen };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const geladen = await lade(params);
  if (!geladen) return {};
  const { marke, serie, zuordnungen } = geladen;
  const title = `${serie.name}: Ersatzteile mit Artikelnummer`;
  const description = `Welche Ersatzteile passen zu ${serie.name}? Originalnummern, Baujahr-Hinweise und Quellen – plus woran du die Serie erkennst.`;
  const url = `${SITE_URL}/ersatzteile/${marke.slug}/${serie.slug}`;
  // Dünne Serien (docs/SEITENAUFBAU.md, Abschnitt 5) bleiben erreichbar, aber nicht im Index.
  const robots = serieIstDuenn(serie, zuordnungen.length) ? { index: false, follow: true } : undefined;
  return { title, description, robots, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function SerienSeite({ params }: Props) {
  const geladen = await lade(params);
  if (!geladen) notFound();
  const { marke, serie, zuordnungen } = geladen;
  // Rechercheprotokoll („keine Merkmale recherchiert“) ist kein Erkennungsmerkmal
  const merkmale = serie.erkennungsmerkmale && !NOTIZ_SPRACHE.test(serie.erkennungsmerkmale) ? serie.erkennungsmerkmale : null;

  const teilIds = zuordnungen.map((z) => z.teil_id);
  const [teile, angebote] = await Promise.all([teileNachIds(teilIds), angeboteFuerTeile(teilIds)]);
  const teilVon = new Map(teile.map((t) => [t.id, t]));
  const zeilen = zuordnungen
    .map((z) => ({ z, t: teilVon.get(z.teil_id) }))
    .filter((x): x is { z: typeof x.z; t: NonNullable<typeof x.t> } => !!x.t)
    .sort((a, b) => a.t.teiltyp.localeCompare(b.t.teiltyp) || a.t.name.localeCompare(b.t.name));

  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ersatzteile", href: "/ersatzteile" },
    { name: marke.name, href: `/ersatzteile/${marke.slug}` },
    { name: serie.name, href: `/ersatzteile/${marke.slug}/${serie.slug}` },
  ];
  const jahre = baujahre(serie);
  // Mehrere Teile derselben Art (z. B. fünf Kartuschen bei Grohe Eurosmart): Dann entscheidet die Modellnummer.
  const mehrfach = gruppiere(zeilen, (x) => x.t.teiltyp)
    .filter(([, liste]) => liste.length > 1)
    .map(([typ]) => TEILTYP_LABEL[typ] ?? typ);

  return (
    <div className="max-w-4xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], pfad[1], pfad[2], { name: serie.name }]} />

      <h1 className="text-3xl font-bold mb-2">{serie.name}: Ersatzteile</h1>
      <p className="text-sm text-stone-500 mb-6">
        {[PRODUKTTYP_LABEL[serie.produkttyp] ?? serie.produkttyp, jahre && `Baujahre ${jahre}`].filter(Boolean).join(" · ")}
      </p>
      {serie.beschreibung && <p className="text-stone-700 mb-6 leading-relaxed">{serie.beschreibung}</p>}

      <section className="mb-8 p-5 bg-white border border-stone-200 rounded-xl">
        <h2 className="text-lg font-bold mb-2">Ist das meine {serie.produkttyp === "spuelkasten" ? "Spülkasten-Serie" : "Serie"}?</h2>
        {merkmale ? (
          <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">{merkmale}</p>
        ) : (
          <p className="text-sm text-stone-700 leading-relaxed">
            Sicher erkennst du die Serie nur an der Artikelnummer.{" "}
            <a href={`/ersatzteile/${marke.slug}#nummer`} className="text-amber-700 hover:underline">
              So findest du die Nummer bei {marke.name}
            </a>
            .
          </p>
        )}
        {serie.kennnummern.length > 0 && (
          <p className="text-sm text-stone-600 mt-3">
            <strong>Artikelnummern dieser Serie:</strong> {serie.kennnummern.join(", ")}
          </p>
        )}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Passende Ersatzteile</h2>
        {mehrfach.length > 0 && (
          <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm text-stone-700">
            <strong>Achtung:</strong> Für diese Serie gibt es mehrere {mehrfach.join(" und ")}. Welches Teil passt,
            hängt von der genauen Modellnummer deiner Armatur ab – sie steht in der Spalte „Hinweis“.
          </div>
        )}
        {zeilen.length === 0 ? (
          <p className="text-sm text-stone-600">Für diese Serie sind noch keine belegten Zuordnungen erfasst.</p>
        ) : (
          <div className="overflow-x-auto bg-white border border-stone-200 rounded-xl">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-stone-500">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Teil</th>
                  <th className="text-left font-medium px-4 py-2">Nummer</th>
                  <th className="text-left font-medium px-4 py-2">Beleg</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {zeilen.map(({ z, t }) => (
                  <tr key={t.id} className="align-top">
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <TeilBild url={t.bild_url} alt={t.name} groesse={48} />
                        <div>
                          <a href={`/teil/${t.slug}`} className="font-medium hover:text-amber-700">{t.name}</a>
                          <div className="text-xs text-stone-500">{TEILTYP_LABEL[t.teiltyp] ?? t.teiltyp}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{t.oem_nummer ?? "–"}</td>
                    <td className="px-4 py-3">
                      <SicherheitBadge sicherheit={z.sicherheit} />
                      {z.hinweis && <div className="text-xs text-stone-600 mt-1">{z.hinweis}</div>}
                      {z.quelle_url && (
                        <a href={z.quelle_url} target="_blank" rel="nofollow noopener noreferrer" className="text-xs text-amber-700 hover:underline">
                          {hostVon(z.quelle_url)}
                        </a>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <KaufButton teil={t} />
                      <GuenstigstesAngebot teil={t} angebote={angebote} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <NummerPruefen />
      <Quellen urls={[...serie.quellen, ...zuordnungen.map((z) => z.quelle_url)]} />

      <p className="mt-8 text-sm">
        <a href={`/ersatzteile/${marke.slug}`} className="text-amber-700 hover:underline">← Alle {marke.name}-Serien</a>
      </p>
    </div>
  );
}

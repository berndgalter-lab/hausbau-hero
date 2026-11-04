import type { Metadata } from "next";
import NeukaufKasten from "@/components/Neukauf";
import { neukaufFuerSerien } from "@/lib/neukauf";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import TeilBild from "@/components/TeilBild";
import GroessenSeite, { groessenTitel } from "@/components/GroessenSeite";
import { GROESSEN_PRODUKTTYP, groesseIstDuenn, groesseVon } from "@/lib/groessen";
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
  teilBild,
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
  const url = `${SITE_URL}/ersatzteile/${marke.slug}/${serie.slug}`;
  // Dachfenster: Die Serie ist eine Fenstergröße und hat eigene Vorlage und Index-Regel (docs/SEITENAUFBAU.md, 5a).
  const g = serie.produkttyp === GROESSEN_PRODUKTTYP ? groesseVon(marke.slug, serie.slug) : null;
  if (g) {
    const teilIds = zuordnungen.map((z) => z.teil_id);
    const [teile, angebote] = await Promise.all([teileNachIds(teilIds), angeboteFuerTeile(teilIds)]);
    const title = groessenTitel(marke, g);
    const alt = g.alte_codes.map((a) => a.code).join(", ");
    const description = `${marke.name} ${g.code} misst ${g.breite_cm} × ${g.hoehe_cm} cm${alt ? `, früher ${alt}` : ""}. Welches Rollo, Plissee, welche Markise und welcher Insektenschutz passen, mit Typenbezeichnung und Preis.`;
    const robots = groesseIstDuenn(teile, angebote) ? { index: false, follow: true } : undefined;
    return { title, description, robots, alternates: { canonical: url }, openGraph: { title, description, url } };
  }
  const title = `${serie.name}: Ersatzteile mit Artikelnummer`;
  const description = `Welche Ersatzteile passen zu ${serie.name}? Originalnummern, Baujahr-Hinweise und Quellen – plus woran du die Serie erkennst.`;
  // Dünne Serien (docs/SEITENAUFBAU.md, Abschnitt 5) bleiben erreichbar, aber nicht im Index.
  const robots = serieIstDuenn(serie, zuordnungen.length) ? { index: false, follow: true } : undefined;
  return { title, description, robots, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function SerienSeite({ params }: Props) {
  const geladen = await lade(params);
  if (!geladen) notFound();
  const { marke, serie, zuordnungen } = geladen;
  const g = serie.produkttyp === GROESSEN_PRODUKTTYP ? groesseVon(marke.slug, serie.slug) : null;
  if (g) return <GroessenSeite marke={marke} serie={serie} zuordnungen={zuordnungen} g={g} />;
  // Rechercheprotokoll („keine Merkmale recherchiert“) ist kein Erkennungsmerkmal
  const merkmale = serie.erkennungsmerkmale && !NOTIZ_SPRACHE.test(serie.erkennungsmerkmale) ? serie.erkennungsmerkmale : null;

  const teilIds = zuordnungen.map((z) => z.teil_id);
  const [teile, angebote, neukauf] = await Promise.all([
    teileNachIds(teilIds),
    angeboteFuerTeile(teilIds),
    neukaufFuerSerien([{ marke: marke.slug, slug: serie.slug, produkttyp: serie.produkttyp }]),
  ]);
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

      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold mb-2">{serie.name}: Ersatzteile</h1>
      <p className="text-sm text-stone-500 mb-6">
        {[PRODUKTTYP_LABEL[serie.produkttyp] ?? serie.produkttyp, jahre && `Baujahre ${jahre}`].filter(Boolean).join(" · ")}
      </p>
      {serie.beschreibung && <p className="text-stone-700 mb-6 leading-relaxed">{serie.beschreibung}</p>}

      <section className="mb-8 p-5 bg-white rounded-2xl ring-1 ring-stone-900/[0.07]">
        <h2 className="text-xl font-semibold leading-tight mb-2">Ist das meine {serie.produkttyp === "spuelkasten" ? "Spülkasten-Serie" : "Serie"}?</h2>
        {merkmale ? (
          <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">{merkmale}</p>
        ) : (
          <p className="text-sm text-stone-700 leading-relaxed">
            Sicher erkennst du die Serie nur an der Artikelnummer.{" "}
            <a href={`/ersatzteile/${marke.slug}#nummer`} className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
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
        <h2 className="text-2xl font-semibold leading-tight mb-3">Passende Ersatzteile</h2>
        {mehrfach.length > 0 && (
          <div className="mb-4 p-4 bg-accent-50 rounded-xl text-sm text-stone-700">
            <strong>Achtung:</strong> Für diese Serie gibt es mehrere {mehrfach.join(" und ")}. Welches Teil passt,
            hängt von der genauen Modellnummer deiner Armatur ab – sie steht in der Spalte „Hinweis“.
          </div>
        )}
        {zeilen.length === 0 ? (
          <p className="text-sm text-stone-600">Für diese Serie sind noch keine belegten Zuordnungen erfasst.</p>
        ) : (
          <div className="overflow-x-auto border-y border-stone-200">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 text-stone-500">
                <tr>
                  <th className="text-left font-medium px-4 py-2">Teil</th>
                  <th className="text-left font-medium px-4 py-2">Nummer</th>
                  <th className="text-left font-medium px-4 py-2">Beleg</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {zeilen.map(({ z, t }) => (
                  <tr key={t.id} className="align-top">
                    <td className="px-4 py-3">
                      <div className="flex gap-3">
                        <TeilBild url={teilBild(t, angebote)?.url ?? null} alt={t.name} groesse={48} />
                        <div>
                          <a href={`/teil/${t.slug}`} className="font-medium hover:text-accent-700">{t.name}</a>
                          <div className="text-xs text-stone-500">{TEILTYP_LABEL[t.teiltyp] ?? t.teiltyp}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{t.oem_nummer ?? "–"}</td>
                    <td className="px-4 py-3">
                      <SicherheitBadge sicherheit={z.sicherheit} />
                      {z.hinweis && <div className="text-xs text-stone-600 mt-1">{z.hinweis}</div>}
                      {/* Beleg als Text, die Links stehen gesammelt unter „Quellen“. */}
                      {z.quelle_url && <div className="text-xs text-stone-500 mt-1">Beleg: {hostVon(z.quelle_url)}</div>}
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

      <NeukaufKasten n={neukauf} />

      <NummerPruefen />
      <Quellen urls={[...serie.quellen, ...zuordnungen.map((z) => z.quelle_url)]} zugeklappt />

      <p className="mt-8 text-sm">
        <a href={`/ersatzteile/${marke.slug}`} className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">← Alle {marke.name}-Serien</a>
      </p>
    </div>
  );
}

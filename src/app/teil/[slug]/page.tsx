import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TeilBild from "@/components/TeilBild";
import NeukaufKasten from "@/components/Neukauf";
import { neukaufFuerBereich } from "@/lib/neukauf";
import { neukaufBereich } from "@/lib/bereiche";
import {
  Angebote,
  Brotkrumen,
  JsonLd,
  NummerPruefen,
  Quellen,
  SicherheitBadge,
  brotkrumenLd,
} from "@/components/Ersatzteile";
import {
  SITE_URL,
  TEILTYP_LABEL,
  angeboteFuerTeile,
  baujahre,
  hostVon,
  markeNachId,
  serienNachIds,
  teilNachSlug,
  zuordnungenFuerTeil,
} from "@/lib/ersatzteile";

export const revalidate = 3600;

type Props = { params: { slug: string } };

const SCHWIERIGKEIT = ["", "leicht", "mittel", "anspruchsvoll"];

const MASS_LABEL: Record<string, string> = {
  durchmesser_mm: "Durchmesser",
  aussen_mm: "Außendurchmesser",
  innen_mm: "Innendurchmesser",
  gewinde: "Gewinde",
  gewinde_mm: "Gewinde",
  laenge_mm: "Länge",
  hoehe_mm: "Höhe",
  breite_mm: "Breite",
  staerke_mm: "Stärke",
  abmessungen_cm: "Abmessungen",
  anschluss: "Anschluss",
  anschluss_zoll: "Anschluss",
  passt_gewinde: "Passt auf Gewinde",
  schnur_mm: "Schnurstärke",
  standrohr: "Standrohr",
  berechnungsdurchfluss_l_s: "Durchfluss",
  min_fliessdruck_kpa: "Mindest-Fließdruck",
  fliessdruck_kpa: "Fließdruck",
  spuelmenge_gross_l: "Große Spülmenge",
  spuelmenge_klein_l: "Kleine Spülmenge",
  hinweis: "Hinweis",
};

const EINHEIT: [string, string][] = [
  ["_mm", "mm"],
  ["_cm", "cm"],
  ["_l_s", "l/s"],
  ["_kpa", "kPa"],
  ["_l", "l"],
];

function massName(key: string): string {
  if (MASS_LABEL[key]) return MASS_LABEL[key];
  const ohneEinheit = key.replace(/_(mm|cm|l_s|kpa|l)$/, "").replace(/_/g, " ");
  return ohneEinheit.charAt(0).toUpperCase() + ohneEinheit.slice(1);
}

function massWert(key: string, wert: string | number): string {
  if (typeof wert === "number") {
    const einheit = EINHEIT.find(([endung]) => key.endsWith(endung));
    const zahl = wert.toLocaleString("de-DE");
    return einheit ? `${zahl} ${einheit[1]}` : zahl;
  }
  return String(wert);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const teil = await teilNachSlug(params.slug);
  if (!teil) return {};
  const marke = await markeNachId(teil.marke_id);
  // Gesucht wird mit Marke und Nummer ("geberit 240.705.00.1"), darum beides in den Titel.
  const title = [teil.name, teil.oem_nummer && `(${teil.oem_nummer})`].filter(Boolean).join(" ");
  const description = `${teil.name}${teil.oem_nummer ? ` – Originalnummer ${teil.oem_nummer}` : ""}: passende ${marke?.name ?? ""} Modelle, Maße und Einbau-Hinweise.`;
  const url = `${SITE_URL}/teil/${teil.slug}`;
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url } };
}

export default async function TeilSeite({ params }: Props) {
  const teil = await teilNachSlug(params.slug);
  if (!teil) notFound();
  const marke = await markeNachId(teil.marke_id);
  if (!marke) notFound();

  const [zuordnungen, angebote] = await Promise.all([zuordnungenFuerTeil(teil.id), angeboteFuerTeile([teil.id])]);
  const serien = await serienNachIds(zuordnungen.map((z) => z.serie_id));
  const serieVon = new Map(serien.map((s) => [s.id, s]));
  // Neukauf-Hinweis nach dem Bereich der passenden Serien, z. B. Kartusche einer Waschtischarmatur.
  const neukauf = await neukaufFuerBereich(neukaufBereich({ produkttypen: serien.map((s) => s.produkttyp), teiltyp: teil.teiltyp }));

  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ersatzteile", href: "/ersatzteile" },
    { name: marke.name, href: `/ersatzteile/${marke.slug}` },
    { name: teil.name, href: `/teil/${teil.slug}` },
  ];
  const masse = Object.entries(teil.masse ?? {});

  const zeilen: [string, React.ReactNode][] = [
    ["Marke", marke.name],
    ...(teil.oem_nummer ? [["Artikelnummer", <span key="n" className="font-mono font-medium">{teil.oem_nummer}</span>] as [string, React.ReactNode]] : []),
    ...(teil.ean ? [["EAN", <span key="e" className="font-mono">{teil.ean}</span>] as [string, React.ReactNode]] : []),
    ...masse.map(([k, v]) => [massName(k), massWert(k, v)] as [string, React.ReactNode]),
    ...(teil.verschleissteil !== null ? [["Verschleißteil", teil.verschleissteil ? "ja" : "nein"] as [string, React.ReactNode]] : []),
    ...(teil.preis_spanne ? [["Preis ca.", teil.preis_spanne] as [string, React.ReactNode]] : []),
  ];

  return (
    <div>
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], pfad[1], pfad[2], { name: teil.name }]} />

      <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="lg:col-start-1">
          <p className="ueberzeile">{TEILTYP_LABEL[teil.teiltyp] ?? teil.teiltyp}</p>
          <h1 className="mt-3 text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold">{teil.name}</h1>
          {teil.oem_nummer && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700">
              Originalnummer <span className="font-mono font-semibold text-stone-900">{teil.oem_nummer}</span>
            </p>
          )}
          {teil.beschreibung && <p className="mt-5 max-w-2xl text-lg text-stone-700 leading-relaxed">{teil.beschreibung}</p>}

          <section className="mt-10 grid gap-8 sm:grid-cols-[auto_1fr]">
            <TeilBild url={teil.bild_url} alt={teil.name} shop={angebote.find((a) => a.shop === teil.bild_shop)?.shop_name ?? null} groesse={200} />
            <div className="min-w-0">
              <h2 className="font-sans text-base font-semibold text-stone-900 mb-2">Steckbrief</h2>
              <dl className="divide-y divide-stone-200 border-y border-stone-200 text-sm">
                {zeilen.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-2.5">
                    <dt className="text-stone-500">{k}</dt>
                    <dd className="text-stone-900">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>

        <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-24">
            <Angebote teil={teil} angebote={angebote} />
          </div>
        </aside>

        <div className="min-w-0 lg:col-start-1">
      <NeukaufKasten n={neukauf} />

      <section className="mb-12">
        <h2 className="text-3xl font-semibold leading-tight mb-5">Passt zu</h2>
        {zuordnungen.length === 0 ? (
          <p className="text-sm text-stone-600">Noch keine belegten Zuordnungen erfasst.</p>
        ) : (
          <ul className="divide-y divide-stone-200 border-y border-stone-200">
            {zuordnungen.map((z) => {
              const s = serieVon.get(z.serie_id);
              if (!s) return null;
              return (
                <li key={z.serie_id} className="py-3.5 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={`/ersatzteile/${marke.slug}/${s.slug}`} className="font-medium hover:text-accent-700">{s.name}</a>
                    {baujahre(s) && <span className="text-xs text-stone-500">{baujahre(s)}</span>}
                    <SicherheitBadge sicherheit={z.sicherheit} />
                  </div>
                  {z.hinweis && <div className="text-xs text-stone-600 mt-1">{z.hinweis}</div>}
                  {z.quelle_url && (
                    <a href={z.quelle_url} target="_blank" rel="nofollow noopener noreferrer" className="text-xs text-stone-500 underline decoration-stone-300 underline-offset-2 hover:text-accent-700">
                      Beleg: {hostVon(z.quelle_url)}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {(teil.selbst_tauschbar !== null || teil.werkzeug || teil.dauer_min) && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold leading-tight mb-3">Selbst tauschen?</h2>
          <ul className="text-[0.938rem] space-y-1.5 text-stone-700">
            {teil.selbst_tauschbar !== null && (
              <li><strong>Selbst machbar:</strong> {teil.selbst_tauschbar ? "ja" : "besser vom Installateur"}</li>
            )}
            {teil.schwierigkeit && <li><strong>Schwierigkeit:</strong> {SCHWIERIGKEIT[teil.schwierigkeit]}</li>}
            {teil.dauer_min && <li><strong>Dauer:</strong> ca. {teil.dauer_min} Minuten</li>}
            {teil.werkzeug && <li><strong>Werkzeug:</strong> {teil.werkzeug}</li>}
          </ul>
        </section>
      )}

      <NummerPruefen />
      <Quellen urls={[...teil.quellen, ...zuordnungen.map((z) => z.quelle_url)]} />
        </div>
      </div>
    </div>
  );
}

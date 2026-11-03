import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Brotkrumen,
  JsonLd,
  KaufButton,
  NummerPruefen,
  Quellen,
  SicherheitBadge,
  brotkrumenLd,
} from "@/components/Ersatzteile";
import {
  SITE_URL,
  TEILTYP_LABEL,
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
  gewinde: "Gewinde",
  laenge_mm: "Länge",
  hoehe_mm: "Höhe",
  breite_mm: "Breite",
  anschluss: "Anschluss",
};

function massWert(key: string, wert: string | number): string {
  if (typeof wert === "number" && key.endsWith("_mm")) return `${wert} mm`;
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

  const zuordnungen = await zuordnungenFuerTeil(teil.id);
  const serien = await serienNachIds(zuordnungen.map((z) => z.serie_id));
  const serieVon = new Map(serien.map((s) => [s.id, s]));

  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ersatzteile", href: "/ersatzteile" },
    { name: marke.name, href: `/ersatzteile/${marke.slug}` },
    { name: teil.name, href: `/teil/${teil.slug}` },
  ];
  const masse = Object.entries(teil.masse ?? {});

  return (
    <div className="max-w-4xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], pfad[1], pfad[2], { name: teil.name }]} />

      <div className="text-sm text-stone-500 mb-1">{TEILTYP_LABEL[teil.teiltyp] ?? teil.teiltyp}</div>
      <h1 className="text-3xl font-bold mb-4">
        {teil.name}
        {teil.oem_nummer && <span className="block text-lg font-semibold text-stone-500 mt-1">Originalnummer {teil.oem_nummer}</span>}
      </h1>
      {teil.beschreibung && <p className="text-stone-700 mb-6 leading-relaxed">{teil.beschreibung}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <section className="md:col-span-2 p-5 bg-white border border-stone-200 rounded-xl">
          <h2 className="text-lg font-bold mb-3">Steckbrief</h2>
          <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 text-sm">
            <dt className="text-stone-500">Marke</dt>
            <dd>{marke.name}</dd>
            {teil.oem_nummer && (<><dt className="text-stone-500">Artikelnummer</dt><dd className="font-medium">{teil.oem_nummer}</dd></>)}
            {teil.ean && (<><dt className="text-stone-500">EAN</dt><dd>{teil.ean}</dd></>)}
            {masse.map(([k, v]) => (
              <span key={k} className="contents">
                <dt className="text-stone-500">{MASS_LABEL[k] ?? k}</dt>
                <dd>{massWert(k, v)}</dd>
              </span>
            ))}
            {teil.verschleissteil !== null && (<><dt className="text-stone-500">Verschleißteil</dt><dd>{teil.verschleissteil ? "ja" : "nein"}</dd></>)}
            {teil.preis_spanne && (<><dt className="text-stone-500">Preis ca.</dt><dd>{teil.preis_spanne}</dd></>)}
          </dl>
        </section>
        <section className="p-5 bg-amber-50 border border-amber-200 rounded-xl flex flex-col gap-3">
          <h2 className="text-lg font-bold">Kaufen</h2>
          <p className="text-sm text-stone-600">
            {teil.amazon_asin || teil.affiliate_url
              ? "Direkt zum Originalteil bei Amazon."
              : `Amazon-Suche nach „${marke.name} ${teil.oem_nummer ?? teil.name}“ – achte auf die exakte Nummer.`}
          </p>
          <KaufButton teil={teil} markeName={marke.name} />
        </section>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-3">Passt zu</h2>
        {zuordnungen.length === 0 ? (
          <p className="text-sm text-stone-600">Noch keine belegten Zuordnungen erfasst.</p>
        ) : (
          <ul className="divide-y divide-stone-100 bg-white border border-stone-200 rounded-xl">
            {zuordnungen.map((z) => {
              const s = serieVon.get(z.serie_id);
              if (!s) return null;
              return (
                <li key={z.serie_id} className="px-4 py-3 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <a href={`/ersatzteile/${marke.slug}/${s.slug}`} className="font-medium hover:text-amber-700">{s.name}</a>
                    {baujahre(s) && <span className="text-xs text-stone-500">{baujahre(s)}</span>}
                    <SicherheitBadge sicherheit={z.sicherheit} />
                  </div>
                  {z.hinweis && <div className="text-xs text-stone-600 mt-1">{z.hinweis}</div>}
                  {z.quelle_url && (
                    <a href={z.quelle_url} target="_blank" rel="nofollow noopener noreferrer" className="text-xs text-amber-700 hover:underline">
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
        <section className="mb-8 p-5 bg-white border border-stone-200 rounded-xl">
          <h2 className="text-lg font-bold mb-3">Selbst tauschen?</h2>
          <ul className="text-sm space-y-1">
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
  );
}

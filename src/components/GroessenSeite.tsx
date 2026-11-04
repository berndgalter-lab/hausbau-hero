import TeilBild from "@/components/TeilBild";
import { Brotkrumen, GuenstigstesAngebot, JsonLd, KaufButton, MarkenFragen, Quellen, brotkrumenLd } from "@/components/Ersatzteile";
import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import {
  SITE_URL,
  TEILTYP_LABEL,
  angeboteFuerTeile,
  teilBild,
  teileNachIds,
  type Marke,
  type Serie,
  type Teil,
  type Zuordnung,
} from "@/lib/ersatzteile";
import { bereichFuerProdukttyp } from "@/lib/bereiche";
import { GROESSEN_ARTEN, kaufbareArten, type Groesse } from "@/lib/groessen";
import { supabase } from "@/lib/supabase";

/** Teile, die an jedes Fenster der Marke passen: unten auf jeder Größenseite. */
const UEBERALL = ["pflege", "dichtung", "griff", "fernbedienung"];

/** Überschrift je Zubehörart, Einzahl wie in „Welches Rollo passt?“. */
const ART_TITEL: Record<string, string> = {
  rollo: "Rollo und Jalousie",
  plissee: "Plissee",
  hitzeschutz: "Hitzeschutz-Markise außen",
  insektenschutz: "Insektenschutz",
  rollladen: "Rollladen",
};

export function groessenTitel(marke: Pick<Marke, "name">, g: Pick<Groesse, "code">): string {
  return `${marke.name} ${g.code}: welches Rollo und welches Zubehör passt?`;
}

function Abschnitt({ id, titel, intro, children }: { id: string; titel: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-20">
      <h2 className="text-[1.75rem] font-semibold leading-tight mb-2">{titel}</h2>
      {intro && <p className="text-stone-600 max-w-2xl">{intro}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

// Größenseite (docs/SEITENAUFBAU.md, Abschnitt 5a): erst Maß und alle Namen der Größe, dann je Zubehörart die
// Originale mit Typenbezeichnung und Kaufzeile, danach ältere Generationen, Nachbauten, Teile für jede Größe,
// Fragen, Quellen. Die Zuordnung Teil → Größe kommt aus serie_teile, der Hinweis sagt, für welche Generation.
export default async function GroessenSeite({
  marke,
  serie,
  zuordnungen,
  g,
}: {
  marke: Marke;
  serie: Serie;
  zuordnungen: Zuordnung[];
  g: Groesse;
}) {
  const [teile, ueberall] = await Promise.all([
    teileNachIds(zuordnungen.map((z) => z.teil_id)),
    supabase
      .from("teile")
      .select("*")
      .eq("marke_id", marke.id)
      .in("teiltyp", UEBERALL)
      .order("teiltyp")
      .order("name")
      .then((r) => (r.data ?? []) as Teil[]),
  ]);
  const angebote = await angeboteFuerTeile([...teile, ...ueberall].map((t) => t.id));
  const hinweisVon = new Map(zuordnungen.map((z) => [z.teil_id, z.hinweis]));
  // Aktuelle Generation zuerst, darin Verdunkelung vor Sichtschutz und Jalousie
  const aktuell = (t: Teil) => (t.oem_nummer ?? t.name).includes(g.code);
  const typRang = (t: Teil) => {
    const i = ["DKL", "DBL", "DKU", "RFL", "FHL", "PAL"].indexOf((t.oem_nummer ?? "").slice(0, 3));
    return i < 0 ? 99 : i;
  };
  const jeArt = GROESSEN_ARTEN.map((art) => ({
    art,
    angabe: g.zubehoer.find((z) => z.art === art),
    liste: teile
      .filter((t) => t.teiltyp === art)
      .sort((a, b) => Number(aktuell(b)) - Number(aktuell(a)) || typRang(a) - typRang(b) || a.name.localeCompare(b.name)),
  })).filter((x) => x.liste.length > 0 || x.angabe);
  const kaufbar = kaufbareArten(teile, angebote);
  const bereich = bereichFuerProdukttyp(serie.produkttyp);
  const nachbauten = g.nachbauten.filter((n) => n.amazon_asin);

  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ersatzteile", href: "/ersatzteile" },
    { name: marke.name, href: `/ersatzteile/${marke.slug}` },
    { name: g.code, href: `/ersatzteile/${marke.slug}/${serie.slug}` },
  ];
  const sprungmarken = [
    { href: "#zubehoer", text: "Zubehör" },
    g.alte_codes.length > 0 && { href: "#alt", text: `Ältere Fenster (${g.alte_codes.map((a) => a.code).join(", ")})` },
    nachbauten.length > 0 && { href: "#nachbau", text: "Nachbauten" },
    ueberall.length > 0 && { href: "#ueberall", text: "Pflege und Bedienung" },
    g.fragen.length > 0 && { href: "#fragen", text: "Fragen" },
  ].filter((x): x is { href: string; text: string } => !!x);
  const alteNamen = g.alte_codes.map((a) => `${a.code} (${a.zeitraum})`).join(" oder ");

  return (
    <div className="max-w-4xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], pfad[1], pfad[2], { name: g.code }]} />

      <header className="mb-10">
        <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold mb-4">{groessenTitel(marke, g)}</h1>
        <p className="text-lg text-stone-700 leading-relaxed max-w-2xl">
          {g.code} steht bei {marke.name} für ein Fenster mit {g.breite_cm} × {g.hoehe_cm} cm Außenmaß.
          {alteNamen && ` Dieselbe Größe heißt auf älteren Typenschildern ${alteNamen}.`} Zubehör für innen gibt es je
          Generation getrennt, deshalb steht bei jedem Teil, für welches Typenschild es gedacht ist.
        </p>
        {g.hinweis && <p className="mt-3 text-stone-700 max-w-2xl">{g.hinweis}</p>}
        {sprungmarken.length > 1 && (
          <nav aria-label="Auf dieser Seite" className="mt-5 flex flex-wrap gap-2">
            {sprungmarken.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="px-3 py-1.5 text-sm bg-stone-100 rounded-full text-stone-800 transition-colors hover:bg-accent-50 hover:text-accent-800"
              >
                {s.text}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section className="mb-12 p-5 sm:p-6 bg-white rounded-2xl ring-1 ring-stone-900/[0.07]">
        <h2 className="text-xl font-semibold leading-tight mb-2">Ist das dein Fenster?</h2>
        {serie.erkennungsmerkmale && <p className="text-sm text-stone-700 leading-relaxed">{serie.erkennungsmerkmale}</p>}
        {serie.beschreibung && <p className="text-sm text-stone-700 leading-relaxed mt-2">{serie.beschreibung}</p>}
        <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
          <div>
            <dt className="text-stone-500">Außenmaß</dt>
            <dd className="font-medium text-stone-900">{g.breite_cm} × {g.hoehe_cm} cm</dd>
          </div>
          <div>
            <dt className="text-stone-500">Code ab 2013</dt>
            <dd className="font-mono font-medium text-stone-900">{g.code}</dd>
          </div>
          {g.alte_codes.map((a) => (
            <div key={a.code}>
              <dt className="text-stone-500">{a.zeitraum}</dt>
              <dd className="font-mono font-medium text-stone-900">{a.code}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm mt-4">
          <a href={`/ersatzteile/${marke.slug}#nummer`} className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
            Wo das Typenschild sitzt und wie du es liest
          </a>
        </p>
      </section>

      <Abschnitt
        id="zubehoer"
        titel={`Welches Zubehör passt zu ${g.code}?`}
        intro={`Originalzubehör von ${marke.name} mit Typenbezeichnung. Die Bezeichnung steht auch auf dem Aufkleber des alten Rollos, so kannst du vergleichen.`}
      >
        <div className="space-y-10">
          {jeArt.map(({ art, angabe, liste }) => (
            <div key={art} id={`art-${art}`} className="scroll-mt-20">
              <h3 className="text-xl font-semibold text-stone-900">{ART_TITEL[art] ?? TEILTYP_LABEL[art] ?? art}</h3>
              {angabe && angabe.typen.length > 0 && (
                <p className="mt-1 text-sm text-stone-500">
                  Typ: <span className="font-mono text-stone-800">{angabe.typen.join(", ")}</span>
                </p>
              )}
              {angabe?.hinweis && <p className="mt-2 text-stone-700 max-w-2xl">{angabe.hinweis}</p>}
              {liste.length > 0 ? (
                <ul className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
                  {liste.map((t) => (
                    <li key={t.id} className="flex items-start gap-3 py-3">
                      <TeilBild url={teilBild(t, angebote)?.url ?? null} alt={t.name} groesse={56} />
                      {/* Mobil steht die Kaufzeile unter dem Namen, ab sm rechts daneben */}
                      <div className="flex-1 min-w-0 sm:flex sm:items-start sm:justify-between sm:gap-4">
                        <div className="min-w-0">
                          <a href={`/teil/${t.slug}`} className="font-medium text-stone-900 hover:text-accent-700">{t.name}</a>
                          <div className="text-xs text-stone-500 mt-0.5">
                            {t.oem_nummer && <span className="font-mono">{t.oem_nummer}</span>}
                            {hinweisVon.get(t.id) && <span> · für {hinweisVon.get(t.id)}</span>}
                          </div>
                        </div>
                        <div className="mt-1 sm:mt-0 sm:text-right shrink-0 flex gap-3 sm:block">
                          <KaufButton teil={t} />
                          <GuenstigstesAngebot teil={t} angebote={angebote} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm text-stone-600">Kein Partnershop führt das Original in dieser Größe.</p>
              )}
              {liste.length > 0 && !kaufbar.has(art) && (
                <p className="mt-2 text-sm text-stone-600">Zurzeit ohne Angebot mit Preis bei unseren Partnershops.</p>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 text-[11px] leading-snug text-stone-500">
          * Partnerlinks: Kaufst du darüber, bekommen wir eine Provision. Der Preis ändert sich für dich nicht.
        </p>
      </Abschnitt>

      {g.alte_codes.length > 0 && (
        <Abschnitt id="alt" titel={`Ältere Fenster: ${g.alte_codes.map((a) => a.code).join(" und ")}`}>
          <div className="overflow-x-auto border-y border-stone-200">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr>
                  <th className="px-4 py-2.5 font-semibold text-stone-700">Code</th>
                  <th className="px-4 py-2.5 font-semibold text-stone-700">Baujahr</th>
                  <th className="px-4 py-2.5 font-semibold text-stone-700">Was passt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {g.alte_codes.map((a) => (
                  <tr key={a.code} className="align-top">
                    <td className="px-4 py-2.5 font-mono font-medium text-stone-900">{a.code}</td>
                    <td className="px-4 py-2.5 text-stone-700 whitespace-nowrap">{a.zeitraum}</td>
                    <td className="px-4 py-2.5 text-stone-700">{a.hinweis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {g.vor_1991 && <p className="text-sm text-stone-600 mt-3 max-w-2xl">{g.vor_1991}</p>}
        </Abschnitt>
      )}

      {nachbauten.length > 0 && (
        <Abschnitt
          id="nachbau"
          titel="Nachbauten anderer Marken"
          intro={`Günstiger als das Original, aber nicht von ${marke.name}. Sie hängen meist in eigenen Schienen statt in den Zubehörträgern; vergleiche vor dem Kauf die Größe mit dem Typenschild.`}
        >
          <ul className="divide-y divide-stone-200 border-y border-stone-200">
            {nachbauten.map((n) => (
              <li key={n.amazon_asin} className="flex items-start justify-between gap-4 py-3">
                <div className="min-w-0">
                  <span className="font-medium text-stone-900">{n.name}</span>
                  {n.hinweis && <span className="block text-sm text-stone-600">{n.hinweis}</span>}
                </div>
                <a
                  href={mitTrackingId(`https://www.amazon.de/dp/${n.amazon_asin}`, "teil")}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  data-platzierung="teil"
                  data-kennung={n.amazon_asin}
                  className="kauflink text-sm whitespace-nowrap"
                >
                  Amazon*
                </a>
              </li>
            ))}
          </ul>
        </Abschnitt>
      )}

      {ueberall.length > 0 && (
        <Abschnitt id="ueberall" titel="Pflege, Dichtung und Bedienung" intro={`Diese Teile hängen nicht an der Größe, sondern passen an jedes ${marke.name}-Fenster der genannten Typen.`}>
          <ul className="divide-y divide-stone-200 border-y border-stone-200">
            {ueberall.map((t) => (
              <li key={t.id} className="flex items-center gap-3 py-3">
                <a href={`/teil/${t.slug}`} className="flex-1 min-w-0 text-stone-900 hover:text-accent-700">
                  {t.name}
                  <span className="block text-xs text-stone-500">{TEILTYP_LABEL[t.teiltyp] ?? t.teiltyp}</span>
                </a>
                <div className="text-right shrink-0">
                  <KaufButton teil={t} />
                  <GuenstigstesAngebot teil={t} angebote={angebote} />
                </div>
              </li>
            ))}
          </ul>
        </Abschnitt>
      )}

      <MarkenFragen markeName={marke.name} fragen={g.fragen} teile={[...teile, ...ueberall]} id="fragen" titel={`Häufige Fragen zu ${marke.name} ${g.code}`} />

      {bereich && (
        <p className="mb-8 text-sm">
          <a href={`/bereich/${bereich.slug}`} className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
            Mehr zu {bereich.name} →
          </a>
        </p>
      )}

      <Quellen urls={[...serie.quellen, ...zuordnungen.map((z) => z.quelle_url), ...g.fragen.flatMap((f) => f.quellen)]} zugeklappt />
      <JsonLd daten={{ "@context": "https://schema.org", "@type": "WebPage", name: groessenTitel(marke, g), url: `${SITE_URL}${pfad[3].href}` }} />
    </div>
  );
}

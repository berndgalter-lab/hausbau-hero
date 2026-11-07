import { TeilartBild } from "@/components/BereichBild";
import TeilBild from "@/components/TeilBild";
import { Absaetze, Brotkrumen, JsonLd, MarkenFragen, Quellen, brotkrumenLd } from "@/components/Ersatzteile";
import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import { bereichNachSlug } from "@/lib/bereiche";
import {
  SITE_URL,
  alleMarken,
  alleProbleme,
  angeboteFuerTeile,
  teilBild,
  formatEuro,
  formatStand,
  gruppiere,
  zeigePreis,
  type Teil,
} from "@/lib/ersatzteile";
import { angeboteFuerEans, bildAusAngeboten, normEan, type EanAngebot } from "@/lib/kaufberatung";
import { alleProblemeAllgemein } from "@/lib/probleme-allgemein";
import { supabase } from "@/lib/supabase";
import { denPassenden, zumZur, type Teilart, type TeilartProdukt } from "@/lib/teilarten";

function Abschnitt({ id, titel, intro, children }: { id: string; titel: string; intro?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-14 scroll-mt-20">
      <h2 className="text-[1.75rem] font-semibold leading-tight mb-2">{titel}</h2>
      {intro && <p className="text-stone-600 max-w-2xl">{intro}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

const ERSTE_PRODUKTE = 8;

type ProduktZeile = { p: TeilartProdukt; angebot: EanAngebot | null; bild: { url: string; shop: string } | null };

function ProduktGitter({ zeilen, ta, bereich }: { zeilen: ProduktZeile[]; ta: Teilart; bereich?: string }) {
  const zeichnung = (
    <div className="flex aspect-square w-full items-center justify-center bg-accent-50/70 text-accent-700">
      <TeilartBild slug={ta.slug} bereich={bereich} className="h-16 w-16" />
    </div>
  );
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {zeilen.map(({ p, angebot, bild }) => (
        <li key={p.name} className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-stone-900/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {bild ? <TeilBild url={bild.url} alt={p.name} fuellen ersatz={zeichnung} /> : zeichnung}
          <div className="flex grow flex-col gap-1 border-t border-stone-100 p-3">
            <span className="text-sm font-semibold leading-snug text-stone-900 line-clamp-3">{p.name}</span>
            {p.hinweis && <span className="text-xs leading-snug text-stone-500 line-clamp-2">{p.hinweis}</span>}
            <span className="mt-auto flex flex-col gap-0.5 pt-1.5">
              {angebot && (
                <a
                  href={mitTrackingId(angebot.url, "angebot")}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  data-platzierung="angebot"
                  data-shop={angebot.shop}
                  data-kennung={p.ean ?? p.name}
                  className="text-sm font-medium text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600"
                >
                  {formatEuro(angebot.preis!)} bei {angebot.shop_name}*
                </a>
              )}
              {p.amazon_asin && (
                <a
                  href={mitTrackingId(`https://www.amazon.de/dp/${p.amazon_asin}`, "teil")}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  data-platzierung="teil"
                  data-kennung={p.amazon_asin}
                  className="text-sm text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600"
                >
                  Amazon*
                </a>
              )}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

// Teileart-Seite (docs/SEITENAUFBAU.md, Abschnitt 4b): erst passende Produkte mit Foto und Preis, dann erkennen
// und Größe bestimmen, dann unsere Teile nach Marke, Probleme, Fragen, Quellen. Kauflinks als Textzeilen.
export default async function TeilartSeite({ ta }: { ta: Teilart }) {
  const [marken, dbProbleme, teile] = await Promise.all([
    alleMarken(),
    alleProbleme(),
    ta.teiltypen.length
      ? supabase.from("teile").select("*").in("teiltyp", ta.teiltypen).order("name").then((r) => (r.data ?? []) as Teil[])
      : Promise.resolve([] as Teil[]),
  ]);
  const produkte = ta.produkte ?? [];
  const [teilAngebote, produktAngebote] = await Promise.all([
    angeboteFuerTeile(teile.map((t) => t.id)),
    angeboteFuerEans(produkte.map((p) => p.ean)),
  ]);

  const guenstigstes = new Map<string, number>();
  for (const a of teilAngebote) {
    if (!zeigePreis(a)) continue;
    const bisher = guenstigstes.get(a.teil_id);
    if (bisher === undefined || a.preis! < bisher) guenstigstes.set(a.teil_id, a.preis!);
  }
  const markeVon = new Map(marken.map((m) => [m.id, m]));
  const teileJeMarke = gruppiere(teile, (t) => t.marke_id)
    .map(([id, liste]) => ({ marke: markeVon.get(id), liste }))
    // Teiltypen wie „dichtung“ gibt es in mehreren Bereichen; ta.marken begrenzt auf die Marken dieser Teileart.
    .filter((g) => g.marke && (!ta.marken || ta.marken.includes(g.marke.slug)));

  const produktZeilen = produkte.map((p) => {
    const n = normEan(p.ean);
    const alle = n ? produktAngebote.get(n) ?? [] : [];
    const angebot = alle.find(zeigePreis) ?? null;
    return { p, angebot, bild: angebot ? bildAusAngeboten([angebot]) : null };
  });
  const aeltester = produktZeilen.reduce<string | null>(
    (m, z) => (z.angebot && (!m || z.angebot.stand < m) ? z.angebot.stand : m),
    null,
  );
  // Mit Foto zuerst, sonst in der Reihenfolge der Datei
  const mitKauf = produktZeilen
    .filter((z) => z.angebot || z.p.amazon_asin)
    .sort((x, y) => Number(!!y.bild) - Number(!!x.bild));

  const allgemein = new Map(alleProblemeAllgemein().map((p) => [p.slug, p]));
  const dbVon = new Map(dbProbleme.map((p) => [p.slug, p]));
  const probleme = (ta.probleme ?? [])
    .map((slug) => {
      const a = allgemein.get(slug);
      if (a) return { slug, titel: a.titel, text: a.symptom };
      const d = dbVon.get(slug);
      return d ? { slug, titel: d.titel, text: d.symptom } : null;
    })
    .filter((x): x is { slug: string; titel: string; text: string | null } => !!x);

  const bereich = ta.bereiche.map(bereichNachSlug).find(Boolean);
  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ersatzteile", href: "/ersatzteile" },
    { name: ta.name, href: `/ersatzteile/${ta.slug}` },
  ];
  const sprungmarken = [
    mitKauf.length > 0 && { href: "#produkte", text: "Passende Produkte" },
    ta.erkennen.length > 0 && { href: "#erkennen", text: "Typ und Größe bestimmen" },
    ta.groessen && { href: "#groessen", text: "Größen" },
    teileJeMarke.length > 0 && { href: "#marken", text: "Nach Marke" },
    probleme.length > 0 && { href: "#probleme", text: "Probleme" },
    ta.fragen.length > 0 && { href: "#fragen", text: `Fragen (${ta.fragen.length})` },
  ].filter((x): x is { href: string; text: string } => !!x);

  return (
    <div className="max-w-4xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], pfad[1], { name: ta.name }]} />

      <header className="mb-12">
        <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold mb-4">{ta.titel}</h1>
        <Absaetze text={ta.kurz} className="text-lg text-stone-700 leading-relaxed max-w-2xl space-y-3" />
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

      {/* Wer von Google kommt, soll gleich Produkte sehen: Kacheln mit Foto und Preis vor Erkennen und Größen.
          Fotos nur aus dem verlinkten Angebot; ohne Foto steht die Zeichnung der Teileart. */}
      {mitKauf.length > 0 && (
        <Abschnitt id="produkte" titel={`Passende ${ta.mehrzahl}`} intro="Eine Auswahl gängiger Ausführungen. Vergleiche vor dem Kauf Größe und Anschluss mit dem alten Teil.">
          <ProduktGitter zeilen={mitKauf.slice(0, ERSTE_PRODUKTE)} ta={ta} bereich={bereich?.slug} />
          {mitKauf.length > ERSTE_PRODUKTE && (
            <details className="group mt-3">
              <summary className="inline-block cursor-pointer list-none text-sm font-medium text-accent-700 hover:text-accent-900">
                <span className="group-open:hidden">Alle {mitKauf.length} {ta.mehrzahl} zeigen ▾</span>
                <span className="hidden group-open:inline">Weniger ▴</span>
              </summary>
              <div className="mt-3">
                <ProduktGitter zeilen={mitKauf.slice(ERSTE_PRODUKTE)} ta={ta} bereich={bereich?.slug} />
              </div>
            </details>
          )}
          <p className="mt-3 text-[11px] leading-snug text-stone-500">
            * Partnerlinks: Kaufst du darüber, bekommen wir eine Provision. Preise inkl. MwSt.
            {aeltester && `, Stand ${formatStand(aeltester)} Uhr`}, maßgeblich ist der Shop.
          </p>
        </Abschnitt>
      )}

      {ta.erkennen.length > 0 && (
        <Abschnitt id="erkennen" titel={`So findest du ${denPassenden(ta)}`}>
          <ol className="divide-y divide-stone-200 border-y border-stone-200">
            {ta.erkennen.map((e, i) => (
              <li key={e.titel} className="flex gap-4 py-6">
                <span className="w-7 shrink-0 font-serif text-3xl leading-none text-accent-700">{i + 1}</span>
                <div>
                  <div className="font-semibold text-stone-900">{e.titel}</div>
                  <Absaetze text={e.text} className="text-stone-700 leading-relaxed mt-1 space-y-2" />
                </div>
              </li>
            ))}
          </ol>
        </Abschnitt>
      )}

      {ta.groessen && (
        <Abschnitt id="groessen" titel={ta.groessen.titel}>
          <div className="overflow-x-auto border-y border-stone-200">
            <table className="w-full text-sm">
              <thead className="text-left">
                <tr>
                  {ta.groessen.spalten.map((s) => (
                    <th key={s} className="px-4 py-2.5 font-semibold text-stone-700 whitespace-nowrap">{s}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {ta.groessen.zeilen.map((z, i) => (
                  <tr key={i}>
                    {z.map((zelle, j) => (
                      <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-medium text-stone-900" : "text-stone-700"}`}>{zelle}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {ta.groessen.hinweis && <p className="text-sm text-stone-600 mt-3 max-w-2xl">{ta.groessen.hinweis}</p>}
        </Abschnitt>
      )}

      {teileJeMarke.length > 0 && (
        <Abschnitt id="marken" titel={`${ta.mehrzahl} nach Marke`} intro="Originalteile mit Herstellernummer. Auf der Seite jedes Teils stehen die Modelle, in die es passt.">
          <div className="space-y-6">
            {teileJeMarke.map(({ marke, liste }) => (
              <div key={marke!.id}>
                <h3 className="font-semibold text-stone-900 mb-3">
                  <a href={`/ersatzteile/${marke!.slug}`} className="hover:text-accent-700">{marke!.name}</a>{" "}
                  <span className="font-normal text-stone-400">({liste.length})</span>
                </h3>
                <ul className="divide-y divide-stone-200 border-y border-stone-200">
                  {liste.map((t) => {
                    const preis = guenstigstes.get(t.id);
                    return (
                      <li key={t.id}>
                        <a href={`/teil/${t.slug}`} className="group flex items-center gap-3 px-4 py-3 hover:bg-stone-50">
                          <TeilBild url={teilBild(t, teilAngebote)?.url ?? null} alt={t.name} groesse={40} />
                          <span className="flex-1 min-w-0">
                            <span className="block text-stone-900 group-hover:text-accent-700">{t.name}</span>
                            <span className="block text-xs text-stone-500 mt-0.5">
                              {t.oem_nummer && <span className="font-mono">Nr. {t.oem_nummer}</span>}
                              {t.oem_nummer && preis !== undefined && " · "}
                              {preis !== undefined && <span>ab {formatEuro(preis)}</span>}
                            </span>
                          </span>
                          <span aria-hidden className="text-stone-300 group-hover:text-accent-600">›</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Abschnitt>
      )}

      {probleme.length > 0 && (
        <Abschnitt id="probleme" titel="Etwas funktioniert nicht?">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {probleme.map((p) => (
              <li key={p.slug}>
                <a href={`/problem/${p.slug}`} className="group flex h-full flex-col p-4 bg-stone-100/80 rounded-2xl transition-colors hover:bg-accent-50">
                  <span className="font-semibold text-stone-900 group-hover:text-accent-700">{p.titel}</span>
                  {p.text && <span className="text-sm text-stone-600 mt-1 line-clamp-2">{p.text}</span>}
                </a>
              </li>
            ))}
          </ul>
        </Abschnitt>
      )}

      <MarkenFragen markeName="" fragen={ta.fragen} teile={teile} id="fragen" titel={`Häufige Fragen ${zumZur(ta)}`} />

      {bereich && (
        <p className="mb-8 text-sm">
          <a href={`/bereich/${bereich.slug}`} className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
            Mehr zu {bereich.name} →
          </a>
        </p>
      )}

      <Quellen urls={[...ta.quellen, ...ta.fragen.flatMap((f) => f.quellen)]} zugeklappt />
      <JsonLd
        daten={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: ta.titel,
          url: `${SITE_URL}/ersatzteile/${ta.slug}`,
        }}
      />
    </div>
  );
}

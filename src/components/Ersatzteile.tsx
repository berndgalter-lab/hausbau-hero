import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import {
  FRAGE_KATEGORIEN,
  SICHERHEIT_LABEL,
  formatEuro,
  formatStand,
  hostVon,
  quelleLabel,
  teilKauflink,
  zeigePreis,
  type Angebot,
  type MarkenFrage,
  type Sicherheit,
  type Teil,
  type Widerspruch,
} from "@/lib/ersatzteile";

export function Brotkrumen({ teile }: { teile: { name: string; href?: string }[] }) {
  return (
    <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-stone-500" aria-label="Brotkrumen">
      {teile.map((t, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="text-stone-300">/</span>}
          {t.href ? (
            <a href={t.href} className="hover:text-stone-900">{t.name}</a>
          ) : (
            <span className="text-stone-700">{t.name}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function brotkrumenLd(teile: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: teile.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `https://hausbau-hero.de${t.href}`,
    })),
  };
}

export function JsonLd({ daten }: { daten: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(daten) }} />;
}

export function SicherheitBadge({ sicherheit }: { sicherheit: Sicherheit }) {
  const s = SICHERHEIT_LABEL[sicherheit];
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${s.klasse}`} title={s.erklaerung}>
      {s.text}
    </span>
  );
}

/** Amazon als Textlink, nur wenn das Teil eine geprüfte ASIN hat. */
export function KaufButton({ teil }: { teil: Teil }) {
  const link = teilKauflink(teil);
  if (!link) return null;
  return (
    <a
      href={link}
      target="_blank"
      rel={AFFILIATE_REL}
      data-platzierung="teil"
      data-kennung={teil.oem_nummer ?? teil.slug}
      className="kauflink text-sm whitespace-nowrap"
    >
      Amazon*
    </a>
  );
}

function PreisZeile({ a }: { a: Angebot }) {
  if (!zeigePreis(a)) {
    return <span className="text-stone-500">{a.vorraetig === false ? "Lieferzeit im Shop" : "Preis im Shop"}</span>;
  }
  return (
    <span className="text-right">
      <strong className="block text-stone-900">{formatEuro(a.preis!)}</strong>
      {a.versand !== null && (
        <span className="block text-xs text-stone-500 whitespace-nowrap">
          {a.versand === 0 ? "versandkostenfrei" : `zzgl. ${formatEuro(a.versand)} Versand`}
        </span>
      )}
    </span>
  );
}

function ShopLink({ a, klein = false, kennung }: { a: Angebot; klein?: boolean; kennung: string }) {
  return (
    <a
      href={mitTrackingId(a.url, "angebot")}
      target="_blank"
      rel={AFFILIATE_REL}
      data-platzierung="angebot"
      data-shop={a.shop}
      data-kennung={kennung}
      className={klein ? "kauflink text-xs font-normal whitespace-nowrap" : "kauflink text-[0.938rem] whitespace-nowrap"}
    >
      {klein ? (zeigePreis(a) ? `${formatEuro(a.preis!)} bei ${a.shop_name}` : a.shop_name) : `Zu ${a.shop_name}`}*
    </a>
  );
}

/** Wo das Teil erhältlich ist: Partnershops mit Preis, dazu Amazon nur mit geprüfter ASIN. */
export function Angebote({ teil, angebote }: { teil: Teil; angebote: Angebot[] }) {
  const kennung = teil.oem_nummer ?? teil.slug;
  const aeltester = angebote.reduce<string | null>((m, a) => (!m || a.stand < m ? a.stand : m), null);
  const nurNummer = angebote.some((a) => a.treffer === "nummer");
  const amazon = teilKauflink(teil);
  return (
    <section className="p-5 sm:p-6 bg-white rounded-2xl ring-1 ring-stone-900/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.12)] flex flex-col gap-3">
      <h2 className="font-sans text-base font-semibold text-stone-900">Erhältlich bei</h2>
      {angebote.length === 0 && !amazon && (
        <p className="text-sm text-stone-600">
          Zu diesem Teil kennen wir noch kein Angebot mit derselben Nummer. Frag im Fachhandel nach der Originalnummer
          {teil.oem_nummer ? ` ${teil.oem_nummer}` : ""}.
        </p>
      )}
      {angebote.length > 0 && (
        <ul className="divide-y divide-stone-200 border-y border-stone-200">
          {angebote.map((a) => (
            <li key={a.id} className="py-3 flex items-start justify-between gap-3 text-sm">
              <ShopLink a={a} kennung={kennung} />
              <PreisZeile a={a} />
            </li>
          ))}
        </ul>
      )}
      {amazon && (
        <p className="text-sm">
          <KaufButton teil={teil} />
          <span className="text-stone-500"> · Originalteil mit dieser Nummer</span>
        </p>
      )}
      {aeltester && (
        <p className="text-[11px] leading-snug text-stone-500">
          Preise inkl. MwSt., Stand {formatStand(aeltester)} Uhr. Preis und Lieferbarkeit können sich seitdem geändert
          haben, maßgeblich ist der Shop.
          {nurNummer && " Zuordnung über die Artikelnummer, vergleiche sie im Shop."}
        </p>
      )}
      {(angebote.length > 0 || amazon) && (
        <p className="text-[11px] leading-snug text-stone-500">
          * Partnerlink: Kaufst du darüber, bekommen wir eine Provision. Der Preis ändert sich für dich nicht.
        </p>
      )}
    </section>
  );
}

/** Für Teile-Listen: das günstigste Shop-Angebot als kleiner Link unter dem Amazon-Button. */
export function GuenstigstesAngebot({ teil, angebote }: { teil: Teil; angebote: Angebot[] }) {
  const a = angebote.find((x) => x.teil_id === teil.id);
  if (!a) return null;
  return (
    <div className="mt-1">
      <ShopLink a={a} klein kennung={teil.oem_nummer ?? teil.slug} />
    </div>
  );
}

/** Text aus der Datenbank: Leerzeilen trennen Absätze. */
export function Absaetze({ text, className }: { text: string; className?: string }) {
  const absaetze = text.split(/\n\s*\n/).map((a) => a.trim()).filter(Boolean);
  return (
    <div className={className}>
      {absaetze.map((a, i) => (
        <p key={i} className="whitespace-pre-line">{a}</p>
      ))}
    </div>
  );
}

export function Quellen({
  urls,
  titel = "Quellen",
  zugeklappt = false,
}: {
  urls: (string | null | undefined)[];
  titel?: string;
  /** Auf Übersichtsseiten: Quellen eingeklappt, damit der Leser nicht zum Hersteller abwandert. */
  zugeklappt?: boolean;
}) {
  const liste = Array.from(new Set(urls.filter((u): u is string => !!u)));
  if (liste.length === 0) return null;
  const hinweis = (
    <p className="mt-3 text-xs text-stone-500">
      Zuordnungen werden aus Herstellerunterlagen und Händlerangaben zusammengetragen, nicht selbst getestet. Prüfe
      vor dem Kauf die Nummer auf dem alten Teil.
    </p>
  );
  const links = (
    <ul className="list-disc pl-5 space-y-1 marker:text-stone-400">
      {liste.map((u) => (
        <li key={u}>
          <a href={u} target="_blank" rel="nofollow noopener noreferrer" className="text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-accent-700 break-all">
            {quelleLabel(u)}
          </a>
        </li>
      ))}
    </ul>
  );
  if (zugeklappt) {
    return (
      <section className="mt-14 border-t border-stone-200 pt-6 text-sm text-stone-600">
        {hinweis}
        <details className="mt-3">
          <summary className="cursor-pointer text-stone-500 hover:text-stone-700">
            {titel} ({liste.length})
          </summary>
          <div className="mt-2">{links}</div>
        </details>
      </section>
    );
  }
  return (
    <section className="mt-14 border-t border-stone-200 pt-6 text-sm text-stone-600">
      <h2 className="font-sans text-base font-semibold text-stone-900 mb-3">{titel}</h2>
      {links}
      {hinweis}
    </section>
  );
}

/**
 * Häufige Fragen der Marke, nach Kategorie geordnet und je Frage aufklappbar. Jede Antwort
 * nennt ihre Quelle und verweist, wo es passt, auf Teil- und Problem-Seiten.
 */
export function MarkenFragen({
  markeName,
  fragen,
  teile,
  id,
  titel,
}: {
  markeName: string;
  fragen: MarkenFrage[];
  teile: Pick<Teil, "slug" | "name">[];
  id?: string;
  /** Statt „Häufige Fragen zu <Marke>-Ersatzteilen“, z. B. auf Teileart- und Problemseiten. */
  titel?: string;
}) {
  if (fragen.length === 0) return null;
  // Kurz wie in der Teile-Liste: ohne Markennamen vorne und ohne Nummer in Klammern hinten.
  const teilName = new Map(
    teile.map((t) => [t.slug, t.name.replace(new RegExp(`^${markeName}\\s+`), "").replace(/\s*\([\d.\s]+\)$/, "")]),
  );
  const reihenfolge = Object.keys(FRAGE_KATEGORIEN);
  const gruppen = reihenfolge
    .map((k) => [k, fragen.filter((f) => f.kategorie === k)] as const)
    .filter(([, liste]) => liste.length > 0);
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragen.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <JsonLd daten={ld} />
      <h2 className="text-3xl font-semibold leading-tight mb-2">{titel ?? `Häufige Fragen zu ${markeName}-Ersatzteilen`}</h2>
      <p className="text-stone-600 max-w-2xl mb-5">
        Gesammelt aus Foren und Suchanfragen. Jede Antwort nennt ihre Quelle.
      </p>
      {gruppen.map(([kategorie, liste]) => (
        <div key={kategorie} className="mb-8">
          <h3 className="ueberzeile mb-2">{FRAGE_KATEGORIEN[kategorie as keyof typeof FRAGE_KATEGORIEN]}</h3>
          <div className="divide-y divide-stone-200 border-y border-stone-200">
            {liste.map((f) => {
              const verweise = (f.teile ?? []).filter((t) => teilName.has(t)).slice(0, 4);
              // Eine Quelle je Website reicht im Kleingedruckten.
              const quellen = f.quellen.filter((q, i) => f.quellen.findIndex((x) => hostVon(x) === hostVon(q)) === i);
              return (
                <details key={f.frage} className="group py-4">
                  <summary className="cursor-pointer font-semibold text-stone-900 hover:text-accent-700 list-none flex justify-between items-start gap-4">
                    <span>{f.frage}</span>
                    <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 font-normal text-stone-600 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <div className="mt-3 text-stone-700 leading-relaxed max-w-2xl">
                    <Absaetze text={f.antwort} className="space-y-2" />
                    {(verweise.length > 0 || f.problem) && (
                      <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                        {f.problem && (
                          <li>
                            <a href={`/problem/${f.problem}`} className="inline-block px-3 py-1 bg-accent-50 rounded-full text-accent-800 hover:bg-accent-100">
                              Ursache finden →
                            </a>
                          </li>
                        )}
                        {verweise.map((t) => (
                          <li key={t}>
                            <a href={`/teil/${t}`} className="inline-block px-3 py-1 bg-stone-100 rounded-full text-stone-700 hover:bg-accent-100 hover:text-accent-800">
                              {teilName.get(t)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                    {quellen.length > 0 && (
                      <p className="mt-3 text-xs text-stone-500">
                        Quelle:{" "}
                        {quellen.map((q, i) => (
                          <span key={q}>
                            {i > 0 && ", "}
                            <a href={q} target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                              {hostVon(q)}
                            </a>
                          </span>
                        ))}
                      </p>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

/**
 * Wo Händler oder Hersteller verschiedene Nummern nennen. Das hat kein Shop und kein Katalog,
 * deshalb steht es auf der Marken-Seite weit oben, je Fall aufklappbar.
 */
export function Widersprueche({ liste, id }: { liste: Widerspruch[]; id?: string }) {
  if (liste.length === 0) return null;
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <p className="ueberzeile">Das findest du nirgends sonst</p>
      <h2 className="mt-2 text-3xl font-semibold leading-tight mb-2">Achtung, Verwechslungsgefahr</h2>
      <p className="text-stone-600 mb-5 max-w-2xl">
        Hier nennen Hersteller oder Händler unterschiedliche Nummern. Wir zeigen beide Angaben mit Quelle, statt eine
        zu raten.
      </p>
      <div className="divide-y divide-stone-200 border-y border-stone-200">
        {liste.map((w) => (
          <details key={w.id} className="group py-4">
            <summary className="cursor-pointer font-semibold text-stone-900 hover:text-accent-700 list-none flex justify-between items-start gap-4">
              <span>{w.thema}</span>
              <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 font-normal text-stone-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-3 space-y-2 text-sm text-stone-700">
              <p>
                {w.aussage_a}
                {w.quelle_a && (
                  <a href={w.quelle_a} target="_blank" rel="nofollow noopener noreferrer" className="ml-1 text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
                    ({hostVon(w.quelle_a)})
                  </a>
                )}
              </p>
              <p>
                <span className="font-medium">Dagegen: </span>
                {w.aussage_b}
                {w.quelle_b && (
                  <a href={w.quelle_b} target="_blank" rel="nofollow noopener noreferrer" className="ml-1 text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
                    ({hostVon(w.quelle_b)})
                  </a>
                )}
              </p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function NummerPruefen() {
  return (
    <div className="rounded-xl bg-accent-50 px-4 py-3.5 text-sm leading-relaxed text-stone-800">
      <strong>Vor dem Bestellen:</strong> Baue das alte Teil aus und vergleiche Nummer, Durchmesser bzw. Gewinde.
      Viele Nachbauten sehen gleich aus, passen aber nicht.
    </div>
  );
}

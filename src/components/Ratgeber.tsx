import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import { formatEuro, formatStand, zeigePreis } from "@/lib/ersatzteile";
import { bildAusAngeboten, type EanAngebot } from "@/lib/kaufberatung";
import { produktLink, type Produkt } from "@/components/ProduktKarte";
import TeilBild from "@/components/TeilBild";
import Inhaltsverzeichnis from "@/components/Inhaltsverzeichnis";
import type { Gliederungspunkt } from "@/lib/artikel-aufbau";

// Bausteine der Ratgeber-Vorlage (docs/SEITENAUFBAU.md, Abschnitt 3): erst die Antwort, dann die
// Modelle. Keine Abzeichen, keine Kaufknöpfe vor dem Text; gekauft wird über eine Textzeile je Modell.

/** Stand und Zahl der Quellen direkt unter der Überschrift. Ohne beides: nichts. */
export function Pruefvermerk({ stand, quellenAnzahl, methode = null }: { stand: string | null; quellenAnzahl: number; methode?: string | null }) {
  if (!stand && quellenAnzahl === 0) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 border-y border-stone-200 py-3 mb-10 text-sm text-stone-500">
      {stand && <>Stand: {stand}</>}
      {stand && methode && " · "}
      {methode}
      {(stand || methode) && quellenAnzahl > 0 && " · "}
      {quellenAnzahl > 0 && (
        <a href="#quellen" className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
          {quellenAnzahl} {quellenAnzahl === 1 ? "Quelle" : "Quellen"}
        </a>
      )}
    </p>
  );
}

/** Wie die Angaben zustande kommen. Text aus dem Hinweis im Artikel. */
export function MethodenKasten({ html, ohneTest }: { html: string; ohneTest: boolean }) {
  return (
    <aside className="mb-10 grid gap-1 text-sm leading-relaxed text-stone-600 sm:grid-cols-[11rem_1fr] sm:gap-6">
      <p className="font-semibold text-stone-900">{ohneTest ? "Datenblattvergleich, kein Test" : "Woher die Angaben stammen"}</p>
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </aside>
  );
}

export function KurzeAntwort({ html, titel }: { html: string; titel: string }) {
  return (
    <section id="kurz" className="mb-12 scroll-mt-24 border-t-2 border-stone-900 pt-5">
      <h2 className="ueberzeile !font-sans !tracking-[0.12em] mb-3">{titel}</h2>
      <div
        className="prose prose-stone max-w-none text-stone-800 prose-p:leading-[1.7] prose-li:my-1.5 marker:text-accent-600 prose-strong:text-stone-900 prose-a:text-accent-700 prose-a:underline prose-a:decoration-accent-300 prose-a:underline-offset-[3px]"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

export function modellAnker(p: Produkt): string {
  return `modell-${p.id}`;
}

/** Kaufen als Textzeile: Partnershops mit Preis (nur vorrätig), Amazon nur mit ASIN-Link. */
function Kaufzeile({ produkt, angebote }: { produkt: Produkt; angebote: EanAngebot[] }) {
  const amazon = produktLink(produkt);
  const kennung = (produkt.hersteller_nr || produkt.name).slice(0, 80);
  if (!amazon && angebote.length === 0) return null;
  return (
    <p className="text-sm mt-3">
      <span className="text-stone-500">Erhältlich bei </span>
      {angebote.slice(0, 3).map((a, i) => (
        <span key={a.id}>
          {i > 0 && ", "}
          <a href={mitTrackingId(a.url, "angebot")} target="_blank" rel={AFFILIATE_REL} data-platzierung="angebot"
            data-shop={a.shop} data-kennung={kennung} className="kauflink">
            {a.shop_name}
            {zeigePreis(a) ? ` ${formatEuro(a.preis!)}` : ""}
          </a>
          *
        </span>
      ))}
      {amazon && (
        <span>
          {angebote.length > 0 && ", "}
          <a href={amazon} target="_blank" rel={AFFILIATE_REL} data-platzierung="box" data-kennung={kennung}
            className="kauflink">
            Amazon
          </a>
          *
        </span>
      )}
    </p>
  );
}

export function ModellAbschnitt({ produkt, angebote = [] }: { produkt: Produkt; angebote?: EanAngebot[] }) {
  const bild = bildAusAngeboten(angebote);
  return (
    <section id={modellAnker(produkt)} className="scroll-mt-24 py-8 border-t border-stone-200 first:border-t-0">
      <div className="flex items-start gap-4">
        {bild && <TeilBild url={bild.url} alt={produkt.name} shop={bild.shop} groesse={104} />}
        <div className="min-w-0">
          <h3 className="font-serif text-xl font-semibold text-stone-900">{produkt.name}</h3>
          {produkt.einsatzbereich && (
            <p className="text-sm text-stone-500 mt-0.5">Passt für: {produkt.einsatzbereich}</p>
          )}
        </div>
      </div>
      {produkt.kurzbeschreibung && <p className="text-stone-700 leading-relaxed mt-3">{produkt.kurzbeschreibung}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 mt-3 text-sm">
        {produkt.vorteile && produkt.vorteile.length > 0 && (
          <div>
            <p className="font-semibold text-stone-800 mb-1">Spricht dafür</p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              {produkt.vorteile.map((v, i) => <li key={i}>{v}</li>)}
            </ul>
          </div>
        )}
        {produkt.nachteile && produkt.nachteile.length > 0 && (
          <div>
            <p className="font-semibold text-stone-800 mb-1">Worauf achten</p>
            <ul className="list-disc pl-5 space-y-1 text-stone-600">
              {produkt.nachteile.map((n, i) => <li key={i}>{n}</li>)}
            </ul>
          </div>
        )}
      </div>
      <Kaufzeile produkt={produkt} angebote={angebote} />
    </section>
  );
}

/** Zeitpunkt der Shop-Preise, einmal unter allen Modellen statt an jedem. */
export function PreisStand({ angebote }: { angebote: Record<string, EanAngebot[]> }) {
  const aeltester = Object.values(angebote)
    .flat()
    .reduce<string | null>((m, a) => (!m || a.stand < m ? a.stand : m), null);
  if (!aeltester) return null;
  return (
    <p className="text-xs text-stone-500 mt-2">
      Shop-Preise inkl. MwSt., zzgl. Versand, Stand {formatStand(aeltester)} Uhr. Maßgeblich ist der Preis im Shop.
    </p>
  );
}

export function Quellen({ html }: { html: string }) {
  return (
    <section id="quellen" className="mt-16 scroll-mt-24 border-t border-stone-200 pt-8">
      <h2 className="text-xl font-semibold text-stone-900 mb-3">Quellen</h2>
      <div
        className="prose prose-sm prose-stone max-w-none text-stone-600 prose-li:my-1 prose-ol:pl-5 prose-ul:pl-5 marker:text-stone-400 prose-a:text-stone-700 prose-a:underline prose-a:decoration-stone-300 prose-a:underline-offset-2 hover:prose-a:text-accent-700 break-words"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

export function AffiliateHinweis() {
  return (
    <p className="mt-10 text-xs text-stone-500">
      * Partnerlink. Kaufst du darüber, bekommen wir eine kleine Provision. Am Preis ändert das für dich nichts.
    </p>
  );
}

/** Häufige Fragen, je Frage aufklappbar, mit FAQPage-Daten. Antworten sind HTML mit Quellen-Links. */
export function HaeufigeFragen({ fragen }: { fragen: { frage: string; antwort: string }[] }) {
  if (fragen.length === 0) return null;
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragen.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() },
    })),
  };
  return (
    <section id="fragen" className="mt-16 scroll-mt-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h2 className="text-[1.75rem] font-semibold leading-tight text-stone-900 mb-5">Häufige Fragen</h2>
      <div className="divide-y divide-stone-200 border-y border-stone-200">
        {fragen.map((f) => (
          <details key={f.frage} className="group">
            <summary className="flex items-start justify-between gap-4 cursor-pointer list-none py-4 font-semibold text-stone-900 hover:text-accent-700">
              {f.frage}
              <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 text-stone-600 transition-transform group-open:rotate-45">+</span>
            </summary>
            <div
              className="pb-5 pr-10 prose prose-stone max-w-none prose-p:my-2 prose-p:leading-relaxed prose-a:text-accent-700 prose-a:underline prose-a:decoration-accent-300 prose-a:underline-offset-2"
              dangerouslySetInnerHTML={{ __html: f.antwort }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}

/** „Wenn etwas kaputt geht“: Verweise auf Ersatzteile und Problemlöser, als Linkliste ohne Kasten. */
export function KaputtVerweise({ verweise }: { verweise: { href: string; titel: string }[] }) {
  if (verweise.length === 0) return null;
  return (
    <section id="ersatzteile" className="mt-16 scroll-mt-24">
      <p className="ueberzeile">Reparieren statt neu kaufen</p>
      <h2 className="mt-2 text-[1.75rem] font-semibold leading-tight text-stone-900">Wenn etwas kaputt geht</h2>
      <p className="mt-2 text-stone-600">Passende Ersatzteile und Hilfe bei typischen Problemen:</p>
      <ul className="mt-5 grid border-t border-stone-200 sm:grid-cols-2 sm:gap-x-8">
        {verweise.map((v) => (
          <li key={v.href} className="border-b border-stone-200">
            <a href={v.href} className="group flex items-center justify-between gap-3 py-3.5 font-medium text-stone-900 hover:text-accent-700">
              {v.titel}
              <span aria-hidden className="text-stone-300 group-hover:text-accent-700">→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Brotkrumen über dem Artikel: klein, ohne Kasten. */
export function ArtikelPfad({ teile }: { teile: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Pfad" className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-stone-500">
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

/** Zweispaltiger Rahmen der Ratgeber: Lesespalte links, mitlaufendes Inhaltsverzeichnis rechts. */
export function ArtikelRahmen({ kopf, gliederung, children }: { kopf: React.ReactNode; gliederung: Gliederungspunkt[]; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-16 lg:grid-cols-[minmax(0,44rem)_13rem] xl:gap-x-24">
      <div className="min-w-0">
        {kopf}
        <Inhaltsverzeichnis punkte={gliederung} ansicht="handy" />
        {children}
      </div>
      <aside className="hidden lg:block">
        <Inhaltsverzeichnis punkte={gliederung} ansicht="rand" />
      </aside>
    </div>
  );
}

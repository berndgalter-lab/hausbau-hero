import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import { formatEuro, formatStand, zeigePreis } from "@/lib/ersatzteile";
import { bildAusAngeboten, type EanAngebot } from "@/lib/kaufberatung";
import { produktLink, type Produkt } from "@/components/ProduktKarte";
import TeilBild from "@/components/TeilBild";

// Bausteine der Ratgeber-Vorlage (docs/SEITENAUFBAU.md, Abschnitt 3): erst die Antwort, dann die
// Modelle. Keine Abzeichen, keine Kaufknöpfe vor dem Text; gekauft wird über eine Textzeile je Modell.

/** Stand und Zahl der Quellen direkt unter der Überschrift. Ohne beides: nichts. */
export function Pruefvermerk({ stand, quellenAnzahl, methode = null }: { stand: string | null; quellenAnzahl: number; methode?: string | null }) {
  if (!stand && quellenAnzahl === 0) return null;
  return (
    <p className="text-sm text-stone-500 mb-6">
      {stand && <>Stand: {stand}</>}
      {stand && methode && " · "}
      {methode}
      {(stand || methode) && quellenAnzahl > 0 && " · "}
      {quellenAnzahl > 0 && (
        <a href="#quellen" className="text-amber-700 hover:underline">
          {quellenAnzahl} {quellenAnzahl === 1 ? "Quelle" : "Quellen"}
        </a>
      )}
    </p>
  );
}

/** Wie die Angaben zustande kommen. Text aus dem Hinweis im Artikel. */
export function MethodenKasten({ html, ohneTest }: { html: string; ohneTest: boolean }) {
  return (
    <aside className="border-l-4 border-stone-300 bg-stone-50 rounded-r-lg px-4 py-3 mb-8 text-sm text-stone-600">
      <p className="font-semibold text-stone-800 mb-1">{ohneTest ? "Datenblattvergleich, kein Test" : "Woher die Angaben stammen"}</p>
      <p dangerouslySetInnerHTML={{ __html: html }} />
    </aside>
  );
}

export function KurzeAntwort({ html, titel }: { html: string; titel: string }) {
  return (
    <section className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-10">
      <h2 className="text-lg font-bold text-stone-900 mb-2">{titel}</h2>
      <div
        className="prose prose-stone max-w-none prose-li:my-1 prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline"
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
            data-shop={a.shop} data-kennung={kennung} className="text-amber-700 font-medium hover:underline">
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
            className="text-amber-700 font-medium hover:underline">
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
    <section id={modellAnker(produkt)} className="scroll-mt-20 py-6 border-t border-stone-200 first:border-t-0">
      <div className="flex items-start gap-4">
        {bild && <TeilBild url={bild.url} alt={produkt.name} shop={bild.shop} groesse={104} />}
        <div className="min-w-0">
          <h3 className="text-xl font-semibold text-stone-900">{produkt.name}</h3>
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
    <section id="quellen" className="mt-12 scroll-mt-20">
      <h2 className="text-lg font-bold text-stone-900 mb-2">Quellen</h2>
      <div
        className="prose prose-sm prose-stone max-w-none prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

export function AffiliateHinweis() {
  return (
    <p className="mt-10 pt-4 border-t border-stone-200 text-xs text-stone-500">
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
    <section id="fragen" className="mt-12 scroll-mt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <h2 className="text-2xl font-bold text-stone-900 mb-4">Häufige Fragen</h2>
      <div className="space-y-2">
        {fragen.map((f) => (
          <details key={f.frage} className="group bg-white border border-stone-200 rounded-lg">
            <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 font-medium text-stone-800 hover:text-amber-700">
              {f.frage}
              <span className="text-stone-400 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div
              className="px-4 pb-4 prose prose-sm prose-stone max-w-none prose-p:my-2 prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: f.antwort }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}

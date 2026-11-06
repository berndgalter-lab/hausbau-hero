import TeilBild from "@/components/TeilBild";
import { bereiteArtikelHtmlVor } from "@/lib/affiliate";
import { formatEuro } from "@/lib/ersatzteile";
import { modellAnker } from "@/lib/produkt-ratgeber";
import Inhaltsverzeichnis from "@/components/Inhaltsverzeichnis";
import type { Gliederungspunkt } from "@/lib/artikel-aufbau";

// Bausteine der Ratgeber-Vorlage (docs/SEITENAUFBAU.md, Abschnitt 3): erst die Antwort, dann die
// Modelle. Keine Abzeichen, keine Kaufknöpfe vor dem Text; gekauft wird über eine Textzeile je Modell.

/**
 * Stand und Zahl der Quellen direkt unter der Überschrift, bei Partnerlinks auf der Seite auch der Hinweis darauf,
 * damit er vor dem ersten Kauflink steht. Ohne alles: nichts.
 */
export function Pruefvermerk({ stand, quellenAnzahl, methode = null, partnerlinks = false }: { stand: string | null; quellenAnzahl: number; methode?: string | null; partnerlinks?: boolean }) {
  if (!stand && quellenAnzahl === 0 && !partnerlinks) return null;
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
      {(stand || methode || quellenAnzahl > 0) && partnerlinks && " · "}
      {partnerlinks && (
        <a href="#partnerlinks" className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">
          Enthält Partnerlinks (*)
        </a>
      )}
    </p>
  );
}

export interface Kachel {
  id: string;
  name: string;
  hersteller: string | null;
  einsatzbereich: string | null;
  bild: { url: string; shop: string } | null;
  preisAb: number | null;
}

/** Kurzer Name für die Kachel: „Geberit Duofix mit Sigma …, 112 cm (111.300.00.6)“ → „Geberit Duofix“. */
export function kurzname(name: string): string {
  return name.split(/\s+(?:mit|für)\s+|,\s|\s\(/)[0].trim();
}

/** Die Modelle der Auswahlhilfe als Kacheln unter der kurzen Antwort, je mit Sprung zum Eintrag. */
export function ProduktKacheln({ kacheln }: { kacheln: Kachel[] }) {
  if (kacheln.length < 2) return null;
  // Ein Bildfeld nur, wenn mindestens die Hälfte der Modelle ein Shopbild hat. Sonst wären es vor allem leere Flächen.
  const mitBild = kacheln.filter((k) => k.bild).length * 2 >= kacheln.length;
  const platzhalter = (k: Kachel) => (
    <div className="w-full aspect-square bg-stone-100 flex items-center justify-center text-stone-400 text-sm font-semibold">
      {k.hersteller ?? "kein Bild"}
    </div>
  );
  return (
    <section aria-label="Die Modelle" className="mb-12">
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {kacheln.map((k) => (
          <li key={k.id}>
            <a href={`#${modellAnker(k.id)}`}
              className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden ring-1 ring-stone-900/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:ring-stone-900/20 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] transition-shadow">
              {mitBild && (k.bild ? <TeilBild url={k.bild.url} alt={k.name} fuellen ersatz={platzhalter(k)} /> : platzhalter(k))}
              <div className={`p-3.5 flex flex-col grow ${mitBild ? "border-t border-stone-100" : ""}`}>
                {!mitBild && k.hersteller && <p className="ueberzeile !text-[0.68rem] text-stone-500 mb-0.5">{k.hersteller}</p>}
                <p className="font-semibold text-stone-900 leading-snug">{kurzname(k.name)}</p>
                {k.einsatzbereich && <p className="text-sm text-stone-500 mt-0.5 leading-snug">{k.einsatzbereich}</p>}
                <p className="text-sm mt-auto pt-2 text-stone-600">
                  {k.preisAb !== null && <span className="font-medium text-stone-900">ab {formatEuro(k.preisAb)} · </span>}
                  <span className="font-medium text-accent-700 group-hover:text-accent-900">zum Modell ↓</span>
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Kennzahlen aus einer <dl> im Abschnitt „Kurz gesagt“: <dt> ist die Zahl, <dd> die Erklärung. */
function kennzahlen(html: string): { zahlen: { wert: string; text: string }[]; rest: string } {
  const dl = /<dl>([\s\S]*?)<\/dl>/i.exec(html);
  if (!dl) return { zahlen: [], rest: html };
  const zahlen = Array.from(dl[1].matchAll(/<dt>([\s\S]*?)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/gi)).map((m) => ({ wert: m[1].trim(), text: m[2].trim() }));
  return { zahlen, rest: html.replace(dl[0], "") };
}

export function KurzeAntwort({ html, titel }: { html: string; titel: string }) {
  const { zahlen, rest } = kennzahlen(html);
  return (
    <section id="kurz" className="mb-12 scroll-mt-24 border-t-2 border-stone-900 pt-5">
      <h2 className="ueberzeile !font-sans mb-3">{titel}</h2>
      {zahlen.length > 0 && (
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 mb-5 border-b border-stone-200 pb-5">
          {zahlen.map((z) => (
            <div key={z.wert}>
              <dt className="font-serif text-3xl font-semibold text-accent-700 tabular-nums">{z.wert}</dt>
              <dd className="text-sm text-stone-600 leading-snug">{z.text}</dd>
            </div>
          ))}
        </dl>
      )}
      <div
        className="prose prose-stone max-w-none text-stone-800 prose-p:leading-[1.7] prose-li:my-1.5 marker:text-accent-600 prose-strong:text-stone-900 prose-a:text-accent-700 prose-a:underline prose-a:decoration-accent-300 prose-a:underline-offset-[3px]"
        dangerouslySetInnerHTML={{ __html: rest }}
      />
    </section>
  );
}

export function Quellen({ html }: { html: string }) {
  return (
    <section id="quellen" className="mt-16 scroll-mt-24 border-t border-stone-200 pt-8">
      <h2 className="text-xl font-semibold text-stone-900 mb-3">Quellen</h2>
      <div
        className="prose prose-sm prose-stone max-w-none text-stone-600 prose-li:my-1 prose-ol:pl-5 prose-ul:pl-5 marker:text-stone-400 prose-a:text-stone-700 prose-a:underline prose-a:decoration-stone-300 prose-a:underline-offset-2 hover:prose-a:text-accent-700 break-words"
        dangerouslySetInnerHTML={{ __html: bereiteArtikelHtmlVor(html, { partner: false }) }}
      />
    </section>
  );
}

export function AffiliateHinweis() {
  return (
    <p id="partnerlinks" className="mt-10 scroll-mt-24 text-xs text-stone-500">
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
              <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-stone-100 font-normal text-stone-600 transition-transform group-open:rotate-45">+</span>
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

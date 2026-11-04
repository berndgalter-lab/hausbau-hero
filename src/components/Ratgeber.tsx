import TeilBild from "@/components/TeilBild";
import { formatEuro } from "@/lib/ersatzteile";
import { modellAnker } from "@/lib/produkt-ratgeber";

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
    <div className="w-full aspect-square bg-stone-50 flex items-center justify-center text-stone-400 text-sm font-semibold">
      {k.hersteller ?? "kein Bild"}
    </div>
  );
  return (
    <section aria-label="Die Modelle" className="mb-10">
      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {kacheln.map((k) => (
          <li key={k.id}>
            <a href={`#${modellAnker(k.id)}`}
              className="group flex flex-col h-full bg-white border border-stone-200 rounded-xl overflow-hidden hover:border-stone-400 transition-colors">
              {mitBild && (k.bild ? <TeilBild url={k.bild.url} alt={k.name} fuellen ersatz={platzhalter(k)} /> : platzhalter(k))}
              <div className={`p-3 flex flex-col grow ${mitBild ? "border-t border-stone-100" : ""}`}>
                {!mitBild && k.hersteller && <p className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-0.5">{k.hersteller}</p>}
                <p className="font-semibold text-stone-900 leading-snug">{kurzname(k.name)}</p>
                {k.einsatzbereich && <p className="text-sm text-stone-500 mt-0.5 leading-snug">{k.einsatzbereich}</p>}
                <p className="text-sm mt-auto pt-2 text-stone-600">
                  {k.preisAb !== null && <span className="font-medium text-stone-900">ab {formatEuro(k.preisAb)} · </span>}
                  <span className="text-amber-700 group-hover:underline">zum Modell ↓</span>
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
    <section className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 mb-8">
      <h2 className="text-lg font-bold text-stone-900 mb-2">{titel}</h2>
      {zahlen.length > 0 && (
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
          {zahlen.map((z) => (
            <div key={z.wert} className="bg-white/70 border border-amber-200/70 rounded-lg px-3 py-2">
              <dt className="text-xl font-bold text-stone-900 tabular-nums">{z.wert}</dt>
              <dd className="text-sm text-stone-600 leading-snug">{z.text}</dd>
            </div>
          ))}
        </dl>
      )}
      <div
        className="prose prose-stone max-w-none prose-li:my-1 prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: rest }}
      />
    </section>
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

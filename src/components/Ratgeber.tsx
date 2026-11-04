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

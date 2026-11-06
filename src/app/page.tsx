import type { Metadata } from "next";
import { BereichKachel, RatgeberKarten } from "@/components/Bereich";
import { markenNachHauptbereich, ratgeberKarten, sichtbareHauptbereiche } from "@/lib/bereiche-daten";
import { problemAllgemeinNachSlug } from "@/lib/probleme-allgemein";
import { alleMarken } from "@/lib/ersatzteile";
import SuchFeld from "@/components/SuchFeld";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Hausbau Hero: Ersatzteile und Reparatur rund ums Haus" },
  description:
    "Was ist kaputt? Vom Wasserhahn bis zum Dachfenster: Ursache finden, das passende Ersatzteil mit Originalnummer bestellen oder das richtige Produkt wählen.",
  alternates: { canonical: "https://hausbau-hero.de" },
};

// Schnellwege aus dem Kopf: das Symptom, wie man es sagt, und der Bereich, in dem es gelöst wird.
// Gibt es die markenübergreifende Problemseite, führt der Link dorthin, sonst in den Bereich;
// ist der Bereich noch nicht sichtbar, fällt der Eintrag weg. Aus jedem Hauptbereich etwas.
const HAEUFIG = [
  { text: "Wasserhahn tropft", problem: "wasserhahn-tropft", bereich: "waschtisch" },
  { text: "Spülkasten läuft nach", problem: "spuelkasten-laeuft-nach", bereich: "wc-spuelkasten" },
  { text: "Thermostat wird nicht warm", problem: "thermostat-wird-nicht-warm", bereich: "dusche-badewanne" },
  { text: "Dachfenster undicht", problem: "dachfenster-undicht", bereich: "dachfenster" },
  { text: "Rückspülfilter tropft", problem: "rueckspuelfilter-tropft", bereich: "wasserfilter" },
  { text: "Spüle dichtet nicht", problem: "spuele-dichtet-nicht", bereich: "kueche" },
];

// Fehlt ein Ratgeber noch, fällt er weg (ratgeberKarten liest nur aktive Seiten).
const RATGEBER_START = [
  "waschtischarmatur-ratgeber",
  "dachfenster-sonnenschutz",
  "rollladen-elektrisch-nachruesten",
  "rueckspuelfilter",
  "geberit-sigma-drueckerplatte",
  "badewannenarmatur-ratgeber",
  "kuechenarmatur",
  "vorwandelement-wc",
  "kleinhebeanlage",
];

const RECHNER = [
  { href: "/rechner/sanitaer", titel: "Sanitär", text: "Grundbedarf an Rohren, Anschlüssen und Armaturen" },
  { href: "/rechner/fliesen", titel: "Fliesen", text: "Fliesen, Kleber und Fugenmörtel" },
  { href: "/rechner/estrich", titel: "Estrich", text: "Materialmenge und Trocknungszeit" },
];

const SO_GEHTS = [
  { titel: "Symptom oder Nummer", text: "Du sagst, was nicht funktioniert, oder gibst die Nummer vom alten Teil ein." },
  { titel: "Ursache und Modell", text: "Wir zeigen, welches Teil dahintersteckt und woran du dein Modell erkennst." },
  { titel: "Teil mit Originalnummer", text: "Mit Quelle zur Zuordnung und den Shops, die es gerade vorrätig haben." },
];

const GRUNDSAETZE = [
  {
    titel: "Nummern aus Herstellerunterlagen",
    text: "Jede Zuordnung von Teil zu Modell hat eine Quelle: Ersatzteilliste, Datenblatt oder Explosionszeichnung.",
  },
  {
    titel: "Kein Test, den es nicht gab",
    text: "Wir vergleichen Datenblätter und sagen das auch so. Keine Testsieger, keine Sterne, keine Abzeichen.",
  },
  {
    titel: "Reparieren vor Neukauf",
    text: "Neu kaufen empfehlen wir dort, wo das Teil fehlt oder fast so viel kostet wie ein neues Gerät.",
  },
];

/** „A, B und C“ */
function liste(namen: string[]): string {
  return namen.length <= 1 ? namen.join("") : `${namen.slice(0, -1).join(", ")} und ${namen[namen.length - 1]}`;
}

// Startseite nach dem Muster von womo-teile (docs/SEITENAUFBAU.md, Abschnitt 2a): oben zwei Einstiege
// (Nummer suchen, Problem), dann die Bereiche im Haus, Marken, Ratgeber zum Neukauf und Rechner.
export default async function Home() {
  const [marken, ratgeber, hauptbereiche] = await Promise.all([
    alleMarken().catch(() => []),
    ratgeberKarten(RATGEBER_START).catch(() => []),
    sichtbareHauptbereiche(),
  ]);
  const markenGruppen = await markenNachHauptbereich(marken).catch(() => [{ name: "", marken }]);
  const sichtbar = new Set(hauptbereiche.flatMap((h) => h.bereiche.map((b) => b.slug)));
  const haeufig = HAEUFIG.flatMap((h) =>
    problemAllgemeinNachSlug(h.problem)
      ? [{ text: h.text, href: `/problem/${h.problem}` }]
      : sichtbar.has(h.bereich)
        ? [{ text: h.text, href: `/bereich/${h.bereich}` }]
        : [],
  );
  const bereichsNamen = hauptbereiche.map((h) => h.name);
  const markenNamen = marken.map((m) => m.name);

  return (
    <div>
      <section className="vollbreit -mt-8 border-b border-stone-200 sm:-mt-10">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-14 pt-12 sm:px-6 md:pt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pb-20">
          <div>
            <p className="ueberzeile">Ersatzteile und Reparatur rund ums Haus</p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.05] text-stone-900 sm:text-6xl">
              Was ist kaputt? Wir finden das passende Teil.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600">
              Für {liste(bereichsNamen)}: mit Originalnummer, passendem Modell und der Quelle, aus der die Zuordnung
              stammt.
            </p>

            <div className="mt-8">
              <SuchFeld
                id="start-suche"
                platzhalter="Nummer oder Teil"
                hinweis="Die Nummer steht auf dem alten Teil, der Rechnung oder der Anleitung."
              />
            </div>

            <div className="mt-9">
              <p className="text-sm font-medium text-stone-900">Oder direkt zum Problem:</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {haeufig.map((h) => (
                  <li key={h.text}>
                    <a
                      href={h.href}
                      className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-4 py-2 text-sm text-stone-800 transition-colors hover:bg-accent-50 hover:text-accent-800"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="/problem" className="inline-flex px-3 py-2 text-sm font-medium text-accent-700 hover:text-accent-900">
                    Alle Probleme →
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <aside className="lg:pt-10" aria-label="So funktioniert es">
            <ol className="border-t border-stone-900">
              {SO_GEHTS.map((s, i) => (
                <li key={s.titel} className="grid grid-cols-[2.5rem_1fr] border-b border-stone-200 py-5">
                  <span className="font-serif text-2xl leading-none text-accent-700">{i + 1}</span>
                  <span>
                    <span className="block font-semibold text-stone-900">{s.titel}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-stone-600">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl text-stone-900 sm:text-4xl">Wo ist das Problem?</h2>
            <p className="mt-2 text-stone-600">Wähle die Stelle im Haus. Dort stehen Probleme, Teile und Marken.</p>
          </div>
        </div>
        <div className="space-y-10">
          {hauptbereiche.map((h) => (
            <div key={h.slug}>
              {hauptbereiche.length > 1 && <h3 className="ueberzeile mb-4">{h.name}</h3>}
              <div className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                {h.bereiche.map((b) => (
                  <BereichKachel key={b.slug} b={b} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {marken.length > 0 && (
        <section className="mt-16 border-y border-stone-200 py-8 sm:mt-20">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
            <h2 className="shrink-0 font-sans text-sm font-semibold text-stone-900">
              Ersatzteile nach Marke
              <span className="block font-normal text-stone-500">mit Originalnummer</span>
            </h2>
            <div className="space-y-4">
              {markenGruppen.map((g) => (
                <div key={g.name} className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                  {markenGruppen.length > 1 && <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-stone-500 sm:w-32">{g.name}</span>}
                  <ul className="flex flex-wrap gap-x-7 gap-y-3">
                    {g.marken.map((m) => (
                      <li key={m.id}>
                        <a href={`/ersatzteile/${m.slug}`} className="font-serif text-xl text-stone-700 transition-colors hover:text-accent-700 sm:text-2xl">
                          {m.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {ratgeber.length > 0 && (
        <section className="mt-16 sm:mt-20">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="ueberzeile">Ratgeber</p>
              <h2 className="mt-3 text-3xl text-stone-900 sm:text-4xl">Neu kaufen statt reparieren</h2>
              <p className="mt-2 max-w-xl leading-relaxed text-stone-600">
                Welches Produkt passt zu deiner Situation? Mit Maßen aus den Datenblättern, ohne Testsieger.
              </p>
            </div>
            <a href="/ratgeber" className="weiterlink">Alle Ratgeber</a>
          </div>
          <RatgeberKarten liste={ratgeber} />
        </section>
      )}

      <section className="vollbreit mt-20 bg-stone-100 sm:mt-24">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-16">
          <h2 className="max-w-xl text-3xl text-stone-900 sm:text-4xl">So arbeiten wir</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-10">
            {GRUNDSAETZE.map((g) => (
              <div key={g.titel} className="border-t-2 border-accent-600 pt-5">
                <h3 className="font-semibold text-stone-900">{g.titel}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16 sm:mt-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl text-stone-900">Rechner</h2>
            <p className="mt-2 text-stone-600">Für die Planung: wie viel Material du brauchst.</p>
          </div>
          <a href="/rechner" className="weiterlink">Alle Rechner</a>
        </div>
        <ul className="mt-6 grid border-t border-stone-200 sm:grid-cols-3">
          {RECHNER.map((r) => (
            <li key={r.href} className="border-b border-stone-200 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
              <a href={r.href} className="group block py-5">
                <span className="block font-semibold text-stone-900 group-hover:text-accent-700">{r.titel}</span>
                <span className="mt-1 block text-sm text-stone-600">{r.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-16 max-w-3xl text-sm leading-relaxed text-stone-500">
        Auf hausbau-hero.de findest du Ersatzteile rund ums Haus, für {liste(bereichsNamen)}, von {liste(markenNamen)}: mit
        Original-Artikelnummer und der Quelle, aus der die Zuordnung stammt. Die Problemlöser führen vom Symptom zum Teil,
        die Ratgeber helfen, wenn sich ein Neukauf mehr lohnt.
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { BereichKachel, RatgeberKarten } from "@/components/Bereich";
import { markenNachHauptbereich, ratgeberKarten, sichtbareHauptbereiche } from "@/lib/bereiche-daten";
import { problemAllgemeinNachSlug } from "@/lib/probleme-allgemein";
import { alleMarken, anzahlTeile, teileJeMarke, type MarkenZahl } from "@/lib/ersatzteile";
import { teilartNachSlug } from "@/lib/teilarten";
import { DRUECKERPLATTE_KACHEL, MarkenKachel, TeilKachel, type TeilKachelDaten } from "@/components/Kacheln";
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

// Die meistgesuchten Teile als Kacheln im Kopf, damit man sofort sieht, worum es geht. Aus jedem Hauptbereich etwas.
const GESUCHT = [
  "kartusche",
  "fuellventil",
  "drueckerplatte",
  "perlator",
  "eckventil",
  "siphon",
  "filtereinsatz",
  "rollladengurt",
  "dachfenster-rollo",
];

// Beispiele unter der Suche: zwei echte Nummern aus der Datenbank und ein Teil.
const SUCHBEISPIELE = ["46048000", "240.705.00.1", "Füllventil"];

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

// „So funktioniert's“ weiter unten, vor den Grundsätzen.
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
// (Nummer suchen, Problem) und daneben die meistgesuchten Teile, dann die Bereiche im Haus, Marken,
// Ratgeber zum Neukauf, so funktioniert es, Rechner.
export default async function Home() {
  const [marken, ratgeber, hauptbereiche, teileGesamt, zahlen] = await Promise.all([
    alleMarken().catch(() => []),
    ratgeberKarten(RATGEBER_START).catch(() => []),
    sichtbareHauptbereiche(),
    anzahlTeile().catch(() => null),
    teileJeMarke().catch(() => new Map<string, MarkenZahl>()),
  ]);
  const gesucht: TeilKachelDaten[] = GESUCHT.flatMap((slug) => {
    if (slug === "drueckerplatte") return [DRUECKERPLATTE_KACHEL];
    const ta = teilartNachSlug(slug);
    return ta ? [{ slug: ta.slug, name: ta.name, href: `/ersatzteile/${ta.slug}`, bereich: ta.bereiche[0] ?? "" }] : [];
  });
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
            <p className="ueberzeile">Ersatzteile für Bad, Küche und Haus</p>
            <h1 className="mt-4 text-[2.5rem] leading-[1.05] text-stone-900 sm:text-6xl">
              Was ist kaputt? Wir finden das passende Teil.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600">
              Kartuschen, Füllventile, Drückerplatten, Filtereinsätze, Rollladengurte und mehr: mit Originalnummer,
              passendem Modell und aktuellem Preis.
            </p>

            <div className="mt-8">
              <SuchFeld
                id="start-suche"
                platzhalter="Nummer oder Teil"
                hinweis={
                  <>
                    Zum Beispiel{" "}
                    {SUCHBEISPIELE.map((b, i) => (
                      <span key={b}>
                        {i > 0 && ", "}
                        <a href={`/ersatzteile?q=${encodeURIComponent(b)}&von=beispiel`} className={`${/\d/.test(b) ? "font-mono " : ""}text-stone-700 underline decoration-stone-300 underline-offset-2 hover:text-accent-700`}>
                          {b}
                        </a>
                      </span>
                    ))}
                    . Die Nummer steht auf dem alten Teil, der Rechnung oder der Anleitung.
                  </>
                }
              />
            </div>

            <p className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-stone-600">
              {teileGesamt && (
                <span>
                  <strong className="font-semibold text-stone-900">{teileGesamt.toLocaleString("de-DE")}</strong> Originalteile
                </span>
              )}
              {marken.length > 0 && (
                <span>
                  <strong className="font-semibold text-stone-900">{marken.length}</strong> Marken
                </span>
              )}
              <span>Nummern aus Herstellerunterlagen</span>
            </p>

            <div className="mt-8">
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

          <aside className="lg:pt-8" aria-labelledby="gesucht">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 id="gesucht" className="font-sans text-sm font-semibold text-stone-900">Häufig gesucht</h2>
              <a href="/ersatzteile#arten" className="text-sm font-medium text-accent-700 hover:text-accent-900">Alle Teile →</a>
            </div>
            <ul className="grid grid-cols-3 gap-2 sm:gap-3">
              {gesucht.map((t) => (
                <li key={t.slug}>
                  <TeilKachel t={t} klein />
                </li>
              ))}
            </ul>
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
        <section className="mt-16 sm:mt-20">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-3xl text-stone-900 sm:text-4xl">Ersatzteile nach Marke</h2>
              <p className="mt-2 text-stone-600">Mit Originalnummer und den Modellen, in die das Teil passt.</p>
            </div>
            <a href="/ersatzteile#marken" className="weiterlink">Alle Marken</a>
          </div>
          <div className="space-y-8">
            {markenGruppen.map((g) => (
              <div key={g.name}>
                {markenGruppen.length > 1 && <h3 className="ueberzeile mb-4">{g.name}</h3>}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {g.marken.map((m) => (
                    <MarkenKachel key={m.id} m={m} zahl={zahlen.get(m.id)} />
                  ))}
                </div>
              </div>
            ))}
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
          <h2 className="max-w-xl text-3xl text-stone-900 sm:text-4xl">So funktioniert es</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-10">
            {SO_GEHTS.map((g, i) => (
              <li key={g.titel} className="grid grid-cols-[2.5rem_1fr]">
                <span className="font-serif text-3xl leading-none text-accent-700">{i + 1}</span>
                <span>
                  <span className="block font-semibold text-stone-900">{g.titel}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-stone-600">{g.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <h3 className="mt-14 font-sans text-sm font-semibold uppercase tracking-wide text-stone-500">So arbeiten wir</h3>
          <div className="mt-5 grid gap-8 md:grid-cols-3 md:gap-10">
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

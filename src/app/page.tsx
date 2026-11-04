import type { Metadata } from "next";
import { BereichKachel, RatgeberKarten } from "@/components/Bereich";
import { ratgeberKarten, sichtbareBereiche } from "@/lib/bereiche-daten";
import { problemAllgemeinNachSlug } from "@/lib/probleme-allgemein";
import { alleMarken } from "@/lib/ersatzteile";

export const revalidate = 300;

export const metadata: Metadata = {
  title: { absolute: "Hausbau Hero: Ersatzteile und Reparatur rund ums Haus" },
  description:
    "Was ist kaputt? Armatur tropft, Spülkasten läuft nach, Thermostat wird nicht warm: Ursache finden, das passende Ersatzteil mit Originalnummer bestellen oder das richtige Produkt wählen.",
  alternates: { canonical: "https://hausbau-hero.de" },
};

// Schnellwege aus dem Kopf: das Symptom, wie man es sagt, und der Bereich, in dem es gelöst wird.
// Gibt es die markenübergreifende Problemseite, führt der Link dorthin, sonst in den Bereich.
const HAEUFIG = [
  { text: "Wasserhahn tropft", problem: "wasserhahn-tropft", bereich: "waschtisch" },
  { text: "Spülkasten läuft nach", problem: "spuelkasten-laeuft-nach", bereich: "wc-spuelkasten" },
  { text: "Thermostat wird nicht warm", problem: "thermostat-wird-nicht-warm", bereich: "dusche-badewanne" },
  { text: "Spüle dichtet nicht", problem: "spuele-dichtet-nicht", bereich: "kueche" },
].map((h) => ({ text: h.text, href: problemAllgemeinNachSlug(h.problem) ? `/problem/${h.problem}` : `/bereich/${h.bereich}` }));

const RATGEBER_START = [
  "waschtischarmatur-ratgeber",
  "geberit-sigma-drueckerplatte",
  "badewannenarmatur-ratgeber",
  "vorwandelement-wc",
  "kleinhebeanlage",
  "waschtischarmatur-mit-brause",
];

const RECHNER = [
  { href: "/rechner/sanitaer", titel: "Sanitär", text: "Grundbedarf an Rohren, Anschlüssen und Armaturen" },
  { href: "/rechner/fliesen", titel: "Fliesen", text: "Fliesen, Kleber und Fugenmörtel" },
  { href: "/rechner/estrich", titel: "Estrich", text: "Materialmenge und Trocknungszeit" },
];

// Startseite nach dem Muster von womo-teile (docs/SEITENAUFBAU.md, Abschnitt 2a): oben zwei Einstiege
// (Nummer suchen, Problem), dann die Bereiche im Haus, Marken, Ratgeber zum Neukauf und Rechner.
export default async function Home() {
  const [marken, ratgeber, bereiche] = await Promise.all([
    alleMarken().catch(() => []),
    ratgeberKarten(RATGEBER_START).catch(() => []),
    sichtbareBereiche(),
  ]);

  return (
    <div>
      <section className="-mx-4 -mt-8 px-4 pt-12 pb-12 md:pt-16 bg-stone-100 border-b border-stone-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-center text-stone-900">
            Ersatzteile und Reparatur rund ums Haus
          </h1>
          <p className="mt-3 text-lg text-stone-600 text-center">Was ist kaputt? Fang dort an, wo du gerade stehst.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <form action="/ersatzteile" method="get" role="search" className="flex flex-col p-5 bg-white border border-stone-200 rounded-xl">
              <label htmlFor="start-suche" className="font-semibold text-stone-900">
                Teil oder Artikelnummer
              </label>
              <span className="text-sm text-stone-500">Die Nummer steht auf dem alten Teil, der Rechnung oder der Anleitung.</span>
              <input
                id="start-suche"
                name="q"
                type="search"
                placeholder="z. B. 46048000 oder Füllventil"
                className="mt-3 px-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:border-amber-500"
              />
              <button type="submit" className="mt-3 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700">
                Suchen
              </button>
            </form>

            <div className="flex flex-col p-5 bg-white border border-stone-200 rounded-xl">
              <span className="font-semibold text-stone-900">Etwas funktioniert nicht</span>
              <span className="text-sm text-stone-500">Erst die Ursache finden, dann das passende Teil.</span>
              <ul className="mt-3 grid grid-cols-1 gap-2">
                {HAEUFIG.map((h) => (
                  <li key={h.text}>
                    <a
                      href={h.href}
                      className="flex justify-between px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 hover:border-amber-400 hover:text-amber-700"
                    >
                      {h.text} <span aria-hidden className="text-stone-400">›</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="/problem" className="mt-3 text-sm text-amber-700 hover:underline">
                Alle Probleme ansehen →
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 mb-12">
        <h2 className="text-2xl font-bold mb-1">Wo ist das Problem?</h2>
        <p className="text-stone-600 mb-5">Wähle die Stelle im Haus. Dort stehen Probleme, Teile und Marken.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {bereiche.map((b) => (
            <BereichKachel key={b.slug} b={b} />
          ))}
        </div>
      </section>

      {marken.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-1">Ersatzteile nach Marke</h2>
          <p className="text-stone-600 mb-5">Mit Originalnummer, passenden Modellen und häufigen Fragen.</p>
          <div className="flex flex-wrap gap-2">
            {marken.map((m) => (
              <a
                key={m.id}
                href={`/ersatzteile/${m.slug}`}
                className="px-4 py-2 bg-white border border-stone-200 rounded-lg font-medium text-stone-800 hover:border-amber-400 hover:text-amber-700"
              >
                {m.name}
              </a>
            ))}
          </div>
        </section>
      )}

      {ratgeber.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-1">Neu kaufen statt reparieren</h2>
          <p className="text-stone-600 mb-5">Welches Produkt passt zu deiner Situation? Mit Maßen aus den Datenblättern.</p>
          <RatgeberKarten liste={ratgeber} />
          <a href="/ratgeber" className="inline-block mt-4 text-sm text-amber-700 hover:underline">
            Alle Ratgeber →
          </a>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-1">Rechner</h2>
        <p className="text-stone-600 mb-5">Für die Planung: wie viel Material du brauchst.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {RECHNER.map((r) => (
            <a key={r.href} href={r.href} className="group block p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400">
              <span className="block font-semibold text-stone-900 group-hover:text-amber-700">{r.titel}</span>
              <span className="block text-sm text-stone-600 mt-1">{r.text}</span>
            </a>
          ))}
        </div>
      </section>

      <p className="mb-8 max-w-3xl text-sm text-stone-500 leading-relaxed">
        Auf hausbau-hero.de findest du Ersatzteile für Armaturen, Thermostate, Spülkästen und Küchenspülen von Grohe,
        hansgrohe, Ideal Standard, Geberit, Blanco und Franke, mit Original-Artikelnummer und der Quelle, aus der die
        Zuordnung stammt. Die Problemlöser führen vom Symptom zum Teil, die Ratgeber helfen, wenn sich ein Neukauf mehr lohnt.
      </p>
    </div>
  );
}

import type { Metadata } from "next";
import { BereichKachel, RatgeberKarten } from "@/components/Bereich";
import { Brotkrumen, JsonLd, brotkrumenLd } from "@/components/Ersatzteile";
import { BEREICHE } from "@/lib/bereiche";
import { ratgeberKarten, sichtbareBereiche } from "@/lib/bereiche-daten";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Ratgeber: welches Produkt passt?",
  description:
    "Welches Produkt passt zu deiner Situation, wenn sich die Reparatur nicht mehr lohnt? Auswahlhilfen mit Maßen aus den Datenblättern der Hersteller.",
  alternates: { canonical: "https://hausbau-hero.de/ratgeber" },
};

// Übersicht aller Ratgeber, nach Bereich geordnet. Ein Ratgeber, der in keinem Bereich steht, erscheint hier nicht.
export default async function RatgeberUebersicht() {
  const sichtbar = await sichtbareBereiche();
  const gruppen = await Promise.all(
    BEREICHE.filter((b) => b.ratgeber.length > 0).map(async (b) => ({ b, liste: await ratgeberKarten(b.ratgeber) })),
  );
  const pfad = [
    { name: "Start", href: "/" },
    { name: "Ratgeber", href: "/ratgeber" },
  ];

  return (
    <div className="max-w-4xl">
      <JsonLd daten={brotkrumenLd(pfad)} />
      <Brotkrumen teile={[pfad[0], { name: "Ratgeber" }]} />
      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold mb-3">Ratgeber: welches Produkt passt?</h1>
      <p className="text-lg text-stone-700 max-w-2xl mb-10">
        Wenn sich die Reparatur nicht mehr lohnt oder etwas neu dazukommt: was zu deiner Situation passt, mit Maßen aus
        den Datenblättern der Hersteller.
      </p>
      {gruppen
        .filter((g) => g.liste.length > 0)
        .map(({ b, liste }) => (
          <section key={b.slug} className="mb-12">
            <h2 className="text-[1.75rem] font-semibold leading-tight mb-4">
              <a href={`/bereich/${b.slug}`} className="hover:text-accent-700">
                {b.name}
              </a>
            </h2>
            <RatgeberKarten liste={liste} />
          </section>
        ))}
      <section className="mb-12">
        <h2 className="text-[1.75rem] font-semibold leading-tight mb-4">Nach Bereich</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {sichtbar.map((b) => (
            <BereichKachel key={b.slug} b={b} />
          ))}
        </div>
      </section>
    </div>
  );
}

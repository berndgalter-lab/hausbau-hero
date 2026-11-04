import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import { armaturDaten, merkmaleFuer } from "@/lib/armatur-daten";
import { formatEuro, zeigePreis } from "@/lib/ersatzteile";
import { bildAusAngeboten, type EanAngebot } from "@/lib/kaufberatung";
import { produktLink, type Produkt } from "@/components/ProduktKarte";
import TeilBild from "@/components/TeilBild";

// Technische Daten aller Produkte einer Kaufberatung nebeneinander, aus produkte.technische_daten.
// Erscheint nur, wenn mindestens zwei Produkte Daten haben. Fehlende Angaben stehen als „k. A.“ da:
// lieber eine Lücke als eine geschätzte Zahl.
export default function VergleichsTabelle({ produkte, angebote }: {
  produkte: Produkt[];
  angebote: Record<string, EanAngebot[]>;
}) {
  const mitDaten = produkte.filter((p) => armaturDaten(p.technische_daten));
  if (mitDaten.length < 2) return null;
  const daten = mitDaten.map((p) => armaturDaten(p.technische_daten));
  const merkmale = merkmaleFuer(daten);
  const bilder = mitDaten.map((p) => bildAusAngeboten(angebote[p.id] ?? []));

  return (
    <section className="mt-10 mb-8">
      <h2 className="text-2xl font-bold mb-1">Technische Daten im Vergleich</h2>
      <p className="text-sm text-stone-500 mb-4">
        Herstellerangaben. „k. A.“ heißt: keine verlässliche Angabe gefunden. Alle Armaturen nebeneinander findest du im{" "}
        <a href="/vergleich/armaturen" className="text-amber-700 hover:underline">Armaturen-Vergleich</a>.
      </p>
      <div className="overflow-x-auto border border-stone-200 rounded-xl bg-white">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="align-top">
              <th className="sticky left-0 bg-white p-3 text-left text-stone-500 font-medium w-36">Modell</th>
              {mitDaten.map((p, i) => (
                <th key={p.id} className="p-3 text-left font-semibold text-stone-900 min-w-[150px]">
                  {/* gleiche Höhe für alle Köpfe, auch ohne Bild, damit die Namen auf einer Linie stehen */}
                  {bilder.some(Boolean) && (
                    <div className="mb-2 h-[88px]">
                      {bilder[i] && <TeilBild url={bilder[i]!.url} alt={p.name} groesse={88} />}
                    </div>
                  )}
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {merkmale.map((m) => (
              <tr key={m.key}>
                <th scope="row" className="sticky left-0 bg-white p-3 text-left text-stone-500 font-medium">{m.label}</th>
                {daten.map((d, i) => (
                  <td key={mitDaten[i].id} className="p-3 text-stone-700">
                    {(d && m.wert(d)) ?? <span className="text-stone-400">k. A.</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="sticky left-0 bg-white p-3 text-left text-stone-500 font-medium">Kaufen</th>
              {mitDaten.map((p) => {
                const link = produktLink(p);
                const guenstig = (angebote[p.id] ?? []).find(zeigePreis);
                const kennung = (p.hersteller_nr || p.name).slice(0, 80);
                return (
                  <td key={p.id} className="p-3 space-y-1.5">
                    {link && (
                      <a href={link} target="_blank" rel={AFFILIATE_REL} data-platzierung="box" data-kennung={kennung}
                        className="block text-amber-700 font-semibold hover:underline">Amazon →</a>
                    )}
                    {guenstig && (
                      <a href={mitTrackingId(guenstig.url, "angebot")} target="_blank" rel={AFFILIATE_REL}
                        data-platzierung="angebot" data-shop={guenstig.shop} data-kennung={kennung}
                        className="block text-amber-700 hover:underline whitespace-nowrap">
                        {formatEuro(guenstig.preis!)} bei {guenstig.shop_name} →
                      </a>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

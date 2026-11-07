import { TeilartBild } from "@/components/BereichBild";
import { KaufButton } from "@/components/Ersatzteile";
import TeilBild from "@/components/TeilBild";
import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import { formatEuro, zeigePreis, type Angebot, type Teil } from "@/lib/ersatzteile";
import type { ProblemAllgemein } from "@/lib/probleme-allgemein";
import { teilartNachSlug, zeichnungFuerTeiltyp } from "@/lib/teilarten";

// Kasten „Das brauchst du wahrscheinlich“ oben auf den Problemseiten, damit gleich nach dem Symptom etwas
// zum Anfassen kommt. Ein Feed-Foto nur zusammen mit dem Angebot desselben Shops (Awin-Bedingungen),
// sonst die Zeichnung der Teileart.

function Rahmen({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <section className="mb-12 rounded-2xl bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-stone-900/[0.07] sm:p-5">
      <h2 className="ueberzeile !font-sans mb-3">{titel}</h2>
      {children}
    </section>
  );
}

function Zeichnung({ slug, bereich }: { slug: string; bereich?: string }) {
  return (
    <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-accent-50/70 text-accent-700">
      <TeilartBild slug={slug} bereich={bereich} className="h-11 w-11" />
    </span>
  );
}

/** Problem je Marke: die Originalteile der Ursachen mit Foto und Preis. */
export function TeileKasten({ teile, angebote, marke }: { teile: Teil[]; angebote: Angebot[]; marke: string }) {
  if (teile.length === 0) return null;
  return (
    <Rahmen titel="Das brauchst du wahrscheinlich">
      <ul className="grid gap-4 sm:grid-cols-3">
        {teile.map((t) => {
          const eigene = angebote.filter((a) => a.teil_id === t.id);
          // Foto und Preislink vom selben Shop, sonst das günstigste Angebot ohne Foto.
          const mitBild = t.bild_url ? eigene.find((a) => a.shop === t.bild_shop && zeigePreis(a)) : undefined;
          const angebot = mitBild ?? eigene.filter(zeigePreis).sort((x, y) => x.preis! - y.preis!)[0];
          const zeichnung = zeichnungFuerTeiltyp(t.teiltyp, marke);
          return (
            <li key={t.id} className="flex gap-3 sm:flex-col">
              {mitBild ? (
                <TeilBild url={t.bild_url} alt={t.name} groesse={64} ersatz={zeichnung && <Zeichnung {...zeichnung} />} />
              ) : (
                zeichnung && <Zeichnung {...zeichnung} />
              )}
              <div className="min-w-0 text-sm">
                <a href={`/teil/${t.slug}`} className="font-semibold leading-snug text-stone-900 hover:text-accent-700">
                  {t.name}
                </a>
                {t.oem_nummer && <span className="block font-mono text-xs text-stone-500">Nr. {t.oem_nummer}</span>}
                <span className="mt-1 block">
                  {angebot ? (
                    <a
                      href={mitTrackingId(angebot.url, "angebot")}
                      target="_blank"
                      rel={AFFILIATE_REL}
                      data-platzierung="angebot"
                      data-shop={angebot.shop}
                      data-kennung={t.oem_nummer ?? t.slug}
                      className="kauflink"
                    >
                      {formatEuro(angebot.preis!)} bei {angebot.shop_name}
                    </a>
                  ) : (
                    <KaufButton teil={t} />
                  )}
                  {angebot && "*"}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[11px] leading-snug text-stone-500">* Partnerlinks: Kaufst du darüber, bekommen wir eine Provision. Preise inkl. MwSt., maßgeblich ist der Shop.</p>
    </Rahmen>
  );
}

/** Problem für alle Marken: die Teilearten der Ursachen mit Zeichnung, Häufigkeit und Link. */
export function TeilartenKasten({ ursachen }: { ursachen: ProblemAllgemein["ursachen"] }) {
  const gesehen = new Set<string>();
  const karten = ursachen.flatMap((u) => {
    const ta = u.teilart ? teilartNachSlug(u.teilart) : null;
    if (!ta || gesehen.has(ta.slug)) return [];
    gesehen.add(ta.slug);
    return [{ ta, haeufigkeit: u.haeufigkeit }];
  });
  if (karten.length === 0) return null;
  return (
    <Rahmen titel="Meist steckt eins dieser Teile dahinter">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {karten.slice(0, 3).map(({ ta, haeufigkeit }) => (
          <li key={ta.slug}>
            <a href={`/ersatzteile/${ta.slug}`} className="group flex h-full items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-accent-50">
              <Zeichnung slug={ta.slug} bereich={ta.bereiche[0]} />
              <span className="min-w-0">
                <span className="block font-semibold leading-snug text-stone-900 group-hover:text-accent-700">{ta.name}</span>
                {haeufigkeit && <span className="block text-xs text-stone-500">{haeufigkeit}</span>}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Rahmen>
  );
}

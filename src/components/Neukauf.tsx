import TeilBild from "@/components/TeilBild";
import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import { formatEuro, formatStand } from "@/lib/ersatzteile";
import type { Neukauf, NeukaufModell } from "@/lib/neukauf";

/**
 * Teilt „hansgrohe Logis 100 mit Zugstangen-Ablaufgarnitur (71100000)“ in Modell
 * („Logis 100“), Ausstattung („mit Zugstangen-Ablaufgarnitur“) und Artikelnummer.
 */
function namensteile(m: NeukaufModell) {
  let rest = m.name.trim();
  if (m.hersteller && rest.toLowerCase().startsWith(m.hersteller.toLowerCase() + " ")) {
    rest = rest.slice(m.hersteller.length + 1);
  }
  const nr = rest.match(/\s*\(([\d.\s-]+)\)\s*$/);
  if (nr) rest = rest.slice(0, nr.index);
  const mit = rest.search(/\s(mit|inkl\.|ohne)\s/);
  return {
    modell: mit > 0 ? rest.slice(0, mit) : rest,
    ausstattung: mit > 0 ? rest.slice(mit + 1) : null,
    nummer: nr ? nr[1].trim() : null,
  };
}

/** Ziel der Karte: Partnershop-Angebot, sonst Amazon, sonst Shop-Link ohne Feed-Preis. */
function kaufziel(m: NeukaufModell) {
  const a = m.angebot;
  if (a) return { url: a.url, shop: a.shop, preis: a.preis, text: `bei ${a.shop_name} →` };
  if (m.amazonUrl) return { url: m.amazonUrl, shop: "amazon", preis: null, text: "Preis bei Amazon ansehen →" };
  if (m.shopLink) return { url: m.shopLink.url, shop: m.shopLink.shop, preis: null, text: `Preis bei ${m.shopLink.shop_name} ansehen →` };
  return null;
}

/**
 * Neukauf-Hinweis auf Serien-, Größen-, Teil- und Problemseiten (docs/SEITENAUFBAU.md, Abschnitt 2a):
 * links, wann sich Neukauf mehr lohnt, und der Link zum Ratgeber; rechts bis zu drei Modelle mit
 * großem Bild und Partnershop-Preis oder Amazon-Link. Die ganze Karte führt zum Shop, sichtbar bleibt
 * der Kauflink eine Textzeile wie im Angebote-Kasten, kein Knopf.
 */
export default function NeukaufKasten({ n }: { n: Neukauf | null }) {
  if (!n) return null;
  const aeltester = n.modelle.reduce<string | null>((m, x) => (x.angebot && (!m || x.angebot.stand < m) ? x.angebot.stand : m), null);
  const preise = n.modelle.flatMap((m) => (m.angebot?.preis != null ? [m.angebot.preis] : []));
  const guenstigster = preise.length ? Math.min(...preise) : null;
  const mitAmazon = n.modelle.some((m) => !m.angebot && m.amazonUrl);
  // Ohne ein einziges Feed-Foto (etwa VELUX nur über Amazon) keine leeren Bildflächen zeigen
  const mitBild = n.modelle.some((m) => m.bild);
  const hinweis = (
    <>
      Partnerlinks: Kaufst du darüber, bekommen wir eine Provision.
      {aeltester && ` Preise inkl. MwSt., Stand ${formatStand(aeltester)} Uhr, maßgeblich ist der Shop.`}
      {mitAmazon && " Als Amazon-Partner verdienen wir an qualifizierten Verkäufen."}
    </>
  );
  return (
    <section className="mb-12 rounded-2xl bg-stone-100 p-5 sm:p-8 [container-type:inline-size]">
      <div className="[@container(min-width:52rem)]:grid [@container(min-width:52rem)]:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] [@container(min-width:52rem)]:gap-10">
      <div className="mb-7 [@container(min-width:52rem)]:mb-0 flex flex-col">
        <p className="ueberzeile mb-2">Neu kaufen</p>
        <h2 className="text-2xl sm:text-[1.75rem] font-semibold leading-tight mb-3 max-w-2xl">{n.titel}</h2>
        <p className="text-stone-700 leading-relaxed mb-4 max-w-2xl">{n.text}</p>
        {guenstigster != null && (
          <p className="text-sm text-stone-600 mb-5">
            Gute Modelle gibt es ab <span className="font-semibold text-stone-900 tabular-nums">{formatEuro(guenstigster)}</span>.
          </p>
        )}
        {n.ratgeberHref && (
          <a href={n.ratgeberHref} className="weiterlink">
            Welche passt zu dir? Zum Ratgeber
          </a>
        )}
        <p className="mt-auto pt-6 text-[11px] leading-snug text-stone-500 hidden [@container(min-width:52rem)]:block">{hinweis}</p>
      </div>
      <ul className="grid grid-cols-1 [@container(min-width:30rem)]:grid-cols-3 gap-x-4 gap-y-6">
        {n.modelle.map((m) => {
          const t = namensteile(m);
          const ziel = kaufziel(m);
          const inhalt = (
            <>
              {mitBild && (
                <div className="w-28 [@container(min-width:30rem)]:w-full shrink-0 self-start overflow-hidden rounded-xl ring-1 ring-stone-900/[0.06] transition-transform duration-200 group-hover:-translate-y-0.5">
                  <TeilBild
                    url={m.bild?.url ?? null}
                    alt={m.name}
                    fuellen
                    ersatz={<div className="aspect-square w-full bg-white" />}
                  />
                </div>
              )}
              <div className="min-w-0 flex flex-col flex-1">
                {m.hersteller && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-stone-500">{m.hersteller}</span>
                )}
                <span className="font-serif text-lg font-semibold leading-snug text-stone-900 hyphens-auto break-words">{t.modell}</span>
                {(t.ausstattung || t.nummer) && (
                  <span className="text-xs leading-snug text-stone-500 mt-0.5">
                    {t.ausstattung}
                    {t.ausstattung && t.nummer && " · "}
                    {t.nummer && <span className="tabular-nums">{t.nummer}</span>}
                  </span>
                )}
                {m.hinweis && <span className="text-xs leading-snug text-stone-600 mt-1">{m.hinweis}</span>}
                {ziel && (
                  <span className="mt-auto pt-3 flex flex-col items-start">
                    {ziel.preis != null && (
                      <span className="text-lg font-semibold tabular-nums text-stone-900">{formatEuro(ziel.preis)}</span>
                    )}
                    <span className="kauflink text-sm">{ziel.text}</span>
                  </span>
                )}
              </div>
            </>
          );
          const klassen = "group flex [@container(min-width:30rem)]:flex-col gap-4 [@container(min-width:30rem)]:gap-3 h-full";
          return (
            <li key={m.name}>
              {ziel ? (
                <a
                  href={mitTrackingId(ziel.url, "neukauf")}
                  target="_blank"
                  rel={AFFILIATE_REL}
                  data-platzierung="neukauf"
                  data-shop={ziel.shop}
                  data-kennung={m.name}
                  className={klassen}
                >
                  {inhalt}
                </a>
              ) : (
                <div className={klassen}>{inhalt}</div>
              )}
            </li>
          );
        })}
      </ul>
      </div>
      <p className="mt-6 text-[11px] leading-snug text-stone-500 [@container(min-width:52rem)]:hidden">{hinweis}</p>
    </section>
  );
}

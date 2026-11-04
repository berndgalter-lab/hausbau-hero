import TeilBild from "@/components/TeilBild";
import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";
import { formatEuro, formatStand } from "@/lib/ersatzteile";
import type { Neukauf, NeukaufModell } from "@/lib/neukauf";

function KaufZeile({ m }: { m: NeukaufModell }) {
  const a = m.angebot;
  const url = a ? a.url : m.amazonUrl ?? m.shopLink?.url;
  if (!url) return null;
  return (
    <a
      href={mitTrackingId(url, "neukauf")}
      target="_blank"
      rel={AFFILIATE_REL}
      data-platzierung="neukauf"
      data-shop={a ? a.shop : m.amazonUrl ? "amazon" : m.shopLink?.shop}
      data-kennung={m.name}
      className="kauflink text-sm"
    >
      {a ? `${formatEuro(a.preis!)} bei ${a.shop_name} →` : m.amazonUrl ? "Preis bei Amazon ansehen →" : `Preis bei ${m.shopLink?.shop_name} ansehen →`}
    </a>
  );
}

/**
 * Neukauf-Hinweis auf Serien-, Größen-, Teil- und Problemseiten (docs/SEITENAUFBAU.md, Abschnitt 2a):
 * wann sich Neukauf mehr lohnt, bis zu drei passende Modelle mit Bild und Partnershop-Preis oder Amazon-Link.
 * Kauflinks bleiben Textzeilen wie im Angebote-Kasten, keine Knöpfe.
 */
export default function NeukaufKasten({ n }: { n: Neukauf | null }) {
  if (!n) return null;
  const aeltester = n.modelle.reduce<string | null>((m, x) => (x.angebot && (!m || x.angebot.stand < m) ? x.angebot.stand : m), null);
  const mitAmazon = n.modelle.some((m) => m.amazonUrl);
  return (
    <section className="mb-12 rounded-2xl bg-stone-100 p-5 sm:p-7">
      <p className="ueberzeile mb-2">Neu kaufen</p>
      <h2 className="text-2xl font-semibold leading-tight mb-2">{n.titel}</h2>
      <p className="text-stone-700 max-w-2xl mb-6 leading-relaxed">{n.text}</p>
      <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {n.modelle.map((m) => (
          <li key={m.name} className="flex sm:flex-col gap-3">
            {m.bild && <TeilBild url={m.bild.url} alt={m.name} groesse={96} />}
            <div className="min-w-0 flex flex-col gap-1">
              <span className="text-sm font-medium text-stone-900">{m.name}</span>
              {m.hinweis && <span className="text-xs text-stone-600 leading-snug">{m.hinweis}</span>}
              <KaufZeile m={m} />
            </div>
          </li>
        ))}
      </ul>
      {n.ratgeberHref && (
        <a href={n.ratgeberHref} className="weiterlink mt-6">
          Welche passt zu dir? Zum Ratgeber
        </a>
      )}
      <p className="mt-3 text-[11px] leading-snug text-stone-500">
        Partnerlinks: Kaufst du darüber, bekommen wir eine Provision.
        {aeltester && ` Preise inkl. MwSt., Stand ${formatStand(aeltester)} Uhr, maßgeblich ist der Shop.`}
        {mitAmazon && " Als Amazon-Partner verdienen wir an qualifizierten Verkäufen."}
      </p>
    </section>
  );
}

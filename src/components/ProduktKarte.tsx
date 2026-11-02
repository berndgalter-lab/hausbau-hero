import { getAffiliateLink, formatPreis } from "@/lib/rechner-logic";
import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";

export interface Produkt {
  id: string;
  name: string;
  hersteller?: string;
  amazon_asin?: string;
  affiliate_url?: string;
  preis_von?: number;
  preis_bis?: number;
  bewertung?: number;
  einsatzbereich?: string;
  kurzbeschreibung?: string;
  vorteile?: string[];
  nachteile?: string[];
  ist_testsieger?: boolean;
  ist_preistipp?: boolean;
}

export function produktLink(produkt: Produkt): string | null {
  const link = getAffiliateLink(produkt.affiliate_url, produkt.amazon_asin);
  return link ? mitTrackingId(link, "box") : null;
}

function Badges({ produkt }: { produkt: Produkt }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {produkt.ist_testsieger && (
        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded">Unsere Empfehlung</span>
      )}
      {produkt.ist_preistipp && (
        <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-0.5 rounded">Preis-Tipp</span>
      )}
      {produkt.einsatzbereich && (
        <span className="bg-stone-100 text-stone-600 text-xs px-2 py-0.5 rounded">{produkt.einsatzbereich}</span>
      )}
    </div>
  );
}

export default function ProduktKarte({ produkt, compact = false }: { produkt: Produkt; compact?: boolean }) {
  const link = produktLink(produkt);

  if (compact) {
    return (
      <div className="flex items-center justify-between gap-3 bg-white rounded-lg p-3 border border-stone-200">
        <div>
          <div className="font-medium text-sm">{produkt.name}</div>
          {produkt.kurzbeschreibung && (
            <div className="text-xs text-stone-500">{produkt.kurzbeschreibung}</div>
          )}
        </div>
        {link && (
          <a href={link} target="_blank" rel={AFFILIATE_REL}
            className="bg-amber-600 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap">
            Auf Amazon →
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 relative">
      <div className="flex items-start justify-between mb-3">
        <div>
          <Badges produkt={produkt} />
          <h3 className="text-lg font-semibold mt-1">{produkt.name}</h3>
          {produkt.hersteller && <div className="text-sm text-stone-500">{produkt.hersteller}</div>}
        </div>
        {produkt.preis_von && (
          <div className="text-right">
            <div className="text-lg font-bold text-stone-900">
              {produkt.preis_bis && produkt.preis_bis !== produkt.preis_von
                ? `${formatPreis(produkt.preis_von)} – ${formatPreis(produkt.preis_bis)}`
                : formatPreis(produkt.preis_von)}
            </div>
          </div>
        )}
      </div>

      {produkt.kurzbeschreibung && (
        <p className="text-sm text-stone-600 mb-3">{produkt.kurzbeschreibung}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {produkt.vorteile && produkt.vorteile.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-green-700 mb-1">Vorteile</div>
            <ul className="text-xs text-stone-600 space-y-1">
              {produkt.vorteile.map((v: string, i: number) => (
                <li key={i} className="flex gap-1"><span className="text-green-500">+</span> {v}</li>
              ))}
            </ul>
          </div>
        )}
        {produkt.nachteile && produkt.nachteile.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-red-700 mb-1">Nachteile</div>
            <ul className="text-xs text-stone-600 space-y-1">
              {produkt.nachteile.map((n: string, i: number) => (
                <li key={i} className="flex gap-1"><span className="text-red-500">−</span> {n}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {link && (
        <a href={link} target="_blank" rel={AFFILIATE_REL}
          className="block w-full text-center bg-amber-600 text-white font-semibold py-2.5 rounded-lg hover:bg-amber-700 transition-colors">
          Aktuellen Preis auf Amazon prüfen →
        </a>
      )}
    </div>
  );
}

// Kompakte Übersicht ganz oben im Artikel: wer schon weiß, was er will,
// kommt mit einem Klick zum Produkt, ohne den ganzen Text zu lesen.
export function ProduktUebersicht({ produkte }: { produkte: Produkt[] }) {
  if (produkte.length === 0) return null;
  return (
    <section className="mb-8 border-2 border-amber-300 rounded-xl overflow-hidden">
      <div className="bg-amber-50 px-4 py-3 border-b border-amber-200">
        <h2 className="text-lg font-bold text-stone-900">Unsere Empfehlungen auf einen Blick</h2>
      </div>
      <ul className="divide-y divide-stone-100 bg-white">
        {produkte.map((p) => {
          const link = produktLink(p);
          return (
            <li key={p.id} className="flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3">
              <div className="flex-1 min-w-0">
                <Badges produkt={p} />
                <div className="font-semibold text-stone-900 mt-1">{p.name}</div>
              </div>
              {link && (
                <a href={link} target="_blank" rel={AFFILIATE_REL}
                  className="shrink-0 text-center bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors whitespace-nowrap">
                  Preis prüfen →
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

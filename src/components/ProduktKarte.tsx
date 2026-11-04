import { getAffiliateLink } from "@/lib/rechner-logic";
import { AFFILIATE_REL, mitTrackingId } from "@/lib/affiliate";

// Produkte der Artikel (Tabelle produkte). Die Modelle eines Ratgebers zeigt ModellAbschnitt in
// components/Ratgeber.tsx, hier bleibt nur die kompakte Zeile für die Werkzeugliste.

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
  ean?: string | null;
  hersteller_nr?: string | null;
  technische_daten?: Record<string, unknown> | null;
}

export function produktLink(produkt: Produkt): string | null {
  const link = getAffiliateLink(produkt.affiliate_url, produkt.amazon_asin);
  return link ? mitTrackingId(link, "box") : null;
}

export default function ProduktKarte({ produkt }: { produkt: Produkt }) {
  const link = produktLink(produkt);
  return (
    <div className="flex items-center justify-between gap-3 py-3">
      <div>
        <div className="font-medium text-sm">{produkt.name}</div>
        {produkt.kurzbeschreibung && <div className="text-xs text-stone-500">{produkt.kurzbeschreibung}</div>}
      </div>
      {link && (
        <a href={link} target="_blank" rel={AFFILIATE_REL} data-platzierung="box" data-kennung={produkt.name.slice(0, 80)}
          className="kauflink text-sm whitespace-nowrap">
          Amazon*
        </a>
      )}
    </div>
  );
}

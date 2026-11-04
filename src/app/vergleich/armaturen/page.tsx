import type { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { getAffiliateLink } from "@/lib/rechner-logic";
import { mitTrackingId } from "@/lib/affiliate";
import { armaturDaten } from "@/lib/armatur-daten";
import { formatEuro, formatStand, zeigePreis } from "@/lib/ersatzteile";
import { angeboteFuerEans, bildAusAngeboten, normEan } from "@/lib/kaufberatung";
import { artikelUrl } from "@/lib/produkt-ratgeber";
import ArmaturenVergleich, { type VergleichsProdukt } from "@/components/ArmaturenVergleich";

// Alle Armaturen aus den Kaufberatungen auf einer Seite: filtern, nebeneinanderstellen,
// Shop-Preise vergleichen. Datenquelle sind die Produkte der Bad-Kaufberatungen mit
// technische_daten.kategorie (src/lib/armatur-daten.ts), Preise und Bilder kommen aus ean_angebote.

// Wie die Artikelseiten: immer frisch aus Supabase (der Client lädt ohnehin ohne Cache).
export const revalidate = 0;

const TITEL = "Badarmaturen im Vergleich: Maße, Druck und Preise";

export const metadata: Metadata = {
  title: TITEL,
  description:
    "Waschtisch-, Küchen- und Wannenarmaturen aus unseren Kaufberatungen nebeneinander: Auslaufhöhe, Ausladung, Hoch- oder Niederdruck, Ablauf und aktuelle Shop-Preise.",
  alternates: { canonical: "https://hausbau-hero.de/vergleich/armaturen" },
};

export default async function ArmaturenVergleichSeite() {
  const { data, error } = await supabase
    .from("produkte")
    .select("id, name, hersteller, hersteller_nr, ean, amazon_asin, affiliate_url, einsatzbereich, kurzbeschreibung, technische_daten, sortierung, seiten!inner(slug, titel, status, silos(slug))")
    .eq("seiten.status", "aktiv")
    .eq("ist_werkzeug", false);
  if (error) console.error("[vergleich] Produkte:", error.message);

  // Druckminderer und Duschsysteme ohne eigene Armatur sind keine Armaturen
  const roh = ((data as any[]) ?? []).filter((p) => {
    const d = armaturDaten(p.technische_daten);
    return d && d.kategorie !== "druckminderer" && d.bauart !== "ohne Armatur";
  });
  const nachEan = await angeboteFuerEans(roh.map((p) => p.ean));

  // Dasselbe Modell kann in mehreren Kaufberatungen stehen: einmal zeigen, alle Artikel verlinken.
  const produkte = new Map<string, VergleichsProdukt>();
  let aeltester: string | null = null;
  for (const p of roh) {
    const artikel = { href: artikelUrl(p.seiten.silos?.slug ?? "bad", p.seiten.slug), titel: p.seiten.titel as string };
    const schluessel = normEan(p.ean) ?? p.hersteller_nr ?? p.name;
    const vorhanden = produkte.get(schluessel);
    if (vorhanden) {
      if (!vorhanden.artikel.some((a) => a.href === artikel.href)) vorhanden.artikel.push(artikel);
      continue;
    }
    const angebote = nachEan.get(normEan(p.ean) ?? "") ?? [];
    for (const a of angebote) if (!aeltester || a.stand < aeltester) aeltester = a.stand;
    const amazon = getAffiliateLink(p.affiliate_url, p.amazon_asin);
    produkte.set(schluessel, {
      id: p.id,
      name: p.name,
      hersteller: p.hersteller ?? null,
      kennung: (p.hersteller_nr || p.name).slice(0, 80),
      einsatzbereich: p.einsatzbereich ?? null,
      kurzbeschreibung: p.kurzbeschreibung ?? null,
      daten: armaturDaten(p.technische_daten)!,
      bild: bildAusAngeboten(angebote),
      amazon: amazon ? mitTrackingId(amazon, "vergleich") : null,
      angebote: angebote.slice(0, 3).map((a) => ({
        id: a.id,
        shop: a.shop,
        shopName: a.shop_name,
        url: mitTrackingId(a.url, "vergleich"),
        preis: zeigePreis(a) ? a.preis : null,
        preisText: zeigePreis(a) ? formatEuro(a.preis!) : a.vorraetig === false ? "Lieferzeit im Shop" : "Preis im Shop",
      })),
      artikel: [artikel],
      sortierung: p.sortierung ?? 99,
    });
  }
  // Bad zuerst, Küche zuletzt; innerhalb einer Kategorie die Reihenfolge der Kaufberatung.
  const rang = (k?: string) => ["waschtisch", "wanne", "dusche", "kueche"].indexOf(k ?? "");
  const liste = Array.from(produkte.values()).sort(
    (a, b) => rang(a.daten.kategorie) - rang(b.daten.kategorie) || a.sortierung - b.sortierung,
  );

  return (
    <div className="max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
              { "@type": "ListItem", position: 2, name: "Bad-Kaufberatung", item: "https://hausbau-hero.de/bad" },
              { "@type": "ListItem", position: 3, name: "Armaturen-Vergleich", item: "https://hausbau-hero.de/vergleich/armaturen" },
            ],
          }),
        }}
      />
      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span aria-hidden className="mx-2 text-stone-300">/</span>
        <a href="/bad" className="hover:text-stone-700">Bad-Kaufberatung</a>
        <span aria-hidden className="mx-2 text-stone-300">/</span>
        <span className="text-stone-900">Armaturen-Vergleich</span>
      </nav>

      <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold text-stone-900 mb-3">{TITEL}</h1>
      <p className="text-stone-600 mb-2 max-w-3xl">
        Alle Armaturen aus unseren Kaufberatungen auf einen Blick. Filtere nach Einsatz und Druck, setze bis zu vier
        Modelle nebeneinander und vergleiche die Preise der Shops. Die Maße stammen aus Herstellerangaben; getestet haben
        wir die Armaturen nicht.
      </p>
      <div className="bg-accent-50 rounded-xl p-3 mb-6 text-sm text-stone-600">
        <strong className="text-stone-800">Hinweis:</strong> Die Kaufen-Links sind Partnerlinks. Kaufst du darüber, bekommen
        wir eine Provision, der Preis ändert sich für dich nicht.
      </div>

      <ArmaturenVergleich produkte={liste} />

      {aeltester && (
        <p className="text-xs text-stone-500 mt-6">
          Shop-Preise inkl. MwSt., zzgl. Versand, Stand {formatStand(aeltester)} Uhr. Preis und Lieferbarkeit können sich
          seitdem geändert haben, maßgeblich ist der Shop. Amazon-Preise zeigen wir nicht, die siehst du über den Link.
        </p>
      )}
    </div>
  );
}

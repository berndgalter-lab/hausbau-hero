/**
 * Zentrale Stelle für alles, womit die Seite Geld verdient.
 *
 * Zwei Erlösquellen:
 *  1) Amazon-Partnerlinks  — passen zu den Material-Rechnern (Farbe, Fliesen, Laminat …),
 *     wo der Nutzer direkt nach dem Rechnen einkauft.
 *  2) Angebotsvergleich / Lead-Vermittlung — passt zu den Finanz- und Planungsrechnern
 *     (Nebenkosten, Handwerkerkosten, Fördermittel, Eigenleistung, Baugenehmigung).
 *     Dort ist die Kaufabsicht groß, aber es wird nichts bei Amazon gekauft.
 */

export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || 'hausbauhero-21'

/** Direktlink auf ein konkretes Produkt. Konvertiert am besten. */
export function amazonProdukt(asin: string): string {
  return `https://www.amazon.de/dp/${encodeURIComponent(asin)}?tag=${AMAZON_TAG}`
}

/** Fallback: Suchergebnis-Link. Schlechter als ein Produktlink, aber deutlich besser als kein Link. */
export function amazonSuche(begriff: string): string {
  return `https://www.amazon.de/s?k=${encodeURIComponent(begriff)}&tag=${AMAZON_TAG}`
}

/**
 * Liefert für eine Material- oder Produktzeile immer einen monetarisierten Link.
 * Reihenfolge: hinterlegte URL → ASIN → Amazon-Suche nach dem Namen.
 * Nur wenn gar nichts bekannt ist, kommt `null` zurück.
 */
export function getAffiliateLink(
  affiliateUrl?: string | null,
  amazonAsin?: string | null,
  name?: string | null
): string | null {
  if (affiliateUrl) return affiliateUrl
  if (amazonAsin) return amazonProdukt(amazonAsin)
  if (name && name.trim()) return amazonSuche(name.trim())
  return null
}

/* ────────────────────────────────────────────────────────────────────────────
 * Angebotsvergleich (Lead-Vermittlung)
 *
 * ►► HIER TRÄGST DU DEINE PARTNERLINKS EIN. ◄◄
 *
 * Solange `url` leer ist, wird der Block auf der jeweiligen Seite NICHT angezeigt —
 * es entstehen also keine toten Links. Sobald du eine URL einträgst, erscheint er
 * automatisch direkt unter dem Rechenergebnis, also an der Stelle mit der höchsten
 * Aufmerksamkeit.
 *
 * Recherchierte Programme (Stand 09/2026, Konditionen VOR Anmeldung selbst prüfen —
 * die Zahlen stammen aus Programmverzeichnissen und ändern sich):
 *
 *   Baufinanzierung — über financeads.net
 *     Interhyp    bis 32,50 € pro Lead   financeads.net/partnerprogramme/interhyp/
 *     Baufi24     bis 32,50 € pro Lead
 *     Dr. Klein        25,00 € pro Lead  (nicht bei Summen unter 50.000 €)
 *
 *   Handwerker-/Bauleistungen — über AWIN
 *     Aroundhome    5–35 € pro Lead, je nach Produkt
 *                   ui.awin.com/merchant-profile/68536
 *                   Kontakt: affiliateprogramm@aroundhome.de
 *
 * Zur Einordnung: Amazon zahlt auf Baustoffe einen niedrigen einstelligen
 * Prozentsatz eines kleinen Warenkorbs — also Cent-Beträge. Ein einziger
 * vermittelter Finanzierungs-Lead entspricht mehreren hundert Amazon-Klicks.
 * Deshalb hängt an diesen sechs Rechnern der größere Teil des Ertragspotenzials.
 * ──────────────────────────────────────────────────────────────────────────── */

export interface AngebotsCTA {
  ueberschrift: string
  text: string
  buttonText: string
  /** Leer lassen, solange kein Partnerlink vorliegt — der Block bleibt dann unsichtbar. */
  url: string
  hinweis?: string
}

const CTA_BY_SLUG: Record<string, AngebotsCTA> = {
  // Aroundhome (AWIN) — Handwerkerangebote
  handwerkerkosten: {
    ueberschrift: 'Was kostet es bei dir konkret?',
    text: 'Stundensätze sind Durchschnittswerte. Ein echtes Angebot aus deiner Region weicht oft um mehrere tausend Euro davon ab — nach oben wie nach unten. Drei Angebote zu vergleichen ist der wirksamste Hebel, den du hast.',
    buttonText: 'Handwerker-Angebote vergleichen',
    url: '',
    hinweis: 'Kostenlos und unverbindlich.',
  },
  // Aroundhome (AWIN) — Angebote für die abgegebenen Gewerke
  eigenleistung: {
    ueberschrift: 'Den Rest machen lassen',
    text: 'Was du nicht selbst übernimmst, sollte zum Festpreis vergeben werden. Vergleiche Angebote für die Gewerke, die du abgibst.',
    buttonText: 'Angebote für die restlichen Gewerke',
    url: '',
    hinweis: 'Kostenlos und unverbindlich.',
  },
  // Interhyp / Baufi24 / Dr. Klein (financeads) — höchste Lead-Vergütung der Seite
  nebenkosten: {
    ueberschrift: 'Finanzierung durchrechnen lassen',
    text: 'Die Nebenkosten musst du in der Regel aus Eigenkapital zahlen. Wie viel Haus danach übrig bleibt, hängt an den Konditionen — und die unterscheiden sich zwischen Banken deutlich.',
    buttonText: 'Finanzierungsangebote vergleichen',
    url: '',
    hinweis: 'Kostenlos und unverbindlich.',
  },
  // Interhyp / Baufi24 (financeads) — KfW läuft ohnehin über die Hausbank
  foerdermittel: {
    ueberschrift: 'Förderung und Finanzierung zusammen planen',
    text: 'KfW-Kredite laufen über deine Bank, nicht direkt über die KfW. Wer das gemeinsam mit der Hauptfinanzierung rechnet, holt meist mehr heraus.',
    buttonText: 'Förderung mit Finanzierung kombinieren',
    url: '',
    hinweis: 'Kostenlos und unverbindlich.',
  },
  // Aroundhome (AWIN) — Architekten / Bauvorlageberechtigte
  baugenehmigung: {
    ueberschrift: 'Antrag vom Fachplaner erstellen lassen',
    text: 'Bauanträge müssen in fast allen Bundesländern von einer bauvorlageberechtigten Person eingereicht werden. Hol dir Angebote von Architekten und Bauingenieuren aus deiner Region.',
    buttonText: 'Architekten-Angebote einholen',
    url: '',
    hinweis: 'Kostenlos und unverbindlich.',
  },
  // Aroundhome (AWIN) — Gewerke ausschreiben
  'gewerk-reihenfolge': {
    ueberschrift: 'Gewerke jetzt ausschreiben',
    text: 'Wer früh anfragt, bekommt bessere Preise und Termine. Vergleiche Angebote für die Gewerke, die als Nächstes anstehen.',
    buttonText: 'Gewerke ausschreiben',
    url: '',
    hinweis: 'Kostenlos und unverbindlich.',
  },
}

export function getAngebotsCTA(slug: string): AngebotsCTA | null {
  const cta = CTA_BY_SLUG[slug]
  if (!cta || !cta.url) return null
  return cta
}

/** True, wenn für diesen Rechner ein CTA hinterlegt, aber noch keine URL eingetragen ist. */
export function hatUnkonfiguriertenCTA(slug: string): boolean {
  const cta = CTA_BY_SLUG[slug]
  return Boolean(cta && !cta.url)
}

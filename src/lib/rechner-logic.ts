export interface EingabeFeld {
  name: string
  label: string
  einheit?: string
  typ: 'number' | 'select' | 'multi-select'
  min?: number
  max?: number
  step?: number
  default?: number
  options?: { value: string | number; label: string; watt?: number }[]
}

export interface RechnerMaterial {
  id: string
  name: string
  kategorie: string
  formel: string
  einheit: string
  amazon_asin?: string
  affiliate_url?: string
  preis_ca: number
  ist_essential: boolean
  sortierung: number
}

export interface RechnerConfig {
  id: string
  name: string
  slug: string
  beschreibung: string
  eingabefelder: EingabeFeld[]
  berechnungslogik: Record<string, string>
}

export function berechne(
  formeln: Record<string, string>,
  eingaben: Record<string, number>
): Record<string, number> {
  const ergebnisse: Record<string, number> = { ...eingaben }

  const sortierteFormeln = Object.entries(formeln)
  for (const [key, formel] of sortierteFormeln) {
    try {
      let ausdruck = formel
      for (const [varName, varWert] of Object.entries(ergebnisse)) {
        ausdruck = ausdruck.replace(new RegExp(`\\b${varName}\\b`, 'g'), String(varWert))
      }
      ausdruck = ausdruck.replace(/ceil/g, 'Math.ceil')
      ausdruck = ausdruck.replace(/floor/g, 'Math.floor')
      ausdruck = ausdruck.replace(/round/g, 'Math.round')
      ausdruck = ausdruck.replace(/max/g, 'Math.max')
      ausdruck = ausdruck.replace(/min/g, 'Math.min')
      const fn = new Function(`return ${ausdruck}`)
      ergebnisse[key] = fn()
    } catch {
      ergebnisse[key] = 0
    }
  }

  return ergebnisse
}

export function berechneStromverbrauch(
  geraete: { watt: number }[],
  gleichzeitigFaktor: number
): number {
  const gesamtWatt = geraete.reduce((sum, g) => sum + g.watt, 0)
  const anlaufstromFaktor = 1.5
  return Math.ceil(gesamtWatt * anlaufstromFaktor * gleichzeitigFaktor)
}

export function formatPreis(preis: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  }).format(preis)
}

export function amazonLink(asin: string, tag: string = 'hausbauhero-21'): string {
  return `https://www.amazon.de/dp/${asin}?tag=${tag}`
}

export function getAffiliateLink(affiliateUrl?: string, amazonAsin?: string): string | null {
  if (affiliateUrl) return affiliateUrl
  if (amazonAsin) return amazonLink(amazonAsin)
  return null
}

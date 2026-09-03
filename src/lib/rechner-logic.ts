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

/**
 * Wertet die in der Datenbank hinterlegten Formeln aus.
 *
 * Formeln dürfen sich gegenseitig referenzieren. Da die Reihenfolge der JSON-Schlüssel
 * nicht garantiert der Abhängigkeitsreihenfolge entspricht, wird so lange iteriert, bis
 * sich nichts mehr auflösen lässt — statt eine Formel, deren Eingangsgröße noch fehlt,
 * stillschweigend auf 0 zu setzen.
 */
export function berechne(
  formeln: Record<string, string>,
  eingaben: Record<string, number>
): Record<string, number> {
  const ergebnisse: Record<string, number> = { ...eingaben }
  let offen = Object.entries(formeln)
  // Feste Obergrenze: `offen` schrumpft pro Runde und taugt daher nicht als Schranke.
  const maxRunden = offen.length + 1

  for (let runde = 0; runde < maxRunden && offen.length > 0; runde++) {
    const nochOffen: [string, string][] = []
    for (const [key, formel] of offen) {
      const wert = werteAus(formel, ergebnisse)
      if (wert === null) nochOffen.push([key, formel])
      else ergebnisse[key] = wert
    }
    if (nochOffen.length === offen.length) break // keine Fortschritte mehr
    offen = nochOffen
  }

  // Was sich nach allen Runden nicht auflösen lässt, ist fehlerhaft konfiguriert.
  for (const [key, formel] of offen) {
    console.error(`[Rechner] Formel "${key}" nicht auflösbar: ${formel}`)
    ergebnisse[key] = 0
  }

  return ergebnisse
}

const MATH_FNS = ['ceil', 'floor', 'round', 'max', 'min', 'abs', 'sqrt', 'pow']

/**
 * Setzt bekannte Variablen ein und rechnet aus.
 * Gibt `null` zurück, wenn die Formel noch unbekannte Bezeichner enthält.
 */
export function werteAus(
  formel: string,
  werte: Record<string, number>
): number | null {
  let ausdruck = formel

  // Längere Namen zuerst, damit `flaeche` nicht Teile von `wandflaeche` ersetzt.
  const namen = Object.keys(werte).sort((a, b) => b.length - a.length)
  for (const name of namen) {
    ausdruck = ausdruck.replace(
      new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g'),
      `(${werte[name]})`
    )
  }

  for (const fn of MATH_FNS) {
    ausdruck = ausdruck.replace(new RegExp(`\\b${fn}\\s*\\(`, 'g'), `Math.${fn}(`)
  }

  // Jetzt darf nur noch Arithmetik übrig sein. Ein verbliebener Bezeichner bedeutet:
  // eine Abhängigkeit ist noch nicht berechnet.
  if (/[A-Za-z_]/.test(ausdruck.replace(/Math\.\w+/g, ''))) return null

  try {
    const wert = new Function(`"use strict"; return (${ausdruck})`)()
    return Number.isFinite(wert) ? wert : null
  } catch {
    return null
  }
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

export { amazonProdukt, amazonSuche, getAffiliateLink, AMAZON_TAG } from './monetarisierung'

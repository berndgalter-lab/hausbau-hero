// Verweise von Bad-Artikeln (mit Traffic) in den Ersatzteile-Bereich.
// Bringt Besucher und interne Link-Kraft auf die neuen Marken-, Serien- und Problemseiten.

export interface Verweis {
  href: string;
  titel: string;
  art: "marke" | "serie" | "problem";
}

const VERWEISE: Record<string, Verweis[]> = {
  "geberit-sigma-drueckerplatte": [
    { href: "/ersatzteile/geberit", titel: "Geberit Ersatzteile nach Spülkasten-Typ", art: "marke" },
    { href: "/ersatzteile/geberit/up320-sigma-12", titel: "Ersatzteile für Spülkasten UP320 (Sigma, 12 cm)", art: "serie" },
    { href: "/problem/geberit-spuelung-loest-nicht-aus", titel: "Spülung löst nicht aus oder Drückerplatte klemmt", art: "problem" },
    { href: "/problem/geberit-spuelkasten-laeuft-nach", titel: "Geberit-Spülkasten läuft nach", art: "problem" },
  ],
  "vorwandelement-wc": [
    { href: "/ersatzteile/geberit/up320-sigma-12", titel: "Ersatzteile für Geberit UP320 (Sigma, 12 cm)", art: "serie" },
    { href: "/ersatzteile/geberit/up100-delta-12", titel: "Ersatzteile für Geberit UP100 (Delta, 12 cm)", art: "serie" },
    { href: "/problem/geberit-spuelkasten-fuellt-nicht", titel: "Spülkasten füllt nicht oder nur langsam", art: "problem" },
  ],
  "waschtischarmatur-ratgeber": [
    { href: "/ersatzteile/grohe", titel: "Grohe Ersatzteile: Kartuschen, Strahlregler, Schläuche", art: "marke" },
    { href: "/ersatzteile/grohe/eurosmart-waschtisch", titel: "Ersatzteile für Grohe Eurosmart Waschtischarmatur", art: "serie" },
    { href: "/problem/grohe-armatur-tropft", titel: "Armatur tropft: Ursachen und passende Kartusche", art: "problem" },
    { href: "/problem/grohe-strahlregler-verkalkt", titel: "Wasserstrahl spritzt: Strahlregler verkalkt", art: "problem" },
  ],
  "waschtischarmatur-mit-brause": [
    { href: "/ersatzteile/grohe/europlus-waschtisch", titel: "Ersatzteile für Grohe Europlus Waschtischarmatur", art: "serie" },
    { href: "/ersatzteile/grohe", titel: "Grohe Ersatzteile: Kartuschen, Strahlregler, Schläuche", art: "marke" },
    { href: "/problem/grohe-armatur-tropft", titel: "Armatur tropft: Ursachen und passende Kartusche", art: "problem" },
  ],
  "badewannenarmatur-ratgeber": [
    { href: "/ersatzteile/grohe/eurosmart-wannenarmatur", titel: "Ersatzteile für Grohe Eurosmart Wannenbatterie", art: "serie" },
    { href: "/ersatzteile/grohe/grohtherm-800", titel: "Ersatzteile für Grohe Grohtherm 800 Thermostat", art: "serie" },
    { href: "/problem/grohe-thermostat-wird-nicht-warm-kalt", titel: "Thermostat wird nicht warm oder nicht kalt", art: "problem" },
  ],
  "komplettdusche-ratgeber": [
    { href: "/ersatzteile/grohe/grohtherm-1000", titel: "Ersatzteile für Grohe Grohtherm 1000 Thermostat", art: "serie" },
    { href: "/problem/grohe-thermostat-wird-nicht-warm-kalt", titel: "Thermostat wird nicht warm oder nicht kalt", art: "problem" },
  ],
  "bad-sanieren-kosten": [
    { href: "/ersatzteile", titel: "Ersatzteile finden statt neu kaufen", art: "marke" },
    { href: "/problem", titel: "Problemlöser: Spülkasten, Armatur, Thermostat", art: "problem" },
  ],
};

export function ersatzteilVerweise(slug: string): Verweis[] {
  return VERWEISE[slug] ?? [];
}

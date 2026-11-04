// Verweise von Bad-Artikeln (mit Traffic) in den Ersatzteile-Bereich.
// Bringt Besucher und interne Link-Kraft auf die neuen Marken-, Serien- und Problemseiten.

export interface Verweis {
  href: string;
  titel: string;
  art: "marke" | "serie" | "problem";
}

const VERWEISE: Record<string, Verweis[]> = {
  "dachfenster-sonnenschutz": [
    { href: "/problem/dachfenster-rollladen-reagiert-nicht", titel: "Solar-Rollladen reagiert nicht: Akku, Funk, Reset", art: "problem" },
    { href: "/problem/dachfenster-undicht", titel: "Dachfenster undicht, tropft oder zieht", art: "problem" },
    { href: "/problem/dachfenster-klemmt", titel: "Dachfenster klemmt oder bleibt nicht offen", art: "problem" },
  ],
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
  "vorwandelement-wc-hoehe": [
    { href: "/ersatzteile/geberit", titel: "Geberit-Spülkasten erkennen und Ersatzteile", art: "marke" },
    { href: "/ersatzteile/geberit/omega-12", titel: "Ersatzteile für Geberit Omega (12 cm, niedrige Bauhöhen)", art: "serie" },
    { href: "/problem/geberit-spuelkasten-laeuft-nach", titel: "Geberit-Spülkasten läuft nach", art: "problem" },
  ],
  "tece-vs-geberit": [
    { href: "/ersatzteile/geberit", titel: "Geberit Ersatzteile nach Spülkasten-Typ", art: "marke" },
    { href: "/ersatzteile/geberit/up320-sigma-12", titel: "Ersatzteile für Geberit UP320 (Sigma, 12 cm)", art: "serie" },
    { href: "/problem/geberit-spuelkasten-fuellt-nicht", titel: "Spülkasten füllt nicht oder nur langsam", art: "problem" },
  ],
  "waschtischarmatur-ratgeber": [
    { href: "/problem/grohe-armatur-tropft", titel: "GROHE-Armatur tropft: Ursachen und passende Kartusche", art: "problem" },
    { href: "/problem/hansgrohe-armatur-tropft", titel: "hansgrohe-Armatur tropft: Kartusche finden und tauschen", art: "problem" },
    { href: "/problem/grohe-strahlregler-verkalkt", titel: "Wasserstrahl spritzt: Strahlregler verkalkt", art: "problem" },
    { href: "/ersatzteile/grohe/eurosmart-waschtisch", titel: "Ersatzteile für GROHE Eurosmart", art: "serie" },
    { href: "/ersatzteile/grohe/essence-waschtisch", titel: "Ersatzteile für GROHE Essence", art: "serie" },
    { href: "/ersatzteile/hansgrohe/logis-waschtisch", titel: "Ersatzteile für hansgrohe Logis", art: "serie" },
    { href: "/ersatzteile/hansgrohe/talis-e-waschtisch", titel: "Ersatzteile für hansgrohe Talis E", art: "serie" },
  ],
  "waschtischarmatur-mit-brause": [
    { href: "/problem/grohe-armatur-tropft", titel: "GROHE-Armatur tropft: Ursachen und passende Kartusche", art: "problem" },
    { href: "/problem/hansgrohe-armatur-tropft", titel: "hansgrohe-Armatur tropft: Kartusche finden und tauschen", art: "problem" },
    { href: "/problem/grohe-strahlregler-verkalkt", titel: "Wasserstrahl spritzt: Strahlregler verkalkt", art: "problem" },
    { href: "/ersatzteile/grohe/europlus-waschtisch", titel: "Ersatzteile für GROHE Europlus", art: "serie" },
    { href: "/ersatzteile/grohe", titel: "GROHE Ersatzteile: Kartuschen, Strahlregler, Schläuche", art: "marke" },
    { href: "/ersatzteile/hansgrohe", titel: "hansgrohe Ersatzteile: Kartuschen und Strahlregler", art: "marke" },
  ],
  "niederdruckarmatur-untertischspeicher": [
    { href: "/problem/grohe-armatur-tropft", titel: "GROHE-Armatur tropft auch bei kaltem Speicher: Kartusche tauschen", art: "problem" },
    { href: "/problem/hansgrohe-armatur-tropft", titel: "hansgrohe-Armatur tropft: Kartusche finden und tauschen", art: "problem" },
    { href: "/problem/grohe-strahlregler-verkalkt", titel: "Wasserstrahl spritzt: Strahlregler verkalkt", art: "problem" },
    { href: "/ersatzteile/hansgrohe/logis-waschtisch", titel: "Ersatzteile für hansgrohe Logis", art: "serie" },
    { href: "/ersatzteile/hansgrohe/focus-m41-kuechenarmatur", titel: "Ersatzteile für hansgrohe Focus M41", art: "serie" },
    { href: "/ersatzteile/grohe", titel: "GROHE Ersatzteile: Kartuschen, Strahlregler, Schläuche", art: "marke" },
  ],
  "badewannenarmatur-ratgeber": [
    { href: "/problem/grohe-thermostat-wird-nicht-warm-kalt", titel: "GROHE-Thermostat wird nicht warm oder nicht kalt", art: "problem" },
    { href: "/problem/hansgrohe-thermostat-wird-nicht-warm", titel: "hansgrohe-Thermostat wird nicht warm", art: "problem" },
    { href: "/ersatzteile/grohe/grohtherm-800", titel: "Ersatzteile für GROHE Grohtherm 800", art: "serie" },
    { href: "/ersatzteile/grohe/eurosmart-wannenarmatur", titel: "Ersatzteile für GROHE Eurosmart Wannenbatterie", art: "serie" },
    { href: "/ersatzteile/hansgrohe/ecostat-comfort", titel: "Ersatzteile für hansgrohe Ecostat Comfort", art: "serie" },
  ],
  "badewannenarmatur-unterputz": [
    { href: "/problem/grohe-armatur-tropft", titel: "GROHE-Armatur tropft", art: "problem" },
    { href: "/problem/hansgrohe-armatur-tropft", titel: "hansgrohe-Armatur tropft", art: "problem" },
    { href: "/problem/grohe-thermostat-wird-nicht-warm-kalt", titel: "GROHE-Thermostat wird nicht warm oder nicht kalt", art: "problem" },
    { href: "/problem/hansgrohe-thermostat-wird-nicht-warm", titel: "hansgrohe-Thermostat wird nicht warm", art: "problem" },
    { href: "/ersatzteile/grohe/eurosmart-wannenarmatur", titel: "Ersatzteile für GROHE Eurosmart Wannenbatterie", art: "serie" },
  ],
  duschthermostat: [
    { href: "/problem/grohe-thermostat-wird-nicht-warm-kalt", titel: "GROHE-Thermostat wird nicht warm oder nicht kalt", art: "problem" },
    { href: "/problem/hansgrohe-thermostat-wird-nicht-warm", titel: "hansgrohe-Thermostat wird nicht warm", art: "problem" },
    { href: "/ersatzteile/grohe/grohtherm-800", titel: "Ersatzteile für GROHE Grohtherm 800", art: "serie" },
    { href: "/ersatzteile/grohe/grohtherm-1000-performance", titel: "Ersatzteile für GROHE Grohtherm 1000 Performance", art: "serie" },
    { href: "/ersatzteile/hansgrohe/ecostat-comfort", titel: "Ersatzteile für hansgrohe Ecostat Comfort", art: "serie" },
    { href: "/ersatzteile/hansgrohe/ecostat-1001-cl", titel: "Ersatzteile für hansgrohe Ecostat 1001 CL", art: "serie" },
  ],
  duschsystem: [
    { href: "/problem/grohe-thermostat-wird-nicht-warm-kalt", titel: "GROHE-Thermostat wird nicht warm oder nicht kalt", art: "problem" },
    { href: "/problem/hansgrohe-thermostat-wird-nicht-warm", titel: "hansgrohe-Thermostat wird nicht warm", art: "problem" },
    { href: "/ersatzteile/hansgrohe/croma-select-s-showerpipe", titel: "Ersatzteile für hansgrohe Croma Select S Showerpipe", art: "serie" },
    { href: "/ersatzteile/hansgrohe/crometta-showerpipe", titel: "Ersatzteile für hansgrohe Crometta Showerpipe", art: "serie" },
  ],
  kuechenarmatur: [
    { href: "/problem/wasserhahn-tropft", titel: "Wasserhahn tropft", art: "problem" },
    { href: "/ersatzteile/kartusche", titel: "Kartusche für den Wasserhahn: welche passt?", art: "marke" },
    { href: "/problem/blanco-brause-zieht-nicht-zurueck-armatur-tropft", titel: "Blanco: Brause zieht nicht zurück, Armatur tropft", art: "problem" },
    { href: "/problem/franke-kuechenarmatur-tropft", titel: "Franke-Küchenarmatur tropft", art: "problem" },
    { href: "/ersatzteile/grohe/minta-kuechenarmatur", titel: "Ersatzteile für GROHE Minta Küchenarmatur", art: "serie" },
    { href: "/ersatzteile/hansgrohe/talis-m54-kuechenarmatur", titel: "Ersatzteile für hansgrohe Talis M54", art: "serie" },
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

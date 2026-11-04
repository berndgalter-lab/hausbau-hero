// Welche Rechner unter einem Artikel als "Passende Rechner" erscheinen.
// Nur noch die drei verbliebenen Rechner (sanitaer, fliesen, estrich).
const RECHNER_MAP: Record<string, string[]> = {
  // Bad
  // Armaturen-Ratgeber bewusst ohne: Der Sanitär-Rechner hilft bei der Armaturwahl nicht.
  "komplettdusche-ratgeber": ["sanitaer", "fliesen"],
  "vorwandelement-wc": ["sanitaer"],
  "geberit-sigma-drueckerplatte": ["sanitaer"],
  kleinhebeanlage: ["sanitaer"],
  "bad-sanieren-kosten": ["sanitaer", "fliesen"],

  // Boden & Rohbau
  "fliesen-verlegen-kosten": ["fliesen"],
  "estrich-kosten": ["estrich"],
  "kalk-zement-putz": ["fliesen"],

  // Werkzeuge
  "kreuzlinienlaser-richtig-benutzen": ["fliesen"],
  "wasserwaage-richtig-benutzen": ["fliesen", "estrich"],
};

export function getPassendeRechner(slug: string, fromDb?: string[] | null): string[] {
  if (fromDb && fromDb.length > 0) return fromDb;
  return RECHNER_MAP[slug] ?? [];
}

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
};

export function getPassendeRechner(slug: string, fromDb?: string[] | null): string[] {
  if (fromDb && fromDb.length > 0) return fromDb;
  return RECHNER_MAP[slug] ?? [];
}

const RECHNER_MAP: Record<string, string[]> = {
  // Farben
  silikatfarbe: ["wandfarbe", "tapeten"],
  latexfarbe: ["wandfarbe", "tapeten"],
  "wandfarbe-weiss": ["wandfarbe", "tapeten"],

  // Stein
  steinimpraegnierung: ["terrasse"],

  // Bad
  "waschtischarmatur-ratgeber": ["sanitaer", "handwerkerkosten"],
  "badewannenarmatur-ratgeber": ["sanitaer", "handwerkerkosten"],
  "komplettdusche-ratgeber": ["sanitaer", "handwerkerkosten"],
  "vorwandelement-wc": ["sanitaer", "handwerkerkosten"],
  "geberit-sigma-drueckerplatte": ["sanitaer", "handwerkerkosten"],
  kleinhebeanlage: ["sanitaer", "handwerkerkosten"],

  // Rohbau
  "kalk-zement-putz": ["putz", "handwerkerkosten"],
  "haftgrund-putz": ["putz", "handwerkerkosten"],
  "trockenbau-kosten": ["trockenbau", "handwerkerkosten", "eigenleistung"],
  "daemmung-kosten": ["daemmung", "foerdermittel", "handwerkerkosten"],
  "estrich-kosten": ["estrich", "handwerkerkosten", "gewerk-reihenfolge"],
  deckenstuetze: ["beton"],

  // Werkzeuge
  "kreuzlinienlaser-richtig-benutzen": ["trockenbau", "fliesen"],
  "wasserwaage-richtig-benutzen": ["trockenbau", "fliesen"],
  "oberfraese-richtig-benutzen": ["trockenbau"],
  mauernutfraese: ["elektro"],
  "sds-bohrer-set": ["beton", "trockenbau"],

  // Garten
  pflasterfugenmoertel: ["terrasse"],

  // Stromerzeuger
  "stromerzeuger-vergleich": ["stromverbrauch"],

  // Finanzen
  "kaufnebenkosten-guide": ["nebenkosten"],
  "handwerkerkosten-guide": ["handwerkerkosten", "eigenleistung"],
  "kfw-foerderung-2026": ["foerdermittel", "nebenkosten"],
  "baugenehmigung-ratgeber": ["baugenehmigung"],
  "eigenleistung-hausbau": ["eigenleistung", "handwerkerkosten"],
  "hausbau-kosten-2026": ["nebenkosten", "handwerkerkosten", "eigenleistung", "foerdermittel"],

  // Boden
  "fliesen-verlegen-kosten": ["fliesen", "handwerkerkosten"],
  "laminat-verlegen-kosten": ["laminat", "handwerkerkosten"],
};

const DEFAULT_RECHNER = ["wandfarbe", "fliesen", "trockenbau", "nebenkosten"];

export function getPassendeRechner(slug: string, fromDb?: string[] | null): string[] {
  if (fromDb && fromDb.length > 0) return fromDb;
  return RECHNER_MAP[slug] ?? DEFAULT_RECHNER;
}

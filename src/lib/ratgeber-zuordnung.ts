const RATGEBER_MAP: Record<string, string> = {
  fliesen: "fliesen-verlegen-kosten",
  laminat: "laminat-verlegen-kosten",
  trockenbau: "trockenbau-kosten",
  daemmung: "daemmung-kosten",
  estrich: "estrich-kosten",
  putz: "kalk-zement-putz",
  nebenkosten: "kaufnebenkosten-guide",
  handwerkerkosten: "handwerkerkosten-guide",
  eigenleistung: "eigenleistung-hausbau",
  foerdermittel: "kfw-foerderung-2026",
  baugenehmigung: "baugenehmigung-ratgeber",
  stromverbrauch: "stromerzeuger-vergleich",
  wandfarbe: "silikatfarbe",
};

export function getRatgeberSlug(rechnerSlug: string, fromDb?: string | null): string | null {
  if (fromDb) return fromDb;
  return RATGEBER_MAP[rechnerSlug] ?? null;
}

const RATGEBER_MAP: Record<string, string> = {
  sanitaer: "bad-sanieren-kosten",
};

export function getRatgeberSlug(rechnerSlug: string, fromDb?: string | null): string | null {
  if (fromDb) return fromDb;
  return RATGEBER_MAP[rechnerSlug] ?? null;
}

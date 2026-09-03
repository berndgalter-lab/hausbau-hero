import { supabase } from "@/lib/supabase";
import { textLaenge, MIN_TEXT_LAENGE } from "@/lib/artikel-html";

const BASE = "https://hausbau-hero.de";

/** Silos ohne eigene Inhalte gehören nicht in die Sitemap (siehe HIDDEN_SILOS im Layout). */
const AUSGEBLENDETE_SILOS = new Set(["kueche", "maschinen"]);

type Eintrag = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

/**
 * Ein fehlendes oder ungültiges Datum in der Datenbank hat bisher beim Serialisieren
 * eine RangeError geworfen und damit die komplette Sitemap unbrauchbar gemacht.
 */
function datumOder(wert: unknown, fallback: Date): Date {
  if (typeof wert !== "string" && !(wert instanceof Date)) return fallback;
  const d = new Date(wert as string);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

export default async function sitemap(): Promise<Eintrag[]> {
  const now = new Date();

  const eintraege: Eintrag[] = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/rechner`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${BASE}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];

  try {
    const { data: silos } = await supabase.from("silos").select("slug");
    for (const s of silos ?? []) {
      if (AUSGEBLENDETE_SILOS.has(s.slug)) continue;
      eintraege.push({
        url: `${BASE}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  } catch (e) {
    console.error("[Sitemap] Silos query failed:", e);
  }

  // Rechner sind die wichtigsten Seiten der Website.
  const HIGH_PRIO = new Set(["nebenkosten", "eigenleistung", "foerdermittel", "handwerkerkosten"]);
  try {
    const { data: rechner } = await supabase.from("rechner").select("slug, created_at");
    for (const r of rechner ?? []) {
      eintraege.push({
        url: `${BASE}/rechner/${r.slug}`,
        lastModified: datumOder(r.created_at, now),
        changeFrequency: "monthly",
        priority: HIGH_PRIO.has(r.slug) ? 1.0 : 0.9,
      });
    }
  } catch (e) {
    console.error("[Sitemap] Rechner query failed:", e);
  }

  // Artikel: nur die mit ausreichend Substanz. Dünne Altbestände stehen auf noindex
  // und hätten in der Sitemap nichts verloren.
  try {
    const { data: seiten } = await supabase
      .from("seiten")
      .select("slug, updated_at, content_md, silos(slug)")
      .eq("status", "aktiv");
    for (const s of (seiten ?? []) as any[]) {
      const siloSlug = s.silos?.slug;
      if (!siloSlug || AUSGEBLENDETE_SILOS.has(siloSlug)) continue;
      if (textLaenge(s.content_md) < MIN_TEXT_LAENGE) continue;
      eintraege.push({
        url: `${BASE}/${siloSlug}/${s.slug}`,
        lastModified: datumOder(s.updated_at, now),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch (e) {
    console.error("[Sitemap] Seiten query failed:", e);
  }

  return eintraege;
}

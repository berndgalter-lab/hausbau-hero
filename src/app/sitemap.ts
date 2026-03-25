import { supabase } from "@/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://hausbau-hero.de";
  const now = new Date();

  type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
  };

  const staticPages: SitemapEntry[] = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/rechner`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];

  // Silos dynamisch
  try {
    const { data: silos } = await supabase.from("silos").select("slug");
    if (silos) {
      for (const s of silos) {
        staticPages.push({
          url: `${baseUrl}/${s.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  } catch (e) {
    console.error("[Sitemap] Silos query failed:", e);
  }

  const dynamicPages: SitemapEntry[] = [];

  // Rechner dynamisch
  const HIGH_PRIO_RECHNER = new Set(["nebenkosten", "eigenleistung", "foerdermittel", "handwerkerkosten"]);
  try {
    const { data: rechnerList } = await supabase.from("rechner").select("slug, created_at");
    if (rechnerList) {
      for (const r of rechnerList) {
        dynamicPages.push({
          url: `${baseUrl}/rechner/${r.slug}`,
          lastModified: new Date(r.created_at),
          changeFrequency: "monthly",
          priority: HIGH_PRIO_RECHNER.has(r.slug) ? 0.9 : 0.8,
        });
      }
    }
  } catch (e) {
    console.error("[Sitemap] Rechner query failed:", e);
  }

  // Artikel dynamisch
  try {
    const { data: seiten } = await supabase
      .from("seiten")
      .select("slug, updated_at, silos(slug)")
      .eq("status", "aktiv");
    if (seiten) {
      for (const s of seiten as any) {
        const siloSlug = s.silos?.slug;
        if (siloSlug) {
          dynamicPages.push({
            url: `${baseUrl}/${siloSlug}/${s.slug}`,
            lastModified: new Date(s.updated_at),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      }
    }
  } catch (e) {
    console.error("[Sitemap] Seiten query failed:", e);
  }

  return [...staticPages, ...dynamicPages];
}

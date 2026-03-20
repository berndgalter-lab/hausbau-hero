import { supabase } from "@/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://hausbau-hero.de";
  const now = new Date();

  const staticPages = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly" as const, priority: 1.0 },
    { url: `${baseUrl}/rechner`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${baseUrl}/rechner/wandfarbe`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/rechner/fliesen`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/rechner/trockenbau`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/rechner/stromverbrauch`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/rechner/nebenkosten`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/rechner/eigenleistung`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/rechner/foerdermittel`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/rechner/gewerk-reihenfolge`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/rechner/baugenehmigung`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${baseUrl}/rechner/handwerkerkosten`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 },
    { url: `${baseUrl}/farben`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/bad`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/werkzeuge`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/stromerzeuger`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/kueche`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/maschinen`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/rohbau`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/boden`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/garten`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.1 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.1 },
  ];

  const knownSlugs = new Set(staticPages.map((p) => p.url));
  const dynamicPages: typeof staticPages = [];

  try {
    const { data: rechnerList } = await supabase.from("rechner").select("slug, created_at");
    if (rechnerList) {
      for (const r of rechnerList) {
        const url = `${baseUrl}/rechner/${r.slug}`;
        if (!knownSlugs.has(url)) {
          dynamicPages.push({ url, lastModified: new Date(r.created_at), changeFrequency: "monthly", priority: 0.8 });
        }
      }
    }
  } catch (e) {
    console.error("[Sitemap] Rechner query failed:", e);
  }

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

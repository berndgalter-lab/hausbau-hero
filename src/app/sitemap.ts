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
    { url: `${baseUrl}/ersatzteile`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/problem`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/vergleich/armaturen`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/rechner`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
    { url: `${baseUrl}/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.1 },
  ];

  // Silos dynamisch
  try {
    // Nur Kategorien mit mindestens einer aktiven Seite (leere Übersichten sind dünner Inhalt)
    const { data: aktive } = await supabase.from("seiten").select("silos(slug)").eq("status", "aktiv");
    const silos = Array.from(new Set((aktive ?? []).map((a: any) => a.silos?.slug).filter(Boolean))).map((slug) => ({ slug }));
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
  const HIGH_PRIO_RECHNER = new Set(["sanitaer"]);
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

  // Ersatzteile: Marken, Serien, Teile, Probleme
  try {
    const [{ data: marken }, { data: serien }, { data: teile }, { data: probleme }] = await Promise.all([
      supabase.from("marken").select("id, slug, updated_at"),
      supabase.from("serien").select("marke_id, slug, updated_at"),
      supabase.from("teile").select("slug, updated_at"),
      supabase.from("probleme").select("slug, updated_at"),
    ]);
    const markeSlug = new Map((marken ?? []).map((m: any) => [m.id, m.slug]));
    for (const m of marken ?? []) {
      dynamicPages.push({ url: `${baseUrl}/ersatzteile/${m.slug}`, lastModified: new Date(m.updated_at), changeFrequency: "weekly", priority: 0.9 });
    }
    for (const s of serien ?? []) {
      const ms = markeSlug.get(s.marke_id);
      if (ms) dynamicPages.push({ url: `${baseUrl}/ersatzteile/${ms}/${s.slug}`, lastModified: new Date(s.updated_at), changeFrequency: "monthly", priority: 0.8 });
    }
    for (const t of teile ?? []) {
      dynamicPages.push({ url: `${baseUrl}/teil/${t.slug}`, lastModified: new Date(t.updated_at), changeFrequency: "monthly", priority: 0.7 });
    }
    for (const p of probleme ?? []) {
      dynamicPages.push({ url: `${baseUrl}/problem/${p.slug}`, lastModified: new Date(p.updated_at), changeFrequency: "monthly", priority: 0.7 });
    }
  } catch (e) {
    console.error("[Sitemap] Ersatzteile query failed:", e);
  }

  return [...staticPages, ...dynamicPages];
}

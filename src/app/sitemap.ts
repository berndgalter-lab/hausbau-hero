import { supabase } from "@/lib/supabase";
import { serieIstDuenn } from "@/lib/ersatzteile";
import { artikelUrl } from "@/lib/produkt-ratgeber";

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
            url: `${baseUrl}${artikelUrl(siloSlug, s.slug)}`,
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
    const [{ data: marken }, { data: serien }, { data: teile }, { data: probleme }, { data: zuordnungen }] = await Promise.all([
      supabase.from("marken").select("id, slug, updated_at"),
      supabase.from("serien").select("id, marke_id, slug, erkennungsmerkmale, updated_at"),
      supabase.from("teile").select("slug, updated_at"),
      supabase.from("probleme").select("slug, updated_at"),
      supabase.from("serie_teile").select("serie_id"),
    ]);
    const teileJeSerie = new Map<string, number>();
    for (const z of zuordnungen ?? []) teileJeSerie.set(z.serie_id, (teileJeSerie.get(z.serie_id) ?? 0) + 1);
    const markeSlug = new Map((marken ?? []).map((m: any) => [m.id, m.slug]));
    for (const m of marken ?? []) {
      dynamicPages.push({ url: `${baseUrl}/ersatzteile/${m.slug}`, lastModified: new Date(m.updated_at), changeFrequency: "weekly", priority: 0.9 });
    }
    for (const s of serien ?? []) {
      // Dünne Serien sind noindex, also auch nicht in der Sitemap
      if (serieIstDuenn(s, teileJeSerie.get(s.id) ?? 0)) continue;
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

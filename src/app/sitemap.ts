import { supabase } from "@/lib/supabase";

export default async function sitemap() {
  const baseUrl = "https://hausbau-hero.de";

  const { data: silos } = await supabase.from("silos").select("slug, created_at");
  const { data: seiten } = await supabase.from("seiten").select("slug, silo_id, updated_at, silos(slug)").eq("status", "aktiv");
  const { data: rechnerList } = await supabase.from("rechner").select("slug, created_at");

  const urls: any[] = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  ];

  if (silos) {
    for (const s of silos) {
      urls.push({ url: `${baseUrl}/${s.slug}`, lastModified: s.created_at, changeFrequency: "weekly", priority: 0.8 });
    }
  }

  if (seiten) {
    for (const s of seiten as any) {
      const siloSlug = s.silos?.slug;
      if (siloSlug) {
        urls.push({ url: `${baseUrl}/${siloSlug}/${s.slug}`, lastModified: s.updated_at, changeFrequency: "monthly", priority: 0.6 });
      }
    }
  }

  if (rechnerList) {
    for (const r of rechnerList) {
      urls.push({ url: `${baseUrl}/rechner/${r.slug}`, lastModified: r.created_at, changeFrequency: "monthly", priority: 0.9 });
    }
  }

  return urls;
}

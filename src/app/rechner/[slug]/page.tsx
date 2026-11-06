import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { getRatgeberSlug } from "@/lib/ratgeber-zuordnung";
import RechnerSeite, { type MaterialData, type RatgeberVerweis, type RechnerData } from "@/components/RechnerSeite";

// Rechner, Materialien und passender Ratgeber kommen vom Server; der Browser spricht nicht mit Supabase.
export default async function RechnerPage({ params }: { params: { slug: string } }) {
  const { data: rechner } = await supabase.from("rechner").select("*").eq("slug", params.slug).maybeSingle();
  if (!rechner) notFound();

  const { data: materialien } = await supabase
    .from("rechner_materialien")
    .select("*")
    .eq("rechner_id", rechner.id)
    .order("sortierung");

  let ratgeber: RatgeberVerweis | null = null;
  const rSlug = getRatgeberSlug(rechner.slug, rechner.ratgeber_slug);
  if (rSlug) {
    const { data } = await supabase
      .from("seiten")
      .select("slug, titel, seo_description, silos(slug)")
      .eq("slug", rSlug)
      .eq("status", "aktiv")
      .maybeSingle();
    ratgeber = (data as RatgeberVerweis | null) ?? null;
  }

  return (
    <RechnerSeite
      rechner={rechner as RechnerData}
      materialien={(materialien ?? []) as MaterialData[]}
      ratgeber={ratgeber}
    />
  );
}

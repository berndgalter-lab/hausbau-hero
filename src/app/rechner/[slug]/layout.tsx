import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: rechner } = await supabase
    .from("rechner")
    .select("name, beschreibung")
    .eq("slug", params.slug)
    .single();

  const name = rechner?.name || "Materialrechner";
  const beschreibung =
    rechner?.beschreibung ||
    "Kostenloser Materialrechner mit Einkaufsliste und Werkzeug-Empfehlung.";

  return {
    title: name,
    description: beschreibung,
    alternates: { canonical: `https://hausbau-hero.de/rechner/${params.slug}` },
    openGraph: {
      title: `${name} — Hausbau Hero`,
      description: beschreibung,
      url: `https://hausbau-hero.de/rechner/${params.slug}`,
      type: "website",
    },
  };
}

export default function RechnerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

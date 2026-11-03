import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

async function ladeRechner(slug: string) {
  const { data } = await supabase.from("rechner").select("name, beschreibung").eq("slug", slug).maybeSingle();
  return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const rechner = await ladeRechner(params.slug);
  if (!rechner) return {};

  const beschreibung =
    rechner.beschreibung || "Kostenloser Materialrechner mit Einkaufsliste und Werkzeug-Empfehlung.";

  return {
    title: rechner.name,
    description: beschreibung,
    alternates: { canonical: `https://hausbau-hero.de/rechner/${params.slug}` },
    openGraph: {
      title: `${rechner.name} — Hausbau Hero`,
      description: beschreibung,
      url: `https://hausbau-hero.de/rechner/${params.slug}`,
      type: "website",
    },
  };
}

// Gelöschte oder erfundene Rechner-URLs liefern einen echten 404 statt einer leeren Seite mit Status 200.
export default async function RechnerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const rechner = await ladeRechner(params.slug);
  if (!rechner) notFound();
  return <>{children}</>;
}

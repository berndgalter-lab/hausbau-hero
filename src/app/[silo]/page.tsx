import { artikelUrl } from "@/lib/produkt-ratgeber";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// "finanzen" ist seit dem Umbau auf Bad & Sanitär entfernt (keine Seiten mehr).
const VALID_SILOS = ["farben", "bad", "rohbau", "boden", "werkzeuge", "stromerzeuger", "kueche", "garten", "maschinen"];

export async function generateMetadata({ params }: { params: { silo: string } }): Promise<Metadata> {
  const { data: silo } = await supabase
    .from("silos")
    .select("name, beschreibung")
    .eq("slug", params.silo)
    .single();

  if (!silo) return {};

  const name = silo.name;
  const beschreibung = silo.beschreibung || `${name} — Rechner, Werkzeuge und Ratgeber bei Hausbau Hero.`;

  return {
    title: name,
    description: beschreibung,
    alternates: { canonical: `https://hausbau-hero.de/${params.silo}` },
    openGraph: {
      title: `${name} — Hausbau Hero`,
      description: beschreibung,
      url: `https://hausbau-hero.de/${params.silo}`,
    },
  };
}

export default async function SiloPage({ params }: { params: { silo: string } }) {
  if (!VALID_SILOS.includes(params.silo)) {
    notFound();
  }

  const { data: silo, error: siloError } = await supabase
    .from("silos")
    .select("*")
    .eq("slug", params.silo)
    .single();

  if (siloError) {
    console.error("[SiloPage] Silo query error:", siloError.message);
  }

  if (!silo) notFound();

  let rechnerList: any[] = [];
  let seiten: any[] = [];

  try {
    const { data: rechnerData } = await supabase
      .from("rechner")
      .select("name, slug, beschreibung")
      .eq("silo_id", silo.id);
    if (rechnerData) rechnerList = rechnerData;
  } catch (e) {
    console.error("[SiloPage] Rechner query error:", e);
  }

  try {
    const { data: seitenData } = await supabase
      .from("seiten")
      .select("slug, titel, seo_description")
      .eq("silo_id", silo.id)
      .eq("status", "aktiv")
      .order("klicks", { ascending: false });
    if (seitenData) seiten = seitenData;
  } catch (e) {
    console.error("[SiloPage] Seiten query error:", e);
  }

  // Kategorie ohne Beiträge und ohne Rechner: nichts zu zeigen.
  if (seiten.length === 0 && rechnerList.length === 0) notFound();

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Start", item: "https://hausbau-hero.de" },
              { "@type": "ListItem", position: 2, name: silo.name, item: `https://hausbau-hero.de/${params.silo}` },
            ],
          }),
        }}
      />
      <nav className="text-sm text-stone-500 mb-4">
        <a href="/" className="hover:text-stone-700">Start</a>
        <span aria-hidden className="mx-2 text-stone-300">/</span>
        <span className="text-stone-900">{silo.name}</span>
      </nav>

      <div className="flex items-center gap-3 mb-2">
        <h1 className="text-[2.25rem] sm:text-5xl leading-[1.1] font-semibold">{silo.name}</h1>
      </div>
      {silo.beschreibung && (
        <p className="text-stone-600 mb-8 max-w-2xl">{silo.beschreibung}</p>
      )}

      {params.silo === "bad" && (
        <a href="/vergleich/armaturen"
          className="group block mb-10 p-5 bg-white border-2 border-accent-300 rounded-xl hover:border-accent-500 transition-colors">
          <div className="font-semibold text-lg group-hover:text-accent-700">Armaturen-Vergleich →</div>
          <div className="text-sm text-stone-600">
            Alle Armaturen aus unseren Kaufberatungen mit Maßen, Hoch- oder Niederdruck und Shop-Preisen, bis zu vier nebeneinander.
          </div>
        </a>
      )}

      {rechnerList.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold leading-tight mb-4">Rechner</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rechnerList.map((r: any) => (
              <a
                key={r.slug}
                href={`/rechner/${r.slug}`}
                className="group flex items-center gap-4 p-4 bg-stone-100/80 rounded-2xl transition-colors hover:bg-accent-50"
              >
                <div>
                  <div className="font-semibold group-hover:text-accent-700 transition-colors">
                    {r.name}
                  </div>
                  <div className="text-sm text-stone-600">{r.beschreibung}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {seiten.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold leading-tight mb-4">Ratgeber & Artikel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {seiten.map((s: any) => (
              <a
                key={s.slug}
                href={artikelUrl(params.silo, s.slug)}
                className="block p-4 bg-stone-100/80 rounded-2xl transition-colors hover:bg-accent-50"
              >
                <div className="font-medium">{s.titel}</div>
                {s.seo_description && (
                  <div className="text-sm text-stone-500 mt-1 line-clamp-2">
                    {s.seo_description}
                  </div>
                )}
              </a>
            ))}
          </div>
        </section>
      )}

      {rechnerList.length === 0 && seiten.length === 0 && (
        <div className="text-center py-12 text-stone-500">
          <p className="text-lg mb-2">Hier gibt es bald mehr Inhalte!</p>
          <a href="/" className="text-accent-600 hover:text-accent-700 font-medium">
            ← Zurück zur Startseite
          </a>
        </div>
      )}
    </div>
  );
}

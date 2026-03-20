import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gewerk-Reihenfolge — Welche Handwerker zuerst?",
  description:
    "Die richtige Reihenfolge der Gewerke: Bad sanieren, Küche einbauen, Dach ausbauen. Mit Zeitschätzung und Tipps. Kostenlos.",
  alternates: { canonical: "https://hausbau-hero.de/rechner/gewerk-reihenfolge" },
  openGraph: {
    title: "Gewerk-Reihenfolge — Hausbau Hero",
    description: "Die richtige Reihenfolge der Gewerke mit Zeitschätzung und Profi-Tipps.",
    url: "https://hausbau-hero.de/rechner/gewerk-reihenfolge",
  },
};

export default function GewerkReihenfolgeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

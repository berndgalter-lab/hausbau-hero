import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eigenleistungs-Rechner — Selbst machen oder Handwerker?",
  description:
    "Berechne wie viel du sparst wenn du Renovierungsarbeiten selbst machst. Vergleiche Materialkosten vs. Handwerkerkosten für Fliesen, Streichen, Laminat und mehr.",
  alternates: { canonical: "https://hausbau-hero.de/rechner/eigenleistung" },
  openGraph: {
    title: "Eigenleistungs-Rechner — Hausbau Hero",
    description: "Selbst machen oder Handwerker? Finde heraus wie viel du sparst.",
    url: "https://hausbau-hero.de/rechner/eigenleistung",
  },
};

export default function EigenleistungLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

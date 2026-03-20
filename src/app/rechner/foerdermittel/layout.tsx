import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fördermittel-Finder — KfW & BAFA Förderung 2026",
  description:
    "Finde sofort alle Förderungen für dein Bauvorhaben: KfW-Kredit, BAFA-Zuschuss, Heizungstausch, Dämmung, Fenster. Kostenlos und ohne Anmeldung.",
  alternates: { canonical: "https://hausbau-hero.de/rechner/foerdermittel" },
  openGraph: {
    title: "Fördermittel-Finder — Hausbau Hero",
    description: "Finde sofort alle KfW- und BAFA-Förderungen für dein Bauvorhaben.",
    url: "https://hausbau-hero.de/rechner/foerdermittel",
  },
};

export default function FoerdermittelLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

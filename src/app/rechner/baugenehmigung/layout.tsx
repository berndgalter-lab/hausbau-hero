import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baugenehmigung-Check — Brauche ich eine Genehmigung?",
  description:
    "Prüfe ob du für dein Bauvorhaben eine Baugenehmigung brauchst. Gartenhaus, Carport, Terrasse, Pool und mehr — nach Bundesland. Kostenlose Ersteinschätzung.",
  alternates: { canonical: "https://hausbau-hero.de/rechner/baugenehmigung" },
  openGraph: {
    title: "Baugenehmigung-Check — Hausbau Hero",
    description: "Brauche ich eine Baugenehmigung? Kostenlose Ersteinschätzung nach Bundesland.",
    url: "https://hausbau-hero.de/rechner/baugenehmigung",
  },
};

export default function BaugenehmigungLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

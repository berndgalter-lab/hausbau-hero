import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nebenkosten-Rechner — Kaufnebenkosten berechnen",
  description:
    "Berechne die Kaufnebenkosten für deine Immobilie: Grunderwerbsteuer nach Bundesland, Notar, Grundbuch und Makler. Kostenlos und ohne Anmeldung.",
  alternates: { canonical: "https://hausbau-hero.de/rechner/nebenkosten" },
  openGraph: {
    title: "Nebenkosten-Rechner — Hausbau Hero",
    description: "Kaufnebenkosten berechnen: Grunderwerbsteuer, Notar, Grundbuch, Makler.",
    url: "https://hausbau-hero.de/rechner/nebenkosten",
  },
};

export default function NebenkostenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

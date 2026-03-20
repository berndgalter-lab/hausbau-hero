import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handwerkerkosten-Rechner — Was kostet mein Projekt?",
  description:
    "Berechne die Handwerkerkosten für Fliesen, Streichen, Trockenbau, Dämmung und mehr. Mit regionalen Preisen für ganz Deutschland. Kostenlos.",
  alternates: { canonical: "https://hausbau-hero.de/rechner/handwerkerkosten" },
  openGraph: {
    title: "Handwerkerkosten-Rechner — Hausbau Hero",
    description: "Was kostet Fliesen legen, Streichen, Trockenbau? Regionale Preise für ganz Deutschland.",
    url: "https://hausbau-hero.de/rechner/handwerkerkosten",
  },
};

export default function HandwerkerkostenLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

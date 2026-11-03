import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import KlickZaehler from "@/components/KlickZaehler";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hausbau-hero.de"),
  title: {
    default: "Hausbau Hero — Sanitär-Ersatzteile & Bad-Kaufberatung",
    template: "%s | Hausbau Hero",
  },
  description:
    "Das passende Ersatzteil für Armatur und Spülkasten finden, das richtige Bad-Produkt wählen und selbst einbauen – mit Artikelnummern und Quellen.",
  authors: [{ name: "Hausbau Hero" }],
  creator: "BG Online Media UG",
  publisher: "Hausbau Hero",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Hausbau Hero",
    url: "https://hausbau-hero.de",
    title: "Hausbau Hero — Sanitär-Ersatzteile & Bad-Kaufberatung",
    description:
      "Das passende Ersatzteil für Armatur und Spülkasten finden – mit Artikelnummern und Quellen.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hausbau Hero — Sanitär-Ersatzteile & Bad-Kaufberatung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hausbau Hero — Sanitär-Ersatzteile & Bad-Kaufberatung",
    description:
      "Das passende Ersatzteil für Armatur und Spülkasten finden – mit Artikelnummern und Quellen.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: "https://hausbau-hero.de",
  },
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hausbau Hero",
  url: "https://hausbau-hero.de",
  logo: "https://hausbau-hero.de/logo.png",
  description:
    "Sanitär-Ersatzteile finden und Bad-Produkte auswählen – mit Artikelnummern und Quellen.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grünwiesenstraße 33",
    addressLocality: "Bietigheim-Bissingen",
    postalCode: "74321",
    addressCountry: "DE",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@hausbau-hero.de",
    contactType: "customer service",
    availableLanguage: "German",
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Hausbau Hero",
  url: "https://hausbau-hero.de",
  description: "Sanitär-Ersatzteile finden und Bad-Produkte auswählen.",
  inLanguage: "de-DE",
  publisher: { "@type": "Organization", name: "Hausbau Hero" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta httpEquiv="content-language" content="de" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body className="bg-stone-50 text-stone-900 antialiased">
        <header className="border-b border-stone-200 bg-white sticky top-0 z-50 relative">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl font-bold text-amber-600">⚡</span>
              <span className="text-xl font-bold tracking-tight">
                Hausbau<span className="text-amber-600">Hero</span>
              </span>
            </a>
            <Navigation />
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="border-t border-stone-200 bg-white mt-16">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-stone-500">
            <p>
              © {new Date().getFullYear()} Hausbau Hero. Als Amazon-Partner
              verdienen wir an qualifizierten Verkäufen.
            </p>
            <div className="mt-2 flex gap-4">
              <a href="/impressum" className="hover:text-stone-700">Impressum</a>
              <a href="/datenschutz" className="hover:text-stone-700">Datenschutz</a>
            </div>
          </div>
        </footer>
        <KlickZaehler />
        <Analytics />
      </body>
    </html>
  );
}

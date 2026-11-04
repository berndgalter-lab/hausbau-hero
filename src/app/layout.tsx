import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import KlickZaehler from "@/components/KlickZaehler";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { Newsreader } from "next/font/google";
import { BEREICHE } from "@/lib/bereiche";

const geist = localFont({ src: "./fonts/GeistVF.woff", variable: "--font-geist", weight: "100 900", display: "swap" });
const geistMono = localFont({ src: "./fonts/GeistMonoVF.woff", variable: "--font-geist-mono", weight: "100 900", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap", axes: ["opsz"], adjustFontFallback: false });

export const metadata: Metadata = {
  metadataBase: new URL("https://hausbau-hero.de"),
  title: {
    default: "Hausbau Hero — Sanitär-Ersatzteile & Bad-Ratgeber",
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
    title: "Hausbau Hero — Sanitär-Ersatzteile & Bad-Ratgeber",
    description:
      "Das passende Ersatzteil für Armatur und Spülkasten finden – mit Artikelnummern und Quellen.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Hausbau Hero — Sanitär-Ersatzteile & Bad-Ratgeber",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hausbau Hero — Sanitär-Ersatzteile & Bad-Ratgeber",
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

/** Wortmarke: Dachlinie über einem Wassertropfen, eine Linienstärke wie die Bereichszeichnungen. */
function Logo() {
  return (
    <a href="/" className="group flex items-center gap-2.5 shrink-0" aria-label="Hausbau Hero, zur Startseite">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden>
        <rect width="32" height="32" rx="8" className="fill-accent-700" />
        <path d="M7 15.5 16 8l9 7.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 14.5c2.4 3 3.6 5 3.6 6.6a3.6 3.6 0 0 1-7.2 0c0-1.6 1.2-3.6 3.6-6.6z" fill="#fff" />
      </svg>
      <span className="font-serif text-[1.35rem] font-semibold tracking-tight text-stone-900">
        Hausbau Hero
      </span>
    </a>
  );
}

const FUSS_SPALTEN = [
  {
    titel: "Reparieren",
    links: [
      { href: "/ersatzteile", label: "Ersatzteil suchen" },
      { href: "/problem", label: "Problemlöser" },
      { href: "/ersatzteile#marken", label: "Alle Marken" },
    ],
  },
  {
    titel: "Neu kaufen",
    links: [
      { href: "/ratgeber", label: "Alle Ratgeber" },
      { href: "/vergleich/armaturen", label: "Armaturen-Datenblätter" },
      { href: "/rechner", label: "Rechner" },
    ],
  },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${geist.variable} ${geistMono.variable} ${newsreader.variable}`}>
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
      <body className="bg-paper font-sans text-stone-900 antialiased">
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded focus:bg-white focus:px-3 focus:py-2">
          Zum Inhalt
        </a>
        <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-paper/90 backdrop-blur supports-[backdrop-filter]:bg-paper/75">
          <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-6">
            <Logo />
            <Navigation />
          </div>
        </header>

        <main id="inhalt" className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10">{children}</main>

        <footer className="mt-24 bg-stone-900 text-stone-300">
          <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
            <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
              <div>
                <p className="font-serif text-xl font-semibold text-white">Hausbau Hero</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-400">
                  Das passende Ersatzteil mit Originalnummer finden und selbst reparieren. Und wenn sich das nicht
                  mehr lohnt: das richtige neue Produkt, mit Maßen aus den Datenblättern.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Bereiche</p>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {BEREICHE.map((b) => (
                    <li key={b.slug}>
                      <a href={`/bereich/${b.slug}`} className="hover:text-white">{b.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
              {FUSS_SPALTEN.map((s) => (
                <div key={s.titel}>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{s.titel}</p>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {s.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className="hover:text-white">{l.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-4 border-t border-stone-800 pt-6 text-xs text-stone-500 md:flex-row md:items-start md:justify-between">
              <p className="max-w-2xl leading-relaxed">
                © {new Date().getFullYear()} Hausbau Hero, BG Online Media UG. Als Amazon-Partner verdienen wir an
                qualifizierten Verkäufen. Links zu weiteren Shops (z. B. hagebau.de, Contorion) sind Partnerlinks über
                Awin. Mit * markierte Links sind Partnerlinks, am Preis ändert sich für dich nichts.
              </p>
              <div className="flex shrink-0 gap-5">
                <a href="/impressum" className="hover:text-stone-300">Impressum</a>
                <a href="/datenschutz" className="hover:text-stone-300">Datenschutz</a>
              </div>
            </div>
          </div>
        </footer>
        <KlickZaehler />
        <Analytics />
      </body>
    </html>
  );
}

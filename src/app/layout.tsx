import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hausbau Hero — Rechner & Werkzeuge für Bauherren und Handwerker",
    template: "%s | Hausbau Hero",
  },
  description:
    "Materialrechner, Werkzeug-Empfehlungen und Kostenrechner für Bauherren und Handwerker.",
  metadataBase: new URL("https://hausbau-hero.de"),
  openGraph: { siteName: "Hausbau Hero", locale: "de_DE", type: "website" },
  robots: { index: true, follow: true },
};

const NAV_LINKS = [
  { href: "/rechner", label: "Rechner" },
  { href: "/farben", label: "Farben" },
  { href: "/bad", label: "Bad" },
  { href: "/werkzeuge", label: "Werkzeuge" },
  { href: "/stromerzeuger", label: "Stromerzeuger" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-stone-50 text-stone-900 antialiased">
        <header className="border-b border-stone-200 bg-white sticky top-0 z-50">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <span className="text-2xl font-bold text-amber-600">⚡</span>
              <span className="text-xl font-bold tracking-tight">
                Hausbau<span className="text-amber-600">Hero</span>
              </span>
            </a>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-stone-600">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="hover:text-stone-900 transition-colors">
                  {link.label}
                </a>
              ))}
            </nav>
            {/* Mobile: simple horizontal scroll nav */}
            <nav className="md:hidden flex gap-3 text-xs font-medium text-stone-600 overflow-x-auto">
              {NAV_LINKS.slice(0, 3).map((link) => (
                <a key={link.href} href={link.href} className="hover:text-stone-900 whitespace-nowrap">
                  {link.label}
                </a>
              ))}
            </nav>
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
              <a href="/impressum" className="hover:text-stone-700">
                Impressum
              </a>
              <a href="/datenschutz" className="hover:text-stone-700">
                Datenschutz
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

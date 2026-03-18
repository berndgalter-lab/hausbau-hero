import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Hausbau Hero — Rechner & Werkzeuge für Bauherren und Handwerker", template: "%s | Hausbau Hero" },
  description: "Materialrechner, Werkzeug-Empfehlungen und Kostenrechner für Bauherren und Handwerker.",
  metadataBase: new URL("https://hausbau-hero.de"),
  openGraph: { siteName: "Hausbau Hero", locale: "de_DE", type: "website" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-stone-50 text-stone-900 antialiased">
        <header className="border-b border-stone-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold text-amber-600">⚡</span>
              <span className="text-xl font-bold tracking-tight">Hausbau<span className="text-amber-600">Hero</span></span>
            </a>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-stone-600">
              <a href="/rechner/wandfarbe" className="hover:text-stone-900">Rechner</a>
              <a href="/farben" className="hover:text-stone-900">Farben</a>
              <a href="/bad" className="hover:text-stone-900">Bad</a>
              <a href="/werkzeuge" className="hover:text-stone-900">Werkzeuge</a>
              <a href="/stromerzeuger" className="hover:text-stone-900">Stromerzeuger</a>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="border-t border-stone-200 bg-white mt-16">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-stone-500">
            <p>© {new Date().getFullYear()} Hausbau Hero. Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.</p>
            <div className="mt-2 flex gap-4">
              <a href="/impressum" className="hover:text-stone-700">Impressum</a>
              <a href="/datenschutz" className="hover:text-stone-700">Datenschutz</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

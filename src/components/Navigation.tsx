"use client";

import { useState } from "react";

interface NavSilo {
  slug: string;
  name: string;
  icon?: string;
}

const SHORT_LABELS: Record<string, string> = {
  farben: "Farben",
  bad: "Bad",
  rohbau: "Rohbau",
  boden: "Boden",
  werkzeuge: "Werkzeuge",
  stromerzeuger: "Strom",
  kueche: "Küche",
  garten: "Garten",
  maschinen: "Maschinen",
  finanzen: "Finanzen",
};

function shortName(s: NavSilo) {
  return SHORT_LABELS[s.slug] || s.name;
}

export default function Navigation({ silos }: { silos: NavSilo[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop */}
      <nav className="hidden lg:flex items-center gap-4 text-sm font-medium text-stone-600">
        <a href="/rechner" className="hover:text-stone-900 transition-colors">
          Rechner
        </a>
        {silos.map((s) => (
          <a key={s.slug} href={`/${s.slug}`} className="hover:text-stone-900 transition-colors whitespace-nowrap">
            {shortName(s)}
          </a>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-2 text-stone-600 hover:text-stone-900"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menü"
      >
        {mobileOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-white border-b border-stone-200 shadow-lg z-50">
          <div className="px-4 py-3 space-y-1">
            <a href="/rechner" className="block py-2 text-sm font-medium text-stone-700 hover:text-amber-600">
              🧮 Rechner
            </a>
            {silos.map((s) => (
              <a
                key={s.slug}
                href={`/${s.slug}`}
                className="block py-2 text-sm font-medium text-stone-700 hover:text-amber-600"
              >
                {s.icon && <span className="mr-2">{s.icon}</span>}
                {shortName(s)}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

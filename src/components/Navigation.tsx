"use client";

import { useState } from "react";

// Feste Hauptnavigation für den Fokus Bad & Sanitär. Die alten Kategorien
// (Farben, Rohbau, Werkzeuge …) sind weiter erreichbar, aber nicht mehr verlinkt.
const PUNKTE = [
  { href: "/ersatzteile", label: "Ersatzteile", icon: "🔩" },
  { href: "/bad", label: "Bad-Kaufberatung", icon: "🚿" },
  { href: "/vergleich/armaturen", label: "Armaturen-Vergleich", icon: "⚖️" },
  { href: "/problem", label: "Problemlöser", icon: "🛠️" },
  { href: "/rechner", label: "Rechner", icon: "🧮" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-stone-600">
        {PUNKTE.map((p) => (
          <a key={p.href} href={p.href} className="hover:text-stone-900 transition-colors whitespace-nowrap">
            {p.label}
          </a>
        ))}
      </nav>

      <button
        className="md:hidden p-2 text-stone-600 hover:text-stone-900"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menü"
        aria-expanded={mobileOpen}
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

      {mobileOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-stone-200 shadow-lg z-50">
          <div className="px-4 py-3 space-y-1">
            {PUNKTE.map((p) => (
              <a
                key={p.href}
                href={p.href}
                className="block py-2 text-sm font-medium text-stone-700 hover:text-amber-600"
              >
                <span className="mr-2">{p.icon}</span>
                {p.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

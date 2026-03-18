"use client";

import { useState } from "react";

interface NavSilo {
  slug: string;
  name: string;
  icon?: string;
}

const MAIN_NAV_COUNT = 6;

export default function Navigation({ silos }: { silos: NavSilo[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mainSilos = silos.slice(0, MAIN_NAV_COUNT);
  const moreSilos = silos.slice(MAIN_NAV_COUNT);

  return (
    <>
      {/* Desktop */}
      <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-stone-600">
        <a href="/rechner" className="hover:text-stone-900 transition-colors">
          Rechner
        </a>
        {mainSilos.map((s) => (
          <a key={s.slug} href={`/${s.slug}`} className="hover:text-stone-900 transition-colors">
            {s.name}
          </a>
        ))}
        {moreSilos.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onBlur={() => setTimeout(() => setDropdownOpen(false), 150)}
              className="hover:text-stone-900 transition-colors flex items-center gap-1"
            >
              Mehr
              <svg className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white border border-stone-200 rounded-lg shadow-lg py-1 min-w-[160px] z-50">
                {moreSilos.map((s) => (
                  <a
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="block px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                  >
                    {s.icon && <span className="mr-2">{s.icon}</span>}
                    {s.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 text-stone-600 hover:text-stone-900"
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
        <div className="md:hidden absolute left-0 right-0 top-full bg-white border-b border-stone-200 shadow-lg z-50">
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
                {s.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

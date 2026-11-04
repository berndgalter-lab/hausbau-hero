"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Hauptnavigation „Reparatur rund ums Haus“ (docs/SEITENAUFBAU.md, Abschnitt 2a). Die alten Kategorien
// (Farben, Rohbau, Werkzeuge …) sind weiter erreichbar, aber nicht mehr verlinkt.
const PUNKTE = [
  { href: "/ersatzteile", label: "Ersatzteile" },
  { href: "/problem", label: "Probleme" },
  { href: "/ratgeber", label: "Ratgeber" },
  { href: "/rechner", label: "Rechner" },
];

function aktiv(pfad: string, href: string) {
  return pfad === href || pfad.startsWith(`${href}/`);
}

function SuchSymbol({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className={className} aria-hidden>
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="m13 13 4 4" strokeLinecap="round" />
    </svg>
  );
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pfad = usePathname() ?? "/";

  useEffect(() => setMobileOpen(false), [pfad]);

  return (
    <>
      <nav className="hidden md:flex items-center gap-1 text-[0.938rem]" aria-label="Hauptnavigation">
        {PUNKTE.map((p) => (
          <a
            key={p.href}
            href={p.href}
            aria-current={aktiv(pfad, p.href) ? "page" : undefined}
            className={`rounded-full px-3.5 py-1.5 transition-colors whitespace-nowrap ${
              aktiv(pfad, p.href) ? "bg-stone-900/[0.06] text-stone-900 font-medium" : "text-stone-600 hover:text-stone-900"
            }`}
          >
            {p.label}
          </a>
        ))}
        <a
          href="/ersatzteile#suche"
          className="ml-3 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3.5 py-1.5 text-sm text-stone-500 hover:border-stone-400 hover:text-stone-800"
        >
          <SuchSymbol />
          Teil oder Nummer
        </a>
      </nav>

      <div className="flex items-center gap-1 md:hidden">
        <a href="/ersatzteile#suche" className="p-2 text-stone-700" aria-label="Ersatzteil suchen">
          <SuchSymbol className="h-5 w-5" />
        </a>
        <button
          className="p-2 text-stone-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menü"
          aria-expanded={mobileOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden>
            {mobileOpen ? (
              <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full border-b border-stone-200 bg-paper shadow-[0_12px_24px_-12px_rgba(0,0,0,0.15)]">
          <nav className="px-5 py-2" aria-label="Hauptnavigation">
            {PUNKTE.map((p) => (
              <a
                key={p.href}
                href={p.href}
                aria-current={aktiv(pfad, p.href) ? "page" : undefined}
                className="flex items-center justify-between border-b border-stone-200 py-3.5 text-base font-medium text-stone-800 last:border-0"
              >
                {p.label}
                <span aria-hidden className="text-stone-400">→</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

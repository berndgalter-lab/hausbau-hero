"use client";

import { useEffect, useState } from "react";
import type { Gliederungspunkt } from "@/lib/artikel-aufbau";

// Inhaltsverzeichnis der Ratgeber: auf großen Bildschirmen mitlaufend in der rechten Spalte,
// der Abschnitt im Blick ist hervorgehoben. Auf dem Handy aufklappbar über dem Text.
export default function Inhaltsverzeichnis({ punkte, ansicht }: { punkte: Gliederungspunkt[]; ansicht: "handy" | "rand" }) {
  const [aktiv, setAktiv] = useState<string | null>(null);

  // Aktiv ist der letzte Abschnitt, dessen Anfang schon unter dem Kopf der Seite durch ist
  useEffect(() => {
    let wartet = false;
    const pruefe = () => {
      wartet = false;
      let treffer: string | null = null;
      for (const p of punkte) {
        const el = document.getElementById(p.id);
        if (el && el.getBoundingClientRect().top < 140) treffer = p.id;
      }
      setAktiv(treffer);
    };
    const beimScrollen = () => {
      if (!wartet) {
        wartet = true;
        requestAnimationFrame(pruefe);
      }
    };
    pruefe();
    window.addEventListener("scroll", beimScrollen, { passive: true });
    return () => window.removeEventListener("scroll", beimScrollen);
  }, [punkte]);

  if (punkte.length < 3) return null;

  const liste = (
    <ol className="space-y-0.5 border-l border-stone-200">
      {punkte.map((p) => (
        <li key={p.id}>
          <a
            href={`#${p.id}`}
            className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors ${
              aktiv === p.id ? "border-accent-600 font-medium text-stone-900" : "border-transparent text-stone-500 hover:text-stone-900"
            }`}
          >
            {p.titel}
          </a>
        </li>
      ))}
    </ol>
  );

  if (ansicht === "handy")
    return (
      <details className="group -mt-10 mb-10 border-b border-stone-200 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-sm font-semibold text-stone-900">
          Inhalt
          <span aria-hidden className="text-stone-400 transition-transform group-open:rotate-180">▾</span>
        </summary>
        <div className="pb-4">{liste}</div>
      </details>
    );
  return (
    <nav aria-label="Inhalt" className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">Inhalt</p>
      {liste}
    </nav>
  );
}

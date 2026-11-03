"use client";

import { useEffect } from "react";

// Zählt Klicks auf Affiliate-Links (rel="sponsored"), ohne die Links umzuleiten:
// Der Link geht weiter direkt zu Amazon bzw. Awin, parallel geht ein Beacon an /api/klick.
export default function KlickZaehler() {
  useEffect(() => {
    function melden(e: MouseEvent) {
      const ziel = (e.target as HTMLElement | null)?.closest?.("a[rel~='sponsored']") as HTMLAnchorElement | null;
      if (!ziel) return;
      const daten = {
        pfad: window.location.pathname,
        ziel: ziel.href,
        platzierung: ziel.dataset.platzierung ?? null,
        kennung: ziel.dataset.kennung ?? null,
        shop: ziel.dataset.shop ?? null,
      };
      try {
        const blob = new Blob([JSON.stringify(daten)], { type: "application/json" });
        if (!navigator.sendBeacon?.("/api/klick", blob)) {
          fetch("/api/klick", { method: "POST", body: JSON.stringify(daten), keepalive: true }).catch(() => {});
        }
      } catch {
        // Zählen darf den Klick nie blockieren.
      }
    }
    document.addEventListener("click", melden, true);
    document.addEventListener("auxclick", melden, true);
    return () => {
      document.removeEventListener("click", melden, true);
      document.removeEventListener("auxclick", melden, true);
    };
  }, []);

  return null;
}

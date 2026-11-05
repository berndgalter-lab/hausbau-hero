import markenDateien from "../../data/ersatzteile/index.json";

// Seitenart eines Pfads, für die Klickzählung (affiliate_klicks.seitentyp) und Awin clickref2.
// Läuft im Browser und auf dem Server, deshalb ohne Datenbank: Marken kommen aus data/ersatzteile/index.json.

export const SEITENTYPEN = [
  "start", "teil", "problem", "ratgeber", "groesse", "teilart", "marke", "serie",
  "bereich", "ersatzteile", "wissen", "rechner", "vergleich", "sonstige",
] as const;
export type Seitentyp = (typeof SEITENTYPEN)[number];

const MARKEN = new Set((markenDateien as string[]).map((d) => d.replace(/\.json$/, "")));
// VELUX-Größencode als Serien-Slug: mk04, sk06, ck02 (docs/SEITENAUFBAU.md, Abschnitt 5a)
const GROESSEN_CODE = /^[a-z]{1,2}\d{2}$/;
// Wissensbeiträge liegen unter dem Silo: /bad/vorwandelement-wc-hoehe
const SILOS = new Set(["bad", "kueche", "fenster", "garten", "farben", "rohbau", "boden", "werkzeuge", "maschinen", "stromerzeuger"]);

export function seitentypVonPfad(pfad: string): Seitentyp {
  const teile = pfad.split("?")[0].split("/").filter(Boolean);
  const [erster, zweiter, dritter] = teile;
  if (!erster) return "start";
  switch (erster) {
    case "teil":
      return "teil";
    case "problem":
      return zweiter ? "problem" : "sonstige";
    case "ratgeber":
      return zweiter ? "ratgeber" : "sonstige";
    case "bereich":
      return "bereich";
    case "rechner":
      return "rechner";
    case "vergleich":
      return "vergleich";
    case "ersatzteile":
      if (!zweiter) return "ersatzteile";
      if (!MARKEN.has(zweiter)) return "teilart";
      if (!dritter) return "marke";
      return zweiter === "velux" && GROESSEN_CODE.test(dritter) ? "groesse" : "serie";
  }
  return SILOS.has(erster) && zweiter ? "wissen" : "sonstige";
}

/** Slug für Awin clickref3: letzter Pfadteil, höchstens 50 Zeichen. */
export function slugVonPfad(pfad: string): string {
  const teile = pfad.split("?")[0].split("/").filter(Boolean);
  return (teile[teile.length - 1] ?? "start").slice(0, 50);
}

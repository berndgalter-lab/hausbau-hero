import { TeilartBild } from "@/components/BereichBild";
import type { Marke } from "@/lib/ersatzteile";

// Kacheln für Teile und Marken, auf /ersatzteile und der Startseite gleich.

export interface TeilKachelDaten {
  slug: string;
  name: string;
  href: string;
  bereich: string;
}

// Drückerplatten haben keine Teileart-Seite, der Ratgeber erklärt sie. Er steht darum bei den Teilen mit.
export const DRUECKERPLATTE_KACHEL: TeilKachelDaten = {
  slug: "geberit-sigma-drueckerplatte",
  name: "Drückerplatte",
  href: "/ratgeber/drueckerplatte",
  bereich: "wc-spuelkasten",
};

/** Teileart mit Zeichnung (keine Feed-Fotos als Teaser, docs/SEITENAUFBAU.md). */
export function TeilKachel({ t, klein = false }: { t: TeilKachelDaten; klein?: boolean }) {
  return (
    <a
      href={t.href}
      className="group flex h-full flex-col gap-2.5 rounded-2xl bg-white p-2.5 ring-1 ring-stone-900/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:ring-stone-900/20 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] sm:p-3"
    >
      <span className={`flex items-center justify-center rounded-xl bg-accent-50/70 text-accent-700 transition-colors group-hover:bg-accent-100/70 ${klein ? "h-20" : "h-24"}`}>
        <TeilartBild slug={t.slug} bereich={t.bereich} className={`transition-transform group-hover:scale-105 ${klein ? "h-14 w-14" : "h-16 w-16"}`} />
      </span>
      <span className={`px-1 pb-0.5 font-semibold leading-snug text-stone-900 group-hover:text-accent-700 ${klein ? "text-sm" : ""}`}>{t.name}</span>
    </a>
  );
}

/** Marke mit Zahl der Teile und den häufigsten Teiltypen (teileJeMarke). */
export function MarkenKachel({ m, zahl }: { m: Marke; zahl?: { anzahl: number; typen: string[] } }) {
  return (
    <a href={`/ersatzteile/${m.slug}`} className="group flex flex-col rounded-2xl bg-stone-100/80 p-4 transition-colors hover:bg-accent-50">
      <span className="flex items-baseline justify-between gap-2">
        <span className="text-lg font-semibold leading-snug text-stone-900 group-hover:text-accent-700">{m.name}</span>
        <span aria-hidden className="text-stone-300 group-hover:text-accent-700">→</span>
      </span>
      {zahl && (
        <span className="mt-1 line-clamp-2 text-sm leading-snug text-stone-600">
          <span className="font-medium text-stone-900">{zahl.anzahl} {zahl.anzahl === 1 ? "Teil" : "Teile"}</span>
          {zahl.typen.length > 0 && <> · {zahl.typen.slice(0, 2).join(", ")}</>}
        </span>
      )}
    </a>
  );
}

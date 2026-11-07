import { TeilartBild } from "@/components/BereichBild";
import type { Marke, MarkenZahl } from "@/lib/ersatzteile";
import { zeichnungFuerTeiltyp } from "@/lib/teilarten";

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

/**
 * Marke mit Zeichnungen ihrer häufigsten Teile, Zahl der Teile und Teiltypen (teileJeMarke). Bewusst kein Logo:
 * Den Markennamen nennen wir, um zu sagen, wofür ein Teil passt; das Logo braucht es dafür nicht.
 */
export function MarkenKachel({ m, zahl }: { m: Marke; zahl?: MarkenZahl }) {
  // Bis zu drei verschiedene Zeichnungen in der Reihenfolge der häufigsten Teiltypen
  const zeichnungen = Array.from(
    new Map(
      (zahl?.teiltypen ?? [])
        .map((typ) => zeichnungFuerTeiltyp(typ, m.slug))
        .filter((z): z is NonNullable<typeof z> => !!z)
        .map((z) => [z.slug, z]),
    ).values(),
  ).slice(0, 3);
  return (
    <a
      href={`/ersatzteile/${m.slug}`}
      className="group flex h-full flex-col gap-3 rounded-2xl bg-white p-2.5 ring-1 ring-stone-900/[0.07] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow hover:ring-stone-900/20 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.18)] sm:p-3"
    >
      {zeichnungen.length > 0 && (
        <span className="flex h-16 items-center justify-center gap-3 rounded-xl bg-accent-50/70 text-accent-700 transition-colors group-hover:bg-accent-100/70">
          {zeichnungen.map((z) => (
            <TeilartBild key={z.slug} slug={z.slug} bereich={z.bereich} className="h-10 w-10" />
          ))}
        </span>
      )}
      <span className="px-1 pb-0.5">
        <span className="flex items-baseline justify-between gap-2">
          <span className="text-lg font-semibold leading-snug text-stone-900 group-hover:text-accent-700">{m.name}</span>
          <span aria-hidden className="text-stone-300 group-hover:text-accent-700">→</span>
        </span>
        {zahl && (
          <span className="mt-0.5 line-clamp-2 block text-sm leading-snug text-stone-600">
            <span className="font-medium text-stone-900">{zahl.anzahl} {zahl.anzahl === 1 ? "Teil" : "Teile"}</span>
            {zahl.typen.length > 0 && <> · {zahl.typen.slice(0, 2).join(", ")}</>}
          </span>
        )}
      </span>
    </a>
  );
}

import BereichBild, { RatgeberBild } from "@/components/BereichBild";
import type { Bereich } from "@/lib/bereiche";
import type { RatgeberKarte } from "@/lib/bereiche-daten";

/** Kachel „Wo ist das Problem?“ auf Startseite und Bereichsseiten: Zeichnung auf getönter Fläche, kein Rahmen. */
export function BereichKachel({ b }: { b: Bereich }) {
  return (
    <a
      href={`/bereich/${b.slug}`}
      className="group flex h-full flex-col rounded-2xl bg-stone-100 p-5 transition-colors hover:bg-accent-50 sm:p-6"
    >
      <span className="text-stone-700 transition-colors group-hover:text-accent-700">
        <BereichBild slug={b.slug} className="h-14 w-14 sm:h-16 sm:w-16" />
      </span>
      <span className="mt-6 flex items-baseline justify-between gap-2 font-semibold text-stone-900">
        {b.name}
        <span aria-hidden className="text-stone-400 transition-transform group-hover:translate-x-0.5 group-hover:text-accent-700">→</span>
      </span>
      <span className="mt-1 text-sm leading-snug text-stone-600">{b.kurz}</span>
    </a>
  );
}

/** Ratgeber als Liste mit Haarlinien, Zeichnung auf getönter Fläche wie bei den Bereichskacheln. */
export function RatgeberKarten({ liste }: { liste: RatgeberKarte[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-10 border-t border-stone-200 md:grid-cols-2">
      {liste.map((r) => (
        <li key={r.slug} className="border-b border-stone-200">
          <a href={r.href} className="group flex h-full items-center gap-4 py-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-stone-100 text-stone-700 transition-colors group-hover:bg-accent-50 group-hover:text-accent-700">
              <RatgeberBild slug={r.slug} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-snug text-stone-900 group-hover:text-accent-700">{r.titel}</span>
              {r.text && <span className="mt-1 text-sm leading-snug text-stone-600 line-clamp-2">{r.text}</span>}
            </span>
            <span aria-hidden className="text-stone-300 group-hover:text-accent-700">→</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

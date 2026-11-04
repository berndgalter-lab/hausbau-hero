import TeilBild from "@/components/TeilBild";
import BereichBild from "@/components/BereichBild";
import type { Bereich } from "@/lib/bereiche";
import type { RatgeberKarte } from "@/lib/bereiche-daten";

/** Kachel „Wo ist das Problem?“ auf Startseite und Bereichsseiten. */
export function BereichKachel({ b }: { b: Bereich }) {
  return (
    <a
      href={`/bereich/${b.slug}`}
      className="group flex h-full flex-col items-center text-center gap-2 p-5 bg-white border border-stone-200 rounded-xl hover:border-amber-400"
    >
      <span className="text-stone-700 group-hover:text-amber-700">
        <BereichBild slug={b.slug} className="h-16 w-16" />
      </span>
      <span className="font-semibold text-stone-900 group-hover:text-amber-700">{b.name}</span>
      <span className="text-sm text-stone-500">{b.kurz}</span>
    </a>
  );
}

/** Ratgeber mit Produktbild aus den Partner-Feeds, ohne Bild nur mit Text. */
export function RatgeberKarten({ liste }: { liste: RatgeberKarte[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {liste.map((r) => (
        <li key={r.slug}>
          <a href={r.href} className="group flex h-full gap-4 p-4 bg-white border border-stone-200 rounded-xl hover:border-amber-400">
            {r.bild && <TeilBild url={r.bild.url} alt="" groesse={72} />}
            <span className="min-w-0">
              <span className="block font-semibold text-stone-900 group-hover:text-amber-700">{r.titel}</span>
              {r.text && <span className="block text-sm text-stone-600 mt-1 line-clamp-2">{r.text}</span>}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

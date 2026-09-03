import { getAngebotsCTA } from "@/lib/monetarisierung";

/**
 * Angebotsvergleich direkt unter dem Rechenergebnis.
 * Rendert nichts, solange in `src/lib/monetarisierung.ts` kein Partnerlink hinterlegt ist.
 */
export default function AngebotsBox({ slug }: { slug: string }) {
  const cta = getAngebotsCTA(slug);
  if (!cta) return null;

  return (
    <aside className="my-6 rounded-xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-white p-6">
      <h2 className="text-lg font-bold text-stone-900">{cta.ueberschrift}</h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-700">{cta.text}</p>
      <a
        href={cta.url}
        target="_blank"
        rel="nofollow noopener noreferrer sponsored"
        className="mt-4 inline-block rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
      >
        {cta.buttonText} →
      </a>
      <p className="mt-3 text-xs text-stone-500">
        {cta.hinweis ? `${cta.hinweis} ` : ""}
        Werbung: Für vermittelte Anfragen erhalten wir eine Provision. Für dich entstehen
        dadurch keine Mehrkosten.
      </p>
    </aside>
  );
}

// Suchfeld für Teil oder Artikelnummer, gleich auf Startseite, Teilesuche und Markenseiten:
// eine Pille mit Lupe, der Knopf sitzt im Feld.
export default function SuchFeld({
  id,
  platzhalter,
  wert,
  hinweis,
  label = "Teil oder Artikelnummer",
}: {
  id: string;
  platzhalter: string;
  wert?: string;
  hinweis?: React.ReactNode;
  label?: string;
}) {
  return (
    <form action="/ersatzteile" method="get" role="search" className="max-w-xl">
      <label htmlFor={id} className="sr-only">{label}</label>
      <div className="flex items-center gap-2 rounded-full bg-white p-1.5 pl-5 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.18)] ring-1 ring-stone-900/10 focus-within:ring-2 focus-within:ring-accent-500">
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5 shrink-0 text-stone-400" aria-hidden>
          <circle cx="8.5" cy="8.5" r="5.5" />
          <path d="m13 13 4 4" strokeLinecap="round" />
        </svg>
        <input
          id={id}
          name="q"
          type="search"
          defaultValue={wert}
          placeholder={platzhalter}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-base placeholder:text-stone-400 focus:outline-none"
        />
        <button type="submit" className="shrink-0 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-700">
          Suchen
        </button>
      </div>
      {hinweis && <p className="mt-2.5 pl-5 text-sm text-stone-500">{hinweis}</p>}
    </form>
  );
}

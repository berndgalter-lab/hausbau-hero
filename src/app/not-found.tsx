import SuchFeld from "@/components/SuchFeld";

// Seite nicht gefunden: statt einer leeren Fehlermeldung die beiden Einstiege der Startseite.
export default function NichtGefunden() {
  return (
    <div className="mx-auto max-w-2xl py-16 text-center sm:py-24">
      <p className="ueberzeile">Fehler 404</p>
      <h1 className="mt-4 text-4xl leading-tight text-stone-900 sm:text-5xl">Diese Seite gibt es nicht (mehr).</h1>
      <p className="mt-5 text-lg leading-relaxed text-stone-600">
        Vielleicht hilft die Suche nach der Nummer auf deinem Teil, oder du fängst bei der Stelle im Haus an.
      </p>
      <div className="mx-auto mt-10 max-w-xl text-left">
        <SuchFeld id="fehler-suche" platzhalter="Nummer oder Teil" />
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
        <a href="/" className="weiterlink">Zur Startseite</a>
        <a href="/problem" className="weiterlink">Problemlöser</a>
        <a href="/ratgeber" className="weiterlink">Ratgeber</a>
      </div>
    </div>
  );
}

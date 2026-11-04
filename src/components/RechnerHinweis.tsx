export default function RechnerHinweis({ text }: { text?: string }) {
  const defaultText = "Diese Berechnung ist eine Orientierungshilfe auf Basis von Durchschnittswerten (Stand 2026). Die tatsächlichen Kosten können je nach Region, Anbieter und Projektumfang abweichen. Für verbindliche Kalkulationen empfehlen wir, Angebote von Fachbetrieben einzuholen.";

  return (
    <div className="mt-6 px-5 py-4 bg-stone-100 rounded-xl text-sm text-stone-600">
      <p><strong className="text-stone-700">Hinweis:</strong> {text || defaultText}</p>
    </div>
  );
}

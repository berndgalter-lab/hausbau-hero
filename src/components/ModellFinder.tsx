"use client";

import { useMemo, useState } from "react";
import { KATEGORIE_NAME, type ArmaturDaten } from "@/lib/armatur-daten";

// Entscheidungshilfe im Ratgeber: wenige Fragen, darunter die Modelle des Beitrags, die passen.
// Die Fragen ergeben sich aus produkte.technische_daten. Eine Frage erscheint nur, wenn sich die
// Modelle darin unterscheiden. Fehlt bei einem Modell die Angabe zu einer gewählten Frage, steht es
// getrennt darunter („dazu nennt der Hersteller nichts“), statt als passend zu gelten.

export interface FinderModell {
  id: string;
  anker: string;
  name: string;
  einsatzbereich: string | null;
  daten: ArmaturDaten;
}

type Frage = {
  key: string;
  label: string;
  antwort: (d: ArmaturDaten) => string | null;
};

/** Ab dieser Auslaufhöhe zählt eine Waschtischarmatur als hoch genug für Aufsatzbecken. */
const AUFSATZ_AB_MM = 180;

const FRAGEN: Frage[] = [
  { key: "kategorie", label: "Wofür?", antwort: (d) => (d.kategorie ? KATEGORIE_NAME[d.kategorie] : null) },
  { key: "bauart", label: "Regelung", antwort: (d) => d.bauart ?? null },
  {
    key: "becken",
    label: "Becken",
    antwort: (d) =>
      d.kategorie !== "waschtisch" || typeof d.auslaufhoehe_mm !== "number"
        ? null
        : d.auslaufhoehe_mm >= AUFSATZ_AB_MM
          ? "Aufsatzbecken"
          : "Einbaubecken",
  },
  {
    key: "brause",
    label: "Brause",
    antwort: (d) => {
      const b = (d.brause ?? "").toLowerCase();
      if (!b) return null;
      if (b === "nein") return "ohne Brause";
      if (b.includes("auslauf")) return "Auslauf ausziehbar";
      return "echte Brause mit Schlauch";
    },
  },
  {
    key: "ablauf",
    label: "Ablauf",
    antwort: (d) => {
      const a = (d.ablauf ?? "").toLowerCase();
      if (!a) return null;
      if (a.includes("zug")) return "Zugstange";
      if (a.includes("push") || a.includes("pop")) return "Push-Open";
      if (a.includes("ohne")) return "ohne Garnitur";
      return null;
    },
  },
];

function ModellListe({ liste }: { liste: FinderModell[] }) {
  return (
    <ul className="space-y-1.5">
      {liste.map((m) => (
        <li key={m.id} className="text-sm">
          <a href={`#${m.anker}`} className="font-medium text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">{m.name}</a>
          {m.einsatzbereich && <span className="text-stone-500"> · {m.einsatzbereich}</span>}
        </li>
      ))}
    </ul>
  );
}

export default function ModellFinder({ modelle }: { modelle: FinderModell[] }) {
  const fragen = useMemo(
    () =>
      FRAGEN.map((f) => ({
        ...f,
        optionen: Array.from(new Set(modelle.map((m) => f.antwort(m.daten)).filter((x): x is string => !!x))).sort(),
      })).filter((f) => f.optionen.length >= 2),
    [modelle],
  );
  const [wahl, setWahl] = useState<Record<string, string>>({});

  if (fragen.length === 0) return null;

  const gewaehlt = fragen.filter((f) => wahl[f.key]);
  const widerspricht = (m: FinderModell) =>
    gewaehlt.some((f) => {
      const wert = f.antwort(m.daten);
      return wert !== null && wert !== wahl[f.key];
    });
  const ohneAngabe = (m: FinderModell) => gewaehlt.some((f) => f.antwort(m.daten) === null);
  const passend = modelle.filter((m) => !widerspricht(m) && !ohneAngabe(m));
  const unklar = modelle.filter((m) => !widerspricht(m) && ohneAngabe(m));

  return (
    <section className="bg-white rounded-2xl ring-1 ring-stone-900/[0.07] p-5 mb-10">
      <h2 className="text-xl font-semibold leading-tight text-stone-900">Welches Modell passt?</h2>
      <p className="text-sm text-stone-500 mb-4">Wähle aus, was auf dich zutrifft. Die Liste darunter passt sich an.</p>
      <div className="space-y-3">
        {fragen.map((f) => (
          <div key={f.key} className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-stone-500 w-20">{f.label}</span>
            {["", ...f.optionen].map((o) => {
              const aktiv = (wahl[f.key] ?? "") === o;
              return (
                <button key={o || "egal"} type="button" aria-pressed={aktiv}
                  onClick={() => setWahl((w) => ({ ...w, [f.key]: o }))}
                  className={`text-sm px-3 py-1 rounded-full border transition-colors ${
                    aktiv ? "bg-accent-700 border-accent-700 text-white" : "bg-white border-stone-300 text-stone-700 hover:border-stone-500"
                  }`}>
                  {o || "egal"}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-stone-100">
        {passend.length === 0 && unklar.length === 0 ? (
          <p className="text-sm text-stone-600">
            Keines der Modelle hier passt dazu. Mehr Armaturen mit allen Maßen stehen in den{" "}
            <a href="/vergleich/armaturen" className="text-accent-700 underline decoration-accent-300 underline-offset-2 hover:decoration-accent-600">Armaturen-Datenblättern</a>.
          </p>
        ) : (
          <>
            <p className="text-sm text-stone-500 mb-2">
              {passend.length === 0
                ? "Kein Modell passt sicher."
                : passend.length === modelle.length ? `Alle ${modelle.length} Modelle:` : `${passend.length} von ${modelle.length} Modellen:`}
            </p>
            <ModellListe liste={passend} />
            {unklar.length > 0 && (
              <>
                <p className="text-sm text-stone-500 mt-4 mb-2">Dazu nennt der Hersteller nichts, selbst nachmessen oder nachfragen:</p>
                <ModellListe liste={unklar} />
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

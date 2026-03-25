const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const ROHBAU_SILO = "6ad30c3c-8528-4f7b-876e-d1d75026986d";
const FINANZEN_SILO = "ab208c4b-00d6-4ce2-83f4-496eb9f24515";

// ─── ARTIKEL 1: ESTRICH KOSTEN ───────────────────────────────

const estrichContent = `<p>Estrich ist die unsichtbare Grundlage jedes Fußbodens — und einer der teuersten Posten im Innenausbau. Was viele unterschätzen: Die <strong>Trocknungszeit</strong> bestimmt den gesamten Bauablauf. Ein falsch gewählter Estrich kann den Einzug um Wochen verzögern. Hier erfährst du, welcher Estrich für dein Projekt passt und was er kostet.</p>

<p>→ <a href="/rechner/estrich"><strong>Berechne deinen Estrich-Bedarf → Estrich-Rechner</strong></a></p>

<h2>Was kostet Estrich pro m²?</h2>

<table>
<thead>
<tr><th>Estrichart</th><th>Material</th><th>Mit Einbau</th><th>Trocknungszeit</th></tr>
</thead>
<tbody>
<tr><td>Zementestrich (CT)</td><td>3–8 €/m²</td><td>15–25 €/m²</td><td>Ca. 1 Tag/mm bis 40 mm, darüber 2 Tage/mm</td></tr>
<tr><td>Calciumsulfat-Fließestrich (CAF)</td><td>8–15 €/m²</td><td>20–35 €/m²</td><td>Ca. 1 Tag/mm (schneller)</td></tr>
<tr><td>Trockenestrich</td><td>15–25 €/m²</td><td>25–45 €/m²</td><td>Sofort begehbar</td></tr>
<tr><td>Gussasphaltestrich</td><td>20–35 €/m²</td><td>40–70 €/m²</td><td>Sofort begehbar</td></tr>
</tbody>
</table>

<p><strong>Kostenbeispiel:</strong> 80 m² Wohnfläche, Zementestrich 50 mm mit Fußbodenheizung: Material ca. 800 €, mit Estrichleger ca. 2.000–2.400 €.</p>

<h2>Welcher Estrich für welchen Einsatz?</h2>

<h3>Zementestrich — der Standard</h3>
<p>Günstig, robust, universell. Der mit Abstand häufigste Estrich in Deutschland. Nachteil: <strong>Lange Trocknungszeit</strong>. Bei 50 mm Dicke rechne mit ca. 7–8 Wochen bis zur Belegreife. Das verzögert Fliesen, Parkett und Laminat.</p>

<h3>Calciumsulfat-Fließestrich — ideal für Fußbodenheizung</h3>
<p>Wird flüssig aufgetragen und verteilt sich selbst. Besonders dünn möglich (30–35 mm) und leitet Wärme besser als Zementestrich. <strong>Ideal für Fußbodenheizung.</strong> Nachteil: Nicht für Nassräume (Bad, Dusche) ohne zusätzliche Abdichtung.</p>

<h3>Trockenestrich — ohne Wartezeit</h3>
<p>Vorgefertigte Platten (z.B. Knauf Brio) die verlegt werden. <strong>Sofort begehbar, kein Wasser, kein Trocknen.</strong> Ideal für Renovierungen und Dachausbau. Nachteil: Teurer, geringere Belastbarkeit, nicht für Fußbodenheizung geeignet.</p>

<h2>Trocknungszeit — der Zeitfresser</h2>

<p>Die Faustregel für Zementestrich:</p>
<ul>
<li><strong>Bis 40 mm:</strong> 1 Tag Trocknungszeit pro mm Dicke</li>
<li><strong>Über 40 mm:</strong> 2 Tage pro mm für jeden zusätzlichen mm</li>
<li><strong>50 mm Zementestrich:</strong> 40 + (10 × 2) = <strong>60 Tage</strong></li>
</ul>

<p>Fließestrich trocknet ca. 30 % schneller. Trockenestrich hat keine Trocknungszeit.</p>

<p>→ <a href="/rechner/estrich"><strong>Berechne die Trocknungszeit für deinen Estrich → Estrich-Rechner</strong></a></p>
<p>→ <a href="/rechner/gewerk-reihenfolge">Wann kommt der Estrich im Bauablauf? → Gewerk-Reihenfolge</a></p>

<h2>Estrich und Fußbodenheizung</h2>

<p>Bei Fußbodenheizung empfehlen wir <strong>Calciumsulfat-Fließestrich</strong>:</p>
<ul>
<li>Bessere Wärmeleitfähigkeit als Zementestrich</li>
<li>Dünnere Aufbauhöhe möglich (weniger Aufheizenergie)</li>
<li>Fließt komplett um die Heizrohre — keine Lufteinschlüsse</li>
</ul>

<p><strong>Wichtig:</strong> Nach dem Einbau muss der Estrich ein <strong>Aufheizprotokoll</strong> durchlaufen (langsames Aufheizen über ca. 2 Wochen). Erst danach darf der Bodenbelag verlegt werden.</p>

<h2>Selber machen?</h2>

<p><strong>Zementestrich:</strong> Grundsätzlich als DIY möglich — aber aufwändig. Du brauchst eine Estrichpumpe (mieten: ca. 150–300 €/Tag) und musst die Mischung in einem Rutsch einbringen. Fehler (ungleichmäßige Dicke, Risse) sind kaum korrigierbar.</p>

<p><strong>Fließestrich:</strong> Nicht als DIY machbar. Der Estrich wird mit einem Spezialfahrzeug angeliefert und per Schlauch eingebracht.</p>

<p><strong>Trockenestrich:</strong> Hervorragend als DIY. Platten zuschneiden, verkleben, fertig. Vergleichbar mit Laminat verlegen.</p>

<p>→ <a href="/rechner/eigenleistung">Was sparst du durch Eigenleistung? → Eigenleistungs-Rechner</a></p>
<p>→ <a href="/finanzen/handwerkerkosten-guide">Was kostet ein Estrichleger? →</a></p>

<h2>Häufige Fragen</h2>

<h3>Was kostet Estrich für 100 m²?</h3>
<p>Zementestrich: ca. 1.500–2.500 € (mit Einbau). Fließestrich: ca. 2.000–3.500 €. Trockenestrich: ca. 2.500–4.500 €.</p>

<h3>Wie lange muss Estrich trocknen?</h3>
<p>Zementestrich 50 mm: ca. 60 Tage. Fließestrich: ca. 40 Tage. Trockenestrich: 0 Tage (sofort belegbar). → <a href="/rechner/estrich">Genaue Trocknungszeit berechnen</a></p>

<h3>Welcher Estrich bei Fußbodenheizung?</h3>
<p>Calciumsulfat-Fließestrich ist die beste Wahl — dünn, gute Wärmeleitung, fließt um die Rohre. Zementestrich funktioniert auch, ist aber dicker und leitet schlechter.</p>

<h3>Kann ich auf alten Estrich neuen Estrich gießen?</h3>
<p>Ja, aber nur wenn der alte Estrich tragfähig und trocken ist. Haftbrücke verwenden. Ausgleichsmasse ist oft die einfachere Alternative bei unebenen Böden.</p>`;

// ─── ARTIKEL 2: EIGENLEISTUNG HAUSBAU ────────────────────────

const eigenleistungContent = `<p>Eigenleistung — auch "Muskelhypothek" genannt — ist der schnellste Weg, beim Hausbau Geld zu sparen. Aber wie viel spart man <strong>realistisch</strong>? Welche Arbeiten kann ein Laie wirklich selbst machen? Und was erkennt die Bank an? Hier ist der ehrliche Guide.</p>

<p>→ <a href="/rechner/eigenleistung"><strong>Berechne dein Sparpotenzial → Eigenleistungs-Rechner</strong></a></p>

<h2>Wie viel kann man durch Eigenleistung sparen?</h2>

<p>Realistisch: <strong>10.000–30.000 €</strong> bei einem typischen Einfamilienhaus. Das sind ca. 5–10 % der Bausumme. Manche Ratgeber versprechen 50.000 €+ — das ist unrealistisch und gefährlich, weil man sich schnell überschätzt.</p>

<table>
<thead>
<tr><th>Gewerk</th><th>Schwierigkeit</th><th>Ersparnis pro m²</th><th>Realistisch für Laien?</th></tr>
</thead>
<tbody>
<tr><td>Malerarbeiten</td><td>⭐ Einfach</td><td>8–15 €/m²</td><td>Ja — beste Eigenleistung</td></tr>
<tr><td>Laminat/Vinyl verlegen</td><td>⭐ Einfach</td><td>10–20 €/m²</td><td>Ja — Klick-System, 1 Tag/Raum</td></tr>
<tr><td>Tapezieren</td><td>⭐⭐ Mittel</td><td>5–12 €/m²</td><td>Ja, mit Übung</td></tr>
<tr><td>Trockenbau</td><td>⭐⭐ Mittel</td><td>30–50 €/m²</td><td>Ja — <a href="/rohbau/trockenbau-kosten">Trockenbau-Guide</a></td></tr>
<tr><td>Garten/Außenanlagen</td><td>⭐⭐ Mittel</td><td>20–40 €/m²</td><td>Ja — körperlich anstrengend</td></tr>
<tr><td>Fliesen verlegen</td><td>⭐⭐⭐ Schwer</td><td>30–50 €/m²</td><td>Bedingt — Fehler sichtbar</td></tr>
<tr><td>Dämmung (Zwischensparren)</td><td>⭐⭐ Mittel</td><td>25–45 €/m²</td><td>Ja, Dampfbremse kritisch — <a href="/rohbau/daemmung-kosten">Dämmung-Guide</a></td></tr>
<tr><td>Elektro</td><td>🚫</td><td>—</td><td><strong>Nein — Abnahme durch Fachbetrieb Pflicht</strong></td></tr>
<tr><td>Sanitär/Gas</td><td>🚫</td><td>—</td><td><strong>Nein — Versicherung erlischt</strong></td></tr>
<tr><td>Statik/Rohbau</td><td>🚫</td><td>—</td><td><strong>Nein — Lebensgefahr</strong></td></tr>
</tbody>
</table>

<h2>Die 5 besten Eigenleistungen</h2>

<h3>1. Malerarbeiten — Ersparnis: 2.000–5.000 €</h3>
<p>Wände und Decken streichen ist die einfachste und lohnendste Eigenleistung. Jeder kann es, das Material ist billig, und Fehler lassen sich korrigieren.</p>
<p>→ <a href="/rechner/wandfarbe">Farbbedarf berechnen → Wandfarbe-Rechner</a></p>

<h3>2. Boden verlegen — Ersparnis: 1.500–4.000 €</h3>
<p>Klick-Laminat und Klick-Vinyl sind so einfach, dass man sie an einem Wochenende pro Raum schafft. Parkett ist anspruchsvoller.</p>
<p>→ <a href="/boden/laminat-verlegen-kosten">Laminat-Kosten-Guide</a> · <a href="/rechner/laminat">Laminat-Rechner</a></p>

<h3>3. Trockenbau — Ersparnis: 3.000–8.000 €</h3>
<p>Innenwände, Dachschrägen, abgehängte Decken — alles machbar mit Grundwerkzeug. Die höchste Ersparnis pro Zeitstunde aller Eigenleistungen.</p>
<p>→ <a href="/rohbau/trockenbau-kosten">Trockenbau-Kosten-Guide</a> · <a href="/rechner/trockenbau">Trockenbau-Rechner</a></p>

<h3>4. Garten und Außenanlagen — Ersparnis: 2.000–6.000 €</h3>
<p>Terrasse pflastern, Zaun setzen, Rasen anlegen, Beete anlegen. Körperlich anstrengend, aber keine Fachkenntnisse nötig.</p>
<p>→ <a href="/rechner/terrasse">Terrassen-Rechner</a></p>

<h3>5. Abriss und Entsorgung — Ersparnis: 1.000–3.000 €</h3>
<p>Alte Tapeten abreißen, Böden rausreißen, Bauschutt entsorgen. Keine Fachkenntnisse, nur Muskelkraft und einen Container.</p>

<h2>Eigenleistung bei der Baufinanzierung</h2>

<p>Banken erkennen Eigenleistung als <strong>Eigenkapital-Ersatz</strong> an — aber mit Einschränkungen:</p>

<ul>
<li><strong>Maximale Anerkennung:</strong> 10–15 % der Bausumme (ca. 30.000–50.000 €)</li>
<li><strong>Bewertung pro Stunde:</strong> 15–30 €/h (nicht dein tatsächliches Gehalt)</li>
<li><strong>Nachweis erforderlich:</strong> Aufstellung welche Gewerke, geschätzte Stunden, Fachkenntnisse</li>
<li><strong>Realismus:</strong> Banken kürzen unrealistische Angaben. 50 Stunden Malen ist glaubwürdig, 500 Stunden Rohbau als Büroangestellter nicht.</li>
</ul>

<p>→ <a href="/rechner/eigenleistung"><strong>Berechne was die Bank anerkennt → Eigenleistungs-Rechner</strong></a></p>

<h2>Finger weg! Was du NICHT selber machen solltest</h2>

<p><strong>Elektroinstallation:</strong> Muss nach VDE-Normen von einem eingetragenen Fachbetrieb abgenommen werden. Eigenleistung ist zwar erlaubt, aber ohne Abnahme keine Versicherung. Kurzschlüsse = Brandgefahr.</p>

<p><strong>Gas- und Wasseranschlüsse:</strong> Dürfen nur von zugelassenen Installateuren ausgeführt werden. Wer hier pfuscht, riskiert Wasserschäden und Gas-Unfälle.</p>

<p><strong>Tragende Konstruktionen:</strong> Wände einreißen, Stützen versetzen, Dachstuhl — alles was die Statik betrifft, gehört in Profihände.</p>

<p><strong>Dacheindeckung:</strong> Sturzgefahr. Dachdecker haben Sicherungsausrüstung und Erfahrung auf schrägen Flächen.</p>

<h2>Zeitaufwand realistisch einschätzen</h2>

<p>Die größte Falle: Den Zeitaufwand unterschätzen. Eigenleistung kostet kein Geld, aber <strong>massiv Zeit</strong>. Und wer berufstätig ist, hat nur Abende und Wochenenden.</p>

<table>
<thead>
<tr><th>Gewerk</th><th>Zeitaufwand (100 m² Haus)</th><th>Dauer bei 20h/Woche</th></tr>
</thead>
<tbody>
<tr><td>Malerarbeiten</td><td>40–60 Stunden</td><td>2–3 Wochen</td></tr>
<tr><td>Boden verlegen</td><td>30–50 Stunden</td><td>2 Wochen</td></tr>
<tr><td>Trockenbau (Dachausbau)</td><td>80–120 Stunden</td><td>4–6 Wochen</td></tr>
<tr><td>Garten komplett</td><td>60–100 Stunden</td><td>3–5 Wochen</td></tr>
</tbody>
</table>

<p>→ <a href="/finanzen/handwerkerkosten-guide">Was kostet ein Handwerker pro Stunde? →</a></p>

<h2>Häufige Fragen</h2>

<h3>Wie viel spart man realistisch durch Eigenleistung?</h3>
<p>10.000–30.000 € bei einem typischen Einfamilienhaus. Die größten Einsparungen: Trockenbau, Malerarbeiten, Boden verlegen, Garten.</p>

<h3>Was erkennt die Bank als Eigenleistung an?</h3>
<p>Typischerweise 10–15 % der Bausumme, bewertet mit 15–30 €/Stunde. Nur handwerkliche Tätigkeiten zählen — nicht Baustellenreinigung oder "Organisieren".</p>

<h3>Lohnt sich Eigenleistung bei der Renovierung?</h3>
<p>Absolut — bei Renovierungen sind die Handwerkerkosten prozentual noch höher als beim Neubau. Malerarbeiten, Boden und Trockenbau sind die Klassiker. → <a href="/rechner/eigenleistung">Eigenleistungs-Rechner</a></p>

<h3>Was passiert wenn ich bei der Eigenleistung Fehler mache?</h3>
<p>Sichtbare Fehler (schiefe Fliesen, wellige Wände) mindern den Immobilienwert. Versteckte Fehler (undichte Dampfbremse, schlechte Elektrik) verursachen Folgeschäden. Grundregel: Lieber weniger machen, aber richtig.</p>`;

async function run() {
  console.log("=== ESTRICH KOSTEN (INSERT) ===");
  const r1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: ROHBAU_SILO,
      slug: "estrich-kosten",
      titel: "Estrich verlegen Kosten 2026 — Zement, Fließ, Trockenestrich",
      seo_title: "Estrich Kosten 2026: Alle Arten im Vergleich (pro m²)",
      seo_description: "Estrich verlegen Kosten 2026: Zementestrich 15–25 €/m², Fließestrich 20–35 €/m², Trockenestrich 25–45 €/m². Trocknungszeiten und Tipps.",
      typ: "artikel",
      content_md: estrichContent,
      status: "aktiv",
    }),
  });
  const d1 = await r1.json();
  console.log(r1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  console.log("\n=== EIGENLEISTUNG HAUSBAU (INSERT) ===");
  const r2 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: FINANZEN_SILO,
      slug: "eigenleistung-hausbau",
      titel: "Eigenleistung beim Hausbau — was lohnt sich wirklich? (2026)",
      seo_title: "Eigenleistung Hausbau: Was lohnt sich? Sparpotenzial & Risiken",
      seo_description: "Eigenleistung beim Hausbau: 10.000–30.000 € Sparpotenzial. Welche Gewerke du selber machen kannst, was die Bank anerkennt, und wo es gefährlich wird.",
      typ: "artikel",
      content_md: eigenleistungContent,
      status: "aktiv",
    }),
  });
  const d2 = await r2.json();
  console.log(r2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));
}

run();

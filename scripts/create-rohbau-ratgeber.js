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

// ─── ARTIKEL 1: TROCKENBAU KOSTEN ────────────────────────────

const trockenbauContent = `<p>Trockenbau ist eine der beliebtesten Methoden im Innenausbau — und eine der besten Eigenleistungen für Bauherren. Ob Raumteiler, abgehängte Decke oder Dachschrägenverkleidung: Rigipswände sind schnell aufgebaut und vergleichsweise günstig. In diesem Guide erfährst du, was Trockenbau pro m² kostet, welches Material du brauchst, und ob du es selber machen kannst.</p>

<p>→ <a href="/rechner/trockenbau"><strong>Berechne deinen Materialbedarf → Trockenbau-Rechner</strong></a></p>

<h2>Was kostet Trockenbau pro m²?</h2>

<p>Die Kosten hängen davon ab, ob du selber Hand anlegst oder einen Handwerker beauftragst:</p>

<table>
<thead>
<tr><th>Kostenart</th><th>Preis pro m²</th><th>Erklärung</th></tr>
</thead>
<tbody>
<tr><td>Material (einfache Trennwand)</td><td>15–25 €/m²</td><td>CW/UW-Profile, 12,5 mm Gipskarton, Schrauben, Spachtel, Band</td></tr>
<tr><td>Material (Doppelbeplankung)</td><td>22–35 €/m²</td><td>Wie oben, aber 2× Gipskartonplatten pro Seite</td></tr>
<tr><td>Material (Feuchtraum)</td><td>25–40 €/m²</td><td>Imprägnierte Platten (grün), Feuchteschutz</td></tr>
<tr><td>Handwerker (nur Arbeit)</td><td>30–60 €/m²</td><td>Aufbau, Spachteln, Schleifen — ohne Material</td></tr>
<tr><td><strong>Gesamt mit Handwerker</strong></td><td><strong>50–85 €/m²</strong></td><td>Material + Arbeit</td></tr>
</tbody>
</table>

<h2>Kostenbeispiele aus der Praxis</h2>

<table>
<thead>
<tr><th>Projekt</th><th>Fläche</th><th>Material</th><th>Mit Handwerker</th></tr>
</thead>
<tbody>
<tr><td>Raumteiler (3 × 2,5 m)</td><td>7,5 m²</td><td>ca. 150 €</td><td>ca. 500 €</td></tr>
<tr><td>Abgehängte Decke (20 m²)</td><td>20 m²</td><td>ca. 450 €</td><td>ca. 1.400 €</td></tr>
<tr><td>Dachschräge verkleiden (30 m²)</td><td>30 m²</td><td>ca. 700 €</td><td>ca. 2.200 €</td></tr>
<tr><td>Kompletter Dachausbau (80 m²)</td><td>80 m²</td><td>ca. 1.800 €</td><td>ca. 5.500 €</td></tr>
</tbody>
</table>

<h2>Welches Material brauchst du?</h2>

<p>Für eine einfache Trennwand (einfach beplankt, ohne Dämmung):</p>

<ul>
<li><strong>UW-Profile</strong> (Boden + Decke) — ca. 2 lfm pro m Wandlänge</li>
<li><strong>CW-Profile</strong> (senkrechte Ständer) — alle 62,5 cm</li>
<li><strong>Gipskartonplatten 12,5 mm</strong> — 2 × Wandfläche (beidseitig)</li>
<li><strong>Schnellbauschrauben</strong> — ca. 15 Stück pro m²</li>
<li><strong>Fugenspachtel + Bewehrungsstreifen</strong></li>
</ul>

<p>→ <a href="/rechner/trockenbau"><strong>Genaue Mengen berechnen → Trockenbau-Rechner</strong></a></p>

<h2>Trockenbau selber machen — realistisch?</h2>

<p><strong>Ja — Trockenbau ist eine der einfachsten Eigenleistungen im Hausbau.</strong> Du brauchst kein Spezialwerkzeug, keine Genehmigung und keine Fachausbildung. Die Lernkurve ist flach: Nach der ersten Wand geht es deutlich schneller.</p>

<p><strong>Was du brauchst:</strong> Akkuschrauber, Cuttermesser, Wasserwaage, Richtscheit, Spachtel. Kein Spezialwerkzeug.</p>

<p><strong>Zeitaufwand:</strong> Für eine einfache Trennwand (3 × 2,5 m) rechne mit 4–6 Stunden als Anfänger. Profis schaffen das in 2 Stunden.</p>

<p><strong>Wo es schwierig wird:</strong> Sauber spachteln und schleifen. Die Übergänge zwischen den Platten müssen plan sein, sonst sieht man sie nach dem Streichen. Hier lohnt sich Übung oder ein Profi für den Feinschliff.</p>

<p>→ <a href="/finanzen/handwerkerkosten-guide">Was kostet ein Trockenbauer pro Stunde? →</a></p>
<p>→ <a href="/rechner/eigenleistung">Wie viel sparst du durch Eigenleistung? → Eigenleistungs-Rechner</a></p>

<h2>Schallschutz und Dämmung</h2>

<p>Eine einfache Rigipswand bietet <strong>kaum Schallschutz</strong> (ca. 35 dB). Für bessere Werte:</p>

<ul>
<li><strong>Mineralwolle zwischen den Profilen</strong> — erhöht auf ca. 45 dB (+10 €/m²)</li>
<li><strong>Doppelbeplankung</strong> (2× Gipskarton pro Seite) — erhöht auf ca. 50 dB (+8 €/m²)</li>
<li><strong>Entkoppelte Ständer</strong> (CW-Profile nicht direkt verbunden) — bis 55 dB</li>
</ul>

<p>→ <a href="/rechner/daemmung">Dämmung berechnen → Dämmung-Rechner</a></p>

<h2>Unsere Material-Empfehlungen</h2>

<p>Für die meisten Projekte empfehlen wir:</p>

<ul>
<li><strong>Gipskartonplatten:</strong> Knauf Diamant oder Rigips Habito (robuster als Standard-Platten) — <a href="https://www.amazon.de/s?k=gipskartonplatten+12%2C5mm&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
<li><strong>Profile:</strong> Standard CW75/UW75 reichen für die meisten Trennwände — <a href="https://www.amazon.de/s?k=trockenbau+profile+cw+uw&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
<li><strong>Spachtelmasse:</strong> Knauf Uniflott ist der Klassiker — <a href="https://www.amazon.de/s?k=knauf+uniflott&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
</ul>

<h2>Häufige Fragen</h2>

<h3>Was kostet eine Rigipswand pro m²?</h3>
<p>Material für eine einfache Trennwand kostet 15–25 €/m². Mit Handwerker rechne mit 50–85 €/m² je nach Region und Komplexität.</p>

<h3>Wie lange dauert es eine Trockenbauwand zu bauen?</h3>
<p>Eine einfache Trennwand (3 × 2,5 m) dauert als Anfänger ca. 4–6 Stunden. Dazu kommt 1 Tag Trocknungszeit für den Spachtel, dann Schleifen und Streichen.</p>

<h3>Kann man in Rigipswände Regale hängen?</h3>
<p>Standard-Gipskarton trägt ca. 15 kg pro Befestigungspunkt mit Hohlraumdübeln. Für schwere Lasten (Hängeschränke, TV) nutze Hartgipsplatten (Knauf Diamant) oder befestige direkt an den Ständerprofilen — die tragen deutlich mehr.</p>

<h3>Brauche ich für Trockenbau eine Genehmigung?</h3>
<p>Für nicht-tragende Trennwände in Bestandsgebäuden: <strong>Nein</strong>. Für Neubauten ist Trockenbau im Bauantrag enthalten. → <a href="/rechner/baugenehmigung">Baugenehmigung-Check</a></p>

<h3>Trockenbau oder Mauerwerk — was ist besser?</h3>
<p>Trockenbau ist schneller, günstiger und flexibler (leicht rückbaubar). Mauerwerk bietet besseren Schallschutz und höhere Lasten. Für Innenwände im Wohnbau ist Trockenbau in 90 % der Fälle die bessere Wahl.</p>`;

// ─── ARTIKEL 2: DACHDÄMMUNG KOSTEN ───────────────────────────

const daemmungContent = `<p>Eine gute Dachdämmung spart bis zu 30 % Heizkosten und wird vom Staat mit bis zu 20 % bezuschusst. Aber welche Methode ist die richtige — und was kostet es wirklich? In diesem Guide vergleichen wir alle Dämmvarianten mit aktuellen Preisen, erklären den U-Wert, und zeigen dir, welche Förderung du 2026 bekommst.</p>

<p>→ <a href="/rechner/daemmung"><strong>Berechne deine Dämmstärke und Kosten → Dämmung-Rechner</strong></a></p>

<h2>Was kostet Dachdämmung pro m²?</h2>

<table>
<thead>
<tr><th>Methode</th><th>Material</th><th>Mit Handwerker</th><th>Bester Einsatz</th></tr>
</thead>
<tbody>
<tr><td>Zwischensparrendämmung</td><td>15–35 €/m²</td><td>40–80 €/m²</td><td>Dachausbau, bewohntes Dach</td></tr>
<tr><td>Aufsparrendämmung</td><td>60–120 €/m²</td><td>150–250 €/m²</td><td>Neueindeckung, Komplettsanierung</td></tr>
<tr><td>Untersparrendämmung</td><td>10–20 €/m²</td><td>30–60 €/m²</td><td>Zusätzlich zur Zwischensparren</td></tr>
<tr><td>Einblasdämmung</td><td>—</td><td>20–50 €/m²</td><td>Hohlräume nachträglich füllen</td></tr>
<tr><td>Geschossdeckendämmung</td><td>15–30 €/m²</td><td>30–60 €/m²</td><td>Unbewohnter Dachboden</td></tr>
</tbody>
</table>

<p><strong>Kostenbeispiel:</strong> Dachfläche 120 m², Zwischensparrendämmung mit Mineralwolle: Material ca. 3.600 €, mit Handwerker ca. 7.200–9.600 €. Nach KfW/BAFA-Zuschuss (20 %): <strong>5.760–7.680 €.</strong></p>

<h2>Welche Methode ist die richtige?</h2>

<h3>Zwischensparrendämmung</h3>
<p>Die <strong>häufigste Methode</strong>. Dämmstoff (Mineralwolle oder Holzfaser) wird zwischen die Sparren geklemmt. Danach kommt eine Dampfbremse und die Innenverkleidung (Rigips oder Holz).</p>
<p><strong>Vorteile:</strong> Günstig, als Eigenleistung machbar, kein Eingriff in die Dacheindeckung.</p>
<p><strong>Nachteile:</strong> Sparrentiefe begrenzt die Dämmdicke (typisch 16–20 cm). Oft reicht das nicht für den GEG-Grenzwert.</p>
<p><strong>DIY-Schwierigkeit:</strong> Mittel. Dampfbremse muss sauber verklebt sein — Fehler führen zu Schimmel.</p>

<h3>Aufsparrendämmung</h3>
<p>Dämmplatten werden <strong>auf die Sparren</strong> gelegt, darüber kommt die neue Dacheindeckung. Die beste thermische Qualität, weil keine Wärmebrücken an den Sparren entstehen.</p>
<p><strong>Vorteile:</strong> Beste Dämmwirkung, kein Raumverlust innen, keine Dampfbremse nötig.</p>
<p><strong>Nachteile:</strong> Teuer, nur sinnvoll wenn das Dach sowieso neu eingedeckt wird.</p>
<p><strong>DIY-Schwierigkeit:</strong> Hoch. Dachdeckerarbeit — nicht für Laien.</p>

<h3>Einblasdämmung</h3>
<p>Loser Dämmstoff (Zellulose, Mineralwolle-Flocken) wird in bestehende Hohlräume eingeblasen. Ideal für <strong>nachträgliche Dämmung</strong> ohne Innenausbau aufzureißen.</p>
<p><strong>Vorteile:</strong> Schnell (1 Tag für ein Einfamilienhaus), günstig, kein Dreck.</p>
<p><strong>Nachteile:</strong> Nur möglich wenn Hohlräume vorhanden sind, nicht als Eigenleistung machbar.</p>

<h2>U-Wert verstehen — was fordert das GEG?</h2>

<p>Das <strong>Gebäudeenergiegesetz (GEG)</strong> fordert für die Dachdämmung bei Sanierungen einen U-Wert von maximal <strong>0,24 W/(m²K)</strong>. Das bedeutet:</p>

<table>
<thead>
<tr><th>Dämmmaterial</th><th>Wärmeleitfähigkeit (λ)</th><th>Nötige Dicke für U=0,24</th></tr>
</thead>
<tbody>
<tr><td>Mineralwolle (WLG 035)</td><td>0,035 W/mK</td><td>ca. 14 cm</td></tr>
<tr><td>Holzfaser (WLG 040)</td><td>0,040 W/mK</td><td>ca. 16 cm</td></tr>
<tr><td>PUR/PIR (WLG 024)</td><td>0,024 W/mK</td><td>ca. 10 cm</td></tr>
<tr><td>EPS/Styropor (WLG 032)</td><td>0,032 W/mK</td><td>ca. 13 cm</td></tr>
</tbody>
</table>

<p>→ <a href="/rechner/daemmung"><strong>Berechne den U-Wert für deine Dämmung → Dämmung-Rechner</strong></a></p>

<h2>Förderung für Dachdämmung 2026</h2>

<p>Dachdämmung wird vom Staat gefördert — wenn du den U-Wert von 0,24 W/(m²K) erreichst (bei KfW sogar besser):</p>

<ul>
<li><strong>BAFA Einzelmaßnahme:</strong> 15 % Zuschuss auf die Gesamtkosten (Antrag VOR Baubeginn!)</li>
<li><strong>+5 % Bonus</strong> mit individuellem Sanierungsfahrplan (iSFP)</li>
<li><strong>Alternativ § 35c EStG:</strong> 20 % der Kosten über 3 Jahre von der Steuer absetzen (max. 40.000 €)</li>
</ul>

<p>→ <a href="/finanzen/kfw-foerderung-2026"><strong>Alle Förderprogramme im Überblick →</strong></a></p>
<p>→ <a href="/rechner/foerdermittel"><strong>Finde passende Förderungen → Fördermittel-Finder</strong></a></p>

<h2>Material-Vergleich</h2>

<table>
<thead>
<tr><th>Material</th><th>Preis/m²</th><th>λ-Wert</th><th>Brandschutz</th><th>Ökobilanz</th></tr>
</thead>
<tbody>
<tr><td>Mineralwolle</td><td>5–15 €</td><td>0,032–0,040</td><td>A1 (nicht brennbar)</td><td>Mittel</td></tr>
<tr><td>Holzfaser</td><td>15–35 €</td><td>0,038–0,045</td><td>B2 (normal entflammbar)</td><td>Sehr gut</td></tr>
<tr><td>PUR/PIR</td><td>15–30 €</td><td>0,022–0,028</td><td>B1–B2</td><td>Schlecht</td></tr>
<tr><td>Zellulose (Einblas)</td><td>—*</td><td>0,038–0,042</td><td>B2</td><td>Sehr gut</td></tr>
<tr><td>EPS (Styropor)</td><td>5–12 €</td><td>0,032–0,040</td><td>B1 (schwerentflammbar)</td><td>Schlecht</td></tr>
</tbody>
</table>
<p><small>* Zellulose wird eingeblasen — Preis inkl. Einbau: 20–50 €/m²</small></p>

<h2>Unsere Empfehlungen</h2>

<ul>
<li><strong>Mineralwolle 035:</strong> Isover Integra oder Knauf Insulation — Preis-Leistungs-Sieger — <a href="https://www.amazon.de/s?k=mineralwolle+d%C3%A4mmung+035&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
<li><strong>Holzfaser:</strong> Steico flex — ökologisch, guter sommerlicher Hitzeschutz — <a href="https://www.amazon.de/s?k=steico+flex+holzfaser&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
<li><strong>Dampfbremse:</strong> pro clima INTELLO PLUS — feuchteadaptiv, verzeiht Fehler — <a href="https://www.amazon.de/s?k=pro+clima+intello&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
</ul>

<h2>Häufige Fragen</h2>

<h3>Was kostet Dachdämmung für ein Einfamilienhaus?</h3>
<p>Bei 120 m² Dachfläche: Zwischensparren mit Mineralwolle ca. 7.000–10.000 € (mit Handwerker). Einblasdämmung ca. 2.500–6.000 €. Aufsparren bei Neueindeckung ca. 18.000–30.000 €.</p>

<h3>Welchen U-Wert muss mein Dach haben?</h3>
<p>Das GEG fordert bei Sanierung maximal 0,24 W/(m²K). Für KfW-Förderung sind oft bessere Werte nötig (0,14 W/m²K für Effizienzhaus 55). → <a href="/rechner/daemmung">Berechne deinen U-Wert</a></p>

<h3>Kann ich Dachdämmung selber machen?</h3>
<p>Zwischensparrendämmung: Ja, mit Sorgfalt bei der Dampfbremse. Aufsparren und Einblasdämmung: Nein, das sind Profi-Arbeiten. → <a href="/rechner/eigenleistung">Eigenleistungs-Rechner</a></p>

<h3>Dachdämmung von innen oder außen?</h3>
<p>Von innen (Zwischensparren) ist günstiger und als DIY machbar. Von außen (Aufsparren) ist thermisch besser, aber nur sinnvoll wenn das Dach sowieso neu gedeckt wird.</p>

<h3>Lohnt sich Dachdämmung finanziell?</h3>
<p>Ja. Eine typische Zwischensparrendämmung amortisiert sich durch Heizkosten-Ersparnis in 8–15 Jahren. Mit Förderung schneller. Und: Der Immobilienwert steigt durch bessere Energieeffizienzklasse.</p>`;

async function run() {
  console.log("=== TROCKENBAU KOSTEN (INSERT) ===");
  const r1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: ROHBAU_SILO,
      slug: "trockenbau-kosten",
      titel: "Trockenbau Kosten pro m² — Rigipswand einziehen (2026)",
      seo_title: "Trockenbau Kosten pro m² 2026: Material + Handwerker",
      seo_description: "Was kostet Trockenbau pro m²? Material 15–25 €/m², Handwerker 30–60 €/m². Kostenbeispiele für Trennwand, Decke, Dachschräge. Mit Trockenbau-Rechner.",
      typ: "artikel",
      content_md: trockenbauContent,
      status: "aktiv",
    }),
  });
  const d1 = await r1.json();
  console.log(r1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  console.log("\n=== DACHDÄMMUNG KOSTEN (INSERT) ===");
  const r2 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: ROHBAU_SILO,
      slug: "daemmung-kosten",
      titel: "Dachdämmung Kosten 2026 — Zwischensparren, Aufsparren, Einblas",
      seo_title: "Dachdämmung Kosten 2026: Alle Methoden im Vergleich",
      seo_description: "Dachdämmung Kosten 2026: Zwischensparren 40–80 €/m², Aufsparren 150–250 €/m², Einblasdämmung 20–50 €/m². Förderung, U-Wert, Material-Vergleich.",
      typ: "artikel",
      content_md: daemmungContent,
      status: "aktiv",
    }),
  });
  const d2 = await r2.json();
  console.log(r2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));
}

run();

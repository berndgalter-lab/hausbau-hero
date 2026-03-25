const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const FINANZEN_SILO = "ab208c4b-00d6-4ce2-83f4-496eb9f24515";

const content = `<p>Ein Haus zu bauen ist die größte Investition im Leben der meisten Menschen. Aber was kostet es <strong>wirklich</strong> — nicht nur der Rohbau, sondern alles zusammen? In diesem Guide rechnen wir es durch: Grundstück, Baukosten, Nebenkosten, Innenausbau, Außenanlagen und die Kosten, die gerne vergessen werden.</p>

<p><strong>Kurze Antwort:</strong> Ein durchschnittliches Einfamilienhaus (130 m², mittlere Ausstattung) kostet 2026 komplett <strong>450.000–600.000 €</strong> — inklusive Grundstück und allen Nebenkosten. Ohne Grundstück rechne mit 280.000–400.000 €.</p>

<p>→ <a href="/rechner/nebenkosten"><strong>Berechne deine Kaufnebenkosten →</strong></a><br/>
→ <a href="/rechner/handwerkerkosten"><strong>Berechne Handwerkerkosten nach Gewerk →</strong></a></p>

<h2>Hausbau Kosten im Überblick (2026)</h2>

<table>
<thead>
<tr><th>Kostenblock</th><th>Anteil</th><th>Bei 130 m² EFH</th></tr>
</thead>
<tbody>
<tr><td>Grundstück (Ø 600 m²)</td><td>25–35 %</td><td>100.000–250.000 €</td></tr>
<tr><td>Rohbau (Fundament, Wände, Dach)</td><td>25–30 %</td><td>120.000–170.000 €</td></tr>
<tr><td>Innenausbau (Estrich, Putz, Fliesen, Elektro, Sanitär)</td><td>20–25 %</td><td>80.000–130.000 €</td></tr>
<tr><td>Kaufnebenkosten (Grunderwerbsteuer, Notar, Makler)</td><td>10–15 %</td><td>40.000–75.000 €</td></tr>
<tr><td>Außenanlagen (Garten, Terrasse, Einfahrt)</td><td>5–10 %</td><td>20.000–50.000 €</td></tr>
<tr><td>Baunebenkosten (Planung, Genehmigung, Gutachter)</td><td>5–8 %</td><td>15.000–35.000 €</td></tr>
<tr><td><strong>Gesamt</strong></td><td><strong>100 %</strong></td><td><strong>450.000–600.000 €</strong></td></tr>
</tbody>
</table>

<h2>Grundstückskosten — der größte Hebel</h2>

<p>Die Grundstückspreise variieren in Deutschland extrem. Der bundesweite Durchschnitt liegt bei ca. <strong>240 €/m²</strong> — aber die Spanne reicht von 50 €/m² in ländlichen Regionen Ostdeutschlands bis über 1.500 €/m² in München.</p>

<table>
<thead>
<tr><th>Region</th><th>Ø Preis pro m²</th><th>Bei 600 m² Grundstück</th></tr>
</thead>
<tbody>
<tr><td>Ländlich Ost (Sachsen, Thüringen)</td><td>50–100 €</td><td>30.000–60.000 €</td></tr>
<tr><td>Ländlich West (Niedersachsen, RLP)</td><td>100–180 €</td><td>60.000–108.000 €</td></tr>
<tr><td>Städtisch (Hannover, Leipzig)</td><td>200–400 €</td><td>120.000–240.000 €</td></tr>
<tr><td>Ballungsraum (Hamburg, Frankfurt, Köln)</td><td>400–800 €</td><td>240.000–480.000 €</td></tr>
<tr><td>Top-Lagen (München, Stuttgart)</td><td>800–2.000 €</td><td>480.000–1.200.000 €</td></tr>
</tbody>
</table>

<p><strong>Spartipp:</strong> Das Grundstück ist der Posten, bei dem du am meisten sparen kannst. 20 km weiter vom Stadtzentrum kann der Quadratmeterpreis um 50 % fallen — bei gleicher Lebensqualität.</p>

<h2>Baukosten pro m² — was kostet der Rohbau?</h2>

<p>Die reinen Baukosten (ohne Grundstück) liegen 2026 bei:</p>

<table>
<thead>
<tr><th>Ausstattung</th><th>Kosten pro m²</th><th>Bei 130 m²</th></tr>
</thead>
<tbody>
<tr><td>Einfach (Standard-Baustoffe, wenig Extras)</td><td>1.800–2.200 €</td><td>234.000–286.000 €</td></tr>
<tr><td>Mittel (gute Ausstattung, FBH, Rollläden)</td><td>2.200–2.800 €</td><td>286.000–364.000 €</td></tr>
<tr><td>Gehoben (Marken-Sanitär, Smart Home, große Fenster)</td><td>2.800–3.500 €</td><td>364.000–455.000 €</td></tr>
<tr><td>Premium (Architektenhaus, individuelle Planung)</td><td>3.500–5.000+ €</td><td>455.000–650.000+ €</td></tr>
</tbody>
</table>

<p><strong>Rohbau allein:</strong> ca. 900–1.300 €/m² für Fundament/Bodenplatte, Wände und Dach. Der Rest geht in den Innenausbau.</p>

<h2>Innenausbau — die einzelnen Gewerke</h2>

<p>Hier wird es konkret. Für jedes Gewerk haben wir einen eigenen Rechner und Ratgeber:</p>

<table>
<thead>
<tr><th>Gewerk</th><th>Kosten pro m²</th><th>Rechner</th><th>Ratgeber</th></tr>
</thead>
<tbody>
<tr><td>Estrich</td><td>15–35 €/m²</td><td><a href="/rechner/estrich">Estrich-Rechner →</a></td><td><a href="/rohbau/estrich-kosten">Estrich-Kosten →</a></td></tr>
<tr><td>Trockenbau</td><td>50–85 €/m²</td><td><a href="/rechner/trockenbau">Trockenbau-Rechner →</a></td><td><a href="/rohbau/trockenbau-kosten">Trockenbau-Kosten →</a></td></tr>
<tr><td>Putz (innen)</td><td>20–40 €/m²</td><td><a href="/rechner/putz">Putz-Rechner →</a></td><td><a href="/rohbau/kalk-zement-putz">KZ-Putz Guide →</a></td></tr>
<tr><td>Elektro</td><td>80–150 €/Steckdose</td><td><a href="/rechner/elektro">Elektro-Rechner →</a></td><td>—</td></tr>
<tr><td>Sanitär</td><td>8.000–25.000 € (Bad)</td><td><a href="/rechner/sanitaer">Sanitär-Rechner →</a></td><td>—</td></tr>
<tr><td>Fliesen</td><td>50–150 €/m²</td><td><a href="/rechner/fliesen">Fliesen-Rechner →</a></td><td><a href="/boden/fliesen-verlegen-kosten">Fliesen-Kosten →</a></td></tr>
<tr><td>Bodenbelag</td><td>25–70 €/m²</td><td><a href="/rechner/laminat">Laminat-Rechner →</a></td><td><a href="/boden/laminat-verlegen-kosten">Laminat-Kosten →</a></td></tr>
<tr><td>Malerarbeiten</td><td>8–15 €/m²</td><td><a href="/rechner/wandfarbe">Wandfarbe-Rechner →</a></td><td><a href="/farben/silikatfarbe">Silikatfarbe Guide →</a></td></tr>
<tr><td>Dämmung</td><td>40–250 €/m²</td><td><a href="/rechner/daemmung">Dämmung-Rechner →</a></td><td><a href="/rohbau/daemmung-kosten">Dämmung-Kosten →</a></td></tr>
</tbody>
</table>

<p>→ <a href="/finanzen/handwerkerkosten-guide"><strong>Alle Handwerkerkosten nach Gewerk im Detail →</strong></a></p>

<h2>Kaufnebenkosten — die vergessenen Kosten</h2>

<p>Bei den meisten Bauherren kommen die Kaufnebenkosten als böse Überraschung. Sie liegen bei <strong>10–15 % des Kaufpreises</strong> und müssen aus Eigenkapital bezahlt werden — Banken finanzieren sie in der Regel nicht.</p>

<table>
<thead>
<tr><th>Position</th><th>Anteil</th><th>Bei 350.000 €</th></tr>
</thead>
<tbody>
<tr><td>Grunderwerbsteuer</td><td>3,5–6,5 % (je Bundesland)</td><td>12.250–22.750 €</td></tr>
<tr><td>Notar + Grundbuch</td><td>ca. 2,0 %</td><td>ca. 7.000 €</td></tr>
<tr><td>Makler (falls beteiligt)</td><td>3,0–3,57 %</td><td>10.500–12.500 €</td></tr>
<tr><td><strong>Gesamt</strong></td><td><strong>8,5–12 %</strong></td><td><strong>30.000–42.000 €</strong></td></tr>
</tbody>
</table>

<p>→ <a href="/rechner/nebenkosten"><strong>Berechne deine exakten Kaufnebenkosten nach Bundesland →</strong></a></p>
<p>→ <a href="/finanzen/kaufnebenkosten-guide">Ausführlicher Kaufnebenkosten-Guide →</a></p>

<h2>Baunebenkosten — was oft vergessen wird</h2>

<p>Neben den Kaufnebenkosten fallen <strong>Baunebenkosten</strong> an, die oft unterschätzt werden:</p>

<ul>
<li><strong>Architektenhonorar:</strong> 8–15 % der Bausumme (bei Architektenhaus)</li>
<li><strong>Baugenehmigung:</strong> 0,5–1 % der Bausumme (ca. 1.000–3.000 €) → <a href="/rechner/baugenehmigung">Baugenehmigung-Check</a></li>
<li><strong>Vermessung + Bodengutachten:</strong> ca. 2.000–5.000 €</li>
<li><strong>Hausanschlüsse</strong> (Strom, Wasser, Gas, Telekom): ca. 8.000–15.000 €</li>
<li><strong>Baustrom + Bauwasser:</strong> ca. 500–1.500 €</li>
<li><strong>Bauversicherung</strong> (Bauleistung, Bauherren-Haftpflicht): ca. 500–1.000 €</li>
<li><strong>Prüfstatiker + Energieberater:</strong> ca. 2.000–5.000 €</li>
</ul>

<p><strong>Faustregel:</strong> Plane zusätzlich zu den reinen Baukosten <strong>15–20 %</strong> für alle Nebenkosten ein.</p>

<h2>Förderung nutzen — bis zu 150.000 € zinsgünstig</h2>

<p>Wer energieeffizient baut, bekommt staatliche Förderung:</p>

<ul>
<li><strong>KfW 297/298:</strong> Zinsgünstiger Kredit bis 150.000 € für klimafreundliche Neubauten</li>
<li><strong>BAFA:</strong> Zuschüsse für energetische Einzelmaßnahmen (Dämmung, Heizung)</li>
<li><strong>§ 35c EStG:</strong> 20 % der Sanierungskosten von der Steuer absetzen (bei Bestandsgebäuden)</li>
</ul>

<p>→ <a href="/rechner/foerdermittel"><strong>Finde passende Förderungen → Fördermittel-Finder</strong></a></p>
<p>→ <a href="/finanzen/kfw-foerderung-2026">KfW Förderung 2026 — alle Programme im Detail →</a></p>

<h2>Eigenleistung — so sparst du 10.000–30.000 €</h2>

<p>Die realistischste Möglichkeit, Baukosten zu senken:</p>

<table>
<thead>
<tr><th>Eigenleistung</th><th>Ersparnis</th><th>Schwierigkeit</th></tr>
</thead>
<tbody>
<tr><td>Malerarbeiten</td><td>2.000–5.000 €</td><td>Einfach</td></tr>
<tr><td>Boden verlegen</td><td>1.500–4.000 €</td><td>Einfach</td></tr>
<tr><td>Trockenbau</td><td>3.000–8.000 €</td><td>Mittel</td></tr>
<tr><td>Garten + Terrasse</td><td>2.000–6.000 €</td><td>Mittel</td></tr>
</tbody>
</table>

<p>→ <a href="/rechner/eigenleistung"><strong>Berechne dein Sparpotenzial → Eigenleistungs-Rechner</strong></a></p>
<p>→ <a href="/finanzen/eigenleistung-hausbau">Eigenleistung Guide — was lohnt sich wirklich? →</a></p>

<h2>Rechenbeispiel: Einfamilienhaus 130 m² in Niedersachsen</h2>

<table>
<thead>
<tr><th>Position</th><th>Kosten</th></tr>
</thead>
<tbody>
<tr><td>Grundstück (600 m² × 150 €)</td><td>90.000 €</td></tr>
<tr><td>Baukosten (130 m² × 2.400 €)</td><td>312.000 €</td></tr>
<tr><td>Grunderwerbsteuer (5,0 %)</td><td>20.100 €</td></tr>
<tr><td>Notar + Grundbuch</td><td>8.040 €</td></tr>
<tr><td>Makler (3,57 %)</td><td>14.360 €</td></tr>
<tr><td>Hausanschlüsse</td><td>12.000 €</td></tr>
<tr><td>Baugenehmigung + Gutachten</td><td>5.000 €</td></tr>
<tr><td>Außenanlagen</td><td>25.000 €</td></tr>
<tr><td>Bauversicherung + Sonstiges</td><td>3.000 €</td></tr>
<tr><td><strong>Gesamtkosten</strong></td><td><strong>489.500 €</strong></td></tr>
<tr><td>− Eigenleistung (Maler, Boden, Garten)</td><td>− 12.000 €</td></tr>
<tr><td>− KfW-Förderung (Zinsersparnis über Laufzeit)</td><td>− 15.000 €</td></tr>
<tr><td><strong>Effektive Kosten</strong></td><td><strong>ca. 462.500 €</strong></td></tr>
</tbody>
</table>

<h2>7 Tipps zum Sparen beim Hausbau</h2>

<ol>
<li><strong>Grundstück clever wählen:</strong> 20 km weiter raus = 30–50 % günstiger.</li>
<li><strong>Kompakt bauen:</strong> Einfache Grundrisse ohne Erker, Gauben und Winkel sparen 10–15 %.</li>
<li><strong>Standardmaße nutzen:</strong> Fenster, Türen und Treppen in Standardmaßen sind deutlich günstiger als Sonderanfertigungen.</li>
<li><strong>3+ Angebote vergleichen:</strong> Preisunterschiede von 30–50 % zwischen Anbietern sind normal. → <a href="/finanzen/handwerkerkosten-guide">Handwerkerkosten-Guide</a></li>
<li><strong>Eigenleistung bei einfachen Gewerken:</strong> Maler, Boden, Garten = 10.000–20.000 € Ersparnis. → <a href="/rechner/eigenleistung">Eigenleistungs-Rechner</a></li>
<li><strong>Förderung beantragen VOR Baubeginn:</strong> KfW-Kredit spart über die Laufzeit 15.000–30.000 €. → <a href="/rechner/foerdermittel">Fördermittel-Finder</a></li>
<li><strong>Keller weglassen:</strong> Eine Bodenplatte statt Keller spart 30.000–60.000 €. Heizraum und Stauraum lassen sich auch im EG oder Dach unterbringen.</li>
</ol>

<h2>Alle unsere Rechner für deinen Hausbau</h2>

<p>Wir haben <strong>19 kostenlose Rechner</strong> die dir helfen, dein Bauprojekt durchzukalkulieren:</p>

<ul>
<li><a href="/rechner/nebenkosten">Kaufnebenkosten-Rechner</a> — Grunderwerbsteuer, Notar, Makler</li>
<li><a href="/rechner/handwerkerkosten">Handwerkerkosten-Rechner</a> — 21 Gewerke mit Regionalpreisen</li>
<li><a href="/rechner/eigenleistung">Eigenleistungs-Rechner</a> — Was sparst du durch Eigenleistung?</li>
<li><a href="/rechner/foerdermittel">Fördermittel-Finder</a> — KfW, BAFA, Steuerbonus</li>
<li><a href="/rechner/baugenehmigung">Baugenehmigung-Check</a> — Brauche ich eine Genehmigung?</li>
<li><a href="/rechner/gewerk-reihenfolge">Gewerk-Reihenfolge</a> — Welche Handwerker zuerst?</li>
</ul>

<p>Plus 13 Materialrechner für <a href="/rechner/fliesen">Fliesen</a>, <a href="/rechner/laminat">Laminat</a>, <a href="/rechner/trockenbau">Trockenbau</a>, <a href="/rechner/estrich">Estrich</a>, <a href="/rechner/daemmung">Dämmung</a>, <a href="/rechner/putz">Putz</a>, <a href="/rechner/beton">Beton</a>, <a href="/rechner/wandfarbe">Wandfarbe</a>, <a href="/rechner/tapeten">Tapeten</a>, <a href="/rechner/terrasse">Terrasse</a>, <a href="/rechner/elektro">Elektro</a>, <a href="/rechner/sanitaer">Sanitär</a> und <a href="/rechner/stromverbrauch">Stromerzeuger</a>.</p>

<h2>Häufige Fragen</h2>

<h3>Was kostet ein Hausbau 2026?</h3>
<p>Ein durchschnittliches Einfamilienhaus (130 m²) kostet 2026 komplett 450.000–600.000 € inklusive Grundstück und aller Nebenkosten. Ohne Grundstück rechne mit 280.000–400.000 € je nach Ausstattung und Region.</p>

<h3>Was kostet ein Haus bauen pro m²?</h3>
<p>Die reinen Baukosten liegen bei 1.800–3.500 €/m² je nach Ausstattung. Einfach: 1.800–2.200 €, mittel: 2.200–2.800 €, gehoben: 2.800–3.500 €, Premium/Architekt: 3.500–5.000+ €.</p>

<h3>Wie viel Eigenkapital brauche ich?</h3>
<p>Mindestens die Kaufnebenkosten (ca. 10–15 % des Gesamtpreises) sollten aus Eigenkapital kommen. Ideal sind 20–30 % — das senkt den Zinssatz merklich. → <a href="/rechner/nebenkosten">Nebenkosten berechnen</a></p>

<h3>Wird Bauen 2026 günstiger?</h3>
<p>Nein. Die Baupreise steigen 2026 voraussichtlich um ca. 2,5 % (Prognose Bundesinstitut für Bau). Historisch sind Baupreise noch nie nachhaltig gefallen. Wer auf sinkende Preise wartet, zahlt am Ende mehr.</p>

<h3>Fertighaus oder Massivhaus — was ist günstiger?</h3>
<p>Fertighäuser sind typischerweise 10–20 % günstiger als Massivhäuser bei vergleichbarer Ausstattung. Massivhäuser bieten dafür höheren Wiederverkaufswert und längere Lebensdauer.</p>

<h3>Kann ich unter 300.000 € bauen?</h3>
<p>Ja — mit kleinem Grundriss (80–100 m²), günstigem Grundstück (ländlich) und viel Eigenleistung. Ein 90-m²-Haus in Ostdeutschland ist ab ca. 250.000 € realisierbar (inkl. Grundstück).</p>`;

async function run() {
  console.log("=== HAUSBAU KOSTEN 2026 (INSERT) ===");
  const resp = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: FINANZEN_SILO,
      slug: "hausbau-kosten-2026",
      titel: "Was kostet ein Hausbau 2026? Alle Kosten im Überblick",
      seo_title: "Hausbau Kosten 2026: Was kostet ein Haus bauen? Komplett-Überblick",
      seo_description: "Hausbau Kosten 2026: Grundstück, Rohbau, Innenausbau, Nebenkosten. Realistische Kostenaufstellung mit Rechner. Von 280.000 bis 600.000+ €.",
      typ: "artikel",
      content_md: content,
      status: "aktiv",
    }),
  });
  const data = await resp.json();
  if (resp.ok && data.length > 0) {
    console.log("OK:", data[0].slug);
    console.log("ID:", data[0].id);
  } else {
    console.log("FAIL:", JSON.stringify(data));
  }
}

run();

const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const BAD_SILO = "5561d744-af3e-4f24-b89e-965a082ae690";

const content = `<p>Was kostet eine Bad-Sanierung <strong>wirklich</strong>? Von der kleinen Auffrischung (neue Armaturen, frischer Anstrich) bis zur Komplettsanierung (Fliesen raus, alles neu) — wir schlüsseln alle Kosten auf, zeigen dir wo du sparen kannst und welche Förderung es gibt.</p>

<p><strong>Kurze Antwort:</strong> Eine Komplettsanierung kostet <strong>8.000–18.000 €</strong> für ein durchschnittliches Bad (6–8 m²). Eine Teilsanierung ist ab 3.000 € möglich, eine Premium-Sanierung mit bodengleicher Dusche und Fußbodenheizung ab 18.000 €.</p>

<p>→ <a href="/rechner/sanitaer"><strong>Berechne deine Sanitärkosten →</strong></a><br/>
→ <a href="/rechner/handwerkerkosten"><strong>Berechne Handwerkerkosten nach Gewerk →</strong></a></p>

<h2>Was kostet Bad sanieren? (Übersicht)</h2>

<table>
<thead>
<tr><th>Variante</th><th>Kosten (6–8 m²)</th><th>Was ist enthalten</th></tr>
</thead>
<tbody>
<tr><td>Kosmetisch</td><td>1.000–3.000 €</td><td>Armaturen tauschen, streichen, Spiegel, Accessoires</td></tr>
<tr><td>Teilsanierung</td><td>3.000–8.000 €</td><td>Neue Fliesen, neue Armaturen, WC/Waschbecken</td></tr>
<tr><td>Komplettsanierung</td><td>8.000–18.000 €</td><td>Alles raus, alles neu, inkl. Installation</td></tr>
<tr><td>Premium / Wellness</td><td>18.000–35.000+ €</td><td>Bodengleiche Dusche, FBH, Regendusche, Smart Home</td></tr>
</tbody>
</table>

<p><strong>Faustregel:</strong> Rechne mit <strong>1.200–2.500 € pro m²</strong> für eine Komplettsanierung. Ein kleines Bad (4 m²) ist also günstiger als ein großes (10 m²) — aber die Fixkosten (Sanitär-Installation, Anschlüsse) bleiben gleich.</p>

<h2>Kosten nach Gewerk aufgeschlüsselt</h2>

<p>So setzt sich eine typische Komplettsanierung zusammen:</p>

<table>
<thead>
<tr><th>Gewerk</th><th>Kosten</th><th>Details</th></tr>
</thead>
<tbody>
<tr><td><strong>Abriss + Entsorgung</strong></td><td>500–1.500 €</td><td>Alte Fliesen, Sanitärobjekte, Estrich entfernen, Container</td></tr>
<tr><td><strong>Sanitär-Installation</strong></td><td>2.000–5.000 €</td><td>Wasser-/Abwasserleitungen verlegen, Anschlüsse setzen</td></tr>
<tr><td><strong>Fliesen (Boden + Wände)</strong></td><td>2.000–6.000 €</td><td>Material + Verlegung, 20–30 m² typisch</td></tr>
<tr><td><strong>WC + Waschbecken + Dusche/Wanne</strong></td><td>1.500–5.000 €</td><td>Sanitärobjekte inkl. Montage</td></tr>
<tr><td><strong>Armaturen</strong></td><td>200–1.500 €</td><td>Waschtisch-, Dusch-, Wannenarmatur</td></tr>
<tr><td><strong>Elektro</strong></td><td>500–1.500 €</td><td>Licht, Steckdosen, Spiegelschrank-Anschluss</td></tr>
<tr><td><strong>Malerarbeiten</strong></td><td>300–800 €</td><td>Decke + nicht geflieste Wandflächen</td></tr>
<tr><td><strong>Sonstiges</strong></td><td>200–500 €</td><td>Silikon, Dichtungen, Kleinteile</td></tr>
</tbody>
</table>

<p><strong>Handwerkerkosten gesamt:</strong> Bei einer Komplettsanierung fallen ca. <strong>3.000–8.000 € reine Arbeitskosten</strong> an (ohne Material). Der Installateur ist am teuersten (55–80 €/h), der Fliesenleger liegt bei 45–65 €/h.</p>

<p>→ <a href="/rechner/handwerkerkosten"><strong>Berechne deine Handwerkerkosten nach Gewerk →</strong></a></p>
<p>→ <a href="/rechner/fliesen">Fliesenbedarf berechnen → Fliesen-Rechner</a></p>
<p>→ <a href="/boden/fliesen-verlegen-kosten">Fliesen verlegen Kosten pro m² im Detail →</a></p>

<h2>Die einzelnen Sanitärobjekte</h2>

<h3>WC — 300–2.000 €</h3>
<p>Ein <strong>Vorwandelement</strong> (Geberit oder ähnlich) kostet 150–400 €, dazu ein wandhängendes WC ab 150 €. Die Montage durch den Installateur: ca. 200–400 €. Tipp: Vorwandelemente mit geringer Einbautiefe (ab 8 cm) sparen Platz in kleinen Bädern.</p>
<p>→ <a href="/bad/vorwandelement-wc">Vorwandelement-Ratgeber</a> · <a href="/bad/geberit-sigma-drueckerplatte">Geberit Drückerplatten-Vergleich</a></p>

<h3>Waschbecken + Armatur — 200–1.500 €</h3>
<p>Einfaches Waschbecken ab 80 €, Design-Aufsatzwaschbecken 200–600 €. Dazu Armatur (80–400 €) und Unterschrank (100–500 €). Die Montage ist vergleichsweise günstig (ca. 100–200 €).</p>
<p>→ <a href="/bad/waschtischarmatur-ratgeber">Waschtischarmatur-Ratgeber — worauf es ankommt</a></p>

<h3>Dusche oder Badewanne — 500–3.000 €</h3>
<p><strong>Duschwanne + Armatur:</strong> Ab 300 € (einfach) bis 2.000 € (bodengleich, Glasabtrennung). Eine <strong>bodengleiche Dusche</strong> ist ca. 30–50 % teurer als eine Standard-Duschwanne, sieht aber moderner aus und ist barrierefrei.</p>
<p><strong>Badewanne:</strong> Acrylwanne ab 200 €, Einbau ab 300 €. Freistehende Wannen ab 800 €.</p>
<p>→ <a href="/bad/komplettdusche-ratgeber">Komplettdusche als Budget-Lösung →</a></p>
<p>→ <a href="/bad/badewannenarmatur-ratgeber">Badewannenarmatur-Ratgeber →</a></p>

<h2>Zeitplan Bad-Sanierung</h2>

<p>Eine Komplettsanierung dauert typisch <strong>2–4 Wochen</strong>. So sieht der Ablauf aus:</p>

<table>
<thead>
<tr><th>Woche</th><th>Arbeiten</th></tr>
</thead>
<tbody>
<tr><td>Woche 1</td><td>Abriss, Entsorgung, Rohinstallation Sanitär + Elektro</td></tr>
<tr><td>Woche 2</td><td>Estrich/Ausgleich, Abdichtung, Vorwandelemente</td></tr>
<tr><td>Woche 3</td><td>Fliesen verlegen (Boden + Wände)</td></tr>
<tr><td>Woche 4</td><td>Sanitärobjekte montieren, Armaturen, Silikonfugen, Maler</td></tr>
</tbody>
</table>

<p><strong>Wichtig:</strong> Plane eine <strong>Trocknungszeit</strong> für Estrich und Abdichtung ein. Fliesen können erst verlegt werden, wenn der Untergrund komplett trocken ist.</p>

<p>→ <a href="/rechner/gewerk-reihenfolge">Welche Handwerker in welcher Reihenfolge? → Gewerk-Planer</a></p>
<p>→ <a href="/rohbau/estrich-kosten">Estrich-Kosten und Trocknungszeiten →</a></p>

<h2>Spartipps für die Bad-Sanierung</h2>

<ol>
<li><strong>Fliesen auf Fliesen:</strong> Statt alte Fliesen abzuschlagen, können neue direkt darüber verlegt werden (wenn der Untergrund tragfähig ist). Spart 500–1.500 € Abrisskosten. Alternativ: Fliesen überstreichen mit Fliesenfarbe (ab 50 €).</li>
<li><strong>Armaturen selber montieren:</strong> Waschtisch- und Duscharmatur wechseln ist DIY-tauglich — spart 100–300 € Installateurskosten pro Armatur. → <a href="/rechner/eigenleistung">Eigenleistungs-Rechner</a></li>
<li><strong>Standardmaße nutzen:</strong> Duschwannen, WCs und Waschbecken in Standardmaßen sind 30–50 % günstiger als Sonderanfertigungen.</li>
<li><strong>Komplettdusche statt Einzelteile:</strong> Eine Komplettdusche (Duschwanne + Wände + Armatur) ist oft günstiger als alles einzeln zu kaufen. → <a href="/bad/komplettdusche-ratgeber">Komplettdusche-Ratgeber</a></li>
<li><strong>Förderung für barrierefreies Bad:</strong> Die KfW fördert barrierefreie Umbauten mit bis zu 6.250 € Zuschuss (Programm 455-B). Bodengleiche Dusche, breitere Tür, Haltegriffe — das reicht oft schon. → <a href="/rechner/foerdermittel">Fördermittel-Finder</a></li>
<li><strong>Zeitpunkt:</strong> Im Winter haben Handwerker oft freie Kapazitäten — Termine leichter verfügbar, manchmal 5–10 % Rabatt.</li>
</ol>

<h2>Unsere Empfehlungen</h2>

<ul>
<li><strong>Duschsystem mit Regendusche</strong> — Komplett-Set mit Kopf- und Handbrause, einfache Montage — <a href="https://www.amazon.de/s?k=duschsystem+regendusche+set&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
<li><strong>Waschtisch mit Unterschrank</strong> — Platzsparendes Set, fertig vormontiert — <a href="https://www.amazon.de/s?k=waschtisch+mit+unterschrank+set&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
<li><strong>LED-Badspiegel</strong> — Mit Beleuchtung und Antibeschlag, wertet jedes Bad auf — <a href="https://www.amazon.de/s?k=led+badspiegel+badezimmer&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon →</a></li>
</ul>

<h2>Häufige Fragen</h2>

<h3>Was kostet eine Badsanierung für ein kleines Bad?</h3>
<p>Ein kleines Bad (4–5 m²) komplett sanieren kostet ca. <strong>6.000–12.000 €</strong> inklusive Material und Handwerker. Die Fixkosten (Sanitär-Anschlüsse, Elektro) sind gleich wie bei einem großen Bad — nur die Fliesen- und Materialmenge ist geringer.</p>

<h3>Wie lange dauert eine Bad-Sanierung?</h3>
<p>Komplettsanierung: <strong>2–4 Wochen</strong>. Teilsanierung (nur Fliesen + Armaturen): 1–2 Wochen. Kosmetische Auffrischung: 2–3 Tage. Die größten Zeitfresser: Trocknungszeit für Estrich und Abdichtung.</p>

<h3>Kann ich mein Bad selber sanieren?</h3>
<p>Teilweise. <strong>Selber machbar:</strong> Armaturen wechseln, streichen, Accessoires montieren, einfache Fliesen verlegen. <strong>Profi nötig:</strong> Sanitär-Installation (Wasser-/Abwasserleitungen), Elektro, Abdichtung (Feuchtigkeitsschäden bei Fehlern!). → <a href="/rechner/eigenleistung">Eigenleistungs-Rechner</a></p>

<h3>Gibt es Förderung für Bad-Sanierung?</h3>
<p>Ja — die <strong>KfW fördert barrierefreie Umbauten</strong> (Programm 455-B) mit bis zu 6.250 € Zuschuss. Voraussetzung: Bodengleiche Dusche, rutschfester Boden, ggf. breitere Türen. Auch der Steuerbonus für Handwerkerleistungen (§ 35a EStG, max. 1.200 €/Jahr) gilt. → <a href="/rechner/foerdermittel">Fördermittel-Finder</a></p>

<h3>Lohnt sich eine Badewanne oder reicht eine Dusche?</h3>
<p>Eine Dusche ist platzsparender und günstiger (500–1.500 € vs. 800–2.500 € für Wanne + Einbau). Beim Wiederverkauf ist eine Badewanne aber ein Plus — ideal: ein Bad mit Dusche, eins mit Wanne. In kleinen Bädern unter 6 m² empfehlen wir immer eine Dusche.</p>`;

async function run() {
  console.log("=== BAD SANIEREN KOSTEN (INSERT) ===");
  const resp = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: BAD_SILO,
      slug: "bad-sanieren-kosten",
      titel: "Bad sanieren Kosten 2026 — der komplette Guide",
      seo_title: "Bad sanieren Kosten 2026: Komplettsanierung, Teilsanierung, Spartipps",
      seo_description:
        "Bad sanieren Kosten 2026: Komplettsanierung 8.000–25.000 €, Teilsanierung ab 3.000 €. Alle Gewerke aufgeschlüsselt mit Rechner und Spartipps.",
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

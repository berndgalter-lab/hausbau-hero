const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const badSiloId = "5561d744-af3e-4f24-b89e-965a082ae690";

const content = `<h2>Aufputz vs. Unterputz — was ist der Unterschied?</h2>

<p>Die wichtigste Entscheidung bei der Badewannenarmatur: Soll sie <strong>auf der Wand sitzen</strong> (Aufputz) oder <strong>in der Wand verschwinden</strong> (Unterputz)? Beide Varianten haben klare Vor- und Nachteile.</p>

<h3>Aufputz-Armatur</h3>
<p>Die Armatur wird direkt auf die Wand montiert — Anschlüsse und Leitungen bleiben sichtbar. Der Einbau ist unkompliziert: alte Armatur ab, neue drauf. Ideal bei Renovierungen, wenn du die Wand nicht öffnen willst.</p>

<h3>Unterputz-Armatur</h3>
<p>Nur der Griff und der Auslauf sind sichtbar — die gesamte Technik sitzt hinter der Wand in einer Vorwandinstallation (Grundkörper/iBox). Das Ergebnis ist ein aufgeräumtes, modernes Bad. Der Einbau ist allerdings deutlich aufwändiger und teurer, weil die Wand geöffnet oder eine Vorwandkonstruktion gebaut werden muss.</p>

<table>
<thead>
<tr><th>Kriterium</th><th>Aufputz</th><th>Unterputz</th></tr>
</thead>
<tbody>
<tr><td>Kosten (Armatur)</td><td>60–300 €</td><td>200–600 €</td></tr>
<tr><td>Einbau</td><td>Einfach, DIY möglich</td><td>Aufwändig, Handwerker empfohlen</td></tr>
<tr><td>Optik</td><td>Funktional, Leitungen sichtbar</td><td>Clean, minimalistisch</td></tr>
<tr><td>Wartung</td><td>Leicht zugänglich</td><td>Revisionsöffnung nötig</td></tr>
<tr><td>Renovierung</td><td>Ideal — kein Wandumbau</td><td>Nur bei Neubau / Kernsanierung sinnvoll</td></tr>
</tbody>
</table>

<h2>Die wichtigsten Marken im Vergleich</h2>

<p><strong>Grohe</strong> — Der Allrounder mit dem breitesten Sortiment. Badewannenarmaturen ab ca. 120 €. Gute Qualität, solide Kartuschen, in fast jedem Baumarkt erhältlich. Grohe deckt sowohl Aufputz als auch Unterputz ab.</p>

<p><strong>hansgrohe</strong> — Premium-Marke mit Fokus auf Design. Badewannenarmaturen ab ca. 180 €. Besonders stark bei Unterputz-Systemen (iBox universal). Wer ein Design-Bad plant, kommt an hansgrohe kaum vorbei.</p>

<p><strong>HANSA</strong> — Solide Mittelklasse aus Deutschland. Weniger bekannt als Grohe, aber gute Qualität zu fairen Preisen. Badewannenarmaturen ab ca. 100 €. Besonders bei Aufputz-Modellen ein gutes Preis-Leistungs-Verhältnis.</p>

<p><strong>Ideal Standard</strong> — Budget-freundliche Option mit ordentlicher Qualität. Einstiegsmodelle ab ca. 80 €. Gute Wahl, wenn das Budget begrenzt ist, du aber nicht auf Markenqualität verzichten willst.</p>

<h2>Beliebte Styles</h2>

<p><strong>Chrom</strong> — Der zeitlose Klassiker. Passt zu jedem Badstil, ist pflegeleicht und zeigt Wasserflecken weniger als dunkle Oberflächen. Die mit Abstand beliebteste Wahl bei Badewannenarmaturen.</p>

<p><strong>Schwarz matt</strong> — Aktueller Trend für moderne Bäder. Setzt einen starken Kontrast zu weißer Keramik. Beachte: Kalkflecken und Fingerabdrücke fallen stärker auf als bei Chrom. Am besten nach jeder Nutzung kurz abwischen.</p>

<p><strong>Gebürstetes Nickel</strong> — Die edle Mitte zwischen Chrom und Gold. Weniger glänzend als Chrom, dafür wärmer im Ton. Premium-Preissegment ab ca. 200 € aufwärts.</p>

<h2>Was kostet eine Badewannenarmatur?</h2>

<table>
<thead>
<tr><th>Typ</th><th>Preisspanne</th><th>Beispiel</th></tr>
</thead>
<tbody>
<tr><td>Aufputz Budget</td><td>60–120 €</td><td>Ideal Standard, CECIPA</td></tr>
<tr><td>Aufputz Mittelklasse</td><td>120–300 €</td><td>Grohe, HANSA</td></tr>
<tr><td>Unterputz komplett</td><td>200–600 €</td><td>hansgrohe, Grohe</td></tr>
</tbody>
</table>

<p><strong>Dazu kommen Handwerkerkosten:</strong> Rechne mit ca. 80–150 € für den Einbau einer Aufputz-Armatur. Bei Unterputz-Armaturen können die Einbaukosten je nach Aufwand 200–500 € betragen.</p>

<p><a href="/rechner/handwerkerkosten">Was kostet ein Installateur? Berechne die Handwerkerkosten →</a></p>

<h2>Montage-Tipps</h2>

<h3>Aufputz: DIY möglich</h3>
<p>Eine Aufputz-Badewannenarmatur zu tauschen ist machbar, wenn du etwas handwerkliches Geschick mitbringst. Plane 45–90 Minuten ein. Du brauchst: Rohrzange, Maulschlüssel, Teflonband und einen Eimer.</p>
<ol>
<li>Wasser am Haupthahn oder den Eckventilen abstellen</li>
<li>Alte Armatur von den Wandanschlüssen abschrauben</li>
<li>S-Anschlüsse reinigen oder erneuern, Gewinde mit Teflonband abdichten</li>
<li>Neue Armatur aufschrauben und ausrichten</li>
<li>Wasser aufdrehen und auf Dichtheit prüfen</li>
</ol>

<h3>Unterputz: Handwerker empfohlen</h3>
<p>Bei Unterputz-Armaturen muss ein Grundkörper (z. B. hansgrohe iBox) hinter der Wand sitzen. Das erfordert eine Vorwandinstallation und Fliesenarbeiten. Hier solltest du einen Fachbetrieb beauftragen — Fehler bei der Installation können zu Wasserschäden führen.</p>

<ul>
<li><a href="/rechner/sanitaer">Berechne deinen Sanitär-Bedarf →</a></li>
<li><a href="/rechner/handwerkerkosten">Was kostet ein Installateur? →</a></li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Ideal+Standard+Badewannenarmatur&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Ideal Standard Ceraflex Wannenarmatur</a> (ca. 80–110 €) — Solide Aufputz-Armatur mit Keramikkartusche. Guter Einstieg ohne Kompromisse bei der Grundqualität.</p>

<p><strong>Mittelklasse-Tipp:</strong> <a href="https://www.amazon.de/s?k=Grohe+Eurosmart+Badewannenarmatur&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Grohe Eurosmart Wannenarmatur</a> (ca. 130–180 €) — Bewährter Aufputz-Klassiker mit SilkMove-Kartusche. Langlebig, leise und in vielen Bädern im Einsatz.</p>

<p><strong>Premium-Tipp:</strong> <a href="https://www.amazon.de/s?k=hansgrohe+ShowerSelect+Unterputz+Wannenarmatur&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">hansgrohe ShowerSelect Unterputz-Set</a> (ca. 350–500 €) — Elegantes Unterputz-Thermostat mit Select-Technologie. Temperatur und Menge per Knopfdruck steuern. Das Beste, was du deiner Badewanne gönnen kannst.</p>

<h2>Häufige Fragen (FAQ)</h2>

<h3>Aufputz oder Unterputz — was ist besser?</h3>
<p>Keines ist objektiv „besser". <strong>Aufputz</strong> ist günstiger, einfacher einzubauen und ideal bei Renovierungen. <strong>Unterputz</strong> sieht eleganter aus, kostet aber mehr und erfordert Wandarbeiten. Entscheide nach Budget und Situation: Bei Neubau oder Kernsanierung lohnt sich Unterputz, bei einfachem Armaturtausch ist Aufputz die klügere Wahl.</p>

<h3>Kann ich eine Unterputz-Armatur selber einbauen?</h3>
<p>Theoretisch ja, praktisch nur bedingt. Du brauchst einen Grundkörper (z. B. iBox), musst die Wand öffnen, Rohre verlegen und anschließend fliesen. Wenn du Erfahrung mit Sanitärinstallation und Trockenbau hast, ist es machbar. Für alle anderen: Lass einen Fachbetrieb ran — ein Wasserschaden hinter der Wand ist teuer und aufwändig zu beheben.</p>

<h3>Welche Grohe Badewannenarmatur ist empfehlenswert?</h3>
<p>Die <strong>Grohe Eurosmart</strong> ist der meistverkaufte Aufputz-Klassiker (ca. 130–180 €). Wer Thermostat-Komfort will, greift zur <strong>Grohe Grohtherm 800</strong> (ca. 150–220 €) — damit stellst du die Wunschtemperatur einmal ein und sie bleibt konstant. Für Unterputz ist die <strong>Grohe SmartControl</strong>-Serie eine gute Wahl.</p>

<h3>Passt jede Badewannenarmatur auf jede Badewanne?</h3>
<p>Bei Aufputz-Armaturen ist der Wandabstand der Anschlüsse entscheidend — Standard sind 150 mm Achsabstand (Mitte zu Mitte). Die meisten Aufputz-Armaturen haben S-Anschlüsse, die 10–20 mm Spielraum ausgleichen. Bei Unterputz-Armaturen muss der Grundkörper vor dem Fliesen eingebaut werden — hier bist du flexibler in der Positionierung.</p>`;

async function run() {
  // Step 1: Create hub article
  console.log("=== SCHRITT 1: Badewannenarmatur Hub-Artikel erstellen ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: badSiloId,
      slug: "badewannenarmatur-ratgeber",
      titel: "Badewannenarmatur — Aufputz vs. Unterputz, Kosten & Tipps (2026)",
      seo_title: "Badewannenarmatur — Aufputz vs. Unterputz, Kosten & Tipps (2026)",
      seo_description:
        "Aufputz oder Unterputz? Alle Badewannenarmatur-Typen im Vergleich, aktuelle Preise (60–600 €), Markenvergleich und Montage-Tipps.",
      typ: "artikel",
      content_md: content,
      status: "aktiv",
      sortierung: 0,
    }),
  });
  const d1 = await res1.json();
  if (res1.ok && d1.length > 0) {
    console.log("OK: Artikel erstellt, id:", d1[0].id);
  } else {
    console.log("FAIL:", res1.status, JSON.stringify(d1));
    return;
  }

  // Step 2: Redirect old articles
  console.log("\n=== SCHRITT 2: 3 alte Artikel auf Redirect setzen ===");
  const oldSlugs = [
    "badewannenarmatur-grohe",
    "badewannenarmatur-schwarz",
    "badewannenarmatur-unterputz",
  ];

  let ok = 0;
  for (const slug of oldSlugs) {
    const res = await fetch(BASE + "/rest/v1/seiten?slug=eq." + slug, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        status: "redirect",
        redirect_to: "/bad/badewannenarmatur-ratgeber",
      }),
    });
    const data = await res.json();
    if (res.ok && data.length > 0) {
      console.log("OK:", slug, "-> redirect");
      ok++;
    } else {
      console.log("FAIL:", slug, res.status, JSON.stringify(data));
    }
  }
  console.log("\n" + ok + "/3 Redirects gesetzt");
}

run();

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

const content = `<h2>Typen von Waschtischarmaturen</h2>

<h3>Einhebelmischer</h3>
<p>Der Klassiker in jedem Bad: Mit einem Hebel regelst du Temperatur und Wassermenge gleichzeitig. Einhebelmischer sind die g\u00fcnstigste und am weitesten verbreitete Variante. Sinnvoll f\u00fcr jedes Bad, vor allem wenn du ein gutes Preis-Leistungs-Verh\u00e4ltnis suchst.</p>
<p><strong>Preisspanne:</strong> 30\u201c150 \u20ac</p>

<h3>Zweigriffarmatur</h3>
<p>Zwei separate Griffe f\u00fcr Kalt- und Warmwasser \u2014 der Retro-Look liegt wieder im Trend. Zweigriffmischer passen besonders gut zu Landhausstil-B\u00e4dern und klassischen Einrichtungen. Die Temperaturregelung ist etwas umst\u00e4ndlicher als beim Einhebelmischer.</p>
<p><strong>Preisspanne:</strong> 50\u2013250 \u20ac</p>

<h3>Wasserfall-Armatur</h3>
<p>Hier flie\u00dft das Wasser breit und flach aus einem offenen Auslauf \u2014 ein optisches Highlight. Wasserfall-Armaturen sind ideal als Blickfang im G\u00e4ste-WC oder Design-Bad. Beachte: Der breite Strahl kann mehr spritzen als ein normaler Auslauf.</p>
<p><strong>Preisspanne:</strong> 40\u2013300 \u20ac</p>

<h3>Armatur mit Brause</h3>
<p>Eine ausziehbare Brause macht das Haarewaschen am Waschbecken deutlich einfacher. Besonders praktisch in Familienb\u00e4dern oder wenn das Waschbecken auch zum Reinigen gr\u00f6\u00dferer Gegenst\u00e4nde genutzt wird.</p>
<p><strong>Preisspanne:</strong> 60\u2013250 \u20ac</p>

<h3>Armatur mit Zugstange</h3>
<p>Die Zugstange ist ein kleiner Hebel an der R\u00fcckseite der Armatur, der den Ablauf-Stopper im Waschbecken steuert. Damit sparst du dir einen separaten Ablauf-Mechanismus. Sinnvoll wenn dein Waschbecken eine \u00dcberlauf\u00f6ffnung hat und du den Stopper bequem bedienen willst.</p>
<p><strong>Preisspanne:</strong> 50\u2013200 \u20ac</p>

<h2>Beliebte Farben und Oberfl\u00e4chen</h2>

<p><strong>Chrom</strong> \u2014 Der zeitlose Klassiker. Pflegeleicht, passt zu jedem Stil und zeigt Wasserflecken weniger als dunkle Oberfl\u00e4chen. Die mit Abstand beliebteste Wahl.</p>

<p><strong>Schwarz matt</strong> \u2014 Aktueller Trend, besonders in modernen B\u00e4dern. Sieht edel aus, zeigt aber Fingerabdr\u00fccke und Kalkflecken st\u00e4rker als Chrom. Am besten mit einem Mikrofasertuch pflegen.</p>

<p><strong>Wei\u00df</strong> \u2014 F\u00fcgt sich nahtlos in wei\u00dfe Keramik-B\u00e4der ein. Weniger verbreitet, aber ein harmonischer Look f\u00fcr minimalistische Badezimmer.</p>

<p><strong>Geb\u00fcrstetes Nickel / Gold</strong> \u2014 Premium-Oberfl\u00e4chen f\u00fcr hochwertige B\u00e4der. Gold- und Messingt\u00f6ne sind gerade bei Designern beliebt. Rechne mit h\u00f6heren Preisen ab 150 \u20ac aufw\u00e4rts.</p>

<h2>Was kostet eine gute Waschtischarmatur?</h2>

<table>
<thead>
<tr><th>Kategorie</th><th>Preisspanne</th><th>Beispiel-Marken</th></tr>
</thead>
<tbody>
<tr><td>Budget</td><td>30\u201370 \u20ac</td><td>Auralum, Homelody, CECIPA</td></tr>
<tr><td>Mittelklasse</td><td>70\u2013200 \u20ac</td><td>hansgrohe, Grohe, KEUCO</td></tr>
<tr><td>Premium</td><td>200\u2013500 \u20ac</td><td>Axor, Dornbracht, Duravit</td></tr>
</tbody>
</table>

<p>Unser Tipp: F\u00fcr die meisten B\u00e4der ist die Mittelklasse (70\u2013200 \u20ac) das beste Preis-Leistungs-Verh\u00e4ltnis. Marken wie hansgrohe und Grohe bieten solide Keramikkartuschen und jahrelange Garantie.</p>

<h2>Worauf beim Kauf achten?</h2>

<ul>
<li><strong>Anschlussma\u00dfe:</strong> Standard ist G 3/8 Zoll. Pr\u00fcfe vor dem Kauf, ob dein Waschbecken ein 1-Loch, 2-Loch oder 3-Loch-Modell ist.</li>
<li><strong>Auslaufh\u00f6he:</strong> Bei Aufsatzwaschbecken brauchst du eine hohe Armatur (ab 20 cm). Bei Einbau-Waschbecken reichen niedrigere Modelle (10\u201315 cm).</li>
<li><strong>Keramikkartusche:</strong> Deutlich langlebiger als Gummi-Dichtungen. Bei Markenherstellern Standard, bei Budget-Armaturen immer pr\u00fcfen.</li>
<li><strong>Kalt-/Warmwasser-Anschl\u00fcsse:</strong> Stelle sicher, dass deine Anschl\u00fcsse zum gew\u00e4hlten Modell passen. Bei Einhandmischern brauchst du beide Anschl\u00fcsse.</li>
<li><strong>Sparfunktion:</strong> Viele moderne Armaturen haben einen integrierten Durchflussbegrenzer, der Wasser spart, ohne den Komfort zu reduzieren.</li>
</ul>

<h2>Montage: Selber machen oder Handwerker?</h2>

<p>Die gute Nachricht: Eine Waschtischarmatur zu tauschen ist eine der einfachsten Sanit\u00e4r-Arbeiten. Mit Grundwerkzeug (Rohrzange, Maulschl\u00fcssel, Eimer) bist du in 30\u201360 Minuten fertig.</p>

<p><strong>Schritt f\u00fcr Schritt:</strong></p>
<ol>
<li>Eckventile zudrehen und Restwasser ablaufen lassen</li>
<li>Alte Armatur von unten l\u00f6sen (Befestigungsmutter)</li>
<li>Alte Flexschl\u00e4uche abschrauben</li>
<li>Neue Armatur einsetzen und von unten fixieren</li>
<li>Neue Flexschl\u00e4uche an die Eckventile anschlie\u00dfen</li>
<li>Wasser aufdrehen und auf Dichtheit pr\u00fcfen</li>
</ol>

<p>Falls du unsicher bist oder gleich mehrere Sanit\u00e4r-Arbeiten planst:</p>
<ul>
<li><a href="/rechner/sanitaer">Berechne deinen Sanit\u00e4r-Bedarf \u2192</a></li>
<li><a href="/rechner/handwerkerkosten">Was kostet ein Installateur? \u2192</a></li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Homelody+Waschtischarmatur&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Homelody Waschtischarmatur</a> (ca. 35\u201350 \u20ac) \u2014 Solider Einhebelmischer mit Keramikkartusche. Gutes Einsteigermodell mit ordentlicher Verarbeitung.</p>

<p><strong>Mittelklasse-Tipp:</strong> <a href="https://www.amazon.de/s?k=hansgrohe+Focus+Waschtischarmatur&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">hansgrohe Focus 100</a> (ca. 80\u2013120 \u20ac) \u2014 Bew\u00e4hrter Markenmischer mit EcoSmart-Technologie. Spart bis zu 60 % Wasser. Unsere meistempfohlene Armatur.</p>

<p><strong>Premium-Tipp:</strong> <a href="https://www.amazon.de/s?k=Grohe+Essence+Waschtischarmatur&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Grohe Essence</a> (ca. 180\u2013250 \u20ac) \u2014 Elegantes Design, GROHE SilkMove-Kartusche f\u00fcr butterweiche Bedienung. Ideal f\u00fcr Design-B\u00e4der.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Welche Waschtischarmatur ist die beste?</h3>
<p>Das h\u00e4ngt von deinem Budget und Stil ab. F\u00fcr die meisten B\u00e4der empfehlen wir die Mittelklasse (70\u2013200 \u20ac) von hansgrohe oder Grohe \u2014 sie bieten die beste Kombination aus Qualit\u00e4t, Garantie und Preis. Schau dir unsere Preistabelle weiter oben an.</p>

<h3>Wasserfall-Armatur \u2014 Vor- und Nachteile?</h3>
<p><strong>Vorteile:</strong> Optisches Highlight, angenehmes Flie\u00dfger\u00e4usch, modernes Design. <strong>Nachteile:</strong> Breiter Strahl kann spritzen, Reinigung der offenen Fl\u00e4che etwas aufw\u00e4ndiger, oft teurer als Standardmodelle.</p>

<h3>Passt jede Armatur auf jedes Waschbecken?</h3>
<p>Nein. Entscheidend ist die Anzahl der Bohrl\u00f6cher (1-Loch, 2-Loch oder 3-Loch) und der Lochdurchmesser (Standard: 35 mm). Pr\u00fcfe vor dem Kauf, welchen Typ dein Waschbecken hat. Die Anschlussschl\u00e4uche sind bei den meisten Armaturen G 3/8 Zoll \u2014 das passt auf Standard-Eckventile.</p>

<h3>Wie hoch sollte die Armatur sein?</h3>
<p>Bei einem <strong>Einbau-Waschbecken</strong> (b\u00fcndig mit der Waschtischplatte) reicht eine niedrige Armatur mit 10\u201315 cm Auslaufh\u00f6he. Bei einem <strong>Aufsatzwaschbecken</strong> (auf der Platte stehend) brauchst du eine hohe Armatur ab 20 cm, damit das Wasser von oben ins Becken f\u00e4llt.</p>`;

async function run() {
  // Step 1: Create hub article
  console.log("=== SCHRITT 1: Hub-Artikel erstellen ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: badSiloId,
      slug: "waschtischarmatur-ratgeber",
      titel:
        "Waschtischarmatur kaufen \u2014 alle Typen, Kosten & Tipps (2026)",
      seo_title: "Waschtischarmatur kaufen \u2014 Typen, Kosten & Tipps (2026)",
      seo_description:
        "Welche Waschtischarmatur passt zu deinem Bad? Alle Typen im Vergleich, aktuelle Preise (30\u2013500 \u20ac), Kaufberatung und Montage-Tipps.",
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
  }

  // Step 2: Redirect old articles
  console.log("\n=== SCHRITT 2: 7 alte Artikel auf Redirect setzen ===");
  const oldSlugs = [
    "waschtischarmatur-schwarz-matt",
    "waschtischarmatur-schwarz",
    "waschtischarmatur-weiss",
    "waschtischarmatur-wasserfall",
    "waschtischarmatur-mit-brause",
    "waschtischarmatur-mit-zugstange",
    "die-7-besten-einhebel-waschtischarmaturen",
  ];

  let ok = 0;
  for (const slug of oldSlugs) {
    const res = await fetch(BASE + "/rest/v1/seiten?slug=eq." + slug, {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        status: "redirect",
        redirect_to: "/bad/waschtischarmatur-ratgeber",
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
  console.log("\n" + ok + "/7 Redirects gesetzt");
}

run();

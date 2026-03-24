const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

// ─── VORWANDELEMENT WC ────────────────────────────────────────

const vorwandContent = `<p>Ein wandh\u00e4ngendes WC sieht elegant aus, erleichtert die Bodenreinigung und spart Platz. Damit das funktioniert, braucht man ein <strong>Vorwandelement</strong> \u2014 einen stabilen Metallrahmen, der Sp\u00fclkasten, Wasseranschluss und Abwasserrohr hinter der Wand versteckt. In diesem Guide erkl\u00e4ren wir, was ein Vorwandelement kostet, welche Ma\u00dfe du einplanen musst, und ob du es selbst einbauen kannst.</p>

<h2>Was ist ein Vorwandelement?</h2>

<p>Ein Vorwandelement (auch: Installationselement, Montagegestell) ist ein selbsttragender Stahlrahmen, der vor der Rohbauwand montiert wird. Er tr\u00e4gt das Wand-WC, enth\u00e4lt den Unterputz-Sp\u00fclkasten und alle Anschl\u00fcsse f\u00fcr Wasser und Abwasser. Nach der Montage wird der Rahmen mit Gipskartonplatten verkleidet und gefliest \u2014 sichtbar bleibt nur die Dr\u00fcckerplatte.</p>

<p><strong>Aufbau:</strong></p>
<ul>
<li><strong>Stahlrahmen:</strong> Tr\u00e4gt das WC (Belastbarkeit: 400 kg bei allen gro\u00dfen Marken)</li>
<li><strong>Unterputz-Sp\u00fclkasten:</strong> 6/3-Liter-Sp\u00fclung (2-Mengen-Technik), bereits vormontiert</li>
<li><strong>Gewindestangen:</strong> Zur Befestigung der WC-Keramik (Abstand: 18 oder 23 cm)</li>
<li><strong>Anschlussset:</strong> Eckventil, Sp\u00fclrohr, Ablaufbogen (DN 90/100)</li>
<li><strong>Schallschutzset:</strong> Bei guten Elementen inklusive (wichtig in Mehrfamilienh\u00e4usern)</li>
</ul>

<h2>Standard-Ma\u00dfe</h2>

<table>
<thead>
<tr><th>Ma\u00df</th><th>Standard</th><th>Bereich</th></tr>
</thead>
<tbody>
<tr><td><strong>Breite</strong></td><td>50 cm</td><td>38\u201350 cm</td></tr>
<tr><td><strong>H\u00f6he</strong></td><td>112 cm</td><td>82\u2013120 cm</td></tr>
<tr><td><strong>Einbautiefe</strong></td><td>12 cm</td><td>8\u201319 cm</td></tr>
<tr><td><strong>Dr\u00fcckerplatte (Mitte)</strong></td><td>100 cm ab OFF*</td><td>98\u2013106 cm</td></tr>
<tr><td><strong>Befestigungsabstand</strong></td><td>18 cm</td><td>18 oder 23 cm</td></tr>
</tbody>
</table>

<p><em>* OFF = Oberkante Fertigfu\u00dfboden</em></p>

<p><strong>Wichtig f\u00fcr die Planung:</strong> Die Einbautiefe von 12 cm ist nur der Rahmen. Mit Verkleidung (Gipskarton + Fliese) kommt man auf ca. <strong>18\u201322 cm Raumverlust</strong> vor der Wand. In kleinen B\u00e4dern kann das relevant sein \u2014 daf\u00fcr gewinnt man unter dem WC eine durchgehende Bodenfl\u00e4che.</p>

<h2>Was kostet ein Vorwandelement?</h2>

<table>
<thead>
<tr><th>Position</th><th>Kosten</th></tr>
</thead>
<tbody>
<tr><td>Vorwandelement (inkl. Sp\u00fclkasten)</td><td>100\u2013400 \u20ac</td></tr>
<tr><td>Dr\u00fcckerplatte</td><td>25\u2013500 \u20ac</td></tr>
<tr><td>Wand-WC (Keramik)</td><td>80\u2013800 \u20ac</td></tr>
<tr><td>WC-Sitz</td><td>20\u2013150 \u20ac</td></tr>
<tr><td>Verkleidung (Trockenbau)</td><td>30\u201380 \u20ac</td></tr>
<tr><td><strong>Material gesamt</strong></td><td><strong>255\u20131.930 \u20ac</strong></td></tr>
<tr><td>Handwerker-Einbau (Sanit\u00e4r + Trockenbau)</td><td>300\u2013800 \u20ac</td></tr>
<tr><td><strong>Gesamt mit Einbau</strong></td><td><strong>555\u20132.730 \u20ac</strong></td></tr>
</tbody>
</table>

<p>Die gr\u00f6\u00dften Preisunterschiede kommen von der <a href="/bad/geberit-sigma-drueckerplatte">Dr\u00fcckerplatte</a> (25\u2013500 \u20ac) und der WC-Keramik. Das Vorwandelement selbst kostet bei den g\u00e4ngigen Marken zwischen 100 und 250 \u20ac.</p>

<p>\u2192 <a href="/rechner/handwerkerkosten">Was kostet ein Installateur pro Stunde? \u2192</a></p>
<p>\u2192 <a href="/rechner/sanitaer">Berechne deinen Sanit\u00e4r-Bedarf \u2192</a></p>

<h2>Selber einbauen: Schritt f\u00fcr Schritt</h2>

<p><strong>Schwierigkeitsgrad: Fortgeschritten.</strong> Du arbeitest mit Wasser- und Abwasserleitungen \u2014 ein Fehler kann teuer werden. Wenn du noch nie Sanit\u00e4rarbeiten gemacht hast, empfehlen wir einen Fachmann.</p>

<h3>Werkzeug</h3>
<ul>
<li>Bohrhammer + Steinbohrer (10/12 mm)</li>
<li>Wasserwaage (mindestens 60 cm)</li>
<li>Rohrzange, Meterstab, Bleistift</li>
<li>Rohrschneider oder Metallb\u00fcgels\u00e4ge</li>
<li>Gipskartonschrauber (f\u00fcr Verkleidung)</li>
</ul>

<h3>Anleitung</h3>
<ol>
<li><strong>Position festlegen:</strong> Rahmen an die Wand stellen, mit Wasserwaage ausrichten, H\u00f6he der Dr\u00fcckerplatte auf 100 cm ab OFF einstellen. Bohrl\u00f6cher anzeichnen.</li>
<li><strong>Rahmen befestigen:</strong> An Wand und Boden verankern (Schwerlastd\u00fcbel f\u00fcr die Wand, Stockschrauben f\u00fcr den Boden). Das Element muss absolut fest sitzen \u2014 es tr\u00e4gt sp\u00e4ter 400 kg.</li>
<li><strong>Wasser anschlie\u00dfen:</strong> Kaltwasserzuleitung an das Eckventil des Sp\u00fclkastens anschlie\u00dfen. Flex-Schlauch oder Pressverbindung.</li>
<li><strong>Abwasser anschlie\u00dfen:</strong> Ablaufbogen (DN 90) mit dem Abwasserrohr verbinden. Gef\u00e4lle pr\u00fcfen (mindestens 1\u20132 %).</li>
<li><strong>Dichtigkeit pr\u00fcfen:</strong> Wasser aufdrehen, Sp\u00fclkasten f\u00fcllen lassen, mehrfach sp\u00fclen. Alle Verbindungen auf Tropfen kontrollieren. <strong>Diesen Schritt auf keinen Fall \u00fcberspringen!</strong></li>
<li><strong>Verkleiden:</strong> Gipskartonplatten (feuchtraumgeeignet: gr\u00fcne Platten) auf den Rahmen schrauben. Aussparung f\u00fcr Dr\u00fcckerplatte und Gewindestangen freilassen.</li>
<li><strong>Fliesen:</strong> Verkleidung grundieren und fliesen. Dr\u00fcckerplatten-\u00d6ffnung sauber ausschneiden.</li>
<li><strong>WC montieren:</strong> Keramik auf die Gewindestangen setzen, Anschlussdichtung einlegen, Muttern anziehen (handfest + 1/4 Umdrehung, nicht \u00fcberdrehen!).</li>
<li><strong>Dr\u00fcckerplatte einsetzen:</strong> Clips eindr\u00fccken, Funktion pr\u00fcfen.</li>
</ol>

<p><strong>Zeitaufwand:</strong> Ca. 4\u20136 Stunden f\u00fcr das Element + Anschl\u00fcsse, plus 2\u20133 Stunden f\u00fcr Verkleidung und Fliesen (ohne Trockenzeiten).</p>

<p>\u2192 <a href="/rechner/trockenbau">Berechne den Trockenbau-Bedarf f\u00fcr die Verkleidung \u2192</a></p>

<h2>Marken-Vergleich</h2>

<table>
<thead>
<tr><th>Marke</th><th>Modell</th><th>Preis (ca.)</th><th>Besonderheiten</th></tr>
</thead>
<tbody>
<tr><td><strong>Geberit</strong></td><td>Duofix</td><td>150\u2013350 \u20ac</td><td>Marktf\u00fchrer, gr\u00f6\u00dftes Zubeh\u00f6r-Sortiment, Sigma-Dr\u00fcckerplatten</td></tr>
<tr><td><strong>TECE</strong></td><td>TECEprofil</td><td>120\u2013280 \u20ac</td><td>Made in Germany, sehr gute Schallschutzwerte</td></tr>
<tr><td><strong>Grohe</strong></td><td>Rapid SL</td><td>100\u2013250 \u20ac</td><td>Gutes Preis-Leistungs-Verh\u00e4ltnis, PerfectFit-System</td></tr>
<tr><td><strong>Viega</strong></td><td>Prevista</td><td>130\u2013300 \u20ac</td><td>Flache Bautiefe (8 cm m\u00f6glich), Visign-Dr\u00fcckerplatten</td></tr>
</tbody>
</table>

<p><strong>Empfehlung:</strong> Geberit Duofix ist der Standard \u2014 fast jeder Installateur kennt das System, Ersatzteile sind \u00fcberall verf\u00fcgbar, und die <a href="/bad/geberit-sigma-drueckerplatte">Sigma-Dr\u00fcckerplatten</a> gibt es in Dutzenden Designs. F\u00fcr sehr enge R\u00e4ume (z.B. G\u00e4ste-WC) ist Viega Prevista mit 8 cm Einbautiefe eine gute Alternative.</p>

<h2>Unsere Empfehlungen</h2>

<p><strong>Standard-Tipp:</strong> <a href="https://www.amazon.de/s?k=Geberit+Duofix+Vorwandelement+112+cm&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Geberit Duofix Basic 112 cm</a> (ca. 120\u2013160 \u20ac) \u2014 Das meistverkaufte Vorwandelement in Deutschland. Bauh\u00f6he 112 cm, Einbautiefe 12 cm, 2-Mengen-Sp\u00fclung (6/3 l). Kompatibel mit allen Geberit Sigma-Dr\u00fcckerplatten. Zuverl\u00e4ssig und gut dokumentiert.</p>

<p><strong>Komplett-Set:</strong> <a href="https://www.amazon.de/s?k=Geberit+Duofix+Vorwandelement+Set+Dr%C3%BCckerplatte&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Geberit Duofix + Sigma20 Dr\u00fcckerplatte</a> (ca. 170\u2013220 \u20ac) \u2014 Element plus Dr\u00fcckerplatte im Set. Die Sigma20 ist das beliebteste Modell (wei\u00df/chrom, 2-Mengen-Taste). Spart 20\u201330 \u20ac gegen\u00fcber Einzelkauf.</p>

<p><strong>Preis-Tipp:</strong> <a href="https://www.amazon.de/s?k=Grohe+Rapid+SL+Vorwandelement+WC&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Grohe Rapid SL</a> (ca. 100\u2013140 \u20ac) \u2014 Solides Vorwandelement zum g\u00fcnstigeren Preis. Baugleiche Qualit\u00e4t wie Geberit, etwas kleiner Zubeh\u00f6r-Markt. Ideal f\u00fcr Budget-bewusste Renovierer.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Kann ich ein Vorwandelement selbst einbauen?</h3>
<p>Grunds\u00e4tzlich ja, wenn du handwerkliche Erfahrung mit Sanit\u00e4r und Trockenbau hast. Du arbeitest mit Wasser- und Abwasserleitungen \u2014 ein undichter Anschluss kann schnell teuer werden. Die Rahmenmontage selbst ist unkompliziert (Bohren, D\u00fcbeln, Ausrichten). Die kritischen Schritte sind der Wasser-/Abwasseranschluss und die Dichtheitskontrolle.</p>

<h3>Wie viel Platz brauche ich f\u00fcr ein Vorwandelement?</h3>
<p>Mindestens <strong>50 cm Breite und 18\u201322 cm Tiefe</strong> (Rahmen + Verkleidung + Fliese). Die H\u00f6he ist flexibel: Bei Bauh\u00f6he 82 cm (Niedrigversion) kannst du das Element in eine Halbhochwand integrieren, bei 112 cm reicht es bis unter die Decke. In einem G\u00e4ste-WC mit nur 1,5 m\u00b2 funktioniert ein Vorwandelement problemlos.</p>

<h3>Welche Dr\u00fcckerplatte passt auf mein Vorwandelement?</h3>
<p>Die Dr\u00fcckerplatte muss zum Sp\u00fclkasten-Hersteller passen. Geberit Sigma-Platten passen auf Geberit Duofix, TECE-Platten auf TECEprofil, usw. <strong>Nicht hersteller\u00fcbergreifend mischbar!</strong> Die Einbau\u00f6ffnung ist zwar genormt (ca. 24 \u00d7 16 cm), aber die Anschl\u00fcsse und das Clip-System sind herstellerspezifisch. Eine \u00dcbersicht der Geberit-Modelle findest du in unserem <a href="/bad/geberit-sigma-drueckerplatte">Sigma-Dr\u00fcckerplatten-Vergleich</a>.</p>

<h3>Wie lange h\u00e4lt ein Vorwandelement?</h3>
<p>Der Stahlrahmen h\u00e4lt praktisch ewig. Der Sp\u00fclkasten ist die Verschlei\u00dfkomponente: Dichtungen und Ventile sollten nach 15\u201320 Jahren getauscht werden (Kosten: 20\u201340 \u20ac, \u00fcber die Dr\u00fcckerplatten-\u00d6ffnung erreichbar). Geberit garantiert 25 Jahre Ersatzteilverf\u00fcgbarkeit.</p>

<h3>Vorwandelement oder Stand-WC \u2014 was ist besser?</h3>
<p>Ein Wand-WC mit Vorwandelement ist in fast allen F\u00e4llen die modernere und praktischere L\u00f6sung: Der Boden ist durchgehend (einfacher zu putzen), das Bad wirkt gr\u00f6\u00dfer, und die Sp\u00fclung ist leiser. Ein Stand-WC lohnt sich nur, wenn keine Vorwand m\u00f6glich ist (z.B. bei sehr alten Abwasserleitungen, die nicht versetzt werden k\u00f6nnen).</p>`;

// ─── GEBERIT SIGMA DRÜCKERPLATTE ──────────────────────────────

const geberitContent = `<p>Die Dr\u00fcckerplatte ist das Einzige, was man von der WC-Installation sieht \u2014 und Geberit hat das verstanden. Mit \u00fcber 20 Modellen in der Sigma-Serie gibt es f\u00fcr jedes Bad das passende Design: von der schlichten 25-\u20ac-Taste bis zur 500-\u20ac-Glasplatte mit Geruchsabsaugung. Dieser Guide hilft dir, das richtige Modell zu finden.</p>

<h2>Sigma-Modelle im \u00dcberblick</h2>

<table>
<thead>
<tr><th>Modell</th><th>Material</th><th>Tasten</th><th>Preis (ca.)</th><th>Besonderheiten</th></tr>
</thead>
<tbody>
<tr><td><strong>Sigma01</strong></td><td>Kunststoff</td><td>2 (rund)</td><td>25\u201340 \u20ac</td><td>G\u00fcnstigstes Modell, viele Farben</td></tr>
<tr><td><strong>Sigma10</strong></td><td>Kunststoff</td><td>1 (Start/Stopp)</td><td>35\u201360 \u20ac</td><td>Ein-Tasten-Bedienung, sp\u00fclstopp</td></tr>
<tr><td><strong>Sigma20</strong></td><td>Kunststoff</td><td>2 (rund)</td><td>40\u201370 \u20ac</td><td>Meistverkauftes Modell, Wei\u00df/Chrom</td></tr>
<tr><td><strong>Sigma30</strong></td><td>Kunststoff</td><td>2 (eckig)</td><td>45\u201380 \u20ac</td><td>Eckiges Design, Dual-Flush</td></tr>
<tr><td><strong>Sigma40</strong></td><td>Glas / Kunststoff</td><td>2 (fl\u00e4chig)</td><td>200\u2013350 \u20ac</td><td>Integrierte Geruchsabsaugung</td></tr>
<tr><td><strong>Sigma50</strong></td><td>Glas / Metall</td><td>2 (fl\u00e4chig)</td><td>120\u2013250 \u20ac</td><td>Wechselbare Designplatten</td></tr>
<tr><td><strong>Sigma60</strong></td><td>Glas</td><td>2 (fl\u00e4chig)</td><td>180\u2013280 \u20ac</td><td>Randlos, fl\u00e4chenb\u00fcndiger Einbau</td></tr>
<tr><td><strong>Sigma70</strong></td><td>Glas / Edelstahl</td><td>2 (fl\u00e4chig)</td><td>200\u2013320 \u20ac</td><td>Nur 2 mm d\u00fcnn, ultra-minimalistisch</td></tr>
<tr><td><strong>Sigma80</strong></td><td>Glas / Spiegel</td><td>2 (ber\u00fchrungslos)</td><td>400\u2013550 \u20ac</td><td>Ber\u00fchrungslose Ausl\u00f6sung, IR-Sensor</td></tr>
</tbody>
</table>

<p>Alle Sigma-Dr\u00fcckerplatten verwenden die <strong>2-Mengen-Sp\u00fclung</strong> (kleine Taste: 3 Liter, gro\u00dfe Taste: 6 Liter), au\u00dfer der Sigma10 (Start/Stopp-Prinzip).</p>

<h2>Welches Modell f\u00fcr welchen Einsatz?</h2>

<h3>Budget: Sigma01 oder Sigma20</h3>
<p>Die <strong>Sigma20</strong> ist der Klassiker \u2014 die meistverkaufte Dr\u00fcckerplatte Deutschlands. Wei\u00df mit Chrom-Akzent, zwei runde Tasten, saubere Optik. F\u00fcr 40\u201370 \u20ac bekommt man eine solide, zeitlose Platte, die in jedes Bad passt. Wer noch g\u00fcnstiger will, nimmt die <strong>Sigma01</strong> (komplett einfarbig, ab 25 \u20ac).</p>

<h3>Design-Bad: Sigma50 oder Sigma70</h3>
<p>Die <strong>Sigma50</strong> hat wechselbare Designplatten \u2014 du kannst die Oberfl\u00e4che sp\u00e4ter \u00e4ndern (z.B. von Wei\u00df auf Schwarz oder Holzoptik). Die <strong>Sigma70</strong> ist nur 2 mm d\u00fcnn und sitzt nahezu fl\u00e4chenb\u00fcndig \u2014 perfekt f\u00fcr minimalistische B\u00e4der mit gro\u00dfformatigen Fliesen.</p>

<h3>Hygiene-Fokus: Sigma80</h3>
<p>Die <strong>Sigma80</strong> wird ber\u00fchrungslos per Infrarot-Sensor ausgel\u00f6st \u2014 ideal f\u00fcr Arztpraxen, B\u00fcros oder wenn du maximale Hygiene willst. Hoher Preis (400\u2013550 \u20ac), braucht Stromanschluss (Batterie oder Netz).</p>

<h3>Gegen Ger\u00fcche: Sigma40</h3>
<p>Die <strong>Sigma40</strong> hat eine integrierte Geruchsabsaugung mit Aktivkohlefilter \u2014 die Luft wird direkt an der WC-Keramik abgesaugt, bevor der Geruch in den Raum gelangt. Sinnvoll bei innenliegenden B\u00e4dern ohne Fenster. Filter muss alle 6\u201312 Monate getauscht werden (ca. 15 \u20ac).</p>

<h2>Kompatibilit\u00e4t: Was passt wozu?</h2>

<p>Alle Sigma-Dr\u00fcckerplatten passen auf <strong>alle Geberit Duofix</strong> und <strong>Geberit Kombifix</strong> Vorwandelemente mit Sigma-Sp\u00fclkasten (UP300 und UP320). Die Standard-Einbau\u00f6ffnung ist 24,3 \u00d7 16,4 cm.</p>

<p><strong>NICHT kompatibel</strong> mit:</p>
<ul>
<li>Geberit Omega-Sp\u00fclk\u00e4sten (brauchen Omega-Platten)</li>
<li>TECE, Grohe, Viega \u2014 diese Hersteller haben eigene Systeme</li>
<li>\u00c4lteren Geberit-Sp\u00fclk\u00e4sten (vor 2002, UP200-Serie) \u2014 hier gibt es Adapterrahmen</li>
</ul>

<p><strong>Tipp:</strong> Wenn du ein <a href="/bad/vorwandelement-wc">neues Vorwandelement</a> kaufst, ist der Sigma-Sp\u00fclkasten bereits integriert. Du musst nur noch die Dr\u00fcckerplatte separat w\u00e4hlen.</p>

<h2>Montage: So einfach geht\u2019s</h2>

<p>Die Montage einer Sigma-Dr\u00fcckerplatte dauert <strong>weniger als 5 Minuten</strong> und braucht kein Werkzeug:</p>

<ol>
<li><strong>Schutzplatte entfernen:</strong> Die blaue Schutzabdeckung abnehmen, die w\u00e4hrend der Bauphase den Sp\u00fclkasten sch\u00fctzt.</li>
<li><strong>Sp\u00fclmengen einstellen:</strong> Am Sp\u00fclkasten gibt es zwei Einstellr\u00e4der f\u00fcr die kleine und gro\u00dfe Sp\u00fclmenge (Standard: 3 und 6 Liter). Kannst du nach Bedarf anpassen.</li>
<li><strong>Dr\u00fcckerstangen einsetzen:</strong> Die mitgelieferten Stangen in die Ausl\u00f6seventile stecken (einfach eindr\u00fccken).</li>
<li><strong>Platte aufsetzen:</strong> Dr\u00fcckerplatte gerade auf die \u00d6ffnung setzen und einclipsen. Ein h\u00f6rbares \u201eKlick\u201c best\u00e4tigt den korrekten Sitz.</li>
<li><strong>Funktion testen:</strong> Beide Tasten dr\u00fccken und pr\u00fcfen, ob die Sp\u00fclung ausl\u00f6st.</li>
</ol>

<p><strong>Demontage</strong> (f\u00fcr Wartung): An den seitlichen Clips dr\u00fccken und die Platte nach vorne abziehen. Dahinter erreichst du den Sp\u00fclkasten f\u00fcr Wartung oder Reparatur.</p>

<h2>Unsere Empfehlungen</h2>

<p><strong>Bestseller:</strong> <a href="https://www.amazon.de/s?k=Geberit+Sigma20+Dr%C3%BCckerplatte+wei%C3%9F+chrom&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Geberit Sigma20 (wei\u00df/chrom)</a> (ca. 40\u201365 \u20ac) \u2014 Zwei runde Tasten, sauberes Wei\u00df mit verchromtem Rahmen. Passt zu praktisch jeder Bad-Gestaltung. Zeitlos, unkompliziert, preiswert.</p>

<p><strong>Design-Tipp:</strong> <a href="https://www.amazon.de/s?k=Geberit+Sigma70+Dr%C3%BCckerplatte&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Geberit Sigma70</a> (ca. 200\u2013300 \u20ac) \u2014 Nur 2 mm d\u00fcnne Glasplatte, nahezu fl\u00e4chenb\u00fcndig. In Wei\u00df, Schwarz und Edelstahl erh\u00e4ltlich. Ein echtes Design-Statement f\u00fcr minimalistische B\u00e4der.</p>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Geberit+Sigma01+Dr%C3%BCckerplatte&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Geberit Sigma01</a> (ca. 25\u201340 \u20ac) \u2014 Die g\u00fcnstigste Sigma-Platte. Komplett einfarbig (Wei\u00df, Chrom, Schwarz), schlichtes Design. Funktional identisch mit der Sigma20, nur ohne Chrom-Akzent.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Welche Geberit-Dr\u00fcckerplatte ist die beste?</h3>
<p>F\u00fcr die meisten B\u00e4der die <strong>Sigma20</strong> \u2014 zeitloses Design, faire Preis, zuverl\u00e4ssige Technik. Wenn du ein minimalistisches Design-Bad planst, lohnt sich der Aufpreis f\u00fcr die Sigma70 (fl\u00e4chenb\u00fcndig). Die Sigma40 mit Geruchsabsaugung empfehlen wir nur f\u00fcr fensterlose B\u00e4der.</p>

<h3>Kann ich die Dr\u00fcckerplatte sp\u00e4ter wechseln?</h3>
<p>Ja, jederzeit. Alle Sigma-Platten verwenden das gleiche Clip-System. Du kannst z.B. eine billige Sigma01 w\u00e4hrend der Bauphase verwenden und sp\u00e4ter auf eine Sigma70 upgraden. Der Wechsel dauert unter 5 Minuten, ohne die Fliesen zu besch\u00e4digen.</p>

<h3>Passt eine Sigma-Platte auf ein Grohe- oder TECE-Element?</h3>
<p>Nein. Sigma-Dr\u00fcckerplatten passen <strong>nur</strong> auf Geberit-Sp\u00fclk\u00e4sten (UP300/UP320). Grohe, TECE und Viega haben eigene, inkompatible Systeme. Beim Kauf eines <a href="/bad/vorwandelement-wc">Vorwandelements</a> legst du dich auf das Dr\u00fcckerplatten-System des Herstellers fest.</p>

<h3>Wie stelle ich die Sp\u00fclmenge ein?</h3>
<p>Dr\u00fcckerplatte abclipsen, am Sp\u00fclkasten findest du zwei Einstellr\u00e4der. Die kleine Sp\u00fclung ist ab Werk auf 3 Liter, die gro\u00dfe auf 6 Liter eingestellt. Du kannst die kleine auf 2 Liter reduzieren (spart Wasser, reicht f\u00fcr Urin) oder die gro\u00dfe auf 7,5 Liter erh\u00f6hen (bei schlechtem Gef\u00e4lle n\u00f6tig).</p>

<h3>Braucht die Sigma80 (ber\u00fchrungslos) Strom?</h3>
<p>Ja. Die Sigma80 hat einen Infrarot-Sensor, der entweder mit <strong>Batterien</strong> (4\u00d7 AA, Laufzeit ca. 2 Jahre) oder \u00fcber einen <strong>Netzanschluss</strong> (230 V, muss bei der Vorwand-Installation vorgesehen werden) betrieben wird. F\u00fcr privat empfehlen wir den Batteriebetrieb \u2014 einfacher zu installieren.</p>`;

async function run() {
  console.log("=== VORWANDELEMENT WC ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten?slug=eq.vorwandelement-wc", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Vorwandelement WC einbauen \u2014 Kosten, Ma\u00dfe & Anleitung (2026)",
      seo_title: "Vorwandelement WC: Kosten, Ma\u00dfe & Einbau-Anleitung (2026)",
      seo_description:
        "Vorwandelement f\u00fcr Wand-WC: Was kostet es, welche Ma\u00dfe braucht man, und kann man es selbst einbauen? Marken-Vergleich, Kosten\u00fcbersicht und Schritt-f\u00fcr-Schritt Anleitung.",
      content_md: vorwandContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d1 = await res1.json();
  console.log(res1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  console.log("\n=== GEBERIT SIGMA ===");
  const res2 = await fetch(BASE + "/rest/v1/seiten?slug=eq.geberit-sigma-drueckerplatte", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Geberit Sigma Dr\u00fcckerplatte \u2014 alle Modelle im Vergleich (2026)",
      seo_title: "Geberit Sigma Dr\u00fcckerplatte: Alle Modelle im Vergleich (2026)",
      seo_description:
        "Geberit Sigma01 bis Sigma80: Welche Dr\u00fcckerplatte passt? Alle Modelle, Preise, Kompatibilit\u00e4t und Montage im \u00dcberblick.",
      content_md: geberitContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d2 = await res2.json();
  console.log(res2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));
}

run();

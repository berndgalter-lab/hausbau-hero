const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

// ─── 1. DECKENSTÜTZE ─────────────────────────────────────────

const deckenstuetzeContent = `<p>Ob Betondecke gie\u00dfen, Decke abst\u00fctzen w\u00e4hrend einer Wandentfernung oder Schalung fixieren \u2014 ohne Deckenst\u00fctzen geht auf der Baustelle fast nichts. In diesem Guide erkl\u00e4ren wir, welche Typen es gibt, welche Traglasten du brauchst, und ob Kaufen oder Mieten g\u00fcnstiger ist.</p>

<h2>Wann brauchst du Deckenst\u00fctzen?</h2>

<ul>
<li><strong>Betonage:</strong> Die h\u00e4ufigste Anwendung. Deckenst\u00fctzen tragen die Schaltafeln, auf die der Frischbeton gegossen wird, bis er ausgehärtet ist (mindestens 28 Tage f\u00fcr volle Festigkeit).</li>
<li><strong>Wand entfernen:</strong> Wenn eine tragende Wand ge\u00f6ffnet oder entfernt wird, m\u00fcssen Deckenst\u00fctzen die Last vor\u00fcbergehend \u00fcbernehmen, bis der neue Sturz eingebaut ist.</li>
<li><strong>Sanierung:</strong> Abst\u00fctzen von besch\u00e4digten Decken, R\u00fcckbau, Ausschachtung unter bestehenden Geb\u00e4uden.</li>
<li><strong>Dachstuhl:</strong> Tempor\u00e4res Abst\u00fctzen von Dachsparren bei Umbauarbeiten.</li>
</ul>

<p><strong>Wichtig:</strong> Tragende Konstruktionen d\u00fcrfen <strong>nur mit statischer Berechnung</strong> abgest\u00fctzt werden. Die Anzahl, Position und Traglast der St\u00fctzen muss ein Statiker oder erfahrener Bauleiter festlegen. Falsch gesetzte St\u00fctzen k\u00f6nnen zum Einsturz f\u00fchren.</p>

<h2>Arten von Deckenst\u00fctzen</h2>

<table>
<thead>
<tr><th>Typ</th><th>Traglast</th><th>H\u00f6he</th><th>Einsatz</th><th>Preis (Kauf)</th></tr>
</thead>
<tbody>
<tr><td><strong>Stahlrohr-St\u00fctze (Standard)</strong></td><td>20\u201330 kN</td><td>1,7\u20133,0 m</td><td>Deckenschalung, Wohnungsbau</td><td>25\u201350 \u20ac</td></tr>
<tr><td><strong>Schwerlast-St\u00fctze</strong></td><td>30\u201360 kN</td><td>2,0\u20135,0 m</td><td>Industriebau, hohe Decken</td><td>60\u2013120 \u20ac</td></tr>
<tr><td><strong>Alu-St\u00fctze</strong></td><td>15\u201325 kN</td><td>1,5\u20132,5 m</td><td>Innenausbau, leichte Lasten</td><td>40\u201380 \u20ac</td></tr>
<tr><td><strong>Schalungsst\u00fctze (mit Dreifuss)</strong></td><td>20\u201330 kN</td><td>2,0\u20134,0 m</td><td>Professionelle Deckenschalung</td><td>50\u2013100 \u20ac</td></tr>
</tbody>
</table>

<p>Die <strong>Standard-Stahlrohr-St\u00fctze</strong> nach DIN EN 1065 ist das Arbeitstier auf deutschen Baustellen: 20\u201330 kN Traglast (ca. 2\u20133 Tonnen), h\u00f6henverstellbar, robust. Die meisten Heimwerker und kleinen Baustellen kommen mit diesem Typ aus.</p>

<h2>Traglasten verstehen</h2>

<p>Deckenst\u00fctzen werden in <strong>kN</strong> (Kilonewton) bewertet. 1 kN entspricht etwa 100 kg Last.</p>

<table>
<thead>
<tr><th>Traglast</th><th>Entspricht ca.</th><th>Geeignet f\u00fcr</th></tr>
</thead>
<tbody>
<tr><td>20 kN</td><td>2 Tonnen</td><td>Wohnungsbau, d\u00fcnne Decken bis 20 cm</td></tr>
<tr><td>30 kN</td><td>3 Tonnen</td><td>Standard-Betondecken 20\u201325 cm</td></tr>
<tr><td>40\u201360 kN</td><td>4\u20136 Tonnen</td><td>Schwere Decken, Industriebau</td></tr>
</tbody>
</table>

<p><strong>Faustregel f\u00fcr die Anzahl:</strong> Bei einer 20 cm Betondecke rechnet man mit ca. 500 kg/m\u00b2 Eigenlast + Verkehrslast. Pro St\u00fctze (20 kN) kann man also ca. 4 m\u00b2 abst\u00fctzen. F\u00fcr eine 30 m\u00b2 Decke braucht man mindestens 8 St\u00fctzen. <strong>Immer den Statiker fragen!</strong></p>

<p>\u2192 <a href="/rechner/beton">Berechne wie viel Beton du f\u00fcr deine Decke brauchst \u2192</a></p>

<h2>Kaufen vs. Mieten</h2>

<table>
<thead>
<tr><th></th><th>Kaufen</th><th>Mieten</th></tr>
</thead>
<tbody>
<tr><td><strong>Preis pro St\u00fctze</strong></td><td>25\u201350 \u20ac</td><td>1\u20133 \u20ac/Tag</td></tr>
<tr><td><strong>Lohnt sich ab</strong></td><td>Nutzung > 2\u20133 Wochen</td><td>Einmaliger Einsatz</td></tr>
<tr><td><strong>10 St\u00fctzen, 4 Wochen</strong></td><td>250\u2013500 \u20ac (einmalig)</td><td>280\u2013840 \u20ac</td></tr>
<tr><td><strong>Lagerung</strong></td><td>Braucht Platz</td><td>Kein Problem</td></tr>
<tr><td><strong>Zustand</strong></td><td>Neu, garantiert DIN-konform</td><td>Gepr\u00fcft, aber gebraucht</td></tr>
</tbody>
</table>

<p><strong>Empfehlung:</strong> F\u00fcr einen einzelnen Deckenabschnitt (Betonage, 4 Wochen Standzeit) lohnt sich oft der <strong>Kauf</strong> \u2014 die St\u00fctzen kosten wenig, und du kannst sie danach weiterverkaufen. Beim Mieten zahlst du bei 4+ Wochen Standzeit schnell mehr als den Kaufpreis.</p>

<h2>Sicherheitshinweise</h2>

<ul>
<li><strong>Nur auf tragf\u00e4higem Untergrund aufstellen:</strong> Betonboden, Stahlplatte oder Bohle als Lastverteilung. Nie auf weichem Boden oder losem Schotter.</li>
<li><strong>Lotrecht aufstellen:</strong> St\u00fctzen m\u00fcssen senkrecht stehen. Schr\u00e4g belastete St\u00fctzen knicken ab \u2014 Lebensgefahr.</li>
<li><strong>Auszugsl\u00e4nge beachten:</strong> Die maximale H\u00f6he ist auf der St\u00fctze gestempelt. \u00dcberschreite sie nie \u2014 die Traglast sinkt drastisch.</li>
<li><strong>Nicht auf beschaedigte St\u00fctzen vertrauen:</strong> Verbogene Rohre, defekte Gewinde oder fehlende Sicherungsbolzen = sofort aussortieren.</li>
<li><strong>DIN EN 1065 beachten:</strong> Nur gepr\u00fcfte St\u00fctzen verwenden. Billige Import-St\u00fctzen ohne DIN-Kennzeichnung sind ein Sicherheitsrisiko.</li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Standard:</strong> <a href="https://www.amazon.de/s?k=Deckenst%C3%BCtze+Stahlrohr+DIN+EN+1065+h%C3%B6henverstellbar&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Stahlrohr-Deckenst\u00fctze DIN EN 1065</a> (ca. 25\u201345 \u20ac) \u2014 H\u00f6henverstellbar von ca. 1,7 bis 3,0 m, 20\u201330 kN Traglast. Im Multipack (4er oder 10er) deutlich g\u00fcnstiger.</p>

<p><strong>F\u00fcr hohe R\u00e4ume:</strong> <a href="https://www.amazon.de/s?k=Deckenst%C3%BCtze+Schwerlast+4m+h%C3%B6henverstellbar&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Schwerlast-Deckenst\u00fctze bis 4 m</a> (ca. 60\u2013100 \u20ac) \u2014 F\u00fcr Altbau mit 3,5+ m Raumh\u00f6he oder Industriebauten. H\u00f6here Traglast (30\u201340 kN).</p>

<p><strong>Zubeh\u00f6r:</strong> <a href="https://www.amazon.de/s?k=Deckenst%C3%BCtze+Dreifuss+Stativ&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Dreifu\u00df-Stativ f\u00fcr Deckenst\u00fctzen</a> (ca. 15\u201330 \u20ac) \u2014 H\u00e4lt die St\u00fctze beim Aufstellen stabil, bevor sie unter Last steht. Besonders wichtig beim Arbeiten ohne Helfer.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Wie viele Deckenst\u00fctzen brauche ich?</h3>
<p>Das h\u00e4ngt von der Deckenlast, der Deckendicke und dem Abstand der St\u00fctzen ab. <strong>Grobe Faustregel</strong> f\u00fcr eine 20 cm Betondecke: eine St\u00fctze (20 kN) pro 3\u20134 m\u00b2. F\u00fcr eine 30 m\u00b2 Decke also mindestens 8\u201310 St\u00fctzen. Diese Faustregel ersetzt <strong>keine statische Berechnung</strong> \u2014 lass die Anzahl immer vom Statiker festlegen.</p>

<h3>Wie lange m\u00fcssen Deckenst\u00fctzen stehen bleiben?</h3>
<p>Bei Betondecken mindestens <strong>28 Tage</strong> (bei Normalzement und \u00fcber 5\u00b0C). In dieser Zeit erreicht der Beton seine Normfestigkeit. Bei kalter Witterung oder Schnellzement k\u00f6nnen die Fristen abweichen. Fr\u00fchestens nach 7 Tagen darf teilweise ausger\u00fcstet werden \u2014 auch hier entscheidet der Statiker.</p>

<h3>Kann ich gebrauchte Deckenst\u00fctzen verwenden?</h3>
<p>Ja, solange sie in einwandfreiem Zustand sind: kein verbogenes Rohr, funktionierendes Gewinde, vorhandener Sicherungsbolzen, keine starke Korrosion. Pr\u00fcfe au\u00dferdem die DIN-EN-1065-Kennzeichnung und die gestempelte Traglast. Besch\u00e4digte St\u00fctzen sofort entsorgen \u2014 eine nachgebende St\u00fctze unter Last ist lebensgef\u00e4hrlich.</p>

<h3>Was kostet es, Deckenst\u00fctzen zu mieten?</h3>
<p>Typisch <strong>1\u20133 \u20ac pro St\u00fctze pro Tag</strong> bei Baumaschinenverleihen. F\u00fcr 10 St\u00fctzen \u00fcber 4 Wochen zahlst du also 280\u2013840 \u20ac. Ab einer Standzeit von 2\u20133 Wochen ist der Kauf (25\u201350 \u20ac/St\u00fcck) oft g\u00fcnstiger \u2014 besonders wenn du die St\u00fctzen danach weiterverkaufst.</p>`;

// ─── 2. MAUERNUTFRÄSE ────────────────────────────────────────

const mauernutContent = `<p>Elektroleitungen m\u00fcssen in die Wand \u2014 und daf\u00fcr braucht man Schlitze. Mit Hammer und Mei\u00dfel dauert ein einzelner Schlitz 30 Minuten. Mit einer Mauernutfr\u00e4se sind es 30 Sekunden. Die Frage ist: Lohnt sich der Kauf, oder reicht es, die Maschine zu mieten?</p>

<h2>Was ist eine Mauernutfr\u00e4se?</h2>

<p>Eine Mauernutfr\u00e4se (auch: Schlitzfr\u00e4se, Wandfr\u00e4se) schneidet mit <strong>zwei parallelen Diamant-Trennscheiben</strong> saubere Schlitze in Mauerwerk, Beton und Putz. Der Abstand der Scheiben bestimmt die Schlitzbreite, die Eintauchtiefe die Schlitztiefe. Der Mauerstreifen zwischen den Schnitten wird anschlie\u00dfend mit Hammer und Mei\u00dfel herausgeschlagen.</p>

<p><strong>Typische Einsatzbereiche:</strong></p>
<ul>
<li>Elektro-Installationsschlitze (die h\u00e4ufigste Anwendung)</li>
<li>Wasserleitungen verlegen</li>
<li>Heizungsrohre in der Wand versenken</li>
<li>Nachtr\u00e4gliche Kabelkan\u00e4le</li>
</ul>

<h2>Kaufen vs. Mieten</h2>

<table>
<thead>
<tr><th></th><th>Kaufen</th><th>Mieten</th></tr>
</thead>
<tbody>
<tr><td><strong>Preis</strong></td><td>150\u2013600 \u20ac</td><td>30\u201360 \u20ac/Tag</td></tr>
<tr><td><strong>Diamantscheiben inklusive</strong></td><td>Meist ja (Basis-Set)</td><td>Ja</td></tr>
<tr><td><strong>Staubabsaugung inklusive</strong></td><td>Selten (Adapter oft dabei)</td><td>Oft ja (mit Sauger)</td></tr>
<tr><td><strong>Lohnt sich ab</strong></td><td>Komplettrenovierung, mehrere Projekte</td><td>Einzelner Raum, einmaliger Einsatz</td></tr>
<tr><td><strong>1 Tag Schlitze fr\u00e4sen</strong></td><td>150\u2013600 \u20ac (einmalig)</td><td>30\u201360 \u20ac</td></tr>
<tr><td><strong>Komplettrenovierung (3\u20135 Tage)</strong></td><td>150\u2013600 \u20ac (einmalig)</td><td>90\u2013300 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Empfehlung:</strong> F\u00fcr ein <strong>einzelnes Zimmer</strong> (1 Tag Arbeit) lohnt sich <strong>Mieten</strong> \u2014 30\u201360 \u20ac ist ein Bruchteil des Kaufpreises. F\u00fcr eine <strong>Komplettrenovierung</strong> oder wenn du regelm\u00e4\u00dfig renovierst, lohnt sich der <strong>Kauf</strong> ab dem Einstiegsmodell (ca. 150 \u20ac).</p>

<h2>Worauf beim Kauf achten?</h2>

<h3>Leistung</h3>
<p>Mindestens <strong>1.400 Watt</strong> f\u00fcr Mauerwerk und Putz. F\u00fcr Beton und Stahlbeton <strong>1.700+ Watt</strong>. Untermotorisierte Ger\u00e4te \u00fcberhitzen und fressen die Diamantscheiben schneller auf.</p>

<h3>Schnitttiefe und -breite</h3>
<ul>
<li><strong>Schnitttiefe:</strong> 30\u201345 mm reicht f\u00fcr Standard-Elektroleitungen. F\u00fcr Wasserrohre brauchst du 50\u201365 mm.</li>
<li><strong>Schlitzbreite:</strong> 8\u201340 mm einstellbar. F\u00fcr Elektro reichen 25\u201330 mm, f\u00fcr Heizungsrohre 35\u201340 mm.</li>
</ul>

<h3>Staubabsaugung</h3>
<p>Das wichtigste Kaufkriterium nach der Leistung. Mauerstaub ist extrem fein und gesundheitssch\u00e4dlich (Quarzstaub!). Kaufe <strong>nur</strong> ein Ger\u00e4t mit Absaug-Anschluss und verwende es <strong>immer</strong> mit einem Industriesauger (Klasse M oder H). Ohne Absaugung ist ein Raum innerhalb von Sekunden eingenebelt.</p>

<h3>Scheibendurchmesser</h3>
<p>Standard: <strong>125 mm oder 150 mm</strong>. Gr\u00f6\u00dfere Scheiben = gr\u00f6\u00dfere Schnitttiefe. 125 mm reicht f\u00fcr die meisten Elektroschlitze. 150 mm f\u00fcr Wasserleitungen und tiefere Schlitze.</p>

<h2>Marken im \u00dcberblick</h2>

<table>
<thead>
<tr><th>Marke</th><th>Preissegment</th><th>Besonderheiten</th></tr>
</thead>
<tbody>
<tr><td><strong>Bosch Professional</strong></td><td>250\u2013500 \u20ac</td><td>Zuverl\u00e4ssig, guter Service, GNF 35 CA als Referenz</td></tr>
<tr><td><strong>Makita</strong></td><td>200\u2013450 \u20ac</td><td>Langlebige Motoren, SG1251J beliebt</td></tr>
<tr><td><strong>Einhell</strong></td><td>100\u2013200 \u20ac</td><td>Budget-Einstieg, f\u00fcr gelegentlichen Einsatz ausreichend</td></tr>
<tr><td><strong>Hilti</strong></td><td>800\u20131.500 \u20ac</td><td>Profi-Segment, f\u00fcr t\u00e4glichen Einsatz auf der Baustelle</td></tr>
</tbody>
</table>

<p>\u2192 <a href="/rechner/elektro">Berechne deinen Elektro-Bedarf \u2192</a></p>

<h2>Unsere Empfehlungen</h2>

<p><strong>Preis-Leistung:</strong> <a href="https://www.amazon.de/s?k=Einhell+Mauernutfr%C3%A4se+TC-MA+1300&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Einhell TC-MA 1300</a> (ca. 100\u2013150 \u20ac) \u2014 1.320 Watt, 125-mm-Scheiben, Schnitttiefe bis 30 mm, Schlitzbreite 8\u201330 mm. Inkl. 2 Diamantscheiben und Absaugadapter. F\u00fcr Heimwerker, die 1\u20132x pro Jahr Schlitze brauchen, mehr als genug.</p>

<p><strong>Profi-Einstieg:</strong> <a href="https://www.amazon.de/s?k=Bosch+GNF+35+CA+Mauernutfr%C3%A4se&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Bosch GNF 35 CA</a> (ca. 350\u2013450 \u20ac) \u2014 1.400 Watt, Schnitttiefe bis 35 mm, Schlitzbreite bis 39 mm. Die Referenz-Mauernutfr\u00e4se f\u00fcr ambitionierte Heimwerker und Handwerker. Constant-Electronic f\u00fcr gleichm\u00e4\u00dfige Drehzahl unter Last.</p>

<p><strong>Nur Mieten?</strong> Die meisten Baum\u00e4rkte (OBI, Bauhaus, toom) vermieten Mauernutfr\u00e4sen f\u00fcr 30\u201360 \u20ac/Tag, oft inklusive Industriesauger. F\u00fcr einen einzelnen Raum die g\u00fcnstigste Option.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Kann ich Schlitze auch ohne Mauernutfr\u00e4se machen?</h3>
<p>Ja \u2014 mit Winkelschleifer + Diamantscheibe zwei parallele Schnitte setzen und den Streifen mit Hammer und Mei\u00dfel rausschlagen. Funktioniert, ist aber <strong>extrem staubig</strong> (kein Absauganschluss am Winkelschleifer), langsamer und weniger pr\u00e4zise. F\u00fcr 1\u20132 kurze Schlitze akzeptabel, f\u00fcr einen ganzen Raum nicht empfehlenswert.</p>

<h3>Wie tief darf ich in eine tragende Wand fr\u00e4sen?</h3>
<p>Maximale Schlitztiefe in tragenden W\u00e4nden: <strong>1/6 der Wanddicke</strong>, maximal 25 mm horizontal und 30 mm vertikal (nach DIN 1053-1). Bei einer 24-cm-Wand also max. 30 mm vertikal. Horizontale Schlitze in tragenden W\u00e4nden m\u00f6glichst vermeiden \u2014 sie schw\u00e4chen die Statik. Im Zweifel den Statiker fragen.</p>

<h3>Brauche ich einen Industriesauger?</h3>
<p><strong>Ja, unbedingt.</strong> Mauerstaub enth\u00e4lt Quarzfeinstaub, der die Lungen sch\u00e4digt. Ein normaler Haushaltsstaubsauger reicht nicht \u2014 du brauchst mindestens einen <strong>Klasse-M-Sauger</strong> (f\u00fcr mineralische St\u00e4ube). Kosten: 100\u2013250 \u20ac f\u00fcr ein brauchbares Ger\u00e4t. Beim Mieten ist der Sauger meist inklusive.</p>

<h3>Mauernutfr\u00e4se oder Bohrhammer?</h3>
<p>F\u00fcr <strong>Schlitze</strong> (Leitungen verlegen): Mauernutfr\u00e4se. F\u00fcr <strong>L\u00f6cher und Durchbr\u00fcche</strong>: Bohrhammer. Die Mauernutfr\u00e4se schneidet saubere, parallele Kanten \u2014 ein Bohrhammer mit Mei\u00dfel macht grobe, unsaubere Schlitze. F\u00fcr professionelle Elektroinstallation ist die Mauernutfr\u00e4se unverzichtbar.</p>`;

// ─── 3. SDS-BOHRER-SET ───────────────────────────────────────

const sdsContent = `<p>Wer mit einem Bohrhammer arbeitet, braucht SDS-Bohrer. Aber welches Aufnahme-System, welche Durchmesser, und wie viel Qualit\u00e4t muss es sein? In diesem kompakten Guide kl\u00e4ren wir die wichtigsten Fragen.</p>

<h2>SDS-Plus vs. SDS-Max</h2>

<table>
<thead>
<tr><th></th><th>SDS-Plus</th><th>SDS-Max</th></tr>
</thead>
<tbody>
<tr><td><strong>Schaftdurchmesser</strong></td><td>10 mm</td><td>18 mm</td></tr>
<tr><td><strong>Bohrerdurchmesser</strong></td><td>4\u201330 mm</td><td>12\u201352 mm</td></tr>
<tr><td><strong>Typische L\u00e4ngen</strong></td><td>110\u2013600 mm</td><td>200\u20131.000 mm</td></tr>
<tr><td><strong>Maschine</strong></td><td>Leichter Bohrhammer (2\u20134 kg)</td><td>Schwerer Bohrhammer (5\u201312 kg)</td></tr>
<tr><td><strong>Einsatz</strong></td><td>D\u00fcbel, Kabel, Leitungen im Wohnungsbau</td><td>Durchbr\u00fcche, Kernbohrungen, Stra\u00dfenbau</td></tr>
<tr><td><strong>Preis Set (7\u201312 Bohrer)</strong></td><td>15\u201350 \u20ac</td><td>40\u2013120 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Merke:</strong> <strong>SDS-Plus</strong> ist der Standard f\u00fcr Heimwerker und 90 % aller Bohrhammer-Arbeiten. SDS-Max brauchst du nur f\u00fcr schwere Durchbr\u00fcche und gro\u00dfe Durchmesser (\u00fcber 30 mm). Die Systeme sind <strong>nicht kompatibel</strong> \u2014 ein SDS-Plus-Bohrer passt nicht in einen SDS-Max-Bohrhammer und umgekehrt.</p>

<h2>Welche Durchmesser brauchst du?</h2>

<p>Ein gutes Basis-Set f\u00fcr Heimwerker enth\u00e4lt:</p>

<table>
<thead>
<tr><th>Durchmesser</th><th>Typischer Einsatz</th></tr>
</thead>
<tbody>
<tr><td><strong>5 mm</strong></td><td>D\u00fcbel S5, leichte Befestigungen</td></tr>
<tr><td><strong>6 mm</strong></td><td>D\u00fcbel S6, Standard-Regale, Bilder</td></tr>
<tr><td><strong>8 mm</strong></td><td>D\u00fcbel S8, Schwerlast-Regale, H\u00e4ngeschr\u00e4nke</td></tr>
<tr><td><strong>10 mm</strong></td><td>D\u00fcbel S10, Schwerlastanker, WC-Befestigung</td></tr>
<tr><td><strong>12 mm</strong></td><td>D\u00fcbel S12, Schwerlastd\u00fcbel, TV-Halterungen</td></tr>
<tr><td><strong>14/16 mm</strong></td><td>Schwerlastd\u00fcbel, Chemie-Anker</td></tr>
</tbody>
</table>

<p>Die Durchmesser 6, 8 und 10 mm brauchst du am h\u00e4ufigsten \u2014 die anderen sind f\u00fcr Sonderf\u00e4lle.</p>

<h2>Bohrer-Qualit\u00e4t: Worauf achten?</h2>

<ul>
<li><strong>Hartmetall-Schneide:</strong> Standard bei SDS-Bohrern. F\u00fcr Beton, Ziegel und Naturstein. Billige Sets haben weichere Schneiden, die in Stahlbeton schnell stumpf werden.</li>
<li><strong>4-Schneiden vs. 2-Schneiden:</strong> 4-Schneider-Bohrer (z.B. Bosch SDS-Plus-7X) bohren runder und vibrationsarmer. Lohnt sich ab 8 mm Durchmesser.</li>
<li><strong>Zentrierspitze:</strong> Verhindert Verlaufen beim Anbohren. Bei guten Sets Standard, bei Billig-Sets oft fehlend.</li>
<li><strong>Spiralform:</strong> Tiefe, offene Spirale transportiert Bohrmehl besser ab und verhindert Verklemmen in tiefen L\u00f6chern.</li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Heimwerker-Standard:</strong> <a href="https://www.amazon.de/s?k=Bosch+SDS+Plus+Bohrer+Set+7+teilig&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Bosch SDS-Plus-3 Set (7-teilig)</a> (ca. 15\u201325 \u20ac) \u2014 Durchmesser 5/6/6/8/8/10/12 mm. Solide Qualit\u00e4t f\u00fcr Beton und Mauerwerk. F\u00fcr die meisten Heimwerker-Aufgaben mehr als ausreichend. Das Standardset, das in keiner Werkstatt fehlen sollte.</p>

<p><strong>Premium:</strong> <a href="https://www.amazon.de/s?k=Bosch+SDS+Plus+7X+Bohrer+Set&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Bosch SDS-Plus-7X Set</a> (ca. 35\u201350 \u20ac) \u2014 4-Schneider-Bohrer mit FullCarbide-Kopf. Bohrt auch in Stahlbeton und armierten Decken zuverl\u00e4ssig. Deutlich l\u00e4ngere Standzeit als Standard-Bohrer. Lohnt sich, wenn du regelm\u00e4\u00dfig in Beton bohrst.</p>

<p><strong>SDS-Max (f\u00fcr Durchbr\u00fcche):</strong> <a href="https://www.amazon.de/s?k=SDS+Max+Bohrer+Set+Beton&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">SDS-Max Bohrerset</a> (ca. 40\u2013100 \u20ac) \u2014 F\u00fcr schwere Bohrhammer. Durchmesser ab 12 mm, L\u00e4ngen bis 600+ mm. Nur n\u00f6tig f\u00fcr Durchbr\u00fcche, Kernbohrungen und Befestigungen im Schwerlastbereich.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Kann ich SDS-Plus-Bohrer in einen normalen Bohrschrauber einspannen?</h3>
<p>Nein. SDS-Plus-Bohrer haben einen speziellen Schaft mit Nuten, der nur in SDS-Plus-Bohrfutter passt. F\u00fcr normale Bohrschrauber brauchst du Rundschaft-Bohrer (Zylinderschaft). Es gibt Adapter von SDS-Plus auf Bohrfutter, aber diese sind nur f\u00fcr Bohrungen ohne Schlagwerk geeignet.</p>

<h3>Wie erkenne ich, ob mein Bohrer stumpf ist?</h3>
<p>Drei Anzeichen: (1) Der Bohrer braucht deutlich mehr Druck als fr\u00fcher. (2) Das Bohrloch wird oval statt rund. (3) Der Bohrer wird \u00fcberm\u00e4\u00dfig hei\u00df. Stumpfe Bohrer sofort ersetzen \u2014 sie besch\u00e4digen den Bohrhammer und erzeugen unrunde L\u00f6cher, in denen D\u00fcbel nicht halten.</p>

<h3>SDS-Bohrer f\u00fcr Fliesen?</h3>
<p><strong>Nein.</strong> SDS-Bohrer mit Schlagwerk zerst\u00f6ren Fliesen. F\u00fcr Fliesen brauchst du einen <strong>Fliesenbohrer</strong> (Diamant oder Hartmetall) und musst das Schlagwerk am Bohrhammer <strong>ausschalten</strong>. Erst in die Wand hinter der Fliese darfst du mit dem SDS-Bohrer und Schlagwerk weiterbohren.</p>`;

async function run() {
  console.log("=== DECKENSTÜTZE ===");
  const r1 = await fetch(BASE + "/rest/v1/seiten?slug=eq.deckenstuetze", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Deckenst\u00fctzen: Arten, Traglasten & richtige Verwendung (2026)",
      seo_title: "Deckenst\u00fctzen: Arten, Traglasten & Verwendung (2026)",
      seo_description: "Deckenst\u00fctzen nach DIN EN 1065: Welche Traglast, wie viele, kaufen oder mieten? Typen-Vergleich, Kosten und Sicherheitshinweise.",
      content_md: deckenstuetzeContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d1 = await r1.json();
  console.log(r1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  console.log("\n=== MAUERNUTFRÄSE ===");
  const r2 = await fetch(BASE + "/rest/v1/seiten?slug=eq.mauernutfraese", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Mauernutfr\u00e4se: Wann lohnt sich der Kauf? Kosten & Tipps (2026)",
      seo_title: "Mauernutfr\u00e4se: Kaufen oder mieten? Kosten & Tipps (2026)",
      seo_description: "Mauernutfr\u00e4se f\u00fcr Elektro-Schlitze: Kaufen vs. mieten, worauf achten, welche Marke? Kosten, Schnitttiefe und Produktempfehlungen.",
      content_md: mauernutContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d2 = await r2.json();
  console.log(r2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));

  console.log("\n=== SDS-BOHRER-SET ===");
  const r3 = await fetch(BASE + "/rest/v1/seiten?slug=eq.sds-bohrer-set", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "SDS-Bohrer-Set: Welches brauchst du? (2026)",
      seo_title: "SDS-Bohrer-Set: SDS-Plus vs. SDS-Max \u2014 Welches brauchst du? (2026)",
      seo_description: "SDS-Plus oder SDS-Max? Welche Durchmesser, welche Qualit\u00e4t? Kompakter Ratgeber f\u00fcr das richtige Bohrerset.",
      content_md: sdsContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d3 = await r3.json();
  console.log(r3.ok && d3.length > 0 ? "OK: " + d3[0].slug : "FAIL: " + JSON.stringify(d3));
}

run();

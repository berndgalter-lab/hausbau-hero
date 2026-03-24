const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

// ─── OBERFRÄSE RICHTIG BENUTZEN (aufgefrischt) ───────────────

const oberfraeseContent = `<p>Eine Oberfr\u00e4se ist eines der vielseitigsten Werkzeuge in der Holzbearbeitung: Nuten fr\u00e4sen, Kanten profilieren, Vertiefungen schaffen und komplexe Formen ausschneiden \u2014 alles mit einer Maschine. In dieser Anleitung zeigen wir dir Schritt f\u00fcr Schritt, wie du eine Oberfr\u00e4se richtig bedienst.</p>

<h2>Vorbereitung</h2>

<p>Bevor du mit der Arbeit beginnst:</p>
<ul>
<li><strong>Passenden Fr\u00e4ser w\u00e4hlen:</strong> Nutfr\u00e4ser f\u00fcr Nuten, Kantenfr\u00e4ser f\u00fcr Kanten, Profilfr\u00e4ser f\u00fcr dekorative Profile. Jeder Fr\u00e4ser ist f\u00fcr eine spezifische Aufgabe konzipiert.</li>
<li><strong>Arbeitsplatz einrichten:</strong> Gute Beleuchtung, stabiler Tisch, Werkst\u00fcck sicher fixieren (Schraubzwingen oder Klemmen).</li>
<li><strong>Sicherheitsausr\u00fcstung:</strong> Geh\u00f6rschutz und Schutzbrille sind Pflicht. Staubmaske empfohlen. Keine losen Kleidungsst\u00fccke oder Schmuck tragen.</li>
</ul>

<h2>Grundlegende Techniken</h2>

<p>F\u00fcr Einsteiger sind zwei Techniken besonders relevant:</p>
<ul>
<li><strong>Nuten fr\u00e4sen:</strong> Mit einem Nutfr\u00e4ser und dem Parallelanschlag gleichm\u00e4\u00dfig tiefe Nuten erstellen.</li>
<li><strong>Kanten bearbeiten:</strong> Mit einem Kantenfr\u00e4ser (Abrundfr\u00e4ser, Fasenfr\u00e4ser) Werkst\u00fcckkanten profilieren.</li>
</ul>

<p><strong>Wichtig:</strong> F\u00fchre die Fr\u00e4se <strong>immer gegen die Drehrichtung</strong> des Fr\u00e4sers (Gegenlauffr\u00e4sen). Das verhindert Ausrei\u00dfen und sorgt f\u00fcr ein sauberes Schnittbild.</p>

<h2>Schritt-f\u00fcr-Schritt-Anleitung</h2>

<h3>1. Fr\u00e4ser montieren</h3>
<p>\u00dcberpr\u00fcfe die Aufgabe und w\u00e4hle den passenden Fr\u00e4ser. Montiere ihn fest in der Spannzange. Er muss fest sitzen und darf nicht vibrieren \u2014 ein loser Fr\u00e4ser ist ein Sicherheitsrisiko.</p>

<h3>2. Fr\u00e4stiefe einstellen</h3>
<p>Stelle die gew\u00fcnschte Tiefe an der Skala oder mit dem Revolveranschlag ein. <strong>Nicht zu tief</strong> \u2014 lieber in mehreren flachen Durchg\u00e4ngen arbeiten (max. 3\u20135 mm pro Durchgang bei Hartholz). Das schont Fr\u00e4ser und Werkst\u00fcck.</p>

<h3>3. Drehzahl anpassen</h3>
<p>Die Drehzahl h\u00e4ngt vom Fr\u00e4serdurchmesser und Material ab:</p>
<ul>
<li>Kleine Fr\u00e4ser (\u00d8 < 20 mm): hohe Drehzahl (20.000\u201325.000 U/min)</li>
<li>Gro\u00dfe Fr\u00e4ser (\u00d8 > 40 mm): niedrige Drehzahl (12.000\u201316.000 U/min)</li>
<li>Harthölzer: etwas niedrigere Drehzahl als Weichholz</li>
</ul>

<h3>4. Werkst\u00fcck fixieren</h3>
<p>Fixiere das Werkst\u00fcck sicher mit Klemmen oder Schraubzwingen. Es darf sich w\u00e4hrend des Fr\u00e4sens nicht bewegen. Stelle sicher, dass der Fr\u00e4sbereich frei von Hindernissen ist.</p>

<h3>5. Fr\u00e4sen</h3>
<p>F\u00fchre die Fr\u00e4se fest und gleichm\u00e4\u00dfig. Nutze den Parallelanschlag f\u00fcr gerade Linien, eine Schablone f\u00fcr Formen. Vermeide abrupte Bewegungen \u2014 gleichm\u00e4\u00dfiger Vorschub ist der Schl\u00fcssel zu sauberen Ergebnissen.</p>

<h3>6. Spezielle Techniken</h3>
<ul>
<li><strong>Nuten:</strong> Nutfr\u00e4ser verwenden. In mehreren Durchg\u00e4ngen die volle Tiefe erreichen.</li>
<li><strong>Kanten:</strong> Kantenfr\u00e4ser mit Anlaufring verwenden. Der Ring l\u00e4uft am Werkst\u00fcck entlang und f\u00fchrt den Fr\u00e4ser.</li>
<li><strong>Schablonen:</strong> Kopierh\u00fclse montieren und die Fr\u00e4se entlang einer Schablone f\u00fchren f\u00fcr reproduzierbare Formen.</li>
</ul>

<h3>7. Nachbereitung</h3>
<p>Fr\u00e4se ausschalten und warten, bis der Fr\u00e4ser vollst\u00e4ndig steht. Ergebnis pr\u00fcfen, bei Bedarf nachbessern. Holzsp\u00e4ne und Staub von der Fr\u00e4se entfernen. Fr\u00e4ser auf Abnutzung pr\u00fcfen \u2014 stumpfe Fr\u00e4ser ersetzen oder nachsch\u00e4rfen.</p>

<h2>Fortgeschrittene Tipps</h2>

<ul>
<li><strong>Gegenlauffr\u00e4sen vs. Gleichlauffr\u00e4sen:</strong> Gleichlauffr\u00e4sen (in Drehrichtung) erzeugt ein feineres Finish, erfordert aber mehr Erfahrung. Nur f\u00fcr den letzten Durchgang empfohlen.</li>
<li><strong>Fr\u00e4stisch:</strong> Montiere die Oberfr\u00e4se kopf\u00fcber in einen Fr\u00e4stisch f\u00fcr station\u00e4re Arbeiten. Ideal f\u00fcr Serienteile und schmale Werkst\u00fccke.</li>
<li><strong>Staubabsaugung:</strong> Schlie\u00dfe einen Werkstattsauger an den Absaugstutzen an. Weniger Staub = bessere Sicht und sauberere Schnitte.</li>
</ul>

<h2>Wartung und Pflege</h2>

<p>Nach jedem Gebrauch die Fr\u00e4se reinigen: Holzsp\u00e4ne aus der Spannzange entfernen, F\u00fchrungss\u00e4ulen mit Silikonspray schmieren, Fr\u00e4ser auf Sch\u00e4rfe pr\u00fcfen. Eine gepflegte Oberfr\u00e4se liefert \u00fcber Jahre pr\u00e4zise Ergebnisse.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>In welche Richtung f\u00e4hrt man mit der Oberfr\u00e4se?</h3>
<p>Im Normalfall <strong>gegen die Drehrichtung</strong> des Fr\u00e4sers (Gegenlauffr\u00e4sen). Wenn du auf die Fr\u00e4se von oben schaust, dreht der Fr\u00e4ser im Uhrzeigersinn \u2014 du f\u00fchrst die Fr\u00e4se also von rechts nach links am Werkst\u00fcck entlang. Das verhindert, dass die Fr\u00e4se ins Werkst\u00fcck gezogen wird, und sorgt f\u00fcr saubere Schnitte.</p>

<h3>Wie tief kann man mit einer Oberfr\u00e4se fr\u00e4sen?</h3>
<p>Die maximale Tiefe h\u00e4ngt vom Modell und Fr\u00e4ser ab \u2014 typisch 50\u201370 mm bei gro\u00dfen Oberfr\u00e4sen. <strong>Wichtig:</strong> Nie die volle Tiefe in einem Durchgang fr\u00e4sen. Arbeite in Schritten von 3\u20135 mm (Hartholz) bzw. 5\u20138 mm (Weichholz). Das schont den Fr\u00e4ser und liefert bessere Ergebnisse.</p>

<h3>Was ist eine Kopierh\u00fclse?</h3>
<p>Eine Kopierh\u00fclse (F\u00fchrungsh\u00fclse) wird an der Grundplatte der Oberfr\u00e4se befestigt. Sie f\u00fchrt die Fr\u00e4se entlang einer Schablone, sodass du pr\u00e4zise Formen reproduzieren kannst. Beachte: Der Fr\u00e4serdurchmesser muss kleiner sein als der H\u00fclsendurchmesser \u2014 die Differenz bestimmt den Versatz zur Schablone.</p>`;

// ─── KREUZLINIENLASER RICHTIG BENUTZEN (aufgefrischt) ────────

const laserContent = `<p>Ein Kreuzlinienlaser projiziert pr\u00e4zise horizontale und vertikale Linien an W\u00e4nde, B\u00f6den und Decken. Damit richtest du Regale, Fliesen, Bilder und Elektrodosen millimetergenau aus \u2014 ohne Wasserwaage und Schnurschlag. In dieser Anleitung zeigen wir dir, wie du einen Kreuzlinienlaser richtig bedienst.</p>

<h2>Was ist ein Kreuzlinienlaser?</h2>

<p>Ein Kreuzlinienlaser projiziert sichtbare Laserlinien (rot oder gr\u00fcn) an Oberfl\u00e4chen. Die meisten Ger\u00e4te sind <strong>selbstnivellierend</strong>: Sie finden automatisch die waagerechte/senkrechte Ausrichtung, solange sie nicht st\u00e4rker als 3\u20134\u00b0 geneigt sind. Gr\u00fcne Laser sind besser sichtbar als rote, kosten aber mehr.</p>

<h2>Typische Einsatzbereiche</h2>

<ul>
<li><strong>Bilder und Regale ausrichten:</strong> Horizontale Linie projizieren, daran ausrichten, fertig.</li>
<li><strong>Fliesen verlegen:</strong> Kreuzlinie als Startpunkt f\u00fcr die erste Fliesenreihe. Exakte 90\u00b0-Winkel.</li>
<li><strong>Elektrodosen setzen:</strong> Einheitliche H\u00f6he f\u00fcr Steckdosen und Schalter im ganzen Raum.</li>
<li><strong>Trockenbau:</strong> Metallprofile pr\u00e4zise ausrichten, St\u00e4nderwerk lotrecht setzen.</li>
<li><strong>Boden nivellieren:</strong> H\u00f6henunterschiede erkennen, Estrich oder Ausgleichsmasse planen.</li>
</ul>

<h2>Schritt-f\u00fcr-Schritt-Anleitung</h2>

<h3>1. Aufstellen</h3>
<p>Stelle den Laser auf eine stabile, ersch\u00fctterungsfreie Fl\u00e4che. Am besten auf einem Stativ \u2014 damit kannst du die H\u00f6he exakt einstellen. Ohne Stativ: auf einen Tisch, eine Leiter-Ablage oder direkt auf den Boden.</p>

<h3>2. Einschalten und nivellieren lassen</h3>
<p>Schalte den Laser ein. Bei selbstnivellierenden Ger\u00e4ten beginnt ein Pendel zu schwingen und richtet sich automatisch aus (dauert 2\u20135 Sekunden). Wenn der Laser blinkt, steht er zu schr\u00e4g \u2014 Standort korrigieren.</p>

<h3>3. Linie positionieren</h3>
<p>Drehe den Laser auf dem Stativ, bis die Linie genau dort projiziert wird, wo du sie brauchst. Bei vielen Ger\u00e4ten kannst du zwischen horizontaler, vertikaler oder Kreuzlinie umschalten.</p>

<h3>4. Markieren</h3>
<p>Markiere die gew\u00fcnschten Punkte entlang der Laserlinie mit Bleistift. Wenn du mehrere Punkte in einer Linie brauchst (z.B. D\u00fcbell\u00f6cher f\u00fcr ein Regal), markierst du die Positionen einzeln entlang der projizierten Linie.</p>

<h3>5. Arbeiten</h3>
<p>Bohre, verschraube oder verlege entlang deiner Markierungen. Bei l\u00e4ngeren Arbeiten lass den Laser an \u2014 so kannst du jederzeit kontrollieren, ob alles noch in der Flucht ist.</p>

<h2>Tipps f\u00fcr bessere Ergebnisse</h2>

<ul>
<li><strong>Gr\u00fcner Laser bei Tageslicht:</strong> Gr\u00fcne Laserlinien sind 4x besser sichtbar als rote. Bei Tageslicht-Arbeiten lohnt sich ein gr\u00fcner Laser.</li>
<li><strong>Empf\u00e4nger f\u00fcr Au\u00dfen:</strong> Im Freien ist die Laserlinie meist unsichtbar. Nutze einen Laserempf\u00e4nger (Detektor), der das Signal per Piepton anzeigt.</li>
<li><strong>Nicht auf den Laser treten:</strong> Selbstnivellierung ist empfindlich. Ein Tritt auf den Boden kann die Kalibrierung verfälschen.</li>
<li><strong>Batterien pr\u00fcfen:</strong> Schwache Batterien = schwache Linie = ungenaue Ergebnisse. Immer Ersatzbatterien oder einen USB-C-Akku bereithalten.</li>
<li><strong>Regelmäßig kalibrieren:</strong> Pr\u00fcfe alle 6 Monate, ob der Laser noch genau nivelliert. Test: Zwei Punkte an gegen\u00fcberliegenden W\u00e4nden markieren, Laser drehen, Punkte vergleichen.</li>
</ul>

<p>\u2192 <a href="/rechner/trockenbau">Berechne deinen Trockenbau-Bedarf \u2192</a></p>
<p>\u2192 <a href="/rechner/fliesen">Berechne deinen Fliesen-Bedarf \u2192</a></p>

<h2>Kreuzlinienlaser vs. Rotationslaser</h2>

<table>
<thead>
<tr><th></th><th>Kreuzlinienlaser</th><th>Rotationslaser</th></tr>
</thead>
<tbody>
<tr><td><strong>Projektion</strong></td><td>Linie (90\u00b0\u2013180\u00b0)</td><td>360\u00b0-Linie (rundum)</td></tr>
<tr><td><strong>Reichweite</strong></td><td>10\u201330 m</td><td>30\u2013300 m</td></tr>
<tr><td><strong>Preis</strong></td><td>50\u2013300 \u20ac</td><td>200\u20131.500 \u20ac</td></tr>
<tr><td><strong>Bester Einsatz</strong></td><td>Innenr\u00e4ume, Heimwerker</td><td>Gro\u00dfe Baustellen, Au\u00dfen</td></tr>
</tbody>
</table>

<p>F\u00fcr die meisten Heimwerker-Aufgaben reicht ein <strong>Kreuzlinienlaser</strong> v\u00f6llig aus.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Wie genau ist ein Kreuzlinienlaser?</h3>
<p>Typische Genauigkeit: <strong>\u00b1 0,3 mm pro Meter</strong>. Bei einer 5 m langen Wand betr\u00e4gt die maximale Abweichung also ca. 1,5 mm \u2014 f\u00fcr Heimwerker-Arbeiten mehr als ausreichend. Profi-Ger\u00e4te schaffen \u00b1 0,1 mm/m.</p>

<h3>Rot oder gr\u00fcn \u2014 welcher Laser ist besser?</h3>
<p><strong>Gr\u00fcn</strong> ist 4x besser sichtbar als Rot, besonders bei Tageslicht. Daf\u00fcr verbrauchen gr\u00fcne Laser mehr Strom und kosten 30\u201350 % mehr. F\u00fcr Innenr\u00e4ume mit wenig Tageslicht reicht Rot. F\u00fcr helle R\u00e4ume, Werkst\u00e4tten und Au\u00dfenarbeit lohnt sich Gr\u00fcn.</p>

<h3>Kann ich einen Kreuzlinienlaser drau\u00dfen verwenden?</h3>
<p>Bedingt. Bei direktem Sonnenlicht ist die Laserlinie meist unsichtbar. L\u00f6sung: Einen <strong>Laserempf\u00e4nger</strong> (Detektor) verwenden \u2014 der zeigt per Piepton an, wo die Linie ist. F\u00fcr regelm\u00e4\u00dfige Au\u00dfenarbeiten ist ein Rotationslaser mit Empf\u00e4nger besser geeignet.</p>`;

// ─── WASSERWAAGE RICHTIG BENUTZEN (aufgefrischt) ─────────────

const wasserwaageContent = `<p>Die Wasserwaage ist das einfachste und zuverl\u00e4ssigste Werkzeug, um horizontale und vertikale Ausrichtung zu pr\u00fcfen. Ob Regal, Fensterbank oder Pflasterfl\u00e4che \u2014 ohne Wasserwaage geht nichts gerade. In dieser Anleitung erkl\u00e4ren wir, welchen Typ du brauchst und wie du pr\u00e4zise Ergebnisse erzielst.</p>

<h2>Die passende Wasserwaage w\u00e4hlen</h2>

<p>Es gibt verschiedene Typen f\u00fcr unterschiedliche Aufgaben:</p>

<table>
<thead>
<tr><th>Typ</th><th>L\u00e4nge</th><th>Einsatz</th></tr>
</thead>
<tbody>
<tr><td><strong>Torpedo-Wasserwaage</strong></td><td>20\u201330 cm</td><td>Enge R\u00e4ume, Rohrleitungen, kleine Montagen</td></tr>
<tr><td><strong>Handwerker-Wasserwaage</strong></td><td>60\u201380 cm</td><td>Regale, K\u00fcchenmontage, allgemeine Arbeiten</td></tr>
<tr><td><strong>Maurerwasserwaage</strong></td><td>100\u2013200 cm</td><td>Mauerwerk, Estrich, Fliesen, gro\u00dfe Fl\u00e4chen</td></tr>
<tr><td><strong>Elektronische Wasserwaage</strong></td><td>30\u201360 cm</td><td>H\u00f6chste Pr\u00e4zision, digitale Anzeige in Grad</td></tr>
</tbody>
</table>

<p><strong>Empfehlung f\u00fcr Heimwerker:</strong> Eine 60-cm-Wasserwaage deckt 80 % aller Aufgaben ab. Erg\u00e4nze sie bei Bedarf durch eine Torpedo-Wasserwaage (f\u00fcr enge Stellen) oder eine Richtlatte (f\u00fcr Estrich und Mauerwerk).</p>

<h2>Vorbereitung</h2>

<ol>
<li><strong>Genauigkeit pr\u00fcfen:</strong> Lege die Wasserwaage auf eine glatte Fl\u00e4che und merke dir die Blasenposition. Drehe sie um 180\u00b0 und lege sie an die gleiche Stelle. Die Blase muss an derselben Position stehen. Wenn nicht, ist die Wasserwaage ungenau.</li>
<li><strong>Fl\u00e4che s\u00e4ubern:</strong> Schmutz und M\u00f6rtelreste unter der Wasserwaage verf\u00e4lschen das Ergebnis.</li>
<li><strong>Richtige L\u00e4nge w\u00e4hlen:</strong> Je l\u00e4nger die Wasserwaage, desto genauer das Ergebnis \u00fcber gro\u00dfe Fl\u00e4chen. F\u00fcr ein 80-cm-Regal reicht eine 60-cm-Waage. F\u00fcr einen 3-m-Balken brauchst du eine 2-m-Wasserwaage oder eine Richtlatte.</li>
</ol>

<h2>Richtig anwenden</h2>

<h3>Horizontal pr\u00fcfen (waagerecht)</h3>
<ol>
<li>Wasserwaage auf die zu pr\u00fcfende Fl\u00e4che legen.</li>
<li>Horizontale Libelle (mittlere Blase) ablesen.</li>
<li>Die Blase muss <strong>exakt mittig</strong> zwischen den Markierungslinien stehen.</li>
<li>Ist die Blase au\u00dferhalb: Die Fl\u00e4che ist nicht waagerecht. Auf der Seite, zu der die Blase wandert, ist die Fl\u00e4che <strong>h\u00f6her</strong>.</li>
</ol>

<h3>Vertikal pr\u00fcfen (lotrecht)</h3>
<ol>
<li>Wasserwaage senkrecht an die Wand oder den Pfosten anlegen.</li>
<li>Vertikale Libelle (seitliche Blase) ablesen.</li>
<li>Auch hier: Blase muss mittig stehen. Steht sie nicht mittig, ist die Fl\u00e4che nicht lotrecht.</li>
</ol>

<h3>Gef\u00e4lle pr\u00fcfen</h3>
<p>Manche Wasserwaagen haben eine 45\u00b0-Libelle oder eine einstellbare Libelle f\u00fcr Gef\u00e4llemessungen. F\u00fcr pr\u00e4zise Gef\u00e4lle (z.B. 2 % f\u00fcr Terrassenentw\u00e4sserung) eignet sich eine <strong>elektronische Wasserwaage</strong> mit Grad-Anzeige besser.</p>

<h2>Tipps f\u00fcr pr\u00e4zise Ergebnisse</h2>

<ul>
<li><strong>Nicht verbiegen:</strong> Wasserwaagen aus Aluminium k\u00f6nnen sich bei rauer Behandlung verziehen. Nicht als Hebel oder Brechstange missbrauchen.</li>
<li><strong>Nicht fallen lassen:</strong> Ein Sturz kann die Libellen besch\u00e4digen. Immer kontrolliert ablegen.</li>
<li><strong>Verl\u00e4ngern statt sch\u00e4tzen:</strong> Wenn die Wasserwaage zu kurz ist, lege sie auf eine gerade Richtlatte oder ein Aluprofil. Nicht \u201eungef\u00e4hr\u201c \u00fcber l\u00e4ngere Strecken extrapolieren.</li>
<li><strong>Zwei Richtungen pr\u00fcfen:</strong> Eine Fl\u00e4che kann l\u00e4ngs waagerecht und quer schr\u00e4g sein. Immer in <strong>beiden Richtungen</strong> pr\u00fcfen.</li>
<li><strong>Qualit\u00e4t zahlt sich aus:</strong> Billige Wasserwaagen (unter 10 \u20ac) haben oft ungenaue Libellen. Investiere in eine Marken-Wasserwaage (Stabila, Sola, BMI) \u2014 die h\u00e4lt ein Leben lang.</li>
</ul>

<h2>Pflege und Lagerung</h2>

<p>Wasserwaagen trocken und gesch\u00fctzt lagern. Nicht mit anderen schweren Werkzeugen zusammenwerfen. Vor jedem Einsatz kurz die Genauigkeit mit der 180\u00b0-Drehung testen. Eine gute Wasserwaage h\u00e4lt bei richtiger Pflege Jahrzehnte.</p>

<p>\u2192 <a href="/rechner/trockenbau">Berechne deinen Trockenbau-Bedarf \u2192</a></p>
<p>\u2192 <a href="/rechner/fliesen">Berechne deinen Fliesen-Bedarf \u2192</a></p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Wie pr\u00fcfe ich, ob meine Wasserwaage genau ist?</h3>
<p>180\u00b0-Test: Wasserwaage auf eine glatte Fl\u00e4che legen, Blasenposition merken, Wasserwaage um 180\u00b0 drehen und an die gleiche Stelle legen. Die Blase muss <strong>exakt an der gleichen Position</strong> stehen. Wenn sie abweicht, ist die Wasserwaage ungenau und muss ersetzt werden (Libellen lassen sich nicht nachjustieren).</p>

<h3>Welche L\u00e4nge brauche ich?</h3>
<p>F\u00fcr die meisten Heimwerker-Aufgaben reicht <strong>60 cm</strong>. F\u00fcr Mauerwerk und Estrich mindestens 100 cm, idealerweise 200 cm. Eine Torpedo-Wasserwaage (20 cm) ist n\u00fctzlich f\u00fcr enge Stellen. <strong>Faustregel:</strong> Die Wasserwaage sollte mindestens 2/3 der zu pr\u00fcfenden L\u00e4nge abdecken.</p>

<h3>Wasserwaage oder Laser \u2014 was ist besser?</h3>
<p>Beide haben ihre St\u00e4rken. Die <strong>Wasserwaage</strong> ist zuverl\u00e4ssig, braucht keine Batterie und funktioniert auf jeder Oberfl\u00e4che. Der <strong>Kreuzlinienlaser</strong> projiziert Linien \u00fcber den ganzen Raum und ist ideal f\u00fcr Arbeiten, bei denen mehrere Punkte in einer Flucht liegen m\u00fcssen (Steckdosen, Fliesen). Am besten: beides im Werkzeugkoffer haben.</p>`;

async function run() {
  console.log("=== OBERFRÄSE ===");
  const r1 = await fetch(BASE + "/rest/v1/seiten?slug=eq.oberfraese-richtig-benutzen", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Oberfr\u00e4se richtig benutzen: Anleitung f\u00fcr Einsteiger (2026)",
      seo_title: "Oberfr\u00e4se richtig benutzen: Schritt-f\u00fcr-Schritt-Anleitung (2026)",
      seo_description: "Oberfr\u00e4se richtig bedienen: Fr\u00e4ser w\u00e4hlen, Tiefe einstellen, sicher f\u00fchren. Schritt-f\u00fcr-Schritt-Anleitung mit Tipps f\u00fcr Einsteiger.",
      content_md: oberfraeseContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d1 = await r1.json();
  console.log(r1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  console.log("\n=== KREUZLINIENLASER ===");
  const r2 = await fetch(BASE + "/rest/v1/seiten?slug=eq.kreuzlinienlaser-richtig-benutzen", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Kreuzlinienlaser richtig benutzen: Anleitung & Tipps (2026)",
      seo_title: "Kreuzlinienlaser richtig benutzen: Anleitung & Tipps (2026)",
      seo_description: "Kreuzlinienlaser aufstellen, ausrichten und pr\u00e4zise arbeiten. Anleitung f\u00fcr Fliesen, Trockenbau und Regale. Rot vs. gr\u00fcn, Kreuzlinie vs. Rotation.",
      content_md: laserContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d2 = await r2.json();
  console.log(r2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));

  console.log("\n=== WASSERWAAGE ===");
  const r3 = await fetch(BASE + "/rest/v1/seiten?slug=eq.wasserwaage-richtig-benutzen", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Wasserwaage richtig benutzen: Anleitung & Tipps (2026)",
      seo_title: "Wasserwaage richtig benutzen: Anleitung & Tipps (2026)",
      seo_description: "Wasserwaage richtig ablesen: Horizontal, vertikal und Gef\u00e4lle pr\u00fcfen. Typen-\u00dcbersicht, Genauigkeitstest und praktische Tipps.",
      content_md: wasserwaageContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d3 = await r3.json();
  console.log(r3.ok && d3.length > 0 ? "OK: " + d3[0].slug : "FAIL: " + JSON.stringify(d3));
}

run();

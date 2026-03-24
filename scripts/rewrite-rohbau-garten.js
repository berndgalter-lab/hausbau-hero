const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

// ─── HAFTGRUND FÜR PUTZ ──────────────────────────────────────

const haftgrundContent = `<p>Putz, der nach wenigen Wochen abbl\u00e4ttert oder Risse bekommt \u2014 meistens liegt es nicht am Putz, sondern am fehlenden Haftgrund. Eine gute Grundierung kostet unter 1 \u20ac pro Quadratmeter und verhindert teure Nacharbeit. In diesem Guide erkl\u00e4ren wir, wann Haftgrund Pflicht ist, welchen Typ du brauchst, und wann du dir die Grundierung sparen kannst.</p>

<h2>Was ist Haftgrund?</h2>

<p>Haftgrund ist eine fl\u00fcssige Grundierung, die zwei Aufgaben hat:</p>
<ol>
<li><strong>Saugf\u00e4higkeit regulieren:</strong> Stark saugende Untergr\u00fcnde (Porenbeton, Kalksandstein) entziehen dem frischen Putz zu schnell das Wasser. Der Putz trocknet zu fr\u00fch aus, wird spr\u00f6de und rei\u00dft. Haftgrund verschlie\u00dft die Poren teilweise und verlangsamt die Wasseraufnahme.</li>
<li><strong>Haftung verbessern:</strong> Glatte Untergr\u00fcnde (Beton, alte Farbe) bieten dem Putz zu wenig Halt. Haftgrund erzeugt eine griffige Zwischenschicht, an der sich der Putz \u201efestkrallen\u201c kann.</li>
</ol>

<p>Haftgrund ist <strong>nicht das gleiche</strong> wie Tiefengrund oder Betonkontakt \u2014 obwohl alle drei umgangssprachlich \u201eGrundierung\u201c hei\u00dfen. Die Unterschiede sind entscheidend f\u00fcr die Wahl des richtigen Produkts.</p>

<h2>Wann ist Haftgrund Pflicht?</h2>

<h3>Pflicht (ohne geht es nicht):</h3>
<ul>
<li><strong>Glatter Beton (Schalungsbeton):</strong> Putz haftet auf glatter Betonoberfl\u00e4che nicht. Haftgrund oder Betonkontakt ist zwingend notwendig.</li>
<li><strong>Stark saugende Untergr\u00fcnde:</strong> Porenbeton (Ytong), Kalksandstein, alter Kalkputz. Ohne Grundierung zieht der Untergrund dem Putz das Wasser ab \u2014 Ergebnis: Risse und schlechte Festigkeit.</li>
<li><strong>Wechselnde Untergr\u00fcnde:</strong> Wenn eine Wand teils aus Beton, teils aus Mauerwerk besteht (z.B. bei St\u00fcrzen oder Ringankern). Haftgrund gleicht die unterschiedliche Saugf\u00e4higkeit aus und verhindert Abzeichnungen im Putz.</li>
<li><strong>Auf alter Dispersionsfarbe:</strong> Wenn \u00fcber einen gestrichenen Untergrund verputzt werden soll. Der Haftgrund erzeugt eine griffige Oberfl\u00e4che auf der glatten Farbe.</li>
</ul>

<h3>Empfohlen (kann man machen, muss nicht):</h3>
<ul>
<li><strong>Normales Mauerwerk:</strong> Ziegel, Hochlochziegel. Hier reicht oft Vorn\u00e4ssen, aber Haftgrund schadet nie und kostet fast nichts.</li>
<li><strong>Altputz \u00fcberputzen:</strong> Wenn der alte Putz tragf\u00e4hig ist, Haftgrund als Haftvermittler auftragen.</li>
</ul>

<h3>Nicht n\u00f6tig:</h3>
<ul>
<li><strong>Bereits grundierter Untergrund:</strong> Nicht doppelt grundieren.</li>
<li><strong>Frisches Mauerwerk mit normaler Saugf\u00e4higkeit:</strong> Wenn der Spritztest zeigt, dass Wasser gleichm\u00e4\u00dfig einzieht (nicht sofort verschwindet, nicht abperlt), reicht Vorn\u00e4ssen.</li>
</ul>

<h2>Tiefengrund vs. Haftgrund vs. Betonkontakt</h2>

<table>
<thead>
<tr><th></th><th>Tiefengrund</th><th>Haftgrund</th><th>Betonkontakt</th></tr>
</thead>
<tbody>
<tr><td><strong>Wirkung</strong></td><td>Dringt tief ein, verfestigt</td><td>Dringt mittel ein, macht griffig</td><td>Bleibt auf Oberfl\u00e4che, sehr rau</td></tr>
<tr><td><strong>F\u00fcr Untergrund</strong></td><td>Stark saugend, sandig, m\u00fcrbe</td><td>Saugend bis mittel saugend</td><td>Glatt, nicht saugend</td></tr>
<tr><td><strong>Typische Fl\u00e4chen</strong></td><td>Alter Putz, Estrich, Porenbeton</td><td>Mauerwerk, Kalksandstein</td><td>Beton, Betondecken</td></tr>
<tr><td><strong>Oberfl\u00e4che nach Trocknung</strong></td><td>Unsichtbar, leicht gl\u00e4nzend</td><td>Leicht griffig</td><td>Deutlich rau (Quarzsand)</td></tr>
<tr><td><strong>Trockenzeit</strong></td><td>4\u201312 Stunden</td><td>4\u201324 Stunden</td><td>12\u201324 Stunden</td></tr>
<tr><td><strong>Preis pro m\u00b2</strong></td><td>0,30\u20130,80 \u20ac</td><td>0,50\u20131,50 \u20ac</td><td>1,00\u20132,50 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Merke:</strong></p>
<ul>
<li><strong>Tiefengrund</strong> = dringt tief ein, festigt sandende/m\u00fcrbe Untergr\u00fcnde von innen</li>
<li><strong>Haftgrund</strong> = reguliert Saugf\u00e4higkeit, verbessert Haftung \u2014 der \u201eAllrounder\u201c</li>
<li><strong>Betonkontakt</strong> = erzeugt eine raue Schicht auf glatten Fl\u00e4chen (enth\u00e4lt Quarzsand)</li>
</ul>

<p>Im Zweifel: <strong>Haftgrund ist fast immer richtig</strong>. Er schadet nie und kostet wenig. Betonkontakt brauchst du nur auf wirklich glattem Beton, Tiefengrund nur auf broeseligen Alt-Untergr\u00fcnden.</p>

<h2>Was kostet Haftgrund?</h2>

<table>
<thead>
<tr><th>Typ</th><th>Preis pro Liter</th><th>Ergiebigkeit</th><th>Kosten pro m\u00b2</th></tr>
</thead>
<tbody>
<tr><td>Tiefengrund</td><td>2\u20135 \u20ac</td><td>5\u201310 m\u00b2/l</td><td>0,30\u20130,80 \u20ac</td></tr>
<tr><td>Haftgrund</td><td>4\u20138 \u20ac</td><td>4\u20138 m\u00b2/l</td><td>0,50\u20131,50 \u20ac</td></tr>
<tr><td>Betonkontakt</td><td>5\u201312 \u20ac</td><td>3\u20135 m\u00b2/l</td><td>1,00\u20132,50 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Rechenbeispiel Bad (25 m\u00b2 Wandfl\u00e4che):</strong></p>
<ul>
<li>Haftgrund: 25 m\u00b2 \u00d7 1,00 \u20ac = <strong>25 \u20ac</strong></li>
<li>Im Vergleich: Putz nachbessern wegen schlechter Haftung: <strong>200\u2013500 \u20ac</strong></li>
</ul>

<p>Grundierung ist die g\u00fcnstigste Versicherung auf der Baustelle.</p>

<p>\u2192 <a href="/rechner/putz">Berechne wie viel Putz du brauchst \u2192</a></p>

<h2>Verarbeitung: So tr\u00e4gst du Haftgrund richtig auf</h2>

<ol>
<li><strong>Untergrund vorbereiten:</strong> Staub, lose Teile und Fettreste entfernen. Bei sandigem Altputz zuerst Tiefengrund, dann Haftgrund. Bei frischem Mauerwerk nur Haftgrund.</li>
<li><strong>Produkt vorbereiten:</strong> Haftgrund gut aufrühren (Quarzsand setzt sich am Boden ab!). In der Regel gebrauchsfertig \u2014 nicht verd\u00fcnnen, au\u00dfer der Hersteller sagt es explizit.</li>
<li><strong>Auftragen:</strong> Mit Quast, breitem Pinsel oder Rolle gleichm\u00e4\u00dfig auf die gesamte Fl\u00e4che streichen. Nicht zu dick \u2014 eine d\u00fcnne, deckende Schicht reicht. Bei Betonkontakt: kr\u00e4ftig einstreichen, damit die Quarzsandkoernung in den Untergrund gepresst wird.</li>
<li><strong>Trocknen lassen:</strong> Mindestens <strong>4\u201324 Stunden</strong> (je nach Produkt und Temperatur). Die Oberfl\u00e4che muss sich griffig anfuehlen, nicht mehr klebrig. Erst dann verputzen.</li>
<li><strong>Putz auftragen:</strong> Innerhalb von <strong>48 Stunden</strong> nach dem Grundieren verputzen. Wenn l\u00e4nger gewartet wird, kann sich Staub auf der griffigen Oberfl\u00e4che absetzen und die Haftung verschlechtern.</li>
</ol>

<p><strong>H\u00e4ufige Fehler:</strong></p>
<ul>
<li>Haftgrund auf nassem Untergrund auftragen \u2014 die Grundierung kann nicht einziehen und haftet nicht</li>
<li>Zu wenig auftragen \u2014 es d\u00fcrfen keine trockenen Stellen bleiben</li>
<li>Putz zu fr\u00fch auftragen \u2014 wenn der Haftgrund noch feucht ist, verschlechtert das die Haftung</li>
<li>Betonkontakt auf saugenden Untergrund \u2014 verschwendet Geld, Haftgrund reicht</li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Allrounder:</strong> <a href="https://www.amazon.de/s?k=Knauf+Betokontakt+Haftgrund+Putz&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Knauf Betokontakt</a> (ca. 15\u201325 \u20ac / 5 kg) \u2014 Der Standard-Betonkontakt f\u00fcr glatte Untergr\u00fcnde. Quarzsand-haltig, hervorragende Haftung, rosa eingef\u00e4rbt (sieht man, wo man schon war). Ergiebigkeit: ca. 3\u20135 m\u00b2/kg.</p>

<p><strong>F\u00fcr saugende Untergr\u00fcnde:</strong> <a href="https://www.amazon.de/s?k=Caparol+Putzgrund+Haftgrund+610&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Caparol Putzgrund 610</a> (ca. 20\u201335 \u20ac / 8 Liter) \u2014 Universaler Haftgrund f\u00fcr saugende Untergr\u00fcnde vor Putz- und Spachtelarbeiten. Reguliert die Saugf\u00e4higkeit zuverl\u00e4ssig. Ergiebigkeit: ca. 4\u20137 m\u00b2/l.</p>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Tiefengrund+10+Liter+Putz+Grundierung&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Tiefengrund 10-Liter-Gebinde</a> (ca. 15\u201325 \u20ac) \u2014 F\u00fcr gro\u00dfe Fl\u00e4chen mit gleichm\u00e4\u00dfig saugendem Untergrund. Der g\u00fcnstigste Weg zur Grundierung. Nicht f\u00fcr glatte Betonfl\u00e4chen \u2014 daf\u00fcr brauchst du Betonkontakt.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Muss ich vor dem Verputzen immer grundieren?</h3>
<p>Nicht immer, aber fast immer. Auf <strong>glattem Beton</strong> ist Betonkontakt Pflicht, auf <strong>stark saugenden Untergr\u00fcnden</strong> (Porenbeton, Kalksandstein) ist Haftgrund Pflicht. Auf normalem Mauerwerk mit gleichm\u00e4\u00dfiger Saugf\u00e4higkeit reicht theoretisch Vorn\u00e4ssen \u2014 aber f\u00fcr unter 1 \u20ac/m\u00b2 ist Haftgrund eine sinnvolle Absicherung.</p>

<h3>Tiefengrund oder Haftgrund \u2014 was brauche ich?</h3>
<p><strong>Tiefengrund</strong> dringt tief in den Untergrund ein und festigt sandende, m\u00fcrbe Fl\u00e4chen von innen. <strong>Haftgrund</strong> reguliert die Saugf\u00e4higkeit und erzeugt eine griffige Oberfl\u00e4che f\u00fcr den Putz. Auf frischem, festem Mauerwerk reicht Haftgrund. Auf altem, br\u00f6seligem Putz zuerst Tiefengrund, dann Haftgrund, dann <a href="/rohbau/kalk-zement-putz">neuen Putz</a> auftragen.</p>

<h3>Kann ich Haftgrund selbst auftragen?</h3>
<p>Ja, das ist eine einfache Heimwerker-Aufgabe. Fl\u00e4che abstauben, Haftgrund umr\u00fchren, mit breitem Pinsel oder Quast auftragen, trocknen lassen. Zeitaufwand: ca. 30 Minuten f\u00fcr 20 m\u00b2. Einziger Fehler, den man machen kann: zu fr\u00fch mit dem Putz beginnen, bevor der Haftgrund trocken ist.</p>

<h3>Wie lange muss Haftgrund trocknen?</h3>
<p>Je nach Produkt und Raumtemperatur <strong>4\u201324 Stunden</strong>. Tiefengrund trocknet schneller (4\u20138 h), Betonkontakt braucht l\u00e4nger (12\u201324 h). Teste vor dem Verputzen: Die Oberfl\u00e4che muss sich griffig, aber <strong>nicht mehr klebrig</strong> anf\u00fchlen. Im Zweifel lieber einen Tag l\u00e4nger warten.</p>

<h3>Kann ich Putz ohne Grundierung auftragen?</h3>
<p>Auf normalem Mauerwerk mit Vorn\u00e4ssen \u2014 ja. Auf Beton oder stark saugenden Untergr\u00fcnden \u2014 nein, der Putz wird nicht halten. Die 20\u201330 \u20ac f\u00fcr Grundierung sparen 200\u2013500 \u20ac f\u00fcr Nacharbeit. Es gibt keinen guten Grund, auf Haftgrund zu verzichten.</p>`;

// ─── PFLASTERFUGENMÖRTEL ──────────────────────────────────────

const fugenContent = `<p>Die Fugen sind die Schwachstelle jeder Pflasterfl\u00e4che: Sand wird ausgespuelt, Unkraut w\u00e4chst durch, und nach ein paar Jahren wackeln die Steine. Pflasterfugenm\u00f6rtel l\u00f6st alle drei Probleme \u2014 wenn du den richtigen Typ w\u00e4hlst. In diesem Guide erkl\u00e4ren wir die verschiedenen Fugenm\u00f6rtel-Typen, was sie kosten, und welche Fehler du vermeiden musst.</p>

<h2>Was ist Pflasterfugenm\u00f6rtel?</h2>

<p>Pflasterfugenm\u00f6rtel ist ein Bindemittel, das die Fugen zwischen Pflastersteinen dauerhaft verschlie\u00dft \u2014 im Gegensatz zu losem Sand oder Splitt, der sich mit der Zeit auswascht. Der M\u00f6rtel h\u00e4rtet aus und fixiert die Steine in ihrer Position. Dadurch:</p>
<ul>
<li>kein Unkraut mehr in den Fugen</li>
<li>keine Ameisenstra\u00dfen und Nesth\u00fcgel</li>
<li>Steine bleiben fest, kein Wackeln oder Verschieben</li>
<li>die Fl\u00e4che sieht dauerhaft gepflegt aus</li>
</ul>

<p><strong>Wichtig:</strong> Pflasterfugenm\u00f6rtel ersetzt <em>nur</em> das Fugenmaterial. Der Pflasterunterbau (Schotter, Splitt, Bettung) bleibt wie er ist.</p>

<h2>Welcher Fugenm\u00f6rtel f\u00fcr welchen Einsatz?</h2>

<table>
<thead>
<tr><th></th><th>Zement\u00e4r<br>wasserdurchl\u00e4ssig</th><th>Zement\u00e4r<br>wasserundurchl\u00e4ssig</th><th>Kunstharz<br>(Epoxid/PU)</th><th>Sand/Splitt<br>(kein M\u00f6rtel)</th></tr>
</thead>
<tbody>
<tr><td><strong>Material</strong></td><td>Zement + Sand + Polymer</td><td>Zement + Sand</td><td>Epoxidharz oder PU-Harz</td><td>Brechsand, Splitt</td></tr>
<tr><td><strong>Wasserdurchl\u00e4ssig</strong></td><td>Ja</td><td>Nein</td><td>Nein</td><td>Ja</td></tr>
<tr><td><strong>Unkrautfrei</strong></td><td>Ja</td><td>Ja</td><td>Ja</td><td>Nein</td></tr>
<tr><td><strong>Frostbest\u00e4ndig</strong></td><td>Ja</td><td>Bedingt</td><td>Ja</td><td>Ja</td></tr>
<tr><td><strong>Belastbarkeit</strong></td><td>Fu\u00dfg\u00e4nger + PKW</td><td>Fu\u00dfg\u00e4nger + PKW</td><td>PKW + LKW</td><td>Fu\u00dfg\u00e4nger</td></tr>
<tr><td><strong>Preis pro m\u00b2</strong></td><td>5\u201310 \u20ac</td><td>3\u20138 \u20ac</td><td>10\u201325 \u20ac</td><td>0,50\u20132 \u20ac</td></tr>
<tr><td><strong>Fugenbreite</strong></td><td>3\u201320 mm</td><td>3\u201315 mm</td><td>3\u201330 mm</td><td>3\u201310 mm</td></tr>
<tr><td><strong>Bester Einsatz</strong></td><td>Terrasse, Gehweg</td><td>Hofeinfahrt</td><td>Einfahrt, Gewerbe</td><td>Gartenweg</td></tr>
</tbody>
</table>

<h3>Kurz-Empfehlung:</h3>
<ul>
<li><strong>Terrasse / Garten:</strong> Zement\u00e4r wasserdurchl\u00e4ssig \u2014 Regenwasser versickert nat\u00fcrlich, kein Unkraut, sch\u00f6ne Optik.</li>
<li><strong>Einfahrt (PKW):</strong> Zement\u00e4r wasserundurchl\u00e4ssig oder Kunstharz \u2014 h\u00e4lt der Belastung durch Reifen stand.</li>
<li><strong>Gewerbe / LKW:</strong> Kunstharz (Epoxid) \u2014 maximale Belastbarkeit, aber teuer.</li>
<li><strong>Gartenweg:</strong> Sand reicht \u2014 g\u00fcnstig, leicht zu erneuern, keine Entw\u00e4sserungsprobleme.</li>
</ul>

<h2>Was kostet Pflasterfugenm\u00f6rtel?</h2>

<table>
<thead>
<tr><th>Position</th><th>Kosten pro m\u00b2</th></tr>
</thead>
<tbody>
<tr><td>Fugenm\u00f6rtel (zement\u00e4r)</td><td>5\u201310 \u20ac</td></tr>
<tr><td>Fugenm\u00f6rtel (Kunstharz)</td><td>10\u201325 \u20ac</td></tr>
<tr><td>Werkzeug (Gummiwischer, Eimer)</td><td>10\u201320 \u20ac (einmalig)</td></tr>
<tr><td><strong>Gesamt (Eigenleistung, zement\u00e4r)</strong></td><td><strong>5\u201312 \u20ac</strong></td></tr>
<tr><td>Handwerker (optional)</td><td>15\u201330 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Rechenbeispiel Terrasse 30 m\u00b2:</strong></p>
<ul>
<li>Zement\u00e4rer Fugenm\u00f6rtel: 30 \u00d7 8 \u20ac = <strong>240 \u20ac</strong></li>
<li>Verbrauch: ca. 4\u20136 kg/m\u00b2 (abh\u00e4ngig von Fugenbreite und -tiefe)</li>
<li>Typisch: 2\u20134 S\u00e4cke \u00e0 25 kg f\u00fcr 30 m\u00b2</li>
</ul>

<p>\u2192 <a href="/rechner/terrasse">Berechne den Materialbedarf f\u00fcr deine Terrasse \u2192</a></p>

<h2>Verarbeitung: Schritt f\u00fcr Schritt</h2>

<h3>Vorbereitung</h3>
<ol>
<li><strong>Alte Fugen r\u00e4umen:</strong> Sand, Unkraut und lose Teile aus den Fugen entfernen. Hochdruckreiniger oder Fugenkratzer. Die Fugen m\u00fcssen <strong>mindestens 20 mm tief</strong> frei sein.</li>
<li><strong>Fl\u00e4che reinigen:</strong> Steine sauber fegen. Moos, Algen und Dreck entfernen. Die Steine m\u00fcssen sauber sein, weil M\u00f6rtelreste auf schmutzigen Steinen Flecken hinterlassen.</li>
<li><strong>Wetter pr\u00fcfen:</strong> Kein Regen f\u00fcr die n\u00e4chsten <strong>24\u201348 Stunden</strong>. Temperatur mindestens <strong>5\u00b0C</strong>, ideal 10\u201320\u00b0C. Keine pralle Sonne (M\u00f6rtel trocknet zu schnell an der Oberfl\u00e4che).</li>
</ol>

<h3>Auftragen (Einschl\u00e4mmverfahren)</h3>
<ol>
<li><strong>Steine vorn\u00e4ssen:</strong> Die gesamte Fl\u00e4che kr\u00e4ftig mit Wasser benetzen. Die Fugen sollen feucht sein, die Steinoberfl\u00e4che matt-nass.</li>
<li><strong>M\u00f6rtel anr\u00fchren:</strong> Sackware mit Wasser mischen (laut Herstellerangabe). Konsistenz: fl\u00fcssiger Brei, der sich gut in Fugen schieben l\u00e4sst.</li>
<li><strong>Einschl\u00e4mmen:</strong> M\u00f6rtel auf die Fl\u00e4che gie\u00dfen und mit einem Gummiwischer diagonal \u00fcber die Fugen schieben. Immer diagonal \u2014 nicht l\u00e4ngs, sonst zieht man den M\u00f6rtel wieder aus den Fugen.</li>
<li><strong>\u00dcberschuss abwaschen:</strong> Nach 15\u201330 Minuten (wenn der M\u00f6rtel in den Fugen leicht angezogen hat) die Steinoberfl\u00e4chen mit einem nassen Schwamm oder Schwammbrett vorsichtig reinigen. <strong>Nicht zu fr\u00fch</strong> (sp\u00fclt M\u00f6rtel aus den Fugen) und <strong>nicht zu sp\u00e4t</strong> (M\u00f6rtel haftet auf den Steinen).</li>
<li><strong>Aush\u00e4rten lassen:</strong> 24\u201348 Stunden nicht betreten, nicht bew\u00e4ssern, vor Regen sch\u00fctzen (Plane).</li>
</ol>

<h2>Die 5 h\u00e4ufigsten Fehler</h2>

<ol>
<li><strong>Zu nass anr\u00fchren:</strong> Der M\u00f6rtel sackt in den Fugen zusammen und bildet Vertiefungen. Richtige Konsistenz: dickfl\u00fcssiger Brei, kein Wasser.</li>
<li><strong>Bei Regen oder Frost verarbeiten:</strong> Regen sp\u00fclt den M\u00f6rtel aus, Frost zerst\u00f6rt die Kristallstruktur. Ergebnis: M\u00f6rtel br\u00f6selt nach Wochen raus.</li>
<li><strong>Naturstein ohne Test:</strong> Manche M\u00f6rtel verf\u00e4rben empfindliche Natursteine (Sandstein, Marmor, heller Granit). <strong>Immer an einer versteckten Stelle testen!</strong></li>
<li><strong>Zu sp\u00e4t abwaschen:</strong> Nach 45+ Minuten ist der M\u00f6rteschleier auf den Steinen angetrocknet. Dann hilft nur noch Spezialreiniger oder Schleifpad.</li>
<li><strong>Fugen nicht tief genug frei:</strong> Wenn unter dem neuen M\u00f6rtel noch alter Sand sitzt, bricht die Verbindung. Mindestens 20 mm Fugentiefe freilegen.</li>
</ol>

<p>Nach dem Verfugen ist eine <a href="/farben/steinimpraegnierung">Steinimpr\u00e4gnierung</a> eine sinnvolle Erg\u00e4nzung \u2014 sie sch\u00fctzt die Steine vor Flecken und verlangsamt die Moos-Neubildung.</p>

<h2>Unsere Empfehlungen</h2>

<p><strong>Terrasse (wasserdurchl\u00e4ssig):</strong> <a href="https://www.amazon.de/s?k=Dansand+Pflasterfugenm%C3%B6rtel+wasserdurchl%C3%A4ssig&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Dansand Fugenm\u00f6rtel</a> (ca. 25\u201335 \u20ac / 20 kg) \u2014 Der Klassiker f\u00fcr Terrassen und Gartenwege. Wasserdurchl\u00e4ssig, frostbest\u00e4ndig, unkrautfrei. Einfache Verarbeitung: einfegen, bew\u00e4ssern, fertig. Ergiebigkeit: ca. 3\u20135 m\u00b2 pro Sack.</p>

<p><strong>Einfahrt (hochbelastbar):</strong> <a href="https://www.amazon.de/s?k=PCI+Pavifix+Pflasterfugenm%C3%B6rtel+CEM&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">PCI Pavifix CEM</a> (ca. 15\u201325 \u20ac / 25 kg) \u2014 Zement\u00e4rer Fugenm\u00f6rtel f\u00fcr PKW-befahrbare Fl\u00e4chen. Sehr hohe Festigkeit, vielf\u00e4ltig einsetzbar. In Grau und Anthrazit erh\u00e4ltlich.</p>

<p><strong>Naturstein (schonend):</strong> <a href="https://www.amazon.de/s?k=Fugenmörtel+Naturstein+verfärbungsfrei&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Verf\u00e4rbungsfreier Naturstein-Fugenm\u00f6rtel</a> (ca. 20\u201335 \u20ac / 15 kg) \u2014 Speziell f\u00fcr empfindliche Natursteine (Sandstein, Travertin, heller Granit). Verf\u00e4rbungsfrei formuliert. Etwas teurer, aber spart den \u00c4rger \u00fcber irreversible Flecken auf teuren Natursteinplatten.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Pflasterfugenm\u00f6rtel oder Sand \u2014 was ist besser?</h3>
<p><strong>Sand</strong> ist g\u00fcnstig (unter 2 \u20ac/m\u00b2) und einfach zu erneuern, wird aber ausgewaschen und l\u00e4sst Unkraut durch. <strong>Fugenm\u00f6rtel</strong> ist dauerhaft unkrautfrei und stabilisiert die Steine, kostet aber 5\u201315 \u20ac/m\u00b2 und erfordert sorgf\u00e4ltige Verarbeitung. F\u00fcr Terrassen und Einfahrten lohnt sich M\u00f6rtel. F\u00fcr selten genutzte Gartenwege reicht Sand.</p>

<h3>Wie lange h\u00e4lt Pflasterfugenm\u00f6rtel?</h3>
<p>Bei korrekter Verarbeitung <strong>10\u201320 Jahre</strong>. Die h\u00e4ufigsten Gr\u00fcnde f\u00fcr vorzeitiges Versagen: falsche Verarbeitungstemperatur, zu wenig Fugentiefe, oder Regen w\u00e4hrend der Aush\u00e4rtung. Kunstharz-M\u00f6rtel halten tendenziell l\u00e4nger als zement\u00e4re.</p>

<h3>Kann ich Pflasterfugenm\u00f6rtel selbst auftragen?</h3>
<p>Ja, das ist eine typische Heimwerker-Aufgabe. Du brauchst: Gummiwischer, Eimer, Schwamm und den M\u00f6rtel. Zeitaufwand f\u00fcr 30 m\u00b2: ca. 3\u20135 Stunden (plus Vorbereitung). Der kritischste Schritt ist das rechtzeitige Abwaschen des \u00dcberschusses \u2014 \u00fcbe vorher an einer kleinen Fl\u00e4che.</p>

<h3>Welcher Fugenm\u00f6rtel f\u00fcr Naturstein?</h3>
<p>Unbedingt einen als <strong>\u201everf\u00e4rbungsfrei\u201c</strong> gekennzeichneten M\u00f6rtel verwenden. Standard-Zementm\u00f6rtel k\u00f6nnen auf empfindlichen Natursteinen (Sandstein, Travertin, heller Granit) dauerhafte Flecken hinterlassen. Immer vorher an einer unauff\u00e4lligen Stelle testen!</p>

<h3>Muss der Untergrund fest sein f\u00fcr Fugenm\u00f6rtel?</h3>
<p>Ja. Fugenm\u00f6rtel funktioniert nur auf einem <strong>stabilen Pflasterunterbau</strong> (verdichteter Schotter + Splittbettung). Wenn die Steine auf Sand liegen und bei Belastung kippen oder absacken, bricht der M\u00f6rtel. Erst den Unterbau reparieren, dann verfugen.</p>`;

async function run() {
  console.log("=== HAFTGRUND FÜR PUTZ ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten?slug=eq.haftgrund-putz", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Haftgrund f\u00fcr Putz \u2014 wann ist er Pflicht? (2026)",
      seo_title: "Haftgrund f\u00fcr Putz: Wann Pflicht, welcher Typ? (2026)",
      seo_description:
        "Haftgrund, Tiefengrund oder Betonkontakt? Wann Grundierung vor dem Verputzen Pflicht ist, was sie kostet und wie man sie auftr\u00e4gt.",
      content_md: haftgrundContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d1 = await res1.json();
  console.log(res1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  console.log("\n=== PFLASTERFUGENMÖRTEL ===");
  const res2 = await fetch(BASE + "/rest/v1/seiten?slug=eq.pflasterfugenmoertel", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Pflasterfugenm\u00f6rtel: Welcher ist der richtige? Kosten & Tipps (2026)",
      seo_title: "Pflasterfugenm\u00f6rtel: Welcher Typ? Kosten & Tipps (2026)",
      seo_description:
        "Pflasterfugenm\u00f6rtel f\u00fcr Terrasse und Einfahrt: Zement\u00e4r oder Kunstharz? Kosten pro m\u00b2, Verarbeitung, h\u00e4ufige Fehler und Produktempfehlungen.",
      content_md: fugenContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d2 = await res2.json();
  console.log(res2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));
}

run();

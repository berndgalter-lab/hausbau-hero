const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

// ─── WANDFARBE WEISS ──────────────────────────────────────────

const wandfarbeContent = `<p>Wei\u00dfe Wandfarbe ist das meistverkaufte Bauprodukt Deutschlands \u2014 und trotzdem greifen die meisten Heimwerker zur falschen. Der entscheidende Faktor ist nicht der Preis, sondern die <strong>Deckkraftklasse</strong>. Eine Farbe mit Klasse 1 deckt in zwei Anstrichen perfekt, eine mit Klasse 3 braucht vier Anstriche und kostet am Ende mehr. In diesem Guide erf\u00e4hrst du, welche Deckkraft du wirklich brauchst und wo du sinnvoll sparen kannst.</p>

<h2>Deckkraftklassen nach DIN EN 13300</h2>

<p>Die Deckkraft einer Wandfarbe wird nach DIN EN 13300 in vier Klassen eingeteilt. Ma\u00dfgeblich ist das <strong>Kontrastverh\u00e4ltnis</strong> \u2014 also wie gut die Farbe einen dunklen Untergrund abdeckt:</p>

<table>
<thead>
<tr><th>Klasse</th><th>Kontrastverh\u00e4ltnis</th><th>Deckkraft</th><th>Anstriche n\u00f6tig</th></tr>
</thead>
<tbody>
<tr><td><strong>Klasse 1</strong></td><td>\u2265 99,5 %</td><td>Hervorragend</td><td>1\u20132</td></tr>
<tr><td><strong>Klasse 2</strong></td><td>\u2265 98,0 %</td><td>Gut</td><td>2</td></tr>
<tr><td><strong>Klasse 3</strong></td><td>\u2265 95,0 %</td><td>Befriedigend</td><td>2\u20133</td></tr>
<tr><td><strong>Klasse 4</strong></td><td>< 95,0 %</td><td>Ausreichend</td><td>3\u20134</td></tr>
</tbody>
</table>

<p><strong>Faustregel:</strong> Klasse 1 und 2 sind f\u00fcr Heimwerker relevant. Klasse 3 und 4 findest du bei Billigfarben unter 2 \u20ac/Liter \u2014 Finger weg, die kosten durch den h\u00f6heren Verbrauch am Ende mehr.</p>

<h2>Nassabriebklassen \u2014 wie belastbar ist die Wand?</h2>

<p>Neben der Deckkraft gibt die <strong>Nassabriebklasse</strong> (ebenfalls DIN EN 13300) an, wie widerstandsf\u00e4hig die getrocknete Farbe gegen Feuchtigkeit und Abrieb ist:</p>

<table>
<thead>
<tr><th>Klasse</th><th>Belastbarkeit</th><th>Geeignet f\u00fcr</th></tr>
</thead>
<tbody>
<tr><td><strong>Klasse 1</strong></td><td>Scheuerbestandig</td><td>Gro\u00dfk\u00fcchen, Praxen</td></tr>
<tr><td><strong>Klasse 2</strong></td><td>Waschbestandig</td><td>K\u00fcche, Bad, Flur</td></tr>
<tr><td><strong>Klasse 3</strong></td><td>Waschbestandig</td><td>Wohnzimmer, Schlafzimmer</td></tr>
<tr><td><strong>Klasse 4\u20135</strong></td><td>Nicht waschbar</td><td>Keller, Lager (wenn optik egal)</td></tr>
</tbody>
</table>

<p>F\u00fcr K\u00fcche, Bad und Flur empfehlen wir mindestens <strong>Nassabriebklasse 2</strong>. Wer in diesen R\u00e4umen noch mehr Schutz will, sollte eine <a href="/farben/latexfarbe">Latexfarbe</a> in Betracht ziehen \u2014 die ist ab Klasse 1 verf\u00fcgbar und abwaschbar.</p>

<h2>Welche Deckkraftklasse f\u00fcr welchen Raum?</h2>

<h3>Klasse 1 lohnt sich bei:</h3>
<ul>
<li><strong>Dunkle Farben \u00fcberstreichen:</strong> Wer eine bunte oder dunkle Wand wieder Wei\u00df streichen will, spart mit Klasse 1 einen kompletten Anstrich.</li>
<li><strong>Gro\u00dfe Fl\u00e4chen:</strong> Bei 100+ m\u00b2 rechnet sich der h\u00f6here Literpreis durch die bessere Ergiebigkeit.</li>
<li><strong>Repr\u00e4sentative R\u00e4ume:</strong> Wohnzimmer, Flur, offene Wohnk\u00fcche \u2014 hier f\u00e4llt eine ungleichm\u00e4\u00dfige Deckung sofort auf.</li>
<li><strong>Decken streichen:</strong> An der Decke sieht man jede Ungleichm\u00e4\u00dfigkeit. Klasse 1 ist hier fast Pflicht.</li>
</ul>

<h3>Klasse 2 reicht f\u00fcr:</h3>
<ul>
<li><strong>Wei\u00df auf Wei\u00df:</strong> Wenn du eine wei\u00dfe Wand einfach auffrischen willst, reicht Klasse 2 problemlos.</li>
<li><strong>G\u00e4stezimmer, Abstellraum, Keller:</strong> R\u00e4ume, die nicht perfekt aussehen m\u00fcssen.</li>
<li><strong>Grundierung vor Farbton:</strong> Wenn danach noch ein Farbton dar\u00fcber kommt, reicht Klasse 2 als Basis.</li>
</ul>

<h2>Was kostet gute wei\u00dfe Wandfarbe?</h2>

<table>
<thead>
<tr><th>Kategorie</th><th>Preis pro Liter</th><th>Deckkraft</th><th>Ergiebigkeit</th><th>Beispiel-Marken</th></tr>
</thead>
<tbody>
<tr><td>Budget</td><td>1\u20133 \u20ac</td><td>Klasse 3\u20134</td><td>4\u20136 m\u00b2/l</td><td>Eigenmarken (Baumarkt)</td></tr>
<tr><td>Mittelklasse</td><td>3\u20137 \u20ac</td><td>Klasse 2</td><td>6\u20137 m\u00b2/l</td><td>Alpina, Sch\u00f6ner Wohnen</td></tr>
<tr><td>Premium</td><td>7\u201315 \u20ac</td><td>Klasse 1</td><td>7\u20138 m\u00b2/l</td><td>Caparol, Brillux</td></tr>
</tbody>
</table>

<p><strong>Rechnung am Beispiel 50 m\u00b2 Wand:</strong></p>
<ul>
<li>Budget-Farbe (Klasse 3, 5 m\u00b2/l): 10 Liter \u00d7 3 Anstriche = 30 Liter \u00d7 2 \u20ac = <strong>60 \u20ac</strong></li>
<li>Premium-Farbe (Klasse 1, 7 m\u00b2/l): 7 Liter \u00d7 2 Anstriche = 14 Liter \u00d7 10 \u20ac = <strong>140 \u20ac</strong></li>
</ul>

<p>Die Premium-Farbe kostet das Doppelte, spart aber die H\u00e4lfte der Arbeitszeit. Bei einem 30-\u20ac-Stundenlohn lohnt sich Klasse 1 ab ca. 40 m\u00b2.</p>

<p>\u2192 <a href="/rechner/wandfarbe">Berechne wie viel Farbe du f\u00fcr deinen Raum brauchst \u2192</a></p>

<h2>Tipps f\u00fcr ein perfektes Ergebnis</h2>

<ol>
<li><strong>Richtig r\u00fchren:</strong> Wandfarbe vor dem \u00d6ffnen mindestens 30 Sekunden kr\u00e4ftig durchr\u00fchren. Die Pigmente setzen sich am Boden ab \u2014 ohne R\u00fchren wird der erste Anstrich d\u00fcnner als der letzte.</li>
<li><strong>Nass-in-Nass arbeiten:</strong> Immer eine komplette Wand am St\u00fcck streichen. Wenn du mittendrin pausierst, entstehen sichtbare Ansatzstellen.</li>
<li><strong>Vom Licht weg streichen:</strong> Beginne am Fenster und arbeite dich ins Rauminnere vor. So siehst du sofort, ob du gleichm\u00e4\u00dfig deckst.</li>
<li><strong>Rolle statt Pinsel:</strong> F\u00fcr gro\u00dfe Fl\u00e4chen immer eine kurzflorige Rolle (10\u201312 mm) verwenden. Pinsel nur f\u00fcr Ecken und Kanten.</li>
<li><strong>Nicht verd\u00fcnnen:</strong> Premium-Farben sind gebrauchsfertig. Wasser zusetzen reduziert die Deckkraft und macht den Klasse-1-Vorteil zunichte.</li>
<li><strong>Trockenzeit einhalten:</strong> Zwischen den Anstrichen mindestens 4\u20136 Stunden warten (Herstellerangabe beachten). Bei hoher Luftfeuchtigkeit l\u00e4nger.</li>
</ol>

<h2>Unsere Empfehlungen</h2>

<p><strong>Preis-Leistungs-Tipp:</strong> <a href="https://www.amazon.de/s?k=Alpina+Wandwei%C3%9F+Deckkraftklasse+1&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Alpina Alpinwei\u00df</a> (ca. 4\u20136 \u20ac/Liter) \u2014 Deckkraftklasse 1, Nassabriebklasse 3. Die meistverkaufte wei\u00dfe Wandfarbe Deutschlands. Deckt zuverl\u00e4ssig in zwei Anstrichen, tropfgehemmt, und riecht kaum. F\u00fcr die meisten Heimwerker die beste Wahl.</p>

<p><strong>Premium-Tipp:</strong> <a href="https://www.amazon.de/s?k=Caparol+CapaMaxx+Wandfarbe&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Caparol CapaMaxx</a> (ca. 8\u201312 \u20ac/Liter) \u2014 Deckkraftklasse 1, Nassabriebklasse 2. Die Referenz unter den Premium-Wandfarben. Extrem hohe Deckkraft (Kontrastverh\u00e4ltnis \u00fcber 99,7 %), seidenmatte Optik, sehr ergiebig. Ideal f\u00fcr gro\u00dfe Fl\u00e4chen und repr\u00e4sentative R\u00e4ume.</p>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Sch%C3%B6ner+Wohnen+Polarwei%C3%9F&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Sch\u00f6ner Wohnen Polarwei\u00df</a> (ca. 3\u20135 \u20ac/Liter) \u2014 Deckkraftklasse 1, Nassabriebklasse 3. Gutes Preis-Leistungs-Verh\u00e4ltnis, im 10-Liter-Eimer oft im Angebot. Leicht weniger ergiebig als Alpina, aber f\u00fcr Wei\u00df-auf-Wei\u00df mehr als ausreichend.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Was bedeutet Deckkraftklasse 1?</h3>
<p>Deckkraftklasse 1 ist die h\u00f6chste Stufe nach DIN EN 13300. Die Farbe hat ein Kontrastverh\u00e4ltnis von mindestens 99,5 % \u2014 das hei\u00dft, sie deckt einen schwarzen Untergrund fast vollst\u00e4ndig ab. In der Praxis bedeutet das: Zwei Anstriche reichen f\u00fcr ein perfektes Ergebnis, auch \u00fcber dunklen Farben.</p>

<h3>Ist teure Wandfarbe wirklich besser?</h3>
<p>In den meisten F\u00e4llen ja. Der Preisunterschied kommt von h\u00f6herer Pigmentdichte (= bessere Deckung), besserer Ergiebigkeit (= weniger Liter pro m\u00b2) und weniger Anstrichen. Eine 10-\u20ac-Farbe mit Klasse 1 braucht 2 Anstriche, eine 2-\u20ac-Farbe mit Klasse 3 braucht 3\u20134. Am Ende zahlst du \u00e4hnlich viel \u2014 aber die billige Farbe kostet doppelt so viel Arbeitszeit.</p>

<h3>Wie viel Wandfarbe brauche ich pro m\u00b2?</h3>
<p>Richtwert: 150\u2013200 ml pro m\u00b2 pro Anstrich bei einer Klasse-1-Farbe. F\u00fcr 30 m\u00b2 Wandfl\u00e4che und 2 Anstriche brauchst du also ca. 10\u201312 Liter. Nutze unseren <a href="/rechner/wandfarbe">Wandfarbe-Rechner</a> f\u00fcr eine genaue Berechnung mit Fenster- und T\u00fcrabzug.</p>

<h3>Matt oder seidenmatt \u2014 was ist besser?</h3>
<p><strong>Matt</strong> kaschiert Unebenheiten in der Wand und wirkt ruhiger. Ideal f\u00fcr Wohn- und Schlafr\u00e4ume. <strong>Seidenmatt</strong> ist widerstandsf\u00e4higer und leichter zu reinigen, zeigt aber jede Delle. Ideal f\u00fcr K\u00fcche, Bad und Flur. F\u00fcr maximale Reinigungsf\u00e4higkeit gibt es <a href="/farben/latexfarbe">Latexfarbe</a> (seidenmatt bis gl\u00e4nzend).</p>

<h3>Brauche ich eine Grundierung?</h3>
<p>Auf saugenden Untergr\u00fcnden (neuer Putz, Gipskarton, Rigips) ist Tiefgrund empfehlenswert. Er reduziert die Saugf\u00e4higkeit und sorgt f\u00fcr gleichm\u00e4\u00dfige Deckung. Auf bereits gestrichenen W\u00e4nden (Wei\u00df auf Wei\u00df) brauchst du keine Grundierung. Bei mineralischen Untergr\u00fcnden (Kalk, Beton) ist <a href="/farben/silikatfarbe">Silikatfarbe</a> mit Silikat-Fixativ die bessere Wahl.</p>`;

// ─── STEINIMPRAEGNIERUNG ──────────────────────────────────────

const steinContent = `<p>Pflastersteine, Terrassenplatten und Fassaden sehen nach ein paar Jahren oft fleckig und gr\u00fcn aus. Eine Steinimpr\u00e4gnierung sch\u00fctzt mineralische Oberfl\u00e4chen vor Wasser, Moos und Flecken \u2014 ohne die Optik oder Dampfdurchl\u00e4ssigkeit zu ver\u00e4ndern. In diesem Guide erkl\u00e4ren wir, wie Steinimpr\u00e4gnierung funktioniert, was sie kostet, und wann eine Versiegelung die bessere Wahl ist.</p>

<h2>Was ist eine Steinimpr\u00e4gnierung?</h2>

<p>Eine Steinimpr\u00e4gnierung (fachsprachlich: <strong>Hydrophobierung</strong>) dringt in die Poren des Steins ein und macht die Oberfl\u00e4che wasserabweisend, ohne sie zu verschlie\u00dfen. Wasser perlt ab, Feuchtigkeit aus dem Stein kann aber weiterhin verdunsten. Die Optik bleibt unver\u00e4ndert \u2014 der Stein sieht nach der Behandlung genauso aus wie vorher, nur trockener.</p>

<p><strong>So funktioniert es:</strong> Die Impr\u00e4gnierung basiert meist auf <strong>Silanen oder Siloxanen</strong>. Diese Molek\u00fcle reagieren mit dem Stein und bilden eine wasserabweisende Schicht <em>innerhalb</em> der Poren. Anders als eine Versiegelung liegt die Schutzschicht nicht auf der Oberfl\u00e4che, sondern im Stein selbst.</p>

<h2>Impr\u00e4gnierung vs. Versiegelung</h2>

<table>
<thead>
<tr><th></th><th>Impr\u00e4gnierung</th><th>Versiegelung</th></tr>
</thead>
<tbody>
<tr><td><strong>Wirkung</strong></td><td>Wasserabweisend (hydrophob)</td><td>Wasserdicht (filmbildend)</td></tr>
<tr><td><strong>Optik</strong></td><td>Unver\u00e4ndert</td><td>Gl\u00e4nzend / Nasseffekt</td></tr>
<tr><td><strong>Dampfdurchl\u00e4ssig</strong></td><td>Ja</td><td>Nein</td></tr>
<tr><td><strong>Rutschfest</strong></td><td>Ja (unver\u00e4ndert)</td><td>Kann glatt werden</td></tr>
<tr><td><strong>Haltbarkeit</strong></td><td>5\u201315 Jahre</td><td>3\u201310 Jahre</td></tr>
<tr><td><strong>Reparierbar</strong></td><td>Einfach nachimpr\u00e4gnieren</td><td>Muss abgeschliffen werden</td></tr>
<tr><td><strong>Preis pro m\u00b2</strong></td><td>1\u20134 \u20ac</td><td>3\u201310 \u20ac</td></tr>
<tr><td><strong>Bester Einsatz</strong></td><td>Pflaster, Fassade, Naturstein</td><td>Arbeitsplatten, Innenb\u00f6den</td></tr>
</tbody>
</table>

<p><strong>Fazit:</strong> F\u00fcr Au\u00dfenfl\u00e4chen (Terrasse, Einfahrt, Fassade) ist eine Impr\u00e4gnierung fast immer die bessere Wahl. Sie ist dampfdurchl\u00e4ssig, rutschsicher und einfacher zu erneuern. Eine Versiegelung lohnt sich nur f\u00fcr Innenfl\u00e4chen (K\u00fcchenarbeitsplatten, Badezimmerboden), wo ein geschlossener Film erw\u00fcnscht ist.</p>

<h2>Geeignete Untergr\u00fcnde</h2>

<h3>Gut geeignet:</h3>
<ul>
<li><strong>Betonpflaster:</strong> Standard-Pflastersteine (grau, rot, anthrazit). Am h\u00e4ufigsten impr\u00e4gniert. Saugt das Mittel gut auf.</li>
<li><strong>Naturstein:</strong> Granit, Sandstein, Travertin, Basalt, Schiefer. Besonders wichtig bei por\u00f6sen Sorten wie Sandstein und Travertin.</li>
<li><strong>Klinker:</strong> Klinkerriemchen an Fassaden und Klinkerpflaster. Reduziert Ausbluehungen und Frostsch\u00e4den.</li>
<li><strong>Beton:</strong> Sichtbeton, Betonplatten, Betongaragen. Sch\u00fctzt vor Wasserflecken und Carbonatisierung.</li>
<li><strong>Terrassenplatten:</strong> Keramik, Feinsteinzeug, Betonwerkstein. Bei Keramik nur n\u00f6tig, wenn Fugen gesch\u00fctzt werden sollen.</li>
</ul>

<h3>Nicht geeignet:</h3>
<ul>
<li><strong>Bereits versiegelte Fl\u00e4chen:</strong> Impr\u00e4gnierung kann nicht in verschlossene Poren eindringen.</li>
<li><strong>Polierter Naturstein:</strong> Polierter Granit oder Marmor hat kaum offene Poren.</li>
<li><strong>\u00d6lflecken:</strong> Impr\u00e4gnierung sch\u00fctzt nicht gegen \u00d6l \u2014 daf\u00fcr gibt es spezielle Oleophobie-Mittel.</li>
</ul>

<h2>Was kostet eine Steinimpr\u00e4gnierung?</h2>

<table>
<thead>
<tr><th>Position</th><th>Kosten pro m\u00b2</th></tr>
</thead>
<tbody>
<tr><td>Impr\u00e4gnierung (Material, 2 Auftrage)</td><td>1,00\u20133,50 \u20ac</td></tr>
<tr><td>Reinigung vorher (optional)</td><td>0,50\u20131,50 \u20ac</td></tr>
<tr><td><strong>Gesamt (Eigenleistung)</strong></td><td><strong>1,50\u20135,00 \u20ac</strong></td></tr>
<tr><td>+ Handwerker (optional)</td><td>5\u201312 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Rechenbeispiel Terrasse 30 m\u00b2:</strong></p>
<ul>
<li>Material (Impr\u00e4gnierung): 30 \u00d7 2,50 \u20ac = <strong>75 \u20ac</strong></li>
<li>Reinigung + Material: ca. <strong>100 \u20ac</strong></li>
<li>Lebensdauer: 5\u201315 Jahre \u2192 <strong>7\u201320 \u20ac pro Jahr</strong></li>
</ul>

<p>\u2192 <a href="/rechner/terrasse">Berechne den Materialbedarf f\u00fcr deine Terrasse \u2192</a></p>

<h2>Anleitung: Steinimpr\u00e4gnierung auftragen</h2>

<h3>Vorbereitung</h3>
<ol>
<li><strong>Reinigen:</strong> Die Fl\u00e4che muss sauber, trocken und frei von Moos, Algen und \u00d6lflecken sein. Am besten mit Hochdruckreiniger oder speziellem Steinreiniger vorbehandeln.</li>
<li><strong>Trocknen lassen:</strong> Nach der Reinigung <strong>mindestens 24\u201348 Stunden</strong> trocknen lassen. Der Stein muss bis in die Tiefe trocken sein \u2014 das ist der h\u00e4ufigste Fehler.</li>
<li><strong>Wetter pr\u00fcfen:</strong> Ideal sind 10\u201325\u00b0C, kein Regen f\u00fcr die n\u00e4chsten 24 Stunden, kein direkter Sonnenschein (Impr\u00e4gnierung verdunstet sonst zu schnell).</li>
</ol>

<h3>Auftragen</h3>
<ol>
<li><strong>1. Auftrag:</strong> Impr\u00e4gnierung gleichm\u00e4\u00dfig mit Gartenspritze, Rolle oder Pinsel auftragen. Gro\u00dfz\u00fcgig arbeiten \u2014 der Stein soll die Fl\u00fcssigkeit aufsaugen k\u00f6nnen.</li>
<li><strong>Einwirken lassen:</strong> 15\u201330 Minuten warten. \u00dcbersch\u00fcssige Impr\u00e4gnierung, die nicht eingezogen ist, mit einem Lappen aufnehmen (verhindert Glanzflecken).</li>
<li><strong>2. Auftrag:</strong> Solange der erste Auftrag noch leicht feucht ist, den zweiten Auftrag quer zum ersten auftragen. Das sorgt f\u00fcr eine l\u00fcckenlose Abdeckung.</li>
<li><strong>Aush\u00e4rten:</strong> 24 Stunden nicht betreten, 48 Stunden nicht befahren. Kein Wasser in dieser Zeit.</li>
</ol>

<p><strong>Wichtige Hinweise:</strong></p>
<ul>
<li>Handschuhe und Schutzbrille tragen (Silan/Siloxan reizt die Haut)</li>
<li>Impr\u00e4gnierung nicht auf hei\u00dfem Stein auftragen (verdunstet, statt einzuziehen)</li>
<li>Rand- und Problemzonen (Fugen, Kanten) besonders sorgf\u00e4ltig behandeln</li>
<li>Pr\u00fcfe nach 48 Stunden mit dem <strong>Wasserperlentest</strong>: Gie\u00dfe etwas Wasser auf die Fl\u00e4che \u2014 es muss deutlich abperlen</li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Pflaster und Beton:</strong> <a href="https://www.amazon.de/s?k=Mellerud+Stein+Impr%C3%A4gnierung+au%C3%9Fen&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Mellerud Stein & Platten Impr\u00e4gnierung</a> (ca. 15\u201320 \u20ac / 2,5 Liter) \u2014 Bew\u00e4hrtes Produkt f\u00fcr Betonpflaster und Terrassenplatten. Wasserbasiert, geruchsarm, leicht aufzutragen. Ergiebigkeit: ca. 5\u201310 m\u00b2/Liter je nach Saugf\u00e4higkeit.</p>

<p><strong>Naturstein:</strong> <a href="https://www.amazon.de/s?k=Lithofin+MN+Fl%C3%A4chenimpraegnierung&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Lithofin MN Fl\u00e4chenimpr\u00e4gnierung</a> (ca. 25\u201335 \u20ac / Liter) \u2014 Premium-Produkt speziell f\u00fcr Naturstein (Sandstein, Travertin, Granit). L\u00f6semittelbasiert, daher tiefere Penetration und l\u00e4ngere Haltbarkeit (bis 15 Jahre). Teurer, aber die Referenz f\u00fcr empfindliche Natursteine.</p>

<p><strong>Gro\u00dfe Fl\u00e4chen (Einfahrt, Hof):</strong> <a href="https://www.amazon.de/s?k=Steinimpr%C3%A4gnierung+10+Liter+au%C3%9Fen&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">10-Liter-Gebinde</a> (ca. 40\u201370 \u20ac) \u2014 F\u00fcr Fl\u00e4chen ab 30 m\u00b2 lohnt sich der Kauf im Gro\u00dfgebinde. Achte auf Silan-/Siloxan-Basis und eine Ergiebigkeit von mindestens 3 m\u00b2/Liter.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Wie lange h\u00e4lt eine Steinimpr\u00e4gnierung?</h3>
<p>Je nach Produkt und Belastung <strong>5\u201315 Jahre</strong>. Auf wenig genutzten Terrassenfl\u00e4chen eher 10\u201315 Jahre, auf befahrenen Einfahrten eher 5\u20138 Jahre. Mit dem Wasserperlentest kannst du jedes Jahr pr\u00fcfen, ob der Schutz noch aktiv ist: Wenn Wasser nicht mehr abperlt, ist es Zeit zum Nachimpr\u00e4gnieren.</p>

<h3>Steinimpr\u00e4gnierung oder Steinversiegelung?</h3>
<p>F\u00fcr Au\u00dfenfl\u00e4chen (Terrasse, Einfahrt, Fassade) immer <strong>Impr\u00e4gnierung</strong>. Sie ist dampfdurchl\u00e4ssig, rutschsicher und einfach zu erneuern. Versiegelung bildet einen Film auf der Oberfl\u00e4che, der bei Frost abplatzen kann und die Fl\u00e4che rutschig macht. Versiegelung nur f\u00fcr Innenfl\u00e4chen (K\u00fcchenarbeitsplatten, Badboden).</p>

<h3>Muss ich vor der Impr\u00e4gnierung reinigen?</h3>
<p>Ja, unbedingt. Die Poren m\u00fcssen offen und sauber sein, damit die Impr\u00e4gnierung eindringen kann. Auf verschmutztem Stein bildet die Impr\u00e4gnierung nur einen d\u00fcnnen Film auf der Oberfl\u00e4che, der schnell abbl\u00e4ttert. Am besten mit Hochdruckreiniger oder Steinreiniger vorbehandeln und 24\u201348 Stunden trocknen lassen.</p>

<h3>Hilft Steinimpr\u00e4gnierung gegen Moos und Algen?</h3>
<p>Indirekt ja. Moos und Algen brauchen Feuchtigkeit zum Wachsen. Da die Impr\u00e4gnierung Wasser abperlen l\u00e4sst, bleibt die Oberfl\u00e4che trockener und bietet weniger N\u00e4hrboden. Eine 100-prozentige Verhinderung ist aber nicht m\u00f6glich \u2014 an schattigen, dauerhaft feuchten Stellen kann trotz Impr\u00e4gnierung Moosbildung auftreten.</p>

<h3>Kann ich Pflastersteine selbst impr\u00e4gnieren?</h3>
<p>Ja, das ist eine typische Heimwerker-Aufgabe. Du brauchst: Hochdruckreiniger (oder Steinreiniger), Gartenspritze oder Rolle, und die Impr\u00e4gnierung selbst. Wichtigster Tipp: Genug Trockenzeit nach der Reinigung einplanen (mindestens 24 Stunden). Die reine Auftragszeit f\u00fcr 30 m\u00b2 betr\u00e4gt ca. 1\u20132 Stunden. Wenn du auch einen neuen <a href="/farben/pflasterfugenmoertel">Pflasterfugenm\u00f6rtel</a> auftragen willst, mache das <em>vor</em> der Impr\u00e4gnierung.</p>`;

async function run() {
  // ── Update Wandfarbe Weiß ──
  console.log("=== WANDFARBE WEISS ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten?slug=eq.wandfarbe-weiss", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Wandfarbe Wei\u00df: Welche Deckkraft brauchst du wirklich? (2026)",
      seo_title: "Wandfarbe Wei\u00df: Welche Deckkraft brauchst du wirklich? (2026)",
      seo_description:
        "Deckkraftklassen erkl\u00e4rt: Welche wei\u00dfe Wandfarbe lohnt sich wirklich? Kosten pro Liter, Ergiebigkeit, Nassabriebklassen und die besten Marken im Vergleich.",
      content_md: wandfarbeContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d1 = await res1.json();
  console.log(
    res1.ok && d1.length > 0
      ? "OK: Wandfarbe Wei\u00df aktualisiert (" + d1[0].slug + ")"
      : "FAIL: " + JSON.stringify(d1)
  );

  // ── Update Steinimprägnierung ──
  console.log("\n=== STEINIMPR\u00c4GNIERUNG ===");
  const res2 = await fetch(
    BASE + "/rest/v1/seiten?slug=eq.steinimpraegnierung",
    {
      method: "PATCH",
      headers,
      body: JSON.stringify({
        titel: "Steinimpr\u00e4gnierung au\u00dfen: Kosten, Anwendung & die besten Produkte (2026)",
        seo_title: "Steinimpr\u00e4gnierung au\u00dfen: Kosten, Anwendung & Produkte (2026)",
        seo_description:
          "Steinimpr\u00e4gnierung f\u00fcr Terrasse, Pflaster und Fassade: Was kostet es, wie funktioniert es, wann lohnt Versiegelung? Anleitung, Kosten und Produktempfehlungen.",
        content_md: steinContent,
        updated_at: new Date().toISOString(),
      }),
    }
  );
  const d2 = await res2.json();
  console.log(
    res2.ok && d2.length > 0
      ? "OK: Steinimpr\u00e4gnierung aktualisiert (" + d2[0].slug + ")"
      : "FAIL: " + JSON.stringify(d2)
  );
}

run();

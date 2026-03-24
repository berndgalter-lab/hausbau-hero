const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

// ─── SILIKATFARBE ─────────────────────────────────────────────

const silikatContent = `<p>Silikatfarbe ist eine mineralische Farbe auf Basis von Kaliwasserglas. Anders als herk\u00f6mmliche Dispersionsfarben bildet sie keinen Film auf der Oberfl\u00e4che, sondern verbindet sich chemisch mit dem Untergrund \u2014 sie \u201everkieselt\u201c. Das macht sie extrem langlebig, dampfdurchl\u00e4ssig und schimmelresistent. Kein Wunder, dass Silikatfarbe seit \u00fcber 100 Jahren bei Denkmalsch\u00fctzern, Kirchenmalern und Fassadenprofis erste Wahl ist.</p>

<p>In diesem Guide erkl\u00e4ren wir, wann Silikatfarbe die richtige Wahl ist, was sie kostet, und worauf du bei der Verarbeitung achten musst.</p>

<h2>Was ist Silikatfarbe?</h2>

<p>Silikatfarbe besteht im Kern aus <strong>Kaliwasserglas</strong> (Kaliumsilikat) als Bindemittel und mineralischen Pigmenten. Beim Auftragen auf mineralische Untergr\u00fcnde reagiert das Wasserglas chemisch mit dem Kalk oder Zement im Untergrund. Diese Reaktion hei\u00dft <strong>Verkieselung</strong> \u2014 die Farbe wird buchst\u00e4blich Teil der Wand.</p>

<p>Wichtig ist die Unterscheidung zwischen zwei Typen:</p>

<p><strong>Rein-Silikatfarbe (nach DIN 18363 2.4.1):</strong> Enth\u00e4lt ausschlie\u00dflich Kaliwasserglas als Bindemittel. Muss vor Ort aus Pulver und Fl\u00fcssigkomponente angemischt werden. Wird haupts\u00e4chlich von Profis und im Denkmalschutz verwendet.</p>

<p><strong>Dispersions-Silikatfarbe (nach DIN 18363 2.4.6):</strong> Enth\u00e4lt bis zu 5 % organisches Bindemittel (Kunststoffdispersion) f\u00fcr bessere Verarbeitbarkeit. Kommt gebrauchsfertig aus dem Eimer und ist f\u00fcr Heimwerker deutlich einfacher zu verarbeiten. Die meisten Produkte im Baumarkt sind Dispersions-Silikatfarben.</p>

<h2>Silikatfarbe vs. Dispersionsfarbe vs. Kalkfarbe</h2>

<table>
<thead>
<tr><th></th><th>Silikatfarbe</th><th>Dispersionsfarbe</th><th>Kalkfarbe</th></tr>
</thead>
<tbody>
<tr><td><strong>Bindemittel</strong></td><td>Kaliwasserglas</td><td>Kunststoff (Acryl)</td><td>Sumpfkalk</td></tr>
<tr><td><strong>Haltbarkeit</strong></td><td>20\u201340 Jahre</td><td>5\u201315 Jahre</td><td>10\u201320 Jahre</td></tr>
<tr><td><strong>Dampfdurchl\u00e4ssig</strong></td><td>Sehr gut</td><td>Mittel</td><td>Sehr gut</td></tr>
<tr><td><strong>Schimmelresistent</strong></td><td>Ja (alkalisch)</td><td>Nein</td><td>Ja (alkalisch)</td></tr>
<tr><td><strong>Preis pro m\u00b2</strong></td><td>3\u20138 \u20ac</td><td>1\u20133 \u20ac</td><td>2\u20135 \u20ac</td></tr>
<tr><td><strong>Untergrund</strong></td><td>Nur mineralisch</td><td>Fast alles</td><td>Nur mineralisch</td></tr>
<tr><td><strong>Verarbeitung</strong></td><td>Anspruchsvoll</td><td>Einfach</td><td>Mittel</td></tr>
<tr><td><strong>Bester Einsatz</strong></td><td>Fassade, Keller, Denkmal</td><td>Innenr\u00e4ume allgemein</td><td>Historische Geb\u00e4ude</td></tr>
</tbody>
</table>

<p><strong>Fazit:</strong> Silikatfarbe lohnt sich, wenn du Langlebigkeit, Dampfdurchl\u00e4ssigkeit und Schimmelschutz brauchst \u2014 vor allem an Fassaden und in feuchten R\u00e4umen. F\u00fcr normale Innenw\u00e4nde ist eine gute <a href="/farben/wandfarbe-weiss">Dispersionsfarbe</a> g\u00fcnstiger und einfacher.</p>

<h2>Geeignete Untergr\u00fcnde</h2>

<p>Silikatfarbe braucht einen <strong>mineralischen Untergrund</strong>, damit die Verkieselung funktioniert:</p>

<ul>
<li><strong>Geeignet:</strong> Kalkputz, Zementputz, Kalk-Zement-Putz, Beton, Naturstein, alte Silikatfarbe</li>
<li><strong>Nicht geeignet:</strong> Gips, Gipskarton (Rigips), Holz, Metall, Tapete, alte Dispersionsfarbe</li>
</ul>

<p><strong>Wichtig:</strong> Auf Gips oder Gipskarton haftet Silikatfarbe nicht \u2014 sie bl\u00e4ttert nach kurzer Zeit ab. Wenn du Rigips-W\u00e4nde streichen willst, nimm eine <a href="/farben/latexfarbe">Latexfarbe</a> oder Dispersionsfarbe.</p>

<h2>Wann ist Silikatfarbe sinnvoll?</h2>

<ul>
<li><strong>Fassaden:</strong> Extrem witterungsbest\u00e4ndig, UV-stabil, keine Algenbildung. Haltbarkeit 20\u201340 Jahre.</li>
<li><strong>Feuchte R\u00e4ume:</strong> Keller, Waschk\u00fcche, Bad \u2014 dampfdurchl\u00e4ssig und schimmelhemmend durch alkalischen pH-Wert.</li>
<li><strong>Denkmalschutz:</strong> Vorgeschrieben bei vielen historischen Geb\u00e4uden, da mineralisch und reversibel.</li>
<li><strong>Allergiker-Haushalte:</strong> L\u00f6semittelfrei, keine Weichmacher, keine Konservierungsstoffe.</li>
</ul>

<h2>Was kostet Silikatfarbe?</h2>

<table>
<thead>
<tr><th>Position</th><th>Kosten pro m\u00b2</th></tr>
</thead>
<tbody>
<tr><td>Silikat-Grundierung</td><td>0,50\u20131,50 \u20ac</td></tr>
<tr><td>Silikatfarbe (2 Anstriche)</td><td>2,50\u20136,00 \u20ac</td></tr>
<tr><td><strong>Gesamt (Material)</strong></td><td><strong>3,00\u20137,50 \u20ac</strong></td></tr>
<tr><td>+ Handwerker (optional)</td><td>8\u201315 \u20ac</td></tr>
</tbody>
</table>

<p>Zum Vergleich: Dispersionsfarbe kostet 1\u20133 \u20ac/m\u00b2. Silikatfarbe ist also 2\u20133x teurer \u2014 h\u00e4lt daf\u00fcr aber auch 2\u20133x l\u00e4nger.</p>

<p>\u2192 <a href="/rechner/wandfarbe">Berechne wie viel Farbe du f\u00fcr deinen Raum brauchst \u2192</a></p>

<h2>Verarbeitung: Schritt f\u00fcr Schritt</h2>

<ol>
<li><strong>Untergrund pr\u00fcfen:</strong> Muss mineralisch, tragf\u00e4hig, sauber und trocken sein. Alte Dispersionsfarbe vollst\u00e4ndig entfernen.</li>
<li><strong>Grundierung auftragen:</strong> Silikat-Grundierung (Fixativ) ist <strong>Pflicht</strong> \u2014 ohne Grundierung haftet die Farbe nicht zuverl\u00e4ssig.</li>
<li><strong>Trocknen lassen:</strong> Mindestens 12 Stunden warten.</li>
<li><strong>1. Anstrich:</strong> Silikatfarbe gleichm\u00e4\u00dfig mit Rolle oder Pinsel auftragen. D\u00fcnn arbeiten, nicht zu viel Farbe auf einmal.</li>
<li><strong>2. Anstrich:</strong> Nach 12\u201324 Stunden den zweiten Anstrich auftragen. Zwei Anstriche sind bei Silikatfarbe Standard.</li>
</ol>

<p><strong>Wichtige Hinweise:</strong></p>
<ul>
<li>Nicht bei Temperaturen unter 5\u00b0C oder \u00fcber 30\u00b0C verarbeiten</li>
<li>Nicht bei direkter Sonneneinstrahlung oder Regen (Fassade)</li>
<li>Silikatfarbe \u00e4tzt Glas und Metall \u2014 Fensterrahmen und Beschl\u00e4ge sorgf\u00e4ltig abkleben</li>
<li>Werkzeug sofort nach Gebrauch reinigen (verkieselt sonst)</li>
</ul>

<h2>Unsere Empfehlungen</h2>

<p><strong>Innen-Tipp:</strong> <a href="https://www.amazon.de/s?k=KEIM+Biosil+Silikatfarbe&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">KEIM Biosil</a> (ca. 8\u201312 \u20ac/Liter) \u2014 Premium-Silikatfarbe vom Marktf\u00fchrer. T\u00dcV-gepr\u00fcft f\u00fcr Allergiker, extrem dampfdurchl\u00e4ssig, praktisch geruchlos. Die Referenz f\u00fcr Innenr\u00e4ume.</p>

<p><strong>Fassaden-Tipp:</strong> <a href="https://www.amazon.de/s?k=Caparol+Sylitol+Silikatfarbe&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Caparol Sylitol</a> (ca. 5\u20138 \u20ac/Liter) \u2014 Dispersions-Silikatfarbe f\u00fcr Au\u00dfen. Gutes Preis-Leistungs-Verh\u00e4ltnis, bew\u00e4hrt an Millionen Fassaden. Leichter zu verarbeiten als Rein-Silikat.</p>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Silikatfarbe+innen+10l&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Silikatfarbe 10L Gebinde</a> (ca. 4\u20136 \u20ac/Liter) \u2014 F\u00fcr gro\u00dfe Fl\u00e4chen lohnt sich der Kauf im 10- oder 15-Liter-Gebinde. Achte auf die Kennzeichnung \u201eDIN 18363\u201c f\u00fcr echte Silikatqualit\u00e4t.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Ist Silikatfarbe besser als Dispersionsfarbe?</h3>
<p>Kommt auf den Einsatz an. F\u00fcr Fassaden, feuchte R\u00e4ume und Denkmalschutz ist Silikatfarbe klar besser (langlebiger, schimmelhemmend, dampfdurchl\u00e4ssig). F\u00fcr normale Innenw\u00e4nde auf Gipskarton ist Dispersionsfarbe g\u00fcnstiger und einfacher \u2014 denn Silikatfarbe haftet auf Gips nicht.</p>

<h3>Kann ich Silikatfarbe auf Rigips streichen?</h3>
<p>Nein. Silikatfarbe braucht einen mineralischen Untergrund (Kalk, Zement, Beton) f\u00fcr die Verkieselung. Auf Gipskarton (Rigips) haftet sie nicht dauerhaft. Nimm stattdessen eine hochwertige Dispersionsfarbe oder <a href="/farben/latexfarbe">Latexfarbe</a>.</p>

<h3>Wie lange h\u00e4lt Silikatfarbe?</h3>
<p>An Fassaden 20\u201340 Jahre, an Innenw\u00e4nden praktisch unbegrenzt. Zum Vergleich: Dispersionsfarbe h\u00e4lt 5\u201315 Jahre. Die h\u00f6heren Materialkosten relativieren sich durch die deutlich l\u00e4ngere Lebensdauer.</p>

<h3>Ist Silikatfarbe wirklich schimmelfest?</h3>
<p>Ja \u2014 durch den alkalischen pH-Wert (ca. 11\u201312) bietet Silikatfarbe keinen N\u00e4hrboden f\u00fcr Schimmel. Zus\u00e4tzlich ist sie dampfdurchl\u00e4ssig, sodass Feuchtigkeit entweichen kann statt sich unter der Farbschicht zu stauen. F\u00fcr Keller und feuchte R\u00e4ume eine der besten Optionen.</p>

<h3>Brauche ich eine Grundierung?</h3>
<p>Ja, unbedingt. Silikat-Grundierung (Fixativ) ist bei Silikatfarbe Pflicht. Sie reguliert die Saugf\u00e4higkeit des Untergrunds und sorgt f\u00fcr eine gleichm\u00e4\u00dfige Verkieselung. Ohne Grundierung riskierst du Fleckenbildung und schlechte Haftung.</p>`;

// ─── LATEXFARBE ───────────────────────────────────────────────

const latexContent = `<p>Latexfarbe geh\u00f6rt zu den strapazierfaehigsten Wandfarben \u00fcberhaupt: abwaschbar, sto\u00dffest und feuchtigkeitsbest\u00e4ndig. Aber braucht man sie wirklich? Und was steckt \u00fcberhaupt drin \u2014 echtes Latex? In diesem Guide kl\u00e4ren wir, wann Latexfarbe sinnvoll ist, was sie kostet, und in welchen R\u00e4umen du besser eine andere Farbe nimmst.</p>

<h2>Was ist Latexfarbe?</h2>

<p>Moderne \u201eLatexfarbe\u201c enth\u00e4lt in der Regel <strong>kein echtes Naturlatex</strong> (Kautschuk). Der Name ist historisch \u2014 fr\u00fcher wurde tats\u00e4chlich Naturlatex als Bindemittel verwendet. Heute sind fast alle Latexfarben <strong>Kunststoff-Dispersionen</strong> mit einem besonders hohen Bindemittelanteil, der die Oberfl\u00e4che glatt und abwaschbar macht.</p>

<p>Die Unterscheidung, die z\u00e4hlt:</p>

<p><strong>Echte Latexfarbe:</strong> Hochgl\u00e4nzend, extrem strapazierf\u00e4hig, bildet einen dichten Film. Wird fast nur noch im Profibereich (Krankenh\u00e4user, Gro\u00dfk\u00fcchen) eingesetzt. Teuer und schwer \u00fcberstreichbar.</p>

<p><strong>\u201eLatex\u00e4hnliche\u201c Dispersionsfarbe:</strong> Das, was im Baumarkt als \u201eLatexfarbe\u201c verkauft wird. Seidenmatt bis gl\u00e4nzend, abwischbar, gut f\u00fcr K\u00fcche und Bad. Deutlich einfacher zu verarbeiten und zu \u00fcberstreichen als echte Latexfarbe.</p>

<p><strong>Faustregel:</strong> Je h\u00f6her der Glanzgrad, desto strapazierf\u00e4higer und abwaschbarer \u2014 aber auch desto sichtbarer Unebenheiten in der Wand.</p>

<h2>Latexfarbe vs. Dispersionsfarbe vs. Silikatfarbe</h2>

<table>
<thead>
<tr><th></th><th>Latexfarbe</th><th>Dispersionsfarbe</th><th>Silikatfarbe</th></tr>
</thead>
<tbody>
<tr><td><strong>Oberfl\u00e4che</strong></td><td>Seidenmatt bis gl\u00e4nzend</td><td>Matt bis seidenmatt</td><td>Matt</td></tr>
<tr><td><strong>Abwaschbar</strong></td><td>Ja</td><td>Bedingt</td><td>Nein</td></tr>
<tr><td><strong>Sto\u00dffest</strong></td><td>Sehr gut</td><td>Mittel</td><td>Gut</td></tr>
<tr><td><strong>Dampfdurchl\u00e4ssig</strong></td><td>Gering</td><td>Mittel</td><td>Sehr gut</td></tr>
<tr><td><strong>\u00dcberstreichbar</strong></td><td>Schwierig</td><td>Einfach</td><td>Nur mit Silikat</td></tr>
<tr><td><strong>Preis pro m\u00b2</strong></td><td>2\u20136 \u20ac</td><td>1\u20133 \u20ac</td><td>3\u20138 \u20ac</td></tr>
<tr><td><strong>Bester Einsatz</strong></td><td>K\u00fcche, Bad, Flur</td><td>Wohn-/Schlafzimmer</td><td>Fassade, Keller</td></tr>
</tbody>
</table>

<p><strong>Fazit:</strong> Latexfarbe ist die richtige Wahl f\u00fcr stark beanspruchte R\u00e4ume, in denen die W\u00e4nde abwaschbar sein m\u00fcssen. F\u00fcr normale Wohnr\u00e4ume reicht eine gute <a href="/farben/wandfarbe-weiss">Dispersionsfarbe</a> \u2014 f\u00fcr feuchte R\u00e4ume auf mineralischem Untergrund ist <a href="/farben/silikatfarbe">Silikatfarbe</a> die bessere Alternative.</p>

<h2>Wann ist Latexfarbe sinnvoll?</h2>

<h3>Ja, sinnvoll in:</h3>
<ul>
<li><strong>K\u00fcche:</strong> Spritzer von Fett und So\u00dfen lassen sich einfach abwischen. Besonders \u00fcber dem Herd und hinter der Sp\u00fcle.</li>
<li><strong>Bad:</strong> Feuchtigkeitsbest\u00e4ndig und schimmelresistenter als normale Dispersionsfarbe. Ideal f\u00fcr den Bereich au\u00dferhalb der direkten Spritzzone.</li>
<li><strong>Flur und Treppenhaus:</strong> Hier streifen regelm\u00e4\u00dfig Jacken, Taschen und Schuhe an der Wand. Latexfarbe h\u00e4lt das aus.</li>
<li><strong>Kinderzimmer:</strong> Buntstifte, Fingerfarben, Matsch \u2014 Latexfarbe l\u00e4sst sich feucht abwischen.</li>
</ul>

<h3>Eher nicht in:</h3>
<ul>
<li><strong>Schlafzimmer:</strong> Die eingeschr\u00e4nkte Dampfdurchl\u00e4ssigkeit kann in Schlafr\u00e4umen zu feuchterer Raumluft f\u00fchren. Hier ist eine diffusionsoffene Farbe besser.</li>
<li><strong>Keller:</strong> In feuchten Kellern brauchst du maximale Dampfdurchl\u00e4ssigkeit \u2014 nimm <a href="/farben/silikatfarbe">Silikatfarbe</a>.</li>
<li><strong>Fassade:</strong> Latexfarbe ist f\u00fcr Au\u00dfen nicht geeignet. Hier ist Silikatfarbe oder Fassadendispersion richtig.</li>
</ul>

<h2>Was kostet Latexfarbe?</h2>

<table>
<thead>
<tr><th>Kategorie</th><th>Preis pro Liter</th><th>Kosten pro m\u00b2</th><th>Marken</th></tr>
</thead>
<tbody>
<tr><td>Budget</td><td>2\u20134 \u20ac</td><td>1,50\u20133,00 \u20ac</td><td>Sch\u00f6ner Wohnen, Wilckens</td></tr>
<tr><td>Mittelklasse</td><td>4\u20138 \u20ac</td><td>3,00\u20135,00 \u20ac</td><td>Alpina, Caparol</td></tr>
<tr><td>Premium</td><td>8\u201315 \u20ac</td><td>5,00\u20138,00 \u20ac</td><td>Brillux, Caparol Latex</td></tr>
</tbody>
</table>

<p>Latexfarbe ist etwas teurer als normale Dispersionsfarbe, aber g\u00fcnstiger als Silikatfarbe. Da sie sehr strapazierf\u00e4hig ist, musst du seltener nachstreichen \u2014 das relativiert den h\u00f6heren Preis.</p>

<p>\u2192 <a href="/rechner/wandfarbe">Berechne wie viel Farbe du brauchst \u2192</a></p>

<h2>Verarbeitung: Tipps f\u00fcr ein gutes Ergebnis</h2>

<ol>
<li><strong>Untergrund vorbereiten:</strong> Wand muss sauber, trocken und tragf\u00e4hig sein. Lose Farbe oder Tapete entfernen. L\u00f6cher und Risse mit Spachtelmasse f\u00fcllen.</li>
<li><strong>Grundierung:</strong> Auf stark saugenden Untergr\u00fcnden (neuer Putz, Gipskarton) mit Tiefgrund vorstreichen. Das spart Farbe und verbessert die Haftung.</li>
<li><strong>Abkleben:</strong> Latexfarbe l\u00e4uft leicht und ist nach dem Trocknen schwer zu entfernen. Fenster, Steckdosen und Kanten sorgf\u00e4ltig abkleben.</li>
<li><strong>D\u00fcnn auftragen:</strong> Lieber zwei d\u00fcnne Anstriche als einen dicken. Zwischen den Anstrichen 6\u201312 Stunden trocknen lassen.</li>
<li><strong>Werkzeug sofort reinigen:</strong> Angetrocknete Latexfarbe l\u00e4sst sich nur schwer von Rollen und Pinseln entfernen.</li>
</ol>

<p><strong>Achtung beim \u00dcberstreichen:</strong> Wenn du sp\u00e4ter auf matte Dispersionsfarbe wechseln willst, musst du die Latexschicht zuerst anschleifen (K\u00f6rnung 120\u2013180), damit die neue Farbe haftet. Ohne Anschleifen perlt die Dispersionsfarbe auf der glatten Latexoberfl\u00e4che ab.</p>

<h2>Unsere Empfehlungen</h2>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Alpina+Latexfarbe+abwaschbar&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Alpina Latexfarbe</a> (ca. 4\u20136 \u20ac/Liter) \u2014 Seidenmatt, gut deckend, angenehm in der Verarbeitung. Die meistverkaufte Latexfarbe im Baumarkt \u2014 aus gutem Grund.</p>

<p><strong>Qualit\u00e4ts-Tipp:</strong> <a href="https://www.amazon.de/s?k=Caparol+Latex+Samtens&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Caparol LatexSamtens</a> (ca. 7\u201310 \u20ac/Liter) \u2014 Seidenmatte Premium-Latexfarbe. Hervorragende Deckkraft (Klasse 1), sehr gute Nassabriebfestigkeit (Klasse 2). Ideal f\u00fcr K\u00fcche und Bad.</p>

<p><strong>Hochglanz-Tipp:</strong> <a href="https://www.amazon.de/s?k=Brillux+Latex+gl%C3%A4nzend&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Brillux Latex</a> (ca. 10\u201315 \u20ac/Liter) \u2014 Gl\u00e4nzende Profi-Latexfarbe f\u00fcr maximale Strapazierf\u00e4higkeit. Perfekt f\u00fcr Treppenh\u00e4user, Praxen und stark frequentierte Bereiche.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Ist Latexfarbe wirklich abwaschbar?</h3>
<p>Ja \u2014 die meisten modernen Latexfarben erf\u00fcllen Nassabriebklasse 2 oder 3 (nach DIN EN 13300). Das bedeutet, du kannst die Wand mit einem feuchten Tuch und mildem Reinigungsmittel abwischen. Echte hochgl\u00e4nzende Latexfarbe (Klasse 1) ist sogar mit Schwamm und Seife schruppbar.</p>

<h3>Kann ich Latexfarbe \u00fcberstreichen?</h3>
<p>Ja, aber nicht ohne Vorbereitung. Die glatte Oberfl\u00e4che muss zuerst <strong>angeschliffen</strong> werden (Schleifpapier K\u00f6rnung 120\u2013180), damit die neue Farbe haftet. Anschlie\u00dfend mit Tiefgrund vorstreichen. Ohne Anschleifen perlt die neue Farbe ab.</p>

<h3>Ist Latexfarbe f\u00fcrs Bad geeignet?</h3>
<p>Ja, Latexfarbe ist eine gute Wahl f\u00fcr Badezimmerw\u00e4nde \u2014 au\u00dferhalb der direkten Spritzzone (diese sollte gefliest sein). Sie ist feuchtigkeitsbest\u00e4ndig und schimmelresistenter als normale Dispersionsfarbe. F\u00fcr das Bad empfehlen wir seidenmatte Latexfarbe mit Nassabriebklasse 2.</p>

<h3>Latexfarbe oder Dispersionsfarbe \u2014 was nehmen?</h3>
<p><strong>Dispersionsfarbe</strong> reicht f\u00fcr die meisten Wohnr\u00e4ume (Wohnzimmer, Schlafzimmer, B\u00fcro). <strong>Latexfarbe</strong> lohnt sich dort, wo die Wand regelm\u00e4\u00dfig beansprucht und gereinigt wird: K\u00fcche, Bad, Flur, Kinderzimmer, Treppenhaus. Der Aufpreis von 1\u20133 \u20ac/m\u00b2 ist in diesen R\u00e4umen gut investiert.</p>

<h3>Ist Latexfarbe gesundheitssch\u00e4dlich?</h3>
<p>Nein. Moderne Latexfarben auf Wasserbasis sind geruchsarm und enthalten keine L\u00f6semittel. Achte auf das Umweltzeichen \u201eBlauer Engel\u201c f\u00fcr besonders emissionsarme Produkte. W\u00e4hrend der Verarbeitung gut l\u00fcften, nach dem Trocknen gibt die Farbe keine Schadstoffe mehr ab.</p>`;

async function run() {
  // ── Update Silikatfarbe ──
  console.log("=== SILIKATFARBE ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten?slug=eq.silikatfarbe", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Silikatfarbe: Vorteile, Nachteile & Kosten \u2014 der ehrliche Guide (2026)",
      seo_title: "Silikatfarbe: Vorteile, Nachteile & Kosten (2026)",
      seo_description:
        "Was ist Silikatfarbe, wann lohnt sie sich und was kostet sie? Vergleich mit Dispersionsfarbe, Kosten pro m\u00b2, Verarbeitungstipps und Kaufempfehlungen.",
      content_md: silikatContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d1 = await res1.json();
  console.log(res1.ok && d1.length > 0 ? "OK: Silikatfarbe aktualisiert" : "FAIL: " + JSON.stringify(d1));

  // ── Update Latexfarbe ──
  console.log("\n=== LATEXFARBE ===");
  const res2 = await fetch(BASE + "/rest/v1/seiten?slug=eq.latexfarbe", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Latexfarbe: Wann lohnt sie sich wirklich? Kosten & Tipps (2026)",
      seo_title: "Latexfarbe: Wann lohnt sie sich wirklich? Kosten & Tipps (2026)",
      seo_description:
        "Latexfarbe f\u00fcr K\u00fcche, Bad und Flur: Wann sinnvoll, was kostet sie, wie verarbeiten? Vergleich mit Dispersions- und Silikatfarbe.",
      content_md: latexContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d2 = await res2.json();
  console.log(res2.ok && d2.length > 0 ? "OK: Latexfarbe aktualisiert" : "FAIL: " + JSON.stringify(d2));
}

run();

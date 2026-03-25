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

// ─── ARTIKEL 1: KAUFNEBENKOSTEN ──────────────────────────────

const kaufnebenkostenContent = `<p>Wer eine Immobilie kauft, zahlt nicht nur den Kaufpreis \u2014 sondern on top noch <strong>8\u201315 % Kaufnebenkosten</strong>. Bei einem 400.000-\u20ac-Haus sind das 32.000\u201360.000 \u20ac, die du zus\u00e4tzlich aufbringen musst und die nicht finanziert werden. In diesem Guide erkl\u00e4ren wir alle Kostenpositionen, wie du sie berechnest, und wo du sparen kannst.</p>

<p>\u2192 <a href="/rechner/nebenkosten"><strong>Berechne deine Kaufnebenkosten in 30 Sekunden \u2192 Nebenkosten-Rechner</strong></a></p>

<h2>Was sind Kaufnebenkosten?</h2>

<p>Kaufnebenkosten sind alle Kosten, die beim Immobilienkauf <strong>zus\u00e4tzlich zum Kaufpreis</strong> anfallen. Sie m\u00fcssen in der Regel aus Eigenkapital bezahlt werden \u2014 die meisten Banken finanzieren sie nicht. Die vier gro\u00dfen Posten:</p>

<ol>
<li><strong>Grunderwerbsteuer</strong> \u2014 3,5\u20136,5 % (je nach Bundesland)</li>
<li><strong>Notarkosten</strong> \u2014 ca. 1,5\u20132,0 % des Kaufpreises</li>
<li><strong>Grundbuchkosten</strong> \u2014 ca. 0,5 % des Kaufpreises</li>
<li><strong>Maklerprovision</strong> \u2014 3,0\u20133,57 % (K\u00e4uferanteil, falls Makler involviert)</li>
</ol>

<p><strong>Rechenbeispiel (Kaufpreis 350.000 \u20ac, NRW, mit Makler):</strong></p>

<table>
<thead>
<tr><th>Position</th><th>Satz</th><th>Betrag</th></tr>
</thead>
<tbody>
<tr><td>Grunderwerbsteuer</td><td>6,5 %</td><td>22.750 \u20ac</td></tr>
<tr><td>Notar</td><td>1,5 %</td><td>5.250 \u20ac</td></tr>
<tr><td>Grundbuch</td><td>0,5 %</td><td>1.750 \u20ac</td></tr>
<tr><td>Makler (K\u00e4uferanteil)</td><td>3,57 %</td><td>12.495 \u20ac</td></tr>
<tr><td><strong>Kaufnebenkosten gesamt</strong></td><td><strong>12,07 %</strong></td><td><strong>42.245 \u20ac</strong></td></tr>
<tr><td><strong>Gesamtkosten</strong></td><td></td><td><strong>392.245 \u20ac</strong></td></tr>
</tbody>
</table>

<h2>Grunderwerbsteuer nach Bundesland (2026)</h2>

<p>Die Grunderwerbsteuer ist der gr\u00f6\u00dfte Einzelposten und variiert je nach Bundesland erheblich:</p>

<table>
<thead>
<tr><th>Bundesland</th><th>Steuersatz</th><th>Bei 300.000 \u20ac</th></tr>
</thead>
<tbody>
<tr><td>Bayern</td><td>3,5 %</td><td>10.500 \u20ac</td></tr>
<tr><td>Sachsen</td><td>3,5 %</td><td>10.500 \u20ac</td></tr>
<tr><td>Hamburg</td><td>5,5 %</td><td>16.500 \u20ac</td></tr>
<tr><td>Baden-W\u00fcrttemberg</td><td>5,0 %</td><td>15.000 \u20ac</td></tr>
<tr><td>Berlin</td><td>6,0 %</td><td>18.000 \u20ac</td></tr>
<tr><td>Hessen</td><td>6,0 %</td><td>18.000 \u20ac</td></tr>
<tr><td>Niedersachsen</td><td>5,0 %</td><td>15.000 \u20ac</td></tr>
<tr><td>Nordrhein-Westfalen</td><td>6,5 %</td><td>19.500 \u20ac</td></tr>
<tr><td>Rheinland-Pfalz</td><td>5,0 %</td><td>15.000 \u20ac</td></tr>
<tr><td>Schleswig-Holstein</td><td>6,5 %</td><td>19.500 \u20ac</td></tr>
<tr><td>Brandenburg</td><td>6,5 %</td><td>19.500 \u20ac</td></tr>
<tr><td>Meckl.-Vorpommern</td><td>6,0 %</td><td>18.000 \u20ac</td></tr>
<tr><td>Sachsen-Anhalt</td><td>5,0 %</td><td>15.000 \u20ac</td></tr>
<tr><td>Th\u00fcringen</td><td>5,0 %</td><td>15.000 \u20ac</td></tr>
<tr><td>Saarland</td><td>6,5 %</td><td>19.500 \u20ac</td></tr>
<tr><td>Bremen</td><td>5,0 %</td><td>15.000 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Spanne:</strong> Zwischen Bayern (3,5 %) und NRW/Brandenburg/Schleswig-Holstein/Saarland (6,5 %) liegt ein Unterschied von <strong>9.000 \u20ac bei einem 300.000-\u20ac-Kauf</strong>. Bayern und Sachsen sind die g\u00fcnstigsten Bundesl\u00e4nder f\u00fcr Immobilienk\u00e4ufer.</p>

<p>\u2192 <a href="/rechner/nebenkosten">Berechne deine Grunderwerbsteuer nach Bundesland \u2192</a></p>

<h2>Notar- und Grundbuchkosten</h2>

<h3>Notarkosten (ca. 1,5\u20132,0 %)</h3>
<p>Der Notar beurkundet den Kaufvertrag, k\u00fcmmert sich um die Grundschuldbestellung (f\u00fcr die Bank), beantragt die Auflassungsvormerkung und wickelt die Kaufpreiszahlung ab. Die Geb\u00fchren sind <strong>gesetzlich geregelt</strong> (GNotKG) \u2014 Verhandeln ist nicht m\u00f6glich.</p>

<p><strong>Typische Aufschl\u00fcsselung:</strong></p>
<ul>
<li>Beurkundung Kaufvertrag: ca. 1,0 %</li>
<li>Grundschuldbestellung: ca. 0,3\u20130,5 %</li>
<li>Vollzugs- und Betreuungsgeb\u00fchr: ca. 0,2\u20130,3 %</li>
</ul>

<h3>Grundbuchkosten (ca. 0,5 %)</h3>
<p>Das Grundbuchamt tr\u00e4gt den neuen Eigent\u00fcmer und die Grundschuld (Hypothek der Bank) ein. Auch diese Geb\u00fchren sind gesetzlich festgelegt.</p>

<h2>Maklerprovision</h2>

<p>Seit Dezember 2020 gilt das <strong>Bestellerprinzip beim Kauf</strong>: Die Maklerprovision wird zwischen K\u00e4ufer und Verk\u00e4ufer geteilt. Typisch sind <strong>3,0\u20133,57 % f\u00fcr den K\u00e4ufer</strong> (inklusive MwSt.).</p>

<p><strong>Regionale Unterschiede:</strong></p>
<ul>
<li><strong>Berlin, Brandenburg, Hamburg:</strong> Meist 3,57 % K\u00e4uferanteil (7,14 % gesamt)</li>
<li><strong>Bayern, Baden-W\u00fcrttemberg:</strong> Oft 3,0 % K\u00e4uferanteil (6,0 % gesamt)</li>
<li><strong>NRW, Hessen:</strong> 3,57 % K\u00e4uferanteil</li>
</ul>

<p><strong>Kein Makler?</strong> Beim Kauf direkt vom Eigent\u00fcmer (z.B. \u00fcber eBay Kleinanzeigen, Immowelt-Privatinserate) entf\u00e4llt die Maklerprovision komplett. Das spart bei einem 400.000-\u20ac-Kauf bis zu <strong>14.280 \u20ac</strong>.</p>

<h2>Wie viel Eigenkapital brauche ich?</h2>

<p>Banken erwarten, dass du mindestens die <strong>Kaufnebenkosten aus Eigenkapital</strong> bezahlst. Besser ist es, zus\u00e4tzlich 10\u201320 % des Kaufpreises mitzubringen:</p>

<table>
<thead>
<tr><th>Eigenkapital</th><th>Bezeichnung</th><th>Zinsvorteil</th></tr>
</thead>
<tbody>
<tr><td>Nur Nebenkosten (8\u201315 %)</td><td>100%-Finanzierung</td><td>Hoher Zinsaufschlag (0,3\u20130,5 %)</td></tr>
<tr><td>Nebenkosten + 10 %</td><td>90%-Finanzierung</td><td>Moderater Zinsaufschlag</td></tr>
<tr><td>Nebenkosten + 20 %</td><td>80%-Finanzierung</td><td>Bester Zinssatz</td></tr>
<tr><td>Nebenkosten + 30 %+</td><td>70%-Finanzierung</td><td>Top-Konditionen</td></tr>
</tbody>
</table>

<p><strong>Faustregel:</strong> Bring mindestens <strong>20\u201330 % des Kaufpreises</strong> als Eigenkapital mit (Nebenkosten + Puffer). Bei einem 350.000-\u20ac-Kauf also 70.000\u2013105.000 \u20ac. Je mehr Eigenkapital, desto besser dein Zinssatz \u2014 das spart \u00fcber 20 Jahre Tausende Euro.</p>

<h2>Kaufnebenkosten senken \u2014 5 Tipps</h2>

<ol>
<li><strong>Ohne Makler kaufen:</strong> Der gr\u00f6\u00dfte Hebel. Privatverk\u00e4ufe sparen 3\u20133,57 % Provision. Suche gezielt nach provisionsfrei angebotenen Immobilien.</li>
<li><strong>Inventar separat kaufen:</strong> Einbauk\u00fcche, Sauna, Markise \u2014 wenn du bewegliches Inventar separat im Kaufvertrag ausweist (zum Zeitwert), f\u00e4llt darauf <strong>keine Grunderwerbsteuer</strong> an. Bei einer 15.000-\u20ac-K\u00fcche in NRW spart das 975 \u20ac.</li>
<li><strong>Bundesland beachten:</strong> Wer flexibel ist, kann durch die Wahl eines g\u00fcnstigeren Bundeslandes sparen. Bayern (3,5 %) vs. NRW (6,5 %) = 9.000 \u20ac Unterschied bei 300.000 \u20ac Kaufpreis.</li>
<li><strong>Instandhaltungsr\u00fccklage ausweisen:</strong> Bei Eigentumswohnungen kann der Anteil der Instandhaltungsr\u00fccklage im Kaufvertrag separat ausgewiesen werden \u2014 darauf f\u00e4llt ebenfalls keine Grunderwerbsteuer an.</li>
<li><strong>KfW-Kredit pr\u00fcfen:</strong> Ein <a href="/rohbau/kfw-foerderung-2026">KfW-Kredit</a> kann den Eigenkapitalbedarf senken, da er die Gesamtfinanzierung verbessert.</li>
</ol>

<h2>Nebenkosten-Rechner</h2>

<p>Berechne deine individuellen Kaufnebenkosten in 30 Sekunden \u2014 mit allen Steuers\u00e4tzen nach Bundesland, Notar, Grundbuch und optionaler Maklerprovision.</p>

<p>\u2192 <a href="/rechner/nebenkosten"><strong>Nebenkosten-Rechner starten \u2192</strong></a></p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Wie hoch sind Kaufnebenkosten in Prozent?</h3>
<p>Je nach Bundesland und ob ein Makler involviert ist: <strong>8\u201315 % des Kaufpreises</strong>. Ohne Makler in Bayern (g\u00fcnstigstes Szenario): ca. 5,5 %. Mit Makler in NRW (teuerstes Szenario): ca. 12,6 %. Nutze unseren <a href="/rechner/nebenkosten">Nebenkosten-Rechner</a> f\u00fcr deine individuelle Berechnung.</p>

<h3>Kann die Bank die Kaufnebenkosten mitfinanzieren?</h3>
<p>Technisch ja \u2014 das nennt sich <strong>110%-Finanzierung</strong>. In der Praxis bewilligen Banken das nur bei sehr guter Bonit\u00e4t, sicherem Einkommen und niedrigem Beleihungsauslauf. Der Zinssatz ist deutlich h\u00f6her (0,3\u20130,5 % Aufschlag). Empfehlung: Mindestens die Kaufnebenkosten aus Eigenkapital zahlen.</p>

<h3>Sind Kaufnebenkosten steuerlich absetzbar?</h3>
<p>Bei <strong>selbstgenutzten Immobilien</strong>: Nein. Bei <strong>vermieteten Immobilien</strong>: Ja \u2014 Grunderwerbsteuer, Notar und Makler sind Anschaffungsnebenkosten und erh\u00f6hen die Abschreibungsbasis (AfA). Das reduziert \u00fcber 50 Jahre (bei Geb\u00e4uden ab 2023: 3 % AfA p.a.) die Steuerlast.</p>

<h3>Wann werden die Kaufnebenkosten f\u00e4llig?</h3>
<p><strong>Grunderwerbsteuer:</strong> Ca. 4\u20138 Wochen nach Beurkundung verschickt das Finanzamt den Bescheid. Zahlungsfrist: 1 Monat. <strong>Notar/Grundbuch:</strong> Rechnung kommt nach Beurkundung, Zahlung innerhalb 2\u20134 Wochen. <strong>Makler:</strong> Bei Kaufvertragsunterschrift f\u00e4llig. Alle Nebenkosten m\u00fcssen also <strong>vor oder kurz nach</strong> dem Kauf verf\u00fcgbar sein \u2014 nicht erst bei Einzug.</p>

<h3>Wie berechne ich die Kaufnebenkosten f\u00fcr eine Eigentumswohnung?</h3>
<p>Genauso wie f\u00fcr ein Haus: Kaufpreis \u00d7 (Grunderwerbsteuer + Notar + Grundbuch + ggf. Makler). Besonderheit bei Wohnungen: Die <strong>Instandhaltungsr\u00fccklage</strong> kann separat ausgewiesen werden und ist grunderwerbsteuerfrei. Das spart je nach R\u00fccklagenh\u00f6he 100\u2013500 \u20ac.</p>`;

// ─── ARTIKEL 2: HANDWERKERKOSTEN ─────────────────────────────

const handwerkerkostenContent = `<p>Die h\u00e4ufigste Frage bei jeder Renovierung: <strong>Was kostet der Handwerker?</strong> Die Antwort h\u00e4ngt vom Gewerk, der Region und dem Auftragsumfang ab. In diesem Guide findest du aktuelle Stundens\u00e4tze f\u00fcr 2026, Kosten pro m\u00b2 und praktische Tipps, wie du Handwerker sinnvoll beauftragst.</p>

<p>\u2192 <a href="/rechner/handwerkerkosten"><strong>Berechne deine Handwerkerkosten nach Gewerk und Region \u2192</strong></a></p>

<h2>Was kostet ein Handwerker pro Stunde?</h2>

<p>Der <strong>durchschnittliche Stundensatz</strong> eines Handwerkers in Deutschland liegt bei <strong>45\u201375 \u20ac netto</strong> (2026). Inklusive Mehrwertsteuer und Anfahrt zahlst du typisch <strong>55\u201390 \u20ac pro Stunde</strong>. Die Spanne ist gro\u00df, weil Gewerk, Region und Auftragsgr\u00f6\u00dfe eine Rolle spielen.</p>

<p><strong>Was steckt im Stundensatz?</strong></p>
<ul>
<li>Lohn des Handwerkers (Geselle: 18\u201325 \u20ac/h brutto)</li>
<li>Sozialversicherung, Berufsgenossenschaft</li>
<li>Werkzeug, Fahrzeug, Versicherung</li>
<li>B\u00fcromiete, Verwaltung, Buchhaltung</li>
<li>Gewinn des Betriebs</li>
</ul>

<p>Ein Stundensatz von 60 \u20ac bedeutet also <em>nicht</em>, dass der Handwerker 60 \u20ac pro Stunde verdient \u2014 davon gehen mehr als die H\u00e4lfte f\u00fcr Betriebskosten drauf.</p>

<h2>Kosten nach Gewerk (Tabelle 2026)</h2>

<table>
<thead>
<tr><th>Gewerk</th><th>Stundensatz (netto)</th><th>Typische Kosten pro Einheit</th></tr>
</thead>
<tbody>
<tr><td><strong>Maler / Lackierer</strong></td><td>35\u201355 \u20ac</td><td>8\u201315 \u20ac/m\u00b2 (Streichen inkl. Material)</td></tr>
<tr><td><strong>Fliesenleger</strong></td><td>45\u201365 \u20ac</td><td>50\u201390 \u20ac/m\u00b2 (Verlegen inkl. Material)</td></tr>
<tr><td><strong>Elektriker</strong></td><td>50\u201375 \u20ac</td><td>80\u2013150 \u20ac/Steckdose (komplett)</td></tr>
<tr><td><strong>Sanit\u00e4r-Installateur</strong></td><td>55\u201380 \u20ac</td><td>150\u2013400 \u20ac (Armatur montieren)</td></tr>
<tr><td><strong>Heizungsbauer</strong></td><td>55\u201380 \u20ac</td><td>8.000\u201318.000 \u20ac (W\u00e4rmepumpe komplett)</td></tr>
<tr><td><strong>Trockenbauer</strong></td><td>40\u201360 \u20ac</td><td>30\u201360 \u20ac/m\u00b2 (Wand inkl. Material)</td></tr>
<tr><td><strong>Maurer</strong></td><td>45\u201365 \u20ac</td><td>100\u2013200 \u20ac/m\u00b2 (Mauerwerk inkl. Material)</td></tr>
<tr><td><strong>Verputzer / Stuckateur</strong></td><td>45\u201365 \u20ac</td><td>20\u201340 \u20ac/m\u00b2 (Putz inkl. Material)</td></tr>
<tr><td><strong>Bodenleger</strong></td><td>40\u201360 \u20ac</td><td>35\u201370 \u20ac/m\u00b2 (Parkett/Laminat inkl. Material)</td></tr>
<tr><td><strong>Zimmerer</strong></td><td>50\u201375 \u20ac</td><td>Projektabh\u00e4ngig</td></tr>
<tr><td><strong>Dachdecker</strong></td><td>55\u201380 \u20ac</td><td>80\u2013160 \u20ac/m\u00b2 (Neueindeckung)</td></tr>
<tr><td><strong>Schreiner / Tischler</strong></td><td>50\u201375 \u20ac</td><td>Projektabh\u00e4ngig</td></tr>
<tr><td><strong>Estrichleger</strong></td><td>40\u201360 \u20ac</td><td>20\u201340 \u20ac/m\u00b2 (Estrich inkl. Material)</td></tr>
<tr><td><strong>D\u00e4mmer</strong></td><td>40\u201360 \u20ac</td><td>30\u201380 \u20ac/m\u00b2 (D\u00e4mmung inkl. Material)</td></tr>
<tr><td><strong>Fensterbauer</strong></td><td>50\u201370 \u20ac</td><td>400\u2013800 \u20ac/Fenster (Austausch komplett)</td></tr>
<tr><td><strong>Garten-/Landschaftsbauer</strong></td><td>40\u201360 \u20ac</td><td>50\u2013120 \u20ac/m\u00b2 (Pflaster inkl. Material)</td></tr>
</tbody>
</table>

<p><strong>Hinweis:</strong> Alle Preise sind Richtwerte f\u00fcr 2026 und verstehen sich <strong>netto</strong>. Der tats\u00e4chliche Preis h\u00e4ngt von Auftragsumfang, Komplexit\u00e4t und Region ab.</p>

<p>\u2192 <a href="/rechner/handwerkerkosten">Berechne die Kosten f\u00fcr dein Gewerk und deine Region \u2192</a></p>

<h2>Regionale Unterschiede</h2>

<p>Die Handwerkerkosten variieren in Deutschland regional um <strong>15\u201325 %</strong>:</p>

<table>
<thead>
<tr><th>Region</th><th>Preisniveau</th><th>Faktor</th></tr>
</thead>
<tbody>
<tr><td><strong>M\u00fcnchen, Stuttgart, Frankfurt</strong></td><td>Sehr hoch</td><td>\u00d7 1,20\u20131,30</td></tr>
<tr><td><strong>Hamburg, D\u00fcsseldorf, K\u00f6ln</strong></td><td>Hoch</td><td>\u00d7 1,10\u20131,20</td></tr>
<tr><td><strong>Berlin, Hannover, N\u00fcrnberg</strong></td><td>Durchschnitt</td><td>\u00d7 1,00</td></tr>
<tr><td><strong>Ostdeutschland (l\u00e4ndlich)</strong></td><td>Unter Durchschnitt</td><td>\u00d7 0,80\u20130,90</td></tr>
<tr><td><strong>L\u00e4ndliche Gebiete West</strong></td><td>Leicht unter Durchschnitt</td><td>\u00d7 0,90\u20131,00</td></tr>
</tbody>
</table>

<p><strong>Beispiel:</strong> Ein Maler kostet in M\u00fcnchen ca. 50\u201370 \u20ac/h, in Sachsen ca. 30\u201345 \u20ac/h. Der Unterschied erkl\u00e4rt sich durch h\u00f6here Lebenshaltungskosten, Mieten und L\u00f6hne in S\u00fcddeutschland.</p>

<h2>Handwerker beauftragen \u2014 7 Tipps</h2>

<ol>
<li><strong>Mindestens 3 Angebote holen:</strong> Vergleiche immer mindestens 3 Angebote f\u00fcr denselben Auftrag. Die Preise k\u00f6nnen um 30\u201350 % variieren \u2014 nicht immer ist der billigste der schlechteste.</li>
<li><strong>Festpreis vs. Stundenlohn:</strong> F\u00fcr klar definierte Auftr\u00e4ge (z.B. \u201e30 m\u00b2 Fliesen verlegen\u201c) immer einen <strong>Festpreis</strong> vereinbaren. Stundenlohn nur bei unklarem Umfang (z.B. Fehlersuche, Reparaturen).</li>
<li><strong>Schriftliches Angebot verlangen:</strong> Mündliche Absprachen sind wertlos. Das Angebot muss alle Leistungen, Materialien und Kosten auflisten. Nachtr\u00e4gliche \u201e\u00dcberraschungen\u201c sind dann nicht mehr m\u00f6glich.</li>
<li><strong>Referenzen pr\u00fcfen:</strong> Frage nach abgeschlossenen Projekten oder lies Online-Bewertungen (Google, MyHammer). Ein seri\u00f6ser Handwerker hat kein Problem damit.</li>
<li><strong>Zeitplan schriftlich festhalten:</strong> Wann beginnt die Arbeit, wann ist sie fertig? Eine schriftliche Frist sch\u00fctzt vor endlosen Verz\u00f6gerungen.</li>
<li><strong>Abnahme durchf\u00fchren:</strong> Nach Fertigstellung gemeinsam die Arbeit begutachten und M\u00e4ngel sofort reklamieren. Nach der Abnahme beginnt die <strong>Gew\u00e4hrleistungsfrist</strong> (4 Jahre bei Bauwerken nach BGB).</li>
<li><strong>Nicht alles im Voraus zahlen:</strong> Maximal 30 % Anzahlung, Rest nach Fertigstellung und Abnahme. Bei gr\u00f6\u00dferen Auftr\u00e4gen Abschlagszahlungen nach Baufortschritt vereinbaren.</li>
</ol>

<h2>Wann lohnt sich Eigenleistung?</h2>

<p>Eigenleistung spart die Arbeitskosten \u2014 aber nicht immer ist das sinnvoll:</p>

<table>
<thead>
<tr><th>Gewerk</th><th>Eigenleistung sinnvoll?</th><th>Ersparnis</th></tr>
</thead>
<tbody>
<tr><td>Maler / Tapezieren</td><td>\u2705 Ja \u2014 einfach erlernbar</td><td>60\u201380 %</td></tr>
<tr><td>Laminat / Vinyl verlegen</td><td>\u2705 Ja \u2014 mit Anleitung machbar</td><td>50\u201370 %</td></tr>
<tr><td>Trockenbau</td><td>\u2705 Ja \u2014 mit Grundkenntnissen</td><td>40\u201360 %</td></tr>
<tr><td>Fliesen verlegen</td><td>\u26a0\ufe0f Bedingt \u2014 Fehler sind teuer</td><td>40\u201360 %</td></tr>
<tr><td>Elektro</td><td>\u274c Nein \u2014 Fachmann Pflicht</td><td>\u2014</td></tr>
<tr><td>Sanit\u00e4r / Heizung</td><td>\u274c Nein \u2014 Wassersch\u00e4den-Risiko</td><td>\u2014</td></tr>
<tr><td>Dach</td><td>\u274c Nein \u2014 Absturzgefahr + Garantie</td><td>\u2014</td></tr>
</tbody>
</table>

<p>\u2192 <a href="/rechner/eigenleistung"><strong>Berechne wie viel du durch Eigenleistung sparst \u2192 Eigenleistungs-Rechner</strong></a></p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Was kostet ein Handwerker pro Stunde in 2026?</h3>
<p>Der durchschnittliche Stundensatz liegt bei <strong>45\u201375 \u20ac netto</strong> (55\u201390 \u20ac brutto). Maler sind am g\u00fcnstigsten (35\u201355 \u20ac), Heizungsbauer und Dachdecker am teuersten (55\u201380 \u20ac). Die genauen Kosten h\u00e4ngen von Gewerk, Region und Auftragsumfang ab. Nutze unseren <a href="/rechner/handwerkerkosten">Handwerkerkosten-Rechner</a> f\u00fcr eine individuelle Berechnung.</p>

<h3>Warum sind Handwerker so teuer?</h3>
<p>Der Stundensatz deckt weit mehr als den Lohn des Handwerkers: Sozialversicherung (~30 %), Werkzeug, Fahrzeug, Versicherung, Verwaltung und Gewinn. Von 60 \u20ac Stundensatz gehen nur ca. 20\u201325 \u20ac als Bruttolohn an den Handwerker. Dazu kommt: Der Fachkr\u00e4ftemangel im Handwerk treibt die Preise \u2014 die Nachfrage \u00fcbersteigt das Angebot deutlich.</p>

<h3>Kann ich die Handwerkerkosten von der Steuer absetzen?</h3>
<p>Ja \u2014 Privatpersonen k\u00f6nnen <strong>Handwerkerleistungen</strong> (nur Arbeitslohn, nicht Material) mit 20 % von der Steuer absetzen, maximal <strong>1.200 \u20ac pro Jahr</strong> (\u00a7 35a EStG). Bei 6.000 \u20ac Arbeitslohn sparst du also 1.200 \u20ac Steuern. Voraussetzung: Rechnung per \u00dcberweisung bezahlen (keine Barzahlung!).</p>

<h3>Festpreis oder Stundenlohn \u2014 was ist besser?</h3>
<p><strong>Festpreis</strong> ist fast immer besser f\u00fcr den Auftraggeber: Du wei\u00dft vorher, was es kostet, und tr\u00e4gst kein Risiko bei Verz\u00f6gerungen. <strong>Stundenlohn</strong> nur bei unklarem Umfang sinnvoll (Fehlersuche, Reparaturen, kleine Arbeiten). Tipp: Lass dir immer ein detailliertes Angebot mit Festpreis machen \u2014 seri\u00f6se Handwerker haben kein Problem damit.</p>

<h3>Wie finde ich einen guten Handwerker?</h3>
<p>Am besten \u00fcber <strong>pers\u00f6nliche Empfehlung</strong> (Nachbarn, Freunde, Kollegen). Alternativ: MyHammer, Check24, Handwerker-Bewertungen bei Google. Achte auf: schnelle Reaktion auf Anfragen, professionelles Angebot, Bereitschaft zur Vor-Ort-Besichtigung, gute Google-Bewertungen. Ein Handwerker, der sich nicht die M\u00fche macht, ein ordentliches Angebot zu schreiben, wird sich auch bei der Arbeit keine M\u00fche machen.</p>`;

async function run() {
  console.log("=== KAUFNEBENKOSTEN GUIDE (INSERT) ===");
  const r1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: FINANZEN_SILO,
      slug: "kaufnebenkosten-guide",
      titel: "Kaufnebenkosten berechnen \u2014 der komplette Guide (2026)",
      seo_title: "Kaufnebenkosten berechnen: Alle Kosten im \u00dcberblick (2026)",
      seo_description: "Kaufnebenkosten 2026: Grunderwerbsteuer nach Bundesland, Notar, Grundbuch, Makler. Rechenbeispiele, Spartipps und Eigenkapital-Faustregeln.",
      typ: "artikel",
      content_md: kaufnebenkostenContent,
      status: "aktiv",
    }),
  });
  const d1 = await r1.json();
  console.log(r1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  console.log("\n=== HANDWERKERKOSTEN GUIDE (INSERT) ===");
  const r2 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: FINANZEN_SILO,
      slug: "handwerkerkosten-guide",
      titel: "Was kostet ein Handwerker pro Stunde? Alle Gewerke 2026",
      seo_title: "Handwerkerkosten 2026: Stundensatz nach Gewerk & Region",
      seo_description: "Was kostet ein Handwerker pro Stunde? Stundensätze 2026 für Maler, Elektriker, Fliesenleger, Installateur und 12 weitere Gewerke. Mit Regionaltabelle.",
      typ: "artikel",
      content_md: handwerkerkostenContent,
      status: "aktiv",
    }),
  });
  const d2 = await r2.json();
  console.log(r2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));
}

run();

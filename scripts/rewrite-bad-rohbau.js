const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

// ─── KLEINHEBEANLAGE ──────────────────────────────────────────

const kleinhebeContent = `<p>Du willst eine Toilette, eine Dusche oder ein Waschbecken im Keller einbauen \u2014 aber das Abwasserrohr liegt h\u00f6her als der Ablauf? Dann brauchst du eine <strong>Kleinhebeanlage</strong>. Sie pumpt das Abwasser nach oben in die Kanalisation, wenn ein nat\u00fcrliches Gef\u00e4lle fehlt. In diesem Guide erkl\u00e4ren wir, wann du eine brauchst, welchen Typ, und was das Ganze kostet.</p>

<h2>Wann brauchst du eine Kleinhebeanlage?</h2>

<p>Immer wenn ein Sanit\u00e4robjekt (WC, Dusche, Waschbecken, Waschmaschine) <strong>unterhalb der R\u00fcckstauebene</strong> liegt. Die R\u00fcckstauebene ist in der Regel die Stra\u00dfenoberkante \u2014 alles darunter kann bei Starkregen mit Kanalwasser \u00fcberflutet werden, wenn es keinen R\u00fcckstauschutz gibt.</p>

<p><strong>Typische Einsatzf\u00e4lle:</strong></p>
<ul>
<li><strong>Kellertoilette:</strong> Der h\u00e4ufigste Fall. Das WC im Keller liegt unter dem Kanal, Abwasser muss nach oben gepumpt werden.</li>
<li><strong>Nachtr\u00e4gliches G\u00e4ste-WC im Keller:</strong> Wenn kein Abwasserrohr in Bodenebene vorhanden ist und ein Aufstemmen des Bodens zu teuer w\u00e4re.</li>
<li><strong>Kellerbad / Souterrain-Wohnung:</strong> Komplettes Bad (Dusche + WC + Waschbecken) unter Kanalniveau.</li>
<li><strong>Waschk\u00fcche im Keller:</strong> Waschmaschine und/oder Ausgussbecken ohne direkten Kanalanschluss.</li>
<li><strong>Dachgeschoss-WC (selten):</strong> Wenn der n\u00e4chste Fallstrang zu weit entfernt ist.</li>
</ul>

<h2>Typen: Kleinhebeanlage vs. F\u00e4kalienhebeanlage</h2>

<p>Die DIN EN 12050 unterscheidet zwei Haupttypen:</p>

<table>
<thead>
<tr><th></th><th>Kleinhebeanlage</th><th>F\u00e4kalienhebeanlage</th></tr>
</thead>
<tbody>
<tr><td><strong>Norm</strong></td><td>DIN EN 12050-2</td><td>DIN EN 12050-1</td></tr>
<tr><td><strong>Geeignet f\u00fcr</strong></td><td>Dusche, Waschbecken, Bidet, Waschmaschine</td><td>WC + alle anderen Sanit\u00e4robjekte</td></tr>
<tr><td><strong>F\u00e4kalien</strong></td><td>Nein (nur Grauwasser)</td><td>Ja (Schwarzwasser)</td></tr>
<tr><td><strong>Schneidwerk</strong></td><td>Nein</td><td>Ja (zerkleinert Feststoffe)</td></tr>
<tr><td><strong>Preis</strong></td><td>150\u2013400 \u20ac</td><td>300\u2013800 \u20ac</td></tr>
<tr><td><strong>F\u00f6rdermenge</strong></td><td>60\u2013120 l/min</td><td>80\u2013180 l/min</td></tr>
<tr><td><strong>F\u00f6rderh\u00f6he</strong></td><td>3\u20135 m</td><td>5\u201311 m</td></tr>
<tr><td><strong>Lautst\u00e4rke</strong></td><td>Leise (30\u201345 dB)</td><td>H\u00f6rbar (40\u201355 dB)</td></tr>
</tbody>
</table>

<p><strong>Merke:</strong> Sobald ein WC angeschlossen wird, brauchst du eine <strong>F\u00e4kalienhebeanlage</strong> mit Schneidwerk. Eine einfache Kleinhebeanlage reicht nur f\u00fcr Grauwasser (Dusche, Waschbecken, Waschmaschine).</p>

<h2>Was kostet eine Kleinhebeanlage?</h2>

<table>
<thead>
<tr><th>Position</th><th>Kosten</th></tr>
</thead>
<tbody>
<tr><td>Kleinhebeanlage (nur Grauwasser)</td><td>150\u2013400 \u20ac</td></tr>
<tr><td>F\u00e4kalienhebeanlage (mit WC)</td><td>300\u2013800 \u20ac</td></tr>
<tr><td>Einbau (Sanit\u00e4r-Fachbetrieb)</td><td>300\u2013600 \u20ac</td></tr>
<tr><td><strong>Material + Einbau gesamt</strong></td><td><strong>450\u20131.400 \u20ac</strong></td></tr>
<tr><td>J\u00e4hrliche Wartung</td><td>100\u2013200 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Rechenbeispiel Keller-WC:</strong></p>
<ul>
<li>F\u00e4kalienhebeanlage (SFA SaniPro): ca. <strong>450 \u20ac</strong></li>
<li>Einbau durch Installateur: ca. <strong>400 \u20ac</strong></li>
<li>Gesamt: ca. <strong>850 \u20ac</strong></li>
<li>Wartung pro Jahr: ca. <strong>150 \u20ac</strong></li>
</ul>

<p>\u2192 <a href="/rechner/handwerkerkosten">Was kostet ein Installateur pro Stunde? \u2192</a></p>
<p>\u2192 <a href="/rechner/sanitaer">Berechne deinen Sanit\u00e4r-Bedarf \u2192</a></p>

<h2>Wartung: Was du wissen musst</h2>

<p>Eine Hebeanlage ist ein mechanisches Ger\u00e4t mit Pumpe und (bei F\u00e4kalienanlagen) Schneidwerk. Sie braucht <strong>regelm\u00e4\u00dfige Wartung</strong> \u2014 sonst drohen Ausfall, R\u00fcckstau und teure Wassersch\u00e4den.</p>

<h3>Was muss gewartet werden?</h3>
<ul>
<li><strong>Pumpe pr\u00fcfen:</strong> L\u00e4uft sie rund? Vibrationen, ungew\u00f6hnliche Ger\u00e4usche?</li>
<li><strong>Schneidwerk reinigen:</strong> Haare, Feuchtt\u00fccher und sonstige Fremdk\u00f6rper entfernen (der h\u00e4ufigste Ausfall-Grund)</li>
<li><strong>R\u00fcckschlagventil kontrollieren:</strong> Verhindert, dass Abwasser zur\u00fcckflie\u00dft</li>
<li><strong>Alarm-Schwimmer testen:</strong> Muss bei F\u00fcllstand ausl\u00f6sen</li>
<li><strong>Dichtungen pr\u00fcfen:</strong> Auf Verschlei\u00df und Undichtigkeiten</li>
</ul>

<h3>Wartungsintervalle</h3>
<ul>
<li><strong>Privat (1\u20132 Personen):</strong> J\u00e4hrliche Wartung reicht</li>
<li><strong>Mehrfamilienhaus / Gewerbe:</strong> Halbj\u00e4hrlich</li>
<li><strong>Kosten:</strong> 100\u2013200 \u20ac pro Wartung (Fachbetrieb)</li>
</ul>

<p><strong>Wichtig:</strong> Wirf <strong>niemals Feuchtt\u00fccher, Hygieneartikel, Wattepads oder Essensreste</strong> in ein WC mit Hebeanlage. Das Schneidwerk kann diese Materialien nicht vollst\u00e4ndig zerkleinern \u2014 sie wickeln sich um die Messer und blockieren die Pumpe. Reparaturkosten: 200\u2013500 \u20ac.</p>

<h2>Marken im \u00dcberblick</h2>

<table>
<thead>
<tr><th>Marke</th><th>Herkunft</th><th>Preissegment</th><th>Besonderheiten</th></tr>
</thead>
<tbody>
<tr><td><strong>SFA (Sanibroy)</strong></td><td>Frankreich</td><td>Mittel\u2013Premium</td><td>Marktf\u00fchrer, gr\u00f6\u00dftes Sortiment, SaniPro / SaniPack / SaniBest</td></tr>
<tr><td><strong>Grundfos (DAB)</strong></td><td>D\u00e4nemark</td><td>Premium</td><td>Profi-Segment, extrem zuverl\u00e4ssig, Sololift2-Serie</td></tr>
<tr><td><strong>Jung Pumpen</strong></td><td>Deutschland</td><td>Mittel</td><td>Kompakte Bauweise, leise, gutes Preis-Leistungs-Verh\u00e4ltnis</td></tr>
<tr><td><strong>Setma</strong></td><td>Deutschland</td><td>Budget</td><td>G\u00fcnstige Einsteigermodelle, Watersan-Serie</td></tr>
</tbody>
</table>

<h2>Unsere Empfehlungen</h2>

<p><strong>F\u00fcr Keller-WC:</strong> <a href="https://www.amazon.de/s?k=SFA+SaniPro+XR+Silence+Hebeanlage&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">SFA SaniPro XR Silence</a> (ca. 400\u2013500 \u20ac) \u2014 F\u00e4kalienhebeanlage f\u00fcr WC + Dusche + Waschbecken. Besonders leise (Silence-Technologie), kompaktes Geh\u00e4use, F\u00f6rderh\u00f6he bis 5 m. Der Klassiker f\u00fcr private Keller-WCs.</p>

<p><strong>Nur Grauwasser:</strong> <a href="https://www.amazon.de/s?k=Grundfos+Sololift2+Hebeanlage&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Grundfos Sololift2 C-3</a> (ca. 250\u2013350 \u20ac) \u2014 Kleinhebeanlage f\u00fcr Dusche, Waschbecken und Waschmaschine (kein WC). Extrem zuverl\u00e4ssig, wartungsfreundlich (Pumpe l\u00e4sst sich ohne Werkzeug entnehmen). Ideal f\u00fcr die Waschk\u00fcche.</p>

<p><strong>Budget-Tipp:</strong> <a href="https://www.amazon.de/s?k=Kleinhebeanlage+F%C3%A4kalien+WC+leise&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Setma Watersan</a> (ca. 200\u2013300 \u20ac) \u2014 G\u00fcnstiger Einstieg f\u00fcr ein einzelnes WC. Weniger Markenprestige als SFA, aber funktional solide. Achte auf ein Modell mit Alarmfunktion.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Kann ich eine Kleinhebeanlage selbst einbauen?</h3>
<p>Grundsaetzlich ja \u2014 bei reinen Grauwasser-Anlagen (Dusche, Waschbecken) ist der Einbau mit Grundkenntnissen machbar. Bei F\u00e4kalienhebeanlagen (mit WC) empfehlen wir einen Fachbetrieb: Die Anlage muss normgerecht nach DIN EN 12050 installiert werden, und bei einem Fehler droht R\u00fcckstau mit Abwasser in die Wohnung.</p>

<h3>Wie laut ist eine Kleinhebeanlage?</h3>
<p>Moderne Ger\u00e4te liegen bei <strong>35\u201350 dB</strong> \u2014 vergleichbar mit einem leisen Gespr\u00e4ch. Die Pumpe l\u00e4uft nur f\u00fcr wenige Sekunden, wenn Wasser anfaellt. Besonders leise sind die SFA Silence-Modelle und der Grundfos Sololift2. In Schlafr\u00e4umen direkt angrenzend kann das trotzdem st\u00f6ren \u2014 eine entkoppelte Aufstellung (Gummif\u00fc\u00dfe, Schallschutzplatte) hilft.</p>

<h3>Was passiert bei Stromausfall?</h3>
<p>Die Pumpe stoppt und das Abwasser wird nicht mehr gef\u00f6rdert. Bei kurzen Ausf\u00e4llen (Minuten) ist das unproblematisch \u2014 der Sammelbeh\u00e4lter fasst 5\u201315 Liter. Bei l\u00e4ngeren Ausf\u00e4llen sollte man das WC / die Dusche nicht benutzen. Einen R\u00fcckstau gibt es nicht, weil das R\u00fcckschlagventil das verhindert. F\u00fcr kritische Anwendungen gibt es Anlagen mit Notstrom-Batterie.</p>

<h3>Brauche ich eine Hebeanlage oder einen R\u00fcckstauverschluss?</h3>
<p>Das sind zwei verschiedene Dinge. Ein <strong>R\u00fcckstauverschluss</strong> verhindert, dass Kanalwasser bei Starkregen in den Keller dr\u00fcckt \u2014 er pumpt nichts. Eine <strong>Hebeanlage</strong> pumpt aktiv Abwasser nach oben und enth\u00e4lt in der Regel bereits einen R\u00fcckstauschutz. Wenn du nur vor R\u00fcckstau sch\u00fctzen willst (und das Gef\u00e4lle zum Kanal ausreicht), reicht ein R\u00fcckstauverschluss (50\u2013200 \u20ac).</p>

<h3>Wie oft muss eine Hebeanlage gewartet werden?</h3>
<p>Im Privathaushalt <strong>einmal pro Jahr</strong>. Ein Fachbetrieb pr\u00fcft Pumpe, Schneidwerk, R\u00fcckschlagventil und Dichtungen. Kosten: 100\u2013200 \u20ac. Zwischen den Wartungen: regelm\u00e4\u00dfig auf ungew\u00f6hnliche Ger\u00e4usche oder Gerueche achten und <strong>keine Feuchtt\u00fccher</strong> ins WC werfen.</p>`;

// ─── KALK-ZEMENT-PUTZ ────────────────────────────────────────

const putzContent = `<p>Kalk-Zement-Putz ist der Allrounder unter den Putzen: robust, feuchtigkeitsbest\u00e4ndig und sowohl innen als auch au\u00dfen einsetzbar. Wenn du renovierst oder neu baust, ist die Frage nicht ob du KZ-Putz brauchst, sondern wie viel. In diesem Guide erkl\u00e4ren wir Einsatzbereiche, Kosten, Verarbeitung und wann ein anderer Putz die bessere Wahl ist.</p>

<h2>Was ist Kalk-Zement-Putz?</h2>

<p>Kalk-Zement-Putz (Kurzform: KZ-Putz) besteht aus drei Grundstoffen:</p>
<ul>
<li><strong>Kalk</strong> (Bindemittel): Macht den Putz dampfdurchl\u00e4ssig und alkalisch (schimmelhemmend)</li>
<li><strong>Zement</strong> (Bindemittel): Gibt dem Putz Festigkeit und Wasserresistenz</li>
<li><strong>Sand</strong> (Zuschlag): Bestimmt die K\u00f6rnung und damit die Oberfl\u00e4chenstruktur</li>
</ul>

<p>Die Kombination aus Kalk und Zement vereint die Vorteile beider Materialien: Der Kalkanteil sorgt f\u00fcr Dampfdurchl\u00e4ssigkeit und Schimmelschutz, der Zementanteil f\u00fcr mechanische Festigkeit und Feuchtigkeitsbest\u00e4ndigkeit.</p>

<p>Kalk-Zement-Putz wird als <strong>Putzm\u00f6rtel der Gruppe P II</strong> (nach DIN EN 998-1) klassifiziert und ist der meistverwendete Putz im deutschen Wohnungsbau.</p>

<h2>Einsatzbereiche</h2>

<h3>Perfekt geeignet:</h3>
<ul>
<li><strong>Feuchtr\u00e4ume (Bad, K\u00fcche):</strong> Die gr\u00f6\u00dfte St\u00e4rke von KZ-Putz. Er nimmt Feuchtigkeit auf und gibt sie wieder ab, ohne zu schimmeln. Standard f\u00fcr Badezimmer und K\u00fcchen.</li>
<li><strong>Keller:</strong> Widerstandsf\u00e4hig gegen Feuchtigkeit und mechanische Belastung. Ideal f\u00fcr Kellerw\u00e4nde.</li>
<li><strong>Au\u00dfenputz:</strong> Witterungsbest\u00e4ndig, frostfest, guter Untergrund f\u00fcr Fassadenfarbe.</li>
<li><strong>Unter Fliesen:</strong> Als Unterputz f\u00fcr Fliesenbelag in Bad und K\u00fcche. Die raue Oberfl\u00e4che bietet dem Fliesenkleber guten Halt.</li>
<li><strong>Sockelbereich:</strong> Dort, wo die Wand auf Spritzwasser und mechanische Belastung trifft.</li>
</ul>

<h3>Weniger geeignet:</h3>
<ul>
<li><strong>Trockene Wohnr\u00e4ume:</strong> Hier ist Gipsputz schneller, g\u00fcnstiger und glatter. KZ-Putz lohnt sich in Wohnzimmer und Schlafzimmer nur bei speziellen Anforderungen.</li>
<li><strong>Auf Gipskarton:</strong> KZ-Putz haftet auf Gips schlecht. Rigips-W\u00e4nde werden gespachtelt, nicht verputzt.</li>
<li><strong>D\u00fcnne Schichten (&lt; 5 mm):</strong> F\u00fcr d\u00fcnne Ausgleichsschichten gibt es spezielle D\u00fcnnschichtputze.</li>
</ul>

<h2>Kalk-Zement-Putz vs. Gipsputz vs. Kalkputz</h2>

<table>
<thead>
<tr><th></th><th>Kalk-Zement-Putz</th><th>Gipsputz</th><th>Kalkputz</th></tr>
</thead>
<tbody>
<tr><td><strong>Festigkeit</strong></td><td>Hoch</td><td>Mittel</td><td>Gering\u2013Mittel</td></tr>
<tr><td><strong>Feuchtigkeitsbest\u00e4ndig</strong></td><td>Ja</td><td>Nein</td><td>Bedingt</td></tr>
<tr><td><strong>Dampfdurchl\u00e4ssig</strong></td><td>Gut</td><td>Gut</td><td>Sehr gut</td></tr>
<tr><td><strong>Schimmelhemmend</strong></td><td>Ja (alkalisch)</td><td>Nein</td><td>Ja (stark alkalisch)</td></tr>
<tr><td><strong>Verarbeitung</strong></td><td>Anspruchsvoll</td><td>Einfach</td><td>Anspruchsvoll</td></tr>
<tr><td><strong>Trockenzeit</strong></td><td>1 Tag pro mm</td><td>Wenige Stunden</td><td>1 Tag pro mm</td></tr>
<tr><td><strong>Innen</strong></td><td>Ja</td><td>Ja</td><td>Ja</td></tr>
<tr><td><strong>Au\u00dfen</strong></td><td>Ja</td><td>Nein</td><td>Bedingt</td></tr>
<tr><td><strong>Unter Fliesen</strong></td><td>Ideal</td><td>Nein</td><td>Nein</td></tr>
<tr><td><strong>Preis pro m\u00b2</strong></td><td>3\u20138 \u20ac</td><td>2\u20135 \u20ac</td><td>5\u201312 \u20ac</td></tr>
<tr><td><strong>Bester Einsatz</strong></td><td>Bad, K\u00fcche, Keller, Au\u00dfen</td><td>Wohnr\u00e4ume (trocken)</td><td>Denkmalschutz, \u00d6kobau</td></tr>
</tbody>
</table>

<p><strong>Fazit:</strong> In Feuchtr\u00e4umen, Kellern und au\u00dfen ist Kalk-Zement-Putz die richtige Wahl. In trockenen Wohnr\u00e4umen ist Gipsputz einfacher und g\u00fcnstiger. Kalkputz ist Spezialist f\u00fcr Denkmalschutz und \u00f6kologisches Bauen.</p>

<h2>Was kostet Kalk-Zement-Putz?</h2>

<table>
<thead>
<tr><th>Position</th><th>Kosten pro m\u00b2</th></tr>
</thead>
<tbody>
<tr><td>Material (Fertigputz, 15 mm)</td><td>3\u20138 \u20ac</td></tr>
<tr><td>Grundierung / Haftgrund</td><td>0,50\u20131,50 \u20ac</td></tr>
<tr><td><strong>Gesamt Material</strong></td><td><strong>3,50\u20139,50 \u20ac</strong></td></tr>
<tr><td>Handwerker (Verputzer)</td><td>15\u201330 \u20ac</td></tr>
<tr><td><strong>Gesamt mit Handwerker</strong></td><td><strong>18,50\u201339,50 \u20ac</strong></td></tr>
</tbody>
</table>

<p><strong>Rechenbeispiel Badezimmer (25 m\u00b2 Wandfl\u00e4che):</strong></p>
<ul>
<li>Material (KZ-Putz + Grundierung): 25 \u00d7 6 \u20ac = <strong>150 \u20ac</strong></li>
<li>Mit Handwerker: 25 \u00d7 30 \u20ac = <strong>750 \u20ac</strong></li>
</ul>

<p>\u2192 <a href="/rechner/putz">Berechne wie viel Putz du f\u00fcr deinen Raum brauchst \u2192</a></p>
<p>\u2192 <a href="/rechner/handwerkerkosten">Was kostet ein Verputzer pro Stunde? \u2192</a></p>

<h2>Verarbeitung: Schritt f\u00fcr Schritt</h2>

<h3>Werkzeug und Material</h3>
<ul>
<li>Fertig-Putzm\u00f6rtel (Sackware, 25\u201330 kg pro Sack)</li>
<li>Grundierung / Haftgrund</li>
<li>R\u00fchrwerk oder gro\u00dfer R\u00fchrquirl</li>
<li>Putzkelle (Traufel), Gl\u00e4ttekelle, Kartaetsche (Richtlatte)</li>
<li>Putzschienen (als F\u00fchrungsprofile, alle 80\u2013100 cm)</li>
<li>Putzeimer, Wasser</li>
</ul>

<h3>Anleitung</h3>

<ol>
<li><strong>Untergrund vorbereiten:</strong> Wand muss tragf\u00e4hig, sauber und staubfrei sein. Lose Teile abschlagen, L\u00f6cher vorwerfen. Stark saugende Untergr\u00fcnde (Kalksandstein, Porenbeton) mit <strong>Haftgrund</strong> vorbehandeln \u2014 das verhindert, dass der Putz zu schnell austrocknet und rei\u00dft.</li>
<li><strong>Untergrund vorn\u00e4ssen:</strong> Am Vorabend oder 2\u20133 Stunden vor dem Verputzen die Wand mit Wasser benetzen. Der Untergrund soll matt-feucht sein, nicht triefend nass.</li>
<li><strong>Putzschienen setzen:</strong> Lotrecht an die Wand kleben oder anwerfen (Abstand 80\u2013100 cm). Sie dienen als F\u00fchrungsschienen f\u00fcr die Richtlatte und bestimmen die Putzdicke.</li>
<li><strong>Spritzbewurf (optional):</strong> Bei glatten Untergr\u00fcnden (Beton) d\u00fcnne Schicht groben M\u00f6rtel anwerfen. Trocknen lassen (mind. 24 Stunden). Verbessert die Haftung.</li>
<li><strong>Grundputz auftragen:</strong> M\u00f6rtel anr\u00fchren (laut Herstellerangabe), mit Kelle in Batzen an die Wand werfen, mit der Kartaetsche (Richtlatte) zwischen den Putzschienen glatt abziehen. Putzdicke: <strong>10\u201315 mm innen, 15\u201320 mm au\u00dfen</strong>.</li>
<li><strong>Anziehen lassen:</strong> Ca. 30\u201360 Minuten warten, bis der Putz leicht angezogen hat.</li>
<li><strong>Gl\u00e4tten / Filzen:</strong> Mit dem Reibebrett oder Schwammbrett kreisf\u00f6rmig \u00fcberarbeiten. F\u00fcr eine glatte Oberfl\u00e4che (z.B. unter Tapete) mit der Gl\u00e4ttekelle nacharbeiten. F\u00fcr eine raue Oberfl\u00e4che (unter Fliesen) den Filzschritt weglassen.</li>
<li><strong>Nachbehandlung:</strong> In den ersten 2\u20133 Tagen die Putzfl\u00e4che leicht feucht halten (Bespr\u00fchen), damit der Putz langsam durchh\u00e4rtet und nicht rei\u00dft. Besonders wichtig bei Hitze und Wind.</li>
</ol>

<p><strong>Faustregel Trockenzeit:</strong> 1 Tag pro Millimeter Putzdicke. Bei 15 mm also ca. <strong>15 Tage</strong>, bevor du fliesen oder streichen kannst. Nicht k\u00fcnstlich beschleunigen (kein Heizl\u00fcfter!) \u2014 das f\u00fchrt zu Spannungsrissen.</p>

<h2>Unsere Empfehlungen</h2>

<p><strong>Standard-Innenputz:</strong> <a href="https://www.amazon.de/s?k=Knauf+Kalk-Zement-Putz+Innenputz+30kg&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Knauf UP 210 KZ-Putz</a> (ca. 8\u201312 \u20ac / 30 kg) \u2014 Verarbeitungsfreundlicher Maschinenputz, auch per Hand auftragbar. Ergiebigkeit: ca. 1,4 m\u00b2 pro Sack bei 15 mm Putzdicke. Der meistverkaufte KZ-Putz f\u00fcr Innenr\u00e4ume.</p>

<p><strong>Fassade / Au\u00dfen:</strong> <a href="https://www.amazon.de/s?k=Baumit+Kalk+Zement+Putz+Au%C3%9Fenputz&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Baumit KZ-Putz Au\u00dfen</a> (ca. 10\u201315 \u20ac / 30 kg) \u2014 Frostbest\u00e4ndiger Au\u00dfenputz mit hoher Festigkeit. Ideal als Unterputz f\u00fcr W\u00e4rmed\u00e4mmverbundsysteme (WDVS) oder als Oberputz f\u00fcr Fassaden.</p>

<p><strong>Feuchtr\u00e4ume:</strong> <a href="https://www.amazon.de/s?k=Kalk+Zement+Putz+Feuchtraum+Bad&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">KZ-Putz f\u00fcr Feuchtr\u00e4ume</a> (ca. 8\u201314 \u20ac / 30 kg) \u2014 Speziell f\u00fcr Bad und K\u00fcche formuliert. H\u00f6herer Zementanteil f\u00fcr maximale Wasserresistenz. Achte auf die Kennzeichnung \u201eCS IV\u201c (h\u00f6chste Druckfestigkeitsklasse).</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Kann ich Kalk-Zement-Putz im Bad verwenden?</h3>
<p>Ja \u2014 KZ-Putz ist <strong>der Standard f\u00fcr Badezimmer</strong>. Er ist feuchtigkeitsbest\u00e4ndig, schimmelhemmend und bietet dem Fliesenkleber einen optimalen Untergrund. Gipsputz ist im Bad nicht empfehlenswert, weil er Feuchtigkeit aufnimmt und bei Dauerbelastung weich wird.</p>

<h3>Wie dick muss Kalk-Zement-Putz aufgetragen werden?</h3>
<p>Innen: <strong>10\u201315 mm</strong> als Einlagenputz. Au\u00dfen: <strong>15\u201320 mm</strong>, oft als Zweilagenputz (Grundputz + Oberputz). Die Mindestdicke betr\u00e4gt 10 mm \u2014 d\u00fcnner h\u00e4lt der Putz nicht zuverl\u00e4ssig. Bei gro\u00dfen Unebenheiten kann man bis 25 mm in einer Lage auftragen, dar\u00fcber hinaus in zwei Lagen mit Zwischentrocknung.</p>

<h3>Wie lange muss Kalk-Zement-Putz trocknen?</h3>
<p>Faustregel: <strong>1 Tag pro Millimeter</strong>. Bei 15 mm also rund 2\u20133 Wochen, bevor du fliesen, tapezieren oder streichen kannst. In der Praxis: Mindestens 14 Tage bei normaler Raumtemperatur und L\u00fcftung. Nicht k\u00fcnstlich trocknen (Heizl\u00fcfter, Bautrockner direkt auf die Fl\u00e4che richten) \u2014 das f\u00fchrt zu Rissen.</p>

<h3>Brauche ich einen Haftgrund unter KZ-Putz?</h3>
<p>Auf stark saugenden Untergr\u00fcnden (Porenbeton, Kalksandstein) ja \u2014 Haftgrund verhindert, dass der Putz dem Untergrund zu schnell Wasser entzieht und dadurch rei\u00dft. Auf Beton und Mauerwerk mit normaler Saugf\u00e4higkeit reicht Vorn\u00e4ssen. Auf sehr glatten Untergr\u00fcnden (Schalungsbeton) ist zus\u00e4tzlich ein Spritzbewurf f\u00fcr die Haftung n\u00f6tig.</p>

<h3>Kalk-Zement-Putz oder Gipsputz \u2014 was nehmen?</h3>
<p><strong>KZ-Putz</strong> f\u00fcr: Bad, K\u00fcche, Keller, Au\u00dfenwand, unter Fliesen, Sockelbereich. <strong>Gipsputz</strong> f\u00fcr: Wohnzimmer, Schlafzimmer, B\u00fcro \u2014 trockene Innenr\u00e4ume, wo eine glatte Oberfl\u00e4che wichtig ist und Feuchtigkeit kein Thema. Gipsputz ist einfacher zu verarbeiten und trocknet schneller, ist aber nicht feuchtigkeitsbest\u00e4ndig.</p>`;

async function run() {
  console.log("=== KLEINHEBEANLAGE ===");
  const res1 = await fetch(BASE + "/rest/v1/seiten?slug=eq.kleinhebeanlage", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Kleinhebeanlage \u2014 wann brauchst du eine? Kosten & Tipps (2026)",
      seo_title: "Kleinhebeanlage: Wann n\u00f6tig, was kostet sie? (2026)",
      seo_description:
        "Kleinhebeanlage oder F\u00e4kalienhebeanlage f\u00fcr Keller-WC: Wann brauchst du eine, was kostet sie, welche Marke? Typen-Vergleich, Kosten und Wartungstipps.",
      content_md: kleinhebeContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d1 = await res1.json();
  console.log(res1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  console.log("\n=== KALK-ZEMENT-PUTZ ===");
  const res2 = await fetch(BASE + "/rest/v1/seiten?slug=eq.kalk-zement-putz", {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      titel: "Kalk-Zement-Putz: Verarbeitung, Kosten & Rechner (2026)",
      seo_title: "Kalk-Zement-Putz: Verarbeitung, Kosten & Rechner (2026)",
      seo_description:
        "Kalk-Zement-Putz f\u00fcr Bad, K\u00fcche und Fassade: Kosten pro m\u00b2, Verarbeitung Schritt f\u00fcr Schritt, Vergleich mit Gipsputz und Kaufempfehlungen.",
      content_md: putzContent,
      updated_at: new Date().toISOString(),
    }),
  });
  const d2 = await res2.json();
  console.log(res2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));
}

run();

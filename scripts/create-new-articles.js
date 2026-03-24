const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const ROHBAU_SILO = "6ad30c3c-8528-4f7b-876e-d1d75026986d";

// ─── ARTIKEL 1: KfW FÖRDERUNG 2026 ──────────────────────────

const kfwContent = `<p>Die KfW (Kreditanstalt f\u00fcr Wiederaufbau) ist die wichtigste F\u00f6rderbank f\u00fcr Bauherren und Sanierer in Deutschland. Ob Neubau, Heizungstausch oder barrierefreier Umbau \u2014 die KfW vergibt zinsg\u00fcnstige Kredite und direkte Zusch\u00fcsse f\u00fcr energieeffizientes und klimafreundliches Bauen. In diesem \u00dcberblick findest du alle aktuellen Programme f\u00fcr 2026.</p>

<p><strong>Wichtig:</strong> F\u00f6rderantr\u00e4ge m\u00fcssen <strong>immer vor Baubeginn</strong> gestellt werden. Wer zuerst baut und dann beantragt, bekommt nichts.</p>

<p>\u2192 <a href="/rechner/foerdermittel"><strong>Finde in 2 Minuten, welche F\u00f6rderungen f\u00fcr dich in Frage kommen \u2192 F\u00f6rdermittel-Finder starten</strong></a></p>

<h2>Was f\u00f6rdert die KfW 2026?</h2>

<p>Die KfW-F\u00f6rderung gliedert sich in vier gro\u00dfe Bereiche:</p>

<ul>
<li><strong>Klimafreundlicher Neubau:</strong> Zinsg\u00fcnstige Kredite f\u00fcr energieeffiziente Neubauten (Programme 297/298, 300, 296)</li>
<li><strong>Energetische Sanierung:</strong> Kredite mit Tilgungszuschuss f\u00fcr die Sanierung zum Effizienzhaus (Programm 261)</li>
<li><strong>Heizungstausch:</strong> Direkter Zuschuss bis 70 % f\u00fcr W\u00e4rmepumpe, Biomasse oder Solarthermie (Programm 458)</li>
<li><strong>Barrierefreier Umbau:</strong> Zuschuss und Kredit f\u00fcr altersgerechtes Wohnen (Programme 455-B und 159)</li>
</ul>

<h2>Die wichtigsten KfW-Programme 2026</h2>

<h3>Neubau</h3>

<table>
<thead>
<tr><th>Programm</th><th>Name</th><th>Art</th><th>Max. Betrag</th><th>F\u00fcr wen</th></tr>
</thead>
<tbody>
<tr><td><strong>KfW 297/298</strong></td><td>Klimafreundlicher Neubau</td><td>Kredit</td><td>150.000 \u20ac/WE</td><td>297: Selbstnutzer, 298: Investoren</td></tr>
<tr><td><strong>KfW 300</strong></td><td>Wohneigentum f\u00fcr Familien</td><td>Kredit</td><td>170.000\u2013270.000 \u20ac</td><td>Familien mit Kindern (Einkommen \u2264 90.000 \u20ac)</td></tr>
<tr><td><strong>KfW 296</strong></td><td>Neubau Niedrigpreissegment</td><td>Kredit</td><td>100.000 \u20ac/WE</td><td>Fl\u00e4cheneffizientes Bauen</td></tr>
</tbody>
</table>

<p><strong>KfW 297/298</strong> ist das Basisprogramm f\u00fcr jeden klimafreundlichen Neubau. Voraussetzungen: Effizienzhaus 40 mit Heizung aus erneuerbaren Energien und Einhaltung der CO\u2082-Grenzwerte. Seit Dezember 2025 gibt es zus\u00e4tzlich eine befristete F\u00f6rderstufe f\u00fcr Effizienzhaus 55 (f\u00fcr bereits genehmigte Vorhaben). H\u00f6here F\u00f6rderung bei QNG-Zertifizierung (Qualit\u00e4tssiegel Nachhaltiges Geb\u00e4ude).</p>

<p><strong>KfW 300</strong> richtet sich an Familien mit mindestens einem Kind und einem Haushaltseinkommen von maximal 90.000 \u20ac (plus 10.000 \u20ac pro weiterem Kind). Die Kredith\u00f6chstbetr\u00e4ge liegen je nach Kinderzahl zwischen 170.000 und 270.000 \u20ac \u2014 deutlich h\u00f6her als das Basisprogramm.</p>

<h3>Sanierung</h3>

<table>
<thead>
<tr><th>Programm</th><th>Name</th><th>Art</th><th>Max. Betrag</th><th>Besonderheit</th></tr>
</thead>
<tbody>
<tr><td><strong>KfW 261</strong></td><td>Wohngeb\u00e4ude-Kredit (Effizienzhaus)</td><td>Kredit + Tilgungszuschuss</td><td>150.000 \u20ac/WE</td><td>5\u201345 % Tilgungszuschuss</td></tr>
<tr><td><strong>KfW 458</strong></td><td>Heizungsf\u00f6rderung</td><td>Zuschuss</td><td>Bis 70 % der Kosten</td><td>Einkommensbonus 30 %</td></tr>
<tr><td><strong>KfW 358/359</strong></td><td>Erg\u00e4nzungskredit Einzelma\u00dfnahmen</td><td>Kredit</td><td>120.000 \u20ac/WE</td><td>Erg\u00e4nzend zu bewilligter Ma\u00dfnahme</td></tr>
</tbody>
</table>

<p><strong>KfW 261</strong> ist das Kernprogramm f\u00fcr energetische Komplettsanierungen. Je h\u00f6her die erreichte Effizienzhausstufe, desto h\u00f6her der Tilgungszuschuss: Effizienzhaus 85 erh\u00e4lt 5 %, Effizienzhaus 40 bis zu 20 %, mit erneuerbarer Energien-Klasse (EE) bis zu 25 %, und mit Worst-Performance-Building-Bonus (WPB) bis zu 45 %.</p>

<p><strong>KfW 458</strong> ist der Turbo f\u00fcr den Heizungstausch: Bis zu <strong>70 % Zuschuss</strong> f\u00fcr eine neue W\u00e4rmepumpe, Biomasseheizung, Solarthermie oder einen Anschluss ans W\u00e4rmenetz. Der Zuschuss setzt sich zusammen aus: 30 % Grundf\u00f6rderung + 20 % Geschwindigkeitsbonus (bei fr\u00fchzeitigem Tausch) + 30 % Einkommensbonus (Haushaltseinkommen unter 40.000 \u20ac/Jahr). Maximum: 70 %, gedeckelt auf 30.000 \u20ac f\u00f6rderf\u00e4hige Kosten.</p>

<h3>Barrierefreiheit</h3>

<table>
<thead>
<tr><th>Programm</th><th>Name</th><th>Art</th><th>Max. Betrag</th><th>Status 2026</th></tr>
</thead>
<tbody>
<tr><td><strong>KfW 455-B</strong></td><td>Barrierereduzierung</td><td>Zuschuss</td><td>2.500 \u20ac/WE</td><td>Ab Fr\u00fchjahr 2026 wieder verf\u00fcgbar</td></tr>
<tr><td><strong>KfW 159</strong></td><td>Altersgerecht Umbauen</td><td>Kredit</td><td>50.000 \u20ac</td><td>Verf\u00fcgbar</td></tr>
</tbody>
</table>

<p><strong>KfW 455-B</strong> f\u00f6rdert Ma\u00dfnahmen wie bodengleiche Duschen, Schwellenabbau und Treppenlifte mit einem Zuschuss von 10 % der Kosten (max. 2.500 \u20ac/WE). Das Programm war Ende 2025 ausgesetzt und soll <strong>ab Fr\u00fchjahr 2026</strong> mit einem Budget von 50 Millionen Euro wieder verf\u00fcgbar sein. Achtung: Die Mittel sind erfahrungsgem\u00e4\u00df innerhalb weniger Wochen ausgesch\u00f6pft.</p>

<h2>BAFA-F\u00f6rderung erg\u00e4nzend</h2>

<p>Neben der KfW f\u00f6rdert das <strong>BAFA</strong> (Bundesamt f\u00fcr Wirtschaft und Ausfuhrkontrolle) Einzelma\u00dfnahmen an der Geb\u00e4udeh\u00fclle:</p>

<ul>
<li><strong>Energieberatung (BAFA):</strong> 80 % Zuschuss f\u00fcr eine qualifizierte Energieberatung (max. 1.300 \u20ac f\u00fcr Ein-/Zweifamilienh\u00e4user). Empfehlenswert als erster Schritt vor jeder Sanierung.</li>
<li><strong>Einzelma\u00dfnahmen Geb\u00e4udeh\u00fclle (BAFA):</strong> 15 % Zuschuss f\u00fcr D\u00e4mmung, Fenster, Au\u00dfent\u00fcren. Mit individuellem Sanierungsfahrplan (iSFP) erh\u00f6ht sich der Zuschuss auf 20 %.</li>
</ul>

<p><strong>Kombination KfW + BAFA:</strong> Die F\u00f6rderung von Heizungstausch (KfW 458) und Geb\u00e4udeh\u00fclle (BAFA) ist grunds\u00e4tzlich kombinierbar, solange es sich um <strong>unterschiedliche Ma\u00dfnahmen</strong> handelt. F\u00fcr dieselbe Ma\u00dfnahme darf nur ein F\u00f6rdertopf genutzt werden.</p>

<h2>Steuerbonus nach \u00a7 35c EStG</h2>

<p>Alternativ zur KfW-/BAFA-F\u00f6rderung k\u00f6nnen Selbstnutzer energetische Sanierungskosten <strong>\u00fcber die Steuer</strong> absetzen:</p>

<ul>
<li><strong>20 % der Kosten</strong> \u00fcber 3 Jahre (7 % im 1. und 2. Jahr, 6 % im 3. Jahr)</li>
<li><strong>Maximum: 40.000 \u20ac</strong> Steuererm\u00e4\u00dfigung pro Objekt</li>
<li>Gilt f\u00fcr: D\u00e4mmung, Fenster, Heizung, L\u00fcftung, digitale Steuerung</li>
<li>Voraussetzung: Geb\u00e4ude mindestens 10 Jahre alt, selbst bewohnt</li>
</ul>

<p><strong>Wichtig:</strong> Steuerbonus und KfW-/BAFA-F\u00f6rderung sind f\u00fcr dieselbe Ma\u00dfnahme <strong>nicht kombinierbar</strong>. Du musst dich entscheiden. Faustregel: KfW-Zuschuss lohnt sich bei hohen Einzelkosten (Heizungstausch), Steuerbonus bei kleineren Ma\u00dfnahmen oder wenn die KfW-Mittel ausgesch\u00f6pft sind.</p>

<h2>Wie beantrage ich die F\u00f6rderung?</h2>

<ol>
<li><strong>Energieberater beauftragen:</strong> F\u00fcr die meisten KfW-Programme ist ein zertifizierter Energieeffizienz-Experte Pflicht. Er erstellt den Sanierungsfahrplan und best\u00e4tigt die technischen Anforderungen. Kosten: 1.000\u20132.500 \u20ac (80 % davon BAFA-gef\u00f6rdert).</li>
<li><strong>Antrag stellen \u2014 VOR Baubeginn:</strong> Den F\u00f6rderantrag bei der KfW einreichen, <strong>bevor du Auftr\u00e4ge vergibst oder Liefervertr\u00e4ge unterschreibst</strong>. Das ist die h\u00e4ufigste Fehlerquelle: Wer zuerst den Handwerker beauftragt und dann den Antrag stellt, verliert den F\u00f6rderanspruch.</li>
<li><strong>Zusage abwarten:</strong> Die KfW pr\u00fcft den Antrag (Dauer: 1\u20134 Wochen). Erst nach der Zusage darfst du mit dem Vorhaben beginnen.</li>
<li><strong>Ma\u00dfnahme durchf\u00fchren:</strong> Bau oder Sanierung wie geplant umsetzen. Der Energieberater begleitet das Projekt.</li>
<li><strong>Nachweis einreichen:</strong> Nach Fertigstellung best\u00e4tigt der Energieberater die Umsetzung. Der Tilgungszuschuss wird gutgeschrieben bzw. der Zuschuss ausgezahlt.</li>
</ol>

<h2>F\u00f6rdermittel-Finder</h2>

<p>Du bist unsicher, welche F\u00f6rderung f\u00fcr dein Vorhaben passt? Unser F\u00f6rdermittel-Finder zeigt dir in 2 Minuten alle verf\u00fcgbaren Programme \u2014 mit Berechnung deines m\u00f6glichen Zuschusses.</p>

<p>\u2192 <a href="/rechner/foerdermittel"><strong>F\u00f6rdermittel-Finder starten \u2192</strong></a></p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Kann ich KfW und BAFA kombinieren?</h3>
<p>Ja, aber nur f\u00fcr <strong>unterschiedliche Ma\u00dfnahmen</strong>. Beispiel: KfW 458 f\u00fcr den Heizungstausch (W\u00e4rmepumpe) und BAFA-Zuschuss f\u00fcr die Fassadend\u00e4mmung \u2014 das geht. Aber: KfW-Zuschuss <em>und</em> BAFA-Zuschuss f\u00fcr dieselbe D\u00e4mmung \u2014 das geht nicht. Ebenso nicht kombinierbar mit dem Steuerbonus (\u00a7 35c EStG) f\u00fcr dieselbe Ma\u00dfnahme.</p>

<h3>Muss ich den Antrag vor Baubeginn stellen?</h3>
<p><strong>Ja, zwingend.</strong> Das ist die Regel Nummer 1 bei jeder KfW-F\u00f6rderung: Antrag <em>vor</em> Baubeginn, <em>vor</em> Auftragsvergabe, <em>vor</em> Vertragsunterschrift. Wer zuerst baut und dann beantragt, bekommt keine F\u00f6rderung \u2014 ohne Ausnahme. Als \u201eBaubeginn\u201c gilt bereits die Unterschrift unter einen Handwerkervertrag.</p>

<h3>Welche F\u00f6rderung gibt es f\u00fcr eine neue Heizung?</h3>
<p>Das <strong>KfW-Programm 458</strong> f\u00f6rdert den Heizungstausch mit einem Zuschuss von bis zu 70 % der f\u00f6rderf\u00e4higen Kosten (max. 30.000 \u20ac). Gef\u00f6rdert werden W\u00e4rmepumpen, Biomasseheizungen, Solarthermie und W\u00e4rmenetzanschl\u00fcsse. Der Zuschuss setzt sich zusammen aus 30 % Grundf\u00f6rderung, bis zu 20 % Geschwindigkeitsbonus und bis zu 30 % Einkommensbonus. \u2192 <a href="/rechner/foerdermittel">Berechne deinen Zuschuss</a></p>

<h3>Lohnt sich KfW-Kredit oder Steuerbonus mehr?</h3>
<p>Kommt auf die Ma\u00dfnahme an. <strong>KfW-Zuschuss</strong> (z.B. Programm 458) lohnt sich bei teuren Einzelma\u00dfnahmen wie Heizungstausch \u2014 bis zu 70 % Zuschuss ist unschlagbar. <strong>Steuerbonus</strong> lohnt sich bei kleineren Ma\u00dfnahmen (z.B. Fenster, D\u00e4mmung), wenn kein KfW-Programm passt oder die Mittel ausgesch\u00f6pft sind. Bei einer KfW-gef\u00f6rderten Sanierung ist der Zuschuss fast immer h\u00f6her als die Steuerersparnis.</p>

<h3>Wie lange dauert die KfW-Zusage?</h3>
<p>In der Regel <strong>1\u20134 Wochen</strong> nach Antragstellung. Bei einfachen Antr\u00e4gen (z.B. Heizungstausch) oft schneller, bei Komplettsanierungen mit Tilgungszuschuss manchmal l\u00e4nger. Plane die Wartezeit in deinen Bauzeitplan ein \u2014 du darfst erst nach der Zusage starten.</p>`;

// ─── ARTIKEL 2: BAUGENEHMIGUNG RATGEBER ──────────────────────

const baugenContent = `<p>In Deutschland gilt: Wer baut, braucht eine Genehmigung. Aber die Ausnahmen sind zahlreich \u2014 und variieren von Bundesland zu Bundesland. Ein Gartenhaus, das in Bayern genehmigungsfrei ist, braucht in Berlin eine volle Baugenehmigung. In diesem Ratgeber erkl\u00e4ren wir, wann du eine Genehmigung brauchst, was sie kostet, und was passiert, wenn du ohne baust.</p>

<p>\u2192 <a href="/rechner/baugenehmigung"><strong>Pr\u00fcfe deinen Fall mit unserem Baugenehmigung-Check \u2192</strong></a></p>

<h2>Genehmigungspflichtig vs. genehmigungsfrei</h2>

<p><strong>Grundregel:</strong> Jede bauliche Anlage, die \u00fcber einen gewissen Umfang hinausgeht, ist genehmigungspflichtig. Das Baurecht ist in Deutschland <strong>L\u00e4ndersache</strong> \u2014 jedes Bundesland regelt die Freistellungen in seiner eigenen Landesbauordnung (LBO).</p>

<p><strong>Fast immer genehmigungspflichtig:</strong></p>
<ul>
<li>Neubau eines Wohnhauses</li>
<li>Anbauten und Aufstockungen</li>
<li>Nutzungs\u00e4nderungen (z.B. Garage zu Wohnraum)</li>
<li>Gro\u00dfe Geb\u00e4ude im Au\u00dfenbereich</li>
</ul>

<p><strong>H\u00e4ufig genehmigungsfrei</strong> (aber abh\u00e4ngig vom Bundesland):</p>
<ul>
<li>Kleine Gartenh\u00e4user und Ger\u00e4teschuppen</li>
<li>Carports bis zu einer bestimmten Gr\u00f6\u00dfe</li>
<li>Terrassen\u00fcberdachungen</li>
<li>Gew\u00e4chsh\u00e4user</li>
<li>Mauern und Z\u00e4une bis zu einer bestimmten H\u00f6he</li>
</ul>

<p><strong>Wichtig:</strong> \u201eGenehmigungsfrei\u201c hei\u00dft <strong>nicht</strong> \u201eregelungsfrei\u201c. Auch genehmigungsfreie Bauten m\u00fcssen den Bebauungsplan, Abstandsfl\u00e4chen und \u00f6rtliche Bauvorschriften einhalten.</p>

<h2>Was ist genehmigungsfrei? \u00dcbersicht nach Bundesland</h2>

<h3>Gartenhaus / Ger\u00e4teschuppen</h3>

<table>
<thead>
<tr><th>Bundesland</th><th>Genehmigungsfrei bis</th><th>Besonderheit</th></tr>
</thead>
<tbody>
<tr><td>Baden-W\u00fcrttemberg</td><td>40 m\u00b3 Rauminhalt</td><td>Nur im Innenbereich</td></tr>
<tr><td>Bayern</td><td>75 m\u00b3 Rauminhalt</td><td>Im Au\u00dfenbereich: immer genehmigungspflichtig</td></tr>
<tr><td>Berlin</td><td>10 m\u00b2 Grundfl\u00e4che</td><td>Sehr streng</td></tr>
<tr><td>Brandenburg</td><td>75 m\u00b3 Rauminhalt</td><td>\u2014</td></tr>
<tr><td>Bremen</td><td>6 m\u00b2 Grundfl\u00e4che</td><td>Sehr streng</td></tr>
<tr><td>Hamburg</td><td>30 m\u00b3 Rauminhalt</td><td>\u2014</td></tr>
<tr><td>Hessen</td><td>30 m\u00b2 Grundfl\u00e4che</td><td>\u2014</td></tr>
<tr><td>Meckl.-Vorpommern</td><td>10 m\u00b2 Grundfl\u00e4che</td><td>\u2014</td></tr>
<tr><td>Niedersachsen</td><td>40 m\u00b2 Grundfl\u00e4che</td><td>Max. 3 m H\u00f6he</td></tr>
<tr><td>Nordrhein-Westfalen</td><td>75 m\u00b3 Rauminhalt</td><td>\u2014</td></tr>
<tr><td>Rheinland-Pfalz</td><td>50 m\u00b3 Rauminhalt</td><td>\u2014</td></tr>
<tr><td>Saarland</td><td>10 m\u00b2 Grundfl\u00e4che</td><td>\u2014</td></tr>
<tr><td>Sachsen</td><td>10 m\u00b2 Grundfl\u00e4che</td><td>\u2014</td></tr>
<tr><td>Sachsen-Anhalt</td><td>10 m\u00b2 Grundfl\u00e4che</td><td>\u2014</td></tr>
<tr><td>Schleswig-Holstein</td><td>30 m\u00b3 Rauminhalt</td><td>\u2014</td></tr>
<tr><td>Th\u00fcringen</td><td>10 m\u00b2 Grundfl\u00e4che</td><td>\u2014</td></tr>
</tbody>
</table>

<h3>Carport</h3>

<table>
<thead>
<tr><th>Bundesland</th><th>Genehmigungsfrei bis</th></tr>
</thead>
<tbody>
<tr><td>Bayern</td><td>50 m\u00b2</td></tr>
<tr><td>NRW</td><td>30 m\u00b2</td></tr>
<tr><td>Niedersachsen</td><td>30 m\u00b2</td></tr>
<tr><td>Hessen</td><td>30 m\u00b2</td></tr>
<tr><td>Berlin</td><td>30 m\u00b2</td></tr>
<tr><td>Sachsen</td><td>30 m\u00b2</td></tr>
<tr><td>Baden-W\u00fcrttemberg</td><td>30 m\u00b2</td></tr>
</tbody>
</table>

<p><strong>Achtung bei Grenzbebauung:</strong> Auch genehmigungsfreie Carports m\u00fcssen die Abstandsfl\u00e4chen einhalten (in der Regel 3 m zur Grundst\u00fccksgrenze). Manche L\u00e4nder erlauben grenzst\u00e4ndige Bebauung unter bestimmten Bedingungen \u2014 hier unbedingt die LBO des Bundeslandes pr\u00fcfen.</p>

<p>\u2192 <a href="/rechner/baugenehmigung"><strong>Pr\u00fcfe deinen konkreten Fall \u2192 Baugenehmigung-Check</strong></a></p>

<h2>Was brauche ich f\u00fcr den Bauantrag?</h2>

<p>Ein vollst\u00e4ndiger Bauantrag umfasst in der Regel:</p>

<ol>
<li><strong>Bauantragsformular:</strong> Amtliches Formular des Bundeslandes, unterschrieben vom Bauherrn und vom Entwurfsverfasser (Architekt).</li>
<li><strong>Bauzeichnungen:</strong> Grundrisse, Schnitte, Ansichten im Ma\u00dfstab 1:100. M\u00fcssen von einem bauvorlageberechtigten Architekten oder Ingenieur erstellt werden.</li>
<li><strong>Lageplan:</strong> Amtlicher Lageplan vom Katasteramt (Kosten: 100\u2013500 \u20ac je nach Gemeinde).</li>
<li><strong>Baubeschreibung:</strong> Technische Beschreibung des Vorhabens (Material, Konstruktion, Nutzung).</li>
<li><strong>Standsicherheitsnachweis:</strong> Statische Berechnung durch einen Tragwerksplaner.</li>
<li><strong>Energieausweis / Nachweis nach GEG:</strong> Nachweis der Einhaltung des Geb\u00e4udeenergiegesetzes.</li>
<li><strong>Ggf. weitere Nachweise:</strong> Schallschutz, Brandschutz, Stellplatznachweis (je nach Vorhaben).</li>
</ol>

<p><strong>Kosten f\u00fcr den Bauantrag:</strong> Die Geb\u00fchren betragen in der Regel <strong>0,5\u20131,0 % der Bausumme</strong>. Bei einem 300.000-\u20ac-Haus also 1.500\u20133.000 \u20ac. Hinzu kommen die Kosten f\u00fcr Architekt, Statiker und Lageplan.</p>

<h2>Wie lange dauert die Baugenehmigung?</h2>

<table>
<thead>
<tr><th>Verfahren</th><th>Dauer</th><th>Wann</th></tr>
</thead>
<tbody>
<tr><td><strong>Vereinfachtes Verfahren</strong></td><td>4\u20138 Wochen</td><td>Wohnhaus im Bebauungsplan-Gebiet</td></tr>
<tr><td><strong>Regul\u00e4res Verfahren</strong></td><td>8\u201312 Wochen</td><td>Au\u00dferhalb B-Plan, Sonderbauten</td></tr>
<tr><td><strong>Genehmigungsfreistellung</strong></td><td>1\u20134 Wochen</td><td>B-Plan-konforme Standardbauten (nur in manchen L\u00e4ndern)</td></tr>
</tbody>
</table>

<p><strong>Realit\u00e4t:</strong> Die tats\u00e4chliche Dauer variiert stark. Bayern und Schleswig-Holstein sind tendenziell schneller, Berlin und NRW deutlich langsamer. Unvollst\u00e4ndige Unterlagen sind der h\u00e4ufigste Grund f\u00fcr Verz\u00f6gerungen \u2014 investiere lieber in eine sorgf\u00e4ltige Vorbereitung als in eine schnelle Einreichung.</p>

<h2>Was passiert, wenn ich ohne Genehmigung baue?</h2>

<p>Schwarzbau ist kein Kavaliersdelikt:</p>

<ul>
<li><strong>Baustopp:</strong> Die Beh\u00f6rde kann den sofortigen Stopp aller Bauarbeiten anordnen.</li>
<li><strong>R\u00fcckbaupflicht:</strong> Im schlimmsten Fall musst du das Gebaute auf eigene Kosten abreissen.</li>
<li><strong>Bu\u00dfgeld:</strong> Je nach Bundesland und Schwere bis zu <strong>50.000 \u20ac</strong> (in manchen L\u00e4ndern bis 500.000 \u20ac f\u00fcr gewerbliche Bauten).</li>
<li><strong>Kein Bestandsschutz:</strong> Ein Schwarzbau erlangt <em>keinen</em> Bestandsschutz durch Zeitablauf. Die Beh\u00f6rde kann auch nach 20 Jahren noch den R\u00fcckbau anordnen.</li>
<li><strong>Versicherungsprobleme:</strong> Bei Sch\u00e4den an oder durch einen Schwarzbau kann die Versicherung die Leistung verweigern.</li>
</ul>

<h2>Vereinfachtes Genehmigungsverfahren</h2>

<p>Viele Bundesl\u00e4nder bieten f\u00fcr Standardbauten (Wohnh\u00e4user im Bebauungsplan-Gebiet) ein <strong>vereinfachtes Verfahren</strong> an. Dabei pr\u00fcft die Beh\u00f6rde nur die planungsrechtliche Zul\u00e4ssigkeit, nicht die Bauvorlagen im Detail. Das spart Zeit (oft nur 4\u20136 Wochen), bedeutet aber auch: Die Verantwortung f\u00fcr Statik, Brandschutz und Energieausweis liegt vollst\u00e4ndig beim Bauherrn und seinem Architekten.</p>

<p>In manchen L\u00e4ndern gibt es sogar die <strong>Genehmigungsfreistellung</strong> (Kenntnisgabeverfahren): Man reicht die Unterlagen ein, und wenn die Beh\u00f6rde nicht innerhalb einer Frist (1\u20134 Wochen) widerspricht, gilt das Vorhaben als genehmigt.</p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Brauche ich f\u00fcr ein Gartenhaus eine Baugenehmigung?</h3>
<p>Kommt auf das Bundesland und die Gr\u00f6\u00dfe an. In Bayern ist ein Gartenhaus bis 75 m\u00b3 genehmigungsfrei, in Berlin nur bis 10 m\u00b2. Entscheidend ist au\u00dferdem der Standort: Im <strong>Au\u00dfenbereich</strong> (\u00a7 35 BauGB) sind fast alle Geb\u00e4ude genehmigungspflichtig, unabh\u00e4ngig von der Gr\u00f6\u00dfe. Pr\u00fcfe deinen konkreten Fall mit unserem <a href="/rechner/baugenehmigung">Baugenehmigung-Check</a>.</p>

<h3>Was kostet eine Baugenehmigung?</h3>
<p>Die reinen <strong>Geb\u00fchren</strong> betragen 0,5\u20131,0 % der Bausumme. Bei einem 300.000-\u20ac-Haus also 1.500\u20133.000 \u20ac. Hinzu kommen: Lageplan (100\u2013500 \u20ac), Architekt f\u00fcr Bauzeichnungen (2.000\u20135.000 \u20ac), Statiker (1.500\u20133.000 \u20ac), Energieausweis (300\u2013500 \u20ac). Gesamtkosten f\u00fcr alle Unterlagen: typisch <strong>5.000\u201312.000 \u20ac</strong> bei einem Einfamilienhaus.</p>

<h3>Wie lange ist eine Baugenehmigung g\u00fcltig?</h3>
<p>In den meisten Bundesl\u00e4ndern <strong>3 Jahre</strong> ab Erteilung. Innerhalb dieser Frist muss mit dem Bau begonnen werden. Wenn nicht, verf\u00e4llt die Genehmigung und muss neu beantragt werden. Eine Verl\u00e4ngerung um 1\u20132 Jahre ist in vielen L\u00e4ndern auf Antrag m\u00f6glich, solange sich die Rechtslage nicht ge\u00e4ndert hat.</p>

<h3>Kann der Nachbar meine Baugenehmigung anfechten?</h3>
<p>Ja, unter bestimmten Umst\u00e4nden. Der Nachbar kann innerhalb von <strong>1 Monat</strong> nach Zustellung der Genehmigung Widerspruch einlegen, wenn er durch das Vorhaben in seinen <strong>nachbarsch\u00fctzenden Rechten</strong> verletzt wird (z.B. Abstandsfl\u00e4chen, Verschattung, Emissionen). Ein Widerspruch verz\u00f6gert den Baubeginn erheblich. Tipp: Sprich fr\u00fchzeitig mit den Nachbarn \u00fcber dein Vorhaben.</p>

<h3>Brauche ich f\u00fcr eine Terrassen\u00fcberdachung eine Genehmigung?</h3>
<p>In den meisten Bundesl\u00e4ndern ist eine Terrassen\u00fcberdachung bis ca. <strong>30 m\u00b2</strong> genehmigungsfrei (Ausnahmen: Berlin, Bremen). Aber auch hier gelten Abstandsfl\u00e4chen und der Bebauungsplan. Im Au\u00dfenbereich ist sie fast immer genehmigungspflichtig. Pr\u00fcfe den konkreten Fall mit unserem <a href="/rechner/baugenehmigung">Baugenehmigung-Check</a>.</p>`;

async function run() {
  // ── Create KfW Förderung 2026 ──
  console.log("=== KFW FÖRDERUNG 2026 (INSERT) ===");
  const r1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: ROHBAU_SILO,
      slug: "kfw-foerderung-2026",
      titel: "KfW F\u00f6rderung 2026 \u2014 alle Programme f\u00fcr Hausbau & Sanierung",
      seo_title: "KfW F\u00f6rderung 2026: Alle Programme f\u00fcr Neubau & Sanierung",
      seo_description:
        "KfW-F\u00f6rderung 2026 im \u00dcberblick: Programme 297/298, 261, 458, 455-B. Kredite, Zusch\u00fcsse und Steuerbonus f\u00fcr Hausbau, Sanierung und Heizungstausch.",
      typ: "artikel",
      content_md: kfwContent,
      status: "aktiv",
    }),
  });
  const d1 = await r1.json();
  console.log(r1.ok && d1.length > 0 ? "OK: " + d1[0].slug : "FAIL: " + JSON.stringify(d1));

  // ── Create Baugenehmigung Ratgeber ──
  console.log("\n=== BAUGENEHMIGUNG RATGEBER (INSERT) ===");
  const r2 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: ROHBAU_SILO,
      slug: "baugenehmigung-ratgeber",
      titel: "Baugenehmigung in Deutschland \u2014 wann brauchst du eine? (2026)",
      seo_title: "Baugenehmigung: Wann brauchst du eine? Kosten & Ablauf (2026)",
      seo_description:
        "Baugenehmigung in Deutschland: Was ist genehmigungsfrei? \u00dcbersicht nach Bundesland, Kosten, Dauer und was bei Schwarzbau passiert.",
      typ: "artikel",
      content_md: baugenContent,
      status: "aktiv",
    }),
  });
  const d2 = await r2.json();
  console.log(r2.ok && d2.length > 0 ? "OK: " + d2[0].slug : "FAIL: " + JSON.stringify(d2));
}

run();

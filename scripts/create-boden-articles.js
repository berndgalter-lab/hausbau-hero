const BASE = "https://jyxhjcupgazugjglpeum.supabase.co";
const KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5eGhqY3VwZ2F6dWdqZ2xwZXVtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzgyNzYxOSwiZXhwIjoyMDg5NDAzNjE5fQ.9KDrgJYAKnbuZoegypfmRQC5F0z86uP8iU2aSw62IKA";
const headers = {
  apikey: KEY,
  Authorization: "Bearer " + KEY,
  "Content-Type": "application/json",
  Prefer: "return=representation",
};

const BODEN_SILO = "380aa5d1-10f7-4c39-8944-576e796b8da1";

// ─── ARTIKEL 1: FLIESEN VERLEGEN KOSTEN ─────────────────────

const fliesenContent = `<p>Fliesen geh\u00f6ren zu den beliebtesten Bodenbel\u00e4gen in K\u00fcche, Bad und Flur \u2014 aber was kostet es wirklich, Fliesen verlegen zu lassen? Komplett mit Material und Handwerker zahlst du <strong>50\u2013120 \u20ac pro m\u00b2</strong>. In diesem Guide schl\u00fcsseln wir alle Kosten auf, zeigen Preisfaktoren und kl\u00e4ren, ob du selbst verlegen kannst.</p>

<p>\u2192 <a href="/rechner/fliesen"><strong>Berechne deinen genauen Materialbedarf \u2192 Fliesen-Rechner</strong></a></p>

<h2>Was kostet Fliesen verlegen pro m\u00b2?</h2>

<p>Die <strong>Gesamtkosten f\u00fcr Fliesen verlegen</strong> liegen typischerweise bei <strong>50\u2013120 \u20ac/m\u00b2</strong> inklusive Material und Handwerker. Die gro\u00dfe Spanne erkl\u00e4rt sich durch die Wahl der Fliesen (5 \u20ac-Baumarkt-Fliese vs. 80 \u20ac-Naturstein) und die Komplexit\u00e4t des Untergrunds.</p>

<p><strong>Schnell-\u00dcbersicht nach Raum:</strong></p>

<table>
<thead>
<tr><th>Raum</th><th>Typische Kosten/m\u00b2</th><th>Bei 10 m\u00b2</th></tr>
</thead>
<tbody>
<tr><td>Badezimmer (Boden + Wand)</td><td>70\u2013130 \u20ac</td><td>700\u20131.300 \u20ac</td></tr>
<tr><td>K\u00fcche (Boden)</td><td>50\u2013100 \u20ac</td><td>500\u20131.000 \u20ac</td></tr>
<tr><td>Flur / Eingangsbereich</td><td>50\u201390 \u20ac</td><td>500\u2013900 \u20ac</td></tr>
<tr><td>Terrasse / Au\u00dfenbereich</td><td>60\u2013120 \u20ac</td><td>600\u20131.200 \u20ac</td></tr>
</tbody>
</table>

<h2>Kosten aufgeschl\u00fcsselt</h2>

<p>So setzen sich die Fliesenkosten zusammen:</p>

<table>
<thead>
<tr><th>Position</th><th>Kosten pro m\u00b2</th><th>Anteil</th></tr>
</thead>
<tbody>
<tr><td><strong>Fliesen</strong></td><td>15\u201380 \u20ac</td><td>30\u201365 %</td></tr>
<tr><td><strong>Fliesenkleber</strong></td><td>3\u20135 \u20ac</td><td>3\u20138 %</td></tr>
<tr><td><strong>Fugenm\u00f6rtel</strong></td><td>2\u20134 \u20ac</td><td>2\u20135 %</td></tr>
<tr><td><strong>Grundierung / Abdichtung</strong></td><td>2\u20136 \u20ac</td><td>2\u20138 %</td></tr>
<tr><td><strong>Handwerker (Arbeitslohn)</strong></td><td>30\u201360 \u20ac</td><td>30\u201350 %</td></tr>
<tr><td><strong>Gesamt</strong></td><td><strong>50\u2013120 \u20ac</strong></td><td></td></tr>
</tbody>
</table>

<h3>Fliesen: 15\u201380 \u20ac/m\u00b2</h3>
<p>Der gr\u00f6\u00dfte Kostenfaktor ist die Fliese selbst:</p>
<ul>
<li><strong>Einfache Keramikfliese</strong> (Baumarkt): 15\u201325 \u20ac/m\u00b2</li>
<li><strong>Feinsteinzeug</strong> (Standard): 25\u201345 \u20ac/m\u00b2</li>
<li><strong>Gro\u00dfformat-Fliesen</strong> (60\u00d7120 cm+): 35\u201365 \u20ac/m\u00b2</li>
<li><strong>Naturstein</strong> (Marmor, Schiefer): 50\u2013120 \u20ac/m\u00b2</li>
<li><strong>Mosaik</strong>: 30\u201380 \u20ac/m\u00b2</li>
</ul>

<p><strong>Tipp:</strong> Rechne immer <strong>10\u201315 % Verschnitt</strong> ein. Bei diagonaler Verlegung oder kleinen R\u00e4umen sogar 15\u201320 %. Unser <a href="/rechner/fliesen">Fliesen-Rechner</a> berechnet den Verschnitt automatisch.</p>

<h3>Fliesenkleber: 3\u20135 \u20ac/m\u00b2</h3>
<p>Flexkleber (z.B. Knauf Flex oder PCI Flexm\u00f6rtel) ist Standard. F\u00fcr Gro\u00dfformat-Fliesen (\u00fcber 60\u00d760 cm) brauchst du speziellen Flie\u00dfbettkleber mit l\u00e4ngerer offener Zeit. Im Au\u00dfenbereich zwingend frostbest\u00e4ndigen Kleber verwenden.</p>

<h3>Fugenm\u00f6rtel: 2\u20134 \u20ac/m\u00b2</h3>
<p>Zementfuge ist g\u00fcnstig und robust. F\u00fcr Bodenfliesen mit schmalen Fugen Epoxidharz-Fugenm\u00f6rtel \u2014 teurer (8\u201315 \u20ac/m\u00b2), aber extrem abriebfest und schmutzabweisend. Im Bad mit Dusche: Silikonfugen an den \u00dcberg\u00e4ngen Wand/Boden nicht vergessen.</p>

<h3>Handwerker: 30\u201360 \u20ac/m\u00b2</h3>
<p>Der reine <strong>Verlegelohn</strong> eines Fliesenlegers liegt bei 30\u201360 \u20ac/m\u00b2. Preisfaktoren:</p>
<ul>
<li>Einfache Reihenverlegung (30\u00d760 cm): ca. 30\u201340 \u20ac/m\u00b2</li>
<li>Gro\u00dfformat (60\u00d7120 cm): ca. 40\u201350 \u20ac/m\u00b2 (schwieriger zu handhaben)</li>
<li>Mosaik oder Diagonalverlegung: ca. 50\u201365 \u20ac/m\u00b2</li>
<li>Naturstein (Marmor, Schiefer): ca. 50\u201370 \u20ac/m\u00b2</li>
</ul>

<p>\u2192 <a href="/rechner/handwerkerkosten">Was kostet ein Fliesenleger pro Stunde? \u2192 Handwerkerkosten-Rechner</a></p>

<h2>Preisfaktoren: Was macht Fliesen teuer?</h2>

<h3>1. Fliesengr\u00f6\u00dfe</h3>
<p>Gro\u00dfe Fliesen (60\u00d7120 cm und gr\u00f6\u00dfer) sind pro m\u00b2 oft g\u00fcnstiger als kleine Fliesen \u2014 aber der <strong>Verlegeaufwand ist h\u00f6her</strong>. Sie m\u00fcssen absolut eben liegen und brauchen speziellen Kleber. Zwei Personen sind meist n\u00f6tig. Fazit: Materialkosten sinken, Handwerkerkosten steigen.</p>

<h3>2. Verlegemuster</h3>
<ul>
<li><strong>Reihenverband</strong> (parallel): Am g\u00fcnstigsten, wenig Verschnitt</li>
<li><strong>Halbverband</strong> (versetzt wie Mauerwerk): Leicht teurer, sch\u00f6ner</li>
<li><strong>Diagonalverlegung</strong>: 15\u201320 % Mehrkosten (mehr Verschnitt + Arbeit)</li>
<li><strong>Fischgr\u00e4t</strong>: 20\u201330 % Mehrkosten (sehr arbeitsintensiv)</li>
</ul>

<h3>3. Untergrund vorbereiten</h3>
<p>Auf einen <strong>ebenen, tragf\u00e4higen Untergrund</strong> kann direkt gefliest werden. H\u00e4ufig muss aber erst:</p>
<ul>
<li><strong>Altfliesen entfernen</strong>: 10\u201325 \u20ac/m\u00b2 (je nach Verklebung)</li>
<li><strong>Estrich ausgleichen</strong>: 5\u201315 \u20ac/m\u00b2 (Ausgleichsmasse)</li>
<li><strong>Abdichtung</strong> (Bad/Dusche): 15\u201330 \u20ac/m\u00b2 (Fl\u00fcssigfolie + Dichtband)</li>
</ul>
<p>Diese Vorarbeiten k\u00f6nnen <strong>20\u201360 \u20ac/m\u00b2 Zusatzkosten</strong> verursachen. Kl\u00e4re den Untergrund <em>vor</em> dem Angebot.</p>

<h3>4. Raum und Zuschnitte</h3>
<p>Kleine, verwinkelte R\u00e4ume (Badezimmer mit Nische, WC mit S\u00e4ule) erfordern viel mehr Zuschnitte und sind pro m\u00b2 teurer als gro\u00dfe, rechteckige Fl\u00e4chen. Der Fliesenleger braucht pro m\u00b2 einfach l\u00e4nger.</p>

<h2>Fliesen selber verlegen \u2014 realistisch?</h2>

<p>Fliesen selbst zu verlegen ist machbar, aber <strong>anspruchsvoller als Laminat oder Streichen</strong>. Ehrliche Einsch\u00e4tzung:</p>

<table>
<thead>
<tr><th>Aspekt</th><th>Einsch\u00e4tzung</th></tr>
</thead>
<tbody>
<tr><td>Schwierigkeit</td><td>\u26a0\ufe0f Mittel bis Hoch</td></tr>
<tr><td>Zeitaufwand (20 m\u00b2 Bad)</td><td>2\u20134 Tage (Profi: 1\u20132 Tage)</td></tr>
<tr><td>Ersparnis</td><td>30\u201360 \u20ac/m\u00b2 (Handwerkerlohn)</td></tr>
<tr><td>Werkzeug n\u00f6tig</td><td>Fliesenschneider, Zahnkelle, Gummifugbrett, Kreuzabstandshalter</td></tr>
<tr><td>Risiko bei Fehlern</td><td>Hoch \u2014 schiefe Fliesen, hohle Stellen, undichte Abdichtung</td></tr>
</tbody>
</table>

<p><strong>H\u00e4ufige DIY-Fehler:</strong></p>
<ol>
<li><strong>Zu wenig Kleber:</strong> Fliesen m\u00fcssen vollfl\u00e4chig verklebt sein. Hohlstellen f\u00fchren zu Rissen und Br\u00fcchen \u2014 besonders bei schweren Feinsteinzeugfliesen.</li>
<li><strong>Keine Grundierung:</strong> Saugender Untergrund zieht dem Kleber das Wasser und verringert die Haftung drastisch.</li>
<li><strong>Abdichtung vergessen (Bad):</strong> Im Spritzwasserbereich und Bodenbereich der Dusche muss <em>vor</em> dem Fliesen eine Fl\u00fcssigfolie aufgetragen werden. Ohne Abdichtung droht Feuchtigkeitsschaden.</li>
<li><strong>Fugen zu fr\u00fch eingeschl\u00e4mmt:</strong> Kleber muss mindestens 24 Stunden aush\u00e4rten, bevor verfugt wird.</li>
<li><strong>Kein Dehnungsfugen:</strong> An W\u00e4nden, T\u00fcrzargen und Rohrdurchf\u00fchrungen sind Silikonfugen Pflicht \u2014 keine Zementfuge.</li>
</ol>

<p><strong>Fazit:</strong> Bodenfliesen in einem geraden Raum (Flur, K\u00fcche) sind mit etwas Geschick machbar. Badfliesen \u2014 vor allem mit Dusche und Abdichtung \u2014 lieber dem Profi \u00fcberlassen.</p>

<p>\u2192 <a href="/rechner/eigenleistung">Berechne, wie viel du durch Eigenleistung sparst \u2192</a></p>

<h2>Unsere Material-Empfehlungen</h2>

<h3>Flexkleber: Knauf Flex Fliesenkleber (25 kg)</h3>
<p>Universeller Flexkleber f\u00fcr Boden- und Wandfliesen, innen und au\u00dfen. Reicht f\u00fcr ca. 6\u20138 m\u00b2 bei mittlerer Zahnung. Bester Preis-Leistungs-Kleber f\u00fcr Standard-Projekte.</p>
<p><a href="https://www.amazon.de/s?k=Knauf+Flex+Fliesenkleber+25kg&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon ansehen \u2192</a></p>

<h3>Fugenm\u00f6rtel: Sopro Saphir 5 (5 kg)</h3>
<p>Hochwertiger, flexibler Fugenm\u00f6rtel in \u00fcber 30 Farben. Sehr glatte Oberfl\u00e4che, einfach zu verarbeiten, wasserabweisend. F\u00fcr Fugenbreiten 1\u20137 mm.</p>
<p><a href="https://www.amazon.de/s?k=Sopro+Saphir+5+Fugenm%C3%B6rtel&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon ansehen \u2192</a></p>

<h3>Nivelliersystem: Rubi Tile Level Quick</h3>
<p>Unverzichtbar f\u00fcr gleichm\u00e4\u00dfige Fliesen \u2014 besonders bei Gro\u00dfformat. Das System verhindert Lippenbildung (H\u00f6henversatz zwischen Fliesen) und ist wiederverwendbar.</p>
<p><a href="https://www.amazon.de/s?k=Rubi+Tile+Level+Nivelliersystem&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon ansehen \u2192</a></p>

<p>\u2192 <a href="/rechner/fliesen"><strong>Berechne deinen genauen Materialbedarf \u2192 Fliesen-Rechner</strong></a></p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Was kostet Fliesen verlegen lassen pro m\u00b2?</h3>
<p>Komplett mit Material und Handwerker: <strong>50\u2013120 \u20ac/m\u00b2</strong>. Davon entfallen ca. 15\u201380 \u20ac auf die Fliesen selbst und 30\u201360 \u20ac auf den Verlegelohn. Die genauen Kosten h\u00e4ngen von Fliesentyp, Gr\u00f6\u00dfe, Verlegemuster und Untergrundzustand ab. Nutze unseren <a href="/rechner/fliesen">Fliesen-Rechner</a> f\u00fcr eine individuelle Berechnung.</p>

<h3>Wie lange dauert Fliesen verlegen?</h3>
<p>Ein erfahrener Fliesenleger schafft <strong>8\u201312 m\u00b2 pro Tag</strong> (inkl. Kleber, Zuschnitte, Trockenzeit). Ein 15-m\u00b2-Bad dauert also ca. 2 Arbeitstage f\u00fcr den Boden + 2\u20133 Tage f\u00fcr die W\u00e4nde. Dazu kommen 1 Tag Abdichtung und 1 Tag Verfugen. Insgesamt: <strong>4\u20136 Arbeitstage f\u00fcr ein komplettes Bad.</strong></p>

<h3>Kann man Fliesen auf Fliesen verlegen?</h3>
<p>Ja, unter bestimmten Voraussetzungen: Die alten Fliesen m\u00fcssen <strong>fest, tragf\u00e4hig und eben</strong> sein. Vorteil: Kein Abschlagen n\u00f6tig (spart 10\u201325 \u20ac/m\u00b2). Nachteil: Die Aufbauh\u00f6he erh\u00f6ht sich um ca. 10\u201315 mm \u2014 T\u00fcren und \u00dcberg\u00e4nge pr\u00fcfen! Zwingend mit <strong>Haftgrund und Flexkleber</strong> arbeiten.</p>

<h3>Lohnt sich Feinsteinzeug?</h3>
<p>F\u00fcr die meisten Anwendungen: <strong>ja</strong>. Feinsteinzeug ist h\u00e4rter, wasserunempfindlicher und kratzfester als normale Keramik. Es eignet sich f\u00fcr innen und au\u00dfen. Der Aufpreis gegen\u00fcber Steingut (ca. 5\u201315 \u20ac/m\u00b2 mehr) lohnt sich bei stark genutzten Fl\u00e4chen (Flur, K\u00fcche, Terrasse).</p>

<h3>Brauche ich eine Abdichtung unter den Fliesen?</h3>
<p>In <strong>Nassberichen</strong> (Dusche, Badewannenbereich) ist eine Abdichtung nach DIN 18534 <strong>Pflicht</strong>. Auch bodentiefe Duschen ohne Duschwanne brauchen eine vollfl\u00e4chige Abdichtung. In trockenen R\u00e4umen (Flur, K\u00fcche) ist keine Abdichtung n\u00f6tig \u2014 aber eine Grundierung immer empfehlenswert.</p>`;

// ─── ARTIKEL 2: LAMINAT VERLEGEN KOSTEN ──────────────────────

const laminatContent = `<p>Laminat ist einer der beliebtesten Bodenbel\u00e4ge in Deutschland \u2014 g\u00fcnstig, robust und einfach zu verlegen. Aber was kostet es wirklich? Komplett mit Material und Handwerker: <strong>25\u201370 \u20ac/m\u00b2</strong>. Wir schl\u00fcsseln alle Kosten auf und zeigen, ob du besser selbst verlegst oder einen Bodenleger beauftragst.</p>

<p>\u2192 <a href="/rechner/laminat"><strong>Berechne deinen Materialbedarf \u2192 Laminat-Rechner</strong></a></p>

<h2>Was kostet Laminat verlegen?</h2>

<p>Die <strong>Gesamtkosten f\u00fcr Laminat verlegen</strong> liegen zwischen <strong>25 und 70 \u20ac/m\u00b2</strong>. Die gro\u00dfe Spanne erkl\u00e4rt sich vor allem durch die Qualit\u00e4t des Laminats und ob du selbst verlegst oder einen Handwerker beauftragst.</p>

<p><strong>Schnell-\u00dcbersicht:</strong></p>

<table>
<thead>
<tr><th>Variante</th><th>Kosten/m\u00b2</th><th>Bei 30 m\u00b2 (Wohnzimmer)</th></tr>
</thead>
<tbody>
<tr><td>Budget-Laminat + Eigenverlegung</td><td>12\u201325 \u20ac</td><td>360\u2013750 \u20ac</td></tr>
<tr><td>Mittelklasse-Laminat + Handwerker</td><td>35\u201355 \u20ac</td><td>1.050\u20131.650 \u20ac</td></tr>
<tr><td>Premium-Laminat + Handwerker</td><td>50\u201370 \u20ac</td><td>1.500\u20132.100 \u20ac</td></tr>
</tbody>
</table>

<h2>Kosten aufgeschl\u00fcsselt</h2>

<table>
<thead>
<tr><th>Position</th><th>Kosten pro m\u00b2/lfm</th><th>Bei 30 m\u00b2</th></tr>
</thead>
<tbody>
<tr><td><strong>Laminat</strong></td><td>8\u201340 \u20ac/m\u00b2</td><td>240\u20131.200 \u20ac</td></tr>
<tr><td><strong>Trittschalld\u00e4mmung</strong></td><td>2\u20135 \u20ac/m\u00b2</td><td>60\u2013150 \u20ac</td></tr>
<tr><td><strong>Dampfbremsfolie</strong></td><td>0,50\u20131,50 \u20ac/m\u00b2</td><td>15\u201345 \u20ac</td></tr>
<tr><td><strong>Sockelleisten</strong></td><td>2\u20134 \u20ac/lfm</td><td>40\u201380 \u20ac (ca. 20 lfm)</td></tr>
<tr><td><strong>\u00dcbergangsprofile</strong></td><td>5\u201315 \u20ac/St\u00fcck</td><td>10\u201345 \u20ac (2\u20133 T\u00fcren)</td></tr>
<tr><td><strong>Handwerker (optional)</strong></td><td>10\u201325 \u20ac/m\u00b2</td><td>300\u2013750 \u20ac</td></tr>
<tr><td><strong>Gesamt (mit Handwerker)</strong></td><td><strong>25\u201370 \u20ac/m\u00b2</strong></td><td><strong>750\u20132.100 \u20ac</strong></td></tr>
</tbody>
</table>

<h3>Laminat: 8\u201340 \u20ac/m\u00b2</h3>
<p>Der gr\u00f6\u00dfte Kostenfaktor. Die Qualit\u00e4t wird \u00fcber die <strong>Nutzungsklasse</strong> definiert:</p>

<table>
<thead>
<tr><th>Nutzungsklasse</th><th>Einsatzbereich</th><th>Preis/m\u00b2</th></tr>
</thead>
<tbody>
<tr><td><strong>NK 21</strong></td><td>Schlafzimmer (wenig Nutzung)</td><td>8\u201315 \u20ac</td></tr>
<tr><td><strong>NK 22</strong></td><td>Wohnzimmer (normale Nutzung)</td><td>12\u201320 \u20ac</td></tr>
<tr><td><strong>NK 23</strong></td><td>Flur, K\u00fcche (starke Nutzung)</td><td>15\u201325 \u20ac</td></tr>
<tr><td><strong>NK 31\u201333</strong></td><td>Gewerblich / B\u00fcro</td><td>20\u201340 \u20ac</td></tr>
</tbody>
</table>

<p><strong>Tipp:</strong> F\u00fcr Wohnr\u00e4ume mindestens <strong>NK 22</strong> w\u00e4hlen. F\u00fcr Flur und K\u00fcche NK 23 \u2014 der Aufpreis lohnt sich durch deutlich l\u00e4ngere Haltbarkeit. Rechne <strong>8\u201310 % Verschnitt</strong> ein.</p>

<h3>Trittschalld\u00e4mmung: 2\u20135 \u20ac/m\u00b2</h3>
<p>Unter jedem schwimmend verlegten Laminat geh\u00f6rt eine Trittschalld\u00e4mmung \u2014 sie ist <strong>keine optionale Zugabe, sondern Pflicht</strong>. Sie d\u00e4mpft Gehger\u00e4usche, gleicht kleine Unebenheiten aus und sch\u00fctzt die Click-Verbindungen. Empfehlung: 2\u20133 mm PE-Schaum (Budget) oder 3\u20135 mm Kork/Holzfaser (Premium).</p>

<p><strong>Achtung:</strong> Auf mineralischen Untergr\u00fcnden (Estrich, Beton) zus\u00e4tzlich eine <strong>Dampfbremsfolie</strong> unter die D\u00e4mmung legen. Sonst kann aufsteigende Feuchtigkeit das Laminat von unten besch\u00e4digen. Auf Holz-Untergr\u00fcnden (OSB, Spanplatte) ist keine Dampfbremse n\u00f6tig.</p>

<h3>Sockelleisten: 2\u20134 \u20ac/lfm</h3>
<p>Schwimmend verlegtes Laminat braucht einen <strong>Dehnungsspalt von 8\u201310 mm</strong> zur Wand (Holz arbeitet). Sockelleisten verdecken diesen Spalt. MDF-Leisten kosten 2\u20133 \u20ac/lfm, Massivholz-Leisten 3\u20135 \u20ac/lfm. Befestigung mit Clips oder Montagekleber.</p>

<h3>Handwerker: 10\u201325 \u20ac/m\u00b2</h3>
<p>Der <strong>Verlegelohn</strong> f\u00fcr Laminat ist vergleichsweise g\u00fcnstig, weil die Arbeit schneller geht als bei Fliesen. Ein Bodenleger schafft <strong>15\u201325 m\u00b2 pro Tag</strong>. Aufschl\u00e4ge bei: alten Boden entfernen (+5\u201315 \u20ac/m\u00b2), Untergrund ausgleichen (+5\u201310 \u20ac/m\u00b2), vielen Ecken/Nischen.</p>

<p>\u2192 <a href="/rechner/handwerkerkosten">Was kostet ein Bodenleger? \u2192 Handwerkerkosten-Rechner</a></p>

<h2>Laminat vs. Vinyl vs. Parkett</h2>

<p>Laminat ist nicht die einzige Option. So vergleichen sich die Alternativen:</p>

<table>
<thead>
<tr><th>Kriterium</th><th>Laminat</th><th>Vinyl (LVT/SPC)</th><th>Parkett</th></tr>
</thead>
<tbody>
<tr><td><strong>Preis Material</strong></td><td>8\u201340 \u20ac/m\u00b2</td><td>15\u201345 \u20ac/m\u00b2</td><td>30\u2013120 \u20ac/m\u00b2</td></tr>
<tr><td><strong>Verlegekosten</strong></td><td>10\u201325 \u20ac/m\u00b2</td><td>10\u201325 \u20ac/m\u00b2</td><td>25\u201350 \u20ac/m\u00b2</td></tr>
<tr><td><strong>Wasserfest</strong></td><td>\u274c Nein (quillt auf)</td><td>\u2705 Ja (100 %)</td><td>\u274c Bedingt</td></tr>
<tr><td><strong>Fu\u00dfbodenheizung</strong></td><td>\u2705 Bedingt</td><td>\u2705 Ja</td><td>\u2705 Bedingt</td></tr>
<tr><td><strong>Haltbarkeit</strong></td><td>10\u201320 Jahre</td><td>15\u201325 Jahre</td><td>30\u201350+ Jahre</td></tr>
<tr><td><strong>Reparierbar</strong></td><td>\u274c Nein (Austausch)</td><td>\u274c Nein (Austausch)</td><td>\u2705 Ja (Abschleifen)</td></tr>
<tr><td><strong>Optik/Haptik</strong></td><td>Gut (Dekor)</td><td>Sehr gut</td><td>Am besten (Echtholz)</td></tr>
<tr><td><strong>DIY-tauglich</strong></td><td>\u2705 Ja (einfach)</td><td>\u2705 Ja (einfach)</td><td>\u26a0\ufe0f Bedingt</td></tr>
</tbody>
</table>

<p><strong>Empfehlung:</strong></p>
<ul>
<li><strong>Laminat</strong>: Wenn Budget knapp und kein Nassbereich (Wohn-/Schlafzimmer, B\u00fcro)</li>
<li><strong>Vinyl/SPC</strong>: F\u00fcr K\u00fcche, Bad, Keller \u2014 \u00fcberall wo Wasser eine Rolle spielt</li>
<li><strong>Parkett</strong>: Wenn Langlebigkeit und Wertigkeit im Vordergrund stehen</li>
</ul>

<h2>Laminat selber verlegen \u2014 so geht\u2019s</h2>

<p>Laminat verlegen ist eines der <strong>einsteigerfreundlichsten DIY-Projekte</strong> \u00fcberhaupt. Modernes Klick-Laminat braucht weder Kleber noch Spezialkenntnisse.</p>

<h3>Was du brauchst:</h3>
<ul>
<li>Zollstock, Stift, Winkel</li>
<li>Stichs\u00e4ge oder Kapps\u00e4ge (Zuschnitte)</li>
<li>Zugeisen + Schlagklotz (letzte Reihe einpassen)</li>
<li>Abstandskeile (8\u201310 mm zur Wand)</li>
<li>Cuttermesser (Trittschalld\u00e4mmung zuschneiden)</li>
</ul>

<h3>Schritt-f\u00fcr-Schritt:</h3>
<ol>
<li><strong>Untergrund pr\u00fcfen:</strong> Muss eben sein (max. 3 mm Abweichung auf 1 m). Unebenheiten mit Ausgleichsmasse nivellieren.</li>
<li><strong>Dampfbremsfolie auslegen</strong> (auf Estrich/Beton). Bahnen 20 cm \u00fcberlappen und mit Klebeband fixieren.</li>
<li><strong>Trittschalld\u00e4mmung verlegen:</strong> Bahn f\u00fcr Bahn, Sto\u00df an Sto\u00df (nicht \u00fcberlappen!).</li>
<li><strong>Erste Reihe:</strong> Feder zur Wand (oder abs\u00e4gen), Abstandskeile setzen. Dielen einclicken.</li>
<li><strong>Folgende Reihen:</strong> Versatz mindestens 30 cm zur Vorreihe. Klick-Verbindung l\u00e4ngs einwinkeln, dann quer eindr\u00fccken.</li>
<li><strong>Letzte Reihe:</strong> L\u00e4ngs zuschneiden (S\u00e4ge oder Cuttermesser), mit Zugeisen einpassen.</li>
<li><strong>Sockelleisten montieren:</strong> Mit Clips oder Montagekleber befestigen.</li>
</ol>

<p><strong>Zeitaufwand:</strong> Ein ge\u00fcbter Heimwerker schafft ca. <strong>10\u201320 m\u00b2 pro Tag</strong>. Ein 25-m\u00b2-Raum ist an einem Wochenende fertig.</p>

<p>\u2192 <a href="/rechner/eigenleistung">Berechne deine Ersparnis durch Eigenleistung \u2192</a></p>

<h2>Unsere Empfehlungen</h2>

<h3>Preis-Leistung: EGGER HOME Laminat (Eiche Natur, NK 23)</h3>
<p>Robustes Laminat in NK 23 \u2014 geeignet f\u00fcr Wohnzimmer, Flur und K\u00fcche. 8 mm St\u00e4rke, integrierte Trittschalld\u00e4mmung bei einigen Varianten. Sch\u00f6ne Eichen-Optik mit synchroner Pr\u00e4gung.</p>
<p><a href="https://www.amazon.de/s?k=EGGER+HOME+Laminat+Eiche+NK23&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon ansehen \u2192</a></p>

<h3>Budget: KRONOTEX Laminat (NK 22, 7 mm)</h3>
<p>Solides Laminat zum kleinen Preis. NK 22 reicht f\u00fcr Schlaf- und Wohnzimmer. Klick-System, einfache Verlegung. Gut f\u00fcr Mietwohnungen und G\u00e4stezimmer.</p>
<p><a href="https://www.amazon.de/s?k=KRONOTEX+Laminat+Eiche+NK22&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon ansehen \u2192</a></p>

<h3>Trittschalld\u00e4mmung: STEICO Holzfaser (5 mm)</h3>
<p>Premium-Trittschalld\u00e4mmung aus nat\u00fcrlicher Holzfaser. Hervorragende Trittschalld\u00e4mmung (19 dB), gleicht Unebenheiten bis 3 mm aus. Nachhaltiger als PE-Schaum und deutlich leiser.</p>
<p><a href="https://www.amazon.de/s?k=STEICO+Holzfaser+Trittschalld%C3%A4mmung+5mm&tag=hausbauhero-21" target="_blank" rel="nofollow noopener noreferrer">Auf Amazon ansehen \u2192</a></p>

<p>\u2192 <a href="/rechner/laminat"><strong>Berechne deinen genauen Materialbedarf \u2192 Laminat-Rechner</strong></a></p>

<h2>H\u00e4ufige Fragen (FAQ)</h2>

<h3>Was kostet Laminat verlegen lassen pro m\u00b2?</h3>
<p>Der reine Verlegelohn liegt bei <strong>10\u201325 \u20ac/m\u00b2</strong> (netto). Inklusive Material (Laminat, D\u00e4mmung, Leisten) liegen die Gesamtkosten bei <strong>25\u201370 \u20ac/m\u00b2</strong> \u2014 je nach Qualit\u00e4t des Laminats. Nutze unseren <a href="/rechner/laminat">Laminat-Rechner</a> f\u00fcr eine genaue Sch\u00e4tzung.</p>

<h3>Kann ich Laminat auf Fliesen verlegen?</h3>
<p><strong>Ja</strong>, das ist problemlos m\u00f6glich. Voraussetzung: Die Fliesen m\u00fcssen fest und eben sein. Trittschalld\u00e4mmung legen, Dampfbremsfolie ist auf Fliesen nicht n\u00f6tig (Fliesen sind dampfdicht). Beachte die h\u00f6here Aufbauh\u00f6he (ca. 10\u201313 mm) \u2014 T\u00fcren m\u00fcssen eventuell gek\u00fcrzt werden.</p>

<h3>Wie lange h\u00e4lt Laminat?</h3>
<p>Bei normaler Nutzung und guter Qualit\u00e4t (NK 22\u201323): <strong>10\u201320 Jahre</strong>. Die Lebensdauer h\u00e4ngt stark von der Pflege ab: Kein nasses Wischen (nur nebelfeucht!), keine spitzen Gegenst\u00e4nde, Filzgleiter unter M\u00f6bel. Budget-Laminat (NK 21) h\u00e4lt oft nur 5\u201310 Jahre.</p>

<h3>Laminat oder Vinyl \u2014 was ist besser?</h3>
<p>Kommt auf den Einsatzort an. <strong>Laminat</strong> ist g\u00fcnstiger und hat eine h\u00e4rtere Oberfl\u00e4che (kratzfester), quillt aber bei Wasser auf. <strong>Vinyl</strong> ist 100 % wasserfest und eignet sich f\u00fcr K\u00fcche, Bad und Keller. F\u00fcr Wohn- und Schlafzimmer ist Laminat die wirtschaftlichere Wahl; f\u00fcr Feuchtr\u00e4ume Vinyl.</p>

<h3>Brauche ich eine Dampfbremsfolie unter dem Laminat?</h3>
<p>Auf <strong>mineralischen Untergr\u00fcnden</strong> (Estrich, Beton, Fliesen auf Estrich): <strong>Ja, zwingend.</strong> Aufsteigende Restfeuchte kann das Laminat von unten besch\u00e4digen. Auf <strong>Holzuntergr\u00fcnden</strong> (OSB, Dielen, Spanplatte): Nein, keine Dampfbremse \u2014 Holz muss atmen k\u00f6nnen.</p>`;

async function run() {
  console.log("=== FLIESEN VERLEGEN KOSTEN (INSERT) ===");
  const r1 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: BODEN_SILO,
      slug: "fliesen-verlegen-kosten",
      titel: "Fliesen verlegen Kosten pro m\u00b2 2026 \u2014 Material + Handwerker",
      seo_title: "Fliesen verlegen Kosten pro m\u00b2: Material + Handwerker (2026)",
      seo_description:
        "Was kostet Fliesen verlegen pro m\u00b2? Alle Kosten aufgeschl\u00fcsselt: Fliesen (15\u201380 \u20ac), Kleber, Fugem\u00f6rtel und Handwerker (30\u201360 \u20ac). Mit Fliesen-Rechner.",
      typ: "artikel",
      content_md: fliesenContent,
      status: "aktiv",
    }),
  });
  const d1 = await r1.json();
  console.log(
    r1.ok && d1.length > 0
      ? "OK: " + d1[0].slug
      : "FAIL: " + JSON.stringify(d1)
  );

  console.log("\n=== LAMINAT VERLEGEN KOSTEN (INSERT) ===");
  const r2 = await fetch(BASE + "/rest/v1/seiten", {
    method: "POST",
    headers,
    body: JSON.stringify({
      silo_id: BODEN_SILO,
      slug: "laminat-verlegen-kosten",
      titel: "Laminat verlegen Kosten 2026 \u2014 Material + Handwerker",
      seo_title: "Laminat verlegen Kosten 2026: Material + Handwerker pro m\u00b2",
      seo_description:
        "Laminat verlegen Kosten 2026: 25\u201370 \u20ac/m\u00b2 komplett. Aufschl\u00fcsselung Material, Trittschalld\u00e4mmung, Handwerker. Plus: Laminat vs. Vinyl vs. Parkett Vergleich.",
      typ: "artikel",
      content_md: laminatContent,
      status: "aktiv",
    }),
  });
  const d2 = await r2.json();
  console.log(
    r2.ok && d2.length > 0
      ? "OK: " + d2[0].slug
      : "FAIL: " + JSON.stringify(d2)
  );
}

run();

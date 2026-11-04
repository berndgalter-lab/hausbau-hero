# Seitenaufbau: Ratgeber, Marken und Serien

Stand: 4. November 2026. Legt fest, wie die Bad-Seiten künftig aufgebaut sind. Ergänzt `KONZEPT-BAD-SANITAER.md` (was wir machen) um das Wie. Vorbild ist womo-teile, zum Beispiel `/ratgeber/dieselheizung` und `/fahrzeuge/poessl`.

## 1. Was heute nicht stimmt

Angesehen: die vier Kaufberatungen, `/ersatzteile/blanco`, `/ersatzteile/grohe`, `/ersatzteile/grohe/eurosmart-duscharmatur`.

### Kaufberatungen

Die Texte sind gut: Maße aus Herstellerunterlagen, Quellen, ehrliche Nachteile. Der Rahmen drumherum ist das alte Vergleichsseiten-Muster:

- Titel „6 Modelle im Vergleich (2026)“: Anzahl plus Jahreszahl, genau wie die automatisch erzeugten Testseiten.
- Ganz oben ein Affiliate-Hinweis und die Box „Unsere Empfehlungen auf einen Blick“ mit den Abzeichen „Unsere Empfehlung“ und „Preis-Tipp“ und sechs „Preis prüfen“-Knöpfen, bevor der Leser einen Satz gelesen hat.
- Unter dem Text noch einmal alle Produkte als Karten mit Plus/Minus-Listen und Amazon-Knopf, danach die Datentabelle. Die Quellen stehen mittendrin, zwischen Text und Karten.
- „Kategorie: Bad & Sanitär“ und „Passende Rechner“ ohne Bezug zur Frage.

Die Vorlage `src/app/[silo]/[slug]/page.tsx` erzeugt das für jeden Beitrag gleich. Die Felder `ist_testsieger` und `ist_preistipp` in `*.produkte.json` liefern die Abzeichen.

### Marken-Seiten

- Die Marken-Beschreibung ist ein einziger langer Absatz in Rechercheprotokoll-Sprache: „belegt keine gefundene Blanco-Quelle“, „Marketingaussage, keine Vertragsbedingung gefunden“. Das sind Notizen für uns, nicht für Leser.
- Darunter Serien als nackte Liste, manche ohne Nummer, und alle Teile als lange Liste mit „Bei Amazon suchen →“ je Zeile. Bei Blanco haben 57 von 59 Teilen keine ASIN, die Seite ist also eine Liste von Amazon-Suchlinks. Das Konzept schließt Suchlinks ausdrücklich aus.
- Der stärkste Inhalt, „Wo sich Händler widersprechen“ (Blanco 4, Grohe 10, Geberit 20 Fälle), steht ganz unten.

### Serien-Seiten

- 52 von 139 Serien haben höchstens ein zugeordnetes Teil.
- Bei Grohe enthalten 28 von 42 Serien Notiz-Sprache, etwa „Keine belastbaren Gestaltungsmerkmale recherchiert“ unter „Ist das meine Serie?“.
- Quellen erscheinen als „grohe.de grohe.de dawonia.de“.

Das sind dünne Seiten, und davon viele. Genau das wertet Google seit den Updates zu hilfreichen Inhalten und Produktbewertungen ab.

## 2. Grundsätze für alle Seiten

1. **Eine Frage pro Seite, im Titel.** „Waschtischarmatur: welche passt zu Becken und Warmwasser?“ statt „6 Modelle im Vergleich (2026)“. Keine Anzahl, keine Jahreszahl im Titel.
2. **Erst die Antwort, dann die Produkte.** Kein Produktblock vor dem ersten Absatz.
3. **Stand und Quellen sichtbar unter der Überschrift**, wie der Prüfvermerk bei womo-teile: „Geprüft am 4.11.2026 · 19 Quellen“. Das Datum steht nur da, wenn wirklich geprüft wurde.
4. **Methode offen sagen:** „Datenblattvergleich, kein Test“ als eigener kurzer Kasten.
5. **Keine Abzeichen** wie Testsieger, Empfehlung, Preis-Tipp. Stattdessen „Passt, wenn …“ und „Passt nicht, wenn …“.
6. **Kaufen ist eine Zeile, kein Block.** Preis und Shop stehen klein beim Modell („Contorion 92,99 €*“). Amazon nur mit geprüfter ASIN, sonst ein Partnershop, sonst gar kein Link.
7. **Leser-Sprache in allen sichtbaren Feldern.** Was offen oder ungeprüft ist, gehört in `nicht_geprueft` oder ein neues Feld `intern`, nicht in Beschreibungen.
8. **Affiliate-Hinweis einmal, am Ende**, plus Sternchen an den Shop-Links.
9. **Unser eigener Vorteil gehört nach oben:** Kompatibilität, Nummern-Verwechslungen, Widersprüche zwischen Händlern. Das hat keine Testseite und kein Shop.

## 3. Seitentyp Ratgeber (bisher „Kaufberatung“)

URL bleibt `/bad/<slug>`. Reihenfolge:

| # | Baustein | Inhalt |
|---|---|---|
| 1 | Überschrift | Die Frage des Lesers |
| 2 | Einstieg | 2–3 Sätze mit konkreten Zahlen (Preisspanne laut Shops, worauf es ankommt) |
| 3 | Prüfvermerk | Datum, Zahl der Quellen, Sprung zur Quellenliste |
| 4 | Die kurze Antwort | 3–4 Sätze, für die meisten Leser reicht das |
| 5 | Finder | 2–3 Fragen (Warmwasser: zentral, Durchlauferhitzer, Untertischspeicher · Becken: Einbau oder Aufsatz · Brause ja/nein), darunter die passenden Modelle. Daten aus `technische_daten`, dieselben wie unter `/vergleich/armaturen` |
| 6 | Wissen | Die bisherigen Abschnitte (Größe, Ablaufgarnitur, Oberflächen, Anschluss) |
| 7 | Die Modelle | Je Modell ein kurzer Abschnitt in Fließtext: wofür es passt, worauf achten (z. B. 33265003 vs. 33265002), Bild mit Quelle, eine Kaufzeile |
| 8 | Datentabelle | Wie heute, aber nach den Modellen |
| 9 | Wenn es kaputt geht | Links auf die passenden Serien- und Problem-Seiten. Kein Vergleichsportal hat das |
| 10 | Quellen, Affiliate-Hinweis | Am Ende |

Raus: Box „Auf einen Blick“, Abzeichen, Plus/Minus-Karten, „Kategorie:“, „Passende Rechner“ (nur noch, wenn der Beitrag den Rechner wirklich braucht).

Umgesetzt ohne Datenbank-Änderung: Die Vorlage zerlegt das Artikel-HTML (`src/lib/artikel-aufbau.ts`). Den Prüfvermerk liefern „(Stand: …)“ aus dem Hinweis „nicht selbst getestet“ und die Zahl der Einträge unter „Quellen“, den Methodenkasten liefert derselbe Hinweis. Neue Beiträge brauchen deshalb genau diese Bausteine im HTML. Je Produkt erscheinen `einsatzbereich` als „Passt für“, `vorteile` als „Spricht dafür“ und `nachteile` als „Worauf achten“. `ist_testsieger` und `ist_preistipp` zeigt die Vorlage nicht mehr an, sie fliegen beim Umstellen der Beiträge aus den Produktdateien.

`/vergleich/armaturen` bleibt unter der URL (177 Impressionen), heißt aber „Armaturen-Datenblätter nebeneinander“ und bekommt denselben Prüfvermerk und Methodenkasten.

## 4. Seitentyp Marke (`/ersatzteile/<marke>`)

Aufgebaut wie ein Weg in drei Schritten, so wie der Pössl-Hub bei womo-teile:

1. **Einstieg:** 2–3 Sätze, was die Marke baut und wie man bei ihr Teile findet.
2. **Schritt 1: Nummer finden.** Wo sie steht, wie sie aussieht (Beispiel mit Format), was die letzte Stelle bedeutet. Später mit eigenem Foto.
3. **Schritt 2: Serie wählen.** Karten nach Produkttyp (Waschtisch, Dusche, Küche, Spülkasten …) mit bekannten Nummern. Dazu die Suche nach Artikelnummer.
4. **Häufige Probleme:** die Problem-Seiten der Marke.
5. **Achtung, Verwechslungsgefahr:** die Widersprüche, nach oben geholt und in Leser-Sprache („138069 oder 138067? Händler verwechseln Einzel- und Doppelgarnitur“).
6. **Ersatzteil-Garantie:** kurzer Faktenkasten (Garantie, Verfügbarkeit, Quelle), ohne Rechercheprotokoll.
7. **Alle Teile nach Art:** kompakte Tabelle mit Nummer, Name, Link zur Teil-Seite. Kein Kaufknopf je Zeile.
8. **Quellen** mit lesbaren Namen statt Domains.

## 5. Seitentyp Serie (`/ersatzteile/<marke>/<serie>`)

- **Indexiert nur mit Substanz:** mindestens zwei belegte Teile oder echte Erkennungsmerkmale. Sonst `noindex`, und die Serie erscheint nur als Karte auf der Marken-Seite. Betrifft heute bis zu 52 Seiten.
- „Ist das meine Serie?“ nur, wenn es Merkmale gibt. Sonst ein Satz, wie man es über die Nummer prüft.
- Teile-Tabelle mit Beleg in Worten („Grohe-Ersatzteilblatt 33 555 003“), Kaufzeile pro Teil.
- Verweis auf die passende Problem-Seite und, wo es sie gibt, auf den Ratgeber zum Neukauf.

## 6. Prüfregel für die Daten

Ein Skript (`scripts/pruefe-inhalte.py`, läuft im CI vor dem Merge) lehnt ab:

- Notiz-Sprache in sichtbaren Feldern: „recherchiert“, „gefunden“, „belegt keine“, „Suchauszug“, „Marketingaussage“.
- Jahreszahl oder „X Modelle“ in `titel` und `seo_title`.
- `ist_testsieger` / `ist_preistipp` in Produktdateien.
- Teile ohne ASIN und ohne Partnershop, die trotzdem einen Kaufknopf bekämen. (Noch nicht im Skript: Die Partnershop-Angebote liegen nur in der Datenbank.)

## 7. Reihenfolge

1. Vorlagen umbauen: Ratgeber, Marke, Serie. Prüfvermerk und Methodenkasten als eigene Bausteine. **Erledigt** (Branch `feat/seitenaufbau`), dünne Serien sind schon `noindex` und fehlen in der Sitemap.
2. Die vier Ratgeber umstellen: Titel, Produktfelder, kurze Antwort. Der Fließtext bleibt größtenteils. **Erledigt:** Titel als Frage, Abzeichen-Felder entfernt, „Passt für“ konkret, Spalte „Preisklasse“ entfernt, Niederdruck-Beitrag mit Quellenliste.
3. Die sechs Marken-Dateien sprachlich säubern (Beschreibung, Nummer-Hinweis, Garantie, Widersprüche).
4. Dünne Serien auf `noindex`, Prüfregel ins CI. **Erledigt:** `scripts/pruefe-inhalte.py`, Workflow `inhalte-pruefen`. Ersatzteile vorerst nur als Hinweis, nach Schritt 3 mit `--streng`.
5. Danach erst neue Seiten (WC/Vorwand), gleich im neuen Aufbau.

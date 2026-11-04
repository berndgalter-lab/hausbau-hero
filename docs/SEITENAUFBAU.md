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

1. **Eine Frage pro Seite, im Titel.** „Waschtischarmatur: welche passt zu Becken und Warmwasser?“ statt „6 Modelle im Vergleich (2026)“. Keine Anzahl, keine Jahreszahl im Titel, auch nicht in der URL.
2. **Erst die Antwort, dann die Produkte.** Kein Produktblock vor dem ersten Absatz.
3. **Stand und Quellen sichtbar unter der Überschrift**, wie der Prüfvermerk bei womo-teile: „Geprüft am 4.11.2026 · 19 Quellen“. Das Datum steht nur da, wenn wirklich geprüft wurde.
4. **Methode offen sagen:** „Datenblattvergleich, kein Test“ als eigener kurzer Kasten.
5. **Keine Abzeichen** wie Testsieger, Empfehlung, Preis-Tipp. Stattdessen „Passt, wenn …“ und „Passt nicht, wenn …“.
6. **Kaufen ist eine Zeile, kein Block.** Preis und Shop stehen klein beim Modell („Contorion 92,99 €*“). Amazon nur mit geprüfter ASIN, sonst ein Partnershop, sonst gar kein Link.
7. **Leser-Sprache in allen sichtbaren Feldern.** Was offen oder ungeprüft ist, gehört in `nicht_geprueft` oder ein neues Feld `intern`, nicht in Beschreibungen.
8. **Affiliate-Hinweis einmal, am Ende**, plus Sternchen an den Shop-Links.
9. **Unser eigener Vorteil gehört nach oben:** Kompatibilität, Nummern-Verwechslungen, Widersprüche zwischen Händlern. Das hat keine Testseite und kein Shop.

### Was nach Affiliate-Seite aussieht, gibt es nicht mehr

Im Code durchgesetzt, gilt für alle Seiten (alte Beiträge eingeschlossen):

- Amazon-Suchlinks (`amazon.de/s?k=…`) sind nie Kauflinks: `istAmazonSuche` in `src/lib/affiliate.ts`. Im Artikeltext wird der Link zu reinem Text, auf Teil-, Rechner- und Produktseiten entfällt er.
- Ein Produkt bekommt im Ratgeber nur einen Abschnitt, wenn es eine ASIN oder EAN hat. Gattungsbegriffe wie „Kondensatpumpe“ erscheinen nicht.
- Abschnitte „Unsere Empfehlungen“ alter Beiträge (Budget-Tipp, Premium-Tipp) blendet die Vorlage aus.
- Keine orangefarbenen Kaufknöpfe, keine Abzeichen, keine Emojis in Navigation und Überschriften. Kaufen ist ein Textlink mit Sternchen, erklärt einmal pro Seite.
- Navigation: „Bad-Ratgeber“ und „Armaturen-Datenblätter“ statt „Bad-Kaufberatung“ und „Armaturen-Vergleich“ (URLs bleiben).

## 3. Seitentyp Produkt-Ratgeber (`/ratgeber/<produkt>`)

Vorbild ist womo-teile (`/ratgeber/dieselheizung`): Die Seite beantwortet „Welche passt zu mir?“ mit einer Auswahlhilfe, nicht mit einer Liste „Die besten …“. Im neuen Aufbau: `/ratgeber/waschtischarmatur`, `/ratgeber/niederdruckarmatur`, `/ratgeber/waschtischarmatur-mit-brause`.

### URL-Schema

- **`/ratgeber/<produkt>`**, Produkt in der Einzahl, ohne Kategorie, ohne „-ratgeber“, ohne Jahreszahl: `/ratgeber/waschtischarmatur`, `/ratgeber/niederdruckarmatur`, `/ratgeber/waschtischarmatur-mit-brause` (eigene Produktart, weil Leser gezielt danach suchen), später `/ratgeber/badewannenarmatur`, `/ratgeber/drueckerplatte`.
- Die alte URL `/<silo>/<slug>` leitet dauerhaft weiter (308, von Google wie 301 behandelt). Die Weiterleitung, die Sitemap, das Canonical und alle internen Links (`artikelUrl()`) ergeben sich aus dem Eintrag in `src/lib/produkt-ratgeber.ts`. Nichts davon wird von Hand gepflegt.
- Der Slug in `data/artikel` bleibt der alte (`waschtischarmatur-ratgeber`), damit der stündliche Import dieselbe Zeile in `seiten` trifft. Keine Datenbank-Änderung nötig.
- Reine Wissensbeiträge ohne Produktauswahl (Estrich, Wandfarbe …) bleiben unter `/<silo>/<slug>`.

### Reihenfolge auf der Seite

| # | Baustein | Woher |
|---|---|---|
| 1 | Überschrift als Frage | `titel` in der Meta-Datei |
| 2 | Einstieg, 2–3 Sätze mit Zahlen | Absätze vor der ersten `<h2>` |
| 3 | Prüfvermerk: Stand · „Datenblattvergleich, kein Test“ · Zahl der Quellen | `<p><em>Hinweis: … (Stand: …)</em></p>` und die Liste unter „Quellen“ |
| 4 | Kurz gesagt: 3–4 Sätze | `<h2>Kurz gesagt</h2>` |
| 5 | **Auswahlhilfe** (Hauptteil): Fragen mit „egal“, darunter die passenden Modelle mit Bild, Eckdaten, „Passt für“, Kaufzeile; aufklappbar Beschreibung, „Spricht dafür“, „Worauf achten“ | Fragen in `produkt-ratgeber.ts`, Produkte aus `<slug>.produkte.json`, Bild und Preis aus den Partner-Feeds über die EAN |
| 6 | Kurzer Erklärteil: nur, was die Auswahl nicht schon sagt | übrige `<h2>`-Abschnitte |
| 7 | Technische Daten im Vergleich | `technische_daten` |
| 8 | Wenn etwas kaputt geht | `src/lib/ersatzteil-verweise.ts` |
| 9 | Häufige Fragen, aufklappbar, mit Quelle je Antwort, dazu `FAQPage`-Daten | `<h2>Häufige Fragen</h2>`, je Frage eine `<h3>` |
| 10 | Quellen, Affiliate-Hinweis | `<h2>Quellen</h2>` |

Nicht mehr auf der Seite: „Welches Modell für wen?“, „Die Modelle im Einzelnen“ und jede andere Liste, die Modelle der Reihe nach empfiehlt. Was zu einem Modell wichtig ist (Verwechslungsgefahr mit einer ähnlichen Nummer, fehlende Angaben), steht in dessen `nachteile` und erscheint unter „Worauf achten“. Keine Abzeichen, keine Kaufknöpfe, kein Absatz „Probleme und Ersatzteile“ im Text (dafür gibt es Baustein 8).

### Auswahlhilfe

- Jede Frage hat „egal“ als erste Option und ist vorausgewählt. Ohne Auswahl stehen alle Modelle da.
- Eine Option prüft ein Feld aus `technische_daten` und sagt je Modell: passt, passt nicht, oder keine Angabe. Modelle ohne Angabe stehen getrennt („Dazu nennt der Hersteller nichts“), statt als passend zu gelten.
- Fällt eine Wahl aus dem Beitrag heraus (Untertischspeicher → Niederdruck, Brause → eigener Ratgeber), verweist `sonst` auf den passenden Ratgeber, statt eine leere Liste zu zeigen.
- Unter einer Frage höchstens ein Satz, der erklärt, woran man die Antwort erkennt.
- Ein Modell erscheint nur mit EAN oder ASIN. Fehlt beides (bei Niederdruck: hansgrohe Logis 70, Kludi BOZZ), kann eine Option per `sonst` auf das Modell hinweisen, bis die EAN belegt ist.
- Bild nur, wenn ein Partnershop eins liefert, sonst ein leeres Feld „kein Bild“. Bilder laufen über `TeilBild` (Next.js-Bildoptimierung, keine IP an Shops).
- Kaufzeile: bis zu drei Partnershops mit Preis, dann Amazon nur mit ASIN, alles als Textlink mit Sternchen.

### Neuen Produkt-Ratgeber anlegen

1. Beitrag wie bisher in `data/artikel/` anlegen (`<slug>.html`, `.produkte.json`, `.meta.json`, Slug in `index.json`). HTML-Aufbau: Einstieg, Hinweis mit Stand, „Kurz gesagt“, Erklärabschnitte, „Häufige Fragen“ (je `<h3>` eine Frage, Antwort mit „Quelle: <a>…</a>“), „Quellen“.
2. Jedes Produkt mit `ean` oder `amazon_asin` und `technische_daten` (Schlüssel siehe `src/lib/armatur-daten.ts`), `einsatzbereich` konkret, `nachteile` mit allem, worauf man beim Kauf achten muss.
3. In `src/lib/produkt-ratgeber.ts` einen Eintrag ergänzen: `pfad`, `slug`, `silo`, `name`, `mehrzahl`, die Fragen und die Eckdaten der Ergebniszeile. Fragen nur zu Merkmalen, nach denen Leser wirklich unterscheiden (Warmwasser, Becken, Montage), nicht zu jedem Datenfeld.
4. Prüfregel laufen lassen: `python3 -I scripts/pruefe-inhalte.py --streng`.

Umstellen der übrigen Bad-Kaufberatungen (Badewanne, Drückerplatte, Vorwandelement): je Beitrag Schritt 3 und den Text nach der Tabelle oben kürzen. Bis dahin laufen sie in der alten Vorlage `src/app/[silo]/[slug]/page.tsx` mit `ModellFinder`; der fällt weg, wenn der letzte umgestellt ist.

`/vergleich/armaturen` bleibt unter der URL (177 Impressionen), heißt aber „Armaturen-Datenblätter nebeneinander“.

## 4. Seitentyp Marke (`/ersatzteile/<marke>`)

Die Seite bedient vier Einstiege: Nummer schon da, etwas ist kaputt, Modell bekannt, Teileart bekannt. Reihenfolge:

1. **Kopf:** H1, 2–3 Sätze, was die Marke baut und was meistens kaputtgeht. Darunter die Suche („Du hast schon eine Nummer?“) und Sprungmarken zu den Abschnitten.
2. **Etwas ist kaputt?** Die Problem-Seiten der Marke als Karten.
3. **So findest du die richtige Nummer:** wo sie steht, Format mit Beispielen, was tun ohne Unterlagen. Absätze mit Leerzeile trennen, jeder Absatz ein Gedanke. Kein Weg zum Hersteller-Katalog.
4. **Ersatzteile nach Modell:** Karten nach Produkttyp, größte Gruppe zuerst, zwei Spalten auch mobil. Name ohne Markennamen, darunter Teile-Anzahl und erste Nummer.
5. **Ersatzteile nach Art:** Sprungmarken je Art, dann Listen mit Name, Nummer, Preis ab. Kein Kaufknopf je Zeile. „Weitere Teile“ klein halten, lieber eine eigene Art anlegen (Label in `TEILTYP_LABEL`).
6. **Häufige Fragen** (Abschnitt 4a): nach Kategorie, je Frage aufklappbar, mit Quelle und Verweisen auf Teile und Probleme. Dazu `FAQPage`-Daten.
7. **Achtung, Verwechslungsgefahr:** die Widersprüche, je Fall aufklappbar.
8. **Wie lange gibt es Ersatzteile?** kurzer Faktenkasten ohne Rechercheprotokoll.
9. **Quellen** eingeklappt am Ende.

Kein sichtbarer Link zum Ersatzteil-Shop des Herstellers (`hersteller_ersatzteil_url` bleibt nur als Datenfeld). Wer die Nummer hat, soll hier das Teil finden, nicht beim Hersteller.

## 4a. Häufige Fragen je Marke

Unser Mehrwert: die Fragen, die in Foren, bei gutefrage.net, Reddit und in Googles „Ähnliche Fragen“ immer wieder auftauchen, an einer Stelle und mit Beleg beantworten. Die Fragen stehen in `marke.fragen` der Marken-Datei:

```json
{"frage": "…?", "antwort": "2–4 Sätze", "kategorie": "reparatur", "quellen": ["url"], "teile": ["teil-slug"], "problem": "problem-slug"}
```

- **Kategorien** (Reihenfolge auf der Seite): `nummer`, `kompatibilitaet`, `reparatur`, `verfuegbarkeit`, `bezug`, `pflege`. Die Liste steht in `FRAGE_KATEGORIEN` (`src/lib/ersatzteile.ts`) und im Prüfskript.
- **Frage** so, wie Leute sie stellen („Mein Geberit-Spülkasten läuft ständig nach. Woran liegt das?“), mit Markennamen, weil so gesucht wird.
- **Antwort** nur mit Fakten aus einer Quelle: Herstellerseite, Anleitung, Händlerangabe oder mehrere übereinstimmende Fachforen-Antworten. Unsichere Antworten bleiben in der Recherche und kommen nicht auf die Seite. Kein Wegschicken zum Hersteller-Shop, wenn unsere Seite das Teil zeigt.
- **Nicht als Beleg:** Seiten mit generiertem Inhalt (z. B. hausbau-forum.de), Suchergebnis-Vorschauen.
- Das Prüfskript verlangt Fragezeichen, Antwort, Kategorie und Quelle und prüft, ob die verlinkten Teile und Probleme in der Datei stehen.

### Fragenkatalog je Produktkategorie

Jede neue Marke wird gegen diesen Katalog recherchiert. Was zur Marke passt und belegbar ist, kommt in `fragen`; marken-eigene Fragen aus den Foren kommen dazu. Grundlage: Recherche zu Blanco, Franke, Geberit, Grohe, hansgrohe und Ideal Standard (November 2026, je 14 Fragen).

**Küchenspüle** (Blanco, Franke)
- Wo steht die Artikelnummer der Spüle, und reicht der Modellname?
- Welches Siebkörbchen passt (Durchmesser, Zapfen für Drehknopf oder ohne, Baujahr)?
- Der Drehknopf hebt den Stopfen nicht mehr an. Was ist kaputt?
- Das Siebkörbchen ist zu, trotzdem läuft das Wasser ab. Was tun?
- Welcher Bowdenzug passt?
- Passen Siebkörbchen oder Garnituren anderer Hersteller oder Nachbauten?
- Gibt es für eine alte Spüle noch Teile?
- Wie pflege ich Granit- oder Edelstahlspülen?

**Küchenarmatur** (Blanco, Franke, Grohe, hansgrohe)
- Hochdruck oder Niederdruck: welche Kartusche?
- Die Armatur tropft. Kann ich die Kartusche selbst tauschen, und wie geht der Hebel ab?
- Der Auslauf lässt sich schwer schwenken oder ist am Auslauf undicht.
- Die Auszugsbrause zieht nicht zurück, der Brauseschlauch ist undicht: welcher Schlauch passt?
- Die Armatur wackelt auf der Spüle.
- Der Strahl spritzt: Strahlregler reinigen, welche Größe?

**Badarmatur und Thermostat** (Grohe, hansgrohe, Ideal Standard)
- Welche Kartusche passt (Durchmesser, Bauart), und wie finde ich die Bestellnummer?
- Die Kartusche ist neu, und es tropft immer noch.
- Hebel schwergängig oder knackt: fetten oder neue Kartusche?
- Der Thermostat wird nur lauwarm oder kalt.
- Muss der Thermostat nach dem Tausch neu eingestellt werden? Er funktioniert verkehrt herum.
- Die Kartusche oder Mutter sitzt fest.
- Original oder Nachbau?
- Ist eine undichte Kartusche nach zwei, drei Jahren ein Garantiefall?
- Gibt es für eine alte Unterputzarmatur noch Teile, oder lässt sie sich umrüsten?
- Womit entkalken, ohne Oberfläche oder Garantie zu gefährden?

**Spülkasten und WC** (Geberit, Ideal Standard)
- Welcher Spülkasten ist verbaut, und wo steht die Typ- oder Identnummer?
- Der Spülkasten läuft ständig nach.
- Der Spülkasten füllt sich nur langsam oder gar nicht.
- Welche Betätigungsplatte passt?
- Passt ein neues Füll- oder Spülventil in den alten Kasten?
- Gibt es für 20 bis 40 Jahre alte Kästen noch Teile oder Umbausets?
- Wie geht die Betätigungsplatte ab?
- Wie stelle ich die Spülmenge ein?
- Entkalken mit Essig oder Zitronensäure: ja oder nein?

**Für alle Marken**
- Wie lange gibt es Ersatzteile, wie lange gilt die Garantie?
- Wo kaufe ich Originalteile, verkauft der Hersteller direkt?

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
3. Die sechs Marken-Dateien sprachlich säubern (Beschreibung, Nummer-Hinweis, Garantie, Widersprüche). **Erledigt:** Lesertexte mit Absätzen, Grohe-Notizen zu Erkennungsmerkmalen geleert, Angaben aus Suchergebnis-Vorschauen als „(nicht im Original geprüft)“ gekennzeichnet. Prüfregel läuft jetzt mit `--streng`.
4. Dünne Serien auf `noindex`, Prüfregel ins CI. **Erledigt:** `scripts/pruefe-inhalte.py`, Workflow `inhalte-pruefen`. Ersatzteile vorerst nur als Hinweis, nach Schritt 3 mit `--streng`.
5. Danach erst neue Seiten (WC/Vorwand), gleich im neuen Aufbau.

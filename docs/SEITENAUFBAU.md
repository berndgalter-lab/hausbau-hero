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
10. **Keine Seiten je Farbe, Oberfläche oder „die besten X“.** „Waschtischarmatur schwarz“, „weiße Badewannenarmatur“ oder „die 7 besten …“ sind das alte Affiliate-Muster. Farbe und Oberfläche sind eine Frage in der Auswahlhilfe des Ratgebers, was zur Beschichtung wichtig ist, steht als Hinweis unter dieser Frage oder im Erklärteil. Alte Farbseiten leiten auf den Ratgeber weiter. Einen eigenen Ratgeber bekommt nur, was anders funktioniert oder anders eingebaut wird (Niederdruck, Unterputz, Thermostat).
11. **Kein Weg zum Hersteller-Shop, und jedes Teil kaufbar machen.** Quellen stehen im Text (Fragen, „Passt zu“, Widersprüche) nur als Name, klickbar sind sie nur im eingeklappten Quellen-Block unten. Ersatzteil-Shops und Ersatzteilsuchen der Hersteller (spares.…, …/ersatzteilsuche, blanco.de/ersatzteile, webshop.franke.com …) sind nirgends verlinkt, auch nicht dort (`istHerstellerShop` in `src/lib/affiliate.ts`); als Beleg taugen Datenblätter, Anleitungen und Kataloge. Für jedes neue Teil wird geprüft, ob es bei hagebau, Contorion, OTTO (EAN oder Herstellernummer im Feed) oder Amazon (geprüfte ASIN) zu kaufen ist; der PR nennt, wie viele Teile ohne Kaufmöglichkeit bleiben.

### Was nach Affiliate-Seite aussieht, gibt es nicht mehr

Im Code durchgesetzt, gilt für alle Seiten (alte Beiträge eingeschlossen):

- Amazon-Suchlinks (`amazon.de/s?k=…`) sind nie Kauflinks: `istAmazonSuche` in `src/lib/affiliate.ts`. Im Artikeltext wird der Link zu reinem Text, auf Teil-, Rechner- und Produktseiten entfällt er.
- Ein Produkt bekommt im Ratgeber nur einen Abschnitt, wenn es eine ASIN oder EAN hat. Gattungsbegriffe wie „Kondensatpumpe“ erscheinen nicht.
- Abschnitte „Unsere Empfehlungen“ alter Beiträge (Budget-Tipp, Premium-Tipp) blendet die Vorlage aus.
- Keine orangefarbenen Kaufknöpfe, keine Abzeichen, keine Emojis in Navigation und Überschriften. Kaufen ist ein Textlink mit Sternchen, erklärt einmal pro Seite.
- Navigation: „Bad-Ratgeber“ und „Armaturen-Datenblätter“ statt „Bad-Kaufberatung“ und „Armaturen-Vergleich“ (URLs bleiben).

## 2a. Richtung, Startseite und Bereiche

**Richtung (entschieden am 4. November 2026):** Reparatur und Ersatzteile rund ums Haus, nach dem Muster von womo-teile. Die Seite beantwortet zuerst „Was ist kaputt?“ und führt zum passenden Teil. Kaufberatung gibt es dort, wo sie an die Reparatur anschließt: wenn neu kaufen besser ist als reparieren. Bad und Sanitär sind der erste Bereich, weitere kommen einzeln dazu, wenn es Daten dafür gibt. Welche und in welcher Reihenfolge, steht in `BEREICHE-REIHENFOLGE.md`. Werkzeug, Farben, Kosten und Finanzen bleiben online, werden aber nicht verlinkt und nicht ausgebaut.

**URL-Schema:**

| URL | Inhalt |
|---|---|
| `/` | Startseite |
| `/bereich/<bereich>` | eine Stelle im Haus: Probleme, gesuchte Teile, Marken und Modelle, Ratgeber |
| `/ersatzteile`, `/ersatzteile/<marke>`, `/ersatzteile/<marke>/<serie>` | Teilesuche, Marken-Hub, Modell |
| `/teil/<teil>` | ein Ersatzteil |
| `/problem`, `/problem/<problem>` | Problemlöser |
| `/ratgeber`, `/ratgeber/<produkt>` | Ratgeber-Übersicht, Produkt-Ratgeber mit Auswahlhilfe |
| `/rechner/<rechner>` | Rechner |

**Startseite:** oben zwei Einstiege, „Teil oder Artikelnummer“ (Suche) und „Etwas funktioniert nicht“ (häufige Symptome, je mit Link auf den Bereich). Darunter „Wo ist das Problem?“ als Kacheln mit Strichzeichnung je Bereich, Marken, „Neu kaufen statt reparieren“ mit Produktbild aus den Partner-Feeds, Rechner und ein kurzer Absatz. Kein langer Text, keine Listen aller Beiträge.

**Bereiche** stehen in `src/lib/bereiche.ts`: Name, Satz für die Kachel, Einleitung, Produkttypen der Serien, Teilearten, Muster für die Problem-Slugs, Ratgeber-Slugs. Die Zeichnung steht in `src/components/BereichBild.tsx` (eine Linienstärke, `currentColor`, kein Foto). Ein Bereich ohne Modelle und ohne Probleme ist `noindex` und fehlt in der Sitemap.

**Hauptbereiche:** Die Bereiche sind nach der Hauskarte aus `docs/BEREICHE-REIHENFOLGE.md` gruppiert (`HAUPTBEREICHE` in `src/lib/bereiche.ts`: Bad & Küche, Wasser & Wärme, Fenster & Türen). Startseite (Bereiche, Marken) und `/ersatzteile` (Marken, Teilearten) zeigen diese Gruppen; eine Marke gehört über die Produkttypen ihrer Serien zu einem oder mehreren Hauptbereichen. Texte auf Startseite, Übersichten, Seitentitel und Vorschaubild sind bereichsneutral, Aufzählungen von Bereichen und Marken werden aus den Daten gebaut. Die Symptome auf der Startseite (`HAEUFIG`) decken jeden Hauptbereich ab; ein Symptom ohne Problemseite und ohne sichtbaren Bereich fällt weg.

**Neuen Bereich anlegen:** Zeile in `HAUPTBEREICHE`, dann erst die Daten (Marken-Datei mit Serien, Teilen, Problemen), dann den Eintrag in `BEREICHE` und eine Zeichnung. Keine Kachel ohne Inhalt dahinter.

**Neukauf-Hinweis:** Der Kasten „Lieber eine neue Armatur?“ (`src/components/Neukauf.tsx`) zeigt nur Neugeräte, die zum Gerät der Seite passen, nie irgendeins aus dem Ratgeber:
- **Serien- und Größenseiten** (und Teileseiten, deren Teil nur in einer Serie steckt): bis zu drei Neugeräte derselben Serie bzw. ihres Nachfolgers, beim Dachfenster dieselbe Größe. Die Modelle stehen je Marke in `data/neukauf/<marke>.json` (Serien-Slug → Liste mit Name, EAN, ggf. `amazon_asin`, `shop_link`, `hinweis`). Reihenfolge der Kaufzeile: Partnershop aus dem Feed mit Preis und Foto desselben Shops, sonst Amazon (ohne Foto), sonst ein Awin-Deeplink auf eine Shopseite ohne Feed-Eintrag (VELUX-Fenster bei hagebau, Größe im Shop wählen). Der Feed-Abgleich liest die EANs aus denselben Dateien. Steckt ein Teil in mehreren Serien, gibt es keinen Kasten.
- **Problemseiten** (kein bestimmtes Gerät): bis zu drei Modelle aus dem Ratgeber des Bereichs, wenn der Bereich einen `neukauf`-Eintrag hat.

Ohne kaufbares Modell gibt es keinen Kasten. Amazon-ASINs nur, wenn amazon.de/dp/<ASIN> genau dieses Modell zeigt und es lieferbar ist. Kauflinks bleiben Textzeilen (Platzierung `neukauf`, Awin-`clickref` `hh-neukauf`). Mit `nurBei` lässt sich der Hinweis auf passende Seiten begrenzen (Drückerplatte nicht bei „Spülkasten läuft nach“).

**Bilder:** Fotos nur von Produkten und Teilen, und nur aus den Partner-Feeds (`ean_angebote.bild_url`, `teile.bild_url`), ausgeliefert über die Bildoptimierung (`TeilBild`). Bereiche bekommen Zeichnungen, keine Fotos.

## 3. Seitentyp Produkt-Ratgeber (`/ratgeber/<produkt>`)

Vorbild ist womo-teile (`/ratgeber/dieselheizung`): Die Seite beantwortet „Welche passt zu mir?“ mit einer Auswahlhilfe, nicht mit einer Liste „Die besten …“. Im neuen Aufbau: `/ratgeber/waschtischarmatur`, `/ratgeber/niederdruckarmatur`, `/ratgeber/waschtischarmatur-mit-brause`, `/ratgeber/badewannenarmatur`, `/ratgeber/badewannenarmatur-unterputz`, `/ratgeber/duschthermostat`.

### URL-Schema

- **`/ratgeber/<produkt>`**, Produkt in der Einzahl, ohne Kategorie, ohne „-ratgeber“, ohne Jahreszahl: `/ratgeber/waschtischarmatur`, `/ratgeber/niederdruckarmatur`, `/ratgeber/waschtischarmatur-mit-brause` (eigene Produktart, weil Leser gezielt danach suchen), `/ratgeber/badewannenarmatur`, `/ratgeber/vorwandelement`, `/ratgeber/drueckerplatte` (Geberit), `/ratgeber/kleinhebeanlage`.
- Die alte URL `/<silo>/<slug>` leitet dauerhaft weiter (308, von Google wie 301 behandelt). Die Weiterleitung, die Sitemap, das Canonical und alle internen Links (`artikelUrl()`) ergeben sich aus dem Eintrag in `src/lib/produkt-ratgeber.ts`. Nichts davon wird von Hand gepflegt.
- Der Slug in `data/artikel` bleibt der alte (`waschtischarmatur-ratgeber`), damit der stündliche Import dieselbe Zeile in `seiten` trifft. Keine Datenbank-Änderung nötig.
- Reine Wissensbeiträge ohne Produktauswahl (Estrich, Wandfarbe …) bleiben unter `/<silo>/<slug>`.

### Reihenfolge auf der Seite

| # | Baustein | Woher |
|---|---|---|
| 1 | Überschrift als Frage | `titel` in der Meta-Datei |
| 2 | Einstieg, 2–3 Sätze mit Zahlen | Absätze vor der ersten `<h2>` |
| 3 | Prüfvermerk: Stand · „Datenblattvergleich, kein Test“ · Zahl der Quellen | `<p><em>Hinweis: … (Stand: …)</em></p>` und die Liste unter „Quellen“ |
| 3a | Modellkacheln mit Bild und Preis, darüber die erste Frage der Auswahlhilfe als Knöpfe (Klick wählt und springt zur Auswahlhilfe). Stehen vor „Kurz gesagt“, damit im ersten Bildschirm Produkte zu sehen sind | `ProduktKacheln`, `Schnellwahl` |
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

Alle Bad-Beiträge mit Modellen sind umgestellt (4. November 2026), `ModellFinder` gibt es nicht mehr. Die Auswahlhilfe nimmt auch WC-Produkte (`RatgeberDaten` in `src/lib/armatur-daten.ts`): Für sächliche Wörter gibt es `mehrzahlDativ` und `keine` („3 von 6 Elementen“, „Keines der 6 Elemente“).

Die technischen Daten stehen eingeklappt als „Alle Datenblattwerte nebeneinander“ unter dem Erklärteil, ohne Kaufzeile: Gekauft wird nur in der Auswahlhilfe. Die Werte bleiben im HTML, für Suchmaschinen und KI-Antworten.

### Seitentyp Wissensbeitrag (`/<silo>/<slug>`)

Beiträge ohne Produktauswahl (Vorwandelement-Höhe, TECE oder Geberit, Hebeanlage-Kosten, Komplettdusche) laufen in `src/app/[silo]/[slug]/page.tsx`: Frage, Einstieg, Prüfvermerk, „Kurz gesagt“, Erklärteil, „Wenn etwas kaputt geht“, häufige Fragen (aufklappbar, mit `FAQPage`-Daten), Quellen. Keine Produktkarten, keine Tabelle mit Kaufzeile; `<slug>.produkte.json` ist `[]`. Wo eine Kaufauswahl hilft, verlinkt der Text auf den Produkt-Ratgeber.

### Überschriften

- Jede `<h2>` benennt, was darunter steht, in Lesersprache. Gern als Frage, die Leser wirklich stellen („Passt das WC auf das Element?“). Keine Keyword-Ketten, keine Doppelpunkt-Zweiteiler zum Anpreisen, keine Jahreszahl.
- Was nur eine Teilfrage beantwortet („TECE oder Geberit?“, „Was kostet der Einbau?“, „Sigma oder Omega?“), ist eine häufige Frage mit Quelle, kein eigener Abschnitt.
- `<h3>` nur in „Häufige Fragen“ oder wenn ein Abschnitt wirklich Unterpunkte hat. Im Erklärteil lieber Absätze.
- Keine Listen „Fettes Wort: Erklärung“; das gehört in Sätze.

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

## 4b. Seitentyp Teileart (`/ersatzteile/<teilart>`)

Ein Teil, das in vielen Marken steckt, markenübergreifend erklärt: Eckventil, Perlator, Kartusche, Siphon, Ablaufgarnitur, Füllventil, WC-Sitz-Befestigung … Die Reihenfolge der Seiten steht in `docs/KEYWORDS-SANITAER.md`.

**Daten:** `data/teilarten/<slug>.json`, eingetragen in `src/lib/teilarten.ts` (Zeile `import <name> from "../../data/teilarten/<slug>.json";` und in die Liste `TEILARTEN`). Kein Import in die Datenbank, die Seite liest die Datei beim Bauen. Unsere Teile und Shop-Preise kommen weiter aus der Datenbank.

```json
{
  "slug": "eckventil", "name": "Eckventil", "mehrzahl": "Eckventile", "genus": "n",
  "titel": "Eckventil: welche Größe passt?", "seo_title": "…", "seo_description": "…",
  "kurz": "2–3 Sätze. Leerzeile = neuer Absatz.",
  "bereiche": ["wasseranschluss", "waschtisch"],
  "teiltypen": ["eckventil"],
  "erkennen": [{"titel": "Anschluss an der Wand messen", "text": "…"}],
  "groessen": {"titel": "Gängige Größen", "spalten": ["Anschluss", "Abgang", "Typisch für"], "zeilen": [["1/2\"", "3/8\"", "Waschtisch"]], "hinweis": "…"},
  "produkte": [{"name": "…", "hersteller": "…", "ean": "…", "amazon_asin": "…", "hinweis": "…"}],
  "probleme": ["wasserhahn-tropft"],
  "fragen": [{"frage": "…?", "antwort": "…", "kategorie": "kompatibilitaet", "quellen": ["url"], "teile": [], "problem": null}],
  "quellen": ["url"]
}
```

- **Reihenfolge auf der Seite:** Titel, kurze Antwort, Sprungmarken, passende Produkte als Kacheln mit Bild und Preis (die ersten acht, mit Foto zuerst, Rest aufklappbar; ohne Foto die Zeichnung der Teileart), „So findest du den/die/das passende …“ (Schritte), Größentabelle, unsere Originalteile nach Marke, Probleme, Fragen, Link zum Bereich, Quellen eingeklappt.
- **genus** (`m`/`f`/`n`) steuert „den passenden Perlator“, „die passende Kartusche“, „das passende Eckventil“.
- **marken** (optional, Marken-Slugs) begrenzt „nach Marke“ auf diese Marken. Nötig, wenn ein Teiltyp in mehreren Bereichen vorkommt: `dichtung` steckt in Armaturen und in Dachfenstern, die Seite `dachfenster-dichtung` zeigt nur VELUX und Roto.
- **Produkte:** nur mit EAN (für Bild und Preis aus `ean_angebote`) oder geprüfter ASIN der Produktseite. Ohne Preis und ohne ASIN erscheint ein Produkt nicht.
- **Fragen** nach den Regeln aus 4a: vorher in Foren recherchieren (gutefrage, haustechnikdialog, bauexpertenforum, Google „Ähnliche Fragen“), nur belegte Antworten. Rohdaten nach `data/recherche/fragen/<slug>.json`.
- **Kein Marken-Slug** darf wie eine Teileart heißen, die Route `/ersatzteile/[marke]` prüft zuerst die Teileart. Das Prüfskript lehnt Doppelungen ab.

## 4c. Seitentyp Problem für alle Marken (`/problem/<slug>`)

„Spülkasten läuft nach“, „Wasserhahn tropft“, „Spülung löst nicht aus“: markenübergreifend, mit Links zu den Varianten je Marke (Tabelle `probleme`). Die Markenvariante verlinkt zurück („Für alle Marken: …“).

**Daten:** `data/probleme/<slug>.json`, eingetragen in `src/lib/probleme-allgemein.ts` wie oben.

```json
{
  "slug": "spuelkasten-laeuft-nach", "titel": "Spülkasten läuft nach", "seo_title": "…", "seo_description": "…",
  "symptom": "1–2 Sätze, woran man es erkennt.", "bereich": "wc-spuelkasten",
  "ursachen": [{"ursache": "Dichtung am Spülventil verschlissen", "erklaerung": "2–4 Sätze", "haeufigkeit": "häufig", "teilart": "spuelkasten"}],
  "pruefen": ["Schritt 1", "Schritt 2"],
  "fachbetrieb_ab": "…",
  "marken_probleme": ["geberit-spuelkasten-laeuft-nach", "ideal-standard-spuelkasten-laeuft-nach"],
  "fragen": [ … wie oben … ],
  "quellen": ["url"]
}
```

- **Slug** nach dem häufigsten Suchwort („wasserhahn-tropft“, nicht „armatur-tropft“).
- **Reihenfolge:** Titel, Symptom, Kasten „Meist steckt eins dieser Teile dahinter“ (bis zu drei Teilearten der Ursachen mit Zeichnung und Häufigkeit), Ursachen nach Häufigkeit (mit Link zur Teileart), Prüfschritte, Grenze zum Installateur, Varianten nach Marke, Fragen, Neukauf-Hinweis, Bereich, Quellen.
- Die **Markenvariante** (Tabelle `probleme`) zeigt nach dem Symptom „Das brauchst du wahrscheinlich“: bis zu drei Originalteile der Ursachen mit Nummer und Preis. Ein Foto nur zusammen mit dem Angebot desselben Shops, sonst die Zeichnung (`zeichnungFuerTeiltyp` in `src/lib/teilarten.ts`). Dieselbe Zeichnung steht auf Teileseiten ohne Foto, beschriftet „Skizze, kein Foto des Teils“.
- Die Startseite verlinkt „Etwas funktioniert nicht“ auf diese Seiten, sobald es sie gibt (`HAEUFIG` in `src/app/page.tsx`), vorher auf den Bereich.

**Bereiche:** Ein Bereich erscheint erst, wenn er Inhalt hat (Modelle, Ratgeber, Teilearten oder Probleme). „Wasseranschluss & Leitung“ ist angelegt und wird sichtbar, sobald die erste Teileart (Eckventil) oder das erste Problem dort steht. Der Druckminderer gehört seit dem 5. November 2026 zu „Wasserfilter & Enthärtung“, weil er mit dem Filter in derselben Hauswasserstation sitzt (`KEYWORDS-WASSERFILTER.md`, Abschnitt 5).

## 5. Seitentyp Serie (`/ersatzteile/<marke>/<serie>`)

- **Indexiert nur mit Substanz:** mindestens zwei belegte Teile oder echte Erkennungsmerkmale. Sonst `noindex`, und die Serie erscheint nur als Karte auf der Marken-Seite. Betrifft heute bis zu 52 Seiten.
- „Ist das meine Serie?“ nur, wenn es Merkmale gibt. Sonst ein Satz, wie man es über die Nummer prüft.
- Teile-Tabelle mit Beleg in Worten („Grohe-Ersatzteilblatt 33 555 003“), Kaufzeile pro Teil.
- Verweis auf die passende Problem-Seite und, wo es sie gibt, auf den Ratgeber zum Neukauf.

## 5a. Seitentyp Größenseite (`/ersatzteile/<marke>/<code>`, Dachfenster)

Bei Dachfenstern hängt jedes Zubehör am Größencode auf dem Typenschild, nicht an einem Modell. Deshalb ist bei VELUX jede Fenstergröße eine Serie mit `produkttyp: "dachfenster"`: `/ersatzteile/velux/mk04`. Plan und Begründung in `KEYWORDS-DACHFENSTER.md`, Abschnitt 6. Die Vorlage ist `src/components/GroessenSeite.tsx`, die Serien-Route wählt sie über den Produkttyp.

**Titel:** „VELUX MK04: welches Rollo und welches Zubehör passt?“ (`groessenTitel`).

**Reihenfolge:** Maß und alle Namen der Größe, „Ist das dein Fenster?“ (Typenschild, Fenstertypen, Codes je Generation), je Zubehörart die Originale mit Typenbezeichnung, Generation und Kaufzeile, „Ältere Fenster“ (Tabelle der alten Codes, Satz zu Fenstern vor 1991), Nachbauten, Teile für jede Größe (Pflege, Dichtung, Bedienstange, Schalter), Fragen mit `FAQPage`-Daten, Bereich, Quellen.

**Daten:** in der Marken-Datei je Serie ein Feld `groesse`. Der Datenbank-Import kennt es nicht; `src/lib/groessen.ts` liest es beim Bauen aus der Datei. Serie, Teile, Zuordnungen und Shop-Preise kommen wie immer aus der Datenbank.

```json
{
  "slug": "mk04", "name": "VELUX MK04", "produkttyp": "dachfenster",
  "kennnummern": ["MK04", "M04", "304"],
  "erkennungsmerkmale": "Wo das Typenschild sitzt und wie der Code aussieht.",
  "beschreibung": "Maß und Fenstertypen in einem Satz.",
  "groesse": {
    "code": "MK04", "breite_cm": 78, "hoehe_cm": 98,
    "fenstertypen": ["GGL", "GGU", "GPL", "GPU"],
    "alte_codes": [{"code": "M04", "zeitraum": "2000 bis 2013", "hinweis": "Was an Zubehör für diese Generation passt."}],
    "vor_1991": "Satz zu Fenstern mit eigenen, abweichenden Größen.",
    "zubehoer": [{"art": "rollo", "typen": ["DKL MK04", "RFL MK04"], "hinweis": "…"}],
    "nachbauten": [{"name": "…", "hersteller": "…", "amazon_asin": "…", "hinweis": "Nachbau, kein VELUX-Original."}],
    "fragen": [{"frage": "…?", "antwort": "…", "kategorie": "kompatibilitaet", "quellen": ["url"], "teile": [], "problem": null}]
  }
}
```

- **Slug** ist der aktuelle Code in Kleinbuchstaben, `kennnummern[0]` der Code selbst (die Code-Tabelle der Marke verlinkt darüber), danach die alten Codes, damit die Teilesuche sie findet.
- **Alte Codes** (M04, 304) sind Abschnitte und Suchbegriffe, keine eigenen URLs. Kein Code von vor 1991 wird als gleich groß ausgegeben, wenn das Maß abweicht.
- **Zubehör je Art:** `art` ist eine der `GROESSEN_ARTEN` (`rollo`, `plissee`, `hitzeschutz`, `insektenschutz`, `rollladen`). Die Teile selbst hängen über `zuordnungen` an der Größe; der `hinweis` der Zuordnung sagt, für welches Typenschild das Teil gedacht ist („Fenster mit M04 (2000 bis 2013)“). Ein Teil kann an mehreren Größen hängen (Markise MHL MK00 an MK04, MK06, MK08).
- **Nachbauten** nur mit geprüfter ASIN und dem Wort „Nachbau“ im Hinweis.
- **Fragen** nach den Regeln aus 4a, nur zu dieser Größe. Allgemeine Fragen stehen auf der Marken-Seite.

**Index-Regel:** Eine Größenseite wird nur indexiert, wenn mindestens drei Zubehörarten (`GROESSE_MIN_ARTEN`) ein zugeordnetes Teil haben, das ein Partnershop mit Preis führt oder das eine geprüfte ASIN hat (`groesseIstDuenn`). Sonst `noindex`, und die Sitemap lässt sie weg. Pflege-Sets und Schalter zählen nicht, sie hängen nicht an der Größe.

**Tabellen auf der Marken-Seite:** `marke.tabellen` (Größencodes je Generation, Fenstertypen, Zubehör-Typen, bei Roto Größen alt/neu und Baureihen), Format `{"id", "titel", "spalten", "zeilen", "hinweis"}`. Sie stehen unter „So findest du die richtige Nummer“. Für Marken ohne Größenseiten (Roto, später FAKRO) ersetzt die Tabelle die Größenseiten.

**Neue Marke mit Größenseiten oder Tabellen:** Datei in `src/lib/groessen.ts` importieren und in `DATEIEN` eintragen.

## 6. Prüfregel für die Daten

Ein Skript (`scripts/pruefe-inhalte.py`, läuft im CI vor dem Merge) lehnt ab:

- Notiz-Sprache in sichtbaren Feldern: „recherchiert“, „gefunden“, „belegt keine“, „Suchauszug“, „Marketingaussage“.
- Jahreszahl oder „X Modelle“ in `titel` und `seo_title`.
- `ist_testsieger` / `ist_preistipp` in Produktdateien.
- Teile ohne ASIN und ohne Partnershop, die trotzdem einen Kaufknopf bekämen. (Noch nicht im Skript: Die Partnershop-Angebote liegen nur in der Datenbank.)
- Größenseiten (5a): fehlende Pflichtfelder in `groesse`, Slug ungleich Code, alte Codes nicht in `kennnummern`, unbekannte Zubehörart, Nachbau ohne ASIN oder ohne Hinweis „Nachbau“, ungültige ASIN oder EAN, Tabellen mit falscher Spaltenzahl. Hat eine Größe weniger als drei Zubehörarten mit EAN oder ASIN, meldet das Skript einen Hinweis.

## 7. Reihenfolge

1. Vorlagen umbauen: Ratgeber, Marke, Serie. Prüfvermerk und Methodenkasten als eigene Bausteine. **Erledigt** (Branch `feat/seitenaufbau`), dünne Serien sind schon `noindex` und fehlen in der Sitemap.
2. Die vier Ratgeber umstellen: Titel, Produktfelder, kurze Antwort. Der Fließtext bleibt größtenteils. **Erledigt:** Titel als Frage, Abzeichen-Felder entfernt, „Passt für“ konkret, Spalte „Preisklasse“ entfernt, Niederdruck-Beitrag mit Quellenliste.
3. Die sechs Marken-Dateien sprachlich säubern (Beschreibung, Nummer-Hinweis, Garantie, Widersprüche). **Erledigt:** Lesertexte mit Absätzen, Grohe-Notizen zu Erkennungsmerkmalen geleert, Angaben aus Suchergebnis-Vorschauen als „(nicht im Original geprüft)“ gekennzeichnet. Prüfregel läuft jetzt mit `--streng`.
4. Dünne Serien auf `noindex`, Prüfregel ins CI. **Erledigt:** `scripts/pruefe-inhalte.py`, Workflow `inhalte-pruefen`. Ersatzteile vorerst nur als Hinweis, nach Schritt 3 mit `--streng`.
5. Danach erst neue Seiten (WC/Vorwand), gleich im neuen Aufbau.

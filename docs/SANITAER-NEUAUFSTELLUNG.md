# Sanitär-Bereich: Bestandsaufnahme und Neuaufstellung

Stand: 4. November 2026. Ergänzt `KONZEPT-BAD-SANITAER.md` (Positionierung, Seitentypen) um die Bewertung jedes einzelnen Beitrags, die Keyword-Karte und die Lösung für Produktbilder.

Datengrundlage:
- Search Console, Export März bis Juni 2026 (www- und Nicht-www-Adressen zusammengezählt). Die Spalten `klicks`/`impressionen` in `seiten` sind leer und taugen nicht als Quelle.
- Gut 390 Google-Suchvorschläge zu 31 Startbegriffen (2.386 Vorschläge, in 81 Cluster sortiert). Suchvolumen gibt es nicht. Die Vorschläge zeigen nur, wie breit ein Thema gefragt wird.
- Awin-Konto 930939 über die API abgefragt: Programme, Feeds und Kennzahlen.

## Kurzfassung

- Von den 9 aktiven Bad-Beiträgen bleiben 8. `bad-sanieren-kosten` fliegt raus.
- Die 6 Beiträge vom März 2026 sind dünn: Preisspannen ohne Quelle, Amazon-Suchlinks statt Produkten, Links auf gelöschte Rechner, teils falsche Angaben. Alle sechs werden neu geschrieben, Bereich für Bereich.
- Armaturen kommen zuerst. Die beiden alten Armaturen-Beiträge (Waschtisch, Badewanne) sind in diesem Branch neu geschrieben. Dazu kommt ein Armaturen-Vergleich unter `/vergleich/armaturen`.
- Für Produktbilder braucht es keine neue Anmeldung. hagebau, Contorion und OTTO sind bei Awin schon freigeschaltet. Ihre Feeds enthalten rund 9.000 Armaturen mit Bild, Preis und EAN. Bisher kam nichts davon auf die Seite, weil in GitHub das Secret `AWIN_FEED_URL` fehlt und der Feed-Abgleich deshalb nie gelaufen ist.

## 1. Die 9 aktiven Bad-Beiträge

| Seite | GSC Mär–Jun (Klicks / Impr. / Pos.) | Zustand | Entscheidung |
|---|---|---|---|
| `geberit-sigma-drueckerplatte` | 57 / 2.236 / 7 | Beste Seite. Modelltabelle mit ungeprüften Angaben (Sigma70 „nur 2 mm dünn“, „meistverkaufte Drückerplatte Deutschlands“), Amazon-Suchlinks. Die meistgesuchte Frage „welche Drückerplatte passt auf Geberit Sigma“ (47 Impr., Pos. 11) beantwortet sie nicht. | **Behalten, neu schreiben** (Bereich WC). Schwerpunkt Kompatibilität Sigma/Omega/Delta je Spülkasten, Unterschied Sigma20/30 (29 Impr., Pos. 6), echte ASINs. |
| `vorwandelement-wc` | 48 / 7.003 / 17 | Solide Grundlagen, aber ein Allround-Text. Rund 1.170 Impressionen für „Vorwandelement WC Höhe“ in allen Schreibweisen landen auf Pos. 45–50. | **Behalten, neu schreiben.** Dazu neue Seite `vorwandelement-wc-hoehe` und `tece-vs-geberit` (siehe Abschnitt 2). |
| `komplettdusche-ratgeber` | 22 / 1.477 / 8 | Rankt gut („komplettdusche“ Pos. 3, „fertigdusche“ Pos. 3, „komplettdusche nachteile“ Pos. 8). Produkte sind Platzhalter („Komplettdusche 90 × 90 cm“). | **Behalten, überarbeiten.** Echte Modelle, Vor- und Nachteile mit Belegen, Abschnitt Duschtempel (73 Impr., Pos. 29). |
| `badewannenarmatur-ratgeber` | 27 / 1.993 / 17 (inkl. Altseiten) | Allgemeiner Text, drei Amazon-Suchlinks. „badewannenarmatur testsieger/test“ steht auf Pos. 9–10, „aufputz/unterputz“ auf Pos. 40–50. | **Neu geschrieben in diesem Branch:** Kaufberatung mit geprüften Modellen, Thermostat oder Einhebel, Aufputz-Tausch. |
| `kleinhebeanlage` | 19 / 1.951 / 21–30 (inkl. Altseiten) | Fachlich brauchbar, aber „kleinhebeanlage“ selbst steht auf Pos. 63. Produkte teils generisch („Kondensatpumpe“). | **Behalten, neu schreiben** als Kaufberatung (Sanibroyeur, Sololift, Jung/Wilo). Kostenfragen eigene Seite `hebeanlage-kosten` (218 Impr., Pos. 20–43). |
| `waschtischarmatur-ratgeber` | 6 / 626 / 12 | Typenliste mit Preisspannen ohne Quelle, kaputte Zeichen („30“150 €“), Links auf gelöschte Rechner. Altseiten mit Klicks leiten hierher (schwarz-matt, hansa, die-7-besten, wasserfall …). | **Neu geschrieben in diesem Branch** als Einstieg für alle Waschtischarmaturen mit geprüften Modellen. |
| `bad-sanieren-kosten` | 0 / 27 / 64 | Kostenthema, das laut Konzept gegen Banken und Portale nicht zu gewinnen ist. Verlinkt auf fünf gelöschte Rechner. | **Entfernen** (Status `entfernt` wie die Finanzseiten, die Seite liefert dann 404). Kein passendes Weiterleitungsziel. |
| `waschtischarmatur-mit-brause` | neu (11/2026) | Gut, mit Quellen. | Behalten. Neu: EAN, Herstellernummer und technische Daten je Produkt, damit Bilder, Shop-Preise und Vergleich funktionieren. |
| `niederdruckarmatur-untertischspeicher` | neu (11/2026) | Gut, mit Quellen. | Behalten, ergänzt wie oben. Zwei bisher ungeprüfte ASINs sind jetzt bestätigt (Modellnummer auf der Amazon-Seite): B008CEOCQE (GROHE 32955000), B003WF1NHY (hansgrohe 31804000). |

Kaputte Links in den alten Beiträgen: `/rechner/handwerkerkosten`, `/rechner/trockenbau`, `/rechner/foerdermittel`, `/rechner/eigenleistung`, `/rechner/gewerk-reihenfolge`. Es gibt nur noch die Rechner `sanitaer`, `fliesen` und `estrich`. Die Links verschwinden mit dem Neuschreiben.

Von den 43 umgeleiteten Alt-Seiten im Bad-Silo bleiben alle Weiterleitungen. Drei davon werden wieder eigene Seiten, sobald sie geschrieben sind: `waschtischarmatur-schwarz`, `waschtischarmatur-hoher-auslauf`, `badewannenarmatur-unterputz`. Der Artikel-Import setzt eine umgeleitete Seite dafür wieder auf aktiv (Migration `20261105_kaufberatung_angebote.sql`).

## 2. Keyword-Karte: was neu dazukommt

Belege in Klammern: GSC-Impressionen und Position; „nur Suggest“ heißt, die Seite hatte dafür noch keine Impressionen.

### Armaturen (zuerst)

| Ziel-URL | Suchbegriffe | Beleg | Status |
|---|---|---|---|
| `/bad/waschtischarmatur-ratgeber` | beste waschtischarmatur, waschtischarmatur test, wasserfall armatur nachteile | 109 Impr., Pos. 10–17 | in diesem Branch |
| `/bad/badewannenarmatur-ratgeber` | badewannenarmatur testsieger, badewannenarmatur test, beste badewannenarmatur, aufputz | 169 Impr., Pos. 9–15 | in diesem Branch |
| `/vergleich/armaturen` | badarmaturen test, test badarmaturen, schwarze badarmaturen testsieger | 177 Impr., Pos. 12–36 | in diesem Branch |
| `/bad/badewannenarmatur-unterputz` | unterputz armatur badewanne, badewannenarmatur unterputz, wannenarmatur unterputz | 220 Impr., Pos. 19–54 | als Nächstes |
| `/bad/thermostat-dusche` | thermostat dusche ja oder nein, dusche thermostat oder einhebelmischer, aufputz thermostat | 87 Begriffe, nur Suggest | als Nächstes |
| `/bad/waschtischarmatur-schwarz` | waschtischarmatur schwarz, armatur schwarz erfahrungen, badewannenarmatur schwarz | 11 Impr. + Suggest-Top-10 | als Nächstes |
| `/bad/waschtischarmatur-hoher-auslauf` | waschtischarmatur hoch, armatur aufsatzwaschbecken | Suggest-Top-10, Altseite hatte 25 Impr. | danach |
| `/bad/duschsystem-aufputz` | duschsystem aufputz, regendusche nachrüsten | 74 Begriffe, nur Suggest | danach |
| `/bad/kuechenarmatur-ausziehbar` | küchenarmatur ausziehbar, küchenarmatur mit brause | 32 Begriffe, nur Suggest | danach |
| `/problem/armatur-wechseln` | armatur wechseln, badewannenarmatur wechseln kosten, küchenarmatur wechseln | größter Cluster (175 Begriffe), 21 Impr. Pos. 11 | danach (Problemlöser) |
| `/ersatzteile/strahlregler`, `/ersatzteile/kartusche`, `/ersatzteile/eckventil` | strahlregler m22 m24, kartusche armatur maße tabelle, eckventil welche größe | 51 / 38 / 107 Begriffe, nur Suggest | Teiltyp-Seiten laut Konzept Phase C |

### Restlicher Sanitärbereich (danach, in dieser Reihenfolge)

1. **WC/Vorwand (erledigt, Branch `feat/wc-vorwand`):** `geberit-sigma-drueckerplatte` neu (Kompatibilität je Spülkasten, Sigma-Modelle, Sigma30 = Sigma20 eckig seit 2025, Friatec), `vorwandelement-wc` neu (6 Elemente von Geberit, TECE, GROHE, Viega, Komplettset, Kosten), neu `vorwandelement-wc-hoehe` (1.167 Impr., Pos. 45) und `tece-vs-geberit` (234 Impr., Pos. 8–11). Die Datentabelle kennt jetzt auch Drückerplatten und Vorwandelemente. Offen: Für Geberit Duofix, DuofixBasic, TECEprofil und Viega Prevista führt keiner der drei Partnershops die EAN, dort gibt es nur den Amazon-Suchlink; die meisten Amazon-ASINs dieses Bereichs sind noch nicht über die Modellnummer bestätigt (Amazon hat den Abgleich gesperrt).
2. **Hebeanlagen (erledigt, Branch `feat/hebeanlagen`):** `kleinhebeanlage` neu (Einsatzgrenzen nach DIN EN 12050-3, Einbau, Wartung, Kondensat; 6 Geräte von Grundfos und SFA), neu `hebeanlage-kosten` (Listen- und Shoppreise, Einbau, Schacht, Wartung, Strom, Rückstauverschluss, Förderung; 218 Impr., Pos. 20–43). Offen: SFA und Kessel führt keiner der Partnershops; Amazon-ASINs dieses Bereichs sind nicht bestätigt (Amazon-Sperre), dort stehen Suchlinks.
3. **Dusche:** `komplettdusche-ratgeber` überarbeiten.
4. **Problemlöser markenübergreifend:** `spuelkasten-laeuft-nach`, `thermostat-wird-nicht-warm`, `armatur-tropft` (die Marken-Varianten gibt es schon).

Nicht weiterverfolgt: Bad-Sanierungskosten, Spiegelschränke, allgemeine Anleitungen wie „Dusche abdichten“ (siehe Konzept, Abschnitt 1).

## 3. Produktbilder und Partnerprogramme

### Was es schon gibt

Im Awin-Konto (Publisher 930939) sind für Bad & Sanitär drei Programme aktiv:

| Shop | Feed | Produkte | Armaturen (mit Bild und EAN) |
|---|---|---|---|
| hagebau.de (11513) | Default | 96.371 | 251 |
| Contorion (14578) | Default | 585.742 | 8.437 |
| OTTO (14336) | Wohnen, Spielzeug und Baumarkt | 321.530 | 351 |

Die Feeds haben für Armaturen keine Herstellernummer, aber immer eine EAN. Darüber finden sich fast alle Modelle der Kaufberatungen, zum Beispiel GROHE Grohtherm 800 (Contorion 175,99 €), Eurosmart Cosmopolitan Niederdruck (Contorion 141,99 €) und Schütte CORNWALL (hagebau 74,99 €, OTTO 57,23 €), Stand Feed 4.11.2026.

Awin erlaubt angenommenen Publishern, die Bilder aus dem Feed zu verwenden (https://success.awin.com/s/article/Can-I-use-any-images-from-the-advertiser-s-website). Bild und Shop-Angebot stehen deshalb immer zusammen, mit „Bild: <Shop>“ darunter.

### Warum bisher keine Bilder zu sehen sind

Der Workflow `partner-feeds` bricht ohne das Secret `AWIN_FEED_URL` mit einer Warnung ab. Es gibt keinen Branch `feed-daten`, `intern.feed_importe` ist leer, die Tabelle `angebote` hat 0 Zeilen.

### Was dieser Branch ändert

- Neue Tabelle `ean_angebote` (Shop-Angebot je EAN), `produkte` bekommt `ean` und `hersteller_nr`. Die Angebote hängen an der EAN, weil der Artikel-Import die Produkte bei jeder Änderung neu anlegt.
- `awin_feed.py` gleicht zusätzlich die EANs der Kaufberatungs-Produkte ab und nimmt OTTO dazu (nur der Feed „Wohnen, Spielzeug und Baumarkt“).
- Produktkarten zeigen Bild, Shop-Preise (nur bei vorrätiger Ware, mit Zeitstempel) und darunter weiter den Amazon-Button.
- Jede Kaufberatung bekommt die Tabelle „Technische Daten im Vergleich“ aus `produkte.technische_daten`.
- `/vergleich/armaturen`: alle Armaturen aller Kaufberatungen, filterbar nach Einsatz, Druck und Bauart, bis zu vier nebeneinander.
- Neu geschrieben: `badewannenarmatur-ratgeber` (6 Aufputz-Modelle, Thermostat oder Einhebel, Unterputz-Fertigsets) und `waschtischarmatur-ratgeber` (6 Modelle, Größen, Ablauf, Oberflächen, Anschluss). Alle 12 Produkte mit EAN, die über Herstellernummer und EAN in derselben Quelle bestätigt ist. Für 11 gibt es eine ASIN mit passender Modellnummer auf der Amazon-Seite. Die GROHE Eurosmart 33265003 hat kein sauberes Amazon-Angebot, dort führt der Button zum günstigsten Partnershop.
- Im Probelauf mit den Feeds vom 4.11.2026 haben alle 20 Kaufberatungs-Produkte mit EAN mindestens ein Shop-Angebot mit Bild. Fünf ältere Produkte ohne bestätigte EAN (hansgrohe Finoris 230, Logis 70 ND, Focus M41 ND, Hansa HANSARONDA, Kludi BOZZ) zeigen weiter nur den Amazon-Button.

### Amazon

Amazon-Bilder gehen vorerst nicht. Die Product Advertising API 5.0 ist abgeschaltet. Die Creators API, ihr Nachfolger, verlangt mindestens 10 qualifizierte Verkäufe in den letzten 30 Tagen (https://partnernet.amazon.de/creatorsapi/docs/en-us/introduction). Bilder von der Produktseite zu kopieren, deckt die Lizenz nicht. Herstellerbilder scheiden auch aus: hansgrohe erlaubt sie nur mit schriftlicher Zustimmung (https://www.hansgrohe-group.com/de/rechtliche-hinweise/gewerbliche-schutzrechte).

### Weitere Programme

| Programm | Stand im Awin-Konto | Einschätzung |
|---|---|---|
| Megabad (Awin 102421) | verfügbar, nicht beantragt | Größtes Fachsortiment (rund 500.000 Artikel, viele Ersatzteile), beste Kennzahlen der Kandidaten (Bestätigungsquote 97 %). Aber laut Awin-Profil nur 0,5 % auf GROHE, hansgrohe, Geberit, Villeroy & Boch und Duravit, 2 % auf Ideal Standard und den Rest. Für Ersatzteile und Bilder gut, für Markenarmaturen schwach. |
| Emero (Awin 22983) | verfügbar, nicht beantragt | 7 %, 30 Tage Cookie, Schwerpunkt Armaturen. Bestätigungsquote laut Awin nur 37 %, also viele Stornos. |
| Reuter (Awin 22964) | **abgelehnt** | 7 % auf alle Marken, sehr tiefes Sortiment. Nach dem Umbau mit Verweis auf die neuen Kaufberatungen erneut anfragen. |
| OBI (Awin 9326) | **abgelehnt** | Feed mit rund 800.000 Produkten, 7 % für Content-Partner. Später erneut anfragen. |
| toom (Awin 16017) | **gesperrt** | Grund im Awin-Konto nachsehen. |
| ManoMano (Awin 17961) | verfügbar | Marktplatz, nur 10 Tage Cookie. Nachrangig. |
| Sanitino | VIVnetworks, nicht Awin | 5–9 %, XML-Feed. Zweites Netzwerk, erst wenn Awin ausgeschöpft ist. |
| badshop.de | ADCELL | 5 %, Produkt-CSV. Nachrangig. |

Empfehlung: zuerst das Secret setzen (siehe unten), dann Megabad und Emero beantragen. Reuter und OBI erneut anfragen, wenn die Armaturen- und WC-Seiten online sind. Die Provisionssätze stammen aus den öffentlichen Awin-Profilen und sollten vor dem Antrag im Konto bestätigt werden.

## 4. Was Bernd tun muss

1. **Migration einspielen:** `supabase/migrations/20261105_kaufberatung_angebote.sql` (rein additiv: neue Spalten, neue Tabelle, zwei erweiterte Import-Funktionen). Vor dem Merge, sonst findet der neue Code die Spalten nicht.
2. **GitHub-Secret setzen:** Settings → Secrets and variables → Actions → `AWIN_FEED_URL` (dieselbe Feed-URL wie bei womo-teile, liegt lokal in `~/.config/womo-teile/awin.json`). Dann Actions → partner-feeds → „Run workflow“ als Probelauf, Ergebnis im Branch `feed-probe` prüfen, danach ohne Probe laufen lassen.
3. **`bad-sanieren-kosten` entfernen:** `update seiten set status = 'entfernt' where slug = 'bad-sanieren-kosten';`
4. **Megabad und Emero bei Awin beantragen.**
5. **Eigene Fotos**, sobald möglich (eingebaute Armatur, Typenschild, altes Teil). Sie sind laut Konzept der wichtigste Unterschied zu automatisch erzeugten Testseiten.

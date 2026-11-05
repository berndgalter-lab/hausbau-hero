# Stromerzeuger und Notstrom: lohnt sich ein Bereich?

Stand: 5. November 2026. Anlass: Die Search Console zeigt hausbau-hero.de weiter für Suchbegriffe rund um „Stromerzeuger“, auf der Seite gibt es dazu nichts mehr. Geprüft nach `BEREICHE-REIHENFOLGE.md` Abschnitt 2 und 4, Aufbau wie `KEYWORDS-WASSERFILTER.md`. Gebaut ist nichts, an der Datenbank ist nichts geändert.

## Kurzfassung

- **Empfehlung: kein Bereich „Strom & Notstrom“. Die alten URLs bleiben bei 410.** Höchstens später ein einzelner Ratgeber „Notstrom fürs Haus“ (Priorität C), und nur dann leiten drei alte URLs dorthin weiter.
- **Der alte Traffic kam aus Kauflisten in der Energiekrise.** Spitze im September 2022 mit 2.420 Klicks für die ganze Seite, davon allein `stromerzeuger-diesel` 309, `makita-stromerzeuger` 221, `scheppach-stromerzeuger` 220. Die Suchbegriffe hießen „profi stromerzeuger diesel“, „makita stromerzeuger“, „notstromaggregat benzin makita“. Im November 2022 kam das Google-Update, danach lief nur noch `stromerzeuger-diesel` mit 18 Klicks im Monat, im Januar 2026 mit +12. Das ist das Muster „die 13 besten …“, das `SEITENAUFBAU.md` 2.10 ausschließt.
- **Reparaturfragen gibt es, Teile in den Partnershops nicht.** 249 Suchvorschläge mit Ersatzteil- oder Problemabsicht (Vergaser, Öl, „springt nicht an“, „<Marke> ersatzteile“). hagebau, Contorion und OTTO führen aber keine Stromerzeuger-Ersatzteile, nur Geräte. Bei Amazon gibt es fast nur Nachbau-Vergaser und Filter-Kits von No-Name-Marken mit 4 bis 324 Bewertungen und einem Warenkorb von 10–30 €.
- **Ein Stromerzeuger ist ein Gerät, kein Teil des Hauses.** Dieselbe Begründung wie beim Hochdruckreiniger (`BEREICHE-REIHENFOLGE.md` Abschnitt 5). Wo er das Haus berührt, also bei der Einspeisung über Netzumschalter oder Einspeisesteckdose, ist es Arbeit für die Elektrofachkraft (DIN VDE 0100-551). Das schließt Kriterium 2 aus.
- **Search-Console-Zahlen von heute fehlen.** Die Monatsberichte im Gmail zeigen nur die drei stärksten Seiten und Suchbegriffe. Seit 2023 taucht dort kein Stromerzeuger-Begriff mehr auf, außer im Januar 2026. Was Bernd heute sieht, sind vermutlich Impressionen der alten URLs, die Google noch nicht verworfen hat (Abschnitt 6).

## Datengrundlage

- **Search Console:** Monatsberichte im Gmail (`sc-noreply@google.com`) von August 2022 bis Oktober 2026, dazu `UMBAUPLAN.md` Abschnitt 1 und 2. Kein Export, keine Suchbegriffe außerhalb der Top 3.
- **Supabase** (`jyxhjcupgazugjglpeum`, nur gelesen): Tabelle `redirects` und `seiten`, gesucht nach „strom“, „generator“, „aggregat“, „notstrom“.
- **Git-Historie:** `data/artikel/stromerzeuger-vergleich.*` bis Commit `7a822e7` (Altbestand entfernt, 4.11.2026).
- **Live-Status** der alten URLs mit `curl` am 5.11.2026.
- **Google-Suchvorschläge**, abgerufen am 5.11.2026 (hl=de, gl=de): 20 Startbegriffe mit a–z und acht Zusätzen („passt“, „welche“, „welcher“, „welches“, „ersatzteile“, „springt nicht an“, „wechseln“, „für“), 13 Marken mit sieben Zusätzen („stromerzeuger ersatzteile“, „… zündkerze“, „… vergaser“, „… öl“, „… springt nicht an“ …). 852 Abfragen, 2.954 verschiedene Vorschläge.
- **Awin-Feeds** hagebau, Contorion und OTTO (Download vom 4.11.2026, `.cache/awin-probe/*-voll.csv.gz` im Haupt-Checkout), gezählt nach Produktname wie in `KEYWORDS-WASSERFILTER.md`.
- **Amazon:** vier Stichproben im eingebauten Browser (Zündkerze und Öl für Honda EU22i, Vergaser für Einhell, Netzumschalter).

Rohdaten liegen außerhalb des Repos im Notizordner dieser Sitzungsgruppe, Unterordner `keywords-stromerzeuger` (`suggest.json`, `absicht.json`, Skripte).

## 1. Was früher rankte und was die URLs heute liefern

23 alte WordPress-URLs, alle in `redirects` mit Status 410, alle in `seiten` mit Status `entfernt`. Dazu der neuere Beitrag `stromerzeuger-vergleich` („Inverter oder herkömmlich?“, November 2026, Quellen von Honda, Einhell, Güde, BBK, 32. BImSchV, VDE), am 4.11.2026 mit dem übrigen Altbestand entfernt.

| URL | Alter Titel | Belegte Klicks (Monatsbericht) | Heute |
|---|---|---|---|
| `/stromerzeuger-diesel/` | Die 13 besten Diesel-Stromerzeuger | 122 (08/2022), 309 (09/2022), 242 (10/2022), 18 (11/2022); +12 im 01/2026 | 410 (mit Slash erst 308, dann 410) |
| `/makita-stromerzeuger/` | Die besten Stromerzeuger von Makita | 221 (09/2022) | 410 |
| `/scheppach-stromerzeuger/` | Die 5 besten Stromerzeuger von Scheppach | 220 (09/2022), 149 (10/2022) | 410 |
| `/guede-stromerzeuger/`, `/einhell-stromerzeuger/` | Die 11 / 9 besten … | Wachstum +4 / +2 im 12/2022 | 410 |
| `/stromerzeuger/` | Die 13 besten Stromerzeuger | nicht in den Top 3 | **404 statt 410** (siehe unten) |
| `/stromerzeuger-benzin/`, `/honda-…`, `/pramac-…`, `/sdmo-…`, `/denqbar-…`, `/matrix-…`, `/kipor-…`, `/scheppach-inverter-stromerzeuger-sg-1400i/`, `/stromerzeuger-hausbau/`, `/stromverteiler/` | Listen „Die N besten …“ | nicht in den Top 3 | 410 |
| `/ecoflow…`, `/bluetti…` (8 URLs) | Powerstation-Listen | nicht in den Top 3 | 410 |
| `/stromerzeuger/stromerzeuger-vergleich` | Inverter oder herkömmlich? | in den Berichten nie unter den Top 3 | 404 (Seite `entfernt`) |

Suchbegriffe mit Klicks laut Berichten: „profi stromerzeuger diesel“ (15 / 42 / 25 / 7 von 08 bis 11/2022), „makita stromerzeuger“ (37 / 20), „notstromaggregat benzin makita“ (+27), „notstromaggregat diesel makita“ (+10), „denqbar 2100 vs 2000“ (+6), „profi notstromaggregat benzin“ (2 im 12/2022), „einhell inverter stromerzeuger“, „diesel stromerzeuger“ (1 im 11/2024), „stromerzeuger diesel testsieger“ (+3 im 01/2026). Alles Kaufsuchen nach Geräten, keine einzige Reparaturfrage.

`UMBAUPLAN.md` schätzt für den Stromerzeuger-Bereich rund 1.600 Klicks, fast alle aus 2022. Was diese Klicks verdient haben, steht nicht im Gmail. Die Amazon-Abrechnung vom April 2026 weist 8,40 € für das ganze Partnerkonto aus.

**Nebenbefund `/stromerzeuger`:** Die Middleware lässt `/stromerzeuger` als alten Silo-Pfad durch (`EXCLUDED_PATHS` in `src/middleware.ts`), deshalb greift der 410 aus `redirects` nicht und die Seite `[silo]` liefert 404. Für Google ist das fast dasselbe, 410 wird nur etwas schneller verworfen. Mit diesem PR ist `/stromerzeuger` aus `EXCLUDED_PATHS` entfernt. Die anderen alten Silos (`/farben`, `/werkzeuge`, `/garten`, `/maschinen`) haben keinen Eintrag in `redirects` und liefern weiter 404.

## 2. Nachfrage

Spalten: **Vorschläge mit Absicht** = Suchvorschläge, die eine Ersatzteil-, Problem- oder Auswahlfrage enthalten. Gebrauchtkauf, Fahrrad, Windrad und Ähnliches sind herausgerechnet.

### Reparatur und Ersatzteile (249 Vorschläge)

| Frage | Vorschläge | Beispiele |
|---|---|---|
| „<Marke/Gerät> ersatzteile“ | 70 | einhell stromerzeuger kcst 2502 ersatzteile, güde stromerzeuger gse 3700 rs ersatzteile, honda stromerzeuger eu 22i ersatzteile, scheppach stromerzeuger sg 2500 i ersatzteile, zipper stromerzeuger ersatzteile |
| Öl: welches, wie viel, Wechsel | 65 | honda stromerzeuger eu 22i welches öl, stromerzeuger öl 15w40, stromerzeuger ölwechsel wie oft, stromerzeuger benzin im öl, notstromaggregat öl einfüllen |
| „springt nicht an“ | 38 | einhell / güde / scheppach / honda / zipper / denqbar stromerzeuger springt nicht an, generator springt nicht an was tun |
| Vergaser: reinigen, einstellen, tauschen | 25 | einhell stromerzeuger vergaser reinigen, güde stromerzeuger vergaser einstellen, vergaser für stromerzeuger |
| Reparatur, Werkstatt | 13 | stromerzeuger reparatur in der nähe, stromaggregat reparieren lassen |
| Regler, AVR, Überlast, „läuft aber kein Strom“ | 15 | stromaggregat läuft aber kein strom, überlastschutz stromerzeuger, pramac stromerzeuger es 8000 avr |
| Zündkerze, Luftfilter | 14 | einhell stromerzeuger zündkerze, luftfilter honda stromerzeuger |

### Marken

| Marke | Vorschläge mit Absicht | alle Vorschläge | Modelle, nach denen gefragt wird |
|---|---|---|---|
| Einhell | 28 | 53 | KCST 2501/2502, BT-PG 2000, STE 2500/5500/8000, TC-PG 3500 |
| Honda | 25 | 65 | EU 10i, EU 20i, EU 22i, EX 650, GX 390 |
| Scheppach | 20 | 54 | SG 1200, SG 2000, SG 2500 i, SG 3400i |
| Güde, Zipper | je 13 | 30 / 29 | GSE 950, GSE 2700, GSE 3700 RS, GSE 5500 DSG |
| Endress, Denqbar | 8 / 7 | 17 / 20 | |
| Matrix, Pramac, Hyundai, SDMO, Geko | 2–4 | 7–22 | |
| Makita, Fuxtec | 0 | 8 / 9 | |

Makita, die Marke mit den meisten Klicks 2022, hat heute keinen einzigen Vorschlag mit Reparaturabsicht.

### Auswahl und Haus (Notstrom)

| Frage | Vorschläge | Beispiele |
|---|---|---|
| „welcher Stromerzeuger für …“ | rund 100 | welcher stromerzeuger für einfamilienhaus, notstromaggregat wieviel kw für haus, welches notstromaggregat für wärmepumpe, welcher stromerzeuger ist besser benzin oder diesel, inverter stromerzeuger wieviel watt |
| Heizung, Wärmepumpe, Hebeanlage | 48 | notstrom für heizung, heizung auf notstrom umschalten, notstromaggregat für wärmepumpe, inverter stromerzeuger an heizung anschließen, notstrom hebeanlage, welches notstromaggregat für ölheizung |
| Netzumschalter | 137 (14 davon PV-Anlage) | netzumschalter notstrom 63a, netzumschalter anschließen, netzumschalter mit voreilendem n, netzumschalter erlaubt |
| Einspeisesteckdose | 179 (20 Balkonkraftwerk, 9 Wohnmobil) | einspeisesteckdose notstromaggregat, einspeisesteckdose selbst installieren, einspeisesteckdose pflicht, einspeisesteckdose netzbetreiber |
| Kaufsuchen („test“, „beste“, Baumarkt) | 361 | stromerzeuger diesel für haus test, welcher inverter stromerzeuger ist der beste, notstromaggregat für einfamilienhaus testsieger |

Die meisten Haus-Fragen enden bei der Installation: Netzumschalter und Einspeisesteckdose setzt die Elektrofachkraft, die Absprache mit dem Netzbetreiber gehört dazu. „Einspeisesteckdose selbst installieren“ und „netzumschalter anschließen“ wären Seiten, die wir nach Kriterium 2 nicht schreiben.

## 3. „Welches passt?“

| Hersteller | Was er veröffentlicht | Folge |
|---|---|---|
| Honda | Bedienungsanleitungen mit Zündkerzentyp, Ölsorte und Ölmenge je Modell, Ersatzteillisten über Händler | Die Frage „welches Öl / welche Zündkerze für EU22i“ ist beantwortbar. Die Teile sind Normware (Motoröl 10W-30, NGK-Kerze), kein Modellteil. |
| Einhell | Anleitungen mit Explosionszeichnung, Ersatzteile über den eigenen Service-Shop | Hersteller-Shop, nach `SEITENAUFBAU.md` 2.11 nicht verlinkbar. Teilenummern stehen in keinem Partner-Feed. |
| Scheppach, Güde, Zipper | Anleitungen mit Teileliste, teils ohne Bestellnummer | Wie Einhell. |
| Vergaser-Nachbauten | Kompatibilitätsangaben nur im Amazon-Titel des Verkäufers | Keine zweite Quelle. Nach `kaufbarkeit.md` keine ASIN ohne Originalmarke auf der Produktseite. |

Es gibt also eine „passt“-Frage, aber sie läuft auf Normteile (Öl, Zündkerze) oder auf Nachbau-Vergaser ohne prüfbare Quelle hinaus. Bei Sanitär und Dachfenster hängt die Antwort an einer Herstellernummer, die man in den Feeds wiederfindet. Hier nicht.

## 4. Kaufbarkeit

### Awin-Feeds (4.11.2026, Zählung nach Produktname)

| | hagebau | Contorion | OTTO |
|---|---|---|---|
| Stromerzeuger als Gerät | 12 (Einhell, Zipper, Güde, Bamato) | rund 65 (Unicraft 36, Pramac 10, Einhell 6, Stier 5, Kärcher 4) | rund 100 (Güde 10, Könner & Söhnen 9, Einhell 5, Honda) |
| Powerstation | 0 | 12 (meist Akku-Ladegeräte) | 57 (Bluetti 18, Jackery 16) |
| Vergaser, Luftfilter, Starterseil für Stromerzeuger | 1 (Briggs & Stratton Luftfilter) | 2 | 6 (Nachbau-Luftfilter) |
| Zündkerze | 2 (Bosch, Kleinmotoren) | 0 (280 Treffer, alles Zündkerzenschlüssel) | 0 (11 Treffer, alles Schlüssel) |
| 4-Takt-Öl (SAE 30, 10W-30) | 0 | 3 | 5 |
| Netzumschalter | 0 | 3 (Eaton) | 0 |
| zum Vergleich: Dachfenster | 781 | 0 | 123 |

Die Partnershops verkaufen Stromerzeuger als Neugerät, Ersatzteile praktisch gar nicht.

### Amazon (Stichprobe 5.11.2026)

| Suche | Was kommt | Bewertungen |
|---|---|---|
| honda eu22i zündkerze | NGK BPR5ES / BPR6ES (Normkerzen), MCHNIC-Kit „Luftfilter mit Zündkerze für Honda EU22i“ (B0CLH4WX3Y), 2er-Luftfilter-Kit (B0BLGSFNLW) | 3.237 / 693 / 8 / 62 |
| einhell stromerzeuger vergaser | AISEN, HURI, MCHNIC „Vergaser mit Dichtung für Einhell …“ (B07VQ72JC8, B096ZFMNHP, B09578WZLK u. a.) | 4–101, ein Universal-Vergaser 324 |
| honda eu22i öl | Liqui Moly Gartengeräte-Öl 10W-30, Briggs & Stratton SAE30 | 3.455 / 1.256 |
| netzumschalter notstrom | Umschalter 63 A Netz-0-Not (B0BJPWDKX3), ATS-Schalter ohne Marke | 377 |

Originalteile mit Herstellernummer gibt es in der Stichprobe nicht. Kaufbar wären Öl und Normkerzen (gut bewertet, aber 5–15 € und nicht modellgebunden) und Nachbau-Vergaser (15–30 €, Kompatibilität nur laut Verkäufer). Der Warenkorb liegt deutlich unter Sanitär (50–700 €) und Dachfenster (Rollo 50–230 €).

## 5. Bewertung nach `BEREICHE-REIHENFOLGE.md` Abschnitt 2

| Kriterium | Ergebnis |
|---|---|
| 1. Gibt es ein „welches passt?“ | Teilweise. Öl und Zündkerze je Modell ja, aber Normteile. Vergaser nur über Nachbau-Angaben. Keine Herstellernummern in den Feeds. |
| 2. Darf man es selbst machen? | Am Gerät ja (Öl, Kerze, Luftfilter, Vergaser reinigen). Alles, was das Haus berührt (Netzumschalter, Einspeisesteckdose, Anschluss an Heizung oder Wärmepumpe), nein: Elektrofachkraft nach DIN VDE 0100-551, Absprache mit dem Netzbetreiber. |
| 3. Gibt es die Teile zu kaufen? | In den Partnershops nein. Bei Amazon Normteile und Nachbauten. |
| 4. Wie nah liegt es am Bestehenden? | Weit. Andere Leser (Baustelle, Camping, Prepper, Landwirtschaft), andere Shops, Motorgeräte statt Hausinstallation. Kein Teil des Hauses, wie Hochdruckreiniger. |
| 5. Warenkorb und Nachfrage | Reparaturteile 5–30 €. Die Nachfrage, die früher Geld brachte, war Gerätekauf („die besten“), und die schließen wir aus. |

Ergebnis: Kriterium 2 und 4 fallen klar durch, 3 auch. Damit gehört das Thema nach `BEREICHE-REIHENFOLGE.md` Abschnitt 5 („Nicht verfolgt“).

## 6. Warum Bernd trotzdem Stromerzeuger-Begriffe in der Search Console sieht

Am wahrscheinlichsten: Google hat die alten URLs noch im Index oder zeigt sie noch für einzelne Begriffe, bis der 410 überall angekommen ist. Die 410 sind seit 4.11.2026 gesetzt, `stromerzeuger-vergleich` lief bis dahin. Erwartung: Die Impressionen fallen in den nächsten Wochen weg. Gegen eine echte Chance spricht, dass seit 2023 kein Stromerzeuger-Begriff mehr unter den Top 3 der Monatsberichte stand, außer im Januar 2026 (+3 Klicks für „stromerzeuger diesel testsieger“).

**Was die Bewertung ändern würde:** ein Export aus der Search Console, Leistung → Suchanfragen, Filter „Suchanfrage enthält stromerzeuger“ (und „notstrom“, „aggregat“), Zeitraum 16 Monate, Spalten Klicks, Impressionen, Position; dasselbe unter „Seiten“. Stehen dort Reparaturfragen („… springt nicht an“, „welches öl“) mit nennenswerten Impressionen auf Position 1–10, lohnt ein zweiter Blick auf Seite C1 und C2 unten. Stehen dort Kaufsuchen („test“, „beste“, „diesel“), bestätigt es die Empfehlung.

## 7. Seitenvorschläge, falls Bernd doch etwas will

Priorität: **A** = sofort, **B** = danach, **C** = nur auf ausdrücklichen Wunsch oder wenn der Search-Console-Export Reparaturfragen zeigt.

| Ziel-URL | Seitentyp | Suchbegriffe | Beleg | Prio |
|---|---|---|---|---|
| `/ratgeber/notstrom-haus` (C1) | Ratgeber: Notstrom für Heizung, Hebeanlage, Kühlschrank | notstrom für heizung, heizung auf notstrom umschalten, notstrom hebeanlage, welches notstromaggregat für ölheizung / wärmepumpe, notstromaggregat wieviel kw für haus (rund 150 Vorschläge) | Inhalt aus dem entfernten `stromerzeuger-vergleich` (Quellen BBK, 32. BImSchV, VDE 0100-551, Honda- und Einhell-Daten). Hängt an „Hebeanlage & Abwasser“ (Wasser & Wärme): Was passiert bei Stromausfall, was macht die Elektrofachkraft. Kauf nur als Neukauf-Zeile (Stromerzeuger aus OTTO und Contorion mit Preis). Grenze deutlich: Einspeisung und Umschalter sind nicht selbst zu machen. | C |
| `/problem/stromerzeuger-springt-nicht-an` (C2) | Problem | „<Marke> stromerzeuger springt nicht an“ (38), vergaser reinigen (25), stromaggregat läuft aber kein strom | Ursachen aus den Anleitungen: Öl-Sicherung, Benzinhahn, alter Sprit, Vergaser, Zündkerze. Kauf: Zündkerze, Öl, Nachbau-Vergaser. Passt zu keinem Bereich, wäre eine Waise. | C |
| Marken- oder Serienseiten (Einhell, Honda, Scheppach) | Marke | „<Marke> stromerzeuger ersatzteile“ | Keine Teilenummern in den Feeds, Teile nur als Nachbau. **Nicht bauen.** | — |
| „welcher Stromerzeuger für Baustelle / Camping“ | Ratgeber | welcher stromerzeuger für wohnmobil, … für kreissäge | Kein Hausbezug. Wohnmobil gehört zu womo-teile. **Nicht bauen.** | — |

Es gibt keine A- und B-Seiten. Das ist der Kern der Empfehlung.

## 8. Empfehlung

**Lohnt sich nicht als Bereich. Die alten URLs bleiben bei 410.**

1. **Weiterleiten nur, wenn es ein passendes Ziel gibt.** Heute gibt es keins. Eine Weiterleitung von „die 13 besten Diesel-Stromerzeuger“ auf den Hebeanlagen-Ratgeber behandelt Google als Soft-404 und schickt Besucher, die einen Generator kaufen wollen, auf eine Seite, die ihnen nichts verkauft. Der 410 ist ehrlicher und räumt den Index schneller.
2. **Wenn C1 (`/ratgeber/notstrom-haus`) gebaut wird,** dann leiten genau drei alte URLs dorthin um (Statuscode 301 in `redirects`): `/stromerzeuger`, `/stromerzeuger-hausbau`, `/stromerzeuger/stromerzeuger-vergleich`. Die Marken- und Diesel/Benzin-Listen bleiben 410, weil ihre Leser ein bestimmtes Gerät suchen.
3. **Kleine Korrektur, in diesem PR erledigt:** `/stromerzeuger` lieferte wegen `EXCLUDED_PATHS` 404 statt 410 (Abschnitt 1).
4. **Search-Console-Export anfordern** (Abschnitt 6). Er ist die einzige Zahl, die die Empfehlung kippen könnte.

### Vorschlag für `BEREICHE-REIHENFOLGE.md`

Kein Rang in Abschnitt 3. Neue Zeile in Abschnitt 5 „Nicht verfolgt“:

| Thema | Grund |
|---|---|
| Stromerzeuger und Notstrom | Gerät, kein Teil des Hauses. Einspeisung ins Hausnetz ist Arbeit für die Elektrofachkraft. Keine Ersatzteile in den Partner-Feeds, bei Amazon nur Normteile und Nachbauten. Der alte Traffic (2022) kam aus Kauflisten. Geprüft in `KEYWORDS-STROMERZEUGER.md`. Höchstens ein Ratgeber „Notstrom fürs Haus“ neben der Hebeanlage. |

Die Zeile ist hier nur vorgeschlagen, `BEREICHE-REIHENFOLGE.md` ist nicht geändert.

## 9. Grenzen der Daten

- **Keine Search-Console-Abfrage.** Die Monatsberichte nennen nur die drei stärksten Seiten und Suchbegriffe. Wie viele Impressionen die Stromerzeuger-Begriffe heute haben, ist unbekannt. In `seiten` stehen für alle betroffenen Zeilen 0 Impressionen und 0 Klicks, die Spalten werden offenbar nicht gepflegt.
- **Keine Planner-Zahlen.** Die Suchvorschläge zeigen die Breite der Fragen, nicht die Menge. Die a–z-Erweiterung bläht „einspeisesteckdose“ und „netzumschalter“ auf, die zum Teil Balkonkraftwerk und Wohnmobil meinen.
- **Einnahmen 2022 unbekannt.** „Sehr gut verdient“ lässt sich mit den Daten im Gmail nicht beziffern; Amazon-Abrechnungen aus 2022 liegen dort nicht.
- **Feed-Zählung nach Produktname.** Ein Ersatzteil, das weder „Vergaser“ noch „Zündkerze“ noch „Stromerzeuger“ im Namen trägt, fehlt. Die Gerätezahlen sind grob (Contorion „Unicraft“ sind zum Teil Schweiß- und Ladegeräte).
- **Amazon nur vier Stichproben.** Bewertungszahlen vom 5.11.2026.
- **Google-Ergebnisse nicht geprüft.** Für „stromerzeuger springt nicht an“ und „notstrom heizung“ ist die Konkurrenz nicht angesehen. Für die Empfehlung ist das zweitrangig, weil Kriterium 2 bis 4 schon entscheiden.

## Quellen

- Search-Console-Monatsberichte im Gmail, 08/2022 bis 10/2026 (u. a. September 2022, Oktober 2022, November 2022, Dezember 2022, November 2024, Januar 2026, September und Oktober 2026)
- `docs/UMBAUPLAN.md` Abschnitt 1, 2 und Nachtrag vom 4.11.2026
- `docs/KONZEPT-BAD-SANITAER.md`: „höchstens 2–3 Seiten mit Hausbezug (Notstrom für die Gastherme, Hebeanlage bei Stromausfall)“
- Entfernter Beitrag `data/artikel/stromerzeuger-vergleich.html` (Git, vor `7a822e7`) mit den Quellen BBK „Stromausfall – Vorsorge und Selbsthilfe“, BBK „Autarke Notstromversorgung“, 32. BImSchV §§ 3, 7 und Anhang, DIN VDE 0100-551:2017-02, VDE-AR-N 4105

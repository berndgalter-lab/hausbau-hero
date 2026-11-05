# Wasserfilter & Enthärtung: lohnt sich der Bereich?

Stand: 4. November 2026. Prüfung nach `BEREICHE-REIHENFOLGE.md` Abschnitt 4 für den Bereich auf Rang 1 (Hauptbereich „Wasser & Wärme“). Aufbau wie `KEYWORDS-SANITAER.md`, Seitentypen und URLs nach `SEITENAUFBAU.md` Abschnitt 2a.

**Gebaut am 5. November 2026 (kleiner Zuschnitt):** Bereich `wasserfilter` mit Druckminderer, Teilearten `filtereinsatz` und `regeneriersalz`, Probleme `rueckspuelfilter-tropft` und `enthaertungsanlage-verbraucht-kein-salz`, Ratgeber `/ratgeber/rueckspuelfilter`, Marken Judo, BWT und Resideo. Die Planner-Abfrage aus Abschnitt 8 ist weiter offen.

## Kurzfassung

- **Empfehlung: Dachfenster vorziehen, Wasserfilter auf Rang 2 und kleiner zuschneiden.** Die Frage „welches passt?“ ist beim Hauswasserfilter gut belegt (Filtereinsatz je Gerät und Baureihe, Ersatzteilkatalog von Resideo, Teilelisten in den Anleitungen von SYR und Judo). Aber kein Partnershop führt die Teile: hagebau hat **0** Artikel für Rückspülfilter, Enthärtungsanlage oder Regeneriersalz, Contorion 23 (nur Oventrop und Riegler), OTTO 13. Zum Vergleich: hagebau führt **667 VELUX-Artikel**. Geld käme hier fast nur über Amazon.
- **Selbst machen ist enger als im Bad.** Einbau am Hausanschluss gehört nach § 12 AVBWasserV einem eingetragenen Installateur. Bei der Enthärtungsanlage bleibt dem Betreiber nur Salz nachfüllen und kontrollieren; Judo schreibt, dass druckbelastete Teile nur „konzessionierte Personen“ tauschen dürfen. Einbau-Seiten gibt es deshalb nicht, und Ersatzteilseiten zur Enthärtung höchstens als Abschnitt.
- **Was trägt:** Filtereinsatz und Dichtungen für Rückspülfilter und Hauswasserstationen, „Rückspülfilter tropft“, Regeneriersalz, „Enthärtungsanlage verbraucht kein Salz“ und ein Ratgeber Rückspülfilter. Bei Amazon gibt es dafür viele Originalteile mit Herstellernummer und hohen Bewertungszahlen (BWT-Filterelement 810386: 2.133 Bewertungen, Judo EHF 100: rund 960 über drei Angebote).
- **Was nicht trägt:** Untertisch- und Wasserhahnfilter, Kalkschutz ohne Salz, Osmose. Kauf ohne Reparaturbezug, kaum Fragen nach Teilen, Amazon-Eigengeschäft.
- **Druckminderer gehört hierher.** Er sitzt im selben Gerät (Hauswasserstation), stammt von denselben Herstellern und hat dieselben Ersatzteile. „wasserfilter mit druckminderer“ steht im Planner bei 1.000–10.000. Der Rückflussverhinderer bleibt beim „Wasseranschluss“, weil fast alle Suchen die Armatur betreffen.
- **Marken in dieser Reihenfolge:** Judo, BWT, Resideo (Honeywell/Braukmann), SYR, Grünbeck.

## Datengrundlage

- **Google Keyword Planner:** Für diesen Bereich gibt es keinen eigenen Export. Im Gmail liegt keiner, und die Exporte in `~/Downloads/Hausbauhero` (4.11.2026, für Sanitär) enthalten nur den Beifang zu Druckminderer und Rückflussverhinderer. Diese Zeilen sind unten mit Stufe angegeben. Für Rückspülfilter, Enthärtungsanlage, Regeneriersalz und die Marken fehlen Planner-Zahlen ganz (Abschnitt 5).
- **Google-Suchvorschläge**, abgerufen am 4.11.2026 (hl=de, gl=de): 38 Produkt-Startbegriffe mit a–z und sieben Zusätzen („wechseln“, „passt“, „welche“, „welches“, „ersatzteile“, „undicht“, „tropft“), 20 Marken mit 15 Zusätzen („ersatzteile“, „filtereinsatz“, „ersatzsieb“, „dichtung“, „salz“, „injektor“, „fehler“ …) plus a–z hinter „ersatzteile“. 2.132 Abfragen, 7.081 verschiedene Vorschläge, davon 2.178 mit Reparatur- oder Kompatibilitätsabsicht. Gezählt wird ohne den Startbegriff selbst, damit „rückspülfilter“ nicht wegen „spül“ als Absicht gilt.
- **Vergleich Dachfenster und Rollladen** mit derselben Methode (14 Startbegriffe), nur um die Breite der Fragen nebeneinanderzustellen.
- **Awin-Feeds** hagebau, Contorion und OTTO (Download vom 4.11.2026, `.cache/awin-probe/*-voll.csv.gz` im Haupt-Checkout). Gezählt nach `brand_name` und nach Produktname, ohne Gas, Druckluft, Pool, Aquarium, Kaffee und Spülmaschinensalz.
- **Amazon:** 30 Suchen auf amazon.de im eingebauten Browser (Titel, ASIN, Bewertungszahl). Übernommen ist nur, was die Originalmarke und die Herstellernummer im Titel trägt.
- **Google-Ergebnisse:** 15 Suchen auf google.de (hl=de, gl=de), erste Seite, für die Konkurrenz.
- **Herstellerunterlagen:** Resideo-Ersatzteilkatalog 2022/23 (194 Seiten), SYR-Anleitung Drufi+ DFR/FR mit Teileliste, Judo-Anleitung i-soft safe (1701998, 2014/04), Grünbeck- und BWT-Unterlagen über die Websuche.

Rohdaten liegen außerhalb des Repos im Notizordner dieser Sitzungsgruppe, Unterordner `keywords-wasserfilter` (`suggest.json`, `absicht.json`, `suggest-vergleich.json`, `zaehlung.json`, `amazon-google.md`).

## 1. Nachfrage

### Produktarten

Spalten: **Vorschläge** = alle Vorschläge zum Startbegriff; **mit Absicht** = davon mit Reparatur- oder Kompatibilitätsabsicht; **Planner** = Stufe, wo der Sanitär-Export den Begriff zufällig enthält.

| Startbegriff | Vorschläge | mit Absicht | Planner | Was gefragt wird |
|---|---|---|---|---|
| rückspülfilter | 264 | 97 | — | tropft, undicht, lässt sich nicht öffnen, läuft ständig, lange nicht gespült, wie oft spülen, Filtereinsatz/Filtersieb wechseln, welche Größe, 1 oder 1 1/2 Zoll, mit Druckminderer, „<Marke> rückspülfilter ersatzteile“ (Judo, BWT, Grünbeck, SYR, Artiga, Cosmoclear, Optiline, Buderus) |
| druckminderer | 295 | 86 | 1.000–10.000 | tropft, Dichtung, Kartusche wechseln, einstellen, mit Rückspülfilter, 3/4 oder 1 Zoll; „braukmann druckminderer ersatzteile“ 100–1.000 |
| enthärtungsanlage | 264 | 80 | — | welches Salz, regeneriert nicht, kein Wasser im Salzbehälter, läuft über, piept, undicht, Härte einstellen, Verschneideventil, Harz wechseln, „<Marke> ersatzteile“ (Judo, BWT, Grünbeck, SYR, Kinetico, Conel, Pentair, Aqmos) |
| enthärtungsanlage salz | 113 | 73 | — | verbraucht kein/zu viel Salz, Salz wird nicht weniger, verklumpt, erkennt Salz nicht, „<Marke> welches salz“ |
| hauswasserstation | 234 | 68 | 100–1.000 („hauswasserstation mit druckminderer“, „… 1 zoll“) | Ersatzteile (BWT, Conel, Artiga, Honeywell HS10), Filtereinsatz, Druck einstellen |
| hauswasserfilter / wasserfilter hausanschluss | 172 / 177 | 54 / 49 | „wasserfilter mit druckminderer“ 1.000–10.000 | Einsatz wechseln, wie oft, Dichtung, Schlüssel, tropft, Zollgröße, „selber wechseln“ |
| regeneriersalz | 238 | 25 | — | Unterschied zu Speise-, Streu-, Poolsalz, löst sich nicht auf, Verbrauch |
| enthärtungsanlage wartung | 79 | 33 | — | selber machen, Kosten, „wartung blinkt“, umlagefähig |
| filtereinsatz | 229 | 28 | — | „<Marke> filtereinsatz wechseln“ (Judo, SYR, Grünbeck, Conel, Oventrop, JRG), 1 Zoll, 10 Zoll; viel Fremdes (Dunstabzug, Siebträger) |
| filtertasse | 61 | 14 | — | Dichtung, O-Ring, Montageschlüssel (Drufi) |
| rückflussverhinderer | 235 | 22 | 1.000–10.000 | Armatur, Waschmaschine, Wasserhahn; 100–1.000: „wasserhahn mit rückflussverhinderer“, „schrägsitzventil mit …“, „grohe rückflussverhinderer“ |
| systemtrenner | 243 | 37 | — | tropft, läuft ständig, Heizungsfüllung, Garten |
| filterkartusche / wasserfilter kartusche | 239 / 122 | 42 / 20 | — | fast nur Pool, Whirlpool, Brita, Kühlschrank, Quooker |
| osmoseanlage | 278 | 47 | — | Aquarium, Fensterreinigung, Membran wechseln |
| kalkfilter / kalkschutz | 249 / 154 | 26 / 6 | — | Kaffeemaschine, Wasserkocher, „ohne Salz Test“ |
| untertisch wasserfilter / wasserfilter wasserhahn | 99 / 180 | 4 / 8 | — | „welcher ist der beste“, einbauen |

Querschnitt über alle Vorschläge mit Absicht: 109 nennen Filtereinsatz, Siebeinsatz oder Filterelement, 91 eine Dichtung, 80 „tropft“, „undicht“ oder „leckt“, 46 eine Fehlermeldung, 36 „wie oft“ oder „lange nicht gespült“, 29 den Injektor.

### Marken

| Marke | Vorschläge mit Absicht | Modelle, nach denen gefragt wird |
|---|---|---|
| BWT (mit Cillit) | 167 (+59) | AQA perla, Perla, Diago, Bolero, E1, Avanti RF, Infinity, Galileo, Klarfilter, 77N |
| Judo | 150 | i-soft, GUBI-E, JUKO, Helvetia (EHF 100), Softwell, Biko, Profi, Promi, Speedy, Heifi, QC; „fehler 1/2/3“, Injektor, Siebeinsatz |
| Grünbeck | 138 (+144 als „gruenbeck“) | Boxer (R, RD, RDX, KDX), softliQ SC18/SD18/SD21, GENO, FS1, Wartungskit |
| Honeywell / Braukmann / Resideo | 129 / 64 / 23, gemischt mit Thermostaten und Mischern | F76S, HS10S, FK74C, FF06, D06F, Primus, Siebtasse |
| SYR | 98 | Drufi (DFR, FR, DFF), Duo DFR, LEX Plus, Wartungsset; Planner: „syr duo dfr“, „drufi fr filter“, „syr druckminderer“ je 100–1.000 |
| Kemper | 128, aber fast nur Frosti, Außenarmatur, Systemtrenner | gehört zu „Wasser im Garten“ |
| Aqmos | 47 | R2D2, Salzverbrauch, Wartungskit |
| Conel (Hornbach-Eigenmarke) | über Produktbegriffe | „conel enthärtungsanlage welches salz“, „conel filtereinsatz wechseln“, Clear 2.0 RD |

### Vergleich mit Dachfenster und Rollladen

| Startbegriff | Vorschläge | mit Absicht |
|---|---|---|
| velux / dachfenster | 314 / 312 | 103 / 96 |
| velux ersatzteile | 174 | 98 |
| velux rollo / velux verdunkelungsrollo | 250 / 228 | 76 / 71 |
| gurtwickler / rollladengurt / rollladenmotor | 260 / 174 / 228 | 72 / 60 / 60 |
| rückspülfilter / enthärtungsanlage / druckminderer | 264 / 264 / 295 | 97 / 80 / 86 |

Die Breite der Fragen ist ähnlich. Die Vorschläge sagen nichts über die Menge (Abschnitt 5). Der Unterschied liegt bei Kaufbarkeit und Selbermachen, nicht bei der Nachfrage.

## 2. „Welches passt?“

| Hersteller | Was er veröffentlicht | Beispiel |
|---|---|---|
| **Resideo (Honeywell/Braukmann)** | **Ersatzteilkatalog SHK 2022/23, 194 Seiten**, öffentlich als PDF, je Gerät und **Baureihe nach Baujahr** | F76S „Baureihe ab 2007“ und „1997–2006“ auf getrennten Seiten, ebenso HS10S und FKN76CS. HS10S-FA verweist auf die Teile der eingebauten Komponenten (Filter, Druckminderer, Rückflussverhinderer je Zeitraum). Filtereinsatz AF11S-1A (100 µm, 1–1¼“). Der Katalog verweist auf die Instandhaltungspflicht nach DIN EN 806-5. |
| **SYR** | Bedienungsanleitungen auf syr.de mit Teileliste und Nummern | Drufi+ DFR/FR: Filtereinsatz 2315.00.930 (90 µm) oder 2315.01.946 (40 µm), Druckminderer-Kartusche 2315.01.970, Manometer 2315.01.920, Filtertasse 2315.00.912. Der alte Drufi braucht 2315.00.908. Genau diese Verwechslung ist eine „welches passt?“-Frage. |
| **Judo** | Anleitungen mit Kapitel „Ersatzteile“ (PROFI-PLUS getrennt nach ¾–1¼“ und 1½–2“, JPF-QC, JRSF), alte Ersatzteilkataloge (2018) bei Händlern | Filtereinsatz EHF 100 (8080030) für Helvetia und Clear K/KD, Siebeinsatz-Set 2170606, Injektor-Set 2201470, Verschleißteilset Leitwertsensor und Ansaugsieb (i-soft), Druckminderer-Kartusche 2150026 (JSP, JUKO, JPM, JCP) |
| **Grünbeck** | Online-Ersatzteilkatalog `etk.gruenbeck.de`, **nur mit Login**; Datenblätter und Anleitungen frei | Filtereinsatz 101272E (pureliQ K/KD, Boxer KX/KDX), 101632E (Boxer R/RD, A/AD), Dichtungssatz Boxer. Für softliQ nennt die Anleitung nur die Gerätenummer (SC18: 188500), die Kundendienstanleitung ist nicht öffentlich. |
| **BWT** | kein öffentlicher Katalog gefunden | Nummern stehen bei Händlern und in Amazon-Titeln: Filterelement 810386 (E1), 1902393 (Diago, Galileo, Bolero RF/HWS), 10994 (Gr. 1), Dichtungsset 1-902345 und 7084233 |

Fazit: Für Filter und Hauswasserstationen ist die Datenlage gut, bei Resideo und SYR besser als bei den meisten Sanitärmarken. Die typische Frage lautet „Welcher Einsatz passt in meinen Filter, alt oder neu?“, und die Antwort hängt an Gerätename, Nennweite und Baujahr. Für Enthärtungsanlagen gibt es Teile, aber keine öffentlichen Listen außer bei Judo (in den Anleitungen), und der Tausch ist Sache des Kundendienstes (Abschnitt 4).

## 3. Kaufbarkeit

### Awin-Feeds (4.11.2026)

| | hagebau | Contorion | OTTO |
|---|---|---|---|
| Judo, BWT, Grünbeck, SYR, Resideo/Honeywell: Wasserfilter-Artikel | 0 | 2 (Honeywell) | 3 (BWT 1, Aqmos 2; dazu Brita 3, nur Kannenfilter) |
| Rückspülfilter, Hauswasserstation, Enthärtungsanlage, Salz (Name) | 0 | 23 (Oventrop 13, Riegler 10) | 13 |
| Filtereinsatz, Sieb, Filtertasse (Name, alle Marken) | 0 | 110, Median 30,74 €, meist Armaturen-Siebe | 80, Median 24,99 € |
| Druckminderer Wasser | 2 | 27, Median 137 € | 8 |
| zum Vergleich: Dachfenster (VELUX, Roto, Fakro) | **781 (VELUX 667)** | 0 | 123 |
| zum Vergleich: Rollladen (Gurt, Wickler, Motor) | 45 (Schellenberg 34) | 166 | 160 (Schellenberg 83) |

Die großen Wasserfilter-Marken stehen in keinem der drei Feeds. Contorion führt Riegler und Oventrop, das reicht für eine Zeile auf der Filtereinsatz-Seite, nicht für einen Bereich. Megabad (Bewerbung läuft, `AWIN-BEWERBUNGEN.md`) ist nicht auf Wasseraufbereitung geprüft. Die Shops, die bei Google für „judo ersatzteile“ stehen (wuh24, ersatzteilfachmann, klempnerladen24, heizung-billiger, hts24), sind nicht als Awin-Programme geprüft.

### Amazon (Stichprobe 4.11.2026)

Originalteile mit Herstellernummer im Titel:

| Teil | ASIN | Bewertungen |
|---|---|---|
| BWT Filterelement 810386 für E1, 2er | B00BHEH2QI | 2.133 |
| BWT KSF Schutzfilterhülse Gr. I | B005AKIZCA | 1.079 |
| BWT Filterelement 1.902.393 (Diago) | B011O24TA4 | 393 |
| Judo EHF 100 (8080030), drei Angebote | B00J13KUFC, B00ITUJT9Q, B0070NKXXO | 376, 322, 263 |
| Judo GUBI-E 1" Rückspül-Schutzfilter mit Druckminderer | B07CRX2JN7 | 893 |
| SYR Drufi Filtereinsatz 2315.00.908 / Drufi+ 2315.00.930 | B00DYTF1MQ / B077HGSXQH | 117 / 39 |
| SYR Gewebefilter 2000.25.900 (laut SYR Ersatzgewebe für Drufi FF/DFF, nicht für die HWS 2000; Korrektur 5.11.) | B00BKYNM5U | 163 |
| Grünbeck Filtereinsatz 101272E / 101632E | B07D73KVVF / B00DYPIY7O | 119 / 72 |
| Honeywell FF06-1AA / AF11S-1A / AS06-1A | B0017V45TI / B004IR8AVC / B0017V0NUS | 131 / 3 / 8 |
| Judo Verschleißteilset i-soft / Siebeinsatz 2170606 / Injektor-Set 2201470 | B06XRJ7FLR / B01IVP3MSM / B09CKX57YL | 82 / 95 / Preis 96,49 € |
| Regeneriersalz Tabletten 25 kg (verschiedene) | B0191I9NZO, B086T1X6ZK, B09P3FQLQ2 | 1.957, 398, 314 |

Daneben Nachbauten mit Originalnummer im Titel (Ancable, Enhon, vhbw für Grünbeck FS, BWT E1, BWT Diago). Regel aus `kaufbarkeit.md`: ASIN nur, wenn die Originalmarke auf der Produktseite steht. Nicht gefunden: Resideo-Filtereinsätze außer AF11S-1A, die Klarsichttasse KF11S, SYR LEX Plus.

Warenkorb: Filtereinsatz 25–90 €, Dichtungssatz 20–40 €, Salz 11–20 € je 25 kg (wiederkehrend), Injektor- oder Verschleißset 70–100 €, Rückspülfilter mit Druckminderer 90–400 €.

## 4. Grenzen: was darf man selbst?

- **Einbau und Umbau:** Hinter dem Hausanschluss ist der Anschlussnehmer verantwortlich. Errichtung und „wesentliche Veränderungen“ dürfen nur das Wasserversorgungsunternehmen oder ein im Installateurverzeichnis eingetragenes Unternehmen ausführen (§ 12 Abs. 2 AVBWasserV). Hersteller-Anleitungen (BWT, SYR: „Only qualified installers are authorised to install and service the device“) sagen dasselbe. **Folge: keine Einbau-Seiten**, weder Filter noch Enthärtung noch Druckminderer. Der neue Filter auf dem vorhandenen Anschlussflansch ist ein Grenzfall; die Seiten nennen den Flansch als Auswahlkriterium und verweisen für den Tausch auf den Installateur.
- **Betreiberpflichten nach DIN EN 806-5:** Rückspülbare Filter mindestens halbjährlich rückspülen, die Hersteller empfehlen alle zwei Monate (Grünbeck, Resideo, BWT). Das ist Aufgabe des Betreibers und Kern der Problemseiten.
- **Filtereinsatz und Dichtungen tauschen:** Die Hersteller beschreiben den Tausch in der Betriebsanleitung (Grünbeck Boxer K: neuen Einsatz nicht mit bloßen Händen anfassen), verkaufen die Teile frei, behalten die Wartung aber teils dem Fachmann vor (SYR). Ob der Tausch eine „wesentliche Veränderung“ ist, sagt keine gefundene Quelle. Die Seiten zeigen deshalb, welches Teil passt, beschreiben den Tausch so, wie ihn die Anleitung beschreibt, und sagen dazu, dass der Hersteller ihn dem Fachbetrieb zuordnet, wo er das tut.
- **Enthärtungsanlage:** Judo (i-soft safe): Inspektion durch den Betreiber mindestens alle zwei Monate, Salz nach DIN EN 973, Wartung mindestens halbjährlich durch Fachhandwerk oder Hersteller. „Das Öffnen der Geräte und der Austausch von wasserdruckbelasteten Teilen darf nur durch konzessionierte Personen erfolgen.“ **Folge:** Seiten zu Salz, Störungen und Fehlermeldungen ja; Injektor, Steuerventil, Harz nur als Hinweis „das macht der Kundendienst“, mit Teilenummer, damit man weiß, wonach man fragt.
- **Heizungswasser:** SYR-Füllkombination, Vollentsalzung und Systemtrenner für die Heizung gehören zur Heizung (Fachbetrieb). Nicht in diesem Bereich.

## 5. Neue Seiten

Priorität: **A** = als Erstes, wenn der Bereich startet (starke Nachfrage im Suggest oder Planner, Teil mit Nummer und ASIN), **B** = danach, **C** = später oder nur als Abschnitt.

| Ziel-URL | Seitentyp | Suchbegriffe (Stufe oder Breite) | Beleg | Prio |
|---|---|---|---|---|
| `/bereich/wasserfilter` | Bereich „Wasserfilter & Enthärtung“ (Wasser & Wärme) | — | Nimmt den Druckminderer aus „Wasseranschluss & Leitung“ auf (Ratgeber, Problem-Muster `druckminderer\|wasserdruck`). Einleitung: Filter direkt hinter dem Wasserzähler, Druckminderer, Enthärtung; was der Betreiber tun muss, was der Installateur macht. | A |
| `/ersatzteile/filtereinsatz` | Teileart: welcher Einsatz passt in welchen Filter | filtereinsatz rückspülfilter, „<Marke> filtereinsatz wechseln“ (Judo, SYR, Grünbeck, Conel, Oventrop, JRG), hauswasserfilter einsatz, filtereinsatz 1 zoll (Suggest, 109 Vorschläge über alle Begriffe) | Tabelle Gerät → Einsatz mit Nummer und Baujahr: Resideo F76S/HS10S ab 2007 und 1997–2006 (AF11S), SYR Drufi alt 2315.00.908 / Drufi+ 2315.00.930, Judo Helvetia/Clear EHF 100, Grünbeck Boxer 101632E / pureliQ 101272E, BWT E1 810386 / Diago 1902393. ASINs mit 39 bis 2.133 Bewertungen. Riegler und Oventrop bei Contorion. Maschenweite (40/90/100 µm) als Merkmal. | A |
| `/problem/rueckspuelfilter-tropft` | Problem | rückspülfilter tropft, undicht, „tropft was tun“, „mit druckminderer tropft“, „läuft ständig“, „lässt sich nicht öffnen“, hauswasserfilter tropft, „<Marke> rückspülfilter tropft“ (BWT, Grünbeck, Judo) | 80 Vorschläge mit „tropft/undicht/leckt“ im ganzen Bereich. Ursachen nach Anleitung: Spülventil schließt nicht (Schmutz am Sitz), O-Ring der Filtertasse, Druckminderer-Kartusche. Bei Google nur Foren und focus.de. Führt auf Filtereinsatz und Dichtungen. | A |
| `/ersatzteile/regeneriersalz` | Teileart: welches Salz für welche Anlage | enthärtungsanlage welches salz, „<Marke> welches salz“ (BWT, Grünbeck, Judo, Conel), regeneriersalz unterschied, salztabletten 25 kg (73 + 25 + 17 Vorschläge) | DIN EN 973 Typ A, Tabletten oder Granulat je Hersteller, BWT Perla Tabs. Amazon mit 1.957 Bewertungen, OTTO 9 Artikel (K+S). Wiederkehrender Kauf. Bei Google: Salzhändler, selfio, welt.de-„Test“, Foren; keine Seite ordnet Salz der Anlage zu. | A |
| `/problem/enthaertungsanlage-verbraucht-kein-salz` | Problem | verbraucht kein Salz, Salz wird nicht weniger, regeneriert nicht, enthärtet nicht, kein/zu viel Wasser im Salzbehälter, läuft über, Salz verklumpt | Rund 30 Vorschläge. Ursachen: Salzbrücke, Ansaugsieb, Injektor (Kundendienst), Stromausfall. Grenze: Was der Betreiber prüft, was der Kundendienst tauscht. Kauf: Salz, Härteteststreifen, Judo-Verschleißteilset (82 Bewertungen). | A |
| `/ratgeber/rueckspuelfilter` | Ratgeber mit Auswahlhilfe | welcher rückspülfilter, rückspülfilter welche größe, welcher wasserfilter hausanschluss, rückspülfilter oder wechselfilter; Planner: wasserfilter mit druckminderer, druckminderer mit wasserfilter (1.000–10.000), hauswasserstation mit druckminderer (100–1.000) | Fragen: mit Druckminderer, Anschluss 3/4/1/1¼ Zoll, Rückspülung von Hand oder automatisch, **vorhandener Anschlussflansch** (Judo-Drehflansch, Resideo HS10S, SYR-Universalflansch). Mit `/ratgeber/druckminderer` abstimmen: Dort stehen schon SYR HWS 2000, Grünbeck pureliQ:AD, Riegler, Resideo FK06. Entweder ein Ratgeber mit zwei Einstiegen oder zwei Ratgeber mit gegenseitigem `sonst`. Keine Liste „die besten“. | A |
| `/ersatzteile/judo` | Marke | judo ersatzteile, judo filtereinsatz, judo fehler 1/2/3, gubi e dichtungssatz, i-soft injektor (150 Vorschläge) | Anleitungen mit Teilekapitel, Amazon gut (EHF 100, GUBI-E, Sets). Siehe Abschnitt 6. | A |
| `/ersatzteile/bwt` | Marke | bwt ersatzteile, bwt rückspülfilter wechseln, bwt perla fehlermeldung, bwt dichtungsset (167 Vorschläge) | Stärkste Amazon-Abdeckung, kein öffentlicher Katalog. Cillit (alte BWT-Marke) als Abschnitt. | A |
| `/ersatzteile/resideo` | Marke (Honeywell, Braukmann) | honeywell f76s filtereinsatz, braukmann druckminderer ersatzteile (100–1.000), hs10s ersatzteile, ff06 | Beste Datenlage (Katalog mit Baureihen). Slug nach dem heutigen Firmennamen, „Honeywell“ und „Braukmann“ in Titel und Text, weil so gesucht wird. | A |
| `/ersatzteile/filtertasse` | Teileart: Filtertasse, Dichtungssatz, Schlüssel | filtertasse dichtung, filtertassen o-ring, montageschlüssel für filtertasse (drufi), „<Marke> dichtungssatz“ (91 Vorschläge mit „dichtung“) | BWT 1-902345 und 7084233, Grünbeck Dichtungssatz Boxer, SYR Filtertasse 2315.00.912, Judo Dichtungssatz JSP/JUKO. Eventuell nur Abschnitt in `filtereinsatz`, wenn die Tabelle dort reicht. | B |
| `/ersatzteile/druckminderer-einsatz` | Teileart: Kartusche oder Ventileinsatz des Druckminderers | druckminderer kartusche wechseln, dichtungen für druckminderer (100–1.000), braukmann druckminderer ersatzteile (100–1.000), druckminderer tropft | SYR 2315.01.970, Judo 2150026, Resideo-Einsätze im Katalog je D06F/D04FM/HS10S. Ergänzt den bestehenden Druckminderer-Ratgeber. | B |
| `/problem/druckminderer-defekt` | Problem | druckminderer tropft, undicht, defekt, „in welche richtung drehen“, Wasserdruck schwankt; Planner: druckminderer einstellen, einstellung druckminderer (100–1.000) | Passt zum Muster `druckminderer\|wasserdruck`, das in `bereiche.ts` schon steht. Einstellen ist Betreiberaufgabe, Tausch Installateur. | B |
| `/ersatzteile/syr` | Marke | syr drufi filtereinsatz, syr duo dfr (100–1.000), drufi fr filter (100–1.000), syr druckminderer (100–1.000) | Teilelisten in den Anleitungen, Verwechslung Drufi/Drufi+. Amazon mit Originalteilen. | B |
| `/ersatzteile/gruenbeck` | Marke | grünbeck ersatzteile, boxer, softliq sc18 wartung, grünbeck boxer kdx (100–1.000) | Viel Nachfrage, aber Katalog nur mit Login und die Enthärtung (softliQ) ist Kundendienst-Sache. Filter-Teile mit ASIN vorhanden. | B |
| `/problem/enthaertungsanlage-fehlermeldung` | Problem | judo fehler 1/2/3, bwt perla fehlermeldung, grünbeck fehlermeldung salz nachfüllen, bwt wartung blinkt, piept (46 Vorschläge mit „fehler“) | Fehlertabellen stehen in den Anleitungen (Judo i-soft: Störung 1–4 mit Behebung). Meist „Kundendienst verständigen“, deshalb nur B: wenig zu kaufen. | B |
| `/ratgeber/enthaertungsanlage` | Ratgeber mit Auswahlhilfe | welche enthärtungsanlage für einfamilienhaus, welche größe, mit oder ohne salz | Hoher Warenkorb, aber Einbau durch den Installateur und keine Partnershops. Nur als Anschluss an „lohnt sich die Reparatur?“ (Neukauf-Hinweis). | C |
| `/ersatzteile/conel`, `/ersatzteile/aqmos` | Marke | conel filtereinsatz wechseln, conel enthärtungsanlage welches salz, aqmos r2d2 | Eigenmarken von Hornbach bzw. Direktvertrieb. Erst als Zeilen in `filtereinsatz` und `regeneriersalz`. | C |

Nur als Abschnitt, keine eigene URL: Rückspülen von Hand („wie oft“, „lange nicht gespült“) im Bereich und in `rueckspuelfilter-tropft`; Rückflussverhinderer am Hausanschluss (Teil der Hauswasserstation) in `filtereinsatz` und `druckminderer-einsatz`; Injektor, Leitwertsensor, Ansaugsieb in `enthaertungsanlage-verbraucht-kein-salz`.

### Druckminderer und Rückflussverhinderer: wohin?

- **Druckminderer → hierher.** Er sitzt mit dem Filter in einem Gerät (Hauswasserstation, „Rückspülfilter mit Druckminderer“), kommt von denselben Herstellern (Resideo, SYR, Judo, Grünbeck) und steht in denselben Ersatzteillisten. Im Planner hängen beide zusammen: „wasserfilter mit druckminderer“, „druckminderer mit wasserfilter“, „druckminderer wasserfilter“ je 1.000–10.000. Der bestehende Ratgeber `/ratgeber/druckminderer` führt schon Hauswasserstationen. In `bereiche.ts` zieht `ratgeber: ["druckminderer"]` und das Problem-Muster `druckminderer|wasserdruck` in den neuen Bereich um; „Wasseranschluss & Leitung“ behält Eckventil, Geräteventil, Außenventil.
- **Rückflussverhinderer → bleibt bei „Wasseranschluss“.** Die Planner-Begriffe betreffen die Armatur: „wasserhahn mit rückflussverhinderer“, „schrägsitzventil mit …“, „grohe rückflussverhinderer“, „rückflussverhinderer für wasserhahn“ (je 100–1.000). Die Google-Ergebnisse zu „rückflussverhinderer wechseln“ zeigen Unterputz-Thermostate und die hansgrohe iBox. Am Hausanschluss ist er Teil der Hauswasserstation und dort ein Abschnitt.
- **Systemtrenner → weder noch.** Heizungsfüllung (Fachbetrieb) und Garten.

## 6. Marken

### Bewertung

Spalten: **Suggest** = Vorschläge mit Absicht; **Shops** = Wasserfilter-Artikel in hagebau · Contorion · OTTO; **Amazon** = Originalteile mit ASIN; **Daten** = veröffentlicht der Hersteller Teilelisten.

| Marke | Suggest | Planner | Shops | Amazon | Daten | Rang |
|---|---|---|---|---|---|---|
| **Judo** | 150 | — | 0 · 0 · 0 | gut: EHF 100 (rund 960 Bewertungen über drei Angebote), GUBI-E (893), Siebeinsatz 2170606, Verschleißteilset, Injektor-Set, Dichtungssatz | Anleitungen mit Kapitel „Ersatzteile“ und Bestellnummern | **1** |
| **BWT** | 167 (+59 Cillit) | — | 0 · 0 · 1 | sehr gut: Filterelement 810386 (2.133), KSF-Hülse (1.079), 1902393 (393), drei Dichtungssets | kein Katalog gefunden | **2** |
| **Resideo (Honeywell/Braukmann)** | 129 + 64 + 23, gemischt | braukmann druckminderer (ersatzteile), honeywell druckminderer je 100–1.000 | 0 · 2 · 0 | mittel: FF06 (131), AF11S-1A und AS06-1A mit wenigen Bewertungen | **Ersatzteilkatalog 194 Seiten mit Baureihen nach Baujahr** | **3** |
| **SYR** | 98 | syr duo dfr, drufi fr filter, syr druckminderer je 100–1.000 | 0 · 0 · 0 | gut: Drufi-Einsätze alt und neu, Filtertasse, HWS-2000-Gewebefilter (163) | Teilelisten in den Anleitungen | **4** |
| **Grünbeck** | 138 (+144) | grünbeck boxer kdx 100–1.000 | 0 · 0 · 0 | mittel: 101272E (119), 101632E (72), Dichtungssatz, Wartungskit VGX | Katalog nur mit Login | **5** |
| Kemper | 128, fast alles Frosti und Außenarmatur | — | 0 · 0 · 1 | — | — | zu „Wasser im Garten“ |
| Conel, Aqmos | über Produktbegriffe / 47 | — | OTTO: Aqmos 2 | Aqmos-Filter mit 189 Bewertungen | — | nur als Zeile |
| Riegler, Oventrop | nicht abgefragt | — | Contorion 10 / 13 | nicht geprüft | Riegler- und Oventrop-Datenblätter mit Filtereinsatz-Nummern | als Partnershop-Zeile in `filtereinsatz` |
| Brita, Waterdrop, Alb | Kannen, Untertisch, Wasserhahn | — | OTTO einzelne | sehr viele | — | nicht verfolgen |

### Reihenfolge der Marken-Dateien

1. **Judo** (`data/ersatzteile/judo.json`). Breiteste Nachfrage nach Modellen und Teilen (i-soft, GUBI-E, JUKO, Helvetia, Profi), Teilelisten in den Anleitungen, Amazon gut abgedeckt. Fehlercodes 1–3 aus der i-soft-Anleitung tragen die Fehler-Problemseite.
2. **BWT** (`bwt.json`). Die meisten Vorschläge und die stärksten Amazon-Treffer. Nachteil: kein öffentlicher Katalog, die Zuordnung Gerät → Einsatz muss aus Anleitungen und Händlerangaben kommen (Sicherheitsstufe `zwei_quellen`).
3. **Resideo** (`resideo.json`). Beste Datenlage überhaupt, und die Geräte (F76S, HS10S, D06F, FF06) stecken in sehr vielen Häusern. Startet zusammen mit `druckminderer-einsatz`. Amazon schwächer als bei Judo und BWT.
4. **SYR** (`syr.json`). Klare Teilelisten, die Verwechslung Drufi/Drufi+ ist ein gutes „welches passt?“.
5. **Grünbeck** (`gruenbeck.json`). Viel Nachfrage, aber die Hälfte betrifft softliQ-Enthärtung, die Kundendienst-Sache ist, und der Katalog ist gesperrt.

## 7. Nicht verfolgt

- **Untertisch-, Wasserhahn- und Kannenfilter, Osmose:** Fragen nach „welcher ist der beste“, kaum Teile mit Nummer. Untertisch- und Wasserhahnfilter vermischen sich mit dem Perlator (`/ersatzteile/perlator` gibt es schon). Osmose meint meist Aquarium und Fensterreinigung. Bei Amazon dominieren Waterdrop und Brita mit Zehntausenden Bewertungen.
- **Kalkschutz ohne Salz** (physikalische Kalkwandler): Wirkung umstritten, Vorschläge fast nur „Test“ und „Erfahrungen“, keine Ersatzteile. Höchstens eine häufige Frage in `regeneriersalz`.
- **Einbau** von Filter, Druckminderer und Enthärtungsanlage, „einbauen kosten“: Sache des eingetragenen Installateurs (Abschnitt 4).
- **Wartungsverträge, Umlage auf Mieter, steuerliche Absetzbarkeit:** viele Vorschläge („wartung enthärtungsanlage umlagefähig“), aber kein Teil und kein „welches passt?“.
- **Heizungswasser** (Füllkombination, Vollentsalzung, Systemtrenner Heizung): Heizung, Fachbetrieb.
- **Dosieranlagen** (Phosphat, Mineralstoff): 24 Vorschläge mit Absicht, Nachfüllmittel bei Amazon (BWT Mineralstoff). Erst, wenn BWT steht, als Abschnitt dort.

## 8. Empfehlung

**Dachfenster vorziehen. Wasserfilter & Enthärtung auf Rang 2, im kleineren Zuschnitt.**

Gründe:

1. **Kaufbarkeit.** Wasserfilter-Teile gibt es nur bei Amazon. hagebau führt 0 Artikel, Contorion zwei Nebenmarken. Dachfenster dagegen: 667 VELUX-Artikel bei hagebau, 123 Dachfenster-Artikel bei OTTO. Rollladen: 45 · 166 · 160. Nach `BEREICHE-REIHENFOLGE.md` 2.3 ist das ein harter Punkt.
2. **Selbermachen.** Im Bad tauscht man Kartusche und Füllventil selbst. Am Hausanschluss bleiben Rückspülen, Einsatz tauschen (mit Vorbehalt) und Salz. Die halbe Nachfrage (Enthärtung) endet beim Kundendienst.
3. **Nachfrage ist da, aber nicht belegt.** Die Vorschläge zeigen für Rückspülfilter und Enthärtungsanlage so viele Reparaturfragen wie für Velux und Rollladen. Planner-Stufen fehlen für die Kernbegriffe. Nur der Druckminderer-Teil ist mit 1.000–10.000 belegt, und den gibt es schon.

**Kleiner Zuschnitt heißt:** Bereich mit Druckminderer, dazu die fünf A-Seiten (`filtereinsatz`, `rueckspuelfilter-tropft`, `regeneriersalz`, `enthaertungsanlage-verbraucht-kein-salz`, `/ratgeber/rueckspuelfilter`) und die Marken Judo, BWT, Resideo. Das sind rund neun Seiten, die alle über Amazon verkaufen. B und C erst, wenn die Search Console Impressionen zeigt.

Ob Rollladen ebenfalls vor Wasserfilter gehört, entscheidet die Rollladen-Prüfung. Die Feeds sprechen dafür, die Frage nach dem Motor (Elektroanschluss) dagegen.

Vor dem Start, unabhängig von der Reihenfolge: **Planner-Abfrage nachholen** mit diesen Startbegriffen: rückspülfilter, hauswasserfilter, wasserfilter hausanschluss, filtereinsatz rückspülfilter, hauswasserstation, enthärtungsanlage, wasserenthärter, regeneriersalz, salztabletten enthärtungsanlage, enthärtungsanlage salz, judo, bwt, grünbeck, syr drufi, honeywell f76s. Liegt „rückspülfilter“ unter 1.000 im Monat, fällt der Bereich hinter Rollladen.

## 9. Grenzen der Daten

- **Keine Planner-Zahlen für die Kernbegriffe.** Die Stufen in diesem Dokument stammen aus dem Sanitär-Export und betreffen nur Druckminderer, Rückflussverhinderer und einzelne Gerätenamen. Alles andere ist Breite der Suchvorschläge, keine Menge.
- **Suchvorschläge sind keine Nachfrage.** Die a–z-Erweiterung bläht große Themen auf, und Marken mit vielen Zusätzen (15 statt 7) bekommen mehr Vorschläge als Produktbegriffe. Marken nur untereinander vergleichen.
- **Mehrdeutige Begriffe.** „filtereinsatz“, „filterkartusche“, „kalkfilter“ und „osmoseanlage“ sind voll von Dunstabzug, Pool, Kaffeemaschine und Aquarium; „honeywell“ und „kemper“ von Thermostaten, Klingeln und Landmaschinen. Die Absicht-Zählung filtert das nur grob.
- **Feed-Zählung nach Name und Markenfeld.** Ein Artikel, der weder „Rückspülfilter“ noch „Enthärtung“ noch die Marke im Namen trägt, fehlt. Dass Judo, BWT und Grünbeck in allen drei Feeds fehlen, ist trotzdem eindeutig (auch über den Produktnamen gesucht). Stand der Feeds: 4.11.2026.
- **Amazon nur stichprobenhaft**, 30 Suchen, Bewertungszahlen und Preise vom 4.11.2026. Bewertungen eines Angebots können sich auf mehrere Varianten beziehen.
- **Google-Ergebnisse** aus einer Abfrage ohne Anmeldung, eine Seite je Begriff. Kein Ranking-Werkzeug.
- **Rechtliche Grenze nicht abschließend.** Ob der Tausch eines Filtereinsatzes eine „wesentliche Veränderung“ nach § 12 AVBWasserV ist, sagt keine gefundene Quelle. Die Intervalle aus DIN EN 806-5 (Tabelle A.1) sind nur über Hersteller-Zitate belegt, der Normtext lag nicht vor.
- **Search Console nicht ausgewertet.** Ob `/ratgeber/druckminderer` schon Impressionen für Filter-Begriffe hat, wäre der schnellste Beleg für die Nachfrage.
- **Dachfenster und Rollladen nur angerissen.** Für sie sind nur Suchvorschläge und Feed-Zählung gemacht, nicht die Prüfung nach Abschnitt 4. Die Empfehlung, Dachfenster vorzuziehen, steht unter diesem Vorbehalt.

## Quellen

- § 12 AVBWasserV: https://www.gesetze-im-internet.de/avbwasserv/__12.html
- Resideo Ersatzteilkatalog SHK 2022/23: https://infomaterial.resideo.com/fileadmin/publications/Ersatzteilkatalog-resideo-SHK-2022_23-ge6h0992ge23r0322.pdf
- SYR Drufi+ DFR/FR, Anleitung mit Teileliste: https://www.syr.de/Daten_Produkte/PDF/Bedienungsanleitung/Englisch/9.2315.40_1902_en_2019-08-14.pdf
- Judo i-soft safe, Einbau- und Betriebsanleitung: https://www.unidomo.de/tpl/download/Judo_i-soft_Betriebsanleitung.pdf
- Grünbeck Boxer RD, Betriebsanleitung (DIN EN 806-5, Rückspülung durch den Betreiber): https://www.heizungsdiscount24.de/pdf/Gruenbeck-Rueckspuelfilter-BOXER-RD-3-4-1-1-1-4-Betriebsanleitung.pdf
- Grünbeck Ersatzteilkatalog (Login): https://etk.gruenbeck.de/
- DIN EN 806-5:2012-04: https://www.dinmedia.de/de/norm/din-en-806-5/143524208

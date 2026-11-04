# Dachfenster: Analyse und Seitenplan

Stand: 4. November 2026. Prüfung nach `BEREICHE-REIHENFOLGE.md` Abschnitt 4 für den Bereich, der nach `KEYWORDS-WASSERFILTER.md` auf Rang 1 vorrückt (Hauptbereich „Fenster & Türen“). Aufbau wie `KEYWORDS-SANITAER.md` und `KEYWORDS-WASSERFILTER.md`, Seitentypen und URLs nach `SEITENAUFBAU.md` Abschnitt 2a. Gebaut ist noch nichts.

## Kurzfassung

- **Der Bereich trägt, und er hat das beste „welches passt?“ aller bisher geprüften Bereiche.** Der Größencode auf dem Typenschild (VELUX MK04, Roto 074/118 bzw. 7/11, FAKRO 78×118) entscheidet über jedes Zubehör. VELUX hat das System zweimal umgestellt (bis 1991, 1991–2013, ab 2013): Dieselbe Fenstergröße heißt 304, M04 oder MK04. Genau diese Verwechslung suchen die Leute („velux ggl 306 neue bezeichnung“, „velux m04 vs mk04“, „velux typenschild alt“).
- **Kaufbarkeit ist so gut wie in keinem anderen Bereich.** hagebau führt **667 VELUX-Artikel**, alle mit EAN, davon 498 Verdunkelungsrollos (Median 113 €), 49 Plissees, 14 Hitzeschutz-Markisen und 9 Insektenschutzrollos. OTTO hat rund 87 Dachfenster-Artikel (VELUX, Roto, Nachbauten). Contorion hat **keinen**. Bei Amazon gibt es Originalteile mit hohen Bewertungszahlen (VELUX-Rollos 2.280 bis 4.778, Hitzeschutz-Markise 2.509, Teleskopstange ZCT 200K 4.832, Pflege-Set ZZZ 220 439) und Nachbauten „kompatibel mit VELUX SK06“ (Itzala 13.688).
- **Selbst machen:** Sonnenschutz, Insektenschutz, Dichtungen, Lüftungsfilter, Pflege, Akku, Fernbedienung ja. Fenstertausch, Eindeckrahmen und 230-V-Anschluss nein. Einbau-Seiten nur für innen montiertes Zubehör.
- **Neuer Seitentyp: Größenseite je VELUX-Code** unter dem bestehenden Serien-Pfad, `/ersatzteile/velux/mk04`. Eine Seite fasst alle drei Code-Generationen und alle Fenstertypen dieser Größe zusammen. Anfangs 8 Seiten, später bis 16. Für Roto und FAKRO keine Größenseiten, nur Tabellen auf der Markenseite.
- **Rund 14 Seiten in Priorität A:** Bereich, Rollo, Hitzeschutz, Dichtung & Pflege, Akku, drei Probleme, ein Ratgeber, die Marken VELUX und Roto und die ersten Größenseiten.
- **Marken:** VELUX, Roto, FAKRO, Braas.

## Datengrundlage

- **Google Keyword Planner:** Für Dachfenster gibt es keinen Export. Im Gmail liegt keiner (Suche nach Planner-Mails der letzten 30 Tage: leer). Die fünf Exporte in `~/Downloads/Hausbauhero` (4.11.2026) enthalten keine Zeile mit Velux, Dachfenster, Roto, Fakro, Rollo oder Plissee. **Alle Nachfrageangaben unten sind Breite der Suchvorschläge, keine Menge** (Abschnitt 9).
- **Google-Suchvorschläge**, abgerufen am 4.11.2026 (hl=de, gl=de): 77 Startbegriffe (Produkte, Teile, Fehlerbilder, Größencodes, Marken) mit a–z, ä/ö/ü und sieben Zusätzen („welches“, „welche“, „passt“, „ersatzteile“, „wechseln“, „reparieren“, „defekt“), dazu 30 Einzelabfragen zu weiteren Codes und Fenstertypen. **2.879 Abfragen, 8.018 verschiedene Vorschläge, davon 2.647 mit Reparatur- oder Kompatibilitätsabsicht.** Gezählt wird ohne den Startbegriff selbst. Größencodes zählen nicht als Absicht, sie sind gesondert ausgewertet (Abschnitt 1, Tabelle „Größencodes“).
- **Awin-Feeds** hagebau, Contorion und OTTO (Download vom 4.11.2026, `.cache/awin-probe/*-voll.csv.gz` im Haupt-Checkout). Gezählt nach `brand_name` und Produktname (Velux, Roto, Fakro, Braas, Dachfenster), ohne Fremdtreffer (Roto-Werkzeuge bei Contorion, „Veluxis“-Malerbedarf bei OTTO, Bodentreppen, Wohnmobil-Dachluken).
- **Amazon:** 26 Suchen auf amazon.de im eingebauten Browser, je die ersten acht Treffer (Titel, ASIN, Bewertungszahl, Preis).
- **Google-Ergebnisse:** 24 Suchen auf google.de (hl=de, gl=de), erste Seite, für Konkurrenz und Herstellerunterlagen.
- **Herstellerunterlagen:** VELUX-Seite „Typenschild“, Roto-Seite „Typenschild“, FAKRO „Größe prüfen“, VELUX-Größentabelle mit drei Generationen (home4u.de, deckungsgleich mit den alten Codes im hagebau-Feed), VELUX-Anleitung Austausch Motor/Solarzelle (V22).

Rohdaten liegen außerhalb des Repos im Notizordner dieser Sitzungsgruppe, Unterordner `keywords-dachfenster` (`suggest.json`, `absicht.json`, `codes.txt`, `zaehlung.json`, `*-dachfenster.json` je Shop, `amazon.md`).

## 1. Nachfrage

### Produktarten und Teile

Spalten: **Vorschläge** = alle Vorschläge zum Startbegriff; **mit Absicht** = davon mit Reparatur- oder Kompatibilitätsabsicht.

| Startbegriff | Vorschläge | mit Absicht | Was gefragt wird |
|---|---|---|---|
| velux rollo / dachfenster rollo | 276 / 287 | 120 / 72 | ausbauen, einbauen, Schnur einfädeln, reparieren, Ersatzteile, nachrüsten, „passt nicht“, „neues velux rollo passt nicht rein“, ohne Bohren, für Roto |
| velux verdunkelungsrollo / dachfenster verdunkelungsrollo | 238 / 137 | 95 / 25 | einbauen, ausbauen, reparieren, klemmt, Montageanleitung, „mit hitzeschutz“, „universal“, „nach maß“, „kompatibel mit velux“ |
| roto rollo | 158 | 50 | Feder spannen, Fernbedienung, Exclusiv ZRE, ausbauen, Schnur einfädeln |
| velux plissee / dachfenster plissee | 183 / 136 | 36 / 23 | Montage, ausbauen, ohne Bohren, Saugnapf, zum Kleben |
| velux hitzeschutz / velux markise | 203 / 187 | 22 / 26 | Markise MHL, Haltekrallen, H-Krallen, „mhl sk00 5060“, Markisenkasten Ersatzteil, Montage |
| velux rollladen / dachfenster rollladen / roto rollladen | 263 / 187 / 135 | 106 / 69 / 62 | Fernbedienung reagiert nicht, Reset, nachrüsten, Montageanleitung, Endlage einstellen, Motor tauschen, „entspannen“, Ersatzteile vor 2000 |
| velux solar / velux akku | 265 / 126 | 89 / 98 | Akku tauschen, Akku 946933, „10,8 V 1900 mAh“, original, Reset, einlernen |
| velux motor / velux fernbedienung / velux integra | 176 / 223 / 237 | 125 / 107 / 58 | Batteriewechsel, anlernen, Reset, funktioniert nicht, nachrüsten, KLI 310, KLR 200, Regensensor |
| velux insektenschutz / dachfenster fliegengitter | 164 / 225 | 32 / 33 | Ersatzkassette, „Netz gerissen“, Montageanleitung, Plissee, ohne Bohren, magnet |
| velux dichtung / dachfenster dichtung | 108 / 124 | 88 / 61 | erneuern, Dichtungssatz, Lüftungsklappe, Griffleiste, Eindeckrahmen, außen, innen |
| velux griff / dachfenster griff | 92 / 102 | 71 / 41 | Griffleiste austauschen, abschließbar, locker, abgebrochen, Verlängerung |
| velux feder / velux scharnier / velux kette | 72 / 39 / 19 | 68 / 28 / 15 | Feder tauschen, Federspannung einstellen, Scharnierfett, Kettenantrieb entriegeln |
| velux lüftungsklappe / velux filter | 62 / 34 | 24 / 30 | Dichtung, Filter wechseln, schließt nicht, Regen, Insekten |
| velux wartung / dachfenster wartung | 33 / 21 | 23 / 8 | Wartungsset ZZZ 220, Kosten, „umlagefähig“ |
| velux scheibe / dachfenster scheibe | 54 / 54 | 44 / 33 | austauschen Kosten, gerissen, geplatzt, Versicherung, Scheibenmaße |
| velux flügel | 40 | 33 | aushängen, einhängen, austauschen, einstellen, entspannen |
| dachfenster austauschen / velux fenster austauschen | 136 / 30 | 51 / 21 | Kosten, Förderung, „in der nähe“, „wer macht das“, „ohne rahmen“ |
| velux eindeckrahmen | 175 | 21 | Einbauanleitung, Biberschwanz, EDW/EDZ, Ersatzteile |

### Fehlerbilder

| Startbegriff | Vorschläge | mit Absicht | Was gefragt wird |
|---|---|---|---|
| dachfenster klemmt / velux klemmt | 41 / 49 | 26 / 47 | beim Öffnen, beim Schließen, „was tun“, Rollo klemmt, Verdunkelungsrollo klemmt unten |
| dachfenster lässt sich nicht öffnen / schließen | 22 / 11 | 18 / 8 | Griff blockiert, Solar, manuell öffnen, Lüftungsklappe, Rollladen |
| dachfenster undicht / velux undicht / velux tropft | 90 / 36 / 10 | 33 / 34 / 10 | bei Starkregen, bei Schnee, Ecke, am Gelenk, beim Öffnen, Eindeckrahmen, „welcher handwerker“, Versicherung |
| dachfenster kondenswasser | 26 | 16 | auffangen, Ablauf, im Rahmen, Schimmel |
| dachfenster zieht | 13 | 2 | „zieht es rein“, am Rahmen, abdichten |

### Größencodes

Gezählt sind alle 8.018 Vorschläge, in denen der Code vorkommt.

| Code | Vorschläge | Was gefragt wird |
|---|---|---|
| SK06 (114×118) | 259 | Maße, Rollo, Verdunkelungsrollo, Innenfutter, Solar-Rollladen, Datenblatt |
| MK04 (78×98) | 230 | Maße, Einbauanleitung, Rollo, „mk04 und mk06“, „78x98“ |
| CK02 (55×78) | 189 | Rollo, Maße, Einbauanleitung, GGU, Eindeckrahmen, Solar |
| MK06, SK08, MK08, UK08, PK06, CK04, FK06, PK08 | 32 bis 18 | je Maße, Rollo, Verdunkelungsrollo, Datenblatt, Innenfutter |
| alte Codes M06, S06, S08, C02, M04, 306, 606 | 3 bis 14 | „m04 vs mk04“, „s06 vs sk06“, „606 s06“, „ggl 306 neue bezeichnung“, „ggl 406 neue bezeichnung“, „gpl 608 neue bezeichnung“ |
| Roto 7/11, 6/11, 7/14, 9/14 | je 10 Vorschläge auf Einzelabfrage | Maße, Rollo, Verdunkelungsrollo, Baureihe (R8, 410c, 847, 735) |
| FAKRO 78×118, 66×118, 78×140 | je 10, überwiegend polnisch | Rollo, „roleta“, Baureihe (FTP, ARF) |

Dazu „welches velux dachfenster habe ich“, „welches roto dachfenster habe ich“, „velux typenschild“ (48 Vorschläge: Erklärung, Baujahr, alt, finden, fehlt), „velux größentabelle“ (alt, pdf, ggu) und „rollo für velux ggu sk08“, „rollo für velux dachfenster ggl 306“.

### Original oder Nachbau

27 Vorschläge mit „original“ (Rollo, Akku, Markise, Plissee), 10 mit „kompatibel“ („verdunkelungsrollo velux kompatibel“, „dachfenster hitzeschutz markise kompatibel mit velux“), 7 mit „alternative“, 3 mit „nachbau“, 19 mit „günstig“. Die Frage ist da, aber kleiner als die Code-Frage. Sie gehört auf jede Teileart- und Größenseite, nicht auf eine eigene.

### Marken

| Marke | Vorschläge mit Absicht | Was gefragt wird |
|---|---|---|
| VELUX | 1.778 (alle Vorschläge mit Absicht, die „velux“ enthalten) | alles oben; dazu „velux ersatzteile vor 2000 / vor 1991“, Katalog, Eindeckrahmen |
| Roto | 375 | Ersatzteile alte Modelle, „bleibt nicht offen“, einstellen, Kundendienst, WDF 847 und R85 Ersatzteile, Explosionszeichnung |
| Braas | 75 | Ersatzteile Scheibe, Griffhebel, Rollladen, Dichtung, „austauschen gegen velux“ |
| FAKRO | 29 | Rollo, Größen, Ersatzteile, Bodentreppe (gehört nicht hierher) |

Braas fragt zur Hälfte nach dem Tausch gegen VELUX. Braas-Dachfenster werden nicht mehr verkauft (nicht beim Hersteller geprüft, Abschnitt 9).

## 2. „Welches passt?“

| Hersteller | Was er veröffentlicht | Beispiel |
|---|---|---|
| **VELUX** | Typenschild-Erklärung mit Fundort je Produkt (Fenster: hinter der Griffleiste rechts oder links; Rollo: Aufkleber auf der Rückseite; Rollladen: Topkasten oder unterste Lamelle) und Produktionscodes je Jahr (AX = 2009, BI = 2019, BT = 2026). Größenraster für Fachkunden mit PDF. Montageanleitungen je Zubehör, Austauschanleitung Motor/Solarzelle. | Fenster `GGL MK04` = Typ GGL (Holz, Schwingfenster), Größe MK04 (78×98 cm). Dieselbe Größe hieß 1991–2013 `M04` und davor `304` (bzw. 043 oder Y43). Zubehör trägt den Code mit: Verdunkelungsrollo `DKL MK04 1100S`, Markise `MHL MK00 5060`. Die Markise mit „00“ passt auf alle Höhen einer Breite (MK04 bis MK10). |
| **Roto** | Typenschild-Seite mit Fundort je Baureihe (Putzstellung, hinter roter Klappe oder auf grauer Platte), Baureihen (Designo R8/R6/i8, R7/R4, RotoQ). Ersatzteilservice im eigenen Shop. | Größe als Breite/Höhe in cm am Blendrahmen: alt `7/11`, neu `074/118`. Zubehör ist an Baureihe und Größe gebunden (dachfensterinfo.de); WDF 73 und R7 teilen sich Gleiterführung und Gleitbolzenlager (Amazon-Titel der Originalteile). |
| **FAKRO** | Seite „Größe prüfen“: Typenschild am Flügel mit Typ, Größe, Typenschildnummer. Ohne Schild: Außenmaß des Flügels messen. | Größe direkt als Maß, `78×118`; dazu die Baureihe (FTP, FTS, PTP, ARF für Rollos). |
| **Braas** | nichts gefunden | — |

**Passt Zubehör herstellerübergreifend?** Original-Zubehör nein: VELUX-Rollos hängen in VELUX-Zubehörträgern (Pick & Click, ab 2013 vormontiert) oder auf Haltekrallen (ZOZ 137), Roto-Rollos in Roto-Schienen. Nachbauten lösen das auf zwei Arten: als Rollo mit eigenen Schienen „für VELUX MK04“ (Itzala, DTCH, Cocoon Home) oder als Plissee „ohne Bohren“ zum Kleben oder Klemmen nach Glasmaß (Lichtblick Haftfix, Gardinia, ventanara). Für Roto und FAKRO gibt es nur Nachbauten „nach Maß“ oder „für Roto 7/11 = 52 × 96 cm“.

**Was die Größe allein nicht klärt:** Der Fenstertyp (GGL/GGU vs. GPL/GPU Klapp-Schwingfenster, GZL, alte VL/VU) und die Generation. Ein DKL für MK04 passt nicht auf ein M04-Fenster ohne Zubehörträger; VELUX führt für ältere Fenster eigene Varianten (DKL mit grauen Schienen, „Classic“ DBL/DKL für M04). Die alten Y-Codes (Y43, Y85) sind die Fenster VL/VU/VKU vor 1991 mit eigenem Zubehör. Genau diese Unterscheidung fehlt bei den Shops, die nur eine Größenliste zeigen.

**Fazit:** Die Datenlage ist gut, für VELUX sehr gut. Die Zuordnung Code → Zubehörtyp → EAN steht im hagebau-Feed für etwa die Hälfte der Artikel schon im Namen (377 von 667 mit Typ und Code, davon 161 neue Codes, 133 alte Buchstabencodes, 56 Y-Codes). Bei den übrigen 290 steht nur „Verdunkelungsrollo weiß“; sie lassen sich nur über die EAN zuordnen.

## 3. Kaufbarkeit

### Awin-Feeds (4.11.2026)

| | hagebau | Contorion | OTTO |
|---|---|---|---|
| Dachfenster-Artikel gesamt (bereinigt) | 781 | 0 | rund 87 |
| davon VELUX | 667 | 0 | 6 |
| davon Roto / FAKRO | 0 / 0 | 0 / 0 | 3 / 0 |
| Nachbau und Fremdmarken | Lichtblick 72 (Plissee, Sonnenschutz Haftfix/Thermofix), Gardinia 3 | — | Gardinia 14, Lysel 8, Clanmacy 8, ventanara 5, Plisseeonline 3, Cocoon Home 2 |
| Verdunkelungsrollo | 498 VELUX, Median 113 € | — | 24, Median 40 € |
| Plissee | 70 (VELUX 49), Median 133 € | — | 22, Median 29 € |
| Hitzeschutz-Markise | 14 VELUX, Median 112 € | — | 2 VELUX |
| Insektenschutz | 9 VELUX, Median 195 € | — | 11 (Schellenberg, empasa, tesa) |
| Rollo (Sichtschutz, Raffrollo), Jalousie | 38 Rollo, 58 Jalousie PAL | — | 9 |
| Ersatzteile (Bedienstange, Gleiterführung, Dichtung) | 0 | 0 | VELUX ZCZ 080, ZCT 200K; Roto 333911 Gleitführung, Roto Teleskopstab; Dichtungsband „Velux kompatibel“ |
| Fenster, Eindeckrahmen | 0 | 0 | 1 VELUX Dachausstieg GVK |

Häufigste Codes im hagebau-Feed: FK06 19, SK08 18, SK06 17, MK06 17, MK10 16, UK08 16, MK04 16, PK06 16, PK08 15, MK08 14, CK04 14, CK02 13, SK10 13, PK10 13 (nur Treffer im Namen).

**Folge:** hagebau trägt den Sonnenschutz (Rollo, Plissee, Markise, Insektenschutz), aber **keine Ersatzteile und keine Elektrik**. Akku, Fernbedienung, Dichtung, Griff, Pflege-Set gibt es nur bei Amazon und vereinzelt bei OTTO. Contorion fällt ganz aus.

### Amazon (Stichprobe 4.11.2026)

Bewertungen gelten bei Amazon oft für alle Varianten eines Angebots; die Zahl steht deshalb je Angebot, nicht je Größe.

| Teil | ASIN (Beispiel) | Bewertungen | Preis |
|---|---|---|---|
| VELUX Verdunkelungsrollo DKL, weiße Schienen (MK04, FK06, SK06 …) | B0842B94MK | 2.280 | 81–123 € |
| VELUX DKL, graue Schienen (M06, S08 …) | B002RKQ4Z6 | 4.624 | 91–116 € |
| VELUX Verdunkelungsrollo Classic (C02, S08 …) | B07P8755LJ | 4.778 | 49–81 € |
| VELUX Hitzeschutz-Markise (M/MK, S/SK, U/UK) | B0018M9F9G, B0018MBD32, B00GY81BZK | 2.509 | 120–131 € |
| VELUX Plissee (M06, P08, MK06) | B0018M612U | 233 | 122–140 € |
| VELUX Insektenschutzrollo | B094RHWNNK | 757 | 162 € |
| VELUX Pflege-Set ZZZ 220 / 220K | B00N33F1ZA, B004UK5C7W / B00N33EXN6 | 439, 610 / 171 | 35 € |
| VELUX Scharnierfett 30 g | B09HVNSZPK | 220 | 10 € |
| VELUX Luftfilter Lüftungsklappe / Schaumdichtung Lüftungsklappe | B08L9GJQC9 / B00EV0JRD6 | 173 / 401 | 15 / 39 € |
| VELUX Teleskop-Bedienstange ZCT 200K | B005DQJR50 | 4.832 | 38 € |
| VELUX Wandschalter KLI 313 / KLI 310 / Funktaster KLI 110 | B07R2BHHWK / B0818XT78V / B00R6BERBY | 248 / 215 / 12 | 44–61 € |
| VELUX KLR 200 / KLR 300 / App Control KIG 300 | B00CYQX546 / B0FD3G9QGL / B093LTPZ9N | 59 / 62 / 613 | 529 / 128 € / — |
| VELUX Haltekrallen ZOZ 137 | B0018M7QSI | 24 | 23 € |
| Roto Verdunkelungsrollo ZRV (Original) | B08KTKWRMC, B0CVXW14RQ | 95, 44 | 155–227 € |
| Roto Gleiterführung WDF 73/R7, Flügeldichtungssatz (Original) | B09ZFBMFP2, B08ZSVBCDS | 43, 27 | 22 / 82 € |
| Nachbau-Rollo „kompatibel mit VELUX SK06“ (Itzala) | B0D2J1GRM5 | 13.688 | 73 € |
| Nachbau-Rollo „für VELUX M06/306/14“ (DTCH) | B0BFXDNSY7 | 1.052 | 55 € |
| Nachbau „für Roto 7/11 = 52 × 96 cm“ / „für FAKRO 78/118“ (Bloc) | B089T72MY1 / B01FQXK6Q8 | 1.048 / 1.083 | 15 / 59 € |
| Nachbau-Akku 946933 für VELUX Solar | B0H7JZHFNB, B0BH2YWLLL | 291, 127 | 25–37 € |

Nicht gefunden: der Original-VELUX-Akku 946933, Original-FAKRO-Zubehör, Braas-Teile. Regel aus `kaufbarkeit.md`: ASIN nur, wenn die Originalmarke auf der Produktseite steht; Nachbauten nur mit ihrer eigenen Marke und dem Hinweis „Nachbau“.

**Warenkorb:** Rollo 50–230 €, Plissee 20–140 €, Markise 100–160 €, Insektenschutz 50–200 €, Akku 25–50 €, Wandschalter 45–60 €, Pflege-Set 35 €. Höher als im Bad bei vergleichbarem Selbermach-Anteil. Wiederkehrend: Akku (alle paar Jahre), Pflege-Set und Filter.

## 4. Konkurrenz

Erste Google-Seite, 4.11.2026:

| Suchbegriff | Wer rankt |
|---|---|
| velux mk04 rollo | dekologi, raumtextilienshop, dachfenstershop, amazon, idealo |
| velux größentabelle | velux.de, dach-shop24, Hornbach-Datenblatt, home4u, contenthub.velux.com, lokaleprofis, dachfenstershop |
| velux typenschild | velux.de, ersatzteile.veluxshop.de, meurer-shop, dachfenster.one, dach-shop24, dekologi, dachfenster-retter, lokaleprofis |
| velux ggl 306 neue bezeichnung | dachfenstershop, dachfenster.one, ersatzteile-dachfenster.de, home4u, perfekt-bau, amazon, Hornbach-Datenblatt, faltstore-express, dekologi |
| velux ersatzteile | ersatzteile.veluxshop.de, velux.de, meurer-shop, dach-shop24, dachfensterwelt, veluxshop.de |
| velux solar rollladen akku tauschen | ersatzteile.veluxshop.de (PDF), dachfensterwelt, derselbermacher, smarthomereh, dach-shop24, smarthomeassistent, meurer-shop |
| velux fernbedienung anlernen | handwerkerwissen, meurer-shop, tls-dachfenster, ersatzteile.veluxshop.de, haustechnikdialog, velux.de, youtube |
| velux rollo reparieren | velux.de, lichtwunder, dachfensterwelt, tls-dachfenster, meurer-shop, bunse-dachfenster |
| velux dichtung wechseln | youtube, dachfensterwelt, graf-dichtungen, velux.de, profishop-dachfenster |
| dachfenster klemmt | obi, dachfensterinfo, reddit, velux.de, facebook, gutefrage, haustechnikdialog, dachfenster-retter |
| velux dachfenster undicht | velux.de, bunse-dachfenster, expertenforum-bau, reddit, graf-dichtungen, bauexpertenforum, lichtwunder |
| roto dachfenster ersatzteile | roto-frank.com, roto-store.de, meurer-shop, amazon, roto-spareparts.com, dachfensterwelt |
| roto größentabelle | home4u, dachfenster-preise, roto-frank.com, roto-store, dachfenster-austauschen, Dachdecker |
| fakro rollo 78x118 | shop.fakro.de, raumtextilienshop, heimtextilien, amazon, dekologi, window-fashion, hornbach, dachfenster-rollo.de |
| dachfenster rollo kompatibel velux | sundiscount, dachfenster-rollo-shop, veluxshop.de, amazon, avosdim |

Das Feld ist voll, aber zersplittert: Fachshops für Dachfenster-Zubehör (dachfensterwelt, meurer-shop, dach-shop24, dachfenstershop, dekologi) mit Ratgeberseiten, Ratgeberportale von Händlern (home4u, dachfensterinfo, lichtwunder) und die Hersteller selbst. Kein Treffer verbindet „welcher Code“ mit „welcher Zubehörtyp passt zu welcher Generation“ und einem neutralen Preisvergleich Original/Nachbau. Die Hersteller-Shops (veluxshop.de, ersatzteile.veluxshop.de, roto-store.de, shop.fakro.de) sind nach Grundsatz 11 nie Linkziel, ihre PDFs und Typenschild-Seiten nur als Quelle im eingeklappten Block.

## 5. Grenzen: was darf man selbst?

- **Ja, ohne Vorbehalt:** Rollo, Plissee, Jalousie, Insektenschutz innen montieren und tauschen (VELUX Pick & Click, Haltekrallen; Montageanleitungen der Hersteller richten sich an Endkunden). Dichtungen und Lüftungsklappen-Filter erneuern, Scharniere fetten, Pflege-Set (VELUX ZZZ 220 ist ein Endkundenprodukt). Flügel aus- und einhängen (Hersteller-Anleitung).
- **Ja, mit Hinweis:** Hitzeschutz-Markise außen. Sie wird bei VELUX von innen bei geöffnetem Fenster eingehängt, man steht nicht auf dem Dach; trotzdem Absturzgefahr beim Hinauslehnen. Solar-Rollladen: Akku und Solarzelle tauschen beschreibt VELUX in einer Anleitung (Austausch Motor/Solarzelle V22). Fernbedienung anlernen, Reset, Batteriewechsel: Bedienungsanleitung.
- **Nein, Fachbetrieb:** Fenstertausch, Eindeckrahmen, Anschluss an Dampfbremse und Dämmung. Für Privatleute gibt es kein Verbot am eigenen Haus, aber Arbeiten auf dem Dach mit Absturzgefahr, die Dichtheit der Dachhaut und die Herstellergarantie (nicht geprüft, Abschnitt 9) sprechen dagegen. Glasbruch: Austauschflügel über Kundendienst oder Fachbetrieb, Gewicht und Dichtheit. **Folge: keine Einbau-Seite für Fenster und Eindeckrahmen**, „dachfenster austauschen“ nur als Grenze im Bereich und in der Problemseite „undicht“.
- **Nein, Elektrofachkraft:** Elektrofenster und Rollläden mit 230-V-Anschluss (VELUX KMX/KMG, Steuerung KUX), Nachrüsten eines Netzanschlusses. Wie in `BEREICHE-REIHENFOLGE.md` Abschnitt 5 (Elektroinstallation). Solar- und Akkuprodukte ohne Netzanschluss sind davon nicht betroffen.

## 6. Seitentypen

Die vorhandenen Typen reichen fast:

- **Bereich** `/bereich/dachfenster` mit Zeichnung, im Hauptbereich „Fenster & Türen“.
- **Teileart** für Zubehör, das bei allen Herstellern vorkommt und am Code hängt: Rollo, Hitzeschutz, Insektenschutz, Dichtung, Akku. Die Größentabelle (`groessen`) ist hier die VELUX-Code-Tabelle mit allen drei Generationen.
- **Problem** für die Fehlerbilder.
- **Marke** für VELUX und Roto.
- **Ratgeber mit Auswahlhilfe** für die Frage „Welcher Sonnenschutz?“ (innen/außen, verdunkeln/Hitze/Insekten, manuell/Solar, Original/Nachbau).

### Neu: Größenseite je VELUX-Code (`/ersatzteile/velux/<code>`)

**Vorschlag:** Der Größencode wird bei VELUX wie eine Serie behandelt. Die Route `/ersatzteile/<marke>/<serie>` gibt es schon (`SEITENAUFBAU.md` Abschnitt 5), die Seite bekommt eine eigene Vorlage „Größe“.

**Titel:** „VELUX MK04: welches Rollo und welches Zubehör passt?“

**Inhalt:** Maß und alle Namen dieser Größe (MK04 = M04 = 304/043/Y43), wo das Typenschild sitzt, welche Fenstertypen es in dieser Größe gibt (GGL, GGU, GPL, GPU …) und welche Zubehörvariante zu welcher Generation passt. Darunter je Zubehörart (Verdunkelungsrollo, Plissee, Markise, Insektenschutz, Rollladen) das Original mit Typenbezeichnung (DKL MK04, MHL MK00, ZIL …), hagebau-Preis über EAN, Amazon-ASIN, und die Nachbauten mit ASIN. Häufige Fragen: „Passt ein MK04-Rollo auf mein M04-Fenster?“, „Warum heißt die Markise MK00?“.

**Warum eine eigene Seite und kein Filter:** Der Code ist nicht ein Merkmal wie Farbe (Grundsatz 10), sondern der Schlüssel, an dem jedes Zubehör hängt. Jede Codeseite hat andere Artikel, andere EANs und andere Preise. Die Nachfrage sucht genau so („velux sk06 rollo“, „velux mk04 maße“, „rollo für velux ggu sk08“, „velux ggl 306 neue bezeichnung“).

**Gegen dünne Seiten:**
- Eine Seite je **Maß**, nicht je Code. Alte Codes (M04, 304, Y43) sind Abschnitte und Suchbegriffe dieser Seite, keine eigenen URLs. Höchstens Weiterleitungen, wenn Suchanfragen sie zeigen.
- Keine Seite je Fenstertyp × Größe (kein `ggl-mk04`), keine je Farbe.
- **Indexiert nur**, wenn mindestens drei Zubehörarten mit Kaufmöglichkeit belegt sind (EAN im Feed oder geprüfte ASIN) und der Code in den Suchvorschlägen eigene Fragen hat. Sonst `noindex` und nur eine Zeile in der Code-Tabelle der Marke, wie bei den Serien heute.
- **Keine Größenseiten für Roto und FAKRO.** Roto hat im Feed 3 Artikel, FAKRO keinen, und die Fragen je Größe sind klein (Roto) oder polnisch (FAKRO). Dort reicht eine Tabelle auf der Markenseite.

**Seitenzahl:** 8 in der ersten Welle (MK04, MK06, MK08, SK06, SK08, CK02, PK06, FK06: die drei größten Suchcodes plus die häufigsten im hagebau-Feed), danach bis zu 8 weitere (CK04, UK08, PK08, MK10, FK04, FK08, UK04, SK10), wenn die Search Console Impressionen für die ersten zeigt. Mehr als 16 nicht: Die übrigen Codes (MK12, PK10, UK10, CK06 …) haben weder Vorschläge noch genug Artikel.

**Daten:** Die Größenseiten lesen eine Datei `data/ersatzteile/velux.json` wie die übrigen Marken, mit einem neuen Feld je Serie für Maß, alte Codes und Zubehör-Typenbezeichnungen. Das Schema ist mit dem Bau festzulegen, nicht in dieser Analyse.

## 7. Seitenplan

Priorität: **A** = als Erstes, wenn der Bereich startet (breite Nachfrage in den Vorschlägen und Teile bei hagebau oder mit ASIN), **B** = danach, **C** = später oder nur als Abschnitt.

| Ziel-URL | Seitentyp | Suchbegriffe (Breite) | Beleg | Prio |
|---|---|---|---|---|
| `/bereich/dachfenster` | Bereich „Dachfenster“ (Fenster & Türen) | — | Einleitung: Typenschild finden, Code lesen, was man selbst tauscht, wann der Dachdecker kommt. Grenze aus Abschnitt 5. | A |
| `/ersatzteile/velux` | Marke | velux ersatzteile (108), velux typenschild (32), velux größentabelle, „velux ersatzteile vor 2000 / vor 1991“, „welches velux dachfenster habe ich“ | Code-Tabelle mit allen drei Generationen, Fenstertypen, Typenschild-Fundorte, Zubehör-Typenbezeichnungen (DKL, DBL, FHL, PAL, MHL, ZIL, SSL). 667 Artikel bei hagebau. Führt auf die Größenseiten. | A |
| `/ersatzteile/velux/mk04`, `/mk06`, `/mk08`, `/sk06`, `/sk08`, `/ck02`, `/pk06`, `/fk06` | Größenseite (neu, Abschnitt 6) | velux sk06 (259 Vorschläge mit Code), mk04 (230), ck02 (189), mk06 (32), sk08 (29), mk08 (28), pk06 (24), fk06 (20); dazu „velux ggl 306 neue bezeichnung“, „velux m04 vs mk04“ | Je Code 13 bis 19 hagebau-Artikel im Namen, plus EAN-Zuordnung. Amazon: DKL, Markise, Plissee, Nachbauten je Code. | A |
| `/ersatzteile/dachfenster-rollo` | Teileart: welches Rollo passt (Verdunkelung, Sichtschutz, Plissee) | velux rollo (120), velux verdunkelungsrollo (95), dachfenster rollo (72), roto rollo (50), velux plissee (36), „rollo passt nicht“, „ohne bohren“, „kompatibel mit velux“ | Größte Gruppe im Feed (498 + 70 + 38 bei hagebau). Original (Zubehörträger, Haltekrallen, Generation) vs. Nachbau (eigene Schienen, Haftfix, Klemmfix). Roto ZRV und FAKRO ARF als Zeilen. | A |
| `/ersatzteile/dachfenster-hitzeschutz` | Teileart: Hitzeschutz-Markise außen und Hitzeschutz innen | velux hitzeschutz (22), velux markise (26), dachfenster hitzeschutz, „mhl sk00 5060“, „h-krallen“, „markise kompatibel mit velux“ | Code-Besonderheit „00“ (eine Markise für alle Höhen einer Breite). hagebau 14, Amazon 2.509. Saison: Frühjahr. | A |
| `/ersatzteile/dachfenster-dichtung` | Teileart: Dichtung, Lüftungsklappen-Filter, Pflege-Set | velux dichtung (88), dachfenster dichtung (61), velux filter (30), velux wartung (23), velux scharnier (28), „dichtung lüftungsklappe“ | Amazon: Pflege-Set ZZZ 220 (439 + 610 + 171), Scharnierfett (220), Luftfilter (173), Schaumdichtung (401), Roto-Flügeldichtungssatz. Keine Feed-Artikel. Führt auf `dachfenster-undicht`. | A |
| `/ersatzteile/dachfenster-akku` | Teileart: Akku für Solar-Rollladen und Solarfenster | velux akku (98), velux solar (89), „akku 946933“, „velux solar rollladen akku tauschen“, roto ZEL akku | Nur Nachbauten bei Amazon (291, 127, 72 Bewertungen), Original nicht gefunden. VELUX-Anleitung zum Tausch. Wiederkehrender Kauf. Generation (vor/ab Mai 2013) entscheidet über den Stecker; vor dem Bau prüfen. | A |
| `/problem/dachfenster-undicht` | Problem | dachfenster undicht (33), velux undicht (34), velux tropft (10), kondenswasser (16), dachfenster zieht (2) | Ursachen: Dichtung, Lüftungsklappe, Kondensat, Eindeckrahmen (Dachdecker). „Zieht“ als Abschnitt. Bei Google Foren, reddit, Dichtungshändler. | A |
| `/problem/dachfenster-klemmt` | Problem | dachfenster klemmt (26), velux klemmt (47), lässt sich nicht öffnen (18) / schließen (8), „bleibt nicht offen“ | Ursachen: Scharnier ohne Fett, Feder, Griffleiste, Flügel verzogen, Solar-Fenster im Fehlerzustand. Führt auf Dichtung & Pflege, Griff. Bei Google obi, Foren. | A |
| `/problem/dachfenster-rollladen-reagiert-nicht` | Problem | velux rollladen fernbedienung reagiert nicht, solar rollladen reset, velux fernbedienung funktioniert nicht, anlernen, „velux motor reset“ | 107 + 125 + 89 Vorschläge um Fernbedienung, Motor, Solar. Ursachen: Akku leer, Funk verloren, Reset nötig. Kauf: Akku, Wandschalter KLI (215, 248). Grenze: 230-V-Geräte Elektrofachkraft. | A |
| `/ratgeber/dachfenster-sonnenschutz` | Ratgeber mit Auswahlhilfe | welcher Sonnenschutz, „hitzeschutz innen oder außen“, „markise oder rollladen“, „verdunkelung und insektenschutz“, „original oder nachbau“ | Fragen: Zweck (verdunkeln, Hitze, Sicht, Insekten), innen oder außen, manuell oder Solar, Original oder Nachbau, Fenstergeneration. Kein „die besten“. Neukauf-Hinweis für Bereich und Problemseiten. | A |
| `/ersatzteile/roto` | Marke | roto dachfenster (110), roto ersatzteile (92), roto rollladen (62), roto rollo (50), WDF 847/R85 Ersatzteile, „roto ersatzteile alte modelle“ | Typenschild alt (7/11) und neu (074/118), Baureihen. Amazon mit Originalteilen (ZRV, Gleiterführung, Flügeldichtungssatz), OTTO 3 Artikel. Größentabelle statt Größenseiten. | A |
| `/ersatzteile/dachfenster-insektenschutz` | Teileart | velux insektenschutz (32), dachfenster fliegengitter (33), dachfenster insektenschutz (20), „ersatzkassette“, „netz gerissen“ | hagebau 9, OTTO 11, Amazon 757 (VELUX), empasa 1.329. Abstimmen mit dem späteren Bereich „Insektenschutz“ (Rang 6): dort Fenster und Türen, hier nur Dachfenster. | B |
| `/ersatzteile/dachfenster-griff` | Teileart: Griffleiste, Bedienstange | velux griff (71), dachfenster griff (41), „griffleiste austauschen“, „abgebrochen“, „verlängerung“ | Teleskopstange ZCT 200K (4.832), OTTO ZCZ 080, Roto-Teleskopstab. Griffleisten selbst kaum mit ASIN; vor dem Bau prüfen. | B |
| `/ersatzteile/dachfenster-fernbedienung` | Teileart: Wandschalter, Fernbedienung, Funk | velux fernbedienung (107), velux integra (58), KLI 310/313, KLR 200/300, „velux io kompatibel“, „somfy velux kompatibel“ | io-homecontrol: welche Fernbedienung zu welchem Motor, Somfy-Kompatibilität. Amazon KLI 313 (248), KLI 310 (215), KIG 300 (613). Erst als Abschnitt in `dachfenster-rollladen-reagiert-nicht`, eigene Seite, wenn die Fragen nicht hineinpassen. | B |
| `/problem/dachfenster-rollo-klemmt` | Problem | velux rollo reparieren, Schnur einfädeln, verdunkelungsrollo klemmt (unten), roto rollo feder spannen | Bei Google velux.de, Fachshops. Kauf: Ersatzrollo; Federmechanik meist nicht einzeln. | B |
| `/ratgeber/dachfenster-rollladen` | Ratgeber mit Auswahlhilfe | dachfenster rollladen nachrüsten (69), velux rollladen nachrüsten, solar oder elektrisch, „markise oder rollladen“ | Hoher Warenkorb, aber hagebau führt keine VELUX-Rollläden (nur 5 Roro). Solar-Rollladen SSL bei Amazon nicht als Original gefunden. Erst bauen, wenn ein Shop sie führt. | B |
| `/ersatzteile/velux/ck04`, `/uk08`, `/pk08`, `/mk10`, `/fk04`, `/fk08`, `/uk04`, `/sk10` | Größenseite, zweite Welle | je 4 bis 25 Vorschläge mit Code | 9 bis 16 hagebau-Artikel je Code. Erst nach Search-Console-Daten der ersten Welle. | B |
| `/ersatzteile/fakro` | Marke | fakro rollo (7), fakro ersatzteile (6), fakro größen | Kein Artikel in den Feeds, bei Amazon nur Nachbauten. Größe als Maß (78×118), Tabelle auf der Seite. | C |
| `/ersatzteile/dachfenster-beschlag` | Teileart: Feder, Scharnier, Gleiterführung | velux feder (68), velux scharnier (28), velux kette (15), roto gleiterführung | Roto-Originalteile bei Amazon; VELUX-Federn bei Amazon nicht gesucht, vor dem Bau prüfen. Erst als Abschnitt in `dachfenster-klemmt`. | C |
| `/ersatzteile/braas` | Marke | braas dachfenster ersatzteile, „austauschen gegen velux“ (68) | Keine Teile gefunden, Hersteller nicht mehr am Markt. Höchstens eine Zeile auf der Bereichsseite. | C |

Nur als Abschnitt, keine eigene URL: Typenschild finden (Bereich, Marken), „dachfenster zieht“ und Kondenswasser (in `dachfenster-undicht`), Flügel aus- und einhängen (in `dachfenster-klemmt` und `dachfenster-dichtung`), Lüftungsklappe (in `dachfenster-dichtung`), Scheibe gerissen (Grenze in `dachfenster-undicht` und im Bereich).

**Zählung:** 14 Seiten in A (davon 8 Größenseiten), 13 in B (davon 8 Größenseiten), 3 in C.

## 8. Marken

| Marke | Suggest | Shops (hagebau · Contorion · OTTO) | Amazon | Daten | Rang |
|---|---|---|---|---|---|
| **VELUX** | 1.778 | 667 · 0 · 6 | sehr gut: Rollos, Markise, Plissee, Insektenschutz, Pflege, Elektrik mit 200 bis 4.832 Bewertungen | Typenschild-Seite, Größenraster, Anleitungen, Produktionscodes | **1** |
| **Roto** | 375 | 0 · 0 · 3 | gut: ZRV, Gleiterführung, Gleitbolzenlager, Flügeldichtungssatz, Teleskopstab | Typenschild-Seite, Baureihen; Größen alt/neu über Ratgeberseiten | **2** |
| **FAKRO** | 29 | 0 · 0 · 0 | nur Nachbauten | „Größe prüfen“, Größe als Maß | **3** |
| **Braas** | 75 | 0 · 0 · 0 | nur Nachbauten „für Braas“ | nichts gefunden | **4**, nur als Zeile |
| Lichtblick, Gardinia, Itzala, DTCH, ventanara | über Produktbegriffe | hagebau Lichtblick 72; OTTO Gardinia 14, ventanara 5 | Itzala 13.688, DTCH 1.052, Lichtblick 1.062 | Maßangaben je Code im Titel | als Nachbau-Zeilen auf Teileart- und Größenseiten |

### Reihenfolge der Marken-Dateien

1. **VELUX** (`data/ersatzteile/velux.json`) mit den Größen als Serien. Ohne VELUX gibt es keinen Bereich: zwei Drittel der Vorschläge mit Absicht und fast alle Feed-Artikel.
2. **Roto** (`roto.json`). Zweitgrößte Nachfrage, Originalteile bei Amazon, aber kein Partnershop. Baureihen statt Größenseiten.
3. **FAKRO** und **Braas** nur, wenn die Search Console danach fragt.

## 9. Nicht verfolgt

- **Fenster kaufen, Fenster tauschen, Eindeckrahmen:** Einbau ist Sache des Dachdeckers (Abschnitt 5), der Kauf hat keinen Reparaturbezug, und keiner der Partnershops führt VELUX-Fenster. „Dachfenster austauschen Kosten“ (51 Vorschläge) nur als Grenze im Bereich.
- **Dachluke, Dachausstieg für unbeheizte Räume:** Die Vorschläge meinen Wohnwagen und Wohnmobil (womo-teile) oder Dachboden.
- **Elektrofenster mit 230 V nachrüsten (KMX, KUX):** Elektrofachkraft.
- **Farben und „die besten“:** „velux plissee farben“, „dachfenster rollo aldi“, „dachfenster rollo test“: Grundsatz 10. Farbe ist Auswahl im Ratgeber, keine Seite.
- **Smart Home** (Matter, App Control, Somfy-Anbindung): als Frage in `dachfenster-fernbedienung`, kein eigener Ratgeber.
- **Wartungsvertrag, Umlage auf Mieter, Förderung:** Vorschläge da („wartung dachfenster umlagefähig“, „austauschen förderung“), aber kein Teil.
- **Bodentreppen** (FAKRO, Roto): eigenes Thema, nicht Dachfenster.

## 10. Grenzen der Daten

- **Keine Planner-Zahlen.** Nichts in diesem Dokument ist eine Suchmenge. Vor dem Start nachholen mit: velux rollo, velux verdunkelungsrollo, dachfenster rollo, velux ersatzteile, velux typenschild, velux größentabelle, velux mk04, velux sk06, velux ck02, velux akku, velux solar rollladen, velux fernbedienung, velux dichtung, dachfenster undicht, dachfenster klemmt, roto dachfenster ersatzteile, roto rollo. Liegen „velux rollo“ und „velux ersatzteile“ unter 1.000 im Monat, schrumpft die erste Welle der Größenseiten auf drei (SK06, MK04, CK02).
- **Suchvorschläge sind keine Nachfrage.** Die a–z-Erweiterung bläht große Themen auf. Startbegriffe mit „velux“ bekommen mehr Vorschläge als mit „dachfenster“; die Zahlen nur innerhalb einer Zeile vergleichen. Die Größencode-Zählung umfasst auch niederländische und englische Vorschläge („afmetingen“, „dimensions“).
- **Feed-Zählung nach Name und Markenfeld.** 290 VELUX-Artikel bei hagebau tragen keinen Code im Namen; die Zuordnung zu Größen gelingt nur über die EAN und ist nicht gemacht. Ob die hagebau-VELUX-Artikel Marktplatzangebote sind (Artikelnummern mit `anV`, Kategorie „Wohnen“), ist nicht geprüft; für die Provision kann das einen Unterschied machen.
- **Amazon nur stichprobenhaft**, 26 Suchen, Bewertungen und Preise vom 4.11.2026. Bewertungen gelten je Angebot über alle Varianten. Die ASINs sind aus der Trefferliste, die Produktseiten sind nicht einzeln geöffnet; vor dem Bau nach `kaufbarkeit.md` prüfen.
- **Code-Tabelle über drei Generationen** aus home4u.de (Händler-Ratgeber), gegengeprüft nur an den alten Codes im hagebau-Feed (Y45, Y85, P10, S10) und an Amazon-Titeln („M06/306/14“). Die VELUX-PDFs (Größenraster, „Typen nach Baujahr“) ließen sich hier nicht als Text lesen. Vor dem Bau gegen das VELUX-Größenraster prüfen.
- **Welches Zubehör zu welcher Generation passt** (DKL für M04 ohne Zubehörträger, Akkustecker vor/ab 2013), ist aus Shop- und Amazon-Titeln abgeleitet, nicht aus Herstellerunterlagen. Das ist die erste Rechercheaufgabe beim Bau.
- **Rechtliche Grenze nicht abschließend.** Ob die VELUX-Garantie bei Selbsteinbau gilt, ist nicht geprüft. Für die Seiten ist das unerheblich, weil Fenstertausch ohnehin nicht als Anleitung vorkommt.
- **Braas** als Hersteller nicht geprüft (ob es Ersatzteile über einen Nachfolger gibt).
- **Google-Ergebnisse** aus einer Abfrage ohne Anmeldung, eine Seite je Begriff. Kein Ranking-Werkzeug.

## 11. Vergleich mit Wasserfilter

| | Dachfenster | Wasserfilter & Enthärtung |
|---|---|---|
| „Welches passt?“ | Größencode auf dem Typenschild, drei Generationen | Filtereinsatz je Gerät und Baujahr |
| Partnershops | hagebau 667 VELUX, OTTO rund 87 | hagebau 0, Contorion 23, OTTO 13 |
| Amazon | Original und Nachbau, sehr viele Bewertungen | Original, viele Bewertungen |
| Selbst machen | Zubehör ja, Fenster nein | nur Rückspülen, Einsatz mit Vorbehalt, Salz |
| Saison | Hitzeschutz und Insektenschutz im Frühjahr | keine |

Damit ist die Empfehlung aus `KEYWORDS-WASSERFILTER.md` Abschnitt 8 bestätigt: Dachfenster zuerst, Wasserfilter im kleinen Zuschnitt danach.

## Quellen

- VELUX Typenschild: https://www.velux.de/service/typenschild
- VELUX Größenraster für Fachkunden: https://www.velux.de/fachkunden/tools-technik/groessen
- VELUX Anleitung Austausch Motor/Solarzelle (V22): https://ersatzteile.veluxshop.de/-/media/spareparts/product%20pdf/velux-anleitung-rollladen-austausch-motor-solarzelle-v22.pdf (nur als Quelle, Hersteller-Shop)
- Roto Typenschild: https://www.roto-frank.com/de/dst/service/typenschild
- FAKRO Größe prüfen: https://shop.fakro.de/ueberpruefen-die-groesse (nur als Quelle, Hersteller-Shop)
- VELUX-Größentabelle mit drei Generationen: https://www.home4u.de/Ratgeber/Wohndachfenster/velux-masstabelle/
- Roto Typenschild und Größen: https://dachfensterinfo.de/cms/roto-typenschild-groessen/

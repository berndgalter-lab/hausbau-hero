# Rollladen: Analyse und Seitenplan

Stand: 5. November 2026. Prüfung nach `BEREICHE-REIHENFOLGE.md` Abschnitt 4 für den Bereich auf Rang 3 (Hauptbereich „Fenster & Türen“). Aufbau wie `KEYWORDS-WASSERFILTER.md` und `KEYWORDS-DACHFENSTER.md`, Seitentypen und URLs nach `SEITENAUFBAU.md` Abschnitt 2a. Gebaut ist noch nichts.

## Kurzfassung

- **Der Bereich trägt, und er sollte vor Wasserfilter kommen.** Die Teile liegen in allen drei Partnershops: bereinigt 53 Artikel bei hagebau, 148 bei Contorion, 127 bei OTTO (Wasserfilter: 0, 23, 13). Bei Amazon haben die Schellenberg-Originalteile Bewertungszahlen wie VELUX-Zubehör: Aufschraubwickler 50151 4.794, Einlasswickler Maxi 2.793, Rollladengurt Mini 1.532, RolloDrive 45 1.884.
- **„Welches passt?“ hat vier Schlüssel**, und für alle gibt es Herstellerdaten: Gurtbreite (Mini 14 mm, Maxi 23 mm), Lochabstand des Gurtwicklers (Schellenberg Maxi 10,5 bis 21,5 cm, Mini 15,5 cm), Wellenprofil (SW40 Mini, SW60 Maxi, SW70) und beim Motor das Drehmoment aus Panzergewicht und Welle. Somfy veröffentlicht eine Zugkrafttabelle mit kg je Antrieb bei 1,5 m und 2,5 m Höhe, Schellenberg und Selve vergleichbare Tabellen.
- **Funk ist die größte einzelne Fragengruppe.** 359 Vorschläge mit „anlernen“, „einlernen“ oder „reset“, 131 mit „Endlage“, 154 mit „io“ oder „RTS“. Somfy io und RTS sind zwei Funksysteme, die nicht miteinander sprechen; Selve hat iveo (früher Intronic) und commeo, Becker Centronic, CentronicPlus und B-Tronic.
- **Selbst machen:** Gurt, mechanischer Gurtwickler, Aufhängung, Lamellen, Anschlagstopper, Walzenkapsel und Lager, Handsender anlernen, Akku- und Solarantriebe ja. Rohrmotor mit 230 V nein: Selve und Schellenberg verlangen für Anschluss, Montage und Inbetriebnahme eine Elektrofachkraft. Schellenberg verlangt das auch für den elektrischen Gurtwickler mit Netzstecker (RolloDrive 55); das ist ein Grenzfall.
- **12 Seiten in Priorität A:** Bereich, Gurt, Gurtwickler, Welle & Lager, Handsender, Motor, drei Probleme (Gurt gerissen, klemmt, Motor reagiert nicht), Ratgeber „elektrisch nachrüsten“, Marken Schellenberg und Somfy.
- **Rechner „Welcher Rollladenmotor?“ lohnt sich, aber als B.** Die Daten liegen offen (Somfy-Tabelle, Schellenberg, Selve), die Nachfrage ist schmal (rund 40 Vorschläge zu „berechnen“, „Nm“, „Zugkraft“), und den Motor schließt am Ende die Elektrofachkraft an.
- **Marken:** Schellenberg, Somfy, Rademacher, Selve, dann Becker, Elero, Jarolift. Warema, Roma, Alukon und Heroal nur als Zeilen.

## Datengrundlage

- **Google Keyword Planner:** Für Rollladen gibt es keinen Export. Die fünf Exporte in `~/Downloads/Hausbauhero` (4.11.2026, UTF-16) enthalten keine Zeile mit Rollladen, Rolladen, Gurt, Rohrmotor, Somfy, Schellenberg, Selve, Rademacher, Jarolift oder Elero. **Alle Nachfrageangaben unten sind Breite der Suchvorschläge, keine Menge** (Abschnitt 9).
- **Google-Suchvorschläge**, abgerufen am 5.11.2026 (hl=de, gl=de): 69 Startbegriffe (Produkte, Teile, Fehlerbilder, Maße, beide Schreibweisen „rollladen“ und „rolladen“) mit a–z, ä/ö/ü und acht Zusätzen („welches“, „welche“, „passt“, „ersatzteile“, „wechseln“, „reparieren“, „defekt“, „klemmt“), dazu 35 Marken- und Systembegriffe mit 15 Zusätzen („ersatzteile“, „anlernen“, „reset“, „handsender“, „kompatibel“, „endlage“, „fehler“ …) und a–z hinter „ersatzteile“. **3.917 Abfragen, 5.978 verschiedene Vorschläge, davon 2.685 mit Reparatur- oder Kompatibilitätsabsicht.** Gezählt wird wie in den Vorlagen ohne den Startbegriff selbst. Als Absicht zählen auch Maß- und Systemwörter (mm, SW, Nm, Lochabstand, io/RTS), weil sie hier die Frage „welches passt?“ tragen.
- **Awin-Feeds** hagebau, Contorion und OTTO (Download vom 4.11.2026, `.cache/awin-probe/*-voll.csv.gz` im Haupt-Checkout). Gestreamt nach Produktname und `brand_name`, dann von Hand bereinigt: raus sind Rollladenschränke (Werkstatt und Möbel), Werkzeug mit „Achtkant“, Gurtbänder für Ladung und Hundeleinen, die Marke „Becker“ bei Contorion (Planen und Müllsäcke, nicht Becker-Antriebe), „barbara becker“ bei OTTO, Garagentorantriebe und die RORO-Vorbaurollläden für Dachfenster (gehören zu Dachfenster).
- **Amazon:** 31 Suchen auf amazon.de über Firecrawl, je die ersten zehn Treffer (Titel, ASIN, Bewertungszahl). Die Preise kamen über den Abruf in US-Dollar zurück und sind nicht übernommen; Preisangaben unten stammen aus den Feeds.
- **Herstellerunterlagen:** Somfy „Zugkrafttabelle – Einsteckantriebe für Rollladen“ (PDF über avosdim), Schellenberg „STANDARD Rohrmotoren im Vergleich“ (PDF im Schellenberg-Shop), Selve „Einstellanleitung für Rohrmotore der Baureihe TR“ (04.2002, selve.de), Schellenberg Montageanleitung RolloDrive 55 (2025). Für Funk und Adapter Händler- und Herstellerseiten über die Websuche (Quellen).
- Google-Ergebnisseiten für die Konkurrenz sind diesmal nicht abgefragt.

Rohdaten liegen außerhalb des Repos im Notizordner dieser Sitzung, Unterordner `keywords-rollladen` (`suggest.json`, `absicht.json`, `*-roh.jsonl` je Shop, `feed-rollladen-final.json`, `amazon.txt`, `amazon-titel.txt`).

## 1. Nachfrage

### Teile und Produktarten

Spalten: **Vorschläge** = alle Vorschläge zum Startbegriff; **mit Absicht** = davon mit Reparatur- oder Kompatibilitätsabsicht. Wo es zwei Schreibweisen gibt, stehen beide.

| Startbegriff | Vorschläge | mit Absicht | Was gefragt wird |
|---|---|---|---|
| rollladengurt / rolladengurt | 184 / 269 | 87 / 126 | gerissen (was tun, Rollladen unten, „welcher Handwerker“, „wer zahlt“), wechseln, austauschen bei Vorbaukasten, einfädeln, Breite, Länge Balkontür, Feder defekt, hat sich ausgehängt, Reparaturset |
| gurtwickler / rollladen gurtwickler | 290 / 87 | 114 / 22 | Feder spannen, Feder defekt, wechseln, Aufputz/Unterputz, Lochabstand (105, 120, 135, 140, 155, 165, 185, 190, 215 mm), Größen, „hält nicht mehr in der Wand“, klemmt, Gurt einfädeln, Mini/Maxi |
| elektrischer gurtwickler / gurtwickler elektrisch | 204 / 125 | 33 / 22 | Akku, batteriebetrieben, Lochabstand 105 und 135 mm, „direkt an Strom anschließen“, Unterputz nachrüsten, programmieren, Zugkraft berechnen |
| rollladenmotor / rolladenmotor / rohrmotor | 233 / 311 / 266 | 100 / 136 / 95 | anschließen (4 oder 5 Adern), Endlagen einstellen, defekt (Rollladen oben/unten, Symptome, Panzer abrollen), ausbauen aus Welle, Bremse defekt, Drehrichtung, berechnen, „<Marke> ersatzteile“ (Becker, Elero, Rademacher), Adapter |
| rollladenwelle / achtkantwelle | 89 / 52 | 46 / 28 | SW40 oder SW60, messen, Durchmesser, Verlängerung, Walzenkapsel, Kugellager, Gurtscheibe SW60 Ø 130/170 mm, ausbauen, Länge 2/3/4 m, SW70, „adapterset für achtkantwelle sw 60“ |
| rollladen lamellen / rollladenpanzer | 49 / 193 | 48 / 57 | einzeln kaufen, abgebrochen, gerissen, austauschen (von innen), verbinden, Arretierung, Deckbreite, „pvc 52 mm“, Gewicht berechnen, auf Maß, Endleiste, Winkelendleiste |
| rollladen feder / aufhängefeder rollladen | 29 / 19 | 22 / 12 | Feder tauschen, ausgehängt, Aufhängefeder SW60, Befestigungsfeder; vermischt mit der Feder im Gurtwickler |
| rollladen stopper / endleiste rollladen | 20 / 9 | 15 / 7 | Stopper für Rollladen, Endleiste austauschen, Gewicht Endleiste, Führungsschiene Stopper |
| rollladen fernbedienung / rollladen handsender | 102 / 12 | 48 / 6 | anlernen, programmieren, Batterie wechseln, defekt; viel VELUX, Roma, Bubendorff, Schellenberg |
| rollladen kurbel / rollladen getriebe | 80 / 23 | 42 / 8 | Kurbel abgebrochen, Getriebe wechseln, „auf elektrisch umrüsten“, „geht nicht mehr hoch“, rutscht runter |
| rollladen nachrüsten / rollladen elektrisch nachrüsten | 99 / 32 | 77 / 24 | Akku, Solar, Funk, „ohne Strom“, Aufputz, Kurbel auf elektrisch, Kosten |
| rollladen solar / rollladen akku | 222 / 93 | 64 / 86 | Akku wechseln, Akku leer, nachrüsten; zur Hälfte VELUX und Roto (Dachfenster) |
| vorbaurollladen / aufsatzrollladen | 251 / 207 | 62 / 33 | Gurt wechseln, Ersatzteile (Roma, Alulux), Motor wechseln, Einlauftrichter, elektrisch umrüsten; viel Kauf nach Maß |
| rollladenkasten | 259 | 27 | öffnen, Gurt wechseln, dämmen, Maße |

### Fehlerbilder

| Startbegriff | Vorschläge | mit Absicht | Was gefragt wird |
|---|---|---|---|
| rollladen klemmt | 17 | 16 | oben, im Kasten, bei Hitze, „geht nicht hoch“, „geht nicht runter“, plötzlich |
| rollladen geht nicht hoch / runter | 14 / 9 | 13 / 8 | „nicht ganz hoch“, elektrischer Rollladen, mit Kurbel, VELUX Solar |
| rollladen gurt gerissen / gurt wechseln | 11 / 9 | 11 / 8 | dazu 164 Vorschläge über alle Begriffe mit Gurt und „gerissen/wechseln/tauschen/erneuern“ |
| rollladen reparieren / defekt | 68 / 28 | 48 / 22 | selbst reparieren, Kasten öffnen, „ohne Kasten öffnen“, Lamellen gerissen, schwergängig |
| rollladen endlage einstellen / motor einstellen | 16 / 19 | 15 / 19 | 2 Schrauben, 2 Tasten, „gelb weiß“, über Schalter, elektronisch; je Marke |
| rollladen ausbauen | 32 | 29 | Welle, Motor, Gurtwickler, Walzenkapsel, Kurbelgetriebe |
| rollladen quietscht / hängt schief | 8 / 2 | 5 / 2 | wenige Vorschläge |

### Querschnitt über alle 5.978 Vorschläge

| Thema | Vorschläge | Beispiele |
|---|---|---|
| anlernen, einlernen, reset, programmieren | 359 | „somfy io reset“, „selve commeo anlernen“, „jarolift handsender lässt sich nicht anlernen“ |
| Solar | 361 | großteils VELUX/Roto-Dachfenster, sonst „rohrmotor solar“, „solar rollladen umrüsten“ |
| nachrüsten, umrüsten | 209 | Kurbel auf Gurt, Gurt auf elektrisch, Funk nachrüsten |
| Gurt gerissen, wechseln, tauschen | 164 | siehe oben |
| io, RTS | 154 | „somfy io kompatibel“, „somfy rts anlernen“, „somfy io handsender“ |
| Endlage, Endschalter | 131 | „elero endlagen löschen“, „somfy endschalter defekt“ |
| Akku | 125 | „gurtwickler akku“, „rohrmotor mit akku“ |
| passt, welche, kompatibel | 108 | „welcher rolladenmotor“, „rolladen welche welle“, „jarolift kompatibel mit somfy“, „gurtwickler somfy kompatibel“ |
| SW40/SW60/SW70, Achtkant | 103 | „rolladenwelle sw40 oder sw60“, „rohrmotor sw70“, „wellenbolzen sw60“ |
| klemmt, geht nicht, schief | 91 | |
| anschließen, Kabel, Anschlussplan | 64 | „rohrmotor anschließen 5 adern“, „rolladen welches kabel“ |
| Gewicht, berechnen, kg | 42 | „rollladenpanzer gewicht berechnen“, „rohrmotor zugkraft berechnen“ |
| Nm, Drehmoment, Zugkraft | 30 | „rohrmotor wieviel nm“, „rolladenmotor welches drehmoment“ |
| Gurtbreite (14/15 mm, 23 mm, Mini/Maxi) | 20 | „gurtwickler aufputz 14mm mit gurt“, „rollladen gurtband 23mm“ |
| Lochabstand | 13 | neun verschiedene Maße von 105 bis 215 mm |

Die Fragen nach Gurtbreite und Lochabstand sind klein, aber genau. Die Fragen nach Funk und Endlagen sind groß und markengebunden.

### Marken

Gezählt sind alle Vorschläge mit Absicht, die den Markennamen enthalten.

| Marke | mit Absicht / alle | Was gefragt wird |
|---|---|---|
| Somfy | 321 / 418 | io/RTS, anlernen, reset, Endlagen (auch „mit Kabel“, „ohne Fernbedienung“), Fehlermeldung, Situo, Kondensator; dazu Garagentor und Markise |
| Schellenberg | 154 / 245 | Gurtwickler 50151 Montage, Fernbedienung anlernen, Endlage, RolloDrive; dazu Garagentor und Insektenschutz |
| Rademacher | 118 / 199 | RolloTron Ersatzteile, Endlagen, DuoFern anlernen, Handsender 433 MHz, „fehler e3“; dazu Garagentor |
| Warema | 117 / 159 | fast nur Markise, Raffstore, Insektenschutz; Rollladen nur „warema ersatzteile rollladen“, EWFS-Handsender |
| Selve | 84 / 131 | commeo anlernen/reset, Endlagen „mit Einstellkabel“, iveo, Gurtwickler Ersatzteile, Motorlager |
| Jarolift | 78 / 121 | Handsender anlernen, Endlagen, Batterie, „kompatibel mit Somfy“, Gurtwickler |
| Elero | 70 / 99 | Endlagen mit und ohne Montagekabel, Fehlercodes, TempoTel, „elero motor mit somfy kabel einstellen“ |
| Roma | 43 / 98 | Vorbaurollladen: Ersatzteile Kurbel, Stopper, Endleiste, Einlauftrichter, Motor nachrüsten |
| Becker | 39 / 73 | Motor Endlagen, Reset, Motorlager, „mit Somfy-Kabel einstellen“, Centronic |
| Heroal / Alukon | 16 / 50 · 8 / 28 | Ersatzteile, Handsender, Endlagen; viel Tür, Rolltor, Raffstore |
| Superrollo | 10 / 32 | Gurtwickler GW60 einstellen, Reset, Ersatzteile |
| VELUX (Beifang) | 168 / 270 | Solar-Rollladen, Akku; gehört zu Dachfenster |

Somfy, Selve, Elero und Becker werden nach Motor und Funk gefragt, Schellenberg und Superrollo nach Gurtwickler und Gurt.

## 2. „Welches passt?“

| Teil | Wovon es abhängt | Was die Hersteller veröffentlichen | Beispiel |
|---|---|---|---|
| **Gurt** | Breite: Mini 14 mm (Händler teils „14/15 mm“), Maxi 23 mm („22/23 mm“). Länge nach Fensterhöhe, Dicke nach Wickelraum. | Schellenberg und Rathgeber im Namen jedes Artikels; Schellenberg-Gurtscheiben sind an Breite und Welle gebunden. | Schellenberg Gurtscheibe Maxi „für 23 mm Gurtbreite und 60 mm Achtkantwelle“, Mini „für 14 mm Gurtbreite und 40 mm Achtkantwelle“ (OTTO-Titel). Rathgeber Rollladengurt 14/15 mm × 6 m, 22/23 mm × 50 m mit Reißfestigkeit 200 bis 380 kg (Contorion). |
| **Gurtwickler** | Aufputz (Aufschraubwickler) oder Unterputz (Einlass-, Halbeinlasswickler), Gurtbreite, **Lochabstand** der Befestigung, Wickelkapazität (Gurtlänge) | Lochabstand und Gurtbreite stehen in den Artikeltiteln, nicht in einer Herstellertabelle. | Schellenberg Einlasswickler Maxi mit Lochabstand 10,5, 13,5, 16, 18,5 und 21,5 cm (OTTO); Aufschraubwickler Mini 50151 Lochabstand 15,5 cm (Amazon); RolloDrive 45 „Lochabstand 135 oder …“. Der Abstand des alten Wicklers entscheidet, ob der neue ohne Stemmen in den Mauerkasten passt. |
| **Elektrischer Gurtwickler** | dieselben Maße plus Zugkraft und Wickelkapazität bei Gurtstärke | Datenblatt in der Anleitung | Schellenberg RolloDrive 55: Gurt 23 mm und 14 mm, Wickelkapazität 6 m bei 1,0 mm und 3 m bei 1,7 mm Gurtstärke, max. 5,0 m² Kunststoff oder 2,5 m² Aluminium, Zugkraft 30 kg. |
| **Welle** | Achtkant-Stahlwelle SW40 (Mini), SW60 (Maxi), seltener SW50 und SW70; daneben Rundwellen (nicht geprüft) | Somfy-Tabelle nennt die „kleinste Welle“ je Antriebsreihe (40er: SW40, 50er: SW50, LT 60: SW70). Selve: TR1 = SW40, TR2 = SW60. Schellenberg: Mini Ø 40 mm, Maxi Ø 60 mm. | Walzenkapsel, Kugellager, Wandlager, Gurtscheibe hängen an der Welle: Schellenberg Walzenkapsel Maxi 80100 für 60-mm-Achtkantwelle, Wandlager 83500 „für 60 bis 70 mm“. |
| **Motor** | Durchmesser des Motors passend zur Welle, Drehmoment (Nm) nach Panzergewicht und Höhe, Endlageneinstellung (mechanisch, elektronisch, Funk), Funksystem | **Somfy Zugkrafttabelle** mit zulässigem Panzergewicht je Antrieb bei 1,5 m und 2,5 m Rollladenhöhe; Schellenberg Vergleichstabelle mit Zugkraft und Fläche Kunststoff; Selve TR-Tabelle mit „effektivem Rollladengewicht“ für SW40/SW60 | Somfy Oximo 50 io: 10/17 = 24 kg (1,5 m) / 19 kg (2,5 m), 20/17 = 48/38 kg, 40/17 = 95/76 kg. Altus 40 RTS 9/14 (SW40) = 24/20 kg. Schellenberg STANDARD Maxi 20 (20620): 20 Nm, Ø 60 mm, 34 kg, 8,5 m² Kunststoff; Mini 6 (20106): 6 Nm, Ø 40 mm, 15 kg, 4,0 m². Selve TR 2/17: 17 Nm, 37 kg / 30 kg. |
| **Wellenadapter** | Motordurchmesser (35, 45/50, 60 mm) × Wellenprofil und Hersteller der Welle | Somfy verkauft Adaptersets je Kombination (Händlerlisten, keine Gesamttabelle gefunden) | Somfy-Adapter für 60-mm-Motoren in Selve-Martin-SW70-Wellen (9420335), für 50-mm-Motoren in IMBAC-60-Achtkant (9410418), für 35-mm-Motoren in IMBAC 40. Rademacher Adapter-Set AMI45-SW70 (Contorion). |
| **Aufhängung** | Federn oder feste Verbinder (Hochschiebesicherung); Wellenprofil | Somfy-Tabelle: Bei Antrieben mit Hinderniserkennung und Festfrierschutz sind „feste Verbinder notwendig“, Federn nur bei einfachen Antrieben. Selve TR: Panzer nur mit Sicherungs- und Befestigungsfedern, „keine Gurtbefestigung“. | Schellenberg Rollladenaufhängung Mini/Maxi (Amazon 1.261 Bewertungen), Mini 19300 für SW40; Selve SecuBlock rapid Maxi, 3-gliedrig (OTTO). Wer einen Motor mit Hinderniserkennung nachrüstet, braucht also neue Aufhängungen. |
| **Lamellen, Endleiste** | Profil: Mini rund 37 mm Deckhöhe, Maxi rund 52 mm; Material (PVC, Alu) | Schellenberg Mini: 37 mm Deckhöhe, 8 mm Tiefe (Händlerdatenblatt Hornbach); Maxi 52 mm (Händlertitel). Keine Herstellertabelle für andere Profile gefunden. | „rollladenpanzer pvc 52 mm“, „rollladenpanzer deckbreite“ im Suggest. Andere Hersteller haben eigene Profile (rolladenplanet-PDFs); Mini und Maxi sind kein Normmaß. |
| **Funk-Handsender** | Funksystem des Antriebs, nicht die Marke allein | Somfy: RTS (433,42 MHz, ohne Rückmeldung) und io-homecontrol (868 MHz, mit Rückmeldung) sind getrennte Systeme; der Situo 5 io/RTS bedient beide. Selve: iveo (2012 umbenanntes Intronic, unidirektional) und commeo (bidirektional); RC-Motoren empfangen beide, aber nicht gleichzeitig. Becker: Centronic, CentronicPlus (zu vielen Centronic-II-Sendern abwärtskompatibel), B-Tronic (KNX-RF). | Somfy Situo 1 RTS Pure 1870496 passt nicht zu einem Oximo io; Situo 5 io II nicht zu einem RTS-Motor. Selve SE Plus-RC lässt sich mit commeo- oder iveo-Sendern bedienen. Rademacher DuoFern, Schellenberg, Elero, Jarolift: nicht geprüft. |

**Fazit:** Für Motor und Welle ist die Datenlage gut, bei Somfy sehr gut (eine Tabelle über alle Baureihen mit kg je Höhe). Für Gurt und Gurtwickler stehen die Maße zuverlässig in den Artikeltiteln, aber nicht in einer Herstellerübersicht; die Zuordnung Lochabstand → Wickler muss aus Titeln und Datenblättern gebaut werden. Für Funk gibt es die Systemgrenzen, aber keine vollständige Matrix Sender × Motor; das ist die erste Rechercheaufgabe beim Bau. Bei Lamellen fehlt eine Profiltabelle über die Hersteller hinweg, deshalb dort nur Mini und Maxi von Schellenberg.

## 3. Kaufbarkeit

### Awin-Feeds (4.11.2026)

Bereinigt (Abschnitt Datengrundlage). „Schalter, Aktor“ sind Unterputz-Rollladenschalter und KNX-Aktoren für die Elektrofachkraft; sie zählen nicht zu den Teilen.

| Teilart | hagebau | Contorion | OTTO |
|---|---|---|---|
| Teile gesamt (ohne Schalter, Aktor) | **53** | **148** | **127** |
| davon Marken | Schellenberg 48, Meeth 4 | Rademacher 71, Somfy 34, Kaiser Nienhaus 15, Rathgeber 14, PKKT 8, Warema 5 | Schellenberg 80, Inovatec 8, WIR elektronik 7, Nobily 7, Selve 6, Bauheld 3, Rademacher 2 |
| Gurt | 9, Median 6 € | 16, Median 18 € (Rathgeber, auch 50-m-Rollen) | 13, Median 7 € |
| Gurtwickler mechanisch | 13, Median 13 € | 8, Median 10 € | 30, Median 11 € (Lochabstände im Titel) |
| Abdeckplatte, Mauerkasten, Gurtführung | 4 | 0 | 26 |
| Gurtwickler elektrisch | 4, Median 90 € (RolloDrive 35/45/65) | 12, Median 204 € (Rademacher RolloTron) | 22, Median 125 € (Schellenberg 10, WIR eWickler 7, ATTAS, Rademacher) |
| Rohrmotor, Motorsets | 3, Median 109 € (Schellenberg Mini 6, Maxi Plus 20/40) | 45, Median 145 € (Rademacher 22, Somfy 12, Kaiser Nienhaus 11) | 8, Median 63 € (Nobily 6, Selve SE Plus 2/10, Becker R8-17) |
| Handsender, Funk, Zeitschaltuhr | 6, Median 47 € | 49, Median 107 € (Somfy 21, Rademacher 20) | 2 (Somfy Situo 1 io II, Smoove io) |
| Welle, Walzenkapsel, Lager, Gurtscheibe, Aufhängung | 4 | 15 (Rademacher Stahlwelle SW40, Teleskopwelle SW60, Adapter SW70) | 8 (Schellenberg Aufhängung, Selve SecuBlock) |
| Lamellen, Profile | 1 | 0 | 2 |
| Anschlagstopper, Endleiste | 0 | 0 | 7 (nur Stopper) |
| Reparaturset Gurt | 4 | 0 | 1 |
| Rollladenkasten-Dämmung | 1 | 3 | 8 |
| Schalter, Aktor (nicht gezählt) | 3 | 42 | 2 |

Alle bereinigten Artikel haben eine EAN. Elero, Jarolift, Alukon und Heroal kommen in keinem Feed vor; Becker-Antriebe nur einmal (OTTO), Selve sechsmal (OTTO).

**Folge:** Gurt, Gurtwickler und Zubehör liegen bei hagebau und OTTO (Schellenberg), Motoren und Funk bei Contorion (Rademacher, Somfy). Endleisten und einzelne Lamellen fehlen fast ganz. Zum Vergleich: Wasserfilter 0 · 23 · 13, Dachfenster 781 · 0 · rund 87.

### Amazon (Stichprobe 5.11.2026)

Nur Originalmarken mit Artikelnummer oder eindeutigem Modell. Bewertungen gelten oft für alle Varianten eines Angebots.

| Teil | ASIN | Bewertungen |
|---|---|---|
| Schellenberg Aufschraubwickler Mini 50151, Lochabstand 15,5 cm | B00CD0L6IK | 4.794 |
| Schellenberg Aufputz-Gurtwickler 50503 mit Gurt 14 mm × 5 m | B000QB4IZ6 | 2.845 |
| Schellenberg Einlasswickler Maxi | B0067XVEMM, B0012IA2MU | 2.793 |
| Schellenberg Aufschraubwickler 50506, 5 m | B00DCT78MY | 1.805 |
| Schellenberg Rollladengurt Mini 14 mm / Maxi 23 mm × 6 m (36002) | B000QB4IXI / B0DSQ2VP5Q | 1.532 / 1.437 |
| Schellenberg Gurtfix Reparaturset 23 mm (34304) / Mini & Maxi (44302) | B01N36XOSQ / B003AIALOE | 1.252 / 1.365 |
| Schellenberg RolloDrive 45 (22745) / 55 (22725) / 65 Standard (22726) | B00N8K9834 / B01MQEV63U / B01M7ZHO2C | 1.884 / 183 / 108 |
| Rademacher RolloTron 1300 | B0085IEHF8 | 1.325 |
| Superrollo GW60 Gurtwickler | B004FDUJF4 | 2.410 |
| WIR elektronik eWickler Comfort eW820 (17–23 mm) | B01DM3SGSY | 737 |
| Schellenberg Rohrmotor Maxi Standard 10 / 15 / 20 Nm (20610, 20615, 20620) | B00CSHXPTG / B00CSHXQOK / B00DCT5IXA | 448 / 303 / 166 |
| Schellenberg Rohrmotor Plus 10 Nm (20710) | B008P95Z3A | 147 |
| Somfy Ilmo 50 WT 10/17 / 6/17 (1130125) | B00TYM46W8 / B00DJ5AUCQ | 457 / 237 |
| Somfy LT 50 Atlas 15/17 / HiPro LT 50 Ceres 10/17 | B0035FJAKS / B00KM4NZ9W | 459 / 341 |
| Somfy Oximo 50 io 6/17 | B01I1MTMIY | 88 |
| Somfy Ersatz-Set RTS 1240385 (markenunabhängiger Austausch) | B07RNLS6MK | 280 |
| Rademacher RolloTube Basis RTBM 20/16Z | B001ZW5H1E | 152 |
| Becker R 30/17 C M | B00CST6V9K | 36 |
| Somfy Situo 1 RTS Pure 1870496 / Situo 5 RTS Pure 1870495 / Situo 5 io II | B086C7N27W / B086C91R7R / B08831JMGJ | 873 / 750 / 406 |
| Rademacher DuoFern Handsender Standard 9491 | B001B3FVVS | 345 |
| Elero TempoTel 2 (868 MHz) | B00BZ6C8L2 | 128 |
| Becker Centronic EasyControl EC541-II | B00DUWQ4IW | 83 |
| Schellenberg Rollladenaufhängung Mini/Maxi / Mini 19300 für SW40 | B000QB6LMY / B0BMTGSF3L | 1.261 / 133 |
| Schellenberg Walzenkapsel Maxi 80100 / Kugellager Maxi 83800 / Wandlager 83500 | B00DCT89DG / B00DCT8GDY / B00DCT8D28 | 1.403 / 173 / 465 |
| Schellenberg Gurtscheibe Maxi 11700 (17 cm, 23 mm) / Stahlwellen-Set SW60 86005 | B00DCT3V3E / B0811Z57NV | 234 / 159 |
| Schellenberg Anschlagstopper 52002 / Hochschiebesicherung 16000 | B000U3SUYU / B0811ZLHLJ | 660 / 456 |

Nicht gefunden: Selve-commeo-Handsender (Suche ohne Treffer), einzelne Endleisten (nur im Komplettset), einzelne Lamellen außer Schellenberg-Panzersets mit wenigen Bewertungen (39). Regel aus `kaufbarkeit.md`: ASIN nur, wenn die Originalmarke auf der Produktseite steht; die ASINs sind aus der Trefferliste und vor dem Bau einzeln zu prüfen.

**Warenkorb** (Feed-Mediane): Gurt 6–18 €, mechanischer Gurtwickler 10–15 €, Lager und Kapseln unter 15 €, Handsender 45–110 €, elektrischer Gurtwickler 90–200 €, Rohrmotor 60–150 €, Solar-Kit 485–605 €. Der Teil, den man selbst tauscht, ist billig; der teure Teil (Motor) gehört der Elektrofachkraft. Akku- und Solarantriebe und Handsender liegen dazwischen.

## 4. Grenzen: was darf man selbst?

- **Ja, ohne Vorbehalt:** Gurt wechseln, mechanischen Gurtwickler tauschen (auf- oder unterputz in den vorhandenen Mauerkasten), Gurtscheibe, Walzenkapsel, Kugellager, Aufhängung, einzelne Lamellen, Endleiste und Anschlagstopper. Dafür wird der Rollladenkasten geöffnet, kein Stromkreis. Bei Vorbaurollläden außen mit Leiter: Hinweis auf Absturz.
- **Ja, mit Hinweis:** Funk-Handsender kaufen, anlernen, Batterie wechseln, Endlagen per Handsender einstellen, Reset. Das beschreiben die Bedienungsanleitungen für Endkunden. Akku- und Batterie-Gurtwickler (WIR eWickler eW320/eW420 Akku) und Solarantriebe (Somfy Oximo 40 DC WireFree, Solarkits RS100) haben keinen Netzanschluss.
- **Grenzfall: elektrischer Gurtwickler mit Netzstecker.** Schellenberg verlangt in der Anleitung RolloDrive 55 auch für die Variante mit Netzteil und Stecker, dass „elektrischer Anschluss, Montage und Inbetriebnahme“ eine Elektrofachkraft übernimmt, und fordert eine frei zugängliche Steckdose am Einsatzort. Rademacher unterscheidet laut Websuche „nicht steckerfertige“ Geräte (Elektrofachkraft) von steckerfertigen; das ist nicht in der Originalanleitung geprüft. **Folge:** Seiten zum elektrischen Gurtwickler zeigen, welcher passt (Lochabstand, Gurtbreite, Zugkraft), und nennen die Herstellervorgabe. Keine Anleitung zum Anschluss.
- **Nein, Elektrofachkraft:** Rohrmotor mit 230 V einbauen, anschließen, tauschen; Unterputz-Rollladenschalter, Zeitschaltuhr mit Netzanschluss, Aktoren. Selve TR: „Der Anschluss des Motors darf nur durch autorisiertes Elektrofachpersonal durchgeführt werden.“ Die Fragen „rolladenmotor anschließen 4/5 adern“, „rohrmotor anschlussplan“ (64 Vorschläge) bekommen keine Anleitung, nur den Satz, wer das macht. Wie `BEREICHE-REIHENFOLGE.md` Abschnitt 5 (Elektroinstallation).
- **Was trotzdem auf die Motorseite darf:** welcher Motor zu Welle und Panzergewicht passt, welcher Adapter, welche Aufhängung, welcher Handsender. Das ist Auswahl, kein Einbau. Die Grenze steht oben auf der Seite.

## 5. Neue Seiten

Priorität: **A** = als Erstes, wenn der Bereich startet (breite Nachfrage in den Vorschlägen und Teile im Feed oder mit ASIN), **B** = danach, **C** = später oder nur als Abschnitt.

Hinweis zu den Slugs: Die Teilart `rollladen` in `bereiche.ts` gehört zum Dachfenster (VELUX-Rollladen). Die neuen Teilearten tragen deshalb eigene Namen. Fragen zu VELUX- und Roto-Solar-Rollläden bleiben bei Dachfenster (`/problem/dachfenster-rollladen-reagiert-nicht`, `/ersatzteile/dachfenster-akku`).

| Ziel-URL | Seitentyp | Suchbegriffe (Breite) | Beleg | Prio |
|---|---|---|---|---|
| `/bereich/rollladen` | Bereich „Rollladen“ (Fenster & Türen) | — | Einleitung: Mini oder Maxi erkennen (Gurtbreite, Welle), Gurt oder Motor, was man selbst tauscht, wann die Elektrofachkraft kommt. Grenze aus Abschnitt 4. | A |
| `/ersatzteile/rollladengurt` | Teileart: Gurt nach Breite und Länge, Reparaturset | rollladengurt (87), rolladengurt (126), „gurt gerissen“, „breite“, „länge balkontür“, „einfädeln“, Reparaturset | hagebau 9, Contorion 16, OTTO 13; Amazon 1.532 / 1.437 / 1.365. Tabelle Mini 14 mm / Maxi 23 mm mit passender Gurtscheibe und Wickler. | A |
| `/ersatzteile/gurtwickler` | Teileart: welcher Wickler passt (Aufputz, Unterputz, Lochabstand, Gurtbreite, Wickelkapazität) | gurtwickler (114), „lochabstand“ (13 Vorschläge mit neun Maßen), „feder spannen“, „wechseln“, „größen“, „mini/maxi“ | hagebau 13, OTTO 30 mit Lochabstand im Titel, Contorion 8. Amazon 4.794 / 2.845 / 2.793. Elektrische Wickler als Abschnitt mit Verweis. | A |
| `/ersatzteile/rollladen-welle` | Teileart: Achtkantwelle, Walzenkapsel, Kugellager, Wandlager, Gurtscheibe, Wellenadapter | rollladenwelle (46), achtkantwelle (28), „sw40 oder sw60“, „messen“, „verlängerung“, „walzenkapsel“, „adapterset sw 60“ (103 Vorschläge mit SW/Achtkant) | Schellenberg-Teile bei Amazon (1.403, 465, 234, 173, 159), Rademacher-Wellen und Adapter bei Contorion. Kern: Welle messen → SW40/SW60/SW70 → Kapsel, Lager, Motordurchmesser. | A |
| `/ersatzteile/rollladen-handsender` | Teileart: Handsender und Wandsender je Funksystem | rollladen fernbedienung (48), „somfy io/rts“ (154), „<Marke> handsender anlernen“, „kompatibel“ (108 mit passt/welche/kompatibel) | Systemgrenzen von Somfy, Selve, Becker (Abschnitt 2). Contorion 49 Funkartikel, Amazon Situo 873 / 750 / 406, Rademacher 345, Elero 128. Matrix Sender × Motor vor dem Bau ergänzen. | A |
| `/ersatzteile/rollladenmotor` | Teileart: Rohrmotor nach Welle und Drehmoment, Adapter, Aufhängung | rollladenmotor (100), rolladenmotor (136), rohrmotor (95), „welcher rolladenmotor“, „wieviel nm“, „sw40/sw60“, „<Marke> ersatzteile“ | Somfy-, Schellenberg-, Selve-Tabellen. Contorion 45, hagebau 3, OTTO 8; Amazon Schellenberg 448/303/166, Somfy 459/457/341. Oben die Grenze: Einbau und Anschluss Elektrofachkraft. Akku- und Solarantriebe als Abschnitt. | A |
| `/problem/rollladengurt-gerissen` | Problem | rolladengurt gerissen (was tun, Rollladen unten, hochschieben), „gurt hat sich ausgehängt“, „hängt durch“, „geht nicht mehr rein“, „gurtwickler feder defekt“ (164 Vorschläge um Gurt wechseln) | Ursachen: Gurt verschlissen, Wicklerfeder lahm, Gurtführung. Kauf: Gurt, Reparaturset, Wickler. Bei Vorbaukasten anders als bei Einbaukasten. | A |
| `/problem/rollladen-klemmt` | Problem | rollladen klemmt (16), geht nicht hoch (13) / runter (8), „hängt schief“, „schwergängig“, „klemmt bei hitze“, „rutscht runter“ | Ursachen: Lamelle verrutscht oder gebrochen, Aufhängung gelöst, Walzenkapsel/Lager, Führungsschiene, Stopper. Führt auf Welle, Lamellen, Aufhängung. | A |
| `/problem/rollladenmotor-reagiert-nicht` | Problem | „rolladenmotor defekt“ (Symptome, oben/unten), „fernbedienung funktioniert nicht“, „<Marke> reset/anlernen“ (359), „endlagen einstellen/löschen“ (131), „fehler“ | Ursachen: Handsender-Batterie, Funk verloren (neu anlernen), Endlagen verstellt, Motor zu lange gelaufen (Schellenberg nennt 4 Minuten maximale Einschaltdauer), Motor defekt (Elektrofachkraft). Je Marke ein Abschnitt mit Reset-Weg aus der Anleitung. Kauf: Handsender, Batterie. | A |
| `/ratgeber/rollladen-elektrisch-nachruesten` | Ratgeber mit Auswahlhilfe | rollladen nachrüsten (77), elektrisch nachrüsten (24), „kurbel auf elektrisch“, „ohne strom“, „akku“, „solar“, „funk nachrüsten“ (209 Vorschläge mit nachrüsten/umrüsten) | Fragen: Gurt oder Kurbel heute, Steckdose am Fenster oder nicht, Akku, Solar, Netz, Funk ja/nein und welches System. Ergebnis: elektrischer Gurtwickler (Grenzfall), Akku-Wickler, Solar-Rohrmotor oder Rohrmotor mit Elektrofachkraft. Neukauf-Hinweis für den Bereich. Keine Liste „die besten“. | A |
| `/ersatzteile/schellenberg` | Marke | schellenberg (154 mit Absicht), „gurtwickler 50151“, RolloDrive, „fernbedienung anlernen“, „endlage“ | Stärkste Feed-Abdeckung (hagebau 48, OTTO 80), Amazon sehr gut, Vergleichstabellen als PDF. Mini/Maxi-System als Serien. | A |
| `/ersatzteile/somfy` | Marke | somfy (321), „somfy io/rts“, „situo“, „endlagen einstellen“, „reset“, Ilmo, Oximo, LT 50 | Zugkrafttabelle über alle Antriebe, Contorion 34 Artikel, Amazon gut. io/RTS als erste Frage. | A |
| `/ersatzteile/elektrischer-gurtwickler` | Teileart | elektrischer gurtwickler (33), gurtwickler elektrisch (22), „lochabstand 105/135“, „akku“, „zugkraft“, rademacher rollotron (20), schellenberg rollodrive (25) | Feeds 4 · 12 · 22, Amazon 1.884 / 1.325 / 737 / 2.410 (Superrollo). Grenzfall aus Abschnitt 4 oben auf der Seite. Erst als Abschnitt in `gurtwickler` und im Ratgeber; eigene Seite, wenn die Tabelle dort zu groß wird. | B |
| `/rechner/rollladenmotor` | Rechner „Welcher Rollladenmotor?“ | rolladenmotor berechnen (8), „rohrmotor zugkraft berechnen“, „wieviel nm“, „welches drehmoment“, „rollladenpanzer gewicht berechnen“ (rund 40 Vorschläge) | Eingaben Breite, Höhe, Material, Welle; Ausgabe Panzergewicht, Nm-Klasse je Welle, Aufhängung (Federn oder feste Verbinder). Daten: Somfy-Tabelle, Schellenberg, Selve. Siehe Abschnitt 8. | B |
| `/ersatzteile/rollladen-aufhaengung` | Teileart: Aufhängefeder, feste Verbinder, Hochschiebesicherung | aufhängefeder rollladen (12), rollladen feder (22), „hochschiebesicherung“, „befestigungsfeder sw60“ | Amazon 1.261 / 456 / 133, OTTO Selve SecuBlock. Wichtig beim Motor-Nachrüsten (Somfy: feste Verbinder bei Hinderniserkennung). Erst als Abschnitt in `rollladen-welle` und `rollladenmotor`. | B |
| `/ersatzteile/rollladen-lamellen` | Teileart: Lamellen, Endleiste, Anschlagstopper | rollladen lamellen (48), rollladenpanzer (57), „einzeln kaufen“, „abgebrochen“, „pvc 52 mm“, endleiste (11), stopper (15) | Wenig Kaufbares: hagebau 1, OTTO 2 Profile + 7 Stopper, Amazon Stopper 660, Panzersets 39. Mini/Maxi-Tabelle nur für Schellenberg belegt. | B |
| `/ersatzteile/rademacher` | Marke | rademacher (118), RolloTron (20), RolloTube, DuoFern, „fehler e3“ | Contorion 71 Artikel, Amazon RolloTron 1.325, DuoFern 345. | B |
| `/ersatzteile/selve` | Marke | selve (84), commeo, iveo, Endlagen mit Einstellkabel, Gurtwickler | OTTO 6 Artikel, Amazon schwach, TR-Anleitung und commeo/iveo-Angaben. | B |
| `/problem/rollladen-endlage-falsch` | Problem | „endlagen einstellen/löschen“ (131), „rollladen geht nicht ganz hoch/runter“, „motor einstellen 2 schrauben“ | Erst als Abschnitt in `rollladenmotor-reagiert-nicht`. Mechanische Endlagen (Stellschrauben) stellt man nach Anleitung selbst ein; ob das ohne Elektrofachkraft zulässig ist, sagen die Anleitungen unterschiedlich, vor dem Bau prüfen. | B |
| `/problem/rollladen-kurbel-defekt` | Problem | rollladen kurbel (42), getriebe (8), „kurbel abgebrochen“, „hält nicht mehr oben“, „rutscht runter“ | Kurbelgetriebe und Kurbelstangen kaum in Feeds und bei Amazon nicht gesucht. Erst prüfen. | C |
| `/ersatzteile/becker`, `/ersatzteile/elero`, `/ersatzteile/jarolift` | Marke | becker (39), elero (70), jarolift (78) | Kaum Feed-Artikel (Becker 1, Elero und Jarolift 0), Amazon wenig. Fragen fast nur Funk und Endlagen; als Abschnitte in `rollladen-handsender` und `rollladenmotor-reagiert-nicht`. | C |

Nur als Abschnitt, keine eigene URL: Rollladenkasten öffnen und dämmen (Bereich, `rollladengurt-gerissen`), Gurtführung und Abdeckplatte (in `gurtwickler`), Vorbaurollladen-Ersatzteile (Roma, Alulux) im Bereich, Rollladenschalter und Zeitschaltuhr mit Netzanschluss nur als Grenze.

**Zählung:** 12 Seiten in A, 7 in B, 2 in C (davon eine Sammelzeile mit drei Marken).

## 6. Marken

### Bewertung

Spalten: **Suggest** = Vorschläge mit Absicht, die die Marke enthalten; **Shops** = Rollladen-Teile in hagebau · Contorion · OTTO; **Amazon** = Originalteile mit ASIN; **Daten** = veröffentlicht der Hersteller Auswahltabellen.

| Marke | Suggest | Shops | Amazon | Daten | Rang |
|---|---|---|---|---|---|
| **Schellenberg** | 154 | 48 · 0 · 80 | sehr gut: Gurt, Wickler, Kapseln, Lager, Aufhängung, Stopper, Motoren, RolloDrive; 100 bis 4.794 Bewertungen | Vergleichstabellen (STANDARD, PLUS, Basic/Action) mit Nm, Welle, Zugkraft, Fläche; Anleitungen mit Datenblatt | **1** |
| **Somfy** | 321 | 0 · 34 · 3 | gut: Ilmo, LT 50, Oximo, Situo; 88 bis 873 | **Zugkrafttabelle über alle Rollladenantriebe** mit kg bei 1,5 und 2,5 m, kleinste Welle, Aufhängung | **2** |
| **Rademacher** | 118 | 0 · 71 · 2 | gut: RolloTron 1.325, DuoFern-Handsender 345, RolloTube 152 | Datenblätter und Einbaumaße je RolloTron (PDF, nicht ausgewertet) | **3** |
| **Selve** | 84 | 0 · 0 · 6 | schwach: kein Handsender gefunden | TR-Tabelle (2002), commeo/iveo-Systembeschreibung | **4** |
| Becker | 39 | 0 · 0 · 1 (Contorion-„Becker“ ist ein anderer Hersteller) | wenig: R 30/17, EC541-II | Funkbroschüre Centronic/B-Tronic | **5**, als Abschnitt |
| Elero | 70 | 0 · 0 · 0 | TempoTel 2 (128) | nicht geprüft | **6**, als Abschnitt |
| Jarolift | 78 | 0 · 0 · 0 | Handsender nur als Fremdmarke (Superrollo) | nicht geprüft | **7**, als Abschnitt |
| Warema | 117, fast nur Markise und Raffstore | 0 · 5 · 0 | — | — | nicht für Rollladen |
| Roma, Alulux | 43 / wenige | 0 | — | — | Zeile im Bereich (Vorbaurollladen) |
| Alukon, Heroal | 8 / 16 | 0 | — | — | nur Zeile |
| WIR elektronik, Superrollo, Nobily, Kaiser Nienhaus | über Produktbegriffe | OTTO 7 / 0 / 7; Contorion Kaiser Nienhaus 15 | eWickler 737, GW60 2.410 | Titel mit Gurtbreite und Zugkraft | als Zeilen auf Teileart-Seiten |

### Reihenfolge der Marken-Dateien

1. **Schellenberg** (`data/ersatzteile/schellenberg.json`) mit Mini und Maxi als Serien. Trägt Gurt, Wickler, Kapseln, Lager und Aufhängung in zwei Partnershops; ohne Schellenberg gibt es für die Selbermach-Teile keine Kaufzeile.
2. **Somfy** (`somfy.json`). Größte Nachfrage, beste Motordaten, Funkfragen io/RTS. Kauf über Contorion und Amazon.
3. **Rademacher** (`rademacher.json`). Contorion-Schwerpunkt (RolloTron, RolloTube, DuoFern).
4. **Selve** (`selve.json`), wenn die Handsender-Seite steht; vorher als Abschnitt.
5. Becker, Elero, Jarolift nur, wenn die Search Console danach fragt.

## 7. Nicht verfolgt

- **Rollladen kaufen nach Maß, Vorbau- und Aufsatzrollläden als Neukauf:** viele Vorschläge („vorbaurollladen auf maß“, „aufsatzrollladen kosten“), aber Kauf ohne Reparaturbezug und Einbau am Fenster. Höchstens im Ratgeber als Hinweis.
- **Motor anschließen, Anschlussplan, Schalter verdrahten, KNX-Aktoren:** Elektrofachkraft (Abschnitt 4). Die 42 Schalter und Aktoren bei Contorion bleiben ungenutzt.
- **Smart Home** (Homematic IP, Shelly, Fritzbox, Matter): Fragen da („gurtwickler fritzbox kompatibel“), aber die Aktoren sitzen in der Unterputzdose. Als Frage in `rollladen-handsender`, kein eigener Ratgeber.
- **Raffstore, Jalousie, Markise:** eigene Produkte mit eigenen Antrieben (Warema), gehören nicht in diesen Bereich.
- **Rollladenkasten dämmen:** 8 bis 11 Artikel und einige Fragen, aber kein „welches passt?“. Abschnitt im Bereich.
- **Garagentor- und Rolltorantriebe:** Bereich „Garagentor“ (Rang 7).
- **Dachfenster-Rollläden** (VELUX, Roto): bei Dachfenster.

## 8. Empfehlung

**Rollladen vor Wasserfilter auf Rang 2. Wasserfilter rückt auf Rang 3.**

Gründe:

1. **Kaufbarkeit.** Bereinigt 53 · 148 · 127 Teile gegen 0 · 23 · 13 bei Wasserfilter, dazu Amazon mit Originalteilen in vierstelligen Bewertungszahlen. Nach `BEREICHE-REIHENFOLGE.md` 2.3 ist das der harte Punkt, an dem Wasserfilter schon hinter Dachfenster gerutscht ist.
2. **Selbermachen.** Gurt, Wickler, Kapsel, Lager, Aufhängung, Lamellen und Handsender tauscht man selbst; das ist der größere Teil der Fragen. Bei Wasserfilter endet die halbe Nachfrage beim Kundendienst. Der Motor fällt raus, die Auswahl des Motors nicht.
3. **Nähe.** Gleicher Hauptbereich wie Dachfenster, gleiche Shops (hagebau, OTTO), und Schellenberg führt auch Insektenschutz (Rang 6). Dachfenster-Rollladen und Rollladen teilen sich Funk- und Akkufragen.
4. **Dagegen:** kleiner Warenkorb bei den Selbermach-Teilen (Gurt 6 €, Wickler 11 €). Das Geld liegt bei elektrischen Gurtwicklern, Handsendern und Motoren. Und die Planner-Zahlen fehlen hier wie dort.

Ob Rollladen schon vor Wasserfilter gehört hätte: Ja. Die Feed-Zählung in `KEYWORDS-WASSERFILTER.md` (45 · 166 · 160) lag bereits vor und zeigte dasselbe Bild; offen war dort nur die Grenze beim Motor. Die ist jetzt geklärt und betrifft einen kleineren Teil der Seiten als angenommen.

**Rechner „Welcher Rollladenmotor?“:** lohnt sich, aber nach den A-Seiten.
- Dafür: Die Daten sind offen und prüfbar (Somfy-Zugkrafttabelle mit kg je Höhe, Schellenberg Zugkraft und Fläche, Selve TR). Der Rechner verbindet drei Seiten (Motor, Welle, Aufhängung) und führt zu Contorion- und Amazon-Motoren. Somfy gibt an, dass Antriebe mit Hinderniserkennung feste Verbinder brauchen; das ist ein Ergebnis, das kein Händler-Rechner ausgibt.
- Dagegen: rund 40 Vorschläge mit „berechnen“, „Nm“, „Zugkraft“, es gibt schon Rechner (sanier.de), und den Einbau macht die Elektrofachkraft.
- Zuschnitt: Breite, Höhe, Material und Welle rein; Panzergewicht, Nm-Bereich mit Reserve, Wellenadapter und Aufhängung raus. Flächengewichte je Material (PVC, Alu, Holz) vor dem Bau aus Herstellerangaben belegen, nicht schätzen. Die Herstellergrenzen sind nicht einheitlich (Somfy rechnet in kg bei zwei Höhen, Schellenberg in kg und m² Kunststoff), der Rechner zeigt deshalb je Hersteller die passende Klasse statt einer einzigen Zahl.

**Zuschnitt für den Start:** Bereich und die 12 A-Seiten. Rechner, Aufhängung, Lamellen, elektrischer Gurtwickler, Rademacher und Selve als B, wenn die Search Console Impressionen zeigt.

Vor dem Start: **Planner-Abfrage nachholen** mit rollladengurt, rolladengurt wechseln, gurtwickler, gurtwickler elektrisch, rollladenmotor, rohrmotor, rollladen elektrisch nachrüsten, somfy io, somfy handsender, achtkantwelle sw60, rollladen lamellen, rollladen klemmt, rollladengurt gerissen, schellenberg rollladen, rademacher rollotron. Liegen „gurtwickler“ und „rollladengurt“ unter 1.000 im Monat, bleibt es bei sechs A-Seiten (Bereich, Gurt, Gurtwickler, Gurt gerissen, Handsender, Schellenberg).

## 9. Grenzen der Daten

- **Keine Planner-Zahlen.** Nichts in diesem Dokument ist eine Suchmenge.
- **Suchvorschläge sind keine Nachfrage.** Die a–z-Erweiterung bläht große Themen auf. Zwei Schreibweisen (rollladen, rolladen) liefern teils dieselben Vorschläge; die Zeilen nicht addieren. Die Absicht-Zählung schließt Maß- und Systemwörter ein und ist damit etwas weiter als bei Wasserfilter. Marken mit Garagentor, Markise oder Insektenschutz (Schellenberg, Somfy, Warema, Rademacher) sind zu hoch gezählt.
- **Beifang Dachfenster.** Viele Vorschläge zu Solar, Akku und Fernbedienung betreffen VELUX und Roto. Die Querschnittszahlen zu „Solar“ und „Akku“ gelten deshalb nicht für diesen Bereich allein.
- **Feed-Zählung nach Name und Markenfeld**, von Hand bereinigt. Die Zuordnung zu Teilearten ist eine Regex-Einteilung; einzelne Artikel können falsch stehen (etwa Reparatursets bei Gurtwicklern). Stand der Feeds: 4.11.2026.
- **Amazon nur stichprobenhaft**, 31 Suchen über Firecrawl, Bewertungszahlen vom 5.11.2026, keine Euro-Preise. Die ASINs stammen aus der Trefferliste; Produktseiten sind nicht einzeln geöffnet.
- **Herstellerdaten teils alt oder aus zweiter Hand.** Die Selve-TR-Anleitung ist von 2002 (Baureihe nicht mehr aktuell, aber die Wellenzuordnung TR1/SW40, TR2/SW60 gilt). Die Somfy-Zugkrafttabelle lag als Händler-PDF vor, ohne Datum. Lamellenmaße (37/52 mm) stammen aus Händlerangaben. Selve-Funkangaben (iveo/commeo, RC-Motoren) kommen von selve.de-Pressetexten und Händlerseiten.
- **Funkkompatibilität unvollständig.** Rademacher DuoFern, Schellenberg, Elero, Jarolift und die Frage „jarolift kompatibel mit somfy“ sind nicht geprüft.
- **Rechtliche Grenze nicht abschließend.** Ob ein steckerfertiger elektrischer Gurtwickler ohne Elektrofachkraft montiert werden darf, sagt nur die Herstelleranleitung, und Schellenberg verneint es. Ob mechanische Endlagen am Motor eine Arbeit für die Elektrofachkraft sind, ist nicht geprüft.
- **Konkurrenz nicht erhoben.** Keine Google-Ergebnisseiten abgefragt.

## Quellen

- Somfy, Zugkrafttabelle Einsteckantriebe für Rollladen (Händler-PDF): https://avosdim.com/media/DE/motor/mot-oximo-io/desc/somfy-zugkrafttabelle.pdf
- Schellenberg, STANDARD Rohrmotoren im Vergleich: https://schellenberg-shop.de/media/pdf/11/4f/51/schellenberg-rohrmotor-standard-vergleich.pdf (nur als Quelle, Hersteller-Shop)
- Schellenberg, Montageanleitung RolloDrive 55 (2025): https://schellenberg-shop.de/media/af/e7/5d/1747747186/montageanleitung-rollodrive-55-schellenberg.pdf (nur als Quelle, Hersteller-Shop)
- Selve, Einstellanleitung Rohrmotore Baureihe TR (04.2002): https://www.selve.de/media/f3/6d/99/1627563307/SELVE_BA_TR.pdf
- Selve, commeo und iveo (Pressetext): https://www.selve.de/en/pressebereich/anything-is-possible-with-just-one-radio-system
- Selve, iveo als Vorgänger von commeo: https://www.selve.de/en/products/controls/iveo/
- Becker, Funksysteme B-Tronic und Centronic (Broschüre): https://becker-antriebe.com/fileadmin/user_upload/Folder_Smarte_Funksysteme__4995_000_034_0__D.pdf
- Becker, CentronicPlus: https://becker-antriebe.com/fileadmin/user_upload/Folder_CentronicPlus__4995_000_015_0__D.pdf
- Somfy RTS und io, Frequenzen und Kompatibilität (Händlerseite): https://avosdim.com/uk/shopping-guide/motorisation-universe/io-protocol-motors-by-somfy.html
- Somfy-Adapter für SW70-Wellen (Händlerseite): https://avosdim.com/uk/somfy-60mm-motor-selve-martin-sw70-9420335-tube-adapters.html
- Hornbach-Datenblatt Schellenberg Rollladenprofil Mini (37 mm): https://media.hornbach.lu/hb/datasheet/as.6416003.pdf

# Bereiche nach Sanitär: Hauskarte und Reihenfolge

Stand: 4. November 2026. Legt fest, welche Bereiche nach Bad & Sanitär dazukommen und in welcher Reihenfolge. Ergänzt `SEITENAUFBAU.md` Abschnitt 2a. Die Bewertung ist eine Einschätzung aus der Arbeit am Sanitärbereich, keine Messung. Vor jedem Bereich steht deshalb eine Datenprüfung (Abschnitt 4).

## 1. Die Klammer ist das Haus

Die Seite ordnet nach Stellen im Haus, nicht nach Produktarten, so wie womo-teile nach dem Wohnmobil ordnet. Es gibt vier Hauptbereiche. Jeder Bereich in `src/lib/bereiche.ts` gehört zu genau einem davon.

| Hauptbereich | Bereiche darin |
|---|---|
| Bad & Küche | Waschtisch & Armatur, Dusche & Badewanne, WC & Spülkasten, Küchenspüle & Armatur, Abfluss & Siphon |
| Wasser & Wärme | Wasseranschluss & Leitung, Hebeanlage & Abwasser, Wasserfilter & Enthärtung, Warmwasser, Lüftungsfilter, später eventuell Heizkörper-Thermostat |
| Fenster & Türen | Dachfenster, Rollladen, Insektenschutz, Türen & Schlösser |
| Außen & Garten | Wasser im Garten, Garagentor |

Ausgebaut wird von innen nach außen. Ein äußerer Hauptbereich kommt erst, wenn die inneren Traffic bringen. Ausnahmen: Wasser im Garten darf wegen der Saison vorrücken (Abschnitt 3). Dachfenster steht seit 4.11.2026 vor Wasserfilter, weil die Teile dort in den Partnershops liegen und man das Zubehör selbst tauscht (`KEYWORDS-WASSERFILTER.md` Abschnitt 8, `KEYWORDS-DACHFENSTER.md`).

## 2. Woran ein Bereich gemessen wird

1. **Gibt es ein „welches passt?“** Ein Maß, eine Nummer oder ein Typenschild, an dem hängt, welches Teil oder Gerät passt, und der Hersteller veröffentlicht die Daten dazu. Das ist unser Vorteil gegenüber Shops und Testseiten, und wir brauchen dafür weder Videos noch eigene Fotos. Ohne diese Frage gibt es keinen Bereich.
2. **Darf man es selbst machen?** Nichts, was laut Vorschrift ein eingetragener Fachbetrieb oder eine Elektrofachkraft machen muss.
3. **Gibt es die Teile zu kaufen?** In den Awin-Feeds (Contorion, hagebau, OTTO) oder bei Amazon mit prüfbarer ASIN.
4. **Wie nah liegt es an dem, was es schon gibt?** Gleiche Leser, gleiche Shops, gleiche Marken.
5. **Warenkorb und Nachfrage.** Erst nach der Prüfung in Abschnitt 4 belastbar.

## 3. Reihenfolge

### Vorher: Sanitär fertig machen

Sanitär gilt als fertig, wenn die A-Seiten aus `KEYWORDS-SANITAER.md` stehen (Eckventil, Siphon, Perlator, Kartusche, Ablaufgarnitur, Füllventil, Spülkasten, WC-Sitz-Befestigung, Druckminderer, Unterputz-Duscharmatur, Wasserhahn tropft, Spülkasten läuft nach, Küchenarmatur, Duschsystem), die Marken Hansa, TECE, Schell, Villeroy & Boch und Kludi angelegt sind und die zwei neuen Bereiche „Abfluss & Siphon“ und „Wasseranschluss & Leitung“ in `bereiche.ts` stehen.

### Danach

| Rang | Bereich | Hauptbereich | Die Frage „welches passt?“ | Warenkorb (geschätzt) | Vor dem Start prüfen |
|---|---|---|---|---|---|
| 1 | **Dachfenster** | Fenster & Türen | Rollo, Verdunkelung, Hitzeschutz, Dichtung und Akku nach dem Code auf dem Typenschild (VELUX MK04 = M04 = 304, Roto 074/118), Original oder Nachbau | Rollo 50–230 €, Markise 100–160 €, Akku 25–50 € | **Geprüft**, siehe `KEYWORDS-DACHFENSTER.md`: hagebau 667 VELUX-Artikel, neue Größenseite je VELUX-Code. Offen: Planner-Zahlen. |
| 2 | **Wasserfilter & Enthärtung** (kleiner Zuschnitt) | Wasser & Wärme | Filtereinsatz je Rückspülfilter und Hauswasserstation (Judo, BWT, Resideo), Salz je Enthärtungsanlage; Druckminderer zieht hierher um | Filtereinsatz 25–90 €, Salz wiederkehrend | **Gebaut am 5.11.2026** (Branch `feat/bereich-wasserfilter`): Bereich, 3 Teilearten, 4 Probleme, Ratgeber Rückspülfilter, Marken Judo, BWT, Resideo, SYR, Grünbeck. Offen: Planner-Zahlen. |
| 3 | **Rollladen** | Fenster & Türen | Gurtbreite 14 oder 23 mm, Gurtwickler, Wellenprofil SW40/SW60, Motor nach Drehmoment und Gewicht des Panzers; dazu ein Rechner „Welcher Rollladenmotor?“ | Gurt 10–30 €, Motor 80–250 € | **Geprüft**, siehe `KEYWORDS-ROLLLADEN.md`: Feeds 53 · 148 · 127 Artikel, hätte vor Wasserfilter gehört. A-Seiten im Bau (Branch `feat/bereich-rollladen`). Offen: Planner-Zahlen, Funk-Matrix Rademacher/Elero/Jarolift. |
| 4 | **Wasser im Garten** | Außen & Garten | Oberteil für frostsichere Außenwasserhähne (Schell, Kemper), Ersatzteile je Gartenpumpe und Hauswasserwerk (Druckschalter, Rückschlagventil), Kupplungssysteme, Fallrohrfilter nach Rohrdurchmesser | Pumpe 150–600 € | Ersatzteillisten Gardena, Kärcher, Einhell; Saison: bis März online, sonst ein Jahr warten |
| 5 | **Warmwasser** | Wasser & Wärme | Welcher Durchlauferhitzer oder Untertischspeicher zu Anschluss und Armatur passt (druckfest oder drucklos), schließt an die Niederdruckarmatur an | 200–600 € | Nur Auswahl und Neukauf. Reparatur am Gerät ist Arbeit für die Elektrofachkraft und kommt nicht vor. |
| 6 | **Insektenschutz** | Fenster & Türen | Spannrahmen, Plissee und Rollo nach Fenstermaß und Einbauart | 30–150 € | Konkurrenz durch Amazon selbst, saisonal (Frühjahr) |
| 7 | **Garagentor** | Außen & Garten | Welcher Handsender zum Antrieb passt (Hörmann, Novoferm, Sommer), Ersatzteile am Antrieb | Handsender 30–60 €, Antrieb 200–500 € | Kompatibilitätslisten der Hersteller |
| 8 | **Türen & Schlösser** | Fenster & Türen | Schließzylinder nach Maß, Türdrücker nach Vierkant und Rosette, Türdichtung | 20–150 € | Nachfrage, Abgrenzung zu Einbruchschutz |
| 9 | **Lüftungsfilter** | Wasser & Wärme | Ersatzfilter je Lüftungsanlage (Zehnder, Pluggit, Vallox) und Dunstabzug | 30–80 €, wiederkehrend | Nachbaufilter bei Amazon, Datenlage |
| 10 | **Heizkörper-Thermostat** | Wasser & Wärme | Thermostatkopf und Adapter je Ventil (Danfoss RA, M30 × 1,5), smarte Thermostate | 20–80 € je Heizkörper | **Nur nach Entscheidung Bernd.** Dann ausschließlich Thermostatkopf und Adapter, nichts, wofür der Heizkreis geöffnet wird. |
| 11 | **Rauchmelder** | Wasser & Wärme | Ersatz nach zehn Jahren, Funkvernetzung passend zum vorhandenen System | 20–50 € | Kleines Thema, eher ein einzelner Ratgeber |

Unter Bad & Küche, ohne eigenen Bereich: zwei oder drei Datenblatt-Seiten zu Fliesen (Bohrkrone für Eckventil und Armatur, Fliesenschneider nach Fliesenformat). Mehr Fliesen gibt es nicht, weil es dort kein „welches passt?“ gibt.

## 4. Prüfung vor jedem Bereich

Bevor ein Bereich angefangen wird, kommt dieselbe Auswertung wie in `KEYWORDS-SANITAER.md`: Keyword-Planner-Stufen, Google-Suchvorschläge mit Reparatur- oder Kompatibilitätsabsicht, Zählung in den Awin-Feeds und die Frage, ob die Hersteller Ersatzteillisten, Maße oder Kompatibilitätslisten veröffentlichen. Fehlt die Herstellerseite oder ist die Nachfrage deutlich kleiner als angenommen, rutscht der Bereich nach hinten. Das Ergebnis kommt als eigene Datei nach `docs/`. Bisher geprüft: `KEYWORDS-DACHFENSTER.md` (Rang 1) und `KEYWORDS-WASSERFILTER.md` (Rang 2, verkleinert). Für beide fehlen noch die Planner-Zahlen.

## 5. Nicht verfolgt

| Thema | Grund |
|---|---|
| Elektroinstallation (Schalter, Steckdosen, Leuchten) | Arbeit für die Elektrofachkraft |
| Gas, Therme, Heizkessel | Arbeit für einen eingetragenen Fachbetrieb |
| Dach und Dacharbeiten | Sicherheit, kaum ein „welches passt?“ |
| Haushaltsgeräte | In der Hand großer Ersatzteilshops, keine Daten in unseren Feeds |
| Hochdruckreiniger und andere Geräte | Kein Teil des Hauses. Die Zubehörfrage wäre gut, passt aber nicht ins Bild. |
| Reine Arbeitsanleitungen (Silikonfuge, Fliesen verlegen, Wand streichen) | Kein Vorteil gegenüber Videos und Baumärkten |
| Boden (Laminat, Vinyl) | Kauf im Baumarkt, kaum Werkzeug, keine Kompatibilitätsfrage |
| Möbel und Ausstattung (Duschwand, Spiegelschrank, Badewanne) | Kauf ohne Reparaturbezug, siehe `KEYWORDS-SANITAER.md` 1c |
| Werkzeug als eigene Seiten | Seit 4.11.2026 entfernt. Werkzeug erscheint nur in Materiallisten von Rechnern und Bereichsseiten. |

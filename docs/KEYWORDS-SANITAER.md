# Keywords und Marken im Sanitärbereich: was als Nächstes kommt

Stand: 4. November 2026. Grundlage für die nächste Runde Inhalte im Bereich Bad und Sanitär. Ergänzt die Keyword-Karte in `SANITAER-NEUAUFSTELLUNG.md` (Abschnitt 2) um Suchvolumen und um die Produkte und Marken, die dort fehlen. Seitentypen und URLs nach `SEITENAUFBAU.md` Abschnitt 2a.

## Datengrundlage

- **Google Keyword Planner**, Export vom 4.11.2026, Deutschland, Deutsch, Oktober 2025 bis September 2026. 15.596 Begriffe aus fünf Abfragen („Suchvolumen und Prognosen“ für rund 110 feste Begriffe, „Neue Keywords entdecken“ für drei Zehnerblöcke Marken, Teilearten, Produkte und Probleme). Das Konto schaltet keine Anzeigen, deshalb nennt der Planner nur Stufen: **10–100, 100–1.000, 1.000–10.000, 10.000–100.000** Suchen im Monat. In den Tabellen steht die Stufe, nicht eine genaue Zahl.
- **Google-Suchvorschläge**, abgerufen am 4.11.2026 (hl=de, gl=de): 65 Produkt-Startbegriffe mit a–z-Erweiterung und 50 Marken mit 13 Zusätzen („ersatzteile“, „kartusche“, „tropft“ …) plus a–z hinter „ersatzteile“. 17.678 Vorschläge. Als Maß dient die Zahl der Vorschläge mit Reparatur- oder Kompatibilitätsabsicht (tropft, wechseln, welche, passt, Größe, Ersatzteil …).
- **Awin-Feeds** von hagebau (96.349 Produkte), Contorion (585.742) und OTTO (Feed „Wohnen, Spielzeug und Baumarkt“, 321.530), Stand 4.11.2026. Gezählt nach `brand_name`, je Marke alle Artikel und davon die Ersatzteile (Kartusche, Oberteil, Dichtung, Scharnier, Füllventil …).
- **Amazon, Foren, Herstellerunterlagen** per Websuche: ob Originalteile mit ASIN gelistet sind, ob es Forenfragen gibt, ob der Hersteller Ersatzteillisten veröffentlicht.
- **Search Console:** Die Monatsberichte im Gmail (Juni bis Oktober 2026) nennen nur die drei besten Seiten und Suchanfragen. Im Sanitärbereich steht dort nur `geberit-sigma-drueckerplatte` (43–50 Klicks im Monat) und `vorwandelement-wc` (36). Für einzelne Suchbegriffe bleibt die Auswertung März bis Juni in `SANITAER-NEUAUFSTELLUNG.md` die Quelle.
- **Bestehende Recherche:** Fragenkatalog `SEITENAUFBAU.md` 4a, offene Fragen in `data/recherche/fragen/*.json` (`weitere_fragen_ohne_antwort`).

Rohdaten (Vorschläge, Feed-Zählung) liegen außerhalb des Repos im Notizordner dieser Sitzungsgruppe, Unterordner `keywords-sanitaer`.

## Kurzfassung

- Die größte Nachfrage im ganzen Bereich haben **Teile, die jeder hat**: Siphon, Eckventil und Perlator stehen als einzige Sanitärbegriffe in der Stufe 10.000–100.000. Dahinter kommen Ablaufgarnitur, Füllventil, WC-Sitz-Befestigung, Druckminderer, „Spülkasten läuft nach“ und „Wasserhahn tropft“ mit je 1.000–10.000. Für keinen dieser Begriffe gibt es heute eine Seite.
- Eckventil, Perlator/Strahlregler, Kartusche, „Spülkasten läuft nach“ und „Armatur tropft“ stehen schon in der Keyword-Karte. Mit den Planner-Zahlen rücken sie nach vorn (Tabelle 1b).
- Bei den Marken liegt **Hansa** klar vorn: die meisten Suchbegriffe mit Reparaturabsicht unter den Kandidaten (333), Originalkartuschen mit ASIN bei Amazon und rund 900 Hansa-Ersatzteile bei Contorion. Danach folgen **TECE**, **Schell**, **Villeroy & Boch** und **Kludi**.
- Die Spülkasten-Marken Mepa, Sanit, Friatec, Jomo und Viega (Unterputz) haben einzeln wenig Nachfrage. Zusammen tragen sie eine Teileart-Seite „Spülkasten-Ersatzteile: Welcher Kasten ist verbaut?“.

## 1. Neue Seiten

### 1a. Noch nirgends geplant

Priorität: **A** = als Nächstes (Volumen ab 1.000 im Monat oder starker Bezug zu bestehenden Seiten, Teile im Partnershop oder bei Amazon), **B** = danach, **C** = später oder nur als Abschnitt.

| Ziel-URL | Seitentyp | Suchbegriffe (Planner-Stufe) | Beleg | Prio |
|---|---|---|---|---|
| `/ersatzteile/siphon` | Teileart | siphon waschbecken, siphon, waschbecken mit siphon (10.000–100.000); siphon spüle, siphon waschmaschine, raumsparsiphon, tauchrohr siphon, siphon keildichtung (1.000–10.000); siphon wechseln (100–1.000) | 1.565 Begriffe im Planner, 42 davon ab 1.000. Vorschläge: Größen, Gummimanschette 50/40, Verlängerung 32 mm, Geräteanschluss, „undicht was tun“, „läuft nicht ab obwohl frei“. Kein Ratgeber in den Ergebnissen, nur Shops. Warenkorb klein (10–40 €). | A |
| `/ersatzteile/ablaufgarnitur` | Teileart | ablaufgarnitur waschbecken, ablaufventil waschbecken, waschbecken ablaufstopfen, ablaufgarnitur spüle (1.000–10.000); pop up ventil, push open ablaufventil (100–1.000) | 1.004 Begriffe, 14 ab 1.000. Vorschläge: mit oder ohne Überlauf, Aufsatzwaschbecken, Länge des Gewindes, „geht nicht raus“, „immer offen“. Markenübergreifend, die Blanco- und Franke-Seiten decken nur deren Spülen ab. | A |
| `/ersatzteile/fuellventil` | Teileart | spülkasten füllventil, spülkasten schwimmerventil, schwimmerventil spülkasten, geberit füllventil (1.000–10.000); tece füllventil, tece füllventil f10 (100–1.000) | 462 Begriffe, 11 ab 1.000. Universal-Füllventile (Geberit 383, TECE F10 9820353 mit Adaptern für Geberit, Grohe, Sanit, Viega, Friatec) sind die Antwort auf „welches passt“. TECE F10 bei Amazon mit rund 2.400 Bewertungen (ASIN B074HC9Z2X). | A |
| `/ersatzteile/spuelkasten` | Teileart: Spülkasten erkennen | spülkasten ersatzteile, tece spülkasten ersatzteile (1.000–10.000); mepa, sanit, viega, friatec, villeroy und boch spülkasten ersatzteile (je 100–1.000) | Vorschläge: „spülkasten nummer finden“, Jomo, Oli, Cornat, Kiwa. Die offenen Geberit-Fragen in `data/recherche/fragen/geberit.json` (Nachbau-Füllventile, V&B-Kästen mit Geberit-Technik) gehören hierher. Mepa veröffentlicht Ersatzteilblätter je Kastentyp mit Baujahrgrenzen (z. B. E31: Füllventil-Set bis 10.2015 / ab 11.2015). Gegenstück zum Typenschild-Ratgeber bei womo-teile. | A |
| `/ersatzteile/wc-sitz-befestigung` | Teileart | wc sitz befestigung, befestigung toilettendeckel (1.000–10.000); wc sitz befestigung von oben, wc sitz verdeckte befestigung, wc sitz scharnier mit absenkautomatik, duravit / villeroy und boch wc sitz befestigung (100–1.000) | 317 Begriffe, 6 ab 1.000. Vorschläge: von oben oder unten, Lochabstand 16/18 cm, „löst sich immer“, „passt nicht“, Steckbefestigung demontieren. V&B nennt Scharnier-Nummern je Sitz in den Datenblättern (z. B. Subway 9M55S1: 9220 55 61). Contorion führt V&B- und Duravit-Sitze und Befestigungen. | A |
| `/ratgeber/druckminderer` | Ratgeber mit Auswahlhilfe | druckminderer, druckminderer wasserleitung, druckminderer mit wasserfilter, druckminderer hauswasserleitung (1.000–10.000); druckminderer einstellen (100–1.000) | 995 Begriffe ohne Gas, CO2 und Druckluft, 10 ab 1.000. Auswahl: mit oder ohne Filter (Kombi), Anschluss 3/4" oder 1", Rückspülung. Warenkorb 50–200 €. Passt zu keinem der fünf Bereiche, braucht also einen neuen Bereich „Wasseranschluss & Leitung“ oder einen Platz in „Hebeanlage & Abwasser“. | A |
| `/ratgeber/unterputz-duscharmatur` | Ratgeber mit Auswahlhilfe | unterputz duscharmatur, unterputz armatur dusche, hansgrohe / grohe unterputz duscharmatur (1.000–10.000) | 478 Begriffe, 21 ab 1.000. Hoher Warenkorb (Fertigset 150–500 €). Reparaturbezug: passt das neue Fertigset auf den alten Grundkörper (iBox universal, Rapido SmartBox), offene Frage in `hansgrohe.json`. **Abstimmen mit der Sitzung, die `/ratgeber/duschthermostat` baut:** Entweder eigener Ratgeber oder „Unterputz“ als Frage in der Auswahlhilfe dort. | A |
| `/ersatzteile/duschablauf` | Teileart | siphon dusche, siphon badewanne, geruchsverschluss dusche, viega duschablauf (1.000–10.000) | 152 Begriffe, 12 ab 1.000. Vorschläge: Deckel 75/110 mm, flach 40/50 mm, „läuft schlecht ab“, „stinkt“. Viega (Domplex, Tempoplex) ist hier die Hauptmarke. | B |
| `/ersatzteile/ab-und-ueberlaufgarnitur` | Teileart (Badewanne) | ablaufgarnitur badewanne, überlaufgarnitur badewanne, viega multiplex / tempoplex ersatzteile, kaldewei ablaufgarnitur ersatzteile (100–1.000) | 199 Begriffe. Viega veröffentlicht Gebrauchsanleitungen und Ersatzteilsets im Webkatalog (web-catalog.viega.com). Bowdenzug-Längen, Ventilkegel, Haarsieb. | B |
| `/ersatzteile/brauseschlauch` | Teileart | brauseschlauch, duschschlauch (1.000–10.000); versenkbarer brauseschlauch badewanne (100–1.000) | 683 Begriffe. Vorschläge: Gewinde, Länge, „passt nicht an Armatur“, „passt nicht in Halterung“, Metall oder Kunststoff, konische oder zylindrische Mutter (offene Frage in `hansgrohe.json`). Viele Originale bei Amazon. | B |
| `/problem/pop-up-ventil-klemmt` | Problem | pop up ventil (100–1.000); Vorschläge „geht nicht mehr hoch“, „klemmt“, „höhe einstellen“, „undicht“ | 47 Vorschläge mit Absicht. Führt auf `/ersatzteile/ablaufgarnitur`. | B |
| `/ratgeber/rueckflussverhinderer` | Ratgeber (kurz) | rückflussverhinderer (1.000–10.000); wasserhahn mit rückflussverhinderer, trinkwasser rückflussverhinderer, schrägsitzventil mit rückflussverhinderer (100–1.000) | 215 Begriffe, aber gemischt: Garten, Trinkwasser (DIN EN 1717), Abwasser. Nur der Trinkwasser-Teil passt. Eher als Abschnitt in `druckminderer` oder `eckventil`, eigene Seite erst, wenn die beiden laufen. | B |
| `/problem/umsteller-klemmt` | Problem | umsteller badewanne, umsteller badewannenarmatur (100–1.000) | 35 Begriffe, Vorschläge „klemmt“, „undicht“, „defekt“. Kleines Thema, aber direkt am Wannenarmatur-Ratgeber. | C |
| `/ratgeber/aussenwasserhahn-frostsicher` | Ratgeber | außenwasserhahn frostsicher (nicht im Planner abgefragt); schell außenwasserhahn ersatzteile (100–1.000) | 99 Vorschläge, alle mit Kauf- oder Reparaturabsicht. Saisonal (Herbst). Schell und Kemper. Gehört eher in einen späteren Bereich „Außen“. | C |
| `/ratgeber/untertischspeicher` | Ratgeber | untertischspeicher druckfest oder drucklos, welche armatur (nicht im Planner abgefragt) | 154 Vorschläge, davon 31 mit Absicht. Ergänzt `/ratgeber/niederdruckarmatur`. Clage bei Contorion (168 Artikel). Berührt den späteren Bereich Heizung/Warmwasser. | C |

Nur als Abschnitt in einer der Seiten oben, keine eigene URL: Heberglocke und Spülventil (in `/ersatzteile/spuelkasten`, Planner fast leer), Waschmaschinenventil und Geräteventil (in `/ersatzteile/eckventil`), Wandanschluss für Siphon (in `/ersatzteile/siphon`).

### 1b. Schon in der Keyword-Karte, neu bewertet

| Ziel-URL (Vorschlag) | bisher geplant als | Planner-Stufe | Prio neu | Anmerkung |
|---|---|---|---|---|
| `/ersatzteile/eckventil` | `/ersatzteile/eckventil` | eckventil, eckventile (10.000–100.000); kombi eckventil, eckventil spülkasten, eckventil waschmaschine, eckventil 1 2 zoll, schell eckventil (1.000–10.000) | **A, zuerst** | 837 Begriffe, größter Cluster nach Siphon. Schell veröffentlicht einen Ersatzteilkatalog 2025 mit Oberteilen (z. B. Comfort 221310699). |
| `/ersatzteile/perlator` | `/ersatzteile/strahlregler` | perlator (10.000–100.000); wasserhahn strahlregler, wasserhahn sieb, perlator wasserhahn (1.000–10.000); strahlregler (100–1.000) | **A** | „Perlator“ wird zehnmal häufiger gesucht als „Strahlregler“. URL nach dem häufigeren Wort, „Strahlregler“ als Synonym im Titel. Größen M22/M24/M28, innen oder außen, die Daten stehen schon in `strahlregler_groessen` bei Grohe und hansgrohe. |
| `/ersatzteile/kartusche` | `/ersatzteile/kartusche` | wasserhahn kartusche, kartusche für wasserhahn (1.000–10.000); kartusche 35 mm, hansa / kludi kartusche (100–1.000) | **A** | Hansa- und Kludi-Kartuschen mit ASIN machen die Seite markenübergreifend brauchbar. |
| `/problem/wasserhahn-tropft` | `/problem/armatur-tropft` | wasserhahn tropft, wasserhahn tropft was tun (1.000–10.000); armatur tropft (10–100) | **A** | Slug ändern: „wasserhahn“ statt „armatur“. |
| `/problem/spuelkasten-laeuft-nach` | `/problem/spuelkasten-laeuft-nach` | spülkasten läuft nach, toilettenspülung läuft nach, unterputz spülkasten läuft nach, klospülung läuft nach (1.000–10.000) | **A** | 230 Begriffe. Verteilt auf die Marken-Probleme (Geberit, Ideal Standard, später TECE und Mepa). |
| `/ratgeber/kuechenarmatur` | `/bad/kuechenarmatur-ausziehbar` | küchenarmatur ausziehbar, wasserhahn küche mit brause (1.000–10.000); küchenarmatur wechseln (100–1.000) | **A** | Als `/ratgeber/kuechenarmatur` mit „Brause ausziehbar“ als Frage in der Auswahlhilfe, dazu Hoch- oder Niederdruck und Vorfenstermontage. Der Bereich Küche hat bisher keinen Ratgeber. |
| `/ratgeber/duschsystem` | `/bad/duschsystem-aufputz` | duschsystem, duschsystem mit thermostat (1.000–10.000); duschsystem aufputz (100–1.000) | **A** | „Aufputz“ und „Regendusche nachrüsten“ als Fragen in der Auswahlhilfe. Hoher Warenkorb. |
| `/problem/thermostat-wird-nicht-warm` | dito | thermostat dusche … nicht warm (Vorschläge, Planner 10–100 je Variante) | B | Marken-Probleme gibt es schon für Grohe, hansgrohe, Ideal Standard. Die Duschthermostat-Sitzung deckt den Neukauf ab. |
| `/ersatzteile/thermostatkartusche` | Konzept Phase C | thermostatkartusche, hansa thermostatkartusche (100–1.000) | B | |
| `/problem/armatur-wechseln` | dito | küchenarmatur wechseln, eckventil tauschen (100–1.000) | B | |
| — | `waschtischarmatur-schwarz` | — | **streichen** | Farbe ist laut `SEITENAUFBAU.md` Abschnitt 2 ein Filter im Waschtischarmatur-Ratgeber, keine eigene Seite. |
| — | `waschtischarmatur-hoher-auslauf` | — | **streichen** | Als Frage „Aufsatzwaschbecken?“ in `/ratgeber/waschtischarmatur`. |

### 1c. Nicht verfolgt

- **Kauf ohne Reparaturbezug:** Duschwand, Duschtür, Duschabtrennung, Badewanne, Duschwanne, Spiegelschrank, Waschtisch. Viele Vorschläge, aber Möbel- und Ausstattungskauf, gegen Baumärkte und Testseiten. Wannenträger nur als Abschnitt, wenn es einen Badewannen-Ratgeber gibt.
- **Anderer Bereich:** Durchlauferhitzer, Boiler, Enthärtungsanlage, Rückspülfilter, Heizkörperventil. Gehören zu Heizung und Warmwasser bzw. Wasseraufbereitung, eigener Bereich später.
- **Reine Pflegethemen:** „siphon reinigen“, „duschkopf entkalken“, „abfluss verstopft“. Hausmittel-Seiten ohne Teil, das man kaufen würde. Höchstens als Absatz auf der Teileart-Seite.
- **Kosten:** „eckventil tauschen kosten“, „hebeanlage einbauen kosten“ (außer der bestehenden `hebeanlage-kosten`) bleiben Absätze.

## 2. Marken

### Bewertung

Spalten: **Planner** = Zahl der Begriffe mit Reparaturabsicht und der stärkste davon; **Suggest** = Vorschläge mit Sanitär- und Reparaturbezug; **Shops** = Artikel / davon Ersatzteile bei Contorion, hagebau, OTTO; **Amazon** = Originalteile mit ASIN gefunden; **Daten** = veröffentlicht der Hersteller Ersatzteillisten. Die Konkurrenz ist bei allen Marken gleich: megabad, eBay, Hornbach, Kaufland, ManoMano und die Herstellerseiten. Redaktionelle Seiten zu „welches Teil passt“ gibt es bei keiner, nur Foren (HaustechnikDialog, gutefrage, bauexpertenforum) und KI-Forenseiten wie bau.de.

| Marke | Planner | Suggest | Shops (Contorion · hagebau · OTTO) | Amazon | Daten | Rang |
|---|---|---|---|---|---|---|
| **Hansa** | 333 Begriffe; hansaronda, hansamix, hansa varox ersatzteile, kartusche hansa 59904601, hansa thermostatkartusche (je 100–1.000) | 97 (Kartusche, Unterputz-Thermostat, Temperaturregeleinheit, „tropft“) | 2.252 / 902 · 17 / 7 · 14 / 2 | ja, viele Kartuschen (59913075, 59912324, 59911437, 59914129, 59904601) | Datenblätter mit Ersatzteil-Abschnitt je Armatur, Produktseite `static.hansa.com/<Nummer>` | **1** |
| **TECE** | 78; tece spülkasten ersatzteile (1.000–10.000), tece füllventil f10, tece spülkasten läuft nach (100–1.000) | 75 (Füllventil F1/F10, Ventilsitz A2, Urinal-Kartusche, Wassermenge einstellen) | 0 · 0 · 2 / 2 | ja, F10 9820353 rund 2.400 Bewertungen, F1, Ablaufventil A2 | Ersatzteil-PDFs (Spültechnik, Drosselsatz), Datenblätter; 25 Jahre Ersatzteilzusage für UP-Spülkästen | **2** |
| **Schell** | 122; schell eckventil (1.000–10.000), kombi eckventil comfort, geräteventil, polar 2 ersatzteile (100–1.000) | 47 (Eckventil, Außenventil, Druckspüler, Schellomat) | 925 / 221 · 2 / 0 · 4 / 0 | einzelne Oberteile und Eckventile | **Ersatzteilkatalog 2025** als PDF mit Nummernregister | **3** |
| **Villeroy & Boch** | 177; v&b wc sitz ersatzteile, wc sitz befestigung von oben, spülkasten ersatzteile, ersatzteilkatalog (je 100–1.000) | 81 (WC-Sitz-Scharnier, Kartusche, Push-Open-Ventil, Reparaturset Keramik/Acryl) | 48.397 / 1.400 · 0 · 790 / 11 | WC-Sitze und Scharniere | Technische Datenblätter je WC-Sitz mit Scharnier-Nummer | **4** |
| **Kludi** | 120; kludi ersatzteile, kludi kartusche, kludi topara ersatzteile, kludi küchenarmatur ersatzteile (je 100–1.000) | 73 (Kartusche 35/40/46 mm, Topara-Thermostat, UP-Ventil) | 0 · 0 · 2 / 1 | ja, 7560500-00 rund 1.000 Bewertungen, 7480500-00, 7447000-00, Spannschlüssel | kein öffentlicher Katalog gefunden, nur Händler-Datenblätter | **5** |
| Viega | 74 (ohne Pressmaschine, Fußbodenheizung); viega tempoplex / multiplex ersatzteile, viega spülkasten ersatzteile (100–1.000), viega duschablauf (1.000–10.000) | 62, aber viel Installationstechnik | 0 · 1 / 0 · 15 / 8 | wenige (Ablaufventil 7622) | Webkatalog mit Gebrauchsanleitungen und Ersatzteilsets | 6 |
| Keuco | 77, davon viel Seifenspender und Spiegelschrank; keuco ersatzteile (100–1.000) | 58 (IXMO, Edition 11, Plan) | 6.274 / 1.290 · 0 · 26 / 4 | kaum | megabad führt Teile je Armaturnummer | 7 |
| Duravit | 78; duravit wc sitz befestigung (von oben), duravit ersatzteile (100–1.000) | 48 (WC-Sitz, Push-Open, C.1-Kartusche) | 28.330 / 510 · 0 · 6 / 0 | Sitze, kaum Teile | kein Katalog gefunden | 8 |
| Dornbracht | 32; **dornbracht ersatzteile (1.000–10.000)**, dornbracht perlator, brauseschlauch (100–1.000) | 77 (Tara, Meta, Thermostat) | 0 · 0 · 1 / 1 | nicht geprüft | nicht geprüft | 9, Datenlage zuerst prüfen |
| Mepa, Sanit, Friatec | je 4–34; mepa / sanit / friatec spülkasten ersatzteile (100–1.000) | 24 / 29 / 17 | praktisch 0 | wenig | Mepa: Ersatzteilblätter je Kastentyp mit Baujahrgrenzen | als Teil von `/ersatzteile/spuelkasten` |
| Schütte | 4 (10–100) | 38 | 7 · 316 / 35 · 354 / 73 | nicht geprüft | keine Ersatzteilseite, Kartusche von der Garantie ausgenommen | später |
| Damixa, Laufen, Kaldewei, Eisl, Wenko | je unter 1.000 in Summe | 9–39, bei Damixa viel Dänisch | Eisl und Wenko bei OTTO, sonst kaum | — | — | nicht verfolgen; Laufen-Scharniere in `wc-sitz-befestigung`, Kaldewei-Ablauf in `ab-und-ueberlaufgarnitur` |
| Axor | — | 39 | 0 | — | — | gehört zu hansgrohe, in `hansgrohe.json` aufnehmen |
| KWC | nicht abgefragt | 111 | 0 | — | — | Schweizer Markt, nicht verfolgen |

### Reihenfolge der nächsten Marken-Dateien

1. **Hansa** (`data/ersatzteile/hansa.json`). Die meisten Suchbegriffe mit Reparaturabsicht unter den Kandidaten, mit Abstand vor TECE und Schell. Als einzige Kandidatin gut bei Amazon (Originalkartuschen) *und* im Partnershop vertreten (Contorion, rund 900 Teile mit Hansa-Nummer im Namen, z. B. „Hansa Oberteil 59912625“). Viele alte Unterputzarmaturen (Hansamix, Hansaronda, Varox) mit der Frage nach Teilen. Stand schon im Konzept als Phase F.
2. **TECE** (`tece.json`). Stärkster einzelner Marken-Suchbegriff unter den Kandidaten („tece spülkasten ersatzteile“, 1.000–10.000). Passt zu den bestehenden WC-Seiten (`tece-vs-geberit`, `vorwandelement-wc`) und zum Füllventil. Nachteil: Kein Partnershop führt TECE, es bleibt bei Amazon.
3. **Schell** (`schell.json`). Hängt an „eckventil“, dem größten Teile-Cluster. Beste Datenlage aller Kandidaten (öffentlicher Ersatzteilkatalog), Contorion mit über 900 Artikeln. Die Seite hat einen anderen Schwerpunkt als die Armaturen-Marken: Eck- und Geräteventile, Außenventile, Druckspüler.
4. **Villeroy & Boch** (`villeroy-boch.json`). Nachfrage vor allem zu WC-Sitz-Scharnieren und Spülkasten-Teilen, Contorion hat das größte Sortiment. Startet zusammen mit `/ersatzteile/wc-sitz-befestigung`. Armaturen-Kartuschen sind bei V&B Nebensache.
5. **Kludi** (`kludi.json`). Nachfrage ähnlich wie V&B, Originalkartuschen bei Amazon gut abgedeckt. Kein Partnershop, kein öffentlicher Katalog, deshalb erst nach den vier oben.

Danach Viega (mit Dusch- und Wannenablauf), Keuco und Duravit. Dornbracht zeigt im Planner überraschend viel Nachfrage („dornbracht ersatzteile“ 1.000–10.000), Shops und Datenlage sind aber nicht geprüft.

## 3. Grenzen der Daten

- **Planner-Stufen sind grob.** Eine Stufe umfasst eine Zehnerpotenz. „siphon waschbecken“ und „eckventil“ liegen beide bei 10.000–100.000, welcher größer ist, bleibt offen. Summen über Begriffe sind nur ein Hinweis auf Breite, keine Besucherzahl. Die Monatswerte im Export sind leer.
- **Die Abfrage bevorzugt einige Marken.** Hansa, Kludi, Keuco, Duravit, Villeroy & Boch, TECE, Viega, Schell, Mepa und Sanit waren Startbegriffe in „Neue Keywords entdecken“, deshalb hat der Planner zu ihnen mehr Varianten geliefert. Grohe, hansgrohe, Blanco, Franke, Ideal Standard und Dornbracht kamen nur über andere Begriffe hinein. Der Vergleich der Kandidaten untereinander ist fair, der Vergleich mit den bestehenden Marken und mit Dornbracht nicht.
- **Was nicht abgefragt wurde, fehlt im Planner.** Außenwasserhahn, Untertischspeicher, Dusch-WC und der WC-Sitz als Produkt standen in keiner Abfrage. Fehlende Zahlen heißen dort nicht „keine Nachfrage“. Das betrifft vor allem die C-Zeilen.
- **Mehrdeutige Begriffe sind herausgerechnet, aber nicht vollständig.** „Druckminderer“ ohne Gas, CO2 und Druckluft; „Hansa“ enthält trotzdem Bagger und E-Bike, „Viega“ Pressmaschinen, „Laufen“ das Verb, „Kessel“ fast nur Hebeanlagen.
- **Suchvorschläge sind keine Nachfrage.** Sie zeigen, wie breit gefragt wird, nicht wie oft. Die a–z-Erweiterung bläht große Themen auf. Sie sind deshalb nur Zusatzbeleg, wo der Planner keine Zahl hat.
- **Feed-Zählung nach Markenfeld.** Contorion schreibt Ideal Standard, TECE, Viega und Kludi offenbar anders oder führt sie nicht; das Ergebnis „0“ heißt nur, dass `brand_name` nicht passt. Die Ersatzteil-Zählung erkennt Teile am Produktnamen und ist eine Schätzung. Stand der Feeds: 4.11.2026.
- **Amazon nur stichprobenhaft.** Geprüft über die Websuche, nicht über Amazon selbst (der Abgleich ist gesperrt, siehe `SANITAER-NEUAUFSTELLUNG.md`). Bewertungszahlen und Preise sind Momentaufnahmen.
- **Konkurrenz nur qualitativ.** Es gab keine Ranking-Daten, nur einzelne Suchen. Dass dort nur Shops und Foren stehen, gilt für die geprüften Begriffe (Strahlregler-Größe, Eckventil-Größe, Kartuschen-Maße, WC-Sitz-Befestigung, Marken-Ersatzteile).
- **Search Console kaum nutzbar.** Die Monatsmails zeigen nur die Top 3. Ein Export „Suchanfragen“ über 16 Monate würde zeigen, für welche dieser Begriffe die Seite schon Impressionen hat.
- **Bereichsgrenzen.** Druckminderer, Rückflussverhinderer und Außenwasserhahn passen in keinen der fünf Bereiche in `src/lib/bereiche.ts`. Vor diesen Seiten muss feststehen, wo sie hängen.
- **URL der Teileart-Seiten nicht festgelegt.** `SEITENAUFBAU.md` 2a nennt „Teileart-Seiten“, aber keine URL. Diese Datei folgt der Keyword-Karte (`/ersatzteile/<teilart>`). Dann darf kein Marken-Slug wie eine Teileart heißen, und die Route muss beides unterscheiden.

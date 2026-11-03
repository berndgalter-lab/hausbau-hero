# Neukonzept hausbau-hero.de: Bad & Sanitär

Stand: 3. November 2026. Ersetzt die Fokus-Abschnitte in `UMBAUPLAN.md`.

## 1. Was die Recherche zeigt

### Womo-Teile: Das Muster funktioniert

**Traffic (Search Console):**

| Monat 2026 | Jun | Jul | Aug | Sep | Okt |
|---|---|---|---|---|---|
| Klicks | 196 | 255 | 413 | 790 | 1.350 |

- Das Wachstum kommt von den **Marken-Hubs** (`/fahrzeuge/poessl`, `/fahrzeuge/chausson`). Gefunden werden sie über Suchen wie „<Marke> ersatzteile bestellen/katalog“.
- **Google-Besuche gewinnt der Marken-Hub, Shop-Klicks gewinnt die Teile-Seite.**
- Der Ratgeber „Wo ist das Typenschild?“ war drei Monate lang die Nummer 2.
- Leute suchen nach Artikelnummern: Alle 26 solcher Suchen auf der Seite liefen ins Leere.
- Amazon verdient dort wenig, weil die Teile vor allem bei Fachshops (Camping-Wagner, Fritz Berger) gekauft werden.
  - **Bei Sanitär ist das anders:** Original-Teile von Grohe, Geberit und Blanco sind auf Amazon gelistet. Beispiele: Grohe-Kartusche 46048000 (ca. 39 €, über 3.800 Bewertungen), Geberit-Füllventile (20–45 €), Blanco-Ablaufgarnituren (ca. 60 €).

### Sanitär-Ersatzteile: Wer rankt, wo die Lücke ist

- **Die Suchergebnisse:** Bei „<Marke> ersatzteile“ dominieren megabad, eBay, Baumärkte und die Ersatzteilsuchen der Hersteller. Diese Begriffe sind für uns kaum zu gewinnen.
- **Die Lücke** ist die Frage „**Welches Teil passt zu MEINER Armatur bzw. MEINEM Spülkasten?**“:
  - Die Herstellerkataloge sind für Profis gebaut: Man muss die Nummer schon kennen.
  - Die Händler widersprechen sich, z. B. bei Grohe-Thermostatkartuschen, Blanco 138069, den Franke-Jahresgrenzen und Geberit 110.800.
  - Zu Kartuschengrößen, Strahlregler-Gewinden (M22/M24/M28), Geberit-Spülkastentyp und Füllventil-Wechsel gibt es keine neutrale, verständliche Seite. Es ranken nur Shops, Foren und KI-Forenseiten.
- **Eigene Vorgeschichte:** hausbau-hero hatte hier früher schon Traffic: „blanco ersatzteile“ (bis 01/2025), „franke spüle ersatzteile vor 1999“, „blanco classic 5s ersatzteile“, „geberit spülkasten ersatzteile“.

### Bad-Kaufberatung: Wer rankt, wo die Lücke ist

- **Die Konkurrenz** sind vor allem automatisch erzeugte „Test & Vergleich 2026“-Seiten ohne echten Test, also Noten ohne Methode und Jahreszahlen, die sich von selbst aktualisieren. CHIP, Computerbild und idealo spielen in Bad & Sanitär kaum eine Rolle.
- **„waschtischarmatur mit herausziehbarer brause test“:** Hier ranken nur Shops. Es gibt keine einzige redaktionelle Seite, obwohl die Nachfrage in unserer Search Console 10 Monate lang belegt ist.
- **Gewinnbar:** Kompatibilität (Drückerplatte ↔ Spülkasten, Niederdruck ↔ Untertischspeicher), Entscheidungshilfen („welches Vorwandelement bei Holzbalkendecke / unter Fenster“), Fehlersuche zu konkreten Modellen („Geberit UP320 läuft nach“) und ehrliche Vergleiche von 3–6 Modellen.
- **Nicht gewinnbar:** „bad renovieren kosten“ (Banken, Portale), allgemeine Anleitungen wie „dusche abdichten“ oder „wc austauschen“ (Baumärkte mit Video) sowie Spiegelschränke.
- **Stromerzeuger:** keine „Die 13 besten“-Listen mehr. Höchstens 2–3 Seiten mit Hausbezug (Notstrom für die Gastherme, Hebeanlage bei Stromausfall).

**Grenzen der Recherche:** Es gibt keine Suchvolumen-Daten. Die Websuche ist nicht identisch mit Google.de. Hersteller-Seiten und amazon.de waren aus der Sitzung nicht abrufbar. Die Nachfrage ist deshalb nur qualitativ geschätzt.

## 2. Positionierung

> **Hausbau Hero – Bad & Sanitär: das passende Ersatzteil finden, das richtige Produkt wählen, selbst einbauen.**

**Zielgruppe:** Eigentümer und Heimwerker mit einem konkreten Problem (tropft, läuft nach, Teil gebrochen) oder einer konkreten Kaufentscheidung.

**Unser Mehrwert gegenüber den anderen:**
- **gegenüber Herstellern:** für Laien verständlich, mit Hilfe beim Erkennen der eigenen Armatur
- **gegenüber Shops:** neutral und markenübergreifend
- **gegenüber automatisch erzeugten Testseiten:** echte Kompatibilitäts-Tabellen mit Quelle, keine erfundenen Noten

Die Domain bleibt, denn sie ist alt und hat Links. Der Fokus zeigt sich in Navigation, Startseite und Inhalten.

## 3. Neue Struktur

```
/                               Startseite mit drei Einstiegen:
                                „Ersatzteil finden“ · „Produkt auswählen“ · „Problem lösen“
/ersatzteile                    Marken-Übersicht + Suche nach Artikelnummer
/ersatzteile/<marke>            Marken-Hub (geberit, grohe, hansgrohe, ideal-standard, blanco, franke, …)
/ersatzteile/<marke>/<serie>    Serie/Modell: erkennen, Baujahre, passende Teile mit Quelle
/teil/<marke>-<oem-nummer>      Teil: Maße, passt zu, Einbau, Kaufen
/ersatzteile/<teiltyp>          Markenübergreifend: Kartusche-Größe, Strahlregler-Größe, Füllventil …
/problem/<slug>                 Problemlöser: Spülkasten läuft nach, Armatur tropft, Thermostat wird nicht warm
/bad/<thema>                    Kaufberatung & Kompatibilität (bestehende Bad-Seiten + neue)
```

### Seitentypen und Datenfelder (nach dem Womo-Teile-Datenmodell)

| Seitentyp | Pflichtfelder |
|---|---|
| **Marke** | Serien nach Produkttyp (Waschtisch, Dusche, Wanne, Küche, Spülkasten), „Wo steht die Nummer?“ mit Foto, Ersatzteil-Garantie des Herstellers |
| **Serie** | Marke, Produkttyp, Baujahre/Generation, Artikelnummern der Serie, Erkennungsmerkmale, Teileliste |
| **Teil** | OEM-Nummer, EAN, Maße/Gewinde/Durchmesser, Preisspanne, Verschleißteil ja/nein, selbst tauschbar + Schwierigkeit + Zeit + Werkzeug, Handwerkerkosten, **Amazon-Produktlink (ASIN, kein Suchlink)**, passt zu Serie × Baujahr |
| **Verknüpfung Serie ↔ Teil** | Hinweis (z. B. „bis 2015“), **Quelle** (Ersatzteilblatt mit Datum). Hier liegt der Mehrwert, weil die Händler sich widersprechen |
| **Problem** | Symptom, Ursachen nach Häufigkeit, betroffene Teile (verlinkt), Diagnose-Schritte, „ab hier Installateur“ |
| **Kaufberatung** | 3–6 Produkte statt 13, Kriterien-Tabelle (Hoch- oder Niederdruck, M10 oder 3/8", Kartusche, Ersatzteile), „für wen / nicht für wen“, Änderungsprotokoll mit Datum. **„Test“ nur, wenn wirklich getestet** (Wettbewerbsrecht/UWG), sonst „Vergleich“ oder „Kaufberatung“ |

Technisch bekommt Supabase neue Tabellen `marken`, `serien`, `teile` und `serie_teile` (mit `quelle`, `hinweis`) sowie `probleme`. Die Seiten-Vorlagen können aus dem Womo-Teile-Repo übernommen werden, dazu muss das Repo an die Sitzung angebunden werden.

## 4. Radikal aufräumen

**Regel:** Gelöscht wird, was **weder Traffic-Beleg noch Bad-Bezug** hat. Seiten mit Traffic außerhalb des Fokus bleiben vorerst, ohne Platz in der Navigation. Nach drei Monaten wird neu bewertet. Sobald der Bad-Bereich ihren Traffic ersetzt hat, fliegen sie auch raus.

| Bereich | Was | Entscheidung |
|---|---|---|
| Finanzen | 6 Artikel (hausbau-kosten-2026, kfw-foerderung-2026, baugenehmigung-ratgeber, kaufnebenkosten-guide, handwerkerkosten-guide, eigenleistung-hausbau) | **löschen** (kein Traffic-Beleg, kein Amazon-Bezug) |
| Finanz-Rechner | 6 Seiten (nebenkosten, foerdermittel, baugenehmigung, eigenleistung, handwerkerkosten, gewerk-reihenfolge) | **löschen** |
| Material-Rechner ohne Bad-Bezug | beton, daemmung, elektro, laminat, putz, tapeten, terrasse, trockenbau, wandfarbe, stromverbrauch | **löschen** |
| Rechner behalten | sanitaer, fliesen (Bad), estrich (35 Klicks in 06/2026) | behalten |
| Kosten-Artikel | daemmung-kosten, trockenbau-kosten, laminat-verlegen-kosten | **löschen** |
| Kosten-Artikel mit Bezug/Beleg | bad-sanieren-kosten, fliesen-verlegen-kosten, estrich-kosten (Wachstum 08/2026) | behalten |
| Werkzeug/Farbe/Rohbau mit Traffic | silikatfarbe, wandfarbe-weiss, kalk-zement-putz, deckenstuetze, kreuzlinienlaser-, wasserwaage-richtig-benutzen | **vorerst behalten**, aus der Navigation nehmen |
| Rest Werkzeug/Farbe/Garten | latexfarbe, steinimpraegnierung, haftgrund-putz, pflasterfugenmoertel, oberfraese-, mauernutfraese, sds-bohrer-set, maurerkelle | **löschen**, außer der Search-Console-Export zeigt Klicks |
| Stromerzeuger | stromerzeuger-vergleich | behalten; später zu „Notstrom fürs Haus“ umbauen |
| Alt-WordPress | 182 stillgelegte Seiten | Ersatzteil-Altseiten (blanco-ersatzteile, franke-ersatzteile, geberit-spuelkasten-ersatzteile) auf die neuen Marken-Hubs leiten; der Rest bleibt wie er ist |
| Silos/Navigation | 10 Kategorien | **neu:** Ersatzteile · Bad-Kaufberatung · Problemlöser (+ Archiv ohne Navigation) |

Gelöschte Seiten bekommen eine Weiterleitung, wenn es ein passendes Ziel gibt, sonst 410 („Gone“). Ein Sammel-Redirect auf die Startseite wird bewusst vermieden, weil Google das als Soft-404 wertet.

## 5. Reihenfolge

**Phase A – Fundament**
1. Aufräumen nach Abschnitt 4.
2. Datenmodell anlegen.
3. Vorlagen für Marke, Serie, Teil, Problem und Teiltyp bauen.
4. Artikelnummer-Suche einbauen.
5. Klick-Tracking pro Seite und Platzierung, mit Eingabeprüfung. Bei Womo-Teile landen ungeprüfte SQL-Injection-Versuche im `click_log`, das darf sich nicht wiederholen.
6. Navigation und Startseite umbauen.

**Phase B – Geberit** (beste Verbindung zu den heutigen Top-Seiten Geberit Sigma und Vorwand-WC, sehr gute Amazon-Abdeckung)
- Spülkastentyp erkennen
- Füllventil 380/383/333
- Spülventil/Heberglocke
- „Spülkasten läuft nach“
- Kompatibilitäts-Tabelle Drückerplatte ↔ Spülkasten
- Vergleich Sigma01/20/30/50
- Nachbau-Drückerplatten

**Phase C – Grohe und markenübergreifend**
- Kartuschengröße 28/35/46 mm je Serie
- Serie erkennen (Eurosmart, Europlus, Eurodisc, Essence)
- Mousseur/Cache-Strahlregler
- Strahlregler-Größe M22/M24/M28
- Thermostatkartuschen

**Phase D – Küche: Blanco & Franke** (alte Rankings)
- Blanco Ablaufgarnitur finden
- Blanco Classic 5 S
- Franke Ablaufgarnitur bis/ab 1999

**Phase E – Bad-Kaufberatung**
- Waschtischarmatur mit herausziehbarer Brause
- Niederdruckarmatur für Untertischspeicher
- Vorwandelement-Vergleich + Entscheidungsbaum
- Kleinhebeanlagen-Vergleich
- Thermostat oder Einhebel
- Duschsystem auf Aufputz nachrüsten

**Phase F – Hansgrohe (M1/M2/M3), Ideal Standard (Ceramix), Hansa, Kludi**

## 6. Was dafür nötig ist

| Was | Warum | Wer |
|---|---|---|
| **Eigene Fotos** (alte Teile, Typenschilder, eingebaute Produkte) | Hauptunterschied zu automatisch erzeugten Seiten; Google verlangt bei Vergleichen Belege für echten Gebrauch | Bernd |
| **Suchvolumen**: Semrush/Ahrefs/Ubersuggest anbinden oder Keyword-Planner-Export | Reihenfolge der Marken und Serien nach echter Nachfrage festlegen | Bernd (Konnektor oder CSV) |
| **Netzwerk-Freigaben**: grohe.de, hansgrohe.de, geberit.de, idealstandard.de, blanco.com, franke.com, amazon.de, suggestqueries.google.com | Ersatzteilblätter als Quelle lesen, ASINs prüfen, Suchvorschläge abrufen | Bernd (Umgebungseinstellungen → Network access) |
| **Womo-Teile-Repo anbinden** (nur lesen) | Datenmodell und Vorlagen übernehmen statt neu bauen | Bernd sagt ok, ich binde es an |
| **Weitere Partnerprogramme prüfen** (Awin: Sanitär-Shops) | Bei Womo-Teile bringen Fachshops mehr Klicks als Amazon; Teile, die es nicht auf Amazon gibt | Bernd (Awin-Konto vorhanden) |
| **Search-Console-Export „Seiten“, 16 Monate** | Aufräumliste mit echten Zahlen absichern | Bernd |

## 7. Erwartung

Womo-Teile ist mit diesem Muster in fünf Monaten von 196 auf 1.350 Klicks im Monat gewachsen. Das lässt sich nicht eins zu eins übertragen: Grohe, Hansgrohe und Geberit haben gute eigene Kataloge, Pössl und Chausson nicht. Dafür ist die Amazon-Abdeckung bei Sanitär-Originalteilen deutlich besser. Eine Zahl ohne Suchvolumen-Daten wäre geraten. Messpunkt ist deshalb Phase B: Wenn die Geberit-Seiten nach acht Wochen nicht wachsen, wird die Richtung neu bewertet, bevor Phase C startet.

## Quellen (Auswahl)

- Google, Richtlinien für Produktbewertungen: https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews
- Geberit Ersatzteilkatalog (AT, 2020): https://www.geberit.at/_assets/local-media/unterlagen/unterlagen-kataloge/bruttopreise/geberit-ersatzteilkatalog-2020-november2020.pdf
- Hansgrohe Ersatzteilsuche: https://www.hansgrohe.com/service/spare-parts-search
- megabad Grohe-Ersatzteile: https://www.megabad.com/produkte-bad-ersatzteile-hersteller-grohe-k-169482.htm
- Amazon Grohe-Kartusche: https://www.amazon.de/dp/B0727QZMGH
- Amazon Geberit-Füllventil: https://www.amazon.de/dp/B0016L503O
- Beispiel automatisch erzeugte Testseite: https://test-vergleiche.com/waschtischarmatur-test/
- Beispiel KI-Forenseite: https://bau.de/forum/sanitaer/11936.php

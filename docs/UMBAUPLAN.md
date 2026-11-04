# Umbauplan hausbau-hero.de – Ziel: Amazon-Einnahmen

Stand: 2. November 2026

## 1. Ausgangslage

**Google (Search Console, Monatsberichte aus Gmail):**

| Zeitraum | Klicks/Monat | Impressionen/Monat |
|---|---|---|
| Bester Monat (09/2022) | 2.420 | 127.000 |
| Ende 2023 bis Mitte 2025 | 60–125 | 4.000–18.000 |
| 07/2025 bis 03/2026 | 390–570 | 15.000–36.000 |
| Seit Relaunch (06–09/2026) | 235–399 | 29.000–42.000 |

**Amazon:** Die letzte Abrechnung im Gmail (April 2026) zeigt 8,40 € für das ganze Partnerkonto (`katzenlaerm0e-21`), über das auch hausbauhero-21 läuft. Wie viel davon auf Hausbau-Hero entfällt, steht nicht in der Abrechnung.

**Warum die Seite kaum Geld bringt:**

1. **Fast nur Informations-Traffic.** Die meistbesuchten Seiten sind Anleitungen („Kreuzlinienlaser richtig benutzen“, „Wasserwaage richtig benutzen“). Diese Besucher wollen etwas lernen, nicht kaufen.
2. **Keine Produktboxen.** Vor diesem Umbau hatte kein aktiver Artikel eine Produktempfehlung, nur ein paar Textlinks.
3. **Kaufseiten beim Relaunch verloren.** `waschtischarmatur-mit-brause` war bis 10/2025 eine Top-Seite und wurde im März 2026 auf einen allgemeinen Ratgeber umgeleitet.
4. **Weiterleitungen über zwei Stationen.** 314 von 400 alten WordPress-URLs liefen über eine stillgelegte Seite auf eine Kategorie-Übersicht.
5. **Der Absturz Ende 2022 war ein Google-Update.** Von 2.420 Klicks (09/2022) ging es auf 182 (11/2022). Das passt zum Helpful-Content-Update, das dünne „Die 7 besten …“-Listen abgestraft hat. Diese alten Listen einfach zurückzuholen, bringt den Traffic nicht zurück.

## Nachtrag 4. November 2026: Altbestand entfernt

Mit der Richtung „Reparatur und Ersatzteile rund ums Haus“ (`SEITENAUFBAU.md`, Abschnitt 2a) sind alle Beiträge außerhalb von Bad & Sanitär entfernt, auf Entscheidung von Bernd und obwohl einige davon Klicks hatten: kreuzlinienlaser-richtig-benutzen (bis 58 Klicks/Monat), wasserwaage-richtig-benutzen, silikatfarbe, deckenstuetze, kalk-zement-putz, estrich-kosten, steinimpraegnierung, wandfarbe-weiss, stromerzeuger-vergleich, fliesen-verlegen-kosten. Status `entfernt` (404), ebenso die Alt-Seiten, die dorthin umgeleitet haben. Alte WordPress-URLs mit diesen Zielen liefern 410. Die Rechner Estrich und Fliesen bleiben. Die Einstufungen unten sind damit für diese Seiten überholt.

## 2. Fokus

Google belohnt Tiefe in einem Thema. Die Daten sprechen für folgende Reihenfolge:

| Bereich | Belegte Klicks* | Bewertung |
|---|---|---|
| **Bad & Sanitär** (Vorwand-WC, Drückerplatte, Armaturen, Hebeanlage, Dusche) | ~1.200, bis heute stabil | **Hauptfokus.** Suchen mit Kaufabsicht („… mit herausziehbarer Brause test“), Amazon verkauft das gut, Warenkorb 50–700 € |
| **Wand: streichen & verputzen** (Silikatfarbe, Wandfarbe, Kalk-Zement-Putz, Haftgrund) | ~800 Farbe + ~250 Putz | **Zweiter Fokus.** Farbe verkauft sich gut. Putzsäcke kauft man im Baumarkt, das Werkzeug dafür auch online |
| Stromerzeuger | ~1.600, fast alles 2022 | Lief nur in der Energiekrise. Nur saisonal im Winter pflegen |
| Heizung | 0 | Kein Inhalt, keine Daten. Start bei null, 6–12 Monate bis zum Ranking |

\* Summe der Klicks aus den Monaten, in denen die Seiten in den Top 3 der Monatsberichte waren. Das ist eine Untergrenze.

**Entscheidung offen:** Bernd bestätigt den Fokus, erst danach entstehen neue Inhalte.

## 3. Einstufung der 33 aktiven Seiten

**Ausbauen** (Traffic belegt und im Fokus): neue Unterseiten, interne Links, Produktboxen pflegen
- geberit-sigma-drueckerplatte, vorwandelement-wc, waschtischarmatur-ratgeber
- silikatfarbe, wandfarbe-weiss, kalk-zement-putz
- deckenstuetze (24 Monate in den Top 3, die beständigste Seite)

**Monetarisieren und halten** (Traffic vorhanden, nicht im Fokus): Produktboxen ja, keine neue Arbeit
- kreuzlinienlaser-richtig-benutzen, wasserwaage-richtig-benutzen, oberfraese-richtig-benutzen
- mauernutfraese, sds-bohrer-set
- latexfarbe, steinimpraegnierung, haftgrund-putz, pflasterfugenmoertel
- badewannenarmatur-ratgeber, kleinhebeanlage, komplettdusche-ratgeber
- stromerzeuger-vergleich (saisonal im Winter)

**Einfrieren** (kein Amazon-Bezug oder kein Traffic-Beleg): bleiben online, weil sie nichts kosten, aber es gibt keine weitere Arbeit daran
- Finanzen: hausbau-kosten-2026, kfw-foerderung-2026, baugenehmigung-ratgeber, kaufnebenkosten-guide, handwerkerkosten-guide, eigenleistung-hausbau
- Kosten-Artikel: bad-sanieren-kosten, estrich-kosten, trockenbau-kosten, daemmung-kosten, fliesen-verlegen-kosten, laminat-verlegen-kosten. Hier verdienen die verlinkten Rechner über ihre Materiallisten.

**Neu aufbauen oder zusammenlegen**
- maurerkelle: Die WordPress-Reste werden durch eine kompakte Kaufberatung ersetzt, Zungenkelle kommt als Abschnitt dazu. Die Weiterleitung `/zungenkelle` → `/werkzeuge/maurerkelle` ist schon gesetzt.

## 4. Maßnahmen

### Phase 1 – erledigt (2. November 2026)

| Maßnahme | Wo | Wirksam |
|---|---|---|
| 61 Produktempfehlungen auf den 20 Seiten mit Traffic (Amazon-Suchlinks mit Tag, keine erfundenen Preise oder Bewertungen) | Supabase `produkte` | sofort live |
| Rechner-Links repariert: Trockenbau-Profile und Blechschere verlinkten auf „Profi Stromerzeuger 8000W“, 4 Materialien hatten keinen Link | Supabase `rechner_materialien` | sofort live |
| 314 Weiterleitungsketten auf eine Station gekürzt | Supabase `redirects` | sofort live |
| Alte Seiten auf passende Artikel statt Kategorie-Übersichten umgeleitet (Drückerplatten, Armaturen, Wandfarben, Stromerzeuger usw.) | Supabase `seiten.redirect_to` | sofort live |
| Artikel-Layout: Schnellübersicht „Unsere Empfehlungen auf einen Blick“ oben, ausführliche Karten nach dem Text, Button „Aktuellen Preis auf Amazon prüfen“ | Code | nach dem Deploy |
| `rel="sponsored"` für Amazon-Links, serverseitig gesetzt (vorher per JavaScript) | Code | nach dem Deploy |
| Eigene Tracking-IDs je Platzierung möglich (Box, Textlink, Rechner) über `NEXT_PUBLIC_AMAZON_TAG_BOX`, `_TEXT` und `_RECHNER` | Code | nach dem Deploy und dem Anlegen der IDs |

### Phase 2 – nach Bestätigung des Fokus (Bad & Sanitär)

1. **`/bad/waschtischarmatur-mit-brause` wiederherstellen.** Die Suchanfrage „… mit herausziehbarer Brause test“ war 10 Monate lang in den Top-Suchanfragen. Die Seite bekommt eine neue Kaufberatung mit Produktboxen, und die alten URLs leiten direkt dorthin.
2. **Bad-Cluster ausbauen**, jeweils mit Produktboxen und Querverlinkung (Belege aus den Monatsberichten in Klammern):
   - Waschtischarmatur schwarz (+19 Wachstum)
   - Badewannenarmatur Grohe (+16)
   - Geberit Drückerplatte schwarz/Glas, als Abschnitt in der Sigma-Seite
   - Kondensatpumpe/Kondensathebeanlage (+2 „kondensatpumpe test“)
3. **Querverlinkung im Bad-Silo:** Vorwand-WC ↔ Drückerplatte ↔ Hebeanlage ↔ Armaturen.
4. **Maurerkelle neu aufbauen** (Wand-Fokus).

### Phase 3 – Messen und nachsteuern

1. **Tracking-IDs in PartnerNet anlegen** (z. B. `hh-box-21`, `hh-text-21`, `hh-rechner-21`) und in Vercel als Env-Variablen setzen. Dann zeigt Amazon, welche Platzierung verkauft. Nur IDs eintragen, die es in PartnerNet wirklich gibt.
2. **Search-Console-Export „Seiten“ (16 Monate) als CSV** ziehen. Die Monatsmails zeigen nur die Top 3. Mit dem Export lässt sich jede Seite einzeln bewerten und gezielt kürzen.
3. **Nach 8 Wochen prüfen:** Klicks je Seite (GSC) gegen Amazon-Bestellungen je Tracking-ID. Was nichts bringt, wird zusammengelegt oder eingefroren.

## 5. Realistische Erwartung

Grobe Rechnung mit Annahmen, keine Prognose: 400 Google-Klicks im Monat, davon klicken 10 % auf einen Amazon-Link, 8 % davon bestellen, Warenkorb 80 €, 4 % Provision. Das ergibt **etwa 10 € im Monat**.

Mehr ist nur über mehr Traffic mit Kaufabsicht zu holen, deshalb der Fokus auf Bad & Sanitär mit Warenkörben von 100–700 €. Produktboxen allein verdoppeln die Einnahmen vielleicht, sie verzehnfachen sie nicht.

## 6. Rückgängig machen

Vor allen Änderungen wurde der Stand gesichert (nicht über die API erreichbar):
`backup.seiten_20261102`, `backup.redirects_20261102`, `backup.produkte_20261102`, `backup.rechner_materialien_20261102`.

Beispiel für die Wiederherstellung der Weiterleitungen:

```sql
truncate public.redirects;
insert into public.redirects select * from backup.redirects_20261102;
```

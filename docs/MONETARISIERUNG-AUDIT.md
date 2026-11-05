# Monetarisierung: Audit von hausbau-hero.de

Stand: 5. November 2026. Geprüft wurden 48 Seiten aus allen Seitenarten, live auf https://hausbau-hero.de (Desktop und 375 px Handy-Breite im Browser, dazu das ausgelieferte HTML), der Code in `src/app`, `src/components` und `src/lib` sowie die Tabellen in Supabase (nur gelesen). Zum Vergleich: womo-teile.de.

Was dieses Dokument nicht leisten kann: Es gibt noch keine Besucherzahlen je Seite in der Datenbank (`seiten.impressionen` ist überall 0, Search Console ist nicht angebunden) und erst sechs gezählte Kauflink-Klicks. Die Bewertung „Hebel“ ist deshalb eine Einschätzung aus Seitenaufbau, Suchabsicht und Warenkorb, keine Messung. Maßnahme 2 soll genau das ändern.

## Zusammenfassung: die zehn wichtigsten Maßnahmen

Sortiert nach erwartetem Umsatzhebel pro Aufwand. „Hebel“ heißt: wie stark die Maßnahme Klicks zum Shop oder Rankings beeinflussen dürfte.

| # | Maßnahme | Hebel | Aufwand | Betrifft |
|---|---|---|---|---|
| 1 | Seiten wieder cachen: das globale `cache: 'no-store'` im Supabase-Client entfernen, damit `revalidate` greift | hoch (Ladezeit, Crawling von 907 URLs) | 0,5–1 Tag inkl. Test | alle Seiten |
| 2 | Messbar machen: Amazon-Tracking-IDs je Platzierung anlegen, Awin `clickref2` mit Seitentyp, Klicks gegen Seitenaufrufe aus Vercel Analytics stellen, Nulltreffer der Suche zählen | hoch (Grundlage für alles Weitere) | 1 Tag | alle Seiten |
| 3 | Allgemeine Problemseiten bekommen einen Kaufweg: je Ursache die passenden Teile mit Preis, oben eine Markenwahl | hoch (Seiten mit der größten Suchnachfrage) | 2–3 Tage | 11 Seiten `/problem/<slug>` |
| 4 | Teilseite mobil: Kaufzeile mit Preis direkt unter die Überschrift, der Kasten „Erhältlich bei“ bleibt | mittel bis hoch | 0,5 Tag | 538 Teilseiten |
| 5 | Mehr Teile kaufbar machen: weitere Shops mit Feed anbinden (Sanitär-Fachhändler, eBay Partner Network für ausgelaufene Teile), danach Teile ohne Kaufmöglichkeit und ohne Zuordnung auf `noindex` | hoch | 2–5 Tage, davon viel Wartezeit auf Programmfreigaben | 165 Teile ohne Kauf, 64 ohne Zuordnung |
| 6 | Strukturierte Daten `Product` mit `AggregateOffer` (Preisspanne, Anzahl Shops, MPN, GTIN) auf Teil- und Teileart-Seiten | mittel (Preis im Suchergebnis möglich) | 1 Tag | 538 Teilseiten, 16 Teilearten |
| 7 | Angebote nach Gesamtpreis inklusive Versand sortieren und „inkl. Versand“ zeigen | mittel (Vertrauen, richtige Empfehlung) | 2 Stunden | alle Kaufzeilen mit Partnershop |
| 8 | „Beim Tausch auch nötig“: Dichtungen, O-Ringe, Armaturenfett, Kartuschenschlüssel als Kaufzeile an Teil- und Problemseiten | mittel (größerer Warenkorb, Amazon-Warenkorb zählt 24 Stunden) | 2 Tage, braucht Entscheidung zur Werkzeug-Regel | Teil-, Problem-, Teileart-Seiten |
| 9 | Teilesuche: Synonyme, Treffer auf Teilearten und Probleme, Nulltreffer mit Weiterleitung statt Markenliste | mittel | 1–2 Tage | `/ersatzteile?q=` |
| 10 | Ratgeber: Kaufzeile schon in den Übersichtskarten; Rechner entweder serverseitig rendern und auf Teilearten verlinken oder auf `noindex` | mittel | 1–2 Tage | 13 Ratgeber, 3 Rechner |

Dazu ein kleiner PR mit eindeutigen Fehlern, getrennt von diesem Dokument: berndgalter-lab/hausbau-hero#63 (Klick-API kannte `neukauf` und `quelle` nicht, Quellen-Links ohne Platzierung, doppelte Nummer im Titel von 259 Teilseiten).

Bei den Erlösmodellen außerhalb des Affiliate-Geschäfts lohnt sich jetzt nur eines: Handwerker-Vermittlung über ein Partnerprogramm an der Stelle „Ab hier Fachbetrieb“ der Problemseiten. Newsletter mit Wartungserinnerungen und die Typenschild-Erkennung per Foto kommen später, mit dem Bereich Wasserfilter und wenn es messbaren Traffic gibt. Eigener Shop, Display-Werbung und bezahlte Beratung lohnen sich nicht. Details in Teil C.

## Was so bleiben sollte

Damit die Maßnahmen nichts kaputt machen, kurz, was heute schon besser ist als bei den meisten Affiliate-Seiten:

- Jede Kaufzeile nennt Shop, Preis, Versand und Zeitpunkt („Stand 05.11.2026, 12:02 Uhr“). Nicht vorrätige Ware bekommt keinen Preis (`zeigePreis`), das schützt vor Abmahnungen wegen Lockangeboten.
- Amazon-Links zeigen keinen Preis, das entspricht den Amazon-Bedingungen, solange kein Preis aus der Amazon-API kommt.
- Keine Amazon-Suchlinks, keine Hersteller-Shops, Partnerlinks mit `rel="sponsored"`, Sternchen und Hinweis an der Kaufzeile, im Footer der Satz „Als Amazon-Partner verdienen wir an qualifizierten Verkäufen“. In allen 48 Seiten trugen alle Amazon-Links den Tag, alle Awin-Links ein `clickref`.
- Die Größenseiten (VELUX MK04) und die Teileart-Seiten sind der Teil der Seite, der am klarsten auf eine Kaufentscheidung hinführt. Sie sind das Vorbild für die Problemseiten.

---

# Teil A: Seitenarten

Für jede Seitenart: Befund, Maßnahme, erwarteter Effekt, Aufwand. Die Pixelangaben „erster Kauflink bei … px“ sind gemessen auf 375 px Breite, gezählt ab Seitenanfang. Ein Handy-Bildschirm zeigt rund 700 px Inhalt.

| Seite | erster Kauflink (Handy) | Seitenlänge | Kauflinks |
|---|---|---|---|
| `/teil/velux-markise-mhl-mk00` | 1.265 px | 3.610 px | 2 |
| `/teil/grohe-mousseur-13929000` | 1.286 px | 3.306 px | 2 |
| `/problem/wasserhahn-tropft` | 6.982 px | 8.743 px | 3 (nur Neukauf) |
| `/problem/spuelkasten-laeuft-nach` | keiner | | 0 |
| `/problem/dachfenster-undicht` | keiner | | 0 |
| `/problem/geberit-spuelkasten-laeuft-nach` | 755 px | 5.116 px | 9 |
| `/problem/grohe-armatur-tropft` | 716 px | 5.231 px | 14 |
| `/ratgeber/waschtischarmatur` | 3.324 px | 10.740 px | 11 |
| `/ratgeber/dachfenster-sonnenschutz` | 5.485 px | 15.102 px | 14 |
| `/ersatzteile/velux/mk04` | 1.721 px | 8.290 px | 25 |
| `/ersatzteile/kartusche` | 3.536 px | 12.463 px | 5 |
| `/ersatzteile/kludi/mx` | 830 px | 3.866 px | 9 |
| `/ersatzteile/grohe` | 12.794 px (Quellen) | 12.605 px | 1 |
| `/vergleich/armaturen` | 1.493 px | 28.236 px | 101 |

## A1. Startseite `/`

**Befund.** Überschrift „Was ist kaputt? Wir finden das passende Teil.“, darunter Suchfeld und Symptom-Knöpfe („Wasserhahn tropft“, „Spülkasten läuft nach“, „Thermostat wird nicht warm“, „Dachfenster undicht“). Rechts auf dem Desktop drei Schritte (Symptom, Ursache, Teil). In fünf Sekunden ist klar, worum es geht. Abschnitte: „Wo ist das Problem?“, „Ersatzteile nach Marke“, „Neu kaufen statt reparieren“, „So arbeiten wir“, „Rechner“. Kein Produktbild, kein Preis; `SEITENAUFBAU.md` 2a sieht bei „Neu kaufen statt reparieren“ ein Produktbild aus den Feeds vor, der Abschnitt hat heute nur Text und Links auf Ratgeber. Strukturierte Daten: `Organization`, `WebSite`, aber keine `SearchAction`, obwohl es eine Suche gibt.

Wer kommt hierher? Fast niemand über Google mit Kaufabsicht. Die Startseite verteilt Besucher von Marken- und Direktaufrufen. Sie muss also vor allem schnell auf Problem- und Teilseiten führen, und das tut sie.

**Maßnahmen.**
- Unter den Symptom-Knöpfen eine Zeile „Oft gesucht“ mit vier bis sechs Teilen, die einen Partnerpreis haben (Perlator M24, Füllventil Geberit Typ 383, Kartusche 35 mm, VELUX-Rollo MK04), mit Bild und Preis. Das ist der kürzeste Weg vom Einstieg zum Shop (zwei Klicks).
- Bei „Neu kaufen statt reparieren“ je Ratgeber ein Produktfoto aus dem Feed, wie in 2a vorgesehen.
- `WebSite` um `potentialAction` vom Typ `SearchAction` mit `/ersatzteile?q={search_term_string}` ergänzen.

**Effekt:** gering bis mittel. **Aufwand:** 0,5 Tag.

## A2. Bereichsseite `/bereich/<slug>`

Beispiele: `/bereich/waschtisch`, `/bereich/wc-spuelkasten`, `/bereich/dachfenster`.

**Befund.** Handy: Überschrift „Waschtisch & Armatur“, zwei Sätze, dann „Was ist kaputt?“ mit allen Problemseiten untereinander (drei allgemeine, danach neun Marken-Varianten wie „Grohe Armatur tropft“, „Hansa Armatur tropft“, „Kludi Armatur tropft“), dann „Teile erklärt“ mit den Teilearten. Keine Kauflinks, keine Bilder, keine Preise. Die vielen „X Armatur tropft“-Karten sehen gleich aus; wer seine Marke nicht kennt, liest neun fast gleiche Texte. Strukturierte Daten: nur `BreadcrumbList`.

Suchabsicht: „waschtisch ersatzteile“, „dachfenster ersatzteile“, eher allgemein. Wer hier landet, weiß oft noch nicht, welches Teil er braucht.

**Maßnahmen.**
- Marken-Varianten der Probleme zusammenfassen: eine Karte „Armatur tropft“ mit der Markenliste als kleine Links darunter. Die Seite wird kürzer, die Entscheidung kommt eine Ebene später, wo sie hingehört.
- Abschnitt „Häufig gebraucht“ mit sechs Teilen oder Teileart-Produkten mit Partnerpreis und Bild (Daten aus `ean_angebote`, gleiche Darstellung wie auf den Teileart-Seiten).
- `ItemList` für die Teilearten.

**Effekt:** mittel. **Aufwand:** 1 Tag.

## A3. Markenseite `/ersatzteile/<marke>`

Beispiele: `/ersatzteile/grohe`, `/ersatzteile/geberit`, `/ersatzteile/velux`, `/ersatzteile/blanco`.

**Befund.** Handy: „Grohe Ersatzteile“, zwei Absätze zu Kartuschen-Durchmessern und Bestellnummern, darunter „Du hast schon eine Nummer?“ mit Suchfeld. Danach Probleme, Nummer finden, Modelle, Teile nach Art mit „Preis ab“, Fragen, Widersprüche, Quellen. Die Seite ist 12.600 px lang und hat genau einen Kauflink, und der steht in den Quellen ganz unten. Das ist Absicht (`SEITENAUFBAU.md` 4: „Kein Kaufknopf je Zeile“), der Weg zum Shop ist Marke → Teil → Shop, also zwei Klicks. Das ist vertretbar. Strukturierte Daten sind gut (`CollectionPage`, `ItemList`, `FAQPage` mit 11–14 Fragen).

Auffällig:
- In den Quellen von Grohe und Geberit stehen Links auf showerspares.com, einen britischen Ersatzteilshop ohne Partnerprogramm. Das ist ein Weg zu einem fremden Shop.
- Der Markentext von Franke, der auch in der Teilesuche erscheint, nennt den Hersteller-Webshop („Ersatzteile verkauft Franke im eigenen Webshop (webshop.franke.com)“). Das widerspricht Grundsatz 11 in `SEITENAUFBAU.md`, auch ohne Link.
- Die Suche oben ist gut. Wer keine Nummer hat, muss weit scrollen bis „Ersatzteile nach Art“.

**Maßnahmen.**
- In den Teilelisten je Zeile den günstigsten Partnerpreis als kleinen Text mit Sternchen verlinken („ab 13,19 € bei Contorion*“). Das bleibt eine Zeile, kein Knopf, und spart einen Klick.
- showerspares.com in den Quellen nur als Text zeigen (Regel in `istHerstellerShop` oder eigene Liste „fremde Shops“).
- Satz zum Franke-Webshop aus der Marken-Datei streichen.
- Sprungmarken oben um „Teile nach Art“ ergänzen, falls nicht vorhanden, und auf dem Handy direkt unter das Suchfeld setzen.

**Effekt:** gering bis mittel. **Aufwand:** 0,5 Tag.

## A4. Serienseite `/ersatzteile/<marke>/<serie>`

Beispiele: `/ersatzteile/kludi/mx`, `/ersatzteile/grohe/eurosmart-duscharmatur` (noindex).

**Befund.** Kludi MX: erster Kauflink bei 830 px, neun Amazon-Links, aber kein Bild und kein Preis, weil alle Teile nur über Amazon kaufbar sind. Das wirkt wie eine nackte Liste. Grohe Eurosmart Duscharmatur ist `noindex` und steht richtig nicht in der Sitemap. Hier gibt es Bild, Contorion-Preis und den Neukauf-Kasten. Strukturierte Daten: nur `BreadcrumbList`. Der Seitentitel „MX: Ersatzteile mit Artikelnummer“ enthält die Marke nicht, gesucht wird aber „kludi mx kartusche“.

**Maßnahmen.**
- Seitentitel immer mit Markennamen: „Kludi MX: Ersatzteile mit Artikelnummer“. Kleine Änderung in `generateMetadata` der Serienseite (Marke voranstellen, wenn der Serienname sie nicht enthält).
- `ItemList` der Teile mit `Product` (Name, MPN) ergänzen.
- Für Amazon-only-Teile ein Bild: Ohne Amazon-API bleibt nur das Bild aus einem Partnerfeed über die EAN. Wo keins da ist, das leere Feld weglassen statt „kein Bild“ zu zeigen.

**Effekt:** mittel (Titel), gering (Rest). **Aufwand:** 2–3 Stunden.

## A5. Teilseite `/teil/<slug>`

Beispiele: `/teil/grohe-mousseur-13929000` (Contorion und Amazon), `/teil/velux-markise-mhl-mk00` (hagebau und OTTO), `/teil/velux-wandschalter-kli-313` (nur Amazon), `/teil/blanco-ventil-120665` (kein Shop), `/teil/villeroy-boch-kipp-stripp-anker` (kein Shop).

Diese Seiten sind der Kern: 538 Stück, Suchabsicht „Marke + Nummer“ oder „Marke + Teilname“, also fast immer Kaufabsicht. Wer „grohe 13929000“ sucht, hat das alte Teil in der Hand.

**Befund.**
- Desktop: Der Kasten „Erhältlich bei“ steht rechts neben der Überschrift, sichtbar ohne Scrollen. Gut.
- Handy: Reihenfolge Überschrift, Nummer, Beschreibung, Bild (200 px großes Feld), Steckbrief, erst dann „Erhältlich bei“. Der erste Kauflink liegt bei rund 1.270 px, also auf dem zweiten Bildschirm. Wer nur prüfen will, ob es das Teil gibt und was es kostet, scrollt an Steckbrief und Bild vorbei.
- Grohe Mousseur: Contorion 13,19 € „zzgl. 7,95 € Versand“, also 21,14 € an der Kasse. Amazon steht darunter ohne Preis („Amazon* · Originalteil mit dieser Nummer“). Für ein 13-€-Teil ist Amazon mit kostenlosem Versand für Prime-Kunden oft günstiger, die Seite legt aber Contorion nahe. In der Datenbank haben 48 Teile ein Partnerangebot unter 20 € mit Versandkosten.
- „Passt zu: Noch keine belegten Zuordnungen erfasst.“ steht bei 64 Teilen. Das ist eine Sackgasse und für Leser eine Notiz in eigener Sache.
- 165 Teile haben weder Partnershop noch ASIN. Sie sind indexiert und stehen in der Sitemap, die Seite endet ohne Kaufmöglichkeit und ohne Alternative.
- Seitentitel: Bei 259 Teilen stand die Nummer doppelt im Titel („… (13929000) (13929000) | Hausbau Hero“). Behoben in berndgalter-lab/hausbau-hero#63.
- „Werkzeug: Von Hand bzw. Maulschlüssel mit Tuch.“ steht bei 528 Teilen als Text. Kein Link auf Zubehör, das man beim Tausch braucht (Dichtung, Armaturenfett).
- Keine Verlinkung zur Teileart: Der Mousseur führt nicht zu `/ersatzteile/perlator`, wo es Größentabelle und Alternativen gibt.
- Strukturierte Daten: nur `BreadcrumbList`. Kein `Product`, obwohl Name, Marke, MPN, EAN, Bild und Preise auf der Seite stehen.
- Nur 10 Teile haben mehr als einen Partnershop. Ein echter Preisvergleich findet also selten statt.

**Maßnahmen.**
1. Handy: eine Kaufzeile direkt unter der Originalnummer, z. B. „ab 13,19 € + Versand bei Contorion* · auch bei Amazon*“ mit Sprung zum Kasten. Der Kasten bleibt, wo er ist. Desktop unverändert.
2. Sortierung nach Gesamtpreis (Preis + Versand) in `sortiereAngebote`, Anzeige „21,14 € inkl. Versand“ als Hauptzahl, Artikelpreis klein darunter. Bei Teilen unter 20 € mit Versandkosten den Hinweis „Bei Amazon oft versandkostenfrei mit Prime“ nur dann, wenn eine geprüfte ASIN vorhanden ist. (Preis nicht nennen, Amazon-Regeln.)
3. Teile ohne Zuordnung: Abschnitt „Passt zu“ ausblenden statt die Notiz zu zeigen. Teile ohne Kaufmöglichkeit und ohne Zuordnung auf `noindex` und aus der Sitemap, bis eins von beiden nachgetragen ist.
4. Teile ohne Kaufmöglichkeit mit Zuordnung: Kasten „Dieses Teil führt gerade kein Partnershop“ mit Link auf die Teileart-Seite (dort gibt es kompatible Produkte mit Preis) und, wo es einen gibt, den Neukauf-Kasten weiter oben.
5. Link „Mehr zu Perlatoren: Größe messen, Alternativen“ auf die Teileart, aus `teiltyp` ableitbar.
6. `Product` mit `brand`, `mpn`, `gtin13`, `image` und `offers` als `AggregateOffer` (`lowPrice`, `highPrice`, `offerCount`, `priceCurrency`), nur aus Partnerangeboten mit Preis. Google erlaubt Produkt-Snippets auch auf Seiten, die Preise mehrerer Händler vergleichen; Amazon zählt dabei nicht mit, weil kein Preis da ist. Kein `Review`, keine Bewertung erfinden.
7. „Beim Tausch auch nötig“ (siehe Maßnahme 8 der Zusammenfassung): pro Teiltyp eine feste Liste in `src/lib`, z. B. Kartusche → Armaturenfett, Dichtungsset; Füllventil → Dichtung Typ 212; Rollo → nichts.

**Effekt:** hoch. Die Teilseiten sind zahlenmäßig der größte Seitentyp mit der klarsten Kaufabsicht. **Aufwand:** 1–2 Tage für 1–6, 2 Tage für 7.

## A6. Teileart `/ersatzteile/<teilart>`

Beispiele: `/ersatzteile/kartusche`, `/ersatzteile/eckventil`, `/ersatzteile/perlator`, `/ersatzteile/dachfenster-rollo`.

**Befund.** Aufbau wie in `SEITENAUFBAU.md` 4b: Titel als Frage („Kartusche für den Wasserhahn: welche passt?“), kurze Antwort, Schritte, Größentabelle, Produkte mit Bild und Preis, Originalteile nach Marke, Probleme, Fragen. `FAQPage` mit 10–13 Fragen. Der erste Kauflink liegt auf dem Handy bei 3.500 px, also nach der Erklärung. Das ist für die Suchabsicht „welche Kartusche passt“ richtig, man muss erst messen. Kartusche und Perlator haben nur Awin-Links (5 bzw. 8), keine Amazon-Alternative. Dachfenster-Rollo hat 61 Bilder und 122 Preisangaben, das ist viel für eine Handy-Seite.

**Maßnahmen.**
- Nach der Größentabelle je Größe ein Sprung „Produkte in 35 mm“ zu den passenden Produkten. Wer gemessen hat, will direkt die Liste für sein Maß.
- Produkte mit geprüfter ASIN ergänzen, damit es neben Awin einen Amazon-Weg gibt (Perlator, Kartusche sind typische Amazon-Käufe).
- `ItemList` mit `Product` für die Produktliste.
- Dachfenster-Rollo: Liste nach Größencode filterbar machen oder auf die Größenseiten verweisen, statt alle Größen untereinander.

**Effekt:** mittel. **Aufwand:** 1 Tag.

## A7. Problemseite für alle Marken `/problem/<slug>`

Beispiele: `/problem/wasserhahn-tropft`, `/problem/spuelkasten-laeuft-nach`, `/problem/dachfenster-undicht`.

Das sind die Seiten mit der größten Suchnachfrage im Sanitärbereich („wasserhahn tropft“, „spülkasten läuft nach“, siehe `KEYWORDS-SANITAER.md`). Wer so sucht, will die Ursache wissen und meist sofort das Teil kaufen.

**Befund.**
- Handy, „Wasserhahn tropft“: Überschrift, Symptom, „Die häufigsten Ursachen“ mit Nummer, Abzeichen „häufig“, Erklärung und Link „Kartusche: Typ und Größe bestimmen →“. Die Ursachen sind gut erklärt. Der einzige Kauflink kommt bei 6.982 von 8.743 px, und zwar im Neukauf-Kasten „Lieber eine neue Armatur?“. Kein einziger Link führt von hier direkt zu einem Ersatzteil mit Preis.
- „Spülkasten läuft nach“ und „Dachfenster undicht“: kein einziger Kauflink.
- Der Weg zum Kauf ist Problem → Teileart → Größe messen → Produkt → Shop, also drei bis vier Klicks. Bei jedem Schritt verliert man Leser.
- „Nach Marke“ steht unten. Wer weiß, dass er eine Grohe hat, findet die viel kaufstärkere Seite „Grohe Armatur tropft“ (14 Kauflinks, erster bei 716 px) erst nach dem Scrollen.
- `FAQPage` vorhanden. Kein `HowTo`; Google zeigt HowTo zwar seit 2023 nicht mehr als Rich Result, für KI-Antworten hilft eine saubere Schrittliste trotzdem. Kein Handlungsbedarf.

**Maßnahmen.**
1. Direkt unter dem Symptom eine Markenwahl als Knöpfe („Welche Marke steht auf der Armatur? Grohe · hansgrohe · Hansa · Kludi · Ideal Standard · andere“). Jeder Knopf führt zur Marken-Variante. Damit ist der kaufstärkste Weg ein Klick.
2. Unter jeder Ursache zwei bis drei passende Produkte als Kaufzeile mit Preis, aus der Teileart-Datei (`produkte`) gezogen: bei „Strahlregler verkalkt“ die Perlatoren M22/M24, bei „Füllventil undicht“ das Geberit-Füllventil Typ 383 und ein Universal-Füllventil. Das Feld `teilart` gibt es in jeder Ursache schon, die Produkte stehen in `data/teilarten/<slug>.json`.
3. Bei „Grenze zum Installateur“ (`fachbetrieb_ab`) ein Link auf Handwerkersuche über Partnerprogramm (siehe Teil C1).
4. Neukauf-Kasten bleibt unten.

**Effekt:** hoch. **Aufwand:** 2–3 Tage für 11 Seiten (Komponente einmal, Daten sind da).

## A8. Problemseite je Marke `/problem/<marke>-<problem>`

Beispiele: `/problem/geberit-spuelkasten-laeuft-nach`, `/problem/grohe-armatur-tropft`, `/problem/velux-dachfenster-rollo-passt-nicht`.

**Befund.** Handy: Überschrift, Link „Für alle Marken: …“, Symptom, „Mögliche Ursachen“, darunter je Ursache die Originalteile mit Nummer und „Amazon*“. Erster Kauflink bei rund 750 px, also gleich auf dem ersten Bildschirm nach dem Symptom. Das ist die beste Klickstrecke der Seite. Schwächen: Bei Geberit und VELUX nur Amazon-Links, keine Preise, keine Bilder. Keine `FAQPage`-Daten (die allgemeinen Problemseiten haben sie). Titel „Ursachen & passende Ersatzteile“ mit Et-Zeichen, sonst schreibt die Seite „und“.

**Maßnahmen.**
- Wo ein Partnerangebot mit Preis existiert, dieses in der Kaufzeile vor Amazon zeigen (Daten aus `angebote` über die Teil-ID, wie auf der Teilseite).
- Kleines Bild (64 px) je Teil, wenn aus dem Feed vorhanden.
- Fragen, wenn vorhanden, als `FAQPage` ausgeben.

**Effekt:** mittel. **Aufwand:** 0,5–1 Tag.

## A9. Ratgeber mit Auswahlhilfe `/ratgeber/<pfad>`

Beispiele: `/ratgeber/waschtischarmatur`, `/ratgeber/duschthermostat`, `/ratgeber/dachfenster-sonnenschutz`, `/ratgeber/druckminderer`.

**Befund.** Handy, Waschtischarmatur: Überschrift als Frage, drei Sätze mit Zahlen, Prüfvermerk „Stand: November 2026 · Datenblattvergleich, kein Test · 19 Quellen“, Inhaltsverzeichnis, „Kurz gesagt“, dann sechs Übersichtskarten mit Produktfoto, „Passt für“ und „ab 92,99 € · zum Modell ↓“, darunter die Auswahlhilfe (Warmwasser, Becken, Ablauf, jeweils „egal“ vorausgewählt). Je Modell eine Zeile mit Eckdaten, „Passt für“ und „92,99 € bei Contorion* · Amazon*“. Das entspricht dem Vorbild womo-teile und ist sauber.

Schwächen:
- Die Übersichtskarten zeigen einen Preis, verlinken aber nur zum Modell weiter unten. Wer sich schon entschieden hat, braucht einen Klick mehr. Erster Kauflink bei 3.324 px (Waschtisch) bzw. 5.485 px (Dachfenster-Sonnenschutz).
- Kein Shop-Vergleich in den Karten: Nur der günstigste Partnershop erscheint, die anderen erst aufgeklappt.
- Kein `Product`/`ItemList` für die Modelle, nur `FAQPage` und `BreadcrumbList`.
- „Wenn etwas kaputt geht“ verlinkt auf Probleme und Teile, das ist der richtige Cross-Link.

**Maßnahmen.**
- In den Übersichtskarten den Preis selbst als Partnerlink („92,99 € bei Contorion*“), „zum Modell ↓“ bleibt daneben. Kauf ist dann ein Klick.
- `ItemList` mit `Product` und `AggregateOffer` für die Modelle der Auswahlhilfe.
- Platzierung der Kartenlinks als eigene Awin-`clickref` (`hh-karte`), damit man sieht, ob Karten oder Auswahlhilfe verkaufen.

**Effekt:** mittel. **Aufwand:** 0,5–1 Tag.

## A10. Wissensbeitrag `/bad/<slug>`

Beispiele: `/bad/tece-vs-geberit`, `/bad/komplettdusche-ratgeber`, `/bad/hebeanlage-kosten`.

**Befund.** Frage als Überschrift, Prüfvermerk, „Kurz gesagt“, Erklärteil, `FAQPage`. Null Kauflinks, so gewollt (`SEITENAUFBAU.md` 3). „Hebeanlage kosten“ und „Komplettdusche“ sind aber typische Suchen von Leuten, die einen Einbau planen. Der Text verweist auf den Ratgeber Kleinhebeanlage, aber nicht deutlich. Für „Was kostet eine Hebeanlage“ ist die naheliegende Anschlusshandlung ein Angebot vom Installateur.

**Maßnahmen.**
- Je Beitrag ein deutlicher Kasten am Ende des Erklärteils: „Gerät auswählen: Ratgeber Kleinhebeanlage →“.
- Bei Kostenbeiträgen der Handwerker-Link (C1).

**Effekt:** gering bis mittel. **Aufwand:** 2 Stunden plus C1.

## A11. VELUX-Größenseite `/ersatzteile/velux/<code>`

Beispiele: `/ersatzteile/velux/mk04`, `/ersatzteile/velux/sk06`.

**Befund.** Handy: „VELUX MK04: welches Rollo und welches Zubehör passt?“, Maß und alte Codes (M04, 304) gleich im ersten Absatz, Sprungmarken, Kasten „Ist das dein Fenster?“ mit Code-Tabelle je Generation, dann je Zubehörart die Originale mit Bild, Typenbezeichnung, Generation und Preis („104,00 € bei hagebau.de*“). 25 Kauflinks, erster bei 1.721 px. Die Seite beantwortet die Suchabsicht („velux mk04 rollo“) besser als jeder Shop, weil sie die Generationen trennt. Das ist die stärkste Seitenart.

Schwächen: `FAQPage` mit nur drei Fragen. Die Nachbauten stehen nach den Originalen, Preisunterschied ist nicht auf einen Blick sichtbar.

**Maßnahmen.**
- Ganz oben eine Kurzübersicht „Für MK04 gibt es: Verdunkelungsrollo ab 104 €, Hitzeschutz-Markise ab …, Insektenschutz ab …“ mit Sprungmarke zur Art. Wer weiß, was er will, ist nach einem Bildschirm beim Kauf.
- Preis der Nachbauten gegenüberstellen („Nachbau ab … € bei Amazon“ geht wegen der Amazon-Preisregel nicht, also nur Hinweis „günstiger, kein Original“).
- Dasselbe Muster auf weitere Größen ausrollen, sobald `groesseIstDuenn` es erlaubt.

**Effekt:** mittel. **Aufwand:** 0,5 Tag.

## A12. Rechner `/rechner/<slug>`

Beispiele: `/rechner/sanitaer`, `/rechner/fliesen`, `/rechner/estrich`.

**Befund.** Das ausgelieferte HTML enthält nur „Lade Rechner…“ und keine Überschrift (h1 fehlt im HTML), der Rechner lädt erst im Browser. Google sieht eine fast leere Seite. Nach „Berechnen“ erscheint eine Materialliste (Verbundrohr, Eckventile, Siphons, Flexschläuche, zusammen 151,64 €) und „Werkzeug für dieses Projekt“, aber ohne Kauflinks, seit Amazon-Suchlinks entfernt sind. „Materialliste als PDF speichern“ erzeugt das PDF im Browser, ohne E-Mail-Abfrage; die Tabelle `email_captures` ist leer. Themen wie Estrich und Fliesen gehören nach `SEITENAUFBAU.md` 2a nicht mehr zur Richtung.

**Maßnahmen.**
- Entscheiden: Estrich- und Fliesenrechner auf `noindex` und aus der Navigation, oder serverseitig rendern.
- Sanitär-Rechner: Materialzeilen auf Teilearten verlinken (Eckventil → `/ersatzteile/eckventil`, Siphon → `/ersatzteile/siphon`), dort gibt es Produkte mit Preis.
- Langfristig passen Rechner, die eine Kompatibilitätsfrage beantworten, besser: „Welcher Rollladenmotor?“ (`BEREICHE-REIHENFOLGE.md` Rang 3), „Welche Kartusche?“ als Fragebogen.

**Effekt:** gering. **Aufwand:** 0,5 Tag für Links und noindex.

## A13. Vergleich `/vergleich/armaturen`

**Befund.** 28.000 px lang auf dem Handy, 101 Kauflinks, 45 Bilder. Erster Kauflink bei 1.493 px. Die Seite ist eine Datenbank-Ansicht, kein Leseweg. Titel „Badarmaturen im Vergleich: Maße, Druck und Preise“ (laut `SEITENAUFBAU.md` 3 sollte sie „Armaturen-Datenblätter nebeneinander“ heißen). Strukturierte Daten nur `BreadcrumbList`. Die Seite rendert mit `revalidate = 0` bei jedem Aufruf neu (400 KB HTML).

**Maßnahmen.**
- Filter (Produktart, Druck, Preis) oben und standardmäßig auf eine Produktart gefiltert, damit die Seite auf dem Handy nicht 40 Bildschirme lang ist.
- `revalidate` wie bei den anderen Seiten.
- Klickzahlen nach Maßnahme 2 ansehen; bleibt die Seite ohne Klicks, auf die Ratgeber verweisen und `noindex` erwägen. Die 177 Impressionen aus `SEITENAUFBAU.md` sind das Argument, sie zu behalten.

**Effekt:** gering. **Aufwand:** 0,5 Tag.

## A14. Teilesuche `/ersatzteile?q=`

**Befund.** „kartusche 35“ findet vier Teile (Kludi, Grohe), jeweils mit „Amazon*“, ohne Preis, ohne Link auf die Teileart `/ersatzteile/kartusche`. „hansgrohe brausekopf“ findet nichts, obwohl Hansgrohe-Brauseteile erfasst sind; die Seite schreibt „Wir haben das Teil noch nicht erfasst“ und zeigt darunter die komplette Markenliste mit langen Markentexten. Nulltreffer werden nirgends gespeichert. Suchergebnisseiten sind richtig `noindex`.

**Maßnahmen.**
- Suche auch über Teileart-Namen, Synonyme (Brausekopf = Handbrause = Duschkopf, Perlator = Strahlregler = Mousseur) und Problem-Titel. Ein Treffer auf eine Teileart oder ein Problem steht über den Einzelteilen.
- In den Treffern den Partnerpreis zeigen, sonst Amazon.
- Nulltreffer zählen (nur Suchbegriff und Datum, keine IP), wöchentlich ansehen. Das ist die billigste Quelle für neue Teile und Seiten.
- Bei Nulltreffer: passende Teileart oder Bereich vorschlagen statt der Markenliste.

**Effekt:** mittel. **Aufwand:** 1–2 Tage.

## A15. 404-Seite

**Befund.** Kennzeichnung „Fehler 404“, Satz „Diese Seite gibt es nicht (mehr).“, Suchfeld, Links auf Startseite, Problemlöser, Ratgeber. Antwortcode stimmt. Seitentitel ist der allgemeine Standardtitel. Das ist in Ordnung.

**Maßnahme:** Für alte WordPress-URLs, die noch Aufrufe haben, Weiterleitungen nachziehen. Dafür die 404-Aufrufe in Vercel ansehen (Logs) oder zählen. **Aufwand:** 1 Stunde.

---

# Teil B: Technik und Messung

## B1. Ladezeit und Caching

**Befund.** Jede Seite wird bei jedem Aufruf neu gerendert. Antwort-Header: `cache-control: private, no-cache, no-store`, `x-vercel-cache: MISS`, `age: 0`. Antwortzeit des Servers (gemessen mit curl): 0,55 bis 1,5 s, bei Markenseiten meist über 1,2 s. Ursache ist `src/lib/supabase.ts`: Der Client setzt für jede Abfrage `cache: 'no-store'`. In Next.js 14 macht ein einziger `no-store`-Fetch die ganze Route dynamisch, das `revalidate = 3600` in den Seiten wirkt dann nicht. Dazu haben Ratgeber, Wissensbeiträge und Vergleich ausdrücklich `revalidate = 0`.

Seitengrößen: Markenseiten 300–470 KB HTML unkomprimiert (Grohe 374 KB, rund 1.200 DOM-Elemente), Vergleich 400 KB. Komprimiert sind es um 35 KB, das ist unkritisch. Das JavaScript liegt bei rund 100 KB. Die Bilder laufen über die Next.js-Bildoptimierung, Größe passt (140–168 px für 162 px breite Karten, auf hochauflösenden Handys etwas weich).

PageSpeed Insights war während der Prüfung über dem Tageslimit. Im Browser lag der größte sichtbare Inhalt (LCP) der Grohe-Seite bei 1,2 s bei warmer Verbindung. Die Antwortzeit des Servers ist der größte Einzelposten.

**Maßnahme.** `cache: 'no-store'` aus dem globalen Fetch entfernen und stattdessen `next: { revalidate: 3600 }` (oder pro Seite das vorhandene `revalidate`) gelten lassen. Ratgeber und Wissensbeiträge von `revalidate = 0` auf 3600. Nach dem stündlichen Feed-Import (`partner-feeds.yml`) per `revalidatePath` oder einem Deploy-Hook neu bauen, damit Preise nicht älter als der Import sind. Die Preisangabe „Stand …“ zeigt schon heute den Import-Zeitpunkt, das bleibt richtig. Die Teilesuche (`?q=`) bleibt dynamisch.

Vorher im Preview-Deployment prüfen, dass `x-vercel-cache: HIT` kommt und Preise nach einem Import aktualisiert werden. Der Commit `6f92a8e` („use cache no-store for all supabase queries“) hatte einen Grund, vermutlich veraltete Daten nach dem Import. Den Grund mit On-Demand-Revalidierung lösen, nicht mit Abschalten des Caches.

**Effekt:** hoch. Schnellere Seiten verbessern Rankings und Absprungrate auf dem Handy, und Google crawlt 907 URLs schneller. Vercel-Kosten sinken. **Aufwand:** 0,5–1 Tag inklusive Test.

## B2. Strukturierte Daten

| Seitenart | heute | fehlt |
|---|---|---|
| alle | `Organization`, `WebSite` | `SearchAction` |
| Marke | `CollectionPage`, `ItemList`, `FAQPage` | |
| Serie | `BreadcrumbList` | `ItemList` der Teile |
| Teil | `BreadcrumbList` | `Product` mit `AggregateOffer`, `mpn`, `gtin13` |
| Teileart | `WebPage`, `FAQPage` | `ItemList`/`Product` der Produkte |
| Problem allgemein | `FAQPage` | |
| Problem je Marke | `BreadcrumbList` | `FAQPage`, wo Fragen da sind |
| Ratgeber | `FAQPage` | `ItemList` mit `Product` |
| Größenseite | `WebPage`, `FAQPage` | `ItemList`/`Product` |
| Rechner | nichts (Inhalt erst im Browser) | serverseitiges Rendern |

`Product` mit `AggregateOffer` ist die wichtigste Lücke. Regeln: nur Preise aus Partnerfeeds, keine Amazon-Preise, kein `aggregateRating`, kein `review`. Ein Hilfsbaustein in `src/lib` für Teil, Teileart, Ratgeber und Größenseite.

## B3. Klick-Tracking

**Befund.**
- `KlickZaehler` meldet jeden Klick auf `rel~=sponsored` an `/api/klick`, die Route speichert Pfad, Zielhost, Platzierung, Kennung und Shop in `affiliate_klicks`. Das Prinzip ist gut: keine Umleitung, keine Cookies, Bots gefiltert.
- Die API kannte die Platzierungen `neukauf` und `quelle` nicht und speicherte sie als `sonstige`. Quellen-Links hatten kein `data-platzierung`. Beides behoben in berndgalter-lab/hausbau-hero#63.
- Amazon: In allen geprüften Seiten trugen alle Amazon-Links `hausbauhero-21`. Die Platzierungs-IDs (`NEXT_PUBLIC_AMAZON_TAG_BOX`, `_TEIL` usw.) sind also nicht gesetzt, und für `angebot`, `neukauf`, `quelle` gibt es in `TAGS` gar keinen Eintrag. Im Amazon-Bericht sieht man deshalb nur Gesamtumsatz, nicht, welche Seitenart verkauft.
- Awin: `clickref` = `hh-<platzierung>`. Seitentyp und Seite fehlen. Awin erlaubt weitere Felder `clickref2` bis `clickref6`.
- Es gibt keine Verbindung zwischen Seitenaufrufen und Klicks. Ohne Aufrufe je Seite lässt sich keine Klickrate berechnen. Vercel Analytics ist eingebunden (`layout.tsx`) und liefert Aufrufe je Pfad.

**Maßnahmen.**
1. In Amazon PartnerNet je Seitentyp eine Tracking-ID anlegen (`hausbauhero-teil-21`, `-problem-21`, `-ratgeber-21`, `-groesse-21`, `-teilart-21`, `-neukauf-21`). Besser nach Seitentyp als nach Platzierung, weil Amazon nur eine ID je Link kennt und der Seitentyp die wichtigere Frage beantwortet. `mitTrackingId` bekommt dafür den Seitentyp als zweites Merkmal.
2. Awin: `clickref2` = Seitentyp, `clickref3` = Slug (gekürzt). Dann zeigt der Awin-Bericht je Verkauf die Seite.
3. `affiliate_klicks` um `seitentyp` ergänzen (aus dem Pfad ableitbar, also auch nachträglich per SQL).
4. Wöchentliche Auswertung: Klicks je Seitentyp aus Supabase gegen Aufrufe je Seitentyp aus Vercel Analytics (Export), dazu Provisionen aus Amazon und Awin. Eine Tabelle in `docs/` oder ein kleines Skript reicht.
5. Search Console anbinden (Daten in `seiten.impressionen`/`klicks` oder eigene Tabelle), damit Suchbegriffe je Seite bekannt sind.

**Effekt:** hoch, weil alle übrigen Maßnahmen erst damit überprüfbar sind. **Aufwand:** 1 Tag (Code) plus 30 Minuten in PartnerNet und Awin.

## B4. Klickdaten heute

`affiliate_klicks` enthält sechs Zeilen, alle zwischen 3. und 5. November 2026:

| Zeit (UTC) | Seite | Platzierung | Shop |
|---|---|---|---|
| 03.11. 17:27 | `/bad/komplettdusche-ratgeber` | uebersicht | Amazon |
| 03.11. 17:29 | `/bad/komplettdusche-ratgeber` | text | Amazon |
| 04.11. 05:41 | `/bad/waschtischarmatur-mit-brause` | uebersicht | Amazon |
| 04.11. 07:02 | `/bad/waschtischarmatur-ratgeber` | uebersicht | Amazon (hansgrohe Focus 100) |
| 04.11. 07:20 | `/bad/waschtischarmatur-ratgeber` | angebot | Contorion (71100000) |
| 05.11. 07:31 | `/ersatzteile/kludi/mx` | teil | Amazon (7685600-00) |

Fünf der sechs Klicks liegen auf Seiten im alten Aufbau (Platzierung `uebersicht` gibt es nicht mehr) und an Uhrzeiten, an denen auch gearbeitet wurde; ein Teil sind vermutlich eigene Testklicks. Aussagekräftig wird die Tabelle frühestens nach vier Wochen. Bis dahin taugen die Daten nur als Funktionstest: Zählung, Platzierung und Shop kommen an.

Zum Vergleich der Angebotslage (Tabelle `angebote`, aktiv): Contorion 133, hagebau 64, OTTO 36 Angebote zu Teilen; `ean_angebote` (Ratgeber, Neukauf, Teilearten) 319 Contorion, 55 OTTO, 42 hagebau. Von 538 Teilen haben 221 eine ASIN, 223 ein Partnerangebot, 71 beides, 165 nichts. Nur 10 Teile haben mehr als einen Partnershop.

---

# Teil C: Weitere Erlösmodelle

Bewertet nach Passung zur Seite (Reparatur, Teile, „welches passt?“), Aufwand, Umsatzpotenzial und Risiko. Grundannahme: Die Seite hat heute wenig Traffic. Alles, was pro Besucher wenig bringt, lohnt sich erst später.

| # | Modell | Passung | Aufwand | Potenzial | Risiko | Urteil |
|---|---|---|---|---|---|---|
| C1 | Handwerker-Vermittlung über Partnerprogramm | gut | gering | mittel | gering | jetzt |
| C2 | Weitere Shops und eBay Partner Network | sehr gut | gering bis mittel | hoch | gering | jetzt (siehe Maßnahme 5) |
| C3 | Newsletter und Wartungserinnerungen | gut | mittel | gering bis mittel | gering | später, mit Wasserfilter |
| C4 | Typenschild per Foto erkennen | sehr gut | mittel | mittel | mittel | später, Prototyp für VELUX |
| C5 | Nutzerkonto „Mein Haus“ | gut | hoch | gering | mittel | später, nur leichte Form |
| C6 | Daten an Shops lizenzieren | gut | mittel | mittel | mittel | später |
| C7 | Hersteller-Kooperationen | mittel | gering | gering | hoch | nur Datenzugang, nie bezahlte Platzierung |
| C8 | Display-Werbung | schlecht | gering | gering | mittel | erst ab etwa 50.000 Aufrufen im Monat, eher nie |
| C9 | PDF und Druckvorlagen | mittel | gering | gering | gering | nur als Zugabe zum Newsletter |
| C10 | B2B für Hausverwaltungen | mittel | hoch | unklar | mittel | nie (vorerst) |
| C11 | Eigener Shop oder Dropshipping | schlecht | sehr hoch | unklar | hoch | nie |
| C12 | Bezahlte Beratung | schlecht | mittel | gering | mittel | nie |

## C1. Handwerker-Vermittlung

Jede allgemeine Problemseite hat schon einen Abschnitt „Ab hier Fachbetrieb“ (`fachbetrieb_ab`), die Wissensbeiträge zu Hebeanlage und Komplettdusche sind Kostenfragen vor einem Auftrag. Dort passt ein Link „Installateur in deiner Nähe finden“ zu einem Vermittler mit Partnerprogramm. Kandidaten: Aroundhome, MyHammer, Check24 Profis. Ob und zu welchen Bedingungen es Partnerprogramme gibt (Awin, direkt, Provision je Anfrage), ist zu prüfen; Vermittler zahlen im Bad- und Sanierungsbereich typischerweise je qualifizierter Anfrage, nicht je Klick.

Wichtig: Kein eigenes Formular, das Kontaktdaten sammelt. Nur Link oder Partner-Widget, damit Datenschutz und Haftung beim Vermittler bleiben. Kennzeichnung wie bei den Shop-Links.

Passt zur Richtung: Die Seite sagt ehrlich, wann Selbermachen aufhört, und bietet dann den nächsten Schritt. Aufwand: Programm suchen und beantragen, eine Komponente, 11 Problemseiten und 3 Beiträge. Rund ein Tag.

## C2. Weitere Shops und eBay Partner Network

Der größte Hebel innerhalb des bestehenden Modells. 165 Teile sind heute nicht kaufbar, 213 haben genau einen Partnershop, nur 10 mehrere. Zwei Wege:

- Sanitär-Fachhändler mit Produktfeed in Awin oder anderen Netzwerken (z. B. Reuter, Megabad, Sanitino, Skybad; Verfügbarkeit im Netzwerk prüfen). Sie führen Originalersatzteile mit Herstellernummer, oft auch ältere. Der bestehende Feed-Import (`awin_feed.py`) lässt sich erweitern. Grundsatz 11 verbietet Hersteller-Shops, Fachhändler nicht.
- eBay Partner Network für ausgelaufene Teile. Wer ein Teil für eine 20 Jahre alte Armatur sucht, findet es oft nur noch gebraucht oder als Restposten bei eBay. Mit einer eBay-Produkt-ID statt Suchlink bleibt das im Rahmen der Regel „keine Suchlinks“. Aufwand höher, weil Angebote bei eBay kurzlebig sind; nur für Teile, die sonst nirgends zu haben sind.

## C3. Newsletter und Wartungserinnerungen

Erinnerungen passen dort, wo es wiederkehrende Käufe gibt: Filtereinsatz des Rückspülfilters (zweimal im Jahr), Salz der Enthärtungsanlage, Perlator entkalken, Rauchmelder nach zehn Jahren, Dachfenster-Dichtung pflegen. Mit dem Bereich Wasserfilter (Rang 2) entsteht der erste echte Anlass. Umsetzung: Eintrag mit E-Mail und Gerät, Double-Opt-in, eine Mail je Termin mit Kauflink zum passenden Einsatz. Die Tabelle `email_captures` gibt es schon (leer).

Später, weil heute die Leserzahl fehlt und Sanitär-Ersatzteile Einmalkäufe sind. Risiko gering, Pflicht: Double-Opt-in, Abmeldelink, Eintrag in der Datenschutzerklärung.

## C4. Typenschild per Foto erkennen

Leser fotografieren das Typenschild (VELUX-Code am Fensterrahmen, Geberit-Typ am Spülkasten-Deckel, Grohe-Nummer am Etikett), ein Bildmodell liest Code und Generation aus und führt zur Größen- oder Teilseite. Das ist ein Werkzeug, das kein Shop hat, und es löst genau das Problem, an dem Leser scheitern (Code finden und richtig lesen). Kosten je Bild im Bereich weniger Cent mit einem aktuellen Claude-Modell über die API.

Später, aber als erster Prototyp nur für VELUX sinnvoll: Die Codes sind klar aufgebaut (MK04, M04, 304) und die Größenseiten stehen. Risiken: falsche Erkennung (immer mit „bitte prüfen“ und manueller Eingabe), Datenschutz (Bild nicht speichern, Hinweis vor dem Hochladen), Missbrauch (Mengenbegrenzung).

## C5. Nutzerkonto „Mein Haus“

Geräte und Typenschilder speichern, passende Teile und Erinnerungen bekommen. Für die Nutzer bequem, für die Seite aber teuer: Anmeldung, Datenschutz, Pflege. Bei wenig Lesern lohnt es sich nicht. Leichte Form statt Konto: „Mein Gerät merken“ im Browser (lokal gespeichert, ohne Anmeldung), das die passenden Teile auf Problemseiten vorauswählt, plus optional die Erinnerung aus C3.

## C6. Daten an Shops lizenzieren

Die Zuordnungen Teil → Serie mit Beleg und die Widersprüche zwischen Händlern sind etwas, das Shops selbst nicht haben. Ein Sanitär-Shop könnte sie als Datei oder Schnittstelle kaufen, um „passt zu“ auf seinen Produktseiten zu zeigen. Später, wenn der Datenbestand groß genug ist (mehrere tausend Zuordnungen). Risiko: Konkurrenz zu den eigenen Partnern, Urheberrecht an Herstellerdaten klären.

## C7. Hersteller-Kooperationen

Herstellerdaten (Ersatzteillisten, Bilder) im Austausch gegen Verlinkung oder Nennung: sinnvoll und risikoarm. Bezahlte Platzierungen oder „verifiziert von“-Siegel: nein. Die Seite lebt davon, dass sie Herstellerangaben und Händlerwidersprüche neutral gegenüberstellt.

## C8. Display-Werbung

Bannerwerbung bringt im deutschen Heimwerkerbereich wenige Euro je tausend Aufrufe, verlangsamt die Seiten, braucht ein Cookie-Banner mit Einwilligung und verträgt sich schlecht mit dem nüchternen Auftritt. Premium-Netzwerke nehmen Seiten erst ab mehreren zehntausend Aufrufen im Monat. Erst dann neu bewerten, und dann eher nur auf Wissensbeiträgen ohne Kaufweg.

## C9. PDF und Druckvorlagen

„Wartungsplan fürs Haus“ oder „Typenschild-Spickzettel“ als PDF. Allein bringt das kein Geld, als Anreiz für den Newsletter (C3) kann es helfen.

## C10. B2B für Hausverwaltungen

Hausverwaltungen beauftragen Hausmeister und Handwerker, sie kaufen keine Ersatzteile über Affiliate-Links. Ein Angebot müsste ein eigenes Produkt sein (Teilelisten je Objekt, Bestellung über Großhandel). Passt nicht zur heutigen Seite.

## C11. Eigener Shop oder Dropshipping

Gewährleistung, Rücksendungen, Verpackungs- und Elektrogesetz, Umsatzsteuer, Lager oder Lieferantenverträge, und das gegen Contorion, hagebau und Amazon, die heute Partner sind. Margen bei Ersatzteilen sind klein. Nie.

## C12. Bezahlte Beratung

„Wir finden dein Teil für 9 €“: Aufwand je Anfrage hoch, Zahlungsbereitschaft gering, Haftung bei falscher Zuordnung. Die Fotoerkennung (C4) ist die skalierbare Form davon.

---

# Teil D: Entscheidungen für Bernd

Diese Punkte brauchen eine Freigabe, bevor jemand sie umsetzt:

1. Caching (B1): einverstanden, `no-store` zu entfernen und mit On-Demand-Revalidierung nach dem Feed-Import zu ersetzen?
2. Werkzeug und Zubehör (Maßnahme 8): `BEREICHE-REIHENFOLGE.md` sagt „Werkzeug erscheint nur in Materiallisten von Rechnern und Bereichsseiten“. Darf eine kurze Zeile „Beim Tausch auch nötig“ mit Dichtung, Fett und Spezialschlüssel auf Teil- und Problemseiten stehen?
3. Teile ohne Kaufmöglichkeit und ohne Zuordnung auf `noindex` (A5)?
4. Rechner Estrich und Fliesen auf `noindex` (A12)?
5. Amazon-Tracking-IDs je Seitentyp in PartnerNet anlegen (B3) und als Vercel-Umgebungsvariablen setzen.
6. Partnerprogramme beantragen: Handwerkervermittler (C1), weitere Sanitär-Shops und eBay Partner Network (C2). Das geht nur mit Bernds Konto. Bei der Bewerbung hausbau-hero.de als Werbefläche wählen.

Vorgeschlagene Reihenfolge: B1 und B3 zuerst (beides ohne sichtbare Änderung, aber Grundlage), dann die allgemeinen Problemseiten (A7) und die Teilseite mobil (A5), dann Programme beantragen (C1, C2) und strukturierte Daten (B2). Nach vier Wochen Klickdaten die Reihenfolge der übrigen Punkte prüfen.

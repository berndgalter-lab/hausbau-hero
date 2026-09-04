# hausbau-hero.de

Kostenrechner und Ratgeber für Bauherren. Next.js 16 (App Router), React 19, Supabase, Vercel.

## Setup

```bash
cp .env.local.example .env.local   # Werte eintragen
npm ci
npm run dev
```

## Womit die Seite Geld verdient

Alles an einer Stelle: **`src/lib/monetarisierung.ts`**.

**1. Amazon-Partnerlinks** — passen zu den Material-Rechnern (Wandfarbe, Fliesen,
Laminat …), wo direkt nach dem Rechnen eingekauft wird. `getAffiliateLink()` liefert
immer einen Link: hinterlegte URL → ASIN → Amazon-Suche nach dem Materialnamen. Das Tag
kommt aus `NEXT_PUBLIC_AMAZON_TAG`.
Für bessere Conversion: ASINs in `rechner_materialien.amazon_asin` pflegen — ein
Produktlink konvertiert deutlich besser als ein Suchlink.

**2. Angebotsvergleich / Lead-Vermittlung** — passt zu den Finanz- und Planungsrechnern
(Nebenkosten, Handwerkerkosten, Fördermittel, Eigenleistung, Baugenehmigung,
Gewerk-Reihenfolge). Dort ist die Kaufabsicht groß, aber es wird nichts bei Amazon
gekauft.

> **Noch nicht aktiv.** In `CTA_BY_SLUG` sind Texte für alle sechs Rechner hinterlegt,
> aber `url: ''`. Solange die URL leer ist, wird der Block nicht angezeigt — es entstehen
> also keine toten Links. Sobald du einen Partnerlink einträgst, erscheint er automatisch
> direkt unter dem Rechenergebnis.

Recherchierte Programme stehen als Kommentar in derselben Datei — Baufinanzierung über
financeads (Interhyp/Baufi24 bis 32,50 €, Dr. Klein 25,00 € pro Lead), Handwerkerangebote
über AWIN (Aroundhome, 5–35 € pro Lead). Zum Vergleich: Amazon zahlt auf Baustoffe
Cent-Beträge. **Hier hängt der größere Teil des Ertragspotenzials.**

## Wichtige Konventionen

- **Caching:** `REVALIDATE` aus `src/lib/supabase.ts` (1 h) gilt für alle Seiten. Kein
  `no-store` mehr — sonst ist jede Route wieder dynamisch und jeder Aufruf kostet eine
  Serverless-Funktion.
- **Silo-URLs:** `seiten.slug` ist global eindeutig; das Silo in der URL muss zum
  Datensatz passen, sonst wird permanent auf die kanonische URL weitergeleitet.
- **Dünne Artikel:** unter `MIN_TEXT_LAENGE` (`src/lib/artikel-html.ts`, aktuell 1200
  Zeichen sichtbarer Text) bekommt eine Seite `noindex` und fliegt aus der Sitemap.
  Schwelle anheben, wenn die Search Console zeigt, dass mehr Artikel nichts bringen.
- **Artikel-HTML** wird serverseitig durch `bereiteArtikelAuf()` geschickt: kaputte
  WordPress-Bilder raus, interne Links relativ, externe auf `nofollow`, Amazon-Links
  bekommen das Partner-Tag.
- **Skripte in `scripts/`** sind einmalige Migrationen. Sie brauchen
  `SUPABASE_SERVICE_KEY` aus der Umgebung — der Key gehört niemals in den Code.
- **Weiterleitungen** liegen in `src/proxy.ts` (hieß bis Next 15 `middleware.ts`).
- **Segment-Configs** wie `export const revalidate` müssen Literale sein — Next wertet
  sie statisch aus, ein importierter Wert lässt den Build fehlschlagen.
- **Interne Links** über `next/link`, nicht `<a href="/…">`. Affiliate- und externe Links
  bleiben `<a>` mit `target="_blank"` und `rel="nofollow noopener noreferrer sponsored"`.
- **Linting** läuft über `npm run lint` (ESLint 9 direkt, Flat Config in
  `eslint.config.mjs`). `next lint` gibt es seit Next 16 nicht mehr.

## Neuer Rechner

SQL-Insert in `rechner` (+ optional `rechner_materialien`), siehe
`scripts/seed-rechner.sql`. Formeln dürfen sich gegenseitig referenzieren, die
Reihenfolge der JSON-Schlüssel spielt keine Rolle. FAQ-Einträge in `src/lib/faq-data.ts`.

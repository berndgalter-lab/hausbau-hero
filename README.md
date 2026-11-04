# hausbau-hero.de

Materialrechner & Werkzeug-Empfehlungen für Bauherren und Handwerker.

## Setup

### 1. Supabase
- supabase.com → New Project → Region Frankfurt
- SQL Editor → `scripts/schema.sql` ausführen

### 2. Environment Variables
- `.env.local` anlegen nach `.env.local.example`

### 3. WordPress Migration
```bash
node scripts/migrate-wp.js > scripts/seed-seiten.sql
```
Dann `seed-seiten.sql` und `seed-rechner.sql` in Supabase SQL Editor.

### 4. Vercel Deploy
```bash
npm run build
# oder: Push to GitHub → Vercel auto-deploy
```

## Neues Silo in 30 Minuten
SQL INSERT in Supabase → Seite ist live. Siehe `scripts/seed-rechner.sql` als Vorlage.

## Partnershops (Awin) und Produktbilder

Neben Amazon zeigen die Teile-Seiten und die Kaufberatungen Angebote von **hagebau.de** (Awin 11513),
**Contorion** (Awin 14578) und **OTTO** (Awin 14336, Feed „Wohnen, Spielzeug und Baumarkt“) mit Preis,
Lieferbarkeit und Produktbild. Ersatzteile werden über EAN oder Herstellernummer zugeordnet, Produkte der
Kaufberatungen nur über die EAN (Tabelle `ean_angebote`), weil die Feeds für Armaturen keine Herstellernummer haben.

Ablauf: Der GitHub-Workflow `partner-feeds` gleicht die Awin-Feeds täglich mit der Tabelle `teile` ab
(`scripts/import/awin_feed.py`) und legt `angebote.json` in den Branch `feed-daten`. Supabase holt die Datei
stündlich ab (`intern.angebote_aus_github()`, pg_cron) und schreibt `angebote` und `teile.bild_url`.
GitHub braucht dafür **nur ein Secret**: `AWIN_FEED_URL` (dieselbe Feed-URL wie bei womo-teile).

- Probelauf: Actions → partner-feeds → „Run workflow“. Das Ergebnis (Bericht, Kandidaten-Liste) liegt dann im
  Branch `feed-probe` und geht nicht live.
- Protokoll in Supabase: `select * from intern.feed_importe order by id desc limit 5;`
- Neuer Shop: in `SHOPS` im Skript ergänzen und dessen Bild-Host in `src/lib/bild-hosts.json` eintragen.

## Inhalte ohne Datenbank-Zugriff veröffentlichen

Supabase liest stündlich aus dem main-Branch (`supabase/migrations/20261104_inhalte_aus_github.sql`):

- **Ersatzteile:** `data/ersatzteile/<marke>.json` anlegen (Schema wie `grohe.json`), Dateiname in
  `data/ersatzteile/index.json` eintragen, nach main mergen. Läuft zur Minute 37 ein.
- **Kaufberatungen:** `data/artikel/<slug>.html`, `<slug>.produkte.json` und `<slug>.meta.json`
  (`slug`, `silo`, `titel`, `seo_title`, `seo_description`, `quellen`) anlegen, Slug in `data/artikel/index.json`
  eintragen, nach main mergen. Läuft zur Minute 47 ein.
  Je Produkt zusätzlich `hersteller_nr`, `ean` (nur wenn eine Quelle Nummer und EAN zusammen nennt) und
  `technische_daten` (Schlüssel siehe `src/lib/armatur-daten.ts`). Mit EAN bekommt das Produkt Bild und
  Shop-Preise, mit `technische_daten.kategorie` erscheint es in der Datentabelle und unter `/vergleich/armaturen`.
- Geändert wird nur, was sich seit dem letzten Lauf geändert hat. Protokoll:
  `select pfad, importiert, ergebnis from intern.datei_importe order by importiert desc;`

Offen bei Hansgrohe (`data/ersatzteile/hansgrohe.json`, Feld `nicht_geprueft`): Die 59 Zuordnungen „Herstellerangabe“
beruhen auf Suchergebnis-Auszügen von hansgrohe-Seiten und sollten stichprobenartig im Browser gegengeprüft werden.
Die beiden früher ungeprüften ASINs der Niederdruck-Kaufberatung (B008CEOCQE, B003WF1NHY) sind über die
Modellnummer auf der Amazon-Seite bestätigt und eingetragen.

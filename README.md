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

Neben Amazon zeigen die Teile-Seiten Angebote von **hagebau.de** (Awin 11513) und **Contorion** (Awin 14578)
mit Preis, Lieferbarkeit und Produktbild. Der GitHub-Workflow `partner-feeds` gleicht die Awin-Feeds täglich
mit der Tabelle `teile` ab (`scripts/import/awin_feed.py`) und schreibt nach `angebote` und `teile.bild_url`.

Einmalig in GitHub → Settings → Secrets and variables → Actions anlegen:
`AWIN_FEED_URL` (dieselbe Feed-URL wie bei womo-teile), `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
Dann unter Actions → partner-feeds → „Run workflow“ einen Trockenlauf starten und den Bericht prüfen.

Neuer Shop: in `SHOPS` im Skript ergänzen und dessen Bild-Host in `src/lib/bild-hosts.json` eintragen.

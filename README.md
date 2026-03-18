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

# Übergabe an die lokale Sitzung (Mac)

Stand: 3. November 2026. Branch: `claude/tender-galileo-1k3koa`.

## Warum lokal

In der Cloud-Sitzung fragte jeder Supabase-Aufruf nach einer Bestätigung. Ursache: Die Sitzung hatte zwei Repos
(hausbau-hero und womo-teile). Mit mehr als einem Repo liest Claude die Freigabe in `.claude/settings.json` nicht.
Lokal im Ordner hausbau-hero greift die Freigabe: Supabase läuft ohne Rückfrage.

## Holen

```bash
cd ~/pfad/zu/hausbau-hero
git fetch origin
git checkout claude/tender-galileo-1k3koa
git pull
```

Dann im Ordner `claude` starten und diese Datei als Auftrag geben („Arbeite docs/UEBERGABE-LOKAL.md ab“).

## Erledigt (schon live bzw. in main)

- Awin-Shops hagebau.de und Contorion: Seiten, Datenbank, Feed-Abgleich, täglicher Workflow
  ([berndgalter-lab/hausbau-hero#3](https://github.com/berndgalter-lab/hausbau-hero/pull/3)).
- Supabase holt Shop-Angebote stündlich selbst aus dem Branch `feed-daten` (pg_cron, eingespielt und getestet).

## Offen – in dieser Reihenfolge

1. **Awin-Secret (nur Bernd, 1 Minute):** GitHub → hausbau-hero → Settings → Secrets and variables → Actions →
   New repository secret, Name `AWIN_FEED_URL`, Wert = dieselbe Feed-URL wie bei womo-teile
   (liegt in `~/.config/womo-teile/awin.json`). Danach Actions → partner-feeds → Run workflow (Probelauf).
   Ergebnis prüfen im Branch `feed-probe`: `protokoll.txt`, `bericht.csv`, `kandidaten.csv`.
   Bild-Hosts, die das Protokoll als „ohne Freigabe“ meldet, in `src/lib/bild-hosts.json` eintragen.
   Danach läuft es täglich von selbst live.

2. **Automatische Übernahme der Ersatzteil-Daten einspielen:** `supabase/migrations/20261103_ersatzteile_aus_github.sql`.
   Vorher einmal in einer Transaktion testen (`begin; select intern.ersatzteile_aus_github(); rollback;`).
   Achtung: Der erste Lauf spielt alle Dateien aus `data/ersatzteile/index.json` neu ein (Upsert). Wurden Daten
   seit dem letzten Import direkt in Supabase korrigiert, vorher in die JSON-Dateien übernehmen.
   Danach gilt: neue Marke = JSON-Datei + Eintrag in `index.json` + Merge nach main, ohne Datenbank-Zugriff.

3. **Hansgrohe-Ersatzteile** (`data/ersatzteile/hansgrohe.json`, siehe unten): Datei prüfen, in `index.json`
   eintragen (falls nicht schon drin) und einspielen – über Schritt 2 oder direkt:
   `select intern.importiere_ersatzteile((select content::jsonb from extensions.http_get('https://raw.githubusercontent.com/berndgalter-lab/hausbau-hero/<commit-sha>/data/ersatzteile/hansgrohe.json')));`
   Danach `/ersatzteile/hansgrohe` ansehen.

4. **Kaufberatung „Niederdruckarmatur für Untertischspeicher“** (`data/artikel/niederdruckarmatur-untertischspeicher.*`):
   Seite in `seiten` anlegen (Silo `bad`, Slug, Titel, SEO-Felder aus `.meta.json`, Inhalt aus `.html` in
   `content_md` – so wie bei `waschtischarmatur-mit-brause`) und die Produkte aus `.produkte.json` in `produkte`
   mit `seite_id`. Dann `/bad/niederdruckarmatur-untertischspeicher` ansehen und von
   `/bad/waschtischarmatur-mit-brause` verlinken (dort steht „Hast du einen offenen Untertischspeicher …“).

5. Branch mergen.

## Ergebnisse der Recherche

### Kaufberatung Niederdruckarmatur (fertig)

Dateien: `data/artikel/niederdruckarmatur-untertischspeicher.html`, `.produkte.json`, `.meta.json` (42 Quellen).
6 Modelle, alle Niederdruck-Varianten per Artikelnummer belegt:

| # | Modell | Einsatz | Amazon |
|---|---|---|---|
| 1 | GROHE Eurosmart Cosmopolitan S-Size ND (32955000) – Empfehlung | Waschtisch | Suchlink |
| 2 | hansgrohe Logis 70 ND Push-Open (71074000) | Waschtisch | Suchlink |
| 3 | Kludi BOZZ 75 ND (382770576) | Waschtisch | Suchlink |
| 4 | GROHE Eurosmart Cosmopolitan ND Küche (30194000) | Küche | ASIN B008QVBSTC |
| 5 | hansgrohe Focus M41 160 ND (31804000) | Küche | Suchlink |
| 6 | Schütte CORNWALL ND (79119) – Preis-Tipp | Küche | Suchlink |

Vor dem Einspielen von Hand auf amazon.de prüfen und ggf. als `amazon_asin` eintragen:
B008CEOCQE (GROHE 32955000), B003WF1NHY (hansgrohe 31804000) – in der Recherche nicht eindeutig belegt.
Widersprüche der Händler (Schwenkbereich 30194000, Höhe Schütte 79119) stehen im Text.

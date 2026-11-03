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

### Hansgrohe-Ersatzteile (fertig)

Datei: `data/ersatzteile/hansgrohe.json` – 26 Serien, 27 Teile, 67 Zuordnungen, 2 Problemlöser
(„hansgrohe Armatur tropft“, „Thermostat wird nicht warm“), 6 Widersprüche, 12 ungeprüfte Punkte.
In `data/ersatzteile/index.json` eingetragen. Geprüft: JSON gültig, alle Verweise vorhanden, Datenbank-Regeln
(`ersatzteile_sql.py`) ohne Fehler.

Wichtigste Erkenntnis: hansgrohe benennt Kartuschen nach Typ, nicht nach Durchmesser – M1 (97685000),
M3/M2 (92730000), M25XS (93740000), M25LXS (93760000), M35 EcoR (92530000), M35 LR (95646000), M25 Low Flow
(95973001); Thermostate: MTC 94282000 (Ecostat 1001 CL/SL, E/S) und SMTC 98282000 (Ecostat Comfort,
ShowerSelect, Showerpipes); 92373000 für vertauschte Anschlüsse. Ersatzteillisten hängen teils am Baujahr („> 05/17“).

**Vor dem Einspielen stichprobenartig im Browser prüfen:** 59 Zuordnungen stehen auf „Herstellerangabe“,
belegt über Suchergebnis-Auszüge von hansgrohe-Seiten (die Seiten selbst waren aus der Cloud nicht abrufbar).
Gesetzte ASINs (Titel enthält jeweils die Teilenummer): 92730000 → B07CRB1ZVD, 97685000 → B00BPAZBZI,
96737000 → B00CW6LWGG, 92646000 → B0017VIWN8.

Offen (steht auch in `nicht_geprueft`): Kartusche für Talis S 100 (72020000), Focus 100 (31607000),
Focus 70 (31730000), Novus 100 (71030000), Logis M31 (71832000); Thermostatkartusche für ShowerTablet Select
13171000 und Crometta Showerpipe 27264400; Farbcode-Schema (000 chrom, 670 mattschwarz …) nur aus Artikellisten
abgeleitet.

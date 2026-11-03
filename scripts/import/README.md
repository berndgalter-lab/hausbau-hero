# Ersatzteil-Daten importieren

Die Datensätze liegen in `data/ersatzteile/<marke>.json` (Schema siehe `geberit.json`).
Jede Zuordnung Serie ↔ Teil braucht eine Quelle und eine Sicherheitsstufe
(`hersteller`, `zwei_quellen`, `eine_quelle`).

## Schnellweg (empfohlen)

1. JSON committen und pushen (das Repo ist öffentlich).
2. In Supabase (SQL-Editor oder Claude mit Supabase-Zugang) ausführen:

```sql
select intern.importiere_ersatzteile((select content::jsonb from extensions.http_get(
  'https://raw.githubusercontent.com/berndgalter-lab/hausbau-hero/<commit-sha>/data/ersatzteile/<marke>.json')));
```

Die Funktion (`supabase/migrations/20261103_import_funktion.sql`) macht Upserts,
fasst doppelte Zuordnungen zusammen, begrenzt die Schwierigkeit auf 1–3 und
ersetzt die Widersprüche der Marke. Wiederholbar.

## Ausweichweg

`python3 -I scripts/import/ersatzteile_sql.py data/ersatzteile/<marke>.json <ordner>`
erzeugt SQL-Dateien, die nacheinander ausgeführt werden (langsam).

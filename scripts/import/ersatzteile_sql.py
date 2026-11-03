"""Erzeugt Import-SQL für die Ersatzteil-Tabellen aus einem Recherche-JSON.

Aufruf: python3 -I ersatzteile_sql.py <daten.json> <ausgabeordner>
Schreibt nummerierte .sql-Dateien (je < 40 KB), die nacheinander in Supabase
ausgeführt werden. Wiederholbar: alles per Upsert, Widersprüche werden ersetzt.
"""
import json, os, re, sys

TAG = "$hhx9$"
RANG = {"hersteller": 3, "zwei_quellen": 2, "eine_quelle": 1}
MAX = 38000


def lit(obj):
    s = json.dumps(obj, ensure_ascii=False)
    assert TAG not in s
    return f"{TAG}{s}{TAG}::jsonb"


def chunks(liste, bau):
    """Teilt eine Liste so, dass jedes erzeugte SQL unter MAX bleibt."""
    teil, out = [], []
    for x in liste:
        if teil and len(bau(teil + [x])) > MAX:
            out.append(bau(teil)); teil = []
        teil.append(x)
    if teil:
        out.append(bau(teil))
    return out


SLUG = re.compile(r"^[a-z0-9-]+$")
ASIN = re.compile(r"^[A-Z0-9]{10}$")


def pruefe(d):
    """Prüft die Datenbank-Regeln vorab und gleicht Kleinigkeiten an, statt den Import scheitern zu lassen."""
    fehler = []
    for t in d["teile"]:
        if t.get("schwierigkeit") is not None and t["schwierigkeit"] > 3:
            # 4 = "nur Fachbetrieb": in der DB als 3 (anspruchsvoll), selbst_tauschbar bleibt false
            t["schwierigkeit"] = 3
            t["selbst_tauschbar"] = False
        if t.get("schwierigkeit") is not None and t["schwierigkeit"] < 1:
            t["schwierigkeit"] = 1
        if t.get("amazon_asin") and not ASIN.match(t["amazon_asin"]):
            fehler.append(f"ASIN ungültig: {t['slug']} {t['amazon_asin']}")
    for liste in ("serien", "teile", "probleme"):
        for x in d[liste]:
            if not SLUG.match(x["slug"]):
                fehler.append(f"Slug ungültig ({liste}): {x['slug']}")
    for z in d["zuordnungen"]:
        if z["sicherheit"] not in RANG:
            fehler.append(f"Sicherheit ungültig: {z}")
    if fehler:
        raise SystemExit("\n".join(fehler))


def main(pfad, ziel):
    d = json.load(open(pfad, encoding="utf-8"))
    pruefe(d)
    m = d["marke"]; ms = m["slug"]
    marke_id = f"(select id from public.marken where slug = '{ms}')"
    sql = []

    sql.append(f"""insert into public.marken (slug, name, beschreibung, nummer_hinweis, ersatzteil_garantie, hersteller_ersatzteil_url, quellen)
select slug, name, beschreibung, nummer_hinweis, ersatzteil_garantie, hersteller_ersatzteil_url, coalesce(quellen, '{{}}')
from jsonb_to_record({lit(m)}) as x(slug text, name text, beschreibung text, nummer_hinweis text, ersatzteil_garantie text, hersteller_ersatzteil_url text, quellen text[])
on conflict (slug) do update set name = excluded.name, beschreibung = excluded.beschreibung, nummer_hinweis = excluded.nummer_hinweis,
  ersatzteil_garantie = excluded.ersatzteil_garantie, hersteller_ersatzteil_url = excluded.hersteller_ersatzteil_url, quellen = excluded.quellen, updated_at = now();""")

    # Zuordnungen je (Serie, Teil) zusammenfassen: Hinweise verbinden, beste Sicherheit behalten,
    # alle Beleg-URLs zusätzlich an die Serie hängen (erscheinen unten unter "Quellen").
    paare = {}
    for z in d["zuordnungen"]:
        k = (z["serie_slug"], z["teil_slug"])
        if k not in paare:
            paare[k] = {**z, "hinweise": [z["hinweis"]] if z.get("hinweis") else []}
        else:
            p = paare[k]
            if z.get("hinweis") and z["hinweis"] not in p["hinweise"]:
                p["hinweise"].append(z["hinweis"])
            if RANG[z["sicherheit"]] > RANG[p["sicherheit"]]:
                p["sicherheit"], p["quelle_url"] = z["sicherheit"], z["quelle_url"]
    zuord = [{"serie_slug": s, "teil_slug": t, "hinweis": "; ".join(p["hinweise"]) or None,
              "quelle_url": p["quelle_url"], "sicherheit": p["sicherheit"]} for (s, t), p in paare.items()]
    extra = {}
    for z in d["zuordnungen"]:
        if z.get("quelle_url"):
            extra.setdefault(z["serie_slug"], []).append(z["quelle_url"])
    serien = []
    for s in d["serien"]:
        q = list(dict.fromkeys((s.get("quellen") or []) + extra.get(s["slug"], [])))
        serien.append({**s, "quellen": q})

    def bau_serien(l):
        return f"""insert into public.serien (marke_id, slug, name, produkttyp, baujahr_von, baujahr_bis, kennnummern, erkennungsmerkmale, beschreibung, quellen)
select {marke_id}, slug, name, produkttyp, baujahr_von, baujahr_bis, coalesce(kennnummern, '{{}}'), erkennungsmerkmale, beschreibung, coalesce(quellen, '{{}}')
from jsonb_to_recordset({lit(l)}) as x(slug text, name text, produkttyp text, baujahr_von int, baujahr_bis int, kennnummern text[], erkennungsmerkmale text, beschreibung text, quellen text[])
on conflict (marke_id, slug) do update set name = excluded.name, produkttyp = excluded.produkttyp, baujahr_von = excluded.baujahr_von,
  baujahr_bis = excluded.baujahr_bis, kennnummern = excluded.kennnummern, erkennungsmerkmale = excluded.erkennungsmerkmale,
  beschreibung = excluded.beschreibung, quellen = excluded.quellen, updated_at = now();"""
    sql += chunks(serien, bau_serien)

    def bau_teile(l):
        return f"""insert into public.teile (marke_id, slug, name, teiltyp, oem_nummer, ean, masse, beschreibung, preis_spanne, verschleissteil, selbst_tauschbar, schwierigkeit, dauer_min, werkzeug, amazon_asin, quellen)
select {marke_id}, slug, name, teiltyp, oem_nummer, ean, coalesce(masse, '{{}}'), beschreibung, preis_spanne, verschleissteil, selbst_tauschbar, schwierigkeit, dauer_min, werkzeug, amazon_asin, coalesce(quellen, '{{}}')
from jsonb_to_recordset({lit(l)}) as x(slug text, name text, teiltyp text, oem_nummer text, ean text, masse jsonb, beschreibung text, preis_spanne text, verschleissteil boolean, selbst_tauschbar boolean, schwierigkeit smallint, dauer_min int, werkzeug text, amazon_asin text, quellen text[])
on conflict (slug) do update set name = excluded.name, teiltyp = excluded.teiltyp, oem_nummer = excluded.oem_nummer, ean = excluded.ean,
  masse = excluded.masse, beschreibung = excluded.beschreibung, preis_spanne = excluded.preis_spanne, verschleissteil = excluded.verschleissteil,
  selbst_tauschbar = excluded.selbst_tauschbar, schwierigkeit = excluded.schwierigkeit, dauer_min = excluded.dauer_min, werkzeug = excluded.werkzeug,
  amazon_asin = excluded.amazon_asin, quellen = excluded.quellen, updated_at = now();"""
    sql += chunks(d["teile"], bau_teile)

    def bau_zuord(l):
        return f"""insert into public.serie_teile (serie_id, teil_id, hinweis, quelle_url, sicherheit)
select s.id, t.id, x.hinweis, x.quelle_url, x.sicherheit
from jsonb_to_recordset({lit(l)}) as x(serie_slug text, teil_slug text, hinweis text, quelle_url text, sicherheit text)
join public.serien s on s.slug = x.serie_slug and s.marke_id = {marke_id}
join public.teile t on t.slug = x.teil_slug
on conflict (serie_id, teil_id) do update set hinweis = excluded.hinweis, quelle_url = excluded.quelle_url, sicherheit = excluded.sicherheit;"""
    sql += chunks(zuord, bau_zuord)

    def bau_probleme(l):
        return f"""insert into public.probleme (slug, marke_id, titel, symptom, ursachen, schritte, fachbetrieb_ab, quellen)
select slug, {marke_id}, titel, symptom, coalesce(ursachen, '[]'), coalesce(schritte, '[]'), fachbetrieb_ab, coalesce(quellen, '{{}}')
from jsonb_to_recordset({lit(l)}) as x(slug text, titel text, symptom text, ursachen jsonb, schritte jsonb, fachbetrieb_ab text, quellen text[])
on conflict (slug) do update set titel = excluded.titel, symptom = excluded.symptom, ursachen = excluded.ursachen, schritte = excluded.schritte,
  fachbetrieb_ab = excluded.fachbetrieb_ab, quellen = excluded.quellen, updated_at = now();"""
    sql += chunks(d["probleme"], bau_probleme)

    def bau_wider(l, erstes):
        loeschen = f"delete from public.widersprueche where marke_id = {marke_id};\n" if erstes else ""
        return loeschen + f"""insert into public.widersprueche (marke_id, thema, aussage_a, quelle_a, aussage_b, quelle_b)
select {marke_id}, thema, aussage_a, quelle_a, aussage_b, quelle_b
from jsonb_to_recordset({lit(l)}) as x(thema text, aussage_a text, quelle_a text, aussage_b text, quelle_b text);"""
    teile_w = chunks(d["widersprueche"], lambda l: bau_wider(l, False))
    # erstes Stück mit vorherigem Löschen neu bauen
    if d["widersprueche"]:
        erst, rest, aktuell = [], [], []
        for x in d["widersprueche"]:
            if aktuell and len(bau_wider(aktuell + [x], not erst and not rest)) > MAX:
                (erst if not erst else rest).append(bau_wider(aktuell, not erst)); aktuell = []
            aktuell.append(x)
        (erst if not erst else rest).append(bau_wider(aktuell, not erst))
        sql += erst + rest

    os.makedirs(ziel, exist_ok=True)
    for i, s in enumerate(sql, 1):
        with open(os.path.join(ziel, f"{ms}_{i:02d}.sql"), "w", encoding="utf-8") as f:
            f.write(s + "\n")
    print(ms, len(sql), "Dateien, Zuordnungen nach Zusammenfassen:", len(zuord))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])

-- Häufige Fragen je Marke (docs/SEITENAUFBAU.md, Abschnitt 4a): Liste aus der Marken-Datei,
-- je Eintrag {frage, antwort, kategorie, quellen, teile, problem}. Die Import-Funktion übernimmt sie.

alter table public.marken add column if not exists fragen jsonb not null default '[]';

create or replace function intern.importiere_ersatzteile(d jsonb) returns jsonb
language plpgsql
set search_path = public, pg_temp
as $$
declare
  m jsonb := d -> 'marke';
  mid uuid;
  n_serien int; n_teile int; n_zuord int; n_probleme int; n_wider int;
begin
  insert into marken (slug, name, beschreibung, nummer_hinweis, ersatzteil_garantie, hersteller_ersatzteil_url, quellen, fragen)
  values (m->>'slug', m->>'name', m->>'beschreibung', m->>'nummer_hinweis', m->>'ersatzteil_garantie', m->>'hersteller_ersatzteil_url',
          coalesce(array(select jsonb_array_elements_text(coalesce(m->'quellen', '[]'))), '{}'),
          case when jsonb_typeof(m->'fragen') = 'array' then m->'fragen' else '[]' end)
  on conflict (slug) do update set name = excluded.name, beschreibung = excluded.beschreibung, nummer_hinweis = excluded.nummer_hinweis,
    ersatzteil_garantie = excluded.ersatzteil_garantie, hersteller_ersatzteil_url = excluded.hersteller_ersatzteil_url,
    quellen = excluded.quellen, fragen = excluded.fragen, updated_at = now()
  returning id into mid;

  -- Serien; die Beleg-URLs aller Zuordnungen kommen zusätzlich in die Quellen der Serie
  insert into serien (marke_id, slug, name, produkttyp, baujahr_von, baujahr_bis, kennnummern, erkennungsmerkmale, beschreibung, quellen)
  select mid, x.slug, x.name, x.produkttyp, x.baujahr_von, x.baujahr_bis, coalesce(x.kennnummern, '{}'), x.erkennungsmerkmale, x.beschreibung,
    coalesce((select array_agg(distinct q) from (
        select unnest(coalesce(x.quellen, '{}')) as q
        union
        select z->>'quelle_url' from jsonb_array_elements(coalesce(d->'zuordnungen', '[]')) z
        where z->>'serie_slug' = x.slug and z->>'quelle_url' is not null) u), '{}')
  from jsonb_to_recordset(coalesce(d->'serien', '[]')) as x(slug text, name text, produkttyp text, baujahr_von int, baujahr_bis int,
    kennnummern text[], erkennungsmerkmale text, beschreibung text, quellen text[])
  on conflict (marke_id, slug) do update set name = excluded.name, produkttyp = excluded.produkttyp, baujahr_von = excluded.baujahr_von,
    baujahr_bis = excluded.baujahr_bis, kennnummern = excluded.kennnummern, erkennungsmerkmale = excluded.erkennungsmerkmale,
    beschreibung = excluded.beschreibung, quellen = excluded.quellen, updated_at = now();
  get diagnostics n_serien = row_count;

  -- Teile; Schwierigkeit auf 1–3 begrenzen (4 = nur Fachbetrieb -> 3 und nicht selbst tauschbar), ungültige ASIN verwerfen
  insert into teile (marke_id, slug, name, teiltyp, oem_nummer, ean, masse, beschreibung, preis_spanne, verschleissteil,
    selbst_tauschbar, schwierigkeit, dauer_min, werkzeug, amazon_asin, quellen)
  select mid, x.slug, x.name, x.teiltyp, x.oem_nummer, x.ean, coalesce(x.masse, '{}'), x.beschreibung, x.preis_spanne, x.verschleissteil,
    case when x.schwierigkeit > 3 then false else x.selbst_tauschbar end,
    case when x.schwierigkeit is null then null else least(greatest(x.schwierigkeit, 1), 3) end,
    x.dauer_min, x.werkzeug,
    case when x.amazon_asin ~ '^[A-Z0-9]{10}$' then x.amazon_asin end,
    coalesce(x.quellen, '{}')
  from jsonb_to_recordset(coalesce(d->'teile', '[]')) as x(slug text, name text, teiltyp text, oem_nummer text, ean text, masse jsonb,
    beschreibung text, preis_spanne text, verschleissteil boolean, selbst_tauschbar boolean, schwierigkeit int, dauer_min int,
    werkzeug text, amazon_asin text, quellen text[])
  on conflict (slug) do update set name = excluded.name, teiltyp = excluded.teiltyp, oem_nummer = excluded.oem_nummer, ean = excluded.ean,
    masse = excluded.masse, beschreibung = excluded.beschreibung, preis_spanne = excluded.preis_spanne,
    verschleissteil = excluded.verschleissteil, selbst_tauschbar = excluded.selbst_tauschbar, schwierigkeit = excluded.schwierigkeit,
    dauer_min = excluded.dauer_min, werkzeug = excluded.werkzeug, amazon_asin = excluded.amazon_asin, quellen = excluded.quellen,
    updated_at = now();
  get diagnostics n_teile = row_count;

  -- Zuordnungen je (Serie, Teil) zusammenfassen: Hinweise verbinden, beste Sicherheitsstufe samt Beleg behalten
  insert into serie_teile (serie_id, teil_id, hinweis, quelle_url, sicherheit)
  select s.id, t.id, g.hinweis, g.quelle_url, g.sicherheit
  from (
    select z->>'serie_slug' as ss, z->>'teil_slug' as ts,
      nullif(string_agg(distinct z->>'hinweis', '; '), '') as hinweis,
      (array_agg(z->>'quelle_url' order by case z->>'sicherheit' when 'hersteller' then 3 when 'zwei_quellen' then 2 else 1 end desc))[1] as quelle_url,
      (array_agg(z->>'sicherheit' order by case z->>'sicherheit' when 'hersteller' then 3 when 'zwei_quellen' then 2 else 1 end desc))[1] as sicherheit
    from jsonb_array_elements(coalesce(d->'zuordnungen', '[]')) z
    group by 1, 2
  ) g
  join serien s on s.slug = g.ss and s.marke_id = mid
  join teile t on t.slug = g.ts
  on conflict (serie_id, teil_id) do update set hinweis = excluded.hinweis, quelle_url = excluded.quelle_url, sicherheit = excluded.sicherheit;
  get diagnostics n_zuord = row_count;

  insert into probleme (slug, marke_id, titel, symptom, ursachen, schritte, fachbetrieb_ab, quellen)
  select x.slug, mid, x.titel, x.symptom, coalesce(x.ursachen, '[]'), coalesce(x.schritte, '[]'), x.fachbetrieb_ab, coalesce(x.quellen, '{}')
  from jsonb_to_recordset(coalesce(d->'probleme', '[]')) as x(slug text, titel text, symptom text, ursachen jsonb, schritte jsonb,
    fachbetrieb_ab text, quellen text[])
  on conflict (slug) do update set titel = excluded.titel, symptom = excluded.symptom, ursachen = excluded.ursachen,
    schritte = excluded.schritte, fachbetrieb_ab = excluded.fachbetrieb_ab, quellen = excluded.quellen, updated_at = now();
  get diagnostics n_probleme = row_count;

  delete from widersprueche where marke_id = mid;
  insert into widersprueche (marke_id, thema, aussage_a, quelle_a, aussage_b, quelle_b)
  select mid, x.thema, x.aussage_a, x.quelle_a, x.aussage_b, x.quelle_b
  from jsonb_to_recordset(coalesce(d->'widersprueche', '[]')) as x(thema text, aussage_a text, quelle_a text, aussage_b text, quelle_b text);
  get diagnostics n_wider = row_count;

  return jsonb_build_object('marke', m->>'slug', 'serien', n_serien, 'teile', n_teile, 'zuordnungen', n_zuord,
    'probleme', n_probleme, 'widersprueche', n_wider);
end;
$$;

revoke all on function intern.importiere_ersatzteile(jsonb) from public, anon, authenticated;

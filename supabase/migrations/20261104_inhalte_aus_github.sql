-- Inhalte gehen ohne Datenbank-Zugriff live: Supabase liest stündlich aus dem main-Branch
-- (öffentliches Repo) die Listen data/ersatzteile/index.json und data/artikel/index.json und
-- spielt jede Datei bzw. jeden Artikel ein, dessen Inhalt sich geändert hat.
--
--   Neue Marke:   data/ersatzteile/<marke>.json anlegen, in index.json eintragen, nach main mergen.
--   Neuer Artikel: data/artikel/<slug>.html + .produkte.json + .meta.json anlegen, Slug in
--                  data/artikel/index.json eintragen, nach main mergen.
--
-- Von Hand:   select intern.ersatzteile_aus_github();  select intern.artikel_aus_github();
-- Protokoll:  select pfad, importiert, ergebnis from intern.datei_importe order by importiert desc;

create extension if not exists http with schema extensions;
create extension if not exists pg_cron with schema pg_catalog;
create schema if not exists intern;

create table if not exists intern.datei_importe (
  pfad text primary key,
  md5 text not null,
  importiert timestamptz not null default now(),
  ergebnis jsonb
);
revoke all on table intern.datei_importe from public, anon, authenticated;

create or replace function intern.github_datei(pfad text) returns text
language plpgsql security definer set search_path = public, intern, extensions as $$
declare v_status int; v_inhalt text;
begin
  select status, content into v_status, v_inhalt
  from extensions.http_get('https://raw.githubusercontent.com/berndgalter-lab/hausbau-hero/main/' || pfad);
  return case when v_status = 200 then v_inhalt end;
end $$;

-- ---------- Ersatzteile ----------

create or replace function intern.ersatzteile_aus_github() returns jsonb
language plpgsql security definer set search_path = public, intern, extensions as $$
declare
  v_liste text; v_datei text; v_inhalt text; v_md5 text; v_erg jsonb;
  protokoll jsonb := '[]';
begin
  v_liste := intern.github_datei('data/ersatzteile/index.json');
  if v_liste is null then
    return jsonb_build_array(jsonb_build_object('fehler', 'data/ersatzteile/index.json nicht lesbar'));
  end if;
  for v_datei in select jsonb_array_elements_text(v_liste::jsonb) loop
    if v_datei !~ '^[a-z0-9-]+\.json$' then
      protokoll := protokoll || jsonb_build_object('datei', v_datei, 'fehler', 'ungültiger Dateiname');
      continue;
    end if;
    v_inhalt := intern.github_datei('data/ersatzteile/' || v_datei);
    if v_inhalt is null then
      protokoll := protokoll || jsonb_build_object('datei', v_datei, 'fehler', 'nicht lesbar');
      continue;
    end if;
    v_md5 := md5(v_inhalt);
    continue when exists (select 1 from intern.datei_importe where pfad = v_datei and md5 = v_md5);
    begin
      v_erg := intern.importiere_ersatzteile(v_inhalt::jsonb);
      insert into intern.datei_importe (pfad, md5, importiert, ergebnis) values (v_datei, v_md5, now(), v_erg)
      on conflict (pfad) do update set md5 = excluded.md5, importiert = excluded.importiert, ergebnis = excluded.ergebnis;
      protokoll := protokoll || jsonb_build_object('datei', v_datei, 'ergebnis', v_erg);
    exception when others then
      -- Eine kaputte Datei hält die anderen nicht auf; beim nächsten Lauf wird sie erneut versucht.
      protokoll := protokoll || jsonb_build_object('datei', v_datei, 'fehler', sqlerrm);
    end;
  end loop;
  return protokoll;
end $$;

-- ---------- Artikel (Kaufberatungen) ----------

-- Legt eine Seite an bzw. aktualisiert sie und ersetzt ihre Produkte.
-- Typ und Status übernimmt sie von der bestehenden Kaufberatung waschtischarmatur-mit-brause.
create or replace function intern.importiere_artikel(meta jsonb, html text, produkte jsonb) returns jsonb
language plpgsql security definer set search_path = public, intern as $$
declare
  v_slug text := meta->>'slug';
  v_silo uuid;
  v_vorlage seiten%rowtype;
  v_neu seiten%rowtype;
  v_id uuid;
  n_prod int;
begin
  if coalesce(v_slug, '') !~ '^[a-z0-9-]+$' then
    raise exception 'Slug ungültig: %', v_slug;
  end if;
  select id into v_silo from silos where slug = meta->>'silo';
  if v_silo is null then
    raise exception 'Silo unbekannt: %', meta->>'silo';
  end if;
  select id into v_id from seiten where slug = v_slug and silo_id = v_silo limit 1;

  if v_id is null then
    select * into v_vorlage from seiten where slug = 'waschtischarmatur-mit-brause' limit 1;
    if v_vorlage.id is null then
      raise exception 'Vorlage waschtischarmatur-mit-brause fehlt';
    end if;
    v_neu := v_vorlage;
    v_neu.id := gen_random_uuid();
    v_neu.silo_id := v_silo;
    v_neu.slug := v_slug;
    v_neu.titel := meta->>'titel';
    v_neu.seo_title := meta->>'seo_title';
    v_neu.seo_description := meta->>'seo_description';
    v_neu.content_md := html;
    v_neu.redirect_to := null;
    v_neu.alte_wp_url := null;
    v_neu.impressionen := case when v_vorlage.impressionen is null then null else 0 end;
    v_neu.klicks := case when v_vorlage.klicks is null then null else 0 end;
    v_neu.position := null;
    v_neu.created_at := now();
    v_neu.updated_at := now();
    insert into seiten select (v_neu).*;
    v_id := v_neu.id;
  else
    update seiten set titel = meta->>'titel', seo_title = meta->>'seo_title', seo_description = meta->>'seo_description',
      content_md = html, updated_at = now()
    where id = v_id;
  end if;

  delete from produkte where seite_id = v_id;
  insert into produkte (seite_id, name, hersteller, amazon_asin, affiliate_url, einsatzbereich, kurzbeschreibung,
                        vorteile, nachteile, ist_testsieger, ist_preistipp, ist_werkzeug, sortierung)
  select v_id, x.name, x.hersteller,
    case when x.amazon_asin ~ '^[A-Z0-9]{10}$' then x.amazon_asin end,
    case when x.affiliate_url ~ '^https://www\.amazon\.de/' then x.affiliate_url end,
    x.einsatzbereich, x.kurzbeschreibung, coalesce(x.vorteile, '[]'), coalesce(x.nachteile, '[]'),
    coalesce(x.ist_testsieger, false), coalesce(x.ist_preistipp, false), false, x.sortierung
  from jsonb_to_recordset(coalesce(produkte, '[]')) as x(name text, hersteller text, amazon_asin text, affiliate_url text,
    einsatzbereich text, kurzbeschreibung text, vorteile jsonb, nachteile jsonb, ist_testsieger boolean,
    ist_preistipp boolean, sortierung int)
  where coalesce(x.name, '') <> '';
  get diagnostics n_prod = row_count;

  return jsonb_build_object('seite', v_slug, 'neu', v_vorlage.id is not null, 'produkte', n_prod);
end $$;

create or replace function intern.artikel_aus_github() returns jsonb
language plpgsql security definer set search_path = public, intern, extensions as $$
declare
  v_liste text; v_slug text; v_meta text; v_html text; v_prod text; v_md5 text; v_erg jsonb;
  protokoll jsonb := '[]';
begin
  v_liste := intern.github_datei('data/artikel/index.json');
  if v_liste is null then
    return jsonb_build_array(jsonb_build_object('fehler', 'data/artikel/index.json nicht lesbar'));
  end if;
  for v_slug in select jsonb_array_elements_text(v_liste::jsonb) loop
    if v_slug !~ '^[a-z0-9-]+$' then
      protokoll := protokoll || jsonb_build_object('artikel', v_slug, 'fehler', 'ungültiger Slug');
      continue;
    end if;
    v_meta := intern.github_datei('data/artikel/' || v_slug || '.meta.json');
    v_html := intern.github_datei('data/artikel/' || v_slug || '.html');
    v_prod := intern.github_datei('data/artikel/' || v_slug || '.produkte.json');
    if v_meta is null or v_html is null then
      protokoll := protokoll || jsonb_build_object('artikel', v_slug, 'fehler', 'meta.json oder html nicht lesbar');
      continue;
    end if;
    v_md5 := md5(v_meta || v_html || coalesce(v_prod, ''));
    continue when exists (select 1 from intern.datei_importe where pfad = 'artikel/' || v_slug and md5 = v_md5);
    begin
      v_erg := intern.importiere_artikel(v_meta::jsonb, v_html, coalesce(v_prod, '[]')::jsonb);
      insert into intern.datei_importe (pfad, md5, importiert, ergebnis) values ('artikel/' || v_slug, v_md5, now(), v_erg)
      on conflict (pfad) do update set md5 = excluded.md5, importiert = excluded.importiert, ergebnis = excluded.ergebnis;
      protokoll := protokoll || jsonb_build_object('artikel', v_slug, 'ergebnis', v_erg);
    exception when others then
      protokoll := protokoll || jsonb_build_object('artikel', v_slug, 'fehler', sqlerrm);
    end;
  end loop;
  return protokoll;
end $$;

revoke all on function intern.github_datei(text) from public, anon, authenticated;
revoke all on function intern.ersatzteile_aus_github() from public, anon, authenticated;
revoke all on function intern.importiere_artikel(jsonb, text, jsonb) from public, anon, authenticated;
revoke all on function intern.artikel_aus_github() from public, anon, authenticated;

-- Bereits eingespielte Marken nur merken, nicht neu einspielen (Stand 04.11.2026).
insert into intern.datei_importe (pfad, md5, ergebnis)
select f, md5(i), '{"basis": "beim Einrichten nur gemerkt"}'::jsonb
from unnest(array['blanco.json', 'franke.json', 'geberit.json', 'grohe.json']) as f,
     lateral (select intern.github_datei('data/ersatzteile/' || f) as i) x
where i is not null
on conflict (pfad) do nothing;

select cron.schedule('ersatzteile-aus-github', '37 * * * *', $$select intern.ersatzteile_aus_github()$$);
select cron.schedule('artikel-aus-github', '47 * * * *', $$select intern.artikel_aus_github()$$);

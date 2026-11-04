-- Abzeichen „Testsieger“ und „Preis-Tipp“ gibt es nicht mehr (docs/SEITENAUFBAU.md). Die Vorlage zeigt sie
-- seit #7 nicht an, die Produktdateien haben die Felder nicht mehr, scripts/pruefe-inhalte.py lehnt sie ab.
-- Erst die Import-Funktion ohne die Spalten neu anlegen, dann die Spalten löschen: sonst bricht der
-- stündliche Artikel-Import (intern.artikel_aus_github) ab.

create or replace function intern.importiere_artikel(meta jsonb, html text, produkte jsonb)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public', 'intern'
as $function$
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
    -- Auch eine umgeleitete oder entfernte Seite wird mit einem Artikel wieder aktiv.
    update seiten set titel = meta->>'titel', seo_title = meta->>'seo_title', seo_description = meta->>'seo_description',
      content_md = html, status = 'aktiv', redirect_to = null, updated_at = now()
    where id = v_id;
  end if;

  delete from produkte where seite_id = v_id;
  insert into produkte (seite_id, name, hersteller, amazon_asin, affiliate_url, einsatzbereich, kurzbeschreibung,
                        vorteile, nachteile, ist_werkzeug, sortierung, ean, hersteller_nr, technische_daten)
  select v_id, x.name, x.hersteller,
    case when x.amazon_asin ~ '^[A-Z0-9]{10}$' then x.amazon_asin end,
    case when x.affiliate_url ~ '^https://www\.amazon\.de/' then x.affiliate_url end,
    x.einsatzbereich, x.kurzbeschreibung, coalesce(x.vorteile, '[]'), coalesce(x.nachteile, '[]'),
    false, x.sortierung,
    case when x.ean ~ '^[0-9]{8,14}$' then x.ean end,
    left(x.hersteller_nr, 40),
    case when jsonb_typeof(x.technische_daten) = 'object' then x.technische_daten else '{}' end
  from jsonb_to_recordset(coalesce(produkte, '[]')) as x(name text, hersteller text, amazon_asin text, affiliate_url text,
    einsatzbereich text, kurzbeschreibung text, vorteile jsonb, nachteile jsonb, sortierung int, ean text,
    hersteller_nr text, technische_daten jsonb)
  where coalesce(x.name, '') <> '';
  get diagnostics n_prod = row_count;

  return jsonb_build_object('seite', v_slug, 'neu', v_vorlage.id is not null, 'produkte', n_prod);
end $function$;

alter table produkte drop column if exists ist_testsieger, drop column if exists ist_preistipp;

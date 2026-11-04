-- Kaufberatungen bekommen Produktbilder, Shop-Preise und technische Daten für den Vergleich.
--
-- Die Awin-Feeds (hagebau.de, Contorion, OTTO) enthalten für Armaturen keine Herstellernummer,
-- aber fast immer die EAN. Deshalb hängen die Shop-Angebote an der EAN und nicht an produkte.id:
-- Der Artikel-Import legt die Produkte bei jeder Änderung neu an (neue IDs), die Angebote bleiben.
--
-- Ablauf wie bei den Ersatzteilen: scripts/import/awin_feed.py schreibt "ean_angebote" in
-- angebote.json (Branch feed-daten), intern.importiere_angebote spielt sie stündlich ein.

alter table public.produkte
  add column if not exists ean text check (ean is null or ean ~ '^[0-9]{8,14}$'),
  add column if not exists hersteller_nr text check (hersteller_nr is null or length(hersteller_nr) <= 40);
create index if not exists idx_produkte_ean on public.produkte (ltrim(ean, '0')) where ean is not null;

-- Ein Angebot je EAN und Shop. EAN ohne führende Nullen (wie norm_ean im Feed-Skript).
create table if not exists public.ean_angebote (
  id uuid primary key default gen_random_uuid(),
  ean text not null check (ean ~ '^[1-9][0-9]{6,13}$'),
  shop text not null check (shop ~ '^[a-z0-9-]{2,30}$'),
  shop_name text not null,
  netzwerk text not null default 'awin' check (netzwerk in ('awin')),
  advertiser_id int,
  produkt_id text not null,
  produkt_name text not null,
  url text not null check (url ~ '^https://www\.awin1\.com/'),
  preis numeric(10,2) check (preis is null or (preis > 0 and preis < 100000)),
  versand numeric(10,2) check (versand is null or versand >= 0),
  vorraetig boolean,
  lieferzeit text,
  bild_url text check (bild_url is null or bild_url ~ '^https://'),
  stand timestamptz not null default now(),
  aktiv boolean not null default true,
  unique (ean, shop)
);

alter table public.ean_angebote enable row level security;
drop policy if exists "lesen_ean_angebote" on public.ean_angebote;
create policy "lesen_ean_angebote" on public.ean_angebote for select using (aktiv);

-- Klick-Zählung: Platzierung "vergleich" (Armaturen-Vergleich) zulassen.
alter table public.affiliate_klicks drop constraint if exists affiliate_klicks_platzierung_check;
alter table public.affiliate_klicks add constraint affiliate_klicks_platzierung_check
  check (platzierung in ('box', 'text', 'rechner', 'teil', 'uebersicht', 'angebot', 'vergleich', 'sonstige'));

-- ---------- Feed-Import: zusätzlich ean_angebote ----------

create or replace function intern.importiere_angebote(d jsonb) returns jsonb
language plpgsql security definer set search_path = public, intern as $$
declare
  v_stand timestamptz := (d->>'stand')::timestamptz;
  v_shops text[] := array(select jsonb_array_elements_text(coalesce(d->'shops_fertig', '[]')));
  n_ang int; n_aus int; n_bild int; n_weg int; n_ean int; n_ean_aus int; v_erg jsonb;
begin
  if v_stand is null then
    raise exception 'angebote.json: stand fehlt';
  end if;
  if exists (select 1 from intern.feed_importe where stand >= v_stand) then
    return jsonb_build_object('uebersprungen', 'schon eingespielt', 'stand', v_stand);
  end if;

  -- Ungültiges wird ausgefiltert statt den ganzen Lauf scheitern zu lassen.
  insert into angebote (teil_id, shop, shop_name, netzwerk, advertiser_id, produkt_id, produkt_name, url,
                        preis, versand, vorraetig, lieferzeit, bild_url, treffer, stand, aktiv)
  select distinct on (x.teil_id, x.shop)
         x.teil_id, x.shop, x.shop_name, 'awin', x.advertiser_id, left(x.produkt_id, 80), left(x.produkt_name, 300), x.url,
         case when x.preis > 0 and x.preis < 100000 then x.preis end,
         case when x.versand >= 0 and x.versand < 1000 then x.versand end,
         x.vorraetig, left(x.lieferzeit, 80),
         case when x.bild_url ~ '^https://' then x.bild_url end,
         x.treffer, v_stand, true
  from jsonb_to_recordset(coalesce(d->'angebote', '[]')) as x(
         teil_id uuid, shop text, shop_name text, advertiser_id int, produkt_id text, produkt_name text, url text,
         preis numeric, versand numeric, vorraetig boolean, lieferzeit text, bild_url text, treffer text)
  where exists (select 1 from teile t where t.id = x.teil_id)
    and x.shop ~ '^[a-z0-9-]{2,30}$'
    and x.url ~ '^https://www\.awin1\.com/'
    and x.treffer in ('ean', 'nummer')
    and coalesce(x.produkt_id, '') <> '' and coalesce(x.produkt_name, '') <> '' and coalesce(x.shop_name, '') <> ''
  on conflict (teil_id, shop) do update set
    shop_name = excluded.shop_name, advertiser_id = excluded.advertiser_id, produkt_id = excluded.produkt_id,
    produkt_name = excluded.produkt_name, url = excluded.url, preis = excluded.preis, versand = excluded.versand,
    vorraetig = excluded.vorraetig, lieferzeit = excluded.lieferzeit, bild_url = excluded.bild_url,
    treffer = excluded.treffer, stand = excluded.stand, aktiv = true;
  get diagnostics n_ang = row_count;

  -- Was in diesem Lauf bei einem vollständig gelesenen Shop nicht mehr vorkam, verschwindet von der Seite.
  update angebote set aktiv = false where shop = any(v_shops) and stand < v_stand and aktiv;
  get diagnostics n_aus = row_count;

  -- Bilder: eigene Fotos (bild_quelle = 'eigen') bleiben immer stehen.
  update teile t set bild_url = b.bild_url, bild_quelle = 'awin', bild_shop = b.bild_shop, bild_stand = v_stand
  from jsonb_to_recordset(coalesce(d->'bilder', '[]')) as b(teil_id uuid, bild_url text, bild_shop text)
  where t.id = b.teil_id and b.bild_url ~ '^https://' and (t.bild_quelle is null or t.bild_quelle = 'awin');
  get diagnostics n_bild = row_count;

  update teile t set bild_url = null, bild_quelle = null, bild_shop = null, bild_stand = null
  where t.bild_quelle = 'awin' and t.bild_shop = any(v_shops)
    and not exists (select 1 from jsonb_to_recordset(coalesce(d->'bilder', '[]')) as b(teil_id uuid) where b.teil_id = t.id);
  get diagnostics n_weg = row_count;

  -- Kaufberatungen: Angebote je EAN.
  insert into ean_angebote (ean, shop, shop_name, netzwerk, advertiser_id, produkt_id, produkt_name, url,
                            preis, versand, vorraetig, lieferzeit, bild_url, stand, aktiv)
  select distinct on (ltrim(x.ean, '0'), x.shop)
         ltrim(x.ean, '0'), x.shop, x.shop_name, 'awin', x.advertiser_id, left(x.produkt_id, 80), left(x.produkt_name, 300), x.url,
         case when x.preis > 0 and x.preis < 100000 then x.preis end,
         case when x.versand >= 0 and x.versand < 1000 then x.versand end,
         x.vorraetig, left(x.lieferzeit, 80),
         case when x.bild_url ~ '^https://' then x.bild_url end,
         v_stand, true
  from jsonb_to_recordset(coalesce(d->'ean_angebote', '[]')) as x(
         ean text, shop text, shop_name text, advertiser_id int, produkt_id text, produkt_name text, url text,
         preis numeric, versand numeric, vorraetig boolean, lieferzeit text, bild_url text)
  where ltrim(coalesce(x.ean, ''), '0') ~ '^[1-9][0-9]{6,13}$'
    and x.shop ~ '^[a-z0-9-]{2,30}$'
    and x.url ~ '^https://www\.awin1\.com/'
    and coalesce(x.produkt_id, '') <> '' and coalesce(x.produkt_name, '') <> '' and coalesce(x.shop_name, '') <> ''
  on conflict (ean, shop) do update set
    shop_name = excluded.shop_name, advertiser_id = excluded.advertiser_id, produkt_id = excluded.produkt_id,
    produkt_name = excluded.produkt_name, url = excluded.url, preis = excluded.preis, versand = excluded.versand,
    vorraetig = excluded.vorraetig, lieferzeit = excluded.lieferzeit, bild_url = excluded.bild_url,
    stand = excluded.stand, aktiv = true;
  get diagnostics n_ean = row_count;

  update ean_angebote set aktiv = false where shop = any(v_shops) and stand < v_stand and aktiv;
  get diagnostics n_ean_aus = row_count;

  v_erg := jsonb_build_object('stand', v_stand, 'shops', v_shops, 'angebote', n_ang, 'abgeschaltet', n_aus,
                              'bilder', n_bild, 'bilder_entfernt', n_weg,
                              'ean_angebote', n_ean, 'ean_abgeschaltet', n_ean_aus);
  insert into intern.feed_importe (stand, ergebnis) values (v_stand, v_erg);
  return v_erg;
end $$;

revoke all on function intern.importiere_angebote(jsonb) from public, anon, authenticated;

-- ---------- Artikel-Import: EAN, Herstellernummer, technische Daten ----------

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
    -- Auch eine umgeleitete oder entfernte Seite wird mit einem Artikel wieder aktiv.
    update seiten set titel = meta->>'titel', seo_title = meta->>'seo_title', seo_description = meta->>'seo_description',
      content_md = html, status = 'aktiv', redirect_to = null, updated_at = now()
    where id = v_id;
  end if;

  delete from produkte where seite_id = v_id;
  insert into produkte (seite_id, name, hersteller, amazon_asin, affiliate_url, einsatzbereich, kurzbeschreibung,
                        vorteile, nachteile, ist_testsieger, ist_preistipp, ist_werkzeug, sortierung,
                        ean, hersteller_nr, technische_daten)
  select v_id, x.name, x.hersteller,
    case when x.amazon_asin ~ '^[A-Z0-9]{10}$' then x.amazon_asin end,
    case when x.affiliate_url ~ '^https://www\.amazon\.de/' then x.affiliate_url end,
    x.einsatzbereich, x.kurzbeschreibung, coalesce(x.vorteile, '[]'), coalesce(x.nachteile, '[]'),
    coalesce(x.ist_testsieger, false), coalesce(x.ist_preistipp, false), false, x.sortierung,
    case when x.ean ~ '^[0-9]{8,14}$' then x.ean end,
    left(x.hersteller_nr, 40),
    case when jsonb_typeof(x.technische_daten) = 'object' then x.technische_daten else '{}' end
  from jsonb_to_recordset(coalesce(produkte, '[]')) as x(name text, hersteller text, amazon_asin text, affiliate_url text,
    einsatzbereich text, kurzbeschreibung text, vorteile jsonb, nachteile jsonb, ist_testsieger boolean,
    ist_preistipp boolean, sortierung int, ean text, hersteller_nr text, technische_daten jsonb)
  where coalesce(x.name, '') <> '';
  get diagnostics n_prod = row_count;

  return jsonb_build_object('seite', v_slug, 'neu', v_vorlage.id is not null, 'produkte', n_prod);
end $$;

revoke all on function intern.importiere_artikel(jsonb, text, jsonb) from public, anon, authenticated;

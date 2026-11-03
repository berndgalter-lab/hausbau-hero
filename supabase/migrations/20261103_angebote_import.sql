-- Supabase holt die Shop-Angebote selbst ab: Der GitHub-Workflow partner-feeds legt
-- angebote.json in den Branch feed-daten (öffentliches Repo), pg_cron lädt die Datei
-- stündlich und spielt sie ein. So braucht GitHub keinen Datenbank-Schlüssel.
--
-- Von Hand:   select intern.angebote_aus_github();
-- Protokoll:  select * from intern.feed_importe order by id desc limit 5;

create extension if not exists http with schema extensions;
create extension if not exists pg_cron with schema pg_catalog;
create schema if not exists intern;

create table if not exists intern.feed_importe (
  id bigint generated always as identity primary key,
  importiert timestamptz not null default now(),
  stand timestamptz,
  ergebnis jsonb
);

create or replace function intern.importiere_angebote(d jsonb) returns jsonb
language plpgsql security definer set search_path = public, intern as $$
declare
  v_stand timestamptz := (d->>'stand')::timestamptz;
  v_shops text[] := array(select jsonb_array_elements_text(coalesce(d->'shops_fertig', '[]')));
  n_ang int; n_aus int; n_bild int; n_weg int; v_erg jsonb;
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

  v_erg := jsonb_build_object('stand', v_stand, 'shops', v_shops, 'angebote', n_ang, 'abgeschaltet', n_aus,
                              'bilder', n_bild, 'bilder_entfernt', n_weg);
  insert into intern.feed_importe (stand, ergebnis) values (v_stand, v_erg);
  return v_erg;
end $$;

create or replace function intern.angebote_aus_github() returns jsonb
language plpgsql security definer set search_path = public, intern, extensions as $$
declare
  v_status int; v_inhalt text;
begin
  select status, content into v_status, v_inhalt
  from extensions.http_get('https://raw.githubusercontent.com/berndgalter-lab/hausbau-hero/feed-daten/angebote.json');
  if v_status = 404 then
    return jsonb_build_object('uebersprungen', 'noch kein Feed-Lauf (Branch feed-daten fehlt)');
  elsif v_status <> 200 then
    raise exception 'angebote.json: HTTP %', v_status;
  end if;
  return intern.importiere_angebote(v_inhalt::jsonb);
end $$;

revoke all on function intern.importiere_angebote(jsonb) from public, anon, authenticated;
revoke all on function intern.angebote_aus_github() from public, anon, authenticated;
revoke all on table intern.feed_importe from public, anon, authenticated;

-- Stündlich zur Minute 7. Ist der Stand schon eingespielt, passiert nichts.
select cron.schedule('angebote-aus-github', '7 * * * *', $$select intern.angebote_aus_github()$$);

-- Weitere Partnershops (Awin: hagebau.de, Contorion) und Produktbilder je Teil.
-- Geschrieben wird nur vom Feed-Skript scripts/import/awin_feed.py mit dem Service-Key
-- (täglich per GitHub Action), gelesen wird öffentlich.

-- Bild je Teil. "eigen" (eigenes Foto) überschreibt das Feed-Skript nie,
-- "awin" setzt es bei jedem Lauf neu, "amazon" ist für die Creators API reserviert.
alter table public.teile
  add column if not exists bild_url text check (bild_url is null or bild_url ~ '^https://'),
  add column if not exists bild_quelle text check (bild_quelle is null or bild_quelle in ('awin', 'amazon', 'eigen')),
  add column if not exists bild_shop text,
  add column if not exists bild_stand timestamptz;

-- Ein Angebot je Teil und Shop: das passende Produkt aus dem Händler-Feed.
create table if not exists public.angebote (
  id uuid primary key default gen_random_uuid(),
  teil_id uuid not null references public.teile(id) on delete cascade,
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
  -- Wie das Feed-Produkt dem Teil zugeordnet wurde: über die EAN oder über die Herstellernummer + Marke.
  treffer text not null check (treffer in ('ean', 'nummer')),
  -- Letzter Feed-Lauf, in dem das Produkt vorkam. Die Seiten zeigen nur Angebote der letzten 3 Tage.
  stand timestamptz not null default now(),
  aktiv boolean not null default true,
  unique (teil_id, shop)
);
create index if not exists idx_angebote_teil on public.angebote (teil_id);

alter table public.angebote enable row level security;
drop policy if exists "lesen_angebote" on public.angebote;
create policy "lesen_angebote" on public.angebote for select using (aktiv);

-- Klick-Zählung: Awin-Links zulassen, Shop mitschreiben.
alter table public.affiliate_klicks drop constraint if exists affiliate_klicks_ziel_host_check;
alter table public.affiliate_klicks add constraint affiliate_klicks_ziel_host_check
  check (ziel_host in ('www.amazon.de', 'amazon.de', 'www.awin1.com', 'awin1.com'));
alter table public.affiliate_klicks drop constraint if exists affiliate_klicks_platzierung_check;
alter table public.affiliate_klicks add constraint affiliate_klicks_platzierung_check
  check (platzierung in ('box', 'text', 'rechner', 'teil', 'uebersicht', 'angebot', 'sonstige'));
alter table public.affiliate_klicks
  add column if not exists shop text check (shop is null or shop ~ '^[a-z0-9-]{2,30}$');

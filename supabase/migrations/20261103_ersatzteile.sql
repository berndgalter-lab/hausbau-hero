-- Ersatzteile-Bereich (Muster aus Womo-Teile): Marke -> Serie -> Teil, Zuordnung mit Quelle.
-- Alle Inhalte sind öffentlich lesbar, geschrieben wird nur mit dem Service-Key bzw. per Migration.

create table if not exists public.marken (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  beschreibung text,
  nummer_hinweis text,
  ersatzteil_garantie text,
  hersteller_ersatzteil_url text,
  quellen text[] not null default '{}',
  sortierung int not null default 0,
  aktiv boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.serien (
  id uuid primary key default gen_random_uuid(),
  marke_id uuid not null references public.marken(id) on delete cascade,
  slug text not null check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  produkttyp text not null,
  baujahr_von int,
  baujahr_bis int,
  kennnummern text[] not null default '{}',
  erkennungsmerkmale text,
  beschreibung text,
  quellen text[] not null default '{}',
  aktiv boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (marke_id, slug)
);

create table if not exists public.teile (
  id uuid primary key default gen_random_uuid(),
  marke_id uuid not null references public.marken(id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  teiltyp text not null,
  oem_nummer text,
  ean text,
  masse jsonb not null default '{}',
  beschreibung text,
  preis_spanne text,
  verschleissteil boolean,
  selbst_tauschbar boolean,
  schwierigkeit smallint check (schwierigkeit between 1 and 3),
  dauer_min int,
  werkzeug text,
  amazon_asin text check (amazon_asin is null or amazon_asin ~ '^[A-Z0-9]{10}$'),
  affiliate_url text,
  quellen text[] not null default '{}',
  aktiv boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_teile_oem on public.teile (oem_nummer);
create index if not exists idx_teile_marke on public.teile (marke_id);

create table if not exists public.serie_teile (
  serie_id uuid not null references public.serien(id) on delete cascade,
  teil_id uuid not null references public.teile(id) on delete cascade,
  hinweis text,
  quelle_url text,
  sicherheit text not null check (sicherheit in ('hersteller', 'zwei_quellen', 'eine_quelle')),
  primary key (serie_id, teil_id)
);
create index if not exists idx_serie_teile_teil on public.serie_teile (teil_id);

create table if not exists public.probleme (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  marke_id uuid references public.marken(id) on delete set null,
  titel text not null,
  symptom text,
  ursachen jsonb not null default '[]',
  schritte jsonb not null default '[]',
  fachbetrieb_ab text,
  quellen text[] not null default '{}',
  aktiv boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Widersprüchliche Händler-/Herstellerangaben werden offen gezeigt statt still entschieden.
create table if not exists public.widersprueche (
  id uuid primary key default gen_random_uuid(),
  marke_id uuid references public.marken(id) on delete cascade,
  thema text not null,
  aussage_a text not null,
  quelle_a text,
  aussage_b text not null,
  quelle_b text
);

-- Klicks auf Affiliate-Links. Strenge Formatprüfung, damit kein Freitext
-- (z. B. SQL-Injection-Versuche wie bei Womo-Teile) in der Tabelle landet.
create table if not exists public.affiliate_klicks (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  pfad text not null check (char_length(pfad) <= 200 and pfad ~ '^/[a-z0-9/_-]*$'),
  ziel_host text not null check (ziel_host in ('www.amazon.de', 'amazon.de')),
  platzierung text not null check (platzierung in ('box', 'text', 'rechner', 'teil', 'uebersicht', 'sonstige')),
  kennung text check (kennung is null or (char_length(kennung) <= 80 and kennung ~ '^[A-Za-z0-9 ._/-]*$'))
);
create index if not exists idx_affiliate_klicks_zeit on public.affiliate_klicks (created_at);

alter table public.marken enable row level security;
alter table public.serien enable row level security;
alter table public.teile enable row level security;
alter table public.serie_teile enable row level security;
alter table public.probleme enable row level security;
alter table public.widersprueche enable row level security;
alter table public.affiliate_klicks enable row level security;

create policy "lesen_marken" on public.marken for select using (aktiv);
create policy "lesen_serien" on public.serien for select using (aktiv);
create policy "lesen_teile" on public.teile for select using (aktiv);
create policy "lesen_serie_teile" on public.serie_teile for select using (true);
create policy "lesen_probleme" on public.probleme for select using (aktiv);
create policy "lesen_widersprueche" on public.widersprueche for select using (true);
-- Nur anonymes Schreiben, kein Lesen von außen.
create policy "klick_eintragen" on public.affiliate_klicks for insert to anon with check (true);

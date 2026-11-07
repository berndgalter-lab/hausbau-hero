-- Was Besucher in die Teilesuche (/ersatzteile?q=…) eintippen, mit Zahl der Treffer. Damit sehen wir, welche
-- Nummern und Teile fehlen. Kein Bezug zur Person: keine IP, kein User-Agent, keine Sitzung.
-- Links von Bereichsseiten (?von=bereich) und Crawler werden im Code nicht eingetragen (src/lib/suchprotokoll.ts).

create table if not exists public.suchanfragen (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  -- Strenge Formatprüfung wie bei affiliate_klicks: kein beliebiger Freitext
  begriff text not null check (char_length(begriff) between 2 and 60 and begriff ~ '^[0-9A-Za-zÄÖÜäöüßéèáà .,/+()½¼¾″"''-]+$'),
  treffer smallint not null check (treffer between 0 and 30)
);
create index if not exists idx_suchanfragen_zeit on public.suchanfragen (created_at);

alter table public.suchanfragen enable row level security;
-- Nur anonymes Schreiben, kein Lesen von außen.
create policy "suche_eintragen" on public.suchanfragen for insert to anon with check (true);

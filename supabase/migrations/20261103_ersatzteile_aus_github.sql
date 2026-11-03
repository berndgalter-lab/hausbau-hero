-- Ersatzteil-Daten gehen ohne Datenbank-Zugriff live: Supabase liest stündlich die Liste
-- data/ersatzteile/index.json aus dem main-Branch (öffentliches Repo) und spielt jede Datei,
-- deren Inhalt sich geändert hat, mit intern.importiere_ersatzteile ein.
-- Neue Marke = JSON-Datei anlegen, in index.json eintragen, nach main mergen. Fertig.
--
-- Von Hand:   select intern.ersatzteile_aus_github();
-- Protokoll:  select pfad, importiert, ergebnis from intern.datei_importe order by importiert desc;
--
-- NOCH NICHT EINGESPIELT (Stand 03.11.2026). Vor dem Einspielen einmal von Hand testen.

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

create or replace function intern.ersatzteile_aus_github() returns jsonb
language plpgsql security definer set search_path = public, intern, extensions as $$
declare
  basis constant text := 'https://raw.githubusercontent.com/berndgalter-lab/hausbau-hero/main/data/ersatzteile/';
  v_status int; v_inhalt text; v_liste jsonb; v_datei text; v_md5 text; v_erg jsonb;
  protokoll jsonb := '[]';
begin
  select status, content into v_status, v_inhalt from extensions.http_get(basis || 'index.json');
  if v_status <> 200 then
    raise exception 'index.json: HTTP %', v_status;
  end if;
  v_liste := v_inhalt::jsonb;

  for v_datei in select jsonb_array_elements_text(v_liste) loop
    if v_datei !~ '^[a-z0-9-]+\.json$' then
      protokoll := protokoll || jsonb_build_object('datei', v_datei, 'fehler', 'ungültiger Dateiname');
      continue;
    end if;
    select status, content into v_status, v_inhalt from extensions.http_get(basis || v_datei);
    if v_status <> 200 then
      protokoll := protokoll || jsonb_build_object('datei', v_datei, 'fehler', 'HTTP ' || v_status);
      continue;
    end if;
    v_md5 := md5(v_inhalt);
    if exists (select 1 from intern.datei_importe where pfad = v_datei and md5 = v_md5) then
      continue;  -- unverändert
    end if;
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

revoke all on function intern.ersatzteile_aus_github() from public, anon, authenticated;

select cron.schedule('ersatzteile-aus-github', '37 * * * *', $$select intern.ersatzteile_aus_github()$$);

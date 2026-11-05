-- Klickzählung: Platzierungen neukauf und quelle zulassen (seit #63 im Code, bisher von der Prüfregel abgelehnt)
-- und Seitenart je Klick speichern (src/lib/seitentyp.ts).

alter table public.affiliate_klicks drop constraint if exists affiliate_klicks_platzierung_check;
alter table public.affiliate_klicks add constraint affiliate_klicks_platzierung_check
  check (platzierung in ('box', 'text', 'rechner', 'teil', 'uebersicht', 'angebot', 'vergleich', 'neukauf', 'quelle', 'sonstige'));

alter table public.affiliate_klicks add column if not exists seitentyp text;
alter table public.affiliate_klicks drop constraint if exists affiliate_klicks_seitentyp_check;
alter table public.affiliate_klicks add constraint affiliate_klicks_seitentyp_check
  check (seitentyp is null or seitentyp in ('start', 'teil', 'problem', 'ratgeber', 'groesse', 'teilart', 'marke', 'serie',
    'bereich', 'ersatzteile', 'wissen', 'rechner', 'vergleich', 'sonstige'));

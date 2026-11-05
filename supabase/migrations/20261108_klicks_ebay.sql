-- Klickzählung: eBay Partner Network als Ziel zulassen (Links auf ebay.de mit EPN-Kampagne).
alter table public.affiliate_klicks drop constraint affiliate_klicks_ziel_host_check;
alter table public.affiliate_klicks add constraint affiliate_klicks_ziel_host_check
  check (ziel_host = any (array['www.amazon.de', 'amazon.de', 'www.awin1.com', 'awin1.com', 'www.ebay.de', 'ebay.de']));

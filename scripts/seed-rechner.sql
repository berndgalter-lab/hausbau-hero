-- ============================================================
-- SEED: 4 Rechner für Tag 1
-- Ausführen NACH schema.sql und NACH migrate-wp.js Output
-- ============================================================

-- Wandfarbe-Rechner
INSERT INTO rechner (silo_id, name, slug, beschreibung, eingabefelder, berechnungslogik) VALUES (
  (SELECT id FROM silos WHERE slug='farben'),
  'Wandfarbe-Rechner',
  'wandfarbe',
  'Berechne wie viel Wandfarbe du für deinen Raum brauchst — inkl. Materialliste und Werkzeug.',
  '[{"name":"laenge","label":"Raumlänge","einheit":"m","typ":"number","min":1,"max":30,"step":0.1,"default":4},{"name":"breite","label":"Raumbreite","einheit":"m","typ":"number","min":1,"max":30,"step":0.1,"default":3.5},{"name":"hoehe","label":"Raumhöhe","einheit":"m","typ":"number","min":2,"max":4,"step":0.1,"default":2.5},{"name":"fenster","label":"Fenster","typ":"number","min":0,"max":10,"default":2},{"name":"tueren","label":"Türen","typ":"number","min":0,"max":5,"default":1},{"name":"anstriche","label":"Anstriche","typ":"select","options":[{"value":1,"label":"1 Anstrich"},{"value":2,"label":"2 Anstriche (empfohlen)"}],"default":2}]',
  '{"wandflaeche_brutto":"(laenge + breite) * 2 * hoehe","abzug":"fenster * 1.3 + tueren * 1.9","wandflaeche_netto":"wandflaeche_brutto - abzug","farbe_liter":"wandflaeche_netto / 6.5 * anstriche","farbe_eimer_10l":"ceil(farbe_liter / 10)","abklebeband_rollen":"ceil((fenster + tueren) * 8 / 50)","abdeckfolie":"ceil(laenge * breite / 20)"}'
);

-- Wandfarbe Materialien
INSERT INTO rechner_materialien (rechner_id, name, kategorie, formel, einheit, amazon_asin, preis_ca, sortierung) VALUES
  ((SELECT id FROM rechner WHERE slug='wandfarbe'), 'Wandfarbe weiß (10L Eimer)', 'Material', 'farbe_eimer_10l', 'Stück', 'B0BYJL3DC3', 42.99, 1),
  ((SELECT id FROM rechner WHERE slug='wandfarbe'), 'Abklebeband (50m Rolle)', 'Zubehör', 'abklebeband_rollen', 'Rollen', 'B000KJQ4JY', 7.49, 2),
  ((SELECT id FROM rechner WHERE slug='wandfarbe'), 'Abdeckfolie (4×5m)', 'Zubehör', 'abdeckfolie', 'Stück', 'B08CVB6YK4', 5.99, 3),
  ((SELECT id FROM rechner WHERE slug='wandfarbe'), 'Farbroller-Set mit Teleskopstange', 'Werkzeug', '1', 'Set', 'B01N6GDPG6', 24.99, 10),
  ((SELECT id FROM rechner WHERE slug='wandfarbe'), 'Pinsel-Set (Ecken & Kanten)', 'Werkzeug', '1', 'Set', 'B07QK1WLLB', 11.99, 11),
  ((SELECT id FROM rechner WHERE slug='wandfarbe'), 'Farbwanne', 'Werkzeug', '1', 'Stück', 'B000KKOR66', 4.99, 12),
  ((SELECT id FROM rechner WHERE slug='wandfarbe'), 'Farbsprühsystem Wagner', 'Werkzeug', '1', 'Stück', 'B08L6PS839', 89.99, 13);

-- Fliesen-Rechner
INSERT INTO rechner (silo_id, name, slug, beschreibung, eingabefelder, berechnungslogik) VALUES (
  (SELECT id FROM silos WHERE slug='bad'),
  'Fliesen-Rechner',
  'fliesen',
  'Berechne wie viele Fliesen du brauchst — inkl. Kleber, Fugenmörtel und Werkzeug.',
  '[{"name":"flaeche","label":"Fläche","einheit":"m²","typ":"number","min":1,"max":200,"step":0.1,"default":12},{"name":"fliese_l","label":"Fliesenlänge","einheit":"cm","typ":"number","min":10,"max":120,"default":60},{"name":"fliese_b","label":"Fliesenbreite","einheit":"cm","typ":"number","min":10,"max":120,"default":30},{"name":"verschnitt","label":"Verschnitt","typ":"select","options":[{"value":5,"label":"5% (gerader Verlauf)"},{"value":10,"label":"10% (Standard)"},{"value":15,"label":"15% (Diagonalverlegung)"}],"default":10}]',
  '{"fliese_m2":"fliese_l * fliese_b / 10000","fliesen_netto":"flaeche / fliese_m2","fliesen_brutto":"ceil(fliesen_netto * (1 + verschnitt / 100))","kleber_kg":"flaeche * 4.5","kleber_saecke":"ceil(kleber_kg / 25)","fugenmoertel_kg":"flaeche * 0.5","fugenmoertel_saecke":"ceil(fugenmoertel_kg / 5)"}'
);

INSERT INTO rechner_materialien (rechner_id, name, kategorie, formel, einheit, amazon_asin, preis_ca, sortierung) VALUES
  ((SELECT id FROM rechner WHERE slug='fliesen'), 'Fliesen (Stück)', 'Material', 'fliesen_brutto', 'Stück', NULL, 2.50, 1),
  ((SELECT id FROM rechner WHERE slug='fliesen'), 'Fliesenkleber (25kg Sack)', 'Material', 'kleber_saecke', 'Säcke', 'B08DHBX6H8', 18.99, 2),
  ((SELECT id FROM rechner WHERE slug='fliesen'), 'Fugenmörtel (5kg)', 'Material', 'fugenmoertel_saecke', 'Beutel', 'B07C5GNLTB', 9.99, 3),
  ((SELECT id FROM rechner WHERE slug='fliesen'), 'Fliesenschneider 600mm', 'Werkzeug', '1', 'Stück', 'B003TU0AEA', 79.99, 10),
  ((SELECT id FROM rechner WHERE slug='fliesen'), 'Zahnspachtel 10mm', 'Werkzeug', '1', 'Stück', 'B001OC5UXI', 8.49, 11),
  ((SELECT id FROM rechner WHERE slug='fliesen'), 'Fliesenkreuze 3mm (200 Stk)', 'Zubehör', '1', 'Pack', 'B01MQFQM0Y', 5.99, 12),
  ((SELECT id FROM rechner WHERE slug='fliesen'), 'Fugengummi', 'Werkzeug', '1', 'Stück', 'B001AYMZGU', 6.99, 13),
  ((SELECT id FROM rechner WHERE slug='fliesen'), 'Nivelliersystem Set (100 Stk)', 'Werkzeug', '1', 'Set', 'B07YZ8P1ZQ', 29.99, 14);

-- Trockenbau-Rechner
INSERT INTO rechner (silo_id, name, slug, beschreibung, eingabefelder, berechnungslogik) VALUES (
  (SELECT id FROM silos WHERE slug='werkzeuge'),
  'Trockenbau-Rechner',
  'trockenbau',
  'Berechne Material für Rigips-Ständerwände — Profile, Platten, Schrauben und Werkzeug.',
  '[{"name":"laenge","label":"Wandlänge","einheit":"m","typ":"number","min":1,"max":30,"step":0.1,"default":4},{"name":"hoehe","label":"Wandhöhe","einheit":"m","typ":"number","min":2,"max":4,"step":0.1,"default":2.5},{"name":"beplankung","label":"Beplankung","typ":"select","options":[{"value":1,"label":"Einfach (1 Platte je Seite)"},{"value":2,"label":"Doppelt (2 Platten je Seite)"}],"default":1},{"name":"daemmung","label":"Dämmung","typ":"select","options":[{"value":1,"label":"Ja, mit Mineralwolle"},{"value":0,"label":"Nein, ohne"}],"default":1}]',
  '{"wandflaeche":"laenge * hoehe","cw_profile":"ceil(laenge / 0.625) + 1","uw_profile":"ceil(laenge / 3) * 2","gipsplatten":"ceil(wandflaeche / 3) * 2 * beplankung","schrauben":"ceil(wandflaeche * 15 * beplankung)","fugenband_m":"ceil(hoehe * (cw_profile - 1) + laenge * 2)","spachtel_kg":"ceil(fugenband_m * 0.3)","daemmung_m2":"daemmung * wandflaeche"}'
);

INSERT INTO rechner_materialien (rechner_id, name, kategorie, formel, einheit, amazon_asin, preis_ca, sortierung) VALUES
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'CW 75 Profile (2,6m)', 'Material', 'cw_profile', 'Stück', NULL, 4.29, 1),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'UW 75 Profile (3m)', 'Material', 'uw_profile', 'Stück', NULL, 3.89, 2),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Rigips-Platten 12,5mm (2,6×0,6m)', 'Material', 'gipsplatten', 'Stück', NULL, 5.99, 3),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Schnellbauschrauben (Pack à 500)', 'Material', 'ceil(schrauben / 500)', 'Pack', 'B07WRVR2WL', 12.99, 4),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Fugenband (25m Rolle)', 'Material', 'ceil(fugenband_m / 25)', 'Rollen', 'B000LNSYGI', 6.49, 5),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Fugenspachtel (5kg)', 'Material', 'ceil(spachtel_kg / 5)', 'Eimer', 'B00BVDQFM0', 11.99, 6),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Mineralwolle 035 (Paket 4,86m²)', 'Material', 'ceil(daemmung_m2 / 4.86)', 'Pakete', NULL, 32.99, 7),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Akku-Schrauber mit Trockenbauvorsatz', 'Werkzeug', '1', 'Stück', 'B07GBBX87J', 179.99, 10),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Blechschere für Profile', 'Werkzeug', '1', 'Stück', 'B0002YYFJQ', 24.99, 11),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Cuttermesser Set', 'Werkzeug', '1', 'Set', 'B08JQ7YBXV', 12.99, 12),
  ((SELECT id FROM rechner WHERE slug='trockenbau'), 'Spachtel-Set (breit + schmal)', 'Werkzeug', '1', 'Set', 'B001DKP5Q6', 14.99, 13);

-- Stromverbrauch-Rechner (der Handwerker-Killer!)
INSERT INTO rechner (silo_id, name, slug, beschreibung, eingabefelder, berechnungslogik) VALUES (
  (SELECT id FROM silos WHERE slug='stromerzeuger'),
  'Stromerzeuger-Rechner',
  'stromverbrauch',
  'Finde den passenden Stromerzeuger für deine Baustelle — wähle deine Geräte und erhalte eine Empfehlung.',
  '[{"name":"bohrmaschine","label":"Bohrmaschine (750W)","typ":"number","min":0,"max":5,"default":0},{"name":"kreissaege","label":"Kreissäge (1800W)","typ":"number","min":0,"max":3,"default":0},{"name":"winkelschleifer","label":"Winkelschleifer (2000W)","typ":"number","min":0,"max":3,"default":0},{"name":"betonmischer","label":"Betonmischer (800W)","typ":"number","min":0,"max":2,"default":0},{"name":"kompressor","label":"Kompressor (2200W)","typ":"number","min":0,"max":2,"default":0},{"name":"bautrockner","label":"Bautrockner (900W)","typ":"number","min":0,"max":5,"default":0},{"name":"heizluefter","label":"Heizlüfter (2000W)","typ":"number","min":0,"max":3,"default":0},{"name":"beleuchtung","label":"Baustellenbeleuchtung (500W)","typ":"number","min":0,"max":5,"default":0},{"name":"schweissgeraet","label":"Schweißgerät (3500W)","typ":"number","min":0,"max":2,"default":0},{"name":"gleichzeitig","label":"Gleichzeitigkeitsfaktor","typ":"select","options":[{"value":100,"label":"Alle gleichzeitig (100%)"},{"value":60,"label":"Meiste gleichzeitig (60%)"},{"value":40,"label":"Immer nur einige (40%)"}],"default":60}]',
  '{"gesamt_watt":"bohrmaschine * 750 + kreissaege * 1800 + winkelschleifer * 2000 + betonmischer * 800 + kompressor * 2200 + bautrockner * 900 + heizluefter * 2000 + beleuchtung * 500 + schweissgeraet * 3500","anlauf_watt":"gesamt_watt * 1.5","benoetigte_watt":"ceil(anlauf_watt * gleichzeitig / 100)"}'
);

-- Stromerzeuger: Materialien sind die Empfehlungen basierend auf Watt
INSERT INTO rechner_materialien (rechner_id, name, kategorie, formel, einheit, amazon_asin, preis_ca, sortierung) VALUES
  ((SELECT id FROM rechner WHERE slug='stromverbrauch'), 'Empfehlung: bis 2.000W — Inverter-Stromerzeuger', 'Empfehlung', 'benoetigte_watt <= 2000 ? 1 : 0', 'Info', 'B07X3BFZGQ', 449.99, 1),
  ((SELECT id FROM rechner WHERE slug='stromverbrauch'), 'Empfehlung: 2.000-5.000W — Benzin-Stromerzeuger', 'Empfehlung', 'benoetigte_watt > 2000 && benoetigte_watt <= 5000 ? 1 : 0', 'Info', 'B0831B1GQX', 699.99, 2),
  ((SELECT id FROM rechner WHERE slug='stromverbrauch'), 'Empfehlung: 5.000-8.000W — Profi-Stromerzeuger', 'Empfehlung', 'benoetigte_watt > 5000 && benoetigte_watt <= 8000 ? 1 : 0', 'Info', 'B08DHKGRL7', 1299.99, 3),
  ((SELECT id FROM rechner WHERE slug='stromverbrauch'), 'Empfehlung: über 8.000W — Diesel-Stromerzeuger', 'Empfehlung', 'benoetigte_watt > 8000 ? 1 : 0', 'Info', 'B09FSNPRXL', 2499.99, 4),
  ((SELECT id FROM rechner WHERE slug='stromverbrauch'), 'Verlängerungskabel 25m (Baustellenqualität)', 'Zubehör', '1', 'Stück', 'B003WGRXYW', 39.99, 10),
  ((SELECT id FROM rechner WHERE slug='stromverbrauch'), 'Stromverteiler Baustelle', 'Zubehör', '1', 'Stück', 'B00HSEB09C', 89.99, 11);

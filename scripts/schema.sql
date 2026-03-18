-- hausbau-hero.de Schema — Kopiere in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS silos (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, beschreibung TEXT, intro_text TEXT, icon TEXT, sortierung INT DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS seiten (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, silo_id UUID REFERENCES silos(id), slug TEXT UNIQUE NOT NULL, titel TEXT NOT NULL, seo_title TEXT, seo_description TEXT, typ TEXT DEFAULT 'artikel', content_md TEXT, status TEXT DEFAULT 'aktiv', redirect_to TEXT, alte_wp_url TEXT, impressionen INT DEFAULT 0, klicks INT DEFAULT 0, position FLOAT, sortierung INT DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS produkte (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, seite_id UUID REFERENCES seiten(id), name TEXT NOT NULL, hersteller TEXT, amazon_asin TEXT, affiliate_url TEXT, preis_von DECIMAL(10,2), preis_bis DECIMAL(10,2), bewertung DECIMAL(3,1), einsatzbereich TEXT, kurzbeschreibung TEXT, vorteile JSONB DEFAULT '[]', nachteile JSONB DEFAULT '[]', technische_daten JSONB DEFAULT '{}', ist_testsieger BOOLEAN DEFAULT false, ist_preistipp BOOLEAN DEFAULT false, ist_werkzeug BOOLEAN DEFAULT false, sortierung INT DEFAULT 0, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS rechner (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, seite_id UUID REFERENCES seiten(id), silo_id UUID REFERENCES silos(id), name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, beschreibung TEXT, eingabefelder JSONB NOT NULL, berechnungslogik JSONB NOT NULL, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS rechner_materialien (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, rechner_id UUID REFERENCES rechner(id), name TEXT NOT NULL, kategorie TEXT DEFAULT 'Material', formel TEXT NOT NULL, einheit TEXT, amazon_asin TEXT, affiliate_url TEXT, preis_ca DECIMAL(10,2), ist_essential BOOLEAN DEFAULT true, sortierung INT DEFAULT 0);
CREATE TABLE IF NOT EXISTS community_kosten (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, rechner_id UUID REFERENCES rechner(id), silo_id UUID REFERENCES silos(id), region TEXT, plz TEXT, kosten_gesamt DECIMAL(10,2), kosten_material DECIMAL(10,2), kosten_arbeit DECIMAL(10,2), eigenleistung_prozent INT, kommentar TEXT, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS email_captures (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, email TEXT NOT NULL, rechner_slug TEXT, silo_slug TEXT, created_at TIMESTAMPTZ DEFAULT now());
CREATE TABLE IF NOT EXISTS redirects (id UUID DEFAULT gen_random_uuid() PRIMARY KEY, alte_url TEXT UNIQUE NOT NULL, neue_url TEXT NOT NULL, status_code INT DEFAULT 301);

CREATE INDEX IF NOT EXISTS idx_seiten_silo ON seiten(silo_id);
CREATE INDEX IF NOT EXISTS idx_seiten_slug ON seiten(slug);
CREATE INDEX IF NOT EXISTS idx_produkte_seite ON produkte(seite_id);
CREATE INDEX IF NOT EXISTS idx_rechner_slug ON rechner(slug);
CREATE INDEX IF NOT EXISTS idx_redirects_alte ON redirects(alte_url);

ALTER TABLE silos ENABLE ROW LEVEL SECURITY;
ALTER TABLE seiten ENABLE ROW LEVEL SECURITY;
ALTER TABLE produkte ENABLE ROW LEVEL SECURITY;
ALTER TABLE rechner ENABLE ROW LEVEL SECURITY;
ALTER TABLE rechner_materialien ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_kosten ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_captures ENABLE ROW LEVEL SECURITY;
ALTER TABLE redirects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read_silos" ON silos FOR SELECT USING (true);
CREATE POLICY "read_seiten" ON seiten FOR SELECT USING (true);
CREATE POLICY "read_produkte" ON produkte FOR SELECT USING (true);
CREATE POLICY "read_rechner" ON rechner FOR SELECT USING (true);
CREATE POLICY "read_rechner_mat" ON rechner_materialien FOR SELECT USING (true);
CREATE POLICY "read_community" ON community_kosten FOR SELECT USING (true);
CREATE POLICY "read_redirects" ON redirects FOR SELECT USING (true);
CREATE POLICY "insert_community" ON community_kosten FOR INSERT WITH CHECK (true);
CREATE POLICY "insert_email" ON email_captures FOR INSERT WITH CHECK (true);

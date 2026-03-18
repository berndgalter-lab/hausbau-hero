/**
 * WordPress → Supabase Migration
 * Usage: node scripts/migrate-wp.js > scripts/seed-seiten.sql
 */
const { execSync } = require('child_process');

const WP_URL = 'https://hausbau-hero.de/wp-json/wp/v2';
const SILO_PATTERNS = {
  farben: ['farbe','silikat','latex','putz','haftgrund','impraeg','spachtel','bundstein','deckenstuetze','revisionsklappe'],
  bad: ['waschtisch','armatur','dusch','badewanne','wc','vorwand','hebeanlage','kondensat','komplett','druecker','spuelkasten','tempel','wasserzaehler','sigma','geberit','grohe','tece','mepa','viega','sanit','friatec','wisa','vigour','hansa','kludi','ideal-standard','hansgrohe'],
  werkzeuge: ['richtig-benutzen','anleitung','einstellen','verlegen','schneiden','laser','wasserwaage','saege','bohrer','schleif','schraubzwinge','zwinge','winkelaufsatz','fraes','schraubendreher','akkuschrauber','bohrmaschine','stichsaege','handschleifer','kelle','forstner','parkett','trockenbau','fliesen-schneid'],
  stromerzeuger: ['stromerzeuger','ecoflow','bluetti','stromverteiler','powerstation'],
  kueche: ['franke','blanco','spuele','eckspuele'],
  maschinen: ['abbruchhammer','kettendumper','mauernutfraese','industriest','industriesauger','teichschlamm','rasenmaeher','trennschleifer','schlagschrauber','loetstation','ardex','pflasterfugenmoertel','luftreiniger','kaercher','energie','geschenk','elektro-schraubendreher','wera','umsteckschraubendreher','makita-duc','schraubzwinge','winkelschleifer','schleifmaschine','schwingschleifer','exzenterschleifer','deltaschleifer','akku-rasenmaeher']
};
const DELETE_SLUGS = new Set(['schraubenzieher-set','handsaege','kniehebelspanner','bessey-kliklamp','schubstangenspanner','schraubzwinge-1000','fliesenschneider','das-ideale-schraubenzieher-set','bessey-schraubzwinge','unterschied-einhandzwinge-normaler-schraubzwinge','winkelschleifer','einhandzwinge','fiskars-handsaege','zungenkelle']);

function findSilo(slug) {
  const s = slug.toLowerCase();
  for (const [silo, patterns] of Object.entries(SILO_PATTERNS)) {
    if (patterns.some(p => s.includes(p))) return silo;
  }
  return 'werkzeuge';
}
function esc(str) { return (str||'').replace(/'/g,"''").substring(0,50000); }
function strip(html) { return (html||'').replace(/<[^>]+>/g,'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim(); }

function curlFetch(url, timeout = 30) {
  try {
    const raw = execSync(`/usr/bin/curl -s --max-time ${timeout} "${url}"`, {
      timeout: (timeout + 10) * 1000,
      maxBuffer: 50 * 1024 * 1024,
    });
    return JSON.parse(raw.toString());
  } catch (e) {
    return null;
  }
}

function fetchAllMeta(endpoint) {
  const all = [];
  let page = 1;
  while (page <= 50) {
    const url = `${WP_URL}/${endpoint}?per_page=100&page=${page}&_fields=id,slug,title,excerpt,date`;
    const data = curlFetch(url, 60);
    if (!data || !data.length) break;
    all.push(...data);
    process.stderr.write(`  ${endpoint} meta page ${page}: ${data.length} items\n`);
    if (data.length < 100) break;
    page++;
  }
  return all;
}

function main() {
  process.stderr.write('Fetching post metadata (no content — fast)...\n');
  const posts = fetchAllMeta('posts');
  process.stderr.write('Fetching page metadata...\n');
  const pages = fetchAllMeta('pages');
  const all = [...posts, ...pages];
  process.stderr.write(`Total: ${all.length} items\n\n`);

  console.log(`-- Migration ${new Date().toISOString()}`);
  console.log(`-- ${all.length} items migrated (metadata only, content can be added later)\n`);

  [['farben','Farben & Beschichtungen','🎨'],['bad','Bad & Sanitär','🚿'],['werkzeuge','Werkzeuge & Anleitungen','🔧'],['stromerzeuger','Stromerzeuger & Power','⚡'],['kueche','Küche & Spülen','🍳'],['maschinen','Großmaschinen & Bau','🏗️']].forEach(([slug,name,icon],i) => {
    console.log(`INSERT INTO silos (name,slug,icon,sortierung) VALUES ('${name}','${slug}','${icon}',${i+1}) ON CONFLICT (slug) DO UPDATE SET name=EXCLUDED.name, icon=EXCLUDED.icon, sortierung=EXCLUDED.sortierung;`);
  });

  console.log('\n-- Seiten');
  for (const p of all) {
    const slug = p.slug, silo = findSilo(slug), del = DELETE_SLUGS.has(slug);
    const title = strip(p.title?.rendered), excerpt = strip(p.excerpt?.rendered).substring(0,160);
    console.log(`INSERT INTO seiten (silo_id,slug,titel,seo_title,seo_description,typ,content_md,status,redirect_to,alte_wp_url) VALUES ((SELECT id FROM silos WHERE slug='${silo}'),'${esc(slug)}','${esc(title)}','${esc(title)}','${esc(excerpt)}','artikel','','${del?'redirect':'aktiv'}',${del?`'/${silo}'`:'NULL'},'/${slug}/') ON CONFLICT (slug) DO NOTHING;`);
  }

  console.log('\n-- Redirects');
  for (const p of all) {
    const slug = p.slug, silo = findSilo(slug), del = DELETE_SLUGS.has(slug);
    console.log(`INSERT INTO redirects (alte_url,neue_url) VALUES ('/${slug}/','${del?`/${silo}`:`/${silo}/${slug}`}') ON CONFLICT (alte_url) DO NOTHING;`);
    console.log(`INSERT INTO redirects (alte_url,neue_url) VALUES ('/${slug}','${del?`/${silo}`:`/${silo}/${slug}`}') ON CONFLICT (alte_url) DO NOTHING;`);
  }

  process.stderr.write('\nDone! Copy seed-seiten.sql content into Supabase SQL Editor and run.\n');
}

main();

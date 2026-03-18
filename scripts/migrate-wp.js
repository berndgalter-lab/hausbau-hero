/**
 * WordPress → Supabase Migration
 * Usage: node scripts/migrate-wp.js > scripts/seed-seiten.sql
 * KEIN WordPress-Login nötig - nutzt öffentliche REST API
 */
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

async function fetchAll(endpoint) {
  const all = []; let page = 1;
  while (true) {
    try {
      const r = await fetch(`${WP_URL}/${endpoint}?per_page=100&page=${page}&_fields=id,slug,title,content,excerpt,date`);
      if (!r.ok) break;
      const d = await r.json();
      if (!d.length) break;
      all.push(...d); page++;
      if (page > parseInt(r.headers.get('X-WP-TotalPages')||'1')) break;
    } catch { break; }
  }
  return all;
}

async function main() {
  const posts = [...await fetchAll('posts'), ...await fetchAll('pages')];
  process.stderr.write(`${posts.length} Posts geholt\n`);

  console.log(`-- Migration ${new Date().toISOString()}\n`);
  // Silos
  [['farben','Farben & Beschichtungen','🎨'],['bad','Bad & Sanitär','🚿'],['werkzeuge','Werkzeuge & Anleitungen','🔧'],['stromerzeuger','Stromerzeuger & Power','⚡'],['kueche','Küche & Spülen','🍳'],['maschinen','Großmaschinen & Bau','🏗️']].forEach(([slug,name,icon],i) => {
    console.log(`INSERT INTO silos (name,slug,icon,sortierung) VALUES ('${name}','${slug}','${icon}',${i+1}) ON CONFLICT (slug) DO NOTHING;`);
  });

  console.log('');
  for (const p of posts) {
    const slug = p.slug, silo = findSilo(slug), del = DELETE_SLUGS.has(slug);
    const title = strip(p.title?.rendered), excerpt = strip(p.excerpt?.rendered).substring(0,160);
    const content = p.content?.rendered || '';
    console.log(`INSERT INTO seiten (silo_id,slug,titel,seo_title,seo_description,typ,content_md,status,redirect_to,alte_wp_url) VALUES ((SELECT id FROM silos WHERE slug='${silo}'),'${esc(slug)}','${esc(title)}','${esc(title)}','${esc(excerpt)}','artikel','${esc(content)}','${del?'redirect':'aktiv'}',${del?`'/${silo}'`:'NULL'},'/${slug}/') ON CONFLICT (slug) DO NOTHING;`);
  }

  console.log('');
  for (const p of posts) {
    const slug = p.slug, silo = findSilo(slug), del = DELETE_SLUGS.has(slug);
    console.log(`INSERT INTO redirects (alte_url,neue_url) VALUES ('/${slug}/','${del?`/${silo}`:`/${silo}/${slug}`}') ON CONFLICT (alte_url) DO NOTHING;`);
  }
}
main();

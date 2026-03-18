/**
 * WordPress Content nachmigration
 * Holt den Content aller Posts/Pages und generiert UPDATE SQL
 * Usage: node scripts/migrate-content.js > scripts/update-content.sql
 *
 * Optional: OFFSET=80 node scripts/migrate-content.js >> scripts/update-content.sql
 */
const { execSync } = require('child_process');

const WP_URL = 'https://hausbau-hero.de/wp-json/wp/v2';
const PER_PAGE = 5;
const START_OFFSET = parseInt(process.env.OFFSET || '0', 10);

function cleanHtml(html) {
  if (!html) return '';

  let clean = html;

  // Elementor wrapper divs — keep inner content
  clean = clean.replace(/<div[^>]*data-elementor[^>]*>/gi, '');
  clean = clean.replace(/<div[^>]*class="elementor[^"]*"[^>]*>/gi, '');
  clean = clean.replace(/<div[^>]*class="e-con[^"]*"[^>]*>/gi, '');
  clean = clean.replace(/<div[^>]*class="elementor-widget-wrap[^"]*"[^>]*>/gi, '');
  clean = clean.replace(/<div[^>]*class="elementor-widget-container[^"]*"[^>]*>/gi, '');
  clean = clean.replace(/<section[^>]*class="elementor[^"]*"[^>]*>/gi, '');
  clean = clean.replace(/<\/section>/gi, '');

  // WordPress plugin shortcodes
  clean = clean.replace(/\[aawp[^\]]*\][\s\S]*?\[\/aawp\]/gi, '');
  clean = clean.replace(/\[aawp[^\]]*\/\]/gi, '');
  clean = clean.replace(/\[amazon[^\]]*\][\s\S]*?\[\/amazon\]/gi, '');
  clean = clean.replace(/\[amazon[^\]]*\/\]/gi, '');
  clean = clean.replace(/\[su_[^\]]*\][\s\S]*?\[\/su_[^\]]*\]/gi, '');
  clean = clean.replace(/\[su_[^\]]*\/\]/gi, '');
  clean = clean.replace(/\[\/?vc_[^\]]*\]/gi, '');
  clean = clean.replace(/\[\/?et_pb_[^\]]*\]/gi, '');
  clean = clean.replace(/\[rank_math[^\]]*\]/gi, '');
  clean = clean.replace(/\[[a-zA-Z_]+[^\]]*\][\s\S]*?\[\/[a-zA-Z_]+\]/gi, '');
  clean = clean.replace(/\[[a-zA-Z_]+[^\]]*\/\]/gi, '');

  // AAWP product blocks
  clean = clean.replace(/<div class="aawp[^"]*">[\s\S]*?<\/div>/gi, '');
  clean = clean.replace(/<span class="aawp[^"]*">[\s\S]*?<\/span>/gi, '');

  // "Keine Produkte gefunden"
  clean = clean.replace(/Keine Produkte gefunden\.?/gi, '');

  // Remaining empty wrapper divs
  clean = clean.replace(/<div>\s*<\/div>/gi, '');
  clean = clean.replace(/<p>\s*<\/p>/gi, '');

  // Collapse excessive closing divs and whitespace
  clean = clean.replace(/(<\/div>\s*){3,}/gi, '</div>');
  clean = clean.replace(/(\n\s*){3,}/g, '\n\n');

  return clean.trim();
}

function esc(str) {
  return (str || '').replace(/'/g, "''").substring(0, 100000);
}

function fetchPage(endpoint, page) {
  const url = `${WP_URL}/${endpoint}?per_page=${PER_PAGE}&page=${page}&_fields=id,slug,content`;
  try {
    const raw = execSync(`/usr/bin/curl -s --max-time 120 "${url}"`, {
      timeout: 150000,
      maxBuffer: 50 * 1024 * 1024,
    });
    const d = JSON.parse(raw.toString());
    if (!Array.isArray(d)) return [];
    return d;
  } catch (e) {
    process.stderr.write(`  RETRY ${endpoint} page ${page}...\n`);
    try {
      const raw = execSync(`/usr/bin/curl -s --max-time 180 "${url}"`, {
        timeout: 210000,
        maxBuffer: 50 * 1024 * 1024,
      });
      const d = JSON.parse(raw.toString());
      if (!Array.isArray(d)) return [];
      return d;
    } catch {
      process.stderr.write(`  FAILED ${endpoint} page ${page}\n`);
      return [];
    }
  }
}

function fetchAll(endpoint) {
  const all = [];
  const startPage = Math.floor(START_OFFSET / PER_PAGE) + 1;
  let page = startPage;
  let consecutive_failures = 0;
  while (page <= 100) {
    const data = fetchPage(endpoint, page);
    if (!data.length) {
      consecutive_failures++;
      if (consecutive_failures >= 2) break;
      page++;
      continue;
    }
    consecutive_failures = 0;
    all.push(...data);
    process.stderr.write(`  ${endpoint} page ${page}: ${data.length} items (total: ${all.length})\n`);
    if (data.length < PER_PAGE) break;
    page++;
  }
  return all;
}

function main() {
  process.stderr.write(`Fetching WordPress content (per_page=${PER_PAGE}, offset=${START_OFFSET})...\n`);

  const posts = fetchAll('posts');
  process.stderr.write(`  → ${posts.length} posts\n`);
  const pages = START_OFFSET === 0 ? fetchAll('pages') : [];
  process.stderr.write(`  → ${pages.length} pages\n`);
  const all = [...posts, ...pages];
  process.stderr.write(`Total: ${all.length} items\n`);

  console.log(`-- Content-Update ${new Date().toISOString()}`);
  console.log(`-- offset=${START_OFFSET}, ${all.length} items fetched\n`);

  let updated = 0;
  let skipped = 0;

  for (const p of all) {
    const slug = p.slug;
    const rawContent = p.content?.rendered || '';
    const cleanContent = cleanHtml(rawContent);

    if (!cleanContent || cleanContent.length < 50) {
      skipped++;
      continue;
    }

    console.log(`UPDATE seiten SET content_md = '${esc(cleanContent)}' WHERE slug = '${esc(slug)}' AND (content_md IS NULL OR content_md = '');`);
    updated++;
  }

  process.stderr.write(`\n${updated} pages with content, ${skipped} skipped\n`);
}

main();

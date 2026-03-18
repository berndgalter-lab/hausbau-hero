/**
 * Pushes content from update-content.sql directly to Supabase via API
 * Usage: node scripts/push-content.js
 *
 * Reads the generated SQL, extracts slug + content pairs,
 * and updates each row via the Supabase REST API.
 */
const { readFileSync } = require('fs');
const { resolve } = require('path');

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jyxhjcupgazugjglpeum.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

async function main() {
  const sqlFile = resolve(__dirname, 'update-content.sql');
  const sql = readFileSync(sqlFile, 'utf8');

  const regex = /UPDATE seiten SET content_md = '([\s\S]*?)' WHERE slug = '([^']+)' AND/g;
  const updates = [];
  let match;
  while ((match = regex.exec(sql)) !== null) {
    const content = match[1].replace(/''/g, "'");
    const slug = match[2].replace(/''/g, "'");
    updates.push({ slug, content });
  }

  console.log(`Found ${updates.length} content updates to push\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < updates.length; i++) {
    const { slug, content } = updates[i];
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/seiten?slug=eq.${encodeURIComponent(slug)}&content_md=eq.`,
        {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({ content_md: content }),
        }
      );

      if (res.ok) {
        success++;
      } else {
        const errText = await res.text();
        console.error(`  FAIL [${slug}]: ${res.status} ${errText.substring(0, 100)}`);
        failed++;
      }

      if ((i + 1) % 20 === 0) {
        process.stdout.write(`  ${i + 1}/${updates.length} done (${success} ok, ${failed} fail)\n`);
      }
    } catch (e) {
      console.error(`  ERROR [${slug}]: ${e.message}`);
      failed++;
    }
  }

  console.log(`\nDone: ${success} updated, ${failed} failed out of ${updates.length}`);
}

main();

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { weiterleitungsZiel } from '@/lib/produkt-ratgeber';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const EXCLUDED_PATHS = new Set([
  '/api', '/_next', '/favicon.ico', '/rechner', '/farben', '/bad',
  '/werkzeuge', '/stromerzeuger', '/kueche', '/maschinen', '/fenster',
  '/rohbau', '/boden', '/garten', '/ersatzteile', '/teil', '/problem', '/vergleich',
  '/impressum', '/datenschutz', '/sitemap.xml', '/robots.txt',
  '/opengraph-image',
]);

function isExcluded(path: string): boolean {
  if (EXCLUDED_PATHS.has(path)) return true;

  const secondSlash = path.indexOf('/', 1);
  if (secondSlash === -1) return false;
  return EXCLUDED_PATHS.has(path.substring(0, secondSlash));
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, '') || '/';

  if (isExcluded(path)) {
    return NextResponse.next();
  }

  const slug = path.replace(/^\//, '');
  if (!slug || slug.includes('/')) {
    return NextResponse.next();
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase
      .from('redirects')
      .select('neue_url, status_code')
      .or(`alte_url.eq./${slug}/,alte_url.eq./${slug}`)
      .limit(1)
      .single();

    // 410: Die alte Seite ist bewusst weg (Altbestand außerhalb von „Reparatur rund ums Haus“).
    if (data?.status_code === 410) {
      return new NextResponse('Diese Seite gibt es nicht mehr.', { status: 410 });
    }
    if (data?.neue_url) {
      const ziel = weiterleitungsZiel(data.neue_url);
      console.log(`[middleware] 301: ${path} → ${ziel}`);
      return NextResponse.redirect(new URL(ziel, request.url), 301);
    }
  } catch {
    // DB not reachable — pass through
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};

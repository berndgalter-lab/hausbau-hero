import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const EXCLUDED_PREFIXES = [
  '/api', '/_next', '/favicon.ico', '/rechner', '/farben', '/bad',
  '/werkzeuge', '/stromerzeuger', '/kueche', '/maschinen',
  '/impressum', '/datenschutz', '/sitemap.xml', '/robots.txt',
  '/opengraph-image',
];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, '') || '/';

  if (EXCLUDED_PREFIXES.some((prefix) => path.startsWith(prefix))) {
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
      .select('neue_url')
      .or(`alte_url.eq./${slug}/,alte_url.eq./${slug}`)
      .limit(1)
      .single();

    if (data?.neue_url) {
      return NextResponse.redirect(new URL(data.neue_url, request.url), 301);
    }
  } catch {
    // DB not reachable — pass through
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};

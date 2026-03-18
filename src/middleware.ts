import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SILO_MAP: Record<string, string> = {
  'silikatfarbe': 'farben', 'wandfarbe-weiss': 'farben', 'latexfarbe': 'farben',
  'steinimpraegnierung': 'farben', 'haftgrund-putz': 'farben', 'kalk-zement-putz': 'farben',
  'deckenstuetze': 'farben', 'vorwandelement-wc': 'bad', 'waschtischarmatur-mit-brause': 'bad',
  'kleinhebeanlage': 'bad', 'komplettdusche': 'bad', 'duschtempel': 'bad',
  'kreuzlinienlaser-richtig-benutzen': 'werkzeuge', 'wasserwaage-richtig-benutzen': 'werkzeuge',
  'metallsaege': 'werkzeuge', 'winkelaufsatz': 'werkzeuge', 'sds-bohrer-set': 'werkzeuge',
  'stromerzeuger-benzin': 'stromerzeuger', 'stromerzeuger-diesel': 'stromerzeuger',
  'franke-ersatzteile': 'kueche', 'blanco-ersatzteile': 'kueche',
  'abbruchhammer': 'maschinen', 'kettendumper': 'maschinen', 'mauernutfraese': 'maschinen',
};

const SKIP_PREFIXES = ['/rechner', '/api', '/_next', '/favicon.ico'];

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, '') || '/';

  if (SKIP_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.next();
  }

  const slug = path.replace(/^\//, '');

  if (slug && !slug.includes('/') && SILO_MAP[slug]) {
    return NextResponse.redirect(new URL(`/${SILO_MAP[slug]}/${slug}`, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};

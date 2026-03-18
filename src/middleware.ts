import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Statische Silo-Zuordnung für schnelle Redirects ohne DB-Call
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

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/\/$/, '');
  const slug = path.replace(/^\//, '');

  // Check if this is an old WordPress URL (no silo prefix)
  if (slug && !slug.includes('/') && SILO_MAP[slug]) {
    const newUrl = `/${SILO_MAP[slug]}/${slug}`;
    return NextResponse.redirect(new URL(newUrl, request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|rechner|farben|bad|werkzeuge|stromerzeuger|kueche|maschinen).*)',
  ],
};

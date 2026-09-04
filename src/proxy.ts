import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Weiterleitungen aus der WordPress-Zeit.
 *
 * Früher lief pro Request eine eigene Supabase-Abfrage — inklusive des kompletten
 * Supabase-Clients im Bundle. Jetzt wird die Tabelle einmal komplett geladen und
 * für eine Stunde im Speicher gehalten; die Abfrage geht über die REST-Schnittstelle,
 * damit kein Client mitgebündelt werden muss.
 *
 * Hieß bis Next 15 `middleware.ts`. Seit Next 16 heißt die Datei `proxy.ts` und läuft
 * auf der Node-Runtime statt am Edge.
 */
const CACHE_TTL_MS = 60 * 60 * 1000;
let cache: { map: Map<string, string>; geladen: number } | null = null;
let laeuft: Promise<Map<string, string>> | null = null;

function normalisiere(pfad: string): string {
  return '/' + pfad.replace(/^\/+/, '').replace(/\/+$/, '');
}

async function ladeRedirects(): Promise<Map<string, string>> {
  const res = await fetch(
    `${supabaseUrl}/rest/v1/redirects?select=alte_url,neue_url`,
    {
      headers: { apikey: supabaseKey, Authorization: `Bearer ${supabaseKey}` },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error(`redirects: HTTP ${res.status}`);
  const rows: { alte_url: string; neue_url: string }[] = await res.json();

  const map = new Map<string, string>();
  for (const r of rows) {
    if (r.alte_url && r.neue_url) map.set(normalisiere(r.alte_url), r.neue_url);
  }
  return map;
}

async function holeRedirects(): Promise<Map<string, string>> {
  if (cache && Date.now() - cache.geladen < CACHE_TTL_MS) return cache.map;
  if (!laeuft) {
    laeuft = ladeRedirects()
      .then((map) => {
        cache = { map, geladen: Date.now() };
        return map;
      })
      .finally(() => {
        laeuft = null;
      });
  }
  try {
    return await laeuft;
  } catch {
    return cache?.map ?? new Map();
  }
}

export default async function proxy(request: NextRequest) {
  const pfad = normalisiere(request.nextUrl.pathname);
  if (pfad === '/' || pfad.indexOf('/', 1) !== -1) return NextResponse.next();

  const ziel = (await holeRedirects()).get(pfad);
  if (ziel) return NextResponse.redirect(new URL(ziel, request.url), 301);

  return NextResponse.next();
}

export const config = {
  // Nur einsegmentige, unbekannte Pfade — alle echten Routen und alle Dateien mit
  // Endung sind ausgenommen, damit der Proxy im Normalbetrieb gar nicht erst läuft.
  matcher: [
    '/((?!_next|api|rechner|farben|bad|werkzeuge|stromerzeuger|kueche|maschinen|rohbau|boden|garten|finanzen|impressum|datenschutz|opengraph-image|.*\\.).*)',
  ],
};

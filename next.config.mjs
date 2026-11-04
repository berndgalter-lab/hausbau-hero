import { readFileSync } from 'node:fs';

// Bild-Hosts der Partner-Feeds, gemeinsam mit scripts/import/awin_feed.py gepflegt.
const bildHosts = JSON.parse(readFileSync(new URL('./src/lib/bild-hosts.json', import.meta.url), 'utf8')).hosts;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: bildHosts.map((hostname) => ({ protocol: 'https', hostname })),
    minimumCacheTTL: 86400,
  },
  async redirects() {
    return [
      // www → non-www redirect is handled by Vercel domain settings
      // (Settings → Domains → www.hausbau-hero.de → "Redirects to hausbau-hero.de")

      // Alte WordPress-Kategorien: Bad und Ersatzteile haben ein Ziel, alles andere ist entfernt und geht auf die Startseite.
      { source: '/category/sanitaerinstallation/:path*', destination: '/bad', permanent: true },
      { source: '/category/bad/:path*', destination: '/bad', permanent: true },
      { source: '/category/wc/:path*', destination: '/bereich/wc-spuelkasten', permanent: true },
      { source: '/category/armaturen/:path*', destination: '/bad', permanent: true },
      { source: '/category/kueche/:path*', destination: '/bereich/kueche', permanent: true },
      { source: '/category/ersatzteile/:path*', destination: '/ersatzteile', permanent: true },
      { source: '/category/:path*', destination: '/', permanent: true },

      { source: '/farben/badewannenarmatur-unterputz', destination: '/ratgeber/badewannenarmatur-unterputz', permanent: true },
    ];
  },
};

export default nextConfig;

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

      { source: '/category/farben-und-lacke/:path*', destination: '/farben', permanent: true },
      { source: '/category/sanitaerinstallation/:path*', destination: '/bad', permanent: true },
      { source: '/category/werkzeuge/:path*', destination: '/werkzeuge', permanent: true },
      { source: '/category/grossmaschinen/:path*', destination: '/maschinen', permanent: true },
      { source: '/category/kueche/:path*', destination: '/kueche', permanent: true },
      { source: '/category/bad/:path*', destination: '/bad', permanent: true },
      { source: '/category/wc/:path*', destination: '/bad', permanent: true },
      { source: '/category/baustoffe/:path*', destination: '/farben', permanent: true },
      { source: '/category/ersatzteile/:path*', destination: '/kueche', permanent: true },
      { source: '/category/garten/:path*', destination: '/maschinen', permanent: true },
      { source: '/category/sauger-reinigungsgeraete/:path*', destination: '/maschinen', permanent: true },
      { source: '/category/heizen-klima-und-luft/:path*', destination: '/maschinen', permanent: true },
      { source: '/category/trockenbau/:path*', destination: '/werkzeuge', permanent: true },
      { source: '/category/elektroinstallation/:path*', destination: '/werkzeuge', permanent: true },
      { source: '/category/energie/:path*', destination: '/stromerzeuger', permanent: true },
      { source: '/category/armaturen/:path*', destination: '/bad', permanent: true },
      { source: '/category/allgemein/:path*', destination: '/', permanent: true },
      { source: '/category/anleitungen/:path*', destination: '/werkzeuge', permanent: true },
      { source: '/category/:path*', destination: '/', permanent: true },

      { source: '/farben/badewannenarmatur-unterputz', destination: '/ratgeber/badewannenarmatur-unterputz', permanent: true },
    ];
  },
};

export default nextConfig;

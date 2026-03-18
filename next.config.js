/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Dynamisch aus Supabase laden wäre ideal,
    // aber für den Start: statische Redirects für die wichtigsten Seiten
    return [
      // Farben & Beschichtungen
      { source: '/silikatfarbe', destination: '/farben/silikatfarbe', permanent: true },
      { source: '/silikatfarbe/', destination: '/farben/silikatfarbe', permanent: true },
      { source: '/wandfarbe-weiss', destination: '/farben/wandfarbe-weiss', permanent: true },
      { source: '/wandfarbe-weiss/', destination: '/farben/wandfarbe-weiss', permanent: true },
      { source: '/latexfarbe', destination: '/farben/latexfarbe', permanent: true },
      { source: '/latexfarbe/', destination: '/farben/latexfarbe', permanent: true },
      { source: '/steinimpraegnierung', destination: '/farben/steinimpraegnierung', permanent: true },
      { source: '/steinimpraegnierung/', destination: '/farben/steinimpraegnierung', permanent: true },
      { source: '/haftgrund-putz', destination: '/farben/haftgrund-putz', permanent: true },
      { source: '/haftgrund-putz/', destination: '/farben/haftgrund-putz', permanent: true },
      { source: '/kalk-zement-putz', destination: '/farben/kalk-zement-putz', permanent: true },
      { source: '/kalk-zement-putz/', destination: '/farben/kalk-zement-putz', permanent: true },
      { source: '/deckenstuetze', destination: '/farben/deckenstuetze', permanent: true },
      { source: '/deckenstuetze/', destination: '/farben/deckenstuetze', permanent: true },

      // Bad & Sanitär
      { source: '/vorwandelement-wc', destination: '/bad/vorwandelement-wc', permanent: true },
      { source: '/vorwandelement-wc/', destination: '/bad/vorwandelement-wc', permanent: true },
      { source: '/waschtischarmatur-mit-brause', destination: '/bad/waschtischarmatur-mit-brause', permanent: true },
      { source: '/waschtischarmatur-mit-brause/', destination: '/bad/waschtischarmatur-mit-brause', permanent: true },
      { source: '/kleinhebeanlage', destination: '/bad/kleinhebeanlage', permanent: true },
      { source: '/kleinhebeanlage/', destination: '/bad/kleinhebeanlage', permanent: true },
      { source: '/komplettdusche', destination: '/bad/komplettdusche', permanent: true },
      { source: '/komplettdusche/', destination: '/bad/komplettdusche', permanent: true },
      { source: '/duschtempel', destination: '/bad/duschtempel', permanent: true },
      { source: '/duschtempel/', destination: '/bad/duschtempel', permanent: true },

      // Werkzeuge
      { source: '/kreuzlinienlaser-richtig-benutzen', destination: '/werkzeuge/kreuzlinienlaser-richtig-benutzen', permanent: true },
      { source: '/kreuzlinienlaser-richtig-benutzen/', destination: '/werkzeuge/kreuzlinienlaser-richtig-benutzen', permanent: true },
      { source: '/wasserwaage-richtig-benutzen', destination: '/werkzeuge/wasserwaage-richtig-benutzen', permanent: true },
      { source: '/wasserwaage-richtig-benutzen/', destination: '/werkzeuge/wasserwaage-richtig-benutzen', permanent: true },
      { source: '/metallsaege', destination: '/werkzeuge/metallsaege', permanent: true },
      { source: '/metallsaege/', destination: '/werkzeuge/metallsaege', permanent: true },

      // Stromerzeuger
      { source: '/stromerzeuger-benzin', destination: '/stromerzeuger/stromerzeuger-benzin', permanent: true },
      { source: '/stromerzeuger-benzin/', destination: '/stromerzeuger/stromerzeuger-benzin', permanent: true },
      { source: '/stromerzeuger-diesel', destination: '/stromerzeuger/stromerzeuger-diesel', permanent: true },
      { source: '/stromerzeuger-diesel/', destination: '/stromerzeuger/stromerzeuger-diesel', permanent: true },
      { source: '/stromerzeuger', destination: '/stromerzeuger', permanent: true },
      { source: '/stromerzeuger/', destination: '/stromerzeuger', permanent: true },

      // Küche
      { source: '/franke-ersatzteile', destination: '/kueche/franke-ersatzteile', permanent: true },
      { source: '/franke-ersatzteile/', destination: '/kueche/franke-ersatzteile', permanent: true },
      { source: '/blanco-ersatzteile', destination: '/kueche/blanco-ersatzteile', permanent: true },
      { source: '/blanco-ersatzteile/', destination: '/kueche/blanco-ersatzteile', permanent: true },

      // Maschinen
      { source: '/abbruchhammer', destination: '/maschinen/abbruchhammer', permanent: true },
      { source: '/abbruchhammer/', destination: '/maschinen/abbruchhammer', permanent: true },
      { source: '/kettendumper', destination: '/maschinen/kettendumper', permanent: true },
      { source: '/kettendumper/', destination: '/maschinen/kettendumper', permanent: true },
      { source: '/mauernutfraese', destination: '/maschinen/mauernutfraese', permanent: true },
      { source: '/mauernutfraese/', destination: '/maschinen/mauernutfraese', permanent: true },

      // Alte Kategorie-Seiten → Silo-Übersichten
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
    ];
  },
};

module.exports = nextConfig;

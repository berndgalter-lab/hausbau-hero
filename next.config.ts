import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Dynamische Redirects aus Supabase werden per Middleware gehandelt
    // Hier nur die statischen Kategorie-Redirects
    return [
      // Alte WordPress Kategorie-URLs
      { source: '/category/:path*', destination: '/', permanent: true },
      // Alte Seiten ohne Silo → neue Silo-Struktur
      // Die vollständige Liste wird aus der redirects-Tabelle in Supabase geladen
      // und per middleware.ts gehandelt
    ];
  },
};

export default nextConfig;

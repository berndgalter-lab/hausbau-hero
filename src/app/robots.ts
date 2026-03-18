import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/category/'] },
    sitemap: 'https://hausbau-hero.de/sitemap.xml',
  }
}

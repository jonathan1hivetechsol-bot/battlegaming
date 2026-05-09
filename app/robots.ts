import { MetadataRoute } from 'next';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/', '/accounts/', '/about', '/news', '/_next/'],
        disallow: ['/admin', '/api/debug-account', '/api/contact'],
        crawlDelay: 0,
      },
      {
        userAgent: '*',
        allow: ['/', '/accounts/', '/about', '/news', '/_next/'],
        disallow: ['/admin', '/api/'],
        crawlDelay: 1,
      },
      {
        userAgent: 'GPTBot',
        allow: ['/accounts/', '/about', '/news'],
        disallow: ['/admin', '/api', '/contact', '/_next/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'CCBot',
        allow: ['/accounts/', '/about', '/news'],
        disallow: ['/admin', '/api', '/contact', '/_next/'],
        crawlDelay: 2,
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/accounts/', '/about', '/news'],
        disallow: ['/admin', '/api', '/contact', '/_next/'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

import { MetadataRoute } from 'next';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://battlegaming.store';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin'],
        crawlDelay: 0,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/debug-account', '/api/contact'],
        crawlDelay: 1,
      },
      {
        userAgent: 'GPTBot',
        allow: ['/accounts/', '/about', '/news'],
        disallow: ['/admin', '/api', '/contact'],
        crawlDelay: 2,
      },
      {
        userAgent: 'CCBot',
        allow: ['/accounts/', '/about', '/news'],
        disallow: ['/admin', '/api', '/contact'],
        crawlDelay: 2,
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/accounts/', '/about', '/news'],
        disallow: ['/admin', '/api', '/contact'],
        crawlDelay: 1,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

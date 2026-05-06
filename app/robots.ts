import { MetadataRoute } from 'next';

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api', '/contact'],
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

#!/usr/bin/env node
import https from 'https';

function request(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => resolve({ url, status: 'error', err: err.message }));
  });
}

async function main() {
  const sitemap = process.argv[2] || 'https://battlegaming.store/sitemap-index.xml';

  console.log('Checking sitemap accessibility:');
  const sitemapResult = await request(sitemap);
  console.log(`${sitemapResult.url} -> ${sitemapResult.status}`);

  if (sitemapResult.status !== 200) {
    console.warn('Sitemap is not accessible. Please verify the URL is deployed and reachable.');
  }

  console.log('\nNote: Google/Bing sitemap ping endpoints are deprecated and can return 404/410 even when the sitemap exists.');
  console.log('Use Search Console / Webmaster Tools to submit and revalidate your sitemap manually.');

  const endpoints = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemap)}`,
  ];

  for (const e of endpoints) {
    const r = await request(e);
    console.log(r.url, '->', r.status);
  }

  process.exit(sitemapResult.status === 200 ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});

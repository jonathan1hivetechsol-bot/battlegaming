#!/usr/bin/env node
import https from 'https';

async function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

function extractUrlsFromSitemap(xml) {
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/gi;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }
  return urls;
}

async function main() {
  const sitemapUrl = process.argv[2] || 'https://battlegaming.store/sitemap.xml';
  console.log('Fetching sitemap:', sitemapUrl);
  const sitemap = await fetchText(sitemapUrl);
  if (sitemap.status !== 200) {
    console.error('Failed to fetch sitemap:', sitemap.status);
    process.exit(2);
  }

  const urls = extractUrlsFromSitemap(sitemap.body);
  console.log(`Found ${urls.length} URLs in sitemap. Sampling up to 200 for checks.`);
  const sample = urls.slice(0, 200);
  console.log('Sampled URLs (first 10):');
  console.log(sample.slice(0, 10).join('\n'));

  const results = [];
  for (const url of sample) {
    try {
      const res = await fetchText(url);
      results.push({ url, status: res.status });
      if (res.status !== 200) console.warn(url, '->', res.status);
    } catch (err) {
      console.error('Error fetching', url, err.message || err);
      results.push({ url, status: 'error' });
    }
  }

  const bad = results.filter(r => r.status !== 200);
  console.log('Check complete. Non-200 results:', bad.length);
  if (bad.length > 0) {
    console.log('Sample failures (first 50):');
    console.log(bad.slice(0,50).map(b => `${b.status} ${b.url}`).join('\n'));
    process.exit(1);
  }
  console.log('All sampled URLs returned 200 OK.');
}

main().catch(err => {
  console.error(err);
  process.exit(2);
});

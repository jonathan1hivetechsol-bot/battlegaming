#!/usr/bin/env node
const https = require('https');
const { parse } = require('node:util');
const { XMLParser } = require('fast-xml-parser');

async function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

async function main() {
  const sitemapUrl = process.argv[2] || 'https://battlegaming.store/sitemap.xml';
  console.log('Fetching sitemap:', sitemapUrl);
  const sitemap = await fetchText(sitemapUrl);
  if (sitemap.status !== 200) {
    console.error('Failed to fetch sitemap:', sitemap.status);
    process.exit(2);
  }

  const parser = new XMLParser({ ignoreAttributes: false });
  const parsed = parser.parse(sitemap.body);
  const urls = [];
  if (parsed.urlset && parsed.urlset.url) {
    const list = Array.isArray(parsed.urlset.url) ? parsed.urlset.url : [parsed.urlset.url];
    for (const u of list) {
      if (u.loc) urls.push(u.loc);
    }
  }

  console.log(`Found ${urls.length} URLs in sitemap. Sampling up to 200 for checks.`);
  const sample = urls.slice(0, 200);

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

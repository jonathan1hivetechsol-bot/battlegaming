#!/usr/bin/env node
import https from 'https';
import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

function fetchText(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

function extractUrls(xml) {
  const urls = [];
  const re = /<loc>(.*?)<\/loc>/gi;
  let m;
  while ((m = re.exec(xml)) !== null) urls.push(m[1].trim());
  return urls;
}

function buildUrlset(urls) {
  const items = urls.map(u => `  <url>\n    <loc>${u}</loc>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
}

async function main() {
  const sitemapUrl = process.argv[2] || 'https://battlegaming.store/sitemap.xml';
  const outDir = './public';
  const chunkSize = parseInt(process.argv[3] || '500', 10);

  console.log('Fetching', sitemapUrl);
  const res = await fetchText(sitemapUrl);
  if (res.status !== 200) {
    console.error('Failed to fetch sitemap', res.status);
    process.exit(2);
  }

  const urls = extractUrls(res.body);
  console.log('Total URLs found:', urls.length);

  // Only split account URLs so static pages stay in root sitemap
  const accountUrls = urls.filter(u => u.includes('/accounts/'));
  const staticUrls = urls.filter(u => !u.includes('/accounts/'));

  mkdirSync(outDir, { recursive: true });

  // Write static root sitemap (includes non-account urls)
  const rootSitemap = buildUrlset(staticUrls);
  writeFileSync(`${outDir}/sitemap-root.xml`, rootSitemap, 'utf8');
  console.log('Wrote sitemap-root.xml with', staticUrls.length, 'urls');

  // Chunk account urls
  const chunks = [];
  for (let i = 0; i < accountUrls.length; i += chunkSize) {
    chunks.push(accountUrls.slice(i, i + chunkSize));
  }

  const indexEntries = [];
  for (let i = 0; i < chunks.length; i++) {
    const name = `sitemap-accounts-${i + 1}.xml`;
    const xml = buildUrlset(chunks[i]);
    writeFileSync(`${outDir}/${name}`, xml, 'utf8');
    indexEntries.push(`  <sitemap>\n    <loc>https://battlegaming.store/${name}</loc>\n  </sitemap>`);
    console.log('Wrote', name, 'with', chunks[i].length, 'urls');
  }

  // Sitemap index
  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexEntries.join('\n')}\n  <sitemap>\n    <loc>https://battlegaming.store/sitemap-root.xml</loc>\n  </sitemap>\n</sitemapindex>`;
  writeFileSync(`${outDir}/sitemap-index.xml`, indexXml, 'utf8');
  console.log('Wrote sitemap-index.xml referencing', chunks.length, 'account sitemaps');
}

main().catch(err => { console.error(err); process.exit(2); });

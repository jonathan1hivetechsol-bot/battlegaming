#!/usr/bin/env node
import https from 'https';

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

function extractMeta(html) {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    description: descMatch ? descMatch[1].trim() : '',
  };
}

async function main() {
  const sitemapUrl = process.argv[2] || 'https://battlegaming.store/sitemap.xml';
  console.log('Fetching sitemap:', sitemapUrl);
  const res = await fetchText(sitemapUrl);
  if (res.status !== 200) { console.error('Failed to fetch sitemap', res.status); process.exit(2); }
  const urls = extractUrls(res.body).filter(u => u.includes('/accounts/'));
  console.log('Account URLs:', urls.length);

  const sampled = urls.slice(0, 1000); // limit
  const titleMap = new Map();
  const descMap = new Map();

  for (const url of sampled) {
    try {
      const page = await fetchText(url);
      if (page.status !== 200) continue;
      const meta = extractMeta(page.body);
      const t = meta.title.toLowerCase().slice(0, 120);
      const d = meta.description.toLowerCase().slice(0, 160);
      if (t) {
        titleMap.set(t, (titleMap.get(t) || []).concat(url));
      }
      if (d) {
        descMap.set(d, (descMap.get(d) || []).concat(url));
      }
    } catch (e) {
      // ignore
    }
  }

  const dupTitles = [...titleMap.entries()].filter(([, arr]) => arr.length > 1).sort((a,b)=>b[1].length-a[1].length);
  const dupDescs = [...descMap.entries()].filter(([, arr]) => arr.length > 1).sort((a,b)=>b[1].length-a[1].length);

  console.log('Duplicate titles groups (top 10):');
  dupTitles.slice(0,10).forEach(([t, urls]) => console.log(urls.length, '->', t));
  console.log('Duplicate descriptions groups (top 10):');
  dupDescs.slice(0,10).forEach(([d, urls]) => console.log(urls.length, '->', d));
  console.log('Done');
}

main().catch(e=>{ console.error(e); process.exit(2); });

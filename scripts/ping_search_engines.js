#!/usr/bin/env node
import https from 'https';

function ping(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => resolve({ url, status: 'error', err: err.message }));
  });
}

async function main() {
  const sitemap = process.argv[2] || 'https://battlegaming.store/sitemap-index.xml';
  const endpoints = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemap)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemap)}`,
  ];
  for (const e of endpoints) {
    const r = await ping(e);
    console.log(r.url, '->', r.status);
  }
}

main().catch(e=>{ console.error(e); process.exit(2); });

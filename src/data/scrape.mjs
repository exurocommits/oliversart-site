import https from 'https';

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Extract product URLs from sitemap
const sitemapXml = await fetch('https://oliversart.com/sitemap-1.xml');
const productUrls = [...sitemapXml.matchAll(/<loc>(https:\/\/oliversart\.com\/product\/[^<]+)<\/loc>/g)].map(m => m[1]);
console.log(`Found ${productUrls.length} product URLs`);

// Fetch a sample product page to understand structure
const sampleHtml = await fetch(productUrls[0]);
// Extract product data using regex
function extractProduct(html, url) {
  const title = html.match(/<h1[^>]*class="product_title[^"]*"[^>]*>([^<]+)<\/h1>/)?.[1]?.trim() 
    || html.match(/<title>([^<]+)<\/title>/)?.[1]?.replace(/ – Oliver's Art/, '').replace(/&amp;/g, '&').trim();
  const priceMatch = html.match(/<span[^>]*class="woocommerce-Price-amount amount"[^>]*>.*?<bdi>([^<]+)<\/bdi>/);
  const price = priceMatch ? parseFloat(priceMatch[1].replace(/[^0-9.]/g, '')) : null;
  const desc = html.match(/<div[^>]*class="woocommerce-product-details__short-description"[^>]*>([\s\S]*?)<\/div>/)?.[1]?.replace(/<[^>]+>/g, '').trim();
  const images = [...html.matchAll(/data-large_image="([^"]+)"/g)].map(m => m[1]);
  const catMatch = html.match(/<span[^>]*class="posted_in"[^>]*>.*?<a[^>]*>([^<]+)<\/a>/);
  const category = catMatch?.[1]?.trim();
  const artistMatch = html.match(/<span[^>]*class="tagged_as"[^>]*>.*?<a[^>]*>([^<]+)<\/a>/);
  const artist = artistMatch?.[1]?.trim();
  const inStock = !html.includes('Out of stock');
  
  return { title, price, description: desc, imageUrls: images, category, artist, url, inStock };
}

// Process first 60 products
const products = [];
const batchSize = 5;
for (let i = 0; i < Math.min(productUrls.length, 60); i += batchSize) {
  const batch = productUrls.slice(i, i + batchSize);
  const results = await Promise.all(batch.map(async url => {
    try {
      const html = await fetch(url);
      return extractProduct(html, url);
    } catch (e) {
      return { url, error: e.message };
    }
  }));
  products.push(...results);
  console.log(`Processed ${Math.min(i + batchSize, 60)}/${Math.min(productUrls.length, 60)}`);
}

const output = {
  scrapedAt: new Date().toISOString(),
  source: 'oliversart.com',
  totalProducts: products.filter(p => p.title).length,
  categories: [...new Set(products.filter(p => p.category).map(p => p.category))],
  artists: [...new Set(products.filter(p => p.artist).map(p => p.artist))],
  products: products.filter(p => p.title).map(p => ({
    ...p,
    slug: p.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || ''
  }))
};

import fs from 'fs';
fs.writeFileSync('/home/node/.openclaw/workspace/oliversart-site/src/data/scraped-products.json', JSON.stringify(output, null, 2));
console.log('Done. Wrote scraped-products.json');

// Saves blog cover images into public/blog/<post-slug>.webp, for posts whose cover image is
// missing from the blog site's media library (blogs.chiragglobalhospitals.com).
//
//   npm run blog:covers
//
// The posts were copied to the blog site without their images, but each post still has the id
// of its cover, and the old WordPress at www.chiragglobalhospitals.com has the image under that
// same id. This copies those images here once, so they keep working after www becomes this site.
// Covers already saved are skipped; posts whose cover works on the blog site are left alone.
// src/lib/wordpress-blog-feed.ts uses a saved cover whenever the blog site has none.

import { mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CMS = 'https://blogs.chiragglobalhospitals.com/wp-json/wp/v2';
const OLD = 'https://www.chiragglobalhospitals.com/wp-json/wp/v2';
const DIR = new URL('../public/blog/', import.meta.url);

async function getJson(url) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'chirag-site-build' }, signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`${res.status} for ${url}`);
      return { data: await res.json(), totalPages: Number(res.headers.get('x-wp-totalpages')) || 1 };
    } catch (err) {
      if (i >= 4) throw err;
      await new Promise((r) => setTimeout(r, 2000 * i));
    }
  }
}

// Every post with its cover id, and whether the blog site has that image
const posts = [];
for (let page = 1, total = 1; page <= total; page++) {
  const { data, totalPages } = await getJson(`${CMS}/posts?per_page=100&page=${page}&_fields=id,slug,featured_media,_links,_embedded&_embed=wp:featuredmedia`);
  posts.push(...data);
  total = totalPages;
}
const missing = posts.filter(
  (p) => p.featured_media && !p._embedded?.['wp:featuredmedia']?.[0]?.source_url && !existsSync(new URL(`${p.slug}.webp`, DIR)),
);
console.log(`[covers] ${posts.length} posts; ${missing.length} covers to save`);

// Their images on the old site, 100 ids per request
const sources = new Map();
for (let i = 0; i < missing.length; i += 100) {
  const ids = missing.slice(i, i + 100).map((p) => p.featured_media).join(',');
  const { data } = await getJson(`${OLD}/media?per_page=100&include=${ids}&_fields=id,source_url`);
  for (const m of data) sources.set(m.id, m.source_url);
}

await mkdir(DIR, { recursive: true });
const { default: sharp } = await import('sharp');
let saved = 0;
const failed = [];
const queue = [...missing];
await Promise.all(
  Array.from({ length: 6 }, async () => {
    for (let p; (p = queue.shift()); ) {
      const src = sources.get(p.featured_media);
      try {
        if (!src) throw new Error('not on the old site either');
        const res = await fetch(src, { signal: AbortSignal.timeout(60000) });
        if (!res.ok) throw new Error(`${res.status}`);
        await sharp(Buffer.from(await res.arrayBuffer()))
          .resize({ width: 800, withoutEnlargement: true })
          .webp({ quality: 70 })
          .toFile(fileURLToPath(new URL(`${p.slug}.webp`, DIR)));
        saved++;
      } catch (err) {
        failed.push(`${p.slug} (${err.message})`);
      }
    }
  }),
);
console.log(`[covers] saved ${saved}${failed.length ? `; could not save ${failed.length}:\n  ${failed.join('\n  ')}` : ''}`);

// Shared helpers for the WordPress syncs (sync-blog.mjs, sync-events.mjs).
//
// Content is managed on the blog site's WordPress (blogs.chiragglobalhospitals.com) and read
// through its public REST API, so no key is needed.

import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export const CMS = 'https://blogs.chiragglobalhospitals.com';
export const API = `${CMS}/wp-json/wp/v2`;

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };
export const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m)
    // WordPress sometimes double-encodes "&" as "&amp;amp;"
    .replace(/&amp;/g, '&');
export const plain = (html) => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'chirag-site-build' }, signal: AbortSignal.timeout(60000) });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return { data: await res.json(), totalPages: Number(res.headers.get('x-wp-totalpages')) || 1 };
}

/** Every published item of a post type ('posts', 'event'), newest first */
export async function getAll(type, query = '') {
  const items = [];
  for (let page = 1, total = 1; page <= total; page++) {
    const { data, totalPages } = await getJson(`${API}/${type}?per_page=100&page=${page}&orderby=date&order=desc${query}`);
    items.push(...data);
    total = totalPages;
  }
  return items;
}

// The previous WordPress at the main domain. Content was copied from it to the blog site
// without all of its media, so older items' featured images are looked up there by the same id.
const OLD_API = 'https://www.chiragglobalhospitals.com/wp-json/wp/v2';

/**
 * Featured image ({ source_url, alt_text }) of each item, by item id: from the blog site when it
 * has it, else from the old site while that is still online.
 */
export async function featuredImages(items) {
  const out = new Map();
  const missing = new Map();
  for (const p of items) {
    const media = p._embedded?.['wp:featuredmedia']?.[0];
    if (media?.source_url) out.set(p.id, media);
    else if (p.featured_media) missing.set(p.featured_media, p.id);
  }
  const ids = [...missing.keys()];
  for (let i = 0; i < ids.length; i += 100) {
    try {
      const { data } = await getJson(`${OLD_API}/media?per_page=100&include=${ids.slice(i, i + 100).join(',')}&_fields=id,source_url,alt_text`);
      for (const m of data) out.set(missing.get(m.id), m);
    } catch {
      break; // old site gone: images saved on earlier runs are kept
    }
  }
  return out;
}

/**
 * Old posts link some images from the main domain, which this site is replacing. Try the
 * address as written first, then the same path on the blog site.
 */
const candidates = (url) => {
  const alt = url.replace(/^https?:\/\/(www\.)?chiragglobalhospitals\.com\//i, `${CMS}/`);
  return alt === url ? [url] : [url, alt];
};

/**
 * Saves an image as a resized webp under public/ and returns its site path. Files already saved
 * are kept as they are, so each image is downloaded once, and stays even if the original is later
 * removed from WordPress' old host.
 */
export async function saveImage(url, fileUrl, sitePath, width = 800) {
  if (existsSync(fileUrl)) return sitePath;
  let lastErr;
  for (const src of candidates(url)) {
    try {
      const res = await fetch(src, { signal: AbortSignal.timeout(30000) });
      if (!res.ok) throw new Error(`image ${res.status} for ${src}`);
      // sharp ships with Astro as an optional dependency; loaded here so a host
      // without it falls back to the saved content instead of crashing the build
      const { default: sharp } = await import('sharp');
      await sharp(Buffer.from(await res.arrayBuffer()))
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 70 })
        .toFile(fileURLToPath(fileUrl));
      return sitePath;
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

/** Runs fn over items, a few at a time, keeping their order */
export async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

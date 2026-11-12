// Imports the latest blog posts from the main WordPress site into
// src/data/blog-posts.json and saves their images to public/blog/.
//
//   npm run blog:sync
//
// Runs automatically before `npm run build`. Uses the WordPress REST API, so no
// key is needed. Images already downloaded are skipped, so later runs only fetch
// new posts' images. If the main site can't be reached, the existing
// blog-posts.json is kept and the build carries on.

import { mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const API = 'https://www.chiragglobalhospitals.com/wp-json/wp/v2';
const DATA_FILE = new URL('../src/data/blog-posts.json', import.meta.url);
const IMAGE_DIR = new URL('../public/blog/', import.meta.url);
const IMAGE_WIDTH = 800;
// How many of the newest posts to import; links to older posts go to the main site
const MAX_POSTS = 10;

// Main-site pages that exist on this site. Most keep the same address (this site uses the
// WordPress URLs, see src/lib/routes.ts); the rest point to their closest page here.
const T = {
  piles: '/piles-laser-treatment-in-bangalore',
  fissure: '/best-fissure-laser-treatment-in-bangalore',
};
const PAGE_MAP = {
  '': '/',
  'contact-us': '/contact-us',
  'contact-best-hospital-in-bangalore': '/contact-us',
  'book-appointment': '/contact-us',
  'about-us': '/about-us',
  treatments: '/treatments',
  'health-updates-2': '/health-updates-2',
  'chirag-global-hospitals-events': '/chirag-global-hospitals-events',
  'advanced-technologies': '/advanced-technologies',
  'educational-videos': '/educational-videos',
  'patient-reviews': '/patient-reviews',
  'hospital-certificates': '/hospital-certificates',
  'piles-laser-treatment-in-bangalore': T.piles,
  'laser-treatment-for-piles-2': T.piles,
  'piles-doctor': T.piles,
  'best-fissure-laser-treatment-in-bangalore': T.fissure,
  'fissure-surgery-in-bangalore': T.fissure,
  'top-fistula-laser-treatment-hospital-in-bangalore': '/top-fistula-laser-treatment-hospital-in-bangalore',
  'best-constipation-treatment-in-bangalore': '/best-constipation-treatment-in-bangalore',
  'colon-cancer-experts-in-bangalore': '/colon-cancer-experts-in-bangalore',
  'pilonidal-sinus-specialists-in-bangalore': '/pilonidal-sinus-specialists-in-bangalore',
  'ulcerative-colitis-treatment-in-bangalore': '/ulcerative-colitis-treatment-in-bangalore',
  'top-specialists-for-rectal-prolapse-treatment-in-bangalore': '/top-specialists-for-rectal-prolapse-treatment-in-bangalore',
};
// Doctor profile pages: same /dr-<name>/ address as the main site
const DOCTOR_PAGES = [
  'dr-chandrika', 'dr-jyotsna-v', 'dr-nayan-kumar', 'dr-padmanabh-r-bhat', 'dr-prithvija-chakravarthy',
  'dr-rahul-hegana', 'dr-rajasekhar-m-r', 'dr-shreedevi-k-n', 'dr-suchitra-n-adiga',
];

// WordPress category -> treatment page on this site
const CATEGORY_TREATMENT = {
  piles: 'piles-hemorrhoids',
  haemorrhoids: 'piles-hemorrhoids',
  'anal-fissures': 'fissure',
  fistula: 'fistula',
  'pilonidal-sinus': 'pilonidal-sinus',
  constipation: 'constipation',
  'colon-cancer': 'colon-cancer',
  'rectal-cancer': 'colon-cancer',
  'ulcerative-colitis': 'ulcerative-colitis',
  'ibd-vs-ibs': 'ulcerative-colitis',
  'rectal-prolapse': 'rectal-prolapse',
};
// Categories that describe placement, not topic
const SKIP_CATEGORIES = new Set(['uncategorized', 'popular']);
// Category chip labels, in the site's sentence case
const CATEGORY_LABEL = {
  'anal-fissures': 'Anal fissure',
  haemorrhoids: 'Piles',
  'pilonidal-sinus': 'Pilonidal sinus',
  'rectal-prolapse': 'Rectal prolapse',
  'colon-cancer': 'Colon cancer',
  'rectal-cancer': 'Rectal cancer',
  'gut-health': 'Gut health',
  'operation-tips': 'Surgery tips',
  rectal: 'Rectal health',
};

const ALLOWED_TAGS = new Set([
  'p', 'h2', 'h3', 'h4', 'h5', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'table', 'thead', 'tbody',
  'tr', 'td', 'th', 'figure', 'figcaption', 'blockquote', 'img', 'hr', 'code',
]);
const RENAME_TAGS = { b: 'strong', i: 'em', h1: 'h2', h6: 'h5' };

const log = (msg) => console.log(`[blog] ${msg}`);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' };
const decode = (s) =>
  s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
const plain = (html) => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

async function getJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'chirag-site-build' }, signal: AbortSignal.timeout(60000) });
  if (!res.ok) throw new Error(`${res.status} for ${url}`);
  return { data: await res.json(), totalPages: Number(res.headers.get('x-wp-totalpages')) || 1 };
}

async function fetchAll() {
  const fields = 'id,slug,date,modified,title,excerpt,content,categories,yoast_head_json.description,_links,_embedded';
  const { data: posts } = await getJson(
    `${API}/posts?per_page=${MAX_POSTS}&orderby=date&order=desc&_embed=wp:featuredmedia&_fields=${fields}`,
  );
  const { data: categories } = await getJson(`${API}/categories?per_page=100&_fields=id,slug,name`);
  return { posts, categories: new Map(categories.map((c) => [c.id, c])) };
}

/** Where a link to the main site should point on this site (null = leave as is) */
function mapInternal(path, postSlugs) {
  const [pathname, hash = ''] = path.split('#');
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  const suffix = hash ? `#${hash}` : '';
  if (postSlugs.has(slug)) return `/${slug}${suffix}`; // posts keep their WordPress address
  if (slug in PAGE_MAP) return PAGE_MAP[slug] + suffix;
  if (DOCTOR_PAGES.includes(slug)) return `/${slug}${suffix}`;
  return null;
}

/** Keeps only plain article markup: allowed tags, a few attributes, no WordPress classes or inline styles */
function clean(html, postSlugs, imageMap) {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, '')
    // Embedded players: keep a link to the video instead of the iframe
    .replace(/<iframe[^>]*src="([^"]+)"[^>]*>\s*<\/iframe>/gi, (_, src) =>
      /youtube/.test(src) ? `<p><a href="${src.replace('/embed/', '/watch?v=').replace('youtube-nocookie', 'youtube')}">Watch the video</a></p>` : '',
    );

  out = out.replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (_, close, rawTag, attrs) => {
    const tag = RENAME_TAGS[rawTag.toLowerCase()] || rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return '';
    if (close) return `</${tag}>`;
    const attr = (name) => attrs.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
    if (tag === 'a') {
      let href = attr('href') || '';
      const m = href.match(/^https?:\/\/(?:www\.)?chiragglobalhospitals?\.com(\/[^"]*)?$/i);
      const mapped = m ? mapInternal(m[1] || '/', postSlugs) : null;
      if (mapped) return `<a href="${mapped}">`;
      if (/^https?:/i.test(href)) return `<a href="${href}" target="_blank" rel="noopener">`;
      return href ? `<a href="${href}">` : '<a>';
    }
    if (tag === 'img') {
      const src = imageMap.get(attr('src')) || attr('src');
      if (!src) return '';
      return `<img src="${src}" alt="${attr('alt') || ''}" loading="lazy" decoding="async">`;
    }
    if (tag === 'td' || tag === 'th') {
      const span = ['colspan', 'rowspan'].map((n) => (attr(n) ? ` ${n}="${attr(n)}"` : '')).join('');
      return `<${tag}${span}>`;
    }
    return `<${tag}>`;
  });

  out = out
    // Headings carry their own weight; bold inside them is redundant
    .replace(/<(h[2-5])>([\s\S]*?)<\/\1>/g, (_, h, inner) => `<${h}>${inner.replace(/<\/?strong>/g, '').trim()}</${h}>`)
    // Line breaks at the start or end of a paragraph, and empty paragraphs
    .replace(/<p>(\s|<br>|&nbsp;|<strong>\s*<br>\s*<\/strong>)+/g, '<p>')
    .replace(/(\s|<br>|&nbsp;)+<\/p>/g, '</p>')
    .replace(/<p>\s*(<(strong|em)>\s*<\/\2>\s*)*<\/p>/g, '')
    .replace(/<a>\s*([\s\S]*?)<\/a>/g, '$1')
    .replace(/\n{2,}/g, '\n')
    .trim();

  // Anchor ids on h2 headings for the "In this article" list
  const headings = [];
  const used = new Set();
  out = out.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = plain(inner);
    let id = slugify(text) || 'section';
    while (used.has(id)) id += '-2';
    used.add(id);
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}

async function saveImage(url, name) {
  const file = new URL(`${name}.webp`, IMAGE_DIR);
  const path = `/blog/${name}.webp`;
  if (existsSync(file)) return path;
  const res = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`image ${res.status} for ${url}`);
  // sharp ships with Astro as an optional dependency; loaded here so a host
  // without it falls back to the saved posts instead of crashing the build
  const { default: sharp } = await import('sharp');
  await sharp(Buffer.from(await res.arrayBuffer()))
    .resize({ width: IMAGE_WIDTH, withoutEnlargement: true })
    .webp({ quality: 70 })
    .toFile(fileURLToPath(file));
  return path;
}

try {
  const { posts, categories } = await fetchAll();
  if (!posts.length) throw new Error('no posts returned');
  const postSlugs = new Set(posts.map((p) => p.slug));
  await mkdir(IMAGE_DIR, { recursive: true });

  const out = [];
  let imageErrors = 0;
  for (const p of posts) {
    const cats = p.categories.map((id) => categories.get(id)).filter(Boolean);
    const topic = cats.find((c) => !SKIP_CATEGORIES.has(c.slug));

    // Featured image, plus any images inside the article
    let image = '';
    const featured = p._embedded?.['wp:featuredmedia']?.[0];
    if (featured?.source_url) {
      try {
        image = await saveImage(featured.source_url, p.slug);
      } catch (err) {
        imageErrors++;
      }
    }
    const imageMap = new Map();
    let n = 0;
    for (const [, src] of p.content.rendered.matchAll(/<img[^>]*src="([^"]+)"/g)) {
      try {
        imageMap.set(src, await saveImage(src, `${p.slug}-${++n}`));
      } catch (err) {
        imageErrors++;
      }
    }

    const { html, headings } = clean(p.content.rendered, postSlugs, imageMap);
    const words = plain(html).split(' ').length;
    const summary = plain(p.yoast_head_json?.description || p.excerpt.rendered).replace(/\s*\[…\]$|\s*\[&hellip;\]$/, '');

    out.push({
      slug: p.slug,
      title: plain(p.title.rendered),
      tag: CATEGORY_LABEL[topic?.slug] || (topic ? plain(topic.name) : 'Health tips'),
      treatmentSlug: CATEGORY_TREATMENT[topic?.slug] || '',
      image,
      imageAlt: featured?.alt_text ? plain(featured.alt_text) : '',
      excerpt: summary.length > 160 ? summary.slice(0, 157).replace(/\s+\S*$/, '') + '…' : summary,
      date: p.date,
      modified: p.modified,
      readMinutes: Math.max(1, Math.round(words / 200)),
      headings,
      html,
    });
  }
  out.sort((a, b) => b.date.localeCompare(a.date));

  // Remove images of posts that were deleted on the main site
  const keep = new Set();
  for (const p of out) {
    if (p.image) keep.add(p.image.replace('/blog/', ''));
    for (const [, src] of p.html.matchAll(/src="\/blog\/([^"]+)"/g)) keep.add(src);
  }
  for (const f of await readdir(IMAGE_DIR)) if (!keep.has(f)) await rm(new URL(f, IMAGE_DIR));

  const next = JSON.stringify(out, null, 1) + '\n';
  const prev = existsSync(DATA_FILE) ? await readFile(DATA_FILE, 'utf8') : '';
  if (next !== prev) await writeFile(DATA_FILE, next);
  log(`${out.length} posts${next === prev ? ' (no change)' : ' saved'}${imageErrors ? `, ${imageErrors} images could not be downloaded` : ''}`);
} catch (err) {
  log(`could not update from the main site (${err.message}); keeping the existing posts`);
  if (!existsSync(DATA_FILE)) await writeFile(DATA_FILE, '[]\n');
}

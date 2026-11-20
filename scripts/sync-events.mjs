// Imports every published event from the blog site's WordPress (blogs.chiragglobalhospitals.com,
// the "event" post type) into src/data/events.json, and saves their photos to
// public/events/cms/<slug>/.
//
//   npm run events:sync
//
// Runs automatically before `npm run build`, and on a schedule from
// .github/workflows/sync-cms.yml. Events are free-form posts, so the details the site shows are
// read from them as follows:
//   date     "Date of Event:" line, else a date in the title or text ("6th December 2025"),
//            else the date the event was published
//   venue    "Event Place:" line ('' when there is none)
//   category keywords in the title and text (see CATEGORY_RULES)
//   photos   featured image first, then every image in the post
// Anything that comes out wrong can be corrected in EVENT_OVERRIDES in src/data/events.ts.
// If the blog site can't be reached, the existing events.json is kept and the build carries on.

import { mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { getAll, plain, saveImage, mapLimit, featuredImages } from './lib/wordpress.mjs';

const DATA_FILE = new URL('../src/data/events.json', import.meta.url);
const IMAGE_DIR = new URL('../public/events/cms/', import.meta.url);
const IMAGE_WIDTH = 1200;

const log = (msg) => console.log(`[events] ${msg}`);

// First match wins; checked against the title, then the text
const CATEGORY_RULES = [
  ['Medical education', /\bcme\b|workshop|continu(?:ed|ing) medical|guest lecture/i],
  ['Health camp', /\bcamp\b|screening/i],
  ['Conference', /conference|\w+con\b|\w+icon\b|chairperson|summit|conclave/i],
  ['Media', /\btv\b|television|republic|channel|show\b|interview|podcast/i],
  ['Celebration', /celebrat|founders|ceremony|homam|puja|inaugurat|opening|honou?r|anniversary|felicitat/i],
  ['Awareness', /awareness|health talk|\btalk\b|piles day|speaks?\b/i],
];
const DEFAULT_CATEGORY = 'Awareness';

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const iso = (y, m, d) => {
  const year = y < 100 ? 2000 + y : y;
  if (m < 1 || m > 12 || d < 1 || d > 31 || year < 2000 || year > 2100) return '';
  return `${year}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
};
/** First date written in text: "20-Nov-2025", "19-May-24", "6th December 2025", "19-05-24" */
function findDate(text) {
  const named = text.match(/\b(\d{1,2})(?:st|nd|rd|th)?[\s-]+(?:of\s+)?([a-z]{3,9})\.?[\s,-]+(\d{4}|\d{2})\b/i);
  if (named) {
    const m = MONTHS.indexOf(named[2].slice(0, 3).toLowerCase()) + 1;
    const d = m && iso(Number(named[3]), m, Number(named[1]));
    if (d) return d;
  }
  const monthFirst = text.match(/\b([a-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})\b/i);
  if (monthFirst) {
    const m = MONTHS.indexOf(monthFirst[1].slice(0, 3).toLowerCase()) + 1;
    const d = m && iso(Number(monthFirst[3]), m, Number(monthFirst[2]));
    if (d) return d;
  }
  const numeric = text.match(/\b(\d{1,2})[-/.](\d{1,2})[-/.](\d{4}|\d{2})\b/);
  if (numeric) return iso(Number(numeric[3]), Number(numeric[2]), Number(numeric[1]));
  return '';
}

const excerptOf = (text) => (text.length > 150 ? text.slice(0, 147).replace(/[\s,;:–-]+\S*$/, '') + '…' : text);

/** "photo-1024x768.jpeg" and "photo-scaled.jpeg" are sizes of "photo.jpeg" */
const imageKey = (url) =>
  decodeURIComponent(url.split(/[?#]/)[0].split('/').pop())
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/-\d+x\d+$/, '')
    .replace(/-scaled$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function parse(p, featured) {
  const title = plain(p.title.rendered);
  let html = p.content.rendered
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, '');

  // Embedded YouTube video
  const yt = html.match(/<iframe[^>]*src="[^"]*youtube(?:-nocookie)?\.com\/embed\/([\w-]+)/i);
  const video = yt ? `https://www.youtube.com/watch?v=${yt[1]}` : '';
  html = html.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

  // Photos: featured image, then images and linked image files in the post
  const urls = [];
  if (featured) urls.push(featured);
  for (const [, src] of html.matchAll(/<img[^>]*?\ssrc="([^"]+)"/gi)) urls.push(src);
  for (const [, href] of html.matchAll(/<a[^>]*?\shref="([^"]+\.(?:jpe?g|png|webp))"/gi)) urls.push(href);
  const photos = new Map();
  for (const u of urls) if (!photos.has(imageKey(u))) photos.set(imageKey(u), u);

  // "Date of Event: … / Event Name: … / Event Place: …" detail lists
  const fields = {};
  html = html.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (list, inner) => {
    const items = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map(([, li]) => plain(li));
    const details = items.map((t) => t.match(/^(Date of Event|Event Name|Event Place|Venue|Date)\s*:\s*(.+)$/i));
    if (!details.some(Boolean)) return list;
    for (const d of details) if (d) fields[d[1].toLowerCase()] = d[2].trim();
    return '';
  });

  // Other lists become highlights; paragraphs and headings become the body
  const highlights = [];
  html = html.replace(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, inner) => {
    for (const [, li] of inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)) {
      const t = plain(li);
      if (t) highlights.push(t);
    }
    return '';
  });
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '');
  const body = html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/(p|h[1-6]|div|blockquote|figcaption|section)>/gi, '\n')
    .split('\n')
    .map(plain)
    .filter((t) => t && norm(t) !== norm(title) && norm(t) !== norm(fields['event name'] || ''));

  const text = body.join(' ');
  const date =
    findDate(fields['date of event'] || fields.date || '') || findDate(title) || findDate(text) || p.date.slice(0, 10);
  const category = (CATEGORY_RULES.find(([, re]) => re.test(title)) || CATEGORY_RULES.find(([, re]) => re.test(text)))?.[0] || DEFAULT_CATEGORY;

  return {
    event: {
      slug: p.slug,
      title,
      date,
      venue: fields['event place'] || fields.venue || '',
      category,
      excerpt: excerptOf(body[0] || ''),
      body,
      ...(highlights.length && { highlights }),
      ...(video && { video }),
      cover: '',
      gallery: [],
      published: p.date,
    },
    photos: [...photos],
  };
}

try {
  const posts = await getAll('event', '&_embed=wp:featuredmedia');
  if (!posts.length) throw new Error('no events returned');
  const covers = await featuredImages(posts);
  await mkdir(IMAGE_DIR, { recursive: true });

  let imageErrors = 0;
  const out = await mapLimit(posts, 4, async (p) => {
    const { event, photos } = parse(p, covers.get(p.id)?.source_url);
    const dir = new URL(`${p.slug}/`, IMAGE_DIR);
    await mkdir(dir, { recursive: true });
    for (const [key, url] of photos) {
      try {
        event.gallery.push(await saveImage(url, new URL(`${key}.webp`, dir), `/events/cms/${p.slug}/${key}.webp`, IMAGE_WIDTH));
      } catch {
        imageErrors++;
      }
    }
    event.cover = event.gallery[0] || '';
    return event;
  });
  // Newest first; events on the same day in the order they were published
  out.sort((a, b) => b.date.localeCompare(a.date) || b.published.localeCompare(a.published));
  for (const e of out) delete e.published;

  // Remove photos of events, or of images, deleted on the blog site
  const keep = new Set(out.flatMap((e) => e.gallery));
  for (const slug of await readdir(IMAGE_DIR)) {
    const dir = new URL(`${slug}/`, IMAGE_DIR);
    const files = await readdir(dir).catch(() => []);
    for (const f of files) if (!keep.has(`/events/cms/${slug}/${f}`)) await rm(new URL(f, dir));
    if (!out.some((e) => e.slug === slug)) await rm(dir, { recursive: true, force: true });
  }

  const next = JSON.stringify(out, null, 1) + '\n';
  const prev = existsSync(DATA_FILE) ? await readFile(DATA_FILE, 'utf8') : '';
  if (next !== prev) await writeFile(DATA_FILE, next);
  log(`${out.length} events${next === prev ? ' (no change)' : ' saved'}${imageErrors ? `, ${imageErrors} images could not be downloaded` : ''}`);
} catch (err) {
  log(`could not update from the blog site (${err.message}); keeping the existing events`);
  if (!existsSync(DATA_FILE)) await writeFile(DATA_FILE, '[]\n');
}

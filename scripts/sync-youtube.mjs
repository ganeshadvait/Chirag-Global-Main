// Pulls doctor-talk videos from the hospital's YouTube channel into
// src/data/videos.json and saves their thumbnails to public/videos/.
//
//   npm run videos:sync
//
// Runs automatically before `npm run build`, so the site itself never calls
// YouTube until a visitor presses play. YouTube's public feed for this channel
// is unavailable and the Data API needs a key, so this reads the list embedded
// in the channel's /videos page. If YouTube can't be reached or the page
// changes shape, the script keeps the existing videos.json and exits cleanly,
// so a build never fails because of it.

import { mkdir, readFile, writeFile, readdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CHANNEL_URL = 'https://www.youtube.com/@dr.rajasekharmysore';
const DATA_FILE = new URL('../src/data/videos.json', import.meta.url);
const THUMB_DIR = new URL('../public/videos/', import.meta.url);
const MAX_VIDEOS = 12;

// Always listed first, in this order, ahead of the latest uploads.
// Fields given here override what's read from YouTube.
// Pinned videos may come from other channels (news coverage).
const PINNED = [
  {
    id: '7XFmXIIOvQ4', // TV2 News Bangalore, World Piles Day report
    title: 'World Piles Day at Chirag Global Hospitals',
    speaker: 'Dr. Rajasekhar M R on TV2 News',
    tag: 'In the news',
  },
  {
    id: 's-p5HCh8AQc', // Republic TV Kannada, Arogya Samvada special
    title: 'Piles and anorectal diseases: Arogya Samvada special',
    speaker: 'Dr. Rajasekhar M R on Republic TV Kannada',
    tag: 'In the news',
  },
];

// Only talks given by a doctor: the channel also has event and product videos.
const isDoctorTalk = (title) => /\bDr\.?\s*[A-Z]/.test(title);

// Topic chip shown on the player, from the first keyword the title mentions.
const TOPICS = [
  [/pilonidal|పైలోనైడల్/i, 'Pilonidal sinus'],
  [/prolapse/i, 'Rectal prolapse'],
  [/piles|ಮೂಲವ್ಯಾಧಿ/i, 'Piles'],
  [/fissure|ಬಿರುಕು/i, 'Fissure'],
  [/fistula|ಫಿಸ್ಟುಲಾ/i, 'Fistula'],
  [/constipation|fibre|fiber/i, 'Constipation'],
  [/palliative/i, 'Palliative care'],
  [/recovery|after surgery|ನಂತರ|eat|wound/i, 'Recovery'],
];

// Two thumbnail sizes: small for the playlist, large for the player only
const SIZES = { sm: [256, 144], lg: [960, 540] };

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36',
  'Accept-Language': 'en',
  // Skips the EU cookie-consent interstitial
  Cookie: 'CONSENT=YES+1; SOCS=CAI',
};

const log = (msg) => console.log(`[videos] ${msg}`);

async function getPage(url) {
  const res = await fetch(url, { headers: HEADERS, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`YouTube responded ${res.status} for ${url}`);
  return res.text();
}

function embeddedJson(html, name) {
  const match = html.match(new RegExp(`var ${name} = (\\{.*?\\});(?:var |</script>)`, 's'));
  if (!match) throw new Error(`${name} not found`);
  return JSON.parse(match[1]);
}

async function fetchLatest() {
  const data = embeddedJson(await getPage(`${CHANNEL_URL}/videos`), 'ytInitialData');
  const videos = [];
  JSON.stringify(data, (_key, value) => {
    const lockup = value?.lockupViewModel;
    if (lockup?.contentId && (!lockup.contentType || lockup.contentType === 'LOCKUP_CONTENT_TYPE_VIDEO')) {
      const title = lockup.metadata?.lockupMetadataViewModel?.title?.content;
      let duration = '';
      JSON.stringify(lockup.contentImage, (_k, v) => {
        if (v?.thumbnailBadgeViewModel?.text && !duration) duration = v.thumbnailBadgeViewModel.text;
        return v;
      });
      if (title) videos.push({ id: lockup.contentId, fullTitle: title.trim(), duration });
    }
    return value;
  });
  if (!videos.length) throw new Error('no videos parsed from the channel page');
  return videos;
}

async function fetchOne(id) {
  const { videoDetails: d } = embeddedJson(await getPage(`https://www.youtube.com/watch?v=${id}`), 'ytInitialPlayerResponse');
  if (!d?.title) throw new Error(`details for ${id} not found`);
  const s = Number(d.lengthSeconds) || 0;
  const hms = [Math.floor(s / 3600), Math.floor(s / 60) % 60, s % 60];
  const duration = (hms[0] ? [hms[0], String(hms[1]).padStart(2, '0')] : [hms[1]]).concat(String(hms[2]).padStart(2, '0')).join(':');
  return { id, fullTitle: d.title.trim(), duration };
}

function describe({ id, fullTitle, duration }, overrides = {}) {
  const parts = fullTitle.split('|').map((s) => s.trim()).filter(Boolean);
  const speaker = (fullTitle.match(/Dr\.?\s*[A-Z][\w.]*(?:\s+[A-Z][\w.]*){0,3}/) || [''])[0].replace(/^Dr\.?\s*/, 'Dr. ').trim();
  // First title segment that isn't the doctor's name, language or hospital name
  const title =
    parts.find((p) => !/^Dr\.?\s/i.test(p) && !/^(kannada|telugu|english|chirag global hospitals)$/i.test(p)) || fullTitle;
  const tag = TOPICS.find(([re]) => re.test(fullTitle))?.[1] || 'Doctor talk';
  const { id: _id, ...rest } = overrides;
  return {
    youtubeId: id,
    title,
    fullTitle,
    speaker,
    duration,
    tag,
    thumb: `/videos/${id}-lg.webp`,
    thumbSmall: `/videos/${id}-sm.webp`,
    ...rest,
  };
}

async function saveThumbnails(id) {
  const files = Object.keys(SIZES).map((size) => [size, new URL(`${id}-${size}.webp`, THUMB_DIR)]);
  if (files.every(([, f]) => existsSync(f))) return;

  // Largest available: maxres is 16:9; sd and hq are 4:3 with black bars
  let image;
  for (const name of ['maxresdefault', 'sddefault', 'hqdefault']) {
    const res = await fetch(`https://i.ytimg.com/vi/${id}/${name}.jpg`, { signal: AbortSignal.timeout(15000) });
    if (res.ok) {
      image = Buffer.from(await res.arrayBuffer());
      break;
    }
  }
  if (!image) throw new Error(`no thumbnail for ${id}`);

  // sharp ships with Astro as an optional dependency; loaded here so a host
  // without it falls back to the saved list instead of crashing the build
  const { default: sharp } = await import('sharp');
  const { width, height } = await sharp(image).metadata();
  // Crop to the 16:9 picture (removes letterbox bars on 4:3 thumbnails)
  const cropH = Math.round((width * 9) / 16);
  const base = sharp(image).extract({ left: 0, top: Math.max(0, Math.round((height - cropH) / 2)), width, height: Math.min(cropH, height) });
  for (const [size, file] of files) {
    const [w, h] = SIZES[size];
    await base.clone().resize(w, h, { fit: 'cover' }).webp({ quality: size === 'lg' ? 72 : 70 }).toFile(fileURLToPath(file));
  }
}

try {
  const latest = await fetchLatest();
  const pinned = [];
  for (const p of PINNED) {
    const found = latest.find((v) => v.id === p.id) || (await fetchOne(p.id));
    pinned.push(describe(found, p));
  }
  const pinnedIds = new Set(PINNED.map((p) => p.id));
  const talks = [
    ...pinned,
    ...latest.filter((v) => !pinnedIds.has(v.id) && isDoctorTalk(v.fullTitle)).map((v) => describe(v)),
  ].slice(0, MAX_VIDEOS);
  if (!talks.length) throw new Error('no doctor talks found');

  await mkdir(THUMB_DIR, { recursive: true });
  for (const v of talks) await saveThumbnails(v.youtubeId);

  // Remove thumbnails for videos that dropped off the list
  const keep = new Set(talks.flatMap((v) => Object.keys(SIZES).map((s) => `${v.youtubeId}-${s}.webp`)));
  for (const f of await readdir(THUMB_DIR)) if (!keep.has(f)) await rm(new URL(f, THUMB_DIR));

  const next = JSON.stringify(talks, null, 2) + '\n';
  const prev = existsSync(DATA_FILE) ? await readFile(DATA_FILE, 'utf8') : '';
  if (next !== prev) await writeFile(DATA_FILE, next);
  log(`${talks.length} doctor talks${next === prev ? ' (no change)' : ' saved'}`);
} catch (err) {
  log(`could not update from YouTube (${err.message}); keeping the existing list`);
  if (!existsSync(DATA_FILE)) await writeFile(DATA_FILE, '[]\n');
}

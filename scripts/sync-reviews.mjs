// Updates the Google rating and exact total review count shown on the site
// (src/data/reviews.json) from the hospital's Google Business Profile, using the
// Google Places API (New): https://developers.google.com/maps/documentation/places/web-service/place-details
//
//   npm run reviews:sync
//
// Runs automatically before `npm run build`. Needs two settings, in a .env file at the
// project root or in the hosting platform's environment variables:
//
//   GOOGLE_PLACES_API_KEY=...   an API key with "Places API (New)" enabled
//   GOOGLE_PLACE_ID=...         the hospital's Place ID (from Google's Place ID Finder)
//
// Without them, or if Google can't be reached, the saved values are kept and the build
// carries on. The site only changes when it is rebuilt, so schedule a daily rebuild
// (e.g. a deploy hook) to keep the count current.

import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/reviews.json', import.meta.url);
const KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE = process.env.GOOGLE_PLACE_ID;
const log = (msg) => console.log(`[reviews] ${msg}`);

const saved = JSON.parse(await readFile(FILE, 'utf8'));

if (!KEY || !PLACE) {
  log(`GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID not set; keeping ${saved.rating}★ from ${saved.count} reviews`);
} else {
  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE)}`, {
      // Only these two fields are requested, which keeps the call in the cheapest billing tier for them
      headers: { 'X-Goog-Api-Key': KEY, 'X-Goog-FieldMask': 'rating,userRatingCount' },
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const { rating, userRatingCount } = await res.json();
    if (typeof rating !== 'number' || typeof userRatingCount !== 'number') throw new Error('no rating in response');
    if (rating !== saved.rating || userRatingCount !== saved.count) {
      const today = new Date().toISOString().slice(0, 10);
      await writeFile(FILE, JSON.stringify({ rating, count: userRatingCount, source: 'google-places', updated: today }, null, 2) + '\n');
      log(`updated: ${saved.rating}★/${saved.count} → ${rating}★/${userRatingCount}`);
    } else {
      log(`unchanged: ${rating}★ from ${userRatingCount} reviews`);
    }
  } catch (err) {
    log(`could not read Google (${err.message}); keeping ${saved.rating}★ from ${saved.count} reviews`);
  }
}

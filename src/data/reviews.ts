// Google rating and total review count, shown across the site. Kept up to date by
// scripts/sync-reviews.mjs (runs before every build) from the hospital's Google Business
// Profile via the Google Places API; until that is set up, the saved values are used.
import data from './reviews.json';

export const GOOGLE_RATING = {
  /** e.g. "4.7" */
  rating: data.rating.toFixed(1),
  /** Exact total, e.g. "1,428" */
  count: data.count.toLocaleString('en-IN'),
};

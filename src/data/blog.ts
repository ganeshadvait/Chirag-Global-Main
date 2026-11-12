// Blog posts imported from the main WordPress site (chiragglobalhospitals.com/health-updates-2/).
// Refreshed by scripts/sync-blog.mjs (`npm run blog:sync`, and before every build); edit posts
// on the main site rather than in blog-posts.json, which is overwritten on each sync.

import posts from './blog-posts.json';

export interface BlogPost {
  slug: string;
  title: string;
  tag: string; // category chip
  treatmentSlug: string; // related treatment page slug ('' when none)
  image: string; // self-hosted cover in /public/blog ('' when the post has none)
  imageAlt: string;
  excerpt: string; // card text and meta description, up to ~160 characters
  date: string; // ISO date published
  modified: string; // ISO date last updated
  readMinutes: number;
  headings: { id: string; text: string }[]; // h2s, for the "In this article" list
  html: string; // cleaned article body
}

/** Newest first */
export const POSTS: BlogPost[] = posts;

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

// Blog index pagination: page 1 is /health-updates-2, later pages /health-updates-2/page/2 and on
export const PER_PAGE = 12;
export const pageCount = Math.max(1, Math.ceil(POSTS.length / PER_PAGE));
export { blogPageHref as pageHref } from '../lib/routes';

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

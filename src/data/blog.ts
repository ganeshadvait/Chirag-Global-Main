// Blog posts, listed on /our-blogs. There are none for now: blog-posts.json is empty and the
// import from WordPress has been removed, to be set up again. The blog page, its menu link and
// the post pages ([post].astro) are in place and pick up posts as soon as blog-posts.json has them.

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

// Blog index pagination: page 1 is /our-blogs, later pages /our-blogs/page/2 and on
export const PER_PAGE = 12;
export const pageCount = Math.max(1, Math.ceil(POSTS.length / PER_PAGE));
export { blogPageHref as pageHref } from '../lib/routes';

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

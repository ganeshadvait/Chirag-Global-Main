// Blog posts, managed on the blog site's WordPress (blogs.chiragglobalhospitals.com) and fetched
// when the site is built (src/lib/wordpress-blog-feed.ts). Publish or edit posts there; they
// appear here after the next build. Listed on /our-blogs; each post has a page at /<slug>.

import { getAllBlogPosts } from '../lib/wordpress-blog-feed';

export interface BlogPost {
  slug: string;
  title: string;
  tag: string; // category chip
  treatmentSlug: string; // related treatment page slug ('' when none)
  image: string; // cover image URL on the blog site ('' when the post has none)
  imageAlt: string;
  excerpt: string; // card text and meta description, up to ~160 characters
  date: string; // ISO date published
  modified: string; // ISO date last updated
  readMinutes: number;
  headings: { id: string; text: string }[]; // h2s, for the "In this article" list
  html: string; // cleaned article body
}

/** Newest first */
export const POSTS: BlogPost[] = await getAllBlogPosts();

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

// Blog index pagination: page 1 is /our-blogs, later pages /our-blogs/page/2 and on
export const PER_PAGE = 9;
export const pageCount = Math.max(1, Math.ceil(POSTS.length / PER_PAGE));
export { blogPageHref as pageHref } from '../lib/routes';

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

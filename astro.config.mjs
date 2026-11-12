// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import imageTitles from './integrations/image-titles.mjs';
import sitemap from '@astrojs/sitemap';
import devSitemap from './integrations/dev-sitemap.mjs';
import { readFileSync } from 'node:fs';

const SITE = 'https://www.chiragglobalhospitals.com';

// Blog posts sit at the top level (/sitz-bath-for-piles/, as on WordPress), so list their paths
/** @type {Set<string>} */
const POST_PATHS = new Set(
  JSON.parse(readFileSync(new URL('./src/data/blog-posts.json', import.meta.url), 'utf8')).map((/** @type {{ slug: string }} */ p) => `/${p.slug}`),
);

// Sitemap groups: sitemap-blogs-0.xml, sitemap-events-0.xml; everything else → sitemap-pages-0.xml
/** @param {string} url */
const pathOf = (url) => new URL(url).pathname.replace(/\/$/, '');
/** @param {string} path */
const isBlog = (path) => path.startsWith('/health-updates-2') || POST_PATHS.has(path);
/** @param {string} path */
const isEvent = (path) => path === '/chirag-global-hospitals-events' || path.startsWith('/event/');

// https://astro.build/config
export default defineConfig({
  // Live domain: used for the sitemap, canonical links and structured data
  site: SITE,
  // Every image with alt text also gets a matching title attribute;
  // @astrojs/sitemap writes sitemap-index.xml on build, pointing to separate sitemaps for pages,
  // blogs and events. devSitemap serves the built files on the dev server too.
  integrations: [
    imageTitles(),
    sitemap({
      chunks: {
        blogs: (item) => (isBlog(pathOf(item.url)) ? item : undefined),
        events: (item) => (isEvent(pathOf(item.url)) ? item : undefined),
      },
    }),
    devSitemap(),
  ],
  // Fetch a page in the background when its link is hovered or focused,
  // so the click usually lands on an already-loaded page
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});

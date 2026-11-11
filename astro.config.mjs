// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import imageTitles from './integrations/image-titles.mjs';

// https://astro.build/config
export default defineConfig({
  // Every image with alt text also gets a matching title attribute
  integrations: [imageTitles()],
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
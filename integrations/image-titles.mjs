// Astro integration: after a build, gives every <img> that has alt text a matching
// title attribute (the tooltip text and image title search engines read), so each
// image carries both without repeating the text in every component.
// Images that already set their own title are left as they are.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

export default function imageTitles() {
  return {
    name: 'image-titles',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        let images = 0;
        for await (const file of htmlFiles(fileURLToPath(dir))) {
          const html = await readFile(file, 'utf8');
          const next = html.replace(/<img\b[^>]*>/g, (original) => {
            // Astro writes an empty alt as a bare `alt`; spell it out as alt="" (decorative image)
            // so SEO audit tools that look for alt="" don't report it as missing
            const tag = original.replace(/\salt(?=[\s>/])/, ' alt=""');
            if (/\stitle=/.test(tag)) return tag;
            const alt = tag.match(/\salt="([^"]+)"/)?.[1];
            if (!alt) return tag;
            images++;
            return tag.replace(/\salt="[^"]+"/, (m) => `${m} title="${alt}"`);
          });
          if (next !== html) await writeFile(file, next);
        }
        logger.info(`added title to ${images} images`);
      },
    },
  };
}

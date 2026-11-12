// Dev-only helper: @astrojs/sitemap writes sitemap-index.xml and sitemap-0.xml only during
// `astro build`, so `astro dev` would show a 404 for them. This serves the files from the
// last build (dist/) instead, so the sitemap can be checked on the dev server.
// Run `npm run build` to refresh them after adding or removing pages.

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

export default function devSitemap() {
  let outDir;
  return {
    name: 'dev-sitemap',
    hooks: {
      'astro:config:done': ({ config }) => {
        outDir = config.outDir;
      },
      'astro:server:setup': ({ server }) => {
        server.middlewares.use(async (req, res, next) => {
          const file = req.url?.split('?')[0].match(/^\/(sitemap-(?:index|(?:[a-z]+-)?\d+)\.xml)$/)?.[1];
          if (!file) return next();
          try {
            const xml = await readFile(fileURLToPath(new URL(file, outDir)), 'utf8');
            res.setHeader('Content-Type', 'application/xml; charset=utf-8');
            res.end(xml);
          } catch {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(`${file} is created by "npm run build". Run a build once, then reload this page.`);
          }
        });
      },
    },
  };
}

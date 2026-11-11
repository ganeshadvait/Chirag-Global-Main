// Build-time helpers for files in /public (server-side only: uses the file system).
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Resolved from the project root: during `astro build` this module is bundled into
// dist/, so a path relative to import.meta.url would no longer point at /public.
const publicDir = join(process.cwd(), 'public') + '/';

/** True when a site URL like "/images/blog-fistula.jpg" points at a real file in /public.
 *  Used to skip <img> tags for photos that haven't been supplied yet, so pages don't
 *  request missing files (each one is a wasted request and a 404 in speed reports). */
export const publicFileExists = (url?: string) =>
  !!url && url.startsWith('/') && existsSync(publicDir + decodeURIComponent(url.slice(1)));

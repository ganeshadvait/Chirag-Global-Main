# chirag-local

Website built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

## Getting started

Requires Node.js 22.22 or newer.

```sh
npm install
npm run dev       # start dev server at http://localhost:4321
npm run build     # build static site into ./dist
npm run preview   # preview the production build
```

## Project structure

```
public/              static assets (favicon, images)
src/
  config.ts          site name, description, email, nav links
  components/        Header, Footer
  layouts/           shared page layout (imports Tailwind)
  pages/             one file per route: index, about, contact, 404
  styles/global.css  Tailwind import and theme colors
```

To add a page, create `src/pages/<name>.astro` using `Layout`, then add it to `NAV_LINKS` in `src/config.ts`.

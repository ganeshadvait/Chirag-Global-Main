// Blog posts from the blog site's WordPress (blogs.chiragglobalhospitals.com), shaped for the
// site's blog components. Posts are fetched once per build (or dev server start) and shared by
// every page: the blog list, each post page, the home page and the treatment pages.
//
// The site is static, so a post published on WordPress appears after the next build.

import { decode } from "html-entities";

import { getAllWordPressPosts, getPostImage, type WPPost } from "./wordpress";
import type { BlogPost } from "../data/blog";
import { publicFileExists } from "./assets";

/** A blog post for cards and lists (BlogPost without the article body) */
export type DisplayBlog = Omit<BlogPost, "html" | "headings">;

// Pages of the old main WordPress site that exist here. Most keep the same address; the rest
// point to their closest page on this site.
const T = {
  piles: "/piles-laser-treatment-in-bangalore",
  fissure: "/best-fissure-laser-treatment-in-bangalore",
};
const PAGE_MAP: Record<string, string> = {
  "": "/",
  "contact-us": "/contact-us",
  "contact-best-hospital-in-bangalore": "/contact-us",
  "book-appointment": "/contact-us",
  "about-us": "/about-us",
  treatments: "/treatments",
  "health-updates-2": "/our-blogs",
  "health-updates": "/treatments",
  "our-blogs": "/our-blogs",
  "chirag-global-hospitals-events": "/chirag-global-hospitals-events",
  "advanced-technologies": "/advanced-technologies",
  "educational-videos": "/educational-videos",
  "patient-reviews": "/patient-reviews",
  "hospital-certificates": "/hospital-certificates",
  "piles-laser-treatment-in-bangalore": T.piles,
  "laser-treatment-for-piles-2": T.piles,
  "piles-doctor": T.piles,
  "best-fissure-laser-treatment-in-bangalore": T.fissure,
  "fissure-surgery-in-bangalore": T.fissure,
  "top-fistula-laser-treatment-hospital-in-bangalore": "/top-fistula-laser-treatment-hospital-in-bangalore",
  "best-constipation-treatment-in-bangalore": "/best-constipation-treatment-in-bangalore",
  "colon-cancer-experts-in-bangalore": "/colon-cancer-experts-in-bangalore",
  "pilonidal-sinus-specialists-in-bangalore": "/pilonidal-sinus-specialists-in-bangalore",
  "ulcerative-colitis-treatment-in-bangalore": "/ulcerative-colitis-treatment-in-bangalore",
  "top-specialists-for-rectal-prolapse-treatment-in-bangalore": "/top-specialists-for-rectal-prolapse-treatment-in-bangalore",
};
// Doctor profile pages: same /dr-<name>/ address as the old site
const DOCTOR_PAGES = new Set([
  "dr-chandrika", "dr-jyotsna-v", "dr-nayan-kumar", "dr-padmanabh-r-bhat", "dr-prithvija-chakravarthy",
  "dr-rahul-hegana", "dr-rajasekhar-m-r", "dr-shreedevi-k-n", "dr-suchitra-n-adiga",
]);

// WordPress category -> treatment page slug (src/data/treatments.ts), for "related articles"
const CATEGORY_TREATMENT: Record<string, string> = {
  piles: "piles-hemorrhoids",
  haemorrhoids: "piles-hemorrhoids",
  "anal-fissures": "fissure",
  fistula: "fistula",
  "pilonidal-sinus": "pilonidal-sinus",
  constipation: "constipation",
  "colon-cancer": "colon-cancer",
  "rectal-cancer": "colon-cancer",
  "ulcerative-colitis": "ulcerative-colitis",
  "ibd-vs-ibs": "ulcerative-colitis",
  "rectal-prolapse": "rectal-prolapse",
};
// Categories that describe placement, not topic
const SKIP_CATEGORIES = new Set(["uncategorized", "popular"]);
// Category chip labels, in the site's sentence case (others use the WordPress name)
const CATEGORY_LABEL: Record<string, string> = {
  "anal-fissures": "Anal fissure",
  haemorrhoids: "Piles",
  "pilonidal-sinus": "Pilonidal sinus",
  "rectal-prolapse": "Rectal prolapse",
  "colon-cancer": "Colon cancer",
  "rectal-cancer": "Rectal cancer",
  "gut-health": "Gut health",
  "operation-tips": "Surgery tips",
  rectal: "Rectal health",
};

const ALLOWED_TAGS = new Set([
  "p", "h2", "h3", "h4", "h5", "ul", "ol", "li", "strong", "em", "a", "br", "table", "thead", "tbody",
  "tr", "td", "th", "figure", "figcaption", "blockquote", "img", "hr", "code",
]);
const RENAME_TAGS: Record<string, string> = { b: "strong", i: "em", h1: "h2", h6: "h5" };

const stripHtml = (html: string) =>
  decode(html.replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").trim();
const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const escapeAttr = (s: string) => s.replace(/"/g, "&quot;");

/** Where a link to a chiragglobalhospitals.com page should point on this site (null = leave as is) */
function mapInternal(path: string, postSlugs: Set<string>) {
  const [pathname, hash = ""] = path.split("#");
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const suffix = hash ? `#${hash}` : "";
  if (postSlugs.has(slug)) return `/${slug}${suffix}`; // posts keep their WordPress address
  if (slug in PAGE_MAP) return PAGE_MAP[slug] + suffix;
  if (DOCTOR_PAGES.has(slug)) return `/${slug}${suffix}`;
  return null;
}

/** Keeps only plain article markup: allowed tags, a few attributes, no WordPress classes or styles */
function cleanContent(html: string, postSlugs: Set<string>) {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|noscript|svg)[\s\S]*?<\/\1>/gi, "")
    // Embedded players: keep a link to the video instead of the iframe
    .replace(/<iframe[^>]*src="([^"]+)"[^>]*>\s*<\/iframe>/gi, (_, src: string) =>
      /youtube/.test(src)
        ? `<p><a href="${src.replace("/embed/", "/watch?v=").replace("youtube-nocookie", "youtube").replace(/\?feature=oembed$/, "")}">Watch the video</a></p>`
        : "",
    );

  out = out.replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (_, close: string, rawTag: string, attrs: string) => {
    const tag = RENAME_TAGS[rawTag.toLowerCase()] || rawTag.toLowerCase();
    if (!ALLOWED_TAGS.has(tag)) return "";
    if (close) return `</${tag}>`;
    const attr = (name: string) => attrs.match(new RegExp(`\\s${name}="([^"]*)"`, "i"))?.[1];
    if (tag === "a") {
      const href = attr("href") || "";
      const m = href.match(/^https?:\/\/(?:www\.|blogs\.)?chiragglobalhospitals?\.com(\/[^"]*)?$/i);
      const mapped = m && !/\/wp-content\//.test(m[1] || "") ? mapInternal(m[1] || "/", postSlugs) : null;
      if (mapped) return `<a href="${mapped}">`;
      if (/^https?:/i.test(href)) return `<a href="${href}" target="_blank" rel="noopener">`;
      return href ? `<a href="${href}">` : "<a>";
    }
    if (tag === "img") {
      const src = attr("src");
      if (!src) return "";
      return `<img src="${src}" alt="${escapeAttr(attr("alt") || "")}" loading="lazy" decoding="async">`;
    }
    if (tag === "td" || tag === "th") {
      const span = ["colspan", "rowspan"].map((n) => (attr(n) ? ` ${n}="${attr(n)}"` : "")).join("");
      return `<${tag}${span}>`;
    }
    return `<${tag}>`;
  });

  out = out
    // Headings carry their own weight; bold inside them is redundant
    .replace(/<(h[2-5])>([\s\S]*?)<\/\1>/g, (_, h, inner: string) => `<${h}>${inner.replace(/<\/?strong>/g, "").trim()}</${h}>`)
    // Line breaks at the start or end of a paragraph, and empty paragraphs
    .replace(/<p>(\s|<br>|&nbsp;|<strong>\s*<br>\s*<\/strong>)+/g, "<p>")
    .replace(/(\s|<br>|&nbsp;)+<\/p>/g, "</p>")
    .replace(/<p>\s*(<(strong|em)>\s*<\/\2>\s*)*<\/p>/g, "")
    .replace(/<a>\s*([\s\S]*?)<\/a>/g, "$1")
    .replace(/\n{2,}/g, "\n")
    .trim();

  // Anchor ids on h2 headings, for the "In this article" list
  const headings: { id: string; text: string }[] = [];
  const used = new Set<string>();
  out = out.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const text = stripHtml(inner);
    let id = slugify(text) || "section";
    while (used.has(id)) id += "-2";
    used.add(id);
    headings.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html: out, headings };
}

function mapWordPressPost(post: WPPost, postSlugs: Set<string>): BlogPost {
  const title = stripHtml(post.title.rendered);
  const categories = (post._embedded?.["wp:term"] ?? []).flat().filter((t) => t?.taxonomy === "category");
  const topic = categories.find((c) => !SKIP_CATEGORIES.has(c.slug));
  const { html, headings } = cleanContent(post.content.rendered, postSlugs);
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  const summary = stripHtml(post.yoast_head_json?.description || post.excerpt.rendered).replace(/\s*\[…\]$/, "");
  const featured = post._embedded?.["wp:featuredmedia"]?.[0];

  return {
    slug: post.slug,
    title,
    tag: (topic && CATEGORY_LABEL[topic.slug]) || (topic ? decode(topic.name) : "Health tips"),
    treatmentSlug: (topic && CATEGORY_TREATMENT[topic.slug]) || "",
    // The blog site's cover; for older posts whose cover is missing from its media library, the
    // copy saved in public/blog by scripts/save-blog-covers.mjs
    image: getPostImage(post) || (publicFileExists(`/blog/${post.slug}.webp`) ? `/blog/${post.slug}.webp` : ""),
    imageAlt: featured?.alt_text ? stripHtml(featured.alt_text) : title,
    excerpt: summary.length > 160 ? summary.slice(0, 157).replace(/\s+\S*$/, "") + "…" : summary,
    date: post.date,
    modified: post.modified,
    readMinutes: Math.max(1, Math.round(words / 200)),
    headings,
    html,
  };
}

let allPosts: Promise<BlogPost[]> | undefined;

/** Every published post, newest first. Fetched once and shared by all pages of the build. */
export function getAllBlogPosts(): Promise<BlogPost[]> {
  allPosts ??= getAllWordPressPosts().then((posts) => {
    const postSlugs = new Set(posts.map((p) => p.slug));
    console.log(`[blog] ${posts.length} posts from blogs.chiragglobalhospitals.com`);
    return posts.map((p) => mapWordPressPost(p, postSlugs));
  });
  return allPosts;
}

/** One page of the blog list (9 posts per page) */
export async function getBlogPage(page = 1, perPage = 9) {
  const posts = await getAllBlogPosts();
  return {
    posts: posts.slice((page - 1) * perPage, page * perPage) as DisplayBlog[],
    totalPosts: posts.length,
    totalPages: Math.max(1, Math.ceil(posts.length / perPage)),
  };
}

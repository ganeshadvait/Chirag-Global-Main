
import { decode } from "html-entities";

import {
  getEvents,
  getEventImage,
  type WPEvent,
} from "./wordpress-events";

// Data format required by the Astro Events page
export interface DisplayEvent {
  id: number;
  slug: string;
  title: string;

  // WordPress publication date
  published: string;

  // Actual hospital event date
  eventDate: string | null;

  category: string;
  venue: string;
  cover: string;
  excerpt: string;
  body: string[];
  highlights: string[];
  gallery: string[];
}

// Convert WordPress HTML into readable plain text
function plainText(html: string = ""): string {
  return decode(
    html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

// Find a custom field inside ACF or WordPress meta
function getField(
  event: WPEvent,
  fieldNames: string[]
): unknown {
  const acf = event.acf ?? {};
  const meta = event.meta ?? {};

  for (const name of fieldNames) {
    const value = acf[name] ?? meta[name];

    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      return value;
    }
  }

  return null;
}

// Return a custom field as a string
function getString(
  event: WPEvent,
  names: string[]
): string {
  const value = getField(event, names);

  if (typeof value === "string") {
    return value.trim();
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (
    Array.isArray(value) &&
    typeof value[0] === "string"
  ) {
    return value[0].trim();
  }

  return "";
}

// Convert event date into YYYY-MM-DD
function normalizeDate(
  value: string
): string | null {
  if (!value) return null;

  // Example: 20261120
  if (/^\d{8}$/.test(value)) {
    const formatted =
      `${value.slice(0, 4)}-` +
      `${value.slice(4, 6)}-` +
      `${value.slice(6, 8)}`;

    return isValidDate(formatted)
      ? formatted
      : null;
  }

  // Example: 2026-11-20
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const formatted = value.slice(0, 10);

    return isValidDate(formatted)
      ? formatted
      : null;
  }

  return null;
}

function isValidDate(value: string): boolean {
  const date = new Date(`${value}T12:00:00Z`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

// Get gallery images from available WordPress fields
function getGallery(event: WPEvent): string[] {
  const value = getField(event, [
    "event_gallery",
    "gallery",
    "photos",
    "event_photos",
  ]);

  const featured = getEventImage(event);

  const gallery: string[] = [];

  if (Array.isArray(value)) {
    for (const item of value) {
      if (
        typeof item === "string" &&
        /^https?:\/\//.test(item)
      ) {
        gallery.push(item);
      }

      if (
        item &&
        typeof item === "object"
      ) {
        const image = item as Record<
          string,
          unknown
        >;

        const url =
          image.url ?? image.source_url;

        if (
          typeof url === "string" &&
          /^https?:\/\//.test(url)
        ) {
          gallery.push(url);
        }
      }
    }
  }

  if (
    featured &&
    /^https?:\/\//.test(featured)
  ) {
    gallery.unshift(featured);
  }

  return [...new Set(gallery)];
}

// Map WordPress event to Astro display format
export function mapWordPressEvent(
  event: WPEvent
): DisplayEvent {
  const title = plainText(
    event.title?.rendered ?? ""
  );

  const excerpt = plainText(
    event.excerpt?.rendered ?? ""
  );

  const content = plainText(
    event.content?.rendered ?? ""
  );

  const eventDate = normalizeDate(
    getString(event, [
      "event_date",
      "start_date",
      "date_of_event",
      "event_start_date",
    ])
  );

  const category = getString(event, [
    "event_category",
    "category",
    "event_type",
  ]);

  const venue = getString(event, [
    "event_venue",
    "venue",
    "location",
    "event_location",
  ]);

  const gallery = getGallery(event);

  return {
    id: event.id,
    slug: event.slug,
    title,

    published: event.date,

    eventDate,

    category: category || "Hospital events",

    venue,

    cover: getEventImage(event),

    excerpt: excerpt || content.slice(0, 180),

    body: content ? [content] : [],

    highlights: [],

    gallery,
  };
}

// Fetch every published event from WordPress
export async function getAllWordPressEvents():
  Promise<DisplayEvent[]> {

  const allEvents: WPEvent[] = [];

  let page = 1;

  while (true) {
    const response = await getEvents(page);

    allEvents.push(...response.events);

    if (
      page >= response.totalPages ||
      response.events.length === 0
    ) {
      break;
    }

    page++;
  }

  return allEvents
    .map(mapWordPressEvent)
    .sort((a, b) =>
      b.published.localeCompare(a.published)
    );
}

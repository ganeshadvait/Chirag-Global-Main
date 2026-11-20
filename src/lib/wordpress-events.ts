
/**
 * Chirag Global Hospitals
 * WordPress Events API Integration
 *
 * WordPress:
 * https://blogs.chiragglobalhospitals.com
 *
 * Events API:
 * /wp-json/wp/v2/event
 */

const BASE_URL =
  "https://blogs.chiragglobalhospitals.com/wp-json/wp/v2";

// Correct WordPress custom post type endpoint
const EVENT_ENDPOINT = "event";

// Number of events displayed per page
const EVENTS_PER_PAGE = 9;

// WordPress event data structure
export interface WPEvent {
  id: number;
  slug: string;
  status: string;
  date: string;
  modified: string;
  link: string;

  title: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  content: {
    rendered: string;
  };

  featured_media?: number;

  // Custom fields, if exposed through REST API
  acf?: Record<string, unknown>;
  meta?: Record<string, unknown>;

  // Featured image data
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      id: number;
      source_url: string;
      alt_text?: string;
      media_details?: {
        width?: number;
        height?: number;
      };
    }>;
  };
}

// API response for event listings
export interface EventsResponse {
  events: WPEvent[];
  totalEvents: number;
  totalPages: number;
  currentPage: number;
}

/**
 * Fetch published events from WordPress.
 *
 * Example:
 * getEvents(1) = first 9 events
 * getEvents(2) = next 9 events
 */
export async function getEvents(
  page: number = 1
): Promise<EventsResponse> {
  const params = new URLSearchParams({
    per_page: String(EVENTS_PER_PAGE),
    page: String(page),
    status: "publish",
    _embed: "1",
    orderby: "date",
    order: "desc",
  });

  const url =
    `${BASE_URL}/${EVENT_ENDPOINT}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch WordPress events: ${response.status}`
    );
  }

  const events = (await response.json()) as WPEvent[];

  const totalEvents = Number(
    response.headers.get("X-WP-Total") ?? 0
  );

  const totalPages = Number(
    response.headers.get("X-WP-TotalPages") ?? 1
  );

  return {
    events,
    totalEvents,
    totalPages,
    currentPage: page,
  };
}

/**
 * Fetch one published event by its slug.
 *
 * Example:
 * getEventBySlug("health-awareness-camp")
 */
export async function getEventBySlug(
  slug: string
): Promise<WPEvent | null> {
  const params = new URLSearchParams({
    slug,
    status: "publish",
    _embed: "1",
  });

  const url =
    `${BASE_URL}/${EVENT_ENDPOINT}?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch WordPress event: ${response.status}`
    );
  }

  const events = (await response.json()) as WPEvent[];

  return events.length > 0 ? events[0] : null;
}

/**
 * Get featured image URL.
 */
export function getEventImage(
  event: WPEvent
): string {
  return (
    event._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url ?? ""
  );
}

/**
 * Get featured image alt text.
 */
export function getEventImageAlt(
  event: WPEvent
): string {
  const media =
    event._embedded?.["wp:featuredmedia"]?.[0];

  return (
    media?.alt_text ||
    event.title.rendered.replace(/<[^>]*>/g, "")
  );
}

/**
 * Remove HTML tags from WordPress text.
 * For display-only plain text, HTML entities
 * should also be decoded by the UI layer.
 */
export function stripHtml(
  html: string
): string {
  return html
    .replace(/<[^>]*>/g, "")
    .trim();
}

/**
 * Format a WordPress publication date.
 *
 * Note: This is NOT necessarily the actual
 * date on which the hospital event occurs.
 */
export function formatWordPressDate(
  date: string
): string {
  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}


const API_URL =
  "https://blogs.chiragglobalhospitals.com/wp-json/wp/v2";

export interface WPTerm {
  id: number;
  slug: string;
  name: string;
  taxonomy: string;
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  yoast_head_json?: {
    description?: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url?: string;
      alt_text?: string;
    }>;
    "wp:term"?: WPTerm[][];
  };
}

// GET with retries: the blog site's host occasionally drops a request
async function fetchWithRetry(url: string, attempts = 4): Promise<Response> {
  for (let i = 1; ; i++) {
    try {
      const response = await fetch(url, {
        headers: { "User-Agent": "chirag-site-build" },
        signal: AbortSignal.timeout(60000),
      });
      // 4xx won't get better on a retry
      if (response.ok || (response.status >= 400 && response.status < 500)) return response;
      throw new Error(`WordPress API error: ${response.status}`);
    } catch (error) {
      if (i >= attempts) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000 * i));
    }
  }
}

// Fetch every published blog post, newest first (100 per request)
export async function getAllWordPressPosts(): Promise<WPPost[]> {
  const posts: WPPost[] = [];
  for (let page = 1, totalPages = 1; page <= totalPages; page++) {
    const params = new URLSearchParams({
      per_page: "100",
      page: String(page),
      orderby: "date",
      order: "desc",
      _embed: "wp:featuredmedia,wp:term",
    });
    const response = await fetchWithRetry(`${API_URL}/posts?${params}`);
    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }
    posts.push(...((await response.json()) as WPPost[]));
    totalPages = Number(response.headers.get("X-WP-TotalPages") || 1);
  }
  return posts;
}

// Fetch WordPress blogs
export async function getWordPressPosts(page = 1) {
  const params = new URLSearchParams({
    per_page: "9",
    page: String(page),
    _embed: "1",
  });

  const response = await fetch(
    `${API_URL}/posts?${params}`,
    {
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) {
    throw new Error(
      `WordPress API error: ${response.status}`
    );
  }

  const posts =
    (await response.json()) as WPPost[];

  return {
    posts,
    totalPosts: Number(
      response.headers.get("X-WP-Total") || 0
    ),
    totalPages: Number(
      response.headers.get("X-WP-TotalPages") || 1
    ),
  };
}

// Fetch an individual blog
export async function getWordPressPost(slug: string) {
  const params = new URLSearchParams({
    slug,
    _embed: "1",
  });

  const response = await fetch(
    `${API_URL}/posts?${params}`,
    {
      signal: AbortSignal.timeout(10000),
    }
  );

  if (!response.ok) {
    throw new Error(
      `WordPress API error: ${response.status}`
    );
  }

  const posts =
    (await response.json()) as WPPost[];

  return posts[0] || null;
}

// Get featured image
export function getPostImage(post: WPPost) {
  return (
    post._embedded?.["wp:featuredmedia"]?.[0]
      ?.source_url || ""
  );
}

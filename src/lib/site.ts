// Single source of truth for the site's public URL (used in metadata, sitemap,
// robots, and structured data). Override via NEXT_PUBLIC_SITE_URL in Vercel when
// you move to a custom domain — no code change needed.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://vicecityhub.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "ViceCityHub";

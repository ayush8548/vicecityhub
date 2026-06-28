import type { MetadataRoute } from "next";
import {
  getNews,
  getGuides,
  getVehicles,
  getCharacters,
  getLocations,
} from "@/lib/data";
import { SITE_URL as BASE } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, guides, vehicles, characters, locations] = await Promise.all([
    getNews(),
    getGuides(),
    getVehicles(),
    getCharacters(),
    getLocations(),
  ]);

  const staticRoutes = [
    "",
    "/news",
    "/guides",
    "/vehicles",
    "/characters",
    "/locations",
    "/map",
    "/community",
  ].map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const dynamic = [
    ...news.map((n) => ({ path: `/news/${n.slug}`, date: n.updatedAt })),
    ...guides.map((g) => ({ path: `/guides/${g.slug}`, date: g.updatedAt })),
    ...vehicles.map((v) => ({ path: `/vehicles/${v.slug}`, date: v.updatedAt })),
    ...characters.map((c) => ({
      path: `/characters/${c.slug}`,
      date: c.updatedAt,
    })),
    ...locations.map((l) => ({
      path: `/locations/${l.slug}`,
      date: l.updatedAt,
    })),
  ].map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: new Date(r.date),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...dynamic];
}

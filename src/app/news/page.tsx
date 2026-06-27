import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DatabaseGrid } from "@/components/database/DatabaseGrid";
import { getNews } from "@/lib/data";
import { formatDate } from "@/lib/utils";

// Re-fetch from Supabase at most every 60s so admin edits appear in production.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "GTA 6 News",
  description:
    "The latest verified Grand Theft Auto VI news, analysis, and community speculation.",
};

export default async function NewsPage() {
  const news = await getNews();
  const items = news.map((n) => ({
    id: n.id,
    slug: n.slug,
    title: n.title,
    description: n.excerpt,
    images: n.images,
    status: n.status,
    tag: n.category,
    meta: formatDate(n.createdAt),
    facet: n.category,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="GTA 6 News"
        description="Verified updates, deep analysis, and the community theories worth following — all tagged by how solid the source is."
      />
      <div className="section-pad mx-auto max-w-7xl py-12">
        <DatabaseGrid items={items} basePath="/news" facetLabel="Category" />
      </div>
    </>
  );
}

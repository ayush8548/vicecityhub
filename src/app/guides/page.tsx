import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DatabaseGrid } from "@/components/database/DatabaseGrid";
import { getGuides } from "@/lib/data";

// Re-fetch from Supabase at most every 60s so admin edits appear in production.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "GTA 6 Guides",
  description:
    "Strategy guides, tier lists, and walkthroughs to master Leonida and Vice City.",
};

export default async function GuidesPage() {
  const guides = await getGuides();
  const items = guides.map((g) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    description: g.description,
    images: g.images,
    status: g.status,
    tag: g.difficulty,
    meta: g.category,
    facet: g.category,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Strategy"
        title="Guides"
        description="From your first hours in Leonida to advanced heist planning — practical guides built by the community."
      />
      <div className="section-pad mx-auto max-w-7xl py-12">
        <DatabaseGrid items={items} basePath="/guides" facetLabel="Category" />
      </div>
    </>
  );
}

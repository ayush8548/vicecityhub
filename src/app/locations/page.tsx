import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DatabaseGrid } from "@/components/database/DatabaseGrid";
import { getLocations } from "@/lib/data";

// Re-fetch from Supabase at most every 60s so admin edits appear in production.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "GTA 6 Locations Database",
  description:
    "Cities, beaches, wetlands, and landmarks across the state of Leonida.",
};

export default async function LocationsPage() {
  const locations = await getLocations();
  const items = locations.map((l) => ({
    id: l.id,
    slug: l.slug,
    title: l.title,
    description: l.description,
    images: l.images,
    status: l.status,
    tag: l.type,
    meta: l.region,
    facet: l.type,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Atlas"
        title="Locations Database"
        description="Explore every district and landmark of Leonida — then jump to the interactive map."
      />
      <div className="section-pad mx-auto max-w-7xl py-12">
        <DatabaseGrid items={items} basePath="/locations" facetLabel="Type" />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DatabaseGrid } from "@/components/database/DatabaseGrid";
import { getVehicles } from "@/lib/data";

// Re-fetch from Supabase at most every 60s so admin edits appear in production.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "GTA 6 Vehicles Database",
  description:
    "Every confirmed, trailer-inferred, and rumored vehicle in Grand Theft Auto VI.",
};

export default async function VehiclesPage() {
  const vehicles = await getVehicles();
  const items = vehicles.map((v) => ({
    id: v.id,
    slug: v.slug,
    title: v.title,
    description: v.description,
    images: v.images,
    status: v.status,
    tag: v.class,
    meta: `${v.manufacturer} · ${v.topSpeed} mph`,
    facet: v.class,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Garage"
        title="Vehicles Database"
        description="Cars, bikes, and boats of the new era — filter by class and verification status."
      />
      <div className="section-pad mx-auto max-w-7xl py-12">
        <DatabaseGrid items={items} basePath="/vehicles" facetLabel="Class" />
      </div>
    </>
  );
}

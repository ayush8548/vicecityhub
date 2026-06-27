import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { InteractiveMap } from "@/components/map/InteractiveMap";
import { getLocations } from "@/lib/data";

// Re-fetch from Supabase at most every 60s so admin edits appear in production.
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Interactive Map of Leonida",
  description:
    "An interactive map of Leonida and Vice City — explore confirmed and trailer-inferred locations.",
};

export default async function MapPage() {
  const locations = await getLocations();

  return (
    <>
      <PageHeader
        eyebrow="Atlas"
        title="Interactive Map"
        description="Tap a pin to explore Leonida. Colors reflect how solid each location's verification is — cyan confirmed, purple trailer-inferred, pink speculation."
      />
      <div className="section-pad mx-auto max-w-7xl py-12">
        <InteractiveMap locations={locations} />
      </div>
    </>
  );
}

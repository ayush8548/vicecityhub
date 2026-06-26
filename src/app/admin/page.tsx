import type { Metadata } from "next";
import { AdminAuth } from "@/components/admin/AdminAuth";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import {
  getNews,
  getGuides,
  getVehicles,
  getCharacters,
  getLocations,
  getCarouselAll,
} from "@/lib/data";
import type { ManagedRecord } from "@/components/admin/EntityManager";

export const metadata: Metadata = {
  title: "Admin Console",
  description: "ViceCityHub content management.",
  robots: { index: false, follow: false },
};

// Always render fresh — admin reflects current DB state.
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [news, guides, vehicles, characters, locations, carousel] =
    await Promise.all([
      getNews(),
      getGuides(),
      getVehicles(),
      getCharacters(),
      getLocations(),
      getCarouselAll(),
    ]);

  return (
    <AdminAuth>
      <AdminDashboard
        news={news as unknown as ManagedRecord[]}
        guides={guides as unknown as ManagedRecord[]}
        vehicles={vehicles as unknown as ManagedRecord[]}
        characters={characters as unknown as ManagedRecord[]}
        locations={locations as unknown as ManagedRecord[]}
        carousel={carousel as unknown as ManagedRecord[]}
      />
    </AdminAuth>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityDetail } from "@/components/database/EntityDetail";
import { getLocations, getLocationBySlug } from "@/lib/data";

export async function generateStaticParams() {
  return (await getLocations()).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = await getLocationBySlug(slug);
  if (!l) return { title: "Location not found" };
  return { title: l.title, description: l.description };
}

// Re-fetch from Supabase at most every 60s so admin edits appear in production.
export const revalidate = 60;

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = await getLocationBySlug(slug);
  if (!l) notFound();

  return (
    <EntityDetail
      backHref="/locations"
      backLabel="Back to Locations"
      eyebrow={`${l.region} · ${l.type}`}
      title={l.title}
      description={l.description}
      body={l.body}
      images={l.images}
      status={l.status}
      facts={[
        { label: "Region", value: l.region },
        { label: "Type", value: l.type },
      ]}
    />
  );
}

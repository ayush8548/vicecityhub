import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityDetail } from "@/components/database/EntityDetail";
import { getVehicles, getVehicleBySlug } from "@/lib/data";

export async function generateStaticParams() {
  return (await getVehicles()).map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v) return { title: "Vehicle not found" };
  return { title: v.title, description: v.description };
}

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const v = await getVehicleBySlug(slug);
  if (!v) notFound();

  return (
    <EntityDetail
      backHref="/vehicles"
      backLabel="Back to Vehicles"
      eyebrow={`${v.class} · ${v.manufacturer}`}
      title={v.title}
      description={v.description}
      body={v.body}
      images={v.images}
      status={v.status}
      facts={[
        { label: "Class", value: v.class },
        { label: "Manufacturer", value: v.manufacturer },
        { label: "Top Speed", value: `${v.topSpeed} mph` },
      ]}
    />
  );
}

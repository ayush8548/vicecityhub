import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityDetail } from "@/components/database/EntityDetail";
import { getGuides, getGuideBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getGuides()).map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = await getGuideBySlug(slug);
  if (!g) return { title: "Guide not found" };
  return { title: g.title, description: g.description };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = await getGuideBySlug(slug);
  if (!g) notFound();

  return (
    <EntityDetail
      backHref="/guides"
      backLabel="Back to Guides"
      eyebrow={`${g.category} · ${g.difficulty}`}
      title={g.title}
      description={g.description}
      body={g.body}
      images={g.images}
      status={g.status}
      facts={[
        { label: "Category", value: g.category },
        { label: "Difficulty", value: g.difficulty },
        { label: "Updated", value: formatDate(g.updatedAt) },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityDetail } from "@/components/database/EntityDetail";
import { getNews, getNewsBySlug } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return (await getNews()).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: article.description };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getNewsBySlug(slug);
  if (!a) notFound();

  return (
    <EntityDetail
      backHref="/news"
      backLabel="Back to News"
      eyebrow={`${a.category} · ${a.author}`}
      title={a.title}
      description={a.description}
      body={a.body}
      images={a.images}
      status={a.status}
      facts={[
        { label: "Category", value: a.category },
        { label: "Published", value: formatDate(a.createdAt) },
        { label: "Read time", value: `${a.readMinutes} min` },
        { label: "Author", value: a.author },
      ]}
    />
  );
}

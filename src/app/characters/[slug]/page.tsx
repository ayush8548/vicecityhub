import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EntityDetail } from "@/components/database/EntityDetail";
import { getCharacters, getCharacterBySlug } from "@/lib/data";

export async function generateStaticParams() {
  return (await getCharacters()).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCharacterBySlug(slug);
  if (!c) return { title: "Character not found" };
  return { title: c.title, description: c.description };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = await getCharacterBySlug(slug);
  if (!c) notFound();

  return (
    <EntityDetail
      backHref="/characters"
      backLabel="Back to Characters"
      eyebrow={c.role}
      title={c.title}
      description={c.description}
      body={c.body}
      images={c.images}
      status={c.status}
      facts={[
        { label: "Role", value: c.role },
        { label: "Affiliation", value: c.affiliation },
        ...(c.voiceActor ? [{ label: "Voice", value: c.voiceActor }] : []),
      ]}
    />
  );
}

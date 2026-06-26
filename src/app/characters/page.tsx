import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { DatabaseGrid } from "@/components/database/DatabaseGrid";
import { getCharacters } from "@/lib/data";

export const metadata: Metadata = {
  title: "GTA 6 Characters Database",
  description:
    "The cast of Leonida — confirmed protagonists and theorized supporting characters.",
};

export default async function CharactersPage() {
  const characters = await getCharacters();
  const items = characters.map((c) => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    images: c.images,
    status: c.status,
    tag: c.role,
    meta: c.affiliation,
    facet: c.role,
  }));

  return (
    <>
      <PageHeader
        eyebrow="Cast"
        title="Characters Database"
        description="Meet the people of Leonida. Profiles are clearly marked confirmed, trailer-inferred, or speculative."
      />
      <div className="section-pad mx-auto max-w-7xl py-12">
        <DatabaseGrid items={items} basePath="/characters" facetLabel="Role" />
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { LogOut, Newspaper, BookOpen, Car, Users, MapPin, GalleryHorizontalEnd } from "lucide-react";
import { useAdminAuth } from "./AdminAuth";
import { EntityManager, type FieldDef, type ManagedRecord } from "./EntityManager";
import { cn } from "@/lib/utils";

interface TabConfig {
  key: string;
  label: string;
  table: string;
  Icon: typeof Newspaper;
  fields: FieldDef[];
  data: ManagedRecord[];
}

const STATUS_FIELD: FieldDef = { key: "status", label: "Verification", type: "status" };
const IMAGES_FIELD: FieldDef = { key: "images", label: "Images", type: "images" };

export function AdminDashboard({
  news,
  guides,
  vehicles,
  characters,
  locations,
  carousel,
}: {
  news: ManagedRecord[];
  guides: ManagedRecord[];
  vehicles: ManagedRecord[];
  characters: ManagedRecord[];
  locations: ManagedRecord[];
  carousel: ManagedRecord[];
}) {
  const { email, demo, signOut } = useAdminAuth();

  const tabs: TabConfig[] = [
    {
      key: "news",
      label: "Articles",
      table: "news",
      Icon: Newspaper,
      data: news,
      fields: [
        { key: "title", label: "Title", type: "text", required: true },
        { key: "excerpt", label: "Excerpt", type: "textarea" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "category", label: "Category", type: "text" },
        { key: "author", label: "Author", type: "text" },
        { key: "readMinutes", label: "Read minutes", type: "number" },
        { key: "trending", label: "Trending", type: "boolean" },
        STATUS_FIELD,
        IMAGES_FIELD,
      ],
    },
    {
      key: "guides",
      label: "Guides",
      table: "guides",
      Icon: BookOpen,
      data: guides,
      fields: [
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "category", label: "Category", type: "text" },
        { key: "difficulty", label: "Difficulty", type: "text" },
        { key: "featured", label: "Featured", type: "boolean" },
        STATUS_FIELD,
        IMAGES_FIELD,
      ],
    },
    {
      key: "vehicles",
      label: "Vehicles",
      table: "vehicles",
      Icon: Car,
      data: vehicles,
      fields: [
        { key: "title", label: "Title", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "class", label: "Class", type: "text" },
        { key: "manufacturer", label: "Manufacturer", type: "text" },
        { key: "topSpeed", label: "Top speed (mph)", type: "number" },
        STATUS_FIELD,
        IMAGES_FIELD,
      ],
    },
    {
      key: "characters",
      label: "Characters",
      table: "characters",
      Icon: Users,
      data: characters,
      fields: [
        { key: "title", label: "Name", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "role", label: "Role", type: "text" },
        { key: "affiliation", label: "Affiliation", type: "text" },
        { key: "voiceActor", label: "Voice actor", type: "text" },
        STATUS_FIELD,
        IMAGES_FIELD,
      ],
    },
    {
      key: "locations",
      label: "Locations",
      table: "locations",
      Icon: MapPin,
      data: locations,
      fields: [
        { key: "title", label: "Name", type: "text", required: true },
        { key: "description", label: "Description", type: "textarea" },
        { key: "body", label: "Body", type: "textarea" },
        { key: "region", label: "Region", type: "text" },
        { key: "type", label: "Type", type: "text" },
        STATUS_FIELD,
        IMAGES_FIELD,
      ],
    },
    {
      key: "carousel",
      label: "Carousel",
      table: "carousel_items",
      Icon: GalleryHorizontalEnd,
      data: carousel,
      fields: [
        { key: "title", label: "Title", type: "text", required: true },
        { key: "category", label: "Category", type: "text" },
        { key: "image", label: "Image (seed or URL)", type: "text" },
        { key: "href", label: "Read-more link", type: "text" },
        { key: "date", label: "Date (YYYY-MM-DD)", type: "text" },
        { key: "order", label: "Order", type: "number" },
        STATUS_FIELD,
        { key: "active", label: "Active", type: "boolean" },
      ],
    },
  ];

  const [active, setActive] = useState(tabs[0].key);
  const current = tabs.find((t) => t.key === active) ?? tabs[0];

  return (
    <div className="section-pad mx-auto max-w-7xl py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-black">Control Room</h1>
          <p className="text-sm text-faint">
            {demo ? "Demo mode — changes are session-only" : `Signed in as ${email}`}
          </p>
        </div>
        <button onClick={signOut} className="btn-ghost w-fit text-sm">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const isActive = t.key === active;
          return (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition",
                isActive
                  ? "border-neon-pink bg-neon-pink/15 text-neon-pink"
                  : "border-white/10 text-muted hover:border-white/25 hover:text-foreground",
              )}
            >
              <t.Icon className="h-4 w-4" /> {t.label}
            </button>
          );
        })}
      </div>

      <EntityManager
        key={current.key}
        title={current.label}
        table={current.table}
        fields={current.fields}
        initial={current.data}
      />
    </div>
  );
}

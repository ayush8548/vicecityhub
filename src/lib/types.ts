// ===========================================================================
// ViceCityHub — shared domain types
// ===========================================================================

export type VerificationStatus = "confirmed" | "trailer_inferred" | "speculation";

export interface VerificationMeta {
  label: string;
  short: string;
  description: string;
  /** tailwind-friendly accent token name */
  tone: "cyan" | "purple" | "pink";
}

export const VERIFICATION: Record<VerificationStatus, VerificationMeta> = {
  confirmed: {
    label: "Confirmed",
    short: "Confirmed",
    description: "Officially confirmed by Rockstar Games.",
    tone: "cyan",
  },
  trailer_inferred: {
    label: "Trailer Inferred",
    short: "Trailer",
    description: "Derived from official trailers and screenshots.",
    tone: "purple",
  },
  speculation: {
    label: "Speculation",
    short: "Rumor",
    description: "Community speculation — not officially verified.",
    tone: "pink",
  },
};

interface BaseEntity {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Long-form body, markdown-ish plain text. */
  body?: string;
  images: string[];
  status: VerificationStatus;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface NewsArticle extends BaseEntity {
  category: string;
  author: string;
  excerpt: string;
  readMinutes: number;
  trending: boolean;
}

export interface Guide extends BaseEntity {
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  featured: boolean;
}

export interface Vehicle extends BaseEntity {
  class: string; // Super, Sports, Muscle, Motorcycle, etc.
  topSpeed: number; // mph
  manufacturer: string;
}

export interface Character extends BaseEntity {
  role: string;
  affiliation: string;
  voiceActor?: string;
}

export interface Location extends BaseEntity {
  region: string;
  type: string; // City, Beach, Landmark, etc.
  coordinates?: { x: number; y: number }; // 0-100 percentage on interactive map
}

export interface CarouselItem {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string; // ISO
  href: string;
  status: VerificationStatus;
  order: number;
  active: boolean;
}

export type EntityKind =
  | "news"
  | "guides"
  | "vehicles"
  | "characters"
  | "locations";

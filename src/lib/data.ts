// ===========================================================================
// Data-access layer.
// Reads from Supabase when configured; otherwise falls back to seeded mock
// data so the site runs with zero setup. Every page imports from here only.
// ===========================================================================

import { createServerSupabase } from "./supabase/server";
import {
  NEWS,
  GUIDES,
  VEHICLES,
  CHARACTERS,
  LOCATIONS,
  CAROUSEL,
} from "./mock-data";
import type {
  NewsArticle,
  Guide,
  Vehicle,
  Character,
  Location,
  CarouselItem,
} from "./types";

const byNewest = <T extends { createdAt: string }>(a: T, b: T) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

// ---- Generic helper: try Supabase table, fall back to mock --------------
async function fromTable<T>(table: string, fallback: T[]): Promise<T[]> {
  try {
    const supabase = await createServerSupabase();
    if (!supabase) return [...fallback];
    const { data, error } = await supabase.from(table).select("*");
    if (error || !data) return [...fallback];
    // Map snake_case columns to our camelCase shape generically.
    return data.map((row: Record<string, unknown>) => mapRow<T>(row));
  } catch {
    return [...fallback];
  }
}

function mapRow<T>(row: Record<string, unknown>): T {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    const camel = k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
    out[camel] = v;
  }
  return out as T;
}

// ---- News ---------------------------------------------------------------
export async function getNews(): Promise<NewsArticle[]> {
  return (await fromTable<NewsArticle>("news", NEWS)).sort(byNewest);
}
export async function getTrendingNews(limit = 4): Promise<NewsArticle[]> {
  const all = await getNews();
  const trending = all.filter((n) => n.trending);
  return (trending.length ? trending : all).slice(0, limit);
}
export async function getNewsBySlug(slug: string) {
  return (await getNews()).find((n) => n.slug === slug) ?? null;
}

// ---- Guides -------------------------------------------------------------
export async function getGuides(): Promise<Guide[]> {
  return (await fromTable<Guide>("guides", GUIDES)).sort(byNewest);
}
export async function getFeaturedGuides(limit = 3): Promise<Guide[]> {
  const all = await getGuides();
  const featured = all.filter((g) => g.featured);
  return (featured.length ? featured : all).slice(0, limit);
}
export async function getGuideBySlug(slug: string) {
  return (await getGuides()).find((g) => g.slug === slug) ?? null;
}

// ---- Vehicles -----------------------------------------------------------
export async function getVehicles(): Promise<Vehicle[]> {
  return (await fromTable<Vehicle>("vehicles", VEHICLES)).sort(byNewest);
}
export async function getVehicleBySlug(slug: string) {
  return (await getVehicles()).find((v) => v.slug === slug) ?? null;
}

// ---- Characters ---------------------------------------------------------
export async function getCharacters(): Promise<Character[]> {
  return (await fromTable<Character>("characters", CHARACTERS)).sort(byNewest);
}
export async function getCharacterBySlug(slug: string) {
  return (await getCharacters()).find((c) => c.slug === slug) ?? null;
}

// ---- Locations ----------------------------------------------------------
export async function getLocations(): Promise<Location[]> {
  return (await fromTable<Location>("locations", LOCATIONS)).sort(byNewest);
}
export async function getLocationBySlug(slug: string) {
  return (await getLocations()).find((l) => l.slug === slug) ?? null;
}

// ---- Carousel -----------------------------------------------------------
export async function getCarousel(): Promise<CarouselItem[]> {
  const items = await fromTable<CarouselItem>("carousel_items", CAROUSEL);
  return items
    .filter((c) => c.active)
    .sort((a, b) => a.order - b.order);
}

/** All carousel items (incl. inactive) — for the admin console. */
export async function getCarouselAll(): Promise<CarouselItem[]> {
  const items = await fromTable<CarouselItem>("carousel_items", CAROUSEL);
  return items.sort((a, b) => a.order - b.order);
}

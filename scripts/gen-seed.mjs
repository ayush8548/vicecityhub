// Generates supabase/seed.sql from the canonical content in src/lib/mock-data.ts
// so the live database seed always matches what the site ships with offline.
//
//   node scripts/gen-seed.mjs   (Node >= 22; relies on native TS type-stripping)

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const data = await import("../src/lib/mock-data.ts");
const { NEWS, GUIDES, VEHICLES, CHARACTERS, LOCATIONS, CAROUSEL } = data;

// --- value -> SQL literal --------------------------------------------------
function lit(v) {
  if (v === null || v === undefined) return "NULL";
  if (Array.isArray(v)) {
    if (v.length === 0) return "'{}'";
    return `ARRAY[${v.map((s) => sq(String(s))).join(", ")}]::text[]`;
  }
  if (typeof v === "object") return `${sq(JSON.stringify(v))}::jsonb`;
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  return sq(String(v));
}
const sq = (s) => `'${s.replace(/'/g, "''")}'`;

function insertBlock(table, cols, fieldMap, rows, { conflict, wipe } = {}) {
  const colSql = cols.map((c) => (c === "order" ? `"order"` : c)).join(", ");
  const lines = [];
  if (wipe) lines.push(`delete from ${table};`);
  const values = rows
    .map((r) => `  (${cols.map((c) => lit(r[fieldMap[c]])).join(", ")})`)
    .join(",\n");
  let stmt = `insert into ${table} (${colSql}) values\n${values}`;
  if (conflict) {
    // Upsert: re-running the seed refreshes every existing row (except the
    // conflict key itself), so content/image edits propagate on re-run.
    const updates = cols
      // Never overwrite `images` on re-run — preserves photos uploaded via /admin.
      .filter((c) => c !== conflict && c !== "images")
      .map((c) => {
        const col = c === "order" ? `"order"` : c;
        return `${col} = excluded.${col}`;
      })
      .join(", ");
    stmt += `\non conflict (${conflict}) do update set ${updates}`;
  }
  lines.push(stmt + ";");
  return `-- ${table} (${rows.length})\n${lines.join("\n")}\n`;
}

// column (snake) -> source field (camel)
const id = (c) => c;
const newsMap = { ...mapId(["slug", "title", "description", "body", "excerpt", "category", "author", "images", "status"]), read_minutes: "readMinutes", trending: "trending", created_at: "createdAt", updated_at: "updatedAt" };
const guidesMap = { ...mapId(["slug", "title", "description", "body", "category", "difficulty", "featured", "images", "status"]), created_at: "createdAt", updated_at: "updatedAt" };
const vehiclesMap = { ...mapId(["slug", "title", "description", "body", "class", "manufacturer", "images", "status"]), top_speed: "topSpeed", created_at: "createdAt", updated_at: "updatedAt" };
const charsMap = { ...mapId(["slug", "title", "description", "body", "role", "affiliation", "images", "status"]), voice_actor: "voiceActor", created_at: "createdAt", updated_at: "updatedAt" };
const locsMap = { ...mapId(["slug", "title", "description", "body", "region", "type", "coordinates", "images", "status"]), created_at: "createdAt", updated_at: "updatedAt" };
const carMap = mapId(["title", "category", "image", "href", "date", "order", "active", "status"]);

function mapId(arr) {
  return Object.fromEntries(arr.map((c) => [c, id(c)]));
}

const out = [
  "-- ===========================================================================",
  "-- ViceCityHub seed data — GENERATED from src/lib/mock-data.ts",
  "-- Regenerate with: node scripts/gen-seed.mjs",
  "-- Safe to re-run: content tables upsert by slug; carousel is rebuilt.",
  "-- ===========================================================================",
  "",
  insertBlock("news", Object.keys(newsMap), newsMap, NEWS, { conflict: "slug" }),
  insertBlock("guides", Object.keys(guidesMap), guidesMap, GUIDES, { conflict: "slug" }),
  insertBlock("vehicles", Object.keys(vehiclesMap), vehiclesMap, VEHICLES, { conflict: "slug" }),
  insertBlock("characters", Object.keys(charsMap), charsMap, CHARACTERS, { conflict: "slug" }),
  insertBlock("locations", Object.keys(locsMap), locsMap, LOCATIONS, { conflict: "slug" }),
  insertBlock("carousel_items", Object.keys(carMap), carMap, CAROUSEL, { wipe: true }),
].join("\n");

const target = join(here, "..", "supabase", "seed.sql");
writeFileSync(target, out);
console.log(`Wrote ${target}`);

// Distinct color per region type — used by the map markers, zone outlines,
// labels, and the sidebar legend so everything stays consistent.
export const REGION_COLORS: Record<string, string> = {
  City: "#ff2d95", // neon pink
  Islands: "#22d3ee", // cyan
  Wetlands: "#22c55e", // green
  Town: "#ffb020", // gold
  Wilderness: "#a855f7", // purple
  Beach: "#00f0ff", // aqua
  Landmark: "#ffd166", // amber
};

export function regionColor(type: string): string {
  return REGION_COLORS[type] ?? "#ff6a3d";
}

// Approximate zone radius (meters) by type, for the boundary circles.
export const REGION_RADIUS: Record<string, number> = {
  City: 16000,
  Islands: 30000,
  Wetlands: 44000,
  Town: 14000,
  Wilderness: 40000,
};

export function regionRadius(type: string): number {
  return REGION_RADIUS[type] ?? 18000;
}

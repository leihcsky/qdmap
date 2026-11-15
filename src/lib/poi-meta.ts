import type { Elevation, Poi, PoiType } from "./types";

export const POI_TYPE_META: Record<
  PoiType,
  { label: string; color: string; colorClass: string; ringClass: string }
> = {
  crystal_monument: {
    label: "Crystal Monument",
    color: "#3b82f6",
    colorClass: "bg-blue-500",
    ringClass: "ring-blue-400",
  },
  wing_altar: {
    label: "Wing Altar",
    color: "#a855f7",
    colorClass: "bg-purple-500",
    ringClass: "ring-purple-400",
  },
  wind_gem: {
    label: "Wind Gem",
    color: "#22d3ee",
    colorClass: "bg-cyan-400",
    ringClass: "ring-cyan-300",
  },
  possible_boss: {
    label: "Possible Boss",
    color: "#ef4444",
    colorClass: "bg-red-500",
    ringClass: "ring-red-400",
  },
  landmark: {
    label: "Landmark",
    color: "#9ca3af",
    colorClass: "bg-gray-400",
    ringClass: "ring-gray-300",
  },
  shortcut: {
    label: "Shortcut",
    color: "#22c55e",
    colorClass: "bg-green-500",
    ringClass: "ring-green-400",
  },
  boss_door: {
    label: "Boss Door",
    color: "#f97316",
    colorClass: "bg-orange-500",
    ringClass: "ring-orange-400",
  },
  shop_npc: {
    label: "Shop / NPC",
    color: "#f59e0b",
    colorClass: "bg-amber-500",
    ringClass: "ring-amber-400",
  },
  key_item: {
    label: "Key Item",
    color: "#eab308",
    colorClass: "bg-yellow-500",
    ringClass: "ring-yellow-400",
  },
};

export const ALL_POI_TYPES = Object.keys(POI_TYPE_META) as PoiType[];

/** Types shown by default — Possible Boss stays off to avoid spoilers. */
export const DEFAULT_VISIBLE_POI_TYPES: PoiType[] = ALL_POI_TYPES.filter(
  (t) => t !== "possible_boss",
);

export const ELEVATION_META: Record<Elevation, string> = {
  lower: "Lower",
  middle: "Middle",
  upper: "Upper",
};

export const ALL_ELEVATIONS = Object.keys(ELEVATION_META) as Elevation[];

export const STORAGE_KEY = "qd-map-checks-v1";

export function isMappedPoi(poi: Poi): boolean {
  return (
    poi.coordinateStatus === "verified" &&
    typeof poi.x === "number" &&
    typeof poi.y === "number"
  );
}

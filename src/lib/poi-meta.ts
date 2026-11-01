import type { PoiType } from "./types";

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
    color: "#ef4444",
    colorClass: "bg-red-500",
    ringClass: "ring-red-400",
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

export const STORAGE_KEY = "qd-map-checks-v1";

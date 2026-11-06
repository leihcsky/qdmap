export type PoiType =
  | "crystal_monument"
  | "wing_altar"
  | "landmark"
  | "shortcut"
  | "boss_door"
  | "shop_npc"
  | "key_item";

export type RegionStatus = "live" | "coming_soon";

export type SourceLink = {
  label: string;
  url: string;
};

export type Region = {
  id: string;
  name: string;
  mapImage: string;
  mapWidth: number;
  mapHeight: number;
  status: RegionStatus;
};

export type Poi = {
  id: string;
  regionId: string;
  type: PoiType;
  name: string;
  x: number;
  y: number;
  summary: string;
  howToFind: string;
  tips?: string;
  countsForWellTravelled: boolean;
  sources: SourceLink[];
};

export type PoisData = {
  regions: Region[];
  pois: Poi[];
};

export type BestFor = "clear_trash" | "boss" | "control" | "general";

/** Optional deep link into the homepage map tool. */
export type WeaponMapLink = {
  region?: string;
  poi?: string;
  type?: string;
  q?: string;
};

export type MeleeWeapon = {
  id: string;
  name: string;
  tier: number;
  evolvesTo: string | null;
  materials: string[];
  notes: string;
  sources: SourceLink[];
  mapLink?: WeaponMapLink | null;
};

export type ThrowingWeapon = {
  id: string;
  name: string;
  charges: number | null;
  rechargeNote: string;
  bestFor: BestFor[];
  notes: string;
  sources: SourceLink[];
  mapLink?: WeaponMapLink | null;
};

export type WeaponsData = {
  meleeEvolution: MeleeWeapon[];
  throwing: ThrowingWeapon[];
};

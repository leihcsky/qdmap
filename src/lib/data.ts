import poisJson from "../../data/pois.json";
import weaponsJson from "../../data/weapons.json";
import type { PoisData, WeaponsData } from "./types";

export const poisData = poisJson as PoisData;
export const weaponsData = weaponsJson as WeaponsData;

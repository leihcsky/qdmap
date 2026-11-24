import { isMappedPoi } from "./poi-meta";
import type { Poi } from "./types";

/** Suggest the next Crystal Monument to visit in the same region. */
export function findNextMonument(
  pois: Poi[],
  regionId: string,
  selected: Poi | null,
  checked: Set<string>,
): Poi | null {
  const candidates = pois.filter(
    (p) =>
      p.regionId === regionId &&
      p.type === "crystal_monument" &&
      p.id !== selected?.id &&
      !checked.has(p.id),
  );
  if (!candidates.length) return null;

  if (
    selected &&
    isMappedPoi(selected) &&
    typeof selected.x === "number" &&
    typeof selected.y === "number"
  ) {
    const mapped = candidates.filter(isMappedPoi);
    if (mapped.length) {
      let best = mapped[0];
      let bestDist = Number.POSITIVE_INFINITY;
      for (const p of mapped) {
        const dx = (p.x as number) - selected.x;
        const dy = (p.y as number) - selected.y;
        const dist = dx * dx + dy * dy;
        if (dist < bestDist) {
          bestDist = dist;
          best = p;
        }
      }
      return best;
    }
  }

  const mappedFirst = candidates.find(isMappedPoi);
  return mappedFirst ?? candidates[0];
}

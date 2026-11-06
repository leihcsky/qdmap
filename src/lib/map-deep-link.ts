import { ALL_POI_TYPES } from "./poi-meta";
import type { PoiType } from "./types";

export type MapDeepLink = {
  region?: string;
  poi?: string;
  types?: PoiType[];
  q?: string;
};

function isPoiType(value: string): value is PoiType {
  return (ALL_POI_TYPES as string[]).includes(value);
}

/** Parse homepage map deep-link query params. */
export function parseMapDeepLink(
  params: URLSearchParams | { get: (key: string) => string | null },
): MapDeepLink {
  const region = params.get("region")?.trim() || undefined;
  const poi = params.get("poi")?.trim() || undefined;
  const q = params.get("q")?.trim() || undefined;
  const rawType = params.get("type")?.trim();

  let types: PoiType[] | undefined;
  if (rawType) {
    const parsed = rawType
      .split(",")
      .map((part) => part.trim())
      .filter(isPoiType);
    if (parsed.length) types = parsed;
  }

  return { region, poi, types, q };
}

/** Build a shareable map URL path + query (defaults to `/`). */
export function buildMapDeepLink(
  link: MapDeepLink,
  pathname = "/",
): string {
  const params = new URLSearchParams();
  if (link.region) params.set("region", link.region);
  if (link.poi) params.set("poi", link.poi);
  if (link.types?.length) params.set("type", link.types.join(","));
  if (link.q?.trim()) params.set("q", link.q.trim());

  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

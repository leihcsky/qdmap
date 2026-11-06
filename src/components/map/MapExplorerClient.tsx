"use client";

import { Suspense } from "react";
import type { Poi, Region } from "@/lib/types";
import { MapExplorer } from "./MapExplorer";

type MapExplorerClientProps = {
  regions: Region[];
  pois: Poi[];
};

function MapExplorerFallback() {
  return (
    <div
      id="map-tool"
      className="flex min-h-[320px] items-center justify-center border-stone-800 px-4 py-10 text-sm text-stone-500"
    >
      Loading map…
    </div>
  );
}

/** Suspense boundary required for useSearchParams in the App Router. */
export function MapExplorerClient({ regions, pois }: MapExplorerClientProps) {
  return (
    <Suspense fallback={<MapExplorerFallback />}>
      <MapExplorer regions={regions} pois={pois} />
    </Suspense>
  );
}

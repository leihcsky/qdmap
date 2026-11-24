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
      className="flex min-h-[55vh] flex-col bg-[#12100e] lg:min-h-[60vh]"
      aria-busy="true"
      aria-label="Loading map"
    >
      <div className="h-10 animate-pulse border-b border-stone-800 bg-stone-900/80" />
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/maps/neasied.svg"
          alt=""
          className="absolute inset-0 h-full w-full object-contain opacity-30"
          aria-hidden
        />
        <div className="relative z-10 rounded-md border border-stone-700 bg-stone-950/80 px-4 py-2 text-xs text-stone-400">
          Preparing map…
        </div>
      </div>
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

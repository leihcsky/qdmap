"use client";

import { useEffect, useMemo, useState } from "react";
import type { Poi, PoiType, Region } from "@/lib/types";
import { ALL_POI_TYPES, POI_TYPE_META } from "@/lib/poi-meta";
import { loadCheckedIds, saveCheckedIds } from "@/lib/storage";

type MapExplorerProps = {
  regions: Region[];
  pois: Poi[];
};

export function MapExplorer({ regions, pois }: MapExplorerProps) {
  const liveRegions = regions.filter((r) => r.status === "live");
  const availableTypes = useMemo(
    () => ALL_POI_TYPES.filter((type) => pois.some((p) => p.type === type)),
    [pois],
  );
  const [regionId, setRegionId] = useState(liveRegions[0]?.id ?? "");
  const [selectedTypes, setSelectedTypes] = useState<Set<PoiType>>(
    () => new Set(ALL_POI_TYPES),
  );
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setChecked(loadCheckedIds());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCheckedIds(checked);
  }, [checked, hydrated]);

  const region = regions.find((r) => r.id === regionId) ?? liveRegions[0];

  const regionPois = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pois.filter((p) => {
      if (p.regionId !== region?.id) return false;
      if (!selectedTypes.has(p.type)) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [pois, region?.id, selectedTypes, query]);

  const selected = pois.find((p) => p.id === selectedId) ?? null;

  const wellTravelled = useMemo(() => {
    const trackable = pois.filter(
      (p) =>
        p.countsForWellTravelled &&
        (p.type === "crystal_monument" || p.type === "wing_altar"),
    );
    const done = trackable.filter((p) => checked.has(p.id)).length;
    return { done, total: trackable.length };
  }, [pois, checked]);

  function toggleType(type: PoiType) {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  function toggleActivated(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const hasMapArt = Boolean(region?.mapImage);

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:gap-0 lg:overflow-hidden lg:px-0 lg:py-0">
      <aside className="flex w-full shrink-0 flex-col gap-4 border-stone-800 lg:w-80 lg:overflow-y-auto lg:border-r lg:p-4">
        <div
          className="rounded-lg border border-violet-900/50 bg-violet-950/30 px-3 py-2"
          data-analytics="well-travelled"
        >
          <p className="text-xs uppercase tracking-wider text-violet-300/80">
            Well Travelled checklist
          </p>
          <p className="mt-1 font-mono text-lg text-violet-100">
            {wellTravelled.done} / {wellTravelled.total}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-800">
            <div
              className="h-full rounded-full bg-violet-500 transition-all"
              style={{
                width: `${
                  wellTravelled.total
                    ? (wellTravelled.done / wellTravelled.total) * 100
                    : 0
                }%`,
              }}
            />
          </div>
        </div>

        <div role="tablist" aria-label="Regions" className="flex flex-wrap gap-1.5">
          {liveRegions.map((r) => (
            <button
              key={r.id}
              type="button"
              role="tab"
              aria-selected={regionId === r.id}
              onClick={() => {
                setRegionId(r.id);
                setSelectedId(null);
              }}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition sm:text-sm ${
                regionId === r.id
                  ? "bg-amber-900/60 text-amber-100 ring-1 ring-amber-700/60"
                  : "bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-stone-200"
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="sr-only">Search markers</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name…"
            className="w-full rounded-md border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200 placeholder:text-stone-600 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
          />
        </label>

        <fieldset>
          <legend className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
            Filter types
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {availableTypes.map((type) => {
              const meta = POI_TYPE_META[type];
              const on = selectedTypes.has(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleType(type)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs transition ${
                    on
                      ? "border-stone-600 bg-stone-900 text-stone-200"
                      : "border-stone-800 bg-transparent text-stone-600"
                  }`}
                >
                  <span
                    className="inline-block size-2 rounded-full"
                    style={{ backgroundColor: on ? meta.color : "#44403c" }}
                    aria-hidden
                  />
                  {meta.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex min-h-0 flex-1 flex-col">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
            Markers ({regionPois.length})
          </h2>
          <ul className="max-h-64 space-y-1 overflow-y-auto lg:max-h-none lg:flex-1">
            {regionPois.length === 0 && (
              <li className="rounded-md border border-dashed border-stone-800 px-3 py-4 text-sm text-stone-500">
                No markers match this filter.
              </li>
            )}
            {regionPois.map((poi) => {
              const meta = POI_TYPE_META[poi.type];
              const isSelected = selectedId === poi.id;
              const isChecked = checked.has(poi.id);
              return (
                <li key={poi.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(poi.id)}
                    className={`flex w-full items-start gap-2 rounded-md border px-2.5 py-2 text-left text-sm transition ${
                      isSelected
                        ? "border-amber-700/70 bg-amber-950/40"
                        : "border-transparent bg-stone-950/50 hover:border-stone-700 hover:bg-stone-900"
                    }`}
                  >
                    <span
                      className="mt-1.5 size-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: meta.color }}
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-stone-100">
                        {poi.name}
                        {isChecked ? (
                          <span className="ml-1.5 text-xs text-emerald-400">✓</span>
                        ) : null}
                      </span>
                      <span className="block text-xs text-stone-500">{meta.label}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-0 lg:flex-row lg:gap-0">
        <div className="relative min-h-[280px] flex-1 overflow-auto border-y border-stone-800 bg-[#12100e] lg:border-y-0">
          {!hasMapArt ? (
            <div className="flex h-full min-h-[280px] items-center justify-center p-6 text-center text-stone-500">
              Use the marker list while overview art loads for this region.
            </div>
          ) : (
            <div
              className="relative mx-auto w-full"
              style={{
                maxWidth: region.mapWidth,
                aspectRatio: `${region.mapWidth} / ${region.mapHeight}`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={region.mapImage}
                alt={`${region.name} overview map`}
                className="block h-auto w-full select-none"
                draggable={false}
              />
              {regionPois.map((poi) => {
                const meta = POI_TYPE_META[poi.type];
                const isSelected = selectedId === poi.id;
                const isChecked = checked.has(poi.id);
                return (
                  <button
                    key={poi.id}
                    type="button"
                    title={poi.name}
                    aria-label={`${poi.name}, ${meta.label}`}
                    onClick={() => setSelectedId(poi.id)}
                    className={`group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                      isSelected ? "z-20 scale-125" : "hover:scale-110"
                    }`}
                    style={{
                      left: `${poi.x * 100}%`,
                      top: `${poi.y * 100}%`,
                    }}
                  >
                    <span
                      className={`block size-3.5 rounded-full border-2 shadow-md sm:size-4 ${
                        isSelected
                          ? "border-amber-200"
                          : isChecked
                            ? "border-emerald-300"
                            : "border-stone-950"
                      }`}
                      style={{ backgroundColor: meta.color }}
                    />
                    <span className="pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded bg-stone-950/95 px-1.5 py-0.5 text-[10px] text-stone-100 group-hover:block group-focus-visible:block">
                      {poi.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <DetailPanel
          poi={selected}
          regionName={region?.name}
          activated={selected ? checked.has(selected.id) : false}
          onToggleActivated={() => selected && toggleActivated(selected.id)}
          onClose={() => setSelectedId(null)}
        />
      </div>
    </div>
  );
}

function DetailPanel({
  poi,
  regionName,
  activated,
  onToggleActivated,
  onClose,
}: {
  poi: Poi | null;
  regionName?: string;
  activated: boolean;
  onToggleActivated: () => void;
  onClose: () => void;
}) {
  if (!poi) {
    return (
      <aside className="w-full shrink-0 border-t border-stone-800 bg-[#0e0c0b] p-4 text-sm text-stone-500 lg:w-80 lg:overflow-y-auto lg:border-l lg:border-t-0">
        Select a marker on the list or map to read how to find it.
      </aside>
    );
  }

  const meta = POI_TYPE_META[poi.type];

  return (
    <aside
      className="w-full shrink-0 border-t border-stone-800 bg-[#0e0c0b] p-4 lg:w-80 lg:overflow-y-auto lg:border-l lg:border-t-0"
      aria-live="polite"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="flex items-center gap-2 text-xs text-stone-500">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: meta.color }}
              aria-hidden
            />
            {meta.label}
            {regionName ? ` · ${regionName}` : null}
          </p>
          <h2 className="mt-1 font-display text-xl text-amber-50">{poi.name}</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded px-2 py-1 text-xs text-stone-500 hover:bg-stone-900 hover:text-stone-300"
          aria-label="Close detail"
        >
          Close
        </button>
      </div>

      <p className="text-sm text-stone-300">{poi.summary}</p>

      <section className="mt-4">
        <h3 className="text-xs font-medium uppercase tracking-wider text-stone-500">
          How to find
        </h3>
        <p className="mt-1 text-sm text-stone-300">{poi.howToFind}</p>
      </section>

      {poi.tips ? (
        <section className="mt-4">
          <h3 className="text-xs font-medium uppercase tracking-wider text-stone-500">
            Tips
          </h3>
          <p className="mt-1 text-sm text-stone-400">{poi.tips}</p>
        </section>
      ) : null}

      <label className="mt-5 flex cursor-pointer items-center gap-2 rounded-md border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-200">
        <input
          type="checkbox"
          checked={activated}
          onChange={onToggleActivated}
          className="size-4 rounded border-stone-600 bg-stone-900 text-violet-500 focus:ring-violet-600"
        />
        Mark as found
      </label>
    </aside>
  );
}

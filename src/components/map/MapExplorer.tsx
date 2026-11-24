"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Elevation, Poi, PoiType, Region } from "@/lib/types";
import {
  ALL_ELEVATIONS,
  ALL_POI_TYPES,
  DEFAULT_VISIBLE_POI_TYPES,
  ELEVATION_META,
  isMappedPoi,
  POI_TYPE_META,
} from "@/lib/poi-meta";
import { buildMapDeepLink, parseMapDeepLink } from "@/lib/map-deep-link";
import { findNextMonument } from "@/lib/map-next";
import { loadCheckedIds, saveCheckedIds } from "@/lib/storage";

type MapExplorerProps = {
  regions: Region[];
  pois: Poi[];
};

export function MapExplorer({ regions, pois }: MapExplorerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const liveRegions = regions.filter((r) => r.status === "live");
  const availableTypes = useMemo(
    () => ALL_POI_TYPES.filter((type) => pois.some((p) => p.type === type)),
    [pois],
  );
  const [regionId, setRegionId] = useState(liveRegions[0]?.id ?? "");
  const [selectedTypes, setSelectedTypes] = useState<Set<PoiType>>(
    () => new Set(DEFAULT_VISIBLE_POI_TYPES),
  );
  const [elevationFilter, setElevationFilter] = useState<Elevation | "all">(
    "all",
  );
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const skipUrlSync = useRef(false);
  const deepLinkKey = searchParams.toString();

  const showBosses = selectedTypes.has("possible_boss");

  useEffect(() => {
    setChecked(loadCheckedIds());
    setHydrated(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setFiltersOpen(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveCheckedIds(checked);
  }, [checked, hydrated]);

  useEffect(() => {
    const link = parseMapDeepLink(searchParams);
    const targetPoi = link.poi
      ? pois.find((p) => p.id === link.poi) ?? null
      : null;

    skipUrlSync.current = true;

    if (targetPoi) {
      if (liveRegions.some((r) => r.id === targetPoi.regionId)) {
        setRegionId(targetPoi.regionId);
      }

      if (link.types?.length) {
        const next = new Set(link.types);
        next.add(targetPoi.type);
        setSelectedTypes(next);
      } else {
        const next = new Set(DEFAULT_VISIBLE_POI_TYPES);
        next.add(targetPoi.type);
        setSelectedTypes(next);
      }

      setSelectedId(targetPoi.id);
    } else {
      if (link.region && liveRegions.some((r) => r.id === link.region)) {
        setRegionId(link.region);
      }
      if (link.types?.length) {
        setSelectedTypes(new Set(link.types));
      } else if (!link.poi && !link.region && !link.q) {
        setSelectedTypes(new Set(DEFAULT_VISIBLE_POI_TYPES));
      }
      setSelectedId(null);
    }

    const hasLink = Boolean(
      link.poi || link.region || link.types?.length || link.q,
    );

    if (typeof link.q === "string") {
      setQuery(link.q);
    } else if (!hasLink) {
      setQuery("");
      setElevationFilter("all");
    }

    if (hasLink) {
      requestAnimationFrame(() => {
        document
          .getElementById("map-tool")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    queueMicrotask(() => {
      skipUrlSync.current = false;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deepLinkKey, pois, regions]);

  useEffect(() => {
    if (!hydrated || skipUrlSync.current) return;

    const defaultRegion = liveRegions[0]?.id ?? "";
    const defaultVisible = availableTypes.filter((t) =>
      DEFAULT_VISIBLE_POI_TYPES.includes(t),
    );
    const typesArr = availableTypes.filter((t) => selectedTypes.has(t));
    const matchesDefault =
      typesArr.length === defaultVisible.length &&
      defaultVisible.every((t) => selectedTypes.has(t));
    const interesting =
      Boolean(selectedId) ||
      Boolean(query.trim()) ||
      !matchesDefault ||
      (Boolean(regionId) && regionId !== defaultRegion);

    const next = interesting
      ? buildMapDeepLink({
          region: regionId || undefined,
          poi: selectedId ?? undefined,
          types: matchesDefault ? undefined : typesArr,
          q: query.trim() || undefined,
        })
      : "/";

    const current = `${window.location.pathname}${window.location.search}`;
    if (current === next) return;

    router.replace(next, { scroll: false });
  }, [
    availableTypes,
    hydrated,
    liveRegions,
    query,
    regionId,
    router,
    selectedId,
    selectedTypes,
  ]);

  useEffect(() => {
    if (!selectedId) return;
    const timer = window.setTimeout(() => {
      document
        .getElementById(`poi-list-${selectedId}`)
        ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
      document
        .getElementById("map-detail-panel")
        ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [selectedId]);

  const region = regions.find((r) => r.id === regionId) ?? liveRegions[0];

  const regionPois = useMemo(() => {
    const q = query.trim().toLowerCase();
    return pois.filter((p) => {
      if (p.regionId !== region?.id) return false;
      if (!selectedTypes.has(p.type)) return false;
      if (
        elevationFilter !== "all" &&
        (p.elevation ?? null) !== elevationFilter
      ) {
        return false;
      }
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [pois, region?.id, selectedTypes, query, elevationFilter]);

  const mappedRegionPois = useMemo(
    () => regionPois.filter(isMappedPoi),
    [regionPois],
  );

  const selected = pois.find((p) => p.id === selectedId) ?? null;

  const wellTravelled = useMemo(() => {
    const trackable = pois.filter(
      (p) =>
        p.countsForWellTravelled &&
        (p.type === "crystal_monument" || p.type === "wing_altar"),
    );
    const done = trackable.filter((p) => checked.has(p.id)).length;
    return { done, total: trackable.length, remaining: trackable.length - done };
  }, [pois, checked]);

  const nextMonument = useMemo(
    () =>
      findNextMonument(pois, region?.id ?? "", selected, checked),
    [pois, region?.id, selected, checked],
  );

  function toggleType(type: PoiType) {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  }

  function setShowBosses(on: boolean) {
    setSelectedTypes((prev) => {
      const next = new Set(prev);
      if (on) next.add("possible_boss");
      else next.delete("possible_boss");
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
  const filterTypes = availableTypes.filter((t) => t !== "possible_boss");

  return (
    <div id="map-tool" className="flex flex-1 flex-col">
      {/* Progress above the map tool (P1) */}
      <div
        className="border-b border-stone-800 bg-violet-950/20 px-4 py-2 sm:px-6 lg:px-4"
        data-analytics="well-travelled"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-violet-200/90">
            Well Travelled{" "}
            <span className="font-mono text-violet-100">
              {wellTravelled.done}/{wellTravelled.total}
            </span>
            {wellTravelled.remaining > 0 ? (
              <span className="ml-2 text-stone-500">
                · {wellTravelled.remaining} left
              </span>
            ) : (
              <span className="ml-2 text-emerald-400">· complete on this list</span>
            )}
          </p>
          <button
            type="button"
            className="text-xs text-amber-600 underline-offset-2 hover:underline lg:hidden"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? "Hide filters" : "Filters & list"}
          </button>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-800">
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

      {/* Always-visible region switch on mobile so filters can stay collapsed */}
      <div className="flex items-center gap-2 border-b border-stone-800 px-4 py-2 lg:hidden">
        <label className="flex min-w-0 flex-1 items-center gap-2 text-sm">
          <span className="shrink-0 text-xs text-stone-500">Region</span>
          <select
            value={regionId}
            onChange={(e) => {
              setRegionId(e.target.value);
              setSelectedId(null);
            }}
            className="min-w-0 flex-1 rounded-md border border-stone-700 bg-stone-950 px-2 py-1.5 text-stone-200 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
          >
            {liveRegions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row lg:overflow-hidden">
        {/* Map / checklist first on mobile */}
        <div className="order-1 flex min-h-[55vh] min-w-0 flex-1 flex-col lg:order-2 lg:min-h-[60vh] lg:flex-row">
          <div className="relative min-h-[55vh] flex-1 overflow-auto bg-[#12100e] lg:min-h-[60vh]">
            {!hasMapArt ? (
              <div className="flex h-full min-h-[55vh] flex-col gap-3 p-4 sm:p-5 lg:min-h-[60vh]">
                <p className="text-sm text-stone-300">
                  {region?.name ?? "Region"} location checklist
                </p>
                <p className="text-xs text-stone-500">
                  Tap a name to open How to find, then Mark as found when you clear
                  it in-game.
                </p>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {regionPois.length === 0 ? (
                    <li className="text-sm text-stone-500 sm:col-span-2">
                      No locations match the current filters.
                      {!showBosses
                        ? " Open Filters if you need Possible Boss entries."
                        : null}
                    </li>
                  ) : (
                    regionPois.map((poi) => (
                      <LocationRow
                        key={poi.id}
                        poi={poi}
                        selected={selectedId === poi.id}
                        checked={checked.has(poi.id)}
                        onSelect={() => setSelectedId(poi.id)}
                      />
                    ))
                  )}
                </ul>
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
                  fetchPriority="high"
                />
                {mappedRegionPois.map((poi) => {
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
                        left: `${(poi.x as number) * 100}%`,
                        top: `${(poi.y as number) * 100}%`,
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
            nextMonument={nextMonument}
            wellTravelledRemaining={wellTravelled.remaining}
            onSelectNext={(id) => setSelectedId(id)}
          />
        </div>

        {/* Filters / list — collapsed on phone by default */}
        <aside
          className={`order-2 w-full shrink-0 border-stone-800 lg:order-1 lg:flex lg:w-80 lg:flex-col lg:overflow-y-auto lg:border-r ${
            filtersOpen ? "flex flex-col gap-3 border-t p-4" : "hidden lg:flex"
          } lg:gap-4 lg:border-t-0 lg:p-4`}
        >
          <label className="block text-sm">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-stone-500">
              Region
            </span>
            <select
              value={regionId}
              onChange={(e) => {
                setRegionId(e.target.value);
                setSelectedId(null);
              }}
              className="w-full rounded-md border border-stone-700 bg-stone-950 px-3 py-2 text-stone-200 focus:border-amber-700 focus:outline-none focus:ring-1 focus:ring-amber-700"
            >
              {liveRegions.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>

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
              {filterTypes.map((type) => {
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

          <fieldset>
            <legend className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
              Elevation
            </legend>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setElevationFilter("all")}
                aria-pressed={elevationFilter === "all"}
                className={`rounded-md border px-2 py-1 text-xs transition ${
                  elevationFilter === "all"
                    ? "border-stone-600 bg-stone-900 text-stone-200"
                    : "border-stone-800 bg-transparent text-stone-600"
                }`}
              >
                All
              </button>
              {ALL_ELEVATIONS.map((elev) => {
                const on = elevationFilter === elev;
                return (
                  <button
                    key={elev}
                    type="button"
                    onClick={() => setElevationFilter(elev)}
                    aria-pressed={on}
                    className={`rounded-md border px-2 py-1 text-xs transition ${
                      on
                        ? "border-stone-600 bg-stone-900 text-stone-200"
                        : "border-stone-800 bg-transparent text-stone-600"
                    }`}
                  >
                    {ELEVATION_META[elev]}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="flex cursor-pointer items-start gap-2 rounded-md border border-stone-800 bg-stone-950/60 px-3 py-2 text-xs text-stone-400">
            <input
              type="checkbox"
              checked={showBosses}
              onChange={(e) => setShowBosses(e.target.checked)}
              className="mt-0.5 size-4 rounded border-stone-600 bg-stone-900 text-red-600 focus:ring-red-700"
            />
            <span>
              <span className="block font-medium text-stone-300">
                Show possible bosses
              </span>
              <span className="mt-0.5 block text-stone-500">
                Off by default to reduce spoilers.
              </span>
            </span>
          </label>

          <div className="flex min-h-0 flex-1 flex-col">
            <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-stone-500">
              Locations ({regionPois.length})
            </h2>
            <ul className="max-h-56 space-y-1 overflow-y-auto lg:max-h-none lg:flex-1">
              {regionPois.length === 0 && (
                <li className="rounded-md border border-dashed border-stone-800 px-3 py-4 text-sm text-stone-500">
                  No locations match this filter.
                </li>
              )}
              {regionPois.map((poi) => (
                <li key={poi.id} id={`poi-list-${poi.id}`}>
                  <LocationRow
                    poi={poi}
                    selected={selectedId === poi.id}
                    checked={checked.has(poi.id)}
                    onSelect={() => setSelectedId(poi.id)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function LocationRow({
  poi,
  selected,
  checked,
  onSelect,
}: {
  poi: Poi;
  selected: boolean;
  checked: boolean;
  onSelect: () => void;
}) {
  const meta = POI_TYPE_META[poi.type];
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex w-full items-start gap-2 rounded-md border px-2.5 py-2 text-left text-sm transition ${
        selected
          ? "border-amber-700/70 bg-amber-950/40"
          : "border-stone-800 bg-stone-950/40 hover:border-stone-700 hover:bg-stone-900"
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
          {checked ? (
            <span className="ml-1.5 text-xs text-emerald-400">✓</span>
          ) : null}
        </span>
        <span className="mt-0.5 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-stone-500">
          <span>{meta.label}</span>
          {poi.elevation ? <span>{ELEVATION_META[poi.elevation]}</span> : null}
        </span>
      </span>
    </button>
  );
}

function DetailPanel({
  poi,
  regionName,
  activated,
  onToggleActivated,
  onClose,
  nextMonument,
  wellTravelledRemaining,
  onSelectNext,
}: {
  poi: Poi | null;
  regionName?: string;
  activated: boolean;
  onToggleActivated: () => void;
  onClose: () => void;
  nextMonument: Poi | null;
  wellTravelledRemaining: number;
  onSelectNext: (id: string) => void;
}) {
  if (!poi) {
    return (
      <aside
        id="map-detail-panel"
        className="flex w-full shrink-0 items-center justify-center border-t border-stone-800 bg-[#0e0c0b] p-6 text-center text-sm text-stone-500 lg:w-80 lg:overflow-y-auto lg:border-l lg:border-t-0"
      >
        <p className="max-w-[16rem] leading-relaxed">
          Tap a pin on the map or pick a location from the list to read How to
          find.
        </p>
      </aside>
    );
  }

  const meta = POI_TYPE_META[poi.type];

  return (
    <aside
      id="map-detail-panel"
      className="w-full shrink-0 border-t border-stone-800 bg-[#0e0c0b] p-4 lg:w-80 lg:overflow-y-auto lg:border-l lg:border-t-0"
      aria-live="polite"
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <p className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span
              className="inline-block size-2.5 rounded-full"
              style={{ backgroundColor: meta.color }}
              aria-hidden
            />
            {meta.label}
            {regionName ? ` · ${regionName}` : null}
            {poi.elevation ? ` · ${ELEVATION_META[poi.elevation]}` : null}
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

      <div className="mt-5 space-y-2 rounded-md border border-stone-800 bg-stone-950/50 px-3 py-3 text-sm">
        {nextMonument ? (
          <p className="text-stone-400">
            Next Monument:{" "}
            <button
              type="button"
              onClick={() => onSelectNext(nextMonument.id)}
              className="font-medium text-amber-600 underline-offset-2 hover:text-amber-500 hover:underline"
            >
              {nextMonument.name}
            </button>
          </p>
        ) : (
          <p className="text-stone-500">
            No unchecked Crystal Monuments left in this region.
          </p>
        )}
        <p className="text-xs text-stone-500">
          Well Travelled still needs{" "}
          <span className="text-stone-300">{wellTravelledRemaining}</span> on
          this guide.
        </p>
      </div>
    </aside>
  );
}

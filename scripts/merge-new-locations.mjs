import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const existing = JSON.parse(readFileSync(join(root, "data/pois.json"), "utf8"));
const incoming = JSON.parse(
  readFileSync(join(root, "queens_domain_new_locations.json"), "utf8"),
);

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const TYPE_LABEL = {
  crystal_monument: "Crystal Monument",
  wing_altar: "Wing Altar",
  wind_gem: "Wind Gem",
  possible_boss: "Possible Boss",
};

const ELEVATION_LABEL = {
  lower: "Lower",
  middle: "Middle",
  upper: "Upper",
};

const SOURCE = {
  label: "GameWikiStation — Queen's Domain map reference",
  url: incoming.source,
};

// Keep Neasied + Obmuer intact; drop empty Mainland stub (not in the 13-region set).
const keepRegionIds = new Set(["isle-of-neasied", "obmuer-temple"]);
const baseRegions = existing.regions
  .filter((r) => keepRegionIds.has(r.id))
  .map((r) => ({ ...r, status: "live" }));

const basePois = existing.pois
  .filter((p) => keepRegionIds.has(p.regionId))
  .map((p) => ({
    ...p,
    elevation: p.elevation ?? null,
    coordinateStatus: "verified",
    verificationStatus: "community_verified",
    spoiler: false,
  }));

const existingIds = new Set(basePois.map((p) => p.id));
const existingNameKeys = new Set(
  basePois.map((p) => `${p.regionId}::${p.name.toLowerCase()}`),
);

const newRegions = [];
const newPois = [];

for (const region of incoming.regions) {
  const regionId = slugify(region.name);
  // Skip if we somehow already have this region as a keep region name collision
  // (Deimpo Mausoleum is a NEW interior region; Neasied keeps the exterior landmark.)
  if (!baseRegions.some((r) => r.id === regionId)) {
    newRegions.push({
      id: regionId,
      name: region.name,
      mapImage: "",
      mapWidth: 1600,
      mapHeight: 1200,
      status: "live",
    });
  }

  for (const loc of region.locations) {
    const id = loc.id;
    const nameKey = `${regionId}::${loc.name.toLowerCase()}`;
    if (existingIds.has(id) || existingNameKeys.has(nameKey)) {
      console.log("skip duplicate", id, loc.name);
      continue;
    }

    const typeLabel = TYPE_LABEL[loc.type] ?? loc.type;
    const elev = loc.elevation;
    const elevLabel = elev ? ELEVATION_LABEL[elev] : null;

    let summary;
    let howToFind;
    let tips;

    if (loc.type === "possible_boss") {
      summary = `Possible boss encounter listed for ${region.name}${
        elevLabel ? ` (${elevLabel} elevation)` : ""
      }. Confirm in your own playthrough.`;
      howToFind =
        "Exact map pin is not verified yet. Treat this as a region checklist entry — explore carefully if you want to avoid spoilers elsewhere on the page.";
      tips =
        "Hidden from default filters. Turn on Possible Boss only when you want spoiler-tolerant tracking.";
    } else if (loc.type === "wind_gem") {
      summary = `Wind Gem pickup in ${region.name}${
        elevLabel ? ` (${elevLabel} elevation)` : ""
      }.`;
      howToFind = `Exact coordinates are not verified yet. Search ${region.name} at the ${
        elevLabel ? elevLabel.toLowerCase() : "listed"
      } elevation for the Wind Gem node named in community references.`;
      tips =
        "Mark as found after you collect it. A map pin will appear once coordinates are community-verified.";
    } else if (loc.type === "wing_altar") {
      summary = `Wing Altar for ${region.name}${
        elevLabel ? ` (${elevLabel} elevation)` : ""
      } — unlocks fast travel between discovered altars.`;
      howToFind = `Exact coordinates are not verified yet. Look for the Wing Altar structure while exploring ${region.name}, then activate it for the warp network.`;
      tips =
        "Counts toward Well Travelled once marked. Pin placement comes after coordinate verification.";
    } else {
      summary = `${typeLabel} in ${region.name}${
        elevLabel ? ` (${elevLabel} elevation)` : ""
      }.`;
      howToFind = `Exact map coordinates are not verified yet. Use this list entry while exploring ${region.name} and watch for the named ${typeLabel.toLowerCase()} at the ${
        elevLabel ? elevLabel.toLowerCase() : "listed"
      } elevation.`;
      tips =
        "Mark as found when you activate or collect it. Overview art and pins will be added after verification.";
    }

    newPois.push({
      id,
      regionId,
      type: loc.type,
      name: loc.name,
      x: null,
      y: null,
      elevation: elev || null,
      coordinateStatus: "unverified",
      verificationStatus: loc.verification_status || "secondary_source_only",
      spoiler: Boolean(loc.spoiler),
      summary,
      howToFind,
      tips,
      countsForWellTravelled:
        loc.type === "crystal_monument" || loc.type === "wing_altar",
      sources: [SOURCE],
    });
    existingIds.add(id);
    existingNameKeys.add(nameKey);
  }
}

const out = {
  regions: [...baseRegions, ...newRegions],
  pois: [...basePois, ...newPois],
};

writeFileSync(join(root, "data/pois.json"), JSON.stringify(out, null, 2) + "\n");
console.log(
  JSON.stringify(
    {
      regions: out.regions.length,
      pois: out.pois.length,
      verified: out.pois.filter((p) => p.coordinateStatus === "verified").length,
      unverified: out.pois.filter((p) => p.coordinateStatus === "unverified")
        .length,
      bosses: out.pois.filter((p) => p.type === "possible_boss").length,
    },
    null,
    2,
  ),
);

# Queen's Domain Map

English community tool site for **Queen's Domain** (Steam game): interactive map + weapons/throwing reference.

- Brand / titles: **Queen's Domain Map**
- Routes: `/` → `/map`, plus `/weapons`
- Stack: Next.js App Router, TypeScript, Tailwind CSS
- Data: local JSON only (no auth, CMS, or database)

## Brand assets

- Mark / favicon source: `public/brand/logo-mark.svg`
- Horizontal lockup: `public/brand/logo.svg`
- App icons: `src/app/favicon.ico`, `src/app/icon.png`, `src/app/apple-icon.png`

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (redirects to `/map`).

## Edit map markers

Source of truth: [`data/pois.json`](data/pois.json).

1. Add or edit a POI under `pois` with `regionId`, `type`, `name`, relative `x`/`y` (0–1), `summary`, `howToFind`, optional `tips`, `countsForWellTravelled`, and `sources` URLs.
2. Keep copy original English; cite guides as `sources` links (do not paste full third-party articles).
3. Marker types: `crystal_monument` | `wing_altar` | `landmark` | `shortcut` | `boss_door` | `shop_npc` | `key_item`.
4. Well Travelled progress counts POIs with `countsForWellTravelled` that are `crystal_monument` or `wing_altar`. Checks persist in `localStorage` key `qd-map-checks-v1`.

## Replace map art

1. Drop real captures into `public/maps/` (e.g. `neasied.webp`, `obmuer.webp`).
2. Update the region's `mapImage`, `mapWidth`, and `mapHeight` in `data/pois.json`.
3. Nudge POI `x`/`y` (fractions of width/height) after the new art lands.

Placeholders ship as SVG so the UI works before screenshots exist.

## Edit weapons

Source of truth: [`data/weapons.json`](data/weapons.json).

- `meleeEvolution`: set `evolvesTo` (id) and `materials` when verified.
- `throwing`: set `charges` / `rechargeNote` when verified.
- Unknown values must stay `null` / `"TBD"` — never invent combat numbers.

## Deploy on Vercel

1. Push this repo to GitHub (or import the folder).
2. [vercel.com/new](https://vercel.com/new) → import project.
3. Framework preset: **Next.js** (defaults are fine).
4. Deploy. Set the custom domain `queensdomainmap.click` in Project → Domains.
5. Optional: add Plausible/GA later via the `data-analytics` hooks already in the header/footer.

`metadataBase` in `src/app/layout.tsx` and sitemap/robots use `https://queensdomainmap.click`.

## Scripts

| Command        | Purpose              |
|----------------|----------------------|
| `npm run dev`  | Local development    |
| `npm run build`| Production build     |
| `npm run start`| Serve production     |
| `npm run lint` | ESLint               |

## Scope (MVP)

Shipped: `/map`, `/weapons`, local checklist, SEO metadata, sitemap, robots, disclaimer footer.

Not in scope: accounts, cloud sync, CMS, blog homepage, Chinese locale, Steam live APIs.

# AGENTS.md

## Cursor Cloud specific instructions

### Overview

**iscoloradoonfire** is a single-service Next.js 15 (App Router) app that shows active Colorado wildfires on a Mapbox map. It has two parts:
- **Client page** (`app/page.tsx`): Renders a full-page Mapbox GL map
- **API route** (`app/fires/route.ts`): Fetches + parses InciWeb RSS feed, filters Colorado fires, returns JSON

No database, Docker, or external infrastructure is needed.

### Running the app

- `npm run dev` — starts the dev server on port 3000 (uses Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint checks
- See `README.md` for standard Next.js commands.

### Notes

- **Node.js 22** is required (see `.nvmrc` and `package.json` engines field).
- The Mapbox access token is hardcoded in `app/page.tsx` — no env vars needed.
- The app requires internet access to fetch map tiles from Mapbox and wildfire data from `inciweb.wildfire.gov`.
- `eslint-config-next` must match the installed Next.js version (15.x). If lint produces circular JSON errors, check for version mismatch.
- The `npm run lint` warning about unused `marker` variable in `page.tsx` is pre-existing and benign.

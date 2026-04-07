## Cursor Cloud specific instructions

This is a single Next.js 16 application ("Is Colorado on Fire?") with no database, no Docker, and no external secrets required. See `README.md` for standard dev commands.

**Key commands** (all via npm scripts in `package.json`):
- Dev server: `npm run dev` (Turbopack, port 3000)
- Lint: `npm run lint` (Biome)
- Build: `npm run build`

**Runtime notes:**
- The `/fires` API route fetches live data from `https://inciweb.wildfire.gov/incidents/rss.xml` — requires internet access.
- Mapbox GL uses a hardcoded public access token in `app/page.tsx`; no environment variable needed.
- Node.js 22 is required (`.nvmrc` and `engines` field).

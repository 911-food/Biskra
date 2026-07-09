# 911 Foods

A premium fast food restaurant website with an "Emergency Food Station" theme — warm beige + matte red + black, cinematic food presentation, and interactive features.

## Run & Operate

- `pnpm --filter @workspace/911-foods run dev` — run the 911 Foods website (uses PORT env var)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite + TailwindCSS v4 + shadcn/ui + framer-motion
- Routing: wouter
- Fonts: Bebas Neue (headings), Inter (body), Playfair Display (accent)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (not used in frontend-only phase)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle for API), Vite (frontend)

## Where things live

- `artifacts/911-foods/src/pages/home.tsx` — main single-page with all sections
- `artifacts/911-foods/src/index.css` — full theme (beige/cream + matte red + black), custom animations
- `artifacts/911-foods/src/App.tsx` — routing
- `attached_assets/` — logo and menu images (referenced via @assets alias)
- `lib/api-spec/openapi.yaml` — OpenAPI spec (healthz only currently)

## Architecture decisions

- Frontend-only (no backend needed for restaurant showcase)
- All menu data is inline in `home.tsx` — sourced from attached menu images
- @assets alias points to `attached_assets/` folder so menu/logo images are imported directly
- CSS uses Bebas Neue for the "Emergency" brand identity (large bold display type)
- Grain texture via SVG data URI overlay for premium feel
- Custom animations: emergencyFlash (add-to-cart), sosPulse (SOS Box), deliveryCar, fadeInUp

## Product

- Hero section with "حالة جوع حرجة؟" headline + live countdown timer
- Full menu display (menu images + interactive Emergency Card tabs for each category)
- Code Red deals section (dark theme, discounted combos)
- Order tracker animation (Operation Room style: Received → Preparing → Rescue On The Way → Delivered)
- SOS Box: random meal picker (Chicken / Beef / Mix)
- Delivery section with animated car on road
- Contact section with phone numbers (0771 47 98 40 / 0771 47 60 27) and Instagram (@911food_07)

## User preferences

- Theme: warm beige/cream + matte red (hsl(0,55%,35%)) + black — no bright/neon colors
- Emergency Food Station concept — premium, not cartoonish
- Bebas Neue for display headings throughout
- No emojis in UI except where used as food icons (intentional part of the design)

## Gotchas

- Font import must be FIRST line in index.css (before tailwindcss import)
- @assets alias is defined in vite.config.ts pointing to attached_assets/
- PORT and BASE_PATH env vars required for Vite dev server (provided by workflow config)
- Run `pnpm --filter @workspace/api-spec run codegen` after any OpenAPI spec changes

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details

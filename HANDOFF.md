# Cupped — Agent Handoff Prompt

> **How to use this file:** paste the whole thing as your first message in a fresh
> Claude Code session on the new account. It orients an agent on the project state,
> the traps, and the next task. Update the *Current state* and *Next task* sections
> as work progresses so the handoff stays accurate.

---

## Your task

You're picking up **Cupped**, a flavor-first specialty coffee discovery directory.
Read `CLAUDE.md` in full before writing any code — it is the single source of truth
for the design system, database schema, component contracts, and phase roadmap.
Then read `README.md` for setup.

**The immediate priority is the one thing blocking everything else: connecting a live
Supabase project.** Details in *Next task* below.

---

## What the product is

Users search coffee beans by **tasting note** (blueberry, dark chocolate, jasmine,
caramel) rather than by brand, then click through to the roaster to buy. Revenue is
affiliate links. Audience is specialty coffee drinkers, beginner through enthusiast.

Stack: Next.js 14 (App Router, RSC) · TypeScript · Supabase (Postgres + RLS) ·
Tailwind · Vercel. Fonts: Playfair Display (display), DM Sans (body), DM Mono (tags/data).

---

## Current state — Phase 1 (MVP) complete

Where the code lives:
- Repo `akcheng19/Cupped`, branch `claude/create-cupped-project-ZHlQv`
- Or unpack `cupped-handoff.zip` / `.tar.gz` and `git init` fresh

**The app runs and is fully browsable right now with no database.** `npm install`,
`cp .env.local.example .env.local`, `npm run dev`. Every page renders from the static
dataset in `src/lib/fallback-data.ts` (14 beans, 10 roasters, 20 tasting notes,
10 reviews). Filtering, sorting, detail pages, and roaster pages all work against it.

Routes, all verified returning 200:

| Route | State |
|---|---|
| `/` | Hero, flavor craving bar, featured beans, category + origin browse, top roasters |
| `/search` | Filters (notes/origin/roast/process), 5 sort modes, removable filter chips |
| `/bean/[slug]` | Detail, specs, affiliate CTA, reviews, review form, related beans |
| `/roaster/[slug]` | Profile, averaged rating, their beans |
| `/about` | Affiliate disclosure, selection criteria |

`npm run build` passes clean (includes typecheck).

**Not yet done:** no live database, no `/flavor/[slug]` or `/origins/[slug]` SEO pages,
no sitemap, no click tracking, no analytics, no auth.

---

## Traps — read before you touch anything

**1. The fallback-data system is deliberate. Understand it before editing data flow.**
`src/lib/supabase-server.ts` detects placeholder/empty credentials and points the client
at `127.0.0.1:1` so queries fail in ~1ms instead of hanging on a 10-second network
timeout. Each page then falls back to `src/lib/fallback-data.ts`. Real credentials bypass
this entirely. Without that guard, every page load blocks for 10s — this was measured,
not theoretical.

**2. Supabase's client constructor throws on missing URL/key.** It is not lazy. Passing
empty strings crashes the page render before any query runs. That's why the guard
substitutes a dummy URL rather than skipping client creation.

**3. Never import `src/lib/supabase/*.ts` from a client component.** Those modules pull
in `supabase-server.ts`, which imports `next/headers`, which fails the build inside
`"use client"`. `ReviewForm.tsx` therefore calls `createClient()` from `src/lib/supabase.ts`
(the browser client) directly. This broke the build once already.

**4. Seed data and fallback data are different sets.** Seed (`supabase/seed.sql`) has
13 roasters / 24 beans / 54 tasting notes / 96 bean–note links / 38 reviews. Fallback has
10 / 14 / 20 / 10. Slugs do not fully overlap — once the DB is live, `/bean/hair-bender`
resolves from Postgres, and some fallback-only slugs will 404. That is expected.

**5. The published prototype artifact is a standalone HTML mirror, not this app.** It does
not update when the code changes. Don't treat it as a build output.

---

## Next task — connect Supabase

1. Create a free project at supabase.com.
2. SQL Editor → run `supabase/migrations/001_initial_schema.sql`. Creates `roasters`,
   `beans`, `tasting_notes`, `bean_tasting_notes`, `reviews`, the `beans_with_stats`
   view, and RLS with public-read policies plus public-insert on `reviews` (no auth in
   Phase 1).
3. SQL Editor → run `supabase/seed.sql`.
4. Put the real URL, anon key, and service role key in `.env.local` (Settings → API).
5. Restart dev server. Live data now takes priority everywhere.

**Verify it actually worked** — don't assume:
- `/search` shows **24** beans, not 14 (14 means it's still on fallback)
- A bean detail page loads and its reviews come from the DB
- `npm run build` still passes
- Page loads stay fast (a ~10s load means credential detection is misfiring)

**Then decide, and ask the user:** keep the fallback system as an offline-dev convenience,
or delete it? Removing it means deleting `src/lib/fallback-data.ts` and the `?? FALLBACK_*`
expressions in `src/app/page.tsx`, `src/app/search/page.tsx`, `src/app/bean/[slug]/page.tsx`,
and `src/app/roaster/[slug]/page.tsx`.

---

## After that — Phase 2 (SEO + analytics)

Scoped in `CLAUDE.md`. In rough dependency order:

1. `/flavor/[slug]` landing pages — one per tasting note, unique meta description per slug.
   `FlavorTag` already links here, so these routes currently 404. Highest-value SEO work.
2. `/origins/[slug]` landing pages — one per origin, with region and flavor-profile copy.
3. `sitemap.xml` + `robots.txt`.
4. Open Graph tags across all pages.
5. `click_events` table + affiliate click tracking in `AffiliateButton`.
6. Vercel Analytics.

---

## Working conventions

From `CLAUDE.md` — follow these:

- Server components by default; `"use client"` only for hooks or browser APIs.
- **All DB queries live in `src/lib/supabase/`.** Never inline in a component.
- Tailwind only, no inline styles. Design tokens are CSS variables in `globals.css`.
- Mobile first — every layout must hold at 375px.
- Every page needs `title` + `description` metadata.
- TypeScript throughout; shared types in `src/types/index.ts`.
- Named exports for components; `interface` over `type` for object shapes.
- **Minimum change rule:** don't refactor working code unless asked. Fix bugs with the
  smallest change that works.
- Verify before claiming done: `npm run build` must pass, and actually load the affected
  routes.

---

## Quick reference

```bash
npm install
cp .env.local.example .env.local
npm run dev      # localhost:3000
npm run build    # production build + typecheck
npm run lint
```

```
src/app/          routes: page.tsx, search/, bean/[slug]/, roaster/[slug]/, about/
src/components/   ui/ (BeanCard, FlavorTag, RoastBadge, StarRating, PriceTag,
                  AffiliateButton) · layout/ (Header, Footer, FilterSidebar,
                  MobileFilterDrawer) · sections/ (HeroFlavourBar, BeanGrid,
                  ReviewsList, ReviewForm, RelatedBeans)
src/lib/          supabase.ts (browser) · supabase-server.ts (server + credential guard)
                  supabase/ (query helpers) · fallback-data.ts · utils.ts
src/types/        index.ts
supabase/         migrations/001_initial_schema.sql · seed.sql
```

Search URL params (bookmarkable, shareable):

```
/search?notes=blueberry,caramel   # AND — must have all
        &origin=africa             # OR
        &roast=light,medium        # OR
        &process=natural
        &price_min=10&price_max=35
        &sort=rating               # rating|popularity|price_asc|price_desc|newest
```

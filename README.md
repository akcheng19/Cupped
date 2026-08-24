# ☕ Cupped — Coffee Bean Finder

**Find beans by what you're craving.** A flavor-first specialty coffee discovery directory.

Search by tasting notes — blueberry, dark chocolate, jasmine, caramel — instead of by brand,
then link straight through to the roaster to buy.

> **Status:** Phase 1 (MVP) complete. The app runs and is fully browsable *right now* using
> built-in fallback data — no database required. Connecting Supabase is the next step.
> See [Connecting Supabase](#connecting-supabase).

---

## Tech stack

| Layer     | Choice                                  |
|-----------|-----------------------------------------|
| Framework | Next.js 14 (App Router, RSC)            |
| Language  | TypeScript                              |
| Database  | Supabase (PostgreSQL + RLS)             |
| Styling   | Tailwind CSS                            |
| Icons     | lucide-react                            |
| Hosting   | Vercel (free tier)                      |
| Fonts     | Playfair Display · DM Sans · DM Mono     |

---

## Quick start

```bash
git clone <repo-url>
cd Cupped
npm install

cp .env.local.example .env.local   # placeholders are fine to start
npm run dev
```

Open <http://localhost:3000>.

**The app works immediately with no database.** Every page renders using the static
fallback dataset in [`src/lib/fallback-data.ts`](src/lib/fallback-data.ts) — 14 beans,
10 roasters, 20 tasting notes, and sample reviews. Filtering, sorting, bean detail pages,
and roaster pages are all fully functional against that data.

### Scripts

```bash
npm run dev     # dev server at localhost:3000
npm run build   # production build (also runs typecheck)
npm run start   # serve the production build
npm run lint    # ESLint
```

---

## Connecting Supabase

The app prefers live Supabase data and silently falls back to the static dataset when
credentials are absent or invalid. To go live:

**1. Create a project** at [supabase.com](https://supabase.com) (free tier is sufficient).

**2. Run the schema.** In the Supabase dashboard → SQL Editor, paste and run:

```
supabase/migrations/001_initial_schema.sql
```

This creates `roasters`, `beans`, `tasting_notes`, `bean_tasting_notes`, `reviews`,
the `beans_with_stats` view, and enables row-level security with public-read policies
(plus public-insert on `reviews`, since Phase 1 has no auth).

**3. Seed the data.** Then run:

```
supabase/seed.sql
```

13 roasters · 24 beans · 54 tasting notes · 96 bean–note links · 38 reviews.

**4. Add your keys** to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in the dashboard under **Settings → API**.

**5. Restart the dev server.** Live data now takes priority everywhere.

> **How the fallback works:** `src/lib/supabase-server.ts` detects placeholder or empty
> credentials and points the client at `127.0.0.1:1` so queries fail fast (~1ms) instead
> of hanging on a 10-second network timeout. Each page then falls back to the static data.
> Once real credentials are set this path is bypassed entirely.
>
> To remove the fallback system after going live, delete `src/lib/fallback-data.ts` and
> drop the `?? FALLBACK_*` expressions in `src/app/page.tsx`, `src/app/search/page.tsx`,
> `src/app/bean/[slug]/page.tsx`, and `src/app/roaster/[slug]/page.tsx`.

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # root layout — Header + Footer, global metadata
│   ├── page.tsx                # / — hero, flavor bar, featured beans, categories
│   ├── globals.css             # CSS variables + Google Fonts
│   ├── search/page.tsx         # /search — filters, sorting, results grid
│   ├── bean/[slug]/page.tsx    # /bean/[slug] — detail, affiliate CTA, reviews
│   ├── roaster/[slug]/page.tsx # /roaster/[slug] — roaster profile
│   └── about/page.tsx          # /about — affiliate disclosure
├── components/
│   ├── ui/                     # BeanCard, FlavorTag, RoastBadge, StarRating,
│   │                           #   PriceTag, AffiliateButton
│   ├── layout/                 # Header, Footer, FilterSidebar, MobileFilterDrawer
│   └── sections/               # HeroFlavourBar, BeanGrid, ReviewsList,
│                               #   ReviewForm, RelatedBeans
├── lib/
│   ├── supabase.ts             # browser client
│   ├── supabase-server.ts      # server client (+ placeholder detection)
│   ├── supabase/               # query helpers — beans, roasters,
│   │                           #   tasting-notes, reviews
│   ├── fallback-data.ts        # static dataset used when DB is absent
│   └── utils.ts                # cn(), formatters, timeAgo()
└── types/index.ts              # Bean, Roaster, TastingNote, Review, filters

supabase/
├── migrations/001_initial_schema.sql
└── seed.sql
```

---

## Routes

| Route              | Description                                              |
|--------------------|----------------------------------------------------------|
| `/`                | Hero, flavor craving bar, featured beans, category/origin browse |
| `/search`          | Filter by notes, origin, roast, process, price + sorting  |
| `/bean/[slug]`     | Bean detail, affiliate CTA, reviews, review form, related  |
| `/roaster/[slug]`  | Roaster profile with all their beans                      |
| `/about`           | About + full affiliate disclosure                         |

### Search URL params

Filters are URL-driven, so every result set is bookmarkable and shareable:

```
/search?notes=blueberry,caramel   # AND logic — must have all selected notes
        &origin=africa             # OR logic
        &roast=light,medium        # OR logic
        &process=natural
        &price_min=10&price_max=35
        &sort=rating               # rating | popularity | price_asc | price_desc | newest
```

---

## Conventions

- **Server components by default.** `"use client"` only where hooks or browser APIs are needed.
- **All DB queries live in `src/lib/supabase/`** — never inline in components.
- **Tailwind only** — no inline styles. Design tokens are CSS variables in `globals.css`.
- **Mobile first** — every layout must hold at 375px.
- **Named exports** for components; `interface` over `type` for object shapes.

The full design system, database schema, and phase roadmap live in
[`CLAUDE.md`](CLAUDE.md), which is the single source of truth for this project.

---

## Deploying to Vercel

1. Import the repo in the Vercel dashboard.
2. Add the three environment variables above under **Settings → Environment Variables**.
3. Deploy — Next.js is detected automatically, no build config needed.

Pre-launch checklist lives in `CLAUDE.md` under *Deployment Checklist*.

---

## What's next

Phase 1 is done. The immediate next steps:

1. **Connect a live Supabase project** (steps above) — unblocks everything else.
2. **Phase 2 — SEO landing pages:** `/flavor/[slug]` and `/origins/[slug]` routes,
   sitemap generation, Open Graph tags, affiliate click tracking.

Phases 3–5 (auth and saved cravings, roaster submissions and admin, monetization polish)
are specced in `CLAUDE.md`.

---

## License

Private project. All roaster names, logos, and product links belong to their respective owners.

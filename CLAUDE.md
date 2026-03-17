# Cupped — Coffee Bean Finder

Find beans by what you're craving. A flavor-first coffee discovery directory.

## PROJECT OVERVIEW

**App Name**: Cupped
**Purpose**: Help users find coffee beans based on flavor cravings, tasting notes, and preferences — then link them directly to roasters or affiliate purchase pages.
**Audience**: Specialty coffee drinkers who know what they like (or want to discover it), from curious beginners to enthusiasts.
**Monetization**: Affiliate links to roasters + retail partners (Amazon, Trade Coffee, roaster direct sites), eventually paid roaster listings.
**Budget**: $0–$50/month using free-tier infrastructure only.
**Stack**: Next.js 14 (App Router), Supabase (database + auth), Vercel (hosting), Tailwind CSS.

## DESIGN SYSTEM

### Aesthetic Direction
- **Theme**: Warm, editorial, specialty coffee shop meets modern directory
- **Vibe**: Think a beautifully curated coffee menu — not a sterile tech product
- **Mode**: Light with warm off-white/cream tones. Dark mode optional later.

### Color Palette (CSS Variables)
```css
--color-bg:          #FAF7F2;   /* warm off-white / cream */
--color-surface:     #FFFFFF;
--color-border:      #E8E0D5;
--color-text:        #1C1410;   /* near-black warm */
--color-muted:       #8C7B6B;   /* warm gray */
--color-accent:      #C4622D;   /* burnt sienna / coffee orange */
--color-accent-dark: #9B4A1F;
--color-accent-soft: #F5E6D8;   /* soft peach tint */
--color-roast-light: #D4A96A;
--color-roast-medium:#A0622A;
--color-roast-dark:  #4A2010;
```

### Typography
- **Display / Headings**: Playfair Display (Google Fonts) — editorial, refined
- **Body**: DM Sans (Google Fonts) — clean, readable
- **Mono / Tags**: DM Mono — for flavor tags, badges

### Spacing Scale
- Use Tailwind defaults: 4px base unit
- Cards: `p-5` or `p-6`
- Section gaps: `gap-6` or `gap-8`
- Page padding: `px-4 md:px-8 lg:px-12`

### Component Patterns
- **Flavor Tags**: Pill-shaped, warm amber background (`bg-amber-100 text-amber-800`), small rounded font
- **Bean Cards**: White card, subtle shadow, roast level color indicator stripe on left border
- **Roast Level Badge**: Color-coded dot (light = gold, medium = brown, dark = near-black)
- **Star Ratings**: Amber stars, show count in muted text
- **Affiliate Buttons**: Accent color CTA — "Buy from [Roaster]" or "View on Amazon"
- **Filter Sidebar**: Sticky on desktop, drawer on mobile

## DATABASE SCHEMA (Supabase)

### Table: beans
```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
name            text NOT NULL
roaster_id      uuid REFERENCES roasters(id)
origin          text NOT NULL           -- e.g. "Ethiopia", "Colombia", "Blend"
region          text                    -- e.g. "Yirgacheffe", "Huila"
roast_level     text NOT NULL           -- 'light' | 'medium' | 'medium-dark' | 'dark'
process         text                    -- 'washed' | 'natural' | 'honey'
altitude_masl   integer                 -- meters above sea level (optional)
varietal        text                    -- e.g. "Heirloom", "Bourbon", "Gesha"
price_usd       numeric(6,2)            -- price per 12oz bag equivalent
bag_size_oz     integer DEFAULT 12
description     text
image_url       text
affiliate_url   text NOT NULL           -- direct buy link
is_featured     boolean DEFAULT false
is_active       boolean DEFAULT true
order_count     integer DEFAULT 0       -- for popularity sorting
slug            text UNIQUE NOT NULL
created_at      timestamptz DEFAULT now()
```

### Table: roasters
```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
name            text NOT NULL
slug            text UNIQUE NOT NULL
location_city   text
location_state  text
location_country text DEFAULT 'US'
website_url     text
logo_url        text
description     text
is_featured     boolean DEFAULT false
affiliate_program text                  -- 'amazon' | 'direct' | 'tradecoffee' | null
created_at      timestamptz DEFAULT now()
```

### Table: tasting_notes
```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
name            text UNIQUE NOT NULL    -- e.g. "Blueberry", "Dark Chocolate"
category        text NOT NULL           -- 'Fruity' | 'Chocolate & Nutty' | 'Sweet' | 'Floral' | 'Earthy & Spicy' | 'Roasted'
emoji           text                    -- optional visual
slug            text UNIQUE NOT NULL
```

### Table: bean_tasting_notes (junction)
```sql
bean_id         uuid REFERENCES beans(id) ON DELETE CASCADE
note_id         uuid REFERENCES tasting_notes(id) ON DELETE CASCADE
PRIMARY KEY (bean_id, note_id)
```

### Table: reviews
```sql
id              uuid PRIMARY KEY DEFAULT gen_random_uuid()
bean_id         uuid REFERENCES beans(id) ON DELETE CASCADE
reviewer_name   text NOT NULL           -- anonymous until auth added
rating          integer CHECK (rating BETWEEN 1 AND 5)
review_text     text
helpful_count   integer DEFAULT 0
created_at      timestamptz DEFAULT now()
```

### Computed / Views
Create a Supabase view `beans_with_stats` that joins beans + roasters + avg rating + review count + tasting notes array.

## TASTING NOTES TAXONOMY

Seed these categories and notes on first run:

**Fruity**: Blueberry, Strawberry, Cherry, Raspberry, Peach, Apricot, Mango, Citrus, Lemon, Orange, Apple, Grape, Tropical, Passionfruit, Watermelon

**Chocolate & Nutty**: Dark Chocolate, Milk Chocolate, Cocoa, Hazelnut, Almond, Walnut, Peanut, Pecan

**Sweet**: Caramel, Brown Sugar, Honey, Vanilla, Toffee, Molasses, Maple, Butterscotch

**Floral**: Jasmine, Rose, Lavender, Chamomile, Hibiscus, Bergamot, Orange Blossom

**Earthy & Spicy**: Cedar, Tobacco, Leather, Pepper, Cinnamon, Clove, Cardamom, Earthy, Herbal, Woody

**Roasted**: Smoky, Toasty, Nutty Roast, Bittersweet, Dark Caramel, Charcoal

## SEED DATA (Minimum 20 beans across 8+ roasters)

Include real or realistic beans covering:
- At least 5 African origins (Ethiopia, Kenya, Rwanda, Burundi, Tanzania)
- At least 4 Latin American origins (Colombia, Guatemala, Brazil, Costa Rica)
- At least 2 Asian origins (Sumatra, Java)
- At least 1 blend
- Spread across all roast levels
- Price range: $12–$55
- Mix of process methods
- At least 3 featured beans
- Realistic affiliate URLs (can use placeholder roaster domains for MVP)

Include 10+ roasters: Stumptown, Intelligentsia, Counter Culture, Blue Bottle, Verve, Onyx, Ritual, George Howell, Heart, Madcap (use real names + real websites for affiliate links)

Seed at least 30 reviews distributed across beans (ratings 3–5, varied text).

## PAGES & ROUTES

### `/` — Homepage
- Hero: Large headline "Find your perfect cup." + subhead "Search by flavor, not by brand."
- Flavor Craving Bar: Big interactive flavor tag selector (top 12 most popular notes shown as clickable pills) — clicking goes to `/search?notes=blueberry,chocolate`
- Featured Beans section (3–4 cards, `is_featured = true`)
- Browse by Flavor Category (6 category cards with icons: Fruity, Chocolate, Sweet, Floral, Earthy, Roasted)
- Browse by Origin (world map or region pills)
- "How It Works" — 3 steps: Pick your craving → Browse matched beans → Buy direct
- Footer with affiliate disclosure

### `/search` — Search & Filter Results
- Left sidebar (desktop) / Top drawer (mobile): All filters
  - Tasting Notes (multi-select checkboxes, grouped by category)
  - Origin (multi-select: Africa, Latin America, Asia, Blend)
  - Roast Level (Light / Medium / Medium-Dark / Dark — toggle pills)
  - Price Range (slider: $0–$60)
  - Process Method (Washed / Natural / Honey)
- Top bar: Sort by dropdown
  - Highest Rated, Most Popular, Price: Low to High, Price: High to Low, Newest
- Results grid: Bean cards (2 col mobile, 3 col desktop)
- Active filter pills shown above results with X to remove
- Result count shown: "23 beans found"
- Empty state if no results: suggest removing a filter

### `/bean/[slug]` — Bean Detail Page
- Large bean image + roaster logo
- Name, roaster (linked), origin, region, roast level badge, process method
- Tasting notes as flavor tags
- Description paragraph
- Bean details: altitude, varietal, bag size
- "Buy This Bean" CTA button → `affiliate_url` (opens new tab, tracked)
- Roaster info card (name, location, link to their site)
- Star rating summary + review count
- Reviews list (reviewer name, rating, text, date)
- "Write a Review" form (no login required for MVP — name + rating + text)
- Related beans (same tasting notes, different roaster)

### `/roaster/[slug]` — Roaster Profile Page
- Roaster name, logo, location, description
- Link to their website (affiliate tracked)
- All beans from this roaster (filterable)
- Average rating across their beans

### `/flavor/[slug]` — Flavor Landing Page (SEO goldmine)
- e.g. `/flavor/blueberry` → "Best Coffee Beans with Blueberry Notes"
- Hero with flavor description
- All beans tagged with this note
- Good for long-tail SEO: "coffee that tastes like blueberry"

### `/origins/[slug]` — Origin Landing Page
- e.g. `/origins/ethiopia` → "Ethiopian Coffee Beans"
- Region description, flavor profile overview
- All Ethiopian beans in directory

### `/about` — About Page
- What Cupped is, how beans are selected, affiliate disclosure

## COMPONENT LIBRARY

```
/components
  /ui
    BeanCard.tsx          -- bean listing card
    FlavorTag.tsx         -- pill tag for tasting notes
    RoastBadge.tsx        -- color-coded roast indicator
    StarRating.tsx        -- display + interactive
    PriceTag.tsx          -- formatted price display
    AffiliateButton.tsx   -- CTA with disclosure
  /layout
    Header.tsx            -- logo + nav + search bar
    Footer.tsx            -- links + affiliate disclaimer
    FilterSidebar.tsx     -- all search filters
    MobileFilterDrawer.tsx
  /sections
    HeroFlavourBar.tsx    -- homepage craving selector
    FeaturedBeans.tsx     -- homepage featured section
    BeanGrid.tsx          -- responsive bean card grid
    ReviewsList.tsx       -- bean page reviews
    ReviewForm.tsx        -- submit a review
    RelatedBeans.tsx      -- similar beans
```

## SORT & FILTER LOGIC

All filtering happens via Supabase queries (server-side, not client-side).

Filter params (URL query string):
- `?notes=blueberry,chocolate` — tasting note slugs (AND logic: must have ALL selected)
- `?origin=ethiopia,colombia` — OR logic: from any selected origin
- `?roast=light,medium` — OR logic
- `?price_min=10&price_max=35`
- `?process=natural,washed`
- `?sort=rating | popularity | price_asc | price_desc | newest`

URL params must be bookmarkable and shareable.

## AFFILIATE & MONETIZATION RULES

1. Every bean must have an `affiliate_url` — link directly to purchase page
2. `AffiliateButton` component must open in `target="_blank"` with `rel="noopener noreferrer"`
3. Footer must include: "Cupped may earn a commission when you buy through links on our site."
4. `/about` page must have full affiliate disclosure paragraph
5. Track clicks eventually via Supabase `click_events` table (Phase 2)
6. Priority affiliate programs: roaster direct sites, Amazon (for widely available beans), Trade Coffee partner links

## BUILD RULES (ALWAYS FOLLOW)

1. Use `"use client"` only on components that need browser APIs or hooks. Server components are default.
2. All DB queries go in `/lib/supabase/` helper files, never inline in components.
3. Never hardcode data — everything comes from Supabase.
4. Every page must have proper metadata (`title`, `description`) for SEO.
5. Flavor/origin landing pages must have unique meta descriptions using the slug.
6. Images: Use `next/image` with explicit `width` and `height`. Use placeholder images if real images unavailable.
7. Error states: Every data-fetching component needs a loading and error state.
8. Mobile first: All layouts must work at 375px width minimum.
9. No inline styles — Tailwind only.
10. TypeScript throughout — define types for Bean, Roaster, TastingNote, Review in `/types/index.ts`.
11. Validate before completing each phase — check for syntax errors, balanced braces, working imports, `use client` placement.
12. Archive after each phase — tag as v1, v2, etc.
13. Do not start the next phase until current phase is confirmed working.
14. Minimum change rule: Never refactor working code unless explicitly asked. Fix bugs with the smallest possible change.

## ENVIRONMENT VARIABLES

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## PHASE ROADMAP

### ✅ PHASE 1 — Foundation & Core Directory (MVP)
- Project setup: Next.js 14, Supabase, Tailwind, TypeScript
- Supabase schema: all tables created with RLS policies
- Seed data: 20+ beans, 10+ roasters, all tasting notes, 30+ reviews
- Homepage with flavor craving bar + featured beans + category browse
- Search/filter page with all filters + sorting
- Bean detail page with affiliate CTA + reviews
- Roaster profile page
- Header + Footer components
- Mobile responsive

### PHASE 2 — SEO Landing Pages + Analytics
- `/flavor/[slug]` pages (all tasting notes)
- `/origins/[slug]` pages (all origins)
- Sitemap generation
- Meta tags + Open Graph for all pages
- Click tracking on affiliate links (Supabase `click_events` table)
- Google Analytics / Vercel Analytics
- Submit to Google Search Console

### PHASE 3 — User Accounts + Cravings Profile
- Supabase Auth (email + Google OAuth)
- User profile page
- "My Cravings" — save flavor preferences
- "My Wishlist" — save beans to try
- Personalized bean recommendations based on saved flavors
- Review attribution to logged-in users
- "Cravings Feed" — new beans matching your preferences

### PHASE 4 — Roaster Submissions + Admin
- Self-serve roaster submission form
- Admin dashboard (simple, password-protected)
- Bean submission/edit by roasters
- Featured listing paid tier (Stripe integration)
- Review moderation

### PHASE 5 — Growth & Monetization Polish
- Google AdSense integration
- Email newsletter (Resend or Mailchimp)
- "Bean of the Week" featured slot
- Coffee quiz → flavor profile → recommendations
- Social sharing cards (OG images per bean)
- API for roasters to sync their catalog

## FUTURE FEATURE IDEAS (POST-MVP BACKLOG)
- Coffee quiz: "What do you like in other drinks?" → maps to flavor profile
- Subscription box finder (filter by subscription availability)
- Brewing method filter (espresso vs pour-over vs French press)
- Seasonal/limited release badges
- "Tasted it?" community tasting log
- Price per ounce normalized comparison
- Certifications filter (organic, fair trade, rainforest alliance)
- Comparison tool: side-by-side two beans

## DEPLOYMENT CHECKLIST (before going live)
- All env vars set in Vercel dashboard
- Supabase RLS policies enabled on all tables
- Custom domain configured
- Affiliate disclosure visible in footer on every page
- 404 page created
- `robots.txt` and `sitemap.xml` present
- Test all affiliate links open correctly
- Mobile tested at 375px, 390px, 414px
- Lighthouse score > 80 on mobile

---

*This file is the single source of truth for Cupped. Always read this file fully before writing any code.*

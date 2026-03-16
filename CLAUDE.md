# Cupped — Coffee Bean Review Platform

## Project Overview

**Cupped** is a Next.js 14 web application for discovering and reviewing specialty coffee beans. Users can explore beans by roaster, origin, process type, and roast level, read community reviews, and find their next favorite cup.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: lucide-react
- **Utilities**: clsx, tailwind-merge

## Architecture

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout (Navigation + Footer)
│   ├── page.tsx                  # Homepage (server component)
│   ├── globals.css               # Global styles + CSS variables
│   ├── beans/
│   │   ├── page.tsx              # Beans search/filter page (server + passes to client)
│   │   └── [id]/
│   │       └── page.tsx          # Bean detail page (server component)
│   └── roasters/
│       └── [id]/
│           └── page.tsx          # Roaster page (server component)
├── components/
│   ├── Navigation.tsx            # Site header + nav ("use client")
│   ├── Footer.tsx                # Site footer (server)
│   ├── BeanCard.tsx              # Bean summary card (server)
│   ├── RoasterCard.tsx           # Roaster summary card (server)
│   ├── ReviewCard.tsx            # Single review display (server)
│   ├── StarRating.tsx            # Star rating display (server)
│   ├── SearchBar.tsx             # Search input ("use client")
│   ├── FilterSidebar.tsx         # Filter controls ("use client")
│   └── BeansPageClient.tsx       # Beans page with client-side filtering ("use client")
└── lib/
    ├── supabase.ts               # Browser Supabase client
    ├── supabase-server.ts        # Server Supabase client
    ├── types.ts                  # TypeScript interfaces
    └── utils.ts                  # Helper utilities
supabase/
├── migrations/
│   └── 001_initial_schema.sql    # Full database schema
└── seed.sql                      # 12 roasters, 23 beans, 35+ reviews
```

## Database Schema

### Tables
- **roasters** — Coffee roaster companies
- **beans** — Individual coffee products with origin, process, roast level
- **reviews** — User reviews with ratings and brew method notes

### Key Fields
- Beans link to roasters via `roaster_id` (UUID FK)
- Reviews link to beans via `bean_id` (UUID FK)
- `flavor_notes` stored as `TEXT[]` array
- Slugs used for human-readable URLs

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Development

```bash
npm install
npm run dev       # Start dev server at localhost:3000
npm run build     # Production build
npm run lint      # ESLint
```

## Supabase Setup

1. Create a Supabase project at https://supabase.com
2. Copy `.env.local.example` to `.env.local` and fill in credentials
3. Run the migration: `supabase/migrations/001_initial_schema.sql`
4. Run the seed: `supabase/seed.sql`

## Design System

Coffee-inspired color palette:
- **Primary background**: `#FAF7F2` (cream)
- **Dark text**: `#1A1008` (dark espresso)
- **Brand brown**: `#6B3F1F` (medium roast brown)
- **Accent gold**: `#C8860A` (caramel/gold)
- **Border**: `#E8DDD0` (light latte)

## Phase Roadmap

### Phase 1 (Current) ✅
- Project setup and infrastructure
- Full Supabase schema
- Seed data: 12 roasters, 23 beans, 35+ reviews
- Homepage with featured beans and roasters
- Beans search & filter page
- Bean detail page with reviews
- Roaster profile page
- All shared UI components

### Phase 2 (Planned)
- Supabase Auth (email/password + OAuth)
- User profiles
- Write/edit/delete own reviews
- Favorite beans
- Personal coffee journal

### Phase 3 (Planned)
- Advanced search (full-text)
- Bean comparison tool
- Cupping score breakdowns (aroma, body, acidity, finish)
- Roaster admin dashboard
- Image uploads

## Code Conventions

- **Server components** by default — use `async/await` for data fetching
- **"use client"** only when needed (event handlers, hooks, browser APIs)
- **Named exports** for all components
- **Interfaces** over `type` for object shapes
- **Nullish coalescing** (`??`) for safe fallbacks
- Tailwind classes via `cn()` utility from `src/lib/utils.ts`

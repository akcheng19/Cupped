// ============================================================
// Cupped — TypeScript Interfaces
// ============================================================

export interface Roaster {
  id: string
  name: string
  slug: string
  location_city: string | null
  location_state: string | null
  location_country: string
  website_url: string | null
  logo_url: string | null
  description: string | null
  is_featured: boolean
  affiliate_program: string | null
  created_at: string
}

export interface TastingNote {
  id: string
  name: string
  category: TastingNoteCategory
  emoji: string | null
  slug: string
}

export interface Bean {
  id: string
  name: string
  slug: string
  roaster_id: string
  origin: string
  region: string | null
  roast_level: RoastLevel
  process: ProcessType | null
  altitude_masl: number | null
  varietal: string | null
  price_usd: number | null
  bag_size_oz: number
  description: string | null
  image_url: string | null
  affiliate_url: string
  is_featured: boolean
  is_active: boolean
  order_count: number
  created_at: string
  // joined
  roaster?: Roaster
  tasting_notes?: TastingNote[]
}

export interface Review {
  id: string
  bean_id: string
  reviewer_name: string
  rating: number
  review_text: string | null
  helpful_count: number
  created_at: string
}

export interface BeanWithStats extends Bean {
  roaster: Roaster
  tasting_notes: TastingNote[]
  avg_rating: number | null
  review_count: number
}

export interface BeanWithReviews extends BeanWithStats {
  reviews: Review[]
}

export interface RoasterWithBeans extends Roaster {
  beans: BeanWithStats[]
  avg_rating: number | null
  total_reviews: number
}

// ============================================================
// Value Types
// ============================================================

export type RoastLevel = 'light' | 'medium' | 'medium-dark' | 'dark'

export type ProcessType = 'washed' | 'natural' | 'honey' | 'anaerobic' | 'wet-hulled'

export type TastingNoteCategory =
  | 'Fruity'
  | 'Chocolate & Nutty'
  | 'Sweet'
  | 'Floral'
  | 'Earthy & Spicy'
  | 'Roasted'

export type SortOption = 'rating' | 'popularity' | 'price_asc' | 'price_desc' | 'newest'

// ============================================================
// Filter / Search State
// ============================================================

export interface SearchFilters {
  notes: string[]      // tasting note slugs — AND logic
  origin: string[]     // origin names — OR logic
  roast: string[]      // roast level values — OR logic
  process: string[]    // process type values — OR logic
  price_min: number | null
  price_max: number | null
  sort: SortOption
}

export const DEFAULT_FILTERS: SearchFilters = {
  notes: [],
  origin: [],
  roast: [],
  process: [],
  price_min: null,
  price_max: null,
  sort: 'rating',
}

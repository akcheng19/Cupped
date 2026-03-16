export interface Roaster {
  id: string
  name: string
  slug: string
  location: string
  description: string | null
  website: string | null
  founded_year: number | null
  logo_url: string | null
  created_at: string
}

export interface Bean {
  id: string
  name: string
  slug: string
  roaster_id: string
  origin: string
  region: string | null
  process: string
  roast_level: string
  flavor_notes: string[]
  description: string | null
  price: number | null
  weight_grams: number | null
  image_url: string | null
  is_single_origin: boolean
  altitude_meters: number | null
  variety: string | null
  harvest_year: number | null
  created_at: string
  roaster?: Roaster
}

export interface Review {
  id: string
  bean_id: string
  reviewer_name: string
  rating: number
  title: string | null
  body: string
  brew_method: string | null
  created_at: string
}

export interface BeanWithRoasterAndReviews extends Bean {
  roaster: Roaster
  reviews: Review[]
  average_rating: number | null
  review_count: number
}

export interface RoasterWithBeans extends Roaster {
  beans: Bean[]
}

export type ProcessType = 'washed' | 'natural' | 'honey' | 'anaerobic' | 'wet-hulled'
export type RoastLevel = 'light' | 'medium-light' | 'medium' | 'medium-dark' | 'dark'
export type BrewMethod =
  | 'espresso'
  | 'pour-over'
  | 'french-press'
  | 'aeropress'
  | 'cold-brew'
  | 'drip'
  | 'moka-pot'

export interface FilterState {
  search: string
  roast_levels: string[]
  processes: string[]
  origins: string[]
  min_price: number | null
  max_price: number | null
}

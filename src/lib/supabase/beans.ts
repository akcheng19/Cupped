import { createServerComponentClient } from '../supabase-server'
import type { BeanWithStats, BeanWithReviews, SearchFilters, TastingNote } from '@/types'

// ============================================================
// Raw Supabase bean row → BeanWithStats
// ============================================================

function mapBeanRow(row: Record<string, unknown>): BeanWithStats {
  const notes = Array.isArray(row.bean_tasting_notes)
    ? (row.bean_tasting_notes as Array<{ tasting_notes: Record<string, unknown> }>)
        .filter((btn) => btn.tasting_notes != null)
        .map((btn) => btn.tasting_notes as unknown as TastingNote)
    : []

  const reviews = Array.isArray(row.reviews) ? (row.reviews as Array<{ rating: number }>) : []
  const avg_rating =
    reviews.length > 0
      ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
      : null

  return {
    ...(row as unknown as BeanWithStats),
    roaster: row.roaster as BeanWithStats['roaster'],
    tasting_notes: notes,
    avg_rating,
    review_count: reviews.length,
  }
}

// ============================================================
// Get all active beans with tasting notes + review stats
// ============================================================
export async function getAllBeans(): Promise<BeanWithStats[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('beans')
    .select(`
      *,
      roaster:roasters(*),
      bean_tasting_notes(
        tasting_notes(*)
      ),
      reviews(rating)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getAllBeans error:', error)
    return []
  }

  return (data ?? []).map((row) => mapBeanRow(row as Record<string, unknown>))
}

// ============================================================
// Get featured beans
// ============================================================
export async function getFeaturedBeans(limit = 4): Promise<BeanWithStats[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('beans')
    .select(`
      *,
      roaster:roasters(*),
      bean_tasting_notes(
        tasting_notes(*)
      ),
      reviews(rating)
    `)
    .eq('is_active', true)
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('getFeaturedBeans error:', error)
    return []
  }

  return (data ?? []).map((row) => mapBeanRow(row as Record<string, unknown>))
}

// ============================================================
// Get a single bean by slug with reviews
// ============================================================
export async function getBeanBySlug(slug: string): Promise<BeanWithReviews | null> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('beans')
    .select(`
      *,
      roaster:roasters(*),
      bean_tasting_notes(
        tasting_notes(*)
      ),
      reviews(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    console.error('getBeanBySlug error:', error)
    return null
  }

  const row = data as Record<string, unknown>
  const notes = Array.isArray(row.bean_tasting_notes)
    ? (row.bean_tasting_notes as Array<{ tasting_notes: Record<string, unknown> }>)
        .filter((btn) => btn.tasting_notes != null)
        .map((btn) => btn.tasting_notes as unknown as TastingNote)
    : []

  const reviews = Array.isArray(row.reviews)
    ? (row.reviews as Array<Record<string, unknown>>)
    : []

  const avg_rating =
    reviews.length > 0
      ? Math.round(
          (reviews.reduce((s, r) => s + (r.rating as number), 0) / reviews.length) * 10
        ) / 10
      : null

  return {
    ...(row as unknown as BeanWithReviews),
    roaster: row.roaster as BeanWithReviews['roaster'],
    tasting_notes: notes,
    reviews: reviews as unknown as BeanWithReviews['reviews'],
    avg_rating,
    review_count: reviews.length,
  }
}

// ============================================================
// Search/filter beans server-side
// ============================================================
export async function searchBeans(filters: Partial<SearchFilters>): Promise<BeanWithStats[]> {
  const beans = await getAllBeans()

  let results = beans

  // Filter by origin
  if (filters.origin && filters.origin.length > 0) {
    const origins = filters.origin.map((o) => o.toLowerCase())
    results = results.filter((b) => {
      const bOrigin = b.origin.toLowerCase()
      return origins.some((o) => {
        if (o === 'africa') {
          return ['ethiopia', 'kenya', 'rwanda', 'burundi', 'tanzania', 'uganda', 'congo'].some(
            (a) => bOrigin.includes(a)
          )
        }
        if (o === 'latin america') {
          return ['colombia', 'guatemala', 'brazil', 'costa rica', 'nicaragua', 'peru', 'mexico', 'honduras', 'bolivia', 'panama'].some(
            (a) => bOrigin.includes(a)
          )
        }
        if (o === 'asia') {
          return ['indonesia', 'sumatra', 'java', 'papua', 'vietnam', 'india', 'yemen'].some(
            (a) => bOrigin.includes(a)
          )
        }
        if (o === 'blend') {
          return bOrigin.includes('blend') || bOrigin.includes('multiple')
        }
        return bOrigin.includes(o)
      })
    })
  }

  // Filter by roast
  if (filters.roast && filters.roast.length > 0) {
    results = results.filter((b) => filters.roast!.includes(b.roast_level))
  }

  // Filter by process
  if (filters.process && filters.process.length > 0) {
    results = results.filter((b) => b.process && filters.process!.includes(b.process))
  }

  // Filter by price
  if (filters.price_min != null) {
    results = results.filter((b) => b.price_usd != null && b.price_usd >= filters.price_min!)
  }
  if (filters.price_max != null) {
    results = results.filter((b) => b.price_usd != null && b.price_usd <= filters.price_max!)
  }

  // Filter by tasting notes (AND logic)
  if (filters.notes && filters.notes.length > 0) {
    results = results.filter((b) => {
      const bNoteSlugs = b.tasting_notes.map((n) => n.slug)
      return filters.notes!.every((slug) => bNoteSlugs.includes(slug))
    })
  }

  // Sort
  const sort = filters.sort ?? 'rating'
  if (sort === 'rating') {
    results = results.sort((a, b) => (b.avg_rating ?? 0) - (a.avg_rating ?? 0))
  } else if (sort === 'popularity') {
    results = results.sort((a, b) => b.review_count - a.review_count)
  } else if (sort === 'price_asc') {
    results = results.sort((a, b) => (a.price_usd ?? 999) - (b.price_usd ?? 999))
  } else if (sort === 'price_desc') {
    results = results.sort((a, b) => (b.price_usd ?? 0) - (a.price_usd ?? 0))
  } else if (sort === 'newest') {
    results = results.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
  }

  return results
}

// ============================================================
// Get related beans (same tasting notes, different roaster)
// ============================================================
export async function getRelatedBeans(
  beanId: string,
  noteIds: string[],
  roasterId: string,
  limit = 3
): Promise<BeanWithStats[]> {
  const allBeans = await getAllBeans()
  return allBeans
    .filter((b) => {
      if (b.id === beanId) return false
      if (b.roaster_id === roasterId) return false
      const bNoteIds = b.tasting_notes.map((n) => n.id)
      return noteIds.some((id) => bNoteIds.includes(id))
    })
    .slice(0, limit)
}

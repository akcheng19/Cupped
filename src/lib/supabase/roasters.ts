import { createServerComponentClient } from '../supabase-server'
import type { Roaster, RoasterWithBeans, BeanWithStats, TastingNote } from '@/types'

// ============================================================
// Get all roasters
// ============================================================
export async function getAllRoasters(): Promise<Roaster[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('roasters')
    .select('*')
    .order('name', { ascending: true })

  if (error) {
    console.error('getAllRoasters error:', error)
    return []
  }

  return data ?? []
}

// ============================================================
// Get featured roasters
// ============================================================
export async function getFeaturedRoasters(limit = 6): Promise<Roaster[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('roasters')
    .select('*')
    .eq('is_featured', true)
    .order('name', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('getFeaturedRoasters error:', error)
    return []
  }

  return data ?? []
}

// ============================================================
// Get a single roaster by slug with their beans
// ============================================================
export async function getRoasterBySlug(slug: string): Promise<RoasterWithBeans | null> {
  const supabase = await createServerComponentClient()

  const { data: roaster, error } = await supabase
    .from('roasters')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !roaster) {
    console.error('getRoasterBySlug error:', error)
    return null
  }

  const { data: beansData } = await supabase
    .from('beans')
    .select(`
      *,
      roaster:roasters(*),
      bean_tasting_notes(
        tasting_notes(*)
      ),
      reviews(rating)
    `)
    .eq('roaster_id', roaster.id)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  const beans: BeanWithStats[] = (beansData ?? []).map((row) => {
    const r = row as Record<string, unknown>
    const notes = Array.isArray(r.bean_tasting_notes)
      ? (r.bean_tasting_notes as Array<{ tasting_notes: Record<string, unknown> }>)
          .filter((btn) => btn.tasting_notes != null)
          .map((btn) => btn.tasting_notes as unknown as TastingNote)
      : []
    const reviews = Array.isArray(r.reviews) ? (r.reviews as Array<{ rating: number }>) : []
    const avg_rating =
      reviews.length > 0
        ? Math.round((reviews.reduce((s, rv) => s + rv.rating, 0) / reviews.length) * 10) / 10
        : null
    return {
      ...(r as unknown as BeanWithStats),
      roaster: roaster as BeanWithStats['roaster'],
      tasting_notes: notes,
      avg_rating,
      review_count: reviews.length,
    }
  })

  const allRatings = beans.flatMap((b) =>
    b.avg_rating != null ? [b.avg_rating] : []
  )
  const avg_rating =
    allRatings.length > 0
      ? Math.round((allRatings.reduce((s, r) => s + r, 0) / allRatings.length) * 10) / 10
      : null

  const total_reviews = beans.reduce((s, b) => s + b.review_count, 0)

  return { ...(roaster as Roaster), beans, avg_rating, total_reviews }
}

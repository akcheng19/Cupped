import { createServerComponentClient } from '../supabase-server'
import type { TastingNote, TastingNoteCategory } from '@/types'

// ============================================================
// Get all tasting notes
// ============================================================
export async function getAllTastingNotes(): Promise<TastingNote[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('tasting_notes')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true })

  if (error) {
    console.error('getAllTastingNotes error:', error)
    return []
  }

  return data ?? []
}

// ============================================================
// Get tasting notes grouped by category
// ============================================================
export async function getTastingNotesByCategory(): Promise<
  Record<TastingNoteCategory, TastingNote[]>
> {
  const notes = await getAllTastingNotes()

  const grouped = {} as Record<TastingNoteCategory, TastingNote[]>
  for (const note of notes) {
    const cat = note.category as TastingNoteCategory
    if (!grouped[cat]) grouped[cat] = []
    grouped[cat].push(note)
  }

  return grouped
}

// ============================================================
// Get a single tasting note by slug
// ============================================================
export async function getTastingNoteBySlug(slug: string): Promise<TastingNote | null> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('tasting_notes')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null
  return data
}

// ============================================================
// Get top N most-used tasting notes (by bean count)
// ============================================================
export async function getTopTastingNotes(limit = 12): Promise<TastingNote[]> {
  const supabase = await createServerComponentClient()

  // Get note usage counts
  const { data: counts } = await supabase
    .from('bean_tasting_notes')
    .select('note_id')

  if (!counts) return []

  const countMap: Record<string, number> = {}
  for (const row of counts) {
    countMap[row.note_id] = (countMap[row.note_id] ?? 0) + 1
  }

  const { data: notes } = await supabase
    .from('tasting_notes')
    .select('*')

  if (!notes) return []

  return (notes as TastingNote[])
    .sort((a, b) => (countMap[b.id] ?? 0) - (countMap[a.id] ?? 0))
    .slice(0, limit)
}

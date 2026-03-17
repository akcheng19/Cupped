import { createServerComponentClient } from '../supabase-server'
import { createClient } from '../supabase'
import type { Review } from '@/types'

// ============================================================
// Get reviews for a bean
// ============================================================
export async function getReviewsByBeanId(beanId: string): Promise<Review[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('bean_id', beanId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getReviewsByBeanId error:', error)
    return []
  }

  return data ?? []
}

// ============================================================
// Submit a review (client-side)
// ============================================================
export async function submitReview(review: {
  bean_id: string
  reviewer_name: string
  rating: number
  review_text: string
}): Promise<{ success: boolean; error?: string }> {
  const supabase = createClient()

  const { error } = await supabase.from('reviews').insert([review])

  if (error) {
    console.error('submitReview error:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}

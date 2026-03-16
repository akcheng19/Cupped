import { Metadata } from 'next'
import { createServerComponentClient } from '@/lib/supabase-server'
import { BeansPageClient } from '@/components/BeansPageClient'
import { Bean } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Explore Coffee Beans',
  description: 'Browse and filter specialty coffee beans by roast level, process, origin, and more.',
}

type BeanWithMeta = Bean & {
  average_rating: number | null
  review_count: number
}

async function getAllBeans(): Promise<BeanWithMeta[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('beans')
    .select(`
      *,
      roaster:roasters(*)
    `)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching beans:', error)
    return []
  }

  const beans = data ?? []
  if (beans.length === 0) return []

  const beanIds = beans.map((b) => b.id)
  const { data: reviewStats } = await supabase
    .from('reviews')
    .select('bean_id, rating')
    .in('bean_id', beanIds)

  const statsByBean = (reviewStats ?? []).reduce<
    Record<string, { sum: number; count: number }>
  >((acc, r) => {
    if (!acc[r.bean_id]) acc[r.bean_id] = { sum: 0, count: 0 }
    acc[r.bean_id].sum += r.rating
    acc[r.bean_id].count += 1
    return acc
  }, {})

  return beans.map((bean) => {
    const stats = statsByBean[bean.id]
    return {
      ...bean,
      average_rating: stats ? stats.sum / stats.count : null,
      review_count: stats ? stats.count : 0,
    }
  })
}

export default async function BeansPage() {
  const beans = await getAllBeans()

  // Collect unique origins for the filter sidebar
  const origins = Array.from(new Set(beans.map((b) => b.origin))).sort()

  return <BeansPageClient beans={beans} origins={origins} />
}

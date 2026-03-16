import Link from 'next/link'
import { ArrowRight, Coffee, Star, MapPin } from 'lucide-react'
import { createServerComponentClient } from '@/lib/supabase-server'
import { BeanCard } from '@/components/BeanCard'
import { RoasterCard } from '@/components/RoasterCard'
import { Bean, Roaster } from '@/lib/types'

async function getFeaturedBeans(): Promise<(Bean & { average_rating: number | null; review_count: number })[]> {
  const supabase = await createServerComponentClient()

  const { data, error } = await supabase
    .from('beans')
    .select(`
      *,
      roaster:roasters(*)
    `)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) {
    console.error('Error fetching featured beans:', error)
    return []
  }

  // Fetch review stats for each bean
  const beanIds = (data ?? []).map((b) => b.id)
  if (beanIds.length === 0) return []

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

  return (data ?? []).map((bean) => {
    const stats = statsByBean[bean.id]
    return {
      ...bean,
      average_rating: stats ? stats.sum / stats.count : null,
      review_count: stats ? stats.count : 0,
    }
  })
}

async function getFeaturedRoasters(): Promise<(Roaster & { bean_count: number })[]> {
  const supabase = await createServerComponentClient()

  const { data: roasters, error } = await supabase
    .from('roasters')
    .select('*')
    .order('created_at', { ascending: true })
    .limit(6)

  if (error) {
    console.error('Error fetching roasters:', error)
    return []
  }

  const { data: beanCounts } = await supabase
    .from('beans')
    .select('roaster_id')

  const countByRoaster = (beanCounts ?? []).reduce<Record<string, number>>((acc, b) => {
    acc[b.roaster_id] = (acc[b.roaster_id] ?? 0) + 1
    return acc
  }, {})

  return (roasters ?? []).map((r) => ({
    ...r,
    bean_count: countByRoaster[r.id] ?? 0,
  }))
}

export default async function HomePage() {
  const [featuredBeans, featuredRoasters] = await Promise.all([
    getFeaturedBeans(),
    getFeaturedRoasters(),
  ])

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-espresso-900 text-white">
        <div className="absolute inset-0 bg-gradient-radial from-espresso-700 to-espresso-900 opacity-80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-6">
              <Coffee className="w-6 h-6 text-gold-500" />
              <span className="text-gold-400 font-medium text-sm tracking-wider uppercase">
                Specialty Coffee Discovery
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Find your next{' '}
              <span className="text-gold-400">perfect cup</span>
            </h1>
            <p className="text-lg text-cream-300 leading-relaxed mb-8">
              Explore hundreds of specialty coffee beans from the world&apos;s finest roasters.
              Read real tasting notes, discover new origins, and elevate your coffee ritual.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/beans"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-espresso-900 font-semibold rounded-xl transition-colors"
              >
                Explore Beans
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-espresso-800 text-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{featuredBeans.length > 0 ? '20+' : '0'}</p>
              <p className="text-sm text-cream-400">Coffee Beans</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{featuredRoasters.length > 0 ? '12' : '0'}</p>
              <p className="text-sm text-cream-400">Roasters</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">{featuredRoasters.length > 0 ? '35+' : '0'}</p>
              <p className="text-sm text-cream-400">Reviews</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-white">15+</p>
              <p className="text-sm text-cream-400">Origins</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-espresso-900 mb-10 text-center">
          Discover coffee your way
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Coffee className="w-6 h-6" />,
              title: 'Browse Beans',
              description: 'Filter by roast level, process, origin, and price to find exactly what you\'re looking for.',
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              title: 'Explore Origins',
              description: 'Discover beans from Ethiopia, Colombia, Guatemala, and 12+ other coffee-growing regions.',
            },
            {
              icon: <Star className="w-6 h-6" />,
              title: 'Read Reviews',
              description: 'Get honest tasting notes and brew recommendations from the community.',
            },
          ].map((step, i) => (
            <div
              key={i}
              className="text-center p-6 rounded-2xl bg-white border border-cream-300 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-espresso-100 text-espresso-600 flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="font-semibold text-espresso-900 mb-2">{step.title}</h3>
              <p className="text-sm text-espresso-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Beans */}
      {featuredBeans.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-espresso-900">Latest Beans</h2>
            <Link
              href="/beans"
              className="flex items-center gap-1.5 text-sm font-medium text-espresso-600 hover:text-espresso-900 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredBeans.map((bean) => (
              <BeanCard key={bean.id} bean={bean} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Roasters */}
      {featuredRoasters.length > 0 && (
        <section className="bg-cream-200 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-espresso-900">Featured Roasters</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredRoasters.map((roaster) => (
                <RoasterCard key={roaster.id} roaster={roaster} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-espresso-900 mb-4">
          Ready to find your next favorite?
        </h2>
        <p className="text-espresso-600 mb-8 max-w-md mx-auto">
          Browse our full catalog of specialty beans, filtered by everything that matters to you.
        </p>
        <Link
          href="/beans"
          className="inline-flex items-center gap-2 px-8 py-3 bg-espresso-800 hover:bg-espresso-700 text-white font-semibold rounded-xl transition-colors"
        >
          Explore All Beans
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}

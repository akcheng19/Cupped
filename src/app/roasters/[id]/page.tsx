import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Calendar, Globe } from 'lucide-react'
import { createServerComponentClient } from '@/lib/supabase-server'
import { BeanCard } from '@/components/BeanCard'
import { Bean, Roaster } from '@/lib/types'

interface RoasterWithBeans extends Roaster {
  beans: (Bean & { average_rating: number | null; review_count: number })[]
}

async function getRoasterWithBeans(id: string): Promise<RoasterWithBeans | null> {
  const supabase = await createServerComponentClient()

  const { data: roaster, error } = await supabase
    .from('roasters')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !roaster) return null

  const { data: beans } = await supabase
    .from('beans')
    .select('*')
    .eq('roaster_id', id)
    .order('name', { ascending: true })

  const beanList = beans ?? []

  if (beanList.length === 0) {
    return { ...roaster, beans: [] }
  }

  const beanIds = beanList.map((b) => b.id)
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

  const beansWithMeta = beanList.map((bean) => {
    const stats = statsByBean[bean.id]
    return {
      ...bean,
      roaster,
      average_rating: stats ? stats.sum / stats.count : null,
      review_count: stats ? stats.count : 0,
    }
  })

  return { ...roaster, beans: beansWithMeta }
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createServerComponentClient()
  const { data } = await supabase
    .from('roasters')
    .select('name, location')
    .eq('id', id)
    .single()

  if (!data) return { title: 'Roaster Not Found' }

  return {
    title: `${data.name} — Specialty Roaster`,
    description: `Explore coffee beans from ${data.name}, based in ${data.location}.`,
  }
}

export default async function RoasterPage({ params }: Props) {
  const { id } = await params
  const roaster = await getRoasterWithBeans(id)

  if (!roaster) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/beans"
        className="inline-flex items-center gap-1.5 text-sm text-espresso-500 hover:text-espresso-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Beans
      </Link>

      {/* Roaster header */}
      <div className="bg-white rounded-2xl border border-cream-300 p-6 md:p-8 mb-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Logo */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-espresso-300 to-espresso-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-3xl">
              {roaster.name.charAt(0)}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-espresso-900 mb-3">{roaster.name}</h1>

            <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
              <span className="flex items-center gap-1.5 text-sm text-espresso-600">
                <MapPin className="w-4 h-4 text-espresso-400" />
                {roaster.location}
              </span>
              {roaster.founded_year && (
                <span className="flex items-center gap-1.5 text-sm text-espresso-600">
                  <Calendar className="w-4 h-4 text-espresso-400" />
                  Est. {roaster.founded_year}
                </span>
              )}
              {roaster.website && (
                <a
                  href={roaster.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-espresso-500 hover:text-espresso-800 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  Website
                </a>
              )}
            </div>

            {roaster.description && (
              <p className="text-espresso-700 leading-relaxed max-w-2xl">
                {roaster.description}
              </p>
            )}
          </div>

          {/* Bean count */}
          <div className="flex-shrink-0 text-center bg-cream-100 rounded-xl px-5 py-4 border border-cream-200">
            <p className="text-3xl font-bold text-espresso-900">{roaster.beans.length}</p>
            <p className="text-sm text-espresso-500 mt-0.5">
              {roaster.beans.length === 1 ? 'Bean' : 'Beans'}
            </p>
          </div>
        </div>
      </div>

      {/* Beans grid */}
      <div>
        <h2 className="text-xl font-bold text-espresso-900 mb-6">
          Beans from {roaster.name}
        </h2>

        {roaster.beans.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-cream-300">
            <p className="text-espresso-400 text-lg mb-2">No beans listed yet</p>
            <p className="text-espresso-300 text-sm">Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {roaster.beans.map((bean) => (
              <BeanCard key={bean.id} bean={bean} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

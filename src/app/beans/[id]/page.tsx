import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, MapPin, Thermometer, Droplets, Star, Package } from 'lucide-react'
import { createServerComponentClient } from '@/lib/supabase-server'
import { StarRating } from '@/components/StarRating'
import { ReviewCard } from '@/components/ReviewCard'
import {
  cn,
  formatPrice,
  formatWeight,
  roastLevelColor,
  processColor,
  formatRoastLevel,
  formatProcess,
} from '@/lib/utils'
import { Bean, Roaster, Review } from '@/lib/types'

interface BeanDetailData extends Bean {
  roaster: Roaster
}

async function getBeanWithDetails(id: string): Promise<{
  bean: BeanDetailData
  reviews: Review[]
  averageRating: number | null
} | null> {
  const supabase = await createServerComponentClient()

  const { data: bean, error } = await supabase
    .from('beans')
    .select(`
      *,
      roaster:roasters(*)
    `)
    .eq('id', id)
    .single()

  if (error || !bean) return null

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .eq('bean_id', id)
    .order('created_at', { ascending: false })

  const reviewList = reviews ?? []
  const averageRating =
    reviewList.length > 0
      ? reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length
      : null

  return { bean: bean as BeanDetailData, reviews: reviewList, averageRating }
}

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createServerComponentClient()
  const { data } = await supabase
    .from('beans')
    .select('name, origin, roaster:roasters(name)')
    .eq('id', id)
    .single()

  if (!data) return { title: 'Bean Not Found' }

  const roasterName = Array.isArray(data.roaster)
    ? data.roaster[0]?.name
    : (data.roaster as { name?: string } | null)?.name

  return {
    title: `${data.name} by ${roasterName ?? 'Unknown Roaster'}`,
    description: `${data.origin} coffee — read reviews, tasting notes, and brewing tips.`,
  }
}

export default async function BeanDetailPage({ params }: Props) {
  const { id } = await params
  const result = await getBeanWithDetails(id)

  if (!result) notFound()

  const { bean, reviews, averageRating } = result

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back link */}
      <Link
        href="/beans"
        className="inline-flex items-center gap-1.5 text-sm text-espresso-500 hover:text-espresso-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Beans
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Left: image + quick info */}
        <div className="lg:col-span-2">
          {/* Image placeholder */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-espresso-100 to-espresso-300 flex items-center justify-center mb-6">
            <svg
              className="w-28 h-28 text-espresso-400 opacity-40"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M2 19h18v2H2v-2zm1-3h16l1-8H2l1 8zm6.5-9C9.5 4.5 9 2 7 2c0 2.5-1.5 4-1.5 5h4zm6 0C15.5 4.5 15 2 13 2c0 2.5-1.5 4-1.5 5h4zm-3 0C12.5 4.5 12 2 10 2c0 2.5-1.5 4-1.5 5h4z" />
            </svg>
          </div>

          {/* Quick facts card */}
          <div className="bg-white rounded-2xl border border-cream-300 p-5 space-y-4">
            <h2 className="font-semibold text-espresso-800 text-sm uppercase tracking-wider">
              Bean Details
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-espresso-700">
                <MapPin className="w-4 h-4 text-espresso-400 flex-shrink-0" />
                <span>
                  {bean.region ? `${bean.region}, ${bean.origin}` : bean.origin}
                </span>
              </div>

              <div className="flex items-center gap-2 text-espresso-700">
                <Thermometer className="w-4 h-4 text-espresso-400 flex-shrink-0" />
                <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', roastLevelColor(bean.roast_level))}>
                  {formatRoastLevel(bean.roast_level)} Roast
                </span>
              </div>

              <div className="flex items-center gap-2 text-espresso-700">
                <Droplets className="w-4 h-4 text-espresso-400 flex-shrink-0" />
                <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', processColor(bean.process))}>
                  {formatProcess(bean.process)} Process
                </span>
              </div>

              {bean.variety && (
                <div className="flex items-start gap-2 text-espresso-700">
                  <span className="text-espresso-400 w-4 flex-shrink-0 mt-0.5">🌱</span>
                  <span>Variety: {bean.variety}</span>
                </div>
              )}

              {bean.altitude_meters && (
                <div className="flex items-start gap-2 text-espresso-700">
                  <span className="text-espresso-400 w-4 flex-shrink-0 mt-0.5">⛰️</span>
                  <span>{bean.altitude_meters.toLocaleString()}m altitude</span>
                </div>
              )}

              {bean.harvest_year && (
                <div className="flex items-start gap-2 text-espresso-700">
                  <span className="text-espresso-400 w-4 flex-shrink-0 mt-0.5">📅</span>
                  <span>{bean.harvest_year} harvest</span>
                </div>
              )}

              {bean.is_single_origin && (
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-espresso-800 text-cream-100 rounded-full text-xs font-semibold">
                    Single Origin
                  </span>
                </div>
              )}
            </div>

            <div className="border-t border-cream-200 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-bold text-espresso-900">
                    {formatPrice(bean.price)}
                  </p>
                  {bean.weight_grams && (
                    <div className="flex items-center gap-1 text-xs text-espresso-400 mt-0.5">
                      <Package className="w-3 h-3" />
                      {formatWeight(bean.weight_grams)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: main content */}
        <div className="lg:col-span-3 space-y-8">
          {/* Header */}
          <div>
            <Link
              href={`/roasters/${bean.roaster.id}`}
              className="text-sm font-medium text-espresso-400 hover:text-espresso-700 uppercase tracking-wider transition-colors"
            >
              {bean.roaster.name}
            </Link>
            <h1 className="text-3xl font-bold text-espresso-900 mt-1 mb-4">{bean.name}</h1>

            {/* Rating summary */}
            <div className="flex items-center gap-3">
              {averageRating !== null ? (
                <>
                  <StarRating rating={averageRating} size="lg" showValue />
                  <span className="text-sm text-espresso-500">
                    {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                  </span>
                </>
              ) : (
                <span className="text-sm text-espresso-400 flex items-center gap-1.5">
                  <Star className="w-4 h-4" />
                  No reviews yet — be the first!
                </span>
              )}
            </div>
          </div>

          {/* Flavor notes */}
          {bean.flavor_notes.length > 0 && (
            <div>
              <h2 className="font-semibold text-espresso-800 mb-3">Flavor Notes</h2>
              <div className="flex flex-wrap gap-2">
                {bean.flavor_notes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1.5 bg-cream-200 text-espresso-700 rounded-full text-sm font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {bean.description && (
            <div>
              <h2 className="font-semibold text-espresso-800 mb-3">About This Bean</h2>
              <p className="text-espresso-700 leading-relaxed">{bean.description}</p>
            </div>
          )}

          {/* About the roaster snippet */}
          <div className="bg-cream-100 rounded-xl p-5 border border-cream-300">
            <h2 className="font-semibold text-espresso-800 mb-2">About the Roaster</h2>
            <p className="text-sm text-espresso-600 mb-3">
              {bean.roaster.description ??
                `${bean.roaster.name} is a specialty coffee roaster based in ${bean.roaster.location}.`}
            </p>
            <Link
              href={`/roasters/${bean.roaster.id}`}
              className="text-sm font-medium text-espresso-700 hover:text-espresso-900 underline transition-colors"
            >
              View all beans from {bean.roaster.name} →
            </Link>
          </div>

          {/* Reviews section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-espresso-900">
                Reviews ({reviews.length})
              </h2>
            </div>

            {/* Rating breakdown */}
            {reviews.length > 0 && (
              <div className="bg-white rounded-xl border border-cream-300 p-5 mb-6">
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-espresso-900">
                      {averageRating!.toFixed(1)}
                    </p>
                    <StarRating rating={averageRating!} size="md" className="mt-1 justify-center" />
                    <p className="text-xs text-espresso-400 mt-1">
                      {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {ratingBreakdown.map(({ star, count }) => (
                      <div key={star} className="flex items-center gap-2 text-xs">
                        <span className="w-3 text-right text-espresso-500">{star}</span>
                        <Star className="w-3 h-3 text-gold-500 flex-shrink-0" />
                        <div className="flex-1 bg-cream-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full bg-gold-500 rounded-full"
                            style={{
                              width: reviews.length > 0
                                ? `${(count / reviews.length) * 100}%`
                                : '0%',
                            }}
                          />
                        </div>
                        <span className="w-4 text-espresso-400">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {reviews.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-cream-300">
                <Star className="w-10 h-10 text-cream-300 mx-auto mb-3" />
                <p className="text-espresso-500 font-medium">No reviews yet</p>
                <p className="text-sm text-espresso-400 mt-1">Be the first to review this bean</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

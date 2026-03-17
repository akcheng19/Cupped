import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, ExternalLink } from 'lucide-react'
import { getRoasterBySlug } from '@/lib/supabase/roasters'
import { BeanGrid } from '@/components/sections/BeanGrid'
import { StarRating } from '@/components/ui/StarRating'

interface RoasterPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: RoasterPageProps): Promise<Metadata> {
  const roaster = await getRoasterBySlug(params.slug)
  if (!roaster) return {}
  return {
    title: `${roaster.name} — Coffee Roaster`,
    description:
      roaster.description?.slice(0, 160) ??
      `Explore all specialty coffee beans from ${roaster.name}.`,
  }
}

export default async function RoasterPage({ params }: RoasterPageProps) {
  const roaster = await getRoasterBySlug(params.slug)
  if (!roaster) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-6 font-mono">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[var(--color-text)]">{roaster.name}</span>
      </nav>

      {/* Roaster header */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-8 mb-10">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          {/* Avatar / Logo */}
          <div className="w-20 h-20 rounded-2xl bg-[var(--color-accent-soft)] flex items-center justify-center text-[var(--color-accent)] font-display font-bold text-3xl flex-shrink-0">
            {roaster.logo_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={roaster.logo_url}
                alt={roaster.name}
                className="w-full h-full object-contain rounded-2xl"
              />
            ) : (
              roaster.name.charAt(0)
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text)] mb-2">
              {roaster.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-3">
              {roaster.location_city && (
                <span className="flex items-center gap-1.5 text-sm text-[var(--color-muted)] font-mono">
                  <MapPin className="w-3.5 h-3.5" />
                  {roaster.location_city}, {roaster.location_state}
                </span>
              )}
              <StarRating
                rating={roaster.avg_rating}
                reviewCount={roaster.total_reviews}
                size="sm"
              />
              <span className="text-sm font-mono text-[var(--color-muted)]">
                {roaster.beans.length} bean{roaster.beans.length !== 1 ? 's' : ''}
              </span>
            </div>

            {roaster.description && (
              <p className="text-[var(--color-text)] leading-relaxed mb-4 max-w-2xl">
                {roaster.description}
              </p>
            )}

            {roaster.website_url && (
              <a
                href={roaster.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--color-border)] text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
              >
                Visit {roaster.name}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Beans */}
      <div>
        <h2 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-6">
          Beans from {roaster.name}
        </h2>
        <BeanGrid
          beans={roaster.beans}
          emptyMessage={`No beans listed for ${roaster.name} yet.`}
        />
      </div>
    </div>
  )
}

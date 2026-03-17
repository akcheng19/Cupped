import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Package, Mountain, Sprout } from 'lucide-react'
import { getBeanBySlug, getRelatedBeans } from '@/lib/supabase/beans'
import { FlavorTag } from '@/components/ui/FlavorTag'
import { RoastBadge } from '@/components/ui/RoastBadge'
import { StarRating } from '@/components/ui/StarRating'
import { PriceTag } from '@/components/ui/PriceTag'
import { AffiliateButton } from '@/components/ui/AffiliateButton'
import { ReviewsList } from '@/components/sections/ReviewsList'
import { ReviewForm } from '@/components/sections/ReviewForm'
import { RelatedBeans } from '@/components/sections/RelatedBeans'

interface BeanPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BeanPageProps): Promise<Metadata> {
  const bean = await getBeanBySlug(params.slug)
  if (!bean) return {}

  const noteNames = bean.tasting_notes.map((n) => n.name).join(', ')
  return {
    title: `${bean.name} by ${bean.roaster.name}`,
    description: `${bean.name} from ${bean.origin}. Tasting notes: ${noteNames}. ${bean.description?.slice(0, 120) ?? ''}`,
  }
}

export default async function BeanPage({ params }: BeanPageProps) {
  const bean = await getBeanBySlug(params.slug)
  if (!bean) notFound()

  const noteIds = bean.tasting_notes.map((n) => n.id)
  const relatedBeans = await getRelatedBeans(bean.id, noteIds, bean.roaster_id, 3)

  const processLabel: Record<string, string> = {
    washed: 'Washed',
    natural: 'Natural',
    honey: 'Honey',
    anaerobic: 'Anaerobic',
    'wet-hulled': 'Wet-Hulled',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-muted)] mb-6 font-mono">
        <Link href="/" className="hover:text-[var(--color-accent)] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/search" className="hover:text-[var(--color-accent)] transition-colors">Beans</Link>
        <span>/</span>
        <span className="text-[var(--color-text)] truncate">{bean.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
        {/* Image column */}
        <div className="lg:col-span-2">
          <div className="aspect-square rounded-2xl overflow-hidden bg-[var(--color-bg)] border border-[var(--color-border)]">
            {bean.image_url ? (
              <Image
                src={bean.image_url}
                alt={bean.name}
                width={600}
                height={600}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">
                ☕
              </div>
            )}
          </div>
        </div>

        {/* Details column */}
        <div className="lg:col-span-3">
          {/* Roaster */}
          <Link
            href={`/roaster/${bean.roaster.slug}`}
            className="text-sm font-mono text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors mb-2 block"
          >
            {bean.roaster.name}
          </Link>

          {/* Name + Roast Badge */}
          <div className="flex items-start gap-3 mb-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--color-text)] leading-tight flex-1">
              {bean.name}
            </h1>
            <RoastBadge level={bean.roast_level} className="flex-shrink-0 mt-1.5" />
          </div>

          {/* Rating */}
          <div className="mb-5">
            <StarRating
              rating={bean.avg_rating}
              reviewCount={bean.review_count}
              size="md"
            />
          </div>

          {/* Flavor tags */}
          {bean.tasting_notes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {bean.tasting_notes.map((note) => (
                <FlavorTag key={note.id} note={note} linked />
              ))}
            </div>
          )}

          {/* Description */}
          {bean.description && (
            <p className="text-[var(--color-text)] leading-relaxed mb-6 text-base">
              {bean.description}
            </p>
          )}

          {/* Bean details grid */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <BeanDetail icon={<MapPin className="w-4 h-4" />} label="Origin">
              {bean.origin}{bean.region ? `, ${bean.region}` : ''}
            </BeanDetail>
            {bean.process && (
              <BeanDetail icon={<Sprout className="w-4 h-4" />} label="Process">
                {processLabel[bean.process] ?? bean.process}
              </BeanDetail>
            )}
            {bean.altitude_masl && (
              <BeanDetail icon={<Mountain className="w-4 h-4" />} label="Altitude">
                {bean.altitude_masl.toLocaleString()}m
              </BeanDetail>
            )}
            {bean.varietal && (
              <BeanDetail icon={<Sprout className="w-4 h-4" />} label="Varietal">
                {bean.varietal}
              </BeanDetail>
            )}
            <BeanDetail icon={<Package className="w-4 h-4" />} label="Bag Size">
              {bean.bag_size_oz}oz
            </BeanDetail>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center gap-6 p-5 bg-[var(--color-bg)] rounded-xl border border-[var(--color-border)]">
            <PriceTag price={bean.price_usd} bagSize={bean.bag_size_oz} />
            <AffiliateButton
              url={bean.affiliate_url}
              roasterName={bean.roaster.name}
              size="lg"
              className="flex-1 justify-center"
            />
          </div>
        </div>
      </div>

      {/* Roaster info card */}
      <div className="bg-white rounded-xl border border-[var(--color-border)] p-6 mb-10">
        <h2 className="font-display font-semibold text-lg text-[var(--color-text)] mb-2">
          About {bean.roaster.name}
        </h2>
        <div className="flex items-center gap-2 text-sm text-[var(--color-muted)] font-mono mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {bean.roaster.location_city}, {bean.roaster.location_state}
        </div>
        {bean.roaster.description && (
          <p className="text-sm text-[var(--color-text)] leading-relaxed mb-4 line-clamp-3">
            {bean.roaster.description}
          </p>
        )}
        <div className="flex items-center gap-3">
          <Link
            href={`/roaster/${bean.roaster.slug}`}
            className="text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
          >
            View all beans →
          </Link>
          {bean.roaster.website_url && (
            <a
              href={bean.roaster.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Visit website ↗
            </a>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mb-12">
        <h2 className="font-display font-semibold text-2xl text-[var(--color-text)] mb-6">
          Reviews ({bean.review_count})
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <ReviewsList reviews={bean.reviews} />
          </div>
          <div>
            <ReviewForm beanId={bean.id} beanName={bean.name} />
          </div>
        </div>
      </div>

      {/* Related beans */}
      {relatedBeans.length > 0 && <RelatedBeans beans={relatedBeans} />}
    </div>
  )
}

function BeanDetail({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-2 p-3 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)]">
      <span className="text-[var(--color-muted)] mt-0.5 flex-shrink-0">{icon}</span>
      <div>
        <p className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-[var(--color-text)]">{children}</p>
      </div>
    </div>
  )
}

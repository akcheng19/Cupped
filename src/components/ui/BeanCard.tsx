import Link from 'next/link'
import Image from 'next/image'
import { FlavorTag } from './FlavorTag'
import { RoastBadge } from './RoastBadge'
import { StarRating } from './StarRating'
import { AffiliateButton } from './AffiliateButton'
import type { BeanWithStats } from '@/types'

const ROAST_BORDER: Record<string, string> = {
  light:         'border-l-[#D4A96A]',
  medium:        'border-l-[#A0622A]',
  'medium-dark': 'border-l-[#6B3020]',
  dark:          'border-l-[#4A2010]',
}

interface BeanCardProps {
  bean: BeanWithStats
}

export function BeanCard({ bean }: BeanCardProps) {
  const borderColor = ROAST_BORDER[bean.roast_level] ?? 'border-l-gray-300'

  return (
    <article
      className={`bg-white rounded-xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow overflow-hidden border-l-4 ${borderColor} flex flex-col`}
    >
      {/* Image */}
      <Link href={`/bean/${bean.slug}`} className="block aspect-[4/3] relative bg-[var(--color-bg)] overflow-hidden">
        {bean.image_url ? (
          <Image
            src={bean.image_url}
            alt={bean.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            ☕
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link
              href={`/bean/${bean.slug}`}
              className="font-display font-semibold text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors leading-tight line-clamp-2"
            >
              {bean.name}
            </Link>
            <RoastBadge level={bean.roast_level} showLabel={false} className="flex-shrink-0 mt-0.5" />
          </div>
          <Link
            href={`/roaster/${bean.roaster?.slug}`}
            className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            {bean.roaster?.name}
          </Link>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="text-xs font-mono text-[var(--color-muted)] bg-[var(--color-bg)] px-2 py-0.5 rounded-full border border-[var(--color-border)]">
            {bean.origin}{bean.region ? `, ${bean.region}` : ''}
          </span>
          {bean.process && (
            <span className="text-xs font-mono text-[var(--color-muted)] bg-[var(--color-bg)] px-2 py-0.5 rounded-full border border-[var(--color-border)] capitalize">
              {bean.process}
            </span>
          )}
        </div>

        {/* Flavor tags */}
        {bean.tasting_notes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {bean.tasting_notes.slice(0, 3).map((note) => (
              <FlavorTag key={note.id} note={note} size="sm" />
            ))}
            {bean.tasting_notes.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-mono bg-gray-100 text-gray-500">
                +{bean.tasting_notes.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Rating */}
        <div className="mb-4">
          <StarRating
            rating={bean.avg_rating}
            reviewCount={bean.review_count}
            size="sm"
          />
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div>
            {bean.price_usd != null ? (
              <span className="font-mono font-bold text-lg text-[var(--color-text)]">
                ${bean.price_usd.toFixed(2)}
              </span>
            ) : (
              <span className="text-sm text-[var(--color-muted)] font-mono">—</span>
            )}
            <span className="text-xs text-[var(--color-muted)] font-mono ml-1">
              /{bean.bag_size_oz}oz
            </span>
          </div>
          <AffiliateButton
            url={bean.affiliate_url}
            size="sm"
            className="text-sm px-3 py-1.5"
          />
        </div>
      </div>
    </article>
  )
}

import { Review } from '@/lib/types'
import { StarRating } from '@/components/StarRating'
import { cn, timeAgo, capitalizeFirst } from '@/lib/utils'

interface ReviewCardProps {
  review: Review
  className?: string
}

const BREW_ICONS: Record<string, string> = {
  espresso: '☕',
  'pour-over': '🫗',
  'french-press': '🫖',
  aeropress: '🧪',
  'cold-brew': '🧊',
  drip: '💧',
  'moka-pot': '☕',
}

export function ReviewCard({ review, className }: ReviewCardProps) {
  return (
    <article className={cn('bg-white rounded-xl border border-cream-300 p-5', className)}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-espresso-300 to-espresso-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {review.reviewer_name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium text-espresso-900 text-sm">{review.reviewer_name}</p>
            <p className="text-xs text-espresso-400">{timeAgo(review.created_at)}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StarRating rating={review.rating} size="sm" showValue />
          {review.brew_method && (
            <span className="flex items-center gap-1 text-xs text-espresso-400 bg-cream-100 px-2 py-0.5 rounded-full">
              <span>{BREW_ICONS[review.brew_method] ?? '☕'}</span>
              {capitalizeFirst(review.brew_method.replace('-', ' '))}
            </span>
          )}
        </div>
      </div>

      {review.title && (
        <h4 className="font-semibold text-espresso-800 mb-1.5">{review.title}</h4>
      )}
      <p className="text-sm text-espresso-600 leading-relaxed">{review.body}</p>
    </article>
  )
}

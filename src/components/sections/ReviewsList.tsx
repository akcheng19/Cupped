import { StarRating } from '@/components/ui/StarRating'
import { timeAgo } from '@/lib/utils'
import type { Review } from '@/types'

interface ReviewsListProps {
  reviews: Review[]
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-[var(--color-muted)] text-sm italic">
        No reviews yet. Be the first to share your thoughts!
      </p>
    )
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white rounded-xl border border-[var(--color-border)] p-5"
        >
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <p className="font-semibold text-[var(--color-text)] text-sm">
                {review.reviewer_name}
              </p>
              <StarRating rating={review.rating} showCount={false} size="sm" />
            </div>
            <span className="text-xs text-[var(--color-muted)] font-mono flex-shrink-0">
              {timeAgo(review.created_at)}
            </span>
          </div>
          {review.review_text && (
            <p className="text-sm text-[var(--color-text)] leading-relaxed">
              {review.review_text}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

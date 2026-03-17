import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number | null
  reviewCount?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  className?: string
}

export function StarRating({
  rating,
  reviewCount,
  size = 'md',
  showCount = true,
  className,
}: StarRatingProps) {
  if (rating === null) {
    return (
      <span className={cn('text-xs text-[var(--color-muted)] font-mono', className)}>
        No reviews yet
      </span>
    )
  }

  const starSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
  const filledStars = Math.floor(rating)
  const hasHalf = rating - filledStars >= 0.5

  return (
    <div className={cn('inline-flex items-center gap-1.5', className)}>
      <div className={cn('flex items-center', starSize)}>
        {Array.from({ length: 5 }, (_, i) => {
          if (i < filledStars) return <span key={i} className="text-amber-500">★</span>
          if (i === filledStars && hasHalf) return <span key={i} className="text-amber-400">★</span>
          return <span key={i} className="text-gray-300">★</span>
        })}
      </div>
      <span className={cn('font-mono font-medium text-[var(--color-text)]', textSize)}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount != null && (
        <span className={cn('text-[var(--color-muted)]', textSize)}>
          ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  )
}

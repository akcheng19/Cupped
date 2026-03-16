import Link from 'next/link'
import { Bean } from '@/lib/types'
import { StarRating } from '@/components/StarRating'
import { cn, formatPrice, formatWeight, roastLevelColor, processColor, formatRoastLevel, formatProcess } from '@/lib/utils'

interface BeanCardProps {
  bean: Bean & {
    average_rating?: number | null
    review_count?: number
  }
  className?: string
}

export function BeanCard({ bean, className }: BeanCardProps) {
  return (
    <Link href={`/beans/${bean.id}`} className={cn('group block', className)}>
      <article className="h-full bg-white rounded-2xl border border-cream-300 overflow-hidden hover:shadow-lg hover:border-espresso-300 transition-all duration-200">
        {/* Image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-espresso-100 to-espresso-200 flex items-center justify-center overflow-hidden">
          <div className="text-espresso-400 opacity-30">
            <svg
              className="w-20 h-20"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M2 19h18v2H2v-2zm1-3h16l1-8H2l1 8zm6.5-9C9.5 4.5 9 2 7 2c0 2.5-1.5 4-1.5 5h4zm6 0C15.5 4.5 15 2 13 2c0 2.5-1.5 4-1.5 5h4zm-3 0C12.5 4.5 12 2 10 2c0 2.5-1.5 4-1.5 5h4z" />
            </svg>
          </div>
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', roastLevelColor(bean.roast_level))}>
              {formatRoastLevel(bean.roast_level)}
            </span>
            <span className={cn('px-2 py-0.5 rounded-full text-xs font-semibold', processColor(bean.process))}>
              {formatProcess(bean.process)}
            </span>
          </div>
          {bean.is_single_origin && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-espresso-800 text-cream-100">
                Single Origin
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {bean.roaster && (
            <p className="text-xs font-medium text-espresso-400 uppercase tracking-wider mb-1">
              {bean.roaster.name}
            </p>
          )}
          <h3 className="font-semibold text-espresso-900 group-hover:text-espresso-600 transition-colors line-clamp-2 mb-1">
            {bean.name}
          </h3>
          <p className="text-sm text-espresso-500 mb-3">{bean.origin}</p>

          {/* Flavor notes */}
          {bean.flavor_notes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {bean.flavor_notes.slice(0, 3).map((note) => (
                <span
                  key={note}
                  className="px-2 py-0.5 bg-cream-200 text-espresso-600 rounded-full text-xs"
                >
                  {note}
                </span>
              ))}
              {bean.flavor_notes.length > 3 && (
                <span className="px-2 py-0.5 bg-cream-200 text-espresso-500 rounded-full text-xs">
                  +{bean.flavor_notes.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-cream-200">
            <div>
              {bean.average_rating != null ? (
                <div className="flex items-center gap-1.5">
                  <StarRating rating={bean.average_rating} size="sm" />
                  <span className="text-xs text-espresso-500">
                    ({bean.review_count ?? 0})
                  </span>
                </div>
              ) : (
                <span className="text-xs text-espresso-400">No reviews yet</span>
              )}
            </div>
            <div className="text-right">
              <p className="font-semibold text-espresso-800 text-sm">
                {formatPrice(bean.price)}
              </p>
              {bean.weight_grams && (
                <p className="text-xs text-espresso-400">{formatWeight(bean.weight_grams)}</p>
              )}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

import Link from 'next/link'
import { MapPin, Calendar, ExternalLink } from 'lucide-react'
import { Roaster } from '@/lib/types'
import { cn } from '@/lib/utils'

interface RoasterCardProps {
  roaster: Roaster & { bean_count?: number }
  className?: string
}

export function RoasterCard({ roaster, className }: RoasterCardProps) {
  return (
    <Link href={`/roasters/${roaster.id}`} className={cn('group block', className)}>
      <article className="h-full bg-white rounded-2xl border border-cream-300 p-5 hover:shadow-lg hover:border-espresso-300 transition-all duration-200">
        {/* Logo placeholder */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-espresso-200 to-espresso-400 flex items-center justify-center mb-4">
          <span className="text-white font-bold text-xl">
            {roaster.name.charAt(0)}
          </span>
        </div>

        <h3 className="font-semibold text-espresso-900 group-hover:text-espresso-600 transition-colors text-lg mb-1">
          {roaster.name}
        </h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3">
          <span className="flex items-center gap-1 text-sm text-espresso-500">
            <MapPin className="w-3.5 h-3.5" />
            {roaster.location}
          </span>
          {roaster.founded_year && (
            <span className="flex items-center gap-1 text-sm text-espresso-500">
              <Calendar className="w-3.5 h-3.5" />
              Est. {roaster.founded_year}
            </span>
          )}
        </div>

        {roaster.description && (
          <p className="text-sm text-espresso-600 line-clamp-2 mb-4">
            {roaster.description}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-cream-200">
          {roaster.bean_count != null && (
            <span className="text-sm font-medium text-espresso-700">
              {roaster.bean_count} {roaster.bean_count === 1 ? 'bean' : 'beans'}
            </span>
          )}
          {roaster.website && (
            <span className="flex items-center gap-1 text-xs text-espresso-400">
              <ExternalLink className="w-3 h-3" />
              Website
            </span>
          )}
        </div>
      </article>
    </Link>
  )
}

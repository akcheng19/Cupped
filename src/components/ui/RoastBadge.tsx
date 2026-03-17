import { cn } from '@/lib/utils'
import type { RoastLevel } from '@/types'

interface RoastBadgeProps {
  level: RoastLevel | string
  showLabel?: boolean
  className?: string
}

const ROAST_STYLES: Record<string, { dot: string; label: string; display: string }> = {
  light:       { dot: 'bg-[#D4A96A]', label: 'text-amber-800 bg-amber-50 border-amber-200',  display: 'Light' },
  medium:      { dot: 'bg-[#A0622A]', label: 'text-orange-800 bg-orange-50 border-orange-200', display: 'Medium' },
  'medium-dark': { dot: 'bg-[#6B3020]', label: 'text-red-900 bg-red-50 border-red-200',      display: 'Medium Dark' },
  dark:        { dot: 'bg-[#4A2010]', label: 'text-stone-100 bg-stone-700 border-stone-600',  display: 'Dark' },
}

export function RoastBadge({ level, showLabel = true, className }: RoastBadgeProps) {
  const style = ROAST_STYLES[level] ?? ROAST_STYLES['medium']

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium font-mono',
        style.label,
        className
      )}
    >
      <span className={cn('w-2 h-2 rounded-full flex-shrink-0', style.dot)} />
      {showLabel && style.display}
    </span>
  )
}

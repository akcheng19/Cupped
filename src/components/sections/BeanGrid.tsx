import { BeanCard } from '@/components/ui/BeanCard'
import type { BeanWithStats } from '@/types'

interface BeanGridProps {
  beans: BeanWithStats[]
  emptyMessage?: string
}

export function BeanGrid({ beans, emptyMessage = 'No beans found.' }: BeanGridProps) {
  if (beans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">☕</div>
        <p className="text-[var(--color-text)] font-display text-xl font-semibold mb-2">
          No beans found
        </p>
        <p className="text-[var(--color-muted)] text-sm max-w-xs">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {beans.map((bean) => (
        <BeanCard key={bean.id} bean={bean} />
      ))}
    </div>
  )
}

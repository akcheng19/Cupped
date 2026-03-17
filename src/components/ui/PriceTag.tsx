import { cn } from '@/lib/utils'

interface PriceTagProps {
  price: number | null
  bagSize?: number
  className?: string
}

export function PriceTag({ price, bagSize = 12, className }: PriceTagProps) {
  if (price === null) {
    return (
      <span className={cn('text-sm text-[var(--color-muted)] font-mono', className)}>
        Price not listed
      </span>
    )
  }

  return (
    <div className={cn('inline-flex flex-col', className)}>
      <span className="text-lg font-bold font-mono text-[var(--color-text)]">
        ${price.toFixed(2)}
      </span>
      {bagSize && (
        <span className="text-xs text-[var(--color-muted)] font-mono">
          per {bagSize}oz bag
        </span>
      )}
    </div>
  )
}

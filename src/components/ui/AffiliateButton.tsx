import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AffiliateButtonProps {
  url: string
  roasterName?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
  className?: string
}

export function AffiliateButton({
  url,
  roasterName,
  size = 'md',
  variant = 'primary',
  className,
}: AffiliateButtonProps) {
  const label = roasterName ? `Buy from ${roasterName}` : 'Buy This Bean'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white',
    secondary:
      'bg-transparent border-2 border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]',
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 rounded-lg font-semibold transition-colors',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {label}
      <ExternalLink className="w-4 h-4 flex-shrink-0" />
    </a>
  )
}

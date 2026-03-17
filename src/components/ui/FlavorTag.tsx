import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { TastingNote } from '@/types'

interface FlavorTagProps {
  note: TastingNote | { name: string; slug: string; emoji?: string | null }
  size?: 'sm' | 'md'
  linked?: boolean
  className?: string
}

export function FlavorTag({ note, size = 'md', linked = false, className }: FlavorTagProps) {
  const classes = cn(
    'inline-flex items-center gap-1 rounded-full font-mono font-medium',
    'bg-amber-50 text-amber-800 border border-amber-200',
    size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs',
    linked && 'hover:bg-amber-100 transition-colors cursor-pointer',
    className
  )

  const content = (
    <>
      {note.emoji && <span>{note.emoji}</span>}
      {note.name}
    </>
  )

  if (linked) {
    return (
      <Link href={`/flavor/${note.slug}`} className={classes}>
        {content}
      </Link>
    )
  }

  return <span className={classes}>{content}</span>
}

'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TastingNote, TastingNoteCategory } from '@/types'

const ROAST_LEVELS = [
  { value: 'light',       label: 'Light' },
  { value: 'medium',      label: 'Medium' },
  { value: 'medium-dark', label: 'Medium Dark' },
  { value: 'dark',        label: 'Dark' },
]

const PROCESSES = [
  { value: 'washed',  label: 'Washed' },
  { value: 'natural', label: 'Natural' },
  { value: 'honey',   label: 'Honey' },
]

const ORIGINS = [
  { value: 'africa',        label: '🌍 Africa' },
  { value: 'latin america', label: '🌎 Latin America' },
  { value: 'asia',          label: '🌏 Asia / Pacific' },
  { value: 'blend',         label: '🔀 Blends' },
]

const SORT_OPTIONS = [
  { value: 'rating',     label: 'Highest Rated' },
  { value: 'popularity', label: 'Most Reviewed' },
  { value: 'price_asc',  label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'newest',     label: 'Newest' },
]

const NOTE_CATEGORIES: TastingNoteCategory[] = [
  'Fruity',
  'Chocolate & Nutty',
  'Sweet',
  'Floral',
  'Earthy & Spicy',
  'Roasted',
]

interface FilterSidebarProps {
  tastingNotes: TastingNote[]
  groupedNotes: Record<TastingNoteCategory, TastingNote[]>
}

export function FilterSidebar({ tastingNotes: _tastingNotes, groupedNotes }: FilterSidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const getParam = useCallback(
    (key: string) => searchParams.get(key) ?? '',
    [searchParams]
  )

  const getArrayParam = useCallback(
    (key: string): string[] => {
      const val = searchParams.get(key)
      return val ? val.split(',').filter(Boolean) : []
    },
    [searchParams]
  )

  const selectedNotes = getArrayParam('notes')
  const selectedOrigins = getArrayParam('origin')
  const selectedRoasts = getArrayParam('roast')
  const selectedProcesses = getArrayParam('process')
  const sort = getParam('sort') || 'rating'

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function toggleArrayParam(key: string, value: string, current: string[]) {
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateParam(key, next.join(','))
  }

  function clearAll() {
    router.push(pathname, { scroll: false })
  }

  const hasActiveFilters =
    selectedNotes.length > 0 ||
    selectedOrigins.length > 0 ||
    selectedRoasts.length > 0 ||
    selectedProcesses.length > 0

  return (
    <aside className="w-full">
      {/* Sort */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-2">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-opacity-30 font-sans"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Clear filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full mb-4 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[var(--color-accent)] border border-[var(--color-accent)] hover:bg-[var(--color-accent-soft)] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Clear all filters
        </button>
      )}

      {/* Roast Level */}
      <FilterSection title="Roast Level">
        <div className="flex flex-wrap gap-2">
          {ROAST_LEVELS.map((r) => (
            <button
              key={r.value}
              onClick={() => toggleArrayParam('roast', r.value, selectedRoasts)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-mono border transition-colors',
                selectedRoasts.includes(r.value)
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                  : 'border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Origin */}
      <FilterSection title="Origin">
        <div className="space-y-1.5">
          {ORIGINS.map((o) => (
            <label key={o.value} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedOrigins.includes(o.value)}
                onChange={() => toggleArrayParam('origin', o.value, selectedOrigins)}
                className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
              />
              <span className="text-sm text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {o.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Process */}
      <FilterSection title="Process">
        <div className="flex flex-wrap gap-2">
          {PROCESSES.map((p) => (
            <button
              key={p.value}
              onClick={() => toggleArrayParam('process', p.value, selectedProcesses)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-mono border transition-colors',
                selectedProcesses.includes(p.value)
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                  : 'border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Tasting Notes */}
      <FilterSection title="Tasting Notes">
        <div className="space-y-4">
          {NOTE_CATEGORIES.map((cat) => {
            const notes = groupedNotes[cat] ?? []
            if (notes.length === 0) return null
            return (
              <div key={cat}>
                <p className="text-xs font-semibold text-[var(--color-muted)] mb-1.5">{cat}</p>
                <div className="flex flex-wrap gap-1.5">
                  {notes.map((note) => (
                    <button
                      key={note.id}
                      onClick={() => toggleArrayParam('notes', note.slug, selectedNotes)}
                      className={cn(
                        'px-2.5 py-1 rounded-full text-xs font-mono border transition-colors',
                        selectedNotes.includes(note.slug)
                          ? 'bg-amber-500 text-white border-amber-500'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      )}
                    >
                      {note.emoji && <span className="mr-0.5">{note.emoji}</span>}
                      {note.name}
                    </button>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </FilterSection>
    </aside>
  )
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-6 pb-6 border-b border-[var(--color-border)] last:border-0">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-3">
        {title}
      </h3>
      {children}
    </div>
  )
}

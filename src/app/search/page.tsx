import type { Metadata } from 'next'
import { searchBeans } from '@/lib/supabase/beans'
import { getTastingNotesByCategory } from '@/lib/supabase/tasting-notes'
import { FilterSidebar } from '@/components/layout/FilterSidebar'
import { MobileFilterDrawer } from '@/components/layout/MobileFilterDrawer'
import { BeanGrid } from '@/components/sections/BeanGrid'
import { X } from 'lucide-react'
import Link from 'next/link'
import type { SearchFilters, TastingNoteCategory } from '@/types'
import { FALLBACK_BEANS, FALLBACK_NOTES_BY_CATEGORY, FALLBACK_NOTES } from '@/lib/fallback-data'

export const metadata: Metadata = {
  title: 'Browse Coffee Beans',
  description:
    'Search and filter specialty coffee beans by tasting notes, origin, roast level, process, and price. Find your perfect cup.',
}

interface SearchPageProps {
  searchParams: Record<string, string | string[] | undefined>
}

function parseFilters(searchParams: Record<string, string | string[] | undefined>): Partial<SearchFilters> {
  const get = (key: string) => {
    const val = searchParams[key]
    return typeof val === 'string' ? val : ''
  }
  const getArray = (key: string): string[] => {
    const val = get(key)
    return val ? val.split(',').filter(Boolean) : []
  }

  return {
    notes: getArray('notes'),
    origin: getArray('origin'),
    roast: getArray('roast'),
    process: getArray('process'),
    price_min: get('price_min') ? Number(get('price_min')) : null,
    price_max: get('price_max') ? Number(get('price_max')) : null,
    sort: (get('sort') as SearchFilters['sort']) || 'rating',
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const filters = parseFilters(searchParams)

  const [dbBeans, dbGroupedNotes] = await Promise.all([
    searchBeans(filters),
    getTastingNotesByCategory(),
  ])

  const groupedNotes = Object.keys(dbGroupedNotes).length > 0 ? dbGroupedNotes : FALLBACK_NOTES_BY_CATEGORY
  const allNotes = Object.values(groupedNotes).flat()
  const hasFilters = (filters.notes?.length ?? 0) + (filters.origin?.length ?? 0) + (filters.roast?.length ?? 0) + (filters.process?.length ?? 0) > 0

  // Apply filters to fallback beans when DB is unavailable
  let fallbackFiltered = FALLBACK_BEANS
  if (filters.origin?.length) {
    fallbackFiltered = fallbackFiltered.filter(b => filters.origin!.some(o => b.origin.toLowerCase().includes(o.toLowerCase())))
  }
  if (filters.roast?.length) {
    fallbackFiltered = fallbackFiltered.filter(b => filters.roast!.includes(b.roast_level))
  }
  if (filters.process?.length) {
    fallbackFiltered = fallbackFiltered.filter(b => b.process && filters.process!.includes(b.process))
  }
  if (filters.notes?.length) {
    fallbackFiltered = fallbackFiltered.filter(b => {
      const slugs = b.tasting_notes.map(n => n.slug)
      return filters.notes!.every(s => slugs.includes(s))
    })
  }

  const beans = dbBeans.length > 0 ? dbBeans : (hasFilters ? fallbackFiltered : FALLBACK_BEANS)

  // Build active filter labels for display
  const activeFilters: { label: string; removeHref: string }[] = []

  const sp = new URLSearchParams(
    Object.fromEntries(
      Object.entries(searchParams)
        .filter(([, v]) => typeof v === 'string')
        .map(([k, v]) => [k, v as string])
    )
  )

  if (filters.notes?.length) {
    for (const slug of filters.notes) {
      const note = allNotes.find((n) => n.slug === slug)
      const next = new URLSearchParams(sp)
      const remaining = (filters.notes ?? []).filter((s) => s !== slug)
      if (remaining.length) next.set('notes', remaining.join(','))
      else next.delete('notes')
      activeFilters.push({ label: note?.name ?? slug, removeHref: `/search?${next}` })
    }
  }
  if (filters.origin?.length) {
    for (const o of filters.origin) {
      const next = new URLSearchParams(sp)
      const remaining = (filters.origin ?? []).filter((s) => s !== o)
      if (remaining.length) next.set('origin', remaining.join(','))
      else next.delete('origin')
      activeFilters.push({
        label: o.charAt(0).toUpperCase() + o.slice(1),
        removeHref: `/search?${next}`,
      })
    }
  }
  if (filters.roast?.length) {
    for (const r of filters.roast) {
      const next = new URLSearchParams(sp)
      const remaining = (filters.roast ?? []).filter((s) => s !== r)
      if (remaining.length) next.set('roast', remaining.join(','))
      else next.delete('roast')
      activeFilters.push({
        label: r.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        removeHref: `/search?${next}`,
      })
    }
  }
  if (filters.process?.length) {
    for (const p of filters.process) {
      const next = new URLSearchParams(sp)
      const remaining = (filters.process ?? []).filter((s) => s !== p)
      if (remaining.length) next.set('process', remaining.join(','))
      else next.delete('process')
      activeFilters.push({
        label: p.charAt(0).toUpperCase() + p.slice(1),
        removeHref: `/search?${next}`,
      })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="font-display font-semibold text-lg text-[var(--color-text)] mb-6">
              Filter Beans
            </h2>
            <FilterSidebar
              tastingNotes={allNotes}
              groupedNotes={groupedNotes as Record<TastingNoteCategory, (typeof allNotes)[0][]>}
            />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <div>
              <h1 className="font-display font-semibold text-2xl text-[var(--color-text)]">
                Coffee Beans
              </h1>
              <p className="text-sm text-[var(--color-muted)] font-mono mt-0.5">
                {beans.length} bean{beans.length !== 1 ? 's' : ''} found
              </p>
            </div>

            {/* Mobile filter trigger */}
            <div className="lg:hidden">
              <MobileFilterDrawer
                tastingNotes={allNotes}
                groupedNotes={groupedNotes as Record<TastingNoteCategory, (typeof allNotes)[0][]>}
                resultCount={beans.length}
              />
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {activeFilters.map((f) => (
                <Link
                  key={f.label}
                  href={f.removeHref}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[var(--color-accent-soft)] text-[var(--color-accent-dark)] border border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                >
                  {f.label}
                  <X className="w-3 h-3" />
                </Link>
              ))}
              <Link
                href="/search"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                Clear all
              </Link>
            </div>
          )}

          <BeanGrid
            beans={beans}
            emptyMessage="Try removing a filter or broadening your search to find more beans."
          />
        </div>
      </div>
    </div>
  )
}

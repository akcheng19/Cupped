'use client'

import { cn } from '@/lib/utils'
import { FilterState } from '@/lib/types'

const ROAST_LEVELS = ['light', 'medium-light', 'medium', 'medium-dark', 'dark']
const PROCESSES = ['washed', 'natural', 'honey', 'anaerobic', 'wet-hulled']

interface FilterSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  origins: string[]
  className?: string
}

export function FilterSidebar({
  filters,
  onFiltersChange,
  origins,
  className,
}: FilterSidebarProps) {
  function toggleArray(key: 'roast_levels' | 'processes' | 'origins', value: string) {
    const current = filters[key]
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onFiltersChange({ ...filters, [key]: next })
  }

  function clearAll() {
    onFiltersChange({
      search: filters.search,
      roast_levels: [],
      processes: [],
      origins: [],
      min_price: null,
      max_price: null,
    })
  }

  const hasActiveFilters =
    filters.roast_levels.length > 0 ||
    filters.processes.length > 0 ||
    filters.origins.length > 0 ||
    filters.min_price !== null ||
    filters.max_price !== null

  return (
    <aside className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-espresso-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-espresso-500 hover:text-espresso-800 underline transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Roast Level */}
      <section>
        <h3 className="text-sm font-semibold text-espresso-700 mb-3 uppercase tracking-wider">
          Roast Level
        </h3>
        <div className="space-y-2">
          {ROAST_LEVELS.map((level) => {
            const checked = filters.roast_levels.includes(level)
            return (
              <label key={level} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArray('roast_levels', level)}
                  className="w-4 h-4 rounded border-cream-400 text-espresso-600 focus:ring-espresso-400 cursor-pointer"
                />
                <span className={cn(
                  'text-sm transition-colors',
                  checked ? 'text-espresso-900 font-medium' : 'text-espresso-600 group-hover:text-espresso-800'
                )}>
                  {level.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-')}
                </span>
              </label>
            )
          })}
        </div>
      </section>

      {/* Process */}
      <section>
        <h3 className="text-sm font-semibold text-espresso-700 mb-3 uppercase tracking-wider">
          Process
        </h3>
        <div className="space-y-2">
          {PROCESSES.map((process) => {
            const checked = filters.processes.includes(process)
            return (
              <label key={process} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleArray('processes', process)}
                  className="w-4 h-4 rounded border-cream-400 text-espresso-600 focus:ring-espresso-400 cursor-pointer"
                />
                <span className={cn(
                  'text-sm transition-colors',
                  checked ? 'text-espresso-900 font-medium' : 'text-espresso-600 group-hover:text-espresso-800'
                )}>
                  {process.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </span>
              </label>
            )
          })}
        </div>
      </section>

      {/* Origin */}
      {origins.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-espresso-700 mb-3 uppercase tracking-wider">
            Origin
          </h3>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
            {origins.map((origin) => {
              const checked = filters.origins.includes(origin)
              return (
                <label key={origin} className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleArray('origins', origin)}
                    className="w-4 h-4 rounded border-cream-400 text-espresso-600 focus:ring-espresso-400 cursor-pointer"
                  />
                  <span className={cn(
                    'text-sm transition-colors',
                    checked ? 'text-espresso-900 font-medium' : 'text-espresso-600 group-hover:text-espresso-800'
                  )}>
                    {origin}
                  </span>
                </label>
              )
            })}
          </div>
        </section>
      )}
    </aside>
  )
}

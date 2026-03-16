'use client'

import { useState, useMemo } from 'react'
import { Bean } from '@/lib/types'
import { BeanCard } from '@/components/BeanCard'
import { SearchBar } from '@/components/SearchBar'
import { FilterSidebar } from '@/components/FilterSidebar'
import { FilterState } from '@/lib/types'
import { SlidersHorizontal, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BeanWithMeta extends Bean {
  average_rating?: number | null
  review_count?: number
}

interface BeansPageClientProps {
  beans: BeanWithMeta[]
  origins: string[]
}

export function BeansPageClient({ beans, origins }: BeansPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    roast_levels: [],
    processes: [],
    origins: [],
    min_price: null,
    max_price: null,
  })
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const filteredBeans = useMemo(() => {
    return beans.filter((bean) => {
      // Search filter
      if (filters.search) {
        const q = filters.search.toLowerCase()
        const searchable = [
          bean.name,
          bean.origin,
          bean.region ?? '',
          bean.roaster?.name ?? '',
          ...bean.flavor_notes,
          bean.description ?? '',
        ]
          .join(' ')
          .toLowerCase()
        if (!searchable.includes(q)) return false
      }

      // Roast level filter
      if (filters.roast_levels.length > 0 && !filters.roast_levels.includes(bean.roast_level)) {
        return false
      }

      // Process filter
      if (filters.processes.length > 0 && !filters.processes.includes(bean.process)) {
        return false
      }

      // Origin filter
      if (filters.origins.length > 0 && !filters.origins.includes(bean.origin)) {
        return false
      }

      // Price filters
      if (filters.min_price !== null && (bean.price ?? 0) < filters.min_price) {
        return false
      }
      if (filters.max_price !== null && (bean.price ?? Infinity) > filters.max_price) {
        return false
      }

      return true
    })
  }, [beans, filters])

  const activeFilterCount =
    filters.roast_levels.length +
    filters.processes.length +
    filters.origins.length +
    (filters.min_price !== null ? 1 : 0) +
    (filters.max_price !== null ? 1 : 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-espresso-900 mb-2">Explore Coffee Beans</h1>
        <p className="text-espresso-600">
          {beans.length} beans from the world&apos;s finest specialty roasters
        </p>
      </div>

      {/* Search + filter toggle */}
      <div className="flex gap-3 mb-6">
        <SearchBar
          value={filters.search}
          onChange={(search) => setFilters((f) => ({ ...f, search }))}
          className="flex-1"
        />
        <button
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors lg:hidden',
            sidebarOpen || activeFilterCount > 0
              ? 'bg-espresso-800 text-white border-espresso-800'
              : 'bg-white text-espresso-700 border-cream-300 hover:border-espresso-300'
          )}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-gold-500 text-white text-xs flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — desktop always visible, mobile toggleable */}
        <div
          className={cn(
            'w-56 flex-shrink-0',
            'hidden lg:block',
            sidebarOpen && 'block !w-full lg:!w-56'
          )}
        >
          {/* Mobile close button */}
          {sidebarOpen && (
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <h2 className="font-semibold text-espresso-900">Filters</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg text-espresso-500 hover:bg-cream-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <FilterSidebar
            filters={filters}
            onFiltersChange={setFilters}
            origins={origins}
          />
        </div>

        {/* Main grid — hidden on mobile when sidebar is open */}
        <div className={cn('flex-1 min-w-0', sidebarOpen && 'hidden lg:block')}>
          {filteredBeans.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-espresso-400 text-lg mb-2">No beans match your filters</p>
              <p className="text-espresso-300 text-sm">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-espresso-500 mb-4">
                Showing {filteredBeans.length} {filteredBeans.length === 1 ? 'bean' : 'beans'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredBeans.map((bean) => (
                  <BeanCard key={bean.id} bean={bean} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

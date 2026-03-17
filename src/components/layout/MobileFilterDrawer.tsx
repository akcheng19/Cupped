'use client'

import { useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { FilterSidebar } from './FilterSidebar'
import type { TastingNote, TastingNoteCategory } from '@/types'

interface MobileFilterDrawerProps {
  tastingNotes: TastingNote[]
  groupedNotes: Record<TastingNoteCategory, TastingNote[]>
  resultCount: number
}

export function MobileFilterDrawer({
  tastingNotes,
  groupedNotes,
  resultCount,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--color-border)] bg-white text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filters
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-80 max-w-[90vw] bg-white z-50 transform transition-transform duration-300 shadow-2xl overflow-y-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-display font-semibold text-lg text-[var(--color-text)]">Filters</h2>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-[var(--color-bg)] text-[var(--color-muted)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <FilterSidebar tastingNotes={tastingNotes} groupedNotes={groupedNotes} />
        </div>

        {/* Apply button */}
        <div className="sticky bottom-0 bg-white border-t border-[var(--color-border)] p-4">
          <button
            onClick={() => setOpen(false)}
            className="w-full py-3 rounded-lg bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-dark)] transition-colors"
          >
            Show {resultCount} results
          </button>
        </div>
      </div>
    </>
  )
}

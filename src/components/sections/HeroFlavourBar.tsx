'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { TastingNote } from '@/types'

interface HeroFlavourBarProps {
  topNotes: TastingNote[]
}

export function HeroFlavourBar({ topNotes }: HeroFlavourBarProps) {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])

  function toggle(slug: string) {
    setSelected((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    )
  }

  function handleSearch() {
    if (selected.length === 0) {
      router.push('/search')
    } else {
      router.push(`/search?notes=${selected.join(',')}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-sm font-mono text-[var(--color-muted)] mb-4 uppercase tracking-wider">
        What are you craving?
      </p>
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {topNotes.map((note) => (
          <button
            key={note.id}
            onClick={() => toggle(note.slug)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-mono border transition-all ${
              selected.includes(note.slug)
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm scale-105'
                : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100 hover:scale-105'
            }`}
          >
            {note.emoji && <span>{note.emoji}</span>}
            {note.name}
          </button>
        ))}
      </div>
      <button
        onClick={handleSearch}
        className="px-8 py-3 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-dark)] text-white font-semibold text-base transition-colors shadow-sm"
      >
        {selected.length > 0
          ? `Find beans with ${selected.length} flavor${selected.length > 1 ? 's' : ''}`
          : 'Browse all beans'}
      </button>
    </div>
  )
}

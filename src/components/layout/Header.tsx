'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef } from 'react'
import { Menu, X, Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/search', label: 'Browse Beans' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--color-border)]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display font-semibold text-xl text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors flex-shrink-0"
          >
            <span className="text-2xl">☕</span>
            Cupped
          </Link>

          {/* Search bar — desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-sm items-center gap-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[var(--color-accent)] focus-within:ring-opacity-30 transition-all"
          >
            <Search className="w-4 h-4 text-[var(--color-muted)] flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search beans, origins, flavors..."
              className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder-[var(--color-muted)] outline-none font-sans"
            />
          </form>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href || pathname.startsWith(link.href + '/')
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent-dark)]'
                    : 'text-[var(--color-muted)] hover:bg-[var(--color-bg)] hover:text-[var(--color-text)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="sm:hidden p-2 rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-bg)] transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div className="sm:hidden border-t border-[var(--color-border)] py-3 space-y-2">
            {/* Mobile search */}
            <form
              onSubmit={(e) => {
                handleSearch(e)
                setMenuOpen(false)
              }}
              className="flex items-center gap-2 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg px-3 py-2 mx-1"
            >
              <Search className="w-4 h-4 text-[var(--color-muted)]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search beans..."
                className="flex-1 bg-transparent text-sm outline-none"
              />
            </form>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-[var(--color-accent-soft)] text-[var(--color-accent-dark)]'
                    : 'text-[var(--color-muted)] hover:bg-[var(--color-bg)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

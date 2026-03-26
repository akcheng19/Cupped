import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getFeaturedBeans } from '@/lib/supabase/beans'
import { getFeaturedRoasters } from '@/lib/supabase/roasters'
import { getTopTastingNotes } from '@/lib/supabase/tasting-notes'
import { BeanCard } from '@/components/ui/BeanCard'
import { HeroFlavourBar } from '@/components/sections/HeroFlavourBar'
import type { TastingNote, BeanWithStats, Roaster } from '@/types'

// ---------------------------------------------------------------------------
// Static fallback data — shown when Supabase is not yet connected
// ---------------------------------------------------------------------------

const FALLBACK_NOTES: TastingNote[] = [
  { id: '1', name: 'Blueberry',      category: 'Fruity',            emoji: '🫐', slug: 'blueberry' },
  { id: '2', name: 'Dark Chocolate', category: 'Chocolate & Nutty', emoji: '🍫', slug: 'dark-chocolate' },
  { id: '3', name: 'Caramel',        category: 'Sweet',             emoji: '🍮', slug: 'caramel' },
  { id: '4', name: 'Jasmine',        category: 'Floral',            emoji: '🌸', slug: 'jasmine' },
  { id: '5', name: 'Cherry',         category: 'Fruity',            emoji: '🍒', slug: 'cherry' },
  { id: '6', name: 'Hazelnut',       category: 'Chocolate & Nutty', emoji: '🌰', slug: 'hazelnut' },
  { id: '7', name: 'Honey',          category: 'Sweet',             emoji: '🍯', slug: 'honey' },
  { id: '8', name: 'Citrus',         category: 'Fruity',            emoji: '🍋', slug: 'citrus' },
  { id: '9', name: 'Brown Sugar',    category: 'Sweet',             emoji: '🧁', slug: 'brown-sugar' },
  { id: '10', name: 'Rose',          category: 'Floral',            emoji: '🌹', slug: 'rose' },
  { id: '11', name: 'Cedar',         category: 'Earthy & Spicy',    emoji: '🌲', slug: 'cedar' },
  { id: '12', name: 'Smoky',         category: 'Roasted',           emoji: '💨', slug: 'smoky' },
]

const FALLBACK_ROASTER: Roaster = {
  id: 'r1', name: 'Stumptown Coffee', slug: 'stumptown', location_city: 'Portland',
  location_state: 'OR', location_country: 'US', website_url: 'https://stumptowncoffee.com',
  logo_url: null, description: null, is_featured: true, affiliate_program: 'direct',
  created_at: '2024-01-01',
}

const FALLBACK_BEANS: BeanWithStats[] = [
  {
    id: 'b1', name: 'Hair Bender', slug: 'hair-bender',
    roaster_id: 'r1', roaster: FALLBACK_ROASTER,
    origin: 'Blend', region: null, roast_level: 'medium',
    process: 'washed', altitude_masl: null, varietal: null,
    price_usd: 19.00, bag_size_oz: 12,
    description: 'A complex, sweet, and full-bodied blend with notes of dark chocolate, caramel, and a citrus finish.',
    image_url: null, affiliate_url: 'https://stumptowncoffee.com/products/hair-bender',
    is_featured: true, is_active: true, order_count: 0, created_at: '2024-01-01',
    tasting_notes: [FALLBACK_NOTES[1], FALLBACK_NOTES[2], FALLBACK_NOTES[7]],
    avg_rating: 4.7, review_count: 142,
  },
  {
    id: 'b2', name: 'Ethiopia Yirgacheffe', slug: 'ethiopia-yirgacheffe',
    roaster_id: 'r2',
    roaster: { ...FALLBACK_ROASTER, id: 'r2', name: 'Intelligentsia', slug: 'intelligentsia', location_city: 'Chicago', location_state: 'IL' },
    origin: 'Ethiopia', region: 'Yirgacheffe', roast_level: 'light',
    process: 'washed', altitude_masl: 1900, varietal: 'Heirloom',
    price_usd: 22.00, bag_size_oz: 12,
    description: 'Bright and floral with blueberry, jasmine, and a lemon-tea finish. A classic Ethiopian natural.',
    image_url: null, affiliate_url: 'https://www.intelligentsia.com/products/ethiopia-yirgacheffe',
    is_featured: true, is_active: true, order_count: 0, created_at: '2024-01-01',
    tasting_notes: [FALLBACK_NOTES[0], FALLBACK_NOTES[3], FALLBACK_NOTES[7]],
    avg_rating: 4.9, review_count: 87,
  },
  {
    id: 'b3', name: 'Big Truck Blend', slug: 'big-truck-blend',
    roaster_id: 'r3',
    roaster: { ...FALLBACK_ROASTER, id: 'r3', name: 'Counter Culture', slug: 'counter-culture', location_city: 'Durham', location_state: 'NC' },
    origin: 'Colombia', region: 'Huila', roast_level: 'medium',
    process: 'natural', altitude_masl: 1700, varietal: 'Caturra',
    price_usd: 18.00, bag_size_oz: 12,
    description: 'Sweet and smooth with milk chocolate, hazelnut, and a hint of caramel. A daily driver.',
    image_url: null, affiliate_url: 'https://counterculturecoffee.com/products/big-truck',
    is_featured: true, is_active: true, order_count: 0, created_at: '2024-01-01',
    tasting_notes: [FALLBACK_NOTES[5], FALLBACK_NOTES[2], FALLBACK_NOTES[6]],
    avg_rating: 4.5, review_count: 63,
  },
  {
    id: 'b4', name: 'Kenya Kiambu AA', slug: 'kenya-kiambu-aa',
    roaster_id: 'r4',
    roaster: { ...FALLBACK_ROASTER, id: 'r4', name: 'Blue Bottle', slug: 'blue-bottle', location_city: 'Oakland', location_state: 'CA' },
    origin: 'Kenya', region: 'Kiambu', roast_level: 'light',
    process: 'washed', altitude_masl: 1800, varietal: 'SL28',
    price_usd: 26.00, bag_size_oz: 12,
    description: 'Juicy and vibrant — black currant, tomato, brown sugar. A classic washed Kenyan.',
    image_url: null, affiliate_url: 'https://bluebottlecoffee.com/u/kenya-kiambu',
    is_featured: true, is_active: true, order_count: 0, created_at: '2024-01-01',
    tasting_notes: [FALLBACK_NOTES[4], FALLBACK_NOTES[8], FALLBACK_NOTES[7]],
    avg_rating: 4.6, review_count: 51,
  },
]

const FALLBACK_ROASTERS: Roaster[] = [
  { id: 'r1', name: 'Stumptown',      slug: 'stumptown',       location_city: 'Portland',   location_state: 'OR', location_country: 'US', website_url: null, logo_url: null, description: null, is_featured: true, affiliate_program: null, created_at: '2024-01-01' },
  { id: 'r2', name: 'Intelligentsia', slug: 'intelligentsia',  location_city: 'Chicago',    location_state: 'IL', location_country: 'US', website_url: null, logo_url: null, description: null, is_featured: true, affiliate_program: null, created_at: '2024-01-01' },
  { id: 'r3', name: 'Counter Culture',slug: 'counter-culture', location_city: 'Durham',     location_state: 'NC', location_country: 'US', website_url: null, logo_url: null, description: null, is_featured: true, affiliate_program: null, created_at: '2024-01-01' },
  { id: 'r4', name: 'Blue Bottle',    slug: 'blue-bottle',     location_city: 'Oakland',    location_state: 'CA', location_country: 'US', website_url: null, logo_url: null, description: null, is_featured: true, affiliate_program: null, created_at: '2024-01-01' },
  { id: 'r5', name: 'Onyx Coffee',    slug: 'onyx-coffee',     location_city: 'Bentonville',location_state: 'AR', location_country: 'US', website_url: null, logo_url: null, description: null, is_featured: true, affiliate_program: null, created_at: '2024-01-01' },
  { id: 'r6', name: 'Verve Coffee',   slug: 'verve-coffee',    location_city: 'Santa Cruz', location_state: 'CA', location_country: 'US', website_url: null, logo_url: null, description: null, is_featured: true, affiliate_program: null, created_at: '2024-01-01' },
]

export const metadata: Metadata = {
  title: 'Cupped — Find Your Perfect Cup',
  description:
    'Discover specialty coffee beans by flavor. Search by tasting notes — blueberry, chocolate, caramel, jasmine — and find your perfect cup.',
}

const FLAVOR_CATEGORIES = [
  { slug: 'fruity',   label: 'Fruity',           emoji: '🍓', color: 'bg-rose-50 border-rose-200 text-rose-800 hover:bg-rose-100' },
  { slug: 'chocolate', label: 'Chocolate & Nutty', emoji: '🍫', color: 'bg-amber-50 border-amber-200 text-amber-900 hover:bg-amber-100' },
  { slug: 'sweet',    label: 'Sweet',             emoji: '🍮', color: 'bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100' },
  { slug: 'floral',   label: 'Floral',            emoji: '🌸', color: 'bg-pink-50 border-pink-200 text-pink-800 hover:bg-pink-100' },
  { slug: 'earthy',   label: 'Earthy & Spicy',   emoji: '🌿', color: 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100' },
  { slug: 'roasted',  label: 'Roasted',           emoji: '🔥', color: 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100' },
]

const ORIGINS = [
  { label: 'Ethiopia',     flag: '🇪🇹', slug: 'ethiopia' },
  { label: 'Kenya',        flag: '🇰🇪', slug: 'kenya' },
  { label: 'Colombia',     flag: '🇨🇴', slug: 'colombia' },
  { label: 'Guatemala',    flag: '🇬🇹', slug: 'guatemala' },
  { label: 'Brazil',       flag: '🇧🇷', slug: 'brazil' },
  { label: 'Costa Rica',   flag: '🇨🇷', slug: 'costa rica' },
  { label: 'Rwanda',       flag: '🇷🇼', slug: 'rwanda' },
  { label: 'Indonesia',    flag: '🇮🇩', slug: 'indonesia' },
  { label: 'Burundi',      flag: '🇧🇮', slug: 'burundi' },
  { label: 'Panama',       flag: '🇵🇦', slug: 'panama' },
  { label: 'Tanzania',     flag: '🇹🇿', slug: 'tanzania' },
  { label: 'Peru',         flag: '🇵🇪', slug: 'peru' },
]

export default async function HomePage() {
  const [featuredBeans, featuredRoasters, topNotes] = await Promise.all([
    getFeaturedBeans(4),
    getFeaturedRoasters(6),
    getTopTastingNotes(12),
  ])

  const displayNotes    = topNotes.length > 0       ? topNotes        : FALLBACK_NOTES
  const displayBeans    = featuredBeans.length > 0  ? featuredBeans   : FALLBACK_BEANS
  const displayRoasters = featuredRoasters.length > 0 ? featuredRoasters : FALLBACK_ROASTERS

  return (
    <div>
      {/* ── Hero ── */}
      <section className="bg-[var(--color-text)] text-white py-20 md:py-28 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[var(--color-accent)] font-mono text-sm uppercase tracking-widest mb-5">
            Specialty Coffee Discovery
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Find your perfect cup.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-12">
            Search by flavor, not by brand. Pick what you&apos;re craving and discover beans that match.
          </p>
          <HeroFlavourBar topNotes={displayNotes} />
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[var(--color-bg)]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { step: '01', title: 'Pick your craving', desc: 'Select flavor notes you love — blueberry, chocolate, jasmine, caramel — or just start browsing.' },
              { step: '02', title: 'Browse matched beans', desc: 'See beans that match your tastes, filtered by origin, roast level, process, and price.' },
              { step: '03', title: 'Buy direct', desc: 'Click through to buy straight from the roaster. Fresh, traceable, and as intended.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="p-6">
                <p className="font-mono text-4xl font-bold text-[var(--color-accent)] mb-3 opacity-40">
                  {step}
                </p>
                <h3 className="font-display font-semibold text-lg text-[var(--color-text)] mb-2">
                  {title}
                </h3>
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Flavor Category ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-[var(--color-text)]">
              Browse by flavor
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {FLAVOR_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/search?category=${cat.slug}`}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${cat.color}`}
              >
                <span className="text-3xl">{cat.emoji}</span>
                <span className="text-sm font-medium text-center leading-tight">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Beans ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-[var(--color-text)]">
              Featured beans
            </h2>
            <Link
              href="/search"
              className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:text-[var(--color-accent-dark)] transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {displayBeans.map((bean) => (
              <BeanCard key={bean.id} bean={bean} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Origin ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-8">
            Browse by origin
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ORIGINS.map((origin) => (
              <Link
                key={origin.slug}
                href={`/search?origin=${encodeURIComponent(origin.slug)}`}
                className="flex items-center gap-2 p-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] hover:bg-[var(--color-accent-soft)] hover:border-[var(--color-accent)] transition-colors"
              >
                <span className="text-xl">{origin.flag}</span>
                <span className="text-sm font-medium text-[var(--color-text)]">{origin.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Roasters ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-8">
            Top roasters
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {displayRoasters.map((roaster) => (
              <Link
                key={roaster.id}
                href={`/roaster/${roaster.slug}`}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-[var(--color-border)] hover:shadow-md hover:border-[var(--color-accent)] transition-all text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center text-[var(--color-accent)] font-display font-bold text-lg">
                  {roaster.name.charAt(0)}
                </div>
                <span className="text-xs font-medium text-[var(--color-text)] leading-tight line-clamp-2">
                  {roaster.name}
                </span>
                <span className="text-xs text-[var(--color-muted)] font-mono">
                  {roaster.location_city}, {roaster.location_state}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 bg-[var(--color-accent)]">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to find your next favorite?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Explore our full directory of specialty beans from the world&apos;s best roasters.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--color-accent)] font-semibold rounded-xl hover:bg-[var(--color-accent-soft)] transition-colors"
          >
            Browse All Beans
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

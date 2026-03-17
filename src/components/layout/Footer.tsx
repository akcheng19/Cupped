import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[var(--color-text)] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">☕</span>
              <span className="font-display font-semibold text-xl">Cupped</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Find your next favorite cup. Search specialty coffee beans by flavor, origin, and
              roast level — then buy direct from the roaster.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Explore
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/search" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Browse All Beans
                </Link>
              </li>
              <li>
                <Link href="/search?roast=light" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Light Roasts
                </Link>
              </li>
              <li>
                <Link href="/search?process=natural" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Natural Process
                </Link>
              </li>
              <li>
                <Link href="/search?origin=africa" className="text-sm text-gray-400 hover:text-white transition-colors">
                  African Origins
                </Link>
              </li>
              <li>
                <Link href="/search?sort=rating" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Top Rated
                </Link>
              </li>
            </ul>
          </div>

          {/* Flavors */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              By Flavor
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/search?notes=blueberry" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blueberry
                </Link>
              </li>
              <li>
                <Link href="/search?notes=dark-chocolate" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Dark Chocolate
                </Link>
              </li>
              <li>
                <Link href="/search?notes=caramel" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Caramel
                </Link>
              </li>
              <li>
                <Link href="/search?notes=jasmine" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Jasmine
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About Cupped
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Cupped. Built for coffee lovers.
          </p>
          <p className="text-xs text-gray-500 text-center sm:text-right">
            Cupped may earn a commission when you buy through links on our site.{' '}
            <Link href="/about#affiliate" className="underline hover:text-gray-300 transition-colors">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

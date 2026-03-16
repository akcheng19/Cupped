import Link from 'next/link'
import { Coffee } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-espresso-900 text-cream-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Coffee className="w-5 h-5 text-gold-500" />
              <span className="font-bold text-lg text-white">Cupped</span>
            </div>
            <p className="text-sm text-cream-400 leading-relaxed">
              Discover, review, and celebrate specialty coffee beans from the world&apos;s finest roasters.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-cream-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/beans" className="text-sm text-cream-400 hover:text-white transition-colors">
                  All Beans
                </Link>
              </li>
              <li>
                <Link href="/beans?roast_level=light" className="text-sm text-cream-400 hover:text-white transition-colors">
                  Light Roasts
                </Link>
              </li>
              <li>
                <Link href="/beans?process=natural" className="text-sm text-cream-400 hover:text-white transition-colors">
                  Natural Process
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">About</h3>
            <p className="text-sm text-cream-400 leading-relaxed">
              Cupped is a community platform for coffee enthusiasts to share tasting notes and discover exceptional beans sourced from farms around the world.
            </p>
          </div>
        </div>

        <div className="border-t border-espresso-700 mt-8 pt-6 text-center">
          <p className="text-xs text-cream-500">
            &copy; {new Date().getFullYear()} Cupped. Built with love for coffee.
          </p>
        </div>
      </div>
    </footer>
  )
}

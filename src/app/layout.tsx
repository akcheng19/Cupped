import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Cupped — Find Your Perfect Cup',
    template: '%s | Cupped',
  },
  description:
    'Discover specialty coffee beans by flavor. Search by tasting notes, origin, roast level, and price — then buy direct from the roaster.',
  keywords: [
    'specialty coffee',
    'coffee beans',
    'coffee by flavor',
    'coffee tasting notes',
    'buy coffee online',
    'coffee discovery',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Cupped',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

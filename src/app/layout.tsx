import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Cupped — Specialty Coffee Bean Reviews',
    template: '%s | Cupped',
  },
  description:
    "Discover and review specialty coffee beans from the world's finest roasters. Find your next favorite cup with community-powered tasting notes.",
  keywords: ['coffee', 'specialty coffee', 'coffee reviews', 'coffee beans', 'roasters', 'tasting notes'],
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
      <body className="min-h-screen flex flex-col bg-cream-100">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

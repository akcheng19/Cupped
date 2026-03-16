import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Price not listed'
  return `$${price.toFixed(2)}`
}

export function formatWeight(grams: number | null): string {
  if (grams === null) return ''
  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(1)}kg`
  }
  return `${grams}g`
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatRoastLevel(level: string): string {
  return level
    .split('-')
    .map((w) => capitalizeFirst(w))
    .join('-')
}

export function formatProcess(process: string): string {
  return process
    .split('-')
    .map((w) => capitalizeFirst(w))
    .join(' ')
}

export function timeAgo(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 30) return `${diffDays} days ago`
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `${months} month${months > 1 ? 's' : ''} ago`
  }
  const years = Math.floor(diffDays / 365)
  return `${years} year${years > 1 ? 's' : ''} ago`
}

export function roastLevelColor(level: string): string {
  const map: Record<string, string> = {
    light: 'bg-amber-100 text-amber-800',
    'medium-light': 'bg-yellow-100 text-yellow-800',
    medium: 'bg-orange-100 text-orange-800',
    'medium-dark': 'bg-red-100 text-red-800',
    dark: 'bg-stone-700 text-stone-100',
  }
  return map[level] ?? 'bg-gray-100 text-gray-700'
}

export function processColor(process: string): string {
  const map: Record<string, string> = {
    washed: 'bg-blue-100 text-blue-800',
    natural: 'bg-rose-100 text-rose-800',
    honey: 'bg-amber-100 text-amber-800',
    anaerobic: 'bg-purple-100 text-purple-800',
    'wet-hulled': 'bg-teal-100 text-teal-800',
  }
  return map[process] ?? 'bg-gray-100 text-gray-700'
}

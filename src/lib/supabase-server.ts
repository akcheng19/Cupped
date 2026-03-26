import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const url  = process.env.NEXT_PUBLIC_SUPABASE_URL  ?? ''
const key  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''
const IS_PLACEHOLDER = url.includes('placeholder') || url === '' || key === '' || key.includes('placeholder')

export async function createServerComponentClient() {
  const cookieStore = await cookies()

  // Use localhost as a safe no-op URL when real credentials aren't set.
  // Queries will fail immediately (ECONNREFUSED) instead of timing out.
  const safeUrl = IS_PLACEHOLDER ? 'http://127.0.0.1:1' : url
  const safeKey = IS_PLACEHOLDER ? 'placeholder' : key

  return createServerClient(
    safeUrl,
    safeKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component — cookie writes are expected to fail here
          }
        },
      },
    }
  )
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '[Supabase] Missing env vars:',
    !supabaseUrl ? 'NEXT_PUBLIC_SUPABASE_URL' : '',
    !supabaseAnonKey ? 'NEXT_PUBLIC_SUPABASE_ANON_KEY' : ''
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    global: {
      // Abfragen landen im Data Cache von Next.js und gelten so lange wie das revalidate der Seite
      // (Startseite 300 s, sonst 3600 s). Nach einem Import leert POST /api/revalidate den Tag sofort.
      fetch: (url, options = {}) =>
        fetch(url, { ...options, next: { tags: ['supabase'] } }),
    },
  }
)

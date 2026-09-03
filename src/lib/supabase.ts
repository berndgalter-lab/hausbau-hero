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

// Kein `cache: 'no-store'` mehr: die Inhalte ändern sich selten, und Next darf die
// Antworten im Data Cache halten. Revalidierung steuern die Seiten über `revalidate`.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

/** Wie lange gerenderte Seiten und Supabase-Antworten gültig bleiben (Sekunden). */
export const REVALIDATE = 3600

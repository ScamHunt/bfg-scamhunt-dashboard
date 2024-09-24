import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabase = createBrowserClient(
     "https://iyaldvefunvxxmlrerte.supabase.co",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return supabase
}
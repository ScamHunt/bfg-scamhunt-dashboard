import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or API key is missing. Please check your environment variables.');
  throw new Error('Supabase configuration is incomplete');
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

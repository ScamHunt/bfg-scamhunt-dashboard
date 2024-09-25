import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = "https://iyaldvefunvxxmlrerte.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5YWxkdmVmdW52eHhtbHJlcnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NzU1NzksImV4cCI6MjA0MjI1MTU3OX0.rhdv84qYZb15e030LGYRI9Lco0oQaceBpNAekLgBHxw";
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
)
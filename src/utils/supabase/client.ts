import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  //DUE TO NOW NEXTJS ENV VAR WORKS FOR MVP ANON KEY AND URL WILL BE HARD CODED 
  const supabase = createBrowserClient(
     "https://iyaldvefunvxxmlrerte.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5YWxkdmVmdW52eHhtbHJlcnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY2NzU1NzksImV4cCI6MjA0MjI1MTU3OX0.rhdv84qYZb15e030LGYRI9Lco0oQaceBpNAekLgBHxw"
  )

  return supabase
}
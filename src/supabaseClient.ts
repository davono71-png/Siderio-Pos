import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Fallback per quando le env vars non sono disponibili (modalità standalone)
const url = supabaseUrl || 'https://kvsrnxsaajsdmkikipjl.supabase.co'
const key = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c3JueHNhYWpzZG1raWtpcGpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMDU5NjYsImV4cCI6MjA5NDc4MTk2Nn0.koeqbhxar2pB-wy2CjpSu9V0hM8NH5YqV5u8Pfwa-0c'

export const supabase = createClient(url, key)

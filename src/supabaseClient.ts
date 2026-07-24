import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Fallback per quando le env vars non sono disponibili (modalità standalone)
const url = supabaseUrl || 'https://kvsrnxsaajsdmkikipjl.supabase.co'
const key = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c3JueHNhYWpzZG1raWtpcGpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkyMDU5NjYsImV4cCI6MjA5NDc4MTk2Nn0.koeqbhxar2pB-wy2CjpSu9V0hM8NH5YqV5u8Pfwa-0c'

export const supabase = createClient(url, key)

// Siderio-Suite-2 (app autenticata) apre questa app passando la sessione corrente
// come fragment URL (#access_token=...&refresh_token=...), non come query string,
// perché il fragment non viene mai inviato al server né loggato lato Vercel/proxy.
// Senza questo, il client qui usa solo la anon key senza sessione, e le RLS su
// pos_data (che richiedono un utente autenticato con ruolo Manager/Amministrazione/
// Proprietà via can_manage_public_data()) rifiutano il salvataggio con 401.
export async function initSessionFromSuite(): Promise<void> {
  const hash = window.location.hash
  if (!hash) return

  const params = new URLSearchParams(hash.replace(/^#/, ''))
  const access_token = params.get('access_token')
  const refresh_token = params.get('refresh_token')

  if (access_token && refresh_token) {
    try {
      await supabase.auth.setSession({ access_token, refresh_token })
    } catch (e) {
      console.warn('initSessionFromSuite: impossibile impostare la sessione', e)
    }
  }

  // Ripulisce l'hash dall'URL in ogni caso: i token non devono restare visibili
  // nella barra degli indirizzi né finire nella cronologia del browser.
  const url = new URL(window.location.href)
  url.hash = ''
  window.history.replaceState({}, '', url.toString())
}

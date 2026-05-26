// ── MODALITÀ DEMO ─────────────────────────────────────────────────────────────
// Nessun database. I dati vivono solo in memoria per la durata della sessione.
// Chiudendo la scheda tutto viene perso.
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useCallback } from 'react'
import type { PosData } from '../types/pos'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function usePosStorage(_commessaId: string | null) {
  const [saveStatus] = useState<SaveStatus>('idle')

  const loadPos = useCallback(async (_commId: string): Promise<PosData | null> => {
    // In modalità demo non c'è nulla da caricare
    return null
  }, [])

  const savePos = useCallback(async (_pos: PosData, _commId: string): Promise<void> => {
    // In modalità demo il salvataggio è disabilitato
    return
  }, [])

  const setLoading = useCallback((_v: boolean) => {}, [])

  return { loadPos, savePos, saveStatus, setLoading }
}

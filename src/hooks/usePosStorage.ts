import { useState, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { PosData } from '../types/pos'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function usePosStorage(_commessaId: string | null) {
  const [recordId, setRecordId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  // Carica il POS esistente da Supabase
  const loadPos = useCallback(async (commId: string): Promise<PosData | null> => {
    const { data, error } = await supabase
      .from('pos_documenti')
      .select('id, dati_json')
      .eq('commessa_id', commId)
      .maybeSingle()

    if (error || !data) return null
    setRecordId(data.id)
    return data.dati_json as PosData
  }, [])

  // Salva (upsert) — crea se non esiste, aggiorna se esiste
  const savePos = useCallback(async (pos: PosData, commId: string): Promise<void> => {
    setSaveStatus('saving')
    try {
      if (recordId) {
        // Aggiorna record esistente
        const { error } = await supabase
          .from('pos_documenti')
          .update({
            dati_json: pos,
            modificato_il: new Date().toISOString(),
            stato: 'bozza',
          })
          .eq('id', recordId)
        if (error) throw error
      } else {
        // Crea nuovo record
        const { data, error } = await supabase
          .from('pos_documenti')
          .insert({
            commessa_id: commId,
            dati_json: pos,
            stato: 'bozza',
            creato_il: new Date().toISOString(),
            modificato_il: new Date().toISOString(),
          })
          .select('id')
          .single()
        if (error) throw error
        setRecordId(data.id)
      }
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch {
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }, [recordId])

  return { loadPos, savePos, saveStatus, loading, setLoading }
}

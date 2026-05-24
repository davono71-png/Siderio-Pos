import { useState, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { PosData } from '../types/pos'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function usePosStorage(_commessaId: string | null) {
  const [recordId, setRecordId] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')
  const loadPos = useCallback(async (commId: string): Promise<PosData | null> => {
    try {
      const { data, error } = await supabase
        .from('pos_documenti')
        .select('id, dati_json')
        .eq('commessa_id', commId)
        .maybeSingle()

      if (error) { console.warn('Load error:', error.message); return null }
      if (!data) return null
      setRecordId(data.id)
      return data.dati_json as PosData
    } catch (e) {
      console.warn('Load exception:', e)
      return null
    }
  }, [])

  const savePos = useCallback(async (pos: PosData, commId: string): Promise<void> => {
    setSaveStatus('saving')
    try {
      if (recordId) {
        const { error } = await supabase
          .from('pos_documenti')
          .update({ dati_json: pos, modificato_il: new Date().toISOString(), stato: 'bozza' })
          .eq('id', recordId)
        if (error) throw new Error(error.message)
      } else {
        const { data, error } = await supabase
          .from('pos_documenti')
          .insert({ commessa_id: commId, dati_json: pos, stato: 'bozza',
                    creato_il: new Date().toISOString(), modificato_il: new Date().toISOString() })
          .select('id')
          .single()
        if (error) throw new Error(error.message)
        setRecordId(data.id)
      }
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch (e: any) {
      console.error('Save error:', e?.message || e)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 4000)
    }
  }, [recordId])

  return { loadPos, savePos, saveStatus, setLoading: (_v: boolean) => {} }
}

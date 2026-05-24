import { useState, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { PosData } from '../types/pos'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function usePosStorage(_commessaId: string | null) {
  const [recordId, setRecordId] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const loadPos = useCallback(async (commId: string): Promise<PosData | null> => {
    try {
      console.log('[POS] Loading for commessa_id:', commId)
      const { data, error } = await supabase
        .from('pos_documenti')
        .select('id, dati_json')
        .eq('commessa_id', commId)
        .maybeSingle()

      if (error) {
        console.error('[POS] Load error:', error.message, error.details, error.hint)
        return null
      }
      if (!data) {
        console.log('[POS] No saved POS found for commessa_id:', commId)
        return null
      }
      console.log('[POS] Loaded POS record id:', data.id)
      setRecordId(data.id)
      return data.dati_json as PosData
    } catch (e: any) {
      console.error('[POS] Load exception:', e?.message || e)
      return null
    }
  }, [])

  const savePos = useCallback(async (pos: PosData, commId: string): Promise<void> => {
    setSaveStatus('saving')
    try {
      console.log('[POS] Saving for commessa_id:', commId, 'recordId:', recordId)
      if (recordId) {
        const { error } = await supabase
          .from('pos_documenti')
          .update({ dati_json: pos, modificato_il: new Date().toISOString(), stato: 'bozza' })
          .eq('id', recordId)
        if (error) throw new Error(`Update error: ${error.message}`)
        console.log('[POS] Updated record:', recordId)
      } else {
        const { data, error } = await supabase
          .from('pos_documenti')
          .insert({ commessa_id: commId, dati_json: pos, stato: 'bozza',
                    creato_il: new Date().toISOString(), modificato_il: new Date().toISOString() })
          .select('id')
          .single()
        if (error) throw new Error(`Insert error: ${error.message} | ${error.hint || ''} | ${error.details || ''}`)
        console.log('[POS] Inserted new record:', data.id)
        setRecordId(data.id)
      }
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch (e: any) {
      console.error('[POS] Save failed:', e?.message || e)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 4000)
    }
  }, [recordId])

  return { loadPos, savePos, saveStatus, setLoading: (_v: boolean) => {} }
}

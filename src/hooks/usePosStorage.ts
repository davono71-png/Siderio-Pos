import { useState, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { PosData } from '../types/pos'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function usePosStorage(_commessaId: string | null) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const loadPos = useCallback(async (commId: string): Promise<PosData | null> => {
    try {
      const { data, error } = await supabase
        .from('pos_data')
        .select('data')
        .eq('commessa_id', commId)
        .maybeSingle()
      if (error) throw error
      return data?.data ?? null
    } catch (e) {
      console.error('loadPos error:', e)
      return null
    }
  }, [])

  const savePos = useCallback(async (pos: PosData, commId: string): Promise<void> => {
    setSaveStatus('saving')
    try {
      const { error } = await supabase
        .from('pos_data')
        .upsert({ commessa_id: commId, data: pos }, { onConflict: 'commessa_id' })
      if (error) throw error
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2000)
    } catch (e) {
      console.error('savePos error:', e)
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 3000)
    }
  }, [])

  const setLoading = useCallback((_v: boolean) => {}, [])

  return { loadPos, savePos, saveStatus, setLoading }
}

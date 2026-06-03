import { useState, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import type { PosData } from '../types/pos'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

export function usePosStorage() {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle')

  const resetStatus = useCallback((status: SaveStatus, delayMs: number) => {
    setSaveStatus(status)
    setTimeout(() => setSaveStatus('idle'), delayMs)
  }, [])

  const loadPos = useCallback(async (commId: string): Promise<PosData | null> => {
    try {
      const { data, error } = await supabase
        .from('pos_data')
        .select('data')
        .eq('commessa_id', commId)
        .limit(1)
        .maybeSingle()
      if (error) throw error
      return data?.data ?? null
    } catch (e) {
      console.error('loadPos error:', e)
      return null
    }
  }, [])

  const loadLocalPos = useCallback((draftKey: string): PosData | null => {
    try {
      const storedDraft = window.localStorage.getItem(draftKey)
      if (!storedDraft) return null

      const parsed = JSON.parse(storedDraft) as { data?: PosData }
      return parsed.data ?? null
    } catch (e) {
      console.error('loadLocalPos error:', e)
      return null
    }
  }, [])

  const saveLocalPos = useCallback((pos: PosData, draftKey: string): void => {
    setSaveStatus('saving')
    try {
      window.localStorage.setItem(draftKey, JSON.stringify({
        data: pos,
        savedAt: new Date().toISOString(),
      }))
      resetStatus('saved', 2000)
    } catch (e) {
      console.error('saveLocalPos error:', e)
      resetStatus('error', 3000)
    }
  }, [resetStatus])

  const savePos = useCallback(async (pos: PosData, commId: string): Promise<void> => {
    setSaveStatus('saving')
    try {
      const { data: existing, error: lookupError } = await supabase
        .from('pos_data')
        .select('commessa_id')
        .eq('commessa_id', commId)
        .limit(1)
        .maybeSingle()

      if (lookupError) throw lookupError

      if (existing) {
        const { error } = await supabase
          .from('pos_data')
          .update({ data: pos })
          .eq('commessa_id', commId)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('pos_data')
          .insert({ commessa_id: commId, data: pos })
        if (error) throw error
      }

      resetStatus('saved', 2000)
    } catch (e) {
      console.error('savePos error:', e)
      resetStatus('error', 3000)
    }
  }, [resetStatus])

  return { loadPos, loadLocalPos, savePos, saveLocalPos, saveStatus }
}

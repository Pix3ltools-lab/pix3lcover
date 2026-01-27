import { useState, useEffect, useRef, useCallback } from 'react'
import { saveAutoSave } from '../utils/storageUtils'

const AUTOSAVE_DELAY = 30000 // 30 seconds

/**
 * Hook for auto-saving project state
 * @param {Object} state - Current project state to save
 * @param {boolean} enabled - Whether auto-save is enabled
 * @returns {Object} - { saveStatus, lastSaved, triggerSave }
 */
function useAutoSave(state, enabled = true) {
  const [saveStatus, setSaveStatus] = useState('idle') // 'idle' | 'saving' | 'saved' | 'error'
  const [lastSaved, setLastSaved] = useState(null)
  const timeoutRef = useRef(null)
  const previousStateRef = useRef(null)

  // Check if state has changed
  const hasStateChanged = useCallback(() => {
    if (!previousStateRef.current) return true

    const current = JSON.stringify(state)
    const previous = JSON.stringify(previousStateRef.current)
    return current !== previous
  }, [state])

  // Perform the actual save
  const performSave = useCallback(() => {
    if (!hasStateChanged()) {
      return
    }

    setSaveStatus('saving')

    const success = saveAutoSave(state)

    if (success) {
      setSaveStatus('saved')
      setLastSaved(new Date())
      previousStateRef.current = { ...state }

      // Reset to idle after 2 seconds
      setTimeout(() => {
        setSaveStatus('idle')
      }, 2000)
    } else {
      setSaveStatus('error')
    }
  }, [state, hasStateChanged])

  // Manual trigger for immediate save
  const triggerSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    performSave()
  }, [performSave])

  // Set up auto-save timer
  useEffect(() => {
    if (!enabled) return

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      performSave()
    }, AUTOSAVE_DELAY)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [state, enabled, performSave])

  // Save on significant changes (immediate save for important actions)
  const triggerImmediateSave = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    performSave()
  }, [performSave])

  return {
    saveStatus,
    lastSaved,
    triggerSave,
    triggerImmediateSave
  }
}

export default useAutoSave

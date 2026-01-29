import { useState, useCallback, useEffect } from 'react'

const MAX_HISTORY_SIZE = 50

/**
 * Hook for undo/redo functionality
 * @param {Object} initialState - Initial state object
 * @param {Function} onStateChange - Callback when state changes via undo/redo
 * @returns {Object} - History controls and state
 */
function useHistory(initialState, onStateChange) {
  const [history, setHistory] = useState([initialState])
  const [currentIndex, setCurrentIndex] = useState(0)

  const canUndo = currentIndex > 0
  const canRedo = currentIndex < history.length - 1

  // Push new state to history
  const pushState = useCallback((newState) => {
    setHistory(prev => {
      // Remove any future states if we're not at the end
      const newHistory = prev.slice(0, currentIndex + 1)

      // Add new state
      newHistory.push(newState)

      // Limit history size
      if (newHistory.length > MAX_HISTORY_SIZE) {
        newHistory.shift()
        return newHistory
      }

      return newHistory
    })
    setCurrentIndex(prev => Math.min(prev + 1, MAX_HISTORY_SIZE - 1))
  }, [currentIndex])

  // Undo - go back one state
  const undo = useCallback(() => {
    if (canUndo) {
      const newIndex = currentIndex - 1
      setCurrentIndex(newIndex)
      if (onStateChange) {
        onStateChange(history[newIndex])
      }
      return history[newIndex]
    }
    return null
  }, [canUndo, currentIndex, history, onStateChange])

  // Redo - go forward one state
  const redo = useCallback(() => {
    if (canRedo) {
      const newIndex = currentIndex + 1
      setCurrentIndex(newIndex)
      if (onStateChange) {
        onStateChange(history[newIndex])
      }
      return history[newIndex]
    }
    return null
  }, [canRedo, currentIndex, history, onStateChange])

  // Clear history and reset
  const clearHistory = useCallback((newInitialState) => {
    setHistory([newInitialState || initialState])
    setCurrentIndex(0)
  }, [initialState])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return
      }

      // Ctrl+Z or Cmd+Z for undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        undo()
      }

      // Ctrl+Shift+Z or Cmd+Shift+Z for redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        redo()
      }

      // Ctrl+Y or Cmd+Y for redo (alternative)
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault()
        redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo])

  return {
    pushState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
    historyLength: history.length,
    currentIndex
  }
}

export default useHistory

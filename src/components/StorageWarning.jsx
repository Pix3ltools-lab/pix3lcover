import { useState, useEffect } from 'react'

const STORAGE_KEY = 'pix3lcover_warning_dismissed'
const DISMISS_DURATION_DAYS = 7

function StorageWarning() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const dismissedAt = localStorage.getItem(STORAGE_KEY)
    if (dismissedAt) {
      const dismissedDate = new Date(dismissedAt)
      const now = new Date()
      const daysSinceDismissed = (now - dismissedDate) / (1000 * 60 * 60 * 24)

      if (daysSinceDismissed < DISMISS_DURATION_DAYS) {
        return // Stay hidden
      }
    }
    setIsVisible(true)
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="bg-amber-900/80 border-b border-amber-700 px-4 py-2 flex-shrink-0">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-amber-100 text-sm">
          <svg
            className="w-4 h-4 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <span>
            Your projects are saved only on this device.
          </span>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-amber-300 hover:text-amber-200 underline text-sm"
          >
            {isExpanded ? 'Hide' : 'Learn more'}
          </button>
        </div>
        <button
          onClick={handleDismiss}
          className="text-amber-300 hover:text-amber-100 p-1"
          title="Hide for 7 days"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-2 text-amber-200 text-xs space-y-1 pl-6">
          <p>• No synchronization between different devices</p>
          <p>• Data may be lost if you clear browser data</p>
          <p>• Export your projects regularly as images</p>
        </div>
      )}
    </div>
  )
}

export default StorageWarning

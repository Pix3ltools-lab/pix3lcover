function AutoSaveIndicator({ status, lastSaved }) {
  const getStatusDisplay = () => {
    switch (status) {
      case 'saving':
        return {
          text: 'Saving...',
          color: 'text-amber-400',
          icon: (
            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )
        }
      case 'saved':
        return {
          text: 'Saved',
          color: 'text-green-400',
          icon: (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )
        }
      case 'error':
        return {
          text: 'Error',
          color: 'text-red-400',
          icon: (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )
        }
      default:
        if (lastSaved) {
          const timeAgo = getTimeAgo(lastSaved)
          return {
            text: `Saved ${timeAgo}`,
            color: 'text-gray-500',
            icon: (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            )
          }
        }
        return null
    }
  }

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 120) return '1 min ago'
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
    if (seconds < 7200) return '1 hour ago'
    return `${Math.floor(seconds / 3600)} hours ago`
  }

  const statusDisplay = getStatusDisplay()

  if (!statusDisplay) return null

  return (
    <div className={`flex items-center gap-1.5 text-xs ${statusDisplay.color}`}>
      {statusDisplay.icon}
      <span>{statusDisplay.text}</span>
    </div>
  )
}

export default AutoSaveIndicator

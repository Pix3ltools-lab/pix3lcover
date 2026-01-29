import { useState, useEffect } from 'react'
import { getStorageInfo } from '../utils/storageUtils'

const LOCALSTORAGE_LIMIT_KB = 5120 // 5MB typical browser limit

function StorageIndicator() {
  const [storageInfo, setStorageInfo] = useState({ sizeInKB: '0', projectCount: 0 })

  const updateStorageInfo = () => {
    const info = getStorageInfo()
    setStorageInfo(info)
  }

  useEffect(() => {
    updateStorageInfo()

    // Listen for storage changes
    const handleStorageChange = () => {
      updateStorageInfo()
    }

    window.addEventListener('storage', handleStorageChange)

    // Also update periodically to catch local changes
    const interval = setInterval(updateStorageInfo, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const usedKB = parseFloat(storageInfo.sizeInKB) || 0
  const percentage = Math.min((usedKB / LOCALSTORAGE_LIMIT_KB) * 100, 100)

  // Color based on usage
  const getBarColor = () => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-amber-500'
    return 'bg-emerald-500'
  }

  const getTextColor = () => {
    if (percentage >= 90) return 'text-red-400'
    if (percentage >= 70) return 'text-amber-400'
    return 'text-gray-400'
  }

  return (
    <div className="px-4 py-2 bg-[#1f1f1f] border-t border-gray-800">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-500">Storage</span>
        <span className={getTextColor()}>
          {usedKB.toFixed(0)} KB / {(LOCALSTORAGE_LIMIT_KB / 1024).toFixed(0)} MB
        </span>
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor()} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs mt-1">
        <span className="text-gray-600">{storageInfo.projectCount} projects</span>
        {percentage >= 70 && (
          <span className={`${getTextColor()} text-xs`}>
            {percentage >= 90 ? 'Storage almost full!' : 'Storage filling up'}
          </span>
        )}
      </div>
    </div>
  )
}

export default StorageIndicator

import { useState } from 'react'
import badgeStyles, { badgePositions, badgeTexts } from '../../data/badgeStyles'

function BadgeEditor({ badgeConfig, onBadgeChange }) {
  const [isEnabled, setIsEnabled] = useState(badgeConfig?.enabled || false)
  const [selectedStyle, setSelectedStyle] = useState(badgeConfig?.style || 'futuristic')
  const [selectedPosition, setSelectedPosition] = useState(badgeConfig?.position || 'top-right')
  const [customText, setCustomText] = useState(badgeConfig?.text || 'AI Generated')
  const [isTransparent, setIsTransparent] = useState(badgeConfig?.transparentBg !== false)
  const [backgroundColor, setBackgroundColor] = useState(badgeConfig?.backgroundColor || '#667eea')

  const handleToggle = () => {
    const newEnabled = !isEnabled
    setIsEnabled(newEnabled)
    updateBadge({ enabled: newEnabled })
  }

  const handleStyleChange = (styleId) => {
    setSelectedStyle(styleId)
    updateBadge({ style: styleId })
  }

  const handlePositionChange = (positionId) => {
    setSelectedPosition(positionId)
    updateBadge({ position: positionId })
  }

  const handleTextChange = (text) => {
    setCustomText(text)
    updateBadge({ text })
  }

  const handleTransparentToggle = () => {
    const newTransparent = !isTransparent
    setIsTransparent(newTransparent)
    updateBadge({ transparentBg: newTransparent })
  }

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color)
    updateBadge({ backgroundColor: color })
  }

  const updateBadge = (updates) => {
    if (onBadgeChange) {
      onBadgeChange({
        enabled: isEnabled,
        style: selectedStyle,
        position: selectedPosition,
        text: customText,
        transparentBg: isTransparent,
        backgroundColor: backgroundColor,
        ...updates
      })
    }
  }

  const selectedStyleData = badgeStyles.find(s => s.id === selectedStyle)

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#E67E22]">
          AI Badge
        </h2>
        <button
          onClick={handleToggle}
          className={`
            px-3 py-1 rounded text-sm font-medium transition-colors
            ${isEnabled
              ? 'bg-[#E67E22] text-white'
              : 'bg-gray-700 text-gray-400'
            }
          `}
        >
          {isEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {isEnabled && (
        <div className="space-y-4">
          {/* Badge Text */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Badge Text
            </label>
            <input
              type="text"
              value={customText}
              onChange={(e) => handleTextChange(e.target.value)}
              placeholder="AI Generated"
              className="w-full bg-gray-700 px-3 py-2 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {badgeTexts.map((text) => (
                <button
                  key={text}
                  onClick={() => handleTextChange(text)}
                  className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs text-gray-300 transition-colors"
                >
                  {text}
                </button>
              ))}
            </div>
          </div>

          {/* Badge Style */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Style
            </label>
            <div className="grid grid-cols-2 gap-2">
              {badgeStyles.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleStyleChange(style.id)}
                  className={`
                    px-3 py-2 rounded text-xs font-medium transition-all text-left
                    ${selectedStyle === style.id
                      ? 'bg-[#E67E22] text-white ring-2 ring-[#E67E22]'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  <div className="font-semibold">{style.name}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">
                    {style.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Badge Position */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Position
            </label>
            <div className="grid grid-cols-2 gap-2">
              {badgePositions.map((pos) => (
                <button
                  key={pos.id}
                  onClick={() => handlePositionChange(pos.id)}
                  className={`
                    px-3 py-2 rounded text-sm transition-colors
                    ${selectedPosition === pos.id
                      ? 'bg-[#E67E22] text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  {pos.name}
                </button>
              ))}
            </div>
          </div>

          {/* Background Options */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Background
            </label>
            <div className="space-y-2">
              <button
                onClick={handleTransparentToggle}
                className={`
                  w-full px-3 py-2 rounded text-sm font-medium transition-colors text-left
                  ${isTransparent
                    ? 'bg-[#E67E22] text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                `}
              >
                {isTransparent ? '✓ Transparent Background' : 'Transparent Background'}
              </button>

              {!isTransparent && (
                <div>
                  <label className="block text-xs mb-1 text-gray-500">
                    Custom Color
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => handleBackgroundColorChange(e.target.value)}
                      className="h-10 w-16 rounded cursor-pointer bg-gray-700 border border-gray-600"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => handleBackgroundColorChange(e.target.value)}
                      placeholder="#667eea"
                      className="flex-1 bg-gray-700 px-3 py-2 rounded text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          {selectedStyleData && (
            <div className="border border-gray-700 rounded p-3">
              <div className="text-xs text-gray-400 mb-2">Preview:</div>
              <div
                className="inline-block"
                style={{
                  background: isTransparent ? 'transparent' : backgroundColor,
                  border: selectedStyleData.style.border,
                  borderRadius: selectedStyleData.style.borderRadius,
                  padding: selectedStyleData.style.padding,
                  fontFamily: selectedStyleData.style.fontFamily,
                  fontSize: selectedStyleData.style.fontSize,
                  fontWeight: selectedStyleData.style.fontWeight,
                  color: selectedStyleData.style.color,
                  textTransform: selectedStyleData.style.textTransform,
                  letterSpacing: selectedStyleData.style.letterSpacing,
                  boxShadow: selectedStyleData.style.shadow || 'none'
                }}
              >
                {selectedStyleData.style.icon && (
                  <span className="mr-1">{selectedStyleData.style.icon}</span>
                )}
                {customText}
              </div>
            </div>
          )}

          {/* Info */}
          <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
            <p>💡 Badge marks your content as AI-generated</p>
            <p className="mt-1">• Required for YouTube transparency</p>
            <p>• Builds trust with viewers</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default BadgeEditor

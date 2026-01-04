import { useState } from 'react'

function TextColorPicker({ titleColor, subtitleColor, selectedTemplate, onColorChange }) {
  const [customTitleColor, setCustomTitleColor] = useState(titleColor || '')
  const [customSubtitleColor, setCustomSubtitleColor] = useState(subtitleColor || '')

  // Preset colors for quick selection
  const presetColors = [
    '#FFFFFF', // White
    '#ECF0F1', // Off-white
    '#E67E22', // Orange
    '#FF6B35', // Neon orange
    '#D4AF37', // Gold
    '#95A5A6', // Silver
    '#000000', // Black
    '#2C3E50'  // Dark blue-grey
  ]

  const handleTitleColorChange = (color) => {
    setCustomTitleColor(color)
    if (onColorChange) {
      onColorChange({
        titleColor: color || null,
        subtitleColor: customSubtitleColor || null
      })
    }
  }

  const handleSubtitleColorChange = (color) => {
    setCustomSubtitleColor(color)
    if (onColorChange) {
      onColorChange({
        titleColor: customTitleColor || null,
        subtitleColor: color || null
      })
    }
  }

  const resetToTemplate = () => {
    setCustomTitleColor('')
    setCustomSubtitleColor('')
    if (onColorChange) {
      onColorChange({
        titleColor: null,
        subtitleColor: null
      })
    }
  }

  // Get template default colors for display
  const templateTitleColor = selectedTemplate?.text?.title?.color || '#ECF0F1'
  const templateSubtitleColor = selectedTemplate?.text?.subtitle?.color || '#E67E22'

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#E67E22]">
          Text Colors
        </h2>
        <button
          onClick={resetToTemplate}
          className="px-2 py-1 rounded text-xs bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
        >
          Reset to Template
        </button>
      </div>

      <div className="space-y-4">
        {/* Title Color */}
        <div>
          <label className="block text-sm mb-2 text-gray-400">
            Title Color
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="color"
              value={customTitleColor || templateTitleColor}
              onChange={(e) => handleTitleColorChange(e.target.value)}
              className="h-10 w-16 rounded cursor-pointer bg-gray-700 border border-gray-600"
            />
            <input
              type="text"
              value={customTitleColor || ''}
              onChange={(e) => handleTitleColorChange(e.target.value)}
              placeholder={templateTitleColor}
              className="flex-1 bg-gray-700 px-3 py-2 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
          </div>

          {/* Preset Colors */}
          <div className="flex flex-wrap gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => handleTitleColorChange(color)}
                className="w-6 h-6 rounded border-2 border-gray-600 hover:border-[#E67E22] transition-colors"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {!customTitleColor && (
            <p className="text-xs text-gray-500 mt-1">
              Using template default: {templateTitleColor}
            </p>
          )}
        </div>

        {/* Subtitle Color */}
        <div>
          <label className="block text-sm mb-2 text-gray-400">
            Subtitle Color
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="color"
              value={customSubtitleColor || templateSubtitleColor}
              onChange={(e) => handleSubtitleColorChange(e.target.value)}
              className="h-10 w-16 rounded cursor-pointer bg-gray-700 border border-gray-600"
            />
            <input
              type="text"
              value={customSubtitleColor || ''}
              onChange={(e) => handleSubtitleColorChange(e.target.value)}
              placeholder={templateSubtitleColor}
              className="flex-1 bg-gray-700 px-3 py-2 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
          </div>

          {/* Preset Colors */}
          <div className="flex flex-wrap gap-1">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => handleSubtitleColorChange(color)}
                className="w-6 h-6 rounded border-2 border-gray-600 hover:border-[#E67E22] transition-colors"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>

          {!customSubtitleColor && (
            <p className="text-xs text-gray-500 mt-1">
              Using template default: {templateSubtitleColor}
            </p>
          )}
        </div>

        {/* Info */}
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
          <p>💡 Color Tips:</p>
          <p className="mt-1">• High contrast for readability</p>
          <p>• White/light colors work well on dark backgrounds</p>
          <p>• Test visibility before exporting</p>
        </div>
      </div>
    </section>
  )
}

export default TextColorPicker

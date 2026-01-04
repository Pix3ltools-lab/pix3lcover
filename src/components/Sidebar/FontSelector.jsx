import { useState } from 'react'
import fonts from '../../data/fonts'

function FontSelector({ titleFont, subtitleFont, titleSize, subtitleSize, onFontChange }) {
  const [selectedTitleFont, setSelectedTitleFont] = useState(titleFont || 'Bebas Neue')
  const [selectedSubtitleFont, setSelectedSubtitleFont] = useState(subtitleFont || 'Montserrat')
  const [selectedTitleSize, setSelectedTitleSize] = useState(titleSize || 72)
  const [selectedSubtitleSize, setSelectedSubtitleSize] = useState(subtitleSize || 36)

  const handleTitleFontChange = (fontFamily) => {
    setSelectedTitleFont(fontFamily)
    updateFonts({ titleFont: fontFamily })
  }

  const handleSubtitleFontChange = (fontFamily) => {
    setSelectedSubtitleFont(fontFamily)
    updateFonts({ subtitleFont: fontFamily })
  }

  const handleTitleSizeChange = (size) => {
    setSelectedTitleSize(size)
    updateFonts({ titleSize: size })
  }

  const handleSubtitleSizeChange = (size) => {
    setSelectedSubtitleSize(size)
    updateFonts({ subtitleSize: size })
  }

  const updateFonts = (updates) => {
    if (onFontChange) {
      onFontChange({
        titleFont: selectedTitleFont,
        subtitleFont: selectedSubtitleFont,
        titleSize: selectedTitleSize,
        subtitleSize: selectedSubtitleSize,
        ...updates
      })
    }
  }

  const recommendedFonts = fonts.filter(f => f.recommended)
  const allFonts = fonts

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3 text-[#E67E22]">
        Fonts
      </h2>

      <div className="space-y-4">
        {/* Title Font */}
        <div>
          <label className="block text-sm mb-2 text-gray-400">
            Title Font
          </label>
          <select
            value={selectedTitleFont}
            onChange={(e) => handleTitleFontChange(e.target.value)}
            className="w-full bg-gray-700 px-3 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            style={{ fontFamily: selectedTitleFont }}
          >
            <optgroup label="Recommended">
              {recommendedFonts.map((font) => (
                <option
                  key={font.id}
                  value={font.family}
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="All Fonts">
              {allFonts.map((font) => (
                <option
                  key={font.id}
                  value={font.family}
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </option>
              ))}
            </optgroup>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {fonts.find(f => f.family === selectedTitleFont)?.description}
          </p>
        </div>

        {/* Title Size */}
        <div>
          <label className="block text-sm mb-2 text-gray-400">
            Title Size: {selectedTitleSize}px
          </label>
          <input
            type="range"
            min="40"
            max="120"
            value={selectedTitleSize}
            onChange={(e) => handleTitleSizeChange(Number(e.target.value))}
            className="w-full accent-[#E67E22]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>40px</span>
            <span>120px</span>
          </div>
        </div>

        {/* Subtitle Font */}
        <div>
          <label className="block text-sm mb-2 text-gray-400">
            Subtitle Font
          </label>
          <select
            value={selectedSubtitleFont}
            onChange={(e) => handleSubtitleFontChange(e.target.value)}
            className="w-full bg-gray-700 px-3 py-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            style={{ fontFamily: selectedSubtitleFont }}
          >
            <optgroup label="Recommended">
              {recommendedFonts.map((font) => (
                <option
                  key={font.id}
                  value={font.family}
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="All Fonts">
              {allFonts.map((font) => (
                <option
                  key={font.id}
                  value={font.family}
                  style={{ fontFamily: font.family }}
                >
                  {font.name}
                </option>
              ))}
            </optgroup>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {fonts.find(f => f.family === selectedSubtitleFont)?.description}
          </p>
        </div>

        {/* Subtitle Size */}
        <div>
          <label className="block text-sm mb-2 text-gray-400">
            Subtitle Size: {selectedSubtitleSize}px
          </label>
          <input
            type="range"
            min="20"
            max="60"
            value={selectedSubtitleSize}
            onChange={(e) => handleSubtitleSizeChange(Number(e.target.value))}
            className="w-full accent-[#E67E22]"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>20px</span>
            <span>60px</span>
          </div>
        </div>

        {/* Preview */}
        <div className="border border-gray-700 rounded p-3 bg-gray-800">
          <div className="text-xs text-gray-400 mb-2">Preview:</div>
          <div
            className="text-center mb-2"
            style={{
              fontFamily: selectedTitleFont,
              fontSize: `${Math.min(selectedTitleSize / 3, 24)}px`,
              color: '#ECF0F1'
            }}
          >
            BLUES ROCK TITLE
          </div>
          <div
            className="text-center"
            style={{
              fontFamily: selectedSubtitleFont,
              fontSize: `${Math.min(selectedSubtitleSize / 2, 16)}px`,
              color: '#E67E22'
            }}
          >
            Subtitle Preview
          </div>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-3">
          <p>💡 Font Tips:</p>
          <p className="mt-1">• Bold fonts (Bebas, Anton) for impact</p>
          <p>• Serif fonts (Playfair) for elegance</p>
          <p>• Sans-serif (Montserrat) for clarity</p>
        </div>
      </div>
    </section>
  )
}

export default FontSelector

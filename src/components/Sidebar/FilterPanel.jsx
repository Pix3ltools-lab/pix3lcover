function FilterPanel({ filterConfig, onFilterChange }) {
  const handleSliderChange = (key, value) => {
    onFilterChange({
      ...filterConfig,
      [key]: value
    })
  }

  const handleReset = () => {
    onFilterChange({
      brightness: 0,
      contrast: 0,
      saturation: 0,
      blur: 0
    })
  }

  const hasChanges = filterConfig.brightness !== 0 ||
    filterConfig.contrast !== 0 ||
    filterConfig.saturation !== 0 ||
    filterConfig.blur !== 0

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#E67E22]">
          Image Filters
        </h2>
        {hasChanges && (
          <button
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Brightness */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="text-gray-400">Brightness</label>
            <span className="text-gray-500">{filterConfig.brightness > 0 ? '+' : ''}{filterConfig.brightness}</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={filterConfig.brightness}
            onChange={(e) => handleSliderChange('brightness', Number(e.target.value))}
            className="w-full accent-[#E67E22]"
          />
        </div>

        {/* Contrast */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="text-gray-400">Contrast</label>
            <span className="text-gray-500">{filterConfig.contrast > 0 ? '+' : ''}{filterConfig.contrast}</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={filterConfig.contrast}
            onChange={(e) => handleSliderChange('contrast', Number(e.target.value))}
            className="w-full accent-[#E67E22]"
          />
        </div>

        {/* Saturation */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="text-gray-400">Saturation</label>
            <span className="text-gray-500">{filterConfig.saturation > 0 ? '+' : ''}{filterConfig.saturation}</span>
          </div>
          <input
            type="range"
            min="-100"
            max="100"
            value={filterConfig.saturation}
            onChange={(e) => handleSliderChange('saturation', Number(e.target.value))}
            className="w-full accent-[#E67E22]"
          />
        </div>

        {/* Blur */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <label className="text-gray-400">Blur</label>
            <span className="text-gray-500">{filterConfig.blur}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={filterConfig.blur}
            onChange={(e) => handleSliderChange('blur', Number(e.target.value))}
            className="w-full accent-[#E67E22]"
          />
        </div>

        <p className="text-xs text-gray-500 pt-2 border-t border-gray-700">
          Filters apply only to the background image
        </p>
      </div>
    </section>
  )
}

export default FilterPanel

import { useState } from 'react'

function ExportPanel({ onExport }) {
  const [format, setFormat] = useState('jpeg')
  const [quality, setQuality] = useState(90)
  const [customFilename, setCustomFilename] = useState('')

  const handleExport = () => {
    const options = {
      format: format,
      quality: quality / 100, // Convert percentage to 0-1 scale
      filename: customFilename.trim() || undefined
    }
    onExport(options)
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3 text-[#E67E22]">
        Export
      </h2>

      <div className="space-y-4">
        {/* Format Selection */}
        <div>
          <label className="block text-sm mb-2 text-gray-400">
            Format
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setFormat('jpeg')}
              className={`
                flex-1 px-3 py-2 rounded text-sm font-medium transition-colors
                ${format === 'jpeg'
                  ? 'bg-[#E67E22] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              JPG
            </button>
            <button
              onClick={() => setFormat('png')}
              className={`
                flex-1 px-3 py-2 rounded text-sm font-medium transition-colors
                ${format === 'png'
                  ? 'bg-[#E67E22] text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }
              `}
            >
              PNG
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {format === 'jpeg'
              ? 'Recommended for YouTube (smaller file size)'
              : 'Use for transparency needs (larger file)'}
          </p>
        </div>

        {/* Quality Slider (only for JPEG) */}
        {format === 'jpeg' && (
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Quality: {quality}%
            </label>
            <input
              type="range"
              min="80"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-[#E67E22]"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Smaller</span>
              <span>Higher quality</span>
            </div>
          </div>
        )}

        {/* Custom Filename (Optional) */}
        <div>
          <label className="block text-sm mb-2 text-gray-400">
            Filename (optional)
          </label>
          <input
            type="text"
            value={customFilename}
            onChange={(e) => setCustomFilename(e.target.value)}
            placeholder="Leave empty for auto-generated"
            className="w-full bg-gray-700 px-3 py-2 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
          />
          <p className="text-xs text-gray-500 mt-1">
            Extension will be added automatically
          </p>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="w-full bg-[#E67E22] hover:bg-[#d35400] px-4 py-3 rounded font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <span>📥</span>
          <span>Download Thumbnail</span>
        </button>

        {/* Info */}
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-3 space-y-1">
          <p>• Size: 1920 x 1080px (Full HD)</p>
          <p>• Target: 200-500 KB for optimal upload</p>
          <p>• All elements will be flattened to image</p>
        </div>
      </div>
    </section>
  )
}

export default ExportPanel

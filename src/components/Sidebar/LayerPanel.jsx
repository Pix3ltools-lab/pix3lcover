import { useRef, useState } from 'react'
import imageCompression from 'browser-image-compression'

function LayerPanel({ layers, onAddLayer, onDeleteLayer, onReorderLayers }) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, PNG, or WebP image')
      return
    }

    setIsUploading(true)

    try {
      // Compress the image
      const compressionOptions = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
        fileType: 'image/png' // Keep PNG for transparency
      }

      const compressedFile = await imageCompression(file, compressionOptions)

      const reader = new FileReader()
      reader.onload = (e) => {
        onAddLayer(e.target.result)
        setIsUploading(false)
      }
      reader.readAsDataURL(compressedFile)
    } catch {
      // Fallback to original
      const reader = new FileReader()
      reader.onload = (e) => {
        onAddLayer(e.target.result)
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }

    // Reset input
    e.target.value = ''
  }

  const moveLayer = (index, direction) => {
    const newLayers = [...layers]
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= layers.length) return

    // Swap
    [newLayers[index], newLayers[newIndex]] = [newLayers[newIndex], newLayers[index]]
    onReorderLayers(newLayers)
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-[#E67E22]">
          Layers
        </h2>
        <span className="text-xs text-gray-500">{layers.length} overlay{layers.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Add Layer Button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={isUploading}
        className="w-full mb-3 px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 text-white rounded text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Adding...
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Overlay Image
          </>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Layer List */}
      {layers.length > 0 ? (
        <div className="space-y-2">
          {layers.map((layer, index) => (
            <div
              key={layer.id}
              className="flex items-center gap-2 bg-gray-800 rounded p-2"
            >
              {/* Thumbnail */}
              <img
                src={layer.imageUrl}
                alt={`Layer ${index + 1}`}
                className="w-10 h-10 object-cover rounded bg-gray-900"
              />

              {/* Layer Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">Layer {index + 1}</p>
                <p className="text-xs text-gray-500">Overlay</p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                {/* Move Up */}
                <button
                  onClick={() => moveLayer(index, -1)}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>

                {/* Move Down */}
                <button
                  onClick={() => moveLayer(index, 1)}
                  disabled={index === layers.length - 1}
                  className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Delete */}
                <button
                  onClick={() => onDeleteLayer(layer.id)}
                  className="p-1 text-red-400 hover:text-red-300"
                  title="Delete layer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-500 text-center py-4">
          No overlay layers yet. Add images to layer on top of your background.
        </p>
      )}

      <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-700">
        Drag layers on canvas to position. Use controls to reorder.
      </p>
    </section>
  )
}

export default LayerPanel

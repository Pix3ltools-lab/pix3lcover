import { useState, useRef } from 'react'
import UploadPanel from './components/Sidebar/UploadPanel'
import TemplateSelector from './components/Sidebar/TemplateSelector'
import ExportPanel from './components/Sidebar/ExportPanel'
import ThumbnailCanvas from './components/Canvas/ThumbnailCanvas'
import templates from './data/templates'
import { exportCanvas } from './utils/exportUtils'

function App() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]) // Default to first template
  const [titleText, setTitleText] = useState('')
  const [subtitleText, setSubtitleText] = useState('')
  const canvasRef = useRef(null)

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl)
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
  }

  const handleExport = (options) => {
    if (!canvasRef.current) {
      alert('Canvas not ready. Please wait a moment and try again.')
      return
    }

    const canvas = canvasRef.current.getCanvas()
    if (!canvas) {
      alert('Canvas not available. Please try again.')
      return
    }

    exportCanvas(canvas, options)
  }

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <header className="bg-[#2a2a2a] border-b border-gray-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎸</div>
          <h1 className="text-2xl font-bold text-white">
            Blues Rock Thumbnail Generator
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-[#2a2a2a] border-r border-gray-700 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Upload Panel */}
            <UploadPanel onImageUpload={handleImageUpload} />

            {/* Templates Panel */}
            <TemplateSelector
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleTemplateSelect}
            />

            {/* Text Panel */}
            <section>
              <h2 className="text-lg font-semibold mb-3 text-[#E67E22]">
                Text
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm mb-1 text-gray-400">
                    Title
                  </label>
                  <input
                    type="text"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}
                    placeholder="Your blues title..."
                    className="w-full bg-gray-700 px-3 py-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1 text-gray-400">
                    Subtitle (optional)
                  </label>
                  <input
                    type="text"
                    value={subtitleText}
                    onChange={(e) => setSubtitleText(e.target.value)}
                    placeholder="Subtitle..."
                    className="w-full bg-gray-700 px-3 py-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                  />
                </div>
              </div>
            </section>

            {/* Export Panel */}
            <ExportPanel onExport={handleExport} />
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 bg-[#1a1a1a] flex items-center justify-center p-8">
          <ThumbnailCanvas
            ref={canvasRef}
            imageUrl={uploadedImage}
            selectedTemplate={selectedTemplate}
            titleText={titleText}
            subtitleText={subtitleText}
          />
        </main>
      </div>
    </div>
  )
}

export default App

import { useState, useRef, useEffect } from 'react'
import UploadPanel from './components/Sidebar/UploadPanel'
import TemplateSelector from './components/Sidebar/TemplateSelector'
import FontSelector from './components/Sidebar/FontSelector'
import TextColorPicker from './components/Sidebar/TextColorPicker'
import BadgeEditor from './components/Sidebar/BadgeEditor'
import ExportPanel from './components/Sidebar/ExportPanel'
import ProjectGallery from './components/Sidebar/ProjectGallery'
import ThumbnailCanvas from './components/Canvas/ThumbnailCanvas'
import StorageWarning from './components/StorageWarning'
import AutoSaveIndicator from './components/AutoSaveIndicator'
import templates from './data/templates'
import { exportCanvas } from './utils/exportUtils'
import { saveProject, loadProject, createProjectFromState, loadAutoSave, clearAutoSave, generateThumbnail } from './utils/storageUtils'
import useAutoSave from './hooks/useAutoSave'

function App() {
  const [currentProjectId, setCurrentProjectId] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]) // Default to first template
  const [format, setFormat] = useState('16:9') // '16:9' or '9:16'
  const [titleText, setTitleText] = useState('')
  const [subtitleText, setSubtitleText] = useState('')
  const [fontConfig, setFontConfig] = useState({
    titleFont: 'Bebas Neue',
    subtitleFont: 'Montserrat',
    titleSize: 72,
    subtitleSize: 36
  })
  const [textColors, setTextColors] = useState({
    titleColor: null, // null = use template default
    subtitleColor: null
  })
  const [textPositions, setTextPositions] = useState({
    title: null, // null = use template default
    subtitle: null
  })
  const [badgeConfig, setBadgeConfig] = useState({
    enabled: false,
    style: 'futuristic',
    position: 'top-right',
    text: 'AI Generated',
    transparentBg: true,
    backgroundColor: '#667eea'
  })
  const canvasRef = useRef(null)

  // Auto-save state
  const autoSaveState = {
    format,
    uploadedImage,
    selectedTemplate,
    titleText,
    subtitleText,
    fontConfig,
    textColors,
    textPositions,
    badgeConfig
  }

  const { saveStatus, lastSaved } = useAutoSave(autoSaveState, true)

  // Restore auto-save on mount
  useEffect(() => {
    const autoSave = loadAutoSave()
    if (autoSave && autoSave.uploadedImage) {
      const shouldRestore = window.confirm(
        'An unsaved project was found. Do you want to restore it?'
      )
      if (shouldRestore) {
        const template = templates.find(t => t.id === autoSave.templateId) || templates[0]
        setFormat(autoSave.format || '16:9')
        setUploadedImage(autoSave.uploadedImage)
        setSelectedTemplate(template)
        setTitleText(autoSave.titleText || '')
        setSubtitleText(autoSave.subtitleText || '')
        setFontConfig(autoSave.fontConfig || {
          titleFont: 'Bebas Neue',
          subtitleFont: 'Montserrat',
          titleSize: 72,
          subtitleSize: 36
        })
        setTextColors(autoSave.textColors || { titleColor: null, subtitleColor: null })
        setTextPositions(autoSave.textPositions || { title: null, subtitle: null })
        setBadgeConfig(autoSave.badgeConfig || {
          enabled: false,
          style: 'futuristic',
          position: 'top-right',
          text: 'AI Generated',
          transparentBg: true,
          backgroundColor: '#667eea'
        })
      } else {
        clearAutoSave()
      }
    }
  }, [])

  const handleImageUpload = (imageUrl) => {
    setUploadedImage(imageUrl)
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
  }

  const handleFontChange = (newFontConfig) => {
    setFontConfig(newFontConfig)
  }

  const handleBadgeChange = (newBadgeConfig) => {
    setBadgeConfig(newBadgeConfig)
  }

  const handleTextColorChange = (newTextColors) => {
    setTextColors(newTextColors)
  }

  const handleTextPositionChange = (newTextPositions) => {
    setTextPositions(newTextPositions)
  }

  const handleSaveProject = (projectName) => {
    // Generate thumbnail from canvas
    let thumbnail = null
    if (canvasRef.current) {
      const canvas = canvasRef.current.getCanvas()
      if (canvas) {
        thumbnail = generateThumbnail(canvas, format)
      }
    }

    const currentState = {
      id: currentProjectId,
      format,
      uploadedImage,
      selectedTemplate,
      titleText,
      subtitleText,
      fontConfig,
      textColors,
      textPositions,
      badgeConfig
    }

    const project = createProjectFromState(currentState, projectName, thumbnail)
    const success = saveProject(project)

    if (success) {
      setCurrentProjectId(project.id)
      alert(`Project "${project.name}" saved successfully!`)
    } else {
      alert('Failed to save project. Please try again.')
    }
  }

  const handleLoadProject = (project) => {
    // Find the template by ID from the templates array
    const template = templates.find(t => t.id === project.templateId) || templates[0]

    setCurrentProjectId(project.id)
    setFormat(project.format)
    setUploadedImage(project.uploadedImage)
    setSelectedTemplate(template) // Use template from templates array
    setTitleText(project.titleText)
    setSubtitleText(project.subtitleText)
    setFontConfig(project.fontConfig)
    setTextColors(project.textColors)
    setTextPositions(project.textPositions || { title: null, subtitle: null })
    setBadgeConfig(project.badgeConfig)
    alert(`Project "${project.name}" loaded successfully!`)
  }

  const handleNewProject = () => {
    if (confirm('Create new project? Any unsaved changes will be lost.')) {
      setCurrentProjectId(null)
      setFormat('16:9')
      setUploadedImage(null)
      setSelectedTemplate(templates[0])
      setTitleText('')
      setSubtitleText('')
      setFontConfig({
        titleFont: 'Bebas Neue',
        subtitleFont: 'Montserrat',
        titleSize: 72,
        subtitleSize: 36
      })
      setTextColors({
        titleColor: null,
        subtitleColor: null
      })
      setTextPositions({
        title: null,
        subtitle: null
      })
      setBadgeConfig({
        enabled: false,
        style: 'futuristic',
        position: 'top-right',
        text: 'AI Generated',
        transparentBg: true,
        backgroundColor: '#667eea'
      })
    }
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
    <div className="h-screen bg-[#1a1a1a] flex flex-col">
      {/* Header */}
      <header className="bg-[#2a2a2a] border-b border-gray-700 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white">
              <span>Pix</span>
              <span className="text-red-500">3</span>
              <span className="text-blue-500">l</span>
              <span>Cover</span>
            </div>
            <span className="text-xs text-gray-500">v1.1.0</span>
          </div>
          <AutoSaveIndicator status={saveStatus} lastSaved={lastSaved} />
        </div>
      </header>

      {/* Storage Warning Banner */}
      <StorageWarning />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 bg-[#2a2a2a] border-r border-gray-700 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Project Gallery */}
            <ProjectGallery
              currentProjectId={currentProjectId}
              onSave={handleSaveProject}
              onLoad={handleLoadProject}
              canvasRef={canvasRef}
              onNew={handleNewProject}
            />

            {/* Upload Panel */}
            <UploadPanel onImageUpload={handleImageUpload} />

            {/* Format Selector */}
            <section>
              <h2 className="text-lg font-semibold mb-3 text-[#E67E22]">
                Format
              </h2>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFormat('16:9')}
                  className={`
                    px-4 py-3 rounded text-sm font-medium transition-colors
                    ${format === '16:9'
                      ? 'bg-[#E67E22] text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  <div className="font-semibold">16:9</div>
                  <div className="text-xs opacity-75 mt-1">Landscape</div>
                  <div className="text-xs opacity-75">1920x1080</div>
                </button>
                <button
                  onClick={() => setFormat('9:16')}
                  className={`
                    px-4 py-3 rounded text-sm font-medium transition-colors
                    ${format === '9:16'
                      ? 'bg-[#E67E22] text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }
                  `}
                >
                  <div className="font-semibold">9:16</div>
                  <div className="text-xs opacity-75 mt-1">Portrait</div>
                  <div className="text-xs opacity-75">1080x1920</div>
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {format === '16:9' ? '📺 Standard YouTube videos' : '📱 YouTube Shorts'}
              </div>
            </section>

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

            {/* Font Selector */}
            <FontSelector
              titleFont={fontConfig.titleFont}
              subtitleFont={fontConfig.subtitleFont}
              titleSize={fontConfig.titleSize}
              subtitleSize={fontConfig.subtitleSize}
              onFontChange={handleFontChange}
            />

            {/* Text Color Picker */}
            <TextColorPicker
              titleColor={textColors.titleColor}
              subtitleColor={textColors.subtitleColor}
              selectedTemplate={selectedTemplate}
              onColorChange={handleTextColorChange}
            />

            {/* Badge Panel */}
            <BadgeEditor
              badgeConfig={badgeConfig}
              onBadgeChange={handleBadgeChange}
            />

            {/* Export Panel */}
            <ExportPanel onExport={handleExport} />
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 bg-[#1a1a1a] flex items-center justify-center p-8">
          <ThumbnailCanvas
            ref={canvasRef}
            format={format}
            imageUrl={uploadedImage}
            selectedTemplate={selectedTemplate}
            titleText={titleText}
            subtitleText={subtitleText}
            fontConfig={fontConfig}
            textColors={textColors}
            textPositions={textPositions}
            onTextPositionChange={handleTextPositionChange}
            badgeConfig={badgeConfig}
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#2a2a2a] border-t border-gray-700 px-6 py-2 flex-shrink-0">
        <div className="flex items-center justify-center gap-3 text-xs text-gray-500">
          <a
            href="https://www.pix3ltools.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400 transition-colors"
          >
            From the <span className="text-pink-400">Pix3lTools</span> Collection
          </a>
          <span className="text-gray-600">•</span>
          <a
            href="https://x.com/pix3ltools"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
            title="Follow on X"
          >
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Follow</span>
          </a>
          <span className="text-gray-600">•</span>
          <a
            href="/privacy.html"
            className="hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App

import { useRef, useState, useEffect } from 'react'

function UploadPanel({ onImageUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [videoTime, setVideoTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  const handleFile = (file) => {
    // Check if it's a video (by MIME type or extension)
    const videoTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime', 'video/x-m4v', 'video/x-msvideo']
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.m4v', '.avi']
    const isVideo = videoTypes.includes(file.type) ||
                    videoExtensions.some(ext => file.name.toLowerCase().endsWith(ext))

    if (isVideo) {
      handleVideoFile(file)
      return
    }

    // Validate image file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, PNG, WebP image or MP4, WebM video')
      return
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 10MB')
      return
    }

    // Clear video state
    setVideoFile(null)
    setVideoTime(0)
    setVideoDuration(0)

    // Create preview and read file
    const reader = new FileReader()
    reader.onload = (e) => {
      const imageUrl = e.target.result
      setPreviewUrl(imageUrl)
      if (onImageUpload) {
        onImageUpload(imageUrl)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleVideoFile = (file) => {
    // Validate file size (max 100MB for videos)
    const maxSize = 100 * 1024 * 1024 // 100MB in bytes
    if (file.size > maxSize) {
      alert('Video file size must be less than 100MB')
      return
    }

    // Clear image preview
    setPreviewUrl(null)

    // Create video URL
    const videoUrl = URL.createObjectURL(file)
    setVideoFile(videoUrl)
    setVideoTime(0)
  }

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration)
      // Seek to first frame
      videoRef.current.currentTime = 0
    }
  }

  const handleTimeChange = (e) => {
    const time = parseFloat(e.target.value)
    setVideoTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }

  const extractFrame = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Set canvas size to video size
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw current frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

    // Get image data
    const imageUrl = canvas.toDataURL('image/jpeg', 0.95)

    // Clear video state
    URL.revokeObjectURL(videoFile)
    setVideoFile(null)
    setVideoTime(0)
    setVideoDuration(0)

    // Set as preview and pass to parent
    setPreviewUrl(imageUrl)
    if (onImageUpload) {
      onImageUpload(imageUrl)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleClick = () => {
    if (!videoFile) {
      fileInputRef.current?.click()
    }
  }

  const handleFileInput = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const handlePaste = (e) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile()
        handleFile(file)
        break
      }
    }
  }

  // Cleanup video URL on unmount
  useEffect(() => {
    return () => {
      if (videoFile) {
        URL.revokeObjectURL(videoFile)
      }
    }
  }, [videoFile])

  // Add paste listener when component mounts
  useEffect(() => {
    window.addEventListener('paste', handlePaste)
    return () => window.removeEventListener('paste', handlePaste)
  }, [])

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3 text-[#E67E22]">
        Upload Image
      </h2>

      {/* Hidden canvas for frame extraction */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Video Frame Extractor */}
      {videoFile && (
        <div className="mb-3 bg-gray-800 rounded-lg p-3 space-y-3">
          <video
            ref={videoRef}
            src={videoFile}
            onLoadedMetadata={handleVideoLoaded}
            className="w-full rounded"
            muted
          />

          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max={videoDuration || 0}
              step="0.1"
              value={videoTime}
              onChange={handleTimeChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#E67E22]"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>{formatTime(videoTime)}</span>
              <span>{formatTime(videoDuration)}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={extractFrame}
              className="flex-1 px-3 py-2 bg-[#E67E22] text-white rounded text-sm font-medium hover:bg-[#d35400] transition-colors"
            >
              Use This Frame
            </button>
            <button
              onClick={() => {
                URL.revokeObjectURL(videoFile)
                setVideoFile(null)
                setVideoTime(0)
                setVideoDuration(0)
              }}
              className="px-3 py-2 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center
          transition-all cursor-pointer
          ${isDragging
            ? 'border-[#E67E22] bg-[#E67E22]/10'
            : 'border-gray-600 hover:border-[#E67E22]'
          }
          ${videoFile ? 'opacity-50 pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        {previewUrl ? (
          <div className="space-y-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-32 object-cover rounded"
            />
            <p className="text-xs text-gray-400">
              Click or drop to change
            </p>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-2">📁</div>
            <p className="text-sm text-gray-300 mb-1">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-gray-500">
              Image (JPG, PNG, WebP) or Video (MP4, WebM)
            </p>
            <p className="text-xs text-gray-600 mt-2">
              💡 Tip: You can also paste (Ctrl+V)
            </p>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/ogg"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </section>
  )
}

export default UploadPanel

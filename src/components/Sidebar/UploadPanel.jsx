import { useRef, useState, useEffect } from 'react'

function UploadPanel({ onImageUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const fileInputRef = useRef(null)

  const handleFile = (file) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      alert('Please upload a JPG, PNG, or WebP image')
      return
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    if (file.size > maxSize) {
      alert('File size must be less than 10MB')
      return
    }

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
    fileInputRef.current?.click()
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

      <div
        className={`
          border-2 border-dashed rounded-lg p-6 text-center
          transition-all cursor-pointer
          ${isDragging
            ? 'border-[#E67E22] bg-[#E67E22]/10'
            : 'border-gray-600 hover:border-[#E67E22]'
          }
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
              Click or drop to change image
            </p>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-2">📁</div>
            <p className="text-sm text-gray-300 mb-1">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-gray-500">
              JPG, PNG, WebP (max 10MB)
            </p>
            <p className="text-xs text-gray-600 mt-2">
              💡 Tip: You can also paste (Ctrl+V)
            </p>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    </section>
  )
}

export default UploadPanel

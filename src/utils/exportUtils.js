/**
 * Export utilities for thumbnail canvas
 */

/**
 * Export canvas to image file
 * @param {fabric.Canvas} canvas - Fabric.js canvas instance
 * @param {Object} options - Export options
 * @param {string} options.format - 'jpeg' or 'png'
 * @param {number} options.quality - Quality 0-1 (for JPEG)
 * @param {string} options.filename - Custom filename (optional)
 * @returns {void}
 */
export const exportCanvas = (canvas, options = {}) => {
  if (!canvas) {
    console.error('Canvas is not available')
    return
  }

  const {
    format = 'jpeg',
    quality = 0.9,
    filename = generateFilename(format)
  } = options

  try {
    // Deselect all objects before export
    canvas.discardActiveObject()
    canvas.renderAll()

    // Export canvas to data URL
    const dataURL = canvas.toDataURL({
      format: format,
      quality: quality,
      multiplier: 1 // Keep original size (1280x720)
    })

    // Create download link
    downloadImage(dataURL, filename)
  } catch (error) {
    console.error('Error exporting canvas:', error)
    alert('Error exporting thumbnail. Please try again.')
  }
}

/**
 * Generate filename with timestamp
 * @param {string} format - File format (jpeg/png)
 * @returns {string} Generated filename
 */
const generateFilename = (format) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5)
  const ext = format === 'jpeg' ? 'jpg' : 'png'
  return `blues-thumbnail-${timestamp}.${ext}`
}

/**
 * Download image from data URL
 * @param {string} dataURL - Image data URL
 * @param {string} filename - Filename for download
 * @returns {void}
 */
const downloadImage = (dataURL, filename) => {
  const link = document.createElement('a')
  link.download = filename
  link.href = dataURL
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Get estimated file size from data URL
 * @param {string} dataURL - Image data URL
 * @returns {string} Formatted file size (e.g., "245 KB")
 */
export const getEstimatedFileSize = (dataURL) => {
  if (!dataURL) return '0 KB'

  // Remove data URL prefix to get base64 string
  const base64 = dataURL.split(',')[1]
  if (!base64) return '0 KB'

  // Calculate size in bytes
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0
  const sizeInBytes = (base64.length * 3) / 4 - padding

  // Convert to KB
  const sizeInKB = Math.round(sizeInBytes / 1024)

  return `${sizeInKB} KB`
}

export default exportCanvas

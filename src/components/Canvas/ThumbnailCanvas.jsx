import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { fabric } from 'fabric'
import badgeStyles, { badgePositions } from '../../data/badgeStyles'

const ThumbnailCanvas = forwardRef(({ format, imageUrl, selectedTemplate, titleText, subtitleText, extraText, fontConfig, textColors, textPositions, onTextPositionChange, badgeConfig, filterConfig }, ref) => {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const [isReady, setIsReady] = useState(false)
  const [zoom, setZoom] = useState(1)

  // Calculate canvas dimensions based on format
  // Use display dimensions directly for now
  const CANVAS_WIDTH = format === '9:16' ? 360 : 800
  const CANVAS_HEIGHT = format === '9:16' ? 640 : 450

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return

    setIsReady(false)

    // Dispose existing canvas if any
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose()
      fabricCanvasRef.current = null
    }

    // Small delay to ensure cleanup is complete
    const timeoutId = setTimeout(() => {
      // Create fabric canvas
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        backgroundColor: '#1E3A5F',
        selection: true,
        preserveObjectStacking: true
      })

      fabricCanvasRef.current = canvas
      setIsReady(true)
    }, 50)

    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose()
        fabricCanvasRef.current = null
      }
    }
  }, [CANVAS_WIDTH, CANVAS_HEIGHT])

  // Add listener for text position changes
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady || !onTextPositionChange) return

    const canvas = fabricCanvasRef.current

    const handleObjectModified = (e) => {
      const obj = e.target
      if (obj && (obj.name === 'title' || obj.name === 'subtitle' || obj.name === 'extra')) {
        // Get current positions from canvas
        const titleObj = canvas.getObjects().find(o => o.name === 'title')
        const subtitleObj = canvas.getObjects().find(o => o.name === 'subtitle')
        const extraObj = canvas.getObjects().find(o => o.name === 'extra')

        const newPositions = {
          title: titleObj ? { left: titleObj.left, top: titleObj.top } : textPositions?.title || null,
          subtitle: subtitleObj ? { left: subtitleObj.left, top: subtitleObj.top } : textPositions?.subtitle || null,
          extra: extraObj ? { left: extraObj.left, top: extraObj.top } : textPositions?.extra || null
        }

        onTextPositionChange(newPositions)
      }
    }

    canvas.on('object:modified', handleObjectModified)

    return () => {
      canvas.off('object:modified', handleObjectModified)
    }
  }, [isReady, onTextPositionChange, textPositions])

  // Update background when template changes
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady) return

    const canvas = fabricCanvasRef.current

    if (selectedTemplate?.background) {
      const { color, gradient } = selectedTemplate.background

      if (gradient?.enabled) {
        // Create gradient background
        const grad = new fabric.Gradient({
          type: 'linear',
          coords: {
            x1: 0,
            y1: 0,
            x2: CANVAS_WIDTH,
            y2: CANVAS_HEIGHT
          },
          colorStops: gradient.colors.map((color, index) => ({
            offset: index / (gradient.colors.length - 1),
            color: color
          }))
        })
        canvas.setBackgroundColor(grad, canvas.renderAll.bind(canvas))
      } else {
        // Solid color background
        canvas.setBackgroundColor(color, canvas.renderAll.bind(canvas))
      }
    }
  }, [selectedTemplate, isReady])

  // Add uploaded image to canvas
  useEffect(() => {
    if (!fabricCanvasRef.current || !imageUrl || !isReady) return

    const canvas = fabricCanvasRef.current

    // Remove existing image objects
    const objects = canvas.getObjects()
    objects.forEach(obj => {
      if (obj.type === 'image') {
        canvas.remove(obj)
      }
    })

    // Load and add new image
    fabric.Image.fromURL(imageUrl, (img) => {
      // Scale image to fit canvas while maintaining aspect ratio
      const scale = Math.max(
        CANVAS_WIDTH / img.width,
        CANVAS_HEIGHT / img.height
      )

      img.set({
        scaleX: scale,
        scaleY: scale,
        left: CANVAS_WIDTH / 2,
        top: CANVAS_HEIGHT / 2,
        originX: 'center',
        originY: 'center',
        selectable: true,
        hasControls: true
      })

      canvas.add(img)
      canvas.sendToBack(img)
      canvas.renderAll()
    })
  }, [imageUrl, isReady])

  // Apply filters to image
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady || !filterConfig) return

    const canvas = fabricCanvasRef.current
    const imageObj = canvas.getObjects().find(obj => obj.type === 'image')

    if (!imageObj) return

    // Build filters array
    const filters = []

    // Brightness: -1 to 1 (we use -100 to 100, so divide by 100)
    if (filterConfig.brightness !== 0) {
      filters.push(new fabric.Image.filters.Brightness({
        brightness: filterConfig.brightness / 100
      }))
    }

    // Contrast: -1 to 1
    if (filterConfig.contrast !== 0) {
      filters.push(new fabric.Image.filters.Contrast({
        contrast: filterConfig.contrast / 100
      }))
    }

    // Saturation: -1 to 1
    if (filterConfig.saturation !== 0) {
      filters.push(new fabric.Image.filters.Saturation({
        saturation: filterConfig.saturation / 100
      }))
    }

    // Blur: 0 to 1 (we use 0-10, so divide by 10)
    if (filterConfig.blur > 0) {
      filters.push(new fabric.Image.filters.Blur({
        blur: filterConfig.blur / 10
      }))
    }

    // Apply filters
    imageObj.filters = filters
    imageObj.applyFilters()
    canvas.renderAll()
  }, [filterConfig, isReady, imageUrl])

  // Add/update title text
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady) return

    const canvas = fabricCanvasRef.current

    // Remove existing title
    const objects = canvas.getObjects()
    objects.forEach(obj => {
      if (obj.name === 'title') {
        canvas.remove(obj)
      }
    })

    if (titleText && titleText.trim()) {
      const template = selectedTemplate || {}
      const textConfig = template.text?.title || {}

      // Use saved position if available, otherwise calculate from template
      let posX, posY
      if (textPositions?.title) {
        posX = textPositions.title.left
        posY = textPositions.title.top
      } else {
        // Adjust position based on format (scale from 16:9 base to current format)
        const baseWidth = 1920
        const baseHeight = 1080
        const scaleX = CANVAS_WIDTH / baseWidth
        const scaleY = CANVAS_HEIGHT / baseHeight

        posX = textConfig.position?.x ? textConfig.position.x * scaleX : CANVAS_WIDTH / 2
        posY = textConfig.position?.y ? textConfig.position.y * scaleY : CANVAS_HEIGHT * 0.4
      }

      const text = new fabric.Text(titleText.toUpperCase(), {
        fontFamily: fontConfig?.titleFont || textConfig.font || 'Bebas Neue',
        fontSize: fontConfig?.titleSize || textConfig.size || 72,
        fill: textColors?.titleColor || textConfig.color || '#ECF0F1',
        originX: 'center',
        originY: 'center',
        textAlign: textConfig.align || 'center'
      })

      // Add outline effect if specified
      if (textConfig.effects?.outline?.enabled) {
        text.set({
          stroke: textConfig.effects.outline.color || '#000000',
          strokeWidth: textConfig.effects.outline.width || 3
        })
      }

      // Add shadow effect if specified
      if (textConfig.effects?.shadow?.enabled) {
        text.set({
          shadow: new fabric.Shadow({
            color: textConfig.effects.shadow.color || '#000000',
            blur: textConfig.effects.shadow.blur || 10,
            offsetX: textConfig.effects.shadow.offsetX || 3,
            offsetY: textConfig.effects.shadow.offsetY || 3
          })
        })
      }

      // Check if text background box is enabled
      if (textConfig.effects?.textBackground?.enabled) {
        const bgConfig = textConfig.effects.textBackground
        const paddingH = bgConfig.padding?.horizontal || 30
        const paddingV = bgConfig.padding?.vertical || 15

        // Get text dimensions
        const textWidth = text.width
        const textHeight = text.height

        // Determine background width
        const bgWidth = bgConfig.fullWidth ? CANVAS_WIDTH : textWidth + (paddingH * 2)
        const bgHeight = textHeight + (paddingV * 2)

        // Create background rectangle
        const bgRect = new fabric.Rect({
          width: bgWidth,
          height: bgHeight,
          fill: bgConfig.color || '#000000',
          opacity: bgConfig.opacity || 0.8,
          originX: 'center',
          originY: 'center'
        })

        const groupObjects = [bgRect, text]

        // Add bottom border line if enabled
        if (bgConfig.borderBottom?.enabled) {
          const borderLine = new fabric.Rect({
            width: bgWidth,
            height: bgConfig.borderBottom.width || 2,
            fill: bgConfig.borderBottom.color || '#FFFFFF',
            originX: 'center',
            originY: 'center',
            top: bgHeight / 2
          })
          groupObjects.push(borderLine)
        }

        // Create group with background and text
        const titleGroup = new fabric.Group(groupObjects, {
          name: 'title',
          left: posX,
          top: posY,
          originX: 'center',
          originY: 'center',
          selectable: true,
          hasControls: true
        })

        canvas.add(titleGroup)
        canvas.bringToFront(titleGroup)
      } else {
        // Add text without background
        text.set({
          name: 'title',
          left: posX,
          top: posY,
          selectable: true,
          hasControls: true
        })
        canvas.add(text)
        canvas.bringToFront(text)
      }

      canvas.renderAll()
    }
  }, [titleText, selectedTemplate, fontConfig, textColors, isReady, CANVAS_WIDTH, CANVAS_HEIGHT])

  // Add/update subtitle text
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady) return

    const canvas = fabricCanvasRef.current

    // Remove existing subtitle
    const objects = canvas.getObjects()
    objects.forEach(obj => {
      if (obj.name === 'subtitle') {
        canvas.remove(obj)
      }
    })

    if (subtitleText && subtitleText.trim()) {
      const template = selectedTemplate || {}
      const textConfig = template.text?.subtitle || {}

      // Use saved position if available, otherwise calculate from template
      let posX, posY
      if (textPositions?.subtitle) {
        posX = textPositions.subtitle.left
        posY = textPositions.subtitle.top
      } else {
        // Adjust position based on format (scale from 16:9 base to current format)
        const baseWidth = 1920
        const baseHeight = 1080
        const scaleX = CANVAS_WIDTH / baseWidth
        const scaleY = CANVAS_HEIGHT / baseHeight

        posX = textConfig.position?.x ? textConfig.position.x * scaleX : CANVAS_WIDTH / 2
        posY = textConfig.position?.y ? textConfig.position.y * scaleY : CANVAS_HEIGHT * 0.53
      }

      const text = new fabric.Text(subtitleText, {
        name: 'subtitle',
        left: posX,
        top: posY,
        fontFamily: fontConfig?.subtitleFont || textConfig.font || 'Montserrat',
        fontSize: fontConfig?.subtitleSize || textConfig.size || 36,
        fill: textColors?.subtitleColor || textConfig.color || '#E67E22',
        originX: 'center',
        originY: 'center',
        textAlign: textConfig.align || 'center',
        selectable: true,
        hasControls: true
      })

      // Add outline effect if specified
      if (textConfig.effects?.outline?.enabled) {
        text.set({
          stroke: textConfig.effects.outline.color || '#000000',
          strokeWidth: textConfig.effects.outline.width || 2
        })
      }

      // Add shadow effect if specified
      if (textConfig.effects?.shadow?.enabled) {
        text.set({
          shadow: new fabric.Shadow({
            color: textConfig.effects.shadow.color || '#000000',
            blur: textConfig.effects.shadow.blur || 8,
            offsetX: textConfig.effects.shadow.offsetX || 2,
            offsetY: textConfig.effects.shadow.offsetY || 2
          })
        })
      }

      canvas.add(text)
      canvas.bringToFront(text)
      canvas.renderAll()
    }
  }, [subtitleText, selectedTemplate, fontConfig, textColors, isReady, CANVAS_WIDTH, CANVAS_HEIGHT])

  // Add/update extra text line
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady) return

    const canvas = fabricCanvasRef.current

    // Remove existing extra text
    const objects = canvas.getObjects()
    objects.forEach(obj => {
      if (obj.name === 'extra') {
        canvas.remove(obj)
      }
    })

    if (extraText && extraText.trim()) {
      const template = selectedTemplate || {}
      const textConfig = template.text?.subtitle || {} // Use subtitle config as base

      // Use saved position if available, otherwise calculate below subtitle
      let posX, posY
      if (textPositions?.extra) {
        posX = textPositions.extra.left
        posY = textPositions.extra.top
      } else {
        // Adjust position based on format (scale from 16:9 base to current format)
        const baseWidth = 1920
        const baseHeight = 1080
        const scaleX = CANVAS_WIDTH / baseWidth
        const scaleY = CANVAS_HEIGHT / baseHeight

        posX = textConfig.position?.x ? textConfig.position.x * scaleX : CANVAS_WIDTH / 2
        // Position below subtitle (default subtitle is at 0.53, extra at 0.65)
        posY = textConfig.position?.y ? (textConfig.position.y + 130) * scaleY : CANVAS_HEIGHT * 0.65
      }

      const text = new fabric.Text(extraText, {
        name: 'extra',
        left: posX,
        top: posY,
        fontFamily: fontConfig?.subtitleFont || textConfig.font || 'Montserrat',
        fontSize: (fontConfig?.subtitleSize || textConfig.size || 36) * 0.85, // Slightly smaller
        fill: textColors?.subtitleColor || textConfig.color || '#E67E22',
        originX: 'center',
        originY: 'center',
        textAlign: textConfig.align || 'center',
        selectable: true,
        hasControls: true
      })

      // Add outline effect if specified
      if (textConfig.effects?.outline?.enabled) {
        text.set({
          stroke: textConfig.effects.outline.color || '#000000',
          strokeWidth: textConfig.effects.outline.width || 2
        })
      }

      // Add shadow effect if specified
      if (textConfig.effects?.shadow?.enabled) {
        text.set({
          shadow: new fabric.Shadow({
            color: textConfig.effects.shadow.color || '#000000',
            blur: textConfig.effects.shadow.blur || 8,
            offsetX: textConfig.effects.shadow.offsetX || 2,
            offsetY: textConfig.effects.shadow.offsetY || 2
          })
        })
      }

      canvas.add(text)
      canvas.bringToFront(text)
      canvas.renderAll()
    }
  }, [extraText, selectedTemplate, fontConfig, textColors, isReady, CANVAS_WIDTH, CANVAS_HEIGHT])

  // Add/update AI Generated badge
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady) return

    const canvas = fabricCanvasRef.current

    // Remove existing badge
    const objects = canvas.getObjects()
    objects.forEach(obj => {
      if (obj.name === 'badge') {
        canvas.remove(obj)
      }
    })

    if (badgeConfig?.enabled && badgeConfig.text) {
      const styleData = badgeStyles.find(s => s.id === badgeConfig.style)
      const positionData = badgePositions.find(p => p.id === badgeConfig.position)

      if (styleData && positionData) {
        const style = styleData.style

        // Create badge text with icon first to know its size
        const badgeText = style.icon
          ? `${style.icon} ${badgeConfig.text}`
          : badgeConfig.text

        // Create badge background rectangle
        const textObj = new fabric.Text(badgeText, {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          fill: style.color,
          textTransform: style.textTransform
        })

        const padding = 16
        const bgWidth = textObj.width + padding * 2
        const bgHeight = textObj.height + padding

        // Determine background color based on transparency setting
        let backgroundFill
        if (badgeConfig.transparentBg) {
          backgroundFill = 'rgba(0, 0, 0, 0)' // Fully transparent
        } else if (badgeConfig.backgroundColor) {
          backgroundFill = badgeConfig.backgroundColor
        } else {
          backgroundFill = style.background.includes('gradient') ? '#667eea' : style.background
        }

        const background = new fabric.Rect({
          width: bgWidth,
          height: bgHeight,
          fill: backgroundFill,
          stroke: 'transparent',
          strokeWidth: 0,
          rx: parseInt(style.borderRadius) || 0,
          ry: parseInt(style.borderRadius) || 0
        })

        // Smart positioning based on position ID
        const margin = 20
        let badgePosX, badgePosY

        switch (badgeConfig.position) {
          case 'top-right':
            badgePosX = CANVAS_WIDTH - bgWidth - margin
            badgePosY = margin
            break
          case 'top-left':
            badgePosX = margin
            badgePosY = margin
            break
          case 'bottom-right':
            badgePosX = CANVAS_WIDTH - bgWidth - margin
            badgePosY = CANVAS_HEIGHT - bgHeight - margin
            break
          case 'bottom-left':
            badgePosX = margin
            badgePosY = CANVAS_HEIGHT - bgHeight - margin
            break
          default:
            badgePosX = margin
            badgePosY = margin
        }

        // Create group for badge
        const badgeGroup = new fabric.Group([background, textObj], {
          name: 'badge',
          left: badgePosX,
          top: badgePosY,
          originX: 'left',
          originY: 'top',
          selectable: true,
          hasControls: true
        })

        // Add shadow if specified
        if (style.shadow) {
          badgeGroup.set({
            shadow: new fabric.Shadow({
              color: '#FF6B35',
              blur: 10,
              offsetX: 0,
              offsetY: 0
            })
          })
        }

        canvas.add(badgeGroup)
        canvas.bringToFront(badgeGroup)
        canvas.renderAll()
      }
    }
  }, [badgeConfig, isReady, CANVAS_WIDTH, CANVAS_HEIGHT])

  // Apply zoom to canvas
  useEffect(() => {
    if (!fabricCanvasRef.current || !isReady) return

    const canvas = fabricCanvasRef.current
    canvas.setZoom(zoom)
    canvas.setWidth(CANVAS_WIDTH * zoom)
    canvas.setHeight(CANVAS_HEIGHT * zoom)
    canvas.renderAll()
  }, [zoom, isReady, CANVAS_WIDTH, CANVAS_HEIGHT])

  // Zoom handlers
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 2))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5))
  }

  const handleZoomReset = () => {
    setZoom(1)
  }

  // Expose canvas instance to parent component
  useImperativeHandle(ref, () => ({
    getCanvas: () => fabricCanvasRef.current,
    exportCanvas: (options) => {
      return fabricCanvasRef.current
    }
  }))

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Zoom Controls */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 rounded text-white transition-colors"
          title="Zoom out"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <button
          onClick={handleZoomReset}
          className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm text-white transition-colors min-w-[60px]"
          title="Reset zoom"
        >
          {Math.round(zoom * 100)}%
        </button>
        <button
          onClick={handleZoomIn}
          disabled={zoom >= 2}
          className="w-8 h-8 flex items-center justify-center bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 rounded text-white transition-colors"
          title="Zoom in"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Canvas Container */}
      <div className="bg-gray-900 rounded-lg shadow-2xl overflow-auto max-w-full max-h-[calc(100vh-200px)]">
        <canvas
          ref={canvasRef}
          style={{
            display: 'block'
          }}
        />
      </div>
    </div>
  )
})

ThumbnailCanvas.displayName = 'ThumbnailCanvas'

export default ThumbnailCanvas

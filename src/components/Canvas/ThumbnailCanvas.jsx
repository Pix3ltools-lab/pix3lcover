import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { fabric } from 'fabric'
import badgeStyles, { badgePositions } from '../../data/badgeStyles'

const ThumbnailCanvas = forwardRef(({ format, imageUrl, selectedTemplate, titleText, subtitleText, fontConfig, textColors, badgeConfig }, ref) => {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

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

      // Adjust position based on format (scale from 16:9 base to current format)
      const baseWidth = 1280
      const baseHeight = 720
      const scaleX = CANVAS_WIDTH / baseWidth
      const scaleY = CANVAS_HEIGHT / baseHeight

      const posX = textConfig.position?.x ? textConfig.position.x * scaleX : CANVAS_WIDTH / 2
      const posY = textConfig.position?.y ? textConfig.position.y * scaleY : CANVAS_HEIGHT * 0.4

      const text = new fabric.Text(titleText.toUpperCase(), {
        name: 'title',
        left: posX,
        top: posY,
        fontFamily: fontConfig?.titleFont || textConfig.font || 'Bebas Neue',
        fontSize: fontConfig?.titleSize || textConfig.size || 72,
        fill: textColors?.titleColor || textConfig.color || '#ECF0F1',
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

      canvas.add(text)
      canvas.bringToFront(text)
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

      // Adjust position based on format (scale from 16:9 base to current format)
      const baseWidth = 1280
      const baseHeight = 720
      const scaleX = CANVAS_WIDTH / baseWidth
      const scaleY = CANVAS_HEIGHT / baseHeight

      const posX = textConfig.position?.x ? textConfig.position.x * scaleX : CANVAS_WIDTH / 2
      const posY = textConfig.position?.y ? textConfig.position.y * scaleY : CANVAS_HEIGHT * 0.53

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

  // Expose canvas instance to parent component
  useImperativeHandle(ref, () => ({
    getCanvas: () => fabricCanvasRef.current,
    exportCanvas: (options) => {
      return fabricCanvasRef.current
    }
  }))

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl">
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

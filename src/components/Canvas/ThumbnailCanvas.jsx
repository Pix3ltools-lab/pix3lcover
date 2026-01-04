import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import { fabric } from 'fabric'

const ThumbnailCanvas = forwardRef(({ imageUrl, selectedTemplate, titleText, subtitleText }, ref) => {
  const canvasRef = useRef(null)
  const fabricCanvasRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  // YouTube thumbnail dimensions
  const CANVAS_WIDTH = 1280
  const CANVAS_HEIGHT = 720

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return

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

    // Cleanup
    return () => {
      canvas.dispose()
    }
  }, [])

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

      const text = new fabric.Text(titleText.toUpperCase(), {
        name: 'title',
        left: textConfig.position?.x || CANVAS_WIDTH / 2,
        top: textConfig.position?.y || 300,
        fontFamily: textConfig.font || 'Bebas Neue',
        fontSize: textConfig.size || 72,
        fill: textConfig.color || '#ECF0F1',
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
  }, [titleText, selectedTemplate, isReady])

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

      const text = new fabric.Text(subtitleText, {
        name: 'subtitle',
        left: textConfig.position?.x || CANVAS_WIDTH / 2,
        top: textConfig.position?.y || 380,
        fontFamily: textConfig.font || 'Montserrat',
        fontSize: textConfig.size || 36,
        fill: textConfig.color || '#E67E22',
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
  }, [subtitleText, selectedTemplate, isReady])

  // Expose canvas instance to parent component
  useImperativeHandle(ref, () => ({
    getCanvas: () => fabricCanvasRef.current,
    exportCanvas: (options) => {
      return fabricCanvasRef.current
    }
  }))

  return (
    <div className="flex items-center justify-center">
      <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
})

ThumbnailCanvas.displayName = 'ThumbnailCanvas'

export default ThumbnailCanvas

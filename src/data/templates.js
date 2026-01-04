/**
 * Template definitions for Blues Rock thumbnails
 * Each template includes layout, colors, fonts, and graphic elements
 */

export const templates = [
  {
    id: 'classic-blues',
    name: 'Classic Blues',
    description: 'Dark blue with warm orange accents and vintage vibes',
    thumbnail: '🎸',
    background: {
      type: 'solid',
      color: '#1E3A5F',
      gradient: {
        enabled: true,
        colors: ['#1E3A5F', '#0F1F3F'],
        angle: 135
      }
    },
    layout: {
      type: 'full-bleed', // Image as background
      imageOpacity: 0.7,
      imageBlur: 2
    },
    text: {
      title: {
        font: 'Bebas Neue',
        size: 72,
        color: '#ECF0F1',
        position: { x: 640, y: 300 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#000000', width: 4 },
          shadow: { enabled: true, blur: 10, color: '#000000', offsetX: 3, offsetY: 3 }
        }
      },
      subtitle: {
        font: 'Montserrat',
        size: 36,
        color: '#E67E22',
        position: { x: 640, y: 380 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#000000', width: 2 },
          shadow: { enabled: false }
        }
      }
    },
    graphics: {
      watermark: {
        type: 'guitar-silhouette',
        position: 'bottom-right',
        opacity: 0.15,
        size: 300
      }
    },
    badge: {
      enabled: true,
      position: 'top-right',
      style: 'futuristic'
    }
  },
  {
    id: 'gritty-guitar',
    name: 'Gritty Guitar',
    description: 'Brown sepia tones with grunge texture',
    thumbnail: '🎛️',
    background: {
      type: 'solid',
      color: '#2C1810',
      gradient: {
        enabled: true,
        colors: ['#2C1810', '#1A0F08'],
        angle: 90
      }
    },
    layout: {
      type: 'split-screen', // Image left, text right
      splitRatio: 0.5
    },
    text: {
      title: {
        font: 'Anton',
        size: 68,
        color: '#F5E6D3',
        position: { x: 960, y: 300 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#D4AF37', width: 3 },
          shadow: { enabled: true, blur: 8, color: '#000000', offsetX: 2, offsetY: 2 }
        }
      },
      subtitle: {
        font: 'Roboto Condensed',
        size: 32,
        color: '#D4AF37',
        position: { x: 960, y: 380 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 5, color: '#000000', offsetX: 1, offsetY: 1 }
        }
      }
    },
    graphics: {
      texture: {
        type: 'grunge',
        opacity: 0.3
      },
      watermark: {
        type: 'amplifier',
        position: 'center-left',
        opacity: 0.1,
        size: 250
      }
    },
    badge: {
      enabled: true,
      position: 'top-right',
      style: 'vintage-tech'
    }
  },
  {
    id: 'electric-neon',
    name: 'Electric Neon',
    description: 'Dark background with neon accents',
    thumbnail: '⚡',
    background: {
      type: 'solid',
      color: '#0A0E27',
      gradient: {
        enabled: true,
        colors: ['#0A0E27', '#1a1f3a'],
        angle: 180
      }
    },
    layout: {
      type: 'centered', // Image in center with text overlay
      imageSize: 0.8
    },
    text: {
      title: {
        font: 'Oswald',
        size: 80,
        color: '#FFFFFF',
        position: { x: 640, y: 280 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#FF6B35', width: 4 },
          shadow: { enabled: true, blur: 20, color: '#FF6B35', offsetX: 0, offsetY: 0 },
          glow: { enabled: true, color: '#FF6B35', intensity: 0.8 }
        }
      },
      subtitle: {
        font: 'Montserrat',
        size: 36,
        color: '#FF6B35',
        position: { x: 640, y: 380 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 15, color: '#FF6B35', offsetX: 0, offsetY: 0 }
        }
      }
    },
    graphics: {
      watermark: {
        type: 'electric-guitar',
        position: 'background-center',
        opacity: 0.08,
        size: 600
      }
    },
    badge: {
      enabled: true,
      position: 'top-right',
      style: 'futuristic'
    }
  },
  {
    id: 'vintage-vinyl',
    name: 'Vintage Vinyl',
    description: 'Cream and beige with retro aesthetic',
    thumbnail: '💿',
    background: {
      type: 'solid',
      color: '#F5E6D3',
      gradient: {
        enabled: false
      }
    },
    layout: {
      type: 'centered-framed', // Image in center with decorative frame
      frameColor: '#2C1810',
      frameWidth: 20
    },
    text: {
      title: {
        font: 'Playfair Display',
        size: 70,
        color: '#2C1810',
        position: { x: 640, y: 580 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 3, color: '#00000040', offsetX: 2, offsetY: 2 }
        }
      },
      subtitle: {
        font: 'Montserrat',
        size: 28,
        color: '#8B6F47',
        position: { x: 640, y: 640 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: false }
        }
      }
    },
    graphics: {
      texture: {
        type: 'paper',
        opacity: 0.2
      },
      watermark: {
        type: 'vinyl-record',
        position: 'top-center',
        opacity: 0.15,
        size: 180
      }
    },
    badge: {
      enabled: true,
      position: 'bottom-right',
      style: 'vintage-tech'
    }
  },
  {
    id: 'smoky-stage',
    name: 'Smoky Stage',
    description: 'Grey-blue palette with atmospheric gradient',
    thumbnail: '🌫️',
    background: {
      type: 'gradient',
      color: '#34495E',
      gradient: {
        enabled: true,
        colors: ['#34495E', '#2C3E50', '#1a252f'],
        angle: 45,
        type: 'radial'
      }
    },
    layout: {
      type: 'diagonal', // Dramatic diagonal composition
      angle: -15
    },
    text: {
      title: {
        font: 'Bebas Neue',
        size: 85,
        color: '#ECF0F1',
        position: { x: 640, y: 320 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#95A5A6', width: 3 },
          shadow: { enabled: true, blur: 15, color: '#000000', offsetX: 4, offsetY: 4 }
        }
      },
      subtitle: {
        font: 'Oswald',
        size: 38,
        color: '#95A5A6',
        position: { x: 640, y: 410 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 8, color: '#000000', offsetX: 2, offsetY: 2 }
        }
      }
    },
    graphics: {
      effect: {
        type: 'stage-lights',
        opacity: 0.4
      },
      watermark: {
        type: 'microphone',
        position: 'bottom-left',
        opacity: 0.12,
        size: 200
      }
    },
    badge: {
      enabled: true,
      position: 'top-right',
      style: 'minimal'
    }
  }
]

export default templates

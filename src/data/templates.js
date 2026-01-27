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
  },
  {
    id: 'cinematic-box',
    name: 'Cinematic Box',
    description: 'Black box background with elegant green accent',
    thumbnail: '🎬',
    background: {
      type: 'solid',
      color: '#000000',
      gradient: {
        enabled: false
      }
    },
    layout: {
      type: 'full-bleed',
      imageOpacity: 0.6,
      imageBlur: 1
    },
    text: {
      title: {
        font: 'Cinzel',
        size: 48,
        color: '#D4AF37',
        position: { x: 640, y: 600 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: false },
          textBackground: {
            enabled: true,
            color: '#000000',
            opacity: 1.0,
            fullWidth: true,
            padding: { horizontal: 0, vertical: 12 }
          }
        }
      },
      subtitle: {
        font: 'Montserrat',
        size: 24,
        color: '#FFFFFF',
        position: { x: 640, y: 660 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: false }
        }
      }
    },
    graphics: {
      watermark: {
        type: 'film-strip',
        position: 'top-left',
        opacity: 0.1,
        size: 150
      }
    },
    badge: {
      enabled: false,
      position: 'top-right',
      style: 'minimal'
    }
  },
  {
    id: 'neon-glow',
    name: 'Neon Glow',
    description: 'Glowing neon text effect for gaming and tech content',
    thumbnail: '💡',
    background: {
      type: 'solid',
      color: '#0D0D0D',
      gradient: {
        enabled: true,
        colors: ['#0D0D0D', '#1A0A2E'],
        angle: 180
      }
    },
    layout: {
      type: 'full-bleed',
      imageOpacity: 0.4,
      imageBlur: 3
    },
    text: {
      title: {
        font: 'Space Grotesk',
        size: 76,
        color: '#00FFFF',
        position: { x: 640, y: 300 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#00FFFF', width: 2 },
          shadow: { enabled: true, blur: 30, color: '#00FFFF', offsetX: 0, offsetY: 0 },
          glow: { enabled: true, color: '#00FFFF', intensity: 1.0 }
        }
      },
      subtitle: {
        font: 'Poppins',
        size: 32,
        color: '#FF00FF',
        position: { x: 640, y: 390 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 20, color: '#FF00FF', offsetX: 0, offsetY: 0 }
        }
      }
    },
    graphics: {
      watermark: {
        type: 'none',
        position: 'center',
        opacity: 0,
        size: 0
      }
    },
    badge: {
      enabled: true,
      position: 'top-right',
      style: 'futuristic'
    }
  },
  {
    id: 'minimal-clean',
    name: 'Minimal Clean',
    description: 'Clean minimalist design with lots of white space',
    thumbnail: '⬜',
    background: {
      type: 'solid',
      color: '#FFFFFF',
      gradient: {
        enabled: false
      }
    },
    layout: {
      type: 'centered',
      imageSize: 0.6
    },
    text: {
      title: {
        font: 'Jost',
        size: 64,
        color: '#1A1A1A',
        position: { x: 640, y: 580 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: false }
        }
      },
      subtitle: {
        font: 'Nunito',
        size: 28,
        color: '#666666',
        position: { x: 640, y: 640 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: false }
        }
      }
    },
    graphics: {
      watermark: {
        type: 'none',
        position: 'center',
        opacity: 0,
        size: 0
      }
    },
    badge: {
      enabled: false,
      position: 'bottom-right',
      style: 'minimal'
    }
  },
  {
    id: 'vintage-film',
    name: 'Vintage Film',
    description: 'Retro film effect with grain texture',
    thumbnail: '🎞️',
    background: {
      type: 'solid',
      color: '#2B2118',
      gradient: {
        enabled: true,
        colors: ['#2B2118', '#1A140E'],
        angle: 135
      }
    },
    layout: {
      type: 'full-bleed',
      imageOpacity: 0.75,
      imageBlur: 0
    },
    text: {
      title: {
        font: 'Libre Baskerville',
        size: 58,
        color: '#F5DEB3',
        position: { x: 640, y: 320 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 8, color: '#000000', offsetX: 3, offsetY: 3 }
        }
      },
      subtitle: {
        font: 'Lora',
        size: 28,
        color: '#D4A574',
        position: { x: 640, y: 390 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 5, color: '#000000', offsetX: 2, offsetY: 2 }
        }
      }
    },
    graphics: {
      texture: {
        type: 'film-grain',
        opacity: 0.3
      },
      watermark: {
        type: 'film-reel',
        position: 'bottom-right',
        opacity: 0.1,
        size: 150
      }
    },
    badge: {
      enabled: true,
      position: 'top-left',
      style: 'vintage-tech'
    }
  },
  {
    id: 'bold-impact',
    name: 'Bold Impact',
    description: 'Maximum impact with bold text and strong colors',
    thumbnail: '💥',
    background: {
      type: 'solid',
      color: '#FF0000',
      gradient: {
        enabled: true,
        colors: ['#FF0000', '#CC0000'],
        angle: 180
      }
    },
    layout: {
      type: 'full-bleed',
      imageOpacity: 0.5,
      imageBlur: 2
    },
    text: {
      title: {
        font: 'Archivo Black',
        size: 90,
        color: '#FFFFFF',
        position: { x: 640, y: 300 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#000000', width: 6 },
          shadow: { enabled: true, blur: 0, color: '#000000', offsetX: 6, offsetY: 6 }
        }
      },
      subtitle: {
        font: 'Barlow Condensed',
        size: 40,
        color: '#FFFF00',
        position: { x: 640, y: 400 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#000000', width: 3 },
          shadow: { enabled: false }
        }
      }
    },
    graphics: {
      watermark: {
        type: 'none',
        position: 'center',
        opacity: 0,
        size: 0
      }
    },
    badge: {
      enabled: true,
      position: 'top-right',
      style: 'futuristic'
    }
  },
  {
    id: 'gradient-fade',
    name: 'Gradient Fade',
    description: 'Elegant gradient fade for music and fashion',
    thumbnail: '🌈',
    background: {
      type: 'gradient',
      color: '#667eea',
      gradient: {
        enabled: true,
        colors: ['#667eea', '#764ba2', '#f093fb'],
        angle: 135,
        type: 'linear'
      }
    },
    layout: {
      type: 'full-bleed',
      imageOpacity: 0.6,
      imageBlur: 1
    },
    text: {
      title: {
        font: 'DM Serif Display',
        size: 68,
        color: '#FFFFFF',
        position: { x: 640, y: 300 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 20, color: '#00000080', offsetX: 0, offsetY: 4 }
        }
      },
      subtitle: {
        font: 'Poppins',
        size: 30,
        color: '#FFFFFF',
        position: { x: 640, y: 380 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 10, color: '#00000060', offsetX: 0, offsetY: 2 }
        }
      }
    },
    graphics: {
      watermark: {
        type: 'none',
        position: 'center',
        opacity: 0,
        size: 0
      }
    },
    badge: {
      enabled: false,
      position: 'bottom-right',
      style: 'minimal'
    }
  },
  {
    id: 'split-screen',
    name: 'Split Screen',
    description: 'Canvas divided in two sections for comparisons',
    thumbnail: '⚔️',
    background: {
      type: 'solid',
      color: '#1A1A1A',
      gradient: {
        enabled: false
      }
    },
    layout: {
      type: 'split-screen',
      splitRatio: 0.5
    },
    text: {
      title: {
        font: 'Bebas Neue',
        size: 72,
        color: '#FFFFFF',
        position: { x: 640, y: 360 },
        align: 'center',
        effects: {
          outline: { enabled: true, color: '#E74C3C', width: 4 },
          shadow: { enabled: true, blur: 10, color: '#000000', offsetX: 3, offsetY: 3 }
        }
      },
      subtitle: {
        font: 'Montserrat',
        size: 32,
        color: '#E74C3C',
        position: { x: 640, y: 440 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 8, color: '#000000', offsetX: 2, offsetY: 2 }
        }
      }
    },
    graphics: {
      divider: {
        type: 'diagonal',
        color: '#E74C3C',
        width: 8
      },
      watermark: {
        type: 'vs-badge',
        position: 'center',
        opacity: 0.9,
        size: 100
      }
    },
    badge: {
      enabled: false,
      position: 'top-right',
      style: 'minimal'
    }
  },
  {
    id: 'corner-badge',
    name: 'Corner Badge',
    description: 'Corner badge style for tutorials and how-to content',
    thumbnail: '📌',
    background: {
      type: 'solid',
      color: '#2C3E50',
      gradient: {
        enabled: true,
        colors: ['#2C3E50', '#1A252F'],
        angle: 180
      }
    },
    layout: {
      type: 'full-bleed',
      imageOpacity: 0.8,
      imageBlur: 0
    },
    text: {
      title: {
        font: 'Poppins',
        size: 52,
        color: '#FFFFFF',
        position: { x: 640, y: 600 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: false },
          textBackground: {
            enabled: true,
            color: '#E74C3C',
            opacity: 1.0,
            fullWidth: false,
            padding: { horizontal: 24, vertical: 12 }
          }
        }
      },
      subtitle: {
        font: 'Nunito',
        size: 26,
        color: '#BDC3C7',
        position: { x: 640, y: 665 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: true, blur: 5, color: '#000000', offsetX: 1, offsetY: 1 }
        }
      }
    },
    graphics: {
      cornerBadge: {
        enabled: true,
        text: 'TUTORIAL',
        color: '#E74C3C',
        position: 'top-left'
      },
      watermark: {
        type: 'none',
        position: 'center',
        opacity: 0,
        size: 0
      }
    },
    badge: {
      enabled: false,
      position: 'top-right',
      style: 'minimal'
    }
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    description: 'Polaroid photo effect for vlog and personal content',
    thumbnail: '📸',
    background: {
      type: 'solid',
      color: '#F5F5DC',
      gradient: {
        enabled: false
      }
    },
    layout: {
      type: 'centered-framed',
      frameColor: '#FFFFFF',
      frameWidth: 30,
      frameShadow: true
    },
    text: {
      title: {
        font: 'Merriweather',
        size: 48,
        color: '#2C3E50',
        position: { x: 640, y: 620 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: false }
        }
      },
      subtitle: {
        font: 'Nunito',
        size: 24,
        color: '#7F8C8D',
        position: { x: 640, y: 670 },
        align: 'center',
        effects: {
          outline: { enabled: false },
          shadow: { enabled: false }
        }
      }
    },
    graphics: {
      polaroidFrame: {
        enabled: true,
        borderColor: '#FFFFFF',
        shadowColor: '#00000030'
      },
      watermark: {
        type: 'none',
        position: 'center',
        opacity: 0,
        size: 0
      }
    },
    badge: {
      enabled: false,
      position: 'bottom-right',
      style: 'minimal'
    }
  }
]

export default templates

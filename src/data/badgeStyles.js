/**
 * Badge styles for "AI Generated" labels
 */

export const badgeStyles = [
  {
    id: 'futuristic',
    name: 'Futuristic',
    description: 'Circuit pattern with tech aesthetic',
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: '2px solid #a78bfa',
      borderRadius: '8px',
      padding: '8px 16px',
      fontFamily: 'Roboto Condensed',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#ffffff',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      icon: '🤖'
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple text on semi-transparent background',
    style: {
      background: 'rgba(0, 0, 0, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '4px',
      padding: '6px 12px',
      fontFamily: 'Montserrat',
      fontSize: 12,
      fontWeight: '600',
      color: '#ffffff',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      icon: null
    }
  },
  {
    id: 'vintage-tech',
    name: 'Vintage Tech',
    description: 'Retro computer aesthetic',
    style: {
      background: '#2C1810',
      border: '2px solid #D4AF37',
      borderRadius: '0px',
      padding: '8px 14px',
      fontFamily: 'Roboto Condensed',
      fontSize: 13,
      fontWeight: 'bold',
      color: '#D4AF37',
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      icon: '◼'
    }
  },
  {
    id: 'neon',
    name: 'Neon Glow',
    description: 'Glowing neon effect',
    style: {
      background: 'rgba(255, 107, 53, 0.2)',
      border: '2px solid #FF6B35',
      borderRadius: '6px',
      padding: '7px 14px',
      fontFamily: 'Oswald',
      fontSize: 14,
      fontWeight: 'bold',
      color: '#FF6B35',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      shadow: '0 0 10px #FF6B35',
      icon: '⚡'
    }
  }
]

export const badgePositions = [
  { id: 'top-right', name: 'Top Right', coords: { x: 1180, y: 20 } },
  { id: 'top-left', name: 'Top Left', coords: { x: 20, y: 20 } },
  { id: 'bottom-right', name: 'Bottom Right', coords: { x: 1080, y: 660 } },
  { id: 'bottom-left', name: 'Bottom Left', coords: { x: 20, y: 660 } }
]

export const badgeTexts = [
  'AI Generated',
  'AI Music',
  'AI Blues Rock',
  'AI Created',
  'Made with AI'
]

export default badgeStyles

/**
 * Available fonts for thumbnail text
 * All fonts are from Google Fonts and loaded in index.html
 */

export const fonts = [
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    family: 'Bebas Neue',
    category: 'display',
    description: 'Bold, impactful headers',
    preview: 'BLUES ROCK',
    bestFor: 'Titles, headers, bold statements',
    recommended: true
  },
  {
    id: 'oswald',
    name: 'Oswald',
    family: 'Oswald',
    category: 'sans-serif',
    description: 'Modern, clean and versatile',
    preview: 'MIDNIGHT HIGHWAY',
    bestFor: 'Titles, modern aesthetics',
    recommended: true
  },
  {
    id: 'playfair-display',
    name: 'Playfair Display',
    family: 'Playfair Display',
    category: 'serif',
    description: 'Elegant serif for vintage vibes',
    preview: 'Smoky Blues',
    bestFor: 'Vintage themes, elegant titles',
    recommended: false
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    family: 'Montserrat',
    category: 'sans-serif',
    description: 'Versatile sans-serif',
    preview: 'Highway to Nowhere',
    bestFor: 'Subtitles, body text, clean designs',
    recommended: true
  },
  {
    id: 'anton',
    name: 'Anton',
    family: 'Anton',
    category: 'display',
    description: 'Condensed, powerful impact',
    preview: 'ELECTRIC BLUES',
    bestFor: 'Bold titles, condensed layouts',
    recommended: false
  },
  {
    id: 'roboto-condensed',
    name: 'Roboto Condensed',
    family: 'Roboto Condensed',
    category: 'sans-serif',
    description: 'Readable, modern condensed',
    preview: 'Blues Rock Music',
    bestFor: 'Subtitles, secondary text',
    recommended: false
  },
  {
    id: 'rajdhani',
    name: 'Rajdhani',
    family: 'Rajdhani',
    category: 'sans-serif',
    description: 'Modern, geometric, cinematic',
    preview: 'REDD SIRIEN',
    bestFor: 'Cinematic titles, modern elegance',
    recommended: true
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    family: 'Cinzel',
    category: 'serif',
    description: 'Classic serif, elegant, cinematic',
    preview: 'RED-SIREN',
    bestFor: 'Movie posters, elegant titles, classic aesthetics',
    recommended: true
  },
  {
    id: 'bodoni-moda',
    name: 'Bodoni Moda',
    family: 'Bodoni Moda',
    category: 'serif',
    description: 'High fashion, luxury editorial',
    preview: 'VOGUE',
    bestFor: 'Fashion titles, luxury brands, editorial style',
    recommended: true
  },
  {
    id: 'cormorant',
    name: 'Cormorant',
    family: 'Cormorant',
    category: 'serif',
    description: 'Refined Italian/French elegance',
    preview: 'Elegance',
    bestFor: 'Sophisticated titles, refined aesthetics',
    recommended: true
  },
  {
    id: 'jost',
    name: 'Jost',
    family: 'Jost',
    category: 'sans-serif',
    description: 'Geometric clean, luxury modern',
    preview: 'MINIMAL LUXURY',
    bestFor: 'Fashion subtitles, clean modern design',
    recommended: true
  },
  {
    id: 'abril-fatface',
    name: 'Abril Fatface',
    family: 'Abril Fatface',
    category: 'display',
    description: 'Bold display, fashion editorial',
    preview: 'FASHION',
    bestFor: 'Statement titles, magazine covers, dramatic impact',
    recommended: true
  }
]

// Default font selections for different use cases
export const defaultFonts = {
  title: 'Bebas Neue',
  subtitle: 'Montserrat',
  badge: 'Roboto Condensed'
}

export default fonts

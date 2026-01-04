# Blues Rock Thumbnail Generator

A web application to create professional YouTube thumbnails for AI-generated blues rock music videos in under 5 minutes.

## Features

### ✅ Implemented (Working)

- 🖼️ **Image Upload**: Drag & drop, file upload, or paste from clipboard (Ctrl+V)
- 🎨 **5 Professional Templates**: Blues rock themed designs with gradients
- ✍️ **Text Editing**: Title and subtitle with customizable fonts and effects
- 🎯 **Interactive Canvas**: Drag and resize elements (1280x720px)
- 📥 **Export System**: Download as JPG (80-100% quality) or PNG
- 🎨 **Color Palettes**: 4 pre-configured blues rock color schemes

### 🚧 Planned (Not Yet Implemented)

- 🤖 **AI Generated Badge**: Multiple styles to mark AI content
- 🎨 **Color Picker**: Custom color selection for text
- 🔤 **Font Selector**: UI to change fonts
- 💾 **Project Management**: Save/load projects to localStorage
- ↩️ **Undo/Redo**: History stack for changes
- ⌨️ **Keyboard Shortcuts**: Speed up workflow

## Tech Stack

- **Frontend**: React 18 + Vite 6
- **Styling**: Tailwind CSS 3.4
- **Canvas**: Fabric.js 5.3
- **Fonts**: Google Fonts (Bebas Neue, Oswald, Playfair Display, Montserrat, Anton, Roboto Condensed)
- **Storage**: LocalStorage (planned)
- **Deployment**: Vercel (ready)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

1. **Start the dev server**: `npm run dev`
2. **Upload an image**: Drag & drop, click to browse, or paste (Ctrl+V)
3. **Select a template**: Choose from 5 blues rock themed designs
4. **Add text**: Enter title (auto-uppercase) and optional subtitle
5. **Customize**: Drag and resize elements on the canvas
6. **Export**: Choose format (JPG/PNG), adjust quality, and download

### Tips
- Use JPG format for smaller file sizes (recommended for YouTube)
- Quality 90% is optimal balance between size and quality
- All text uses pre-configured fonts with outline and shadow effects
- Canvas elements are fully interactive - click and drag to reposition

## Project Structure

```
src/
├── components/         # React components
│   ├── Canvas/        # Canvas-related components
│   ├── Sidebar/       # Sidebar panels
│   ├── ProjectGallery/
│   └── BrandKit/
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── data/              # Static data (templates, palettes)
├── styles/            # Global styles
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## Development Progress

### ✅ Phase 1: Core Functionality (Completed)
- [x] Project setup (Vite + React + Tailwind)
- [x] Basic UI layout (sidebar + canvas area)
- [x] Image upload functionality (drag & drop, file picker, paste)
- [x] Canvas initialization with Fabric.js 5.3
- [x] Template data structure (5 templates)
- [x] Template system implementation
- [x] Text editing system (title + subtitle)
- [x] Text effects (outline, shadow, custom fonts)
- [x] Export functionality (JPG/PNG with quality control)
- [x] Interactive canvas (drag, resize elements)

### 🚧 Phase 2: Enhanced Features (Next)
- [ ] AI Generated badge system
- [ ] Font selector UI
- [ ] Color picker for text customization
- [ ] Save/load projects (localStorage)
- [ ] Undo/Redo functionality
- [ ] Auto-save
- [ ] Project gallery view

### 📋 Phase 3: Polish & Optimization (Future)
- [ ] Keyboard shortcuts
- [ ] Performance optimization
- [ ] Batch processing
- [ ] Video frame extraction
- [ ] A/B testing preview

## License

Private (for now)

## Author

Created for AI blues rock music content creators

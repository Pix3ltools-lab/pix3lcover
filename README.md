# Pix3lCover

A professional web application to create stunning YouTube thumbnails for videos and shorts in under 5 minutes.

## Features

### ✅ Implemented (Working)

- 🖼️ **Image Upload**: Drag & drop, file upload, or paste from clipboard (Ctrl+V)
- 📐 **Dual Format Support**: 16:9 landscape (1280x720) and 9:16 portrait (720x1280) for YouTube Shorts
- 🎨 **6 Professional Templates**: Professional designs including Cinematic Box with full-width text backgrounds
- ✍️ **Text Editing**: Title and subtitle with customizable fonts, colors, and effects
- 🔤 **Font Selector**: Choose from 13 Google Fonts (including luxury fonts: EB Garamond, Bodoni Moda, Cormorant) with size controls
- 🎨 **Color Picker**: Custom color selection for title and subtitle text with preset colors
- 🎯 **Interactive Canvas**: Drag and resize elements, format-aware positioning with persistent positions
- 🤖 **AI Generated Badge**: 4 styles, transparent or custom background, smart positioning across formats
- 💾 **Project Management**: Save/load/delete projects to localStorage with metadata tracking
- 📥 **Export System**: Download as JPG (80-100% quality) or PNG with configurable settings

### 🚧 Planned (Not Yet Implemented)
- ↩️ **Undo/Redo**: History stack for changes
- 💾 **Auto-save**: Automatic project saving
- 🖼️ **Project Gallery**: Visual preview of saved projects
- ⌨️ **Keyboard Shortcuts**: Speed up workflow

## Tech Stack

- **Frontend**: React 18 + Vite 6
- **Styling**: Tailwind CSS 3.4
- **Canvas**: Fabric.js 5.3
- **Fonts**: Google Fonts (13 total: Bebas Neue, Oswald, Playfair Display, Montserrat, Anton, Roboto Condensed, Rajdhani, Cinzel, Bodoni Moda, Cormorant, Jost, Abril Fatface, EB Garamond)
- **Storage**: LocalStorage (project persistence)
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
2. **Choose format**: Select 16:9 (landscape) or 9:16 (portrait/Shorts)
3. **Upload an image**: Drag & drop, click to browse, or paste (Ctrl+V)
4. **Select a template**: Choose from 6 professional designs (including Cinematic Box)
5. **Add text**: Enter title (auto-uppercase) and optional subtitle
6. **Customize fonts**: Choose from 8 Google Fonts with size controls
7. **Customize colors**: Use color picker for custom title/subtitle colors
8. **Position elements**: Drag text and badge to desired positions (positions are saved!)
9. **Save project**: Name and save your project to localStorage
10. **Export**: Choose format (JPG/PNG), adjust quality, and download

### Tips
- Use JPG format for smaller file sizes (recommended for YouTube)
- Quality 90% is optimal balance between size and quality
- Text positions are automatically saved when you move them
- Save projects frequently to avoid losing work
- Try the Cinematic Box template for movie poster style thumbnails
- Canvas elements are fully interactive - click and drag to reposition

## Project Structure

```
src/
├── components/         # React components
│   ├── Canvas/        # Canvas-related components
│   │   └── ThumbnailCanvas.jsx  # Main Fabric.js canvas
│   └── Sidebar/       # Sidebar panels
│       ├── UploadPanel.jsx      # Image upload
│       ├── TemplateSelector.jsx # Template selection
│       ├── FontSelector.jsx     # Font customization
│       ├── TextColorPicker.jsx  # Text color picker
│       ├── BadgeEditor.jsx      # AI badge editor
│       ├── ProjectManager.jsx   # Save/load projects
│       └── ExportPanel.jsx      # Export settings
├── utils/             # Utility functions
│   ├── exportUtils.js # Export canvas to image
│   └── storageUtils.js# localStorage management
├── data/              # Static data
│   ├── templates.js   # 6 thumbnail templates
│   ├── fonts.js       # 13 Google Fonts (luxury/fashion collection)
│   └── badgeStyles.js # Badge style definitions
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

### ✅ Phase 2: Enhanced Features (Completed)
- [x] AI Generated badge system (4 styles, customizable, draggable)
- [x] Font selector UI (8 fonts including Rajdhani and Cinzel, size controls)
- [x] Dual format support (16:9 landscape + 9:16 portrait)
- [x] Badge background customization (transparent or custom color)
- [x] Color picker for text customization (title and subtitle with presets)
- [x] Save/load projects (localStorage with metadata)
- [x] Text position persistence (positions saved and restored)
- [x] Cinematic Box template (full-width text background)
- [x] Project Manager UI (save, load, delete, new project)

### 🚧 Phase 3: Advanced Features (Planned)
- [ ] Undo/Redo functionality
- [ ] Auto-save
- [ ] Project gallery view with thumbnails
- [ ] Keyboard shortcuts
- [ ] Performance optimization

### 📋 Phase 4: Future Enhancements
- [ ] Batch processing
- [ ] Video frame extraction
- [ ] A/B testing preview
- [ ] Template customization editor
- [ ] Export presets

## License

Private (for now)

## Author

Part of the Pix3lTools suite - Professional tools for content creators

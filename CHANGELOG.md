# Changelog

All notable changes to Pix3lCover will be documented in this file.

## [1.1.1] - 2026-01-29

### Added
- **Image Compression**: Automatic image compression on upload using browser-image-compression (max 500KB, JPEG conversion)
- **Storage Indicator**: Visual progress bar in sidebar showing localStorage usage with color-coded warnings (green/amber/red)
- **Export/Import JSON**: Backup and restore all projects as JSON files
  - Export downloads all projects as `pix3lcover-backup-YYYY-MM-DD.json`
  - Import supports merge (add new, skip duplicates) and replace modes
- **Undo/Redo**: History stack for editing actions
  - Ctrl+Z to undo, Ctrl+Shift+Z or Ctrl+Y to redo
  - Visual buttons in header with disabled state indicators
  - Debounced state tracking (500ms) to avoid excessive history entries
- **Duplicate Project**: One-click project duplication in gallery view
  - Creates copy with "(Copy)" suffix in name
  - Available in both grid and list views
- **Error Boundaries**: React error boundary wrapping the app
  - Graceful error display instead of white screen
  - "Try Again" and "Reload App" recovery options

### Changed
- Sidebar now displays storage usage at the bottom with project count
- Upload panel shows compression progress spinner during image processing
- Header now includes undo/redo buttons next to auto-save indicator

## [1.1.0] - 2026-01-28

### Added
- **Video Frame Extraction**: Upload video files (MP4, WebM, MOV, OGG, M4V, AVI) and extract any frame as thumbnail background
- Mini video player with timeline slider for precise frame selection
- "Use This Frame" button to extract and use selected frame

## [1.0.0] - 2026-01-28

### Added
- **14 Professional Templates**: Classic Blues, Gritty Guitar, Electric Neon, Vintage Vinyl, Smoky Stage, Cinematic Box, Neon Glow, Minimal Clean, Vintage Film, Bold Impact, Gradient Fade, Split Screen, Corner Badge, Polaroid
- **23 Google Fonts**: Including luxury fonts (EB Garamond, Bodoni Moda, DM Serif Display) and modern fonts (Poppins, Space Grotesk, Archivo Black)
- **Dual Format Support**: 16:9 landscape (1920x1080) and 9:16 portrait (1080x1920) for YouTube Shorts
- **Full HD Export**: Export thumbnails at 1920x1080 or 1080x1920 resolution
- **Project Gallery**: Visual gallery with thumbnails, grid/list view, search, and format filters
- **Auto-save**: Automatic project saving every 30 seconds with restore on load
- **Storage Warning**: Dismissible banner about localStorage limitations
- **Image Upload**: Drag & drop, file upload, or paste from clipboard (Ctrl+V)
- **Text Editing**: Title and subtitle with customizable fonts, colors, and effects
- **Color Picker**: Custom color selection for title and subtitle text
- **Interactive Canvas**: Drag and resize elements with persistent positions
- **AI Generated Badge**: 4 styles with transparent or custom background
- **Pix3lTools Branding**: Footer links to website and X profile

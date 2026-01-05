# Contributing to Pix3lCover

Thank you for your interest in contributing to Pix3lCover! This document provides guidelines and instructions for contributing.

## Code of Conduct

Be respectful, inclusive, and constructive in all interactions. We're building tools to help content creators succeed.

## How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the issue template** with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser and OS version

### Suggesting Features

1. **Open an issue** with the `enhancement` label
2. **Describe the feature** and its use case
3. **Explain why** it would benefit users
4. **Consider alternatives** you've thought about

### Submitting Pull Requests

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes** following our code style
4. **Test thoroughly** - ensure everything works
5. **Commit with clear messages**: Use conventional commits (feat:, fix:, docs:, etc.)
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Open a Pull Request** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots/videos if UI changes

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Pix3ltools-lab/pix3lcover.git
cd pix3lcover

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
npm run preview
```

## Code Style Guidelines

### JavaScript/React

- Use **functional components** with hooks
- Follow **React best practices**
- Use **descriptive variable names**
- Add **comments** for complex logic
- Keep components **focused and small**

### File Organization

```
src/
├── components/     # React components
│   ├── Canvas/    # Canvas-related
│   └── Sidebar/   # Sidebar panels
├── utils/         # Utility functions
├── data/          # Static data (templates, fonts)
└── styles/        # Global styles
```

### Naming Conventions

- **Components**: PascalCase (`TemplateSelector.jsx`)
- **Files**: camelCase for utils (`exportUtils.js`)
- **Variables**: camelCase (`selectedTemplate`)
- **Constants**: UPPER_CASE (`MAX_FILE_SIZE`)

### Git Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Example:
```
feat: Add gradient background editor
fix: Resolve text positioning bug in portrait mode
docs: Update README with new font options
```

## Project Architecture

### Key Technologies

- **React 18**: UI framework
- **Vite 6**: Build tool
- **Tailwind CSS 3.4**: Styling
- **Fabric.js 5.3**: Canvas manipulation
- **Google Fonts**: Typography

### State Management

- Component-level state with `useState`
- Ref-based canvas management
- LocalStorage for persistence

### Key Files

- `App.jsx`: Main application component
- `ThumbnailCanvas.jsx`: Canvas rendering and interaction
- `templates.js`: Template definitions
- `fonts.js`: Font configurations
- `exportUtils.js`: Export functionality
- `storageUtils.js`: LocalStorage management

## Testing

Before submitting a PR, test:

1. **All formats**: Both 16:9 and 9:16
2. **All templates**: Ensure they render correctly
3. **Image upload**: Drag & drop, file picker, paste
4. **Text editing**: Title, subtitle, fonts, colors
5. **Badge system**: All styles and positions
6. **Export**: JPG and PNG formats
7. **Save/Load**: Project persistence
8. **Cross-browser**: Chrome, Firefox, Safari, Edge

## Feature Priorities

### High Priority
- Undo/Redo functionality
- Auto-save
- Keyboard shortcuts
- Performance optimization

### Medium Priority
- Project gallery view
- Batch processing
- Template customization editor

### Future
- Video frame extraction
- A/B testing preview
- Export presets

## Questions?

- Open an issue with the `question` label
- Check existing discussions
- Review the README.md

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Pix3lCover!** 🎨

Part of the [Pix3lTools](https://github.com/Pix3ltools-lab) suite.

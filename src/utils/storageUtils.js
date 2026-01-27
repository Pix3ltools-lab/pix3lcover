/**
 * LocalStorage utility functions for saving and loading projects
 */

const STORAGE_KEY = 'mvtg_projects' // Music Video Thumbnail Generator
const AUTOSAVE_KEY = 'pix3lcover_autosave'

/**
 * Get all saved projects from localStorage
 */
export const getAllProjects = () => {
  try {
    const projectsJson = localStorage.getItem(STORAGE_KEY)
    return projectsJson ? JSON.parse(projectsJson) : []
  } catch (error) {
    console.error('Error loading projects:', error)
    return []
  }
}

/**
 * Save a project to localStorage
 */
export const saveProject = (project) => {
  try {
    const projects = getAllProjects()

    // Check if project with same id exists (update) or create new
    const existingIndex = projects.findIndex(p => p.id === project.id)

    if (existingIndex >= 0) {
      // Update existing project
      projects[existingIndex] = {
        ...project,
        updatedAt: new Date().toISOString()
      }
    } else {
      // Add new project
      projects.push({
        ...project,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
    return true
  } catch (error) {
    console.error('Error saving project:', error)
    return false
  }
}

/**
 * Load a project by ID
 */
export const loadProject = (projectId) => {
  try {
    const projects = getAllProjects()
    return projects.find(p => p.id === projectId)
  } catch (error) {
    console.error('Error loading project:', error)
    return null
  }
}

/**
 * Delete a project by ID
 */
export const deleteProject = (projectId) => {
  try {
    const projects = getAllProjects()
    const filtered = projects.filter(p => p.id !== projectId)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
    return true
  } catch (error) {
    console.error('Error deleting project:', error)
    return false
  }
}

/**
 * Generate a unique project ID
 */
export const generateProjectId = () => {
  return `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Create a project object from current state
 * Note: We save only the template ID, not the entire template object
 */
export const createProjectFromState = (state, projectName, thumbnail = null) => {
  return {
    id: state.id || generateProjectId(),
    name: projectName || `Project ${new Date().toLocaleDateString()}`,
    format: state.format,
    uploadedImage: state.uploadedImage,
    templateId: state.selectedTemplate?.id || 'classic-blues', // Save only template ID
    titleText: state.titleText,
    subtitleText: state.subtitleText,
    fontConfig: state.fontConfig,
    textColors: state.textColors,
    textPositions: state.textPositions,
    badgeConfig: state.badgeConfig,
    thumbnail: thumbnail
  }
}

/**
 * Generate a thumbnail from canvas
 * Returns a small base64 image for gallery preview
 */
export const generateThumbnail = (canvas, format = '16:9') => {
  if (!canvas) return null

  try {
    // Thumbnail dimensions (small for storage efficiency)
    const thumbWidth = format === '16:9' ? 160 : 90
    const thumbHeight = format === '16:9' ? 90 : 160

    // Get canvas data URL at reduced size
    const dataURL = canvas.toDataURL({
      format: 'jpeg',
      quality: 0.6,
      multiplier: thumbWidth / canvas.getWidth()
    })

    return dataURL
  } catch (error) {
    console.error('Error generating thumbnail:', error)
    return null
  }
}

/**
 * Get storage usage info
 */
export const getStorageInfo = () => {
  try {
    const projects = getAllProjects()
    const storageJson = localStorage.getItem(STORAGE_KEY)
    const sizeInBytes = storageJson ? new Blob([storageJson]).size : 0
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)

    return {
      projectCount: projects.length,
      sizeInKB,
      sizeInBytes
    }
  } catch (error) {
    console.error('Error getting storage info:', error)
    return {
      projectCount: 0,
      sizeInKB: '0',
      sizeInBytes: 0
    }
  }
}

/**
 * Save auto-save data to localStorage
 */
export const saveAutoSave = (state) => {
  try {
    const autoSaveData = {
      ...state,
      templateId: state.selectedTemplate?.id,
      savedAt: new Date().toISOString()
    }
    // Remove the full template object, keep only ID
    delete autoSaveData.selectedTemplate
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(autoSaveData))
    return true
  } catch (error) {
    console.error('Error auto-saving:', error)
    return false
  }
}

/**
 * Load auto-save data from localStorage
 */
export const loadAutoSave = () => {
  try {
    const autoSaveJson = localStorage.getItem(AUTOSAVE_KEY)
    return autoSaveJson ? JSON.parse(autoSaveJson) : null
  } catch (error) {
    console.error('Error loading auto-save:', error)
    return null
  }
}

/**
 * Clear auto-save data
 */
export const clearAutoSave = () => {
  try {
    localStorage.removeItem(AUTOSAVE_KEY)
    return true
  } catch (error) {
    console.error('Error clearing auto-save:', error)
    return false
  }
}

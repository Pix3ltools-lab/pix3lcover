import { useState, useEffect } from 'react'
import { getAllProjects, deleteProject, getStorageInfo } from '../../utils/storageUtils'

function ProjectManager({ currentProjectId, onSave, onLoad, onNew }) {
  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState('')
  const [showProjects, setShowProjects] = useState(false)
  const [storageInfo, setStorageInfo] = useState({ projectCount: 0, sizeInKB: '0' })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    const savedProjects = getAllProjects()
    setProjects(savedProjects)
    setStorageInfo(getStorageInfo())
  }

  const handleSave = () => {
    const name = projectName.trim() || `Project ${new Date().toLocaleString()}`
    onSave(name)
    setProjectName('')
    loadProjects()
  }

  const handleLoad = (project) => {
    onLoad(project)
    setShowProjects(false)
  }

  const handleDelete = (projectId) => {
    if (confirm('Delete this project?')) {
      deleteProject(projectId)
      loadProjects()
    }
  }

  const handleNew = () => {
    if (confirm('Create new project? Unsaved changes will be lost.')) {
      onNew()
      setShowProjects(false)
    }
  }

  return (
    <section>
      <h2 className="text-lg font-semibold mb-3 text-[#E67E22]">
        Projects
      </h2>

      <div className="space-y-3">
        {/* Save Current Project */}
        <div>
          <label className="block text-sm mb-1 text-gray-400">
            Project Name
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Thumbnail"
              className="flex-1 min-w-0 bg-gray-700 px-3 py-2 rounded text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
            />
            <button
              onClick={handleSave}
              className="px-3 py-2 bg-[#E67E22] text-white rounded text-sm font-medium hover:bg-[#d35400] transition-colors whitespace-nowrap flex-shrink-0"
            >
              Save
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="px-3 py-2 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            {showProjects ? 'Hide' : 'Load'} ({projects.length})
          </button>
          <button
            onClick={handleNew}
            className="px-3 py-2 bg-gray-700 text-white rounded text-sm hover:bg-gray-600 transition-colors"
          >
            New Project
          </button>
        </div>

        {/* Projects List */}
        {showProjects && (
          <div className="border border-gray-700 rounded p-2 max-h-64 overflow-y-auto">
            {projects.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                No saved projects
              </p>
            ) : (
              <div className="space-y-2">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-2 rounded transition-colors ${
                      project.id === currentProjectId
                        ? 'bg-[#E67E22] bg-opacity-20 border border-[#E67E22]'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {project.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(project.updatedAt || project.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-gray-500">
                          {project.format} • {project.selectedTemplate?.name || 'No template'}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleLoad(project)}
                          className="px-2 py-1 bg-gray-600 text-white rounded text-xs hover:bg-gray-500 transition-colors"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-500 transition-colors"
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Storage Info */}
        <div className="text-xs text-gray-500 border-t border-gray-700 pt-2">
          <p>💾 {storageInfo.projectCount} projects • {storageInfo.sizeInKB} KB used</p>
        </div>
      </div>
    </section>
  )
}

export default ProjectManager

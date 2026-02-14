import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, FileText, Presentation, Play, ExternalLink } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function ProjectModal() {
  const selectedProject = useStore((state) => state.selectedProject)
  const setSelectedProject = useStore((state) => state.setSelectedProject)
  
  if (!selectedProject) return null
  
  const project = selectedProject
  
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Modal */}
          <motion.div
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between p-6 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
              <div>
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
                <p className="text-gray-400 mt-1">{project.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Overview</h3>
                <p className="text-gray-300">{project.overview}</p>
              </div>
              
              {/* Problem */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Problem</h3>
                <p className="text-gray-300">{project.problem}</p>
              </div>
              
              {/* Dataset */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Dataset</h3>
                <p className="text-gray-300">{project.dataset}</p>
              </div>
              
              {/* Approach */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Approach</h3>
                <p className="text-gray-300">{project.approach}</p>
              </div>
              
              {/* Results */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Results & Impact</h3>
                <div className="flex items-center gap-4 mb-3">
                  <div className="px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <span className="text-xl font-bold text-cyan-400">{project.highlightMetric}</span>
                  </div>
                </div>
                <p className="text-gray-300">{project.results}</p>
                {project.impact && (
                  <p className="text-gray-400 mt-2 italic">{project.impact}</p>
                )}
              </div>
              
              {/* Tech Stack */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-2">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-800 text-gray-200 border border-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Demo placeholder */}
              {project.demoType === 'live' && (
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-2">Demo</h3>
                  <div className="aspect-video rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <Play size={48} className="mx-auto text-gray-600 mb-2" />
                      <p className="text-gray-500">Live demo available</p>
                      {project.links.demo && (
                        <a
                          href={project.links.demo}
                          className="inline-block mt-3 px-4 py-2 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
                        >
                          Launch Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Artifacts / Links */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Artifacts</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Github size={20} />
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                  )}
                  {project.links.notebook && (
                    <a
                      href={project.links.notebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <FileText size={20} />
                      <span className="text-sm font-medium">Notebook</span>
                    </a>
                  )}
                  {project.links.slides && (
                    <a
                      href={project.links.slides}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                    >
                      <Presentation size={20} />
                      <span className="text-sm font-medium">Slides</span>
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      className="flex items-center gap-2 p-3 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                    >
                      <Play size={20} />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

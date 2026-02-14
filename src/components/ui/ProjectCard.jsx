import { motion } from 'framer-motion'
import { ExternalLink, Github, FileText, Play } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function ProjectCard({ project, index }) {
  const setSelectedProject = useStore((state) => state.setSelectedProject)
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Hologram effect border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500" />
      
      <div 
        className="relative p-6 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer"
        onClick={() => setSelectedProject(project)}
      >
        {/* Featured badge */}
        {project.featured && (
          <div className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 text-white">
            Featured
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{project.subtitle}</p>
          </div>
          
          {/* Highlight metric */}
          <div className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-sm font-bold text-cyan-400">{project.highlightMetric}</span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-2">
          {project.shortDescription}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-400">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label="View on GitHub"
            >
              <Github size={18} />
            </a>
          )}
          {project.links.notebook && (
            <a
              href={project.links.notebook}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label="View notebook"
            >
              <FileText size={18} />
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
              onClick={(e) => e.stopPropagation()}
              aria-label="View demo"
            >
              <Play size={18} />
            </a>
          )}
          
          <button
            className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            onClick={() => setSelectedProject(project)}
          >
            View Details
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

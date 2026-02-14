import { motion } from 'framer-motion'
import { BookOpen, FileText, ExternalLink, Github } from 'lucide-react'
import { PUBLICATIONS, CONFIG } from '../../data/config'

export default function PublicationsSection() {
  return (
    <section id="publications" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30 mb-4">
            <BookOpen size={18} />
            <span className="text-sm font-medium">Publications & Writing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Notebooks & Reproducible Analyses
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Research notebooks, technical write-ups, and reproducible code.
          </p>
        </motion.div>
        
        {/* Publications grid */}
        <div className="grid gap-4">
          {PUBLICATIONS.map((pub, index) => (
            <PublicationCard key={index} publication={pub} index={index} />
          ))}
          
          {/* GitHub link if no publications */}
          {PUBLICATIONS.length === 0 && (
            <motion.a
              href={CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 rounded-2xl bg-gray-900/60 border border-gray-700/50 hover:border-gray-600 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center">
                  <Github size={24} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">View All Notebooks on GitHub</h3>
                  <p className="text-gray-400 text-sm">Browse reproducible analyses and code</p>
                </div>
                <ExternalLink size={20} className="text-gray-400" />
              </div>
            </motion.a>
          )}
        </div>
        
        {/* Additional GitHub link */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <a
            href={CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <Github size={18} />
            <span>View more on GitHub</span>
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function PublicationCard({ publication, index }) {
  const getIcon = (type) => {
    switch (type) {
      case 'paper': return BookOpen
      case 'notebook': return FileText
      default: return FileText
    }
  }
  
  const Icon = getIcon(publication.type)
  
  return (
    <motion.a
      href={publication.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-6 rounded-2xl bg-gray-900/60 border border-gray-700/50 hover:border-orange-500/50 transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center flex-shrink-0">
          <Icon size={24} className="text-orange-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
            {publication.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{publication.description}</p>
          <span className="inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-400 capitalize">
            {publication.type}
          </span>
        </div>
        <ExternalLink size={18} className="text-gray-500 group-hover:text-orange-400 transition-colors flex-shrink-0" />
      </div>
    </motion.a>
  )
}

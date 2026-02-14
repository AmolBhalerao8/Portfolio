import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import { PROJECTS } from '../../data/config'
import ProjectCard from '../ui/ProjectCard'

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 mb-4">
            <Rocket size={18} />
            <span className="text-sm font-medium">Projects Wall</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Curated Applied Projects
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            End-to-end machine learning projects with code, papers, and reproducible notebooks.
          </p>
        </motion.div>
        
        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

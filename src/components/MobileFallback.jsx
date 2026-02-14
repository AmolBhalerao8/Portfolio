import { motion } from 'framer-motion'
import { Download, Play, ExternalLink, Github, Linkedin, Mail } from 'lucide-react'
import { CONFIG, PROJECTS, STATIONS } from '../data/config'
import ProjectCard from './ui/ProjectCard'

export default function MobileFallback() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-purple-500/5" />
        
        {/* Animated background circles */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
        
        <div className="relative text-center max-w-lg mx-auto">
          {/* Tagline badge */}
          <motion.div
            className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {CONFIG.tagline}
          </motion.div>
          
          {/* Headline */}
          <motion.h1
            className="text-3xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {CONFIG.heroHeadline.replace('{{NAME}}', CONFIG.name)}
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            className="text-lg text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {CONFIG.heroSubheadline}
          </motion.p>
          
          {/* CTAs */}
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <a
              href="#projects"
              className="w-full py-3 rounded-full font-semibold bg-cyan-500 text-black flex items-center justify-center gap-2"
            >
              <Play size={18} />
              Explore Projects
            </a>
            <a
              href={CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-full font-semibold bg-white/5 text-white border border-white/20 flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Download Résumé
            </a>
          </motion.div>
        </div>
      </section>
      
      {/* Stations Preview */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Explore the Lab</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.values(STATIONS).map((station, index) => (
            <motion.div
              key={station.id}
              className="p-4 rounded-xl text-center"
              style={{
                background: `${station.color}10`,
                border: `1px solid ${station.color}30`,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-3xl mb-2">{station.icon}</div>
              <h3 className="font-semibold text-white text-sm">{station.shortName}</h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-2">{station.tagline}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Projects */}
      <section id="projects" className="px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-8">Featured Projects</h2>
        <div className="space-y-4">
          {PROJECTS.filter(p => p.featured).map((project, index) => (
            <MobileProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </section>
      
      {/* About */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-6">About</h2>
        <div className="p-6 rounded-2xl bg-gray-900/60 border border-gray-700/50">
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            {CONFIG.aboutParagraph.replace(/\{\{NAME\}\}/g, CONFIG.name)}
          </p>
          <div className="flex flex-wrap gap-2">
            {CONFIG.aboutHighlights.slice(0, 3).map((highlight, i) => (
              <span key={i} className="px-2 py-1 rounded-lg text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact */}
      <section className="px-6 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Get in Touch</h2>
        <div className="flex justify-center gap-4">
          <a
            href={`mailto:${CONFIG.email}`}
            className="p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 text-gray-400 hover:text-cyan-400"
          >
            <Mail size={24} />
          </a>
          {CONFIG.githubUrl && (
            <a
              href={CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 text-gray-400 hover:text-white"
            >
              <Github size={24} />
            </a>
          )}
          {CONFIG.linkedinUrl && (
            <a
              href={CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 text-gray-400 hover:text-white"
            >
              <Linkedin size={24} />
            </a>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="px-6 py-8 border-t border-gray-800 text-center">
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} {CONFIG.name}
        </p>
        <p className="text-gray-600 text-xs mt-2">
          View on desktop for full 3D experience
        </p>
      </footer>
    </div>
  )
}

function MobileProjectCard({ project, index }) {
  return (
    <motion.div
      className="p-4 rounded-xl bg-gray-900/60 border border-gray-700/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white">{project.title}</h3>
        <span className="px-2 py-1 rounded-lg text-xs font-bold bg-cyan-500/10 text-cyan-400">
          {project.highlightMetric}
        </span>
      </div>
      <p className="text-sm text-gray-400 mb-3">{project.shortDescription}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="px-2 py-0.5 rounded text-xs bg-gray-800 text-gray-400">
            {tag}
          </span>
        ))}
      </div>
      {project.links.github && (
        <a
          href={project.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-cyan-400"
        >
          <Github size={14} />
          View Code
          <ExternalLink size={12} />
        </a>
      )}
    </motion.div>
  )
}

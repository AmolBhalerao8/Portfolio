import { motion } from 'framer-motion'
import { ArrowDown, Play, Download } from 'lucide-react'
import { CONFIG } from '../../data/config'
import { useStore } from '../../store/useStore'

export default function HeroOverlay() {
  const setActiveSection = useStore((state) => state.setActiveSection)
  
  const scrollToProjects = () => {
    setActiveSection('projects')
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Center content - Holographic Card */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="pointer-events-auto max-w-2xl mx-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Holographic Card */}
          <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-cyan-500/20 shadow-2xl">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-xl -z-10" />
            
            {/* Tagline badge */}
            <motion.div
              className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {CONFIG.tagline}
            </motion.div>
            
            {/* Main headline */}
            <motion.h1
              className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {CONFIG.heroHeadline.replace('{{NAME}}', CONFIG.name)}
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p
              className="text-lg md:text-xl text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {CONFIG.heroSubheadline}
            </motion.p>
            
            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <button
                onClick={scrollToProjects}
                className="group px-6 py-3 rounded-full font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                <Play size={18} className="group-hover:scale-110 transition-transform" />
                Explore Demos
              </button>
              
              <a
                href={CONFIG.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-3 rounded-full font-semibold bg-white/5 text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={18} className="group-hover:scale-110 transition-transform" />
                Download Résumé
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <motion.button
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
      
      {/* Station hints */}
      <div className="absolute bottom-8 left-8 hidden lg:block pointer-events-auto">
        <motion.div
          className="text-sm text-gray-500"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <p className="mb-1">💡 Click on stations to explore</p>
          <p>🖱️ Drag to rotate the scene</p>
        </motion.div>
      </div>
    </div>
  )
}

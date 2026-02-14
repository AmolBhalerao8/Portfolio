import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Download, Github, Linkedin, Mail } from 'lucide-react'
import { CONFIG, NAV_ITEMS } from '../../data/config'
import { useStore } from '../../store/useStore'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const activeSection = useStore((state) => state.activeSection)
  const setActiveSection = useStore((state) => state.setActiveSection)
  
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo / Name */}
          <motion.a
            href="#"
            className="text-xl font-bold text-white hover:text-cyan-400 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {CONFIG.name}
          </motion.a>
          
          {/* Desktop Menu */}
          <motion.div
            className="hidden md:flex items-center gap-1"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {NAV_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* Resume Button */}
            <a
              href={CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 rounded-full text-sm font-medium bg-cyan-500 text-black hover:bg-cyan-400 transition-all duration-300 flex items-center gap-2"
            >
              <Download size={16} />
              Resume
            </a>
          </motion.div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              className="absolute top-20 left-4 right-4 bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-gray-700 p-6"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`px-4 py-3 rounded-xl text-left font-medium transition-all ${
                      activeSection === item.id
                        ? 'bg-cyan-500/20 text-cyan-400'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                <hr className="border-gray-700 my-2" />
                
                <a
                  href={CONFIG.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 rounded-xl font-medium bg-cyan-500 text-black text-center flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download Resume
                </a>
                
                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-4">
                  <a href={CONFIG.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white">
                    <Github size={20} />
                  </a>
                  <a href={CONFIG.linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white">
                    <Linkedin size={20} />
                  </a>
                  <a href={`mailto:${CONFIG.email}`} className="p-2 text-gray-400 hover:text-white">
                    <Mail size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

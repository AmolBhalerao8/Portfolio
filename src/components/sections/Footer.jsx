import { motion } from 'framer-motion'
import { Heart, Github, Linkedin, Mail, Shield } from 'lucide-react'
import { CONFIG } from '../../data/config'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="relative py-12 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{CONFIG.name}</h3>
            <p className="text-gray-400 text-sm">{CONFIG.tagline}</p>
          </div>
          
          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Quick Links</h4>
            <div className="flex flex-wrap gap-4">
              <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">About</a>
              <a href="#projects" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Projects</a>
              <a href="#demos" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Demos</a>
              <a href="#contact" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Contact</a>
            </div>
          </div>
          
          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3">Connect</h4>
            <div className="flex gap-3">
              {CONFIG.githubUrl && (
                <a
                  href={CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
              )}
              {CONFIG.linkedinUrl && (
                <a
                  href={CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              <a
                href={`mailto:${CONFIG.email}`}
                className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Privacy & Accessibility */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm flex items-center gap-1">
              © {currentYear} {CONFIG.name}. Built with <Heart size={14} className="text-red-400" /> using React & Three.js
            </p>
            
            {/* Privacy statement */}
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Shield size={14} />
              <span>Privacy-first: Webcam data stays local. No tracking cookies.</span>
            </div>
          </div>
          
          {/* Accessibility statement */}
          <p className="text-center text-gray-600 text-xs mt-4">
            This site is designed with accessibility in mind. Keyboard navigation and screen reader support available.
          </p>
        </div>
      </div>
    </footer>
  )
}

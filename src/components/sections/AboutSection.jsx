import { motion } from 'framer-motion'
import { User, Download, CheckCircle, Award } from 'lucide-react'
import { CONFIG } from '../../data/config'

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 mb-4">
            <User size={18} />
            <span className="text-sm font-medium">About Me</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Background & Expertise
          </h2>
        </motion.div>
        
        {/* Content */}
        <motion.div
          className="relative p-8 rounded-2xl bg-gray-900/60 backdrop-blur-sm border border-gray-700/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10" />
          
          {/* About paragraph */}
          <p className="text-lg text-gray-300 leading-relaxed mb-8">
            {CONFIG.aboutParagraph.replace(/\{\{NAME\}\}/g, CONFIG.name)}
          </p>
          
          {/* Highlights */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {CONFIG.aboutHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              >
                <CheckCircle size={18} className="text-cyan-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{highlight}</span>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href={CONFIG.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition-all duration-300"
            >
              <Download size={18} />
              Download Resume
            </a>
            <a
              href={`mailto:${CONFIG.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-white/5 text-white border border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Github, Linkedin, MapPin, CheckCircle } from 'lucide-react'
import { CONFIG } from '../../data/config'

export default function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // In production, this would send to a backend
    // For now, open mailto
    const subject = encodeURIComponent(`Portfolio Contact from ${formState.name}`)
    const body = encodeURIComponent(`From: ${formState.name} (${formState.email})\n\n${formState.message}`)
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }
  
  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30 mb-4">
            <Mail size={18} />
            <span className="text-sm font-medium">Contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Connect
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Interested in collaboration, have questions, or just want to say hi? I'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Email */}
            <a
              href={`mailto:${CONFIG.email}`}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 hover:border-cyan-500/50 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <Mail size={24} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white group-hover:text-cyan-400 transition-colors">{CONFIG.email}</p>
              </div>
            </a>
            
            {/* Location */}
            {CONFIG.location && (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-900/60 border border-gray-700/50">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                  <MapPin size={24} className="text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">{CONFIG.location}</p>
                </div>
              </div>
            )}
            
            {/* Social links */}
            <div className="flex gap-4">
              {CONFIG.githubUrl && (
                <a
                  href={CONFIG.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 hover:border-gray-600 transition-all text-gray-400 hover:text-white"
                >
                  <Github size={20} />
                  <span className="font-medium">GitHub</span>
                </a>
              )}
              {CONFIG.linkedinUrl && (
                <a
                  href={CONFIG.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-4 rounded-xl bg-gray-900/60 border border-gray-700/50 hover:border-gray-600 transition-all text-gray-400 hover:text-white"
                >
                  <Linkedin size={20} />
                  <span className="font-medium">LinkedIn</span>
                </a>
              )}
            </div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center p-8 rounded-2xl bg-gray-900/60 border border-green-500/30">
                <div className="text-center">
                  <CheckCircle size={48} className="mx-auto text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Message Ready!</h3>
                  <p className="text-gray-400">Your email client should open with the message.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-gray-900/60 border border-gray-700/50 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

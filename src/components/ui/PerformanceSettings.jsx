import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Monitor, Gauge, X } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function PerformanceSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const performanceMode = useStore((state) => state.performanceMode)
  const setPerformanceMode = useStore((state) => state.setPerformanceMode)
  
  const modes = [
    { id: 'high', label: 'High', description: 'Full 3D effects, particles, shadows', icon: '✨' },
    { id: 'medium', label: 'Medium', description: 'Reduced particles, no shadows', icon: '⚡' },
    { id: 'low', label: 'Low', description: 'Minimal 3D, optimized for performance', icon: '🔋' },
  ]
  
  const handleModeChange = (mode) => {
    setPerformanceMode(mode)
    localStorage.setItem('performanceMode', mode)
  }
  
  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 p-3 rounded-full bg-gray-900/80 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
        aria-label="Performance settings"
      >
        <Settings size={20} />
      </button>
      
      {/* Settings panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              className="relative w-full max-w-sm bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <Gauge size={20} className="text-cyan-400" />
                  <h3 className="font-semibold text-white">Graphics Settings</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Options */}
              <div className="p-4 space-y-2">
                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => handleModeChange(mode.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      performanceMode === mode.id
                        ? 'bg-cyan-500/20 border-2 border-cyan-500'
                        : 'bg-gray-800/50 border-2 border-transparent hover:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{mode.icon}</span>
                      <div>
                        <p className={`font-medium ${performanceMode === mode.id ? 'text-cyan-400' : 'text-white'}`}>
                          {mode.label}
                        </p>
                        <p className="text-sm text-gray-400">{mode.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              {/* Info */}
              <div className="p-4 bg-gray-800/50 border-t border-gray-800">
                <p className="text-xs text-gray-500 text-center">
                  Settings are saved locally. Choose "Low" if you experience lag.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

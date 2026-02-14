import { motion, AnimatePresence } from 'framer-motion'
import { X, MousePointer, Move, Zap } from 'lucide-react'
import { useStore } from '../../store/useStore'

export default function WelcomeGuide() {
  const showGuide = useStore((state) => state.showGuide)
  const setShowGuide = useStore((state) => state.setShowGuide)
  
  const handleDismiss = () => {
    setShowGuide(false)
    localStorage.setItem('guideShown', 'true')
  }
  
  return (
    <AnimatePresence>
      {showGuide && (
        <motion.div
          className="fixed bottom-20 left-4 z-40 max-w-xs"
          initial={{ opacity: 0, x: -20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <div className="relative p-4 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              aria-label="Dismiss guide"
            >
              <X size={16} />
            </button>
            
            <h4 className="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
              <Zap size={16} />
              Quick Controls
            </h4>
            
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <MousePointer size={14} className="text-gray-500" />
                <span>Click stations to explore</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Move size={14} className="text-gray-500" />
                <span>Drag to rotate the scene</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="text-gray-500 text-xs">🖱️</span>
                <span>Scroll to zoom in/out</span>
              </li>
            </ul>
            
            <button
              onClick={handleDismiss}
              className="mt-3 w-full py-2 rounded-lg text-xs font-medium bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
            >
              Got it!
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

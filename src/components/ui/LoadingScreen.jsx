import { motion } from 'framer-motion'
import { CONFIG } from '../../data/config'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Animated logo/spinner */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center"
          animate={{
            rotate: [0, 180, 360],
            borderRadius: ['20%', '50%', '20%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="w-12 h-12 rounded-xl bg-gray-950"
            animate={{
              rotate: [0, -180, -360],
              borderRadius: ['20%', '50%', '20%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
        
        {/* Text */}
        <motion.h2
          className="text-xl font-bold text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {CONFIG.name}
        </motion.h2>
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading AI Research Lab...
        </motion.p>
        
        {/* Progress bar */}
        <motion.div
          className="mt-6 w-48 h-1 mx-auto bg-gray-800 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

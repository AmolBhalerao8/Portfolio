import { motion } from 'framer-motion'
import { Play, Eye, Brain, BarChart3, Camera, AlertTriangle } from 'lucide-react'
import { STATIONS } from '../../data/config'

const DEMOS = [
  {
    id: 'cv-demo',
    title: 'Real-time Object Detection',
    description: 'Webcam-based object detection with bounding boxes and confidence scores.',
    icon: Eye,
    color: '#ff6b6b',
    features: ['Live webcam inference', 'Bounding box overlay', 'Layer visualization'],
    latency: '25ms avg',
    available: true,
  },
  {
    id: 'vlm-demo',
    title: 'Vision-Language Playground',
    description: 'Upload an image and ask questions in natural language.',
    icon: Brain,
    color: '#4ecdc4',
    features: ['Image + text queries', 'Attention heatmaps', 'Caption generation'],
    latency: '<1s response',
    available: true,
  },
  {
    id: 'embedding-demo',
    title: 'Embedding Explorer',
    description: 'Interactive visualization of document and image embeddings.',
    icon: BarChart3,
    color: '#ffe66d',
    features: ['t-SNE / UMAP plots', 'Cluster analysis', 'Similarity search'],
    latency: 'Interactive',
    available: false,
  },
]

export default function DemosSection() {
  return (
    <section id="demos" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 mb-4">
            <Play size={18} />
            <span className="text-sm font-medium">Live Demos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Interactive ML Demos
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Try out real-time inference demos. All processing happens securely — webcam data stays on your device or your demo server.
          </p>
        </motion.div>
        
        {/* Privacy notice */}
        <motion.div
          className="mb-8 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Camera size={20} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-200 text-sm font-medium">Camera Permission Required</p>
            <p className="text-amber-200/70 text-sm">
              Some demos require webcam access. Your video stream is processed locally or sent only to your own demo server — never to third parties.
            </p>
          </div>
        </motion.div>
        
        {/* Demos grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {DEMOS.map((demo, index) => (
            <DemoCard key={demo.id} demo={demo} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DemoCard({ demo, index }) {
  const Icon = demo.icon
  
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, ${demo.color}, transparent)` }}
      />
      
      <div className="relative h-full p-6 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-gray-600 transition-all duration-300">
        {/* Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${demo.color}20`, border: `1px solid ${demo.color}40` }}
        >
          <Icon size={24} style={{ color: demo.color }} />
        </div>
        
        {/* Title & description */}
        <h3 className="text-xl font-bold text-white mb-2">{demo.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{demo.description}</p>
        
        {/* Features */}
        <ul className="space-y-2 mb-4">
          {demo.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: demo.color }} />
              {feature}
            </li>
          ))}
        </ul>
        
        {/* Latency badge */}
        <div className="flex items-center justify-between">
          <span 
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: `${demo.color}20`, color: demo.color }}
          >
            {demo.latency}
          </span>
          
          {demo.available ? (
            <button
              className="px-4 py-2 rounded-lg text-sm font-medium bg-white/5 text-white hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <Play size={14} />
              Try Demo
            </button>
          ) : (
            <span className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-800 text-gray-500 flex items-center gap-2">
              <AlertTriangle size={14} />
              Coming Soon
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

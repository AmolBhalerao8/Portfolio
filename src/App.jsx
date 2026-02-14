import { useEffect, useState, useRef, Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

import { useStore } from './store/useStore'
import { CONFIG, STATIONS, PROJECTS, NAV_ITEMS, ACHIEVEMENTS, EDUCATION, SKILLS } from './data/config'

// Neural Network Node - glowing sphere
function NeuralNode({ position, size = 0.15, color = '#00d4ff', pulseSpeed = 1 }) {
  const ref = useRef()
  const initialPos = useMemo(() => [...position], [])
  
  useFrame((state) => {
    if (ref.current) {
      // Gentle floating animation
      ref.current.position.y = initialPos[1] + Math.sin(state.clock.elapsedTime * pulseSpeed + initialPos[0]) * 0.05
      // Subtle pulse
      const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 2 + initialPos[0] * 2) * 0.2
      ref.current.scale.setScalar(pulse)
    }
  })
  
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

// Connection line between nodes
function Connection({ start, end, color = '#00d4ff' }) {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      // Animate opacity for data flow effect
      const opacity = 0.1 + Math.sin(state.clock.elapsedTime * 3 + start[0]) * 0.1
      ref.current.material.opacity = opacity
    }
  })
  
  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)]
  }, [start, end])
  
  const geometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [points])
  
  return (
    <line ref={ref} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.15} />
    </line>
  )
}

// Neural Network Layer
function NeuralLayer({ x, nodeCount, layerIndex, totalLayers }) {
  const nodes = useMemo(() => {
    const positions = []
    const spacing = 1.2
    const startY = -((nodeCount - 1) * spacing) / 2
    
    for (let i = 0; i < nodeCount; i++) {
      positions.push([x, startY + i * spacing, (Math.random() - 0.5) * 2])
    }
    return positions
  }, [x, nodeCount])
  
  // Color gradient from cyan to purple across layers
  const color = useMemo(() => {
    const t = layerIndex / (totalLayers - 1)
    const r = Math.floor(0 + t * 196)
    const g = Math.floor(212 - t * 135)
    const b = Math.floor(255)
    return `rgb(${r}, ${g}, ${b})`
  }, [layerIndex, totalLayers])
  
  return (
    <>
      {nodes.map((pos, i) => (
        <NeuralNode 
          key={`node-${layerIndex}-${i}`} 
          position={pos} 
          color={color}
          size={0.12 + Math.random() * 0.08}
          pulseSpeed={0.5 + Math.random() * 0.5}
        />
      ))}
    </>
  )
}

// Full Neural Network
function NeuralNetwork() {
  const layers = useMemo(() => [
    { x: -6, nodes: 4 },
    { x: -3, nodes: 6 },
    { x: 0, nodes: 8 },
    { x: 3, nodes: 6 },
    { x: 6, nodes: 4 },
  ], [])
  
  // Generate connections between adjacent layers
  const connections = useMemo(() => {
    const conns = []
    for (let l = 0; l < layers.length - 1; l++) {
      const layer1 = layers[l]
      const layer2 = layers[l + 1]
      const spacing1 = 1.2
      const spacing2 = 1.2
      const startY1 = -((layer1.nodes - 1) * spacing1) / 2
      const startY2 = -((layer2.nodes - 1) * spacing2) / 2
      
      for (let i = 0; i < layer1.nodes; i++) {
        for (let j = 0; j < layer2.nodes; j++) {
          // Only connect some nodes for cleaner look
          if (Math.random() > 0.5) {
            conns.push({
              start: [layer1.x, startY1 + i * spacing1, (Math.random() - 0.5) * 0.5],
              end: [layer2.x, startY2 + j * spacing2, (Math.random() - 0.5) * 0.5],
            })
          }
        }
      }
    }
    return conns
  }, [layers])
  
  return (
    <group position={[0, 0, -5]}>
      {/* Connections */}
      {connections.map((conn, i) => (
        <Connection key={`conn-${i}`} start={conn.start} end={conn.end} />
      ))}
      
      {/* Layers */}
      {layers.map((layer, i) => (
        <NeuralLayer 
          key={`layer-${i}`} 
          x={layer.x} 
          nodeCount={layer.nodes}
          layerIndex={i}
          totalLayers={layers.length}
        />
      ))}
    </group>
  )
}

// Floating particles for ambient effect
function FloatingParticles({ count = 100 }) {
  const ref = useRef()
  
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [count])
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })
  
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#00d4ff" 
        transparent 
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  )
}

// 3D Scene with Neural Network
function Scene() {
  return (
    <>
      {/* Subtle lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[10, 5, 10]} intensity={0.5} color="#c44dff" />
      
      {/* Neural Network */}
      <NeuralNetwork />
      
      {/* Floating particles */}
      <FloatingParticles count={150} />
      
      {/* Subtle grid */}
      <gridHelper args={[40, 40, '#0a2a3a', '#050a10']} position={[0, -5, 0]} />
      
      {/* Controls - auto rotate for ambient feel */}
      <OrbitControls 
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

// 3D Canvas
function ThreeCanvas() {
  return (
    <Canvas camera={{ position: [0, 2, 15], fov: 50 }}>
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 10, 35]} />
      <Scene />
    </Canvas>
  )
}

// Loading Screen
function LoadingScreen() {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#030712'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 64,
          height: 64,
          border: '4px solid #00d4ff',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px'
        }} />
        <p style={{ color: '#00d4ff', fontWeight: 500 }}>Welcome to my portfolio</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// Navigation
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="text-xl font-bold text-cyan-400">{CONFIG.name}</a>
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a 
            href={CONFIG.resumeUrl}
            className="px-4 py-2 bg-cyan-500/20 border border-cyan-500 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}

// Hero Overlay with scroll fade effect
function HeroOverlay() {
  const [opacity, setOpacity] = useState(1)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const fadeStart = 100
      const fadeEnd = 400
      
      if (scrollY <= fadeStart) {
        setOpacity(1)
      } else if (scrollY >= fadeEnd) {
        setOpacity(0)
      } else {
        setOpacity(1 - (scrollY - fadeStart) / (fadeEnd - fadeStart))
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <div 
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      style={{ opacity, transition: 'opacity 0.1s ease-out' }}
    >
      <div className="text-center px-6 pointer-events-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-white">
          {CONFIG.heroHeadline}
        </h1>
        <p className="text-cyan-400 text-lg mb-4">{CONFIG.tagline}</p>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          M.S. Data Science & Analytics. Building production-ready ML systems, interpretable AI, and multimodal applications.{' '}
          <a href={CONFIG.zolUrl} target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-amber-400 hover:text-amber-300 transition-colors">Co-founder & CTO of ZOL</a>.
        </p>
        <div className="flex gap-4 justify-center">
          <a 
            href="#demos" 
            className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Explore Demos
          </a>
          <a 
            href={CONFIG.resumeUrl}
            className="px-6 py-3 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors"
          >
            Download Résumé
          </a>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-12 text-gray-500 animate-bounce">
          <p className="text-sm mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full mx-auto flex justify-center">
            <div className="w-1 h-3 bg-gray-500 rounded-full mt-2" />
          </div>
        </div>
      </div>
    </div>
  )
}

// About Section with Profile Photo
function AboutSection() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-cyan-400">About Me</h2>
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/30 overflow-hidden">
              <img src="/images/profile.jpg" alt={CONFIG.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-center text-gray-500 text-sm mt-3">{CONFIG.location}</p>
          </div>
          
          {/* Bio */}
          <div className="flex-1">
            <p className="text-gray-300 text-lg mb-8 whitespace-pre-line">{CONFIG.aboutParagraph}</p>
            
            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {CONFIG.aboutHighlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                  <span className="text-cyan-400 text-sm">✓</span>
                  <span className="text-gray-300 text-sm">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Education Section
function EducationSection() {
  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-cyan-400">Education</h2>
        
        <div className="space-y-8">
          {EDUCATION.map((edu, index) => (
            <div 
              key={edu.id} 
              className="relative pl-8 border-l-2 border-cyan-500/30"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-500 border-4 border-gray-950" />
              
              <div className="p-6 bg-gray-900/50 rounded-xl border border-gray-800">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                  <span className="text-cyan-400 text-sm font-medium">{edu.period}</span>
                </div>
                <p className="text-gray-400 mb-4">{edu.school} · {edu.location}</p>
                
                {edu.highlights && (
                  <ul className="space-y-1">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-cyan-400 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Tech Stack / Skills Section
function SkillsSection() {
  const skillCategories = Object.values(SKILLS)
  
  return (
    <section id="skills" className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Tech Stack</h2>
        <p className="text-gray-400 mb-12">Technologies and tools I work with regularly.</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div 
              key={category.title} 
              className="p-5 bg-gray-900/80 rounded-xl border border-gray-800"
            >
              <h3 className="text-lg font-semibold text-white mb-4">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <span 
                    key={skill} 
                    className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Projects Section
function ProjectsSection() {
  const setSelectedProject = useStore((state) => state.setSelectedProject)
  
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-cyan-400">Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.filter(p => p.featured).map((project) => (
            <div
              key={project.id}
              className="p-6 bg-gray-900/80 rounded-xl border border-gray-800 hover:border-cyan-500/50 hover:scale-[1.02] transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-gray-500 text-sm">{project.subtitle}</p>
                </div>
                <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                  {project.highlightMetric}
                </span>
              </div>
              <p className="text-gray-400 mb-4">{project.shortDescription}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-400 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Demos Section
function DemosSection() {
  return (
    <section id="demos" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Interactive Demos</h2>
        <p className="text-gray-400 mb-8">Try live ML demos. Webcam data stays client-side.</p>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-gray-900/80 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">👁️</div>
            <h3 className="text-xl font-bold text-white mb-2">CV Demo</h3>
            <p className="text-gray-400 mb-4">Real-time object detection with webcam</p>
            <span className="text-cyan-400 text-sm">~25ms latency</span>
          </div>
          <div className="p-6 bg-gray-900/80 rounded-xl border border-gray-800">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold text-white mb-2">VLM Playground</h3>
            <p className="text-gray-400 mb-4">Image + text queries with attention maps</p>
            <span className="text-cyan-400 text-sm">&lt;1s response</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// Achievements Section
function AchievementsSection() {
  return (
    <section id="achievements" className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Achievements</h2>
        <p className="text-gray-400 mb-12">Startup challenges, hackathons, and recognitions.</p>
        
        {ACHIEVEMENTS.map((achievement) => (
          <div key={achievement.id} className="mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Achievement Photo Placeholder */}
              <div className="flex-shrink-0 w-full md:w-72">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/30 overflow-hidden">
                  {/* Replace with actual image: <img src="/images/startup-win.jpg" alt={achievement.title} className="w-full h-full object-cover" /> */}
                  <div className="w-full h-full flex items-center justify-center text-5xl">
                    🏆
                  </div>
                </div>
              </div>
              
              {/* Achievement Details */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{achievement.title}</h3>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                    {achievement.subtitle}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{achievement.description}</p>
                
                {achievement.highlights && (
                  <ul className="space-y-2">
                    {achievement.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-400">
                        <span className="text-purple-400">→</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  return (
    <section id="contact" className="py-20 px-6 bg-gray-900/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-cyan-400">Get In Touch</h2>
        <p className="text-gray-400 mb-8">Interested in collaborating or have questions?</p>
        <div className="flex justify-center gap-4">
          <a 
            href={`mailto:${CONFIG.email}`}
            className="px-6 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Email Me
          </a>
          <a 
            href={CONFIG.linkedinUrl}
            className="px-6 py-3 border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href={CONFIG.githubUrl}
            className="px-6 py-3 border border-gray-600 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-500">© 2024 {CONFIG.name}. All rights reserved.</p>
        <div className="flex gap-6 text-gray-500 text-sm">
          <span>Privacy-first: No tracking</span>
          <span>Accessible design</span>
        </div>
      </div>
    </footer>
  )
}

// Project Modal
function ProjectModal() {
  const selectedProject = useStore((state) => state.selectedProject)
  const setSelectedProject = useStore((state) => state.setSelectedProject)
  
  if (!selectedProject) return null
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
      onClick={() => setSelectedProject(null)}
    >
      <div
        className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-gray-900 rounded-2xl border border-gray-700 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
            <p className="text-gray-500">{selectedProject.subtitle}</p>
          </div>
          <button 
            onClick={() => setSelectedProject(null)}
            className="text-gray-500 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4 text-gray-300">
          <div>
            <h4 className="text-cyan-400 font-semibold mb-1">Overview</h4>
            <p>{selectedProject.overview}</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-semibold mb-1">Problem</h4>
            <p>{selectedProject.problem}</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-semibold mb-1">Approach</h4>
            <p>{selectedProject.approach}</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-semibold mb-1">Results</h4>
            <p>{selectedProject.results}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-6">
          {selectedProject.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        
        {selectedProject.links.github && (
          <a 
            href={selectedProject.links.github}
            className="inline-block mt-6 px-6 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            View on GitHub →
          </a>
        )}
      </div>
    </div>
  )
}

// Mobile Fallback
function MobileFallback() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-cyan-400 mb-2">{CONFIG.name}</h1>
        <p className="text-gray-400 mb-8">{CONFIG.tagline}</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <p className="text-gray-300">{CONFIG.aboutParagraph}</p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          {PROJECTS.filter(p => p.featured).map((project) => (
            <div key={project.id} className="p-4 bg-gray-900 rounded-lg mb-4">
              <h3 className="font-bold text-white">{project.title}</h3>
              <p className="text-gray-400 text-sm">{project.shortDescription}</p>
            </div>
          ))}
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4">Contact</h2>
          <a href={`mailto:${CONFIG.email}`} className="text-cyan-400">{CONFIG.email}</a>
        </section>
      </div>
    </div>
  )
}

// Main App
function App() {
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const selectedProject = useStore((state) => state.selectedProject)
  
  useEffect(() => {
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0)
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const timer = setTimeout(() => setLoading(false), 1500)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      clearTimeout(timer)
    }
  }, [])
  
  if (isMobile) return <MobileFallback />
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {loading && <LoadingScreen />}
      
      {/* Fade overlay for content near navbar */}
      <div className="navbar-fade-overlay" />
      
      <Navigation />
      
      {/* Hero with 3D */}
      <section id="hero" style={{ position: 'relative', width: '100%', height: '100vh' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <ThreeCanvas />
        </div>
        <HeroOverlay />
      </section>
      
      {/* Content */}
      <div className="relative z-10 bg-gray-950">
        <AboutSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <DemosSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </div>
      
      {/* Modal */}
      {selectedProject && <ProjectModal />}
    </div>
  )
}

export default App

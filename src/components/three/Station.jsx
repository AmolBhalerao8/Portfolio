import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'

export default function Station({ station }) {
  const groupRef = useRef()
  const meshRef = useRef()
  const glowRef = useRef()
  const [hovered, setHovered] = useState(false)
  const setActiveStation = useStore((state) => state.setActiveStation)
  const activeStation = useStore((state) => state.activeStation)
  const isActive = activeStation === station.id
  
  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = station.position[1] + Math.sin(state.clock.elapsedTime * 1.5 + station.position[0]) * 0.1
    }
    
    if (meshRef.current) {
      // Rotation on hover
      if (hovered || isActive) {
        meshRef.current.rotation.y += 0.015
      }
    }
    
    if (glowRef.current && glowRef.current.material) {
      // Pulsing glow
      const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.15 + 0.25
      glowRef.current.material.opacity = (hovered || isActive) ? pulse + 0.2 : pulse
    }
  })
  
  const handleClick = (e) => {
    e.stopPropagation()
    setActiveStation(isActive ? null : station.id)
  }
  
  return (
    <group
      ref={groupRef}
      position={[station.position[0], station.position[1], station.position[2]]}
    >
      <group
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        {/* Main station box */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial
            color={station.color}
            metalness={0.4}
            roughness={0.3}
            emissive={station.color}
            emissiveIntensity={hovered || isActive ? 0.5 : 0.2}
          />
        </mesh>
        
        {/* Outer glow */}
        <mesh ref={glowRef} scale={1.4}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshBasicMaterial
            color={station.color}
            transparent
            opacity={0.2}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
      
      {/* Station icon */}
      <Html
        position={[0, 0, 0.7]}
        center
        distanceFactor={8}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div className="text-3xl">{station.icon}</div>
      </Html>
      
      {/* Station label */}
      <Html
        position={[0, -1.2, 0]}
        center
        distanceFactor={10}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div 
          className="text-center whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-semibold"
          style={{
            background: `${station.color}25`,
            color: station.color,
            border: `1px solid ${station.color}50`,
          }}
        >
          {station.shortName}
        </div>
      </Html>
      
      {/* Expanded info panel when active */}
      {isActive && (
        <Html
          position={[0, 2.5, 0]}
          center
          distanceFactor={5}
        >
          <div 
            className="w-80 p-5 rounded-2xl text-white"
            style={{
              background: 'rgba(5, 5, 15, 0.95)',
              border: `2px solid ${station.color}`,
              boxShadow: `0 0 40px ${station.color}40`,
            }}
          >
            <h3 
              className="text-xl font-bold mb-2"
              style={{ color: station.color }}
            >
              {station.name}
            </h3>
            <p className="text-sm text-gray-200 mb-3">
              {station.tagline}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              {station.description}
            </p>
            <button
              className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all hover:scale-[1.02]"
              style={{
                background: station.color,
                color: '#000',
              }}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Explore →
            </button>
          </div>
        </Html>
      )}
    </group>
  )
}

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'
import { STATIONS } from '../../data/config'
import Station from './Station'

export default function LabScene() {
  const groupRef = useRef()
  
  return (
    <group ref={groupRef}>
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, 5, -5]} intensity={0.8} color="#00d4ff" />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#c44dff" />
      
      {/* Simple grid floor */}
      <gridHelper args={[30, 30, '#00d4ff', '#1a1a2e']} position={[0, -1.5, 0]} />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.51, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#030712" />
      </mesh>
      
      {/* Stations */}
      {Object.values(STATIONS).map((station) => (
        <Station key={station.id} station={station} />
      ))}
      
      {/* Central platform */}
      <CentralPlatform />
    </group>
  )
}

function CentralPlatform() {
  const meshRef = useRef()
  const ringRef = useRef()
  
  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += 0.002
    }
  })
  
  return (
    <group position={[0, -1.2, 0]}>
      {/* Main platform */}
      <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2.2, 0.1, 32]} />
        <meshStandardMaterial 
          color="#0a0a0f"
          metalness={0.8}
          roughness={0.2}
          emissive="#00d4ff"
          emissiveIntensity={0.05}
        />
      </mesh>
      
      {/* Rotating ring */}
      <group ref={ringRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
          <torusGeometry args={[2.5, 0.02, 8, 64]} />
          <meshStandardMaterial 
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      </group>
      
      {/* Inner glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[1.8, 2, 64]} />
        <meshBasicMaterial 
          color="#00d4ff"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

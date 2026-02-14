import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../../store/useStore'
import { STATIONS } from '../../data/config'

export default function CameraController() {
  const controlsRef = useRef()
  const { camera } = useThree()
  const activeStation = useStore((state) => state.activeStation)
  const targetPosition = useRef(new THREE.Vector3(0, 2, 8))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))
  
  useEffect(() => {
    if (activeStation && STATIONS[activeStation]) {
      const station = STATIONS[activeStation]
      const pos = station.position
      
      // Calculate camera position to look at station
      const offset = new THREE.Vector3(pos[0], pos[1] + 1, pos[2]).normalize().multiplyScalar(4)
      targetPosition.current.set(
        pos[0] + offset.x,
        pos[1] + 2,
        pos[2] + offset.z + 3
      )
      targetLookAt.current.set(pos[0], pos[1], pos[2])
    } else {
      // Default position
      targetPosition.current.set(0, 2, 8)
      targetLookAt.current.set(0, 0, 0)
    }
  }, [activeStation])
  
  useFrame((state, delta) => {
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, delta * 2)
    
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAt.current, delta * 2)
      controlsRef.current.update()
    }
  })
  
  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={3}
      maxDistance={15}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.2}
      dampingFactor={0.05}
      rotateSpeed={0.5}
    />
  )
}

import * as THREE from 'three'

export default function GridFloor() {
  return (
    <group position={[0, -1.5, 0]}>
      {/* Main grid */}
      <gridHelper args={[30, 30, '#00d4ff', '#00d4ff']} />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial
          color="#030712"
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Glow effect at center */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[6, 32]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  )
}

"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export function AIOrb({ position = [2.2, 0, 0] as [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.35;
      ref.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.4 + Math.sin(t * 2) * 0.08);
    }
  });

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.08} />
      </mesh>
      <Sphere ref={ref} args={[0.75, 64, 64]}>
        <MeshDistortMaterial
          color="#4f46e5"
          emissive="#312e81"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={2.5}
        />
      </Sphere>
      <pointLight position={[0, 0, 1]} intensity={2} color="#22d3ee" distance={4} />
      <pointLight position={[0, 0, -1]} intensity={1.5} color="#a855f7" distance={3} />
    </group>
  );
}

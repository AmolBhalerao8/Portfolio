"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import type * as THREE from "three";
import { SKILL_CATEGORIES } from "@/data/portfolio";

function SkillOrbit() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
    }
  });

  const allSkills = SKILL_CATEGORIES.flatMap((cat, ci) =>
    cat.skills.map((skill, si) => ({
      skill,
      color: cat.color,
      angle: (ci / SKILL_CATEGORIES.length) * Math.PI * 2 + (si / cat.skills.length) * 0.8,
      radius: 2.2 + (si % 3) * 0.5,
      y: (si - cat.skills.length / 2) * 0.35,
    }))
  );

  return (
    <group ref={groupRef}>
      {allSkills.slice(0, 28).map((item, i) => {
        const x = Math.cos(item.angle + i * 0.2) * item.radius;
        const z = Math.sin(item.angle + i * 0.2) * item.radius;
        return (
          <group key={`${item.skill}-${i}`} position={[x, item.y, z]}>
            <mesh>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshBasicMaterial color={item.color} transparent opacity={0.9} />
            </mesh>
            <Text
              position={[0, -0.22, 0]}
              fontSize={0.12}
              color="#a1a1aa"
              anchorX="center"
              anchorY="middle"
              maxWidth={1.2}
            >
              {item.skill}
            </Text>
          </group>
        );
      })}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export function SkillGalaxy() {
  return (
    <div className="w-full h-[420px] md:h-[500px] rounded-2xl overflow-hidden glass glow-border">
      <Canvas camera={{ position: [0, 1, 7], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#0a0a0f"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#818cf8" />
        <Suspense fallback={null}>
          <SkillOrbit />
        </Suspense>
      </Canvas>
    </div>
  );
}

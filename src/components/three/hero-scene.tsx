"use client";

import { Suspense, useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { NeuralNetwork } from "./neural-network";
import { AIOrb } from "./ai-orb";

function CameraRig({
  mouse,
  scrollProgress,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    const scrollZ = scrollProgress.current * 2.5;
    const targetX = mouse.current.x * 0.8;
    const targetY = mouse.current.y * 0.4 + 0.5 - scrollProgress.current * 0.8;
    const targetZ = 6 - scrollZ;
    camera.position.x += (targetX - camera.position.x) * 0.03;
    camera.position.y += (targetY - camera.position.y) * 0.03;
    camera.position.z += (targetZ - camera.position.z) * 0.03;
    camera.lookAt(0, -scrollProgress.current * 0.3, 0);
  });
  return null;
}

function SceneContent({
  mouse,
  scrollProgress,
}: {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
  scrollProgress: React.MutableRefObject<number>;
}) {
  return (
    <>
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 8, 20]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color="#e0e7ff" />
      <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade speed={0.5} />
      <NeuralNetwork mouse={mouse} />
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <AIOrb position={[2.5, 0.2, -0.5]} />
      </Float>
      <Environment preset="night" />
      <CameraRig mouse={mouse} scrollProgress={scrollProgress} />
    </>
  );
}

interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className = "" }: HeroSceneProps) {
  const mouse = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const h = rect.height || 1;
      scrollProgress.current = Math.min(1, Math.max(0, -rect.top / h));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
  }, []);

  if (webglFailed) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-[#030303] to-purple-950/30 ${className}`}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 ${className}`}
      onPointerMove={onPointerMove}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#030303"), 0);
        }}
        onError={() => setWebglFailed(true)}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}

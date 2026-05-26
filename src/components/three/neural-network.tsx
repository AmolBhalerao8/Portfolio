"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 60;

export function NeuralNetwork({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const { positions, lineIndices } = useMemo(() => {
    const pos = new Float32Array(NODE_COUNT * 3);
    const indices: number[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 7;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < 1.6) {
          indices.push(i, j);
        }
      }
    }
    return { positions: pos, lineIndices: indices };
  }, []);

  const velocities = useMemo(() => {
    const v = new Float32Array(NODE_COUNT * 3);
    for (let i = 0; i < NODE_COUNT * 3; i++) v[i] = (Math.random() - 0.5) * 0.01;
    return v;
  }, []);

  const linePositions = useMemo(() => {
    const lp = new Float32Array(lineIndices.length * 3);
    lineIndices.forEach((idx, i) => {
      lp[i * 3] = positions[idx * 3];
      lp[i * 3 + 1] = positions[idx * 3 + 1];
      lp[i * 3 + 2] = positions[idx * 3 + 2];
    });
    return lp;
  }, [lineIndices, positions]);

  useFrame((state) => {
    const pts = pointsRef.current;
    const lines = linesRef.current;
    if (!pts) return;

    const arr = (pts.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < NODE_COUNT; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1] + Math.sin(t + i) * 0.0005;
      arr[i * 3 + 2] += velocities[i * 3 + 2];

      arr[i * 3] += (mouse.current.x * 2 - arr[i * 3]) * 0.003;
      arr[i * 3 + 1] += (mouse.current.y * 1.5 - arr[i * 3 + 1]) * 0.003;

      for (let a = 0; a < 3; a++) {
        const idx = i * 3 + a;
        if (Math.abs(arr[idx]) > 3.5) velocities[idx] *= -1;
      }
    }
    pts.geometry.attributes.position.needsUpdate = true;

    if (lines) {
      const larr = (lines.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
      lineIndices.forEach((nodeIdx, i) => {
        larr[i * 3] = arr[nodeIdx * 3];
        larr[i * 3 + 1] = arr[nodeIdx * 3 + 1];
        larr[i * 3 + 2] = arr[nodeIdx * 3 + 2];
      });
      lines.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={NODE_COUNT} />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          color="#a5b4fc"
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

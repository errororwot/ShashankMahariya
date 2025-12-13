import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Icosahedron, Octahedron, Box, Torus } from "@react-three/drei";
import * as THREE from "three";

interface FloatingShapeProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  speed?: number;
  floatIntensity?: number;
  mousePosition: { x: number; y: number };
  color?: string;
  wireframe?: boolean;
}

const FloatingShape = ({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  speed = 1,
  floatIntensity = 1,
  mousePosition,
  color = "#ffffff",
  wireframe = true,
}: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    // Performance and accessibility guards
    const prefersReduced = typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deviceMemory = typeof navigator !== "undefined" ? (navigator as any).deviceMemory || 4 : 4;
    const perfScale = prefersReduced ? 0 : deviceMemory < 2 ? 0.5 : 1;

    // Floating animation
    meshRef.current.position.y =
      initialPosition.y + Math.sin(time * speed) * floatIntensity * 0.3 * perfScale;
    meshRef.current.position.x =
      initialPosition.x + Math.sin(time * speed * 0.5) * floatIntensity * 0.1 * perfScale;

    // Mouse parallax effect (scaled down on low-end)
    meshRef.current.position.x += mousePosition.x * 0.5 * (1 / scale) * perfScale;
    meshRef.current.position.y += mousePosition.y * 0.3 * (1 / scale) * perfScale;

    // Rotation (subtle)
    meshRef.current.rotation.x += 0.002 * speed * perfScale;
    meshRef.current.rotation.y += 0.003 * speed * perfScale;
    meshRef.current.rotation.z += 0.001 * speed * perfScale;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe={wireframe} transparent opacity={0.6} />
    </mesh>
  );
};

const FloatingBox = ({
  position,
  scale = 1,
  speed = 1,
  floatIntensity = 1,
  mousePosition,
  color = "#ffffff",
}: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    const prefersReduced = typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deviceMemory = typeof navigator !== "undefined" ? (navigator as any).deviceMemory || 4 : 4;
    const perfScale = prefersReduced ? 0 : deviceMemory < 2 ? 0.5 : 1;
    meshRef.current.position.y =
      initialPosition.y + Math.cos(time * speed) * floatIntensity * 0.25 * perfScale;
    meshRef.current.position.x =
      initialPosition.x + Math.cos(time * speed * 0.7) * floatIntensity * 0.15 * perfScale;

    meshRef.current.position.x += mousePosition.x * 0.4 * (1 / scale) * perfScale;
    meshRef.current.position.y += mousePosition.y * 0.25 * (1 / scale) * perfScale;

    meshRef.current.rotation.x += 0.003 * speed * perfScale;
    meshRef.current.rotation.y += 0.002 * speed * perfScale;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.5} />
    </mesh>
  );
};

const FloatingTorus = ({
  position,
  scale = 1,
  speed = 1,
  floatIntensity = 1,
  mousePosition,
  color = "#ffffff",
}: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    const prefersReduced = typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deviceMemory = typeof navigator !== "undefined" ? (navigator as any).deviceMemory || 4 : 4;
    const perfScale = prefersReduced ? 0 : deviceMemory < 2 ? 0.5 : 1;
    meshRef.current.position.y =
      initialPosition.y + Math.sin(time * speed + 1) * floatIntensity * 0.2 * perfScale;
    meshRef.current.position.x =
      initialPosition.x + Math.sin(time * speed * 0.6 + 2) * floatIntensity * 0.12 * perfScale;

    meshRef.current.position.x += mousePosition.x * 0.6 * (1 / scale) * perfScale;
    meshRef.current.position.y += mousePosition.y * 0.4 * (1 / scale) * perfScale;

    meshRef.current.rotation.x += 0.004 * speed * perfScale;
    meshRef.current.rotation.y += 0.002 * speed * perfScale;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 8, 16]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.4} />
    </mesh>
  );
};

const FloatingOctahedron = ({
  position,
  scale = 1,
  speed = 1,
  floatIntensity = 1,
  mousePosition,
  color = "#ffffff",
}: FloatingShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    const prefersReduced = typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const deviceMemory = typeof navigator !== "undefined" ? (navigator as any).deviceMemory || 4 : 4;
    const perfScale = prefersReduced ? 0 : deviceMemory < 2 ? 0.5 : 1;
    meshRef.current.position.y =
      initialPosition.y + Math.sin(time * speed + 2) * floatIntensity * 0.35 * perfScale;
    meshRef.current.position.x =
      initialPosition.x + Math.cos(time * speed * 0.4) * floatIntensity * 0.1 * perfScale;

    meshRef.current.position.x += mousePosition.x * 0.35 * (1 / scale) * perfScale;
    meshRef.current.position.y += mousePosition.y * 0.2 * (1 / scale) * perfScale;

    meshRef.current.rotation.x += 0.002 * speed * perfScale;
    meshRef.current.rotation.z += 0.003 * speed * perfScale;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
};

interface FloatingShapesProps {
  mousePosition: { x: number; y: number };
}

const FloatingShapes = ({ mousePosition }: FloatingShapesProps) => {
  return (
    <group>
      {/* Main large shapes */}
      <FloatingShape
        position={[-4, 1, -2]}
        scale={1.2}
        speed={0.8}
        floatIntensity={1.2}
        mousePosition={mousePosition}
        color="#ffffff"
      />
      <FloatingBox
        position={[4, -0.5, -3]}
        scale={0.9}
        speed={1.1}
        floatIntensity={1}
        mousePosition={mousePosition}
        color="#ffffff"
      />
      <FloatingTorus
        position={[3, 2, -4]}
        scale={0.7}
        speed={0.9}
        floatIntensity={0.8}
        mousePosition={mousePosition}
        color="#ffffff"
      />
      <FloatingOctahedron
        position={[-3, -1.5, -2.5]}
        scale={0.8}
        speed={1.2}
        floatIntensity={1.1}
        mousePosition={mousePosition}
        color="#ffffff"
      />

      {/* Smaller accent shapes */}
      <FloatingShape
        position={[5, 1.5, -5]}
        scale={0.5}
        speed={1.4}
        floatIntensity={0.6}
        mousePosition={mousePosition}
        color="#ffffff"
      />
      <FloatingBox
        position={[-5, 2, -4]}
        scale={0.4}
        speed={1.3}
        floatIntensity={0.7}
        mousePosition={mousePosition}
        color="#ffffff"
      />
      <FloatingOctahedron
        position={[0, -2, -3]}
        scale={0.6}
        speed={1}
        floatIntensity={0.9}
        mousePosition={mousePosition}
        color="#ffffff"
      />
      <FloatingTorus
        position={[-2, 2.5, -5]}
        scale={0.45}
        speed={1.5}
        floatIntensity={0.5}
        mousePosition={mousePosition}
        color="#ffffff"
      />

      {/* Background distant shapes */}
      <FloatingShape
        position={[6, 0, -8]}
        scale={0.3}
        speed={0.6}
        floatIntensity={0.4}
        mousePosition={mousePosition}
        color="#ffffff"
      />
      <FloatingBox
        position={[-6, -1, -7]}
        scale={0.35}
        speed={0.7}
        floatIntensity={0.5}
        mousePosition={mousePosition}
        color="#ffffff"
      />
    </group>
  );
};

export default FloatingShapes;

/* eslint-disable react-hooks/purity, react-hooks/immutability */
"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, ChromaticAberration, Vignette, Noise } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const count = 600; // Less particles for cleaner look
const bloom = 0.8; // Reduced bloom

/* ----------------------- CAMERA RIG (mouse-reactive) ---------------------- */
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    // Slower, more subtle camera movement
    camera.position.x += (mouse.x * 1.0 - camera.position.x) * 0.02;
    camera.position.y += (mouse.y * 0.6 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, -10); // Look further back
  });
  return null;
}

/* ---------------------------- TRON GRID FLOOR ----------------------------- */
function TronGrid() {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        uniforms: {
          time: { value: 0 },
          // Subtler, less saturated purple
          color: { value: new THREE.Color("#6b21a8") },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          float grid(vec2 uv, float scale) {
            vec2 g = abs(fract(uv * scale - 0.5) - 0.5) / fwidth(uv * scale);
            float line = min(g.x, g.y);
            return 1.0 - min(line, 1.0);
          }
          void main() {
            vec2 uv = vUv;
            uv.y += time * 0.2;               // SLOWED DOWN forward motion
            float g1 = grid(uv, 20.0);
            float g2 = grid(uv, 80.0) * 0.3;  
            float glow = smoothstep(0.0, 1.0, g1 + g2);
            vec3 col = color * glow * 1.5;
            gl_FragColor = vec4(col, glow * 0.15); // Reduced opacity
          }
        `,
      }),
    []
  );
  useFrame((state) => {
    if (material.uniforms) material.uniforms.time.value = state.clock.elapsedTime;
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -10]}>
      <planeGeometry args={[200, 200, 1, 1]} />
      <primitive object={material} attach="material" ref={matRef} />
    </mesh>
  );
}

/* ---------------------------- DENSE PARTICLES ----------------------------- */
function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const { positions } = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 1] = Math.random() * 20 - 5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60 - 20; // Pushed further back
    }
    return { positions: arr };
  }, []);
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.01; // Slower rotation
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      {/* Subtler particles */}
      <pointsMaterial color="#8b5cf6" size={0.04} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

/* ----------------------------- FULL CANVAS ------------------------------- */
export default function TronAggressiveWorld() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 2.5, 9], fov: 60 }}>
      <color attach="background" args={["#050008"]} />
      {/* FOG for depth control */}
      <fog attach="fog" args={["#050008", 10, 40]} />
      <ambientLight intensity={0.2} />
      
      <CameraRig />
      <TronGrid />
      <Particles />
      
      {/* 🔥 POST FX: subtle bloom + vignette */}
      <EffectComposer>
        <Bloom intensity={bloom} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
        <ChromaticAberration offset={new THREE.Vector2(0.0006, 0.0006)} blendFunction={BlendFunction.NORMAL} />
        <Noise opacity={0.04} />
        <Vignette eskil={false} offset={0.2} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}

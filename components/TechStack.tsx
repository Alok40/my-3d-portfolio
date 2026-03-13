'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Physics, usePlane, useSphere } from '@react-three/cannon';
import { Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

const technologies = [
  "Next.js", "React", "Python", 
  "Node.js", "Tailwind", "Flutter", 
  "Figma", "MongoDB", "SEO"
];

/* ─── Ball Component ─── */
function TechBall({ name, position, size }: any) {
  // 1. Create a dynamic texture with the text printed on it!
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; // Wide canvas to wrap around the sphere
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    // Draw the solid white ball background
    ctx.fillStyle = '#f8fafc'; 
    ctx.fillRect(0, 0, 1024, 512);

    // Configure the text style
    ctx.font = 'bold 90px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#0f172a'; // Dark slate/black text

    // Draw the text twice (once for the front of the ball, once for the back)
    ctx.fillText(name, 256, 256);
    ctx.fillText(name, 768, 256);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 16; // Makes the text super crisp from all angles
    return tex;
  }, [name]);

  // 2. Physics Configuration
  const [ref, api] = useSphere(() => ({
    mass: 1, 
    position,
    args: [size],
    restitution: 0.6,    // Bounciness (like a ping-pong ball)
    friction: 0.2,       // Low friction so they roll smoothly
    // Notice: angularFactor is GONE! They can spin freely now.
  }));

  return (
    <mesh
      ref={ref as any}
      // When clicked, "kick" the ball up in the air!
      onClick={() => api.velocity.set((Math.random() - 0.5) * 5, 12, (Math.random() - 0.5) * 5)}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[size, 64, 64]} />
      {/* Wrap our custom text texture around the sphere */}
      <meshStandardMaterial
        map={texture}
        roughness={0.3} // Slightly shiny
        metalness={0.1}
      />
    </mesh>
  );
}

/* ─── Invisible Funnel Walls ─── */
function Borders({ hw, hh, isMobile }: { hw: number; hh: number; isMobile: boolean }) {
  const floor  = isMobile ? -hh + 1.5 : -hh + 0.5; 
  const ceil   = hh * 3; 
  
  // Bring the walls in slightly to force them to pile up in the middle
  const left   = -hw * 0.8;
  const right  = hw * 0.8;
  const front  =  2.5; 
  const back   = -2.5;

  usePlane(() => ({ position: [0, floor, 0], rotation: [-Math.PI / 2, 0, 0] })); 
  usePlane(() => ({ position: [0, ceil, 0], rotation: [Math.PI / 2, 0, 0] })); 
  usePlane(() => ({ position: [0, 0, back], rotation: [0, 0, 0] })); 
  usePlane(() => ({ position: [0, 0, front], rotation: [0, Math.PI, 0] })); 
  usePlane(() => ({ position: [left, 0, 0], rotation: [0, Math.PI / 2, 0] })); 
  usePlane(() => ({ position: [right, 0, 0], rotation: [0, -Math.PI / 2, 0] })); 

  return null;
}

function useWorldBounds(fov: number, camZ: number) {
  const { size } = useThree();
  const aspect = size.width / size.height;
  const vFovRad = (fov * Math.PI) / 180;
  const hh = Math.tan(vFovRad / 2) * camZ; 
  const hw = hh * aspect;
  return { hw, hh };
}

/* ─── Main Scene Setup ─── */
function Scene({ isMobile }: { isMobile: boolean }) {
  const fov = 50;
  const camZ = isMobile ? 18 : 12; 
  const { hw, hh } = useWorldBounds(fov, camZ);

  const ballSize = isMobile ? 1.0 : 1.3; 
  const floor = isMobile ? -hh + 1.5 : -hh + 0.5;
  const spawnH = hh + 5; // Spawn way above the screen so they rain down

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
      <pointLight position={[-10, 5, 5]} intensity={1} color="#ffffff" />
      <Environment preset="city" />

      {/* Normal gravity so they fall naturally */}
      <Physics gravity={[0, -15, 0]}>
        <Borders hw={hw} hh={hh} isMobile={isMobile} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, floor + 0.1, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        {technologies.map((tech, i) => {
          // Scatter their starting X and Y positions so they don't all fall at the exact same millisecond
          const randomX = (Math.random() - 0.5) * (hw * 1.2);
          const staggeredY = spawnH + (Math.random() * 10) + (i * 2);

          return (
            <TechBall
              key={tech}
              name={tech}
              size={ballSize}
              position={[randomX, staggeredY, (Math.random() - 0.5) * 2]} 
            />
          );
        })}
      </Physics>
    </>
  );
}

export default function TechStack() {
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    setReady(true);
    
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const camZ = isMobile ? 18 : 12;

  return (
    <section id="techstack" className="relative h-[100dvh] w-full flex flex-col items-center overflow-hidden z-10 bg-[#0a0a0a]">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute top-1/3 md:top-1/4 z-0 text-center pointer-events-none w-full px-4"
      >
        <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white uppercase drop-shadow-2xl">
          MY <span className="text-blue-500">TECH STACK</span>
        </h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
        viewport={{ once: true }}
        className="absolute bottom-10 md:bottom-16 z-20 text-gray-400 text-xs md:text-sm font-mono tracking-[0.2em] pointer-events-none uppercase bg-black/50 backdrop-blur-sm px-6 py-2 rounded-full border border-white/10"
      >
        Drag or click to toss
      </motion.p>

      {ready && (
        <div className="absolute inset-0 z-10">
          <Canvas
            shadows
            camera={{ position: [0, 0, camZ], fov: 50 }}
            gl={{ antialias: true, alpha: true }} 
          >
            <Scene isMobile={isMobile} />
          </Canvas>
        </div>
      )}

    </section>
  );
}
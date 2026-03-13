'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows, useFBX, useGLTF, useAnimations, Float, Html, useProgress } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Your existing sections
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';

// --- NEW: 3D Asset Loading Screen ---
function CanvasLoader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-[#0a0a0a]">
        {/* Glowing AA Logo Animation */}
        <div className="flex space-x-1 text-6xl font-mono font-bold animate-pulse tracking-wider">
          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">&lt;A</span>
          <span className="text-green-400 drop-shadow-[0_0_15px_rgba(74,222,128,0.8)]">A /&gt;</span>
        </div>
        
        {/* Real-time progress percentage */}
        <p className="mt-8 text-sm font-mono text-gray-500 tracking-widest uppercase">
          Initializing 3D Space... {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
}

function AnimatedScene() {
  const masterGroupRef = useRef<THREE.Group>(null);
  const avatarRef = useRef<THREE.Group>(null);
  const furnitureRef = useRef<THREE.Group>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);

  // 1. Load the Actors and Props
  const { scene: avatarBody } = useGLTF('/avatar.glb');
  const { scene: desk } = useGLTF('/desk.glb');
  const { scene: chair } = useGLTF('/chair.glb');

  // 2. Load the Brains
  const idleFbx = useFBX('/animated-avatar.fbx');
  const typingFbx = useFBX('/typing.fbx');

  // 3. The Translator
  useEffect(() => {
    idleFbx.animations[0].name = 'Idle';
    idleFbx.animations[0].tracks.forEach((track) => {
      track.name = track.name.replace('mixamorig:', '').replace('mixamorig', '');
    });

    typingFbx.animations[0].name = 'Typing';
    typingFbx.animations[0].tracks.forEach((track) => {
      track.name = track.name.replace('mixamorig:', '').replace('mixamorig', '');
    });
  }, [idleFbx, typingFbx]);

  // 4. Animation Mixer
  const { actions } = useAnimations([idleFbx.animations[0], typingFbx.animations[0]], avatarRef);
  const [currentAnim, setCurrentAnim] = useState('Idle');

  useEffect(() => {
    if (actions['Idle'] && actions['Typing']) {
      actions[currentAnim]?.reset().fadeIn(0.5).play();
      return () => {
        actions[currentAnim]?.fadeOut(0.5);
      };
    }
  }, [currentAnim, actions]);

  // THE CINEMATIC SCROLL MATH
  useFrame((state) => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const scrollProgress = Math.min(scrollY / vh, 1);
    const isMobile = state.size.width < 768;

    if (scrollProgress > 0.4 && currentAnim !== 'Typing') {
      setCurrentAnim('Typing');
    } else if (scrollProgress <= 0.4 && currentAnim !== 'Idle') {
      setCurrentAnim('Idle');
    }

    if (screenLightRef.current) {
      const targetLight = currentAnim === 'Typing' ? 5 : 0; 
      screenLightRef.current.intensity = THREE.MathUtils.lerp(screenLightRef.current.intensity, targetLight, 0.05);
    }

    if (furnitureRef.current) {
      const deskTargetY = currentAnim === 'Typing' ? -2.5 : -10;
      furnitureRef.current.position.y = THREE.MathUtils.lerp(furnitureRef.current.position.y, deskTargetY, 0.05);
    }

    if (masterGroupRef.current) {
      const targetScale = isMobile ? 0.7 : 1;
      masterGroupRef.current.scale.setScalar(THREE.MathUtils.lerp(masterGroupRef.current.scale.x, targetScale, 0.1));

      // Slides left on desktop to clear the text
      const targetXDistance = isMobile ? 0 : -1.2; 
      const targetX = THREE.MathUtils.lerp(0, targetXDistance, scrollProgress);
      masterGroupRef.current.position.x = THREE.MathUtils.lerp(masterGroupRef.current.position.x, targetX, 0.1);

      // Rotates to face right
      const scrollRotationY = THREE.MathUtils.lerp(0, Math.PI / 6, scrollProgress);
      const mouseX = isMobile ? 0 : state.pointer.x * 0.2; 
      const mouseY = isMobile ? 0 : state.pointer.y * 0.1;
      
      masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(masterGroupRef.current.rotation.y, mouseX + scrollRotationY, 0.05);
      masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(masterGroupRef.current.rotation.x, -mouseY, 0.05);

      let targetY = 0; 
      if (scrollY > vh * 1.2) {
        const hideProgress = Math.min((scrollY - vh * 1.2) / (vh * 0.5), 1);
        targetY = -(hideProgress * 10); 
      }
      masterGroupRef.current.position.y = THREE.MathUtils.lerp(masterGroupRef.current.position.y, targetY, 0.1);
    }
  });

  return (
    <group ref={masterGroupRef}>
      <Float speed={1.5} rotationIntensity={0.02} floatIntensity={0.2}>
        
        {/* THE FIX: Cinematic Rim Light moved back and boosted massively to outline his shoulder */}
        <pointLight position={[-3, 0, -2]} intensity={40} distance={10} color="#3b82f6" decay={2} />

        <group ref={avatarRef} position={[0, -2.5, 0]}>
          <primitive object={avatarBody} scale={2.3} castShadow receiveShadow />
        </group>

        <group ref={furnitureRef} position={[0, -10, 0]}>
          <primitive object={desk} scale={1.5} position={[-0.3, 1.5, 1]} rotation={[0, Math.PI, 0]} castShadow receiveShadow />
          <primitive object={chair} scale={0.1} position={[0, 1.5, -0.5]} />
          
          {/* THE FIX: Tight, bright light pool strictly on the floor under the chair */}
          <pointLight position={[0, 0.5, 0]} intensity={15} distance={4} color="#ffffff" decay={2} />

          <pointLight 
            ref={screenLightRef} 
            position={[-0.6, 2.5, 1.0]} 
            color="#60a5fa" 
            distance={5} 
            intensity={0} 
          />
        </group>

        {/* THE FIX: Massive unreflective floor plane. The Fog will eat the edges perfectly. */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.55, 0]} receiveShadow>
          <planeGeometry args={[500, 500]} />
          <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
        </mesh>

        <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={15} blur={2.5} far={4} />
      </Float>
    </group>
  );
}

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white font-sans relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas shadows camera={{ position: [0, 1, 6], fov: 50 }}>
          
          {/* THE MAGIC FOG: This perfectly melts the 3D floor into your HTML background color! */}
          <fog attach="fog" args={['#0a0a0a', 4, 12]} />

          <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
          <ambientLight intensity={0.4} />
          <Environment preset="city" />
          
          {/* THIS HAS BEEN UPDATED */}
          <Suspense fallback={<CanvasLoader />}>
            <AnimatedScene />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10">
        <nav className="fixed top-0 w-full p-4 md:p-6 flex justify-between items-center z-50 mix-blend-difference">
          <div className="text-lg md:text-xl font-bold tracking-tighter shrink-0">Alok Anand.</div>
          <div className="flex gap-3 sm:gap-4 md:gap-6 text-[10px] sm:text-xs md:text-sm font-medium text-gray-400 overflow-x-auto no-scrollbar whitespace-nowrap pl-4">
            <a href="#about" className="hover:text-white transition-colors pointer-events-auto">ABOUT</a>
            <a href="#experience" className="hover:text-white transition-colors pointer-events-auto">EXPERIENCE</a>
            <a href="#work" className="hover:text-white transition-colors pointer-events-auto">WORK</a>
            <a href="#contact" className="hover:text-white transition-colors pointer-events-auto">CONTACT</a>
          </div>
        </nav>

        <Hero />
        <About />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
      </div>
    </main>
  );
}
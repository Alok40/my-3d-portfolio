'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════
   PREMIUM PARTICLE CANVAS
═══════════════════════════════════════════════════ */

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  ox: number; oy: number;
  size: number;
  opacity: number;
  hue: number;
}

function createParticles(W: number, H: number, count: number): Particle[] {
  return Array.from({ length: count }, () => {
    const x = Math.random() * W;
    const y = Math.random() * H;
    return {
      x, y, vx: 0, vy: 0,
      ox: x, oy: y,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.5 + 0.25,
      hue: Math.random() * 40 - 20,
    };
  });
}

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const rafRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = 0, H = 0;
    let particles: Particle[] = [];

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
      particles = createParticles(W, H, 180);
    };
    resize();

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    const parent = canvas.parentElement;
    parent?.addEventListener('mousemove', onMouseMove);
    parent?.addEventListener('mouseleave', onMouseLeave);

    const ATTRACTION   = 0.012;
    const REPEL_DIST   = 80;
    const REPEL_FORCE  = 0.8;
    const RETURN_FORCE = 0.004;
    const FRICTION     = 0.88;
    const MAX_ATTRACT  = 180;

    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

        if (dist < MAX_ATTRACT) {
          if (dist < REPEL_DIST) {
            const force = (REPEL_DIST - dist) / REPEL_DIST * REPEL_FORCE;
            p.vx -= (dx / dist) * force;
            p.vy -= (dy / dist) * force;
          } else {
            const force = (1 - dist / MAX_ATTRACT) * ATTRACTION;
            p.vx += (dx / dist) * force * dist * 0.05;
            p.vy += (dy / dist) * force * dist * 0.05;
          }
        }

        p.vx += (p.ox - p.x) * RETURN_FORCE;
        p.vy += (p.oy - p.y) * RETURN_FORCE;
        p.vx += Math.sin(t + p.ox * 0.01) * 0.012;
        p.vy += Math.cos(t + p.oy * 0.01) * 0.012;
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const glow  = Math.min(speed * 6, 1);
        const radius = p.size + glow * 1.5;
        const alpha  = p.opacity + glow * 0.4;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 5);
        grad.addColorStop(0,   `hsla(${210 + p.hue}, 90%, 75%, ${alpha})`);
        grad.addColorStop(0.4, `hsla(${210 + p.hue}, 80%, 60%, ${alpha * 0.4})`);
        grad.addColorStop(1,   `hsla(${210 + p.hue}, 80%, 60%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${210 + p.hue}, 100%, 85%, ${alpha})`;
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      parent?.removeEventListener('mousemove', onMouseMove);
      parent?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ display: 'block' }}
    />
  );
}

/* ═══════════════════════════════════════════════════
   EXPERIENCE DATA
═══════════════════════════════════════════════════ */

const experiences = [
  {
    year: "2026 - NOW",
    role: "Full Stack Developer",
    company: "The Insight Ledger",
    description: "Developing and deploying an agri-food policy and trade intelligence platform. Architecting the system with Next.js, optimizing SEO, and implementing server-side rendering."
  },
  {
    year: "2025 - 2026",
    role: "Frontend Developer",
    company: "Freelance & Projects",
    description: "Crafting modern web applications using frameworks like React and Figma. Focused on building responsive and highly interactive user experiences."
  },
  {
    year: "2024 - 2025",
    role: "Python Developer",
    company: "Independent Projects",
    description: "Building custom Python scripts and applications, including automated system-level tools and backend processing workflows."
  }
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 md:py-32 w-full max-w-7xl mx-auto overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <ParticleCanvas />
      </div>

      <div className="w-full flex flex-col md:flex-row items-start justify-between relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none mb-4 uppercase">
            My career & <br />
            <span className="text-blue-500">experience</span>
          </h2>
        </motion.div>
      </div>

      <div className="w-full relative z-10 border-l-2 border-white/5 ml-2 md:ml-0">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12 mb-16 last:mb-0 group"
          >
            {/* Pulsing Timeline Dot */}
            <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-[9px] top-2 transition-transform duration-300 group-hover:scale-150">
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-75" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
               <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{exp.role}</h3>
                  <h4 className="text-lg md:text-xl text-blue-400 font-medium">{exp.company}</h4>
               </div>
               <span className="text-gray-500 font-mono text-sm md:text-lg bg-white/5 px-4 py-1 rounded-full border border-white/5 w-fit">
                 {exp.year}
               </span>
            </div>

            <p className="text-gray-400 text-base md:text-xl leading-relaxed max-w-3xl">
              {exp.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
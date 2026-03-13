'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Your project data
const projects = [
  {
    id: "01",
    title: "The Insight Ledger",
    description: "An agri-food policy and trade intelligence platform. Features complex server-side rendering, advanced SEO optimization, and a responsive modern architecture.",
    tech: ["Next.js", "React", "Node.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" 
  },
  {
    id: "02",
    title: "Audio Utility Script",
    description: "A Python-based utility application that interacts with system hardware, featuring real-time sound detection and automated trigger responses.",
    tech: ["Python", "Audio Processing", "Automation"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2370&auto=format&fit=crop" 
  },
  {
    id: "03",
    title: "E-Commerce Dashboard",
    description: "A full-stack dashboard for managing inventory and tracking sales. Built with a focus on fast load times and an intuitive user interface.",
    tech: ["TypeScript", "MongoDB", "Express"],
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=2376&auto=format&fit=crop" 
  }
];

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="work" className="min-h-screen flex flex-col justify-center px-6 py-20 md:py-32 w-full max-w-7xl mx-auto relative overflow-hidden z-10">
      
      {/* Header aligned with previous sections */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full text-left mb-12 md:mb-20"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none uppercase">
          My <span className="text-blue-500">Work</span>
        </h2>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative w-full overflow-hidden bg-[#111111]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-12 shadow-2xl flex items-center min-h-[auto] md:min-h-[550px]">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 w-full items-center"
          >
            
            {/* Left Side: Project Image (Appears on TOP on mobile) */}
            <div className="relative h-[250px] sm:h-[350px] md:h-[450px] w-full rounded-2xl overflow-hidden group order-1 md:order-2 shadow-2xl border border-white/5">
              <img 
                src={projects[currentIndex].image} 
                alt={projects[currentIndex].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Subtle gradient overlay to make image look premium */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Right Side: Project Details (Appears on BOTTOM on mobile) */}
            <div className="flex flex-col order-2 md:order-1 h-full justify-center">
              <span className="text-5xl md:text-7xl font-black text-white/5 mb-2 md:mb-4 drop-shadow-sm">
                {projects[currentIndex].id}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
                {projects[currentIndex].title}
              </h3>
              <p className="text-gray-400 text-base md:text-xl leading-relaxed mb-8 max-w-lg">
                {projects[currentIndex].description}
              </p>
              
              <div className="flex flex-wrap gap-2 md:gap-3 mb-8">
                {projects[currentIndex].tech.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs md:text-sm text-gray-300 font-medium">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-4">
                <button 
                  onClick={prevProject} 
                  className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white shadow-lg"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={nextProject} 
                  className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white shadow-lg"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8 md:mt-12 z-10">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to project ${index + 1}`}
            className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-blue-500 w-8 md:w-12 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'bg-white/20 hover:bg-white/40 w-3 md:w-4'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
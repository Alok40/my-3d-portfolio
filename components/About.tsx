'use client';

import { motion } from 'framer-motion';
import { Code2, Database } from 'lucide-react';

export default function About() {
  return (
    // FIX: Added 'overflow-x-hidden' here to prevent the mobile white gap
    <section id="about" className="relative h-[100vh] w-full flex items-center justify-center px-4 md:px-10 pointer-events-none overflow-x-hidden">
      
      {/* 3-Column Layout: Title (Left) | Empty Space for Avatar (Center) | Cards (Right) */}
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row justify-between items-center h-full">

        {/* 1. LEFT SIDE: Big Title */}
        <div className="w-full md:w-1/3 text-left z-10 mt-20 md:mt-0">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.5 }}
            className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-none drop-shadow-2xl uppercase text-center md:text-left"
          >
            WHAT <br />
            <span className="text-blue-500">I DO</span>
          </motion.h2>
        </div>

        {/* 2. MIDDLE: The Invisible Hole for the 3D Avatar */}
        {/* On mobile, this shrinks so the text stacks nicely. On desktop, it takes up 1/3 of the screen width */}
        <div className="w-full md:w-1/3 h-10 md:h-full shrink-0"></div>

        {/* 3. RIGHT SIDE: The Glass Cards */}
        {/* Added pointer-events-auto here so the user can actually hover over these cards */}
        <div className="w-full md:w-1/3 flex flex-col gap-6 pointer-events-auto z-10 mb-20 md:mb-0">
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false, amount: 0.5 }}
            className="bg-[#111111]/80 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl hover:bg-white/5 transition-colors group cursor-pointer shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">FRONTEND</h3>
              <Code2 className="w-6 h-6 text-gray-500 group-hover:text-blue-500 transition-colors" />
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
              Crafting beautiful, responsive user interfaces with modern tools to ensure perfect user experiences.
            </p>
            <div className="flex gap-2 flex-wrap">
               <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">React</span>
               <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">Next.js</span>
               <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">Tailwind</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false, amount: 0.5 }}
            className="bg-[#111111]/80 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-3xl hover:bg-white/5 transition-colors group cursor-pointer shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">BACKEND</h3>
              <Database className="w-6 h-6 text-gray-500 group-hover:text-purple-500 transition-colors" />
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4">
              Designing scalable APIs, robust databases, and secure server-side business logic.
            </p>
            <div className="flex gap-2 flex-wrap">
               <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">Node.js</span>
               <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">Python</span>
               <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">MongoDB</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="w-full bg-[#050505] pt-32 pb-8 px-6 md:px-12 relative z-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">

        {/* Premium Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16 flex flex-col items-center w-full"
        >
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase drop-shadow-2xl mb-6 leading-none">
            Let's Build <br className="md:hidden" />
            <span className="text-blue-500">Something.</span>
          </h2>
          
          <p className="text-gray-400 text-base md:text-xl max-w-2xl font-light leading-relaxed">
            Whether you need a scalable web platform, custom Python automation, or a full-stack solution, I'm currently open for new opportunities.
          </p>
          
          {/* Sleek Location Badge */}
          <div className="flex items-center gap-2 mt-8 px-5 py-2.5 bg-white/[0.03] border border-white/10 rounded-full text-gray-300 text-sm md:text-base backdrop-blur-md shadow-lg">
            <MapPin className="w-4 h-4 text-blue-500" />
            Based in Patna, India
          </div>
        </motion.div>

        {/* Premium Glassmorphism Icon Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          // FIX 1: Added pointer-events-auto and relative z-50 to pierce through any invisible layers
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-24 md:mb-32 w-full relative z-50 pointer-events-auto"
        >
          {/* GitHub */}
          {/* FIX 2: Added target="_blank" and rel="noopener noreferrer" to safely open in a new tab */}
          <a href="https://github.com/Alok40" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <Github className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          </a>
          
          {/* LinkedIn (Blue Glow) */}
          <a href="https://www.linkedin.com/in/alok-anand-5510a41bb/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-[#0a66c2]/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(10,102,194,0.4)]">
            <Linkedin className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-[#0a66c2] group-hover:scale-110 transition-all duration-300" />
          </a>
          
          {/* Twitter / X */}
          <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-blue-400/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]">
            <Twitter className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" />
          </a>
          
          {/* Mail (Red Glow) */}
          {/* Note: mailto: automatically opens the default email client, so it doesn't strictly need target="_blank", but it doesn't hurt! */}
          <a href="mailto:40alok@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email" className="group relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/[0.02] border border-white/10 rounded-full backdrop-blur-md hover:bg-white/10 hover:border-red-500/60 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]">
            <Mail className="w-6 h-6 md:w-8 md:h-8 text-gray-400 group-hover:text-red-400 group-hover:scale-110 transition-all duration-300" />
          </a>
        </motion.div>

      </div>

      {/* Footer Bottom Bar (Stacked cleanly on mobile, spread on desktop) */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 relative z-10 text-center md:text-left">
        <p className="text-gray-400 font-medium text-sm md:text-base">
          Designed & Developed by <span className="text-white font-bold tracking-wide">Alok Anand</span>
        </p>
        <p className="text-gray-600 text-xs md:text-sm font-mono tracking-widest uppercase">
          © {new Date().getFullYear()} All Rights Reserved
        </p>
      </div>

      {/* Massive Background Watermark Effect (Pinned to bottom) */}
      <div className="absolute bottom-10 left-0 w-full flex justify-center pointer-events-none select-none opacity-[0.02] overflow-hidden">
        <h1 className="text-[20vw] font-black leading-none tracking-tighter whitespace-nowrap translate-y-1/3">
          ALOK ANAND
        </h1>
      </div>

    </section>
  );
}
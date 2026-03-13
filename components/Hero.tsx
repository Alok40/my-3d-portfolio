'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    // Removed the overflow-hidden here so it plays nicely with the main scroll
    <section id="hero" className="relative h-[100dvh] flex flex-col items-center justify-center w-full">
      
      {/* The DIRECT 3D CANVAS section has been entirely removed from here. 
        It now lives in app/page.tsx! 
      */}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-end md:justify-between items-center h-full pb-10 md:pb-20 pointer-events-none">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-left hidden md:block"
        >
          <p className="text-gray-400 text-xl md:text-2xl mb-1">Hello! I'm</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide uppercase">
            YOUR<br/>ALOK ANAND
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-right hidden md:block"
        >
          <p className="text-gray-400 text-xl md:text-2xl mb-1">A Full Stack</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-wide uppercase">
            <span className="text-blue-500">DEVELOPER</span><br/>
            <span className="text-white">ENGINEER</span>
          </h1>
        </motion.div>

        <div className="md:hidden flex flex-col items-center text-center w-full mt-auto mb-12 bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10 pointer-events-auto">
           <p className="text-gray-400 text-lg mb-2">Hello! I'm <span className="text-white font-semibold">Alok Anand</span></p>
           <h1 className="text-4xl font-bold tracking-tight">
             A Full Stack <br />
             <span className="text-blue-500">DEVELOPER</span> <br />
             ENGINEER
           </h1>
        </div>

      </div>
    </section>
  );
}
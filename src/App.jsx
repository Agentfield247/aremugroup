import React from "react";
import Navbar from "./components/Navbar";
import AiPopup from "./components/AiPopup";
import AboutSection from "./components/AboutSection";
import { WebGLShader } from "./components/web-gl-shader";
import { motion } from "framer-motion";

export default function App() {
  return (
    // Changed bg-transparent back to bg-black to prevent any white flashes
    <div className="min-h-screen bg-black text-white selection:bg-gray-500/30">
      {/* 1. Shader Layer */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 opacity-40 pointer-events-none overflow-hidden grayscale brightness-75 contrast-125">
        <WebGLShader />
      </div>

      {/* --- Navigation --- */}
      <Navbar />

      {/* --- Main Content Wrapper --- */}
      <main className="relative w-full z-10">
        {/* =========================================
            HERO SECTION
           ========================================= */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-24 pb-12">
          {/* 2. THE FIX: Smooth Vertical Shadow
              Replaced the weird circle gradient with a smooth vertical fade.
              Dark at the top (behind text), clear in the middle, dark at the bottom.
          */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/90 pointer-events-none z-0"></div>

          {/* Star pattern */}
          <div
            className="absolute inset-0 opacity-20 z-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* Hero Content */}
          <div className="relative z-10 w-full max-w-6xl mx-auto text-center space-y-6 md:space-y-8 mt-10">
            {/* 3. THE FIX: Headline Wrapping
                Removed the strict block spans. Applied the gradient directly to the h1.
                Used <br className="hidden md:block" /> so it flows naturally on phones
                but forces a 2-line break on laptops.
            */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.2] md:leading-[1.1] drop-shadow-2xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 pb-2 px-2"
            >
              Built by Developers. Driven <br className="hidden md:block" /> by
              Data. Powered by AI.
            </motion.h1>

            {/* Subheadline (Added px-4 so it doesn't hug the screen edges on mobile) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4 drop-shadow-md"
            >
              We created AREMU GROUP to give every entrepreneur the tools and
              confidence to start or grow faster with decisions powered by real
              data and proven strategies.
            </motion.p>

            {/* --- AI Popup Component --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="w-full flex justify-center py-4 drop-shadow-2xl"
            >
              <AiPopup />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-2 px-4"
            >
              <button className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-semibold bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Start Building
              </button>
              <button className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-semibold text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200 backdrop-blur-sm bg-black/30">
                View Demo
              </button>
            </motion.div>
          </div>
        </section>

        {/* =========================================
                    ABOUT SECTION (Text + Orbital Timeline)
                   ========================================= */}
        <AboutSection />
      </main>
    </div>
  );
}

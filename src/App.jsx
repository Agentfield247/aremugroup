import React from "react";
import Navbar from "./components/Navbar";
import AiPopup from "./components/AiPopup"; // 1. Imported the new component
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      {/* --- Navigation --- */}
      <Navbar />

      {/* --- Main Content Wrapper --- */}
      <main className="relative w-full">
        {/* =========================================
            HERO SECTION
           ========================================= */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-12">
          {/* 1. Background Effects */}
          {/* A deep radial gradient to give the black background some depth */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/40 via-black to-black pointer-events-none"></div>

          {/* Tiny stars effect using a simple repeating radial gradient */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          {/* 2. Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
            {/* Main Headline with Gradient Text */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                Built by Developers. Driven by Data.
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                Powered by AI.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              We created AREMU GROUP to give every e-commerce entrepreneur the
              tools and confidence to start or grow faster with decisions
              powered by real data and proven strategies.
            </motion.p>

            {/* --- AI Popup Component (Added Here) --- */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }} // Delays it to appear after text
              className="w-full flex justify-center py-2"
            >
              <AiPopup />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }} // Delayed to appear last
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button className="px-8 py-4 rounded-full text-base font-semibold bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Start Building
              </button>
              <button className="px-8 py-4 rounded-full text-base font-semibold text-white border border-white/20 hover:bg-white/10 hover:border-white/40 transition-all duration-200 backdrop-blur-sm">
                View Demo
              </button>
            </motion.div>
          </div>

          {/* 3. Bottom Gradient Fade to blend into next section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none"></div>
        </section>

        {/* =========================================
            NEXT SECTION (ABOUT VIDEO) GOES HERE
           ========================================= */}
        <section
          id="about-video"
          className="min-h-screen bg-black flex items-center justify-center"
        >
          <h2 className="text-gray-500">Video Section Coming Soon...</h2>
        </section>
      </main>
    </div>
  );
}

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AiPopup() {
  const [isLinkPopupOpen, setIsLinkPopupOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [links, setLinks] = useState(["", ""]); // Start with 2 empty link slots

  // Function to trigger the hidden file input
  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  // Function to add a new empty link input
  const addLinkSlot = () => {
    setLinks([...links, ""]);
  };

  return (
    // Outer Glow Container - White/Silver Theme
    <div className="relative w-full max-w-3xl mx-auto my-8 group z-20">
      {/* The glowing white background effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-white/20 via-gray-400/20 to-white/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>

      {/* Main Glass Container */}
      <div className="relative w-full bg-[#0A0A0A]/95 backdrop-blur-2xl rounded-2xl overflow-visible border border-white/10 shadow-2xl shadow-white/5">
        {/* 1. Top Bar: IPFT Protection Policy */}
        <div className="flex flex-wrap items-center justify-center gap-2 px-4 py-3 border-b border-white/10 bg-white/[0.02]">
          {/* Shield Icon (Added shrink-0 so it never squishes) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="shrink-0 text-gray-400"
          >
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          </svg>

          {/* Text */}
          <span className="text-xs sm:text-sm text-gray-400">
            Your ideas are protected by
          </span>

          {/* IPFT Policy Clickable Pill (Added whitespace-nowrap so the text inside doesn't break) */}
          <button className="px-3 py-1 text-[10px] sm:text-xs font-medium text-white bg-white/10 border border-white/20 rounded-full hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-all duration-200 whitespace-nowrap cursor-pointer">
            IPFT Policy
          </button>
        </div>

        {/* 2. Main Input Area */}
        <div className="relative group/input p-4 md:p-6">
          <textarea
            placeholder="Describe your vision..."
            className="w-full h-32 bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none text-base md:text-lg p-2 leading-relaxed"
            style={{ caretColor: "#ffffff" }}
          />

          {/* Bottom Toolbar */}
          <div className="flex items-center justify-between mt-2 relative">
            {/* Left Side: Attachments */}
            <div className="flex items-center gap-3">
              {/* PLUS (+) Button - Opens File Explorer */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => console.log(e.target.files)}
              />
              <button
                onClick={handleFileClick}
                className="p-2 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all"
                title="Upload File"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
              </button>

              {/* LINKS Button - Opens Popup */}
              <div className="relative">
                <button
                  onClick={() => setIsLinkPopupOpen(!isLinkPopupOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all ${isLinkPopupOpen ? "bg-white text-black border-white" : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10"}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Links
                </button>

                {/* --- LINKS POPUP MODAL --- */}
                <AnimatePresence>
                  {isLinkPopupOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute bottom-full left-0 mb-3 w-72 bg-[#111] border border-white/20 rounded-xl shadow-2xl shadow-black/50 p-4 z-50 backdrop-blur-xl"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Add References
                        </span>
                        <button
                          onClick={() => setIsLinkPopupOpen(false)}
                          className="text-gray-500 hover:text-white"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                        {links.map((link, index) => (
                          <input
                            key={index}
                            type="text"
                            placeholder={`Paste Link ${index + 1}...`}
                            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
                          />
                        ))}
                      </div>

                      <button
                        onClick={addLinkSlot}
                        className="w-full mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white hover:bg-white/5 py-2 rounded-lg transition-colors border border-dashed border-white/10 hover:border-white/30"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </svg>
                        Add another link
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Microphone & Send Icons */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" x2="12" y1="19" y2="22" />
                </svg>
              </button>

              {/* Send Button - White/Silver Theme */}
              <button className="p-3 rounded-full bg-white hover:bg-gray-200 text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transform hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

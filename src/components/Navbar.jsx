import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  // State for active tab and mobile menu toggle
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Legal", href: "#about-video" },
    { name: "Departments", href: "/opportunity" },
    { name: "About", href: "/legals" },
  ];

  // Handles clicking a link: sets the active tab and closes the mobile menu
  const handleNavClick = (linkName) => {
    setActiveTab(linkName);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-8 py-4 md:py-5 text-white bg-black/20 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-b border-white/5 md:border-none">
      {/* 1. Left: Logo Section */}
      <div className="flex items-center gap-3 cursor-pointer z-50">
        <svg
          width="32"
          height="20"
          className="md:w-10 md:h-6"
          viewBox="0 0 40 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 2C0 0.895431 0.895431 0 2 0H38C39.1046 0 40 0.895431 40 2C40 3.10457 39.1046 4 38 4H2C0.89543 4 0 3.10457 0 2Z"
            fill="#FCA5A5"
          />
          <path
            d="M4 8C4 6.89543 4.89543 6 6 6H34C35.1046 6 36 6.89543 36 8C36 9.10457 35.1046 10 34 10H6C4.89543 10 4 9.10457 4 8Z"
            fill="#F87171"
          />
          <path
            d="M9 14C9 12.8954 9.89543 12 11 12H29C30.1046 12 31 12.8954 31 14C31 15.1046 30.1046 16 29 16H11C9.89543 16 9 15.1046 9 14Z"
            fill="#C084FC"
          />
          <path
            d="M14 20C14 18.8954 14.8954 18 16 18H24C25.1046 18 26 18.8954 26 20C26 21.1046 25.1046 22 24 22H16C14.8954 22 14 21.1046 14 20Z"
            fill="#A855F7"
          />
        </svg>
        <span className="text-xl md:text-2xl font-bold tracking-tight">
          Aremu Group
        </span>
      </div>

      {/* 2. Center: Desktop Glassmorphism Navigation */}
      <div className="hidden md:flex items-center bg-[#1a1a1a]/60 backdrop-blur-md border border-white/10 rounded-full p-1 relative z-50">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => handleNavClick(link.name)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === link.name
                ? "text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            {activeTab === link.name && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-[#333333] rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            <span className="relative z-10">{link.name}</span>
          </a>
        ))}
      </div>

      {/* 3. Right: Action Buttons & Mobile Hamburger */}
      <div className="flex items-center gap-4 md:gap-6 z-50">
        <a
          href="/login"
          className="hidden md:block text-sm font-medium text-white/80 hover:text-white transition-colors"
        >
          Sign In
        </a>
        {/* Kept visible on mobile for quick conversions */}
        <button className="px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium bg-[#111111]/80 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-200">
          Get Started
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 4. Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-[#111111]/95 backdrop-blur-xl border-b border-white/10 flex flex-col py-6 px-6 gap-4 md:hidden z-40"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleNavClick(link.name)}
                className={`text-lg font-medium py-2 transition-colors ${
                  activeTab === link.name
                    ? "text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="w-full h-[1px] bg-white/10 my-2"></div>
            <a
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium text-white/80 py-2 hover:text-white transition-colors"
            >
              Sign In
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

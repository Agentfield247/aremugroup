import React from "react";
import { Twitter, Linkedin, Github, Mail, ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-black border-t border-white/10 pt-20 pb-10 overflow-hidden z-10">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-32 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-20">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Newsletter (Takes up 4 columns on desktop) */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-2xl font-bold tracking-tight text-white">
              AREMU GROUP.
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Transforming ideas into fully operational businesses through
              governed, transparent, and AI-accelerated systems.
            </p>

            {/* Newsletter Input */}
            <div className="pt-2">
              <p className="text-white text-sm font-semibold mb-3">
                Subscribe to updates
              </p>
              <div className="flex items-center relative max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-zinc-900/50 border border-white/10 text-white text-sm rounded-full px-4 py-3 outline-none focus:border-white/30 transition-colors"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-white text-black px-4 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Developers & Resources */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h4 className="text-white font-semibold mb-6 tracking-wide">
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/docs"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="/guide"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  User Guide
                </a>
              </li>
              <li>
                <a
                  href="/development"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Development & API
                </a>
              </li>
              <li>
                <a
                  href="/status"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  System Status
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Explore */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-wide">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/sitemap"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Site Map
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 tracking-wide">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="/terms"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Use
                </a>
              </li>
              <li>
                <a
                  href="/policy"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/cookies"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 gap-6">
          <p className="text-gray-500 text-sm text-center md:text-left">
            © {currentYear} Aremu Group. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="mailto:hello@aremugroup.com"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/5 hover:text-white transition-all"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { useState } from "react";
import { WorldMap } from "./ui/world-map";

export default function GlobalReach() {
  const [activeLocation, setActiveLocation] = useState(null);

  // Your individual projects/brands
  const brandData = [
    {
      id: "sf",
      name: "San Francisco, USA",
      brand: "TechFlow AI",
      lat: 37.7749,
      lng: -122.4194,
    },
    {
      id: "ny",
      name: "New York, USA",
      brand: "Nexus Capital",
      lat: 40.7128,
      lng: -74.006,
    },
    {
      id: "london",
      name: "London, UK",
      brand: "FinScale",
      lat: 51.5074,
      lng: -0.1278,
    },
    {
      id: "lagos",
      name: "Lagos, Nigeria",
      brand: "FADYAH Pay",
      lat: 6.5244,
      lng: 3.3792,
    },
    {
      id: "dubai",
      name: "Dubai, UAE",
      brand: "Aura Global",
      lat: 25.2048,
      lng: 55.2708,
    },
    {
      id: "singapore",
      name: "Singapore",
      brand: "LogisTech",
      lat: 1.3521,
      lng: 103.8198,
    },
  ];

  return (
    <section className="relative w-full py-16 md:py-32 bg-black border-t border-white/10 overflow-hidden z-10">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 md:mb-4">
            Global Impact.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Engineering operational systems for innovative brands worldwide.
          </p>
        </div>

        {/* 1. THE MAP COMPONENT */}
        {/* Removed the border, background, and padding classes here so it blends seamlessly */}
        <div className="relative w-full mx-auto mb-10">
          <WorldMap
            locations={brandData}
            lineColor="#ffffff"
            activeLocation={activeLocation}
            setActiveLocation={setActiveLocation}
          />
        </div>

        {/* 2. THE BRAND SELECTOR STRIP */}
        <div className="w-full relative z-20">
          {/* Edge Gradients for smooth scrolling visuals */}
          <div className="absolute left-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 md:w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling Brand List - Mobile Optimized */}
          <div className="flex overflow-x-auto gap-3 pb-8 pt-2 px-6 hide-scrollbar snap-x snap-mandatory touch-pan-x justify-start lg:justify-center">
            {brandData.map((loc) => {
              const isActive = activeLocation === loc.id;

              return (
                <button
                  key={loc.id}
                  onClick={() => setActiveLocation(isActive ? null : loc.id)}
                  className={`snap-center flex-shrink-0 flex flex-col items-start px-6 py-4 rounded-2xl border transition-all duration-300 min-w-[180px] text-left cursor-pointer ${
                    isActive
                      ? "bg-white text-black border-white scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-zinc-900/40 border-white/5 text-gray-400 hover:border-white/20 hover:bg-zinc-800/50"
                  }`}
                >
                  <span
                    className={`text-xs font-black uppercase tracking-[0.15em] mb-1 transition-colors ${isActive ? "text-black" : "text-white"}`}
                  >
                    {loc.brand}
                  </span>
                  <span
                    className={`text-[11px] font-medium transition-colors ${isActive ? "text-black/60" : "text-gray-500"}`}
                  >
                    {loc.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hide default scrollbars but maintain scrolling functionality */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </section>
  );
}

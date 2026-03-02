"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DottedMap from "dotted-map";

export function WorldMap({
  locations = [],
  lineColor = "#ffffff",
  activeLocation,
  setActiveLocation,
}) {
  // 1. Generate the dotted map grid
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: "#FFFFFF40", // Dark mode background dots
      shape: "circle",
      backgroundColor: "black",
    });
  }, []);

  // 2. Helper to convert Lat/Lng to X/Y coordinates on our SVG
  const projectPoint = (lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  return (
    // Adjusted aspect ratio: Taller on mobile (4/3) to make dots clickable, wide on desktop (2.5/1)
    <div className="w-full aspect-[4/3] sm:aspect-[2/1] lg:aspect-[2.5/1] bg-black rounded-3xl relative font-sans overflow-hidden">
      {/* Background Dotted Map Image */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full pointer-events-none select-none object-cover [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)]"
        alt="world map"
        draggable={false}
      />

      {/* Interactive SVG Layer */}
      <svg
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-auto select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow">
            <feMorphology operator="dilate" radius="0.5" />
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Render individual project locations */}
        {locations.map((loc, i) => {
          const point = projectPoint(loc.lat, loc.lng);
          const isActive = activeLocation === loc.id;

          return (
            <g
              key={`point-${i}`}
              onClick={() => setActiveLocation(isActive ? null : loc.id)}
              className="cursor-pointer"
            >
              {/* Outer Pulsing Ring */}
              <circle
                cx={point.x}
                cy={point.y}
                r={isActive ? "6" : "3"}
                fill={lineColor}
                opacity="0.4"
              >
                <animate
                  attributeName="r"
                  from={isActive ? "6" : "3"}
                  to={isActive ? "20" : "12"}
                  dur={isActive ? "1.5s" : "2.5s"}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from={isActive ? "0.8" : "0.5"}
                  to="0"
                  dur={isActive ? "1.5s" : "2.5s"}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Solid Inner Dot */}
              <circle
                cx={point.x}
                cy={point.y}
                r={isActive ? "4" : "2.5"}
                fill={lineColor}
                filter="url(#glow)"
                className="transition-all duration-300"
              />

              {/* Floating Label on Map (Shows when active) */}
              <AnimatePresence>
                {isActive && (
                  <motion.g
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="pointer-events-none"
                  >
                    <text
                      x={point.x}
                      y={point.y - 15}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="14"
                      fontWeight="bold"
                      className="drop-shadow-lg"
                    >
                      {loc.brand}
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

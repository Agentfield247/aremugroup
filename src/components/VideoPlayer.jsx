import React from "react";
import { motion } from "framer-motion";

const VideoPlayer = ({ desktopSrc, mobileSrc }) => {
  // Smart URL converter that handles standard videos AND YouTube Shorts
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtu.be/")) {
      return `https://www.youtube.com/embed/${url.split("youtu.be/")[1].split("?")[0]}`;
    }
    if (url.includes("watch?v=")) {
      return `https://www.youtube.com/embed/${url.split("watch?v=")[1].split("&")[0]}`;
    }
    if (url.includes("shorts/")) {
      return `https://www.youtube.com/embed/${url.split("shorts/")[1].split("?")[0]}`;
    }
    return url;
  };

  const desktopEmbed = getYouTubeEmbedUrl(desktopSrc);
  // If no mobile video is provided, it safely falls back to the desktop video
  const mobileEmbed = getYouTubeEmbedUrl(mobileSrc || desktopSrc);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-[#111] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.4)] group mx-auto"
    >
      {/* Subtle top reflection effect for that premium glass look */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-10"></div>

      {/* =========================================
          1. DESKTOP VIEW (16:9 Cinematic Aspect)
          Hidden on mobile screens, visible on md and up
          ========================================= */}
      <div className="hidden md:block relative w-full aspect-video bg-black z-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full z-0"
          src={`${desktopEmbed}?rel=0&modestbranding=1`}
          title="Desktop Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* =========================================
          2. MOBILE VIEW (9:16 Vertical Short Aspect)
          Visible on mobile screens, hidden on md and up
          ========================================= */}
      <div className="block md:hidden relative w-full aspect-[9/16] bg-black z-0 max-w-sm mx-auto">
        <iframe
          className="absolute top-0 left-0 w-full h-full z-0"
          src={`${mobileEmbed}?rel=0&modestbranding=1`}
          title="Mobile Video Player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </motion.div>
  );
};

export default VideoPlayer;

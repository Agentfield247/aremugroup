import React from "react";
import RadialOrbitalTimeline from "./RadialOrbitalTimeline";
import VideoPlayer from "./VideoPlayer";
import {
  Brain,
  Brush,
  Code,
  Layers,
  TrendingUp,
  Briefcase,
  ShieldCheck,
} from "lucide-react";

export default function AboutSection() {
  // Custom Data mapped exactly from Aremu Group Departmental Architecture
  const aremuDepartments = [
    {
      id: 1,
      title: "AI Research",
      date: "Dept 1",
      content:
        "Transforms ideas into structured, research-backed business blueprints.",
      category: "Strategy",
      icon: Brain,
      relatedIds: [2, 3],
      status: "required",
      allocation: 80,
    },
    {
      id: 2,
      title: "Brand & Identity",
      date: "Dept 2",
      content:
        "Builds cohesive brand systems that position businesses for growth.",
      category: "Creative",
      icon: Brush,
      relatedIds: [1, 5],
      status: "required",
      allocation: 50,
    },
    {
      id: 3,
      title: "Engineering",
      date: "Dept 3",
      content: "Builds scalable, secure, and high-performance digital systems.",
      category: "Development",
      icon: Code,
      relatedIds: [1, 4],
      status: "required",
      allocation: 95,
    },
    {
      id: 4,
      title: "Architecture",
      date: "Dept 4",
      content: "Designs technical frameworks and scalable system structures.",
      category: "Infrastructure",
      icon: Layers,
      relatedIds: [3, 6],
      status: "required",
      allocation: 90,
    },
    {
      id: 5,
      title: "Marketing",
      date: "Dept 5",
      content: "Drives visibility, acquisition, and revenue growth strategies.",
      category: "Growth",
      icon: TrendingUp,
      relatedIds: [2, 6],
      status: "optional",
      allocation: 40,
    },
    {
      id: 6,
      title: "Operations",
      date: "Dept 6",
      content: "Ensures structured execution and operational efficiency.",
      category: "Management",
      icon: Briefcase,
      relatedIds: [1, 4, 7],
      status: "required",
      allocation: 75,
    },
    {
      id: 7,
      title: "Governance",
      date: "Dept 7",
      content:
        "Protects intellectual property and enforces operational standards.",
      category: "Legal",
      icon: ShieldCheck,
      relatedIds: [1, 6],
      status: "required",
      allocation: 60,
    },
  ];

  return (
    <section
      id="about-video"
      // FIXED: Removed min-h-screen for mobile, reduced padding to py-10, reduced gap to gap-8
      className="relative w-full md:min-h-screen bg-black border-t border-white/10 flex flex-col items-center justify-start px-4 md:px-12 lg:px-24 py-10 md:py-32 overflow-hidden z-10 gap-8 md:gap-24"
    >
      {/* 1. TOP SECTION: Cinematic Video Player */}
      <div className="w-full max-w-[1400px] mx-auto z-20">
        <div className="w-full relative px-2 sm:px-0">
          <VideoPlayer
            desktopSrc="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            mobileSrc="https://www.youtube.com/shorts/5Hvw2BvVlqE"
          />
        </div>
      </div>

      {/* 2. BOTTOM SECTION: Text and Timeline Split */}
      {/* FIXED: Reduced mt-10 to mt-2 on mobile */}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-8 md:gap-8 mt-2 md:mt-10">
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 space-y-4 md:space-y-6 z-20 lg:pr-10 text-center lg:text-left">
          <h3 className="text-2xl md:text-4xl font-bold tracking-tight text-white drop-shadow-lg">
            Transforming Ideas Into <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
              Operational Systems.
            </span>
          </h3>

          <div className="space-y-4 text-sm md:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
            <p>
              At Aremu Group, we transform ideas into fully operational
              businesses. Through a governed, transparent system, we protect
              client IP and organize execution across specialized departments.
              By combining structured analysis, professional oversight, and
              AI-accelerated workflows, we deliver enterprise-level development
              to turn your concepts into scalable companies.
            </p>
          </div>

          {/* FIXED: Reduced pb-12 to pb-4 on mobile */}
          <div className="pt-4 pb-4 lg:pb-0">
            <a
              href="/about"
              className="inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold bg-white text-black hover:bg-gray-200 hover:scale-105 transition-all duration-200 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Learn More About Us
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
                className="ml-2"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: Interactive Orbital Timeline */}
        {/* FIXED: Reduced height slightly for mobile so it takes up less space */}
        <div className="w-full lg:w-1/2 h-[380px] sm:h-[550px] relative z-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
          <RadialOrbitalTimeline timelineData={aremuDepartments} />
        </div>
      </div>
    </section>
  );
}

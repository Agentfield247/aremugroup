import React from "react";
import RadialOrbitalTimeline from "./RadialOrbitalTimeline";
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
      status: "in-progress",
      energy: 95,
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
      status: "pending",
      energy: 80,
    },
    {
      id: 3,
      title: "Engineering",
      date: "Dept 3",
      content: "Builds scalable, secure, and high-performance digital systems.",
      category: "Development",
      icon: Code,
      relatedIds: [1, 4],
      status: "pending",
      energy: 100,
    },
    {
      id: 4,
      title: "Architecture",
      date: "Dept 4",
      content: "Designs technical frameworks and scalable system structures.",
      category: "Infrastructure",
      icon: Layers,
      relatedIds: [3, 6],
      status: "pending",
      energy: 85,
    },
    {
      id: 5,
      title: "Marketing",
      date: "Dept 5",
      content: "Drives visibility, acquisition, and revenue growth strategies.",
      category: "Growth",
      icon: TrendingUp,
      relatedIds: [2, 6],
      status: "pending",
      energy: 75,
    },
    {
      id: 6,
      title: "Operations",
      date: "Dept 6",
      content: "Ensures structured execution and operational efficiency.",
      category: "Management",
      icon: Briefcase,
      relatedIds: [1, 4, 7],
      status: "completed",
      energy: 90,
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
      status: "completed",
      energy: 100,
    },
  ];

  return (
    // THE FIX: Added flex-col-reverse so the timeline (2nd item) shows up first on mobile
    <section
      id="about-video"
      className="relative w-full min-h-screen bg-black border-t border-white/10 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-16 md:py-20 overflow-hidden z-10"
    >
      {/* Left Column: Text Content */}
      <div className="w-full md:w-1/2 space-y-6 z-20 md:pr-10 mt-8 md:mt-0">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
          Transforming Ideas Into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">
            Operational Systems.
          </span>
        </h2>

        <div className="space-y-4 text-base md:text-lg text-gray-400 leading-relaxed max-w-xl">
          <p>
            At Aremu Group, we transform ideas into fully operational
            businesses. Through a governed, transparent system, we protect
            client IP and organize execution across specialized departments. By
            combining structured analysis, professional oversight, and
            AI-accelerated workflows, we deliver enterprise-level development to
            turn your concepts into scalable companies.
          </p>
        </div>

        <div className="pt-4 pb-12 md:pb-0">
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
      {/* Increased height on mobile to make room for the larger orbit */}
      <div className="w-full md:w-1/2 h-[450px] sm:h-[550px] md:h-screen relative z-10 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
        <RadialOrbitalTimeline timelineData={aremuDepartments} />
      </div>
    </section>
  );
}

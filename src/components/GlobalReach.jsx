import React from "react";

export default function GlobalReach() {
  const projects = [
    {
      title: "Acada-Bridge",
      url: "acadabridge.ng",
      description: "Engineered a comprehensive research intelligence platform.",
    },
    {
      title: "QuaaPay",
      url: "quaapay.com",
      description:
        "Managed and integrated a seamless payment application and currency exchange.",
    },
    {
      title: "Adé",
      url: "adescents.com",
      description: "Developed the digital presence for a custom perfume brand.",
    },
    {
      title: "Eppiso",
      description: "Built a high-performance video streaming application.",
    },
    {
      title: "V9 Studios",
      url: "v9er.com",
      description:
        "Designed a dynamic portfolio website for an art and animation studio.",
    },
    {
      title: "BPM CTRL",
      url: "bpmctrl.com",
      description:
        "Created the digital identity, mascot, and branding for a popup party and clothing brand.",
    },
    {
      title: "Khatamly",
      url: "khatamly.app",
      description: "Developed a functional and scalable Quran application.",
    },
    {
      title: "AREMU Group",
      url: "aremugroup.com",
      description: "Built the corporate website and navigation architecture.",
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 bg-black border-t border-white/10 overflow-hidden z-10">
      <div className="text-center mb-10 md:mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3 md:mb-4">
          Our Projects.
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          Transforming concepts into fully operational systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto px-4 md:px-8">
        {projects.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
}

const Feature = ({ title, description, index }) => {
  return (
    <div
      className={`flex flex-col py-10 relative group/feature border-white/10 lg:border-r
        ${index === 0 || index === 4 ? "lg:border-l" : ""}
        ${index < 4 ? "lg:border-b" : ""}
      `}
    >
      {/* Top row hover gradient */}
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
      )}

      {/* Bottom row hover gradient */}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-500 absolute inset-0 h-full w-full bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
      )}

      {/* Content */}
      <div className="text-lg font-bold mb-3 relative z-10 px-8">
        {/* Animated side bar */}
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/20 group-hover/feature:bg-white transition-all duration-300 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-300 inline-block text-white">
          {title}
        </span>
      </div>

      <p className="text-sm text-gray-400 max-w-xs relative z-10 px-8 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

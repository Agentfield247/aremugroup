import React from "react";
import { motion } from "framer-motion";

// --- MOCK DATA ---
const col1 = [
  {
    text: "AREMU Group completely transformed our operational backend. The AI department routing is absolute genius.",
    name: "Sarah Jenkins",
    role: "CTO, TechFlow",
    image: "https://i.pravatar.cc/150?u=sarah",
  },
  {
    text: "We saved months of planning just by using their execution roadmap. It's like having a senior PM on demand.",
    name: "David Chen",
    role: "Founder, InnovateX",
    image: "https://i.pravatar.cc/150?u=david",
  },
  {
    text: "The sheer accuracy of the budget and time estimates gave our investors total confidence to fund our next round.",
    name: "Aisha Bello",
    role: "VP Engineering, PayStack",
    image: "https://i.pravatar.cc/150?u=aisha",
  },
];

const col2 = [
  {
    text: "It seamlessly integrated with our existing API. The platform is robust, fast, and incredibly intuitive.",
    name: "Marcus Thorne",
    role: "Lead Developer",
    image: "https://i.pravatar.cc/150?u=marcus",
  },
  {
    text: "The exponential AI research scaling feature was exactly what we needed to aggressively push our launch date.",
    name: "Elena Rodriguez",
    role: "Product Manager",
    image: "https://i.pravatar.cc/150?u=elena",
  },
  {
    text: "I've never seen an organizational chart generated so perfectly from just a few sentences of project vision.",
    name: "Oti James",
    role: "CEO, Makaju",
    image: "https://i.pravatar.cc/150?u=oti",
  },
];

const col3 = [
  {
    text: "A game changer for our agency. We spin up project scopes in 5 minutes instead of 5 days.",
    name: "Liam Wright",
    role: "Director, V9 Studios",
    image: "https://i.pravatar.cc/150?u=liam",
  },
  {
    text: "Clean interface, powerful backend, and the dark mode aesthetic is just beautifully executed.",
    name: "Sophia Kim",
    role: "UX Lead",
    image: "https://i.pravatar.cc/150?u=sophia",
  },
  {
    text: "AREMU's automated blueprints prevented us from overhiring. We knew exactly how many engineers we actually needed.",
    name: "Tunde Alabi",
    role: "Operations, LogisTech",
    image: "https://i.pravatar.cc/150?u=tunde",
  },
];

// --- THE SCROLLING COLUMN COMPONENT ---
const TestimonialsColumn = ({
  className = "",
  testimonials,
  duration = 15,
  reverse = false,
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{
          translateY: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2).fill(0)].map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-8 rounded-3xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)] max-w-xs w-full hover:border-white/20 transition-colors"
                key={i}
              >
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  "{text}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full border border-white/20 object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="font-bold text-white text-sm tracking-tight">
                      {name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

// --- MAIN WRAPPER COMPONENT ---
export default function Testimonials() {
  return (
    <section className="relative w-full py-20 md:py-32 bg-black border-t border-white/10 overflow-hidden z-10">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 relative z-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Trusted by Innovators.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            See how teams are accelerating their development cycles with our
            AI-driven operational blueprints.
          </p>
        </div>

        {/* Scrolling Grid
          - Mobile: 1 column
          - Tablet: 2 columns
          - Desktop: 3 columns
          The mask-image creates the smooth fade effect at the top and bottom!
        */}
        <div className="flex justify-center gap-6 h-[600px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
          <TestimonialsColumn testimonials={col1} duration={20} />
          <TestimonialsColumn
            testimonials={col2}
            duration={25}
            reverse={true}
            className="hidden md:block"
          />
          <TestimonialsColumn
            testimonials={col3}
            duration={22}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}

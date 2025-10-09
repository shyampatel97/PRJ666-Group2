// components/StatsSection.js

import React, { useEffect, useRef, useState } from "react";

const StatsSection = () => {
  const sectionRef = useRef(null);
  const statsRef = useRef([]);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    { label: "Accuracy Rate", value: 98, suffix: "%", color: "#283618" },
    { label: "Yield Increase", value: 35, suffix: "%", color: "#283618" },
    { label: "Number of Species", value: 70000, suffix: "+", color: "#283618" },
  ];

  useEffect(() => {
    // Dynamically import GSAP only on client-side
    const loadGsap = async () => {
      if (typeof window === "undefined") return;

      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        statsRef.current.forEach((el, i) => {
          if (!el) return;

          const obj = { val: 0 };
          gsap.to(obj, {
            val: stats[i].value,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true, // THIS ENSURES IT ONLY ANIMATES ONCE
              onEnter: () => setHasAnimated(true),
            },
            onUpdate: () => {
              el.textContent = i === 2
                ? Math.floor(obj.val / 1000) + "K+"
                : Math.floor(obj.val) + stats[i].suffix;
            },
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    };

    loadGsap();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-15 bg-[#ffffff] flex flex-col items-center text-center"
    >
      {/* Section Title */}
      <h2 className="text-4xl md:text-7xl font-extrabold text-[#DDA15E] mb-10">
        Performance Stats
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {stats.map((stat, i) => (
          <div key={i}>
            <div
              ref={(el) => (statsRef.current[i] = el)}
              className="text-[9rem] md:text-[8rem] font-extrabold"
              style={{ color: stat.color }}
            >
              0
            </div>
            <p className="mt-4 text-2xl md:text-4xl font-semibold text-[#283618]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
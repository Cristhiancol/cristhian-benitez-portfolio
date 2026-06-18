import { useEffect, useRef, useState } from "react";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  description: string[];
  achievements: string[];
  isLeft?: boolean;
  index: number;
}

export default function TimelineItem({
  title,
  company,
  period,
  description,
  achievements,
  isLeft = false,
  index,
}: TimelineItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-6 md:gap-10 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline dot and line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-[#0B1215] border-2 border-[#5EEAD4] shadow-[0_0_10px_rgba(94,234,212,0.3)] z-10" />
        <div className="w-0.5 flex-1 bg-gradient-to-b from-[#5EEAD4]/40 to-transparent min-h-[40px]" />
      </div>

      {/* Content */}
      <div className="glass-card rounded-lg p-5 md:p-6 border border-[#5EEAD4]/15 hover:border-[#5EEAD4]/40 transition-all duration-500 flex-1 mb-8 group">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
          <div>
            <h3
              className="text-lg md:text-xl font-bold text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {title}
            </h3>
            <p className="text-[#5EEAD4] font-medium text-sm md:text-base">{company}</p>
          </div>
          <span
            className="text-xs md:text-sm text-[#F5A623] font-mono bg-[#F5A623]/10 px-3 py-1 rounded-full border border-[#F5A623]/20 self-start"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {period}
          </span>
        </div>

        <ul className="space-y-1.5 mb-4">
          {description.map((item, i) => (
            <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
              <span className="text-[#5EEAD4] mt-1 text-xs">&#9654;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {achievements.length > 0 && (
          <div className="border-t border-[#5EEAD4]/10 pt-3 mt-3">
            <p className="text-xs uppercase tracking-widest text-[#F5A623] mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Logros Destacados
            </p>
            <ul className="space-y-1.5">
              {achievements.map((a, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-[#F5A623] mt-1 text-xs">&#9733;</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

interface SkillBarProps {
  name: string;
  level: number;
  color?: "cyan" | "green" | "gold";
  delay?: number;
}

export default function SkillBar({ name, level, color = "cyan", delay = 0 }: SkillBarProps) {
  const [width, setWidth] = useState(0);
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
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = setTimeout(() => setWidth(level), delay);
    return () => clearTimeout(timer);
  }, [isVisible, level, delay]);

  const gradients = {
    cyan: "from-[#00f0ff] to-[#0080ff]",
    green: "from-[#39ff14] to-[#00cc88]",
    gold: "from-[#ffd700] to-[#ff8c00]",
  };

  const glows = {
    cyan: "shadow-[0_0_10px_#00f0ff60]",
    green: "shadow-[0_0_10px_#39ff1460]",
    gold: "shadow-[0_0_10px_#ffd70060]",
  };

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-gray-300 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          {name}
        </span>
        <span
          className="text-xs text-gray-500 font-mono"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {level}%
        </span>
      </div>
      <div className="h-2 bg-[#1a1a2e] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradients[color]} ${glows[color]} transition-all duration-1500 ease-out`}
          style={{ width: `${width}%`, transitionDuration: "1.5s" }}
        />
      </div>
    </div>
  );
}

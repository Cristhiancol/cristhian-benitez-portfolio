import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  color?: "cyan" | "green" | "gold";
}

export default function AnimatedCounter({
  end,
  suffix = "%",
  prefix = "",
  duration = 2000,
  label,
  color = "cyan",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
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

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const colorClasses = {
    cyan: "neon-text-cyan",
    green: "neon-text-green",
    gold: "neon-text-gold",
  };

  const borderClasses = {
    cyan: "border-[#00f0ff]/30 hover:border-[#00f0ff]/60",
    green: "border-[#39ff14]/30 hover:border-[#39ff14]/60",
    gold: "border-[#ffd700]/30 hover:border-[#ffd700]/60",
  };

  return (
    <div
      ref={ref}
      className={`glass-card rounded-lg p-6 border ${borderClasses[color]} transition-all duration-500 text-center group`}
    >
      <div
        className={`text-4xl md:text-5xl font-bold ${colorClasses[color]} transition-all duration-300`}
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {prefix}
        {count}
        {suffix}
      </div>
      <p className="text-sm md:text-base text-gray-400 mt-3 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </p>
    </div>
  );
}

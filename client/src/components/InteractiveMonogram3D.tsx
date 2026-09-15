import { useState, useRef, useEffect } from "react";

interface InteractiveMonogram3DProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

/**
 * InteractiveMonogram3D — Skill: muapi-3d-logo-animation & emil-design-eng
 * Interactive 3D holographic monogram for "CB" (Cristhian Benitez)
 * Responds to mouse coordinates with 3D perspective rotation, lighting and glow.
 */
export default function InteractiveMonogram3D({
  size = 40,
  className = "",
  showText = false,
}: InteractiveMonogram3DProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotX = ((y - centerY) / centerY) * -18;
    const rotY = ((x - centerX) / centerX) * 18;
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center gap-2.5 select-none cursor-pointer group ${className}`}
      style={{ perspective: 600 }}
      title="Cristhian Benitez — 3D Holographic Monogram"
    >
      <div
        className="relative flex items-center justify-center rounded-xl transition-transform duration-200 ease-out"
        style={{
          width: size,
          height: size,
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.08 : 1}, ${isHovered ? 1.08 : 1}, 1)`,
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(17,26,30,0.9), rgba(8,14,18,0.95))",
          border: isHovered ? "1px solid rgba(0, 240, 255, 0.6)" : "1px solid rgba(0, 240, 255, 0.2)",
          boxShadow: isHovered
            ? "0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 12px rgba(0, 240, 255, 0.2)"
            : "0 4px 12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        }}
      >
        {/* Dynamic Specular Glare */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.6 : 0.15,
            background: `radial-gradient(circle at ${50 + rotate.y * 2}% ${50 - rotate.x * 2}%, rgba(255,255,255,0.4), transparent 60%)`,
          }}
        />

        {/* Orbit Ring */}
        <div
          className="absolute inset-[-3px] rounded-xl pointer-events-none border border-cyan-400/20 transition-all duration-300"
          style={{
            transform: "translateZ(10px)",
            borderColor: isHovered ? "rgba(0, 240, 255, 0.5)" : "rgba(0, 240, 255, 0.15)",
          }}
        />

        {/* 3D CB Monogram Letters */}
        <span
          className="font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-[#00f0ff] via-[#5eead4] to-[#10b981]"
          style={{
            fontSize: size * 0.44,
            fontFamily: "'Space Grotesk', monospace, sans-serif",
            transform: "translateZ(18px)",
            textShadow: isHovered ? "0 0 12px rgba(0, 240, 255, 0.6)" : "none",
          }}
        >
          CB
        </span>

        {/* Status dot in bottom corner */}
        <span
          className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00f0ff] border-2 border-[#080e12] transition-transform duration-200"
          style={{
            transform: "translateZ(25px)",
            boxShadow: "0 0 8px #00f0ff",
          }}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-none whitespace-nowrap">
          <span className="font-mono font-bold text-[14px] sm:text-[15px] tracking-tight text-[#E8E6E1] group-hover:text-[#00f0ff] transition-colors">
            cristhian<span className="text-[#00f0ff]">.</span>benitez
          </span>
          <span className="font-mono text-[9.5px] sm:text-[10px] text-[rgba(232,230,225,0.45)] tracking-widest uppercase mt-0.5">
            Procurement & IA
          </span>
        </div>
      )}
    </div>
  );
}

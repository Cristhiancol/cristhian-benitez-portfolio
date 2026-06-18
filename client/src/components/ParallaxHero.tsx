import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface ParallaxHeroProps {
  backgroundImage: string;
  children: React.ReactNode;
}

export default function ParallaxHero({ backgroundImage, children }: ParallaxHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Aplicar parallax al background
  useEffect(() => {
    if (bgRef.current) {
      bgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
    }
  }, [scrollY]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-0"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/70 via-[#0a0a0f]/50 to-[#0a0a0f]" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <ChevronDown className="text-[#00f0ff]/50" size={28} />
        </div>
      </div>
    </section>
  );
}

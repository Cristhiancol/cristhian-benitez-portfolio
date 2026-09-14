import { useEffect, useState } from "react";

/**
 * ScrollProgressBar — Skill: gsap-plugins & cut-the-curve
 * Smooth, GPU-accelerated reading progress bar with cyan/emerald gradient and glow.
 */
export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
          setProgress(Math.min(100, Math.max(0, currentProgress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[150] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-gradient-to-r from-[#00f0ff] via-[#10b981] to-[#00f0ff] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(0,240,255,0.8)]"
        style={{
          width: `${progress}%`,
          transformOrigin: "left center",
        }}
      />
    </div>
  );
}

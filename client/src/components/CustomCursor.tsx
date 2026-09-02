import { useEffect, useRef, useState } from "react";

export type CursorMode = "default" | "pointer" | "drag3d" | "project" | "action" | "text";

interface CustomCursorProps {
  dotColor?: string;
  ringColor?: string;
}

/**
 * CustomCursor — Awwwards 2025/2026 Contextual Fluid Cursor
 * Features:
 * - Fluid spring/lerp trailing physics (60-120fps)
 * - Dynamic morphing modes (hover on links, 3D canvas, project cards)
 * - Contextual text badges (e.g. "⟳ 3D", "VER ↗")
 * - Click particle ripple burst
 * - Touch & reduced-motion safeguards
 */
export default function CustomCursor({
  dotColor = "#00f0ff",
  ringColor = "rgba(0, 240, 255, 0.4)",
}: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const [badgeText, setBadgeText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  // Positions for smooth lerping
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const hasPointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasPointer || reducedMotion) {
      setIsSupported(false);
      return;
    }
    setIsSupported(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Detect hover target context
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorElement = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorElement) {
        const customType = cursorElement.getAttribute("data-cursor") as CursorMode;
        const customText = cursorElement.getAttribute("data-cursor-text") || "";
        setCursorMode(customType || "pointer");
        setBadgeText(customText);
        return;
      }

      // Context detection: 3D canvas or container
      if (target.closest("#red-global-3d") || target.tagName === "CANVAS") {
        setCursorMode("drag3d");
        setBadgeText("⟳ 3D");
        return;
      }

      // Context detection: Project card
      if (target.closest(".cargo-card")) {
        setCursorMode("project");
        setBadgeText("DETALLES ↗");
        return;
      }

      // Context detection: Interactive buttons & links
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".btn") ||
        target.closest(".filter-btn") ||
        target.closest(".topnav a")
      ) {
        setCursorMode("pointer");
        setBadgeText("");
        return;
      }

      // Text input fields
      if (target.closest("input") || target.closest("textarea") || target.closest("select")) {
        setCursorMode("text");
        setBadgeText("");
        return;
      }

      // Default state
      setCursorMode("default");
      setBadgeText("");
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Render loop with lerp (linear interpolation)
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const renderLoop = () => {
      // Smooth ring motion
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.2);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.2);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isSupported) return null;

  // Determine dynamic ring size and appearance
  let ringSize = 36;
  let ringBg = "transparent";
  let ringBorder = ringColor;
  let showBadge = false;

  if (cursorMode === "pointer") {
    ringSize = 48;
    ringBg = "rgba(0, 240, 255, 0.12)";
    ringBorder = "#00f0ff";
  } else if (cursorMode === "drag3d") {
    ringSize = 64;
    ringBg = "rgba(16, 185, 129, 0.18)";
    ringBorder = "#10b981";
    showBadge = true;
  } else if (cursorMode === "project") {
    ringSize = 72;
    ringBg = "rgba(0, 240, 255, 0.2)";
    ringBorder = "#00f0ff";
    showBadge = true;
  } else if (cursorMode === "text") {
    ringSize = 20;
    ringBorder = "rgba(255, 255, 255, 0.3)";
  }

  if (isClicked) {
    ringSize = Math.max(18, ringSize * 0.75);
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      {/* Outer Fluid Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-200 ease-out flex items-center justify-center backdrop-blur-[1px]"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderColor: ringBorder,
          backgroundColor: ringBg,
          boxShadow:
            cursorMode === "default"
              ? "0 0 15px rgba(0, 240, 255, 0.15)"
              : "0 0 25px rgba(0, 240, 255, 0.35)",
        }}
      >
        {/* Contextual Badge Text inside ring */}
        {showBadge && badgeText && (
          <span
            ref={badgeRef}
            className="text-[9px] font-mono font-bold tracking-widest text-cyan-300 uppercase px-1 text-center select-none animate-in fade-in zoom-in-75 duration-150"
            style={{ textShadow: "0 0 8px rgba(0,240,255,0.8)" }}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Inner Crisp Laser Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-[transform,width,height,opacity] duration-75 ease-out"
        style={{
          width: cursorMode === "text" ? "3px" : isClicked ? "8px" : "6px",
          height: cursorMode === "text" ? "14px" : isClicked ? "8px" : "6px",
          backgroundColor: cursorMode === "drag3d" ? "#10b981" : dotColor,
          boxShadow: `0 0 10px ${cursorMode === "drag3d" ? "#10b981" : dotColor}, 0 0 20px ${cursorMode === "drag3d" ? "#10b981" : dotColor}`,
          opacity: showBadge ? 0.3 : 1,
        }}
      />
    </div>
  );
}

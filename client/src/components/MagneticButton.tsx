import React, { useRef, useState, useCallback } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  download?: string;
  style?: React.CSSProperties;
  magnetStrength?: number; // pixels of max displacement (default 6)
}

/**
 * MagneticButton — Button that subtly pulls toward the cursor
 * when hovering within range. Creates a premium tactile feel.
 * Inspired by Awwwards 2025 micro-interaction trends.
 */
export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  download,
  style = {},
  magnetStrength = 6,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(rect.width, rect.height);

      if (dist < maxDist) {
        const factor = (1 - dist / maxDist) * magnetStrength;
        setOffset({
          x: (dx / maxDist) * factor,
          y: (dy / maxDist) * factor,
        });
      }
    },
    [magnetStrength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  const transformStyle: React.CSSProperties = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 ? "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)" : "transform 0.1s ease-out",
    ...style,
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        download={download}
        className={className}
        style={transformStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={className}
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

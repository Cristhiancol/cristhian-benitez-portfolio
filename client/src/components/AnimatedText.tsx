/**
 * AnimatedText — Staggered letter/word reveal animation for hero titles.
 * Each word fades up with a slight delay creating a cascade effect.
 * Inspired by Awwwards 2025 kinetic typography trend.
 */
import { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;    // initial delay in ms
  stagger?: number;  // ms between each word
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function AnimatedText({
  text,
  className = "",
  delay = 200,
  stagger = 80,
  as: Tag = "span",
}: AnimatedTextProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: "0.25em" }}
        >
          <span
            className="inline-block"
            style={{
              opacity: isReady ? 1 : 0,
              transform: isReady ? "translateY(0)" : "translateY(100%)",
              transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * stagger}ms`,
              willChange: "opacity, transform",
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}

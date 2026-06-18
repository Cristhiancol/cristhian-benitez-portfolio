import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-all duration-300 hover:scale-105"
      style={{
        background: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
        borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)",
      }}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <Moon
        size={16}
        className={`absolute transition-all duration-300 ${
          theme === "dark"
            ? "opacity-100 rotate-0 scale-100 text-[#ffd700]"
            : "opacity-0 rotate-90 scale-0 text-[#ffd700]"
        }`}
      />
      <Sun
        size={16}
        className={`absolute transition-all duration-300 ${
          theme === "light"
            ? "opacity-100 rotate-0 scale-100 text-[#0077aa]"
            : "opacity-0 -rotate-90 scale-0 text-[#0077aa]"
        }`}
      />
    </button>
  );
}

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#perfil", label: "Perfil" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#educacion", label: "Educacion" },
  { href: "#habilidades", label: "Habilidades" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#00f0ff]/10 shadow-[0_4px_30px_rgba(0,240,255,0.05)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => handleClick("#inicio")}
          className="flex items-center gap-2"
        >
          <span
            className="text-lg md:text-xl font-bold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-[#00f0ff]">C</span>
            <span className="text-white">B</span>
            <span className="text-[#39ff14]">R</span>
          </span>
          <span className="hidden sm:inline text-xs text-gray-500 font-mono border-l border-gray-700 pl-2 ml-1">
            portfolio.v2
          </span>
        </button>

        <div className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                activeSection === link.href.slice(1)
                  ? "text-[#00f0ff] bg-[#00f0ff]/10"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
          <div className="w-px h-6 bg-white/10" />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-400 hover:text-[#00f0ff] transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-[#00f0ff]/10 pb-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`block w-full text-left px-6 py-3 text-sm font-medium transition-colors ${
                activeSection === link.href.slice(1)
                  ? "text-[#00f0ff] bg-[#00f0ff]/5"
                  : "text-gray-400 hover:text-white"
              }`}
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

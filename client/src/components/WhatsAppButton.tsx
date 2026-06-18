import { MessageCircle } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    // Número: +57 301 374 8901
    const phoneNumber = "573013748901";
    const message = "Hola Cristhian, me interesa conocer más sobre tu experiencia en Supply Chain y Abastecimiento.";
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.location.href = url;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-16 right-0 mb-2 bg-[#0a0a0f] border border-[#00ff7f]/40 rounded-lg px-4 py-2 whitespace-nowrap animate-in fade-in slide-in-from-bottom-2 duration-200">
          <p className="text-xs text-[#00ff7f] font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Contactar por WhatsApp
          </p>
        </div>
      )}

      {/* Button */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#00ff7f] to-[#00d4aa] shadow-[0_0_30px_rgba(0,255,127,0.3)] hover:shadow-[0_0_50px_rgba(0,255,127,0.5)] transition-all duration-300 hover:scale-110 group cursor-pointer border-none"
        aria-label="Contactar por WhatsApp"
        type="button"
      >
        <MessageCircle size={24} className="text-[#0a0a0f] group-hover:rotate-12 transition-transform" />
      </button>

      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#00ff7f]/30 animate-pulse"></div>
    </div>
  );
}

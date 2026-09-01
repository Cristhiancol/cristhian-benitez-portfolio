import { useState } from "react";
import {
  Briefcase,
  Copy,
  Check,
  Download,
  Linkedin,
  Mail,
  MessageCircle,
  X,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  BrainCircuit,
  ExternalLink,
} from "lucide-react";
import {
  generateWhatsAppLink,
  generateAtsSummary,
  RECRUITER_EMAIL,
  RECRUITER_LINKEDIN,
} from "@/lib/recruiterHelper";
import { useNotification } from "@/contexts/NotificationContext";

interface RecruiterPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvPdfUrl: string;
}

export default function RecruiterPitchModal({
  isOpen,
  onClose,
  cvPdfUrl,
}: RecruiterPitchModalProps) {
  const [copied, setCopied] = useState(false);
  const { addNotification } = useNotification();

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      const text = generateAtsSummary();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      addNotification({
        type: "success",
        title: "¡Copiado con éxito!",
        message: "Resumen ejecutivo ATS copiado al portapapeles.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      addNotification({
        type: "info",
        title: "Portapapeles",
        message: "No se pudo copiar automáticamente.",
      });
    }
  };

  const whatsappUrl = generateWhatsAppLink(
    "Hola Cristhian, vi tu perfil ejecutivo en el portafolio y me gustaría hablar sobre una vacante/proyecto."
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0d1117] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,240,255,0.15)] overflow-hidden text-slate-200">
        {/* Header decoration */}
        <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-500" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Briefcase size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Recruiter & Hiring Pitch
                </h3>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ATS Ready
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Resumen ejecutivo de alto impacto para decisiones rápidas de contratación
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Key Metrics Quick-Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-xl font-black text-cyan-400">7% - 11%</span>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">
                Ahorros Compras
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-xl font-black text-emerald-400">260 Buses</span>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">
                Flota Gestionada
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-xl font-black text-blue-400">92%</span>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">
                Precisión IA
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
              <span className="text-xl font-black text-amber-400">100%</span>
              <p className="text-[11px] text-slate-400 uppercase tracking-wider mt-1">
                DIAN Compliance
              </p>
            </div>
          </div>

          {/* Quick Pitch Box */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-400" />
                Resumen Ejecutivo
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "¡Copiado!" : "Copiar ficha ATS"}
              </button>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Profesional con <strong>+8 años de trayectoria</strong> liderando compras estratégicas, comercio exterior y supply chain. Combina visión de negocio con ingeniería de datos moderna: modelos predictivos en <strong>Python / Machine Learning</strong>, optimización ERP (SAP/SIESA) y desarrollo de dashboards analíticos.
            </p>
          </div>

          {/* Direct Actions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Acciones Rápidas Directas
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* WhatsApp Direct Action */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium transition-all group"
              >
                <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                <span>WhatsApp (+57 301 374 8901)</span>
              </a>

              {/* Download CV */}
              <a
                href={cvPdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-medium transition-all group"
              >
                <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                <span>Descargar CV Completo (PDF)</span>
              </a>

              {/* LinkedIn */}
              <a
                href={RECRUITER_LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium transition-all group"
              >
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
                <span>Perfil de LinkedIn</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${RECRUITER_EMAIL}?subject=Oportunidad%20Laboral%20-%20Portafolio`}
                className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-medium transition-all group"
              >
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                <span>{RECRUITER_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Bogotá, Colombia • Disponible para modalidad Remota o Híbrida</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

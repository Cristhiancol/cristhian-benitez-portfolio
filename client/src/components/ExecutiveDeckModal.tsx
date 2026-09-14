import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, Download, Phone, Mail, Award, CheckCircle2, TrendingUp, Cpu, Globe } from "lucide-react";
import { generateWhatsAppLink } from "@/lib/recruiterHelper";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cvPdfUrl: string;
}

/**
 * ExecutiveDeckModal — Skills: marp-slide, beautiful-article, stitch-extract-design-md
 * Executive briefing pitch deck in 4 high-impact slides for hiring managers and VPs.
 */
export default function ExecutiveDeckModal({ isOpen, onClose, cvPdfUrl }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tag: "DIAPOSITIVA 01 / 04 · RESUMEN EJECUTIVO",
      title: "Cristhian Hernando Benítez Rodríguez",
      subtitle: "Gestor de Compras · Abastecimiento Estratégico & Data-Driven",
      content: (
        <div className="space-y-4 text-sm text-[rgba(232,230,225,0.85)] leading-relaxed">
          <p>
            Profesional en <strong>Finanzas y Negocios Internacionales</strong> con más de <strong>8 años de experiencia</strong> liderando compras técnicas, contratación de alta complejidad y comercio exterior en flotas de transporte masivo y sector aeronáutico.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
              <div className="text-cyan-400 font-bold text-xs uppercase font-mono">Diferenciador Clave</div>
              <div className="text-white font-medium text-xs mt-1">
                Fusión única de <strong>negociación comercial con proveedores</strong> y <strong>modelado predictivo de datos (Python/IA)</strong>.
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="text-emerald-400 font-bold text-xs uppercase font-mono">Enfoque Operativo</div>
              <div className="text-white font-medium text-xs mt-1">
                Alineación estricta a presupuestos, reducción de Opex y cero paros de operación por falta de inventario crítico.
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      tag: "DIAPOSITIVA 02 / 04 · MÉTRICAS CUANTITATIVAS",
      title: "Impacto Financiero y Operativo Verificado",
      subtitle: "Resultados contrastables en compras de repuestos e infraestructura",
      content: (
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/30">
            <div className="font-mono text-3xl font-extrabold text-cyan-400">7% - 11%</div>
            <div className="text-xs font-bold text-white mt-1">Ahorros Constantes en Adquisición</div>
            <div className="text-[11px] text-[rgba(232,230,225,0.5)] mt-0.5">Mediante negociación estratégica y cuadros comparativos dinámicos.</div>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30">
            <div className="font-mono text-3xl font-extrabold text-emerald-400">260 Buses</div>
            <div className="text-xs font-bold text-white mt-1">Suministro & Infraestructura</div>
            <div className="text-[11px] text-[rgba(232,230,225,0.5)] mt-0.5">Contratos de lubricantes (Terpel), combustible y reparaciones mayores.</div>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-amber-500/30">
            <div className="font-mono text-3xl font-extrabold text-amber-400">-40% / -60%</div>
            <div className="text-xs font-bold text-white mt-1">Costos y Tiempos de Entrega</div>
            <div className="text-[11px] text-[rgba(232,230,225,0.5)] mt-0.5">Proyecto UAP: importación y nacionalización directa sin intermediarios.</div>
          </div>
          <div className="p-4 rounded-xl bg-black/40 border border-cyan-500/30">
            <div className="font-mono text-3xl font-extrabold text-cyan-400">100% DIAN</div>
            <div className="text-xs font-bold text-white mt-1">Cumplimiento Normativo</div>
            <div className="text-[11px] text-[rgba(232,230,225,0.5)] mt-0.5">Trazabilidad aduanera total con cero sanciones o multas estatales.</div>
          </div>
        </div>
      ),
    },
    {
      tag: "DIAPOSITIVA 03 / 04 · PROYECTOS EMBLEMÁTICOS",
      title: "Sistemas & Automatizaciones Desarrolladas",
      subtitle: "De la optimización en Excel a modelos de Machine Learning aplicados",
      content: (
        <div className="space-y-3 pt-1">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
              <Cpu size={16} />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">PRJ-001: StockFlow — Inteligencia Artificial para Inventarios</div>
              <div className="text-[rgba(232,230,225,0.7)] mt-0.5">Modelos con Gemini AI y Python (Pandas/Scikit-learn) para predecir agotamientos de stock con 92% de exactitud.</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <TrendingUp size={16} />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">PRJ-004: Proyecto SMART — Control Total OC y Stock</div>
              <div className="text-[rgba(232,230,225,0.7)] mt-0.5">Sistema centralizado para auditar órdenes abiertas, fluctuaciones de precios y facturación en la flota de 260 buses.</div>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <Globe size={16} />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">PRJ-005: Proyecto UAP — Comercio Exterior & Régimen Aduanero</div>
              <div className="text-[rgba(232,230,225,0.7)] mt-0.5">Acreditación como Usuario Aduanero Permanente en Helicentro: liquidación en SIESA y aforos virtuales.</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      tag: "DIAPOSITIVA 04 / 04 · CONTACTO INMEDIATO",
      title: "¿Listo para coordinar una entrevista?",
      subtitle: "Disponibilidad para roles de liderazgo en Compras y Abastecimiento",
      content: (
        <div className="space-y-4 pt-2 text-center">
          <p className="text-sm text-[rgba(232,230,225,0.8)] max-w-md mx-auto">
            Puedes comunicarte de manera directa conmigo por WhatsApp o descargar mi Hoja de Vida completa en formato PDF.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={generateWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] text-black font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:brightness-110 transition-all"
            >
              <Phone size={15} />
              <span>Contactar por WhatsApp (+57 301 374 8901)</span>
            </a>
            <a
              href={cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-xs font-mono flex items-center justify-center gap-2 hover:bg-cyan-500/30 transition-all"
            >
              <Download size={15} />
              <span>Descargar Hoja de Vida (PDF)</span>
            </a>
          </div>
          <div className="text-xs font-mono text-[rgba(232,230,225,0.5)] pt-2">
            cristianbenitez50@hotmail.com · Bogotá, D.C., Colombia
          </div>
        </div>
      ),
    },
  ];

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#0e171b] border border-cyan-500/30 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative flex flex-col min-h-[460px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <span className="text-[11px] font-mono text-cyan-400 font-bold tracking-wider">
            {slides[currentSlide].tag}
          </span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[rgba(232,230,225,0.7)] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar presentación"
          >
            <X size={18} />
          </button>
        </div>

        {/* Slide Title */}
        <div className="mb-4">
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            {slides[currentSlide].title}
          </h3>
          <p className="text-xs sm:text-sm text-[rgba(232,230,225,0.6)] mt-0.5 font-mono">
            {slides[currentSlide].subtitle}
          </p>
        </div>

        {/* Slide Body */}
        <div className="flex-1 py-2">
          {slides[currentSlide].content}
        </div>

        {/* Navigation Controls & Progress Dots */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentSlide === i ? "w-6 bg-cyan-400" : "w-1.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Ir a diapositiva ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((p) => Math.max(0, p - 1))}
              disabled={currentSlide === 0}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-colors cursor-pointer"
              aria-label="Diapositiva anterior"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrentSlide((p) => Math.min(slides.length - 1, p + 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Siguiente diapositiva"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

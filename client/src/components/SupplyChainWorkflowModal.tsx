import { useState } from "react";
import { X, Network, Cpu, Database, CheckCircle2, ArrowRight, Layers, ShieldCheck, Box, FileSpreadsheet } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SupplyChainWorkflowModal — Skills: json-canvas, mermaid-visualizer, excalidraw-diagram, legacy-circuit-mockups
 * Visual architecture & procurement data flow pipeline explorer.
 */
export default function SupplyChainWorkflowModal({ isOpen, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<"pipeline" | "architecture">("pipeline");
  const [selectedNode, setSelectedNode] = useState(0);

  if (!isOpen) return null;

  const pipelineNodes = [
    {
      id: "REQ",
      stage: "01. Requerimiento Técnico",
      tool: "SIESA ERP / NEO",
      time: "24h SLA",
      detail: "Levantamiento de especificaciones técnicas para repuestos críticos (culatas, cajas de dirección, filtros y lubricantes Terpel) para la flota de 260 buses.",
      impact: "-20% en tiempo de respuesta",
    },
    {
      id: "NEG",
      stage: "02. Negociación & Cuadro Comparativo",
      tool: "Python · Excel Macros",
      time: "48h SLA",
      detail: "Análisis volumétrico de cotizaciones con proveedores nacionales e internacionales. Sustentación ante comités de gasto con cuadros dinámicos.",
      impact: "7% al 11% ahorro neto",
    },
    {
      id: "AI",
      stage: "03. Predicción StockFlow (IA)",
      tool: "Gemini AI · Pandas",
      time: "Tiempo Real",
      detail: "Cálculo de punto de reorden y probabilidad de desabastecimiento anticipado basado en kilometraje de flota y consumo estacional.",
      impact: "1.8% riesgo de quiebre de stock",
    },
    {
      id: "ERP",
      stage: "04. Control OC & Facturación SMART",
      tool: "SAP B1 / SIESA",
      time: "Continuo",
      detail: "Monitoreo de órdenes de compra abiertas, control presupuestal y prorrateo automático de gastos de importación y fletes.",
      impact: "100% conciliación financiera",
    },
    {
      id: "DIAN",
      stage: "05. Logística Aduanera & Nacionalización",
      tool: "Régimen UAP DIAN",
      time: "3-5 días",
      detail: "Alistamiento documental, asistencia a aforos virtuales, liquidación de aranceles y entrega directa en patio de mantenimiento.",
      impact: "-40% gastos aduaneros / -60% tiempos",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workflow-title"
    >
      <div className="bg-[#0e171b] border border-cyan-500/30 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0e171b]/95 backdrop-blur-lg z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Network size={20} />
            </div>
            <div>
              <h3 id="workflow-title" className="text-xl font-bold font-display text-white">
                Flujo Operativo & Arquitectura de Abastecimiento
              </h3>
              <p className="text-xs font-mono text-cyan-400">
                Supply Chain Data Pipeline · Metodología Cristhian Benítez
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[rgba(232,230,225,0.7)] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-4 flex gap-3 border-b border-white/5">
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`pb-3 px-2 text-xs sm:text-sm font-mono transition-all border-b-2 cursor-pointer ${
              activeTab === "pipeline"
                ? "border-cyan-400 text-cyan-300 font-bold"
                : "border-transparent text-[rgba(232,230,225,0.5)] hover:text-white"
            }`}
          >
            01. Pipeline End-to-End (5 Fases)
          </button>
          <button
            onClick={() => setActiveTab("architecture")}
            className={`pb-3 px-2 text-xs sm:text-sm font-mono transition-all border-b-2 cursor-pointer ${
              activeTab === "architecture"
                ? "border-emerald-400 text-emerald-300 font-bold"
                : "border-transparent text-[rgba(232,230,225,0.5)] hover:text-white"
            }`}
          >
            02. Arquitectura Sistema SMART + IA
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {activeTab === "pipeline" ? (
            <div className="space-y-6">
              {/* Stepper / Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {pipelineNodes.map((node, i) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(i)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedNode === i
                        ? "bg-cyan-500/15 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                        : "bg-slate-900/40 border-white/5 hover:border-white/20 text-[rgba(232,230,225,0.6)]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 font-bold mb-1">
                      <span>{node.id}</span>
                      <span className="text-[9px] text-[rgba(232,230,225,0.4)]">{node.time}</span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">{node.stage.replace(/^d+.s*/, '')}</div>
                    <div className="text-[10px] text-[rgba(232,230,225,0.5)] truncate mt-1">{node.tool}</div>
                  </button>
                ))}
              </div>

              {/* Detail Card of Selected Node */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#111a1e] to-[#080e12] border border-cyan-500/30 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Fase Seleccionada</span>
                    <h4 className="text-lg font-bold text-white mt-0.5">{pipelineNodes[selectedNode].stage}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/20">
                      Herramienta: {pipelineNodes[selectedNode].tool}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                      {pipelineNodes[selectedNode].time}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[rgba(232,230,225,0.8)] leading-relaxed">
                  {pipelineNodes[selectedNode].detail}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="text-[rgba(232,230,225,0.5)]">Impacto cuantitativo directo:</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {pipelineNodes[selectedNode].impact}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Architecture View (Mermaid / Blueprint style) */
            <div className="space-y-6">
              <div className="bg-black/50 p-6 rounded-2xl border border-emerald-500/20 font-mono text-xs text-[rgba(232,230,225,0.85)] space-y-4">
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                  <Cpu size={16} />
                  <span>Arquitectura Técnica: Proyecto SMART + StockFlow IA</span>
                </div>

                {/* ASCII / Blueprint Schema */}
                <div className="bg-[#080e12] p-4 rounded-xl border border-white/10 overflow-x-auto text-[11px] leading-relaxed text-cyan-300">
                  <pre className="m-0 font-mono">{
`┌─────────────────────────┐     ┌────────────────────────┐     ┌────────────────────────┐
│  FUENTES DE DATOS       │     │  MOTOR DE PROCESAMIENTO│     │  SALIDAS OPERATIVAS    │
│                         │     │                        │     │                        │
│  [SIESA ERP]            │────>│  [Python ETL + Pandas] │────>│  [Puntos de Reorden]   │
│  Inventario & OCs       │     │  Normalización de datos│     │  Alertas automáticas   │
│                         │     │                        │     │                        │
│  [Google Drive API]     │────>│  [Gemini AI Engine]    │────>│  [Cuadros Comparativos]│
│  Hojas técnicas flotas  │     │  Modelos predictivos   │     │  Decisión de compra    │
│                         │     │                        │     │                        │
│  [Telemetría 260 Buses] │────>│  [Proyecto SMART VBA]  │────>│  [Gobernanza & DIAN]   │
│  Kilometraje y Terpel   │     │  Conciliación en lote  │     │  100% Cero Sanciones   │
└─────────────────────────┘     └────────────────────────┘     └────────────────────────┘`
                  }</pre>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-cyan-400 font-bold mb-1">Ingesta Continua</div>
                    <div className="text-[10px] text-[rgba(232,230,225,0.6)]">Lectura de stock de repuestos y órdenes abiertas en SIESA y Drive.</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-emerald-400 font-bold mb-1">Inferencia con IA</div>
                    <div className="text-[10px] text-[rgba(232,230,225,0.6)]">Cálculo de consumo futuro con base en desgaste por ruta y kilometraje.</div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                    <div className="text-amber-400 font-bold mb-1">Ahorro Cuantificable</div>
                    <div className="text-[10px] text-[rgba(232,230,225,0.6)]">Eliminación de sobre-stock y reducción de fletes urgentes aéreos.</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs font-mono">
          <span className="text-[rgba(232,230,225,0.4)]">Diseñado e implementado por Cristhian Benítez</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 transition-colors font-bold cursor-pointer"
          >
            Cerrar Vista
          </button>
        </div>
      </div>
    </div>
  );
}

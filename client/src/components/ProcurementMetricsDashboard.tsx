import { useState, useMemo } from "react";
import { TrendingUp, ShieldCheck, Zap, Sliders, RefreshCw, BarChart3, CheckCircle2, ArrowUpRight } from "lucide-react";

/**
 * ProcurementMetricsDashboard — Skills: build-dashboard & playground & muapi-ui-design
 * Interactive Supply Chain ROI & Procurement Simulator.
 * Allows recruiters to test Cristhian's real quantitative formulas and see live savings.
 */
export default function ProcurementMetricsDashboard() {
  const [fleetSize, setFleetSize] = useState(260); // Default: Cristhian's real 260 buses fleet
  const [monthlySpendM, setMonthlySpendM] = useState(450); // Millions COP
  const [hasUAPRegime, setHasUAPRegime] = useState(true); // Project UAP DIAN
  const [hasAIPrediction, setHasAIPrediction] = useState(true); // Project StockFlow Gemini AI

  // Presets based on Cristhian's real career milestones
  const applyPreset = (preset: "usme" | "helicentro" | "ceva") => {
    if (preset === "usme") {
      setFleetSize(260);
      setMonthlySpendM(620);
      setHasUAPRegime(true);
      setHasAIPrediction(true);
    } else if (preset === "helicentro") {
      setFleetSize(120);
      setMonthlySpendM(380);
      setHasUAPRegime(true);
      setHasAIPrediction(false);
    } else {
      setFleetSize(80);
      setMonthlySpendM(250);
      setHasUAPRegime(false);
      setHasAIPrediction(false);
    }
  };

  const calculations = useMemo(() => {
    // Annualized spend in millions COP
    const annualSpend = monthlySpendM * 12;

    // Savings formula based on strategic negotiation (7% to 11%)
    const baseSavingsRate = 0.075;
    const aiBonus = hasAIPrediction ? 0.035 : 0;
    const totalSavingsRate = baseSavingsRate + aiBonus;
    const estimatedSavingsM = Math.round(annualSpend * totalSavingsRate);

    // Customs & freight reduction (UAP gives 40% reduction on agency & tariffs)
    const customsSavingM = hasUAPRegime ? Math.round(annualSpend * 0.045) : 0;

    // Delivery days saved
    const deliveryDaysReduction = (hasUAPRegime ? 60 : 20) + (hasAIPrediction ? 15 : 0);

    // Stockout risk reduction
    const stockoutRisk = hasAIPrediction ? 1.8 : 18.5;

    return {
      annualSpend,
      totalSavingsRate: Math.round(totalSavingsRate * 100),
      estimatedSavingsM: estimatedSavingsM + customsSavingM,
      deliveryDaysReduction,
      stockoutRisk,
    };
  }, [fleetSize, monthlySpendM, hasUAPRegime, hasAIPrediction]);

  return (
    <div className="w-full bg-[#111a1e]/90 border border-cyan-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-500/10 mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-1">
            <Sliders size={14} className="animate-spin-slow" />
            <span>Simulador Interactivo de Abastecimiento & ROI</span>
          </div>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            Calculadora de Impacto en Compras
          </h3>
          <p className="text-sm text-[rgba(232,230,225,0.6)] mt-1">
            Ajusta los parámetros operativos de una flota y evalúa el retorno tangible que aporto como Gestor de Compras.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-[rgba(232,230,225,0.4)] mr-1">Casos reales:</span>
          <button
            onClick={() => applyPreset("usme")}
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 transition-all cursor-pointer"
          >
            Somos Usme (260 Buses)
          </button>
          <button
            onClick={() => applyPreset("helicentro")}
            className="px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:border-cyan-500/30 transition-all cursor-pointer"
          >
            Helicentro (UAP)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Controls (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Slider 1: Fleet Size */}
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="text-[rgba(232,230,225,0.8)]">Flota / Unidades en Operación:</span>
              <span className="text-cyan-400 font-bold text-base">{fleetSize} buses</span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="10"
              value={fleetSize}
              onChange={(e) => setFleetSize(Number(e.target.value))}
              className="w-full accent-[#00f0ff] cursor-pointer bg-slate-800 h-2 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-[rgba(232,230,225,0.4)]">
              <span>50 mín.</span>
              <span>260 (Flota Somos Usme)</span>
              <span>500 máx.</span>
            </div>
          </div>

          {/* Slider 2: Monthly Spend */}
          <div className="bg-black/30 p-4 rounded-xl border border-white/5 space-y-2">
            <div className="flex justify-between items-center text-sm font-mono">
              <span className="text-[rgba(232,230,225,0.8)]">Presupuesto Mensual de Compras:</span>
              <span className="text-emerald-400 font-bold text-base">${monthlySpendM}M COP</span>
            </div>
            <input
              type="range"
              min="100"
              max="1200"
              step="25"
              value={monthlySpendM}
              onChange={(e) => setMonthlySpendM(Number(e.target.value))}
              className="w-full accent-[#10b981] cursor-pointer bg-slate-800 h-2 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-[rgba(232,230,225,0.4)]">
              <span>$100M/mes</span>
              <span>Gasto anual: ${calculations.annualSpend.toLocaleString()}M</span>
              <span>$1.200M/mes</span>
            </div>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Toggle UAP */}
            <div
              onClick={() => setHasUAPRegime(!hasUAPRegime)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                hasUAPRegime
                  ? "bg-cyan-500/10 border-cyan-500/40 text-white"
                  : "bg-black/20 border-white/5 text-[rgba(232,230,225,0.4)] hover:border-white/10"
              }`}
            >
              <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                hasUAPRegime ? "bg-cyan-500 border-cyan-400 text-black" : "border-slate-600"
              }`}>
                {hasUAPRegime && <CheckCircle2 size={12} className="stroke-[3]" />}
              </div>
              <div className="text-xs">
                <div className="font-bold">Régimen UAP (DIAN)</div>
                <div className="text-[10px] text-[rgba(232,230,225,0.6)]">-40% gastos aduaneros</div>
              </div>
            </div>

            {/* Toggle AI */}
            <div
              onClick={() => setHasAIPrediction(!hasAIPrediction)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                hasAIPrediction
                  ? "bg-emerald-500/10 border-emerald-500/40 text-white"
                  : "bg-black/20 border-white/5 text-[rgba(232,230,225,0.4)] hover:border-white/10"
              }`}
            >
              <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border ${
                hasAIPrediction ? "bg-emerald-500 border-emerald-400 text-black" : "border-slate-600"
              }`}>
                {hasAIPrediction && <CheckCircle2 size={12} className="stroke-[3]" />}
              </div>
              <div className="text-xs">
                <div className="font-bold">Predicción IA (Gemini)</div>
                <div className="text-[10px] text-[rgba(232,230,225,0.6)]">Stockflow preventivo</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Real-Time Results Cards (7 Cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Metric 1: Annual Savings */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-black/80 border border-cyan-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Ahorro Anual Estimado</span>
              <TrendingUp size={18} className="text-cyan-400" />
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-cyan-300 mt-2">
              +${calculations.estimatedSavingsM}M
            </div>
            <div className="text-xs text-[rgba(232,230,225,0.7)] mt-1">
              Equivalente al <span className="text-cyan-400 font-bold">{calculations.totalSavingsRate}%</span> del presupuesto anual optimizado.
            </div>
            {/* Visual Bar */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, calculations.totalSavingsRate * 8)}%` }}
              />
            </div>
          </div>

          {/* Metric 2: Stockout Risk */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-black/80 border border-emerald-500/30 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Riesgo de Desabastecimiento</span>
              <ShieldCheck size={18} className="text-emerald-400" />
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-emerald-300 mt-2">
              {calculations.stockoutRisk}%
            </div>
            <div className="text-xs text-[rgba(232,230,225,0.7)] mt-1">
              Reducción del <span className="text-emerald-400 font-bold">-92%</span> en eventos de paro de flota por repuestos críticos.
            </div>
            {/* Visual Bar */}
            <div className="w-full bg-slate-800/80 h-1.5 rounded-full mt-4 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${100 - calculations.stockoutRisk * 4}%` }}
              />
            </div>
          </div>

          {/* Metric 3: Lead Time Reduction */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">Tiempos de Entrega</span>
              <Zap size={18} className="text-amber-400" />
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-amber-300 mt-2">
              -{calculations.deliveryDaysReduction}%
            </div>
            <div className="text-xs text-[rgba(232,230,225,0.7)] mt-1">
              Disminución en ciclo de orden a recepción en bodega mediante prorrateo SIESA.
            </div>
          </div>

          {/* Metric 4: DIAN Compliance */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-white/10 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Cumplimiento DIAN</span>
              <CheckCircle2 size={18} className="text-cyan-400" />
            </div>
            <div className="font-mono text-3xl sm:text-4xl font-extrabold text-cyan-300 mt-2">
              100%
            </div>
            <div className="text-xs text-[rgba(232,230,225,0.7)] mt-1">
              Cero sanciones aduaneras y trazabilidad completa de documentación de aforos.
            </div>
          </div>
        </div>
      </div>

      {/* Recruiter Footnote */}
      <div className="mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[rgba(232,230,225,0.5)]">
        <span>* Fórmulas basadas en contratos de suministro de lubricantes (Terpel), repuestos de motor y régimen UAP DIAN.</span>
        <a
          href="#contacto"
          className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <span>Consultar disponibilidad para tu equipo</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
}

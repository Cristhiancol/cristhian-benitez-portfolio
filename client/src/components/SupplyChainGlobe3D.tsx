import React, { useEffect, useRef, useState } from "react";
import { Globe, Plane, Ship, ShieldCheck, Sparkles, RefreshCw, Zap } from "lucide-react";

interface NodePoint {
  name: string;
  lat: number;
  lng: number;
  type: "hub" | "port" | "air";
  description: string;
  metric: string;
}

const NODES: NodePoint[] = [
  {
    name: "Bogotá (HQ - Operación)",
    lat: 4.711,
    lng: -74.0721,
    type: "hub",
    description: "Gestión 260 buses, contratos Terpel e inventarios predictivos IA",
    metric: "7-11% Ahorro",
  },
  {
    name: "Miami (Hub Aéreo & Repuestos)",
    lat: 25.7617,
    lng: -80.1918,
    type: "air",
    description: "Importación de componentes aeronáuticos bajo régimen UAP",
    metric: "-60% Lead Time",
  },
  {
    name: "Houston (Industrial / Insumos)",
    lat: 29.7604,
    lng: -95.3698,
    type: "port",
    description: "Logística de lubricantes y piezas mecánicas de alta criticidad",
    metric: "0 Sanciones DIAN",
  },
  {
    name: "Rotterdam (Puerto Marítimo Europa)",
    lat: 51.9244,
    lng: 4.4777,
    type: "port",
    description: "Consolidación de carga pesada y repuestos de flota",
    metric: "-40% Costo Aduana",
  },
  {
    name: "Shanghai (Suministro Global)",
    lat: 31.2304,
    lng: 121.4737,
    type: "port",
    description: "Adquisición de componentes electrónicos y sensores de telemetría",
    metric: "92% Precisión IA",
  },
  {
    name: "Frankfurt (Logística Técnica)",
    lat: 50.1109,
    lng: 8.6821,
    type: "air",
    description: "Compras técnicas especializadas de alta precisión",
    metric: "-20% Tiempos SLA",
  },
];

const ROUTES: [number, number][] = [
  [0, 1], // Bogotá <-> Miami
  [0, 2], // Bogotá <-> Houston
  [0, 3], // Bogotá <-> Rotterdam
  [0, 4], // Bogotá <-> Shanghai
  [0, 5], // Bogotá <-> Frankfurt
];

export default function SupplyChainGlobe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNode, setActiveNode] = useState<NodePoint>(NODES[0]);
  const [isRotating, setIsRotating] = useState(true);
  const rotationRef = useRef({ x: 0.3, y: -0.8 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = Math.min(500, width * 0.85));

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(500, width * 0.85);
    };
    window.addEventListener("resize", handleResize);

    const radius = Math.min(width, height) * 0.38;
    const globeCenter = { x: width / 2, y: height / 2 };

    // Generate sphere surface dots
    const dots: { lat: number; lng: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 10) {
      const count = Math.max(6, Math.floor(36 * Math.cos((lat * Math.PI) / 180)));
      for (let i = 0; i < count; i++) {
        dots.push({ lat, lng: (360 / count) * i - 180 });
      }
    }

    let packetProgress = 0;

    const render = () => {
      if (isRotating && !isDraggingRef.current) {
        rotationRef.current.y += 0.004;
      }
      packetProgress = (packetProgress + 0.008) % 1;

      ctx.clearRect(0, 0, width, height);

      // Deep space glow behind globe
      const bgGlow = ctx.createRadialGradient(
        globeCenter.x,
        globeCenter.y,
        radius * 0.2,
        globeCenter.x,
        globeCenter.y,
        radius * 1.3
      );
      bgGlow.addColorStop(0, "rgba(0, 240, 255, 0.08)");
      bgGlow.addColorStop(0.5, "rgba(16, 185, 129, 0.03)");
      bgGlow.addColorStop(1, "transparent");
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(globeCenter.x, globeCenter.y, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Sphere edge ring glow
      ctx.save();
      ctx.beginPath();
      ctx.arc(globeCenter.x, globeCenter.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 240, 255, 0.25)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner sphere dark atmosphere
      const innerGlow = ctx.createRadialGradient(
        globeCenter.x - radius * 0.3,
        globeCenter.y - radius * 0.3,
        radius * 0.1,
        globeCenter.x,
        globeCenter.y,
        radius
      );
      innerGlow.addColorStop(0, "rgba(13, 22, 38, 0.95)");
      innerGlow.addColorStop(0.8, "rgba(9, 13, 22, 0.98)");
      innerGlow.addColorStop(1, "rgba(0, 240, 255, 0.12)");
      ctx.fillStyle = innerGlow;
      ctx.fill();
      ctx.restore();

      const project3D = (lat: number, lng: number, r: number = radius) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180) + rotationRef.current.y;

        // 3D Cartesian coordinates
        const x3d = -(r * Math.sin(phi) * Math.cos(theta));
        const z3d = r * Math.sin(phi) * Math.sin(theta);
        const y3d = r * Math.cos(phi);

        // Rotation around X axis
        const rotX = rotationRef.current.x;
        const yRot = y3d * Math.cos(rotX) - z3d * Math.sin(rotX);
        const zRot = y3d * Math.sin(rotX) + z3d * Math.cos(rotX);

        return {
          x: globeCenter.x + x3d,
          y: globeCenter.y - yRot,
          z: zRot,
          visible: zRot > -r * 0.1,
        };
      };

      // Draw background dots
      ctx.fillStyle = "rgba(0, 240, 255, 0.2)";
      dots.forEach((dot) => {
        const p = project3D(dot.lat, dot.lng);
        if (p.visible) {
          const depthAlpha = Math.max(0.05, (p.z + radius) / (radius * 2));
          ctx.fillStyle = `rgba(0, 240, 255, ${depthAlpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.8, 1.6 * depthAlpha), 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw 3D Arcs (Supply Chain Routes)
      ROUTES.forEach(([srcIdx, dstIdx]) => {
        const src = NODES[srcIdx];
        const dst = NODES[dstIdx];
        const pSrc = project3D(src.lat, src.lng);
        const pDst = project3D(dst.lat, dst.lng);

        if (pSrc.visible || pDst.visible) {
          const arcPoints = 30;
          ctx.beginPath();
          let prevPt: { x: number; y: number; visible: boolean } | null = null;

          for (let i = 0; i <= arcPoints; i++) {
            const t = i / arcPoints;
            const curLat = src.lat + (dst.lat - src.lat) * t;
            const curLng = src.lng + (dst.lng - src.lng) * t;
            const arcAltitude = Math.sin(t * Math.PI) * (radius * 0.22);
            const pt = project3D(curLat, curLng, radius + arcAltitude);

            if (pt.visible) {
              if (!prevPt) ctx.moveTo(pt.x, pt.y);
              else ctx.lineTo(pt.x, pt.y);
            }
            prevPt = pt;
          }

          ctx.strokeStyle = "rgba(0, 240, 255, 0.45)";
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 3]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Moving packet along arc
          const packetLat = src.lat + (dst.lat - src.lat) * packetProgress;
          const packetLng = src.lng + (dst.lng - src.lng) * packetProgress;
          const packetAlt = Math.sin(packetProgress * Math.PI) * (radius * 0.22);
          const packetPt = project3D(packetLat, packetLng, radius + packetAlt);

          if (packetPt.visible) {
            ctx.shadowColor = "#00f0ff";
            ctx.shadowBlur = 8;
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(packetPt.x, packetPt.y, 2.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Draw Nodes
      NODES.forEach((node) => {
        const p = project3D(node.lat, node.lng);
        if (p.visible) {
          const isSelected = activeNode.name === node.name;
          const isHq = node.type === "hub";

          // Pulsing glow
          const glowRadius = isSelected ? 8 : isHq ? 6 : 4;
          const nodeColor = isHq ? "#00ff7f" : isSelected ? "#00f0ff" : "#5eead4";

          ctx.shadowColor = nodeColor;
          ctx.shadowBlur = isSelected ? 14 : 8;

          // Outer halo
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius + 3, 0, Math.PI * 2);
          ctx.fillStyle = isHq ? "rgba(0, 255, 127, 0.2)" : "rgba(0, 240, 255, 0.15)";
          ctx.fill();

          // Center dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = nodeColor;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Text label for major nodes
          if (isSelected || isHq) {
            ctx.font = "bold 10px 'JetBrains Mono', monospace";
            ctx.fillStyle = nodeColor;
            ctx.fillText(node.name.split(" ")[0], p.x + 8, p.y + 3);
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Mouse drag handlers
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      rotationRef.current.y += dx * 0.006;
      rotationRef.current.x = Math.max(-0.9, Math.min(0.9, rotationRef.current.x + dy * 0.006));
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const canvasEl = canvas;
    canvasEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      canvasEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isRotating, activeNode]);

  return (
    <div className="relative w-full rounded-2xl bg-[#090d16]/95 border border-cyan-500/25 p-6 shadow-[0_0_50px_rgba(0,240,255,0.08)] overflow-hidden text-slate-200">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Globe size={18} />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Red Global de Abastecimiento & Comercio Exterior 3D
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Visualización interactiva 3D de rutas aduaneras UAP, suministro de repuestos e importaciones
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="flex items-center gap-1.5 px-3 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw size={12} className={isRotating ? "animate-spin" : ""} />
            <span>{isRotating ? "Auto-Giro" : "Pausado"}</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div className="relative flex items-center justify-center my-4 cursor-grab active:cursor-grabbing select-none">
        <canvas ref={canvasRef} className="max-w-full block" />
        <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 font-mono pointer-events-none">
          ⟳ Arrastra para rotar en 3D
        </div>
      </div>

      {/* Active Node Detail Card & Interactive Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Node Active Highlight */}
        <div className="md:col-span-1 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1">
              <Zap size={13} />
              Hub Seleccionado
            </span>
            <span className="px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {activeNode.metric}
            </span>
          </div>
          <h4 className="text-sm font-bold text-white">{activeNode.name}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{activeNode.description}</p>
        </div>

        {/* Node selector buttons */}
        <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {NODES.map((node) => {
            const isSelected = activeNode.name === node.name;
            return (
              <button
                key={node.name}
                onClick={() => setActiveNode(node)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  {node.type === "hub" && <ShieldCheck size={13} className="text-emerald-400" />}
                  {node.type === "air" && <Plane size={13} className="text-cyan-400" />}
                  {node.type === "port" && <Ship size={13} className="text-blue-400" />}
                  <span className="truncate">{node.name.split(" ")[0]}</span>
                </div>
                <div className="text-[10px] font-mono text-cyan-400/80 mt-1">{node.metric}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

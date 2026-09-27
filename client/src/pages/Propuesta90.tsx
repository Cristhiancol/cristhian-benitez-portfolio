/*
 * Propuesta 90 días — Planeador Controller de Mantenimiento
 * Cristhian Hernando Benitez Rodriguez
 * Design: blueprint industrial (plano de ingeniería), imprimible como PDF.
 * Sin cifras internas de la flota: los indicadores se muestran como fórmula
 * y su línea base se levanta en los días 1–30.
 */

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft, Printer, Download, MessageCircle, ArrowUpRight,
  Bus, Coins, Wrench, Database, GraduationCap,
  Gauge, ShieldCheck, Activity, CheckCircle2, Flag, Info,
  Timer, Hourglass, ClipboardList, TrendingDown, PackageX, CalendarCheck,
  FileText, ExternalLink,
} from "lucide-react";
import { generateWhatsAppLink } from "@/lib/recruiterHelper";
import "./propuesta90.css";

const CV_PDF = "/docs/Cristhian_Benitez_Rodriguez_HV_Planeador_Controller_Mantenimiento.pdf";

/* ── DATA ───────────────────────────────────────────────────────── */
const assets = [
  {
    icon: <Bus size={20} />,
    title: "Conozco la flota por dentro",
    body: <>Desde 2024 gestiono el abastecimiento de repuestos, lubricantes, herramientas y servicios de la flota, a partir de los <strong>cronogramas de mantenimiento</strong> y en coordinación con planeación, taller e inventarios.</>,
    metric: "260",
    metricLabel: "buses articulados abastecidos",
  },
  {
    icon: <Coins size={20} />,
    title: "Controlo el costo",
    body: <>Ahorros anuales en insumos críticos por negociación y esquemas de contratación. Administro contratos de <strong>lubricantes, combustible, culatas y cajas de dirección</strong>.</>,
    metric: "7–11 %",
    metricLabel: "ahorro anual en insumos críticos",
  },
  {
    icon: <Wrench size={20} />,
    title: "Decido con criterio técnico y datos",
    body: <>Negociación internacional de <strong>1.560 inyectores Delphi</strong> (ref. Volvo 20569291), con validación de muestra en un bus de la flota junto a Mantenimiento.</>,
    metric: "≈ COP 1.350 M",
    metricLabel: "reducción proyectada (en curso)",
  },
  {
    icon: <Database size={20} />,
    title: "Construyo mis propias herramientas",
    body: <><strong>SMART</strong> (Excel/VBA) para OC, stock y combustible; <strong>Asset Tracker</strong> para repuestos; <strong>StockFlow</strong> para datos de mantenimiento (en desarrollo).</>,
    metric: "1.868",
    metricLabel: "referencias de repuestos controladas",
  },
];

const cycleSteps = [
  {
    short: "Plan preventivo",
    title: "Plan preventivo por rutina",
    mine: false,
    body: "Rutinas por kilometraje y tiempo para cada tipo de bus, con frecuencias claras y una programación que respeta la operación.",
    points: [
      "Calendario por bus y por rutina",
      "Prioridad a sistemas de seguridad: frenos, dirección, llantas",
      "Revisión trimestral de frecuencias con datos de falla",
    ],
  },
  {
    short: "Kit de materiales",
    title: "Kit de materiales por rutina",
    mine: true,
    body: "Cada rutina con su lista de repuestos, lubricantes e insumos definida de antemano, para que el bus no espere en el taller.",
    points: [
      "Lista de materiales estándar por rutina",
      "Kits alistados antes de la ventana programada",
      "Hoy genero estas solicitudes según el cronograma",
    ],
  },
  {
    short: "Abastecimiento",
    title: "Abastecimiento: SIESA y OC",
    mine: true,
    body: "Solicitudes, órdenes de compra, contratos y seguimiento a proveedores para asegurar la continuidad del suministro al taller.",
    points: [
      "Stock mínimo y punto de reorden en repuestos críticos",
      "Contratos de lubricantes, culatas y cajas de dirección",
      "Es lo que hago hoy para los 260 buses",
    ],
  },
  {
    short: "Ejecución en taller",
    title: "Ejecución de la orden de trabajo",
    mine: false,
    body: "La orden de trabajo se ejecuta con el material listo, en la ventana acordada con operación y con el taller.",
    points: [
      "Programación semanal con jefes de taller",
      "Prioridad según la disponibilidad que exige la operación",
      "Control del backlog de OT pendientes",
    ],
  },
  {
    short: "Cierre y costeo",
    title: "Cierre y costeo de la OT",
    mine: false,
    body: "Cada orden se cierra con horas, repuestos y costo real. Sin cierre no hay dato, y sin dato no hay control.",
    points: [
      "Costo por bus, por sistema y por kilómetro",
      "Registro de falla y causa en el CMMS",
      "Conciliación con consumos registrados en SIESA",
    ],
  },
  {
    short: "Indicadores",
    title: "Indicadores y ajuste del plan",
    mine: false,
    body: "Los datos vuelven al plan: qué falla, cuánto cuesta y qué hay que ajustar para el siguiente ciclo.",
    points: [
      "Tablero mensual para la Subgerencia de Mantenimiento",
      "Pareto de fallas repetitivas por sistema",
      "Ajuste de frecuencias, kits y stock",
    ],
  },
];

const phases = [
  {
    days: "DÍAS 1 — 30",
    step: "01",
    title: "Entender y medir",
    goal: "Conocer el plan desde adentro y dejar una línea base honesta.",
    items: [
      "Revisar el plan vigente: rutinas, frecuencias y cumplimiento por tipo de bus",
      "Levantar la línea base de 8 indicadores con datos del CMMS (MainSaver) y SIESA",
      "Recorrer el taller con jefes de taller y técnicos: cuellos de botella y backlog",
      "Clasificar repuestos por costo y criticidad (ABC), empezando por los de seguridad",
    ],
    deliverable: "Diagnóstico del plan y línea base de indicadores",
  },
  {
    days: "DÍAS 31 — 60",
    step: "02",
    title: "Ordenar y asegurar",
    goal: "Que el plan se pueda cumplir: material listo, taller programado, gasto visible.",
    items: [
      "Kits estándar de materiales por rutina preventiva, amarrados al cronograma",
      "Stock mínimo y punto de reorden para los repuestos críticos",
      "Programación semanal del taller: preventivos, correctivos pendientes y campañas",
      "Presupuesto de mantenimiento por centro de costo con seguimiento mensual",
    ],
    deliverable: "Programación semanal, kits por rutina y presupuesto controlado",
  },
  {
    days: "DÍAS 61 — 90",
    step: "03",
    title: "Optimizar y controlar",
    goal: "Pasar de apagar incendios a decidir con datos.",
    items: [
      "Tablero mensual de indicadores para la Subgerencia de Mantenimiento",
      "Análisis de fallas repetitivas (Pareto por sistema: motor, inyección, frenos, dirección)",
      "Ajuste de frecuencias de rutinas según fallas y costo real",
      "Propuesta de ahorro en contratos y componentes reparables (culatas, cajas)",
    ],
    deliverable: "Tablero de control y plan de mejora del siguiente trimestre",
  },
];

type Kpi = {
  icon: React.ReactNode;
  pillar: string;
  title: string;
  formula: string;
  question: string;
  variant?: "mine" | "cost";
};

const kpis: Kpi[] = [
  { icon: <Gauge size={18} />, pillar: "Disponibilidad", title: "Disponibilidad de flota", formula: "Buses disponibles ÷ buses requeridos × 100", question: "¿Cuántos buses salen a operar cuando se necesitan?" },
  { icon: <CalendarCheck size={18} />, pillar: "Confiabilidad", title: "Cumplimiento del plan preventivo", formula: "Preventivos en su ventana ÷ programados × 100", question: "¿El plan se cumple o se queda en el papel?" },
  { icon: <Activity size={18} />, pillar: "Confiabilidad", title: "Relación preventivo / correctivo", formula: "Horas preventivo ÷ horas totales de mantenimiento", question: "¿Estamos anticipando o apagando incendios?" },
  { icon: <ShieldCheck size={18} />, pillar: "Confiabilidad", title: "MTBF — tiempo medio entre fallas", formula: "Km (u horas) de operación ÷ número de fallas", question: "¿Cada cuánto falla un bus o un sistema?" },
  { icon: <Timer size={18} />, pillar: "Disponibilidad", title: "MTTR — tiempo medio de reparación", formula: "Tiempo total de reparación ÷ número de reparaciones", question: "¿Cuánto tarda un bus en volver a operar?" },
  { icon: <Hourglass size={18} />, pillar: "Control", title: "Backlog de órdenes de trabajo", formula: "Horas-hombre pendientes ÷ capacidad semanal del taller", question: "¿Cuántas semanas de trabajo hay acumuladas?" },
  { icon: <TrendingDown size={18} />, pillar: "Costo", title: "Costo de mantenimiento por km", formula: "(Repuestos + mano de obra + servicios) ÷ km recorridos", question: "¿Cuánto cuesta cada kilómetro y a dónde se va el dinero?", variant: "cost" },
  { icon: <PackageX size={18} />, pillar: "Abastecimiento", title: "Buses detenidos por falta de repuesto", formula: "OT en espera de material ÷ OT abiertas × 100", question: "El punto donde hoy aporto directamente.", variant: "mine" },
];

// Tomado de la sección "Aporte al cargo" de la hoja de vida vigente.
const cvContributions = [
  { title: "Planeación de materiales para flota", body: "Solicitudes de repuestos alineadas con los cronogramas de mantenimiento de 260 buses articulados." },
  { title: "Control de inventarios", body: "Seguimiento de stock, consumos, pendientes de entrega y referencias críticas para anticipar faltantes." },
  { title: "Continuidad del suministro", body: "Priorización de requerimientos críticos y seguimiento a proveedores hasta la entrega al taller." },
  { title: "Flujo de solicitudes en SIESA", body: "Solicitudes y órdenes de repuestos, herramientas, servicios, fumigaciones y otros requerimientos operativos." },
  { title: "Coordinación entre áreas", body: "Enlace diario con planeación de mantenimiento, inventarios, compras, proveedores y operación." },
  { title: "Costos y analítica", body: "Negociación, comparativos de costo total, Excel avanzado, Python e IA aplicada al control de materiales." },
];

const wins = [
  { title: "Cero buses esperando material de rutina", body: "Kits de preventivo alistados antes de la ventana programada, cruzando el cronograma con el stock disponible." },
  { title: "Una sola vista del plan", body: "Cronograma, OT abiertas y solicitudes en SIESA en un mismo tablero semanal para taller, almacén y compras." },
  { title: "El costo de cada bus, visible cada mes", body: "Costo de mantenimiento por bus, por sistema y por kilómetro para decidir si reparar, reemplazar o renegociar." },
];

/* ── DIAL (portada) ─────────────────────────────────────────────── */
function DayDial() {
  const ticks = Array.from({ length: 90 }, (_, i) => i);
  return (
    <div className="p90-dial" aria-hidden="true">
      <svg viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(120,190,255,0.14)" strokeWidth="1" />
        {ticks.map((i) => {
          const a = (i / 90) * Math.PI * 2 - Math.PI / 2;
          const major = i % 30 === 0;
          const r1 = major ? 78 : 83;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * 88}
              y2={100 + Math.sin(a) * 88}
              stroke={major ? "#ff7a3d" : "rgba(120,190,255,0.35)"}
              strokeWidth={major ? 2 : 0.8}
            />
          );
        })}
        <circle
          className="p90-dial-arc"
          cx="100" cy="100" r="96"
          fill="none" stroke="url(#p90-grad)" strokeWidth="2.5" strokeLinecap="round"
          pathLength={1}
          transform="rotate(-90 100 100)"
        />
        <defs>
          <linearGradient id="p90-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f0ff" />
            <stop offset="100%" stopColor="#ff7a3d" />
          </linearGradient>
        </defs>
      </svg>
      <div className="p90-dial-num">
        <b>90</b>
        <span>DÍAS</span>
      </div>
    </div>
  );
}

/* ── CYCLE (ciclo del plan) ─────────────────────────────────────── */
function MaintenanceCycle() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % cycleSteps.length), 4200);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (i: number) => { setAuto(false); setActive(i); };
  const step = cycleSteps[active];
  const cx = 200, cy = 200, R = 140;

  return (
    <div className="p90-cycle">
      <svg className="p90-cycle-svg" viewBox="0 0 400 400" role="group" aria-label="Ciclo del plan de mantenimiento en 6 pasos">
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(120,190,255,0.14)" strokeWidth="14" />
        <circle className="p90-cycle-flow" cx={cx} cy={cy} r={R} fill="none" stroke="#ff7a3d" strokeOpacity="0.7" strokeWidth="2" />
        <text x={cx} y={cy - 24} textAnchor="middle" fill="rgba(233,238,243,0.4)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">PLAN DE</text>
        <text x={cx} y={cy - 10} textAnchor="middle" fill="rgba(233,238,243,0.4)" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">MANTENIMIENTO</text>
        <text x={cx} y={cy + 20} textAnchor="middle" fill="#e9eef3" fontFamily="Space Grotesk, sans-serif" fontSize="17" fontWeight="600">{step.short}</text>
        <text x={cx} y={cy + 40} textAnchor="middle" fill={step.mine ? "#34d399" : "#00f0ff"} fontFamily="JetBrains Mono, monospace" fontSize="9.5" letterSpacing="1.5">
          {`PASO ${String(active + 1).padStart(2, "0")} / 06`}
        </text>
        {cycleSteps.map((s, i) => {
          const a = (i / cycleSteps.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + Math.cos(a) * R;
          const y = cy + Math.sin(a) * R;
          const isActive = i === active;
          const base = s.mine ? "#34d399" : "#00f0ff";
          return (
            <g
              key={i}
              className="p90-node"
              role="button"
              tabIndex={0}
              aria-label={`Paso ${i + 1}: ${s.title}`}
              aria-pressed={isActive}
              onClick={() => pick(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(i); } }}
            >
              {isActive && <circle cx={x} cy={y} r={38} fill="none" stroke="#ff7a3d" strokeOpacity="0.35" strokeWidth="1" />}
              <circle
                className="p90-node-ring"
                cx={x} cy={y} r={30}
                fill={isActive ? "#ff7a3d" : "#0b1826"}
                stroke={isActive ? "#ff7a3d" : base}
                strokeWidth={1.5}
              />
              <text
                x={x} y={y + 6}
                textAnchor="middle"
                fill={isActive ? "#1a0a02" : base}
                fontFamily="Space Grotesk, sans-serif"
                fontSize="18"
                fontWeight="700"
              >
                {String(i + 1).padStart(2, "0")}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="p90-step-panel" aria-live="polite">
        <span className={`p90-step-tag${step.mine ? " is-mine" : ""}`}>
          {step.mine ? <CheckCircle2 size={13} /> : <Flag size={13} />}
          {step.mine ? "Mi experiencia actual" : "Lo que sumo como Planeador Controller"}
        </span>
        <h3>{step.title}</h3>
        <p>{step.body}</p>
        <ul>
          {step.points.map((p, j) => (
            <li key={j}><CheckCircle2 size={15} /><span>{p}</span></li>
          ))}
        </ul>
        <div className="p90-step-dots">
          {cycleSteps.map((s, i) => (
            <button key={i} aria-label={`Ver paso ${i + 1}: ${s.short}`} aria-pressed={i === active} onClick={() => pick(i)}>
              <span />
            </button>
          ))}
        </div>
        <div className="p90-legend">
          <span><i style={{ background: "#34d399" }} />Lo que hago hoy</span>
          <span><i style={{ background: "#00f0ff" }} />Lo que sumo en el cargo</span>
        </div>
      </div>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────── */
export default function Propuesta90() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Título propio y fuera de buscadores: es un documento para compartir por enlace.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Propuesta 90 días | Cristhian Benitez";
    const meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prevRobots = meta?.content;
    if (meta) meta.content = "noindex, nofollow";
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (meta && prevRobots) meta.content = prevRobots;
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = rootRef.current?.querySelectorAll<HTMLElement>(".p90-reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const waLink = generateWhatsAppLink("Hola Cristhian, revisé tu propuesta de 90 días para Planeador Controller de Mantenimiento y me gustaría conversar.");

  return (
    <div className="p90" ref={rootRef}>
      {/* ── Top bar ── */}
      <div className="p90-bar">
        <div className="p90-wrap p90-bar-inner">
          <a href="/"><ArrowLeft size={15} />Portafolio</a>
          <span className="p90-bar-title p90-mono">Propuesta · Planeador Controller de Mantenimiento</span>
          <div className="p90-bar-actions">
            <a href="#hoja-de-vida"><FileText size={15} />Hoja de vida</a>
            <button className="p90-print" onClick={() => window.print()}>
              <Printer size={15} />Guardar PDF
            </button>
          </div>
        </div>
      </div>

      {/* ── Cover ── */}
      <header className="p90-cover">
        <div className="p90-wrap">
          <div className="p90-cover-grid">
            <div>
              <span className="p90-doc-id p90-mono">DOC P90-01 · REV. A · SEPTIEMBRE 2026</span>
              <h1 className="p90-h1">
                Del repuesto a tiempo <em>al plan que se cumple.</em>
              </h1>
              <p className="p90-lede">
                Mi propuesta para los primeros 90 días como <strong>Planeador Controller de Mantenimiento</strong>:
                una flota más disponible, un plan preventivo que se cumple y cada peso de mantenimiento bajo control.
              </p>
              <div className="p90-pillars">
                <span className="p90-pillar"><Activity size={13} />Confiabilidad</span>
                <span className="p90-pillar"><Gauge size={13} />Disponibilidad</span>
                <span className="p90-pillar"><ShieldCheck size={13} />Seguridad</span>
                <span className="p90-pillar is-cost"><Coins size={13} />Costo</span>
              </div>
            </div>
            <DayDial />
          </div>

          <div className="p90-titleblock">
            <div><small>Candidato</small><strong>Cristhian Hernando Benitez Rodriguez</strong></div>
            <div><small>Cargo actual</small><strong>Gestor de Compras · desde 02.2024</strong></div>
            <div><small>Alcance</small><strong>260 buses articulados · Bogotá</strong></div>
            <div><small>Enfoque</small><strong>Plan, materiales, costo e indicadores</strong></div>
          </div>
        </div>
      </header>

      {/* ── 01 Punto de partida ── */}
      <section className="p90-section">
        <div className="p90-wrap">
          <div className="p90-section-head p90-reveal">
            <span className="p90-section-num">01</span>
            <div>
              <span className="p90-eyebrow">Punto de partida</span>
              <h2 className="p90-h2">No llego a conocer la operación. Ya estoy en ella.</h2>
              <p className="p90-sub">
                Lo que traigo desde el primer día: conocimiento de la flota, de los proveedores y de dónde se va el dinero del mantenimiento.
              </p>
            </div>
          </div>

          <div className="p90-assets">
            {assets.map((a, i) => (
              <article className="p90-card p90-asset p90-reveal" key={i} style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="p90-asset-icon">{a.icon}</div>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
                <div className="p90-asset-metric">
                  <b>{a.metric}</b>
                  <span>{a.metricLabel}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="p90-gap p90-reveal">
            <GraduationCap className="p90-gap-icon" size={24} />
            <div>
              <h3>Lo que complemento, dicho de frente</h3>
              <p>
                No vengo de la ingeniería mecánica, y no lo voy a disfrazar. Vengo del lado que hace que el plan se pueda
                cumplir: <strong>materiales, costos, contratos e indicadores</strong>. Para el criterio técnico trabajo de la mano
                con los jefes de taller, los técnicos y el soporte del fabricante, y durante el primer semestre me formaré en
                gestión de mantenimiento e indicadores de confiabilidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 Ciclo ── */}
      <section className="p90-section">
        <div className="p90-wrap">
          <div className="p90-section-head p90-reveal">
            <span className="p90-section-num">02</span>
            <div>
              <span className="p90-eyebrow">El ciclo que propongo cerrar</span>
              <h2 className="p90-h2">Hoy participo en dos pasos del ciclo. El cargo es cerrarlo completo.</h2>
              <p className="p90-sub">
                Toca cada paso para ver qué implica. En verde, lo que ya hago todos los días; en cian, lo que sumo como Planeador Controller.
              </p>
            </div>
          </div>
          <div className="p90-reveal">
            <MaintenanceCycle />
          </div>
        </div>
      </section>

      {/* ── 03 Hoja de ruta ── */}
      <section className="p90-section">
        <div className="p90-wrap">
          <div className="p90-section-head p90-reveal">
            <span className="p90-section-num">03</span>
            <div>
              <span className="p90-eyebrow">Hoja de ruta</span>
              <h2 className="p90-h2">Tres etapas, un entregable concreto en cada una.</h2>
              <p className="p90-sub">
                Primero escuchar y medir, después ordenar, al final optimizar. Sin cambios bruscos a una operación que no se puede detener.
              </p>
            </div>
          </div>

          <div className="p90-reveal">
            <div className="p90-ruler" aria-hidden="true">
              <div className="p90-ruler-track" />
              <div className="p90-ruler-fill" />
              {Array.from({ length: 19 }, (_, i) => i * 5).map((d) => (
                <div key={d} className={`p90-ruler-tick${d % 30 === 0 ? " is-major" : ""}`} style={{ left: `${(d / 90) * 100}%` }} />
              ))}
              <span className="p90-ruler-label" style={{ left: "0%" }}>DÍA 0</span>
              <span className="p90-ruler-label is-mid" style={{ left: "33.33%" }}>DÍA 30</span>
              <span className="p90-ruler-label is-mid" style={{ left: "66.66%" }}>DÍA 60</span>
              <span className="p90-ruler-label" style={{ left: "100%", transform: "translateX(-100%)" }}>DÍA 90</span>
            </div>
          </div>

          <div className="p90-phases">
            {phases.map((p, i) => (
              <article className="p90-card p90-phase p90-reveal" key={i} style={{ transitionDelay: `${i * 90}ms` }}>
                <div className="p90-phase-head">
                  <span className="p90-phase-days">{p.days}</span>
                  <span className="p90-phase-step">{p.step}</span>
                </div>
                <h3>{p.title}</h3>
                <p className="p90-phase-goal">{p.goal}</p>
                <ul>
                  {p.items.map((it, j) => (
                    <li key={j}><ClipboardList size={15} /><span>{it}</span></li>
                  ))}
                </ul>
                <div className="p90-deliverable">
                  <Flag size={15} />
                  <div><small>ENTREGABLE</small>{p.deliverable}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 Indicadores ── */}
      <section className="p90-section">
        <div className="p90-wrap">
          <div className="p90-section-head p90-reveal">
            <span className="p90-section-num">04</span>
            <div>
              <span className="p90-eyebrow">Tablero de control</span>
              <h2 className="p90-h2">Ocho indicadores para gobernar el plan.</h2>
              <p className="p90-sub">
                Cada uno responde una pregunta que la Subgerencia necesita contestar cada mes: confiabilidad, disponibilidad y costo.
              </p>
            </div>
          </div>

          <div className="p90-kpis">
            {kpis.map((k, i) => (
              <article
                className={`p90-card p90-kpi p90-reveal${k.variant ? ` is-${k.variant}` : ""}`}
                key={i}
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <div className="p90-kpi-top">
                  {k.icon}
                  <span className="p90-kpi-pillar">{k.pillar}</span>
                </div>
                <h3>{k.title}</h3>
                <div className="p90-formula">{k.formula}</div>
                <p>{k.question}</p>
              </article>
            ))}
          </div>
          <p className="p90-note">
            <Info size={14} />
            Sin cifras internas: la línea base de cada indicador se levanta en los días 1–30 con datos del CMMS y de SIESA, y desde ahí se fijan las metas con la Subgerencia.
          </p>
        </div>
      </section>

      {/* ── 05 Quick wins ── */}
      <section className="p90-section">
        <div className="p90-wrap">
          <div className="p90-section-head p90-reveal">
            <span className="p90-section-num">05</span>
            <div>
              <span className="p90-eyebrow">Primeras victorias</span>
              <h2 className="p90-h2">Tres resultados visibles antes del día 90.</h2>
            </div>
          </div>
          <div className="p90-wins">
            {wins.map((w, i) => (
              <article className="p90-card p90-win p90-reveal" key={i} style={{ transitionDelay: `${i * 80}ms` }}>
                <span className="p90-win-num">QUICK WIN {String(i + 1).padStart(2, "0")}</span>
                <h3>{w.title}</h3>
                <p>{w.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 Hoja de vida ── */}
      <section id="hoja-de-vida" className="p90-section">
        <div className="p90-wrap">
          <div className="p90-section-head p90-reveal">
            <span className="p90-section-num">06</span>
            <div>
              <span className="p90-eyebrow">Hoja de vida</span>
              <h2 className="p90-h2">El respaldo de esta propuesta, en dos páginas.</h2>
              <p className="p90-sub">
                Seis frentes de aporte al cargo, con la experiencia que los sustenta. Consúltala aquí o descárgala en PDF.
              </p>
            </div>
          </div>

          <div className="p90-cv">
            <div className="p90-cv-list p90-reveal">
              <span className="p90-cv-label p90-mono">Aporte al cargo de Planeador Controller</span>
              <ol>
                {cvContributions.map((c, i) => (
                  <li key={i}>
                    <span className="p90-cv-idx">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="p90-cv-actions">
                <a className="p90-btn is-primary" href={CV_PDF} download="Cristhian_Benitez_Rodriguez_HV.pdf">
                  <Download size={16} />Descargar PDF
                </a>
                <a className="p90-btn" href={CV_PDF} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />Abrir en otra pestaña
                </a>
              </div>
            </div>

            <div className="p90-cv-sheet p90-reveal">
              <div className="p90-cv-sheet-bar p90-mono">
                <span><FileText size={13} />HV · Cristhian Hernando Benitez Rodriguez</span>
                <span>2 págs.</span>
              </div>
              <object data={`${CV_PDF}#view=FitH&toolbar=0`} type="application/pdf" aria-label="Hoja de vida de Cristhian Hernando Benitez Rodriguez">
                <div className="p90-cv-fallback">
                  <FileText size={36} />
                  <p>Tu navegador no muestra PDF incrustados.</p>
                  <a className="p90-btn is-primary" href={CV_PDF} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={16} />Ver hoja de vida
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cierre ── */}
      <section className="p90-close">
        <div className="p90-wrap p90-reveal">
          <p className="p90-quote">
            El plan de mantenimiento solo funciona si el repuesto llega a tiempo y el costo se controla.{" "}
            <em>Esa parte ya la hago todos los días.</em> Quiero cerrar el ciclo completo.
          </p>
          <p className="p90-sign">
            — <strong>Cristhian Hernando Benitez Rodriguez</strong> · Gestor de Compras, candidato a Planeador Controller de Mantenimiento
          </p>
          <div className="p90-ctas">
            <a className="p90-btn is-primary" href={CV_PDF} download="Cristhian_Benitez_HV.pdf">
              <Download size={16} />Descargar hoja de vida
            </a>
            <a className="p90-btn is-wa" href={waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={16} />Conversemos
            </a>
            <a className="p90-btn" href="/">
              Ver portafolio completo<ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      <footer className="p90-footer">
        <div className="p90-wrap">
          Documento preparado por Cristhian Hernando Benitez Rodriguez · cristianbenitez50@hotmail.com · (+57) 301 374 8901 ·
          No incluye datos internos de la operación.
        </div>
      </footer>
    </div>
  );
}

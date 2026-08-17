/*
 * Procurement Data-Driven Portfolio v4
 * Cristhian Hernando Benitez Rodriguez
 * Design: SVG icons, no emojis, premium visual language
 */

import { useState, useEffect } from "react";
import {
  Mail, Phone, Linkedin, Github, BookOpen, MapPin,
  Download, MessageSquare, ArrowRight, BrainCircuit,
  BarChart3, Package, TrendingUp, Globe, Award,
  ShieldCheck, Cpu, Database, Code2, Boxes,
  CheckCircle2, Briefcase, Clock, ChevronRight,
  Send, User, Building2, Sparkles, Zap, Layers,
  FileText, CircleDot,
} from "lucide-react";
import { useNotification } from "@/contexts/NotificationContext";

/* ── CONSTANTS ──────────────────────────────────────────────────── */
const CV_PDF =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/CristhianHernandoBenitezRodriguez-Hojadevida_61fcabf4.pdf";
const PROFILE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/cristhian-profile-photo_0a53abcf.png";

/* ── DATA ───────────────────────────────────────────────────────── */
const heroTags = [
  { icon: <Code2 size={13} />, label: "Python · Pandas · Scikit-Learn" },
  { icon: <BarChart3 size={13} />, label: "SQL · Power BI · Tableau" },
  { icon: <Package size={13} />, label: "SAP (MM, B1) · SIESA" },
  { icon: <TrendingUp size={13} />, label: "Abastecimiento Estratégico" },
  { icon: <BrainCircuit size={13} />, label: "IA Predictiva (Gemini AI)" },
  { icon: <Globe size={13} />, label: "Comercio Exterior & SLAs" },
];

const kpis = [
  { num: "11", unit: "%", label: "Ahorros constantes en compras" },
  { num: "260", unit: "",  label: "Buses bajo suministro e infraestructura" },
  { num: "40", unit: "%",  label: "Reducción costos aduaneros" },
  { num: "60", unit: "%",  label: "Disminución tiempos de entrega" },
  { num: "100", unit: "%", label: "Cumplimiento DIAN sin sanciones" },
];

const quickInfo = [
  { icon: <MapPin size={16} />,    label: "Ubicación",    value: "Bogotá, D.C., Colombia" },
  { icon: <Clock size={16} />,     label: "Experiencia",  value: "+8 años en Compras, Comercio Exterior & Abastecimiento" },
  { icon: <TrendingUp size={16} />,label: "Ahorros",      value: "Del 7% al 11% en adquisición de bienes y servicios" },
  { icon: <Globe size={16} />,     label: "Especialidad", value: "Abastecimiento Estratégico, Contratación & SLAs" },
  { icon: <Database size={16} />,  label: "Stack Data",   value: "Python (Pandas) · SQL · Excel Avanzado (VBA) · Power BI" },
  { icon: <Award size={16} />,     label: "Formación",    value: "Finanzas & Negocios Int. — F.U. Unimonserrate (2023)" },
];

const highlights = [
  { text: <>Lideré la gestión estratégica de repuestos e infraestructura para <strong>260 buses</strong>, administrando contratos complejos de lubricantes (Terpel), combustible y reparaciones técnicas.</> },
  { text: <>Diseñé e implementé el <strong>Proyecto SMART</strong> para control y seguimiento integral de órdenes de compra, stock y facturación.</> },
  { text: <>Implementé <strong>análisis predictivos de inventarios con IA</strong> (Gemini AI) y modelos en Python (Pandas/Scikit-learn) para prevenir desabastecimientos.</> },
  { text: <>Lideré el proyecto <strong>UAP</strong> de comercio exterior que redujo gastos aduaneros en un 40% y tiempos de entrega en un 60% con 100% cumplimiento DIAN.</> },
];

const experience = [
  {
    date: "02.2024 — Actualmente",
    tag: "Tiempo completo",
    role: "Gestor de Compras",
    org: "Somos Bogotá Usme S.A.S.",
    summary:
      "Liderazgo estratégico en el suministro de repuestos e infraestructura para una flota de 260 buses. Gestión integral de contratos de alta complejidad para infraestructura y servicios (Terpel, mantenimiento de estaciones de combustible, reparaciones técnicas de culatas y cajas de dirección, suministro y seguimiento de combustible). Desarrollo de KPIs, cuadros comparativos e inventarios predictivos con IA.",
    results: [
      "Ahorros constantes del <strong>7 % al 11 %</strong> mediante negociación estratégica y optimización de esquemas de contratación",
      "Proyecto <strong>SMART</strong>: Control y seguimiento integral de órdenes de compra, fluctuaciones, stock y facturación",
      "Análisis predictivo de inventarios mediante herramientas de <strong>IA</strong> para mantener stock óptimo y prevenir desabastecimientos",
      "Elaboración de cuadros comparativos y sustentación de informes ejecutivos ante instancias de gasto",
    ],
  },
  {
    date: "06.2020 — 02.2024",
    tag: "Tiempo completo",
    role: "Analista de Compras Técnicas",
    org: "Helicentro S.A.S.",
    summary:
      "Gestión de cotizaciones para órdenes de compra y servicios técnicos aeronáuticos e industriales. Estrategias para sobre-stock y análisis de cuadros comparativos para decisiones informadas.",
    results: [
      "Disminución del <strong>20 %</strong> en tiempo de respuesta de requerimientos técnicos",
      "Mejora del <strong>30 %</strong> en verificaciones de stock mediante fórmulas avanzadas en Excel",
      "Construcción de cuadros de seguimiento a órdenes de compra y memorandos pendientes",
    ],
  },
  {
    date: "02.2018 — 06.2020",
    tag: "Tiempo completo",
    role: "Auxiliar Técnico — Comercio Exterior",
    org: "Helicentro S.A.S.",
    summary:
      "Verificación de arribo de mercancías, gestión de valores de liberación, liquidación en SIESA y prorrateo manual. Gestión de OC, negociación con proveedores internacionales y reporte mensual UAP.",
    results: [
      "Reducción del <strong>40 %</strong> en gastos con agencia de aduanas mediante optimización de importaciones UAP",
      "Disminución del <strong>60 %</strong> en tiempos de entrega de mercancías",
      "<strong>100 %</strong> de cumplimiento de requerimientos DIAN, evitando sanciones",
    ],
  },
  {
    date: "12.2016 — 02.2018",
    tag: "Tiempo completo",
    role: "Auxiliar de Aduanas — Compras",
    org: "Agencia de Aduanas Ceva Logistics",
    summary:
      "Análisis de inventarios y gestión de servicios de recepción, almacenamiento y entrega de carga en depósito aduanero. Inspección de carga, asistencia a aforos y alistamiento documental.",
    results: [
      "Reducción del <strong>20 %</strong> en tiempos de inspección de mercancía",
      "Aumento del <strong>40 %</strong> en productividad mediante método en verificación de archivo SAP",
      "Implementación del <strong>acta de inspección virtual automatizada al 100 %</strong>",
    ],
  },
];

const projects = [
  {
    id: "PRJ-001",
    status: "status-live",
    statusLabel: "ACTIVO / IA",
    icon: <BrainCircuit size={20} />,
    title: "StockFlow — Sistema de IA para Inventarios",
    from: "STOCK REACTIVO",
    to: "PREDICCIÓN IA",
    description:
      "Sistema inteligente con IA (Gemini AI) para optimización de inventarios y prevención proactiva de desabastecimiento en operaciones críticas.",
    results: [
      "Mantenimiento de niveles óptimos de stock",
      "Prevención de desabastecimientos críticos",
      "Alertas automáticas de reorden predictivo",
    ],
    stack: ["Python", "Gemini AI", "Pandas", "Scikit-learn"],
  },
  {
    id: "PRJ-002",
    status: "status-live",
    statusLabel: "EN USO",
    icon: <BarChart3 size={20} />,
    title: "Análisis Predictivo de Costos Logísticos",
    from: "DATOS HISTÓRICOS",
    to: "92% PRECISIÓN",
    description:
      "Modelos en Python para anticipar variaciones de precio en insumos, fletes y servicios antes de que afecten el presupuesto.",
    results: [
      "Modelos con 92% de precisión predictiva",
      "Mitigación de variaciones presupuestales",
      "Sustentación sólida en comités de gasto",
    ],
    stack: ["Python", "Pandas", "Scikit-learn", "Power BI", "SQL"],
  },
  {
    id: "PRJ-003",
    status: "status-live",
    statusLabel: "ACTIVO",
    icon: <Boxes size={20} />,
    title: "Asset Tracker — Dashboard IA & Drive",
    from: "GOOGLE DRIVE",
    to: "DASHBOARD IA",
    description:
      "Dashboard interactivo de inventario y cadena de suministro con IA y sincronización automática con archivos en Google Drive.",
    results: [
      "Sincronización automatizada con Google Drive",
      "Monitoreo continuo de activos e insumos",
      "Alertas de stock y KPIs dinámicos",
    ],
    stack: ["React", "TypeScript", "Node.js", "Gemini AI", "Google Drive API"],
  },
  {
    id: "PRJ-004",
    status: "status-done",
    statusLabel: "COMPLETADO",
    icon: <Layers size={20} />,
    title: "Proyecto SMART — Control de OC y Stock",
    from: "ÓRDENES COMPRA",
    to: "CONTROL 260 BUSES",
    description:
      "Sistema de control y seguimiento de órdenes de compra, stock y facturación para la operación de 260 buses articulados.",
    results: [
      "Ahorros del 7% al 11% en insumos anuales",
      "Monitoreo de fluctuaciones y facturación",
      "Optimización del tiempo de respuesta del área",
    ],
    stack: ["Excel / VBA", "Macros", "Power Query", "Dashboards"],
  },
  {
    id: "PRJ-005",
    status: "status-done",
    statusLabel: "COMPLETADO",
    icon: <Globe size={20} />,
    title: "Proyecto UAP — Logística Aduanera",
    from: "IMPORTACIÓN",
    to: "DIAN",
    description:
      "Optimización de procesos de importación y nacionalización bajo régimen UAP en el sector aeronáutico y de comercio exterior.",
    results: [
      "40% reducción en gastos de agencia aduanera",
      "60% disminución en tiempos de entrega",
      "100% cumplimiento de requerimientos DIAN",
    ],
    stack: ["SIESA ERP", "Excel Avanzado", "Regulación DIAN", "SAP"],
  },
];

const toolGroups = [
  {
    icon: <Boxes size={15} />,
    group: "Régimen & Abastecimiento",
    items: ["Abastecimiento Estratégico", "Normatividad (BanRep, DIAN, Comercio Exterior)", "Esquemas de Contratación & SLAs", "Gestión de Proveedores", "Costeo Logístico"],
  },
  {
    icon: <Layers size={15} />,
    group: "Herramientas de Gestión & ERP",
    items: ["SAP (Business One, MM)", "SIESA ERP", "NEO System", "Jira", "Power Query"],
  },
  {
    icon: <Code2 size={15} />,
    group: "Análisis de Datos & Programación",
    items: ["Excel Avanzado (Macros, VBA)", "Python (Pandas, Scikit-learn)", "SQL", "Tableau", "Power BI"],
  },
  {
    icon: <BrainCircuit size={15} />,
    group: "Inteligencia Artificial & Tech",
    items: ["IA Predictiva (Gemini AI)", "JavaScript (React)", "Next.js", "TypeScript", "tRPC · MySQL · S3"],
  },
];

const contactLinks = [
  { icon: <Mail size={20} />,      label: "Email Directo",       value: "cristianbenitez50@hotmail.com", href: "mailto:cristianbenitez50@hotmail.com" },
  { icon: <Phone size={20} />,     label: "Teléfono / WhatsApp", value: "(+57) 301 374 8901",            href: "tel:+573013748901" },
  { icon: <Linkedin size={20} />,  label: "LinkedIn",            value: "Cristhian Hernando Benítez Rodríguez", href: "https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/" },
  { icon: <Github size={20} />,    label: "GitHub",              value: "Cristhiancol",                  href: "https://github.com/Cristhiancol/cristhian-benitez-portfolio" },
  { icon: <BookOpen size={20} />,  label: "Notion CV",           value: "Portafolio completo",           href: "https://rare-plume-e37.notion.site/Cristhian-Hernando-Benitez-Rodriguez-Portafolio-Profesional-337952d8da288166b76ce48b450aa0fc" },
  { icon: <MapPin size={20} />,    label: "Ubicación",           value: "Bogotá, D.C., Colombia",        href: null },
];

const interestOptions = [
  { icon: <Briefcase size={14} />,    label: "Oportunidad laboral" },
  { icon: <Zap size={14} />,          label: "Proyecto freelance / Consultoría" },
  { icon: <Sparkles size={14} />,     label: "Automatización de procesos" },
  { icon: <BarChart3 size={14} />,    label: "Modelación predictiva / Data Science" },
  { icon: <Layers size={14} />,       label: "Networking / Colaboración" },
];

/* ── CONTACT FORM ─────────────────────────────────────────────── */
function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", company: "", interest: "", message: "" });
  const { addNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // 1. Intentar enviar al backend local primero
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          setStatus("sent");
          addNotification({ type: "success", title: "Mensaje enviado", message: "Cristhian recibirá tu mensaje. Te responderá pronto.", duration: 5000 });
          return;
        }
      }
      throw new Error("Backend offline o error");
    } catch (backendError) {
      console.warn("Backend local no disponible, usando fallback directo a FormSubmit...", backendError);

      // 2. Fallback: Enviar directamente a FormSubmit desde el navegador
      try {
        const fsRes = await fetch("https://formsubmit.co/ajax/ffa2b23738a41a60b7b1da7a15e9d88e", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            company: form.company,
            interest: form.interest,
            message: form.message,
            _subject: `[Portafolio] Nuevo mensaje de ${form.name}`,
          }),
        });

        if (fsRes.ok) {
          const fsData = await fsRes.json();
          if (fsData.success === "true" || fsRes.status === 200) {
            setStatus("sent");
            addNotification({ type: "success", title: "Mensaje enviado", message: "Cristhian recibirá tu mensaje. Te responderá pronto.", duration: 5000 });
            return;
          }
        }
        throw new Error("Fallback failed");
      } catch (fallbackError) {
        console.error("Error en ambos métodos de envío:", fallbackError);
        setStatus("error");
        addNotification({ type: "error", title: "Error al enviar", message: "Intenta de nuevo o escríbenos a cristiancoli50@gmail.com", duration: 6000 });
      }
    }
  };


  if (status === "sent") {
    return (
      <div className="form-success show">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <CheckCircle2 size={52} color="var(--teal)" strokeWidth={1.5} />
        </div>
        <h3 className="form-success-title">¡Mensaje enviado!</h3>
        <p className="form-success-sub">Tu mensaje llegó directamente a la bandeja de Cristhian. Te responderá en menos de 24 horas hábiles.</p>
        <button onClick={() => { setStatus("idle"); setForm({ name: "", email: "", company: "", interest: "", message: "" }); }} style={{ marginTop: 20, color: "var(--teal)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.05em" }}>
          ← ENVIAR OTRO MENSAJE
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
        <MessageSquare size={20} color="var(--teal)" />
        <h3 className="form-title" style={{ margin: 0 }}>Déjame tus datos</h3>
      </div>
      <p className="form-sub">Te respondo en menos de 24 horas hábiles.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="form-field">
          <label htmlFor="cf-name"><User size={10} style={{ verticalAlign: "middle", marginRight: 4 }} />Nombre *</label>
          <input id="cf-name" type="text" placeholder="Tu nombre completo" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="form-field">
          <label htmlFor="cf-email"><Mail size={10} style={{ verticalAlign: "middle", marginRight: 4 }} />Email *</label>
          <input id="cf-email" type="email" placeholder="tu@empresa.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="cf-company"><Building2 size={10} style={{ verticalAlign: "middle", marginRight: 4 }} />Empresa / Organización</label>
        <input id="cf-company" type="text" placeholder="¿Dónde trabajas?" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
      </div>

      <div className="form-field">
        <label htmlFor="cf-interest"><Sparkles size={10} style={{ verticalAlign: "middle", marginRight: 4 }} />¿Qué te interesa?</label>
        <select id="cf-interest" value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}>
          <option value="">Selecciona una opción…</option>
          {interestOptions.map((o, i) => (
            <option key={i} value={o.label}>{o.label}</option>
          ))}
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cf-msg"><FileText size={10} style={{ verticalAlign: "middle", marginRight: 4 }} />Mensaje *</label>
        <textarea id="cf-msg" placeholder="Cuéntame de qué se trata…" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>

      <button
        type="submit"
        className="form-submit"
        disabled={status === "sending"}
        style={{ opacity: status === "sending" ? 0.7 : 1, cursor: status === "sending" ? "not-allowed" : "pointer" }}
      >
        <Send size={16} style={{ marginRight: 8 }} />
        {status === "sending" ? "Enviando…" : "Enviar mensaje"}
      </button>
      {status === "error" && (
        <p style={{ color: "var(--amber)", fontSize: 13, marginTop: 10, textAlign: "center" }}>
          No se pudo enviar. Escríbenos a{" "}
          <a href="mailto:cristiancoli50@gmail.com" style={{ color: "var(--teal)" }}>
            cristiancoli50@gmail.com
          </a>
        </p>
      )}
      <p className="form-note">
        <ShieldCheck size={11} style={{ verticalAlign: "middle", marginRight: 4 }} />
        Tus datos solo se usan para responderte
      </p>
    </form>
  );
}


/* ── MAIN ─────────────────────────────────────────────────────── */
export default function Home() {
  const { addNotification } = useNotification();
  const [dynProfile, setDynProfile] = useState<{
    cvPdfUrl?: string;
    profileImgUrl?: string;
    fullName?: string;
    title?: string;
    location?: string;
    email?: string;
    phone?: string;
    linkedInUrl?: string;
    bioSummary?: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data.ok && data.profile) {
          setDynProfile(data.profile);
        }
      })
      .catch(() => {});
  }, []);

  const cvPdfUrl = dynProfile?.cvPdfUrl || CV_PDF;
  const profileImgUrl = dynProfile?.profileImgUrl || PROFILE_IMG;
  const fullName = dynProfile?.fullName || "Cristhian Hernando Benítez Rodríguez";

  return (
    <>
      <div className="grain" aria-hidden="true" />

      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav className="topnav" aria-label="Navegación principal">
        <div className="wrap topnav-inner">
          <a href="#inicio" className="brand">
            cristhian<span className="brand-dot">.</span>benitez
          </a>
          <div className="nav-links">
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#experiencia">Experiencia</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#herramientas">Stack</a>
            <a href="#contacto" className="nav-cta">
              <Mail size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
              Contacto
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <header id="inicio" className="hero">
        <div className="wrap">
          <div className="hero-layout">

            {/* LEFT */}
            <div>
              <p className="hero-label fade-up fade-up-1">
                <span className="dot" aria-hidden="true" />
                DISPONIBLE · {dynProfile?.location ? dynProfile.location.toUpperCase() : "BOGOTÁ, COLOMBIA"} · PROCUREMENT DATA-DRIVEN
              </p>

              <h1 className="hero-title fade-up fade-up-2">
                Llevo Compras de{" "}
                <span className="strike">reportar el pasado</span>
                <br />
                a <span className="accent">predecir el futuro</span>
              </h1>

              <p className="hero-sub fade-up fade-up-3">
                Gestor de abastecimiento con <strong>+8 años</strong> combinando
                negociación estratégica, <span className="accent">Python</span> e{" "}
                <span className="accent-amber">IA aplicada</span> a Supply Chain
                — desde aforos aduaneros hasta dashboards predictivos.
              </p>

              <div className="hero-tags fade-up fade-up-4">
                {heroTags.map((t, i) => (
                  <span key={i} className={`hero-tag ${i < 2 ? "hero-tag-teal" : i < 4 ? "hero-tag-amber" : ""}`}>
                    {t.icon}
                    {t.label}
                  </span>
                ))}
              </div>

              <div className="hero-actions fade-up fade-up-5">
                <a href="#proyectos" className="btn btn-primary">
                  Ver proyectos
                  <ArrowRight size={16} />
                </a>
                <a
                  href={cvPdfUrl}
                  download="Cristhian_Benitez_CV.pdf"
                  onClick={() => addNotification({ type: "success", title: "Descarga iniciada", message: "La hoja de vida se está descargando.", duration: 3000 })}
                  className="btn btn-ghost"
                >
                  <Download size={15} />
                  Descargar HV
                </a>
                <a href="#contacto" className="btn btn-ghost">
                  <MessageSquare size={15} />
                  Contáctame
                </a>
              </div>
            </div>

            {/* RIGHT — photo */}
            <div className="hero-photo-col">
              <div className="hero-photo-card fade-up fade-up-3">
                <img
                  src={profileImgUrl}
                  alt={`${fullName} — Procurement Data-Driven`}
                />
                <div className="photo-badge">
                  <div>
                    <div className="photo-badge-name">{fullName.split(" ")[0]} {fullName.split(" ")[2] || fullName.split(" ")[1] || "Benítez"}</div>
                    <div className="photo-badge-role">Gestor de Compras · Data Analyst</div>
                  </div>
                  <div className="photo-badge-status">
                    <CircleDot size={12} />
                    Disponible
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* KPIs */}
        <div className="manifest-strip">
          <div className="wrap manifest-grid">
            {kpis.map((k, i) => (
              <div className="manifest-item" key={i}>
                <span className="manifest-num">{k.num}<small>{k.unit}</small></span>
                <span className="manifest-label">{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── SOBRE MÍ — BENTO ────────────────────────────────── */}
      <section id="sobre-mi" className="section">
        <div className="wrap">
          <span className="eyebrow">// sobre mí</span>
          <h2 className="section-title">El perfil que no cabe en un CV</h2>
          <p className="section-sub">
            Vine de Compras, no del mundo tech — y eso es exactamente lo que me hace diferente.
          </p>

          <div className="bento">
            {/* Historia */}
            <div className="bento-card b-story">
              <p className="bento-label">
                <User size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                HISTORIA
              </p>
              <p className="bento-lede">
                Profesional en Finanzas y Negocios Internacionales con +8 años en gestión de cadena de suministro, compras, comercio exterior y abastecimiento estratégico.
              </p>
              <p className="bento-body">
                Mi enfoque se centra en la <strong>transformación digital del abastecimiento</strong>, integrando Ciencia de Datos, Python, Excel avanzado e Inteligencia Artificial (IA) para pasar de la gestión reactiva a la anticipación y optimización predictiva de los procesos.
              </p>
              <p className="bento-body">
                Especializado en la optimización de procesos de adquisición de bienes y servicios bajo marcos normativos rigurosos, con sólida capacidad para asesorar en la definición de esquemas de contratación complejos (nacional e internacional), gestión de acuerdos de servicio (SLA) y contratos de infraestructura de alta criticidad.
              </p>
              <span className="avail-badge">
                <CircleDot size={10} />
                Disponible para nuevos proyectos
              </span>
            </div>

            {/* Quick info */}
            <div className="bento-card b-quick">
              <p className="bento-label">
                <Cpu size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                DATOS OPERACIONALES
              </p>
              <ul className="quick-list">
                {quickInfo.map((q, i) => (
                  <li className="quick-item" key={i}>
                    <span className="quick-icon" style={{ color: "var(--teal)" }}>{q.icon}</span>
                    <div>
                      <strong>{q.label}</strong>
                      {q.value}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Highlights */}
            <div className="bento-card b-full">
              <p className="bento-label">
                <Award size={11} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
                LOGROS CLAVE
              </p>
              <ul className="arrow-list">
                {highlights.map((h, i) => (
                  <li key={i}>
                    <ArrowRight size={14} color="var(--teal)" style={{ flexShrink: 0, marginTop: 4 }} />
                    <span>{h.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA ─────────────────────────────────────── */}
      <section id="experiencia" className="section section-alt">
        <div className="wrap">
          <span className="eyebrow">// trayectoria profesional</span>
          <h2 className="section-title">De Aduanas a Data-Driven Procurement</h2>
          <p className="section-sub">
            Cada etapa me acercó más a combinar operación real con analítica de datos.
          </p>

          <div className="route">
            {experience.map((exp, i) => (
              <div className="route-stop" key={i}>
                <div className="route-meta">
                  <span className="route-date">{exp.date}</span>
                  <span className="route-tag">{exp.tag}</span>
                </div>
                <h3>{exp.role}</h3>
                <p className="route-org">
                  <Building2 size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 5, opacity: 0.5 }} />
                  {exp.org}
                </p>
                <p>{exp.summary}</p>
                <ul className="route-results">
                  {exp.results.map((r, j) => (
                    <li key={j} dangerouslySetInnerHTML={{ __html: r }} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ───────────────────────────────────────── */}
      <section id="proyectos" className="section">
        <div className="wrap">
          <span className="eyebrow">// proyectos destacados</span>
          <h2 className="section-title">Iniciativas con Impacto Medible</h2>
          <p className="section-sub">
            Problemas reales de Supply Chain resueltos con analítica, Python y automatización.
          </p>

          <div className="cargo-list">
            {projects.map((p, i) => (
              <div className="cargo-card" key={i}>
                <div className="cargo-head">
                  <span className="cargo-id">{p.id}</span>
                  <span className={`cargo-status ${p.status}`}>{p.statusLabel}</span>
                </div>
                <div style={{ color: "var(--teal)", marginBottom: 14 }}>{p.icon}</div>
                <h3>{p.title}</h3>
                <div className="cargo-route">
                  <span>{p.from}</span>
                  <span className="r-arrow"><ArrowRight size={11} /></span>
                  <span>{p.to}</span>
                </div>
                <p>{p.description}</p>
                <div className="cargo-results">
                  {p.results.map((r, j) => (
                    <span key={j}>{r}</span>
                  ))}
                </div>
                <div className="cargo-stack">
                  {p.stack.map((s, j) => (
                    <span key={j}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HERRAMIENTAS ────────────────────────────────────── */}
      <section id="herramientas" className="section section-alt">
        <div className="wrap">
          <span className="eyebrow">// stack técnico</span>
          <h2 className="section-title">Herramientas & Habilidades</h2>
          <p className="section-sub">
            Dominio operativo de Procurement + herramientas de datos para decisiones de abastecimiento proactivas.
          </p>

          <div className="tool-groups">
            {toolGroups.map((tg, i) => (
              <div className="tool-group" key={i}>
                <h4>
                  <span style={{ color: "var(--teal)", display: "flex", alignItems: "center", gap: 6 }}>
                    {tg.icon}
                    {tg.group}
                  </span>
                </h4>
                <div className="tool-tags">
                  {tg.items.map((item, j) => (
                    <span key={j}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="tool-note">
            <Award size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 6, color: "var(--teal)" }} />
            <strong>Educación Académica & Certificaciones:</strong> Finanzas y Negocios Internacionales — Fundación Universitaria Unimonserrate (Graduado 2023) ·
            Tecnólogo en Negocios Internacionales — SENA (Graduado 2016) ·
            IA aplicada a Negocios (Certiplus) ·
            SAP Business One: Cero a Experto ·
            Programación en Java (Básico a Avanzado) ·
            Diseño Web Profesional.
          </p>
        </div>
      </section>

      {/* ── CONTACTO ────────────────────────────────────────── */}
      <section
        id="contacto"
        className="section"
        style={{ background: "radial-gradient(ellipse 800px 500px at 50% 100%, rgba(94,234,212,0.05), transparent 70%)" }}
      >
        <div className="wrap">
          <span className="eyebrow">// contacto</span>
          <h2 className="section-title">¿Hablamos de Procurement e IA?</h2>
          <p className="section-sub">
            Si buscas eficiencia, modelos predictivos o automatización aplicada a tus
            procesos de abastecimiento — estoy disponible.
          </p>

          <div className="contact-grid">
            {/* Links con iconos */}
            <div className="contact-links">
              {contactLinks.map((cl, i) =>
                cl.href ? (
                  <a
                    key={i}
                    href={cl.href}
                    className="contact-link"
                    target={cl.href.startsWith("http") ? "_blank" : undefined}
                    rel={cl.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => {
                      if (cl.label === "Email") {
                        addNotification({ type: "info", title: "Abriendo correo…", message: "Preparando mensaje para Cristhian.", duration: 2500 });
                      }
                    }}
                  >
                    <span className="contact-link-icon" style={{ color: "var(--teal)" }}>{cl.icon}</span>
                    <div className="contact-link-text">
                      <span className="contact-label">{cl.label}</span>
                      <span className="contact-value">{cl.value}</span>
                    </div>
                    <ChevronRight size={16} className="contact-link-arrow" />
                  </a>
                ) : (
                  <div key={i} className="contact-link" style={{ cursor: "default" }}>
                    <span className="contact-link-icon" style={{ color: "var(--amber)" }}>{cl.icon}</span>
                    <div className="contact-link-text">
                      <span className="contact-label">{cl.label}</span>
                      <span className="contact-value">{cl.value}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Formulario */}
            <div className="contact-form-wrapper">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="footer" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap footer-inner">
          <span className="footer-brand">
            cristhian<span>.benitez</span> — Procurement Data-Driven
          </span>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }} />
              LinkedIn
            </a>
            <a href="https://github.com/Cristhiancol/cristhian-benitez-portfolio" target="_blank" rel="noopener noreferrer">
              <Github size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }} />
              GitHub
            </a>
            <a href={CV_PDF} download="Cristhian_Benitez_CV.pdf">
              <Download size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: 5 }} />
              HV PDF
            </a>
          </div>
          <span>© 2026 Bogotá, Colombia</span>
        </div>
      </footer>
    </>
  );
}

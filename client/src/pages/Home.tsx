/*
 * Procurement Data-Driven Portfolio v4
 * Cristhian Hernando Benitez Rodriguez
 * Design: SVG icons, no emojis, premium visual language
 */

import { useState } from "react";
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
  { icon: <Code2 size={13} />, label: "Python · Pandas" },
  { icon: <BarChart3 size={13} />, label: "Tableau · Power BI" },
  { icon: <Package size={13} />, label: "SAP Business One" },
  { icon: <TrendingUp size={13} />, label: "Negociación Estratégica" },
  { icon: <BrainCircuit size={13} />, label: "IA Aplicada" },
  { icon: <Globe size={13} />, label: "Comercio Exterior" },
];

const kpis = [
  { num: "11", unit: "%", label: "Ahorros anuales en insumos" },
  { num: "260", unit: "",  label: "Buses articulados bajo suministro" },
  { num: "40", unit: "%",  label: "Reducción costos aduaneros" },
  { num: "20", unit: "%",  label: "Reducción lead time técnico" },
  { num: "100", unit: "%", label: "Cumplimiento DIAN sin multas" },
];

const quickInfo = [
  { icon: <MapPin size={16} />,    label: "Ubicación",    value: "Bogotá, Colombia" },
  { icon: <Clock size={16} />,     label: "Experiencia",  value: "+8 años en Procurement & Supply Chain" },
  { icon: <TrendingUp size={16} />,label: "Mayor logro",  value: "Hasta 11 % de ahorro en insumos anuales" },
  { icon: <Globe size={16} />,     label: "Especialidad", value: "Comercio Exterior & Importaciones UAP" },
  { icon: <Database size={16} />,  label: "Stack",        value: "Python · Pandas · Tableau · SQL · SAP" },
  { icon: <Award size={16} />,     label: "Formación",    value: "Finanzas & Neg. Internacionales — F.U. Monserrate 2023" },
];

const highlights = [
  { text: <>Diseñé <strong>SMART</strong>, sistema en Excel con macros VBA que se convirtió en el core de inventarios — controlando OC, stock y facturación en tiempo real.</> },
  { text: <>Lideré el proyecto <strong>UAP</strong> de nacionalización que redujo el gasto en agencia de aduanas en un 40 % y los tiempos de entrega en un 60 %.</> },
  { text: <>Construyo <strong>modelos predictivos de costos logísticos</strong> con Python · Pandas · Scikit-Learn para anticipar variaciones de precio antes de que impacten la operación.</> },
  { text: <>Certificado en <strong>IA aplicada a negocios</strong> (Certiplus) y desarrollo web — cada herramienta nueva la pruebo primero en mi trabajo real.</> },
];

const experience = [
  {
    date: "02.2024 — Actualmente",
    tag: "Tiempo completo",
    role: "Gestor de Compras",
    org: "Somos Bogotá Usme S.A.S.",
    summary:
      "Abastecimiento estratégico de lubricantes y repuestos para una flota de 260 buses articulados. Dashboards analíticos, negociaciones de gran escala y control de facturación PETROMIL.",
    results: [
      "Ahorros del <strong>7 % – 11 %</strong> en presupuesto anual de insumos",
      "Proyecto <strong>SMART</strong>: Excel + VBA → core de inventarios del área",
      "Control dinámico de stock en tiempo real para 260 unidades",
    ],
  },
  {
    date: "06.2020 — 02.2024",
    tag: "Tiempo completo",
    role: "Analista de Compras Técnicas",
    org: "Helicentro S.A.S.",
    summary:
      "Cotizaciones técnicas aeronáuticas e industriales, cuadros comparativos paramétricos y automatización de verificaciones de inventario.",
    results: [
      "Reducción del <strong>20 %</strong> en lead time de solicitudes críticas",
      "Optimización del <strong>30 %</strong> en verificaciones de stock con algoritmos Excel",
      "Sistema centralizado de OC abiertas y memorandos de servicio",
    ],
  },
  {
    date: "02.2018 — 06.2020",
    tag: "Tiempo completo",
    role: "Auxiliar Técnico — Comercio Exterior",
    org: "Helicentro S.A.S.",
    summary:
      "Coordinación de aduanas e importaciones con Fedex, UPS, Tampa y Centurion. Prorrateo de aranceles, liquidación en SIESA y control documental DIAN.",
    results: [
      "Proyecto <strong>UAP</strong>: ahorro del <strong>40 %</strong> en agencias de aduanas",
      "Reducción del <strong>60 %</strong> en tiempos de entrega y nacionalización",
      "<strong>100 %</strong> cumplimiento en auditorías DIAN — cero multas",
    ],
  },
  {
    date: "12.2016 — 02.2018",
    tag: "Tiempo completo",
    role: "Auxiliar de Aduanas — Compras",
    org: "Agencia de Aduanas Ceva Logistics",
    summary:
      "Control de inventarios en depósitos aduaneros autorizados, auditoría física, SAP intensivo y coordinación con transportadores internacionales.",
    results: [
      "Reducción del <strong>20 %</strong> en tiempo de inspección en puerto seco",
      "<strong>+40 %</strong> productividad con verificaciones cruzadas en SAP",
      "Automatización al <strong>100 %</strong> de actas de inspección virtual",
    ],
  },
];

const projects = [
  {
    id: "PRJ-001",
    status: "status-done",
    statusLabel: "COMPLETADO",
    icon: <Globe size={20} />,
    title: "Proyecto UAP — Logística Aduanera",
    from: "IMPORTACIÓN",
    to: "DIAN",
    description:
      "Reestructuración y digitalización de los procesos de importación y nacionalización de carga aeronáutica, logrando la calidad de Usuario Altamente Exportador.",
    results: [
      "Ahorro del 40 % en gastos de agencia aduanal",
      "60 % de mejora en tiempos puerta a puerta",
      "Cero multas — cumplimiento DIAN 100 %",
    ],
    stack: ["SIESA ERP", "Excel Avanzado", "Regulación DIAN", "SAP"],
  },
  {
    id: "PRJ-002",
    status: "status-live",
    statusLabel: "ACTIVO",
    icon: <BarChart3 size={20} />,
    title: "Sistema SMART — Control de Inventario",
    from: "STOCK",
    to: "ANALÍTICA",
    description:
      "Plataforma en Excel con macros VBA y dashboards para controlar OC, inventario y facturación de 260 buses articulados en tiempo real.",
    results: [
      "7 % – 11 % de ahorro en lubricantes y repuestos",
      "Control de stock dinámico en tiempo real",
      "Consolidación automatizada de facturación",
    ],
    stack: ["Excel / VBA", "Dashboards", "SQL", "Power Query"],
  },
  {
    id: "PRJ-003",
    status: "status-progress",
    statusLabel: "EN CURSO",
    icon: <BrainCircuit size={20} />,
    title: "Modelación Predictiva de Costos",
    from: "DATOS",
    to: "PREDICCIÓN",
    description:
      "Modelos en Python para anticipar variaciones de precio en insumos y fletes internacionales antes de que impacten el presupuesto.",
    results: [
      "Predicción de costos con varianza controlada",
      "Optimización de reorden y stock de seguridad",
      "Análisis automatizado de cotizaciones con Pandas",
    ],
    stack: ["Python", "Pandas", "Scikit-Learn", "Tableau", "Jupyter"],
  },
];

const toolGroups = [
  {
    icon: <Layers size={15} />,
    group: "ERP & Operaciones",
    items: ["Excel Avanzado (VBA · Macros)", "SAP Business One", "SIESA ERP", "NEO System", "Power Query"],
  },
  {
    icon: <Code2 size={15} />,
    group: "Programación & Datos",
    items: ["Python", "Pandas · NumPy", "SQL", "Java", "JavaScript / React"],
  },
  {
    icon: <BarChart3 size={15} />,
    group: "Analítica & Visualización",
    items: ["Tableau", "Power BI", "Dashboards Dinámicos", "Machine Learning Predictivo", "Jupyter Notebooks"],
  },
  {
    icon: <Boxes size={15} />,
    group: "Procurement & Logística",
    items: ["Negociación Estratégica", "Comercio Exterior (DIAN)", "Gestión de Proveedores", "Control de Inventario", "Costeo Logístico"],
  },
];

const contactLinks = [
  { icon: <Mail size={20} />,      label: "Email",               value: "cristiancoli50@gmail.com", href: "mailto:cristiancoli50@gmail.com" },
  { icon: <Phone size={20} />,     label: "Teléfono / WhatsApp", value: "(+57) 301 374 8901",            href: "tel:+573013748901" },
  { icon: <Linkedin size={20} />,  label: "LinkedIn",            value: "Cristhian Benitez Rodríguez",  href: "https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/" },
  { icon: <Github size={20} />,    label: "GitHub",              value: "Cristhiancol",                  href: "https://github.com/Cristhiancol/cristhian-benitez-portfolio" },
  { icon: <BookOpen size={20} />,  label: "Notion CV",           value: "Portafolio completo",           href: "https://rare-plume-e37.notion.site/Cristhian-Hernando-Benitez-Rodriguez-Portafolio-Profesional-337952d8da288166b76ce48b450aa0fc" },
  { icon: <MapPin size={20} />,    label: "Ubicación",           value: "Bogotá, Colombia",              href: null },
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.ok) {
        setStatus("sent");
        addNotification({ type: "success", title: "Mensaje enviado", message: "Cristhian recibirá tu mensaje. Te responderá pronto.", duration: 5000 });
      } else {
        throw new Error(data.error || "Error del servidor");
      }
    } catch {
      setStatus("error");
      addNotification({ type: "error", title: "Error al enviar", message: "Intenta de nuevo o escríbenos a cristiancoli50@gmail.com", duration: 6000 });
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
                DISPONIBLE · BOGOTÁ, COLOMBIA · PROCUREMENT DATA-DRIVEN
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
                  href={CV_PDF}
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
                  src={PROFILE_IMG}
                  alt="Cristhian Hernando Benitez Rodriguez — Procurement Data-Driven"
                />
                <div className="photo-badge">
                  <div>
                    <div className="photo-badge-name">Cristhian Benitez R.</div>
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
                Empecé en comercio exterior entre aforos, aranceles y hojas de Excel.
              </p>
              <p className="bento-body">
                Hoy lidero el abastecimiento de una flota de{" "}
                <em>260 buses articulados</em> — y lo hago combinando negociación
                estratégica con modelos en Python, dashboards y, desde hace poco, IA aplicada.
              </p>
              <p className="bento-body">
                No vine del mundo tech. Vine de Compras, y fueron los problemas reales
                de la cadena de suministro los que me empujaron a programar y analizar
                datos para resolver cuellos de botella operativos.
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
            <strong>Certificaciones:</strong> IA aplicada a Negocios (Certiplus) ·
            SAP Business One Cero a Experto · Java Básico a Avanzado ·
            Diseño Web & Front-End · Finanzas y Negocios Internacionales — Fundación Universitaria Monserrate (2023) ·
            Tecnólogo en Negocios Internacionales (SENA 2016).
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

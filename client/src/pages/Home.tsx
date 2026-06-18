/*
 * Procurement Data-Driven Portfolio v3
 * Cristhian Hernando Benitez Rodriguez
 * Design: hero foto impactante + bento grid + formulario de contacto
 */

import { useState } from "react";
import { useNotification } from "@/contexts/NotificationContext";

const CV_PDF =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/CristhianHernandoBenitezRodriguez-Hojadevida_61fcabf4.pdf";
const PROFILE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/cristhian-profile-photo_0a53abcf.png";

/* ── DATA ──────────────────────────────────────────────────────── */
const experience = [
  {
    date: "02.2024 — Actualmente",
    tag: "Tiempo completo",
    role: "Gestor de Compras",
    org: "Somos Bogotá Usme S.A.S.",
    summary:
      "Abastecimiento estratégico de lubricantes y repuestos para una flota de 260 buses articulados y biarticulados. Dashboards analíticos de inventario, negociaciones de gran escala y control de facturación PETROMIL.",
    results: [
      "Ahorros del <strong>7 % – 11 %</strong> en presupuesto anual de insumos",
      "Proyecto <strong>SMART</strong>: sistema Excel + VBA → core de inventarios del área",
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
    role: "Auxiliar Técnico en Comercio Exterior",
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
      "Control de inventarios en depósitos aduaneros autorizados, auditoría física, uso intensivo de SAP y coordinación con transportadores internacionales.",
    results: [
      "Reducción del <strong>20 %</strong> en tiempo de inspección en puerto seco",
      "<strong>+40 %</strong> productividad con verificaciones cruzadas en SAP",
      "Automatización al <strong>100 %</strong> del sistema de actas de inspección virtual",
    ],
  },
];

const projects = [
  {
    id: "PRJ-001",
    status: "status-done",
    statusLabel: "COMPLETADO",
    title: "Proyecto UAP — Logística Aduanera",
    from: "IMPORTACIÓN",
    to: "DIAN",
    description:
      "Reestructuración y digitalización de los procesos de importación y nacionalización de carga aeronáutica industrial, logrando la calidad de Usuario Altamente Exportador.",
    results: [
      "Ahorro del 40 % en gastos de agencia aduanal",
      "60 % de mejora en tiempos de entrega puerta a puerta",
      "Cero multas aduaneras — cumplimiento DIAN 100 %",
    ],
    stack: ["SIESA ERP", "Excel Avanzado", "Regulación DIAN", "SAP"],
  },
  {
    id: "PRJ-002",
    status: "status-live",
    statusLabel: "ACTIVO",
    title: "Sistema SMART — Control de Inventario",
    from: "STOCK",
    to: "ANALÍTICA",
    description:
      "Plataforma en Excel con fórmulas dinámicas, macros VBA y dashboards para controlar OC, inventario y facturación de 260 buses articulados en tiempo real.",
    results: [
      "7 % – 11 % de ahorro en lubricantes y repuestos anuales",
      "Control de stock dinámico en tiempo real",
      "Consolidación automatizada de facturación PETROMIL",
    ],
    stack: ["Excel / VBA", "Dashboards", "SQL", "Power Query"],
  },
  {
    id: "PRJ-003",
    status: "status-progress",
    statusLabel: "EN CURSO",
    title: "Modelación Predictiva de Costos",
    from: "DATOS",
    to: "PREDICCIÓN",
    description:
      "Modelos en Python para anticipar variaciones de precio en insumos y fletes internacionales antes de que impacten el presupuesto operativo.",
    results: [
      "Predicción de costos con varianza controlada",
      "Optimización de puntos de reorden y stock de seguridad",
      "Análisis automatizado de cotizaciones con Pandas",
    ],
    stack: ["Python", "Pandas", "Scikit-Learn", "Tableau", "Jupyter"],
  },
];

const tools = [
  {
    group: "ERP & Operaciones",
    items: ["Excel Avanzado (VBA · Macros)", "SAP Business One", "SIESA ERP", "NEO System", "Power Query"],
  },
  {
    group: "Programación & Datos",
    items: ["Python", "Pandas · NumPy", "SQL", "Java", "JavaScript / React"],
  },
  {
    group: "Analítica & Visualización",
    items: ["Tableau", "Power BI", "Dashboards Dinámicos", "Machine Learning Predictivo", "Jupyter Notebooks"],
  },
  {
    group: "Procurement & Logística",
    items: ["Negociación Estratégica", "Comercio Exterior (DIAN)", "Gestión de Proveedores", "Control de Inventario", "Costeo Logístico"],
  },
];

const contactLinks = [
  { icon: "✉️", label: "Email", value: "cristianbenitez50@hotmail.com", href: "mailto:cristianbenitez50@hotmail.com" },
  { icon: "📞", label: "Teléfono / WhatsApp", value: "(+57) 301 374 8901", href: "tel:+573013748901" },
  { icon: "💼", label: "LinkedIn", value: "Cristhian Benitez Rodríguez", href: "https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/" },
  { icon: "🐙", label: "GitHub", value: "Cristhiancol", href: "https://github.com/Cristhiancol/cristhian-benitez-portfolio" },
  { icon: "📓", label: "Notion CV", value: "Portafolio completo", href: "https://rare-plume-e37.notion.site/Cristhian-Hernando-Benitez-Rodriguez-Portafolio-Profesional-337952d8da288166b76ce48b450aa0fc" },
  { icon: "📍", label: "Ubicación", value: "Bogotá, Colombia", href: null },
];

/* ── CONTACT FORM ──────────────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", interest: "", message: "" });
  const { addNotification } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Encode for mailto — functional without backend
    const subject = encodeURIComponent(`Contacto desde portafolio — ${form.name} (${form.company})`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nEmail: ${form.email}\nEmpresa: ${form.company}\nInterés: ${form.interest}\n\nMensaje:\n${form.message}`
    );
    window.location.href = `mailto:cristianbenitez50@hotmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    addNotification({ type: "success", title: "¡Mensaje preparado!", message: "Tu cliente de correo abrirá el mensaje listo para enviar.", duration: 4000 });
  };

  if (sent) {
    return (
      <div className="form-success show">
        <div className="form-success-icon">🎉</div>
        <h3 className="form-success-title">¡Listo para enviar!</h3>
        <p className="form-success-sub">Tu cliente de correo abrió el mensaje. Revisalo y haz clic en Enviar.</p>
        <button onClick={() => setSent(false)} style={{ marginTop: 20, color: "var(--teal)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-mono)", fontSize: 13 }}>
          ← Volver al formulario
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="form-title">💬 Déjame tus datos</h3>
      <p className="form-sub">Te respondo en menos de 24 horas.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div className="form-field">
          <label htmlFor="cf-name">Nombre *</label>
          <input id="cf-name" type="text" placeholder="Tu nombre" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">Email *</label>
          <input id="cf-email" type="email" placeholder="tu@empresa.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="cf-company">Empresa / Organización</label>
        <input id="cf-company" type="text" placeholder="¿Dónde trabajas?" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
      </div>

      <div className="form-field">
        <label htmlFor="cf-interest">¿Qué te interesa?</label>
        <select id="cf-interest" value={form.interest} onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}>
          <option value="">Selecciona una opción…</option>
          <option value="Oportunidad laboral">💼 Oportunidad laboral</option>
          <option value="Proyecto freelance / consultoría">🚀 Proyecto freelance / consultoría</option>
          <option value="Automatización de procesos">⚙️ Automatización de procesos</option>
          <option value="Modelación predictiva / Data Science">📊 Modelación predictiva / Data Science</option>
          <option value="Networking / Colaboración">🤝 Networking / Colaboración</option>
          <option value="Otro">💡 Otro</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="cf-msg">Mensaje *</label>
        <textarea id="cf-msg" placeholder="Cuéntame de qué se trata…" required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
      </div>

      <button type="submit" className="form-submit">
        Enviar mensaje →
      </button>
      <p className="form-note">🔒 Tus datos solo se usan para responderte.</p>
    </form>
  );
}

/* ── MAIN COMPONENT ────────────────────────────────────────────── */
export default function Home() {
  const { addNotification } = useNotification();

  return (
    <>
      {/* Grain */}
      <div className="grain" aria-hidden="true" />

      {/* ── NAV ───────────────────────────────────────────────── */}
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
            <a href="#contacto" className="nav-cta">✉️ Contacto</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <header id="inicio" className="hero">
        <div className="wrap">
          <div className="hero-layout">

            {/* LEFT — copy */}
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
                <span className="hero-tag hero-tag-teal">🐍 Python · Pandas</span>
                <span className="hero-tag hero-tag-teal">📊 Tableau · Power BI</span>
                <span className="hero-tag hero-tag-amber">📦 SAP Business One</span>
                <span className="hero-tag hero-tag-amber">🤝 Negociación Estratégica</span>
                <span className="hero-tag">🧠 IA Aplicada</span>
                <span className="hero-tag">🌎 Comercio Exterior</span>
              </div>

              <div className="hero-actions fade-up fade-up-5">
                <a href="#proyectos" className="btn btn-primary">
                  Ver proyectos →
                </a>
                <a
                  href={CV_PDF}
                  download="Cristhian_Benitez_CV.pdf"
                  onClick={() =>
                    addNotification({
                      type: "success",
                      title: "✅ Descarga iniciada",
                      message: "La hoja de vida se está descargando.",
                      duration: 3000,
                    })
                  }
                  className="btn btn-ghost"
                >
                  📄 Descargar HV
                </a>
                <a href="#contacto" className="btn btn-ghost">
                  💬 Contáctame
                </a>
              </div>
            </div>

            {/* RIGHT — photo card */}
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
                    <span className="dot" style={{ width: 6, height: 6 }} />
                    Disponible
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Manifest KPIs */}
        <div className="manifest-strip">
          <div className="wrap manifest-grid">
            {[
              { num: "11", unit: "%", label: "Ahorros anuales en insumos" },
              { num: "260", unit: "", label: "Buses articulados bajo suministro" },
              { num: "40", unit: "%", label: "Reducción costos aduaneros (UAP)" },
              { num: "20", unit: "%", label: "Reducción lead time compras técnicas" },
              { num: "100", unit: "%", label: "Cumplimiento regulatorio DIAN" },
            ].map((m, i) => (
              <div className="manifest-item" key={i}>
                <span className="manifest-num">{m.num}<small>{m.unit}</small></span>
                <span className="manifest-label">{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── SOBRE MÍ — BENTO GRID ─────────────────────────────── */}
      <section id="sobre-mi" className="section">
        <div className="wrap">
          <span className="eyebrow">// sobre mí</span>
          <h2 className="section-title">El perfil que no cabe en un CV</h2>
          <p className="section-sub">
            Vine de Compras, no del mundo tech — y eso es exactamente lo que me hace diferente.
          </p>

          <div className="bento">
            {/* Historia principal */}
            <div className="bento-card b-story">
              <p className="bento-label">👤 HISTORIA</p>
              <p className="bento-lede">
                Empecé en comercio exterior entre aforos, aranceles y hojas de Excel.
              </p>
              <p className="bento-body">
                Hoy lidero el abastecimiento de una flota de{" "}
                <em>260 buses articulados</em> — y lo hago combinando negociación
                estratégica con modelos en Python, dashboards y, desde hace poco, IA aplicada.
              </p>
              <p className="bento-body">
                No vine del mundo tech. Vine de Compras, y fueron los problemas
                reales de la cadena de suministro los que me empujaron a programar
                y analizar datos para resolver cuellos de botella operativos.
              </p>
              <span className="avail-badge">
                <span className="dot" style={{ width: 6, height: 6 }} />
                Disponible para nuevos proyectos
              </span>
            </div>

            {/* Quick info */}
            <div className="bento-card b-quick">
              <p className="bento-label">📋 DATOS OPERACIONALES</p>
              <ul className="quick-list">
                <li className="quick-item">
                  <span className="quick-icon">📍</span>
                  <div><strong>Ubicación</strong>Bogotá, Colombia</div>
                </li>
                <li className="quick-item">
                  <span className="quick-icon">⏱️</span>
                  <div><strong>Experiencia</strong>+8 años en Procurement & Supply Chain</div>
                </li>
                <li className="quick-item">
                  <span className="quick-icon">💰</span>
                  <div><strong>Mayor logro</strong>Hasta 11 % de ahorro en insumos anuales</div>
                </li>
                <li className="quick-item">
                  <span className="quick-icon">🌎</span>
                  <div><strong>Especialidad</strong>Comercio Exterior & Importaciones UAP</div>
                </li>
                <li className="quick-item">
                  <span className="quick-icon">🛠️</span>
                  <div><strong>Stack</strong>Python · Pandas · Tableau · SQL · SAP</div>
                </li>
                <li className="quick-item">
                  <span className="quick-icon">🎓</span>
                  <div><strong>Formación</strong>Finanzas & Negocios Internacionales (Unipanamericana 2023)</div>
                </li>
              </ul>
            </div>

            {/* Arrow highlights */}
            <div className="bento-card b-full">
              <p className="bento-label">🏆 LOGROS CLAVE</p>
              <ul className="arrow-list">
                <li>
                  <span>Diseñé <strong>SMART</strong>, sistema en Excel con macros VBA que se convirtió en el core de inventarios de mi área — controlando OC, stock y facturación de combustible en tiempo real.</span>
                </li>
                <li>
                  <span>Lideré el proyecto <strong>UAP</strong> de nacionalización que redujo el gasto en agencia de aduanas en un 40 % y los tiempos de entrega en un 60 %.</span>
                </li>
                <li>
                  <span>Construyo <strong>modelos predictivos de costos logísticos</strong> con Python · Pandas · Scikit-Learn para anticipar variaciones de precio antes de que impacten la operación.</span>
                </li>
                <li>
                  <span>Certificado en <strong>IA aplicada a negocios</strong> (Certiplus) y desarrollo web — cada herramienta nueva la pruebo primero en mi trabajo real.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA ──────────────────────────────────────────── */}
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
                <p className="route-org">{exp.org}</p>
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

      {/* ── PROYECTOS ─────────────────────────────────────────────── */}
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
                <h3>{p.title}</h3>
                <div className="cargo-route">
                  <span>{p.from}</span>
                  <span className="r-arrow">→</span>
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

      {/* ── HERRAMIENTAS ─────────────────────────────────────────── */}
      <section id="herramientas" className="section section-alt">
        <div className="wrap">
          <span className="eyebrow">// stack técnico</span>
          <h2 className="section-title">Herramientas & Habilidades</h2>
          <p className="section-sub">
            Dominio operativo de Procurement + herramientas de datos para decisiones de abastecimiento proactivas.
          </p>

          <div className="tool-groups">
            {tools.map((tg, i) => (
              <div className="tool-group" key={i}>
                <h4>{tg.group}</h4>
                <div className="tool-tags">
                  {tg.items.map((item, j) => (
                    <span key={j}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="tool-note">
            <strong>Certificaciones:</strong> IA aplicada a Negocios (Certiplus) ·
            SAP Business One Cero a Experto · Java Básico a Avanzado ·
            Diseño Web & Front-End · Finanzas y Negocios Internacionales
            (Unipanamericana 2023) · Tecnólogo en Negocios Internacionales (SENA 2016).
          </p>
        </div>
      </section>

      {/* ── CONTACTO ─────────────────────────────────────────────── */}
      <section id="contacto" className="section"
        style={{
          background: "radial-gradient(ellipse 800px 500px at 50% 100%, rgba(94,234,212,0.05), transparent 70%)"
        }}
      >
        <div className="wrap">
          <span className="eyebrow">// contacto</span>
          <h2 className="section-title">¿Hablamos de Procurement e IA? 🚀</h2>
          <p className="section-sub">
            Si buscas eficiencia, modelos predictivos o automatización aplicada
            a tus procesos de abastecimiento — estoy disponible.
          </p>

          <div className="contact-grid">
            {/* Links */}
            <div className="contact-links">
              {contactLinks.map((cl, i) => (
                cl.href ? (
                  <a
                    key={i}
                    href={cl.href}
                    className="contact-link"
                    target={cl.href.startsWith("http") ? "_blank" : undefined}
                    rel={cl.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => {
                      if (cl.label === "Email") {
                        addNotification({ type: "info", title: "✉️ Abriendo correo…", message: "Preparando mensaje para Cristhian.", duration: 2500 });
                      }
                    }}
                  >
                    <span className="contact-link-icon">{cl.icon}</span>
                    <div className="contact-link-text">
                      <span className="contact-label">{cl.label}</span>
                      <span className="contact-value">{cl.value}</span>
                    </div>
                    <span className="contact-link-arrow">→</span>
                  </a>
                ) : (
                  <div key={i} className="contact-link" style={{ cursor: "default" }}>
                    <span className="contact-link-icon">{cl.icon}</span>
                    <div className="contact-link-text">
                      <span className="contact-label">{cl.label}</span>
                      <span className="contact-value">{cl.value}</span>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* Form */}
            <div className="contact-form-wrapper">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────── */}
      <footer className="footer" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="wrap footer-inner">
          <span className="footer-brand">
            cristhian<span>.</span>benitez — Procurement Data-Driven
          </span>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/" target="_blank" rel="noopener noreferrer">
              💼 LinkedIn
            </a>
            <a href="https://github.com/Cristhiancol/cristhian-benitez-portfolio" target="_blank" rel="noopener noreferrer">
              🐙 GitHub
            </a>
            <a href={CV_PDF} download="Cristhian_Benitez_CV.pdf">
              📄 HV PDF
            </a>
          </div>
          <span>© 2026 Bogotá, Colombia</span>
        </div>
      </footer>
    </>
  );
}

/*
 * Procurement Data-Driven Portfolio
 * Cristhian Hernando Benitez Rodriguez
 * Design system: /src/index.css
 */

import Navbar from "@/components/Navbar";
import { useNotification } from "@/contexts/NotificationContext";

const CV_PDF =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/CristhianHernandoBenitezRodriguez-Hojadevida_61fcabf4.pdf";
const PROFILE_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/cristhian-profile-photo_0a53abcf.png";

/* ─── EXPERIENCE DATA ─────────────────────────────────────────── */
const experience = [
  {
    date: "02.2024 — Actualmente",
    tag: "Tiempo completo",
    role: "Gestor de Compras",
    org: "Somos Bogotá Usme S.A.S.",
    summary:
      "Abastecimiento y cadena de suministro de lubricantes y repuestos para una flota de 260 buses articulados y biarticulados. Negociaciones estratégicas de gran escala, dashboards analíticos de inventario y control de facturación.",
    results: [
      "Ahorros del <strong>7 % – 11 %</strong> en presupuesto anual de insumos vehiculares",
      "Proyecto <strong>SMART</strong>: sistema Excel con macros VBA → core de inventarios del área",
      "Control dinámico de stock para 260 unidades + conciliación PETROMIL",
    ],
  },
  {
    date: "06.2020 — 02.2024",
    tag: "Tiempo completo",
    role: "Analista de Compras Técnicas",
    org: "Helicentro S.A.S.",
    summary:
      "Gestión de cotizaciones técnicas aeronáuticas e industriales. Cuadros comparativos paramétricos, mitigación de sobre-stock y automatización de verificaciones de inventario.",
    results: [
      "Reducción del <strong>20 %</strong> en lead time de respuesta a solicitudes críticas",
      "Optimización del <strong>30 %</strong> en verificaciones de stock con algoritmos Excel",
      "Sistema centralizado de órdenes de compra abiertas y memorandos",
    ],
  },
  {
    date: "02.2018 — 06.2020",
    tag: "Tiempo completo",
    role: "Auxiliar Técnico en Comercio Exterior",
    org: "Helicentro S.A.S.",
    summary:
      "Coordinación de aduanas e importaciones con Fedex, UPS, Tampa y Centurion. Prorrateo de aranceles, liquidación de costos en SIESA y control documental bajo regulaciones DIAN.",
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
      "Control de inventarios en depósitos aduaneros autorizados, auditoría física de mercancías, uso intensivo de módulos SAP y coordinación con transportadores.",
    results: [
      "Reducción del <strong>20 %</strong> en tiempo de inspección de mercancías en puerto seco",
      "<strong>+40 %</strong> de productividad tras implementar verificaciones cruzadas en SAP",
      "Automatización al <strong>100 %</strong> del sistema de actas de inspección virtual",
    ],
  },
];

/* ─── PROJECTS DATA ───────────────────────────────────────────── */
const projects = [
  {
    id: "PRJ-001",
    status: "status-done",
    statusLabel: "COMPLETADO",
    title: "Proyecto UAP — Logística Aduanera",
    from: "IMPORTACIÓN",
    to: "DIAN",
    description:
      "Reestructuración y digitalización de los procesos de importación y nacionalización de carga aeronáutica e industrial, logrando la calidad de Usuario Altamente Exportador.",
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
      "Plataforma en Excel con fórmulas dinámicas, macros VBA y dashboards para controlar órdenes de compra, inventario y facturación de 260 buses articulados.",
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

/* ─── TOOLS DATA ──────────────────────────────────────────────── */
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

/* ─── COMPONENT ───────────────────────────────────────────────── */
export default function Home() {
  const { addNotification } = useNotification();

  return (
    <>
      {/* Film-grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* ── NAV ─────────────────────────────────────────────────── */}
      <nav className="topnav" aria-label="Navegación principal">
        <div className="wrap topnav-inner">
          <a href="#inicio" className="brand">
            cristhian<span className="brand-dot">.</span>dev
          </a>
          <div className="nav-links">
            <a href="#sobre-mi">Sobre mí</a>
            <a href="#experiencia">Experiencia</a>
            <a href="#proyectos">Proyectos</a>
            <a href="#herramientas">Herramientas</a>
            <a href="#contacto" className="nav-cta">Contacto</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <header id="inicio" className="hero">
        <div className="wrap hero-inner">
          <p className="hero-label fade-up fade-up-1">
            <span className="dot" aria-hidden="true" />
            PROCUREMENT DATA-DRIVEN · BOGOTÁ, COLOMBIA
          </p>

          <h1 className="hero-title fade-up fade-up-2">
            Llevo Compras de{" "}
            <span className="strike">reportar el pasado</span>{" "}
            a{" "}
            <span className="accent">predecir el futuro</span>
          </h1>

          <p className="hero-sub fade-up fade-up-3">
            Gestor de abastecimiento con +8 años de experiencia combinando
            negociación estratégica, modelos en <strong>Python</strong> e{" "}
            <strong>IA aplicada</strong> a Supply Chain — desde aforos
            aduaneros hasta dashboards predictivos.
          </p>

          <div className="hero-actions fade-up fade-up-4">
            <a href="#proyectos" className="btn btn-primary">
              Ver proyectos →
            </a>
            <a
              href={CV_PDF}
              download="Cristhian_Benitez_CV.pdf"
              onClick={() =>
                addNotification({
                  type: "success",
                  title: "¡Descarga iniciada!",
                  message: "La hoja de vida se está descargando.",
                  duration: 3000,
                })
              }
              className="btn btn-ghost"
            >
              Descargar HV
            </a>
          </div>
        </div>

        {/* Manifest strip — live KPIs */}
        <div className="manifest-strip">
          <div className="wrap manifest-grid">
            <div className="manifest-item">
              <span className="manifest-num">11<small>%</small></span>
              <span className="manifest-label">Ahorros anuales en insumos</span>
            </div>
            <div className="manifest-item">
              <span className="manifest-num">260</span>
              <span className="manifest-label">Buses articulados bajo suministro</span>
            </div>
            <div className="manifest-item">
              <span className="manifest-num">40<small>%</small></span>
              <span className="manifest-label">Reducción en costos aduaneros (UAP)</span>
            </div>
            <div className="manifest-item">
              <span className="manifest-num">20<small>%</small></span>
              <span className="manifest-label">Reducción lead time compras técnicas</span>
            </div>
            <div className="manifest-item">
              <span className="manifest-num">100<small>%</small></span>
              <span className="manifest-label">Cumplimiento regulatorio DIAN</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── SOBRE MÍ ──────────────────────────────────────────────── */}
      <section id="sobre-mi" className="section">
        <div className="wrap">
          <span className="eyebrow">// sobre mí</span>
          <div className="two-col">
            <div>
              <img
                src={PROFILE_IMG}
                alt="Cristhian Benitez"
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  borderRadius: "8px",
                  border: "1px solid var(--line-strong)",
                  filter: "grayscale(20%)",
                }}
              />
            </div>
            <div className="col-content">
              <p className="lede">
                Empecé en comercio exterior entre aforos, aranceles y hojas de
                Excel.
              </p>
              <p>
                Hoy lidero el abastecimiento de una flota de{" "}
                <em>260 buses articulados</em> — y lo hago combinando
                negociación estratégica con modelos en Python, dashboards y,
                desde hace poco, IA aplicada.
              </p>
              <p>
                No vine del mundo tech. Vine de Compras, y fueron los problemas
                reales de la cadena de suministro los que me empujaron a
                programar y analizar datos para resolver cuellos de botella
                operativos.
              </p>
              <ul className="arrow-list">
                <li>
                  <span>
                    Diseñé <strong>SMART</strong>, sistema en Excel con macros
                    VBA que se convirtió en el core de inventarios de mi área.
                  </span>
                </li>
                <li>
                  <span>
                    Lideré el proyecto <strong>UAP</strong> que redujo gastos
                    aduaneros 40 % y tiempos de entrega 60 %.
                  </span>
                </li>
                <li>
                  <span>
                    Construyo modelos predictivos de costos logísticos con
                    Python · Pandas · Scikit-Learn.
                  </span>
                </li>
                <li>
                  <span>
                    Certificado en <strong>IA aplicada a negocios</strong>{" "}
                    (Certiplus) y en desarrollo web — cada herramienta la
                    pruebo primero en mi trabajo real.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA ───────────────────────────────────────────── */}
      <section id="experiencia" className="section section-alt">
        <div className="wrap">
          <span className="eyebrow">// experiencia profesional</span>
          <h2 className="section-title">Trayectoria en Procurement</h2>
          <p className="section-sub">
            Desde auxiliar de aduanas hasta gestor estratégico de suministro —
            con resultados medibles en cada etapa.
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
          <h2 className="section-title">Iniciativas con Impacto Real</h2>
          <p className="section-sub">
            Problemas reales de Supply Chain resueltos con analítica, Python y
            automatización aplicada.
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

      {/* ── HERRAMIENTAS ──────────────────────────────────────────── */}
      <section id="herramientas" className="section section-alt">
        <div className="wrap">
          <span className="eyebrow">// herramientas & habilidades</span>
          <h2 className="section-title">Stack Técnico y de Negocio</h2>
          <p className="section-sub">
            Combino dominio operativo de Procurement con herramientas de datos
            para tomar decisiones de abastecimiento antes de que los problemas
            ocurran.
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
            <strong>Formación complementaria:</strong> Certificación en
            Inteligencia Artificial aplicada a Negocios (Certiplus) · SAP
            Business One Cero a Experto · Java (Básico a Avanzado) · Diseño
            Web Profesional y Desarrollo Front-End · Finanzas y Negocios
            Internacionales (Unipanamericana 2023) · Tecnólogo en Negocios
            Internacionales (SENA 2016).
          </p>
        </div>
      </section>

      {/* ── CONTACTO ──────────────────────────────────────────────── */}
      <section id="contacto" className="section section-contact">
        <div className="wrap">
          <div className="contact-inner">
            <span className="eyebrow">// contacto</span>
            <h2 className="section-title">¿Hablamos de Procurement e IA?</h2>
            <p className="section-sub">
              Si buscas eficiencia, modelos predictivos o automatización
              aplicada a tus procesos de abastecimiento, estoy disponible.
            </p>

            <div className="contact-links">
              <a
                href="mailto:cristianbenitez50@hotmail.com"
                className="contact-link"
                onClick={() =>
                  addNotification({
                    type: "info",
                    title: "Abriendo correo…",
                    message: "Redactando mensaje para cristian.",
                    duration: 2500,
                  })
                }
              >
                <span className="contact-label">Email</span>
                <span className="contact-value">cristianbenitez50@hotmail.com</span>
              </a>

              <a href="tel:+573013748901" className="contact-link">
                <span className="contact-label">Teléfono</span>
                <span className="contact-value">(+57) 301 374 8901</span>
              </a>

              <a
                href="https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-label">LinkedIn</span>
                <span className="contact-value">Cristhian Benitez</span>
              </a>

              <a
                href="https://github.com/Cristhiancol/cristhian-benitez-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-label">GitHub</span>
                <span className="contact-value">Cristhiancol</span>
              </a>

              <a
                href="https://rare-plume-e37.notion.site/Cristhian-Hernando-Benitez-Rodriguez-Portafolio-Profesional-337952d8da288166b76ce48b450aa0fc"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                <span className="contact-label">Notion CV</span>
                <span className="contact-value">Portafolio completo</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© 2026 Cristhian Hernando Benitez Rodríguez</span>
          <span className="footer-sep">·</span>
          <span>Procurement Data-Driven</span>
          <span className="footer-sep">·</span>
          <span>Bogotá, Colombia</span>
        </div>
      </footer>
    </>
  );
}

/*
 * DESIGN: Procurement Data-Driven — Terminal de Abastecimiento & Analítica de Datos
 * PALETTE: #0B1215 (dark base), #5EEAD4 (teal neon), #F5A623 (amber status), #10B981 (emerald green)
 * FONTS: Space Grotesk (titles), JetBrains Mono (data), DM Sans (body)
 */

import ParticlesBackground from "@/components/ParticlesBackground";
import Navbar from "@/components/Navbar";
import TypewriterText from "@/components/TypewriterText";
import AnimatedCounter from "@/components/AnimatedCounter";
import TimelineItem from "@/components/TimelineItem";
import SkillBar from "@/components/SkillBar";

import ParallaxHero from "@/components/ParallaxHero";
import { useReveal } from "@/hooks/useReveal";
import { useNotification } from "@/contexts/NotificationContext";
import { useEffect } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  Download,
  ChevronDown,
  Briefcase,
  GraduationCap,
  Code,
  BarChart3,
  Globe,
  Award,
  Github,
  BookOpen,
} from "lucide-react";

const HERO_IMG = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1470&auto=format&fit=crop"; // Supply Chain container port background
const SUPPLY_IMG = "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?q=80&w=1470&auto=format&fit=crop"; 
const DATA_IMG = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"; // Dark dashboard metrics
const PROFILE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/cristhian-profile-photo_0a53abcf.png";
const CV_PDF = "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/CristhianHernandoBenitezRodriguez-Hojadevida_61fcabf4.pdf";

const experiences = [
  {
    title: "Gestor de Compras",
    company: "Somos Bogotá Usme S.A.S.",
    period: "02.2024 – Actualmente",
    description: [
      "Gestión de abastecimiento y cadena de suministro de lubricantes y repuestos para una flota de 260 buses articulados y biarticulados.",
      "Liderazgo en negociaciones estratégicas de gran escala con proveedores de componentes mecánicos e insumos clave.",
      "Desarrollo e implementación de dashboards de analítica de datos para el control exhaustivo de inventarios y comportamiento de precios.",
      "Optimización de procesos de facturación, pedidos y control de combustible con la marca PETROMIL."
    ],
    achievements: [
      "Ahorros de entre el 7% y el 11% en el presupuesto anual de lubricantes y repuestos vehiculares.",
      "Diseño y despliegue del Proyecto SMART: Sistema en Excel con fórmulas complejas y automatizaciones para control total de órdenes de compra, stock y facturación, convirtiéndose en el core de inventarios del área.",
    ],
  },
  {
    title: "Analista de Compras Técnicas",
    company: "Helicentro S.A.S.",
    period: "06.2020 – 02.2024",
    description: [
      "Coordinación y gestión de cotizaciones de compras técnicas y servicios especializados aeronáuticos e industriales.",
      "Análisis exhaustivo de cotizaciones internacionales y nacionales mediante cuadros comparativos paramétricos.",
      "Diseño y ejecución de planes de mitigación de sobre stock y rotación ineficiente de inventarios técnicos."
    ],
    achievements: [
      "Reducción del 20% en el lead time de respuesta a solicitudes críticas de compras técnicas.",
      "Optimización del 30% en verificaciones de stock automatizadas con algoritmos avanzados en Excel.",
      "Creación del sistema centralizado de control de órdenes de compra abiertas y memorandos de servicio."
    ],
  },
  {
    title: "Auxiliar Técnico en Comercio Exterior",
    company: "Helicentro S.A.S.",
    period: "02.2018 – 06.2020",
    description: [
      "Coordinación de aduanas e importaciones con transportadores internacionales clave (Fedex, UPS, Tampa, Centurion).",
      "Prorrateo de aranceles e impuestos y liquidación detallada del costo de importación en SIESA.",
      "Control estricto de documentación de soporte para importación de partes aeronáuticas cumpliendo regulaciones aduaneras."
    ],
    achievements: [
      "Liderazgo del Proyecto UAP (Usuario Altamente Exportador) de nacionalización, logrando reducir un 40% el gasto en agencias de aduanas.",
      "Reducción del 60% en el tiempo de entrega y nacionalización de partes críticas.",
      "100% de cumplimiento en auditorías y regulaciones de la DIAN sin ninguna sanción o multa."
    ],
  },
  {
    title: "Auxiliar de Aduanas - Compras",
    company: "Agencia de Aduanas Ceva Logistics",
    period: "12.2016 – 02.2018",
    description: [
      "Control de inventarios en depósitos aduaneros autorizados y auditoría física de mercancías importadas.",
      "Uso intensivo de módulos SAP para verificación de entradas y salidas de mercancía frente a manifiestos de aduana.",
      "Contacto directo y validación de entregas con proveedores de transporte y agencias logísticas."
    ],
    achievements: [
      "Reducción del 20% en el tiempo promedio de inspección de mercancías físicas en puerto seco.",
      "Incremento del 40% en la productividad operativa tras documentar e implementar verificaciones cruzadas en SAP.",
      "Diseño conceptual y automatización al 100% del sistema de actas de inspección virtual."
    ],
  },
];

const certifications = [
  { name: "Certificación en Inteligencia Artificial (Certiplus) - Aplicada a Negocios", icon: <Award size={18} /> },
  { name: "SAP Business One: Cero a Experto", icon: <Award size={18} /> },
  { name: "Programación en Java (Básico a Avanzado)", icon: <Code size={18} /> },
  { name: "Diseño Web Profesional & Desarrollo Front-End", icon: <Globe size={18} /> },
];

const projects = [
  {
    title: "Proyecto UAP - Logística Aduanera",
    category: "Supply Chain & Comercio Exterior",
    description: "Reestructuración y digitalización de los procesos de importación y nacionalización de carga industrial.",
    results: [
      "Reducción del 40% en gastos de agencia aduanal",
      "60% de mejora en tiempos de entrega puerta a puerta",
      "Cero multas aduaneras mediante control DIAN estricto",
      "Automatización de actas de inspección física en bodega"
    ],
    technologies: ["SIESA", "Excel Avanzado", "SAP ERP", "Regulación DIAN"]
  },
  {
    title: "Sistema SMART - Control de Inventario",
    category: "Data Analytics & Operations",
    description: "Creación de la columna vertebral analítica para controlar órdenes de compra, stock y facturación de combustible.",
    results: [
      "Ahorros del 7% al 11% en lubricantes y repuestos",
      "Control de stock dinámico para 260 buses articulados",
      "Consolidación automatizada de facturación PETROMIL",
      "Visualización en tiempo real de desviaciones presupuestarias"
    ],
    technologies: ["Excel Fórmulas Dinámicas", "Macros VBA", "Dashboards Analytics", "SQL"]
  },
  {
    title: "Modelación Predictiva de Costos Logísticos",
    category: "Data Science & Python",
    description: "Modelos predictivos en Python para anticipar variaciones de precio en insumos y fletes internacionales antes de impactar el presupuesto.",
    results: [
      "Predicción de costos con varianza controlada",
      "Optimización de tiempos de reorden y stock de seguridad",
      "Análisis automatizado de ofertas de proveedores con Pandas",
      "Integración de datos de múltiples ERPs en Tableau"
    ],
    technologies: ["Python", "Pandas", "Tableau", "Scikit-Learn", "Jupyter Notebooks"]
  }
];

export default function Home() {
  const { addNotification } = useNotification();
  const profileReveal = useReveal();
  const projectsReveal = useReveal();
  const metricsReveal = useReveal();
  const expReveal = useReveal();
  const eduReveal = useReveal();
  const skillsReveal = useReveal();
  const certReveal = useReveal();
  const contactReveal = useReveal();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('portfolio-visited');
    if (!hasVisited) {
      setTimeout(() => {
        addNotification({
          type: 'info',
          title: '¡Bienvenido!',
          message: 'Explora mi portafolio enfocado en Procurement Data-Driven, Python e IA.',
          duration: 5000,
        });
        sessionStorage.setItem('portfolio-visited', 'true');
      }, 500);
    }
  }, [addNotification]);

  return (
    <div className="min-h-screen bg-[#0B1215] text-[#E8E6E1] overflow-x-hidden">
      <ParticlesBackground />
      <Navbar />

      {/* ═══════════ HERO SECTION ═══════════ */}
      <ParallaxHero backgroundImage={HERO_IMG}>
        <div className="container mx-auto text-center px-4 pt-16 md:pt-20">
          <div className="mb-4 md:mb-8 flex justify-center scale-in">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-[#5EEAD4]/50 shadow-[0_0_30px_rgba(94,234,212,0.15)] p-1 float">
              <img
                src={PROFILE_IMG}
                alt="Cristhian Benitez"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <div
            className="inline-block bg-[#0B1215]/90 border border-[#5EEAD4]/20 rounded-lg px-4 py-2 mb-3 md:mb-6 fade-in-up"
          >
            <span className="text-[#F5A623] text-xs md:text-sm font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              ~/cristhian-benitez $&nbsp;
            </span>
            <span className="text-gray-300 text-xs md:text-sm font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              python -m procurement_prediction
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-2 md:mb-4 leading-tight fade-in-up"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            <span className="text-white">Procurement </span>
            <span className="text-[#5EEAD4]">Data-Driven</span>
          </h1>

          <div
            className="text-base sm:text-xl md:text-2xl text-gray-300 mb-4 md:mb-8 h-12 md:h-8 fade-in-up"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <TypewriterText
              texts={[
                "Llevo Compras de reportar el pasado a predecir el futuro",
                "IA, Python & Automatización aplicados a Abastecimiento",
                "Finanzas, Comercio Exterior & Negocios Internacionales",
              ]}
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8 fade-in-up">
            <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#5EEAD4]/30 text-[#5EEAD4] bg-[#5EEAD4]/5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              +5 años experiencia
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#F5A623]/30 text-[#F5A623] bg-[#F5A623]/5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Bogotá, Colombia
            </span>
            <span className="text-xs font-mono px-3 py-1.5 rounded-full border border-[#10B981]/30 text-[#10B981] bg-[#10B981]/5" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Disponible para proyectos
            </span>
          </div>

          <div className="mb-6 md:mb-12 fade-in-up">
            <a
              href={CV_PDF}
              download="Cristhian_Benitez_CV.pdf"
              onClick={() => {
                addNotification({
                  type: 'success',
                  title: '¡Descarga iniciada!',
                  message: 'Tu hoja de vida se está descargando...',
                  duration: 3000,
                });
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 md:px-6 md:py-3 rounded-lg border border-[#5EEAD4]/40 bg-[#5EEAD4]/5 hover:bg-[#5EEAD4]/15 text-[#5EEAD4] font-mono text-xs md:text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(94,234,212,0.25)] hover:border-[#5EEAD4]/80 group"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <Download size={16} className="group-hover:translate-y-1 transition-transform" />
              <span>Descargar Hoja de Vida</span>
            </a>
          </div>
        </div>
      </ParallaxHero>

      {/* ═══════════ PERFIL SECTION ═══════════ */}
      <section id="perfil" className="relative py-12 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div
            ref={profileReveal.ref}
            className={`transition-all duration-1000 ${
              profileReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-10">
              <Briefcase className="text-[#5EEAD4]" size={24} />
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Acerca de <span className="text-[#5EEAD4]">Mí</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-6">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Empecé en comercio exterior entre aforos, aranceles y hojas de Excel. Hoy lidero el abastecimiento de una flota de <strong className="text-white">260 buses articulados</strong> — y lo hago combinando negociación estratégica con modelos en <strong className="text-[#5EEAD4]">Python</strong>, dashboards y, desde hace poco, <strong className="text-[#F5A623]">IA aplicada</strong>.
                </p>
                <p className="text-gray-300 text-base leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  No vine del mundo tech. Vine de Compras, y fueron los problemas reales de Compras los que me empujaron a aprender a programar y analizar datos para solucionar cuellos de botella reales de la cadena de suministro.
                </p>
                <div className="space-y-3 font-mono text-sm text-gray-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <div className="flex items-start gap-2">
                    <span className="text-[#5EEAD4] font-bold">→</span>
                    <p>Diseñé <strong className="text-white">"SMART"</strong>, un sistema en Excel con fórmulas dinámicas para controlar órdenes de compra, stock y facturación de combustible (columna vertebral del control de inventarios de mi área).</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#5EEAD4] font-bold">→</span>
                    <p>Lideré el proyecto <strong className="text-white">UAP</strong> de nacionalización de mercancías, reduciendo el gasto en agencia de aduanas en un <strong className="text-[#10B981]">40%</strong> y los tiempos de entrega en un <strong className="text-[#10B981]">60%</strong>.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#5EEAD4] font-bold">→</span>
                    <p>Construyo modelos predictivos de costos logísticos para anticipar variaciones de precio antes de que impacten la operación.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#5EEAD4] font-bold">→</span>
                    <p>Certificado en IA (Certiplus) y en desarrollo web — porque cada herramienta nueva que aprendo, la pruebo primero en mi trabajo real.</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="glass-card rounded-xl p-6 border border-[#5EEAD4]/15 bg-white/5">
                  <h3 className="text-sm uppercase tracking-widest text-[#5EEAD4] mb-4 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Datos Operacionales
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-[#F5A623] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Bogotá, Colombia</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase size={16} className="text-[#5EEAD4] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">+5 años en Adquisiciones & Logística</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 size={16} className="text-[#10B981] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Hasta 11% de ahorro en insumos anuales</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-[#5EEAD4] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Comercio Exterior & Importaciones UAP</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Code size={16} className="text-[#F5A623] flex-shrink-0" />
                      <span className="text-gray-300 text-sm">Python, Pandas, Tableau, SQL, SAP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PROYECTOS SECTION ═══════════ */}
      <section id="proyectos" className="relative py-12 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div
            ref={projectsReveal.ref}
            className={`transition-all duration-1000 ${
              projectsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-10">
              <BarChart3 className="text-[#F5A623]" size={24} />
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Proyectos <span className="text-[#F5A623]">Destacados</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-6 border border-[#5EEAD4]/15 bg-white/5 hover:border-[#5EEAD4]/40 transition-all duration-300 hover:shadow-[0_0_20px_rgba(94,234,212,0.1)] fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {project.title}
                    </h3>
                    <span className="text-xs font-mono px-2 py-1 rounded bg-[#5EEAD4]/10 text-[#5EEAD4] border border-[#5EEAD4]/30">
                      {project.category}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <p className="text-xs uppercase tracking-widest text-[#F5A623] mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Resultados
                    </p>
                    <ul className="space-y-1">
                      {project.results.map((result, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-[#10B981] mt-1">▸</span>
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-[#5EEAD4] mb-2 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Stack Utilizado
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded bg-[#5EEAD4]/5 text-gray-300 border border-white/10">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ METRICS SECTION ═══════════ */}
      <section id="metricas" className="relative py-10 md:py-20 border-t border-white/5 bg-[#0B1215]/60">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${DATA_IMG})` }}
        />
        <div className="absolute inset-0 bg-[#0B1215]/90" />

        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={metricsReveal.ref}
            className={`transition-all duration-1000 ${
              metricsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-3 text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                KPIs & Impacto <span className="text-[#10B981]">Lograble</span>
              </h2>
              <p className="text-gray-500 text-sm font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                // Métricas logradas aplicando análisis y negociación
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <AnimatedCounter end={11} suffix="%" label="Ahorros anuales promedio en insumos" color="gold" />
              <AnimatedCounter end={20} suffix="%" label="Reducción en lead times de compras técnicas" color="cyan" />
              <AnimatedCounter end={40} suffix="%" label="Ahorro en corretaje aduanero (Proyecto UAP)" color="green" />
              <AnimatedCounter end={60} suffix="%" label="Disminución en tiempos de entrega física" color="green" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6 max-w-4xl mx-auto">
              <AnimatedCounter end={260} suffix="" prefix="" label="Flota de buses articulados bajo suministro" color="cyan" />
              <AnimatedCounter end={30} suffix="%" label="Optimización en tiempos de stock con Excel SMART" color="cyan" />
              <AnimatedCounter end={100} suffix="%" label="Cumplimiento regulatorio ante la DIAN sin sanciones" color="gold" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPERIENCIA SECTION ═══════════ */}
      <section id="experiencia" className="relative py-12 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div
            ref={expReveal.ref}
            className={`transition-all duration-1000 ${
              expReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-12">
              <Briefcase className="text-[#5EEAD4]" size={24} />
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Experiencia <span className="text-[#5EEAD4]">Profesional</span>
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              {experiences.map((exp, i) => (
                <TimelineItem key={i} {...exp} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EDUCACIÓN SECTION ═══════════ */}
      <section
        id="educacion"
        className="relative py-12 md:py-28 border-t border-white/5 bg-[#0B1215]/50"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${SUPPLY_IMG})` }}
        />
        <div className="absolute inset-0 bg-[#0B1215]/95" />

        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={eduReveal.ref}
            className={`transition-all duration-1000 ${
              eduReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-12">
              <GraduationCap className="text-[#10B981]" size={24} />
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Educación <span className="text-[#10B981]">Académica</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Degree 1 */}
              <div className="glass-card rounded-xl p-6 border border-[#5EEAD4]/15 bg-white/5 hover:border-[#5EEAD4]/40 transition-all duration-500 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#5EEAD4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#5EEAD4]/20 transition-colors">
                    <GraduationCap className="text-[#5EEAD4]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Finanzas y Negocios Internacionales
                    </h3>
                    <p className="text-[#5EEAD4] text-sm font-medium mb-2">Fundación Universitaria Compensar (Unipanamericana)</p>
                    <span className="text-xs text-gray-500 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Graduado 2023
                    </span>
                  </div>
                </div>
              </div>

              {/* Degree 2 */}
              <div className="glass-card rounded-xl p-6 border border-[#5EEAD4]/15 bg-white/5 hover:border-[#5EEAD4]/40 transition-all duration-500 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#5EEAD4]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#5EEAD4]/20 transition-colors">
                    <GraduationCap className="text-[#5EEAD4]" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Tecnólogo en Negocios Internacionales
                    </h3>
                    <p className="text-[#5EEAD4] text-sm font-medium mb-2">SENA</p>
                    <span className="text-xs text-gray-500 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      Graduado 2016
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div
              ref={certReveal.ref}
              className={`mt-12 transition-all duration-1000 delay-300 ${
                certReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <h3
                className="text-xl md:text-2xl font-bold mb-6 text-center text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Certificaciones <span className="text-[#F5A623]">& Credenciales</span>
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="glass-card rounded-lg px-5 py-3 border border-[#F5A623]/15 bg-white/5 hover:border-[#F5A623]/40 transition-all duration-500 flex items-center gap-3"
                  >
                    <span className="text-[#F5A623]">{cert.icon}</span>
                    <span className="text-gray-300 text-sm">{cert.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HABILIDADES SECTION ═══════════ */}
      <section id="habilidades" className="relative py-12 md:py-28 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div
            ref={skillsReveal.ref}
            className={`transition-all duration-1000 ${
              skillsReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-12">
              <Code className="text-[#5EEAD4]" size={24} />
              <h2
                className="text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Habilidades <span className="text-[#5EEAD4]">Técnicas & Negocio</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* ERP & Software */}
              <div className="glass-card rounded-xl p-6 border border-[#5EEAD4]/15 bg-white/5">
                <h3 className="text-sm uppercase tracking-widest text-[#5EEAD4] mb-6 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  ERP & Operations
                </h3>
                <SkillBar name="Excel Avanzado (Macros & Fórmulas)" level={95} color="cyan" delay={0} />
                <SkillBar name="SAP ERP & Business One" level={85} color="cyan" delay={100} />
                <SkillBar name="SIESA ERP" level={80} color="cyan" delay={200} />
                <SkillBar name="NEO System" level={75} color="cyan" delay={300} />
              </div>

              {/* Programación */}
              <div className="glass-card rounded-xl p-6 border border-[#10B981]/15 bg-white/5">
                <h3 className="text-sm uppercase tracking-widest text-[#10B981] mb-6 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Programación
                </h3>
                <SkillBar name="Python" level={80} color="green" delay={0} />
                <SkillBar name="Java" level={70} color="green" delay={100} />
                <SkillBar name="SQL / Base de Datos" level={85} color="green" delay={200} />
                <SkillBar name="JavaScript / React" level={70} color="green" delay={300} />
              </div>

              {/* Data Science & Analytics */}
              <div className="glass-card rounded-xl p-6 border border-[#5EEAD4]/15 bg-white/5">
                <h3 className="text-sm uppercase tracking-widest text-[#5EEAD4] mb-6 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Data Science
                </h3>
                <SkillBar name="Pandas & NumPy" level={85} color="cyan" delay={0} />
                <SkillBar name="Tableau & Power BI" level={80} color="cyan" delay={100} />
                <SkillBar name="Machine Learning (Predictivo)" level={70} color="cyan" delay={200} />
                <SkillBar name="Automatización de Procesos" level={90} color="cyan" delay={300} />
              </div>

              {/* Supply Chain & Logística */}
              <div className="glass-card rounded-xl p-6 border border-[#F5A623]/15 bg-white/5">
                <h3 className="text-sm uppercase tracking-widest text-[#F5A623] mb-6 font-semibold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  Procurement
                </h3>
                <SkillBar name="Negociación Estratégica" level={95} color="gold" delay={0} />
                <SkillBar name="Comercio Exterior (DIAN)" level={90} color="gold" delay={100} />
                <SkillBar name="Optimización de Costos" level={90} color="gold" delay={200} />
                <SkillBar name="Control de Inventario" level={88} color="gold" delay={300} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACTO SECTION ═══════════ */}
      <section id="contacto" className="relative py-12 md:py-28 border-t border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${SUPPLY_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1215] via-[#0B1215]/95 to-[#0B1215]/90" />

        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={contactReveal.ref}
            className={`transition-all duration-1000 ${
              contactReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-3 text-white"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Hablemos de <span className="text-[#5EEAD4]">Proyectos</span>
              </h2>
              <p className="text-gray-500 text-sm font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                // Si buscas eficiencia, IA y automatización aplicadas a tus procesos de abastecimiento.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto fade-in-up">
              <a
                href="mailto:cristianbenitez50@hotmail.com"
                onClick={() => {
                  addNotification({
                    type: 'info',
                    title: 'Abriendo correo...',
                    message: 'Redactando mensaje para cristianbenitez50@hotmail.com',
                    duration: 2500,
                  });
                }}
                className="glass-card rounded-xl p-4 md:p-6 border border-[#5EEAD4]/15 bg-white/5 hover:border-[#5EEAD4]/40 transition-all duration-500 text-center group"
              >
                <Mail className="mx-auto text-[#5EEAD4] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-xs text-gray-500 mb-1 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Email</p>
                <p className="text-gray-300 text-sm break-all">cristianbenitez50@hotmail.com</p>
              </a>

              <a
                href="tel:+573013748901"
                onClick={() => {
                  addNotification({
                    type: 'info',
                    title: 'Iniciando llamada...',
                    message: 'Conectando con +57 301 374 8901',
                    duration: 2500,
                  });
                }}
                className="glass-card rounded-xl p-4 md:p-6 border border-[#10B981]/15 bg-white/5 hover:border-[#10B981]/40 transition-all duration-500 text-center group"
              >
                <Phone className="mx-auto text-[#10B981] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-xs text-gray-500 mb-1 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Teléfono</p>
                <p className="text-gray-300 text-sm">(+57) 301 374 8901</p>
              </a>

              <a
                href="https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  addNotification({
                    type: 'info',
                    title: 'Abriendo LinkedIn...',
                    message: 'Visualizando perfil profesional en red de contactos',
                    duration: 2500,
                  });
                }}
                className="glass-card rounded-xl p-4 md:p-6 border border-[#0077b5]/30 bg-white/5 hover:border-[#0077b5]/60 transition-all duration-500 text-center group"
              >
                <Linkedin className="mx-auto text-[#0077b5] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-xs text-gray-500 mb-1 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LinkedIn</p>
                <p className="text-gray-300 text-sm">Cristhian Benitez</p>
              </a>

              <a
                href="https://github.com/Cristhiancol/cristhian-benitez-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-4 md:p-6 border border-[#ffffff]/15 bg-white/5 hover:border-[#ffffff]/40 transition-all duration-500 text-center group"
              >
                <Github className="mx-auto text-[#ffffff] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-xs text-gray-500 mb-1 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>GitHub</p>
                <p className="text-gray-300 text-sm">Cristhiancol</p>
              </a>

              <a
                href="https://rare-plume-e37.notion.site/Cristhian-Hernando-Benitez-Rodriguez-Portafolio-Profesional-337952d8da288166b76ce48b450aa0fc"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-xl p-4 md:p-6 border border-[#5EEAD4]/15 bg-white/5 hover:border-[#5EEAD4]/40 transition-all duration-500 text-center group"
              >
                <BookOpen className="mx-auto text-[#5EEAD4] mb-2 md:mb-3 group-hover:scale-110 transition-transform" size={24} />
                <p className="text-xs text-gray-500 mb-1 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Notion CV</p>
                <p className="text-gray-300 text-sm">Portafolio</p>
              </a>

              <div className="glass-card rounded-xl p-4 md:p-6 border border-[#F5A623]/15 bg-white/5 text-center">
                <MapPin className="mx-auto text-[#F5A623] mb-2 md:mb-3" size={24} />
                <p className="text-xs text-gray-500 mb-1 font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Ubicación</p>
                <p className="text-gray-300 text-sm">Bogotá, Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="border-t border-white/5 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-xs font-mono" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            &copy; 2026 Cristhian Hernando Benitez Rodríguez — Procurement Data-Driven Portfolio
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Desarrollado en React, TypeScript y Tailwind CSS con enfoque premium.
          </p>
        </div>
      </footer>
    </div>
  );
}

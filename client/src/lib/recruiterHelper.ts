export interface ProjectItem {
  id: string;
  status: string;
  statusLabel: string;
  title: string;
  from: string;
  to: string;
  description: string;
  results: string[];
  stack: string[];
  categories: string[];
}

export const RECRUITER_WHATSAPP_NUMBER = "573013748901";
export const RECRUITER_EMAIL = "cristianbenitez50@hotmail.com";
export const RECRUITER_LINKEDIN = "https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/";

export function generateWhatsAppLink(customMessage?: string): string {
  const defaultText = "Hola Cristhian, vi tu portafolio profesional y me gustaría conversar sobre una oportunidad.";
  const text = encodeURIComponent(customMessage || defaultText);
  return `https://wa.me/${RECRUITER_WHATSAPP_NUMBER}?text=${text}`;
}

export function generateAtsSummary(): string {
  return `CRISTHIAN HERNANDO BENÍTEZ RODRÍGUEZ
Profesional en Finanzas y Negocios Internacionales | Especialista en Abastecimiento Estratégico, Análisis de Datos & IA
Ubicación: Bogotá, D.C., Colombia
Contacto: (+57) 301 374 8901 | cristianbenitez50@hotmail.com
LinkedIn: ${RECRUITER_LINKEDIN}

RESUMEN PROFESIONAL:
+8 años de experiencia liderando compras estratégicas, comercio exterior y optimización de cadena de suministro para flotas de hasta 260 buses e industrias críticas. Especialista en la implementación de modelos predictivos de inventarios con Python, SQL y Gemini AI.

LOGROS CLAVE CUANTIFICADOS:
• 7% a 11% de ahorro recurrente en adquisición de bienes, insumos y servicios técnicos.
• 40% de reducción en costos de agenciamiento aduanero mediante régimen UAP.
• 60% de disminución en tiempos de entrega de mercancías internacionales.
• 92% de precisión en modelos predictivos de costos logísticos y fluctuaciones.
• 100% de cumplimiento normativo ante la DIAN sin sanciones.

STACK TÉCNICO:
• Datos & IA: Python (Pandas, Scikit-learn), SQL, Power BI, Tableau, Gemini AI.
• Gestión & ERP: SAP (MM, Business One), SIESA ERP, Neo System, Excel Avanzado (VBA).
• Desarrollo: React 19, TypeScript, Node.js, REST APIs.`;
}

export function filterProjectsByCategory(projects: ProjectItem[], category: string): ProjectItem[] {
  if (!category || category === "all") {
    return projects;
  }
  return projects.filter((project) => project.categories.includes(category));
}

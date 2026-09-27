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
  return `CRISTHIAN HERNANDO BENITEZ RODRIGUEZ
Profesional de Abastecimiento, Inventarios y Planeación de Materiales para Flota
Ubicación: Bogotá, D.C., Colombia
Contacto: (+57) 301 374 8901 | cristianbenitez50@hotmail.com
LinkedIn: ${RECRUITER_LINKEDIN}

RESUMEN PROFESIONAL:
+8 años en compras, inventarios y comercio exterior. Gestiono solicitudes de repuestos según cronogramas de mantenimiento para 260 buses articulados, con flujo de solicitudes en SIESA y control de inventario apoyado en Excel avanzado, Python e IA.

LOGROS CLAVE CUANTIFICADOS:
• 7% a 11% de ahorro recurrente en adquisición de bienes, insumos y servicios técnicos.
• 40% de reducción en costos de agenciamiento aduanero mediante régimen UAP.
• 60% de disminución en tiempos de entrega de mercancías internacionales.
• Asset Tracker: control de 1.828 referencias de repuestos con alertas de stock.
• 100% de cumplimiento normativo ante la DIAN sin sanciones.

STACK TÉCNICO:
• Datos & IA: Python (Pandas, Scikit-learn), SQL, Power BI, Tableau, Gemini AI.
• Gestión & ERP: SIESA ERP, SAP Business One, Excel Avanzado (VBA).
• Desarrollo: React 19, TypeScript, Node.js, REST APIs.`;
}

export function filterProjectsByCategory(projects: ProjectItem[], category: string): ProjectItem[] {
  if (!category || category === "all") {
    return projects;
  }
  return projects.filter((project) => project.categories.includes(category));
}

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "../../..");
const page = readFileSync(resolve(root, "client/src/pages/Propuesta90.tsx"), "utf8");
const app = readFileSync(resolve(root, "client/src/App.tsx"), "utf8");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");

describe("Propuesta 90 días", () => {
  it("está registrada como ruta y enlazada desde el portafolio", () => {
    expect(app).toContain('path={"/propuesta-90-dias"}');
    expect(home).toContain('href="/propuesta-90-dias"');
  });
  it("usa el nombre oficial y la hoja de vida vigente", () => {
    expect(page).toContain("Cristhian Hernando Benitez Rodriguez");
    expect(page).not.toMatch(/Benítez|Rodríguez/);
    expect(page).toContain("/docs/Cristhian_Benitez_Rodriguez_HV_Planeador_Controller_Mantenimiento.pdf");
  });
  it("no se indexa en buscadores", () => {
    expect(page).toContain("noindex, nofollow");
  });
  it("no publica indicadores de flota inventados (solo fórmulas)", () => {
    expect(page).not.toMatch(/disponibilidad (actual )?(del|de) \d+\s?%/i);
    expect(page).toContain("Sin cifras internas");
  });
  it("cubre los cuatro pilares de la oferta", () => {
    for (const p of ["Confiabilidad", "Disponibilidad", "Seguridad", "Costo"]) expect(page).toContain(p);
  });
});

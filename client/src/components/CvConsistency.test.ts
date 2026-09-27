import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(__dirname, "../../..");
const home = readFileSync(resolve(root, "client/src/pages/Home.tsx"), "utf8");
const allSources = [
  "client/src/pages/Home.tsx",
  "client/src/components/ExecutiveDeckModal.tsx",
  "client/src/components/RecruiterPitchModal.tsx",
  "client/src/components/SupplyChainGlobe3D.tsx",
  "client/src/components/SupplyChainWorkflowModal.tsx",
  "client/src/lib/recruiterHelper.ts",
  "client/index.html",
].map((f) => readFileSync(resolve(root, f), "utf8")).join("\n");

describe("Consistencia portafolio ↔ hoja de vida", () => {
  it("usa el nombre oficial sin tildes", () => {
    expect(allSources).not.toMatch(/Benítez|Rodríguez/);
    expect(home).toContain("Cristhian Hernando Benitez Rodriguez");
  });
  it("no publica indicadores sin soporte", () => {
    expect(allSources).not.toMatch(/92\s?%|1\.8% riesgo/);
  });
  it("enlaza la hoja de vida vigente incluida en el repositorio", () => {
    expect(home).toContain("/docs/Cristhian_Benitez_Rodriguez_HV_Planeador_Controller_Mantenimiento.pdf");
    expect(existsSync(resolve(root, "client/public/docs/Cristhian_Benitez_Rodriguez_HV_Planeador_Controller_Mantenimiento.pdf"))).toBe(true);
  });
  it("mantiene las mismas fechas laborales de la hoja de vida", () => {
    for (const d of ["02.2024 — Actualmente", "06.2020 — 02.2024", "02.2018 — 06.2020", "12.2016 — 02.2018"]) expect(home).toContain(d);
  });
  it("usa un solo correo de contacto", () => {
    expect(allSources).not.toContain("cristiancoli50@gmail.com");
    expect(home).toContain("cristianbenitez50@hotmail.com");
  });
  it("refleja el enfoque del cargo (SIESA, cronogramas, continuidad)", () => {
    expect(home).toContain("SIESA");
    expect(home).toContain("cronogramas de mantenimiento");
    expect(home).toContain("continuidad del suministro");
  });
});

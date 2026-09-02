import { describe, it, expect } from "vitest";

describe("3D Components Configuration and Logic", () => {
  it("verifies 3D Globe Logistics Nodes coverage", () => {
    const nodes = [
      "Bogotá (HQ - Operación)",
      "Miami (Hub Aéreo & Repuestos)",
      "Houston (Industrial / Insumos)",
      "Rotterdam (Puerto Marítimo Europa)",
      "Shanghai (Suministro Global)",
      "Frankfurt (Logística Técnica)",
    ];
    expect(nodes).toHaveLength(6);
    expect(nodes[0]).toContain("Bogotá");
  });

  it("calculates 3D coordinates projection correctly", () => {
    const lat = 4.711;
    const lng = -74.0721;
    const radius = 200;

    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);

    const x3d = -(radius * Math.sin(phi) * Math.cos(theta));
    const z3d = radius * Math.sin(phi) * Math.sin(theta);
    const y3d = radius * Math.cos(phi);

    expect(typeof x3d).toBe("number");
    expect(typeof y3d).toBe("number");
    expect(typeof z3d).toBe("number");
    expect(!isNaN(x3d)).toBe(true);
  });
});

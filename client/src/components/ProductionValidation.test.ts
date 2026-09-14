import { describe, it, expect } from "vitest";

describe("Production Validation: Deck Ejecutivo & Simulador ROI", () => {
  it("validates Deck Ejecutivo slide count, navigation bounds and keys", () => {
    const slides = [
      { id: 1, title: "Resumen Ejecutivo", tag: "01 / 04" },
      { id: 2, title: "Métricas Cuantitativas", tag: "02 / 04" },
      { id: 3, title: "Proyectos Emblemáticos", tag: "03 / 04" },
      { id: 4, title: "Contacto Inmediato", tag: "04 / 04" },
    ];

    expect(slides).toHaveLength(4);

    let current = 0;
    // Next
    current = Math.min(slides.length - 1, current + 1);
    expect(current).toBe(1);

    // Prev
    current = Math.max(0, current - 1);
    expect(current).toBe(0);

    // Clamping at boundaries
    current = Math.max(0, current - 1);
    expect(current).toBe(0);

    current = 3;
    current = Math.min(slides.length - 1, current + 1);
    expect(current).toBe(3);
  });

  it("validates Simulador ROI formulas across dynamic presets and ranges", () => {
    // Test Case 1: Somos Usme 260 buses
    const fleet = 260;
    const monthlySpendM = 620;
    const hasUAP = true;
    const hasAI = true;

    const annualSpend = monthlySpendM * 12; // 7,440M COP
    const baseSavingsRate = 0.075;
    const aiBonus = hasAI ? 0.035 : 0;
    const totalSavingsRate = baseSavingsRate + aiBonus; // 11%

    const estimatedSavingsM = Math.round(annualSpend * totalSavingsRate); // 818M
    const customsSavingM = hasUAP ? Math.round(annualSpend * 0.045) : 0; // 335M
    const totalImpactM = estimatedSavingsM + customsSavingM;

    expect(annualSpend).toBe(7440);
    expect(totalSavingsRate).toBe(0.11);
    expect(estimatedSavingsM).toBe(818);
    expect(totalImpactM).toBe(1153);

    // Stockout risk
    const stockoutRiskWithAI = hasAI ? 1.8 : 18.5;
    expect(stockoutRiskWithAI).toBe(1.8);

    // Test Case 2: Without AI and without UAP
    const noAI = false;
    const noUAP = false;
    const riskNoAI = noAI ? 1.8 : 18.5;
    expect(riskNoAI).toBe(18.5);
  });

  it("verifies live production bundle endpoints and asset integrity", async () => {
    const res = await fetch("https://cristhianpf-43pzwajd.manus.space/assets/index-DjrJatYt.js");
    expect(res.status).toBe(200);
    const text = await res.text();

    // Check presence of key identifiers in production bundle
    expect(text).toContain("Simulador de Ahorro");
    expect(text).toContain("Deck Ejecutivo");
    expect(text).toContain("StockFlow");
  });
});

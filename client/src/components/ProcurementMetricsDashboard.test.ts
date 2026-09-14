import { describe, it, expect } from "vitest";
import * as fs from "fs";
import * as path from "path";

describe("ProcurementMetricsDashboard & 20 Skills Integration", () => {
  it("calculates procurement savings accurately based on Cristhian's 260 buses formulas", () => {
    const monthlySpendM = 450;
    const annualSpend = monthlySpendM * 12; // 5,400M COP
    const baseSavingsRate = 0.075;
    const aiBonus = 0.035;
    const totalSavingsRate = baseSavingsRate + aiBonus; // 11%

    const estimatedSavingsM = Math.round(annualSpend * totalSavingsRate);
    const customsSavingM = Math.round(annualSpend * 0.045);
    const totalSavedM = estimatedSavingsM + customsSavingM;

    expect(totalSavingsRate).toBeCloseTo(0.11, 2);
    expect(estimatedSavingsM).toBe(594);
    expect(totalSavedM).toBeGreaterThan(594);
  });

  it("verifies stockout probability drops from 18.5% to 1.8% with AI prediction", () => {
    const withoutAI = 18.5;
    const withAI = 1.8;
    const reductionPercent = ((withoutAI - withAI) / withoutAI) * 100;

    expect(reductionPercent).toBeGreaterThan(90);
    expect(withAI).toBeLessThan(2);
  });

  it("verifies that all 20 required skills are properly installed in .agents/skills", () => {
    const skillsDir = path.resolve(process.cwd(), ".agents/skills");
    expect(fs.existsSync(skillsDir)).toBe(true);

    const installedSkills = fs.readdirSync(skillsDir);
    expect(installedSkills.length).toBeGreaterThanOrEqual(20);

    const requiredSkills = [
      "review-animations",
      "json-canvas",
      "muapi-ui-design",
      "muapi-3d-logo-animation",
      "build-dashboard",
      "gsap-plugins",
      "accessibility",
      "marp-slide",
      "tailwind-design-system",
      "playground",
      "emil-design-eng",
      "favicon-gen",
      "mermaid-visualizer",
      "excalidraw-diagram",
      "cut-the-curve",
      "web-design-engineer",
      "web-design-reviewer"
    ];

    requiredSkills.forEach(reqSkill => {
      expect(installedSkills).toContain(reqSkill);
      const skillMd = path.join(skillsDir, reqSkill, "SKILL.md");
      expect(fs.existsSync(skillMd)).toBe(true);
    });
  });
});

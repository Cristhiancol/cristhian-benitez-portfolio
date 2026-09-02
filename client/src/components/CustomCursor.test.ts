import { describe, it, expect } from "vitest";

describe("CustomCursor Component Logic & Math", () => {
  it("computes linear interpolation (lerp) accurately for fluid motion", () => {
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    // Moving from 0 to 100 with factor 0.2
    const step1 = lerp(0, 100, 0.2);
    expect(step1).toBe(20);

    const step2 = lerp(step1, 100, 0.2);
    expect(step2).toBe(36);

    const step3 = lerp(step2, 100, 0.2);
    expect(step3).toBeCloseTo(48.8, 1);
  });

  it("handles cursor mode sizing correctly", () => {
    const getRingSize = (mode: string, clicked: boolean) => {
      let size = 36;
      if (mode === "pointer") size = 48;
      else if (mode === "drag3d") size = 64;
      else if (mode === "project") size = 72;
      else if (mode === "text") size = 20;

      if (clicked) size = Math.max(18, size * 0.75);
      return size;
    };

    expect(getRingSize("default", false)).toBe(36);
    expect(getRingSize("pointer", false)).toBe(48);
    expect(getRingSize("drag3d", false)).toBe(64);
    expect(getRingSize("project", false)).toBe(72);
    expect(getRingSize("default", true)).toBe(27);
    expect(getRingSize("pointer", true)).toBe(36);
  });
});

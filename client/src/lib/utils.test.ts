import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  it("merges class names correctly", () => {
    expect(cn("px-2 py-1", "bg-blue-500")).toBe("px-2 py-1 bg-blue-500");
  });

  it("handles conditional classes properly", () => {
    const isTrue = true;
    const isFalse = false;
    expect(cn("base-class", isTrue && "active", isFalse && "inactive")).toBe("base-class active");
  });

  it("resolves tailwind class conflicts using twMerge", () => {
    expect(cn("px-2 px-4", "text-red-500 text-blue-500")).toBe("px-4 text-blue-500");
  });

  it("handles undefined, null, and empty inputs gracefully", () => {
    expect(cn("btn", undefined, null, false, "")).toBe("btn");
  });
});

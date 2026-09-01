import { describe, it, expect } from "vitest";
import {
  generateWhatsAppLink,
  generateAtsSummary,
  filterProjectsByCategory,
  RECRUITER_WHATSAPP_NUMBER,
  type ProjectItem,
} from "./recruiterHelper";

describe("recruiterHelper utilities", () => {
  describe("generateWhatsAppLink", () => {
    it("generates a valid WhatsApp URL with default message and correct phone number", () => {
      const link = generateWhatsAppLink();
      expect(link).toContain(`https://wa.me/${RECRUITER_WHATSAPP_NUMBER}`);
      expect(link).toContain("3013748901");
      expect(link).toContain("Hola%20Cristhian");
    });

    it("accepts a custom message", () => {
      const customMsg = "Quiero agendar una entrevista técnica";
      const link = generateWhatsAppLink(customMsg);
      expect(link).toContain(encodeURIComponent(customMsg));
    });
  });

  describe("generateAtsSummary", () => {
    it("includes key metrics, phone number, and contact info", () => {
      const summary = generateAtsSummary();
      expect(summary).toContain("CRISTHIAN HERNANDO BENÍTEZ RODRÍGUEZ");
      expect(summary).toContain("301 374 8901");
      expect(summary).toContain("cristianbenitez50@hotmail.com");
      expect(summary).toContain("7% a 11% de ahorro");
      expect(summary).toContain("260 buses");
      expect(summary).toContain("92% de precisión");
      expect(summary).toContain("Python");
    });
  });

  describe("filterProjectsByCategory", () => {
    const mockProjects: ProjectItem[] = [
      {
        id: "PRJ-1",
        status: "active",
        statusLabel: "LIVE",
        title: "AI Inventory",
        from: "A",
        to: "B",
        description: "Desc",
        results: ["10%"],
        stack: ["Python"],
        categories: ["data_ai", "supply_chain"],
      },
      {
        id: "PRJ-2",
        status: "active",
        statusLabel: "LIVE",
        title: "Biotech Pipeline",
        from: "A",
        to: "B",
        description: "Desc",
        results: ["15k genes"],
        stack: ["Python", "HPA"],
        categories: ["data_ai", "biotech"],
      },
      {
        id: "PRJ-3",
        status: "done",
        statusLabel: "DONE",
        title: "UAP Logistics",
        from: "A",
        to: "B",
        description: "Desc",
        results: ["40%"],
        stack: ["SAP"],
        categories: ["supply_chain"],
      },
    ];

    it("returns all projects when category is 'all' or empty", () => {
      expect(filterProjectsByCategory(mockProjects, "all")).toHaveLength(3);
      expect(filterProjectsByCategory(mockProjects, "")).toHaveLength(3);
    });

    it("filters correctly by data_ai", () => {
      const filtered = filterProjectsByCategory(mockProjects, "data_ai");
      expect(filtered).toHaveLength(2);
      expect(filtered.map((p) => p.id)).toEqual(["PRJ-1", "PRJ-2"]);
    });

    it("filters correctly by biotech", () => {
      const filtered = filterProjectsByCategory(mockProjects, "biotech");
      expect(filtered).toHaveLength(1);
      expect(filtered[0].id).toBe("PRJ-2");
    });

    it("filters correctly by supply_chain", () => {
      const filtered = filterProjectsByCategory(mockProjects, "supply_chain");
      expect(filtered).toHaveLength(2);
      expect(filtered.map((p) => p.id)).toEqual(["PRJ-1", "PRJ-3"]);
    });
  });
});

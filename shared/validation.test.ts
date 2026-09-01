import { describe, it, expect } from "vitest";
import { contactFormSchema, adminLoginSchema } from "./validation";

describe("Validation Schemas", () => {
  describe("contactFormSchema", () => {
    it("validates valid contact form input", () => {
      const validData = {
        name: "Cristhian Benítez",
        email: "cristhian@example.com",
        company: "Logistics Corp",
        interest: "Supply Chain Consulting",
        message: "Hola, me gustaría conversar sobre un proyecto de análisis de datos.",
      };

      const result = contactFormSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("Cristhian Benítez");
        expect(result.data.email).toBe("cristhian@example.com");
      }
    });

    it("rejects invalid email addresses", () => {
      const invalidData = {
        name: "Cristhian",
        email: "not-an-email",
        message: "Mensaje válido con longitud suficiente.",
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("rejects messages that are too short", () => {
      const invalidData = {
        name: "Cristhian",
        email: "cristhian@example.com",
        message: "Corto",
      };

      const result = contactFormSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it("assigns default values for optional company and interest fields", () => {
      const minimalData = {
        name: "Cristhian",
        email: "cristhian@example.com",
        message: "Mensaje con más de diez caracteres.",
      };

      const result = contactFormSchema.safeParse(minimalData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.company).toBe("");
        expect(result.data.interest).toBe("General");
      }
    });
  });

  describe("adminLoginSchema", () => {
    it("validates non-empty password", () => {
      const result = adminLoginSchema.safeParse({ password: "secretPassword123" });
      expect(result.success).toBe(true);
    });

    it("rejects empty password", () => {
      const result = adminLoginSchema.safeParse({ password: "" });
      expect(result.success).toBe(false);
    });
  });
});

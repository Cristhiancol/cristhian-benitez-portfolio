import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(120),
  email: z.string().email("Correo electrónico inválido").max(120),
  company: z.string().max(120).optional().default(""),
  interest: z.string().max(120).optional().default("General"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres").max(2000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export const adminLoginSchema = z.object({
  password: z.string().min(1, "La contraseña es requerida"),
});

export type AdminLoginData = z.infer<typeof adminLoginSchema>;

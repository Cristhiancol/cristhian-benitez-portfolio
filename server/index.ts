import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import axios from "axios";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ── MESSAGES STORAGE ─────────────────────────────────────────────
   Persists to a JSON file next to the server bundle.
   In production on Manus the file lives in /dist/messages.json
   ────────────────────────────────────────────────────────────────── */
const MESSAGES_FILE = path.resolve(__dirname, "messages.json");
const ADMIN_PASSWORD = "cristhian2026"; // ← Change this to something private

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  receivedAt: string;
  read: boolean;
}

function loadMessages(): ContactMessage[] {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf-8"));
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

function saveMessages(msgs: ContactMessage[]): void {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2), "utf-8");
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json());

  // ── API: receive contact form submissions ──────────────────────
  app.post("/api/contact", (req, res) => {
    const { name, email, company, interest, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Campos requeridos: name, email, message" });
    }

    const entry: ContactMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: String(name).slice(0, 120),
      email: String(email).slice(0, 120),
      company: String(company || "").slice(0, 120),
      interest: String(interest || "").slice(0, 120),
      message: String(message).slice(0, 2000),
      receivedAt: new Date().toISOString(),
      read: false,
    };

    const msgs = loadMessages();
    msgs.unshift(entry); // newest first
    saveMessages(msgs);

    console.log(`[CONTACTO] ${entry.receivedAt} | ${entry.name} <${entry.email}>`);

    // Enviar notificación de correo en segundo plano
    axios.post("https://formsubmit.co/ajax/cristiancoli50@gmail.com", {
      name: entry.name,
      email: entry.email,
      company: entry.company,
      interest: entry.interest,
      message: entry.message,
      _subject: `[Portafolio] Nuevo mensaje de ${entry.name}`,
    }).then(() => {
      console.log(`[EMAIL] Notificación enviada a cristiancoli50@gmail.com para ${entry.name}`);
    }).catch((err: any) => {
      console.error("[EMAIL ERROR] Error al enviar notificación a FormSubmit:", err?.message || err);
    });

    return res.json({ ok: true, id: entry.id });
  });

  // ── API: admin — list messages (password protected) ────────────
  app.get("/api/admin/messages", (req, res) => {
    const token = req.headers["x-admin-token"] || req.query.token;
    if (token !== ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: "No autorizado" });
    }
    return res.json({ ok: true, messages: loadMessages() });
  });

  // ── API: admin — mark message as read ─────────────────────────
  app.patch("/api/admin/messages/:id/read", (req, res) => {
    const token = req.headers["x-admin-token"] || req.query.token;
    if (token !== ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: "No autorizado" });
    }
    const msgs = loadMessages();
    const idx = msgs.findIndex((m) => m.id === req.params.id);
    if (idx === -1) return res.status(404).json({ ok: false });
    msgs[idx].read = true;
    saveMessages(msgs);
    return res.json({ ok: true });
  });

  // ── API: admin — delete message ────────────────────────────────
  app.delete("/api/admin/messages/:id", (req, res) => {
    const token = req.headers["x-admin-token"] || req.query.token;
    if (token !== ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false, error: "No autorizado" });
    }
    const msgs = loadMessages().filter((m) => m.id !== req.params.id);
    saveMessages(msgs);
    return res.json({ ok: true });
  });

  // ── Static SPA ─────────────────────────────────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Client-side routing — serve index.html for all non-API routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`Admin panel → http://localhost:${port}/admin`);
    console.log(`Messages stored in: ${MESSAGES_FILE}`);
  });
}

startServer().catch(console.error);

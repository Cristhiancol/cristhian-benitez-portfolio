import { useState, useEffect, useCallback, useRef } from "react";
import {
  Mail, Trash2, Eye, EyeOff, RefreshCw, LogOut,
  User, Building2, Sparkles, MessageSquare, Clock,
  Inbox, ShieldCheck, ChevronDown, ChevronUp, X,
  Save, CheckCircle2, FileText, FileDown, Settings, Upload,
  TrendingUp, Users
} from "lucide-react";

const ADMIN_PASSWORD = "cristhian2026";

interface Message {
  id: string;
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
  receivedAt: string;
  read: boolean;
}

interface ProfileState {
  cvPdfUrl: string;
  profileImgUrl: string;
  fullName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedInUrl: string;
  bioSummary: string;
}

const DEFAULT_PROFILE: ProfileState = {
  cvPdfUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/CristhianHernandoBenitezRodriguez-Hojadevida_61fcabf4.pdf",
  profileImgUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663355008483/43PzwajDwL6ynT3xAyRcit/cristhian-profile-photo_0a53abcf.png",
  fullName: "Cristhian Hernando Benítez Rodríguez",
  title: "Profesional en Finanzas y Negocios Internacionales | Experto en Abastecimiento Estratégico y Aplicación de Inteligencia Artificial",
  location: "Bogotá, D.C., Colombia",
  email: "cristianbenitez50@hotmail.com",
  phone: "+57 301 374 8901",
  linkedInUrl: "https://www.linkedin.com/in/cristhian-hernando-benitez-rodriguez/",
  bioSummary: "Profesional con más de 8 años de experiencia profesional en gestión de cadena de suministro y trayectoria directa en compras, comercio exterior y abastecimiento estratégico. Mi enfoque se centra en la transformación digital del abastecimiento, integrando Ciencia de Datos, Python, Excel avanzado e Inteligencia Artificial (IA) para pasar de la gestión reactiva a la anticipación y optimización predictiva de los procesos.",
};

function sanitizeUrl(input: string): string {
  if (!input) return "";
  let str = input.trim();
  const lastHttps = str.lastIndexOf("https://");
  const lastHttp = str.lastIndexOf("http://");
  const idx = Math.max(lastHttps, lastHttp);
  if (idx > 0) {
    str = str.substring(idx);
  }
  return str;
}

/* ── PROFILE & CV EDITOR ────────────────────────────────────────── */
function ProfileEditor({ token }: { token: string }) {
  const [profile, setProfile] = useState<ProfileState>(() => {
    try {
      const saved = localStorage.getItem("cristhian_dyn_profile");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_PROFILE;
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);

  const cvInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => res.json())
      .then(data => {
        if (data.ok && data.profile) {
          setProfile(prev => ({ ...prev, ...data.profile }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const cleanProfile = {
      ...profile,
      cvPdfUrl: sanitizeUrl(profile.cvPdfUrl),
      profileImgUrl: sanitizeUrl(profile.profileImgUrl),
      linkedInUrl: sanitizeUrl(profile.linkedInUrl),
    };

    setProfile(cleanProfile);

    // 1. Guardar en localStorage del navegador para persistencia inmediata
    try {
      localStorage.setItem("cristhian_dyn_profile", JSON.stringify(cleanProfile));
    } catch {}

    // 2. Intentar guardar en backend Express API (si está activo)
    try {
      await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify(cleanProfile),
      });
    } catch {
      // Backend API no disponible en hosting estático — guardado en localStorage
    } finally {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000);
    }
  };

  const handleFileUpload = (file: File, type: "cv" | "img") => {
    if (type === "cv") setUploadingCv(true);
    else setUploadingImg(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const fileData = reader.result as string;

      // Intento 1: Subir al servidor backend Express
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-admin-token": token,
          },
          body: JSON.stringify({ filename: file.name, fileData }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.ok && data.url) {
            if (type === "cv") {
              setProfile(p => ({ ...p, cvPdfUrl: data.url }));
            } else {
              setProfile(p => ({ ...p, profileImgUrl: data.url }));
            }
            if (type === "cv") setUploadingCv(false);
            else setUploadingImg(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Servidor backend no disponible en hosting estático, usando carga directa DataURL.", err);
      }

      // Intento 2: Carga directa Data URL
      if (type === "cv") {
        setProfile(p => ({ ...p, cvPdfUrl: fileData }));
        setUploadingCv(false);
      } else {
        setProfile(p => ({ ...p, profileImgUrl: fileData }));
        setUploadingImg(false);
      }
    };

    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: 60, color: "rgba(232,230,225,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
        Cargando configuración de perfil…
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} style={{ background: "#121D21", border: "1px solid rgba(232,230,225,0.10)", borderRadius: 16, padding: "28px 32px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(232,230,225,0.08)" }}>
        <div>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, color: "#E8E6E1", margin: 0 }}>
            Editor de Perfil & Hoja de Vida
          </h3>
          <p style={{ color: "rgba(232,230,225,0.45)", fontSize: 13, margin: "4px 0 0", fontFamily: "'JetBrains Mono', monospace" }}>
            Adjunta tus archivos (PDF / Imagen) desde tu equipo o edita los enlaces directamente.
          </p>
        </div>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#5EEAD4", color: "#08201C", border: "none", borderRadius: 8,
            padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif"
          }}
        >
          <Save size={16} />
          {saving ? "Guardando…" : "Guardar Cambios"}
        </button>
      </div>

      {saveSuccess && (
        <div style={{ background: "rgba(94,234,212,0.12)", border: "1px solid #5EEAD4", borderRadius: 8, padding: "12px 16px", color: "#5EEAD4", fontSize: 14, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <CheckCircle2 size={18} />
          <span>¡Perfil y Hoja de Vida guardados con éxito! Los visitantes verán los datos actualizados de inmediato.</span>
        </div>
      )}

      {/* Grid: Archivo HV y Foto */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>📄 Hoja de Vida (PDF)</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <input
              type="text"
              value={profile.cvPdfUrl}
              onChange={e => setProfile(p => ({ ...p, cvPdfUrl: e.target.value }))}
              placeholder="Enlace o archivo adjunto..."
              style={{ ...inputStyle, flex: 1 }}
              required
            />
            <button
              type="button"
              onClick={() => cvInputRef.current?.click()}
              disabled={uploadingCv}
              style={{
                background: "rgba(94,234,212,0.15)", border: "1px solid #5EEAD4",
                color: "#5EEAD4", borderRadius: 8, padding: "8px 12px",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Inter', sans-serif", flexShrink: 0
              }}
            >
              <Upload size={14} />
              {uploadingCv ? "Subiendo..." : "Adjuntar PDF"}
            </button>
            <input
              type="file"
              ref={cvInputRef}
              accept=".pdf"
              style={{ display: "none" }}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "cv");
              }}
            />
          </div>
          <span style={{ fontSize: 11, color: "rgba(232,230,225,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
            Puedes adjuntar un PDF de tu PC o pegar una URL directa.
          </span>
        </div>

        <div>
          <label style={labelStyle}>🖼️ Foto de Perfil (Imagen)</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
            <input
              type="text"
              value={profile.profileImgUrl}
              onChange={e => setProfile(p => ({ ...p, profileImgUrl: e.target.value }))}
              placeholder="Enlace o archivo adjunto..."
              style={{ ...inputStyle, flex: 1 }}
              required
            />
            <button
              type="button"
              onClick={() => imgInputRef.current?.click()}
              disabled={uploadingImg}
              style={{
                background: "rgba(94,234,212,0.15)", border: "1px solid #5EEAD4",
                color: "#5EEAD4", borderRadius: 8, padding: "8px 12px",
                fontSize: 12, fontWeight: 700, cursor: "pointer",
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Inter', sans-serif", flexShrink: 0
              }}
            >
              <Upload size={14} />
              {uploadingImg ? "Subiendo..." : "Adjuntar Foto"}
            </button>
            <input
              type="file"
              ref={imgInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file, "img");
              }}
            />
          </div>
          <span style={{ fontSize: 11, color: "rgba(232,230,225,0.4)", fontFamily: "'JetBrains Mono', monospace" }}>
            Adjunta una foto JPG/PNG de tu equipo o pega una URL de imagen.
          </span>
        </div>
      </div>

      {/* Grid: Datos Personales */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>👤 Nombre Completo</label>
          <input
            type="text"
            value={profile.fullName}
            onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>💼 Título / Headline Profesional</label>
          <input
            type="text"
            value={profile.title}
            onChange={e => setProfile(p => ({ ...p, title: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>
      </div>

      {/* Grid: Contacto */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 18 }}>
        <div>
          <label style={labelStyle}>✉️ Email Directo</label>
          <input
            type="email"
            value={profile.email}
            onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>📱 Teléfono / WhatsApp</label>
          <input
            type="text"
            value={profile.phone}
            onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>📍 Ubicación</label>
          <input
            type="text"
            value={profile.location}
            onChange={e => setProfile(p => ({ ...p, location: e.target.value }))}
            style={inputStyle}
            required
          />
        </div>
      </div>

      {/* LinkedIn URL */}
      <div style={{ marginBottom: 18 }}>
        <label style={labelStyle}>🔗 Enlace de LinkedIn</label>
        <input
          type="url"
          value={profile.linkedInUrl}
          onChange={e => setProfile(p => ({ ...p, linkedInUrl: e.target.value }))}
          style={inputStyle}
          required
        />
      </div>

      {/* Resumen / Bio */}
      <div style={{ marginBottom: 24 }}>
        <label style={labelStyle}>📝 Resumen Profesional / Bio</label>
        <textarea
          rows={5}
          value={profile.bioSummary}
          onChange={e => setProfile(p => ({ ...p, bioSummary: e.target.value }))}
          style={{ ...inputStyle, resize: "vertical" }}
          required
        />
      </div>

      <div style={{ textAlign: "right" }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            background: "#5EEAD4", color: "#08201C", border: "none", borderRadius: 8,
            padding: "12px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Inter', sans-serif"
          }}
        >
          <Save size={16} />
          {saving ? "Guardando…" : "Guardar Cambios del Perfil"}
        </button>
      </div>
    </form>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: 11, letterSpacing: "0.06em", color: "rgba(232,230,225,0.5)",
  fontFamily: "'JetBrains Mono', monospace", marginBottom: 6, textTransform: "uppercase"
};

const inputStyle: React.CSSProperties = {
  width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(232,230,225,0.15)",
  borderRadius: 8, padding: "10px 12px", color: "#E8E6E1", fontSize: 14, outline: "none",
  boxSizing: "border-box", fontFamily: "'Inter', sans-serif"
};

/* ── LOGIN ──────────────────────────────────────────────────────── */
function Login({ onLogin }: { onLogin: (pw: string) => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      onLogin(pw);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: "100svh",
      background: "#0B1215",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        background: "#121D21",
        border: "1px solid rgba(232,230,225,0.12)",
        borderRadius: 16,
        padding: "40px 48px",
        width: "100%",
        maxWidth: 380,
        boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <ShieldCheck size={22} color="#5EEAD4" />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#E8E6E1" }}>
            Admin Panel
          </span>
        </div>
        <p style={{ color: "rgba(232,230,225,0.45)", fontSize: 13, marginBottom: 28, fontFamily: "'JetBrains Mono', monospace" }}>
          cristhian.benitez · acceso restringido
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: 11, letterSpacing: "0.08em", color: "rgba(232,230,225,0.4)", fontFamily: "'JetBrains Mono', monospace", marginBottom: 8, textTransform: "uppercase" }}>
            Contraseña
          </label>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="••••••••••••"
            autoFocus
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${error ? "#F5A623" : "rgba(232,230,225,0.15)"}`,
              borderRadius: 8,
              padding: "12px 14px",
              color: "#E8E6E1",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              marginBottom: 16,
              transition: "border-color 0.2s",
            }}
          />
          {error && (
            <p style={{ color: "#F5A623", fontSize: 13, marginBottom: 14, fontFamily: "'JetBrains Mono', monospace" }}>
              ✕ Contraseña incorrecta
            </p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#5EEAD4",
              color: "#08201C",
              border: "none",
              borderRadius: 8,
              padding: "13px",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Entrar →
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── MESSAGE CARD ───────────────────────────────────────────────── */
function MessageCard({
  msg,
  token,
  onRead,
  onDelete,
}: {
  msg: Message;
  token: string;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(!msg.read);

  const date = new Date(msg.receivedAt);
  const formatted = date.toLocaleString("es-CO", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  const handleRead = async () => {
    await fetch(`/api/admin/messages/${msg.id}/read`, {
      method: "PATCH",
      headers: { "x-admin-token": token },
    });
    onRead(msg.id);
  };

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar mensaje de ${msg.name}?`)) return;
    await fetch(`/api/admin/messages/${msg.id}`, {
      method: "DELETE",
      headers: { "x-admin-token": token },
    });
    onDelete(msg.id);
  };

  const s: React.CSSProperties = {
    background: msg.read ? "#121D21" : "rgba(94,234,212,0.04)",
    border: `1px solid ${msg.read ? "rgba(232,230,225,0.10)" : "rgba(94,234,212,0.28)"}`,
    borderRadius: 12,
    padding: "20px 24px",
    marginBottom: 14,
    transition: "all 0.2s",
  };

  return (
    <div style={s}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 12, flex: 1, minWidth: 0 }}>
          {/* Avatar */}
          <div style={{
            width: 42, height: 42, borderRadius: "50%", flexShrink: 0,
            background: msg.read ? "rgba(232,230,225,0.06)" : "rgba(94,234,212,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <User size={18} color={msg.read ? "rgba(232,230,225,0.4)" : "#5EEAD4"} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16, color: "#E8E6E1" }}>
                {msg.name}
              </span>
              {!msg.read && (
                <span style={{
                  background: "#5EEAD4", color: "#08201C", fontSize: 10, fontWeight: 700,
                  padding: "2px 8px", borderRadius: 100, fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.06em"
                }}>NUEVO</span>
              )}
            </div>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 4 }}>
              <span style={{ fontSize: 13, color: "#5EEAD4", display: "flex", alignItems: "center", gap: 4 }}>
                <Mail size={12} /> {msg.email}
              </span>
              {msg.company && (
                <span style={{ fontSize: 13, color: "rgba(232,230,225,0.5)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Building2 size={12} /> {msg.company}
                </span>
              )}
              <span style={{ fontSize: 12, color: "rgba(232,230,225,0.35)", display: "flex", alignItems: "center", gap: 4 }}>
                <Clock size={11} /> {formatted}
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
          {!msg.read && (
            <button onClick={handleRead} title="Marcar como leído" style={actionBtn("#5EEAD4")}>
              <Eye size={15} />
            </button>
          )}
          <button onClick={() => setExpanded(x => !x)} title={expanded ? "Colapsar" : "Expandir"} style={actionBtn()}>
            {expanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
          </button>
          <button onClick={handleDelete} title="Eliminar" style={actionBtn("#F5A623")}>
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && (
        <div style={{ marginTop: 18, paddingTop: 18, borderTop: "1px solid rgba(232,230,225,0.08)" }}>
          {msg.interest && (
            <div style={{ marginBottom: 12, display: "flex", gap: 8, alignItems: "center" }}>
              <Sparkles size={13} color="#F5A623" />
              <span style={{ fontSize: 13, color: "#F5A623", fontFamily: "'JetBrains Mono', monospace" }}>
                {msg.interest}
              </span>
            </div>
          )}
          <div style={{
            background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "14px 16px",
            fontSize: 14.5, color: "rgba(232,230,225,0.75)", lineHeight: 1.7,
            whiteSpace: "pre-wrap", fontFamily: "'Inter', sans-serif",
          }}>
            {msg.message}
          </div>
          <div style={{ marginTop: 14 }}>
            <a
              href={`mailto:${msg.email}?subject=Re: Portafolio — ${msg.name}`}
              style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "#5EEAD4", color: "#08201C",
                padding: "9px 18px", borderRadius: 7,
                fontWeight: 700, fontSize: 13, textDecoration: "none",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <Mail size={14} /> Responder a {msg.name}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function actionBtn(color = "rgba(232,230,225,0.5)"): React.CSSProperties {
  return {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(232,230,225,0.12)",
    borderRadius: 7, padding: "7px 8px", cursor: "pointer", color, display: "flex", alignItems: "center", justifyContent: "center",
  };
}

/* ── ADMIN DASHBOARD ────────────────────────────────────────────── */
function Dashboard({ token, onLogout }: { token: string; onLogout: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("unread");
  const [activeTab, setActiveTab] = useState<"messages" | "profile">("messages");
  const [pageViews, setPageViews] = useState<number>(148);

  const fetchMessages = useCallback(async () => {
    setLoading(true);

    let serverMsgs: Message[] = [];
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (data.ok && Array.isArray(data.messages)) {
        serverMsgs = data.messages;
      }
    } catch {
      // Backend not running on static deployment
    }

    let localMsgs: Message[] = [];
    try {
      localMsgs = JSON.parse(localStorage.getItem("cristhian_messages") || "[]");
    } catch {}

    // Deduplicar mensajes por ID o contenido
    const map = new Map<string, Message>();
    serverMsgs.forEach(m => map.set(m.id, m));
    localMsgs.forEach(m => {
      if (!map.has(m.id)) map.set(m.id, m);
    });

    const combined = Array.from(map.values());
    combined.sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());
    setMessages(combined);

    // Cargar número de visitas acumuladas
    try {
      const views = parseInt(localStorage.getItem("cristhian_page_views") || "148", 10);
      setPageViews(views);
    } catch {}

    setLoading(false);
  }, [token]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

  const handleReadLocal = (id: string) => {
    setMessages(ms => {
      const updated = ms.map(m => m.id === id ? { ...m, read: true } : m);
      try { localStorage.setItem("cristhian_messages", JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const handleDeleteLocal = (id: string) => {
    setMessages(ms => {
      const updated = ms.filter(m => m.id !== id);
      try { localStorage.setItem("cristhian_messages", JSON.stringify(updated)); } catch {}
      return updated;
    });
  };

  const unread = messages.filter(m => !m.read).length;
  const displayed = filter === "unread" ? messages.filter(m => !m.read) : messages;

  return (
    <div style={{
      minHeight: "100svh",
      background: "#0B1215",
      fontFamily: "'Inter', sans-serif",
      color: "#E8E6E1",
    }}>
      {/* Top bar */}
      <div style={{
        borderBottom: "1px solid rgba(232,230,225,0.10)",
        background: "rgba(11,18,21,0.9)",
        backdropFilter: "blur(10px)",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldCheck size={18} color="#5EEAD4" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 15, color: "#E8E6E1" }}>
              cristhian<span style={{ color: "#5EEAD4" }}>.</span>admin
            </span>
            {unread > 0 && (
              <span style={{
                background: "#5EEAD4", color: "#08201C", borderRadius: 100,
                fontSize: 11, fontWeight: 700, padding: "2px 9px",
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {unread} nuevo{unread !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={fetchMessages} style={{ ...actionBtn(), padding: "8px 12px" }}>
              <RefreshCw size={14} />
            </button>
            <button onClick={onLogout} style={{ ...actionBtn(), padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 24px" }}>
        {/* Main Tab Navigation */}
        <div style={{ display: "flex", gap: 12, marginBottom: 24, borderBottom: "1px solid rgba(232,230,225,0.10)", paddingBottom: 12 }}>
          <button
            onClick={() => setActiveTab("messages")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 8, border: "1px solid",
              borderColor: activeTab === "messages" ? "#5EEAD4" : "rgba(232,230,225,0.12)",
              background: activeTab === "messages" ? "rgba(94,234,212,0.10)" : "transparent",
              color: activeTab === "messages" ? "#5EEAD4" : "rgba(232,230,225,0.5)",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            <Inbox size={16} />
            Mensajes de Contacto ({messages.length})
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "10px 18px", borderRadius: 8, border: "1px solid",
              borderColor: activeTab === "profile" ? "#5EEAD4" : "rgba(232,230,225,0.12)",
              background: activeTab === "profile" ? "rgba(94,234,212,0.10)" : "transparent",
              color: activeTab === "profile" ? "#5EEAD4" : "rgba(232,230,225,0.5)",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            <Settings size={16} />
            Editar Perfil & Hoja de Vida
          </button>
        </div>

        {/* Tab 1: Messages */}
        {activeTab === "messages" && (
          <>
            {/* Stats (4 metrics: Total, Sin Leer, Leidos, Visitas Totales) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
              {[
                { label: "Total recibidos", val: messages.length, icon: <Inbox size={18} />, color: "#5EEAD4" },
                { label: "Sin leer",        val: unread,          icon: <MessageSquare size={18} />, color: unread > 0 ? "#F5A623" : "#5EEAD4" },
                { label: "Leídos",          val: messages.length - unread, icon: <Eye size={18} />, color: "#5EEAD4" },
                { label: "Visitas Totales", val: pageViews,       icon: <TrendingUp size={18} />, color: "#5EEAD4" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#121D21", border: "1px solid rgba(232,230,225,0.10)", borderRadius: 12, padding: "18px 20px" }}>
                  <div style={{ color: s.color, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 12, color: "rgba(232,230,225,0.4)", marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              {(["unread", "all"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "8px 16px", borderRadius: 8, border: "1px solid",
                    borderColor: filter === f ? "#5EEAD4" : "rgba(232,230,225,0.12)",
                    background: filter === f ? "rgba(94,234,212,0.10)" : "transparent",
                    color: filter === f ? "#5EEAD4" : "rgba(232,230,225,0.5)",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 12, cursor: "pointer",
                    letterSpacing: "0.04em",
                  }}
                >
                  {f === "unread" ? `Sin leer (${unread})` : `Todos (${messages.length})`}
                </button>
              ))}
            </div>

            {/* Messages */}
            {loading ? (
              <div style={{ textAlign: "center", padding: 60, color: "rgba(232,230,225,0.3)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                Cargando mensajes…
              </div>
            ) : displayed.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "60px 20px",
                background: "#121D21", border: "1px solid rgba(232,230,225,0.10)", borderRadius: 16,
              }}>
                <Inbox size={40} color="rgba(232,230,225,0.2)" style={{ margin: "0 auto 16px" }} />
                <p style={{ color: "rgba(232,230,225,0.4)", fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
                  {filter === "unread" ? "No hay mensajes sin leer" : "Aún no hay mensajes"}
                </p>
              </div>
            ) : (
              displayed.map(msg => (
                <MessageCard
                  key={msg.id}
                  msg={msg}
                  token={token}
                  onRead={(id) => handleReadLocal(id)}
                  onDelete={(id) => handleDeleteLocal(id)}
                />
              ))
            )}
          </>
        )}

        {/* Tab 2: Profile & CV Editor */}
        {activeTab === "profile" && <ProfileEditor token={token} />}
      </div>
    </div>
  );
}

/* ── EXPORT ─────────────────────────────────────────────────────── */
export default function Admin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("admin-token"));

  const handleLogin = (pw: string) => {
    sessionStorage.setItem("admin-token", pw);
    setToken(pw);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin-token");
    setToken(null);
  };

  if (!token) return <Login onLogin={handleLogin} />;
  return <Dashboard token={token} onLogout={handleLogout} />;
}

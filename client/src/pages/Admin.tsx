/*
 * Admin Panel — Cristhian Benitez Portfolio
 * Acceso: /admin   Contraseña: cristhian2026
 * Solo tú tienes acceso a esta página.
 */

import { useState, useEffect, useCallback } from "react";
import {
  Mail, Trash2, Eye, EyeOff, RefreshCw, LogOut,
  User, Building2, Sparkles, MessageSquare, Clock,
  Inbox, ShieldCheck, ChevronDown, ChevronUp, X
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

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/messages", {
        headers: { "x-admin-token": token },
      });
      const data = await res.json();
      if (data.ok) setMessages(data.messages);
    } catch {
      // network error
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchMessages(); }, [fetchMessages]);

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
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 28 }}>
          {[
            { label: "Total recibidos", val: messages.length, icon: <Inbox size={18} />, color: "#5EEAD4" },
            { label: "Sin leer",        val: unread,           icon: <MessageSquare size={18} />, color: unread > 0 ? "#F5A623" : "#5EEAD4" },
            { label: "Leídos",          val: messages.length - unread, icon: <Eye size={18} />, color: "#5EEAD4" },
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
              onRead={(id) => setMessages(ms => ms.map(m => m.id === id ? { ...m, read: true } : m))}
              onDelete={(id) => setMessages(ms => ms.filter(m => m.id !== id))}
            />
          ))
        )}
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

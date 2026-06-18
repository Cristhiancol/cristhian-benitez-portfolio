/*
 * DESIGN: Cyberpunk Notification System
 * PALETTE: #00f0ff (cyan neon), #39ff14 (green neon), #ff006e (magenta neon), #ffd700 (gold)
 * ANIMATION: Slide-in from top, glow pulse, fade-out
 */

import { useNotification, Notification } from "@/contexts/NotificationContext";
import { X, CheckCircle, Info, AlertCircle, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotification();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onClose: () => void;
}

function NotificationItem({ notification, onClose }: NotificationItemProps) {
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "info":
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getColors = () => {
    switch (notification.type) {
      case "success":
        return {
          bg: "bg-gradient-to-r from-[#39ff14]/10 to-[#00f0ff]/10",
          border: "border-[#39ff14]/50",
          icon: "text-[#39ff14]",
          glow: "shadow-[0_0_20px_rgba(57,255,20,0.4)]",
        };
      case "error":
        return {
          bg: "bg-gradient-to-r from-[#ff006e]/10 to-[#ff0080]/10",
          border: "border-[#ff006e]/50",
          icon: "text-[#ff006e]",
          glow: "shadow-[0_0_20px_rgba(255,0,110,0.4)]",
        };
      case "warning":
        return {
          bg: "bg-gradient-to-r from-[#ffd700]/10 to-[#ffaa00]/10",
          border: "border-[#ffd700]/50",
          icon: "text-[#ffd700]",
          glow: "shadow-[0_0_20px_rgba(255,215,0,0.4)]",
        };
      case "info":
      default:
        return {
          bg: "bg-gradient-to-r from-[#00f0ff]/10 to-[#0099ff]/10",
          border: "border-[#00f0ff]/50",
          icon: "text-[#00f0ff]",
          glow: "shadow-[0_0_20px_rgba(0,240,255,0.4)]",
        };
    }
  };

  const colors = getColors();

  return (
    <div
      className={`
        pointer-events-auto
        ${isExiting ? "animate-notification-exit" : "animate-notification-enter"}
        ${colors.bg}
        ${colors.border}
        ${colors.glow}
        border backdrop-blur-md rounded-lg p-4 w-full max-w-sm
        flex items-start gap-3
        transition-all duration-300
      `}
    >
      <div className={`flex-shrink-0 mt-0.5 ${colors.icon} animate-pulse`}>
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold text-white mb-1 truncate">
          {notification.title}
        </h3>
        <p className="text-xs text-gray-300 line-clamp-2">
          {notification.message}
        </p>
        {notification.action && (
          <button
            onClick={() => {
              notification.action?.onClick();
              handleClose();
            }}
            className="mt-2 text-xs font-medium text-[#00f0ff] hover:text-[#39ff14] transition-colors underline"
          >
            {notification.action.label}
          </button>
        )}
      </div>

      <button
        onClick={handleClose}
        className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

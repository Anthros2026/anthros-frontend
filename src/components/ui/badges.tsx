"use client";

import { Icon } from "@iconify/react";
import { type ReactNode } from "react";

/* ═══════════════════════════════════════════
   EDITORIAL BADGE — Monospaced label with dash
   ═══════════════════════════════════════════ */
export function EditorialBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-tech text-subtle inline-flex items-center gap-3 ${className}`}
    >
      <span className="block w-6 h-px bg-subtle" />
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════
   STATUS BADGE — Colored pill with dot/icon
   ═══════════════════════════════════════════ */
export function StatusBadge({
  children,
  variant = "default",
  dot = false,
  icon,
  className = "",
}: {
  children: ReactNode;
  variant?: "default" | "blue" | "green" | "amber" | "red" | "dark";
  dot?: boolean;
  icon?: string;
  className?: string;
}) {
  const styles: Record<string, string> = {
    default:
      "bg-surface border border-border shadow-sm text-subtle",
    blue: "bg-accent-blue/10 text-accent-blue",
    green: "bg-accent-green/10 text-accent-green",
    amber: "bg-accent-amber/10 text-accent-amber",
    red: "bg-accent-red/10 text-accent-red",
    dark: "bg-obsidian text-white shadow-lg shadow-obsidian/20",
  };

  const dotColors: Record<string, string> = {
    default: "bg-accent-green",
    blue: "bg-accent-blue",
    green: "bg-accent-green",
    amber: "bg-accent-amber",
    red: "bg-accent-red",
    dark: "bg-white",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-semibold ${styles[variant]} ${className}`}
    >
      {dot && (
        <span
          className={`w-2 h-2 rounded-full ${dotColors[variant]} ${variant === "blue" ? "animate-pulse" : ""}`}
        />
      )}
      {icon && <Icon icon={icon} />}
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════
   VERSION BADGE — Mono version tag
   ═══════════════════════════════════════════ */
export function VersionBadge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[10px] text-subtle bg-canvas border border-border px-3 py-1.5 rounded uppercase tracking-tech ${className}`}
    >
      {children}
    </span>
  );
}

/* ═══════════════════════════════════════════
   LIVE STATUS — Pill with pulsing dot
   ═══════════════════════════════════════════ */
export function LiveStatus({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 h-12 px-5 rounded-full bg-accent-blue/10 text-accent-blue text-xs font-semibold ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
      {children}
    </span>
  );
}

"use client";

import { Icon } from "@iconify/react";
import { type ReactNode } from "react";

/* ═══════════════════════════════════════════
   PREMIUM CARD — White card with hover lift
   ═══════════════════════════════════════════ */
export function PremiumCard({
  children,
  className = "",
  glowBorder = false,
}: {
  children: ReactNode;
  className?: string;
  glowBorder?: boolean;
}) {
  return (
    <div
      className={`bg-surface border border-[#EAEAEA] shadow-[0_2px_4px_rgba(0,0,0,0.02),0_8px_16px_-4px_rgba(0,0,0,0.04)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(0,0,0,0.03),0_20px_40px_-8px_rgba(0,0,0,0.08)] hover:border-[#D4D4D4] rounded-xl ${glowBorder ? "animate-border-glow" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   GLASS PANEL — Frosted glass surface
   ═══════════════════════════════════════════ */
export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white/70 backdrop-blur-[20px] border border-black/[0.06] rounded-2xl relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   GLASS CARD DARK — Dark frosted glass
   ═══════════════════════════════════════════ */
export function GlassCardDark({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-[rgba(17,17,17,0.85)] backdrop-blur-[16px] border border-white/[0.08] rounded-2xl relative overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SWISS GRID — Bento layout with 1px gaps
   ═══════════════════════════════════════════ */
export function SwissGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`grid gap-px bg-border border border-border rounded-xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export function SwissGridItem({
  children,
  className = "",
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`${dark ? "bg-obsidian text-white" : "bg-surface"} p-8 lg:p-10 flex flex-col transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   FEATURE CARD — Card with colored top bar
   ═══════════════════════════════════════════ */
export function FeatureCard({
  icon,
  title,
  description,
  accentColor = "accent-blue",
  className = "",
}: {
  icon: string;
  title: string;
  description: string;
  accentColor?: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-surface p-8 hover:bg-canvas transition-colors relative group overflow-hidden ${className}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-${accentColor} opacity-0 group-hover:opacity-100 transition-opacity`}
      />
      <Icon icon={icon} className={`text-[2rem] text-${accentColor} mb-6`} />
      <h3 className="font-display text-lg font-medium tracking-tight text-obsidian mb-3">
        {title}
      </h3>
      <p className="text-sm text-subtle leading-relaxed">{description}</p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ICON CARD — Card with icon box and link
   ═══════════════════════════════════════════ */
export function IconCard({
  icon,
  title,
  description,
  linkText = "Learn more",
  linkHref = "#",
  accentColor = "obsidian",
  className = "",
}: {
  icon: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  accentColor?: string;
  className?: string;
}) {
  const iconBg =
    accentColor === "obsidian"
      ? "bg-canvas border-border"
      : `bg-${accentColor}/10 border-${accentColor}/20`;
  const iconColor =
    accentColor === "obsidian"
      ? "text-obsidian"
      : `text-${accentColor}`;
  const linkColor =
    accentColor === "obsidian"
      ? "text-obsidian"
      : `text-${accentColor}`;

  return (
    <PremiumCard className={`p-8 flex flex-col group ${className}`}>
      <div
        className={`w-10 h-10 ${iconBg} border rounded flex items-center justify-center mb-6`}
      >
        <Icon icon={icon} className={`text-xl ${iconColor}`} />
      </div>
      <h3 className="text-lg font-semibold text-obsidian mb-2">{title}</h3>
      <p className="text-sm text-subtle leading-relaxed mb-6">{description}</p>
      <div className="mt-auto">
        <a
          href={linkHref}
          className={`text-xs font-semibold ${linkColor} flex items-center gap-1 group-hover:gap-2 transition-all`}
        >
          {linkText}{" "}
          <Icon icon="solar:arrow-right-linear" />
        </a>
      </div>
    </PremiumCard>
  );
}

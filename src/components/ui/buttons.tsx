"use client";

import { Icon } from "@iconify/react";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

/* ── Shared props ── */
interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/* ═══════════════════════════════════════════
   BTN EDITORIAL — Asymmetric sweep fill
   ═══════════════════════════════════════════ */
export function ButtonEditorial({
  children,
  className = "",
  ...props
}: BaseButtonProps & { icon?: boolean }) {
  return (
    <button
      className={`group relative inline-flex items-center justify-center px-9 py-[1.125rem] bg-obsidian text-white font-sans text-[clamp(0.8rem,1vw,0.9rem)] font-semibold overflow-hidden transition-colors duration-[400ms] [clip-path:polygon(0_0,100%_0,100%_calc(100%-0.75rem),calc(100%-0.75rem)_100%,0_100%)] cursor-pointer z-[1] ${className}`}
      {...props}
    >
      <span className="absolute top-full left-0 w-full h-full bg-accent-blue transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full z-0" />
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <Icon
          icon="solar:arrow-right-up-linear"
          className="text-lg transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════
   BTN GLOW — Pill with glow ring on hover
   ═══════════════════════════════════════════ */
export function ButtonGlow({
  children,
  variant = "dark",
  className = "",
  ...props
}: BaseButtonProps & { variant?: "dark" | "blue" }) {
  const bg = variant === "blue" ? "bg-accent-blue" : "bg-obsidian";

  return (
    <button
      className={`relative inline-flex items-center gap-2 px-8 py-3.5 ${bg} text-white font-semibold text-sm rounded-full overflow-hidden transition-all duration-500 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:scale-[1.03] hover:shadow-[0_0_0_1px_rgba(93,114,233,0.3),0_8px_24px_-4px_rgba(93,114,233,0.25)] active:scale-[0.98] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════
   BTN GHOST — Transparent with border
   ═══════════════════════════════════════════ */
export function ButtonGhost({
  children,
  className = "",
  ...props
}: BaseButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-8 py-3.5 bg-transparent text-obsidian font-medium text-sm border border-border rounded-full transition-all duration-300 hover:bg-black/[0.03] hover:border-obsidian cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ═══════════════════════════════════════════
   BTN OUTLINE SWEEP — Underline that sweeps away
   ═══════════════════════════════════════════ */
export function ButtonOutlineSweep({
  children,
  className = "",
  href,
  ...props
}: BaseButtonProps & { href?: string }) {
  const classes = `group inline-flex items-center gap-2 py-2 text-obsidian text-[clamp(0.8rem,1vw,0.9rem)] font-medium relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-obsidian after:origin-right after:transition-transform after:duration-[400ms] after:[transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:after:scale-x-0 hover:after:origin-left cursor-pointer ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
        <Icon icon="solar:arrow-right-linear" />
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      <Icon icon="solar:arrow-right-linear" />
    </button>
  );
}

/* ═══════════════════════════════════════════
   BTN SHIMMER — Dark button with shimmer sweep
   ═══════════════════════════════════════════ */
export function ButtonShimmer({
  children,
  className = "",
  ...props
}: BaseButtonProps) {
  return (
    <button
      className={`group relative isolate overflow-hidden bg-obsidian text-white text-sm font-semibold px-8 py-3.5 rounded shadow-sm ring-1 ring-white/10 transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.25)] active:scale-[0.98] cursor-pointer ${className}`}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent z-0 pointer-events-none group-hover:animate-shimmer" />
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <Icon
          icon="solar:arrow-right-linear"
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </button>
  );
}

/* ═══════════════════════════════════════════
   BTN PILL — Simple rounded pill variants
   ═══════════════════════════════════════════ */
export function ButtonPill({
  children,
  variant = "dark",
  className = "",
  href,
}: {
  children: ReactNode;
  variant?: "dark" | "outline";
  className?: string;
  href?: string;
}) {
  const base =
    variant === "dark"
      ? "inline-flex items-center justify-center h-12 px-8 rounded-full bg-obsidian text-white text-sm font-medium hover:bg-charcoal shadow-sm transition-colors"
      : "inline-flex items-center justify-center h-12 px-6 rounded-full border border-black/10 text-obsidian text-sm font-medium hover:bg-black/5 transition-colors gap-2 group";

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`}>
        {children}
        {variant === "outline" && (
          <Icon
            icon="solar:arrow-right-linear"
            className="group-hover:translate-x-1 transition-transform"
          />
        )}
      </a>
    );
  }

  return (
    <button className={`${base} ${className} cursor-pointer`}>
      {children}
      {variant === "outline" && (
        <Icon
          icon="solar:arrow-right-linear"
          className="group-hover:translate-x-1 transition-transform"
        />
      )}
    </button>
  );
}

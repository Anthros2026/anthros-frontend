"use client";

import { type ReactNode } from "react";

/* ═══════════════════════════════════════════
   SECTION HEADER — Editorial badge + title + body
   ═══════════════════════════════════════════ */
export function SectionHeader({
  badge,
  title,
  description,
  className = "",
}: {
  badge: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`mb-16 ${className}`}>
      <span className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-tech text-subtle inline-flex items-center gap-3 mb-6">
        <span className="block w-6 h-px bg-subtle" />
        {badge}
      </span>
      <h2 className="text-h2 text-obsidian font-display mb-4">{title}</h2>
      {description && (
        <p className="text-body max-w-[36rem]">{description}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION DIVIDER — Gradient horizontal line
   ═══════════════════════════════════════════ */
export function SectionDivider() {
  return <div className="section-line" />;
}

/* ═══════════════════════════════════════════
   GLOW ORB — Background radial glow
   ═══════════════════════════════════════════ */
export function GlowOrb({
  color = "blue",
  className = "",
}: {
  color?: "blue" | "purple";
  className?: string;
}) {
  const gradient =
    color === "purple"
      ? "radial-gradient(circle, rgba(140, 98, 234, 0.05) 0%, transparent 70%)"
      : "radial-gradient(circle, rgba(93, 114, 233, 0.06) 0%, rgba(250, 250, 250, 0) 70%)";

  return (
    <div
      className={`absolute rounded-full pointer-events-none z-0 blur-[80px] ${className}`}
      style={{ background: gradient }}
    />
  );
}

/* ═══════════════════════════════════════════
   TECHNICAL GRID — Fixed background grid pattern
   ═══════════════════════════════════════════ */
export function TechnicalGrid() {
  return (
    <div className="fixed inset-0 z-0 technical-grid pointer-events-none max-w-[100vw] overflow-hidden" />
  );
}

/* ═══════════════════════════════════════════
   PROCESS STEPS — Numbered timeline
   ═══════════════════════════════════════════ */
export function ProcessSteps({
  steps,
  className = "",
}: {
  steps: { number: string; title: string; description: string; color?: string }[];
  className?: string;
}) {
  const colors = ["bg-obsidian", "bg-accent-blue", "bg-accent-purple", "bg-accent-green"];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 relative ${className}`}>
      <div className="hidden md:block absolute top-[2.5rem] left-0 w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
      {steps.map((step, i) => (
        <div key={step.number} className="relative pt-6 md:pt-12">
          <div className="absolute top-0 left-0 text-[3rem] font-display font-bold text-black/5 leading-none">
            {step.number}
          </div>
          <div
            className={`w-3 h-3 rounded-full ${step.color || colors[i] || "bg-obsidian"} absolute top-[2.2rem] left-0 hidden md:block ring-4 ring-canvas`}
          />
          <h3 className="font-display text-lg font-medium text-obsidian mb-3 mt-4 tracking-tight">
            {step.title}
          </h3>
          <p className="text-sm text-subtle leading-relaxed">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   CODE BLOCK — Styled code preview
   ═══════════════════════════════════════════ */
export function CodeBlock({
  children,
  filename = "code.ts",
  className = "",
}: {
  children: ReactNode;
  filename?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-border/50 to-transparent rounded-xl transform translate-x-2 translate-y-2" />
      <div className="relative bg-surface border border-black/5 rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div className="flex items-center px-4 py-3 border-b border-black/5 bg-canvas">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#E46060]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F5B14B]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#58C27D]" />
          </div>
          <span className="ml-4 text-xs font-mono text-subtle">{filename}</span>
        </div>
        <div className="p-6 overflow-x-auto text-sm font-mono leading-relaxed text-obsidian">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   INPUT — Rounded input field
   ═══════════════════════════════════════════ */
export function Input({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`flex-1 min-h-[48px] h-12 bg-surface border border-black/10 rounded-sm px-6 text-obsidian text-sm outline-none focus:border-obsidian focus:ring-2 focus:ring-obsidian/10 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] ${className}`}
      {...props}
    />
  );
}

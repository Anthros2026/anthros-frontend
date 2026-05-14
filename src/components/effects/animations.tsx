"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════
   REVEAL UP — Fade in from below on scroll
   ═══════════════════════════════════════════ */
export function RevealUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HOVER LIFT — Lift element on hover
   ═══════════════════════════════════════════ */
export function HoverLift({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MARQUEE — Infinite horizontal scroll strip
   ═══════════════════════════════════════════ */
export function Marquee({
  items,
  className = "",
}: {
  items: { label: string; dotColor?: string }[];
  className?: string;
}) {
  const doubled = [...items, ...items];

  return (
    <div className={`w-full overflow-hidden border-y border-black/5 bg-surface py-4 ${className}`}>
      <div className="flex gap-12 items-center text-xs font-mono tracking-tech uppercase text-subtle animate-marquee w-max">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{item.label}</span>
            {item.dotColor && (
              <span
                className={`w-1.5 h-1.5 rounded-full bg-${item.dotColor}`}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   METRIC COUNTER — Animated number on scroll
   ═══════════════════════════════════════════ */
export function MetricCounter({
  target,
  suffix = "",
  label,
  decimals = 0,
  className = "",
}: {
  target: number;
  suffix?: string;
  label: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current || !ref.current) return;
    hasAnimated.current = true;

    const el = ref.current;
    let startTimestamp: number | null = null;
    const duration = 2500;

    const step = (ts: number) => {
      if (!startTimestamp) startTimestamp = ts;
      const progress = Math.min((ts - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = ease * target;
      el.textContent =
        decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
      if (progress < 1) requestAnimationFrame(step);
      else
        el.textContent =
          decimals > 0 ? target.toFixed(decimals) : target.toString();
    };
    requestAnimationFrame(step);
  }, [isInView, target, decimals]);

  return (
    <div ref={containerRef} className={`text-center ${className}`}>
      <div className="text-[3.5rem] font-bold text-obsidian tracking-tighter leading-none mb-2 flex items-baseline justify-center tabular-nums">
        <span ref={ref}>0</span>
        {suffix && <span className="text-2xl text-subtle ml-1">{suffix}</span>}
      </div>
      <span className="font-mono text-[10px] text-subtle uppercase tracking-tech">
        {label}
      </span>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PULSE GLOW — Pulsing glow ring effect
   ═══════════════════════════════════════════ */
export function PulseGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`animate-pulse-glow ${className}`}>{children}</div>
  );
}

/* ═══════════════════════════════════════════
   BORDER GLOW — Animated glowing border
   ═══════════════════════════════════════════ */
export function BorderGlow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`animate-border-glow ${className}`}>{children}</div>
  );
}

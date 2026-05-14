"use client";

import { GlassCardDark } from "@/components/ui";
import { RevealUp } from "@/components/effects";
import { Icon } from "@iconify/react";
import { siteContent } from "@/data/site-content";

export function Benefits() {
  const content = siteContent.benefits;

  return (
    <section id="benefits" className="py-[10rem] bg-obsidian text-white relative overflow-hidden">
      {/* ── Dot texture background ── */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[80rem] mx-auto px-6 lg:px-12 relative z-10">
        <RevealUp>
          <div className="mb-16">
            <span className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-tech text-white/50 inline-flex items-center gap-3 mb-6">
              <span className="block w-6 h-px bg-white/50" />
              {content.badge}
            </span>
            <h2 className="text-h2 text-white font-display mb-4">
              {content.title}
            </h2>
            <p className="text-white/60 text-base leading-relaxed max-w-[36rem]">
              {content.description}
            </p>
          </div>
        </RevealUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.items.map((item, i) => (
            <RevealUp key={item.title} delay={i * 0.15}>
              <GlassCardDark className="p-8 h-full group overflow-hidden relative">
                {/* Colored bottom line on hover */}
                <div className={`absolute bottom-0 left-0 w-full h-[3px] bg-${item.accentColor} scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] origin-left`} />

                <Icon icon={item.icon} className={`text-3xl text-${item.accentColor} mb-6`} />
                <h3 className="text-lg font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </GlassCardDark>
            </RevealUp>
          ))}
        </div>
      </div>
    </section>
  );
}

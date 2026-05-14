"use client";

import { SectionDivider } from "@/components/ui";
import { RevealUp } from "@/components/effects";
import { Icon } from "@iconify/react";
import { siteContent } from "@/data/site-content";

export function PainSection() {
  const content = siteContent.pain;

  return (
    <>
      <section
        id="pain"
        className="py-[8rem] px-6 lg:px-12 bg-surface relative overflow-hidden"
      >
        {/* ── Background Grid ── */}
        <div className="absolute inset-0 pointer-events-none technical-grid" />

        <div className="max-w-[80rem] mx-auto relative z-10">
          {/* ── Section Header ── */}
          <RevealUp>
            <div className="mb-16">
              <span className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-tech text-subtle inline-flex items-center gap-3 mb-6">
                <span className="block w-6 h-px bg-subtle" />
                {content.badge}
              </span>
              <h2 className="text-h2 text-obsidian font-display mb-4">
                {content.title}
                <br />
                <span className="text-subtle">{content.titleHighlight}</span>
              </h2>
              <p className="text-body max-w-[36rem]">{content.description}</p>
            </div>
          </RevealUp>

          {/* ── Pain Cards ── */}
          <RevealUp delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.items.map((item) => (
                <div
                  key={item.title}
                  className="group relative bg-surface border border-border rounded-xl p-8 transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 hover:shadow-[0_4px_8px_rgba(0,0,0,0.03),0_20px_40px_-8px_rgba(0,0,0,0.08)] hover:border-[#D4D4D4] overflow-hidden"
                >
                  {/* Red bottom line on hover */}
                  <div className="absolute bottom-0 left-0 w-full h-[3px] bg-accent-red scale-x-0 group-hover:scale-x-100 transition-transform duration-[400ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] origin-left" />

                  <Icon
                    icon={item.icon}
                    className="text-3xl text-accent-red mb-6"
                  />
                  <h3 className="font-semibold text-lg text-obsidian mb-3">
                    {item.title}
                  </h3>
                  <p className="text-subtle text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </RevealUp>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}

"use client";

import { SectionHeader, SectionDivider, GlassPanel, GlowOrb } from "@/components/ui";
import { RevealUp, MetricCounter } from "@/components/effects";
import { PremiumCard } from "@/components/ui";
import { siteContent } from "@/data/site-content";

export function Positioning() {
  const content = siteContent.positioning;

  return (
    <>
      <section id="positioning" className="py-[8rem] px-6 lg:px-12 relative">
        <div className="max-w-[80rem] mx-auto">
          <RevealUp>
            <SectionHeader
              badge={content.badge}
              title={
                <>
                  {content.title}{" "}
                  <span className="text-subtle">{content.titleHighlight}</span>
                </>
              }
              description={content.description}
            />
          </RevealUp>

          <RevealUp delay={0.15}>
            <GlassPanel className="p-8 lg:p-12">
              <GlowOrb color="blue" className="top-[-20%] right-[-10%] w-[30vw] h-[30vw]" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {content.highlights.map((h) => (
                  <PremiumCard key={h.label} className="p-8 text-center">
                    <div className="text-[3rem] font-bold text-obsidian tracking-tighter leading-none mb-2">
                      {h.metric}
                    </div>
                    <span className="font-mono text-[10px] text-subtle uppercase tracking-tech">
                      {h.label}
                    </span>
                  </PremiumCard>
                ))}
              </div>
            </GlassPanel>
          </RevealUp>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}

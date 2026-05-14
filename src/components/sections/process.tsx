"use client";

import { SectionHeader, SectionDivider, ProcessSteps } from "@/components/ui";
import { RevealUp } from "@/components/effects";
import { siteContent } from "@/data/site-content";

export function Process() {
  const content = siteContent.process;

  return (
    <>
      <section id="process" className="py-[8rem] px-6 lg:px-12 bg-surface relative overflow-hidden">
        {/* ── Background Grid ── */}
        <div className="absolute inset-0 pointer-events-none technical-grid" />

        <div className="max-w-[80rem] mx-auto relative z-10">
          <RevealUp>
            <SectionHeader
              badge={content.badge}
              title={<>Como transformamos<br /><span className="whitespace-nowrap">necessidade em entrega</span></>}
              description={content.description}
            />
          </RevealUp>

          <RevealUp delay={0.15}>
            <ProcessSteps steps={content.steps} />
          </RevealUp>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}

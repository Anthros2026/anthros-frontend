"use client";

import { EditorialBadge, ButtonEditorial, ButtonOutlineSweep } from "@/components/ui";
import { RevealUp, WebGLHeroBackground } from "@/components/effects";
import { siteContent } from "@/data/site-content";

export function Hero() {
  const content = siteContent.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-[5rem] bg-canvas"
      style={{ maxWidth: "100vw" }}
    >
      {/* ── WebGL Dot Grid Background ── */}
      <WebGLHeroBackground />

      {/* ── Enhanced Glow Orbs (hover-toned, more visible) ── */}
      <div
        className="absolute top-[10%] left-[15%] w-[55vw] h-[55vw] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(228, 225, 218, 0.45) 0%, rgba(243, 243, 241, 0.2) 40%, rgba(250, 250, 250, 0) 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute top-[35%] right-[5%] w-[35vw] h-[35vw] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(218, 214, 205, 0.35) 0%, rgba(243, 243, 241, 0.15) 45%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-[10%] left-[40%] w-[25vw] h-[25vw] rounded-full pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(circle, rgba(228, 225, 218, 0.3) 0%, transparent 65%)",
          filter: "blur(70px)",
        }}
      />

      {/* ── Content ── */}
      <div className="max-w-[80rem] mx-auto px-6 lg:px-12 relative z-10 w-full pb-[10vh]">
        {/* Overline / Editorial Badge */}
        <RevealUp>
          <EditorialBadge className="mb-8">{content.badge}</EditorialBadge>
        </RevealUp>

        {/* Headline H1 */}
        <RevealUp delay={0.15}>
          <h1 className="text-h1 text-obsidian font-display mb-8">
            A diferença entre<br />fazer e dominar
            <br />
            <span className="text-subtle">{content.titleHighlight}</span>
          </h1>
        </RevealUp>

        {/* Supporting Text */}
        <RevealUp delay={0.3}>
          <p className="text-body max-w-[36rem] mb-12">
            {content.description}
          </p>
        </RevealUp>

        {/* CTAs */}
        <RevealUp delay={0.45}>
          <div className="flex flex-wrap gap-4">
            <ButtonEditorial>{content.ctaPrimary}</ButtonEditorial>
            <ButtonOutlineSweep href="#services">
              {content.ctaSecondary}
            </ButtonOutlineSweep>
          </div>
        </RevealUp>
      </div>

      {/* ── Scroll Indicator ── */}
      <RevealUp>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40">
          <span className="text-[0.6rem] uppercase tracking-tech font-mono">
            Scroll
          </span>
          <div className="w-px h-10 bg-obsidian/30 relative overflow-hidden">
            <div className="w-full h-1/2 bg-obsidian animate-bounce" />
          </div>
        </div>
      </RevealUp>
    </section>
  );
}

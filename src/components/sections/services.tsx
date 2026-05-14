"use client";

import { SectionHeader, SectionDivider } from "@/components/ui";
import { RevealUp, NeuralTechNetwork } from "@/components/effects";
import { siteContent } from "@/data/site-content";

const technologies = ["Java", "Python", "Node.js", "React", "SQL", "Azure", "AWS", "PHP", "Svelte", "Go", "C#", "Angular"];
const aiTechniques = ["MCP", "Engenharia de Prompt", "Agentic Workflows", "Skills & Tools", "RAG"];

export function Services() {
  const content = siteContent.services;

  return (
    <>
      <section id="services" className="relative py-[8rem] px-6 lg:px-12 bg-canvas border-y border-border overflow-hidden">
        <div className="max-w-[80rem] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealUp>
              <div>
                <SectionHeader
                  badge={content.badge}
                  title={<>Domínio técnico<br /><span className="whitespace-nowrap">para qualquer desafio</span></>}
                  description={content.description}
                  className="mb-12"
                />

                <div className="space-y-8">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-tech text-subtle block mb-3">
                      Tecnologias
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-sm font-medium text-charcoal border border-border rounded-full bg-surface cursor-default transition-all duration-300 ease-out hover:bg-obsidian hover:text-white hover:border-obsidian hover:shadow-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-tech text-subtle block mb-3">
                      Técnicas de IA
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {aiTechniques.map((technique) => (
                        <span
                          key={technique}
                          className="px-3 py-1.5 text-sm font-medium text-charcoal border border-border rounded-full bg-surface cursor-default transition-all duration-300 ease-out hover:bg-obsidian hover:text-white hover:border-obsidian hover:shadow-lg"
                        >
                          {technique}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealUp>

            <RevealUp delay={0.2}>
              <div className="hidden md:flex justify-center lg:justify-end">
                <NeuralTechNetwork />
              </div>
            </RevealUp>
          </div>
        </div>
      </section>
      <SectionDivider />
    </>
  );
}

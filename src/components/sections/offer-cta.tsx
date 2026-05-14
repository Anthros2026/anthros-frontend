"use client";

import { useState } from "react";
import { GlassPanel, GlowOrb, Input } from "@/components/ui";
import { ButtonEditorial } from "@/components/ui";
import { RevealUp } from "@/components/effects";
import { Icon } from "@iconify/react";
import { siteContent } from "@/data/site-content";

const WHATSAPP_URL =
  "https://wa.me/5548998176024?text=Ol%C3%A1!%20Venho%20atrav%C3%A9s%20do%20site%20da%20Anthros.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

export function OfferCta() {
  const content = siteContent.offer;
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="offer" className="py-[8rem] px-6 lg:px-12 relative">
      <div className="max-w-[80rem] mx-auto">
        <RevealUp>
          <div className="text-center mb-12">
            <span className="font-mono text-[clamp(0.65rem,0.8vw,0.75rem)] uppercase tracking-tech text-subtle inline-flex items-center gap-3 justify-center mb-6">
              <span className="block w-6 h-px bg-subtle" />
              {content.badge}
              <span className="block w-6 h-px bg-subtle" />
            </span>
            <h2 className="text-h2 text-obsidian font-display mb-4">
              {content.title}
              <br />
              <span className="text-subtle">{content.titleHighlight}</span>
            </h2>
            <p className="text-body max-w-[36rem] mx-auto">{content.description}</p>
          </div>
        </RevealUp>

        <RevealUp delay={0.15}>
          <div className="max-w-lg mx-auto">
            <GlassPanel className="p-8 relative overflow-hidden">
              <GlowOrb
                color="purple"
                className="top-[-30%] right-[-20%] w-[20vw] h-[20vw]"
              />
              <div className="relative z-10 space-y-6">
                {/* E-mail form */}
                {status === "success" ? (
                  <div className="flex items-center gap-3 py-4">
                    <Icon icon="solar:check-circle-linear" className="text-accent-green text-2xl" />
                    <p className="text-sm font-medium text-obsidian">
                      Recebemos seu contato! Retornaremos em até 24 horas.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                      <Input
                        type="email"
                        placeholder={content.inputPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        className="w-full"
                      />
                      <ButtonEditorial
                        className="!py-3 whitespace-nowrap"
                        onClick={handleSubmit}
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? "Enviando..." : content.ctaText}
                      </ButtonEditorial>
                    </div>
                    {status === "error" && (
                      <p className="text-xs text-accent-red flex items-center gap-2">
                        <Icon icon="solar:close-circle-linear" className="text-base" />
                        Erro ao enviar. Tente novamente.
                      </p>
                    )}
                  </div>
                )}

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-black/[0.06]" />
                  <span className="text-[10px] font-mono uppercase tracking-tech text-subtle">ou</span>
                  <div className="flex-1 h-px bg-black/[0.06]" />
                </div>

                {/* WhatsApp button */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 w-full py-3.5 rounded-sm border border-[#25D366]/30 bg-[#25D366]/[0.06] text-sm font-semibold text-obsidian transition-all duration-300 hover:bg-[#25D366]/[0.12] hover:border-[#25D366]/50"
                >
                  <Icon icon="mdi:whatsapp" className="text-xl text-[#25D366]" />
                  Conversar pelo WhatsApp
                  <Icon
                    icon="solar:arrow-right-up-linear"
                    className="text-base text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>

                {/* Disclaimer */}
                <p className="text-xs text-subtle flex items-center justify-center gap-2">
                  <Icon
                    icon="solar:shield-check-linear"
                    className="text-obsidian text-base"
                  />
                  {content.disclaimer}
                </p>
              </div>
            </GlassPanel>
          </div>
        </RevealUp>
      </div>
    </section>
  );
}

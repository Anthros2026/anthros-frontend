"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import logoSvg from "@/app/logo.svg";

/* ═══════════════════════════════════════════
   NAV — Glassmorphism navigation bar
   ═══════════════════════════════════════════ */
export function Nav({
  links,
  logo,
  cta,
}: {
  links: { label: string; href: string }[];
  logo?: React.ReactNode;
  cta?: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b border-black/5 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 shadow-[0_2px_10px_rgb(0,0,0,0.04)]"
          : "bg-canvas/80"
      }`}
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-12 h-[4.5rem] flex items-center justify-between">
        {logo || (
          <a href="#" className="flex items-center gap-3 group">
            <Image
              src={logoSvg}
              alt="Anthros"
              width={32}
              height={32}
              className="relative -top-[1px] transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <span className="font-display text-base font-bold tracking-tightest uppercase">
              ANTHROS
            </span>
          </a>
        )}

        <div className="hidden md:flex items-center gap-8 text-[0.8rem] font-medium text-subtle">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                const target = document.querySelector(link.href);
                if (target) {
                  const offset = 80;
                  const top = target.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              className="hover:text-obsidian transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">{cta}</div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════
   FOOTER — Minimal footer with columns
   ═══════════════════════════════════════════ */
export function Footer({
  columns,
  bottomText,
}: {
  columns: { title: string; links: { label: string; href: string }[] }[];
  bottomText?: string;
}) {
  return (
    <footer className="relative z-10 bg-surface border-t border-border py-16 px-6 lg:px-12">
      <div className="max-w-[80rem] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={logoSvg}
                alt="Anthros"
                width={26}
                height={26}
              />
              <span className="font-display font-bold text-sm tracking-tightest uppercase">
                ANTHROS
              </span>
            </div>
          </div>
          <div className="flex gap-16">
            {columns.map((col) => (
              <div key={col.title} className="space-y-3">
                <h4 className="text-xs font-bold text-obsidian uppercase tracking-tech">
                  {col.title}
                </h4>
                <ul className="space-y-2 text-xs text-subtle">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          const target = document.querySelector(link.href);
                          if (target) {
                            const offset = 80;
                            const top = target.getBoundingClientRect().top + window.scrollY - offset;
                            window.scrollTo({ top, behavior: "smooth" });
                          }
                        }}
                        className="hover:text-obsidian transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-obsidian uppercase tracking-tech">
                Contato
              </h4>
              <ul className="space-y-3 text-xs text-subtle">
                <li>
                  <a
                    href="https://wa.me/5548998176024?text=Ol%C3%A1!%20Venho%20atrav%C3%A9s%20do%20site%20da%20Anthros.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-obsidian transition-colors"
                  >
                    <Icon icon="mdi:whatsapp" className="text-base" />
                    +55 48 99817-6024
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:contato@anthros.com.br"
                    className="flex items-center gap-2 hover:text-obsidian transition-colors"
                  >
                    <Icon icon="solar:letter-linear" className="text-base" />
                    contato@anthros.com.br
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {bottomText && (
          <div className="border-t border-border pt-8 text-[10px] text-subtle/50 font-mono uppercase tracking-tech">
            {bottomText}
          </div>
        )}
      </div>
    </footer>
  );
}

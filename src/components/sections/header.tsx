"use client";

import { Nav } from "@/components/ui";
import { ButtonEditorial } from "@/components/ui";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const handleCtaClick = () => {
    const target = document.querySelector("#offer");
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <Nav
      links={NAV_LINKS}
      cta={
        <ButtonEditorial className="!px-4 !py-2 !text-[0.7rem] sm:!px-6 sm:!py-2.5 sm:!text-xs tracking-[0.04em]" onClick={handleCtaClick}>
          Fale Conosco
        </ButtonEditorial>
      }
    />
  );
}

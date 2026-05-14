---
name: site-structure
description: >
  Anthros site architecture skill. Defines folder structure, section patterns, data
  organization, and composition rules for the institutional SPA site. Use this when
  creating new sections, pages, or modifying the site structure.
user_invocable: true
---

# ANTHROS SITE STRUCTURE

Skill de arquitetura do site institucional da Anthros. Define a estrutura de pastas,
padrões de composição e regras para criação de seções e componentes do site.

**Sempre usar em conjunto com a skill `/design-system`** para garantir consistência visual.

---

## 1. VISÃO GERAL DO SITE

Site SPA institucional para empresa de tecnologia. Apresenta serviços e produtos.
Página única com seções navegáveis por âncoras.

### Ordem das seções

| # | Seção            | ID âncora        | Arquivo                          | Propósito                                      |
|---|------------------|------------------|----------------------------------|-------------------------------------------------|
| 1 | Header           | —                | `sections/header.tsx`            | Nav fixo com links para seções                  |
| 2 | Hero             | `#hero`          | `sections/hero.tsx`              | Headline impactante + CTA principal             |
| 3 | Dor              | `#pain`          | `sections/pain-section.tsx`      | Problemas que o cliente enfrenta                |
| 4 | Posicionamento   | `#positioning`   | `sections/positioning.tsx`       | Como a empresa resolve esses problemas          |
| 5 | Serviços         | `#services`      | `sections/services.tsx`          | Grid de serviços e produtos oferecidos          |
| 6 | Processo         | `#process`       | `sections/process.tsx`           | Timeline de como o trabalho é realizado         |
| 7 | Benefícios       | `#benefits`      | `sections/benefits.tsx`          | Vantagens para o cliente                        |
| 8 | Diferencial      | `#differentiator`| `sections/differentiator.tsx`    | O que diferencia dos concorrentes               |
| 9 | Oferta/CTA       | `#offer`         | `sections/offer-cta.tsx`         | Call to action final com oferta                 |
| 10| Footer           | —                | `sections/footer-section.tsx`    | Links, copyright, informações de contato        |

---

## 2. ESTRUTURA DE PASTAS

```
src/
├── app/
│   ├── globals.css                 ← Design tokens (não modificar sem checar design-system)
│   ├── layout.tsx                  ← Root layout com fontes e metadata
│   └── page.tsx                    ← Compositor — importa e ordena todas as seções
│
├── components/
│   ├── ui/                         ← Design system base (botões, cards, badges, etc.)
│   │   └── index.ts                ← Barrel export
│   ├── effects/                    ← Animações (RevealUp, Marquee, MetricCounter, etc.)
│   │   └── index.ts                ← Barrel export
│   └── sections/                   ← Seções do site
│       ├── index.ts                ← Barrel export de todas as seções
│       ├── header.tsx
│       ├── hero.tsx
│       ├── pain-section.tsx
│       ├── positioning.tsx
│       ├── services.tsx
│       ├── process.tsx
│       ├── benefits.tsx
│       ├── differentiator.tsx
│       ├── offer-cta.tsx
│       └── footer-section.tsx
│
├── data/
│   └── site-content.ts             ← Todo conteúdo textual do site
│
└── lib/
    └── constants.ts                ← Links de navegação, configs
```

---

## 3. REGRAS DE COMPOSIÇÃO

### 3.1 page.tsx — O compositor

O `page.tsx` é APENAS um compositor. Ele importa as seções e as renderiza em ordem.
Não deve conter lógica, estilos ou markup além da organização das seções.

```tsx
// src/app/page.tsx — PADRÃO OBRIGATÓRIO
import { Header, Hero, PainSection, Positioning, Services, Process, Benefits, Differentiator, OfferCta, FooterSection } from "@/components/sections";
import { TechnicalGrid } from "@/components/ui";

export default function Home() {
  return (
    <>
      <TechnicalGrid />
      <Header />
      <Hero />
      <PainSection />
      <Positioning />
      <Services />
      <Process />
      <Benefits />
      <Differentiator />
      <OfferCta />
      <FooterSection />
    </>
  );
}
```

### 3.2 Seções — Componentes autocontidos

Cada seção segue este padrão:

```tsx
"use client"; // apenas se usar hooks, eventos ou Framer Motion

import { SectionHeader, SectionDivider } from "@/components/ui";
import { RevealUp } from "@/components/effects";
import { siteContent } from "@/data/site-content";

export function NomeDaSecao() {
  const content = siteContent.nomeSecao;

  return (
    <>
      <section id="anchor-id" className="py-[8rem] px-6 lg:px-12 relative">
        <div className="max-w-[80rem] mx-auto">
          <RevealUp>
            <SectionHeader
              badge={content.badge}
              title={content.title}
              description={content.description}
            />
          </RevealUp>

          {/* Conteúdo da seção */}
        </div>
      </section>
      <SectionDivider />
    </>
  );
}
```

**Regras para seções:**

1. **Sempre usar `<section>` com `id`** para navegação por âncora
2. **Padding padrão**: `py-[8rem] px-6 lg:px-12`
3. **Container padrão**: `max-w-[80rem] mx-auto`
4. **Usar `<RevealUp>` com delays escalonados** (0, 0.15, 0.3) para animação de entrada
5. **Iniciar com `<SectionHeader>`** quando a seção tem título editorial
6. **Finalizar com `<SectionDivider />`** entre seções (exceto Hero e última seção antes do Footer)
7. **Importar conteúdo de `siteContent`** — nunca hardcodar textos no componente
8. **Importar componentes UI de `@/components/ui`** — nunca recriar
9. **`"use client"` apenas quando necessário** (hooks, eventos, Framer Motion)

### 3.3 Seções com fundo alternado

Para ritmo visual, alternar backgrounds entre seções:

- **Canvas** (`bg-canvas`): Hero, Posicionamento, Processo, Diferencial
- **Surface/White** (`bg-surface border-y border-border`): Dor, Serviços, Benefícios
- **Obsidian** (`bg-obsidian text-white`): Oferta/CTA (seção dark para destaque)

### 3.4 Mapeamento de componentes do design system por seção

| Seção           | Componentes sugeridos do design system                               |
|-----------------|----------------------------------------------------------------------|
| Header          | `Nav`, `ButtonShimmer`                                               |
| Hero            | `EditorialBadge`, `ButtonEditorial`, `ButtonOutlineSweep`, `GlowOrb` |
| Dor             | `SwissGrid`, `SwissGridItem`, `SectionHeader`                       |
| Posicionamento  | `GlassPanel`, `GlowOrb`, `SectionHeader`                            |
| Serviços        | `FeatureCard`, `PremiumCard`, `SectionHeader`                        |
| Processo        | `ProcessSteps`, `SectionHeader`                                      |
| Benefícios      | `IconCard`, `PremiumCard`, `MetricCounter`, `SectionHeader`          |
| Diferencial     | `GlassCardDark`, `SwissGrid`, `SectionHeader`                       |
| Oferta/CTA      | `GlassPanel`, `ButtonGlow`, `Input`                                  |
| Footer          | `Footer`                                                             |

---

## 4. DADOS — site-content.ts

Todo conteúdo textual fica centralizado em `src/data/site-content.ts`.
Isso facilita manutenção, futuras traduções e consistência.

### Estrutura do objeto de conteúdo

```typescript
// src/data/site-content.ts

export const siteContent = {
  hero: {
    badge: string,           // ex: "ANTHROS // TECHNOLOGY"
    title: string,           // Headline principal
    titleHighlight: string,  // Parte do título com cor diferente (text-subtle)
    description: string,     // Subtítulo / parágrafo
    ctaPrimary: string,      // Texto do botão principal
    ctaSecondary: string,    // Texto do botão secundário
  },

  pain: {
    badge: string,
    title: string,
    description: string,
    items: Array<{
      icon: string,          // Iconify icon name (ex: "solar:danger-triangle-linear")
      title: string,
      description: string,
    }>,
  },

  positioning: {
    badge: string,
    title: string,
    titleHighlight: string,
    description: string,
    highlights: Array<{
      metric: string,        // ex: "300%"
      label: string,         // ex: "ROI médio"
    }>,
  },

  services: {
    badge: string,
    title: string,
    description: string,
    items: Array<{
      icon: string,
      title: string,
      description: string,
      accentColor: string,   // ex: "accent-blue"
    }>,
  },

  process: {
    badge: string,
    title: string,
    description: string,
    steps: Array<{
      number: string,        // ex: "01"
      title: string,
      description: string,
    }>,
  },

  benefits: {
    badge: string,
    title: string,
    description: string,
    items: Array<{
      icon: string,
      title: string,
      description: string,
      accentColor: string,
    }>,
    metrics: Array<{
      target: number,
      suffix: string,
      label: string,
      decimals?: number,
    }>,
  },

  differentiator: {
    badge: string,
    title: string,
    titleHighlight: string,
    description: string,
    items: Array<{
      icon: string,
      title: string,
      description: string,
    }>,
  },

  offer: {
    badge: string,
    title: string,
    titleHighlight: string,
    description: string,
    ctaText: string,
    inputPlaceholder: string,
    disclaimer: string,
  },

  footer: {
    columns: Array<{
      title: string,
      links: Array<{ label: string, href: string }>,
    }>,
    bottomText: string,
  },
};
```

### Regras para dados

1. **Todo texto visível ao usuário vem de `siteContent`**
2. **Ícones usam nomes Iconify** (set Solar por padrão)
3. **`accentColor` usa tokens do design system** (accent-blue, accent-purple, etc.)
4. **`titleHighlight` é a parte do título renderizada em `text-subtle`** (padrão editorial)
5. **Métricas numéricas ficam em `metrics`** para uso com `MetricCounter`

---

## 5. CONSTANTES — constants.ts

```typescript
// src/lib/constants.ts

export const NAV_LINKS = [
  { label: "Serviços", href: "#services" },
  { label: "Processo", href: "#process" },
  { label: "Benefícios", href: "#benefits" },
  { label: "Diferencial", href: "#differentiator" },
  { label: "Contato", href: "#offer" },
];

export const SITE_CONFIG = {
  name: "ANTHROS",
  tagline: "Technology",
};
```

---

## 6. PATTERNS REUTILIZÁVEIS

### Pattern: Seção com grid de cards
```tsx
<RevealUp>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item) => (
      <FeatureCard key={item.title} {...item} />
    ))}
  </div>
</RevealUp>
```

### Pattern: Seção com métricas
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {metrics.map((m) => (
    <PremiumCard key={m.label} className="p-8">
      <MetricCounter {...m} />
    </PremiumCard>
  ))}
</div>
```

### Pattern: Seção dark (Oferta/CTA)
```tsx
<section className="py-[10rem] bg-obsidian text-white relative overflow-hidden">
  <div className="absolute inset-0 opacity-[0.04]"
    style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
  />
  <div className="max-w-[80rem] mx-auto px-6 lg:px-12 relative z-10">
    {/* conteúdo */}
  </div>
</section>
```

### Pattern: Título editorial com highlight
```tsx
<h1 className="text-h1 text-obsidian font-display">
  {content.title}<br />
  <span className="text-subtle">{content.titleHighlight}</span>
</h1>
```

---

## 7. CRIANDO UMA NOVA SEÇÃO (checklist)

Ao criar uma nova seção, siga este checklist:

- [ ] Criar arquivo em `src/components/sections/nome-secao.tsx`
- [ ] Adicionar dados em `siteContent` em `src/data/site-content.ts`
- [ ] Exportar no barrel `src/components/sections/index.ts`
- [ ] Importar e posicionar em `src/app/page.tsx`
- [ ] Usar `<section id="anchor">` com ID correspondente
- [ ] Padding e container padrão (`py-[8rem]`, `max-w-[80rem]`)
- [ ] Envolver conteúdo em `<RevealUp>` com delays
- [ ] Usar componentes do design system (nunca recriar)
- [ ] Texto vem de `siteContent` (nunca hardcodar)
- [ ] Verificar se `<SectionDivider />` é necessário após a seção

---

## 8. REGRAS DE NOMENCLATURA

| Item              | Convenção                    | Exemplo                        |
|-------------------|------------------------------|--------------------------------|
| Arquivo de seção  | kebab-case                   | `pain-section.tsx`             |
| Componente React  | PascalCase                   | `PainSection`                  |
| ID de âncora      | kebab-case                   | `id="pain"`                    |
| Chave em siteContent | camelCase                 | `siteContent.pain`             |
| Arquivo de dados  | kebab-case                   | `site-content.ts`              |
| Constantes        | SCREAMING_SNAKE_CASE         | `NAV_LINKS`                    |

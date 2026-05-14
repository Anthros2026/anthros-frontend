---
name: design-system
description: >
  Anthros Design System skill. Use this whenever the user requests visual elements,
  UI components, pages, or layouts. This skill defines the complete design language:
  colors, typography, buttons, cards, effects, and component patterns.
  Reference source: c:\Users\weliton.villain\Documents\anthros\assets\design_system.html
user_invocable: true
---

# ANTHROS DESIGN SYSTEM

You are building UI for the **anthros-frontend** Next.js project. Every visual element
MUST follow this design system. When in doubt, re-read the source file at:
`c:\Users\weliton.villain\Documents\anthros\assets\design_system.html`

## Stack

- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS v4 (CSS-based theme in `globals.css`)
- **Animations**: Framer Motion (`framer-motion`)
- **Icons**: Iconify React (`@iconify/react`) — use Solar icon set by default
- **Fonts**: Plus Jakarta Sans (body), Syne (display), Geist Mono (mono)

---

## 1. COLOR PALETTE

### Backgrounds & Text
| Token           | Hex       | Tailwind class    | Usage                    |
|-----------------|-----------|-------------------|--------------------------|
| Canvas          | `#FAFAFA` | `bg-canvas`       | Page background          |
| Surface         | `#FFFFFF` | `bg-surface`      | Card/panel backgrounds   |
| Hover           | `#F3F3F1` | `bg-hover`        | Hover states             |
| Obsidian        | `#111111` | `text-obsidian`   | Primary text, dark fills |
| Charcoal        | `#333333` | `text-charcoal`   | Secondary headings       |
| Subtle          | `#737373` | `text-subtle`     | Body text, captions      |
| Border          | `#E5E5E5` | `border-border`   | Borders, dividers        |
| Accent          | `#252525` | `bg-accent`       | Dark accent              |

### Accent Colors
| Token           | Hex       | Tailwind class       | Usage                       |
|-----------------|-----------|----------------------|-----------------------------|
| Blue            | `#5D72E9` | `text-accent-blue`   | Primary accent, links, CTAs |
| Purple          | `#8C62EA` | `text-accent-purple` | Secondary accent, keywords  |
| Green           | `#2E907B` | `text-accent-green`  | Success, verified, strings  |
| Amber           | `#E08A3B` | `text-accent-amber`  | Warnings, alerts            |
| Red             | `#D45454` | `text-accent-red`    | Errors, destructive         |

---

## 2. TYPOGRAPHY

### Font Families
- **Display** (`font-display`): Syne — headlines, hero text, section titles
- **Body** (`font-sans`): Plus Jakarta Sans — body text, UI labels
- **Mono** (`font-mono`): Geist Mono — code, badges, technical content

### Type Scale (CSS classes)
| Class       | Size                          | Weight | Tracking  | Line-height | Usage            |
|-------------|-------------------------------|--------|-----------|-------------|------------------|
| `.text-h1`  | `clamp(3.5rem, 8vw, 7rem)`   | 600    | -0.04em   | 0.95        | Hero headlines   |
| `.text-h2`  | `clamp(2.25rem, 5vw, 4rem)`  | 600    | -0.03em   | 1.05        | Section titles   |
| `.text-h3`  | `clamp(1.5rem, 3vw, 2.25rem)`| 600    | -0.02em   | 1.15        | Subsection titles|
| `.text-body`| `clamp(1rem, 1.15vw, 1.125rem)` | 400 | normal   | 1.65        | Body paragraphs  |

### Letter Spacing Tokens
- `tracking-tightest` → `-0.04em` (display headings)
- `tracking-tight` → `-0.02em` (subheadings)
- `tracking-tech` → `0.08em` (mono badges, labels)
- `tracking-wide` → `0.3em` (decorative)

---

## 3. BUTTONS

All button components are in `src/components/ui/buttons.tsx`.

### ButtonEditorial
Dark bg with asymmetric clip-path. Blue sweep fill on hover. Arrow icon animates diagonally.
```tsx
import { ButtonEditorial } from "@/components/ui";
<ButtonEditorial>Primary Action</ButtonEditorial>
```

### ButtonGlow
Pill-shaped with glow ring on hover. Variants: `"dark"` (default) | `"blue"`.
```tsx
import { ButtonGlow } from "@/components/ui";
<ButtonGlow>Get Started</ButtonGlow>
<ButtonGlow variant="blue">Blue Variant</ButtonGlow>
```

### ButtonShimmer
Dark rounded button with shimmer sweep on hover. Arrow slides right.
```tsx
import { ButtonShimmer } from "@/components/ui";
<ButtonShimmer>Request Demo</ButtonShimmer>
```

### ButtonGhost
Transparent with border. Border turns dark on hover.
```tsx
import { ButtonGhost } from "@/components/ui";
<ButtonGhost>Documentation</ButtonGhost>
```

### ButtonOutlineSweep
Text link with underline that sweeps away on hover. Can be `<a>` via `href` prop.
```tsx
import { ButtonOutlineSweep } from "@/components/ui";
<ButtonOutlineSweep href="#section">Learn More</ButtonOutlineSweep>
```

### ButtonPill
Simple rounded pill. Variants: `"dark"` | `"outline"`. Supports `href` for links.
```tsx
import { ButtonPill } from "@/components/ui";
<ButtonPill>Join Waitlist</ButtonPill>
<ButtonPill variant="outline" href="#how">See how it works</ButtonPill>
```

---

## 4. CARDS & SURFACES

All card components are in `src/components/ui/cards.tsx`.

### PremiumCard
White card with subtle shadow. Lifts on hover (-4px). Optional `glowBorder` prop for animated border glow.
```tsx
import { PremiumCard } from "@/components/ui";
<PremiumCard className="p-8">Content here</PremiumCard>
<PremiumCard glowBorder className="p-8">With glow border</PremiumCard>
```

### GlassPanel
Frosted glass with backdrop blur. For overlays, modals, elevated containers.
```tsx
import { GlassPanel } from "@/components/ui";
<GlassPanel className="p-8 lg:p-12">Glass content</GlassPanel>
```

### GlassCardDark
Dark frosted glass variant. For dark sections.
```tsx
import { GlassCardDark } from "@/components/ui";
<GlassCardDark className="p-8">Dark glass content</GlassCardDark>
```

### SwissGrid + SwissGridItem
Bento grid layout with 1px gap borders. Items can be `dark`.
```tsx
import { SwissGrid, SwissGridItem } from "@/components/ui";
<SwissGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <SwissGridItem>Light cell</SwissGridItem>
  <SwissGridItem dark>Dark cell</SwissGridItem>
</SwissGrid>
```

### FeatureCard
Card with colored top bar that appears on hover. Use inside a grid with `gap-px`.
```tsx
import { FeatureCard } from "@/components/ui";
<FeatureCard
  icon="solar:global-linear"
  title="Global Reach"
  description="Accept payments from anywhere."
  accentColor="accent-blue"
/>
```

### IconCard
Premium card with icon box header and bottom link. Uses `PremiumCard` internally.
```tsx
import { IconCard } from "@/components/ui";
<IconCard
  icon="solar:shield-keyhole-linear"
  title="Enterprise Grade"
  description="SOC2 Type II, GDPR compliant."
  linkText="Learn more"
  linkHref="#"
  accentColor="accent-blue"
/>
```

---

## 5. EFFECTS & ANIMATIONS

All effect components are in `src/components/effects/animations.tsx`.

### RevealUp
Fade-in from below on scroll (Framer Motion + IntersectionObserver). Supports `delay`.
```tsx
import { RevealUp } from "@/components/effects";
<RevealUp>Visible on scroll</RevealUp>
<RevealUp delay={0.15}>Delayed reveal</RevealUp>
```

### HoverLift
Element lifts 6px on hover with shadow.
```tsx
import { HoverLift } from "@/components/effects";
<HoverLift>Hoverable content</HoverLift>
```

### Marquee
Infinite horizontal scroll strip with dot separators.
```tsx
import { Marquee } from "@/components/effects";
<Marquee items={[
  { label: "Typography", dotColor: "accent-blue/30" },
  { label: "Colors", dotColor: "accent-purple/30" },
]} />
```

### MetricCounter
Animated number that counts up on scroll. Supports decimals and suffix.
```tsx
import { MetricCounter } from "@/components/effects";
<MetricCounter target={300} suffix="%" label="Average ROI" />
<MetricCounter target={99.99} suffix="%" label="Uptime SLA" decimals={2} />
```

### PulseGlow / BorderGlow
Wraps children with pulsing glow or animated border glow.
```tsx
import { PulseGlow, BorderGlow } from "@/components/effects";
<PulseGlow><div>Glowing</div></PulseGlow>
<BorderGlow><div>Glowing border</div></BorderGlow>
```

---

## 6. LAYOUT & UTILITIES

Components in `src/components/ui/layout.tsx`.

### SectionHeader
Standard section header with editorial badge, title, and optional description.
```tsx
import { SectionHeader } from "@/components/ui";
<SectionHeader
  badge="01 // COLORS"
  title="Color Palette"
  description="A refined palette built on light backgrounds."
/>
```

### SectionDivider
Gradient horizontal line between sections.
```tsx
import { SectionDivider } from "@/components/ui";
<SectionDivider />
```

### GlowOrb
Background radial glow. Position with `className`. Colors: `"blue"` | `"purple"`.
```tsx
import { GlowOrb } from "@/components/ui";
<GlowOrb color="blue" className="top-[15%] left-[20%] w-[50vw] h-[50vw]" />
```

### TechnicalGrid
Fixed background grid pattern (subtle dot grid).
```tsx
import { TechnicalGrid } from "@/components/ui";
<TechnicalGrid /> {/* Place once in layout */}
```

### ProcessSteps
Numbered timeline with connected dots.
```tsx
import { ProcessSteps } from "@/components/ui";
<ProcessSteps steps={[
  { number: "01", title: "Research", description: "Deep dive..." },
  { number: "02", title: "Design", description: "High-fidelity..." },
]} />
```

### CodeBlock
Styled code preview with macOS-style window chrome.
```tsx
import { CodeBlock } from "@/components/ui";
<CodeBlock filename="config.ts">
  <pre><code>const x = 42;</code></pre>
</CodeBlock>
```

### Input
Rounded input field matching the design system.
```tsx
import { Input } from "@/components/ui";
<Input type="email" placeholder="your@email.com" />
```

---

## 7. NAVIGATION

Components in `src/components/ui/navigation.tsx`.

### Nav
Glassmorphism fixed navigation. Gains shadow on scroll.
```tsx
import { Nav } from "@/components/ui";
<Nav
  links={[
    { label: "Colors", href: "#colors" },
    { label: "Typography", href: "#typography" },
  ]}
  cta={<ButtonShimmer>Get Started</ButtonShimmer>}
/>
```

### Footer
Minimal footer with column links.
```tsx
import { Footer } from "@/components/ui";
<Footer
  columns={[
    { title: "System", links: [{ label: "Colors", href: "#colors" }] },
  ]}
  bottomText="ANTHROS DESIGN SYSTEM // v1.0 // 2026"
/>
```

---

## 8. BADGES

Components in `src/components/ui/badges.tsx`.

### EditorialBadge
Monospaced uppercase label with leading dash line.
```tsx
import { EditorialBadge } from "@/components/ui";
<EditorialBadge>SYSTEM_CORE</EditorialBadge>
```

### StatusBadge
Colored pill with optional dot or icon. Variants: `"default"` | `"blue"` | `"green"` | `"amber"` | `"red"` | `"dark"`.
```tsx
import { StatusBadge } from "@/components/ui";
<StatusBadge variant="green" dot>Online</StatusBadge>
<StatusBadge variant="dark" icon="solar:check-circle-linear">Approved</StatusBadge>
<StatusBadge variant="amber" icon="solar:bell-linear">3 alerts</StatusBadge>
```

### VersionBadge
Mono version tag.
```tsx
import { VersionBadge } from "@/components/ui";
<VersionBadge>v2.4.1</VersionBadge>
```

### LiveStatus
Blue pill with pulsing dot.
```tsx
import { LiveStatus } from "@/components/ui";
<LiveStatus>Live Status</LiveStatus>
```

---

## 9. DESIGN PRINCIPLES

1. **Light-first**: Canvas (#FAFAFA) background, white surfaces, dark text
2. **Tight tracking on headlines**: Use `tracking-tightest` for hero, `tracking-tight` for sections
3. **Subtle depth**: Shadows are minimal (0.02-0.08 opacity). Cards lift on hover
4. **Purposeful motion**: Every animation serves UX. Use `RevealUp` for scroll reveals
5. **Editorial aesthetic**: Monospaced badges, asymmetric clip-paths, Swiss grid layouts
6. **Max content width**: `max-w-[80rem]` with `px-6 lg:px-12` padding
7. **Icon set**: Solar icons from Iconify (e.g., `solar:arrow-right-linear`)
8. **Dark sections**: Use `bg-obsidian text-white` with `GlassCardDark` for inverted areas

---

## 10. IMPLEMENTATION RULES

When creating any visual element:

1. **Always import from barrel exports**: `@/components/ui` and `@/components/effects`
2. **Use existing components first** — don't recreate what already exists
3. **Follow the color palette exactly** — no arbitrary hex values
4. **Use `font-display` for headings**, `font-sans` for body, `font-mono` for technical
5. **Wrap scroll-triggered content in `<RevealUp>`** with staggered delays (0, 0.15, 0.3)
6. **Use `<SectionHeader>` for section introductions**
7. **Separate sections with `<SectionDivider />`**
8. **Standard section padding**: `py-[8rem] px-6 lg:px-12`
9. **All interactive elements must have `cursor-pointer`**
10. **Use Tailwind classes** — avoid inline styles except for dynamic values
11. **Components are "use client"** when they use hooks, events, or Framer Motion
12. **If a component or pattern is needed but doesn't exist**, create it following the same patterns and add it to the appropriate file and barrel export

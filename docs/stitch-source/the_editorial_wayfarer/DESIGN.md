---
name: The Editorial Wayfarer
colors:
  surface: '#faf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#faf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ef'
  surface-container: '#efeee9'
  surface-container-high: '#e9e8e3'
  surface-container-highest: '#e3e3de'
  on-surface: '#1b1c19'
  on-surface-variant: '#444748'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e1dfdf'
  on-secondary-container: '#626262'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c1b1a'
  on-tertiary-container: '#868382'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#e6e2df'
  tertiary-fixed-dim: '#cac6c4'
  on-tertiary-fixed: '#1c1b1a'
  on-tertiary-fixed-variant: '#484645'
  background: '#faf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e3e3de'
  paper-white: '#FFFFFF'
  divider-line: '#D8D6CE'
  mustard-mirroreum: '#B5892E'
  green-cheonhyangrang: '#2E5A3E'
  blue-lighthouse: '#2F5D8A'
  terracotta-mother: '#9C5B3B'
  coffee-alo: '#6B4E37'
  ink-gray-art: '#4A4A48'
  vintage-paper-library: '#7A6A55'
  lava-waryong: '#8A3A2E'
  water-niagara: '#3E7A7A'
  basalt-pottery: '#5A5048'
typography:
  display-lg:
    fontFamily: notoSans
    fontSize: 44px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-sm:
    fontFamily: notoSans
    fontSize: 34px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  english-subtitle:
    fontFamily: notoSans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.25em
  question-text:
    fontFamily: notoSans
    fontSize: 22px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: -0.01em
  body-main:
    fontFamily: notoSans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.7'
    letterSpacing: 0em
  caption-muted:
    fontFamily: notoSans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0em
  button-text:
    fontFamily: notoSans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-margin: 24px
  element-gap-sm: 16px
  element-gap-md: 32px
  element-gap-lg: 64px
  inline-divider: 1px
---

## Brand & Style

The design system embodies the contemplative and intellectual spirit of a traveler who is both a reader and an author of their own journey. The brand personality is **academic yet approachable, serene, and deeply intentional**. It aims to evoke an emotional response of "mindful discovery"—transforming a physical walk into a literary experience.

### Design Style: Editorial Minimalism
The aesthetic is rooted in traditional print media and museum exhibition design. It avoids the typical "app-like" polish of shadows and gradients in favor of a flat, paper-like tactile quality. 

- **Key Principles:**
  - **Whitespace as Content:** Over 40% of the screen remains empty to allow the user's thoughts to occupy the space.
  - **Typography-Driven:** Hierarchy is established through font weight and size contrast rather than color or depth.
  - **High-Fidelity Simplicity:** Every line and margin is precise, mimicking a well-set book page.
  - **Tactile Transitions:** Use subtle fades and "page-turn" logic rather than kinetic app animations.

## Colors

The palette is anchored by a high-contrast pairing of **Ink Black (#1A1A1A)** and **Cream Ivory (#F2F1EC)**, creating a "black ink on aged paper" effect.

- **Background Strategy:** Use `#F2F1EC` as the primary canvas. Pure white (`#FFFFFF`) is reserved exclusively for cards or input containers to provide a subtle lift without using shadows.
- **Accent Strategy:** Accent colors are place-based. Only one accent color should be active per screen, applied to a single high-impact element (e.g., a subtitle, a button border, or a specific keyword).
- **Muted Tones:** `#6B6B6B` is used for metadata and English subtitles to reduce visual noise while maintaining legibility.

## Typography

Typography is the core of this design system. It utilizes **Noto Sans KR** to maintain a clean, modern, and highly legible Korean sans-serif aesthetic.

- **Bilingual Rhythm:** English subtitles are always rendered in all-caps with generous letter-spacing (0.25em) to serve as a decorative yet functional label.
- **Hierarchy through Weight:** Use Bold for main titles to simulate book covers, and Regular/Medium for body text to ensure a comfortable reading experience.
- **Line Height:** Maintain a loose line height (1.7 for body text) to reinforce the sense of "breathing room" and contemplation.

## Layout & Spacing

The layout follows a **Fixed-Width Column** model for content within a mobile viewport, centered with generous side margins of at least 24px.

- **Vertical Rhythm:** Spacing between elements is intentionally large. Grouped information (like a question and an input) uses 16px, while distinct sections (like a header and a card) use 32px or 64px to force a slower pace of interaction.
- **Single Task Focus:** Only one primary action or piece of information is presented per screen.
- **Breakpoints:** This system is optimized for mobile-first PWA usage. For tablet views, content width remains capped at 480px to maintain the "book-like" vertical reading column.

## Elevation & Depth

This design system rejects traditional shadows in favor of **Tonal Layering** and **Bold Outlines**.

- **Surface Levels:** 
  - Level 0 (Base): Cream Ivory (`#F2F1EC`).
  - Level 1 (Interactive): Pure White (`#FFFFFF`) used for cards and fields.
- **Depth Indicators:** Instead of ambient shadows, depth is conveyed through 1px borders (`#D8D6CE`). A slight increase in border weight or a change to the place-based accent color indicates an active or focused state.
- **Visual Flatness:** All elements should feel like they are printed on the same plane, similar to a physical museum card or an editorial layout.

## Shapes

The shape language is **sharp and architectural**. 

- **Corners:** Use 0px to 4px corners for all UI elements. This "near-square" approach mimics the cut of a physical piece of paper or a book's edge.
- **Visual Weight:** Avoid pill-shaped buttons or rounded bubbles. Every container should feel structural and rooted in a grid.

## Components

### Buttons
- **Style:** Outline-only by default.
- **Border:** 1px width using the current location's accent color or Ink Black.
- **Typography:** Uppercase English or Medium weight Korean, centered with ample padding.
- **Behavior:** No hover/press shadows. On press, the background fills with a very light tint of the accent color.

### Input Fields
- **Style:** Underline-only style. A 1px line in Ink Black at the bottom of the input area.
- **Placeholder:** Rendered in Muted Gray (`#6B6B6B`).
- **Focus:** The underline thickens to 2px or changes to the location's accent color.

### Cards (Forks/Choices)
- **Background:** Pure White (`#FFFFFF`).
- **Border:** 1px Ink Black or Divider Line.
- **Internal Layout:** Place name in Bold, followed by a muted single-line reason. 
- **Corners:** Sharp (0px).

### Progress Indicators (The Growing Book)
- Avoid traditional circular loaders or horizontal bars.
- **Concept:** Use a thin stack of horizontal lines at the top of the screen that "thickens" as chapters are completed, visually representing the spine of a growing book.

### Chat Interface
- Do not use message bubbles.
- Use a **Script/Play format**: 
  - "Librarian" text is left-aligned in Ink Black with a small accent-colored label above.
  - "Visitor" text is indented or right-aligned in a slightly lighter weight.
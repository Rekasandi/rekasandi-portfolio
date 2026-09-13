# REKASANDI — Design System

## 1. Design System Objective

The Rekasandi design system exists to make the website:

- Distinctive
- Premium
- Consistent
- Responsive
- Accessible
- Performant
- Easy to evolve

The design system should support editorial layouts rather than force every page into a conventional component-library aesthetic.

---

## 2. Design Principles

### 01 — Typography Leads

Use typography as the primary visual instrument.

### 02 — Space Creates Premium

Use generous whitespace and deliberate pacing.

### 03 — Grid Creates Precision

Every element should have a reason for where it sits.

### 04 — Motion Has Meaning

Animation must communicate hierarchy, transition, or interaction.

### 05 — Contrast Creates Character

Use restrained color and strong typographic contrast.

---

## 3. Visual Direction

The design language is:

```text
Editorial
+
Technology
+
Architecture
+
Digital Craft
```

Desired emotional response:

> "This company cares deeply about how things are made."

---

## 4. Color System

Initial color direction:

```css
--background: #0A0A0A;
--foreground: #F4F3EF;
--muted: #B6B5B0;
--subtle: #77766F;
--border: #292927;
--accent: #D7FF3F;
```

The exact accent may change during brand exploration.

### Rules

- Use the accent selectively.
- Do not build the visual identity around gradients.
- Do not introduce multiple accent colors without a clear reason.
- Text contrast must remain accessible.

---

## 5. Semantic Tokens

```text
Background
Foreground
Muted
Subtle
Border
Accent
Accent Foreground
Surface
Surface Elevated
Error
Success
```

Components should consume semantic tokens instead of raw hex values.

---

## 6. Typography

Recommended initial candidate:

**Geist**

Alternative candidates:

- Instrument Sans
- Inter Tight
- General Sans
- Neue Montreal
- Suisse Intl

### Final decision rule

Choose the font that gives Rekasandi the strongest combination of:

- Display quality
- Body readability
- Numeral quality
- Weight range
- Licensing practicality
- Web performance

---

## 7. Typography Scale

```text
Display 2XL
120–180px

Display XL
96–128px

Display L
72–96px

Heading XL
56–72px

Heading L
44–56px

Heading M
32–44px

Body L
20px

Body M
17–18px

Body S
14–16px

Meta
11–13px
```

Use fluid sizing rather than abrupt breakpoint jumps.

---

## 8. Display Typography

Large display headings should be:

- Tight
- Bold
- Short
- Intentional

Example:

```text
WE BUILD
DIGITAL
PRODUCTS.
```

Avoid paragraph-length hero headlines.

---

## 9. Monospace Metadata

A restrained monospace family may be used for:

- Project numbers
- Technical metadata
- Coordinates
- Labels
- Small UI details

It should remain a supporting typeface.

---

## 10. Grid

### Desktop

12 columns.

### Tablet

8 columns.

### Mobile

4 columns.

Recommended behavior:

```text
Full-width media
     ↓
Grid-aligned content
     ↓
Intentional overflow
```

Use the grid to create asymmetry.

---

## 11. Containers

Suggested maximum width:

```text
1440px–1600px
```

Use responsive horizontal padding.

Example conceptual system:

```text
Desktop: 48–80px
Tablet: 32–48px
Mobile: 20–24px
```

---

## 12. Spacing Tokens

```text
4
8
12
16
24
32
48
64
80
96
128
160
192
240
```

Spacing should create rhythm rather than merely separate components.

---

## 13. Border System

Use borders intentionally.

Default:

```text
1px solid var(--border)
```

Borders may be used for:

- Grid lines
- Navigation
- Project metadata
- Section separation
- Forms

Avoid borders around every card.

---

## 14. Radius

Default philosophy: restrained.

```text
xs: 4px
sm: 8px
md: 12px
lg: 16px
```

Large editorial imagery may use zero radius when appropriate.

---

## 15. Shadows

Use shadows rarely.

Preferred hierarchy:

1. No shadow
2. Border
3. Contrast
4. Subtle elevation

The system should not feel like a conventional dashboard.

---

## 16. Buttons

### Primary

```text
START A PROJECT →
```

Characteristics:

- Strong typography
- Compact
- Clear focus state
- Magnetic on desktop where appropriate

### Secondary

```text
VIEW WORK →
```

### Text Link

```text
EXPLORE →
```

---

## 17. Button States

Required:

```text
Default
Hover
Active
Focus
Disabled
Loading
```

Hover may include:

- Arrow translation
- Background movement
- Underline
- Magnetic offset

Do not depend on color alone.

---

## 18. Links

Links should have a recognizable interaction language.

Examples:

```text
→ View project
↗ Open
→ Explore
```

Arrow motion should be subtle.

---

## 19. Navigation

Desktop:

```text
REKASANDI
WORK
SERVICES
ABOUT
INSIGHTS
START A PROJECT ↗
```

Mobile:

```text
REKASANDI
MENU
```

Navigation should not dominate the viewport.

---

## 20. Forms

Contact form should feel editorial.

Fields:

- Name
- Company
- Email
- Project description
- Budget
- Timeline

Large text areas may be preferred over dense form controls.

---

## 21. Project Cards

Project cards are not traditional cards.

They are visual compositions.

Required information:

- Project number
- Project name
- Category
- Optional year
- Image/media

Optional:

- Short result
- Technology
- CTA

---

## 22. Media Component

Media variants:

```text
full-width
contained
split
editorial
portrait
landscape
video
```

Every media component must support:

- Alt text
- Responsive sizing
- Loading state
- Error state where applicable

---

## 23. Section Heading

Suggested structure:

```text
01
SELECTED WORK

A selection of digital products,
experiences and systems.
```

Section headings may include:

- Eyebrow
- Title
- Supporting copy
- Action

---

## 24. Cards

Cards should be used sparingly.

Avoid:

```text
icon
title
paragraph
button
```

repeated five times.

Instead, use:

- Lists
- Editorial rows
- Accordion-like capability sections
- Large typography
- Interactive index systems

---

## 25. Responsive Principles

### Desktop

Expressive interactions.

### Tablet

Reduce density.

### Mobile

Prioritize hierarchy and readability.

Remove:

- Custom cursor
- Magnetic effects
- Heavy parallax
- Non-essential WebGL

---

## 26. Accessibility

Requirements:

- Semantic markup
- Visible focus
- Keyboard navigation
- Appropriate contrast
- Labelled inputs
- Screen-reader support
- Reduced motion
- Touch target sizing

---

## 27. Motion Tokens

```text
micro: 150–250ms
fast: 250–400ms
base: 400–700ms
slow: 700–1200ms
cinematic: 1200–1800ms
```

Preferred easing:

```text
ease-out
custom cubic-bezier
expo-like curves
```

Avoid excessive spring physics for brand motion.

---

## 28. Breakpoints

Use a small, predictable breakpoint system.

Conceptually:

```text
sm
md
lg
xl
2xl
```

Components should respond to content needs rather than relying on arbitrary device categories.

---

## 29. Content Density

The website should alternate between:

```text
Dense
↓
Quiet
↓
Dense
↓
Quiet
```

This creates pacing.

Not every section should look equally busy.

---

## 30. Visual Rhythm

The page should move through:

```text
Statement
    ↓
Space
    ↓
Evidence
    ↓
Explanation
    ↓
Space
    ↓
Action
```

This rhythm is a core part of the premium feel.

---

## 31. Component Naming

Prefer brand-oriented names where they improve clarity:

```text
RekaButton
ProjectPreview
ProjectRail
CaseStudyHero
SectionIntro
StudioCTA
```

Avoid generic names where the component has unique visual behavior.

---

## 32. Design Tokens Definition of Done

The design system is ready when:

- Color tokens are centralized.
- Typography tokens are centralized.
- Spacing is systematic.
- Responsive behavior is defined.
- Button behavior is defined.
- Form behavior is defined.
- Motion tokens exist.
- Accessibility rules exist.
- Components can be reused without losing brand character.

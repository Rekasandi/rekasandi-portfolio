# REKASANDI — Implementation Plan

## 1. Objective

This plan converts the PRD, creative direction, architecture, design system, CMS model, page specification, and motion system into an executable development sequence.

The project should be implemented in small, reviewable phases.

---

# 2. Phase 0 — Project Initialization

### Tasks

- Create Next.js 16.x project
- Configure TypeScript
- Configure Tailwind CSS
- Initialize shadcn/ui
- Configure ESLint
- Configure Prettier
- Configure pnpm
- Configure Git
- Create environment templates

### Output

```text
Running Next.js application
+
Clean development workflow
```

---

# 3. Phase 1 — Payload CMS

### Tasks

- Install Payload
- Configure PostgreSQL
- Configure Payload adapter
- Configure Lexical
- Configure Sharp
- Configure media collection
- Create admin route
- Create Users
- Create Projects
- Create Services
- Create Posts
- Create TeamMembers
- Create Testimonials
- Create globals

### Output

```text
Functional CMS
+
Database
+
Media system
```

---

# 4. Phase 2 — CMS Content Blocks

Implement:

```text
Hero
RichText
Media
FullWidthMedia
ImageGallery
Video
TwoColumn
ThreeColumn
Stats
Quote
ProjectMetadata
LogoGrid
TextBlock
CTA
Spacer
Embed
```

### Requirement

Blocks must work inside projects and be reusable.

---

# 5. Phase 3 — Design Foundation

Implement:

- Color tokens
- Typography
- Container
- Grid
- Spacing
- Buttons
- Links
- Form controls
- Section headings
- Media
- Responsive utilities

### Output

A functioning Rekasandi design system.

---

# 6. Phase 4 — Global Layout

Implement:

- Root layout
- Font loading
- Navbar
- Footer
- Page container
- Global metadata
- Theme tokens
- Error handling
- Not-found page

---

# 7. Phase 5 — Homepage Static Composition

Build homepage without advanced animation first.

Order:

```text
Hero
Introduction
Selected Work
Capabilities
Approach
Technology
About
Insights
Final CTA
Footer
```

### Goal

Get the composition, hierarchy, spacing, and content correct before animation.

---

# 8. Phase 6 — Work Index

Build:

```text
/work
```

Requirements:

- CMS query
- Featured projects
- Project listing
- Category filtering
- Responsive layout
- Empty state

---

# 9. Phase 7 — Case Study Engine

Build:

```text
/work/[slug]
```

Requirements:

- Dynamic metadata
- CMS block rendering
- Related projects
- Previous/next project
- Image gallery
- Results
- Client quote

---

# 10. Phase 8 — Services

Build:

```text
/services
```

Requirements:

- CMS-driven capabilities
- Editorial layout
- Detail sections
- CTA

---

# 11. Phase 9 — About

Build:

```text
/about
```

Requirements:

- Brand story
- Principles
- Team
- Capabilities
- CTA

---

# 12. Phase 10 — Insights

Build:

```text
/insights
/insights/[slug]
```

Requirements:

- CMS query
- Categories
- Article metadata
- Related content
- SEO
- Reading time

---

# 13. Phase 11 — Contact

Build:

```text
/contact
```

Requirements:

- Accessible form
- Validation
- Spam protection
- Success state
- Error state
- Email delivery

---

# 14. Phase 12 — Motion Foundation

Before adding section-specific effects, implement:

```text
motion tokens
easing
reveal utilities
reduced-motion utility
```

Then:

- Hero reveal
- Image reveal
- Button hover
- Link hover

---

# 15. Phase 13 — Advanced Motion

Implement:

### Priority A

- Project hover
- Custom cursor
- Magnetic CTA
- Page transitions

### Priority B

- Scroll reveals
- Capability sequence
- Process sequence

### Priority C

- Advanced project transitions
- Optional WebGL

Do not implement Priority C before performance and accessibility are stable.

---

# 16. Phase 14 — Premium Interaction Pass

This is the visual refinement stage.

Review every section for:

- Timing
- Spacing
- Hover states
- Transition continuity
- Cursor behavior
- Typography movement
- Image crops
- Scroll pacing

The goal is not more animation.

The goal is better animation.

---

# 17. Phase 15 — Content Population

Populate real content.

### Required

- At least 3 strong case studies
- Service content
- Company story
- Team
- Testimonials
- At least 3 insights

Do not launch an Awwwards-level portfolio with placeholder-looking work.

---

# 18. Phase 16 — SEO

Implement:

- Metadata
- Sitemap
- Robots
- Canonicals
- Open Graph
- Twitter cards
- JSON-LD where relevant
- Article structured data
- Organization structured data

---

# 19. Phase 17 — Performance

Measure:

```text
LCP
INP
CLS
TTFB
bundle size
image weight
font weight
```

Optimize:

- Images
- Fonts
- Client components
- Third-party scripts
- Animation
- Video
- Prefetching

---

# 20. Phase 18 — Accessibility

Run audits for:

- Keyboard navigation
- Focus states
- Screen readers
- Contrast
- Reduced motion
- Form labels
- Heading hierarchy
- Semantic HTML

Fix issues before visual polish is considered complete.

---

# 21. Phase 19 — Browser QA

Test:

```text
Chrome
Safari
Firefox
Edge
```

Viewport groups:

```text
Large desktop
Desktop
Tablet
Mobile
Small mobile
```

---

# 22. Phase 20 — Mobile QA

Explicitly review every page on mobile.

Check:

- Typography
- Image cropping
- Touch targets
- Form usability
- Navigation
- Scroll behavior
- Animation
- Page transitions

Mobile is not an afterthought.

---

# 23. Phase 21 — Visual QA

Compare every section against the creative direction.

Questions:

```text
Does this feel like Rekasandi?
Is the hierarchy strong?
Is the page too busy?
Is the motion too much?
Is the composition distinctive?
Does it feel premium without relying on gimmicks?
```

---

# 24. Phase 22 — Production Hardening

Tasks:

- Environment variables
- Security review
- CMS access review
- Rate limiting
- Form protection
- Error monitoring
- Database backup strategy
- Image/media backup strategy
- Deployment validation

---

# 25. Phase 23 — Launch

Launch checklist:

```text
[x] Production build
[x] CMS
[x] Database
[x] Domain
[x] SSL
[x] SEO
[x] Analytics
[x] Forms
[x] Sitemap
[x] Robots
[x] 404
[x] Error handling
[x] Performance
[x] Accessibility
[x] Mobile QA
[x] Desktop QA
```

---

# 26. Phase 24 — Post-Launch

First iteration should measure:

- CTA conversion
- Project views
- Contact submissions
- Scroll behavior
- Performance
- Errors
- Search visibility

Use data to refine rather than adding features blindly.

---

# 27. Suggested Git Workflow

Branches:

```text
main
develop
feature/*
fix/*
```

Commit style:

```text
feat:
fix:
refactor:
perf:
style:
docs:
chore:
```

Every feature should remain independently reviewable.

---

# 28. Definition of Done

A feature is done when:

- It works.
- It is responsive.
- It is accessible.
- It has loading/error states where relevant.
- It does not introduce unnecessary client-side code.
- It matches the design system.
- It matches the motion system.
- It has no critical performance regression.
- It passes typecheck and lint.

---

# 29. Awwwards-Level QA Gate

Before launch, review the entire website against five dimensions.

## Art Direction

Does the website have a recognizable point of view?

## Design

Are typography, spacing, composition, and imagery exceptional?

## Motion

Does animation feel intentional and physically coherent?

## Engineering

Does the experience remain fast and stable?

## Content

Does the website communicate real expertise and credible work?

All five must pass.

---

# 30. Final Rule

Do not add an effect because:

> "It looks cool."

Add it because:

> "It makes the experience better."

The Rekasandi website should feel like a **designed product**, not a collection of impressive frontend techniques.

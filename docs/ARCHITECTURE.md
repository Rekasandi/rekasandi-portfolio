# REKASANDI — Technical Architecture

## 1. Purpose

This document defines the technical architecture for the Rekasandi premium digital studio website.

The architecture is optimized for:

- Next.js 16.x App Router
- Payload CMS
- PostgreSQL
- TypeScript
- shadcn/ui
- Framer Motion
- GSAP
- Lenis
- Vercel deployment
- High performance
- SEO
- Accessibility
- Editorial flexibility
- Awwwards-level interaction without sacrificing maintainability

> **Architecture principle:** Server-first, CMS-driven, progressively enhanced, performance-conscious.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.x |
| Runtime | Node.js 20.9+ |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI primitives | shadcn/ui |
| CMS / Backend | Payload CMS |
| Database | PostgreSQL |
| Rich Text | Payload Lexical |
| Image processing | Sharp |
| Primary animation | Framer Motion |
| Advanced animation | GSAP + ScrollTrigger |
| Smooth scrolling | Lenis |
| Icons | Lucide |
| Deployment | Vercel |
| Analytics | Privacy-conscious analytics |
| Package manager | pnpm |

Payload's current installation requirements include Node.js 20.9+ and Next.js 16.2.6+; Payload can be integrated directly into an existing Next.js application and supports PostgreSQL. See the official documentation: https://payloadcms.com/docs/getting-started/installation

---

## 3. High-Level Architecture

```text
                         ┌───────────────────────┐
                         │        Visitors       │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │        Vercel         │
                         │ CDN / Edge / Hosting  │
                         └───────────┬───────────┘
                                     │
                                     ▼
                    ┌────────────────────────────────┐
                    │          Next.js 16             │
                    │           App Router            │
                    └───────────────┬────────────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
          Server Components   Client Components    Route Handlers
                  │                 │                 │
                  │                 ▼                 │
                  │        Motion / Interaction      │
                  │                                  │
                  └────────────────┬─────────────────┘
                                   │
                                   ▼
                         ┌──────────────────────┐
                         │      Payload CMS     │
                         │  Admin / REST / SDK  │
                         └──────────┬───────────┘
                                    │
                         ┌──────────┴───────────┐
                         │                      │
                         ▼                      ▼
                  ┌────────────┐         ┌──────────────┐
                  │ PostgreSQL │         │ Media Storage │
                  └────────────┘         └──────────────┘
```

---

## 4. Application Structure

Recommended repository structure:

```text
rekasandi/
├── app/
│   ├── (frontend)/
│   │   ├── page.tsx
│   │   ├── work/
│   │   ├── services/
│   │   ├── about/
│   │   ├── insights/
│   │   └── contact/
│   │
│   └── (payload)/
│       ├── admin/
│       └── api/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── media/
│   ├── projects/
│   ├── sections/
│   └── motion/
│
├── blocks/
│   ├── Hero/
│   ├── RichText/
│   ├── Media/
│   ├── Gallery/
│   ├── FullWidthMedia/
│   ├── TwoColumn/
│   ├── ThreeColumn/
│   ├── Stats/
│   ├── Quote/
│   ├── CTA/
│   └── Spacer/
│
├── collections/
│   ├── Users.ts
│   ├── Projects.ts
│   ├── Services.ts
│   ├── Posts.ts
│   ├── TeamMembers.ts
│   └── Testimonials.ts
│
├── globals/
│   └── SiteSettings.ts
│
├── lib/
│   ├── payload/
│   ├── seo/
│   ├── media/
│   └── utils/
│
├── motion/
│   ├── presets.ts
│   ├── easings.ts
│   ├── reveal.ts
│   └── reduced-motion.ts
│
├── public/
├── payload.config.ts
└── next.config.ts
```

---

## 5. Rendering Strategy

### Server Components by Default

All content-heavy components should remain Server Components unless they require browser APIs or interaction.

Use Server Components for:

- Page shells
- CMS queries
- Project lists
- Case-study content
- Article content
- SEO
- Metadata
- Static sections

Use Client Components only for:

- Cursor
- Magnetic interaction
- Motion orchestration
- Menu interaction
- Interactive filters
- Form state
- WebGL
- Browser APIs

### Rule

> Do not add `"use client"` to a parent component when a smaller leaf component can own the interaction.

This keeps the client-side JavaScript boundary small.

---

## 6. Data Fetching

Prefer direct server-side access to Payload where practical.

Conceptual flow:

```text
Next.js Server Component
        ↓
Payload Local API
        ↓
PostgreSQL
```

Avoid unnecessary internal HTTP calls from the server to its own API.

Use REST/GraphQL when an external consumer actually needs the API.

---

## 7. Caching and Revalidation

Use a hybrid content strategy.

### Highly stable content

Examples:

- About
- Services
- Site settings

Use cached/static rendering where appropriate.

### Frequently edited content

Examples:

- Work
- Insights

Use revalidation / cache invalidation after publication.

### Preview

Payload live preview should be used for editorial workflows when appropriate.

---

## 8. On-Demand Revalidation

Publishing CMS content should invalidate affected routes.

Conceptual flow:

```text
Editor publishes Project
        ↓
Payload hook
        ↓
Revalidation event
        ↓
/work
/work/project-slug
Homepage related project section
```

Do not purge the entire site for a single content change.

---

## 9. Media Architecture

Media should be modeled as first-class content.

Requirements:

- Responsive image dimensions
- Focal point
- Alt text
- MIME validation
- Image optimization
- Lazy loading
- Poster images for video
- CDN delivery where appropriate

Use Payload's media capabilities together with Next.js image optimization.

---

## 10. Video Strategy

Avoid storing large production videos directly in the application deployment when external video/CDN delivery is more appropriate.

Preferred flow:

```text
CMS
 ↓
Video reference
 ↓
CDN / video provider
 ↓
Optimized playback
```

The frontend must always have:

- Poster
- Mobile fallback
- Accessible label
- Reduced-motion fallback

---

## 11. Animation Architecture

Animation responsibilities:

| Tool | Responsibility |
|---|---|
| CSS | Simple transitions |
| Framer Motion | Component transitions |
| GSAP | Complex scroll timelines |
| Lenis | Smooth scrolling |
| WebGL | Optional experimental visuals |

Avoid multiple animation systems controlling the same property.

---

## 12. Component Boundaries

Components should be grouped by responsibility.

### Primitives

```text
Button
Link
Container
Stack
Grid
Media
Heading
Text
```

### Brand components

```text
RekaButton
RekaLink
ProjectCard
ProjectPreview
SectionHeading
```

### Interactive components

```text
CustomCursor
MagneticButton
MobileMenu
PageTransition
ScrollSequence
```

---

## 13. shadcn/ui Strategy

shadcn/ui is a foundation, not the final visual system.

Official documentation describes it as open code that becomes part of the project and is intended to be customized: https://ui.shadcn.com/docs

Use it for:

- Button primitives
- Form controls
- Dialog / Sheet
- Tabs
- Accordion
- Tooltip
- Navigation primitives

Do not allow default shadcn styles to dictate Rekasandi's brand.

---

## 14. Payload Integration

Payload should live in the same codebase as the Next.js application.

Conceptual layout:

```text
app/
├── (frontend)/
└── (payload)/
    ├── admin/
    └── api/
```

Use `withPayload` in the Next.js configuration according to Payload's current integration model.

---

## 15. Database

Production database:

**PostgreSQL**

Why:

- Mature relational model
- Strong indexing
- Good fit for structured content
- Excellent support in Payload
- Reliable production ecosystem

Indexes should exist for:

- Slug
- Published status
- Featured status
- Date
- Category
- Project relationships

---

## 16. SEO Architecture

Every page must be able to generate metadata.

Required:

```text
title
description
canonical
openGraph
twitter
robots
```

Dynamic content:

```text
/projects/[slug]
/insights/[slug]
```

must derive metadata from Payload.

---

## 17. URL Architecture

Recommended:

```text
/
 /work
 /work/[slug]
 /services
 /about
 /insights
 /insights/[slug]
 /contact
```

Keep URLs short and descriptive.

---

## 18. Error Handling

Required routes:

```text
not-found
error
loading
```

Errors should be graceful and branded.

Never expose internal stack traces to visitors.

---

## 19. Security

### Secrets

Store securely in environment variables.

Examples:

```text
DATABASE_URI
PAYLOAD_SECRET
S3_ACCESS_KEY
S3_SECRET_KEY
EMAIL_API_KEY
ANALYTICS_KEY
```

Never expose secrets through `NEXT_PUBLIC_*`.

### Public forms

Protect contact forms against:

- Spam
- Abuse
- Oversized submissions
- Invalid input
- Rate abuse

---

## 20. Accessibility Architecture

Accessibility must remain independent of visual effects.

All interactive components need:

- Keyboard support
- Focus state
- Accessible names
- Semantic HTML
- Touch support

Animation features must support:

```text
prefers-reduced-motion
```

---

## 21. Performance Architecture

Performance rules:

1. Server-render content whenever possible.
2. Keep client boundaries narrow.
3. Use responsive images.
4. Lazy-load below-the-fold media.
5. Avoid huge JavaScript bundles.
6. Avoid blocking third-party scripts.
7. Prefer CSS transforms/opacity for animation.
8. Load advanced effects progressively.

---

## 22. Progressive Enhancement

The site must still function without:

- Custom cursor
- Smooth scrolling
- GSAP
- WebGL
- Advanced hover effects

The content and navigation remain fully usable.

---

## 23. Deployment Architecture

```text
Git repository
      ↓
CI checks
      ↓
Vercel Preview
      ↓
QA
      ↓
Production
```

Required environments:

```text
development
preview
production
```

---

## 24. CI Quality Gates

Every pull request should run:

```text
lint
typecheck
unit tests
build
```

Visual QA should include desktop and mobile screenshots for critical pages.

---

## 25. Architectural Principles

### Principle 1

**Content belongs to Payload.**

### Principle 2

**Presentation belongs to React.**

### Principle 3

**Interaction belongs to the smallest possible client boundary.**

### Principle 4

**Motion enhances hierarchy; it does not replace it.**

### Principle 5

**Performance is a design constraint.**

### Principle 6

**The website must remain usable without visual effects.**

### Principle 7

**Avoid architecture that exists only to impress developers.**

---

## 26. Architecture Definition of Done

Architecture is ready when:

- Next.js and Payload run in one project.
- PostgreSQL migrations work.
- CMS content renders correctly.
- Preview works.
- Publishing can invalidate relevant routes.
- Media optimization works.
- Client boundaries are intentional.
- Animation system is centralized.
- SEO metadata is generated.
- Errors are handled.
- Accessibility foundations exist.
- Production build succeeds.

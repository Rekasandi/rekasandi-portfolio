PRODUCT REQUIREMENTS DOCUMENT

**REKASANDI**

**Premium Digital Studio Website**

A brand-led digital experience for a software house building websites,
applications, AI solutions, automation systems, and custom software.

  -----------------------------------------------------------------------
  **Document Version**                1.0
  ----------------------------------- -----------------------------------
  **Status**                          Product Definition / Design
                                      Direction

  **Primary Market**                  Indonesia; international-ready

  **Technology Baseline**             Next.js 16.3.x, TypeScript, Payload
                                      CMS, PostgreSQL, shadcn/ui

  **Deployment**                      Vercel
  -----------------------------------------------------------------------

**Core principle:** The website must be proof of the work Rekasandi
sells. Design leads. Technology enables. Motion reinforces. Content
convinces. Performance completes the experience.

# Contents

> 1\. Executive Summary
>
> 2\. Product Vision & Positioning
>
> 3\. Goals, Non-Goals & Success Metrics
>
> 4\. Audience & User Needs
>
> 5\. Information Architecture
>
> 6\. Homepage Experience Specification
>
> 7\. Creative / Art Direction
>
> 8\. Motion & Interaction Direction
>
> 9\. Design System
>
> 10\. CMS & Content Model
>
> 11\. Technical Architecture
>
> 12\. SEO, Accessibility, Performance & Security
>
> 13\. Analytics & Lead Generation
>
> 14\. MVP / Phasing
>
> 15\. Acceptance Criteria
>
> 16\. Risks & Mitigations
>
> 17\. Implementation Notes
>
> 18\. Sources

# 1. Executive Summary

Rekasandi is a software house evolving its public presence into a
premium digital studio. The website should act as both a high-converting
business platform and a living demonstration of Rekasandi's capabilities
in strategy, design, engineering, AI, and digital product development.

The product is intentionally designed to avoid the visual language of a
generic IT vendor. Instead, it should feel editorial, confident,
minimal, technically sophisticated, and highly crafted - comparable in
ambition to top-tier digital studios showcased on Awwwards.

  -----------------------------------------------------------------------
  **Dimension**                       **Decision**
  ----------------------------------- -----------------------------------
  Positioning                         Premium digital product studio
                                      rather than commodity software
                                      vendor.

  Primary conversion                  Qualified project inquiry / "Start
                                      a Project".

  Primary content                     Selected work and deep case
                                      studies.

  CMS                                 Payload CMS integrated with the
                                      Next.js application.

  Frontend                            Next.js 16.3.x + React +
                                      TypeScript.

  UI foundation                       shadcn/ui used as a customizable
                                      component foundation, not as the
                                      visual identity.

  Motion                              Framer Motion for component
                                      interaction; GSAP for complex
                                      timelines; Lenis for smooth
                                      scrolling.

  Database                            PostgreSQL.

  Hosting                             Vercel.
  -----------------------------------------------------------------------

# 2. Product Vision & Positioning

## 2.1 Vision

Create a digital experience that makes visitors immediately understand
what Rekasandi does, see evidence of quality, trust the team, and feel
compelled to start a conversation about a meaningful digital project.

## 2.2 Positioning Statement

Recommended working statement: "We design and build digital products
that move businesses forward."

Alternative creative directions: "Digital products, engineered for
what's next." / "We turn complex ideas into meaningful digital
experiences." The final tagline should be selected during visual
identity exploration.

## 2.3 Brand Attributes

-   Premium

-   Modern

-   Technical

-   Creative

-   Strategic

-   Reliable

-   Detail-oriented

-   Experimental

-   Professional

## 2.4 Desired Perception

A visitor should leave thinking: "Rekasandi knows what they are doing."
The website should not leave the impression of being "another software
house."

# 3. Goals, Non-Goals & Success Metrics

## 3.1 Goals

-   Establish premium positioning and a recognizable visual identity.

-   Generate qualified project inquiries.

-   Showcase high-quality work through strong case studies.

-   Communicate capabilities across web, mobile, custom software, AI,
    automation, and product design.

-   Build trust through process, expertise, proof, and outcomes.

-   Create a memorable interaction system that demonstrates Rekasandi's
    craft.

## 3.2 Non-Goals

-   Client portal

-   Project management system

-   Full CRM

-   E-commerce platform

-   Online quotation calculator

-   Developer documentation platform

## 3.3 Success Metrics

  -----------------------------------------------------------------------
  **Metric Group**                    **Primary Measures**
  ----------------------------------- -----------------------------------
  Business                            Qualified inquiries, inquiry
                                      conversion rate, CTA conversion
                                      rate

  Portfolio                           Case study views, completion rate,
                                      project interaction rate

  Content                             Organic sessions, article
                                      engagement, returning visitors

  Experience                          Core Web Vitals, accessibility
                                      issues, page responsiveness
  -----------------------------------------------------------------------

# 4. Audience & User Needs

  -----------------------------------------------------------------------
  **Audience**            **Need**                **Desired Response**
  ----------------------- ----------------------- -----------------------
  Business owners         Need a trusted team to  Understand value
                          solve digital problems. quickly and initiate
                                                  contact.

  Startup founders        Need product strategy,  See relevant work and
                          MVP design, and         believe Rekasandi can
                          engineering.            ship.

  Enterprise teams        Need custom systems,    Trust the technical
                          digital transformation, depth and process.
                          or AI.                  

  Marketing / creative    Need a technical        Use Rekasandi as an
  teams                   partner for ambitious   implementation partner.
                          experiences.            
  -----------------------------------------------------------------------

# 5. Information Architecture

  -----------------------------------------------------------------------
  **Route**               **Purpose**             **CMS Driven**
  ----------------------- ----------------------- -----------------------
  /                       Brand + conversion +    Partially
                          featured work           

  /work                   Portfolio index         Yes

  /work/\[slug\]          Case study              Yes

  /services               Capabilities            Yes

  /about                  Company, philosophy,    Yes
                          team                    

  /insights               Articles / authority    Yes
                          content                 

  /insights/\[slug\]      Article detail          Yes

  /contact                Project inquiry         Partially
  -----------------------------------------------------------------------

Primary navigation should remain minimal: Work / Services / Approach /
About / Insights / Contact.

# 6. Homepage Experience Specification

The homepage is the highest-priority surface and should be treated as a
curated sequence rather than a collection of conventional website
sections.

  -----------------------------------------------------------------------
  **Section**                         **Experience Requirement**
  ----------------------------------- -----------------------------------
  01 --- Hero                         Establish the studio promise
                                      immediately. Oversized typography,
                                      restrained navigation, high
                                      contrast, and a clear project CTA.
                                      Example: "We build digital products
                                      for ambitious businesses."

  02 --- Introduction                 A concise statement of what
                                      Rekasandi does and what makes its
                                      approach different. Use editorial
                                      typography and a strong visual
                                      rhythm.

  03 --- Selected Work                Feature 3-6 best projects. Use
                                      large-format media, strong project
                                      titles, category/context labels,
                                      and subtle scroll/hover
                                      choreography.

  04 --- Capabilities                 Present capabilities as a spectrum:
                                      Strategy, Design, Web, Software,
                                      Mobile, AI, Automation. Avoid a
                                      generic services-card grid.

  05 --- Approach                     Discover → Define → Design → Build
                                      → Launch → Evolve. Show that
                                      Rekasandi is a partner across the
                                      product lifecycle.

  06 --- Technology / Expertise       A restrained proof section showing
                                      relevant technical depth without
                                      turning the page into a list of
                                      logos.

  07 --- About                        Humanize the company: team,
                                      principles, craft, and ambition.

  08 --- Insights                     A small editorial layer for
                                      authority and SEO.

  09 --- Final CTA                    A memorable ending such as "Have a
                                      project in mind?" / "Let's build
                                      something meaningful."

  10 --- Footer                       Contact, socials, location, legal,
                                      and concise studio statement.
  -----------------------------------------------------------------------

# 7. Creative / Art Direction

## 7.1 Creative North Star

"Quiet confidence with visible craft." The website should feel expensive
because of composition, typography, timing, imagery, and restraint - not
because of excessive visual effects.

## 7.2 Visual Language

-   Editorial layouts

-   Oversized display typography

-   Strong asymmetry used intentionally

-   Generous whitespace

-   High-quality project imagery

-   Crisp grid alignment

-   Single accent color or restrained accent system

-   Minimal UI chrome

-   Subtle material / texture only when it strengthens the concept

## 7.3 Avoid

-   Generic purple/blue AI gradients

-   Excessive glassmorphism

-   Random floating 3D objects

-   Animation on every component

-   Stock-photo-heavy layouts

-   Overloaded dashboards

-   Tech-logo wallpaper

-   Gimmicky loading screens

## 7.4 Imagery Direction

Prioritize real project output, product screenshots, art-directed
photography, abstract architectural/industrial imagery, and carefully
composed motion. Asset selection should reinforce the story of each
project.

# 8. Motion & Interaction Direction

## 8.1 Motion Principles

-   Purpose: animation must explain hierarchy, interaction, or
    transition.

-   Restraint: not every element should move.

-   Consistency: easing, duration, and choreography should feel like one
    system.

-   Performance: motion must not block rendering or interaction.

-   Accessibility: respect prefers-reduced-motion.

## 8.2 Interaction Toolkit

  -----------------------------------------------------------------------
  **Interaction**         **Preferred Tool**      **Use Cases**
  ----------------------- ----------------------- -----------------------
  Micro-interaction       Framer Motion           Buttons, reveals,
                                                  hover, component state

  Scroll choreography     GSAP                    Pinned sections, image
                                                  scaling, complex
                                                  timelines

  Smooth scroll           Lenis                   Overall scroll feel

  Custom cursor           CSS/React + motion      Desktop project hover
                                                  states

  Magnetic buttons        Framer Motion / GSAP    Primary CTA only

  Page transition         Framer Motion / Next.js Route-to-route
                                                  continuity
  -----------------------------------------------------------------------

## 8.3 Interaction Rules

-   Custom cursor is desktop-only and must never obscure content.

-   Magnetic behavior should be subtle and disabled on touch devices.

-   Complex scroll effects should have simplified mobile equivalents.

-   Transitions should preserve orientation: users should always
    understand where they are going.

# 9. Design System

## 9.1 Typography

Typography should carry a large share of the brand. Candidate families
for exploration: Geist, Inter Tight, Instrument Sans, Neue Montreal,
General Sans, Suisse Intl. Final selection should be based on brand fit,
licensing, performance, and rendering quality.

## 9.2 Color

Base direction: near-black + off-white + a single distinctive brand
accent + neutral gray scale. Avoid default "AI startup" gradients unless
a future art direction establishes a compelling reason.

## 9.3 Grid

  -----------------------------------------------------------------------
  **Breakpoint**                      **Grid Direction**
  ----------------------------------- -----------------------------------
  Desktop                             12 columns

  Tablet                              8 columns

  Mobile                              4 columns
  -----------------------------------------------------------------------

## 9.4 Component Philosophy

Use shadcn/ui as a source-code-level foundation for primitives such as
Button, Dialog, Form, Input, and navigation patterns. The visual layer
must be extensively customized so the end result is unmistakably
Rekasandi.

# 10. CMS & Content Model

Payload CMS is the source of truth for business content. Normal
editorial updates must not require developer intervention.

  -----------------------------------------------------------------------
  **Collection / Global**             **Core Fields**
  ----------------------------------- -----------------------------------
  Projects                            Title, slug, client, industry,
                                      year, services, technologies,
                                      summary, hero media, gallery,
                                      flexible case study blocks,
                                      results, featured flag, SEO

  Services                            Title, slug, short description,
                                      icon, body, featured flag, SEO

  Posts                               Title, slug, excerpt, author,
                                      category, cover image, rich
                                      content, published date, featured
                                      flag, SEO

  Team                                Name, role, biography, photo,
                                      social links, order

  Testimonials                        Client, person, role, quote,
                                      avatar, project relation, featured

  Users                               CMS administrators, role-based
                                      access

  Site Settings                       Brand details, navigation, footer,
                                      contacts, social links, default
                                      SEO, analytics
  -----------------------------------------------------------------------

## 10.1 Flexible Case Study Blocks

-   Hero

-   Rich Text

-   Image

-   Image Gallery

-   Video

-   Full-Width Media

-   Two Column

-   Three Column

-   Quote

-   Stats

-   Project Information

-   Logo Grid

-   CTA

-   Spacer

-   Embed

The case study editor should allow the team to build distinctive project
narratives without requiring a new frontend template for every project.

# 11. Technical Architecture

  -----------------------------------------------------------------------
  **Layer**                           **Decision**
  ----------------------------------- -----------------------------------
  Framework                           Next.js 16.3.x, App Router

  Language                            TypeScript

  UI primitives                       shadcn/ui

  Styling                             Tailwind CSS

  CMS                                 Payload CMS

  Database                            PostgreSQL

  Animation                           Framer Motion + GSAP

  Scroll                              Lenis

  Icons                               Lucide

  Deployment                          Vercel
  -----------------------------------------------------------------------

Payload should be integrated into the Next.js application rather than
treated as an unrelated external CMS. This keeps the content model,
admin surface, media handling, API, and frontend within one coherent
application boundary.

## 11.1 Recommended Repository Structure

rekasandi/\
├── src/\
│ ├── app/\
│ │ ├── (frontend)/\
│ │ │ ├── page.tsx\
│ │ │ ├── work/\
│ │ │ ├── services/\
│ │ │ ├── about/\
│ │ │ ├── insights/\
│ │ │ └── contact/\
│ │ └── (payload)/\
│ ├── components/\
│ │ ├── ui/\
│ │ ├── navigation/\
│ │ ├── cursor/\
│ │ ├── motion/\
│ │ ├── media/\
│ │ └── layout/\
│ ├── collections/\
│ ├── globals/\
│ ├── blocks/\
│ ├── lib/\
│ │ ├── animations/\
│ │ ├── seo/\
│ │ └── utils/\
│ └── payload.config.ts\
├── public/\
├── next.config.ts\
├── tsconfig.json\
└── package.json

# 12. SEO, Accessibility, Performance & Security

## 12.1 SEO

-   Dynamic page titles and meta descriptions

-   Open Graph images

-   Canonical URLs

-   Sitemap

-   Robots configuration

-   Structured metadata where appropriate

-   SEO fields managed in Payload for projects and articles

## 12.2 Accessibility

-   Semantic HTML and correct heading hierarchy

-   Keyboard navigation

-   Visible focus states

-   Accessible forms

-   Alt text for editorial images

-   Sufficient color contrast

-   Reduced-motion support

## 12.3 Performance

-   Optimize and lazy-load imagery

-   Keep client-side JavaScript intentionally small

-   Prefer server rendering where possible

-   Avoid unnecessary third-party scripts

-   Defer non-critical media

-   Measure Core Web Vitals continuously

## 12.4 Security

-   Secure CMS authentication and role-based access

-   Secrets stored in environment variables

-   Rate-limit public form endpoints

-   Validate public inputs

-   Secure media uploads

-   Database backup strategy

# 13. Analytics & Lead Generation

## 13.1 Tracked Actions

-   Primary CTA click

-   Contact form start

-   Contact form submission

-   Email click

-   WhatsApp click

-   Project view

-   Case study completion

-   Scroll depth

## 13.2 Lead Form

  -----------------------------------------------------------------------
  **Field**                           **Required**
  ----------------------------------- -----------------------------------
  Name                                Yes

  Company                             Yes

  Email                               Yes

  Project / Problem                   Yes

  Estimated Budget                    Optional / configurable

  Timeline                            Optional / configurable
  -----------------------------------------------------------------------

## 13.3 CTA Language

Primary: "Start a Project" / "Let's Build" Secondary: "View Our Work" /
"Explore Services"

# 14. MVP / Phasing

  -----------------------------------------------------------------------
  **Phase**                           **Scope**
  ----------------------------------- -----------------------------------
  Phase 1 --- Foundation              Next.js setup, Payload integration,
                                      PostgreSQL, shadcn/ui, design
                                      tokens, routing, CMS auth

  Phase 2 --- Core Website            Homepage, Work, Case Study,
                                      Services, About, Insights, Contact,
                                      global navigation/footer

  Phase 3 --- Motion                  Scroll choreography, page
                                      transitions, project hover, cursor,
                                      CTA interactions, smooth scrolling

  Phase 4 --- Content                 Load real projects, services, team,
                                      testimonials, insights, SEO

  Phase 5 --- Launch Hardening        Performance, accessibility,
                                      analytics, security, metadata, QA,
                                      production deployment
  -----------------------------------------------------------------------

## 14.1 Future Enhancements

-   Client portal

-   Project inquiry CRM

-   Multi-language support

-   Careers

-   Newsletter

-   AI project estimator

-   Interactive technical playground

-   WebGL / Three.js experiences

# 15. Acceptance Criteria

-   Primary pages are complete and responsive across desktop, tablet,
    and mobile.

-   Payload CMS allows editors to create and publish projects and
    articles without code changes.

-   Case study pages support flexible content blocks and media.

-   Primary lead CTA and contact form work reliably.

-   SEO metadata and sitemap are implemented.

-   Accessibility issues are addressed to a professional baseline and
    reduced-motion behavior is supported.

-   Animations do not block usability or materially degrade performance.

-   No critical security issues remain before launch.

-   Production deployment is stable and rollback-ready.

-   The final visual result clearly communicates premium digital-studio
    positioning.

# 16. Risks & Mitigations

  -----------------------------------------------------------------------
  **Risk**                            **Mitigation**
  ----------------------------------- -----------------------------------
  Over-design / too many effects      Use a motion budget and require
                                      purpose for every animation.

  Performance degradation             Optimize assets early; separate
                                      essential motion from experimental
                                      effects.

  CMS becomes rigid                   Use reusable content blocks and
                                      structured relations.

  Website feels generic               Invest early in typography, grid,
                                      art direction, and real project
                                      content.

  Complex interactions hurt           Provide reduced-motion and mobile
  accessibility                       fallbacks.

  Content quality is weak             Treat case-study storytelling and
                                      asset production as first-class
                                      deliverables.
  -----------------------------------------------------------------------

# 17. Implementation Notes

-   Start with the design system and homepage motion language before
    building all secondary pages.

-   Build one flagship case study end-to-end before scaling the
    portfolio template.

-   Treat project media as product assets: art-directed, compressed, and
    responsive.

-   Do not introduce Three.js until a concrete visual concept requires
    it.

-   Keep shadcn/ui primitives visually subordinate to the Rekasandi
    design system.

-   Use server-first rendering wherever interaction does not require
    client-side state.

-   Define animation timing tokens so motion remains consistent across
    the site.

# 18. Sources

Current technical verification used for this document:

-   Next.js official blog: the current Next.js 16 line includes the 16.3
    release; the August 25, 2026 security release identified 16.3.3 as
    Active LTS at that time. https://nextjs.org/blog

-   Payload CMS installation documentation: Payload supports Next.js
    16.2.6+ and PostgreSQL/MongoDB/SQLite, and documents direct
    integration inside a Next.js app.
    https://payloadcms.com/docs/getting-started/installation

-   shadcn/ui Next.js installation documentation: the official tooling
    supports Next.js and adds component source directly to the project
    for customization. https://ui.shadcn.com/docs/installation/next

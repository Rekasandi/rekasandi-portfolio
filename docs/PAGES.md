# REKASANDI — Page & Experience Specification

## 1. Page Philosophy

Every page should have a clear job.

```text
Homepage → Position
Work → Prove
Case Study → Demonstrate
Services → Explain
About → Humanize
Insights → Establish authority
Contact → Convert
```

---

# 2. Homepage

Route:

```text
/
```

Primary objective:

Create immediate premium positioning and generate qualified interest.

---

## 2.1 Navbar

Content:

```text
REKASANDI
WORK
SERVICES
ABOUT
INSIGHTS
START A PROJECT ↗
```

Behavior:

- Overlay hero initially
- Compact on scroll
- Mobile menu
- Keyboard accessible

---

## 2.2 Hero

Purpose:

Immediately answer:

> What does Rekasandi do?

Suggested copy:

```text
WE BUILD
DIGITAL PRODUCTS
FOR AMBITIOUS
BUSINESSES.
```

Supporting:

```text
Strategy, design, engineering,
and intelligent technology.
```

CTA:

```text
START A PROJECT →
```

Visual:

- Oversized typography
- Strong whitespace
- Subtle motion
- Optional ambient media

---

## 2.3 Introduction

Purpose:

Explain the studio philosophy.

Example:

```text
WE TURN COMPLEX IDEAS
INTO DIGITAL PRODUCTS.
```

Supporting:

```text
From business systems to customer-facing
experiences, we combine strategy, design,
engineering and emerging technology.
```

Interaction:

- Text reveal
- Line-by-line emphasis
- Minimal parallax

---

## 2.4 Selected Work

Purpose:

Proof.

Content:

- 3–5 featured projects

Layout:

- Editorial
- Asymmetric
- Variable image sizes
- Project numbering

Interaction:

- Image scaling
- Cursor state
- Text movement
- Optional hover metadata

CTA:

```text
VIEW ALL WORK →
```

---

## 2.5 Capabilities

Purpose:

Communicate service breadth.

Suggested list:

```text
01 DIGITAL PRODUCTS
02 WEB EXPERIENCES
03 CUSTOM SOFTWARE
04 AI & AUTOMATION
05 MOBILE APPLICATIONS
```

Interaction:

- Active item reveals description
- Visual area may change
- Keyboard navigation
- Touch-compatible mobile version

---

## 2.6 Approach

Purpose:

Demonstrate strategic maturity.

Steps:

```text
DISCOVER
DEFINE
DESIGN
BUILD
LAUNCH
EVOLVE
```

Desktop:

- Sticky narrative
- Scroll progression
- GSAP candidate

Mobile:

- Vertical timeline
- Reduced motion

---

## 2.7 Technology

Purpose:

Technical credibility.

Presentation:

```text
Next.js
React
TypeScript
Payload
PostgreSQL
AI
Cloud
```

Avoid a logo wall.

Use:

- Typography
- Grouping
- Subtle movement
- Technical metadata

---

## 2.8 About Preview

Purpose:

Humanize the company.

Content:

- Studio statement
- Team preview
- Principles

CTA:

```text
ABOUT REKASANDI →
```

---

## 2.9 Insights Preview

Purpose:

Authority + SEO.

Display:

3 latest articles.

Each:

```text
Title
Category
Date
Reading time
```

---

## 2.10 Final CTA

Purpose:

Conversion.

Suggested:

```text
HAVE AN IDEA?

LET'S BUILD
SOMETHING
MEANINGFUL.
```

CTA:

```text
START A PROJECT ↗
```

---

## 2.11 Footer

Content:

- Company
- Contact
- Location
- Social links
- Copyright
- Legal

---

# 3. Work Index

Route:

```text
/work
```

Objective:

Demonstrate quality and breadth.

Hero:

```text
SELECTED WORK

Products, experiences
and systems we've built.
```

Filters:

```text
All
Web
Product
Software
AI
Mobile
```

Filter interaction must remain accessible.

---

# 4. Case Study

Route:

```text
/work/[slug]
```

Objective:

Turn portfolio interest into confidence.

Structure:

```text
Hero
Project Metadata
Challenge
Approach
Design
Build
Results
Gallery
Technology
Client Quote
Next Project
```

---

## 4.1 Case Study Hero

Content:

```text
PROJECT NAME
Client / Year / Industry
```

Large media.

Transition:

```text
Work card image
→ expands
→ becomes hero
```

---

## 4.2 Project Metadata

Show:

```text
Client
Industry
Services
Technology
Year
```

Do not overwhelm the visitor.

---

## 4.3 Challenge

Answer:

> Why did this project exist?

Keep concise.

---

## 4.4 Approach

Explain the thinking.

Use:

- Large typography
- Diagrams
- Images
- Short paragraphs

---

## 4.5 Results

Only show verified metrics.

Examples:

```text
+42% conversion
-31% task completion time
```

Never invent values for presentation purposes.

---

## 4.6 Next Project

End with:

```text
NEXT PROJECT →
```

Use the next project's media as visual transition.

---

# 5. Services

Route:

```text
/services
```

Objective:

Explain capabilities without sounding like a service catalog.

Structure:

```text
Hero
Capability index
Capability detail
Technology
Approach
CTA
```

Each capability should have:

- Problem
- What Rekasandi does
- Deliverables
- Example work
- CTA

---

# 6. About

Route:

```text
/about
```

Objective:

Build trust.

Structure:

```text
Studio statement
Philosophy
Principles
Team
Capabilities
Location
CTA
```

Suggested philosophy:

```text
WE CARE ABOUT WHAT
WE BUILD — AND HOW
WE BUILD IT.
```

---

# 7. Insights Index

Route:

```text
/insights
```

Objective:

Build authority.

Hero:

```text
INSIGHTS
Ideas on technology,
design and digital products.
```

Content:

- Featured article
- Article listing
- Categories

---

# 8. Insight Detail

Route:

```text
/insights/[slug]
```

Structure:

```text
Title
Metadata
Cover
Article
Related articles
CTA
```

Requirements:

- Semantic article markup
- Table of contents where useful
- Reading time
- Social metadata
- Structured data where appropriate

---

# 9. Contact

Route:

```text
/contact
```

Objective:

Convert serious prospects.

Opening:

```text
HAVE A PROJECT IN MIND?
```

Fields:

```text
Name
Company
Email
Project
Budget
Timeline
```

Budget choices:

```text
< $5k
$5k–$15k
$15k–$50k
$50k+
Not sure yet
```

Budget ranges should be adjusted to Rekasandi's actual commercial model before launch.

---

# 10. 404

Route:

```text
not-found
```

Design concept:

```text
404

THIS PAGE WENT
SOMEWHERE ELSE.

BACK TO REKASANDI →
```

Keep simple.

---

# 11. Page Transition Map

```text
Homepage
 ↓
Work
 ↓
Case Study
 ↓
Next Case Study
```

Where possible, preserve visual context between pages.

---

# 12. Responsive Page Rules

Desktop:

- Maximum visual expression
- Cursor
- Magnetic interactions
- Complex scroll sections

Mobile:

- Simplified motion
- Vertical storytelling
- Larger touch areas
- No custom cursor
- No heavy WebGL

---

# 13. Page Definition of Done

A page is complete when:

- Content hierarchy is clear.
- CMS data renders correctly.
- Responsive behavior is intentional.
- Keyboard navigation works.
- Reduced motion works.
- SEO metadata exists.
- Loading/error states exist.
- Performance is acceptable.
- Visual QA passes at major breakpoints.

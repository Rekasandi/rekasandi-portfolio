# REKASANDI — Payload CMS Content Model

## 1. CMS Objective

Payload CMS is the content engine for the Rekasandi website.

Editors must be able to manage content without changing application code.

The CMS should support:

- Work
- Case studies
- Services
- Insights
- Team
- Testimonials
- Site settings
- SEO
- Media
- Flexible content blocks

---

## 2. Collections

```text
Users
Projects
Services
Posts
TeamMembers
Testimonials
Media
```

Globals:

```text
SiteSettings
Navigation
Footer
```

---

# 3. Users

Purpose:

Manage CMS access.

Fields:

```text
name
email
role
```

Roles:

```text
admin
editor
author
```

Access should follow least privilege.

---

# 4. Projects

Purpose:

Portfolio and case studies.

Schema:

```text
Projects
├── title
├── slug
├── client
├── year
├── industry
├── projectType
├── shortDescription
├── description
├── featured
├── status
├── services[]
├── technologies[]
├── heroMedia
├── thumbnail
├── gallery[]
├── caseStudyBlocks[]
├── results[]
├── testimonial
├── relatedProjects[]
└── seo
```

### Status

```text
draft
published
archived
```

---

## 5. Project Metadata

### Industry

Examples:

```text
Technology
Finance
Healthcare
Logistics
Retail
Education
Hospitality
Other
```

### Project Type

Examples:

```text
Website
Web Application
Mobile Application
Custom Software
AI Product
Automation
Digital Experience
```

---

# 6. Services

Schema:

```text
Services
├── title
├── slug
├── shortDescription
├── description
├── capabilities[]
├── featured
├── icon
├── order
└── seo
```

Example services:

```text
Digital Products
Web Experiences
Custom Software
AI & Automation
Mobile Applications
```

---

# 7. Posts

Purpose:

Insights / editorial content.

Schema:

```text
Posts
├── title
├── slug
├── excerpt
├── author
├── category
├── tags[]
├── coverImage
├── content
├── publishedAt
├── featured
├── readingTime
└── seo
```

Categories:

```text
Engineering
AI
Design
Product
Business
Company
```

---

# 8. Team Members

Schema:

```text
TeamMembers
├── name
├── role
├── bio
├── photo
├── location
├── socialLinks
└── order
```

The team collection should support future growth without redesigning the About page.

---

# 9. Testimonials

Schema:

```text
Testimonials
├── quote
├── person
├── position
├── company
├── avatar
├── project
└── featured
```

---

# 10. Media

Media should be centralized.

Fields:

```text
file
alt
caption
credit
focalPoint
```

Media types:

```text
image
video
document
```

Images should support dimensions and optimized variants.

---

# 11. Site Settings

Global:

```text
SiteSettings
├── companyName
├── tagline
├── description
├── logo
├── contactEmail
├── phone
├── address
├── socialLinks
├── defaultOgImage
├── defaultSeo
└── analytics
```

---

# 12. Navigation

Global:

```text
Navigation
├── items[]
└── primaryCta
```

Each item:

```text
label
type
url
newTab
order
```

Use an allowlist for internal routes where practical.

---

# 13. Footer

Global:

```text
Footer
├── statement
├── navigationGroups[]
├── socialLinks
├── contact
└── legalLinks[]
```

---

# 14. SEO Group

Reusable SEO field group:

```text
seo
├── metaTitle
├── metaDescription
├── ogImage
├── noIndex
└── canonicalUrl
```

Fallback hierarchy:

```text
Content SEO
    ↓
Site default SEO
    ↓
Safe application fallback
```

---

# 15. Case Study Blocks

Projects should use flexible blocks.

Supported blocks:

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

---

# 16. Hero Block

Fields:

```text
eyebrow
title
description
media
theme
alignment
```

Variants:

```text
default
fullscreen
editorial
minimal
```

---

# 17. Media Block

Fields:

```text
media
caption
layout
aspectRatio
crop
```

Layouts:

```text
full
contained
split
editorial
```

---

# 18. Stats Block

Schema:

```text
items[]
├── value
├── label
└── description
```

Example:

```text
+42%
Conversion

-31%
Task completion time
```

Do not fabricate project results. CMS editors should only enter verified results.

---

# 19. Quote Block

Fields:

```text
quote
author
role
company
avatar
```

---

# 20. CTA Block

Fields:

```text
eyebrow
title
description
label
url
style
```

Variants:

```text
light
dark
accent
minimal
```

---

# 21. Relationships

Recommended:

```text
Projects → Services
Projects → Technologies
Projects → Testimonials
Projects → Projects
Posts → TeamMembers
Testimonials → Projects
```

Use relationships where editorial reuse is useful.

---

# 22. Slugs

Slugs must be:

- Lowercase
- URL-safe
- Unique
- Stable

Once published, changing a slug should trigger redirect handling.

---

# 23. Publishing Workflow

```text
Draft
  ↓
Preview
  ↓
Review
  ↓
Publish
  ↓
Revalidate
```

Editors should be able to preview content before publication.

---

# 24. Draft Strategy

Drafts must not accidentally appear in public pages.

Production queries should explicitly respect publication state.

---

# 25. Validation

Examples:

### Project

```text
title: required
slug: required + unique
heroMedia: required
shortDescription: required
```

### Post

```text
title: required
slug: required + unique
content: required
publishedAt: required when published
```

### Media

```text
alt: required for meaningful images
```

---

# 26. Access Control

### Admin

Full access.

### Editor

Create/edit/publish content.

### Author

Create/edit own posts.

Access should be enforced in Payload rather than only in the UI.

---

# 27. Revalidation Hooks

Content changes should trigger only relevant frontend invalidation.

Examples:

```text
Project published
→ /work
→ /work/[slug]
→ related homepage sections

Post published
→ /insights
→ /insights/[slug]
```

---

# 28. Payload Architecture Rules

1. Collections define content.
2. Blocks define composition.
3. Globals define site-wide configuration.
4. Media is reusable.
5. Access control is explicit.
6. Content validation is enforced in the CMS.
7. Frontend presentation never becomes a CMS field unless editors genuinely need control.

---

# 29. Content Model Definition of Done

The CMS is ready when:

- Editors can create projects.
- Editors can build case studies with blocks.
- Editors can manage insights.
- Editors can manage services.
- Editors can manage team members.
- Editors can manage testimonials.
- SEO can be edited.
- Media can be reused.
- Draft preview works.
- Publish triggers revalidation.
- Access controls are tested.

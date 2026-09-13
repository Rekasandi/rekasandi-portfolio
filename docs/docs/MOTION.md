# REKASANDI — Motion & Interaction System

## 1. Motion Philosophy

Motion should make the website feel crafted, not animated.

The goal is:

> **Movement with intention.**

Every animation should answer at least one question:

- Does it establish hierarchy?
- Does it explain a relationship?
- Does it provide feedback?
- Does it create continuity?
- Does it make navigation more understandable?

If the answer is no, remove it.

---

# 2. Motion Hierarchy

## Tier 1 — Core

Must be polished:

- Navigation
- Buttons
- Page transitions
- Project interactions
- Hero reveal

## Tier 2 — Enhancement

Optional but recommended:

- Text reveals
- Image scaling
- Parallax
- Sticky sequences
- Editorial transitions

## Tier 3 — Experimental

Use selectively:

- WebGL
- Generative graphics
- 3D
- Distortion
- Shader effects

---

# 3. Technology Responsibilities

| Technology | Use |
|---|---|
| CSS | Basic states |
| Framer Motion | Component-level motion |
| GSAP | Complex timelines |
| ScrollTrigger | Scroll-linked sequences |
| Lenis | Smooth scroll |
| React Three Fiber | Optional WebGL |

No library should duplicate another library's primary responsibility.

---

# 4. Motion Tokens

```text
micro: 150–250ms
fast: 250–400ms
base: 400–700ms
slow: 700–1200ms
cinematic: 1200–1800ms
```

---

# 5. Easing

Preferred:

```text
ease-out
custom cubic-bezier
expo-like
```

Example conceptual easing:

```text
cubic-bezier(0.16, 1, 0.3, 1)
```

Avoid constant linear movement except for intentional looping indicators.

---

# 6. Hero Entrance

Sequence:

```text
0ms
Navigation

150ms
Headline line 1

250ms
Headline line 2

350ms
Supporting copy

500ms
CTA

700ms+
Ambient detail
```

The exact timing should be tuned visually.

---

# 7. Text Reveal

Preferred technique:

```text
Text
 ↓
mask / clipping
 ↓
translateY
 ↓
settle
```

Do not animate every character by default.

Recommended hierarchy:

```text
line
→ word
→ character only when visually justified
```

---

# 8. Image Reveal

Recommended:

```text
Container
overflow: hidden

Image
scale: 1.08
opacity: optional

→ scale toward 1.0
```

Avoid excessive zoom.

---

# 9. Project Hover

Default:

```text
image scale: 1
```

Hover:

```text
image scale: 1.03–1.06
```

Typography:

```text
metadata shift: subtle
arrow: translateX
```

The overall movement should remain compact.

---

# 10. Cursor System

Desktop only.

### Default

Small dot / minimal indicator.

### Link

Small directional indicator.

### Project

```text
VIEW
↗
```

### Drag

```text
DRAG
← →
```

Cursor interaction must never replace normal clickable affordances.

---

# 11. Magnetic Buttons

Apply only to major CTA elements.

Max displacement:

```text
10–20px
```

The magnetic effect should be subtle.

Button text may move independently by a smaller amount.

---

# 12. Navigation Animation

Mobile menu:

```text
Open
↓
overlay
↓
navigation items stagger in
```

Close:

```text
items reverse
↓
overlay disappears
```

Desktop nav should remain fast and unobtrusive.

---

# 13. Page Transitions

Preferred concept:

```text
Current page
      ↓
visual context expands
      ↓
transition layer
      ↓
destination content reveals
```

Do not delay content unnecessarily.

Navigation should remain recoverable.

---

# 14. Case Study Transition

Project card media can be promoted into the case-study hero.

Concept:

```text
Project thumbnail
      ↓
position interpolation
      ↓
hero media
```

This creates continuity.

Implementation may use shared-layout or view-transition techniques where stable and reliable.

---

# 15. Scroll-Triggered Reveals

Use for:

- Section headings
- Images
- Supporting copy
- Statistics

Avoid triggering everything simultaneously.

Example:

```text
Section enters
↓
heading
↓
supporting copy
↓
media
```

Stagger should follow information hierarchy.

---

# 16. Sticky Capability Section

Recommended structure:

```text
┌──────────────────────────────────┐
│ CAPABILITIES │ active content   │
│              │                  │
│ 01 Product   │ description      │
│ 02 Web       │ visual           │
│ 03 Software  │                  │
│ 04 AI        │                  │
└──────────────────────────────────┘
```

Candidate implementation:

```text
GSAP + ScrollTrigger
```

Desktop only for the complex version.

---

# 17. Process Scroll Sequence

Steps:

```text
DISCOVER
DEFINE
DESIGN
BUILD
LAUNCH
EVOLVE
```

As the user scrolls:

- Active step changes
- Supporting content changes
- Progress indicator moves
- Optional visual transforms

The user must always understand their position in the sequence.

---

# 18. Parallax

Parallax should be shallow.

Recommended visual range:

```text
small → medium
```

Avoid large floating movements that disconnect content from scrolling.

---

# 19. Smooth Scrolling

Lenis should:

- Improve continuity
- Preserve usability
- Disable itself for reduced motion
- Never prevent normal browser behavior

Touch devices should retain natural scrolling.

---

# 20. Micro Interactions

Good candidates:

- Arrow movement
- Underline animation
- Image scale
- Opacity shift
- Border transition
- Cursor feedback

Bad candidates:

- Excessive bouncing
- Random rotations
- Constant decorative movement
- Uncontrolled particle systems

---

# 21. Loading

Avoid a long cinematic loader.

Preferred:

```text
Minimal initialization
      ↓
Content appears quickly
      ↓
Non-critical effects enhance progressively
```

A loading animation must never hide already-usable content.

---

# 22. Reduced Motion

When `prefers-reduced-motion: reduce`:

Disable or simplify:

- Smooth scrolling
- Parallax
- Cursor animation
- Large scale transitions
- Decorative loops
- Complex scroll sequences

Keep:

- Content visibility
- Focus
- Navigation
- Functional feedback

---

# 23. Performance Rules

Prefer:

```text
transform
opacity
clip-path where appropriate
```

Avoid frequent animation of:

```text
width
height
top
left
box-shadow
filter
```

unless the browser cost has been validated.

---

# 24. Mobile Motion

Mobile should use:

- Faster transitions
- Less movement
- Less parallax
- No cursor
- No magnetic buttons
- Reduced WebGL

Touch interactions should be immediate.

---

# 25. Motion QA

Test:

```text
60fps target where practical
Desktop
Mobile
Safari
Chrome
Reduced motion
Slow CPU
Slow network
```

Animation is not considered complete until it works under constrained conditions.

---

# 26. Motion Definition of Done

The motion system is ready when:

- Hero is polished.
- Page transitions are stable.
- Project interactions are coherent.
- CTA interactions feel responsive.
- Scroll sequences are understandable.
- Mobile is intentionally simplified.
- Reduced motion works.
- No major jank exists.
- Animation does not block content.

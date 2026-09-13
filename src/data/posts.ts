import { Post } from "./schema";

export const POSTS: Post[] = [
  {
    id: "post-1",
    slug: "engineering-clarity-ai-era",
    title: "Engineering Clarity: Why AI Demands Editorial Product Thinking",
    excerpt:
      "As generative AI commoditizes generic code and boilerplate copy, the real competitive moat shifts to visual craft, editorial hierarchy, and cognitive ergonomics.",
    content: [
      "We live in an era where synthetic intelligence can generate thousands of lines of boilerplate software in seconds. Yet despite the exponential surge in software production, the world is inundated with cluttered, uninspired digital products that look and feel virtually indistinguishable from one another.",
      "At Rekasandi, we believe that the rise of AI does not diminish the need for human design engineering; rather, it elevates it to an unprecedented level of importance. When anyone can deploy a chatbot or an automated dashboard in twenty minutes, distinction belongs to those who apply editorial discipline, typographic restraint, and deliberate pacing.",
      "Consider the typical enterprise interface: thirty filters, an endless sea of identical cards, and bright purple gradients shouting for attention. Contrast this with architectural clarity: generous whitespace, high-contrast monospace metadata, and context-aware interactions that reveal complexity only when the human operator requires it.",
      "The next generation of industry-defining software will not be won by who can squeeze the most buttons onto a canvas. It will be won by those who treat software as an editorial publication: clear, authoritative, and obsessively engineered.",
    ],
    category: "AI & Strategy",
    publishedAt: "FEB 24, 2026",
    readingTime: "5 MIN READ",
    author: {
      name: "Sandi Gustam",
      role: "Founder & Lead Architect",
    },
    tags: ["Artificial Intelligence", "Product Design", "Editorial Architecture"],
  },
  {
    id: "post-2",
    slug: "mathematics-of-motion",
    title: "The Mathematics of Motion: Crafting 60fps Intentional Web Experiences",
    excerpt:
      "Animation on the web is often misunderstood as decorative flourish. In reality, great motion is physical feedback, spatial continuity, and cognitive reassurance.",
    content: [
      "There is a palpable difference between a website that feels animated and one that feels crafted. An animated website distracts; elements bounce erratically across the screen, demanding attention without conveying meaning. A crafted website, by contrast, feels alive: movements are quiet, physics are grounded in real-world momentum, and transitions preserve spatial orientation.",
      "When we engineered the motion architecture for the Rekasandi studio platform, we established five non-negotiable rules:",
      "First: Animation must never block interaction. If a user clicks a button or initiates a page transition, the application must remain immediately responsive.",
      "Second: Respect human sensory preferences. Smooth scrolling and large parallax shifts must gracefully disable whenever a visitor's operating system requests prefers-reduced-motion.",
      "Third: Consolidate tools by responsibility. We use Framer Motion for component micro-interactions and layout transitions, GSAP ScrollTrigger for pinned editorial timelines, and Lenis for unified momentum scroll.",
      "When these layers operate in harmony, motion ceases to be decoration and becomes an essential dimension of your brand's authority.",
    ],
    category: "Design Engineering",
    publishedAt: "JAN 18, 2026",
    readingTime: "6 MIN READ",
    author: {
      name: "Reza Pratama",
      role: "Head of Creative Technology",
    },
    tags: ["Motion Design", "GSAP", "Framer Motion", "Web Performance"],
  },
  {
    id: "post-3",
    slug: "architecture-of-scale",
    title: "Beyond Component Libraries: Building Multi-Brand Design Engines with Next.js 16",
    excerpt:
      "Why off-the-shelf UI libraries fall short when scaling to dozens of enterprise applications, and how to structure tokenized design primitives that stand the test of time.",
    content: [
      "Almost every fast-growing engineering team begins with a popular UI library. It delivers quick initial velocity. But as the business expands across multiple brands, localized products, and custom operational tools, the cracks inevitably appear.",
      "Styling overrides pollute CSS files. Upgrading third-party dependencies breaks custom layout hacks. Accessibility states become inconsistent across different repositories. What was meant to be an accelerator becomes a legacy maintenance burden.",
      "The solution is not to write every button from scratch, nor is it to accept the visual identity of a generic template. The solution is what we term a 'Headless Token Architecture'.",
      "By decoupling design tokens (colors, spatial scales, typographic variables) from structural headless primitives (such as Radix UI), you give designers complete ownership of the visual identity while engineers retain 100% control over accessibility and type safety.",
      "This is the foundation upon which resilient digital studios build the future.",
    ],
    category: "Engineering Architecture",
    publishedAt: "DEC 12, 2025",
    readingTime: "7 MIN READ",
    author: {
      name: "Dian Nugroho",
      role: "Systems Architect",
    },
    tags: ["Design Systems", "Next.js", "TypeScript", "Frontend Architecture"],
  },
];

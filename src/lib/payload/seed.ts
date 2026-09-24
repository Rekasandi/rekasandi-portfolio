import { getPayloadClient } from "./client";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { POSTS } from "@/data/posts";
import { TEAM_MEMBERS } from "@/data/team";
import type { Project as PayloadProject } from "@/payload-types";

export async function seedPayload() {
  const payload = await getPayloadClient();

  payload.logger.info("Starting Payload CMS database seeding...");

  // 1. Seed Admin User
  const existingUsers = await payload.find({
    collection: "users",
    limit: 1,
  });

  if (existingUsers.totalDocs === 0) {
    payload.logger.info("Creating default admin user: admin@rekasandi.com");
    await payload.create({
      collection: "users",
      data: {
        email: "admin@rekasandi.com",
        password: "Rekasandi2026!",
        name: "Rekasandi Lead Architect",
        role: "admin",
      },
    });
  }

  // 2. Seed Projects
  payload.logger.info("Verifying Projects collection...");
  for (const project of PROJECTS) {
    const existing = await payload.find({
      collection: "projects",
      where: { slug: { equals: project.slug } },
      limit: 1,
    });

    // Map case study blocks to collection blocks schema
    const mappedBlocks = project.caseStudyBlocks.map((block) => {
      if (block.type === "overview") {
        return {
          blockType: "overview" as const,
          challenge: block.challenge,
          solution: block.solution,
          role: block.role.map((r) => ({ item: r })),
        };
      }
      if (block.type === "stats") {
        return {
          blockType: "stats" as const,
          title: block.title || "",
          items: block.items.map((i) => ({
            value: i.value,
            label: i.label,
            description: i.description || "",
          })),
        };
      }
      if (block.type === "twoColumn") {
        return {
          blockType: "twoColumn" as const,
          heading: block.heading,
          leftTitle: block.leftTitle,
          leftContent: block.leftContent,
          rightTitle: block.rightTitle,
          rightContent: block.rightContent,
        };
      }
      if (block.type === "quote") {
        return {
          blockType: "quote" as const,
          quote: block.quote,
          author: block.author,
          role: block.role || "",
          company: block.company || "",
        };
      }
      if (block.type === "techStack") {
        return {
          blockType: "techStack" as const,
          technologies: block.technologies.map((t) => ({
            name: t.name,
            category: t.category,
            description: t.description,
          })),
        };
      }
      if (block.type === "gallery") {
        return {
          blockType: "gallery" as const,
          title: block.title || "",
          description: block.description || "",
          images: block.images.map((img) => ({
            url: img.url,
            caption: img.caption || "",
            alt: img.alt || "",
            aspectRatio: img.aspectRatio || "16/9",
          })),
        };
      }
      if (block.type === "fullWidthMedia") {
        return {
          blockType: "fullWidthMedia" as const,
          mediaUrl: block.mediaUrl,
          caption: block.caption || "",
          credit: block.credit || "",
          aspectRatio: block.aspectRatio || "21/9",
        };
      }
      return {
        blockType: "overview" as const,
        challenge: "",
        solution: "",
        role: [],
      };
    });

    if (existing.totalDocs > 0) {
      payload.logger.info(`Updating existing project caseStudyBlocks: ${project.title}`);
      await payload.update({
        collection: "projects",
        id: existing.docs[0].id,
        data: {
          caseStudyBlocks: mappedBlocks,
        },
      });
      continue;
    }

    payload.logger.info(`Seeding new project: ${project.title}`);
    await payload.create({
      collection: "projects",
      data: {
        title: project.title,
        slug: project.slug,
        number: project.number,
        client: project.client,
        year: project.year,
        industry: (project.industry as unknown as PayloadProject["industry"]) || "Other",
        category: project.category as unknown as PayloadProject["category"],
        tagline: project.tagline,
        summary: project.summary,
        heroImage: project.heroImage as any,
        thumbnailImage: project.thumbnailImage as any,
        featured: project.featured,
        status: "published",
        technologies: (project.technologies || []).map((t) => ({ name: t })),
        metrics: (() => {
          const statsBlock = project.caseStudyBlocks?.find((b) => b.type === "stats") as { type: "stats"; items: { value: string; label: string; description?: string }[] } | undefined;
          return (statsBlock?.items || []).map((m) => ({ label: m.label, value: m.value }));
        })(),
        caseStudyBlocks: mappedBlocks as unknown as PayloadProject["caseStudyBlocks"],
      },
    });
  }

  // 3. Seed Services
  payload.logger.info("Verifying Services collection...");
  for (let i = 0; i < SERVICES.length; i++) {
    const srv = SERVICES[i];
    const existing = await payload.find({
      collection: "services",
      where: { slug: { equals: srv.slug } },
      limit: 1,
    });
    if (existing.totalDocs > 0) continue;

    await payload.create({
      collection: "services",
      data: {
        number: srv.number,
        title: srv.title,
        slug: srv.slug,
        shortDescription: srv.shortDescription,
        order: i + 1,
        capabilities: (srv.capabilities || []).map((c) => ({
          title: c,
          description: `Full production lifecycle capability in ${c}.`,
        })),
        deliverables: (srv.deliverables || []).map((d) => ({ item: d })),
      },
    });
  }

  // 4. Seed Posts
  const existingPosts = await payload.find({
    collection: "posts",
    limit: 1,
  });

  if (existingPosts.totalDocs === 0) {
    payload.logger.info("Seeding Posts collection...");
    for (const post of POSTS) {
      const categoryMap: Record<string, "Engineering" | "AI & Systems" | "Design Systems" | "Architecture" | "Interaction"> = {
        "AI & Strategy": "AI & Systems",
        "Design Engineering": "Design Systems",
        "Systems Architecture": "Architecture",
        "Frontend": "Interaction",
      };

      await payload.create({
        collection: "posts",
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          author: post.author?.name || "Rekasandi Editorial Team",
          category: categoryMap[post.category] || "Engineering",
          readingTime: post.readingTime || "5 min read",
          publishedAt: new Date().toISOString(),
          featured: true,
          body: Array.isArray(post.content) ? post.content.join("\n\n") : (post.content || post.excerpt),
        },
      });
    }
  }

  // 5. Seed Team Members
  const existingTeam = await payload.find({
    collection: "team-members",
    limit: 1,
  });

  if (existingTeam.totalDocs === 0) {
    payload.logger.info("Seeding TeamMembers collection...");
    for (let i = 0; i < TEAM_MEMBERS.length; i++) {
      const member = TEAM_MEMBERS[i];
      await payload.create({
        collection: "team-members",
        data: {
          name: member.name,
          role: member.role,
          specialization: member.specialization,
          bio: member.bio,
          location: member.location,
          order: i + 1,
        },
      });
    }
  }

  // 6. Seed Globals: Navigation, Footer, SiteSettings
  payload.logger.info("Verifying Globals...");

  try {
    const nav = await payload.findGlobal({ slug: "navigation" });
    if (!nav?.items || nav.items.length === 0) {
      await payload.updateGlobal({
        slug: "navigation",
        data: {
          items: [
            { label: "WORK", href: "/work" },
            { label: "SERVICES", href: "/services" },
            { label: "INSIGHTS", href: "/insights" },
            { label: "ABOUT", href: "/about" },
            { label: "CONTACT", href: "/contact" },
          ],
          primaryCtaLabel: "START A PROJECT ↗",
          primaryCtaHref: "/contact",
        },
      });
    }
  } catch (err) {
    payload.logger.warn(`Could not seed navigation global: ${String(err)}`);
  }

  try {
    const foot = await payload.findGlobal({ slug: "footer" });
    if (!foot?.socialLinks || foot.socialLinks.length === 0) {
      await payload.updateGlobal({
        slug: "footer",
        data: {
          statement:
            "Rekasandi is an independent digital product studio engineering category-defining applications and intelligent systems.",
          timezone: "Asia/Jakarta (UTC+7)",
          socialLinks: [
            { platform: "GitHub", url: "https://github.com/rekasandi" },
            { platform: "X / Twitter", url: "https://twitter.com/rekasandi" },
            { platform: "LinkedIn", url: "https://linkedin.com/company/rekasandi" },
            { platform: "Figma", url: "https://figma.com/@rekasandi" },
          ],
        },
      });
    }
  } catch (err) {
    payload.logger.warn(`Could not seed footer global: ${String(err)}`);
  }

  try {
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        companyName: "REKASANDI",
        tagline: "Digital Product Studio — Strategy, Engineering & AI Systems",
        description:
          "We design and build digital products that move businesses forward. Strategy, design, engineering, and intelligent technology based in Jakarta.",
        contactEmail: "hello@rekasandi.com",
        location: "South Jakarta, DKI Jakarta, Indonesia",
        availability: "AVAILABLE FOR Q2/Q3 2026 ENGAGEMENTS",
      },
    });
  } catch (err) {
    payload.logger.warn(`Could not seed site-settings global: ${String(err)}`);
  }

  try {
    await payload.updateGlobal({
      slug: "page-home",
      data: {
        heroHeadlineLine1: "WE BUILD",
        heroHeadlineLine2: "DIGITAL PRODUCTS",
        heroHeadlineLine3Prefix: "FOR AMBITIOUS",
        heroHeadlineLine3Suffix: "BUSINESSES.",
        heroSubtitle:
          "We partner with visionary enterprises and founders to engineer category-defining web experiences, scalable software architectures, and autonomous AI systems.",
        introTitle: "Engineered Clarity.",
        introDescription:
          "Complexity is natural in modern software. Clarity is the deliberate, uncompromising discipline of design engineering.",
        introStatement:
          "We turn complex business challenges and multi-system workflows into intuitive, high-velocity digital experiences.",
        introParagraph:
          "Most software house projects suffer from generic templates and fragmented handoffs. We operate as an elite product partner embedded with leadership—bridging raw engineering depth with editorial art direction to deliver software that proves its value on day one.",
        introMetrics: [
          {
            value: "100%",
            label: "In-House Engineering",
            desc: "Zero third-party outsourcing. Every line of code and pixel crafted by senior studio architects.",
          },
          {
            value: "60 FPS",
            label: "Fluid Motion Target",
            desc: "Hardware-accelerated CSS and GSAP timelines calibrated for instantaneous user feedback.",
          },
          {
            value: "Zero",
            label: "Template Compromise",
            desc: "Bespoke component architectures designed uniquely around each client’s strategic position.",
          },
        ],
        approachSteps: [
          {
            number: "01",
            title: "DISCOVER",
            subtitle: "Strategic Alignment & Architecture Audit",
            description:
              "We dissect your existing software topology, commercial drivers, operational bottlenecks, and user heuristics. Before proposing code or layouts, we establish concrete success benchmarks and defensible roadmaps.",
            deliverable: "Technical Blueprint & Architecture Audit",
          },
          {
            number: "02",
            title: "DEFINE",
            subtitle: "Product Scope & Core System Schemas",
            description:
              "We translate high-level business goals into concrete technical specifications: relational data models, API contracts, entity schemas, and user journeys stripped of non-essential bloat.",
            deliverable: "Schema Contracts & Scope Matrix",
          },
          {
            number: "03",
            title: "DESIGN",
            subtitle: "Editorial UI & Tactile Micro-Interactions",
            description:
              "We forge an unmistakable visual identity: bespoke typography, tokenized color palettes, and motion choreographies tested on actual screens rather than theoretical Figma canvases.",
            deliverable: "Figma Tokens, Design System & Interactive Prototypes",
          },
          {
            number: "04",
            title: "BUILD",
            subtitle: "Next.js App Router & Type-Safe Engineering",
            description:
              "We write clean, modular, production-hardened TypeScript code. Every component is optimized for sub-second server rendering, zero Cumulative Layout Shift, and full keyboard accessibility.",
            deliverable: "Clean Git Repository & Staging Deployments",
          },
          {
            number: "05",
            title: "LAUNCH",
            subtitle: "Performance Hardening & Zero-Downtime Deployment",
            description:
              "We execute thorough production validation: Core Web Vitals audits, edge CDN caching strategies, automated SEO indexing, and end-to-end security penetration checks.",
            deliverable: "Vercel / AWS Production Deployment & Live Telemetry",
          },
          {
            number: "06",
            title: "EVOLVE",
            subtitle: "Telemetry Analysis & Continuous Iteration",
            description:
              "Digital products are living systems. Post-launch, we monitor user interaction funnels, conversion rates, and server response times to continually sharpen the competitive advantage.",
            deliverable: "Quarterly Velocity Sprints & Optimization Reports",
          },
        ],
        techItems: [
          { category: "FRONTEND & RUNTIME", name: "Next.js 16 App Router", desc: "Server components, parallel routes, streaming" },
          { category: "FRONTEND & RUNTIME", name: "React 19", desc: "Actions, optimistic updates, canary features" },
          { category: "FRONTEND & RUNTIME", name: "TypeScript 5", desc: "Strict type enforcement across schemas" },
          { category: "FRONTEND & RUNTIME", name: "Tailwind CSS v4", desc: "Tokenized design architecture" },
          { category: "MOTION & CRAFT", name: "GSAP & ScrollTrigger", desc: "Hardware-accelerated pinned choreography" },
          { category: "MOTION & CRAFT", name: "Framer Motion", desc: "Spring physics & contextual micro-interactions" },
          { category: "MOTION & CRAFT", name: "Lenis", desc: "Unified momentum smooth scroll engine" },
          { category: "MOTION & CRAFT", name: "Mapbox / WebGL", desc: "Custom hardware geospatial visualization" },
          { category: "BACKEND & DATA", name: "PostgreSQL & pgvector", desc: "Relational persistence & semantic search" },
          { category: "BACKEND & DATA", name: "Node.js & Python", desc: "High-throughput microservices & AI pipelines" },
          { category: "BACKEND & DATA", name: "Payload CMS", desc: "Type-safe headless editorial engine" },
          { category: "BACKEND & DATA", name: "Redis & Kafka", desc: "Distributed pub/sub and sub-millisecond cache" },
          { category: "INTELLIGENCE & CLOUD", name: "LangChain & Multi-Agent", desc: "Cognitive task routing and reasoning" },
          { category: "INTELLIGENCE & CLOUD", name: "OpenAI / Claude APIs", desc: "Custom fine-tuned cognitive pipelines" },
          { category: "INTELLIGENCE & CLOUD", name: "Vercel Edge Network", desc: "Global CDN delivery & serverless functions" },
          { category: "INTELLIGENCE & CLOUD", name: "Docker & AWS", desc: "Containerized, scalable cloud deployments" },
        ],
        ctaHeadline: "LET’S BUILD SOMETHING DEFINITIVE.",
        ctaSubtitle:
          "Have an ambitious digital product, web experience, or AI system in mind? We partner with companies ready to create category-defining work.",
      },
    });
  } catch (err) {
    payload.logger.warn(`Could not seed page-home global: ${String(err)}`);
  }

  try {
    await payload.updateGlobal({
      slug: "page-about",
      data: {
        headline: "WE ARE REKASANDI.",
        subheadline:
          "An independent digital product studio crafting category-defining web experiences, scalable software architectures, and autonomous AI systems.",
        manifestoTitle: "We care about what we build — and how we build it.",
        manifestoParagraphs: [
          { paragraph: "The web is flooded with disposable software: identical SaaS templates, clunky enterprise portals, and flashy marketing websites that break when you resize your browser." },
          { paragraph: "Rekasandi was formed as an antidote to this commodity mindset. Based in Jakarta with a global standard of execution, we blend Scandinavian editorial minimalism, Swiss typographic discipline, and modern Silicon Valley software engineering." },
          { paragraph: "We believe that software should be treated with the same dignity as physical architecture. When you partner with us, you are commissioning a digital product engineered to endure." },
        ],
        principles: [
          {
            number: "01",
            title: "Quiet Confidence",
            description:
              "We let our work speak through precision, typography, and flawless responsiveness. No gimmicks, no superficial hype, just visible craft.",
          },
          {
            number: "02",
            title: "Performance by Default",
            description:
              "Sub-second load times and 60fps fluidity are not afterthoughts; they are non-negotiable foundations embedded into our architecture from day one.",
          },
          {
            number: "03",
            title: "Bespoke Engineering",
            description:
              "Every company has a unique strategic context. We reject generic templates and cookie-cutter frameworks in favor of tailored digital assets.",
          },
          {
            number: "04",
            title: "Transparent Rigor",
            description:
              "We communicate openly about architecture trade-offs, timelines, and technical decisions. We operate as true partners, not opaque vendors.",
          },
        ],
      },
    });
  } catch (err) {
    payload.logger.warn(`Could not seed page-about global: ${String(err)}`);
  }

  try {
    await payload.updateGlobal({
      slug: "page-services",
      data: {
        headline: "SERVICES & SPECTRUM.",
        subheadline:
          "We combine business strategy, editorial art direction, and deep software engineering to build defensible digital products that move companies forward.",
        engagementModels: [
          {
            number: "01",
            title: "Dedicated Product Team",
            subtitle: "End-to-End Delivery Partnership",
            description:
              "An integrated team of senior architects, product designers, and engineers dedicated to designing, building, and launching your flagship platform from scratch.",
            features: "Dedicated Full-Stack Team\nBi-Weekly Production Releases\nDirect Slack/Discord Channel\nComplete IP & Code Ownership",
          },
          {
            number: "02",
            title: "Strategic Velocity Sprint",
            subtitle: "2–4 Week High-Impact Architecture",
            description:
              "Rapid turnaround for critical initiatives: AI feasibility proofs, design system tokenization, performance turnarounds, or high-stakes product prototypes.",
            features: "Rapid Architectural Prototyping\nExecutive Technical Audits\nDesign Token Pipeline Setup\nConcrete Production Roadmap",
          },
          {
            number: "03",
            title: "Continuous Evolution Retainer",
            subtitle: "Post-Launch Optimization & Telemetry",
            description:
              "Ongoing product iteration, performance tuning, and feature scaling following market release to ensure your software continually outpaces competitors.",
            features: "24/7 SLA Telemetry & Monitoring\nPerformance & SEO Optimization\nContinuous Design System Sync\nQuarterly Feature Sprints",
          },
        ],
      },
    });
  } catch (err) {
    payload.logger.warn(`Could not seed page-services global: ${String(err)}`);
  }

  payload.logger.info("Payload CMS database seeding complete!");
}

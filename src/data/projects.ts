import { Project } from "./schema";

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    slug: "aether-ai",
    number: "01",
    title: "Aether AI Platform",
    client: "Aether Intelligence Inc.",
    year: "2026",
    industry: "Artificial Intelligence",
    category: "AI & Automation",
    tagline: "Autonomous Enterprise Orchestration & Reasoning Core",
    summary:
      "A next-generation enterprise AI platform empowering global corporations to orchestrate multi-agent workflows, contextual knowledge graphs, and real-time operational decision making with sub-second latency.",
    featured: true,
    heroImage: "/images/projects/aether-ai.jpg",
    thumbnailImage: "/images/projects/aether-ai.jpg",
    gradientAccent: "from-[#d7ff3f]/20 via-[#182012] to-transparent",
    deliverables: [
      "AI Strategy & Prompt Engineering",
      "Real-time Telemetry Dashboard",
      "Multi-Agent Graph Orchestration",
      "Enterprise Design System",
    ],
    technologies: [
      "Next.js 16",
      "TypeScript",
      "Python / FastAPI",
      "LangChain",
      "PostgreSQL / pgvector",
      "Tailwind CSS",
      "GSAP",
    ],
    liveUrl: "https://aether-intelligence.example.com",
    caseStudyBlocks: [
      {
        type: "overview",
        challenge:
          "Enterprise data operations were bogged down by fragmented tabular data across 14 legacy systems. Analysts spent 65% of their daily bandwidth manually querying, cleaning, and synthesizing business intelligence reports with a multi-day turnaround time.",
        solution:
          "Rekasandi designed and engineered an autonomous AI workflow engine with custom cognitive routing agents, unified vector embeddings, and an editorial streaming interface that converts complex natural language prompts into executable data operations in milliseconds.",
        role: [
          "Product Architecture",
          "UI/UX Design Engineering",
          "Full-stack Web Platform",
          "Model Fine-Tuning & Evaluation",
        ],
      },
      {
        type: "stats",
        title: "Verified Impact & Enterprise Metrics",
        items: [
          {
            value: "+340%",
            label: "Workflow Velocity",
            description: "Quarterly report generation reduced from 4 days to 45 minutes.",
          },
          {
            value: "-62%",
            label: "Manual Query Overhead",
            description: "Direct cognitive agent routing eliminates routine analyst escalations.",
          },
          {
            value: "99.8%",
            label: "Reasoning Accuracy",
            description: "Benchmarked across 120,000 corporate operational compliance queries.",
          },
          {
            value: "< 180ms",
            label: "Streaming Token Latency",
            description: "Edge streaming pipeline delivering instantaneous user feedback.",
          },
        ],
      },
      {
        type: "twoColumn",
        heading: "Engineering the Cognitive Bridge",
        leftTitle: "01 / Architecture & Distributed Pipelines",
        leftContent:
          "We engineered an asynchronous event-driven streaming pipeline leveraging Next.js App Router server streaming and WebSocket event dispatching. By decoupling vector semantic search from LLM token completion, users experience immediate cognitive responsiveness without blocking interface threads.",
        rightTitle: "02 / Editorial Design Language",
        rightContent:
          "Enterprise AI interfaces too often default to cluttered chat boxes. Rekasandi pioneered an editorial layout with contextual side-panels, dynamic data breadcrumbs, and typographic micro-states that instill user trust during high-stakes corporate actions.",
      },
      {
        type: "quote",
        quote:
          "Rekasandi didn't just build software for us; they fundamentally redefined how our global teams interact with enterprise intelligence. Their attention to motion, typography, and speed is unparalleled.",
        author: "Marcus Vance",
        role: "Chief Technology Officer",
        company: "Aether Intelligence Inc.",
      },
      {
        type: "techStack",
        technologies: [
          {
            name: "Next.js 16 App Router",
            category: "Frontend Framework",
            description: "Server-side rendering, streaming responses, and edge caching.",
          },
          {
            name: "Tailwind CSS v4",
            category: "Design System",
            description: "Tokenized dark mode theme with sub-millisecond compile times.",
          },
          {
            name: "PostgreSQL & pgvector",
            category: "Database & Vector Store",
            description: "High-density semantic indexing and relational persistence.",
          },
          {
            name: "Framer Motion & GSAP",
            category: "Animation Engine",
            description: "Choreographed timeline states and smooth reactive components.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-2",
    slug: "kroma-design-system",
    number: "02",
    title: "Kroma Multi-Brand Design Engine",
    client: "Kroma Technologies Ltd.",
    year: "2025",
    industry: "Design Systems",
    category: "Web Experience",
    tagline: "High-Fidelity Component Architecture & Token Ecosystem",
    summary:
      "A unified multi-brand design system and frontend component ecosystem powering 18 web applications across Europe and Southeast Asia with mathematical typographic scaling and tokenized theme switching.",
    featured: true,
    heroImage: "/images/projects/kroma-design-system.jpg",
    thumbnailImage: "/images/projects/kroma-design-system.jpg",
    gradientAccent: "from-[#f4f3ef]/15 via-[#1a1a18] to-transparent",
    deliverables: [
      "Design Token Pipeline",
      "Accessible Component Library (WAI-ARIA AAA)",
      "Interactive Documentation Portal",
      "Automated Visual Regression Suite",
    ],
    technologies: [
      "Next.js",
      "React 19",
      "TypeScript",
      "Radix UI",
      "Figma Tokens API",
      "Tailwind CSS",
      "Storybook",
    ],
    liveUrl: "https://kroma-tokens.example.com",
    caseStudyBlocks: [
      {
        type: "overview",
        challenge:
          "Kroma managed 18 disparate client-facing web portals built across 5 separate teams over 6 years. Product inconsistencies, broken accessibility states, and weeks spent reproducing identical button states severely slowed cross-functional velocity.",
        solution:
          "Rekasandi engineered 'Kroma Engine': an automated tokenized design system syncing Figma variables directly to code repositories via GitHub Actions, accompanied by 85+ production-grade accessible React components with zero runtime overhead.",
        role: [
          "Design Systems Architecture",
          "Accessibility Auditing",
          "Component Engineering",
          "Developer Documentation Portal",
        ],
      },
      {
        type: "stats",
        title: "Design System Performance & Reach",
        items: [
          {
            value: "85+",
            label: "Production Components",
            description: "Battle-tested with 100% keyboard accessibility and WAI-ARIA compliance.",
          },
          {
            value: "-45%",
            label: "Sprint Delivery Time",
            description: "Engineers ship new feature interfaces twice as fast with pre-built primitives.",
          },
          {
            value: "100%",
            label: "WCAG AAA Compliance",
            description: "High-contrast editorial palettes and accessible focus rings across all portals.",
          },
          {
            value: "18",
            label: "Connected Applications",
            description: "A single version-controlled package powering the entire corporate suite.",
          },
        ],
      },
      {
        type: "twoColumn",
        heading: "Tokens as the Source of Truth",
        leftTitle: "01 / Token Pipeline & CI Automation",
        leftContent:
          "We established an automated pipeline where designers update colors, radii, or spacing in Figma, and a headless GitHub Action parses JSON token payloads, runs automated WCAG contrast calculations, and publishes versioned npm packages in under 90 seconds.",
        rightTitle: "02 / Restrained Visual Hierarchy",
        rightContent:
          "Every component was stripped of extraneous embellishments. Using subtle borders, precise typography, and purposeful micro-interactions, Kroma gives enterprise applications the feel of bespoke editorial products.",
      },
      {
        type: "quote",
        quote:
          "The design system Rekasandi delivered was a game changer for our 60+ engineering organization. We reduced UI bugs by 80% and finally have a unified, award-winning visual language.",
        author: "Elena Rostova",
        role: "VP of Product Experience",
        company: "Kroma Technologies Ltd.",
      },
      {
        type: "techStack",
        technologies: [
          {
            name: "React 19 & TypeScript",
            category: "Core Primitives",
            description: "Polymorphic props, ref forwarding, and strict accessibility contracts.",
          },
          {
            name: "Radix UI Primitives",
            category: "Accessibility Foundation",
            description: "Unstyled keyboard-navigable accessible dropdowns, dialogs, and tabs.",
          },
          {
            name: "Tailwind CSS Token Engine",
            category: "Styling Engine",
            description: "CSS variables mapped to semantic design tokens.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-3",
    slug: "volta-fleet-os",
    number: "03",
    title: "Volta Fleet Operating System",
    client: "Volta Logistics Global",
    year: "2025",
    industry: "Supply Chain & Logistics",
    category: "Custom Software",
    tagline: "Real-Time Telemetry & Autonomous Logistics Infrastructure",
    summary:
      "A mission-critical fleet monitoring and predictive logistics operating system handling 120,000+ connected commercial vehicles with real-time route optimization, energy telemetry, and automated dispatch.",
    featured: true,
    heroImage: "/images/projects/volta-fleet-os.jpg",
    thumbnailImage: "/images/projects/volta-fleet-os.jpg",
    gradientAccent: "from-[#d7ff3f]/25 via-[#131b17] to-transparent",
    deliverables: [
      "Mission Control Web Application",
      "Real-Time Telemetry Stream Visualizer",
      "Geospatial Routing Engine",
      "Predictive Maintenance Alerting",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Mapbox GL / WebGL",
      "Node.js",
      "Kafka / WebSockets",
      "TimescaleDB",
      "Tailwind CSS",
    ],
    liveUrl: "https://volta-os.example.com",
    caseStudyBlocks: [
      {
        type: "overview",
        challenge:
          "Volta operates cross-border heavy transport fleets across 6 countries. Vehicle telemetry was scattered across satellite trackers, OBD dongles, and fuel management portals, resulting in preventable breakdowns and millions in route inefficiencies.",
        solution:
          "Rekasandi built a centralized real-time Mission Control suite: combining custom WebGL map rendering, sub-100ms GPS updates, algorithmic battery/fuel optimization, and instant automated dispatcher notifications.",
        role: [
          "Systems Engineering",
          "High-Density Dashboard Architecture",
          "Geospatial WebGL Visualization",
          "Fault-Tolerant WebSocket Layer",
        ],
      },
      {
        type: "stats",
        title: "Telemetry Scale & Logistics Impact",
        items: [
          {
            value: "120k+",
            label: "Active Connected Vehicles",
            description: "Continuous dual-band GPS telemetry ingested every 3 seconds.",
          },
          {
            value: "99.99%",
            label: "Mission-Critical Uptime",
            description: "High-availability multi-region cluster with automated failover.",
          },
          {
            value: "-22%",
            label: "Fleet Idle Time",
            description: "Dynamic algorithmic routing avoiding metropolitan choke points.",
          },
          {
            value: "$3.8M",
            label: "Annual Energy Savings",
            description: "Calculated across commercial electric and hybrid freight divisions.",
          },
        ],
      },
      {
        type: "twoColumn",
        heading: "Handling High-Density Telemetry",
        leftTitle: "01 / WebGL Geospatial Engine",
        leftContent:
          "Standard DOM-based maps degraded severely when plotting 50,000 concurrent moving vehicle markers. Rekasandi developed a custom GPU-accelerated WebGL layer using Mapbox GL, maintaining 60fps pan and zoom even during peak continental transit hours.",
        rightTitle: "02 / Ergonomic Information Design",
        rightContent:
          "Dispatchers work 10-hour shifts under high cognitive load. We organized the interface around an architectural dark room concept: high-contrast alert states, subdued background maps, and monospace telemetry typography that minimizes eye strain.",
      },
      {
        type: "quote",
        quote:
          "Volta OS is the nervous system of our global operation. Rekasandi engineered a platform so reliable and visually intuitive that onboarding our fleet operators took days instead of months.",
        author: "Hendrik Van Der Meer",
        role: "Global Operations Director",
        company: "Volta Logistics Global",
      },
      {
        type: "techStack",
        technologies: [
          {
            name: "Next.js App Router",
            category: "Application Framework",
            description: "Modular routing with parallel data fetching for mission control boards.",
          },
          {
            name: "Mapbox GL / WebGL",
            category: "Geospatial Engine",
            description: "Hardware-accelerated fleet visualization and heatmaps.",
          },
          {
            name: "TimescaleDB & Kafka",
            category: "Data Streaming",
            description: "High-throughput time-series telemetry storage and message brokering.",
          },
        ],
      },
    ],
  },
  {
    id: "proj-4",
    slug: "nexa-pay",
    number: "04",
    title: "Nexa Cross-Border FinTech",
    client: "Nexa Financial Systems",
    year: "2024",
    industry: "FinTech & Banking",
    category: "Mobile Application",
    tagline: "Zero-Friction Multi-Currency Financial Ecosystem",
    summary:
      "A flagship international payments application facilitating zero-spread multi-currency exchange, virtual cards, and commercial treasury management with biometric security and immediate settlement.",
    featured: true,
    heroImage: "/images/projects/nexa-pay.svg",
    thumbnailImage: "/images/projects/nexa-pay.svg",
    gradientAccent: "from-[#d7ff3f]/15 via-[#1b1c15] to-transparent",
    deliverables: [
      "iOS & Android Mobile Architecture",
      "Treasury Web Portal",
      "Fraud Detection Micro-interactions",
      "Banking Core Integration",
    ],
    technologies: [
      "React Native / Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Stripe / Banking APIs",
      "Framer Motion",
    ],
    liveUrl: "https://nexa-payments.example.com",
    caseStudyBlocks: [
      {
        type: "overview",
        challenge:
          "Traditional international transfers involved opaque 3–5 day delays, 4% hidden exchange fees, and cumbersome paper identity verification that caused a 48% drop-off rate among enterprise users.",
        solution:
          "Rekasandi engineered Nexa's multi-platform suite: instant currency conversion with real-time mid-market rates, 30-second automated e-KYC verification, and an ultra-tactile card management interface.",
        role: [
          "FinTech UX/UI Architecture",
          "Mobile & Web Engineering",
          "Design Systems",
          "Security & Compliance Standards",
        ],
      },
      {
        type: "stats",
        title: "Transaction Volume & Market Reception",
        items: [
          {
            value: "$1.2B+",
            label: "Processed Volume",
            description: "Handled securely in the first 14 months across 38 currency corridors.",
          },
          {
            value: "4.9★",
            label: "App Store Rating",
            description: "Rated across 42,000+ verified retail and enterprise client reviews.",
          },
          {
            value: "< 3.5s",
            label: "Settlement Speed",
            description: "Instant cross-border wallet-to-wallet transactions.",
          },
          {
            value: "99.999%",
            label: "Transaction Accuracy",
            description: "Zero accounting discrepancies across 4.8 million ledger entries.",
          },
        ],
      },
      {
        type: "twoColumn",
        heading: "Tactile FinTech Craft",
        leftTitle: "01 / Micro-Interactions & Reassurance",
        leftContent:
          "Moving significant capital demands psychological confidence. Every gesture in Nexa Pay—from dragging currency sliders to sliding to confirm payments—features customized haptic vibration triggers and smooth vector bezier paths.",
        rightTitle: "02 / Zero-Trust Financial Security",
        rightContent:
          "Behind the elegant minimalist interface sits end-to-end payload encryption, biometric authentication, and instant automated fraud heuristics that safeguard customer assets without creating user friction.",
      },
      {
        type: "quote",
        quote:
          "Rekasandi delivered an experience that rivals the finest consumer tech products in Silicon Valley. Our conversion rate tripled in the first month following launch.",
        author: "Sarah Al-Mansoor",
        role: "Head of Product",
        company: "Nexa Financial Systems",
      },
      {
        type: "techStack",
        technologies: [
          {
            name: "React Native & Next.js",
            category: "Multi-Platform Suite",
            description: "Shared business logic and tokenized design system across web and mobile.",
          },
          {
            name: "TypeScript Strict",
            category: "Type Safety",
            description: "Financial decimal calculations and API contracts with zero runtime type bugs.",
          },
          {
            name: "Framer Motion",
            category: "Micro-Interactions",
            description: "Tactile card flipping, currency conversion gestures, and status transitions.",
          },
        ],
      },
    ],
  },
];

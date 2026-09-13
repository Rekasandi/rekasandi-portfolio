import { Service } from "./schema";

export const SERVICES: Service[] = [
  {
    id: "srv-1",
    slug: "digital-products",
    number: "01",
    title: "Digital Products",
    shortDescription:
      "We partner with ambitious founders and enterprise leaders to define, design, and engineer category-defining digital products from zero to scale.",
    fullDescription:
      "A great digital product is the synthesis of business viability, human intuition, and uncompromising technical execution. We don't build generic software; we engineer defensible digital assets that command market leadership.",
    deliverables: [
      "Product Strategy & Value Mapping",
      "Interactive Wireframing & Prototyping",
      "High-Fidelity Product Design (Figma)",
      "Production-Ready Next.js / TypeScript App",
      "Continuous Deployment & Analytics Setup",
    ],
    capabilities: [
      "0-to-1 Product Definition",
      "User Research & Journey Architecture",
      "Design Systems & Token Architecture",
      "Full-Stack Web Engineering",
      "User Onboarding Optimization",
    ],
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
    stats: { value: "3.4x", label: "Average Client Growth Post-Launch" },
  },
  {
    id: "srv-2",
    slug: "web-experiences",
    number: "02",
    title: "Web Experiences",
    shortDescription:
      "Immersive, editorial, award-winning web platforms that combine distinctive art direction with sub-second performance.",
    fullDescription:
      "Your website is the single most visible proof of your company's craft. We build editorial, motion-driven digital experiences inspired by architectural rigor, typographic nuance, and flawless responsiveness across every device.",
    deliverables: [
      "Editorial Creative Direction",
      "Bespoke Typographic Systems",
      "GSAP & Framer Motion Choreography",
      "Headless CMS Integration",
      "Global CDN & Core Web Vitals Tuning",
    ],
    capabilities: [
      "Brand Art Direction & Editorial Layout",
      "Lenis Smooth Scrolling & Parallax",
      "Context-Aware Cursor Micro-Interactions",
      "Responsive Fluid Typography",
      "WAI-ARIA Accessibility Standards",
    ],
    technologies: ["Next.js App Router", "GSAP ScrollTrigger", "Framer Motion", "Lenis", "Payload CMS"],
    stats: { value: "< 0.02", label: "Target Cumulative Layout Shift (CLS)" },
  },
  {
    id: "srv-3",
    slug: "custom-software",
    number: "03",
    title: "Custom Software",
    shortDescription:
      "High-throughput enterprise platforms, distributed telemetry suites, and mission-critical cloud infrastructure.",
    fullDescription:
      "When off-the-shelf SaaS fails to support your business requirements, Rekasandi engineers bespoke software systems tailored precisely to your operational workflows, compliance requirements, and scale.",
    deliverables: [
      "System Architecture & Data Schemas",
      "High-Throughput REST & GraphQL APIs",
      "Real-Time WebSocket Event Pipelines",
      "Role-Based Access Control (RBAC)",
      "Automated CI/CD & Cloud Infrastructure",
    ],
    capabilities: [
      "Microservices & Event-Driven Systems",
      "High-Density Dashboard Visualization",
      "Database Optimization & Indexing",
      "Third-Party Enterprise Integrations",
      "Automated Testing Suites (Unit & E2E)",
    ],
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"],
    stats: { value: "99.99%", label: "Target Infrastructure Uptime" },
  },
  {
    id: "srv-4",
    slug: "ai-automation",
    number: "04",
    title: "AI & Automation",
    shortDescription:
      "Contextual LLM architectures, multi-agent cognitive pipelines, and intelligent operational workflows that unlock exponential productivity.",
    fullDescription:
      "We move beyond generic chatbots to build deep AI integrations: autonomous reasoning agents, proprietary knowledge graphs with vector embeddings, and automated workflow orchestrations that turn complex manual tasks into real-time digital services.",
    deliverables: [
      "AI Strategy & Feasibility Mapping",
      "Vector Semantic Search Architecture",
      "Multi-Agent Graph Orchestration",
      "Model Fine-Tuning & Evaluation",
      "Streaming UI & Cognitive Feedback Loops",
    ],
    capabilities: [
      "Retrieval-Augmented Generation (RAG)",
      "Cognitive Task Routing",
      "Intelligent Document Processing",
      "Predictive Telemetry & Anomaly Detection",
      "Enterprise AI Security & Governance",
    ],
    technologies: ["Python", "FastAPI", "LangChain", "OpenAI / Claude APIs", "pgvector", "Next.js"],
    stats: { value: "-65%", label: "Reduction in Manual Workflow Latency" },
  },
  {
    id: "srv-5",
    slug: "mobile-applications",
    number: "05",
    title: "Mobile Applications",
    shortDescription:
      "Tactile, high-performance mobile applications engineered with native gestures, haptic physics, and fluid offline synchronization.",
    fullDescription:
      "Mobile products require an obsessive focus on tactile feedback, battery efficiency, and zero-latency interactions. We craft native-feeling iOS and Android applications that delight users at every touchpoint.",
    deliverables: [
      "Mobile UX Journey Architecture",
      "Cross-Platform React Native App",
      "Native Haptic & Gesture Feedback",
      "Offline-First SQLite Cache Architecture",
      "App Store & Google Play Submission",
    ],
    capabilities: [
      "Cross-Platform Native Engineering",
      "Biometric Security (FaceID/TouchID)",
      "Push Notification & Deep Linking",
      "In-App Purchases & Payment Gateways",
      "Performance & Memory Optimization",
    ],
    technologies: ["React Native", "TypeScript", "Expo", "Framer Motion", "SQLite", "Native Modules"],
    stats: { value: "4.9★", label: "Average App Store Portfolio Rating" },
  },
];

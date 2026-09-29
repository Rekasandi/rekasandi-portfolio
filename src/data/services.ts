import { Service } from "./schema";

export const SERVICES: Service[] = [
  {
    id: "srv-1",
    slug: "digital-products",
    number: "01",
    title: "Digital Products",
    shortDescription:
      "Plan and build customer-facing products and internal tools, from product definition through launch.",
    fullDescription:
      "We connect user needs, product design, and engineering from early planning through launch.",
    deliverables: [
      "Product planning and requirements",
      "Wireframes and interactive prototypes",
      "Product interface design",
      "Production-ready web application",
      "Deployment and analytics setup",
    ],
    capabilities: [
      "Product definition",
      "User research and user flows",
      "Design systems",
      "Web application engineering",
      "Onboarding flows",
    ],
    technologies: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
  },
  {
    id: "srv-2",
    slug: "web-experiences",
    number: "02",
    title: "Web Experiences",
    shortDescription:
      "Design and build fast, accessible websites that make complex services easier to understand.",
    fullDescription:
      "We shape the content, design system, and frontend, then check accessibility and performance across devices.",
    deliverables: [
      "Website art direction",
      "Typography and type scale",
      "Motion and interaction design",
      "CMS integration",
      "Hosting, accessibility, and performance checks",
    ],
    capabilities: [
      "Brand and page layouts",
      "Scroll and hover interactions",
      "Responsive typography",
      "Keyboard and screen-reader support",
      "Accessible website patterns",
    ],
    technologies: ["Next.js App Router", "GSAP ScrollTrigger", "Framer Motion", "Payload CMS"],
  },
  {
    id: "srv-3",
    slug: "custom-software",
    number: "03",
    title: "Custom Software",
    shortDescription:
      "Replace manual processes and disconnected tools with software built around your team’s workflows.",
    fullDescription:
      "We build software around your team's workflows, integrations, and operational requirements when existing tools fall short.",
    deliverables: [
      "System Architecture & Data Schemas",
      "REST and GraphQL APIs",
      "Real-time data connections",
      "Role-based access control",
      "Automated deployment and cloud setup",
    ],
    capabilities: [
      "Service and event-based architecture",
      "Dashboard and data visualization",
      "Database performance and indexing",
      "Third-party integrations",
      "Unit and end-to-end testing",
    ],
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"],
  },
  {
    id: "srv-4",
    slug: "ai-automation",
    number: "04",
    title: "AI & Automation",
    shortDescription:
      "Apply AI to specific needs, from finding information to processing documents and automating repeatable work.",
    fullDescription:
      "We connect AI models to your data and workflows for tasks such as search, document processing, and routing. We test outputs and add safeguards that keep people in control.",
    deliverables: [
      "AI use-case and feasibility review",
      "Search across internal information",
      "Workflow automation with AI models",
      "Model evaluation",
      "Streaming responses and user controls",
    ],
    capabilities: [
      "Retrieval-Augmented Generation (RAG)",
      "AI-assisted task routing",
      "Document processing",
      "Anomaly detection",
      "Data access controls and model safeguards",
    ],
    technologies: ["Python", "FastAPI", "LangChain", "OpenAI / Claude APIs", "pgvector", "Next.js"],
  },
  {
    id: "srv-5",
    slug: "mobile-applications",
    number: "05",
    title: "Mobile Applications",
    shortDescription:
      "Build iOS and Android apps for services that need a useful, dependable mobile experience.",
    fullDescription:
      "We build iOS and Android apps with responsive interactions, offline support where needed, and attention to battery use and performance.",
    deliverables: [
      "Mobile user flows",
      "iOS and Android application",
      "Touch, gesture, and haptic interactions",
      "Offline support where needed",
      "App Store and Google Play submission",
    ],
    capabilities: [
      "Cross-platform app development",
      "Biometric authentication",
      "Push notifications and deep links",
      "In-app payments",
      "Performance and memory optimization",
    ],
    technologies: ["React Native", "TypeScript", "Expo", "Framer Motion", "SQLite", "Native Modules"],
  },
];

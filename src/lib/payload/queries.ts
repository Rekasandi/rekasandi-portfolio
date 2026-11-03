import { getPayloadClient } from "./client";
import { Project, Service, Post, TeamMember, Industry, ProjectCategory, CaseStudyBlock } from "@/data/schema";
import type { Locale } from "@/lib/i18n/config";
import type {
  Project as PayloadProject,
  Service as PayloadService,
  Post as PayloadPost,
  TeamMember as PayloadTeamMember,
} from "@/payload-types";

function extractMediaUrl(media: unknown): string {
  if (!media) return "";
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null) {
    const obj = media as { url?: string; sizes?: { card?: { url?: string } } };
    if (obj.url) return obj.url;
    if (obj.sizes?.card?.url) return obj.sizes.card.url;
  }
  return "";
}

function mapCaseStudyBlocks(blocks: PayloadProject["caseStudyBlocks"]): CaseStudyBlock[] {
  if (!blocks) return [];
  return blocks.map((b): CaseStudyBlock => {
    switch (b.blockType) {
      case "overview":
        return {
          type: "overview",
          challenge: b.challenge,
          solution: b.solution,
          role: (b.role || []).map((r) => r.item || "").filter(Boolean),
        };
      case "stats":
        return {
          type: "stats",
          title: b.title || undefined,
          items: (b.items || []).map((i) => ({
            value: i.value,
            label: i.label,
            description: i.description || undefined,
          })),
        };
      case "twoColumn":
        return {
          type: "twoColumn",
          heading: b.heading,
          leftTitle: b.leftTitle,
          leftContent: b.leftContent,
          rightTitle: b.rightTitle,
          rightContent: b.rightContent,
        };
      case "quote":
        return {
          type: "quote",
          quote: b.quote,
          author: b.author,
          role: b.role || "",
          company: b.company || "",
        };
      case "techStack":
        return {
          type: "techStack",
          technologies: (b.technologies || []).map((t) => ({
            name: t.name,
            category: t.category,
            description: t.description,
          })),
        };
      case "gallery":
        return {
          type: "gallery",
          title: b.title || undefined,
          description: b.description || undefined,
          images: (b.images || []).map((img) => ({
            url: extractMediaUrl(img.image),
            caption: img.caption || undefined,
            alt: img.alt || undefined,
            aspectRatio: img.aspectRatio as "16/9" | "4/3" | "1/1" | "21/9" | undefined,
          })),
        };
      case "fullWidthMedia":
        return {
          type: "fullWidthMedia",
          mediaUrl: extractMediaUrl(b.media),
          caption: b.caption || undefined,
          credit: b.credit || undefined,
          aspectRatio: b.aspectRatio as "16/9" | "21/9" | undefined,
        };
    }
  });
}

function mapPayloadProject(doc: PayloadProject): Project {
  return {
    id: String(doc.id),
    slug: doc.slug,
    number: doc.number,
    title: doc.title,
    client: doc.client,
    year: doc.year,
    industry: doc.industry as Industry,
    category: doc.category as ProjectCategory,
    tagline: doc.tagline,
    summary: doc.summary,
    heroImage: extractMediaUrl(doc.heroImage),
    selectedWorkImages: (doc.selectedWorkImages || [])
      .map((item) => ({
        url: extractMediaUrl(item.image),
        alt: item.alt || undefined,
      }))
      .filter((item) => item.url),
    thumbnailImage: extractMediaUrl(doc.thumbnailImage),
    featured: Boolean(doc.featured),
    gradientAccent: "from-[#B91C1C]/20 via-[#1a0a0a] to-transparent",
    deliverables: [],
    technologies: (doc.technologies || []).map((t) => t.name),
    caseStudyBlocks: mapCaseStudyBlocks(doc.caseStudyBlocks),
    meta: doc.meta
      ? {
          title: doc.meta.title || undefined,
          description: doc.meta.description || undefined,
          image:
            typeof doc.meta.image === "object" &&
            doc.meta.image &&
            "url" in doc.meta.image
              ? (doc.meta.image.url ?? undefined)
              : undefined,
        }
      : undefined,
  };
}

export async function getProjects(locale?: Locale): Promise<Project[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      where: {
        _status: { equals: "published" },
      },
      sort: "number",
      limit: 100,
      locale,
      fallbackLocale: false,
    });

    return (result.docs as PayloadProject[]).map(mapPayloadProject);
  } catch (error) {
    console.warn("Payload getProjects failed:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string, locale?: Locale): Promise<Project | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      where: {
        slug: { equals: slug },
      },
      limit: 1,
      locale,
      fallbackLocale: false,
    });

    return result.docs[0] ? mapPayloadProject(result.docs[0] as PayloadProject) : null;
  } catch (error) {
    console.warn(`Payload getProjectBySlug (${slug}) failed:`, error);
    return null;
  }
}

export async function getServices(locale?: Locale): Promise<Service[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      where: {
        _status: { equals: "published" },
      },
      sort: "order",
      limit: 100,
      locale,
      fallbackLocale: false,
    });

    return (result.docs as PayloadService[]).map((doc) => ({
        id: String(doc.id),
        slug: doc.slug,
        number: doc.number,
        title: doc.title,
        shortDescription: doc.shortDescription,
        cardImage: extractMediaUrl(doc.cardImage) || undefined,
        fullDescription: "",
        deliverables: (doc.deliverables || []).map((d) => d.item),
        capabilities: (doc.capabilities || []).map((c) => c.title),
        technologies: [],
      }));
  } catch (error) {
    console.warn("Payload getServices failed:", error);
    return [];
  }
}

function mapPayloadPost(doc: PayloadPost, locale?: Locale): Post {
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    author: { name: doc.author || "", role: "" },
    publishedAt: doc.publishedAt
      ? new Date(doc.publishedAt).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { month: "short", day: "numeric", year: "numeric" })
      : "",
    readingTime: doc.readingTime || "",
    content: doc.body ? doc.body.split("\n\n") : [],
    tags: [doc.category],
    coverImage: extractMediaUrl(doc.coverImage),
    meta: doc.meta
      ? {
          title: doc.meta.title || undefined,
          description: doc.meta.description || undefined,
          image:
            typeof doc.meta.image === "object" && doc.meta.image && "url" in doc.meta.image
              ? (doc.meta.image.url ?? undefined)
              : undefined,
        }
      : undefined,
  };
}

export async function getPostBySlug(slug: string, locale?: Locale, draft = false): Promise<Post | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug }, ...(draft ? {} : { _status: { equals: "published" } }) },
      limit: 1,
      draft,
      locale,
      fallbackLocale: false,
      overrideAccess: true,
    });
    if (result.docs[0]) return mapPayloadPost(result.docs[0] as PayloadPost, locale);
  } catch (error) {
    console.warn(`Payload getPostBySlug (${slug}) failed:`, error);
  }
  return null;
}

export async function getPosts(locale?: Locale): Promise<Post[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      where: {
        _status: { equals: "published" },
      },
      sort: "-publishedAt",
      limit: 100,
      locale,
      fallbackLocale: false,
    });

    return (result.docs as PayloadPost[]).map((doc) => mapPayloadPost(doc, locale));
  } catch (error) {
    console.warn("Payload getPosts failed:", error);
    return [];
  }
}

export async function getTeamMembers(locale?: Locale): Promise<TeamMember[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "team-members",
      sort: "order",
      limit: 100,
      depth: 1,
      locale,
      fallbackLocale: false,
    });

    return (result.docs as PayloadTeamMember[]).map((doc) => ({
      id: String(doc.id),
      name: doc.name,
      photo: extractMediaUrl(doc.photo),
      role: doc.role,
      specialization: doc.specialization,
      bio: doc.bio,
      location: doc.location || "",
    }));
  } catch (error) {
    console.warn("Payload getTeamMembers failed:", error);
    return [];
  }
}

export type NavigationData = {
  items: { label: string; href: string }[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

export async function getNavigation(locale?: Locale): Promise<NavigationData> {
  try {
    const payload = await getPayloadClient();
    const nav = await payload.findGlobal({ slug: "navigation", locale, fallbackLocale: false });
    return {
      items: (nav?.items || []).map((item) => ({ label: item.label || "", href: item.href || "" })),
      primaryCtaLabel: nav?.primaryCtaLabel || "",
      primaryCtaHref: nav?.primaryCtaHref || "",
    };
  } catch (error) {
    console.warn("Payload getNavigation failed:", error);
    return { items: [], primaryCtaLabel: "", primaryCtaHref: "" };
  }
}

export type FooterData = {
  statement: string;
  timezone: string;
  socialLinks: { platform: string; url: string }[];
};

export async function getFooter(locale?: Locale): Promise<FooterData> {
  try {
    const payload = await getPayloadClient();
    const foot = await payload.findGlobal({ slug: "footer", locale, fallbackLocale: false });
    return {
      statement: foot?.statement || "",
      timezone: foot?.timezone || "",
      socialLinks: (foot?.socialLinks || []).map((item) => ({ platform: item.platform || "", url: item.url || "" })),
    };
  } catch (error) {
    console.warn("Payload getFooter failed:", error);
    return { statement: "", timezone: "", socialLinks: [] };
  }
}

export type SiteSettingsData = {
  companyName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  location: string;
  availability: string;
};

export async function getSiteSettings(locale?: Locale): Promise<SiteSettingsData> {
  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({ slug: "site-settings", locale, fallbackLocale: false });
    return {
      companyName: settings?.companyName || "",
      tagline: settings?.tagline || "",
      description: settings?.description || "",
      contactEmail: settings?.contactEmail || "",
      location: settings?.location || "",
      availability: settings?.availability || "",
    };
  } catch (error) {
    console.warn("Payload getSiteSettings failed:", error);
    return { companyName: "", tagline: "", description: "", contactEmail: "", location: "", availability: "" };
  }
}

export type HomeLogoData = { name: string; src: string; invertInDark: boolean };

export type HomePageData = {
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroHeadlineLine3Prefix: string;
  heroHeadlineLine3Suffix: string;
  heroSubtitle: string;
  heroImages: { src: string; alt: string }[];
  clientEyebrow: string;
  clientHeading: string;
  clientLogos: HomeLogoData[];
  techEyebrow: string;
  techHeading: string;
  techDescription: string;
  techLogos: HomeLogoData[];
  introTitle: string;
  introDescription: string;
  introStatement: string;
  introParagraph: string;
  introMetrics: { value: string; label: string; desc: string }[];
  approachSteps: { number: string; title: string; subtitle: string; description: string; deliverable: string }[];
  techGroups: { category: string; items: { name: string; desc: string }[] }[];
  faqItems: { question: string; answer: string }[];
  ctaHeadline: string;
  ctaSubtitle: string;
};

export async function getHomePageContent(locale?: Locale, seedOnly = false): Promise<HomePageData> {
  const seedEnglish: HomePageData = {
    heroHeadlineLine1: "Digital products, built for real work.",
    heroHeadlineLine2: "",
    heroHeadlineLine3Prefix: "",
    heroHeadlineLine3Suffix: "",
    heroSubtitle:
      "We design and build websites, software, and AI systems around the way your business works.",
    heroImages: [],
    clientEyebrow: "Our clients",
    clientHeading: "A few of the teams we’ve worked with.",
    clientLogos: [
      { name: "Google", src: "/images/clients/google.svg", invertInDark: false },
      { name: "Apple", src: "/images/clients/apple.svg", invertInDark: true },
      { name: "Meta", src: "/images/clients/meta.svg", invertInDark: false },
      { name: "Figma", src: "/images/clients/figma.svg", invertInDark: false },
      { name: "GitHub", src: "/images/clients/github.svg", invertInDark: true },
      { name: "Notion", src: "/images/clients/notion.svg", invertInDark: true },
      { name: "Vercel", src: "/images/clients/vercel.svg", invertInDark: true },
      { name: "Next.js", src: "/images/clients/nextjs.svg", invertInDark: true },
      { name: "OpenAI", src: "/images/clients/openai.svg", invertInDark: true },
      { name: "Supabase", src: "/images/clients/supabase.svg", invertInDark: false },
      { name: "Stripe", src: "/images/clients/stripe.svg", invertInDark: false },
    ],
    techEyebrow: "Tools we choose",
    techHeading: "The right tools for the work at hand.",
    techDescription: "We choose technology to fit the product, not the trend. Here are some of the tools we work with.",
    techLogos: [
      { name: "NVIDIA", src: "https://cdn.21st.dev/assets/mirror/bd/bdf5f3ae72bcfda892a686c03b7932985c694e9a9828643c980601bbc9e53cb4.svg", invertInDark: true },
      { name: "Supabase", src: "/images/clients/supabase.svg", invertInDark: true },
      { name: "GitHub", src: "/images/clients/github.svg", invertInDark: true },
      { name: "OpenAI", src: "/images/clients/openai.svg", invertInDark: true },
      { name: "Turso", src: "https://cdn.21st.dev/assets/mirror/fc/fc7b090ebcfc468d24a1dc482b2db1fcbfd99ca14568552a30ce553d6dda7fcb.svg", invertInDark: true },
      { name: "Clerk", src: "https://cdn.21st.dev/assets/mirror/96/96517bce3574d648280ff639d01d9889f354b488b3f826db5df746d730232a0c.svg", invertInDark: true },
      { name: "Claude AI", src: "https://cdn.21st.dev/assets/mirror/e8/e8514b1206f79e1abdafcc1d2632393cc7cfbcbbe25426ac5143b17b184b56b8.svg", invertInDark: true },
      { name: "Vercel", src: "/images/clients/vercel.svg", invertInDark: true },
    ],
    introTitle: "Good software starts with a clear purpose.",
    introDescription:
      "We make the important decisions early: what to build, who it serves, and how it should work.",
    introStatement:
      "We turn complex business needs into digital products people can use with confidence.",
    introParagraph:
      "From the first product decision to the final release, our strategists, designers, and engineers work as one team. The result is software shaped around real needs, not a template or a handoff chain.",
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
        title: "Discover",
        subtitle: "Strategic Alignment & Architecture Audit",
        description:
          "We dissect your existing software topology, commercial drivers, operational bottlenecks, and user heuristics. Before proposing code or layouts, we establish concrete success benchmarks and defensible roadmaps.",
        deliverable: "Technical Blueprint & Architecture Audit",
      },
      {
        number: "02",
        title: "Define",
        subtitle: "Product Scope & Core System Schemas",
        description:
          "We translate high-level business goals into concrete technical specifications: relational data models, API contracts, entity schemas, and user journeys stripped of non-essential bloat.",
        deliverable: "Schema Contracts & Scope Matrix",
      },
      {
        number: "03",
        title: "Design",
        subtitle: "Editorial UI & Tactile Micro-Interactions",
        description:
          "We forge an unmistakable visual identity: bespoke typography, tokenized color palettes, and motion choreographies tested on actual screens rather than theoretical Figma canvases.",
        deliverable: "Figma Tokens, Design System & Interactive Prototypes",
      },
      {
        number: "04",
        title: "Build",
        subtitle: "Next.js App Router & Type-Safe Engineering",
        description:
          "We write clean, modular, production-hardened TypeScript code. Every component is optimized for sub-second server rendering, zero Cumulative Layout Shift, and full keyboard accessibility.",
        deliverable: "Clean Git Repository & Staging Deployments",
      },
      {
        number: "05",
        title: "Launch",
        subtitle: "Performance Hardening & Zero-Downtime Deployment",
        description:
          "We execute thorough production validation: Core Web Vitals audits, edge CDN caching strategies, automated SEO indexing, and end-to-end security penetration checks.",
        deliverable: "Vercel / AWS Production Deployment & Live Telemetry",
      },
      {
        number: "06",
        title: "Evolve",
        subtitle: "Telemetry Analysis & Continuous Iteration",
        description:
          "Digital products are living systems. Post-launch, we monitor user interaction funnels, conversion rates, and server response times to continually sharpen the competitive advantage.",
        deliverable: "Quarterly Velocity Sprints & Optimization Reports",
      },
    ],
    techGroups: [
      {
        category: "FRONTEND & RUNTIME",
        items: [
          { name: "Next.js 16 App Router", desc: "Server components, parallel routes, streaming" },
          { name: "React 19", desc: "Actions, optimistic updates, canary features" },
          { name: "TypeScript 5", desc: "Strict type enforcement across schemas" },
          { name: "Tailwind CSS v4", desc: "Tokenized design architecture" },
        ],
      },
      {
        category: "MOTION & CRAFT",
        items: [
          { name: "GSAP & ScrollTrigger", desc: "Hardware-accelerated pinned choreography" },
          { name: "Framer Motion", desc: "Spring physics & contextual micro-interactions" },
          { name: "Mapbox / WebGL", desc: "Custom hardware geospatial visualization" },
        ],
      },
      {
        category: "BACKEND & DATA",
        items: [
          { name: "PostgreSQL & pgvector", desc: "Relational persistence & semantic search" },
          { name: "Node.js & Python", desc: "High-throughput microservices & AI pipelines" },
          { name: "Payload CMS", desc: "Type-safe headless editorial engine" },
          { name: "Redis & Kafka", desc: "Distributed pub/sub and sub-millisecond cache" },
        ],
      },
      {
        category: "INTELLIGENCE & CLOUD",
        items: [
          { name: "LangChain & Multi-Agent", desc: "Cognitive task routing and reasoning" },
          { name: "OpenAI / Claude APIs", desc: "Custom fine-tuned cognitive pipelines" },
          { name: "Vercel Edge Network", desc: "Global CDN delivery & serverless functions" },
          { name: "Docker & AWS", desc: "Containerized, scalable cloud deployments" },
        ],
      },
    ],
    faqItems: [
      { question: "What does Rekasandi build?", answer: "We design and engineer custom digital products: websites, web applications, internal platforms, mobile experiences, and AI-enabled systems." },
      { question: "Who do you work with?", answer: "We partner with ambitious companies, founders, and teams that need a reliable product and engineering partner, from early-stage ventures to established businesses." },
      { question: "How does a project usually start?", answer: "We start with a conversation about your goals, users, constraints, and timeline. Then we define the right scope and share a clear proposal before work begins." },
      { question: "How long does a project take?", answer: "Timelines depend on scope and complexity. A focused discovery or prototype may take a few weeks; a full product build often takes several months." },
      { question: "Can you work with our existing team or product?", answer: "Yes. We can join an existing team, improve a live product, or take ownership of a defined workstream. We adapt to your tools and delivery process." },
      { question: "How do you price projects?", answer: "We price projects based on scope, team shape, and delivery timeline. After an initial discussion, we provide a proposal with clear deliverables and costs." },
    ],
    ctaHeadline: "Have a product to build?",
    ctaSubtitle:
      "Tell us what you’re working on. We’ll talk through the goals, constraints, and a sensible next step.",
  };

  const seedIndonesian: HomePageData = {
    ...seedEnglish,
    heroHeadlineLine1: "Produk digital untuk kebutuhan nyata.",
    heroHeadlineLine2: "",
    heroHeadlineLine3Prefix: "",
    heroHeadlineLine3Suffix: "",
    heroSubtitle:
      "Kami merancang dan membangun website, software, dan sistem AI sesuai cara bisnis Anda bekerja.",
    clientEyebrow: "Klien kami",
    clientHeading: "Beberapa tim yang pernah bekerja bersama kami.",
    techEyebrow: "Teknologi yang kami pilih",
    techHeading: "Teknologi yang tepat untuk kebutuhan produk.",
    techDescription: "Kami memilih teknologi berdasarkan kebutuhan produk, bukan tren. Berikut beberapa teknologi yang kami gunakan.",
    introTitle: "Software yang baik berangkat dari tujuan yang jelas.",
    introDescription:
      "Sejak awal, kami menyepakati apa yang perlu dibangun, siapa yang akan menggunakannya, dan bagaimana produk itu bekerja.",
    introStatement:
      "Kami mengubah kebutuhan bisnis yang rumit menjadi produk digital yang mudah digunakan.",
    introParagraph:
      "Dari keputusan produk pertama hingga rilis, perancang dan engineer kami bekerja dalam satu tim. Hasilnya adalah software yang dibuat untuk kebutuhan nyata, bukan template atau rangkaian serah terima.",

    introMetrics: [
      {
        value: "100%",
        label: "Rekayasa Internal",
        desc: "Tanpa alih daya pihak ketiga. Setiap baris kode dan piksel dibuat oleh principal architect studio.",
      },
      {
        value: "60 FPS",
        label: "Target Animasi Halus",
        desc: "CSS dan timeline GSAP terakselerasi perangkat keras untuk respons antarmuka seketika.",
      },
      {
        value: "Nol",
        label: "Kompromi Template",
        desc: "Arsitektur komponen kustom yang dirancang unik sesuai posisi strategis klien.",
      },
    ],
    approachSteps: [
      {
        number: "01",
        title: "Eksplorasi",
        subtitle: "Penyelarasan Strategis & Audit Arsitektur",
        description:
          "Kami membedah topologi perangkat lunak Anda, pendorong bisnis, hambatan operasional, dan heuristik pengguna sebelum merumuskan kode atau antarmuka.",
        deliverable: "Cetak Biru Teknis & Audit Arsitektur",
      },
      {
        number: "02",
        title: "Definisi",
        subtitle: "Cakupan Produk & Skema Sistem Utama",
        description:
          "Kami menerjemahkan target bisnis tingkat tinggi menjadi spesifikasi teknis konkret: model data relasional, kontrak API, dan alur pengguna yang efisien.",
        deliverable: "Kontrak Skema & Matriks Cakupan",
      },
      {
        number: "03",
        title: "Desain",
        subtitle: "UI Editorial & Mikro-Interaksi Taktil",
        description:
          "Kami membentuk identitas visual yang khas: tipografi terkurasi, palet warna bertoken, dan koreografi gerakan yang diuji langsung pada perangkat nyata.",
        deliverable: "Token Desain, Sistem Desain & Prototipe Interaktif",
      },
      {
        number: "04",
        title: "Rekayasa",
        subtitle: "Next.js App Router & Rekayasa Type-Safe",
        description:
          "Kami menulis kode TypeScript yang bersih, modular, dan teruji produksi dengan optimalisasi render server sub-detik dan aksesibilitas penuh.",
        deliverable: "Repositori Kode Bersih & Deployment Staging",
      },
      {
        number: "05",
        title: "Peluncuran",
        subtitle: "Penguatan Kinerja & Deployment Tanpa Downtime",
        description:
          "Kami menjalankan validasi produksi menyeluruh: audit Core Web Vitals, caching CDN edge, pengindeksan SEO otomatis, dan pengujian keamanan.",
        deliverable: "Deployment Produksi & Telemetri Langsung",
      },
      {
        number: "06",
        title: "Evolusi",
        subtitle: "Analisis Telemetri & Iterasi Berkelanjutan",
        description:
          "Produk digital adalah sistem yang hidup. Pasca-peluncuran, kami memantau interaksi pengguna dan waktu respons server untuk terus mengasah keunggulan kompetitif.",
        deliverable: "Sprint Akselerasi Triwulanan & Laporan Optimasi",
      },
    ],
    techGroups: seedEnglish.techGroups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({
        ...item,
        desc: ({
          "Next.js 16 App Router": "Komponen server, rute paralel, dan streaming",
          "React 19": "Actions, pembaruan optimistis, dan fitur terbaru",
          "TypeScript 5": "Pemeriksaan tipe ketat untuk seluruh skema",
          "Tailwind CSS v4": "Arsitektur desain berbasis token",
          "GSAP & ScrollTrigger": "Animasi terarah dengan akselerasi perangkat keras",
          "Framer Motion": "Fisika pegas dan interaksi mikro kontekstual",
          "Mapbox / WebGL": "Visualisasi geospasial khusus berbasis perangkat keras",
          "PostgreSQL & pgvector": "Penyimpanan relasional dan pencarian semantik",
          "Node.js & Python": "Layanan berperforma tinggi dan pipeline AI",
          "Payload CMS": "CMS editorial headless dengan tipe yang aman",
          "Redis & Kafka": "Pub/sub terdistribusi dan cache berlatensi rendah",
          "LangChain & Multi-Agent": "Perutean tugas dan penalaran",
          "OpenAI / Claude APIs": "Integrasi model AI untuk alur kerja khusus",
          "Vercel Edge Network": "CDN global dan fungsi serverless",
          "Docker & AWS": "Deployment cloud terkontainerisasi dan skalabel",
        } as Record<string, string>)[item.name] || item.desc,
      })),
    })),
    faqItems: [
      { question: "Apa yang dibangun Rekasandi?", answer: "Kami merancang dan membangun produk digital kustom: website, aplikasi web, platform internal, aplikasi mobile, dan sistem berbasis AI." },
      { question: "Dengan siapa Rekasandi bekerja?", answer: "Kami bermitra dengan perusahaan, founder, dan tim yang membutuhkan partner produk dan engineering tepercaya, mulai dari bisnis tahap awal hingga perusahaan mapan." },
      { question: "Bagaimana proyek dimulai?", answer: "Kami mulai dengan membahas tujuan, pengguna, batasan, dan timeline. Setelah itu, kami menyusun scope yang tepat dan proposal yang jelas sebelum pekerjaan dimulai." },
      { question: "Berapa lama proyek berlangsung?", answer: "Durasi bergantung pada scope dan kompleksitas. Discovery atau prototipe terarah dapat selesai dalam beberapa minggu; pengembangan produk penuh biasanya memerlukan beberapa bulan." },
      { question: "Bisakah Rekasandi bekerja dengan tim atau produk yang sudah ada?", answer: "Bisa. Kami dapat bergabung dengan tim, meningkatkan produk yang sudah berjalan, atau menangani workstream tertentu. Kami menyesuaikan diri dengan tools dan proses kerja Anda." },
      { question: "Bagaimana biaya proyek ditentukan?", answer: "Biaya ditentukan berdasarkan scope, komposisi tim, dan timeline. Setelah diskusi awal, kami mengirim proposal dengan deliverable dan biaya yang jelas." },
    ],
    ctaHeadline: "Sedang merencanakan produk digital?",
    ctaSubtitle:
      "Ceritakan kebutuhan dan tantangannya. Kita bahas tujuan, batasan, dan langkah berikutnya yang masuk akal."
  };

  const seedContent = locale === "id" ? seedIndonesian : seedEnglish;
  if (seedOnly) return seedContent;

  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({ slug: "page-home", locale, fallbackLocale: false, depth: 1 });
    const clientLogos = (data.clientLogos || [])
      .map((item) => ({
        name: item.name || "",
        src: extractMediaUrl(item.logo),
        invertInDark: Boolean(item.invertInDark),
      }))
      .filter((item) => item.name && item.src);
    const techLogos = (data.techLogos || [])
      .map((item) => ({
        name: item.name || "",
        src: extractMediaUrl(item.logo),
        invertInDark: Boolean(item.invertInDark),
      }))
      .filter((item) => item.name && item.src);

    return {
      heroHeadlineLine1: data.heroHeadlineLine1 || "",
      heroHeadlineLine2: "",
      heroHeadlineLine3Prefix: "",
      heroHeadlineLine3Suffix: "",
      heroSubtitle: data.heroSubtitle || "",
      heroImages: (data.heroImages || []).map(({ image, alt }) => ({
        src: extractMediaUrl(image),
        alt: alt || (typeof image === "object" && image && "alt" in image ? String(image.alt || "") : ""),
      })).filter(({ src }) => Boolean(src)),
      clientEyebrow: data.clientEyebrow || seedContent.clientEyebrow,
      clientHeading: data.clientHeading || seedContent.clientHeading,
      clientLogos: clientLogos.length ? clientLogos : seedContent.clientLogos,
      techEyebrow: data.techEyebrow || seedContent.techEyebrow,
      techHeading: data.techHeading || seedContent.techHeading,
      techDescription: data.techDescription || seedContent.techDescription,
      techLogos: techLogos.length ? techLogos : seedContent.techLogos,
      introTitle: data.introTitle || "",
      introDescription: data.introDescription || "",
      introStatement: data.introStatement || "",
      introParagraph: data.introParagraph || "",
      introMetrics: (data.introMetrics || []).map((item) => ({ value: item.value || "", label: item.label || "", desc: item.desc || "" })),
      approachSteps: (data.approachSteps || []).map((step) => ({ number: step.number || "", title: step.title || "", subtitle: step.subtitle || "", description: step.description || "", deliverable: step.deliverable || "" })),
      techGroups: (data.techGroups || []).map((group) => ({ category: group.category || "", items: (group.items || []).map((item) => ({ name: item.name || "", desc: item.desc || "" })) })),
      faqItems: (data.faqItems || []).map((item) => ({ question: item.question || "", answer: item.answer || "" })),
      ctaHeadline: data.ctaHeadline || "",
      ctaSubtitle: data.ctaSubtitle || "",
    };
  } catch (error) {
    console.warn("Payload getHomePageContent failed:", error);
    return seedContent;
  }
}

export type AboutPageData = {
  headline: string;
  subheadline: string;
  manifestoTitle: string;
  manifestoParagraphs: string[];
  principles: { number: string; title: string; description: string }[];
};

export async function getAboutPageContent(locale?: Locale, seedOnly = false): Promise<AboutPageData> {
  const seedEnglish: AboutPageData = {
    headline: "We are Rekasandi.",
    subheadline:
      "An independent digital product studio crafting category-defining web experiences, scalable software architectures, and autonomous AI systems.",
    manifestoTitle: "We care about what we build and how we build it.",
    manifestoParagraphs: [
      "The web is flooded with disposable software: identical SaaS templates, clunky enterprise portals, and flashy marketing websites that break when you resize your browser.",
      "Rekasandi was formed as an antidote to this commodity mindset. Based in Jakarta with a global standard of execution, we blend Scandinavian editorial minimalism, Swiss typographic discipline, and modern Silicon Valley software engineering.",
      "We believe that software should be treated with the same dignity as physical architecture. When you partner with us, you are commissioning a digital product engineered to endure.",
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
  };

  const seedIndonesian: AboutPageData = {
    headline: "Kami adalah Rekasandi.",
    subheadline:
      "Studio produk digital independen yang menciptakan pengalaman web istimewa, arsitektur perangkat lunak skalabel, dan sistem AI otonom.",
    manifestoTitle: "Kami peduli pada apa yang kami bangun dan bagaimana kami membangunnya.",
    manifestoParagraphs: [
      "Web modern dipenuhi oleh perangkat lunak seragam: template SaaS serupa, portal perusahaan yang kaku, dan situs pemasaran yang berantakan saat ukuran browser diubah.",
      "Rekasandi didirikan sebagai penawar terhadap komoditisasi ini. Berbasis di Jakarta dengan standar eksekusi global, kami memadukan minimalisme editorial, kedisiplinan tipografi, dan rekayasa perangkat lunak modern.",
      "Kami meyakini bahwa perangkat lunak harus diperlakukan dengan martabat yang sama seperti arsitektur fisik. Saat bermitra dengan kami, Anda memesan karya digital yang dirancang untuk bertahan lama.",
    ],
    principles: [
      {
        number: "01",
        title: "Keyakinan yang Tenang",
        description:
          "Kami membiarkan karya kami bersuara melalui presisi, tipografi, dan responsivitas tanpa cela. Tanpa gimik, tanpa sensasi semu, murni keahlian nyata.",
      },
      {
        number: "02",
        title: "Performa Tanpa Syarat",
        description:
          "Waktu muat sub-detik dan kelancaran 60fps bukan renungan belakangan; keduanya adalah fondasi wajib yang tertanam dalam arsitektur kami sejak hari pertama.",
      },
      {
        number: "03",
        title: "Rekayasa Kustom",
        description:
          "Setiap bisnis memiliki konteks strategis yang khas. Kami menolak template generik demi membangun aset digital yang disesuaikan secara khusus.",
      },
      {
        number: "04",
        title: "Transparansi Penuh",
        description:
          "Kami berkomunikasi terbuka mengenai kompromi arsitektur, linimasa, dan keputusan teknis. Kami bertindak sebagai mitra sejati, bukan sekadar vendor terpisah.",
      },
    ],
  };

  const seedContent = locale === "id" ? seedIndonesian : seedEnglish;
  if (seedOnly) return seedContent;

  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: "page-about",
      locale,
      fallbackLocale: false,
    });
    if (data) {
      return {
        headline: data.headline || "",
        subheadline: data.subheadline || "",
        manifestoTitle: data.manifestoTitle || "",
        manifestoParagraphs: (data.manifestoParagraphs || []).map((p) => p.paragraph || ""),
        principles: (data.principles || []).map((pr) => ({ number: pr.number || "", title: pr.title || "", description: pr.description || "" })),
      };
    }
  } catch (error) {
    console.warn("Payload getAboutPageContent failed:", error);
  }
  return { headline: "", subheadline: "", manifestoTitle: "", manifestoParagraphs: [], principles: [] };
}

export type ServicesPageData = {
  headline: string;
  subheadline: string;
  engagementModels: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
  }[];
};

export async function getServicesPageContent(locale?: Locale, seedOnly = false): Promise<ServicesPageData> {
  const seedEnglish: ServicesPageData = {
    headline: "Services.",
    subheadline:
      "Product strategy, design, and engineering for web, software, AI, and mobile.",
    engagementModels: [
      {
        number: "01",
        title: "Dedicated Product Team",
        subtitle: "Design and engineering team",
        description:
          "A focused team works alongside yours to plan, build, and launch a digital product.",
        features: [
          "Product design and engineering",
          "Regular working releases",
          "Direct team communication",
          "Project handoff and documentation",
        ],
      },
      {
        number: "02",
        title: "Planning and Prototyping Sprint",
        subtitle: "A focused, short-term engagement",
        description:
          "Review a technical challenge, test an approach, or plan the next stage of a product build.",
        features: [
          "Architecture review",
          "Prototype or proof of concept",
          "Performance review",
          "Implementation plan",
        ],
      },
      {
        number: "03",
        title: "Ongoing Product Support",
        subtitle: "Monthly design and engineering support",
        description:
          "Continue improving, maintaining, and extending your product after launch.",
        features: [
          "Planned engineering time",
          "Performance checks",
          "Security and dependency reviews",
          "Ongoing product support",
        ],
      },
    ],
  };

  const seedIndonesian: ServicesPageData = {
    headline: "Layanan.",
    subheadline:
      "Strategi produk, desain, dan rekayasa untuk web, software, AI, dan mobile.",
    engagementModels: [
      {
        number: "01",
        title: "Tim Produk Khusus",
        subtitle: "Tim desain dan rekayasa",
        description:
          "Tim bekerja bersama Anda untuk merencanakan, membangun, dan meluncurkan produk digital.",
        features: [
          "Desain dan rekayasa produk",
          "Rilis kerja secara berkala",
          "Komunikasi langsung dengan tim",
          "Serah terima dan dokumentasi proyek",
        ],
      },
      {
        number: "02",
        title: "Sprint Perencanaan dan Prototipe",
        subtitle: "Kerja singkat dengan fokus tertentu",
        description:
          "Tinjau tantangan teknis, uji pendekatan, atau rencanakan tahap berikutnya dalam pengembangan produk.",
        features: [
          "Tinjauan arsitektur",
          "Prototipe atau bukti konsep",
          "Tinjauan performa",
          "Rencana implementasi",
        ],
      },
      {
        number: "03",
        title: "Dukungan Produk Berkelanjutan",
        subtitle: "Dukungan desain dan rekayasa bulanan",
        description:
          "Lanjutkan pengembangan, pemeliharaan, dan perbaikan produk setelah peluncuran.",
        features: [
          "Waktu rekayasa terjadwal",
          "Pemeriksaan performa",
          "Tinjauan keamanan dan dependensi",
          "Dukungan produk berkelanjutan",
        ],
      },
    ],
  };

  const seedContent = locale === "id" ? seedIndonesian : seedEnglish;
  if (seedOnly) return seedContent;

  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: "page-services",
      locale,
      fallbackLocale: false,
    });
    if (data) {
      return {
        headline: data.headline || "",
        subheadline: data.subheadline || "",
        engagementModels: (data.engagementModels || []).map((model) => ({
          number: model.number || "",
          title: model.title || "",
          subtitle: model.subtitle || "",
          description: model.description || "",
          features: typeof model.features === "string" ? model.features.split("\n").filter(Boolean) : [],
        })),
      };
    }
  } catch (error) {
    console.warn("Payload getServicesPageContent failed:", error);
  }
  return { headline: "", subheadline: "", engagementModels: [] };
}




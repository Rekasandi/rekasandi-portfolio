import { getPayloadClient } from "./client";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { POSTS } from "@/data/posts";
import { TEAM_MEMBERS } from "@/data/team";
import { Project, Service, Post, TeamMember, Industry, ProjectCategory, CaseStudyBlock } from "@/data/schema";
import type { Locale } from "@/lib/i18n/config";
import type {
  Project as PayloadProject,
  Service as PayloadService,
  Post as PayloadPost,
  TeamMember as PayloadTeamMember,
} from "@/payload-types";

function extractMediaUrl(media: any, fallbackUrl?: string): string {
  if (!media) return fallbackUrl || "";
  if (typeof media === "string") return media;
  if (typeof media === "object" && media !== null) {
    if ("url" in media && media.url) return media.url;
    if ("sizes" in media && media.sizes?.card?.url) return media.sizes.card.url;
  }
  return fallbackUrl || "";
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
          images: (b.images || []).map((img: any) => ({
            url: extractMediaUrl(img.image, img.url),
            caption: img.caption || undefined,
            alt: img.alt || undefined,
            aspectRatio: (img.aspectRatio as "16/9" | "4/3" | "1/1" | "21/9") || "16/9",
          })),
        };
      case "fullWidthMedia":
        return {
          type: "fullWidthMedia",
          mediaUrl: extractMediaUrl((b as any).media, b.mediaUrl || undefined),
          caption: b.caption || undefined,
          credit: b.credit || undefined,
          aspectRatio: (b.aspectRatio as "16/9" | "21/9") || "21/9",
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
    industry: (doc.industry || "Artificial Intelligence") as Industry,
    category: doc.category as ProjectCategory,
    tagline: doc.tagline,
    summary: doc.summary,
    heroImage: extractMediaUrl(doc.heroImage),
    thumbnailImage: extractMediaUrl(doc.thumbnailImage),
    featured: Boolean(doc.featured),
    gradientAccent: "from-[#d7ff3f]/20 via-[#182012] to-transparent",
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
      locale: locale as any,
      fallbackLocale: "en",
    });

    if (result.docs && result.docs.length > 0) {
      return (result.docs as PayloadProject[]).map(mapPayloadProject);
    }
  } catch (error) {
    console.warn("Payload getProjects fallback to static data:", error);
  }
  return PROJECTS;
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
      locale: locale as any,
      fallbackLocale: "en",
    });

    if (result.docs && result.docs.length > 0) {
      return mapPayloadProject(result.docs[0] as PayloadProject);
    }
  } catch (error) {
    console.warn(`Payload getProjectBySlug (${slug}) fallback:`, error);
  }
  return PROJECTS.find((p) => p.slug === slug) || null;
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
      locale: locale as any,
      fallbackLocale: "en",
    });

    if (result.docs && result.docs.length > 0) {
      return (result.docs as PayloadService[]).map((doc) => ({
        id: String(doc.id),
        slug: doc.slug,
        number: doc.number,
        title: doc.title,
        shortDescription: doc.shortDescription,
        fullDescription: doc.shortDescription,
        deliverables: (doc.deliverables || []).map((d) => d.item),
        capabilities: (doc.capabilities || []).map((c) => c.title),
        technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Payload CMS"],
        stats: { value: "3.4x", label: "Average Client Growth Post-Launch" },
      }));
    }
  } catch (error) {
    console.warn("Payload getServices fallback to static data:", error);
  }
  return SERVICES;
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
      locale: locale as any,
      fallbackLocale: "en",
    });

    if (result.docs && result.docs.length > 0) {
      return (result.docs as PayloadPost[]).map((doc) => ({
        id: String(doc.id),
        slug: doc.slug,
        title: doc.title,
        excerpt: doc.excerpt,
        category: doc.category,
        author: {
          name: doc.author || "Rekasandi Editorial Team",
          role: "Studio Author",
        },
        publishedAt: doc.publishedAt
          ? new Date(doc.publishedAt).toLocaleDateString(locale === "id" ? "id-ID" : "en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()
          : "FEB 2026",
        readingTime: doc.readingTime || (locale === "id" ? "5 MENIT BACA" : "5 MIN READ"),
        content: doc.body ? doc.body.split("\n\n") : [doc.excerpt],
        tags: [doc.category],
        coverImage: extractMediaUrl(doc.coverImage),
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
      }));
    }
  } catch (error) {
    console.warn("Payload getPosts fallback to static data:", error);
  }
  return POSTS;
}

export async function getTeamMembers(locale?: Locale): Promise<TeamMember[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "team-members",
      sort: "order",
      limit: 100,
      locale: locale as any,
      fallbackLocale: "en",
    });

    if (result.docs && result.docs.length > 0) {
      return (result.docs as PayloadTeamMember[]).map((doc) => ({
        id: String(doc.id),
        name: doc.name,
        role: doc.role,
        specialization: doc.specialization,
        bio: doc.bio,
        location: doc.location || "Jakarta, Indonesia",
      }));
    }
  } catch (error) {
    console.warn("Payload getTeamMembers fallback to static data:", error);
  }
  return TEAM_MEMBERS;
}

export type NavigationData = {
  items: { label: string; href: string }[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
};

export async function getNavigation(locale?: Locale): Promise<NavigationData> {
  const fallback: NavigationData = locale === "id"
    ? {
        items: [
          { label: "KARYA", href: "/work" },
          { label: "LAYANAN", href: "/services" },
          { label: "WAWASAN", href: "/insights" },
          { label: "TENTANG", href: "/about" },
          { label: "KONTAK", href: "/contact" },
        ],
        primaryCtaLabel: "MULAI PROYEK ↗",
        primaryCtaHref: "/contact",
      }
    : {
        items: [
          { label: "WORK", href: "/work" },
          { label: "SERVICES", href: "/services" },
          { label: "INSIGHTS", href: "/insights" },
          { label: "ABOUT", href: "/about" },
          { label: "CONTACT", href: "/contact" },
        ],
        primaryCtaLabel: "START A PROJECT ↗",
        primaryCtaHref: "/contact",
      };

  try {
    const payload = await getPayloadClient();
    const nav = await payload.findGlobal({
      slug: "navigation",
      locale: locale as any,
      fallbackLocale: "en",
    });
    if (nav?.items && nav.items.length > 0) {
      return {
        items: nav.items.map((i) => ({ label: i.label, href: i.href })),
        primaryCtaLabel: nav.primaryCtaLabel || fallback.primaryCtaLabel,
        primaryCtaHref: nav.primaryCtaHref || fallback.primaryCtaHref,
      };
    }
  } catch (error) {
    console.warn("Payload getNavigation fallback to static data:", error);
  }

  return fallback;
}

export type FooterData = {
  statement: string;
  timezone: string;
  socialLinks: { platform: string; url: string }[];
};

export async function getFooter(locale?: Locale): Promise<FooterData> {
  const fallback: FooterData = locale === "id"
    ? {
        statement:
          "Rekasandi adalah studio produk digital independen yang merekayasa aplikasi dan sistem cerdas terdepan.",
        timezone: "Asia/Jakarta (WIB / UTC+7)",
        socialLinks: [
          { platform: "GitHub", url: "https://github.com/rekasandi" },
          { platform: "X / Twitter", url: "https://twitter.com/rekasandi" },
          { platform: "LinkedIn", url: "https://linkedin.com/company/rekasandi" },
          { platform: "Figma", url: "https://figma.com/@rekasandi" },
        ],
      }
    : {
        statement:
          "Rekasandi is an independent digital product studio engineering category-defining applications and intelligent systems.",
        timezone: "Asia/Jakarta (UTC+7)",
        socialLinks: [
          { platform: "GitHub", url: "https://github.com/rekasandi" },
          { platform: "X / Twitter", url: "https://twitter.com/rekasandi" },
          { platform: "LinkedIn", url: "https://linkedin.com/company/rekasandi" },
          { platform: "Figma", url: "https://figma.com/@rekasandi" },
        ],
      };

  try {
    const payload = await getPayloadClient();
    const foot = await payload.findGlobal({
      slug: "footer",
      locale: locale as any,
      fallbackLocale: "en",
    });
    if (foot) {
      return {
        statement: foot.statement || fallback.statement,
        timezone: foot.timezone || fallback.timezone,
        socialLinks:
          foot.socialLinks && foot.socialLinks.length > 0
            ? foot.socialLinks.map((s) => ({ platform: s.platform, url: s.url }))
            : fallback.socialLinks,
      };
    }
  } catch (error) {
    console.warn("Payload getFooter fallback to static data:", error);
  }

  return fallback;
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
  const fallback: SiteSettingsData = locale === "id"
    ? {
        companyName: "REKASANDI",
        tagline: "Studio Produk Digital — Strategi, Rekayasa & Sistem AI",
        description:
          "Kami merancang dan membangun produk digital yang memajukan bisnis. Strategi, desain, rekayasa, dan teknologi cerdas berbasis di Jakarta.",
        contactEmail: "hello@rekasandi.com",
        location: "Jakarta Selatan, DKI Jakarta, Indonesia",
        availability: "TERSEDIA UNTUK PROYEK Q2/Q3 2026",
      }
    : {
        companyName: "REKASANDI",
        tagline: "Digital Product Studio — Strategy, Engineering & AI Systems",
        description:
          "We design and build digital products that move businesses forward. Strategy, design, engineering, and intelligent technology based in Jakarta.",
        contactEmail: "hello@rekasandi.com",
        location: "South Jakarta, DKI Jakarta, Indonesia",
        availability: "AVAILABLE FOR Q2/Q3 2026 ENGAGEMENTS",
      };

  try {
    const payload = await getPayloadClient();
    const settings = await payload.findGlobal({
      slug: "site-settings",
      locale: locale as any,
      fallbackLocale: "en",
    });
    if (settings) {
      return {
        companyName: settings.companyName || fallback.companyName,
        tagline: settings.tagline || fallback.tagline,
        description: settings.description || fallback.description,
        contactEmail: settings.contactEmail || fallback.contactEmail,
        location: settings.location || fallback.location,
        availability: settings.availability || fallback.availability,
      };
    }
  } catch (error) {
    console.warn("Payload getSiteSettings fallback to static data:", error);
  }

  return fallback;
}

export type HomePageData = {
  heroHeadlineLine1: string;
  heroHeadlineLine2: string;
  heroHeadlineLine3Prefix: string;
  heroHeadlineLine3Suffix: string;
  heroSubtitle: string;
  introTitle: string;
  introDescription: string;
  introStatement: string;
  introParagraph: string;
  introMetrics: { value: string; label: string; desc: string }[];
  approachSteps: { number: string; title: string; subtitle: string; description: string; deliverable: string }[];
  techGroups: { category: string; items: { name: string; desc: string }[] }[];
  ctaHeadline: string;
  ctaSubtitle: string;
};

export async function getHomePageContent(locale?: Locale): Promise<HomePageData> {
  const fallbackEn: HomePageData = {
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
          { name: "Lenis", desc: "Unified momentum smooth scroll engine" },
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
    ctaHeadline: "LET’S BUILD SOMETHING DEFINITIVE.",
    ctaSubtitle:
      "Have an ambitious digital product, web experience, or AI system in mind? We partner with companies ready to create category-defining work.",
  };

  const fallbackId: HomePageData = {
    ...fallbackEn,
    heroHeadlineLine1: "KAMI MEMBANGUN",
    heroHeadlineLine2: "PRODUK DIGITAL",
    heroHeadlineLine3Prefix: "YANG",
    heroHeadlineLine3Suffix: "BERMAKNA.",
    heroSubtitle:
      "Kami bermitra dengan para pendiri visioner dan perusahaan ambisius untuk merekayasa pengalaman web berkecepatan tinggi, arsitektur perangkat lunak skalabel, dan sistem AI otonom.",
    introTitle: "Kejelasan Rekayasa.",
    introDescription:
      "Kompleksitas adalah hal alami dalam software modern. Kejelasan adalah disiplin mutlak dari rekayasa desain.",
    introStatement:
      "Kami mengubah tantangan bisnis yang rumit menjadi pengalaman digital yang intuitif dan berkecepatan tinggi.",
    introParagraph:
      "Banyak proyek software house terjebak template generik dan serah terima parsial. Kami beroperasi sebagai mitra produk elit—menjembatani kedalaman teknis dan arahan seni editorial untuk menghadirkan software yang membuktikan nilainya sejak hari pertama.",
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
        title: "EKSPLORASI",
        subtitle: "Penyelarasan Strategis & Audit Arsitektur",
        description:
          "Kami membedah topologi perangkat lunak Anda, pendorong bisnis, hambatan operasional, dan heuristik pengguna sebelum merumuskan kode atau antarmuka.",
        deliverable: "Cetak Biru Teknis & Audit Arsitektur",
      },
      {
        number: "02",
        title: "DEFINISI",
        subtitle: "Cakupan Produk & Skema Sistem Utama",
        description:
          "Kami menerjemahkan target bisnis tingkat tinggi menjadi spesifikasi teknis konkret: model data relasional, kontrak API, dan alur pengguna yang efisien.",
        deliverable: "Kontrak Skema & Matriks Cakupan",
      },
      {
        number: "03",
        title: "DESAIN",
        subtitle: "UI Editorial & Mikro-Interaksi Taktil",
        description:
          "Kami membentuk identitas visual yang khas: tipografi terkurasi, palet warna bertoken, dan koreografi gerakan yang diuji langsung pada perangkat nyata.",
        deliverable: "Token Desain, Sistem Desain & Prototipe Interaktif",
      },
      {
        number: "04",
        title: "REKAYASA",
        subtitle: "Next.js App Router & Rekayasa Type-Safe",
        description:
          "Kami menulis kode TypeScript yang bersih, modular, dan teruji produksi dengan optimalisasi render server sub-detik dan aksesibilitas penuh.",
        deliverable: "Repositori Kode Bersih & Deployment Staging",
      },
      {
        number: "05",
        title: "PELUNCURAN",
        subtitle: "Penguatan Kinerja & Deployment Tanpa Downtime",
        description:
          "Kami menjalankan validasi produksi menyeluruh: audit Core Web Vitals, caching CDN edge, pengindeksan SEO otomatis, dan pengujian keamanan.",
        deliverable: "Deployment Produksi & Telemetri Langsung",
      },
      {
        number: "06",
        title: "EVOLUSI",
        subtitle: "Analisis Telemetri & Iterasi Berkelanjutan",
        description:
          "Produk digital adalah sistem yang hidup. Pasca-peluncuran, kami memantau interaksi pengguna dan waktu respons server untuk terus mengasah keunggulan kompetitif.",
        deliverable: "Sprint Akselerasi Triwulanan & Laporan Optimasi",
      },
    ],
    ctaHeadline: "PUNYA IDE PROYEK?",
    ctaSubtitle:
      "Kami bermitra dengan para pendiri visioner, perusahaan progresif, dan para pemimpin kategori. Mari diskusikan langkah strategis Anda berikutnya.",
  };

  const fallback = locale === "id" ? fallbackId : fallbackEn;

  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: "page-home",
      locale: locale as any,
      fallbackLocale: "en",
    });
    if (data) {
      return {
        heroHeadlineLine1: data.heroHeadlineLine1 || fallback.heroHeadlineLine1,
        heroHeadlineLine2: data.heroHeadlineLine2 || fallback.heroHeadlineLine2,
        heroHeadlineLine3Prefix: (data as any).heroHeadlineLine3Prefix || fallback.heroHeadlineLine3Prefix,
        heroHeadlineLine3Suffix: (data as any).heroHeadlineLine3Suffix || fallback.heroHeadlineLine3Suffix,
        heroSubtitle: data.heroSubtitle || fallback.heroSubtitle,
        introTitle: data.introTitle || fallback.introTitle,
        introDescription: data.introDescription || fallback.introDescription,
        introStatement: data.introStatement || fallback.introStatement,
        introParagraph: data.introParagraph || fallback.introParagraph,
        introMetrics:
          data.introMetrics && data.introMetrics.length > 0
            ? data.introMetrics.map((m) => ({ value: m.value, label: m.label, desc: m.desc }))
            : fallback.introMetrics,
        approachSteps:
          data.approachSteps && data.approachSteps.length > 0
            ? data.approachSteps.map((s) => ({
                number: s.number,
                title: s.title,
                subtitle: s.subtitle,
                description: s.description,
                deliverable: s.deliverable,
              }))
            : fallback.approachSteps,
        techGroups:
          data.techGroups && data.techGroups.length > 0
            ? data.techGroups.map((g) => ({
                category: g.category,
                items: (g.items || []).map((it) => ({ name: it.name, desc: it.desc })),
              }))
            : fallback.techGroups,
        ctaHeadline: data.ctaHeadline || fallback.ctaHeadline,
        ctaSubtitle: data.ctaSubtitle || fallback.ctaSubtitle,
      };
    }
  } catch (error) {
    console.warn("Payload getHomePageContent fallback:", error);
  }

  return fallback;
}

export type AboutPageData = {
  headline: string;
  subheadline: string;
  manifestoTitle: string;
  manifestoParagraphs: string[];
  principles: { number: string; title: string; description: string }[];
};

export async function getAboutPageContent(locale?: Locale): Promise<AboutPageData> {
  const fallbackEn: AboutPageData = {
    headline: "WE ARE REKASANDI.",
    subheadline:
      "An independent digital product studio crafting category-defining web experiences, scalable software architectures, and autonomous AI systems.",
    manifestoTitle: "We care about what we build — and how we build it.",
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

  const fallbackId: AboutPageData = {
    headline: "KAMI ADALAH REKASANDI.",
    subheadline:
      "Studio produk digital independen yang menciptakan pengalaman web istimewa, arsitektur perangkat lunak skalabel, dan sistem AI otonom.",
    manifestoTitle: "Kami peduli pada apa yang kami bangun — dan bagaimana kami membangunnya.",
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

  const fallback = locale === "id" ? fallbackId : fallbackEn;

  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: "page-about",
      locale: locale as any,
      fallbackLocale: "en",
    });
    if (data) {
      return {
        headline: data.headline || fallback.headline,
        subheadline: data.subheadline || fallback.subheadline,
        manifestoTitle: data.manifestoTitle || fallback.manifestoTitle,
        manifestoParagraphs:
          data.manifestoParagraphs && data.manifestoParagraphs.length > 0
            ? data.manifestoParagraphs.map((p) => p.paragraph)
            : fallback.manifestoParagraphs,
        principles:
          data.principles && data.principles.length > 0
            ? data.principles.map((pr) => ({
                number: pr.number,
                title: pr.title,
                description: pr.description,
              }))
            : fallback.principles,
      };
    }
  } catch (error) {
    console.warn("Payload getAboutPageContent fallback:", error);
  }

  return fallback;
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

export async function getServicesPageContent(locale?: Locale): Promise<ServicesPageData> {
  const fallbackEn: ServicesPageData = {
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
        features: [
          "Dedicated Full-Stack Team",
          "Bi-Weekly Production Releases",
          "Direct Slack/Discord Channel",
          "Complete IP & Code Ownership",
        ],
      },
      {
        number: "02",
        title: "Strategic Velocity Sprint",
        subtitle: "2–4 Week High-Impact Architecture",
        description:
          "Rapid turnaround for critical initiatives: AI feasibility proofs, design system tokenization, performance turnarounds, or high-stakes product prototypes.",
        features: [
          "Rapid Architectural Prototyping",
          "Executive Technical Audits",
          "Design Token Pipeline Setup",
          "Concrete Production Roadmap",
        ],
      },
      {
        number: "03",
        title: "Continuous Evolution Retainer",
        subtitle: "Post-Launch Growth & Optimization",
        description:
          "Ongoing engineering and design partnership focused on feature velocity, technical debt elimination, Core Web Vitals optimization, and architecture scaling.",
        features: [
          "Guaranteed Monthly Engineering Hours",
          "Core Web Vitals Monitoring",
          "Proactive Security & Dependency Audits",
          "Priority Incident SLA",
        ],
      },
    ],
  };

  const fallbackId: ServicesPageData = {
    headline: "LAYANAN & SPEKTRUM.",
    subheadline:
      "Kami memadukan strategi bisnis, arahan seni editorial, dan rekayasa perangkat lunak mendalam untuk membangun produk digital tangguh yang memajukan bisnis Anda.",
    engagementModels: [
      {
        number: "01",
        title: "Tim Produk Berdedikasi",
        subtitle: "Kemitraan Pembangunan Menyeluruh",
        description:
          "Tim terintegrasi terdiri dari principal architect, desainer produk, dan insinyur senior yang berdedikasi merancang, membangun, dan meluncurkan platform utama Anda dari awal.",
        features: [
          "Tim Full-Stack Khusus",
          "Rilis Produksi Tiap Dua Minggu",
          "Kanal Komunikasi Langsung",
          "Kepemilikan Penuh Kode & HKI",
        ],
      },
      {
        number: "02",
        title: "Sprint Akselerasi Strategis",
        subtitle: "Arsitektur Dampak Tinggi 2–4 Minggu",
        description:
          "Penyelesaian cepat untuk inisiatif krusial: pembuktian kelayakan AI, standardisasi token desain, peningkatan performa, atau prototipe produk bernilai tinggi.",
        features: [
          "Pembuatan Prototipe Arsitektur Cepat",
          "Audit Teknis Eksekutif",
          "Penyusunan Pipeline Token Desain",
          "Peta Jalan Produksi Konkret",
        ],
      },
      {
        number: "03",
        title: "Retainer Evolusi Berkelanjutan",
        subtitle: "Pertumbuhan & Optimalisasi Pasca-Peluncuran",
        description:
          "Kemitraan rekayasa dan desain berkelanjutan yang berfokus pada kecepatan fitur baru, eliminasi utang teknis, optimalisasi Core Web Vitals, dan penskalaan sistem.",
        features: [
          "Alokasi Jam Rekayasa Bulanan Terjamin",
          "Pemantauan Rutin Core Web Vitals",
          "Audit Keamanan & Ketergantungan Proaktif",
          "Prioritas SLA Penanganan Insiden",
        ],
      },
    ],
  };

  const fallback = locale === "id" ? fallbackId : fallbackEn;

  try {
    const payload = await getPayloadClient();
    const data = await payload.findGlobal({
      slug: "page-services",
      locale: locale as any,
      fallbackLocale: "en",
    });
    if (data) {
      return {
        headline: data.headline || fallback.headline,
        subheadline: data.subheadline || fallback.subheadline,
        engagementModels:
          data.engagementModels && data.engagementModels.length > 0
            ? data.engagementModels.map((m) => ({
                number: m.number,
                title: m.title,
                subtitle: m.subtitle,
                description: m.description,
                features: (m.features || []).map((f) => (f as any).item || (f as any).feature),
              }))
            : fallback.engagementModels,
      };
    }
  } catch (error) {
    console.warn("Payload getServicesPageContent fallback:", error);
  }

  return fallback;
}




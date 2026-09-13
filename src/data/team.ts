import { TeamMember, Testimonial, SiteSettings } from "./schema";

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "tm-1",
    name: "Sandi Gustam",
    role: "Founder & Studio Director",
    bio: "Guiding the architectural vision and creative direction of Rekasandi. 10+ years transforming complex technical systems into category-defining digital products.",
    location: "Jakarta, Indonesia",
    specialization: "Product Architecture & Creative Direction",
  },
  {
    id: "tm-2",
    name: "Reza Pratama",
    role: "Head of Creative Technology",
    bio: "Pioneering motion design, WebGL interactive choreography, and micro-interactions. Obsessed with 60fps fluidity and tactile interfaces.",
    location: "Jakarta, Indonesia",
    specialization: "Motion Design & Frontend Engineering",
  },
  {
    id: "tm-3",
    name: "Dian Nugroho",
    role: "Lead Systems Architect",
    bio: "Specializing in distributed enterprise backends, cloud telemetry, and high-throughput real-time pipelines across AWS and PostgreSQL.",
    location: "Bandung, Indonesia",
    specialization: "Distributed Systems & Cloud Architecture",
  },
  {
    id: "tm-4",
    name: "Maya Kartika",
    role: "Lead Product Designer",
    bio: "Architecting typographic hierarchies, multi-brand token ecosystems, and intuitive cognitive workflows for enterprise and consumer FinTech.",
    location: "Jakarta, Indonesia",
    specialization: "Design Systems & Editorial UI/UX",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote:
      "Rekasandi didn't just build software for us; they fundamentally redefined how our global teams interact with enterprise intelligence. Their attention to motion, typography, and speed is unparalleled.",
    author: "Marcus Vance",
    role: "Chief Technology Officer",
    company: "Aether Intelligence Inc.",
    projectSlug: "aether-ai",
  },
  {
    id: "test-2",
    quote:
      "The design system Rekasandi delivered was a game changer for our 60+ engineering organization. We reduced UI bugs by 80% and finally have a unified, award-winning visual language.",
    author: "Elena Rostova",
    role: "VP of Product Experience",
    company: "Kroma Technologies Ltd.",
    projectSlug: "kroma-design-system",
  },
  {
    id: "test-3",
    quote:
      "Volta OS is the nervous system of our global operation. Rekasandi engineered a platform so reliable and visually intuitive that onboarding our fleet operators took days instead of months.",
    author: "Hendrik Van Der Meer",
    role: "Global Operations Director",
    company: "Volta Logistics Global",
    projectSlug: "volta-fleet-os",
  },
];

export const SITE_SETTINGS: SiteSettings = {
  companyName: "Rekasandi Digital Studio",
  tagline: "We design and build digital products that move businesses forward.",
  location: "South Jakarta, DKI Jakarta, Indonesia",
  timezone: "Asia/Jakarta (UTC+7)",
  contactEmail: "hello@rekasandi.com",
  whatsappUrl: "https://wa.me/6281234567890",
  socials: {
    github: "https://github.com/rekasandi",
    linkedin: "https://linkedin.com/company/rekasandi",
    twitter: "https://x.com/rekasandi",
    instagram: "https://instagram.com/rekasandi",
  },
};

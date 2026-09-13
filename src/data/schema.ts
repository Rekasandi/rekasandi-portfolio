export type Industry =
  | "Artificial Intelligence"
  | "Enterprise Software"
  | "FinTech & Banking"
  | "Design Systems"
  | "Supply Chain & Logistics"
  | "E-Commerce"
  | "Healthcare";

export type ProjectCategory =
  | "All"
  | "Digital Product"
  | "Web Experience"
  | "Custom Software"
  | "AI & Automation"
  | "Mobile Application";

export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

export type CaseStudyBlock =
  | {
      type: "overview";
      challenge: string;
      solution: string;
      role: string[];
    }
  | {
      type: "stats";
      title?: string;
      items: MetricItem[];
    }
  | {
      type: "twoColumn";
      heading: string;
      leftTitle: string;
      leftContent: string;
      rightTitle: string;
      rightContent: string;
    }
  | {
      type: "media";
      mediaUrl: string;
      caption?: string;
      aspectRatio?: "16/9" | "21/9" | "4/3";
    }
  | {
      type: "quote";
      quote: string;
      author: string;
      role: string;
      company: string;
      avatarUrl?: string;
    }
  | {
      type: "techStack";
      technologies: { name: string; category: string; description: string }[];
    };

export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  client: string;
  year: string;
  industry: Industry;
  category: ProjectCategory;
  tagline: string;
  summary: string;
  featured: boolean;
  heroImage: string;
  thumbnailImage: string;
  gradientAccent: string;
  deliverables: string[];
  technologies: string[];
  liveUrl?: string;
  caseStudyBlocks: CaseStudyBlock[];
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  capabilities: string[];
  technologies: string[];
  stats: { value: string; label: string };
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  publishedAt: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
  };
  tags: string[];
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  specialization: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  projectSlug?: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  location: string;
  timezone: string;
  contactEmail: string;
  whatsappUrl: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
}

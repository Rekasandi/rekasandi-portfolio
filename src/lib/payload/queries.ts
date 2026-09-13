import { getPayloadClient } from "./client";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { POSTS } from "@/data/posts";
import { TEAM_MEMBERS } from "@/data/team";
import { Project, Service, Post, TeamMember, Industry, ProjectCategory, CaseStudyBlock } from "@/data/schema";
import type {
  Project as PayloadProject,
  Service as PayloadService,
  Post as PayloadPost,
  TeamMember as PayloadTeamMember,
} from "@/payload-types";

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
            url: img.url,
            caption: img.caption || undefined,
            alt: img.alt || undefined,
            aspectRatio: (img.aspectRatio as "16/9" | "4/3" | "1/1" | "21/9") || "16/9",
          })),
        };
      case "fullWidthMedia":
        return {
          type: "fullWidthMedia",
          mediaUrl: b.mediaUrl,
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
    heroImage: doc.heroImage,
    thumbnailImage: doc.thumbnailImage,
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

export async function getProjects(): Promise<Project[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      where: {
        status: { equals: "published" },
      },
      sort: "number",
      limit: 100,
    });

    if (result.docs && result.docs.length > 0) {
      return (result.docs as PayloadProject[]).map(mapPayloadProject);
    }
  } catch (error) {
    console.warn("Payload getProjects fallback to static data:", error);
  }
  return PROJECTS;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "projects",
      where: {
        slug: { equals: slug },
      },
      limit: 1,
    });

    if (result.docs && result.docs.length > 0) {
      return mapPayloadProject(result.docs[0] as PayloadProject);
    }
  } catch (error) {
    console.warn(`Payload getProjectBySlug (${slug}) fallback:`, error);
  }
  return PROJECTS.find((p) => p.slug === slug) || null;
}

export async function getServices(): Promise<Service[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      sort: "order",
      limit: 100,
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

export async function getPosts(): Promise<Post[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "posts",
      sort: "-publishedAt",
      limit: 100,
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
          ? new Date(doc.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()
          : "FEB 2026",
        readingTime: doc.readingTime || "5 MIN READ",
        content: doc.body ? doc.body.split("\n\n") : [doc.excerpt],
        tags: [doc.category],
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

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "team-members",
      sort: "order",
      limit: 100,
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

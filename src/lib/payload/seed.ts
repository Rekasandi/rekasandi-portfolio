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
    if (existing.totalDocs > 0) continue;

    payload.logger.info(`Seeding project: ${project.title}`);
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
      return {
        blockType: "overview" as const,
        challenge: "",
        solution: "",
        role: [],
      };
    });

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
        heroImage: project.heroImage,
        thumbnailImage: project.thumbnailImage,
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

  payload.logger.info("Payload CMS database seeding complete!");
}

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { notFound } from "next/navigation";
import CaseStudyView from "@/components/work/CaseStudyView";
import type { Project } from "@/data/schema";

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/data/project/${slug}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json();
        
        // Fetch all projects to get the next project
        const projectsResponse = await fetch('/api/data/projects');
        const projectsData = await projectsResponse.json();
        
        const allProjects = projectsData.projects;
        const projectIndex = allProjects.findIndex((p: Project) => p.slug === slug);
        const nextIdx = (projectIndex + 1) % allProjects.length;
        
        setProject(result.project);
        setNextProject(allProjects[nextIdx]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center">No data</div>;

  // Schema.org CreativeWork structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: project.title,
    name: project.title,
    description: project.summary,
    image: project.heroImage,
    datePublished: `${project.year}-01-01`,
    author: {
      "@type": "Organization",
      name: "REKASANDI Digital Studio",
      url: "https://rekasandi.com",
    },
    creator: {
      "@type": "Organization",
      name: "REKASANDI Digital Studio",
      url: "https://rekasandi.com",
    },
    publisher: {
      "@type": "Organization",
      name: "REKASANDI",
      url: "https://rekasandi.com",
    },
    about: project.category,
    keywords: [project.category, project.industry, ...(project.technologies || [])].join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyView initialProject={project} nextProject={nextProject || undefined} />
    </>
  );
}


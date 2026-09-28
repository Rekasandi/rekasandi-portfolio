'use client';

import { useEffect, useState } from 'react';
import type { Metadata } from "next";
import { getProjects } from "@/lib/payload/queries";
import WorkFilterableList from "@/components/work/WorkFilterableList";
import type { Project } from "@/data/schema";

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data/projects');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json();
        setProjects(result.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  if (!projects) return <div className="min-h-screen flex items-center justify-center">No data</div>;

  return (
    <div className="py-16 sm:py-24 px-6 sm:px-10 md:px-16 max-w-[1600px] mx-auto">
      {/* Editorial Page Header */}
      <div className="pb-16 max-w-4xl">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-[#0a0a0a] font-semibold tracking-widest">
            [INDEX]
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-[#7a7870]">
            PORTFOLIO ARCHIVE
          </span>
        </div>
        <h1 className="display-xl font-bold tracking-tighter text-[#0a0a0a] mb-6">
          SELECTED WORK.
        </h1>
        <p className="text-[#55544e] text-lg sm:text-xl leading-relaxed max-w-2xl font-normal">
          A showcase of products, platforms, and distributed systems engineered with editorial precision and technical authority.
        </p>
      </div>

      {/* Interactive Filterable Projects Grid */}
      <WorkFilterableList projects={projects} />
    </div>
  );
}


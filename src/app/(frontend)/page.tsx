'use client';

import { useEffect, useState } from 'react';
import HomeView from "@/components/home/HomeView";
import type { HomePageData, SiteSettingsData } from "@/lib/payload/queries";
import type { Project, Service, Post } from "@/data/schema";

export default function HomePage() {
  const [data, setData] = useState<{
    projects: Project[];
    services: Service[];
    posts: Post[];
    siteSettings: SiteSettingsData;
    homeContent: HomePageData;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data/home');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
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
  if (!data) return <div className="min-h-screen flex items-center justify-center">No data</div>;

  return (
    <HomeView
      initialHomeContent={data.homeContent}
      initialSiteSettings={data.siteSettings}
      projects={data.projects}
      services={data.services}
      posts={data.posts}
    />
  );
}


'use client';

import { useEffect, useState } from 'react';
import type { Metadata } from "next";
import ServicesView from "@/components/services/ServicesView";
import type { Service } from "@/data/schema";
import type { ServicesPageData } from "@/lib/payload/queries";

export default function ServicesPage() {
  const [data, setData] = useState<{
    services: Service[];
    servicesContent: ServicesPageData;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data/services');
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
    <ServicesView
      initialServicesContent={data.servicesContent}
      services={data.services}
    />
  );
}

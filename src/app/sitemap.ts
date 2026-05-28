import type { MetadataRoute } from 'next';
import { getProjects } from '@/services/projectService';
import { getPages } from '@/services/pageService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://localhost:3000';

  const [projects, pages] = await Promise.all([getProjects(), getPages()]);

  return [
    { url: base,                    changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/projects`,      changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/contact`,       changeFrequency: 'yearly',  priority: 0.5 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.documentId}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...pages.map((p) => ({
      url: `${base}/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}

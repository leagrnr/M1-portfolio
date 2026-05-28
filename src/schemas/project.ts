import { z } from 'zod';
import { StrapiImageSchema } from './image';

export const ProjectSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  excerpt: z.string(),
  content: z.string(),
  images: z.array(StrapiImageSchema).optional().default([]),
  technologies: z.string().optional(),
  url: z.string().nullable().optional(),
  github_url: z.string().nullable().optional(),
  year: z.number().optional(),
  owner_tag: z.string(),
  locale: z.string(),
});

export const ProjectsResponseSchema = z.object({ projects: z.array(ProjectSchema) });

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectsResponse = z.infer<typeof ProjectsResponseSchema>;

import { z } from 'zod';
import { type BlocksContent } from '@strapi/blocks-react-renderer';
import { StrapiImageSchema } from './image';

const BlocksContentSchema = z.custom<BlocksContent>((val) => Array.isArray(val));

export const ProjectSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  description: z.string(),
  excerpt: z.string(),
  content: BlocksContentSchema,
  images: z.array(StrapiImageSchema).optional(),
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

import { z } from 'zod';

export const PageSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  seo_description: z.string(),
  owner_tag: z.string(),
  locale: z.string(),
});

export const PageResponseSchema = z.object({ pages: z.array(PageSchema) });

export type Page = z.infer<typeof PageSchema>;
export type PageResponse = z.infer<typeof PageResponseSchema>;

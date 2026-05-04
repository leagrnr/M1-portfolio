import { z } from 'zod';
import { type BlocksContent } from '@strapi/blocks-react-renderer';

const BlocksContentSchema = z.custom<BlocksContent>((val) => Array.isArray(val));

export const PageSchema = z.object({
  documentId: z.string(),
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: BlocksContentSchema,
  seo_description: z.string(),
  owner_tag: z.string(),
  locale: z.string(),
});

export const PageResponseSchema = z.object({ pages: z.array(PageSchema) });

export type Page = z.infer<typeof PageSchema>;
export type PageResponse = z.infer<typeof PageResponseSchema>;

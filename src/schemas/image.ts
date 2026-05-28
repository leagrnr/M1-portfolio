import { z } from 'zod';

export const StrapiImageSchema = z.object({
  documentId: z.string(),
  url: z.string(),
  alternativeText: z.string().nullable(),
  width: z.number().optional(),
  height: z.number().optional(),
  formats: z.any().optional(),
});

export type StrapiImage = z.infer<typeof StrapiImageSchema>;

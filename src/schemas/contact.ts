import { z } from 'zod';

export const ContactSchema = z.object({
  documentId: z.string(),
  name: z.string(),
  email: z.string().email(),
  subject: z.string().nullable().optional(),
  message: z.string(),
  owner_tag: z.string(),
});

export const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.email({ message: 'Adresse email invalide' }),
  message: z.string().min(10, { message: 'Le message doit contenir au moins 10 caractères' }),
});

export const CreateContactInputSchema = ContactSchema.omit({
  documentId: true,
  owner_tag: true,
});

export const ContactResponseSchema = z.object({ contacts: z.array(ContactSchema) });

export type Contact = z.infer<typeof ContactSchema>;
export type ContactFormData = z.infer<typeof ContactFormSchema>;
export type CreateContactInput = z.infer<typeof CreateContactInputSchema>;
export type ContactResponse = z.infer<typeof ContactResponseSchema>;

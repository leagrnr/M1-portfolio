'use server';

import { ContactFormSchema } from '@/schemas/contact';
import { createContact } from '@/services/contactService';

export type ActionResult = { success: boolean; message: string };

export async function submitContact(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const result = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!result.success) {
    return { success: false, message: 'Données invalides, vérifiez les champs.' };
  }

  try {
    await createContact({
      ...result.data,
      subject: 'Contact depuis le portfolio',
      owner_tag: process.env.NEXT_PUBLIC_OWNER_TAG!,
    });
    return { success: true, message: 'Message envoyé !' };
  } catch {
    return { success: false, message: "Erreur lors de l'envoi, réessayez." };
  }
}

'use server';

import { createContact } from '@/services/contactService';

export async function submitContact(prevState: any, formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        message: formData.get('message') as string,
        subject: 'Contact depuis le portfolio',
        owner_tag: process.env.NEXT_PUBLIC_OWNER_TAG!,
    };

    try {
        await createContact(data);
        return { success: true, message: 'Message envoyé !' };
    } catch (e) {
        console.error('Erreur ContactAction:', e);
        return { success: false, message: 'Erreur lors de l\'envoi.' };
    }
}
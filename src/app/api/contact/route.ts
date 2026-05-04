import { NextResponse } from 'next/server';
import { ContactFormSchema } from '@/schemas/contact';
import { createContact } from '@/services/contactService';

export async function POST(req: Request) {
  const body = await req.json();

  const result = ContactFormSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ errors: result.error.flatten().fieldErrors }, { status: 422 });
  }

  try {
    await createContact({ ...result.data, subject: 'Contact depuis le portfolio' });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

import 'server-only';
import nodemailer from 'nodemailer';
import { type CreateContactInput } from '@/schemas/contact';

export async function createContact(data: CreateContactInput): Promise<void> {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_EMAIL) {
    console.warn('[contact] SMTP not configured — message not sent:', data);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: `"${data.name}" <${SMTP_USER}>`,
    to: CONTACT_EMAIL,
    replyTo: data.email,
    subject: data.subject ?? `Contact portfolio — ${data.name}`,
    text: `De : ${data.name} <${data.email}>\n\n${data.message}`,
    html: `<p><strong>De :</strong> ${data.name} &lt;${data.email}&gt;</p><p>${data.message.replace(/\n/g, '<br>')}</p>`,
  });
}

import 'server-only';
import { strapiClient } from '@/lib/graphql-client';
import { Contact, CreateContactInput } from '@/types/strapi';

const CREATE_CONTACT = `
  mutation CreateContact($data: ContactInput!) {
    createContact(data: $data) {
      documentId
    }
  }`;

export async function createContact(data: CreateContactInput): Promise<{ documentId: string }> {
  const payload = {
    ...data,
    owner_tag: process.env.NEXT_PUBLIC_OWNER_TAG
  };
  const response = await strapiClient.request<{ createContact: { documentId: string } }>(CREATE_CONTACT, { data: payload });
  return response.createContact;
}
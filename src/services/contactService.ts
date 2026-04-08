import 'server-only';
import { strapiClient } from '@/lib/graphql-client';
import { Contact } from '@/types/strapi';

const CREATE_CONTACT = `
  mutation CreateContact($data: ContactInput!) {
    createContact(data: $data) {
      documentId
    }
  }
`;

export async function createContact(data: Contact) {
  return strapiClient.request(CREATE_CONTACT, { data });
}
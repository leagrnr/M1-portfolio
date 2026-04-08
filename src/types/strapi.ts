import { type BlocksContent } from '@strapi/blocks-react-renderer';

export interface Page {
  documentId: string;
  title: string;
  slug: string;
  content: BlocksContent;
  owner_tag: string;
}

export type PageResponse = {
  pages: Page[];
};

export interface Contact {
  name: string;
  email: string;
  message: string;
  owner_tag: string;
}

export type CreateContactInput = Omit<Contact, 'owner_tag'>;

export interface Project {
  documentId: string;
  title: string;
  excerpt: string;
  technologies: string;
  year: number;
}

export type ProjectsResponse = {
  projects: Project[];
};
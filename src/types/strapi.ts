import { type BlocksContent } from '@strapi/blocks-react-renderer';

export interface StrapiImage {
  documentId: string;
  url: string;
  alternativeText: string | null;
  width?: number;
  height?: number;
  formats?: any;
}

export interface Page {
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: BlocksContent;
  seo_description: string;
  owner_tag: string;
  locale: string;
}

export interface Article {
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: BlocksContent;
  cover?: StrapiImage | null;
  owner_tag: string;
  locale: string;
}

export interface Project {
  documentId: string;
  title: string;
  description: string;
  excerpt: string;
  content: BlocksContent;
  images?: StrapiImage[];
  technologies?: string;
  url?: string | null;
  github_url?: string | null;
  year?: number;
  owner_tag: string;
  locale: string;
}

export interface Contact {
  documentId: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  owner_tag: string;
}

export type CreateContactInput = Omit<Contact, 'documentId' | 'owner_tag'>;

// GraphQL Response Wrappers
export type PageResponse = {
  pages: Page[];
};

export type ArticleResponse = {
  articles: Article[];
};

export type ProjectsResponse = {
  projects: Project[];
};

export type ContactResponse = {
  contacts: Contact[];
};
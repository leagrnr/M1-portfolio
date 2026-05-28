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
  content: string;
  seo_description: string;
  owner_tag: string;
  locale: string;
}

export interface Project {
  documentId: string;
  title: string;
  excerpt: string;
  content: string;
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

export type PageResponse = {
  pages: Page[];
};

export type ProjectsResponse = {
  projects: Project[];
};

export type ContactResponse = {
  contacts: Contact[];
};

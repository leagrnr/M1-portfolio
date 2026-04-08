import 'server-only';
import { strapiClient } from '@/lib/graphql-client';
import { Page, PageResponse } from '@/types/strapi';

const GET_PAGES = `
  query GetPages($filters: PageFiltersInput) {
    pages(filters: $filters) {
      documentId
      title
      slug
      content
    }
  }`;

export async function getPages(): Promise<Page[]> {
  const variables = {
    filters: {
      owner_tag: { eq: process.env.NEXT_PUBLIC_OWNER_TAG }
    }
  };
  const { pages } = await strapiClient.request<PageResponse>(GET_PAGES, variables);
  return pages;
}

export async function getPageBySlug(slug: string): Promise<Page | undefined> {
  const variables = {
    filters: {
      slug: { eq: slug },
      owner_tag: { eq: process.env.NEXT_PUBLIC_OWNER_TAG }
    }
  };
  const { pages } = await strapiClient.request<PageResponse>(GET_PAGES, variables);
  return pages[0];
}
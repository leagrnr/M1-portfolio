import 'server-only';
import { strapiClient } from '@/lib/graphql-client';
import { PageResponseSchema, type Page } from '@/schemas/page';

type NextCache = { next?: { tags?: string[] } };

const GET_PAGES = `
  query GetPages($filters: PageFiltersInput, $locale: I18NLocaleCode) {
    pages(filters: $filters, locale: $locale) {
      documentId
      title
      slug
      excerpt
      content
      seo_description
      owner_tag
      locale
    }
  }`;

export async function getPages(locale: string = 'en'): Promise<Page[]> {
  const variables = {
    locale,
    filters: { owner_tag: { eq: process.env.NEXT_PUBLIC_OWNER_TAG } },
  };
  const raw = await strapiClient.request(GET_PAGES, variables, { next: { tags: ['pages'] } } as NextCache);
  const { pages } = PageResponseSchema.parse(raw);
  return pages;
}

export async function getPageBySlug(slug: string, locale: string = 'en'): Promise<Page | undefined> {
  const variables = {
    locale,
    filters: {
      slug: { eq: slug },
      owner_tag: { eq: process.env.NEXT_PUBLIC_OWNER_TAG },
    },
  };
  const raw = await strapiClient.request(GET_PAGES, variables, { next: { tags: ['pages'] } } as NextCache);
  const { pages } = PageResponseSchema.parse(raw);
  return pages[0];
}

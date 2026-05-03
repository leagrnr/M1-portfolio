import 'server-only';
import { strapiClient } from '@/lib/graphql-client';
import { ProjectsResponse } from '@/types/strapi';

const GET_PROJECTS = `
  query GetProjects($ownerId: String!, $locale: I18NLocaleCode) {
    projects(filters: { owner_tag: { eq: $ownerId } }, locale: $locale) {
      documentId
      title
      description
      excerpt
      content
      images {
        documentId
        url
        alternativeText
      }
      technologies
      url
      year
      owner_tag
      locale
    }
  }`;

export async function getProjects(locale: string = 'en'): Promise<ProjectsResponse> {
  const vars = { 
    ownerId: process.env.NEXT_PUBLIC_OWNER_TAG!,
    locale 
  };
  return strapiClient.request<ProjectsResponse>(GET_PROJECTS, vars, {
    next: { tags: ['projects'] }
  } as any);
}
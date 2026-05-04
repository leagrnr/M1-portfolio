import 'server-only';
import { strapiClient } from '@/lib/graphql-client';
import { ProjectsResponseSchema, type Project } from '@/schemas/project';

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

export async function getProjects(locale: string = 'en'): Promise<Project[]> {
  const vars = {
    ownerId: process.env.NEXT_PUBLIC_OWNER_TAG!,
    locale
  };
  const raw = await strapiClient.request(GET_PROJECTS, vars, {
    next: { tags: ['projects'] }
  } as any);
  const { projects } = ProjectsResponseSchema.parse(raw);
  return projects;
}

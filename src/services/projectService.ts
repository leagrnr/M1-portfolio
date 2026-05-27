import 'server-only';
import { z } from 'zod';
import { strapiClient } from '@/lib/graphql-client';
import { ProjectSchema, ProjectsResponseSchema, type Project } from '@/schemas/project';

const PROJECT_FIELDS = `
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
  github_url
  year
  owner_tag
  locale
`;

const GET_PROJECTS = `
  query GetProjects($ownerId: String!, $locale: I18NLocaleCode) {
    projects(filters: { owner_tag: { eq: $ownerId } }, locale: $locale) {
      ${PROJECT_FIELDS}
    }
  }`;

const GET_PROJECT = `
  query GetProject($documentId: ID!, $locale: I18NLocaleCode) {
    project(documentId: $documentId, locale: $locale) {
      ${PROJECT_FIELDS}
    }
  }`;

export async function getProjects(locale: string = 'en'): Promise<Project[]> {
  const vars = { ownerId: process.env.NEXT_PUBLIC_OWNER_TAG!, locale };
  const raw = await strapiClient.request(GET_PROJECTS, vars, {
    next: { tags: ['projects'] }
  } as any);
  const { projects } = ProjectsResponseSchema.parse(raw);
  return projects;
}

export async function getProjectById(documentId: string, locale: string = 'en'): Promise<Project | null> {
  const raw = await strapiClient.request(GET_PROJECT, { documentId, locale }, {
    next: { tags: ['projects'] }
  } as any);
  const { project } = z.object({ project: ProjectSchema.nullable() }).parse(raw);
  return project;
}

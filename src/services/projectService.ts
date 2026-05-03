import 'server-only';
import { strapiClient } from '@/lib/graphql-client';
import { ProjectsResponse } from '@/types/strapi';

const GET_PROJECTS = `
  query GetProjects($ownerId: String!) {
    projects(filters: { owner_tag: { eq: $ownerId } }) {
      documentId
      title
      excerpt
    }
  }`;

export async function getProjects(): Promise<ProjectsResponse> {
  const vars = { ownerId: process.env.NEXT_PUBLIC_OWNER_TAG! };
  return strapiClient.request<ProjectsResponse>(GET_PROJECTS, vars);
}
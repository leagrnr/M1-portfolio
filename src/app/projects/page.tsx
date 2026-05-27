import { getProjects } from '@/services/projectService';
import { ProjectsFilter } from '@/components/ProjectsFilter';
import { ProjectsList } from '@/components/ProjectsList';

export const metadata = { title: 'Projects — Portfolio' };
export const revalidate = 3600;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <div style={{ color: 'var(--syn-comment)', marginBottom: 32, lineHeight: 1.8 }}>
        <div>{'/**'}</div>
        <div>{' * @file projects.tsx'}</div>
        <div>{` * @count ${projects.length} projet${projects.length !== 1 ? 's' : ''}`}</div>
        <div>{' */'}</div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <span style={{ color: 'var(--syn-keyword)' }}>const</span>
        {' '}
        <span style={{ color: 'var(--syn-variable)' }}>projects</span>
        {': '}
        <span style={{ color: 'var(--syn-function)' }}>Project</span>
        {'[] = ['}
      </div>

      <ProjectsFilter projects={projects} />

      {projects.length === 0 ? (
        <div style={{ paddingLeft: 24, color: 'var(--syn-comment)', fontStyle: 'italic' }}>
          {'// Aucun projet pour le moment'}
        </div>
      ) : (
        <ProjectsList projects={projects} />
      )}

      <div style={{ marginTop: 32, color: 'var(--syn-punct)' }}>{']'}</div>
    </>
  );
}

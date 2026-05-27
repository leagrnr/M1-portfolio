import { getProjects } from '@/services/projectService';
import { ProjectCard } from '@/components/ProjectCard';

export const metadata = { title: 'Projects — Portfolio' };

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
      {/* File header */}
      <div style={{ color: 'var(--syn-comment)', marginBottom: 32, lineHeight: 1.8 }}>
        <div>{'/**'}</div>
        <div>{' * @file projects.tsx'}</div>
        <div>{` * @count ${projects.length} projet${projects.length !== 1 ? 's' : ''}`}</div>
        <div>{' */'}</div>
      </div>

      {/* Declaration */}
      <div style={{ marginBottom: 32 }}>
        <span style={{ color: 'var(--syn-keyword)' }}>const</span>
        {' '}
        <span style={{ color: 'var(--syn-variable)' }}>projects</span>
        {': '}
        <span style={{ color: 'var(--syn-function)' }}>Project</span>
        {'[] = ['}
      </div>

      {projects.length === 0 ? (
        <div
          style={{
            paddingLeft: 24,
            color: 'var(--syn-comment)',
            fontStyle: 'italic',
          }}
        >
          {'// Aucun projet pour le moment'}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: 16,
            paddingLeft: 0,
          }}
        >
          {projects.map((p, i) => (
            <ProjectCard key={p.documentId} project={p} index={i} />
          ))}
        </div>
      )}

      <div style={{ marginTop: 32, color: 'var(--syn-punct)' }}>
        {']'}
      </div>
    </div>
  );
}

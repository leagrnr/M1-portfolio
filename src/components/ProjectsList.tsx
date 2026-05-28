'use client';

import { useUIStore } from '@/stores/useUIStore';
import { ProjectCard } from './ProjectCard';
import { type Project } from '@/schemas/project';

export function ProjectsList({ projects }: { projects: Project[] }) {
  const activeFilter = useUIStore((s) => s.activeFilter);

  const filtered = activeFilter
    ? projects.filter((p) =>
        p.technologies?.split(',').map((t) => t.trim()).includes(activeFilter)
      )
    : projects;

  if (filtered.length === 0) {
    return (
      <div style={{ color: 'var(--syn-comment)', fontStyle: 'italic', paddingLeft: 24 }}>
        {'// Aucun projet pour '}
        <span style={{ color: 'var(--syn-string)' }}>'{activeFilter}'</span>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: 16,
      }}
    >
      {filtered.map((p, i) => (
        <ProjectCard key={p.documentId} project={p} index={i} />
      ))}
    </div>
  );
}

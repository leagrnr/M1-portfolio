'use client';

import { useUIStore } from '@/stores/useUIStore';
import { type Project } from '@/schemas/project';

export function ProjectsFilter({ projects }: { projects: Project[] }) {
  const { activeFilter, setFilter } = useUIStore();

  const techs = [...new Set(
    projects.flatMap((p) =>
      p.technologies?.split(',').map((t) => t.trim()).filter(Boolean) ?? []
    )
  )].sort();

  if (techs.length === 0) return null;

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ color: 'var(--syn-comment)', fontSize: 12, marginBottom: 10 }}>
        {'// $ filter --stack='}
        <span style={{ color: 'var(--syn-string)' }}>
          {activeFilter ? `'${activeFilter}'` : 'null'}
        </span>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => setFilter(null)}
          style={{
            background: activeFilter === null ? 'var(--bg-tertiary)' : 'transparent',
            border: `1px solid ${activeFilter === null ? 'var(--syn-variable)' : 'var(--border)'}`,
            color: activeFilter === null ? 'var(--syn-variable)' : 'var(--text-muted)',
            fontFamily: 'inherit',
            fontSize: 12,
            padding: '4px 12px',
            borderRadius: 4,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          all
        </button>
        {techs.map((tech) => (
          <button
            key={tech}
            onClick={() => setFilter(activeFilter === tech ? null : tech)}
            style={{
              background: activeFilter === tech ? 'var(--bg-tertiary)' : 'transparent',
              border: `1px solid ${activeFilter === tech ? 'var(--syn-string)' : 'var(--border)'}`,
              color: activeFilter === tech ? 'var(--syn-string)' : 'var(--text-muted)',
              fontFamily: 'inherit',
              fontSize: 12,
              padding: '4px 12px',
              borderRadius: 4,
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {tech}
          </button>
        ))}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Project } from '@/types/strapi';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const techs = project.technologies
    ? project.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <article
      className="code-card fade-in"
      style={{ animationDelay: `${0.05 + index * 0.08}s`, padding: '20px 24px' }}
    >
      {/* Line: const projectName = { */}
      <div style={{ marginBottom: 8 }}>
        <span style={{ color: 'var(--syn-comment)', fontSize: 12, userSelect: 'none' }}>
          {String(index + 1).padStart(2, '0')}{' '}
        </span>
        <span style={{ color: 'var(--syn-keyword)' }}>const</span>
        {' '}
        <span style={{ color: 'var(--syn-function)' }}>
          {project.title.toLowerCase().replace(/\s+/g, '_')}
        </span>
        {' = {'}
      </div>

      {/* title property */}
      <div style={{ paddingLeft: 20, marginBottom: 4 }}>
        <span style={{ color: 'var(--syn-property)' }}>title</span>
        {': '}
        <span style={{ color: 'var(--syn-string)' }}>'{project.title}'</span>
        {','}
      </div>

      {/* year property */}
      {project.year && (
        <div style={{ paddingLeft: 20, marginBottom: 4 }}>
          <span style={{ color: 'var(--syn-property)' }}>year</span>
          {': '}
          <span style={{ color: 'var(--syn-number)' }}>{project.year}</span>
          {','}
        </div>
      )}

      {/* technologies property */}
      {techs.length > 0 && (
        <div style={{ paddingLeft: 20, marginBottom: 4 }}>
          <span style={{ color: 'var(--syn-property)' }}>stack</span>
          {': ['}
          {techs.map((tech, i) => (
            <span key={tech}>
              <span style={{ color: 'var(--syn-string)' }}>'{tech}'</span>
              {i < techs.length - 1 && ', '}
            </span>
          ))}
          {'],'}
        </div>
      )}

      {/* description comment */}
      {project.excerpt && (
        <div
          style={{
            paddingLeft: 20,
            color: 'var(--syn-comment)',
            fontSize: 12,
            marginTop: 8,
            marginBottom: 4,
            lineHeight: 1.5,
          }}
        >
          {'// '}{project.excerpt}
        </div>
      )}

      {/* url property */}
      {project.url && (
        <div style={{ paddingLeft: 20, marginBottom: 4 }}>
          <span style={{ color: 'var(--syn-property)' }}>url</span>
          {': '}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--syn-variable)', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            '{project.url}'
          </a>
          {','}
        </div>
      )}

      {/* github_url property */}
      {project.github_url && (
        <div style={{ paddingLeft: 20, marginBottom: 4 }}>
          <span style={{ color: 'var(--syn-property)' }}>github</span>
          {': '}
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--syn-string)', textDecoration: 'underline', textUnderlineOffset: 3 }}
          >
            '{project.github_url}'
          </a>
          {','}
        </div>
      )}

      <div style={{ marginTop: 4 }}>{'}'}
        <span
          style={{
            color: 'var(--syn-comment)',
            fontSize: 12,
            marginLeft: 12,
          }}
        >
          {'// ' + (project.year ?? '')}
        </span>
      </div>

      <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border-muted)' }}>
        <Link
          href={`/projects/${project.documentId}`}
          style={{
            color: 'var(--syn-variable)',
            fontSize: 12,
            textDecoration: 'none',
          }}
        >
          {'$ view_details →'}
        </Link>
      </div>
    </article>
  );
}

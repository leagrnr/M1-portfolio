import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/strapi';
import { strapiUrl } from '@/lib/strapiUrl';

function TechPill({ tech }: { tech: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border)',
        color: 'var(--syn-string)',
        fontSize: 11,
        padding: '2px 8px',
        borderRadius: 3,
      }}
    >
      {tech}
    </span>
  );
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const techs = project.technologies
    ? project.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const cover = project.images?.[0];

  return (
    <article
      className="code-card fade-in"
      style={{ animationDelay: `${0.05 + index * 0.08}s`, overflow: 'hidden' }}
    >
      {cover && (
        <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderBottom: '1px solid var(--border-muted)' }}>
          <Image
            src={strapiUrl(cover.url)}
            alt={cover.alternativeText ?? project.title}
            width={cover.width ?? 800}
            height={cover.height ?? 450}
            unoptimized
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      <div style={{ padding: '20px 24px' }}>
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

        <div style={{ paddingLeft: 20, marginBottom: 4 }}>
          <span style={{ color: 'var(--syn-property)' }}>title</span>
          {': '}
          <span style={{ color: 'var(--syn-string)' }}>'{project.title}'</span>
          {','}
        </div>

        {project.year && (
          <div style={{ paddingLeft: 20, marginBottom: 4 }}>
            <span style={{ color: 'var(--syn-property)' }}>year</span>
            {': '}
            <span style={{ color: 'var(--syn-number)' }}>{project.year}</span>
            {','}
          </div>
        )}

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

        <div style={{ marginTop: 4, marginBottom: techs.length > 0 ? 12 : 4 }}>
          {'}'}
          <span style={{ color: 'var(--syn-comment)', fontSize: 12, marginLeft: 12 }}>
            {'// ' + (project.year ?? '')}
          </span>
        </div>

        {techs.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {techs.map((tech) => <TechPill key={tech} tech={tech} />)}
          </div>
        )}

        <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-muted)' }}>
          <Link
            href={`/projects/${project.documentId}`}
            style={{ color: 'var(--syn-variable)', fontSize: 12, textDecoration: 'none' }}
          >
            {'$ view_details →'}
          </Link>
        </div>
      </div>
    </article>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getProjectById } from '@/services/projectService';
import type { Metadata } from 'next';

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: 'Projet introuvable' };
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
    },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) notFound();

  const techs = project.technologies
    ? project.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ color: 'var(--syn-comment)', marginBottom: 24, fontSize: 12 }}>
        <Link href="/projects" style={{ color: 'var(--syn-variable)', textDecoration: 'none' }}>
          ~/projects
        </Link>
        {'/'}
        <span style={{ color: 'var(--syn-string)' }}>
          {project.title.toLowerCase().replace(/\s+/g, '_')}
        </span>
        {'.tsx'}
      </div>

      {/* Object header */}
      <div className="fade-in fade-in-1" style={{ marginBottom: 32 }}>
        <div>
          <span style={{ color: 'var(--syn-keyword)' }}>const</span>
          {' '}
          <span style={{ color: 'var(--syn-function)' }}>
            {project.title.toLowerCase().replace(/\s+/g, '_')}
          </span>
          {' = {'}
        </div>

        <div style={{ paddingLeft: 24, marginTop: 8, lineHeight: 2 }}>
          <div>
            <span style={{ color: 'var(--syn-property)' }}>title</span>
            {': '}
            <span style={{ color: 'var(--syn-string)' }}>'{project.title}'</span>
            {','}
          </div>

          {project.year && (
            <div>
              <span style={{ color: 'var(--syn-property)' }}>year</span>
              {': '}
              <span style={{ color: 'var(--syn-number)' }}>{project.year}</span>
              {','}
            </div>
          )}

          {techs.length > 0 && (
            <div>
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

          {project.url && (
            <div>
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

          {project.github_url && (
            <div>
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
        </div>

        <div>{'}'}</div>
      </div>

      {/* Description / content */}
      <div className="fade-in fade-in-2">
        <div style={{ color: 'var(--syn-comment)', marginBottom: 12, fontSize: 12 }}>
          {'// ── description ──────────────────────────────────'}
        </div>
        <div
          className="code-prose"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '20px 24px',
            marginBottom: 32,
          }}
        >
          <BlocksRenderer content={project.content} />
        </div>
      </div>

      {/* Back link */}
      <Link
        href="/projects"
        className="cta-link"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          color: 'var(--syn-property)',
          padding: '10px 20px',
          borderRadius: 4,
          textDecoration: 'none',
          fontSize: 13,
          transition: 'border-color 0.15s',
        }}
      >
        <span style={{ color: 'var(--syn-variable)' }}>$</span>
        {' cd ../projects'}
      </Link>
    </div>
  );
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getProjectById, getProjects } from '@/services/projectService';
import { strapiUrl } from '@/lib/strapiUrl';
import type { Metadata } from 'next';

export const revalidate = 3600;

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: 'Projet introuvable' };
  return {
    title: project.title,
    description: project.excerpt,
    openGraph: { title: project.title, description: project.excerpt },
  };
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { id } = await params;
  const [project, allProjects] = await Promise.all([
    getProjectById(id),
    getProjects(),
  ]);
  if (!project) notFound();

  const techs = project.technologies
    ? project.technologies.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const currentIndex = allProjects.findIndex((p) => p.documentId === id);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
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

      <div className="fade-in fade-in-1" style={{ marginBottom: 24 }}>
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
          {project.url && (
            <div>
              <span style={{ color: 'var(--syn-property)' }}>url</span>
              {': '}
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--syn-variable)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                '{project.url}'
              </a>
              {','}
            </div>
          )}
          {project.github_url && (
            <div>
              <span style={{ color: 'var(--syn-property)' }}>github</span>
              {': '}
              <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--syn-string)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
                '{project.github_url}'
              </a>
              {','}
            </div>
          )}
        </div>
        <div>{'}'}</div>

        {techs.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
            {techs.map((tech) => (
              <span
                key={tech}
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
            ))}
          </div>
        )}
      </div>

      {project.images && project.images.length > 0 && (
        <div className="fade-in fade-in-2" style={{ marginBottom: 32 }}>
          <div style={{ color: 'var(--syn-comment)', fontSize: 12, marginBottom: 10 }}>
            {'// ── Screenshots ─────────────────────────────────'}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: project.images.length === 1 ? '1fr' : 'repeat(2, 1fr)',
              gap: 8,
            }}
          >
            {project.images.map((img, i) => (
              <div
                key={img.documentId}
                style={{
                  aspectRatio: project.images!.length === 1 ? '16/7' : '16/9',
                  overflow: 'hidden',
                  borderRadius: 6,
                  border: '1px solid var(--border)',
                  gridColumn: project.images!.length > 2 && i === 0 ? 'span 2' : undefined,
                }}
              >
                <Image
                  src={strapiUrl(img.url)}
                  alt={img.alternativeText ?? `${project.title} — screenshot ${i + 1}`}
                  width={img.width ?? 1200}
                  height={img.height ?? 675}
                  unoptimized
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="fade-in fade-in-3">
        <div style={{ color: 'var(--syn-comment)', marginBottom: 12, fontSize: 12 }}>
          {'// ── Description ──────────────────────────────────'}
        </div>
        <div
          className="code-prose"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '20px 24px',
            marginBottom: 40,
          }}
        >
          <BlocksRenderer content={project.content} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        {prev ? (
          <Link href={`/projects/${prev.documentId}`}
            style={{ color: 'var(--syn-variable)', fontSize: 12, textDecoration: 'none' }}>
            {'← ' + prev.title}
          </Link>
        ) : <span />}

        <Link
          href="/projects"
          className="cta-link"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-secondary)', border: '1px solid var(--border)',
            color: 'var(--syn-property)', padding: '10px 20px', borderRadius: 4,
            textDecoration: 'none', fontSize: 13, transition: 'border-color 0.15s',
          }}
        >
          <span style={{ color: 'var(--syn-variable)' }}>$</span>
          {' cd ../projects'}
        </Link>

        {next ? (
          <Link href={`/projects/${next.documentId}`}
            style={{ color: 'var(--syn-variable)', fontSize: 12, textDecoration: 'none' }}>
            {next.title + ' →'}
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}

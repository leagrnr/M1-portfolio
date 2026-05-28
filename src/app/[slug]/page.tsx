import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPageBySlug } from '@/services/pageService';

type Params = Promise<{ slug: string }>;

export default async function DynamicPage(props: { params: Params }) {
  const { slug } = await props.params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      {/* File path breadcrumb */}
      <div style={{ color: 'var(--syn-comment)', marginBottom: 24, fontSize: 12 }}>
        {'// ~/pages/'}
        <span style={{ color: 'var(--syn-string)' }}>{slug}</span>
        {'.tsx'}
      </div>

      {/* Function declaration */}
      <div style={{ marginBottom: 32 }}>
        <span style={{ color: 'var(--syn-keyword)' }}>export default function</span>
        {' '}
        <span style={{ color: 'var(--syn-function)' }}>
          {slug.replace(/-./g, (m) => m[1].toUpperCase())}
        </span>
        {'() {'}
      </div>

      {/* return block */}
      <div style={{ paddingLeft: 20 }}>
        <div style={{ color: 'var(--syn-keyword)', marginBottom: 16 }}>
          {'return ('}
        </div>

        <div style={{ paddingLeft: 20 }}>
          {/* h1 */}
          <div className="fade-in" style={{ marginBottom: 24 }}>
            <span style={{ color: 'var(--syn-comment)', fontSize: 12 }}>{'<h1>'}</span>
            <h1
              style={{
                fontSize: '1.8rem',
                fontWeight: 700,
                color: 'var(--syn-function)',
                margin: '8px 0 4px',
                lineHeight: 1.3,
              }}
            >
              {page.title}
            </h1>
            <span style={{ color: 'var(--syn-comment)', fontSize: 12 }}>{'</h1>'}</span>
          </div>

          {/* content */}
          <div
            className="code-prose fade-in"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '24px',
              marginBottom: 16,
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{page.content}</ReactMarkdown>
          </div>
        </div>

        <div style={{ color: 'var(--syn-keyword)', marginTop: 8 }}>{')'}</div>
      </div>

      <div style={{ marginTop: 8 }}>{'}'}</div>
    </div>
  );
}

import { getPageBySlug } from '@/services/pageService';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import Link from 'next/link';

export default async function Home() {
  const page = await getPageBySlug('home');

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      {/* File header comment */}
      <div className="fade-in fade-in-1" style={{ color: 'var(--syn-comment)', marginBottom: 32 }}>
        <div>{'/**'}</div>
        <div>{' * @file home.tsx'}</div>
        <div>{' * @description Portfolio — développeur web'}</div>
        <div>{' */'}</div>
      </div>

      {/* Import block */}
      <div className="fade-in fade-in-2" style={{ marginBottom: 40, lineHeight: 2 }}>
        <div>
          <span style={{ color: 'var(--syn-keyword)' }}>import</span>
          {' { '}
          <span style={{ color: 'var(--syn-function)' }}>React</span>
          {' } '}
          <span style={{ color: 'var(--syn-keyword)' }}>from</span>
          {' '}
          <span style={{ color: 'var(--syn-string)' }}>'react'</span>
        </div>
        <div>
          <span style={{ color: 'var(--syn-keyword)' }}>import</span>
          {' { '}
          <span style={{ color: 'var(--syn-function)' }}>projects</span>
          {', '}
          <span style={{ color: 'var(--syn-function)' }}>contact</span>
          {' } '}
          <span style={{ color: 'var(--syn-keyword)' }}>from</span>
          {' '}
          <span style={{ color: 'var(--syn-string)' }}>'./pages'</span>
        </div>
      </div>

      {/* Dev const */}
      <div className="fade-in fade-in-3" style={{ marginBottom: 40 }}>
        <div>
          <span style={{ color: 'var(--syn-keyword)' }}>const</span>
          {' '}
          <span style={{ color: 'var(--syn-variable)' }}>dev</span>
          {' '}
          <span style={{ color: 'var(--syn-punct)' }}>=</span>
          {' {'}
        </div>
        <div style={{ paddingLeft: 24 }}>
          <span style={{ color: 'var(--syn-property)' }}>name</span>
          {': '}
          <span style={{ color: 'var(--syn-string)' }}>
            '{page ? page.title : 'Portfolio'}'
          </span>
          {','}
        </div>
        <div style={{ paddingLeft: 24 }}>
          <span style={{ color: 'var(--syn-property)' }}>role</span>
          {': '}
          <span style={{ color: 'var(--syn-string)' }}>'Développeur Web'</span>
          {','}
        </div>
        <div style={{ paddingLeft: 24 }}>
          <span style={{ color: 'var(--syn-property)' }}>stack</span>
          {': ['}
          <span style={{ color: 'var(--syn-string)' }}>'Next.js'</span>
          {', '}
          <span style={{ color: 'var(--syn-string)' }}>'TypeScript'</span>
          {', '}
          <span style={{ color: 'var(--syn-string)' }}>'Strapi'</span>
          {'],'}
        </div>
        <div style={{ paddingLeft: 24 }}>
          <span style={{ color: 'var(--syn-property)' }}>available</span>
          {': '}
          <span style={{ color: 'var(--syn-keyword)' }}>true</span>
          {','}
        </div>
        <div>{'}'}</div>
      </div>

      {/* Content from Strapi */}
      {page && (
        <div className="fade-in fade-in-4" style={{ marginBottom: 48 }}>
          <div style={{ color: 'var(--syn-comment)', marginBottom: 12 }}>
            {'// ── description ──────────────────────────────────'}
          </div>
          <div
            className="code-prose"
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '20px 24px',
            }}
          >
            <BlocksRenderer content={page.content} />
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="fade-in fade-in-5" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
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
            transition: 'border-color 0.15s, color 0.15s',
          }}
        >
          <span style={{ color: 'var(--syn-variable)' }}>$</span>
          {' ls ~/projects'}
        </Link>
        <Link
          href="/contact"
          className="cta-link-contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border)',
            color: 'var(--syn-string)',
            padding: '10px 20px',
            borderRadius: 4,
            textDecoration: 'none',
            fontSize: 13,
            transition: 'border-color 0.15s',
          }}
        >
          <span style={{ color: 'var(--syn-variable)' }}>$</span>
          {' mail --new ~/contact'}
        </Link>
      </div>
    </div>
  );
}

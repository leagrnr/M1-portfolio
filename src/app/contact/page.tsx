import { ContactForm } from '@/components/ContactForm';

export const metadata = { title: 'Contact — Portfolio' };

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '48px 24px' }}>
      {/* File header */}
      <div style={{ color: 'var(--syn-comment)', marginBottom: 32, lineHeight: 1.8 }}>
        <div>{'/**'}</div>
        <div>{' * @file contact.tsx'}</div>
        <div>{' * @description Envoyez-moi un message'}</div>
        <div>{' */'}</div>
      </div>

      {/* Function signature */}
      <div style={{ marginBottom: 32 }}>
        <div>
          <span style={{ color: 'var(--syn-keyword)' }}>async function</span>
          {' '}
          <span style={{ color: 'var(--syn-function)' }}>sendMessage</span>
          {'('}
          <span style={{ color: 'var(--syn-variable)' }}>payload</span>
          {': '}
          <span style={{ color: 'var(--syn-function)' }}>ContactData</span>
          {') {'}
        </div>
        <div style={{ paddingLeft: 20, color: 'var(--syn-comment)', fontSize: 12, marginTop: 4 }}>
          {'// POST /api/contact — réponse sous 48h'}
        </div>
        <div style={{ marginTop: 8 }}>{'}'}</div>
      </div>

      {/* Separator */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          marginBottom: 32,
        }}
      />

      {/* Prompt */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 24,
          fontSize: 13,
        }}
      >
        <span style={{ color: 'var(--syn-variable)' }}>$</span>
        <span style={{ color: 'var(--text-muted)' }}>~/contact</span>
        <span className="cursor" style={{ color: 'var(--syn-property)' }} />
      </div>

      <ContactForm />
    </div>
  );
}

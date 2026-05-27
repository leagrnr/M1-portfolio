'use client';

import { type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, type ContactFormData } from '@/schemas/contact';
import { submitContact } from '@/actions/contactActions';

function TermField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', marginBottom: 6, fontSize: 12 }}>
        <span style={{ color: 'var(--syn-comment)' }}>{'// '}</span>
        <span style={{ color: 'var(--syn-property)' }}>{label}</span>
      </label>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ color: 'var(--syn-variable)', paddingTop: 9, flexShrink: 0 }}>{'>'}</span>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
      {error && (
        <div style={{ color: 'var(--syn-keyword)', fontSize: 12, marginTop: 4, paddingLeft: 20 }}>
          {'// error: '}{error}
        </div>
      )}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');
    const formData = new FormData();
    formData.set('name', data.name);
    formData.set('email', data.email);
    formData.set('message', data.message);
    const result = await submitContact(null, formData);
    if (result.success) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--syn-property)',
          borderRadius: 6,
          padding: '20px 24px',
          color: 'var(--syn-property)',
          fontSize: 13,
        }}
      >
        <div style={{ color: 'var(--syn-comment)', marginBottom: 8 }}>{'// ✓ message envoyé'}</div>
        <div>
          <span style={{ color: 'var(--syn-keyword)' }}>return</span>
          {' { '}
          <span style={{ color: 'var(--syn-property)' }}>status</span>
          {': '}
          <span style={{ color: 'var(--syn-number)' }}>200</span>
          {', '}
          <span style={{ color: 'var(--syn-property)' }}>message</span>
          {': '}
          <span style={{ color: 'var(--syn-string)' }}>{'\'OK\''}</span>
          {' }'}
        </div>
        <button
          onClick={() => setStatus('idle')}
          style={{
            marginTop: 16,
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            padding: '6px 14px',
            borderRadius: 4,
            cursor: 'pointer',
            fontSize: 12,
            fontFamily: 'inherit',
          }}
        >
          $ new message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TermField label="name" error={errors.name?.message}>
        <input
          {...register('name')}
          placeholder="Votre nom"
          className={`term-input ${errors.name ? 'invalid' : ''}`}
        />
      </TermField>

      <TermField label="email" error={errors.email?.message}>
        <input
          {...register('email')}
          type="email"
          placeholder="votre@email.com"
          className={`term-input ${errors.email ? 'invalid' : ''}`}
        />
      </TermField>

      <TermField label="message" error={errors.message?.message}>
        <textarea
          {...register('message')}
          placeholder="Votre message..."
          rows={5}
          className={`term-input ${errors.message ? 'invalid' : ''}`}
          style={{ resize: 'vertical' }}
        />
      </TermField>

      {status === 'error' && (
        <div style={{ color: 'var(--syn-keyword)', fontSize: 12, marginBottom: 16 }}>
          {'// error: échec de l\'envoi — réessayez'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: status === 'loading' ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
          border: '1px solid var(--syn-variable)',
          color: status === 'loading' ? 'var(--text-muted)' : 'var(--syn-variable)',
          padding: '10px 24px',
          borderRadius: 4,
          cursor: status === 'loading' ? 'wait' : 'pointer',
          fontFamily: 'inherit',
          fontSize: 13,
          transition: 'background 0.15s, color 0.15s',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: 'var(--syn-variable)' }}>$</span>
        {status === 'loading' ? 'sending...' : 'send message'}
        {status === 'loading' && <span className="cursor" />}
      </button>
    </form>
  );
}

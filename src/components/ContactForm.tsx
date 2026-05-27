'use client';

import { useActionState, startTransition, useEffect, useRef, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, type ContactFormData } from '@/schemas/contact';
import { submitContact, type ActionResult } from '@/actions/contactActions';
import { useUIStore } from '@/stores/useUIStore';

function TermField({
  label,
  fieldId,
  error,
  children,
}: {
  label: string;
  fieldId: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label
        htmlFor={fieldId}
        style={{ display: 'block', marginBottom: 6, fontSize: 12, cursor: 'pointer' }}
      >
        <span style={{ color: 'var(--syn-comment)' }}>{'// '}</span>
        <span style={{ color: 'var(--syn-property)' }}>{label}</span>
      </label>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ color: 'var(--syn-variable)', paddingTop: 9, flexShrink: 0 }}>{'>'}</span>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
      {error && (
        <div
          id={`${fieldId}-error`}
          role="alert"
          style={{ color: 'var(--syn-keyword)', fontSize: 12, marginTop: 4, paddingLeft: 20 }}
        >
          {'// error: '}{error}
        </div>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, dispatch, isPending] = useActionState<ActionResult | null, FormData>(
    submitContact,
    null
  );
  const addNotification = useUIStore((s) => s.addNotification);
  const initialized = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    mode: 'onTouched',
  });

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      return;
    }
    if (state?.success) {
      addNotification('success', 'Message envoyé !');
      reset();
    } else if (state?.success === false) {
      addNotification('error', state.message);
    }
  }, [state]);

  const onSubmit = (data: ContactFormData) => {
    const fd = new FormData();
    fd.set('name', data.name);
    fd.set('email', data.email);
    fd.set('message', data.message);
    startTransition(() => dispatch(fd));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Formulaire de contact">
      <TermField label="name" fieldId="contact-name" error={errors.name?.message}>
        <input
          id="contact-name"
          {...register('name')}
          placeholder="Votre nom"
          aria-invalid={!!errors.name || undefined}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
          className={`term-input ${errors.name ? 'invalid' : ''}`}
        />
      </TermField>

      <TermField label="email" fieldId="contact-email" error={errors.email?.message}>
        <input
          id="contact-email"
          {...register('email')}
          type="email"
          placeholder="votre@email.com"
          aria-invalid={!!errors.email || undefined}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          className={`term-input ${errors.email ? 'invalid' : ''}`}
        />
      </TermField>

      <TermField label="message" fieldId="contact-message" error={errors.message?.message}>
        <textarea
          id="contact-message"
          {...register('message')}
          placeholder="Votre message..."
          rows={5}
          aria-invalid={!!errors.message || undefined}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          className={`term-input ${errors.message ? 'invalid' : ''}`}
          style={{ resize: 'vertical' }}
        />
      </TermField>

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        style={{
          background: isPending ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
          border: '1px solid var(--syn-variable)',
          color: isPending ? 'var(--text-muted)' : 'var(--syn-variable)',
          padding: '10px 24px',
          borderRadius: 4,
          cursor: isPending ? 'wait' : 'pointer',
          fontFamily: 'inherit',
          fontSize: 13,
          transition: 'background 0.15s, color 0.15s',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span style={{ color: 'var(--syn-variable)' }}>$</span>
        {isPending ? 'sending...' : 'send message'}
        {isPending && <span className="cursor" aria-hidden="true" />}
      </button>
    </form>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContactFormSchema, type ContactFormData } from '@/schemas/contact';

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
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <input {...register('name')} placeholder="Nom" className="border p-2 w-full" />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <input {...register('email')} placeholder="Email" className="border p-2 w-full" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <textarea {...register('message')} placeholder="Message" className="border p-2 w-full" />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="bg-blue-600 text-white p-2 disabled:bg-gray-400"
      >
        {status === 'loading' ? 'Envoi...' : 'Envoyer'}
      </button>

      {status === 'success' && <p className="text-green-600">Message envoyé !</p>}
      {status === 'error' && <p className="text-red-600">Erreur lors de l'envoi.</p>}
    </form>
  );
}
